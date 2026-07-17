# 02 — Technical Architecture
## SaaS Project Management Platform

---

## 1. Architecture Overview

Monolith. One Next.js application handles both the marketing site and the product. No microservices. No separate backend service.

The application has three surfaces:
- **Marketing site** — public pages (homepage, pricing, changelog). Static or ISR rendered.
- **Product app** — authenticated, real-time, server + client rendered. Lives at `/app/*`.
- **API routes** — Next.js API routes for webhooks (Stripe, Supabase) and server-side mutations.

Supabase handles: PostgreSQL database, row-level security, authentication, and real-time subscriptions. We do not run our own database server.

---

## 2. Tech Stack

| Layer | Choice | What we are NOT using |
|-------|--------|----------------------|
| Framework | Next.js 14 App Router | Create React App, Remix, Vite |
| Language | TypeScript strict | JavaScript |
| Styling | Tailwind CSS v3 + CSS variables | CSS Modules, styled-components, Emotion |
| Components | Radix UI primitives + custom | shadcn/ui (too opinionated for our design), MUI, Chakra |
| State | Zustand (client), TanStack Query (server) | Redux, Jotai, SWR |
| Forms | React Hook Form + Zod | Formik, native forms |
| Database | Supabase (PostgreSQL) | PlanetScale, Neon, self-hosted Postgres |
| ORM | Supabase client (typed) + raw SQL for complex queries | Prisma, Drizzle |
| Auth | Supabase Auth | NextAuth, Clerk, Auth0 |
| Real-time | Supabase Realtime | Pusher, Ably, custom WebSocket |
| Payments | Stripe | Paddle, Lemon Squeezy |
| Email | Resend | SendGrid, Postmark |
| Hosting | Vercel | AWS, Railway, Fly.io |
| Monitoring | Vercel Analytics + Sentry | Datadog, New Relic |
| Icons | Lucide | Heroicons, Font Awesome |

---

## 3. System Diagram

```
Browser
  │
  ├── Static assets (Vercel Edge CDN)
  │
  └── Next.js App (Vercel Serverless + Edge)
        │
        ├── /app/* (authenticated product)
        │     ├── Server Components (data fetching)
        │     └── Client Components (interactivity, real-time)
        │
        ├── / (marketing pages, ISR)
        │
        └── /api/* (webhooks only)
              │
              ├── Supabase (PostgreSQL + Auth + Realtime)
              │     └── Row Level Security on all tables
              │
              ├── Stripe (billing, webhooks)
              │
              └── Resend (transactional email)
```

---

## 4. Data Flow Patterns

**Issue list load:**
1. User navigates to `/app/[workspace]/team/[team]/issues`
2. Server Component fetches issues via Supabase client (server-side, uses service key)
3. RLS policies verified server-side — user only sees their team's issues
4. Page renders with data, no loading spinner for initial load
5. Client Component subscribes to Supabase Realtime channel for live updates
6. When another user updates an issue, Realtime pushes event, TanStack Query cache invalidated, UI updates

**Issue creation:**
1. User presses C, creation modal opens (client-side, no network request)
2. User fills form, presses Enter
3. React Hook Form validates with Zod schema client-side
4. Supabase client `.insert()` called from client component
5. RLS policy verifies user is member of the workspace
6. Optimistic update: issue appears in list immediately
7. Realtime broadcasts to all subscribers — other users see it appear
8. On error: optimistic update rolled back, error toast shown

**Stripe webhook:**
1. Stripe sends event to `/api/webhooks/stripe`
2. Webhook signature verified
3. Event type matched (e.g. `customer.subscription.updated`)
4. Supabase workspace record updated with new plan
5. 200 returned to Stripe

---

## 5. Database Design

**Core tables:**

