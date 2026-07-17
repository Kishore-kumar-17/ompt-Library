# 06 — Task List
## SaaS Project Management Platform

---

## How to Use This File

**For the AI:** Find the first uncompleted task (checkbox `[ ]`). Implement it. Verify the acceptance criterion. Mark it `[x]`. Show a diff of all files created or modified. Then stop and wait for confirmation before moving to the next task.

**For the developer:** Add new tasks at the bottom of the relevant phase. Split tasks that turn out to be larger than estimated. Review completed tasks at the end of each phase — mark any that need rework.

**Task format:**
```
[ ] TASK-XXX — Short description
    Story: STORY-XXX
    Estimate: N hours
    Acceptance: One-line definition of done
    Files: src/path/to/file.ts, src/path/to/other.ts
```

---

## Phase 0 — Foundation

[ ] TASK-001 — Initialise Next.js 14 project with TypeScript strict, Tailwind, Radix UI, Lucide
    Story: STORY-001
    Estimate: 1h
    Acceptance: `npm run dev` runs, TypeScript reports zero errors
    Files: package.json, tsconfig.json, tailwind.config.ts, next.config.ts

[ ] TASK-002 — Configure CSS variables and design tokens in globals.css
    Story: STORY-001
    Estimate: 1h
    Acceptance: All color, spacing, and radius tokens from 03_Design.md defined as CSS variables
    Files: src/app/globals.css, src/lib/tokens.ts

[ ] TASK-003 — Build app shell: sidebar, top bar, main content layout
    Story: STORY-005
    Estimate: 3h
    Acceptance: Shell renders at all three breakpoints (1280, 1024, 768), sidebar collapses under 1024px
    Files: src/components/layout/AppShell.tsx, src/components/layout/Sidebar.tsx, src/components/layout/TopBar.tsx

[ ] TASK-004 — Initialise Supabase locally with Docker, create all database tables and migrations
    Story: STORY-002
    Estimate: 3h
    Acceptance: `supabase start` runs, all tables from 02_Architecture.md exist, `supabase db diff` shows no drift
    Files: supabase/migrations/001_initial_schema.sql

[ ] TASK-005 — Write and test RLS policies for all tables
    Story: STORY-002
    Estimate: 2h
    Acceptance: User A cannot query user B's workspace data (manually verified with two test users)
    Files: supabase/migrations/002_rls_policies.sql

[ ] TASK-006 — Create all critical database indexes
    Story: STORY-002
    Estimate: 0.5h
    Acceptance: All indexes from 02_Architecture.md created and visible in Supabase dashboard
    Files: supabase/migrations/003_indexes.sql

[ ] TASK-007 — Implement sign up: form, validation, Supabase Auth, Resend confirmation email
    Story: STORY-003
    Estimate: 2h
    Acceptance: User can sign up, confirmation email arrives, invalid inputs show specific errors
    Files: src/app/(auth)/signup/page.tsx, src/app/(auth)/signup/actions.ts

[ ] TASK-008 — Implement log in and log out: form, session, redirect
    Story: STORY-004
    Estimate: 1.5h
    Acceptance: Login works, logout clears session, session persists on refresh
    Files: src/app/(auth)/login/page.tsx, src/app/(auth)/login/actions.ts, src/middleware.ts

[ ] TASK-009 — Configure Vercel deployment, connect environment variables for staging
    Story: STORY-006
    Estimate: 1h
    Acceptance: Push to main triggers successful Vercel deployment, no hardcoded secrets in repo
    Files: vercel.json (if needed), .env.example

---

## Phase 1 — Core Issue Tracking

[ ] TASK-010 — Build issue creation modal: all fields, Zod validation, Supabase insert
    Story: STORY-007
    Estimate: 3h
    Acceptance: Issue created with all fields, appears in list, sequential number assigned, Ctrl+Enter submits
    Files: src/components/issues/CreateIssueModal.tsx, src/lib/issues/create.ts, src/lib/schemas/issue.ts

[ ] TASK-011 — Register C keyboard shortcut to open create issue modal from anywhere
    Story: STORY-007
    Estimate: 0.5h
    Acceptance: Pressing C opens modal when no input is focused
    Files: src/hooks/useKeyboardShortcuts.ts

[ ] TASK-012 — Build issue list view: virtual scroll, all columns, sorted by updated_at
    Story: STORY-008
    Estimate: 3h
    Acceptance: List loads in <500ms with 50 issues, all columns render, empty state shown when empty
    Files: src/components/issues/IssueList.tsx, src/components/issues/IssueRow.tsx

