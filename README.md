# Talent Scout

Talent Scout is a frontend-first recruitment workspace for discovering, evaluating, and managing candidates. Its initial use case is Bright Beginnings Canada, a nonprofit recruiting university students to establish youth-led chapters.

## Current status

The repository contains a polished frontend prototype and backend-readiness documentation. Candidate and campaign changes are stored in React state and reset when the page is refreshed. No real database or authentication is connected yet.

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- GitHub
- Future backend: PostgreSQL or Supabase

## Development principles

- Candidate data is fictional during development.
- Human recruiters remain responsible for evaluation decisions.
- Candidate discovery must use authorized or voluntarily provided sources only.
- No unauthorized LinkedIn scraping or automated invitations/messages are permitted.
- Secrets and private candidate information must never be committed.

## Getting started

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Routes

- `/` — marketing landing page
- `/dashboard` — recruitment overview
- `/dashboard/candidates` — candidate search, filtering, sorting, and profile preview
- `/dashboard/candidates/[id]` — candidate detail view
- `/dashboard/campaigns` — campaign management
- `/dashboard/pipeline` — candidate stage management
- `/dashboard/analytics` — fictional recruitment analytics
- `/dashboard/settings` — organization, account, notification, and privacy settings

## Architecture

Mock domain data is kept in `src/data`. UI components use typed interfaces and client-side state. API routes and database access will be introduced only after audit approval.

## Roadmap

1. Complete frontend prototype and audit.
2. Implement PostgreSQL or Supabase persistence.
3. Add authentication and organization isolation.
4. Add authorized candidate sources and evidence workflows.
5. Integrate human-reviewed AI assistance.
6. Deploy and add subscriptions if required.
