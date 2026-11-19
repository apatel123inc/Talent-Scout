# Talent Scout Architecture Audit

## Route inventory

- `/` — marketing landing page.
- `/dashboard` — overview, metrics, pipeline summary, recent activity, recent candidates, and campaign performance.
- `/dashboard/candidates` — search, status filtering, sorting, profile preview, and navigation to details.
- `/dashboard/candidates/[id]` — candidate evidence, experience, skills, achievements, sources, notes, and outreach history.
- `/dashboard/campaigns` — campaign cards and frontend campaign creation.
- `/dashboard/pipeline` — full recruitment pipeline and stage changes.
- `/dashboard/analytics` — acquisition, response, conversion, pipeline, and campaign analytics.
- `/dashboard/settings` — organization, profile, account, notifications, and general settings.

## Component inventory

- Dashboard shell provides desktop/mobile navigation, top search, notifications, profile, and main content.
- Metric cards, status badges, and dashboard icons provide shared presentation primitives.
- The landing page contains navigation, hero, feature, workflow, preview, target organization, and footer sections.
- Candidate, campaign, pipeline, analytics, and settings routes implement their own frontend behavior.

## Data models

The primary mock models are candidate, candidate experience, candidate source, candidate note, campaign, outreach message, organization, activity, and candidate status. The data lives in `src/data/dashboard-data.ts`; `src/lib/mock-repository.ts` provides a framework-independent mock data-access boundary.

## Interactions

- Candidate search, filtering, sorting, selection, and detail navigation.
- Campaign creation in a client-side modal.
- Candidate movement through recruitment stages.
- Settings toggles and save feedback.
- Responsive sidebar and dashboard navigation.

All mutations are client-side and reset on refresh. This is intentionally a prototype, not persistence.

## Completed improvements

- Analytics and Settings are included in dashboard navigation.
- Candidates can be added through a frontend modal using fictional session state.
- Campaign cards can open a frontend detail view.
- Candidate detail routes include profile, evidence, experience, notes, sources, achievements, and outreach history.
- Pipeline stages include Interview, Selected, Rejected, and Archived.
- Campaign creation captures organization, position, target universities, qualifications, description, and status.
- The overview includes weekly acquisition and quick actions.
- Candidate sorting is available.

## Remaining frontend limitations

- Search and settings do not persist between refreshes.
- Campaign detail persistence and candidate profile editing are not yet implemented.
- Analytics charts use static illustrative arrays.
- There is no login or account authorization.
- The “Add candidate” and “View campaign” controls remain prototypes until backend workflows are defined.

## Architectural concerns

- React state is currently local to each route, so it cannot be shared reliably across candidate and pipeline views.
- Mock IDs are numeric and do not represent database behavior.
- Candidate and campaign records have no server-side organization ownership yet.
- A future repository implementation must replace mock functions without changing route components.
- Sensitive-profile fields and future AI evidence require careful minimization and audit logging.

## Phase 4 result

The frontend is ready for backend work, but authentication and database integration must be the next phase. Do not add AI APIs or candidate scraping as part of the persistence milestone.
