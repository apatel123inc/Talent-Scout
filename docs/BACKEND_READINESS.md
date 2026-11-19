# Backend Readiness Proposal

## Database and API concepts

A database stores persistent records. The backend contains server-side rules, and API routes provide controlled operations for the frontend. The browser calls an API; the API validates requests, checks authorization, and reads or writes the database.

## Recommended staged architecture

```text
Next.js frontend
  -> server actions or API routes
  -> PostgreSQL database
  -> Supabase authentication and optional storage
```

Supabase is the preferred long-term starting point because it combines PostgreSQL, authentication, storage, migrations, and dashboard tooling. It can avoid maintaining several separate services.

## SQLite vs PostgreSQL vs Supabase

- **SQLite:** useful for local development and simple single-server applications. It is not the best fit for a future multi-tenant SaaS hosted across multiple server instances.
- **PostgreSQL:** the best durable relational database choice. It supports organizations, memberships, audit records, constraints, and migrations.
- **Supabase:** managed PostgreSQL plus auth and row-level security. It is usually the most practical hosted option for this project, provided costs remain within the free tier and secrets remain server-side.

The likely first production architecture is Next.js hosted on Vercel or a similar platform, with Supabase PostgreSQL and authentication.

## Suggested data tables

- `organizations`
- `users`
- `organization_memberships`
- `candidates`
- `candidate_experiences`
- `candidate_skills`
- `candidate_sources`
- `candidate_notes`
- `campaigns`
- `campaign_candidates`
- `pipeline_stages`
- `candidate_pipeline_entries`
- `outreach_messages`
- `activities`
- `recruitment_snapshots`

Only the minimum necessary candidate fields should be collected. Personal data should be explicit, justified, and deletable.

## Multi-tenancy and access control

Every tenant-owned record should include `organization_id`. Users belong to organizations through memberships with roles such as owner, recruiter, or reviewer. Every server query must verify membership and role before reading or mutating data.

Supabase Row-Level Security (RLS) should enforce organization isolation as a database-level defense, while Next.js server code should also perform authorization checks. UI hiding is not authorization.

## API boundaries

Future API operations should include:

- Create/list/update candidates.
- List and create campaigns.
- Attach candidates to campaigns.
- Move candidates between pipeline stages.
- Add evidence and recruiter notes.
- Create outreach drafts.
- Read analytics derived from persisted data.

Mutating operations must be server-side. API keys, service-role credentials, and AI keys must never be exposed through `NEXT_PUBLIC_*` variables or client bundles.

## Authentication

Authentication will confirm identity. Organization membership and role checks will confirm authorization. A typical flow is: sign in, receive an authenticated user session, read the user's memberships, select an active organization, and scope every query to that organization.

## Candidate privacy and sourcing

Development must continue with fictional records. Production sourcing must be authorized or voluntarily provided. The platform should record source type and evidence, prevent unsupported assessments, and require human review. No unauthorized scraping or automated messaging should be added.

## AI integration

AI should initially produce draft summaries or outreach for human review. It must cite evidence, avoid unsupported conclusions, allow recruiter edits, and log which model and prompt version generated content. Real AI APIs should not be introduced until backend persistence and organization controls exist.

## Next milestone

Implement database persistence before authentication and advanced AI features:

1. Choose PostgreSQL/Supabase.
2. Create organizations, memberships, candidates, campaigns, and pipeline tables.
3. Add migrations and seed fictional data.
4. Replace mock repository functions with typed server data access.
5. Add authentication and organization membership checks.
6. Implement server-side authorization and RLS.
7. Add tests and privacy controls.
