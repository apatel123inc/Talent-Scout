insert into public.organizations (id, name, region, website)
values ('11111111-1111-4111-8111-111111111111', 'Bright Beginnings Canada', 'Canada', 'https://example.org')
on conflict (id) do update
set name = excluded.name,
    region = excluded.region,
    website = excluded.website;

insert into public.pipeline_stages (organization_id, stage_key, name, sort_order, is_terminal)
values
  ('11111111-1111-4111-8111-111111111111', 'discovered', 'Discovered', 10, false),
  ('11111111-1111-4111-8111-111111111111', 'under-review', 'Under Review', 20, false),
  ('11111111-1111-4111-8111-111111111111', 'approved-for-outreach', 'Approved for Outreach', 30, false),
  ('11111111-1111-4111-8111-111111111111', 'contacted', 'Contacted', 40, false),
  ('11111111-1111-4111-8111-111111111111', 'responded', 'Responded', 50, false),
  ('11111111-1111-4111-8111-111111111111', 'interested', 'Interested', 60, false),
  ('11111111-1111-4111-8111-111111111111', 'application', 'Application', 70, false),
  ('11111111-1111-4111-8111-111111111111', 'interview', 'Interview', 80, false),
  ('11111111-1111-4111-8111-111111111111', 'selected', 'Selected', 90, true),
  ('11111111-1111-4111-8111-111111111111', 'rejected', 'Rejected', 100, true),
  ('11111111-1111-4111-8111-111111111111', 'archived', 'Archived', 110, true),
  ('11111111-1111-4111-8111-111111111111', 'chapter-launched', 'Chapter Launched', 120, true)
on conflict (organization_id, stage_key) do update
set name = excluded.name,
    sort_order = excluded.sort_order,
    is_terminal = excluded.is_terminal;

insert into public.campaigns (id, organization_id, name, position, description, status, start_date)
values
  ('21111111-1111-4111-8111-111111111111', '11111111-1111-4111-8111-111111111111', 'Youth leadership — GTA', 'University Chapter Founder', 'Recruit student leaders to establish GTA university chapters.', 'active', date '2026-11-04'),
  ('22222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', 'University ambassadors', 'Campus Ambassador', 'Build an ambassador network for campus awareness and outreach.', 'active', date '2026-10-21'),
  ('23333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', 'Community mentor network', 'Community Mentor', 'Identify mentors for family education and youth programming.', 'draft', date '2026-11-18'),
  ('24444444-4444-4444-8444-444444444444', '11111111-1111-4111-8111-111111111111', 'Fall chapter founders', 'Chapter Founder', 'Support the launch of a fall chapter founder cohort.', 'completed', date '2026-09-08')
on conflict (id) do update
set organization_id = excluded.organization_id,
    name = excluded.name,
    position = excluded.position,
    description = excluded.description,
    status = excluded.status,
    start_date = excluded.start_date;

insert into public.candidates (
  id, organization_id, name, initials, role, organization_name,
  location, leadership, program, graduation_year,
  match_score, review_status
)
values
  ('31111111-1111-4111-8111-111111111111', '11111111-1111-4111-8111-111111111111', 'Maya Chen', 'MC', 'Student Union Lead', 'University of Toronto', 'Toronto, ON', '4 years', null, null, 94, 'approved'),
  ('32222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', 'Jordan Ellis', 'JE', 'Volunteer Coordinator', 'Ryerson Community Hub', 'Toronto, ON', '3 years', null, null, 91, 'pending'),
  ('33333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', 'Samira Patel', 'SP', 'Program Council Chair', 'York University', 'Vaughan, ON', '5 years', null, null, 88, 'approved'),
  ('34444444-4444-4444-8444-444444444444', '11111111-1111-4111-8111-111111111111', 'Alex Morgan', 'AM', 'Peer Support Lead', 'Centennial College', 'Scarborough, ON', '2 years', null, null, 86, 'needs_review'),
  ('35555555-5555-4555-8555-555555555555', '11111111-1111-4111-8111-111111111111', 'Taylor Brooks', 'TB', 'Student Ambassador', 'George Brown College', 'Toronto, ON', '3 years', null, null, 84, 'approved'),
  ('36666666-6666-4666-8666-666666666666', '11111111-1111-4111-8111-111111111111', 'Riley Thompson', 'RT', 'Campus Club Founder', 'Western University', 'London, ON', '4 years', null, null, 82, 'pending'),
  ('37777777-7777-4777-8777-777777777777', '11111111-1111-4111-8111-111111111111', 'Priya Sharma', 'PS', 'Community Mentor', 'McMaster University', 'Hamilton, ON', '3 years', null, null, 79, 'pending'),
  ('38888888-8888-4888-8888-888888888888', '11111111-1111-4111-8111-111111111111', 'Noah Williams', 'NW', 'Youth Advisory Member', 'Toronto Public Library', 'Toronto, ON', '2 years', null, null, 77, 'approved')
on conflict (id) do update
set organization_id = excluded.organization_id,
    name = excluded.name,
    initials = excluded.initials,
    role = excluded.role,
    organization_name = excluded.organization_name,
    location = excluded.location,
    leadership = excluded.leadership,
    program = excluded.program,
    graduation_year = excluded.graduation_year,
    match_score = excluded.match_score,
    review_status = excluded.review_status;

-- Seeded campaign-candidate relationships intentionally create no duplicate rows.
-- Their trigger creates the initial pipeline entry only on a new relationship.
insert into public.campaign_candidates (id, organization_id, campaign_id, candidate_id)
values
  ('41111111-1111-4111-8111-111111111111', '11111111-1111-4111-8111-111111111111', '21111111-1111-4111-8111-111111111111', '31111111-1111-4111-8111-111111111111'),
  ('42222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', '21111111-1111-4111-8111-111111111111', '32222222-2222-4222-8222-222222222222'),
  ('43333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', '21111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333333'),
  ('44444444-4444-4444-8444-444444444444', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '35555555-5555-4555-8555-555555555555')
on conflict (campaign_id, candidate_id) do nothing;
