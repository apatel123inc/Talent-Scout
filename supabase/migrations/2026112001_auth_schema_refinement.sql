alter table public.campaigns
  add column if not exists end_date date,
  add column if not exists target_universities text[] not null default '{}',
  add column if not exists target_programs text[] not null default '{}';

alter table public.candidates
  add column if not exists email text,
  add column if not exists profile_url text,
  add column if not exists suppression_reason text,
  add column if not exists do_not_contact boolean not null default false;

create table if not exists public.candidate_skills (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  candidate_id uuid not null,
  name text not null check (btrim(name) <> ''),
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (candidate_id, organization_id)
    references public.candidates(id, organization_id)
    on update restrict on delete cascade,
  unique (candidate_id, organization_id, name)
);

create table if not exists public.candidate_experiences (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  candidate_id uuid not null,
  title text not null,
  organization_name text,
  period text,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (candidate_id, organization_id)
    references public.candidates(id, organization_id)
    on update restrict on delete cascade
);

create table if not exists public.candidate_evidence (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  candidate_id uuid not null,
  evidence_type text not null,
  source_title text,
  source_url text,
  description text not null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified', 'disputed')),
  collected_by uuid references public.users(id) on delete set null,
  collected_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  foreign key (candidate_id, organization_id)
    references public.candidates(id, organization_id)
    on update restrict on delete cascade
);

create table if not exists public.candidate_notes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  candidate_id uuid not null,
  author_id uuid references public.users(id) on delete set null,
  text text not null check (btrim(text) <> ''),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (candidate_id, organization_id)
    references public.candidates(id, organization_id)
    on update restrict on delete cascade
);

create table if not exists public.candidate_contact_preferences (
  candidate_id uuid primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  consent_status text not null default 'unknown'
    check (consent_status in ('unknown', 'requested', 'consented', 'withdrawn')),
  preferred_channel text,
  do_not_contact boolean not null default false,
  consented_at timestamptz,
  updated_at timestamptz not null default now(),
  foreign key (candidate_id, organization_id)
    references public.candidates(id, organization_id)
    on update restrict on delete cascade
);

create or replace function public.application_user_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select u.id
  from public.users u
  where u.auth_user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_organization_member(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships m
    where m.organization_id = p_organization_id
      and m.user_id = public.application_user_id()
  );
$$;

create or replace function public.has_organization_role(p_organization_id uuid, p_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships m
    where m.organization_id = p_organization_id
      and m.user_id = public.application_user_id()
      and m.role = any(p_roles)
  );
$$;

create or replace function public.ensure_application_user()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.users (auth_user_id, display_name, email)
  values (
    auth.uid(),
    coalesce(auth.jwt()->'user_metadata'->>'display_name', auth.jwt()->'user_metadata'->>'name', auth.jwt()->>'email', 'Talent Scout User'),
    auth.jwt()->>'email'
  )
  on conflict (auth_user_id) do update
  set email = coalesce(excluded.email, public.users.email),
      updated_at = now()
  returning id into v_user_id;

  return v_user_id;
end;
$$;

