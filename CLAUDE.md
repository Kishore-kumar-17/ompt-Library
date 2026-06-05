# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

Monorepo with two independent workspaces:
- `backend/` — Hono.js REST API (Node.js + TypeScript)
- `frontend/` — React 18 SPA (Vite + TypeScript)

## Commands

### Backend (`cd backend`)
```bash
npm run dev          # Start dev server with hot-reload (tsx watch)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled output

npm run db:generate  # Generate Drizzle migration files
npm run db:migrate   # Run pending migrations
npm run db:push      # Push schema directly to DB (no migration files)
npm run db:studio    # Open Drizzle Studio GUI
```

### Frontend (`cd frontend`)
```bash
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Build to dist/
```

Frontend uses pnpm (has `pnpm-workspace.yaml`), but `npm run` scripts still work.

## Environment Variables

**Backend** (`backend/.env`):
```
DATABASE_URL=postgresql://user:password@localhost:5432/promptvault
JWT_SECRET=change-me-to-a-long-random-string
PORT=3000
FRONTEND_URL=http://localhost:5173
ANTHROPIC_API_KEY=sk-ant-...
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:3000
```

## Backend Architecture

**Entry points:**
- Local dev: `backend/src/index.ts` → `backend/src/app.ts`
- Vercel serverless: `backend/api/index.ts` (rewrites all requests to this handler)

**API routes** (all prefixed `/api`):
| Mount | File | Purpose |
|---|---|---|
| `/api/auth` | `src/routes/auth.ts` | Register, login, `/me` |
| `/api/prompts` | `src/routes/prompts.ts` | Prompt CRUD, copy/save events |
| `/api/submissions` | `src/routes/submissions.ts` | Community prompt submissions |
| `/api/profile` | `src/routes/profile.ts` | User profile and stats |
| `/api/admin` | `src/routes/admin.ts` | Admin-only bulk CSV import |
| `/api/library` | `src/routes/prompt-library.ts` | Imported `pl_prompts` library |

**Auth middleware** (`src/middleware/auth.ts`):
- `requireAuth` — validates `Authorization: Bearer <jwt>` header; sets `c.get("user")` as `{ sub, isAdmin }`
- `requireAdmin` — must be chained after `requireAuth`; checks `isAdmin` flag
- JWTs are signed with HS256, expire in 7 days, using `jose`
- In dev, falls back to `"dev-secret"` if `JWT_SECRET` is unset

**Database** (`src/db/`):
- ORM: Drizzle ORM with `postgres` driver
- Schema: `src/db/schema.ts` — single source of truth for all table definitions
- IDs: `nanoid()` for user/prompt/submission IDs (21-char strings); `serial` for junction tables
- Full-text search on prompts uses PostgreSQL `tsvector`/`plainto_tsquery` with a GIN index

## Two Prompt Data Models

There are two distinct prompt datasets that do NOT share tables:

1. **Main prompts** — `prompts` table (Drizzle-managed schema). User-submitted and admin-created prompts with full lifecycle (`draft → pending → approved/rejected`). Served by `/api/prompts` and `/api/admin`.

2. **Library prompts** — `pl_prompts` table (externally imported, raw SQL). Pre-seeded image/video prompt library with `pl_prompt_platforms`, `pl_saved_prompts`, `pl_copy_events` tables. Served by `/api/library`. The route file uses raw `db.execute(sql\`...\`)` directly instead of Drizzle ORM table references. The `ensureLibraryActivityTables()` function lazily creates the activity tables on first use.

## Frontend Architecture

**Routing:** Custom string-based routing in `App.tsx`. No react-router. The `route` state string drives which page component renders:
- `"home"`, `"library"`, `"builder"`, `"improver"`, `"compare"`, `"dashboard"`, `"profile"`, `"submit"`, `"admin"`, `"guide"`, `"pricing"`
- `"detail:42"` or `"detail:42:midjourney"` — prompt detail with optional platform
- `"library:image"` — library filtered by family

**API client** (`src/app/lib/api.ts`):
- Single `apiFetch` wrapper that reads `pv_token` from localStorage and attaches `Authorization` header
- Organized into `authApi`, `promptsApi`, `submissionsApi`, `profileApi`, `libraryApi`
- Auth state stored in localStorage keys `pv_token` and `pv_user`

**UI stack:** Tailwind CSS v4 + shadcn/ui components (Radix UI primitives in `src/app/components/ui/`). MUI is also a dependency but shadcn/Radix components are the primary UI library used in pages.