[ ] TASK-013 — Build status and priority icons as SVG components
    Story: STORY-008
    Estimate: 1.5h
    Acceptance: All 6 status icons and 5 priority icons render correctly with correct colors
    Files: src/components/icons/StatusIcon.tsx, src/components/icons/PriorityIcon.tsx

[ ] TASK-014 — Add filter bar: status, assignee, priority filters, URL param persistence
    Story: STORY-009
    Estimate: 2h
    Acceptance: Filters work in combination, state in URL, shareable link works, clear removes all filters
    Files: src/components/issues/FilterBar.tsx, src/hooks/useIssueFilters.ts

[ ] TASK-015 — Build issue detail view: all fields editable inline, save on blur
    Story: STORY-010
    Estimate: 4h
    Acceptance: All fields editable, changes saved on blur, Esc closes and returns to list
    Files: src/components/issues/IssueDetail.tsx, src/lib/issues/update.ts

[ ] TASK-016 — Build markdown editor for issue description (CodeMirror or Tiptap)
    Story: STORY-010
    Estimate: 2h
    Acceptance: Bold, italic, code, code block, lists render correctly in both edit and view mode
    Files: src/components/editor/MarkdownEditor.tsx, src/components/editor/MarkdownRenderer.tsx

[ ] TASK-017 — Implement status change: dropdown in list and detail, real-time update
    Story: STORY-011
    Estimate: 1.5h
    Acceptance: Status changes in <200ms, updates visible to all viewers in <3s
    Files: src/components/issues/StatusDropdown.tsx

[ ] TASK-018 — Implement J/K/Enter/Esc keyboard navigation on issue list
    Story: STORY-012
    Estimate: 1h
    Acceptance: All four shortcuts work, selected item highlighted, Esc returns focus from detail to list
    Files: src/hooks/useListNavigation.ts

[ ] TASK-019 — Build command palette: search, keyboard navigation, Esc to close
    Story: STORY-013
    Estimate: 2.5h
    Acceptance: K opens palette, search filters issues and pages, arrow keys navigate, Enter selects, Esc closes
    Files: src/components/CommandPalette.tsx, src/hooks/useCommandPalette.ts

[ ] TASK-020 — Implement Supabase Realtime subscriptions for issue list
    Story: STORY-014
    Estimate: 2h
    Acceptance: Issue created/updated by another user appears in list within 3s, reconnects automatically
    Files: src/hooks/useRealtimeIssues.ts, src/lib/supabase/realtime.ts

---

## Phase 2 — Cycles and Projects

[ ] TASK-021 — Build cycle creation form and store in database
    Story: STORY-015
    Estimate: 1.5h
    Acceptance: Cycle created with name/dates, appears in sidebar, max 1 active cycle enforced
    Files: src/components/cycles/CreateCycleModal.tsx, src/lib/cycles/create.ts

[ ] TASK-022 — Build cycle view: progress bar, issue list, backlog section
    Story: STORY-016
    Estimate: 2.5h
    Acceptance: Progress bar accurate, list shows only cycle issues, backlog section below, real-time updates
    Files: src/app/(app)/[workspace]/team/[team]/cycles/[cycleId]/page.tsx, src/components/cycles/CycleView.tsx

[ ] TASK-023 — Implement add/remove issues from cycle
    Story: STORY-017
    Estimate: 1.5h
    Acceptance: Issue detail cycle picker works, add from backlog works, remove moves to backlog
    Files: src/components/cycles/CyclePicker.tsx, src/lib/cycles/assignIssue.ts

[ ] TASK-024 — Build cycle auto-rollover cron job
    Story: STORY-018
    Estimate: 1h
    Acceptance: Cron moves incomplete issues to backlog on cycle end, cycle status set to completed
    Files: src/app/api/cron/cycle-rollover/route.ts

[ ] TASK-025 — Build project creation, project view, issue-project assignment
    Story: STORY-019
    Estimate: 2.5h
    Acceptance: Project created, issues assignable, project view shows all linked issues with progress
    Files: src/components/projects/CreateProjectModal.tsx, src/app/(app)/[workspace]/projects/[projectId]/page.tsx

[ ] TASK-026 — Build initiative creation and initiative view
    Story: STORY-020
    Estimate: 1.5h
    Acceptance: Initiative created, projects linkable, initiative view shows all linked projects
    Files: src/components/initiatives/CreateInitiativeModal.tsx

---

## Phase 3 — Collaboration