create or replace function public.create_organization(
  p_name text,
  p_region text default null,
  p_website text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_organization_id uuid;
  v_stage record;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  if btrim(coalesce(p_name, '')) = '' then
    raise exception 'Organization name is required';
  end if;

  v_user_id := public.ensure_application_user();

  insert into public.organizations (name, region, website)
  values (btrim(p_name), nullif(btrim(coalesce(p_region, '')), ''), nullif(btrim(coalesce(p_website, '')), ''))
  returning id into v_organization_id;

  insert into public.organization_memberships (organization_id, user_id, role)
  values (v_organization_id, v_user_id, 'owner');

  for v_stage in
    select * from (values
      ('discovered', 'Discovered', 10, false),
      ('under-review', 'Under Review', 20, false),
      ('approved-for-outreach', 'Approved for Outreach', 30, false),
      ('contacted', 'Contacted', 40, false),
      ('responded', 'Responded', 50, false),
      ('interested', 'Interested', 60, false),
      ('application', 'Application', 70, false),
      ('interview', 'Interview', 80, false),
      ('selected', 'Selected', 90, true),
      ('rejected', 'Rejected', 100, true),
      ('archived', 'Archived', 110, true),
      ('chapter-launched', 'Chapter Launched', 120, true)
    ) as stages(stage_key, name, sort_order, is_terminal)
  loop
    insert into public.pipeline_stages (organization_id, stage_key, name, sort_order, is_terminal)
    values (v_organization_id, v_stage.stage_key, v_stage.name, v_stage.sort_order, v_stage.is_terminal);
  end loop;

  return v_organization_id;
end;
$$;

grant select, insert, update, delete on table public.organizations to authenticated;
grant select, insert, update, delete on table public.users to authenticated;
grant select, insert, update, delete on table public.organization_memberships to authenticated;
grant select, insert, update, delete on table public.campaigns to authenticated;
grant select, insert, update, delete on table public.candidates to authenticated;
grant select, insert, update, delete on table public.campaign_candidates to authenticated;
grant select, insert, update, delete on table public.pipeline_stages to authenticated;
grant select, insert, update, delete on table public.candidate_pipeline_entries to authenticated;
grant select, insert, update, delete on table public.candidate_skills to authenticated;
grant select, insert, update, delete on table public.candidate_experiences to authenticated;
grant select, insert, update, delete on table public.candidate_evidence to authenticated;
grant select, insert, update, delete on table public.candidate_notes to authenticated;
grant select, insert, update, delete on table public.candidate_contact_preferences to authenticated;

revoke all on table public.organizations from anon;
revoke all on table public.users from anon;
revoke all on table public.organization_memberships from anon;
revoke all on table public.campaigns from anon;
revoke all on table public.candidates from anon;
revoke all on table public.campaign_candidates from anon;
revoke all on table public.pipeline_stages from anon;
revoke all on table public.candidate_pipeline_entries from anon;
revoke all on table public.candidate_skills from anon;
revoke all on table public.candidate_experiences from anon;
revoke all on table public.candidate_evidence from anon;
revoke all on table public.candidate_notes from anon;
revoke all on table public.candidate_contact_preferences from anon;

revoke all on function public.application_user_id() from public;
revoke all on function public.is_organization_member(uuid) from public;
revoke all on function public.has_organization_role(uuid, text[]) from public;
revoke all on function public.ensure_application_user() from public;
revoke all on function public.create_organization(text, text, text) from public;

grant execute on function public.application_user_id() to authenticated;
grant execute on function public.is_organization_member(uuid) to authenticated;
grant execute on function public.has_organization_role(uuid, text[]) to authenticated;
grant execute on function public.ensure_application_user() to authenticated;
grant execute on function public.create_organization(text, text, text) to authenticated;

alter table public.candidate_skills enable row level security;
alter table public.candidate_experiences enable row level security;
alter table public.candidate_evidence enable row level security;
alter table public.candidate_notes enable row level security;
alter table public.candidate_contact_preferences enable row level security;

drop policy if exists organizations_select_members on public.organizations;
drop policy if exists organizations_update_admin on public.organizations;
drop policy if exists organizations_delete_owner on public.organizations;
drop policy if exists users_select_self on public.users;
drop policy if exists users_update_self on public.users;
drop policy if exists memberships_select_org on public.organization_memberships;
drop policy if exists memberships_manage_admin on public.organization_memberships;
drop policy if exists memberships_update_admin on public.organization_memberships;
drop policy if exists memberships_delete_admin on public.organization_memberships;
drop policy if exists campaigns_select on public.campaigns;
drop policy if exists campaigns_insert on public.campaigns;
drop policy if exists campaigns_update on public.campaigns;
drop policy if exists campaigns_delete on public.campaigns;
drop policy if exists candidates_select on public.candidates;
drop policy if exists candidates_insert on public.candidates;
drop policy if exists candidates_update on public.candidates;
drop policy if exists candidates_delete on public.candidates;
drop policy if exists campaign_candidates_select on public.campaign_candidates;
drop policy if exists campaign_candidates_insert on public.campaign_candidates;
drop policy if exists campaign_candidates_update on public.campaign_candidates;
drop policy if exists campaign_candidates_delete on public.campaign_candidates;
drop policy if exists pipeline_stages_select on public.pipeline_stages;
drop policy if exists pipeline_stages_manage on public.pipeline_stages;
drop policy if exists pipeline_entries_select on public.candidate_pipeline_entries;
drop policy if exists candidate_skills_select on public.candidate_skills;
drop policy if exists candidate_skills_write on public.candidate_skills;
drop policy if exists candidate_experiences_select on public.candidate_experiences;
drop policy if exists candidate_experiences_write on public.candidate_experiences;
drop policy if exists candidate_evidence_select on public.candidate_evidence;
drop policy if exists candidate_evidence_write on public.candidate_evidence;
drop policy if exists candidate_notes_select on public.candidate_notes;
drop policy if exists candidate_notes_write on public.candidate_notes;
drop policy if exists candidate_contact_select on public.candidate_contact_preferences;
drop policy if exists candidate_contact_write on public.candidate_contact_preferences;

create policy organizations_select_members on public.organizations
for select to authenticated
using (public.is_organization_member(id));

create policy organizations_update_admin on public.organizations
for update to authenticated
using (public.has_organization_role(id, array['owner','administrator']))
with check (public.has_organization_role(id, array['owner','administrator']));

create policy organizations_delete_owner on public.organizations
for delete to authenticated
using (public.has_organization_role(id, array['owner']));

create policy users_select_self on public.users
for select to authenticated
using (id = public.application_user_id());

create policy users_update_self on public.users
for update to authenticated
using (id = public.application_user_id())
with check (id = public.application_user_id());

create policy memberships_select_org on public.organization_memberships
for select to authenticated
using (public.is_organization_member(organization_id));

create policy memberships_manage_admin on public.organization_memberships
for insert to authenticated
with check (public.has_organization_role(organization_id, array['owner','administrator']));

create policy memberships_update_admin on public.organization_memberships
for update to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']))
with check (public.has_organization_role(organization_id, array['owner','administrator']));

create policy memberships_delete_admin on public.organization_memberships
for delete to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']));

create policy campaigns_select on public.campaigns
for select to authenticated
using (public.is_organization_member(organization_id));

create policy campaigns_insert on public.campaigns
for insert to authenticated
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy campaigns_update on public.campaigns
for update to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy campaigns_delete on public.campaigns
for delete to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']));

create policy candidates_select on public.candidates
for select to authenticated
using (public.is_organization_member(organization_id));

create policy candidates_insert on public.candidates
for insert to authenticated
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy candidates_update on public.candidates
for update to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy candidates_delete on public.candidates
for delete to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']));

create policy campaign_candidates_select on public.campaign_candidates
for select to authenticated
using (public.is_organization_member(organization_id));

create policy campaign_candidates_insert on public.campaign_candidates
for insert to authenticated
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy campaign_candidates_update on public.campaign_candidates
for update to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy campaign_candidates_delete on public.campaign_candidates
for delete to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']));

create policy pipeline_stages_select on public.pipeline_stages
for select to authenticated
using (public.is_organization_member(organization_id));

create policy pipeline_stages_manage on public.pipeline_stages
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator']))
with check (public.has_organization_role(organization_id, array['owner','administrator']));

create policy pipeline_entries_select on public.candidate_pipeline_entries
for select to authenticated
using (public.is_organization_member(organization_id));

create policy candidate_skills_select on public.candidate_skills
for select to authenticated
using (public.is_organization_member(organization_id));
create policy candidate_skills_write on public.candidate_skills
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy candidate_experiences_select on public.candidate_experiences
for select to authenticated
using (public.is_organization_member(organization_id));
create policy candidate_experiences_write on public.candidate_experiences
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy candidate_evidence_select on public.candidate_evidence
for select to authenticated
using (public.is_organization_member(organization_id));
create policy candidate_evidence_write on public.candidate_evidence
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

create policy candidate_notes_select on public.candidate_notes
for select to authenticated
using (public.is_organization_member(organization_id));
create policy candidate_notes_write on public.candidate_notes
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter','reviewer']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter','reviewer']));

