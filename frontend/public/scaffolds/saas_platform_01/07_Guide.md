# 07 — Engineering Guide
## SaaS Project Management Platform

---

## 1. Code Organisation

**Folder structure:**
```
src/
├── app/
│   ├── (auth)/           — login, signup pages (no shell)
│   ├── (app)/            — authenticated product (with shell)
│   │   └── [workspace]/  — workspace-scoped routes
│   ├── (marketing)/      — public pages (homepage, pricing)
│   └── api/              — webhooks and server actions only
├── components/
│   ├── layout/           — AppShell, Sidebar, TopBar
│   ├── issues/           — IssueList, IssueRow, IssueDetail, CreateIssueModal
│   ├── cycles/           — CycleView, CyclePicker, CreateCycleModal
│   ├── projects/         — ProjectView, CreateProjectModal
│   ├── comments/         — CommentBox, CommentList
│   ├── analytics/        — VelocityChart, AnalyticsView
│   ├── settings/         — MemberRow, WorkspaceSettings, DeleteAccount
│   ├── marketing/        — Hero, FeatureSection, PricingTable, Footer
│   ├── icons/            — StatusIcon, PriorityIcon (custom SVGs)
│   ├── editor/           — MarkdownEditor, MarkdownRenderer
│   └── ui/               — Button, Input, Modal, Toast, Avatar (primitives)
├── hooks/
│   ├── useKeyboardShortcuts.ts
│   ├── useListNavigation.ts
│   ├── useCommandPalette.ts
│   └── useRealtimeIssues.ts
├── lib/
│   ├── supabase/         — client.ts, server.ts, realtime.ts
│   ├── issues/           — create.ts, update.ts, delete.ts, queries.ts
│   ├── cycles/           — create.ts, assignIssue.ts, queries.ts
│   ├── billing/          — checkLimits.ts, stripe.ts
│   ├── notifications/    — create.ts, queries.ts
│   ├── activity/         — record.ts, queries.ts
│   ├── schemas/          — issue.ts, cycle.ts, project.ts (Zod schemas)
│   └── tokens.ts         — design token constants
└── types/
    └── database.ts       — generated Supabase types
```

**File naming:** kebab-case for files, PascalCase for components. One component per file. No barrel exports (`index.ts`) — import directly.

**When to create a new file:** When a component exceeds ~150 lines, or when logic is reused in more than one place. Do not extract prematurely.

---

## 2. TypeScript Conventions

**Use `interface` for object shapes, `type` for unions and computed types:**
```typescript
// interface for props and data shapes
interface Issue {
  id: string
  title: string
  status: IssueStatus
}

// type for unions
type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
```

**Strict mode is on. No `any`.** Use `unknown` and narrow. Use Zod to validate external data.

**Import order:**
1. React and Next.js
2. Third-party libraries
3. Internal `@/` imports (components, lib, hooks)
4. Types (always last)

**Never use `as unknown as T` to force types.** If you need to cast, the type is wrong.

---

## 3. React Conventions

**Server Components by default.** Only add `'use client'` when you need:
- `useState` or `useEffect`
- Browser APIs
- Event handlers
- Realtime subscriptions

**Component structure:**
```typescript
// 1. Types/interfaces
interface Props {
  issueId: string
  onClose: () => void
}

// 2. Component (named export, not default)
export function IssueDetail({ issueId, onClose }: Props) {
  // 3. Hooks at the top
  const [isEditing, setIsEditing] = useState(false)

  // 4. Derived values
  const canEdit = role !== 'viewer'

  // 5. Handlers
  function handleSave() { ... }

  // 6. Early returns (loading, error, empty)
  if (!issue) return <EmptyState />

  // 7. Main render
  return (...)
}
```

**Props naming:** Boolean props prefixed with `is`, `has`, `can`, `should`. Handler props prefixed with `on`. No abbreviations.

**State:** Local state in `useState`. Server state via TanStack Query. Global UI state (command palette open, sidebar collapsed) in Zustand. No Redux. No Context for data (only for theme, auth).

---

## 4. Database Conventions