[ ] TASK-027 — Build comment system: markdown input, Supabase insert, real-time display
    Story: STORY-021
    Estimate: 2h
    Acceptance: Comment posted with Ctrl+Enter, appears for all viewers in <2s, markdown renders
    Files: src/components/comments/CommentBox.tsx, src/components/comments/CommentList.tsx

[ ] TASK-028 — Build activity log: record all issue changes, display chronologically
    Story: STORY-022
    Estimate: 2h
    Acceptance: All field changes recorded with user and timestamp, displayed oldest-first in issue detail
    Files: src/lib/activity/record.ts, src/components/issues/ActivityLog.tsx

[ ] TASK-029 — Implement notifications: mentions, assignments, status changes
    Story: STORY-023
    Estimate: 2.5h
    Acceptance: All three notification types delivered in <5s, bell shows correct unread count, mark read works
    Files: src/lib/notifications/create.ts, src/components/NotificationBell.tsx, src/components/NotificationDropdown.tsx

---

## Phase 4 — Analytics and Admin

[ ] TASK-030 — Build analytics view: velocity, completion rate, cycle comparison chart
    Story: STORY-024
    Estimate: 2.5h
    Acceptance: Loads in <1s with 6 months of data, chart renders correctly, date range selector works
    Files: src/app/(app)/[workspace]/analytics/page.tsx, src/components/analytics/VelocityChart.tsx

[ ] TASK-031 — Build member invite flow: form, Resend email, accept flow
    Story: STORY-025
    Estimate: 2h
    Acceptance: Invite email arrives in <60s, invitee can accept and land in workspace, pending invites visible
    Files: src/app/(app)/[workspace]/settings/members/page.tsx, src/app/api/invites/accept/route.ts

[ ] TASK-032 — Build member management: role changes, member removal
    Story: STORY-026
    Estimate: 1.5h
    Acceptance: Role change saves immediately, removal revokes access within 60s, owner protected
    Files: src/components/settings/MemberRow.tsx, src/lib/members/updateRole.ts

[ ] TASK-033 — Build workspace settings: name, slug, logo upload
    Story: STORY-026
    Estimate: 1h
    Acceptance: Name and slug save without reload, logo upload to Supabase Storage, preview shown
    Files: src/app/(app)/[workspace]/settings/page.tsx

---

## Phase 5 — Billing and Launch

[ ] TASK-034 — Integrate Stripe Checkout for Basic and Business plans
    Story: STORY-027
    Estimate: 2h
    Acceptance: Test payment completes, workspace plan updates within 30s, Stripe customer portal accessible
    Files: src/app/api/billing/checkout/route.ts, src/app/api/webhooks/stripe/route.ts

[ ] TASK-035 — Enforce plan limits server-side
    Story: STORY-028
    Estimate: 1h
    Acceptance: Free workspace blocked at team 3, Basic at team 6, upgrade prompt shown
    Files: src/lib/billing/checkLimits.ts, src/components/UpgradePrompt.tsx

[ ] TASK-036 — Build GDPR data export endpoint
    Story: STORY-029
    Estimate: 1h
    Acceptance: Export returns all user data as JSON within 10s, download triggered from settings
    Files: src/app/api/user/export/route.ts

[ ] TASK-037 — Build account deletion flow with GDPR cascade
    Story: STORY-030
    Estimate: 1h
    Acceptance: "DELETE" confirmation required, all data deleted, confirmation email sent
    Files: src/components/settings/DeleteAccount.tsx, src/app/api/user/delete/route.ts

[ ] TASK-038 — Build marketing homepage (use Category A prompt lp_saas_01)
    Story: — (marketing, not product)
    Estimate: 3h
    Acceptance: Lighthouse 90+ all metrics, all sections render correctly at 3 breakpoints
    Files: src/app/(marketing)/page.tsx, src/components/marketing/*

[ ] TASK-039 — Build pricing page with plan comparison table
    Story: STORY-027
    Estimate: 1.5h
    Acceptance: All three plans shown, correct prices, correct feature lists, upgrade CTA works
    Files: src/app/(marketing)/pricing/page.tsx

[ ] TASK-040 — Production deployment: custom domain, SSL, Stripe production keys, Sentry
    Story: — (ops)
    Estimate: 2h
    Acceptance: app.domain.com accessible over HTTPS, Stripe in live mode, Sentry receiving events
    Files: vercel.json, .env.production (not committed — Vercel env vars)

---

## Suggested Additions (not approved)

- SA-TASK-001: Bulk issue operations UI
- SA-TASK-002: GitHub PR linking
- SA-TASK-003: Slack notification webhook