create policy candidate_contact_select on public.candidate_contact_preferences
for select to authenticated
using (public.is_organization_member(organization_id));
create policy candidate_contact_write on public.candidate_contact_preferences
for all to authenticated
using (public.has_organization_role(organization_id, array['owner','administrator','recruiter']))
with check (public.has_organization_role(organization_id, array['owner','administrator','recruiter']));

drop function if exists public.move_campaign_candidate_stage(uuid, uuid, uuid, text);

create or replace function public.move_campaign_candidate_stage(
  p_campaign_candidate_id uuid,
  p_pipeline_stage_id uuid,
  p_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_id uuid;
  v_organization_id uuid;
  v_stage_organization_id uuid;
  v_current_entry_id uuid;
  v_new_entry_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select u.id into v_actor_id
  from public.users u
  where u.auth_user_id = auth.uid()
  limit 1;

  if v_actor_id is null then
    raise exception 'Application user not found';
  end if;

  select cc.organization_id into v_organization_id
  from public.campaign_candidates cc
  where cc.id = p_campaign_candidate_id;

  if v_organization_id is null then
    raise exception 'Campaign-candidate relationship not found';
  end if;

  if not public.has_organization_role(v_organization_id, array['owner','administrator','recruiter','reviewer']) then
    raise exception 'Not authorized to move this candidate';
  end if;

  select ps.organization_id into v_stage_organization_id
  from public.pipeline_stages ps
  where ps.id = p_pipeline_stage_id;

  if v_stage_organization_id is null then
    raise exception 'Pipeline stage not found';
  end if;

  if v_stage_organization_id is distinct from v_organization_id then
    raise exception 'Pipeline stage belongs to a different organization';
  end if;

  select cpe.id into v_current_entry_id
  from public.candidate_pipeline_entries cpe
  where cpe.campaign_candidate_id = p_campaign_candidate_id
    and cpe.exited_at is null
  for update;

  if v_current_entry_id is not null then
    update public.candidate_pipeline_entries
    set exited_at = now()
    where id = v_current_entry_id;
  end if;

  insert into public.candidate_pipeline_entries (
    organization_id,
    campaign_candidate_id,
    pipeline_stage_id,
    entered_at,
    changed_by,
    note
  ) values (
    v_organization_id,
    p_campaign_candidate_id,
    p_pipeline_stage_id,
    now(),
    v_actor_id,
    p_note
  )
  returning id into v_new_entry_id;

  return v_new_entry_id;
end;
$$;

revoke all on function public.move_campaign_candidate_stage(uuid, uuid, text) from public;
revoke all on function public.move_campaign_candidate_stage(uuid, uuid, text) from anon;
grant execute on function public.move_campaign_candidate_stage(uuid, uuid, text) to authenticated;