**Naming:**
- Tables: `snake_case` plural (`issues`, `workspace_members`)
- Columns: `snake_case` (`created_at`, `assignee_id`)
- Foreign keys: `{table_singular}_id` (`issue_id`, `workspace_id`)
- Booleans: `is_` prefix (`is_archived`) — not used in v1 (we hard delete)

**Required columns on every table:** `id uuid`, `created_at timestamptz`
**Required on mutable tables:** `updated_at timestamptz` — always updated via trigger

**Updated_at trigger (apply to all mutable tables):**
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_issues_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Money:** Not stored in v1. Stripe owns all billing data.

**Phone numbers:** Not stored in v1.

**Soft deletes:** Not used. Hard delete with CASCADE. Recovery via Supabase point-in-time backups.

**Migrations:** One migration per logical change. Never edit an existing migration. Never write a migration that requires data transformation without a rollback plan.

---

## 5. API Conventions

API routes are for webhooks only. All product data operations go through Supabase client with RLS.

**Webhook route pattern:**
```typescript
// src/app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  // 1. Verify signature
  const signature = request.headers.get('stripe-signature')
  if (!signature) return new Response('Unauthorized', { status: 401 })

  // 2. Parse event
  const body = await request.text()
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

  // 3. Handle event type
  switch (event.type) {
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object)
      break
  }

  // 4. Return 200
  return new Response(null, { status: 200 })
}
```

**Response envelope for any custom routes:**
```typescript
{ data: T | null, error: { code: string, message: string } | null }
```

**Validation:** Zod on all inputs. Return 400 with error details on validation failure.

---

## 6. UI / Styling Conventions

**Tailwind only.** No inline `style` props except for dynamic values that cannot be expressed in Tailwind (e.g. calculated widths from JS).

**Colors always via CSS variables:**
```typescript
// Correct
className="bg-[var(--bg-surface)] text-[var(--text-primary)]"

// Wrong
className="bg-[#141517] text-[#E4E5E9]"
```

**Conditional classes — use `clsx`:**
```typescript
import { clsx } from 'clsx'

className={clsx(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}
```

**Never use `@apply` in CSS.** Keep styles in JSX.

**Component variants — use a variants map:**
```typescript
const buttonVariants = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white',
  secondary: 'bg-[var(--bg-hover)] text-[var(--text-primary)]',
  ghost: 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
}
```

---

## 7. Forms

**Library:** React Hook Form + Zod via `@hookform/resolvers/zod`.

**Validation timing:** On submit for first submission. On change after first error.

**UX pattern:**
- Inline error messages below the field (not at top of form)
- Error text: `text-[var(--destructive)] text-[13px] mt-1`
- Required fields: no asterisk — all fields are either obviously required or obviously optional
- Submit button: disabled and shows loading spinner during submission
- On error from server: error shown in a toast, form stays open

```typescript
const schema = z.object({
  title: z.string().min(1, 'Title is required').max(256, 'Title too long'),
  priority: z.enum(['urgent','high','medium','low','no_priority']).default('no_priority'),
})

type FormValues = z.infer<typeof schema>
```

---

## 8. Authentication and Authorization

**Where checks happen:**
- `middleware.ts` — redirect unauthenticated users to login for all `/app/*` routes
- Server Components — use server Supabase client to verify session, redirect if none
- RLS — enforces all data access at the database level. The application trusts the database.
- Client Components — do not perform security checks; rely on RLS

**Never bypass RLS.** Never use the service role key in client-side code. Service key is used only in API routes where RLS is intentionally bypassed (webhook handlers, cron jobs).

**Session helper pattern:**
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
}
```

---

## 9. Testing

**What to test in v1:** Nothing automated. Manual smoke tests only.

**Manual smoke test after each task:**
1. Happy path works
2. Obvious error case handled (empty input, network error) without crash
3. No console errors in browser

**Automated tests deferred to v2.** When added, use Playwright for e2e. Vitest for utility functions only.

**Test naming convention (for future):** `should [do thing] when [condition]`

---

## 10. Logging and Observability

**Log this:**
- `console.error` for unexpected errors in API routes and server actions
- Sentry `captureException` for errors in catch blocks

**Never log:**
- User passwords, tokens, or session data
- PII (names, emails) in server logs
- Stripe payment details

**What Sentry captures automatically:** Unhandled exceptions, React error boundaries.

**Manual Sentry usage:**
```typescript
import * as Sentry from '@sentry/nextjs'

