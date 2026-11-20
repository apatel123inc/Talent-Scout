create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (btrim(name) <> ''),
  region text,
  website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users (id) on delete cascade,
  display_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index users_normalized_email_key
  on public.users (lower(btrim(email)))
  where email is not null;

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  role text not null check (role in ('owner', 'administrator', 'recruiter', 'reviewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null check (btrim(name) <> ''),
  position text,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'completed')),
  start_date date,
  created_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create table public.candidates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null check (btrim(name) <> ''),
  initials text,
  role text,
  organization_name text,
  location text,
  leadership text,
  program text,
  graduation_year smallint check (graduation_year between 1900 and 2100),
  match_score smallint check (match_score between 0 and 100),
  review_status text not null default 'pending'
    check (review_status in ('pending', 'approved', 'needs_review')),
  created_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create table public.campaign_candidates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  campaign_id uuid not null,
  candidate_id uuid not null,
  added_by uuid references public.users (id) on delete set null,
  added_at timestamptz not null default now(),
  removed_at timestamptz,
  check (removed_at is null or removed_at >= added_at),
  unique (campaign_id, candidate_id),
  unique (id, organization_id),
  foreign key (campaign_id, organization_id)
    references public.campaigns (id, organization_id)
    on update restrict on delete restrict,
  foreign key (candidate_id, organization_id)
    references public.candidates (id, organization_id)
    on update restrict on delete restrict
);

create table public.pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null check (btrim(name) <> ''),
  sort_order integer not null check (sort_order >= 0),
  is_terminal boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name),
  unique (organization_id, sort_order),
  unique (id, organization_id)
);

create table public.candidate_pipeline_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  campaign_candidate_id uuid not null,
  pipeline_stage_id uuid not null,
  entered_at timestamptz not null default now(),
  exited_at timestamptz,
  changed_by uuid references public.users (id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  check (exited_at is null or exited_at >= entered_at),
  foreign key (campaign_candidate_id, organization_id)
    references public.campaign_candidates (id, organization_id)
    on update restrict on delete restrict,
  foreign key (pipeline_stage_id, organization_id)
    references public.pipeline_stages (id, organization_id)
    on update restrict on delete restrict
);

create unique index one_active_pipeline_entry
  on public.candidate_pipeline_entries (campaign_candidate_id)
  where exited_at is null;

create index candidate_pipeline_entries_history_idx
  on public.candidate_pipeline_entries (campaign_candidate_id, entered_at desc);

create index campaign_candidates_org_campaign_idx
  on public.campaign_candidates (organization_id, campaign_id);

create index campaign_candidates_org_candidate_idx
  on public.campaign_candidates (organization_id, candidate_id);

create trigger organizations_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create trigger users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger organization_memberships_updated_at
before update on public.organization_memberships
for each row execute function public.set_updated_at();

create trigger campaigns_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

create trigger candidates_updated_at
before update on public.candidates
for each row execute function public.set_updated_at();

create trigger pipeline_stages_updated_at
before update on public.pipeline_stages
for each row execute function public.set_updated_at();

create or replace function public.initialize_campaign_candidate_pipeline()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  discovered_stage_id uuid;
begin
  select id into discovered_stage_id
  from public.pipeline_stages
  where organization_id = new.organization_id
    and name = 'Discovered'
  limit 1;

  if discovered_stage_id is null then
    raise exception 'Organization % has no seeded "Discovered" pipeline stage', new.organization_id;
  end if;

  insert into public.candidate_pipeline_entries (
    organization_id,
    campaign_candidate_id,
    pipeline_stage_id,
    entered_at
  ) values (
    new.organization_id,
    new.id,
    discovered_stage_id,
    now()
  );

  return new;
end;
$$;

create trigger campaign_candidate_initialize_pipeline
after insert on public.campaign_candidates
for each row execute function public.initialize_campaign_candidate_pipeline();

create or replace function public.prevent_pipeline_history_mutation()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'Candidate pipeline history is immutable and cannot be deleted';
  end if;

  if old.exited_at is not null then
    raise exception 'Closed candidate pipeline entries are immutable';
  end if;

  if new.organization_id is distinct from old.organization_id
    or new.campaign_candidate_id is distinct from old.campaign_candidate_id
    or new.pipeline_stage_id is distinct from old.pipeline_stage_id
    or new.entered_at is distinct from old.entered_at
    or new.changed_by is distinct from old.changed_by
    or new.note is distinct from old.note
    or new.created_at is distinct from old.created_at
  then
    raise exception 'Open pipeline entries may only be closed; create a new entry to change stages';
  end if;

  if new.exited_at is null then
    raise exception 'Use a server operation to move a candidate to a new pipeline stage';
  end if;

  return new;
end;
$$;

create trigger candidate_pipeline_history_protected
before update or delete on public.candidate_pipeline_entries
for each row execute function public.prevent_pipeline_history_mutation();

alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.campaigns enable row level security;
alter table public.candidates enable row level security;
alter table public.campaign_candidates enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.candidate_pipeline_entries enable row level security;
