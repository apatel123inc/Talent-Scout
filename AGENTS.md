# AGENTS.md — Talent Scout

## Purpose

Talent Scout is an evidence-focused recruitment platform for organizations. The initial use case is Bright Beginnings Canada recruiting university chapter founders and community leaders.

## Before changes

1. Inspect the relevant route, component, data model, and tests.
2. Use one feature at a time for complex work.
3. Explain major implementation plans, files to change, and concepts involved.
4. Preserve existing work and never reset or force-push without explicit approval.
5. Avoid unrelated refactors.

## Standards

- Use Next.js App Router, React, TypeScript, and Tailwind CSS.
- Keep route files focused on composition and state.
- Use reusable components for repeated UI.
- Keep mock data and domain types in `src/data` or future `src/lib` modules.
- Use descriptive names and explicit TypeScript types.
- Add accessibility labels, keyboard-visible controls, semantic elements, and responsive layouts.
- Explain frontend/backend and database boundaries before introducing them.

## Security and privacy

- Never commit secrets, API keys, passwords, private keys, or real candidate records.
- Use fictional candidate data in development.
- Never implement unauthorized scraping, automated invitations, or unsolicited automated messaging.
- Future candidate and organization data must be isolated between organizations.
- AI assessments must remain evidence-based and subject to human approval.

## Validation

- Run the smallest relevant test or lint command.
- Run `npm run lint` and `npm run build` after frontend phases.
- Do not claim a feature works unless it was tested.
- Explain failures and fix them rather than hiding them.

## Git workflow

- Do not rewrite history or force-push.
- Inspect `git status` and diffs before committing.
- Commit with a useful message and include the requested Copilot co-author trailer.
- Push only after verification and remote authentication is available.