try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, { extra: { context: 'cycle-rollover-cron' } })
}
```

---

## 11. Performance

**React:**
- Server Components for all data fetching — no `useEffect` for data
- `Suspense` boundaries with skeleton fallbacks for async sections
- `useMemo` only when profiling shows a problem — not preemptively
- Virtual scrolling for issue list (use `@tanstack/virtual`)

**Database:**
- Never `SELECT *` — always name the columns you need
- All filters in `WHERE` clause must have an index — check before shipping
- Avoid N+1 queries — fetch related data in one query using Supabase's select with joins

**Images:**
- Always `<Image>` from Next.js, never `<img>`
- `priority` on above-the-fold images
- WebP format, sized to display size (no 4K images for 400px containers)

---

## 12. Internationalisation

**v1 scope:** English only. No i18n library. No localisation.

**v2 plan:** `next-intl` for string extraction. Translating to Hindi as first additional language.

**For now:** Keep all user-facing strings in component JSX directly. Do not abstract to a constants file (makes future extraction harder, not easier).

---

## 13. Indian Context — Specific Rules

**Money display (if ever shown):** Use `₹` symbol. Format: `₹1,23,456` (Indian comma system). Never show `.00` — round to nearest rupee for display.

**Phone numbers (not in v1):** When added, Indian format is +91 followed by 10 digits. Validate with regex: `/^\+91[6-9]\d{9}$/`.

**Dates and times:** Display in `DD MMM YYYY` format for dates (e.g. 14 Apr 2026). Relative times for recent events ("2 hours ago"). UTC internally, display in user's browser timezone.

**Addresses (not in v1):** When added — flat/house, street, area, city, state, PIN code format.

---

## 14. Naming Patterns

| Concept | Variable name | Type name |
|---------|-------------|-----------|
| Workspace | `workspace` | `Workspace` |
| Issue | `issue` | `Issue` |
| Issue status | `status` | `IssueStatus` |
| Cycle | `cycle` | `Cycle` |
| Project | `project` | `Project` |
| Workspace member | `member` | `WorkspaceMember` |
| User (auth) | `user` | `User` |
| Current user | `currentUser` | — |
| Loading state | `isLoading` | — |
| Error state | `error` | — |
| Handler for click | `handleClick` | — |
| Prop for click | `onClick` | — |

---

## 15. Common Mistakes to Avoid

- **Fetching data in `useEffect`** — use Server Components and TanStack Query instead
- **Using `any` to fix a type error** — narrow the type instead
- **`div` with `onClick`** — use `button` or `a` for all interactive elements
- **Checking for `null` with `== null`** — use `=== null` or optional chaining
- **Setting state in a loop** — batch updates or use `useReducer`
- **Closing over stale state in event listeners** — use `useRef` for values needed in event handlers
- **Importing server code in client components** — `lib/supabase/server.ts` is server-only, never import in `'use client'` files
- **Hardcoding hex values in className** — always use CSS variables
- **Not handling the loading and error states in TanStack Query** — always handle all three states (loading, error, data)

---

## 16. When to Ask Before Acting

Stop and ask the owner if:
- A requirement in the PRD seems to contradict another requirement
- Implementing a task would require adding a feature not listed in the PRD
- A third-party library needs to be added (any new dependency requires approval)
- A database migration would require deleting or transforming existing data
- The acceptance criterion for a task is ambiguous
- A task is estimated at more than 2x its original estimate

Do not ask about: code style choices covered by this guide, TypeScript errors with obvious fixes, Tailwind class ordering.

---

## 17. Updating This Guide

This document grows as the team encounters new patterns and footguns. When a new convention is established during build:

1. Add it to the relevant section of this guide
2. If it resolves an AQ in `02_Architecture.md` or a DQ in `03_Design.md`, update those files too
3. Note the date and the PR/task that motivated the change

The guide is a living document. An outdated guide is worse than no guide — keep it accurate.
