# PROJECT_RULES.md — Talent Scout Development Rulebook

## Learning and workflow

- Explain unfamiliar concepts before using them.
- Work on one feature or phase at a time.
- Provide an implementation plan before major changes.
- Explain important modified files and how the frontend, backend, and database communicate.
- Never delete or overwrite existing work without approval.
- Explain errors and validation failures honestly.
- Write tests for important pure behavior and workflows where the project supports them.

## Technology standards

- Next.js App Router
- React client components only when state or browser APIs are needed
- Strict TypeScript with explicit domain interfaces
- Tailwind CSS for styling
- ESLint before completion
- PostgreSQL or Supabase as the future persistent database
- No paid or unnecessary services during initial frontend development

## File organization

- `src/app` contains routes and route-level composition.
- `src/components` contains reusable UI components.
- `src/data` contains typed mock/domain data.
- Future `src/lib` contains framework-independent helpers and data access abstractions.
- Future `src/app/api` contains server API endpoints only after persistence is implemented.
- Do not put large datasets or unrelated domain logic into route components.

## React and TypeScript

- Prefer small, reusable components.
- Use discriminated status unions where useful.
- Treat event types and form values explicitly.
- Keep derived state in `useMemo` instead of duplicating state when appropriate.
- Do not use `any` unless absolutely necessary and documented.
- Keep client components isolated to interactive leaves where possible.

## UI and accessibility

- Use semantic HTML and concise accessible labels.
- Show visible focus styles and preserve keyboard navigation.
- Provide a mobile navigation pattern and no horizontally inaccessible controls.
- Use consistent spacing, light surfaces, muted borders, and restrained color.
- Avoid unsupported AI-accuracy claims.
- Add loading, empty, and error states before real API integration.

## Data and multi-tenancy

- Define consistent User, Organization, Membership, Candidate, Experience, Skill, Note, Source, Campaign, Outreach, Pipeline Stage, Activity, and Analytics types.
- Organizations own their candidate and campaign records.
- Future database queries must always scope by organization membership.
- Authentication must not be the only trust boundary; authorization must be enforced by server-side queries and row-level security.
- No real candidate data is allowed during development.

## Security and privacy

- Never commit `.env` files, credentials, API keys, tokens, or private candidate records.
- Do not implement unauthorized LinkedIn scraping.
- Do not send automated connection requests or unsolicited automated messages.
- AI output must include evidence and require human review.
- Minimize personal candidate fields and support deletion/export requirements later.

## Error handling

- Prevent invalid form submissions.
- Preserve usable page state when filtering or selecting records.
- Surface validation and server errors near the relevant action.
- Never log secrets or sensitive candidate data.

## Git workflow

- Inspect status and diffs before editing and committing.
- Use `main` as the primary branch.
- Never force-push or overwrite an existing remote repository.
- Commit complete, validated work with useful messages.
- Include `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>` on commits.

## Backend readiness

- Keep UI components independent of database libraries.
- Centralize future data access behind typed repository functions.
- Do not introduce authentication, AI APIs, or Supabase until frontend behavior and data models are stable.
- Use server-only code for secrets and privileged operations.