```sql
-- Workspaces (top-level container)
workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  plan text DEFAULT 'free' CHECK (plan IN ('free','basic','business')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)

-- Members (workspace membership)
workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner','admin','member','viewer')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, user_id)
)

-- Teams (sub-groups within a workspace)
teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  identifier text NOT NULL, -- e.g. "ENG" for issue IDs like ENG-42
  created_at timestamptz DEFAULT now()
)

-- Issues (core entity)
issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  number integer NOT NULL, -- sequential per team: ENG-1, ENG-2
  title text NOT NULL,
  description text, -- markdown
  status text DEFAULT 'backlog' CHECK (status IN ('backlog','todo','in_progress','in_review','done','cancelled')),
  priority text DEFAULT 'no_priority' CHECK (priority IN ('urgent','high','medium','low','no_priority')),
  assignee_id uuid REFERENCES auth.users(id),
  creator_id uuid REFERENCES auth.users(id),
  cycle_id uuid REFERENCES cycles(id),
  project_id uuid REFERENCES projects(id),
  parent_id uuid REFERENCES issues(id), -- sub-issues, one level only
  due_date date,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(team_id, number)
)

-- Cycles (time-boxed sprints)
cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('upcoming','active','completed')),
  created_at timestamptz DEFAULT now()
)

-- Projects
projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id),
  initiative_id uuid REFERENCES initiatives(id),
  name text NOT NULL,
  description text,
  status text DEFAULT 'planned' CHECK (status IN ('planned','in_progress','paused','completed','cancelled')),
  start_date date,
  target_date date,
  created_at timestamptz DEFAULT now()
)

-- Initiatives
initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
)

-- Comments
comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid REFERENCES issues(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)

-- Activity log
activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid REFERENCES issues(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL, -- 'status_changed', 'assignee_changed', 'comment_added', etc.
  from_value text,
  to_value text,
  created_at timestamptz DEFAULT now()
)

-- Labels
labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL, -- hex
  created_at timestamptz DEFAULT now()
)

-- Issue labels (many-to-many)
issue_labels (
  issue_id uuid REFERENCES issues(id) ON DELETE CASCADE,
  label_id uuid REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (issue_id, label_id)
)
```

**Schema patterns:**
- All IDs are UUIDs (`gen_random_uuid()`)
- All tables have `created_at timestamptz DEFAULT now()`
- Mutable tables have `updated_at timestamptz DEFAULT now()` — update via trigger
- Soft deletes: NOT used. Hard delete with CASCADE. Data recovery via Supabase backups.
- Money: not stored in v1 (Stripe owns all billing data)
- Phone numbers: not stored in v1

**Critical indexes:**
```sql
CREATE INDEX issues_team_id_status ON issues(team_id, status);
CREATE INDEX issues_workspace_id ON issues(workspace_id);
CREATE INDEX issues_assignee_id ON issues(assignee_id);
CREATE INDEX issues_cycle_id ON issues(cycle_id);
CREATE INDEX issues_updated_at ON issues(updated_at DESC);
CREATE INDEX activity_issue_id ON activity(issue_id);
CREATE INDEX workspace_members_user_id ON workspace_members(user_id);
```

**RLS summary:**
- All tables have RLS enabled
- workspace_members is the source of truth for access
- A user can only see/modify records where they are a member of the workspace

---

## 6. Authentication and Authorization

**Customer auth (team members):**
- Supabase Auth with email + password
- Magic link as fallback
- No OAuth in v1 (Google SSO deferred to v2)
- Session stored in httpOnly cookie via Supabase SSR helpers

**Role model:**

| Role | Can do |
|------|--------|
| owner | Everything. One per workspace. Cannot be removed. |
| admin | Manage members, teams, settings. Cannot delete workspace. |
| member | Create/edit/delete own issues. Update any issue in their teams. |
| viewer | Read-only access to all workspace data. |

**Authorization implementation:**
- RLS policies enforce data access at the database level — the application layer trusts the database
- Server Components use the Supabase server client (validates JWT)
- Client Components use the Supabase browser client (validates JWT in cookie)
- API routes verify JWT before any operation

---

## 7. API Design

Style: REST via Next.js API routes. Used only for webhooks. All product data operations go through Supabase client directly (with RLS).

**Webhook routes:**
- `POST /api/webhooks/stripe` — Stripe events
- `POST /api/webhooks/supabase` — Supabase DB webhooks (if needed for notifications)

**Response envelope (for any custom API routes):**
```json
{
  "data": { ... },
  "error": null
}
```
or on error:
```json
{
  "data": null,
  "error": { "code": "NOT_FOUND", "message": "Issue not found" }
}
```

**Error codes:** NOT_FOUND, UNAUTHORIZED, FORBIDDEN, VALIDATION_ERROR, INTERNAL_ERROR

---

## 8. Real-Time Architecture

Supabase Realtime via PostgreSQL logical replication.

**Subscription patterns:**
- Per-team issue channel: `realtime:issues:team_id=eq.{teamId}`
- Per-issue comment channel: `realtime:comments:issue_id=eq.{issueId}`
- Per-workspace member channel: `realtime:workspace_members:workspace_id=eq.{workspaceId}`

**Client implementation:**
```typescript
// Subscribe to team issues
const channel = supabase
  .channel(`team-issues-${teamId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'issues',
    filter: `team_id=eq.${teamId}`
  }, (payload) => {
    queryClient.invalidateQueries({ queryKey: ['issues', teamId] })
  })
  .subscribe()
```

**Message ordering:** Supabase Realtime delivers events in order per channel. No additional ordering logic needed.

**Reconnection:** Supabase client handles reconnection automatically. On reconnect, re-fetch affected data to catch missed events.

---

## 9. Background Jobs

| Job | Trigger | Purpose |
|-----|---------|---------|
| Cycle auto-rollover | Cron, daily at 00:00 UTC | Move incomplete issues from ended cycles to backlog |
| Notification digest | Cron, daily at 08:00 workspace timezone | Send daily summary email if user has unread notifications |
| Stripe sync | Stripe webhook | Update workspace plan on subscription events |

Cron jobs run via Vercel Cron. Logic in `/app/api/cron/*` routes, protected by `CRON_SECRET` header.

---

## 10. Caching Strategy

**What we cache:**
- Static marketing pages: ISR with 1-hour revalidation
- User profile data: TanStack Query, 5-minute stale time
- Workspace settings: TanStack Query, 10-minute stale time

**What we do NOT cache:**
- Issue lists — always fresh, real-time subscriptions handle updates
- Cycle data — changes too frequently
- Notifications — must be real-time

**Cache layer:** TanStack Query on client. No Redis. No custom cache server.

---

## 11. Security Considerations

**Threat model:**
- Primary threat: unauthorised data access across workspaces
- Mitigation: RLS on every table, JWT validation on every request

**Data protection:**
- All data encrypted at rest (Supabase default)
- All traffic over HTTPS (Vercel default)
- Stripe handles all card data — we never see card numbers

**Secrets management:**
- All secrets in Vercel environment variables
- Never in code, never in `.env` committed to repo
- Separate values for dev/staging/prod

**GDPR:**
- User data deletion: delete from `auth.users` cascades to all user data
- Data export: `/api/user/export` endpoint returns JSON of all user data

---

## 12. Performance Targets

| Metric | Target | How measured |
|--------|--------|-------------|
| Homepage LCP | < 1.5s | Vercel Analytics |
| App initial load | < 2s | Vercel Analytics |
| Issue list load | < 500ms | TanStack Query timing |
| Issue creation | < 300ms (optimistic) | Perceived: instant |
| API P95 | < 200ms | Vercel function logs |
| Real-time delivery | < 300ms | Manual testing |
| Lighthouse score | 90+ all categories | CI check |

---

## 13. Deployment and Environments

**Environments:**

| Env | Branch | URL | Database |
|-----|--------|-----|----------|
| Production | main | app.domain.com | Supabase prod project |
| Staging | staging | staging.domain.com | Supabase staging project |
| Development | local | localhost:3000 | Supabase local (Docker) |

**Deployment flow:**
1. Push to feature branch
2. Vercel preview deployment created automatically
3. PR review + merge to staging
4. Staging deployment, manual smoke test
5. Merge to main → production deployment
6. Database migrations run via `supabase db push` before deployment

**Migration strategy:** Supabase migrations in `/supabase/migrations/`. Always backwards-compatible — no breaking migrations without a transition period.

---

## 14. Observability

**Logging:** Vercel function logs for API routes. `console.error` for unexpected errors only — not for expected validation failures.

**Error tracking:** Sentry for client and server. Alert on new error types only — not on volume.

**Metrics:** Vercel Analytics for Web Vitals. Supabase dashboard for database metrics.

**Alerting:** Sentry email alerts for P1 errors. Vercel email alerts for deployment failures.

---

## 15. Open Architectural Questions

- AQ1: Should we use Supabase Edge Functions for any server-side logic, or keep everything in Next.js API routes? Decision: Next.js API routes only for now — simpler deployment.
- AQ2: Is Supabase Realtime sufficient for the real-time requirements, or do we need a dedicated WebSocket server? Decision: Supabase Realtime is sufficient for v1 team sizes (under 50 concurrent users per workspace).

---

## 16. Decision Records

**ADR-001: Supabase over self-hosted PostgreSQL**
Decision: Use Supabase managed PostgreSQL.
Reasoning: Auth, RLS, and Realtime come built-in. Self-hosting adds operational overhead we cannot afford in v1. Cost is acceptable at v1 scale.
Trade-off: Less control over database configuration. Accepted.

**ADR-002: No custom ORM**
Decision: Use Supabase typed client for simple queries, raw SQL for complex queries.
Reasoning: Prisma adds a migration layer that conflicts with Supabase's own migration tooling. Drizzle is good but adds another abstraction. Supabase client is typed and sufficient for our query complexity.
Trade-off: Less type safety on raw SQL queries. Mitigated by Zod validation on all query results.

**ADR-003: Radix UI over shadcn/ui**
Decision: Use Radix UI primitives directly, not the shadcn/ui wrapper.
Reasoning: Our design system is custom and precise. shadcn/ui's default styles would be overridden entirely, making it dead weight. Radix primitives give us accessibility without visual opinions.
Trade-off: More CSS work upfront. Accepted — the design is the product.
