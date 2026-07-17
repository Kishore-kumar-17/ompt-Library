# 04 — Build Plan and Sequencing
## SaaS Project Management Platform

---

## 1. Phasing Strategy

Ship the smallest thing that real teams can use daily. Validate that before building the next layer. Each phase ends with a ship gate — a testable set of conditions that must all pass before Phase N+1 begins. No phase is skipped. No ship gate is waived.

The sequence: foundation first, core workflow second, collaboration third, growth features last.

---

## 2. Phase Overview

| Phase | Focus | Duration | Outcome |
|-------|-------|----------|---------|
| 0 | Foundation | 1 week | Project runs locally and deploys to staging |
| 1 | Core issue tracking | 2 weeks | Engineers can create, assign, and track issues |
| 2 | Cycles and projects | 2 weeks | Teams can plan and run sprints |
| 3 | Collaboration | 1 week | Comments, notifications, activity log |
| 4 | Analytics and admin | 1 week | Leads can review team health, admins can manage members |
| 5 | Billing and launch | 1 week | Stripe billing live, public launch |

Total: 8 weeks from start to launch.

---

## 3. Phase 0 — Foundation (Week 1)

**Goal:** The application runs. Nothing more.

**Deliverables:**
- Next.js 14 project initialised with TypeScript, Tailwind, Radix UI
- Supabase project created, local development working via Docker
- Authentication: sign up, log in, log out working
- App shell: sidebar, top bar, main content area rendering
- Deployment pipeline: pushes to `main` deploy to Vercel staging automatically
- Database: all tables created, RLS policies written and tested
- Design tokens: CSS variables defined in `globals.css`

**Ship gate:**
- [ ] `npm run dev` starts without errors
- [ ] User can sign up, log in, and log out
- [ ] App shell renders with sidebar and top bar
- [ ] Staging deployment succeeds on push to `main`
- [ ] All database migrations run cleanly
- [ ] RLS: user A cannot see user B's workspace data (tested manually)

**NOT in this phase:** Any product features. Any real UI beyond the shell.

---

## 4. Phase 1 — Core Issue Tracking (Weeks 2–3)

**Goal:** An engineer can start the app on Monday morning and use it to track their work all week.

**Deliverables (engineer-facing):**
- Issue creation modal (C shortcut, all fields: title, description, status, priority, assignee, label)
- Issue list view: sorted, filterable by status and assignee
- Issue detail view: all fields editable inline
- Status workflow: backlog → todo → in progress → in review → done / cancelled
- Basic keyboard shortcuts: C, K (command palette stub), J/K to navigate list, Enter to open, Esc to close
- Issue IDs: sequential per team (ENG-1, ENG-2...)
- Real-time: issue list updates when another user creates or updates an issue

**Ship gate:**
- [ ] Engineer can create an issue in under 10 seconds using only keyboard
- [ ] Issue list loads in under 500ms with 50 issues
- [ ] Updating an issue status appears for another user in the same team within 3 seconds
- [ ] All 6 status transitions work correctly
- [ ] Issue numbers are sequential and never duplicated
- [ ] Keyboard navigation (J/K/Enter/Esc) works on issue list

**NOT in this phase:** Cycles, projects, comments, notifications, analytics.

---

## 5. Phase 2 — Cycles and Projects (Weeks 4–5)

**Goal:** A PM can plan a 2-week cycle and a team can work from it.

**Deliverables (PM-facing):**
- Cycle creation: name, start date, end date
- Cycle view: issues in cycle, progress bar, days remaining
- Add issues to cycle: drag from backlog or assign in issue detail
- Cycle auto-rollover: incomplete issues move to backlog when cycle ends (cron job)
- Project creation: name, description, target date, linked team
- Project view: issues grouped by project
- Initiative creation: group multiple projects

**Ship gate:**
- [ ] PM can create a cycle and add 10 issues to it in under 5 minutes
- [ ] Progress bar updates in real time as issues are completed
- [ ] Cycle auto-rollover runs correctly on cycle end date
- [ ] Project view shows all linked issues correctly
- [ ] Cycle creation, edit, and deletion all work without data loss

**NOT in this phase:** Comments, notifications, analytics, billing.

---

## 6. Phase 3 — Collaboration (Week 6)

**Goal:** Team members can communicate within the tool, not just track work.

**Deliverables:**
- Comments on issues: markdown supported, real-time updates
- Activity log: all issue changes recorded and displayed chronologically
- Mentions: @username in comments sends in-app notification
- In-app notifications: bell icon in top bar, unread count badge
- Notification types: assigned to issue, mentioned in comment, issue status changed

**Ship gate:**
- [ ] Comment appears for all viewers within 2 seconds of posting
- [ ] Activity log shows all status changes with correct timestamp and author
- [ ] Mention notification delivered within 5 seconds
- [ ] Notification bell shows correct unread count
- [ ] Markdown renders correctly in comments (bold, italic, code, lists)

**NOT in this phase:** Email notifications, notification preferences.

---

## 7. Phase 4 — Analytics and Admin (Week 7)

**Goal:** Engineering leads can review team health. Admins can manage members.

**Deliverables (lead-facing):**
- Analytics view: issues completed per cycle, velocity (issues/week), throughput by member
- Date range selector: last cycle, last 4 cycles, custom range

**Deliverables (admin-facing):**
- Invite member by email (Resend sends invite email)
- Manage member roles: promote to admin, demote to member, remove
- Team management: create teams, add/remove members from teams
- Workspace settings: name, slug, logo upload

**Ship gate:**
- [ ] Analytics loads in under 1 second with 6 months of data
- [ ] Invite email delivered within 60 seconds of sending
- [ ] Invitee can accept invite and join workspace in under 2 minutes
- [ ] Admin can remove a member and that member immediately loses access
- [ ] Workspace settings save correctly without page reload

**NOT in this phase:** Billing, public API, SSO.

---

## 8. Phase 5 — Billing and Launch (Week 8)

**Goal:** Pay-gated tiers live. Product publicly accessible.

**Deliverables:**
- Stripe integration: Free, Basic ($10/user/month), Business ($16/user/month)
- Plan enforcement: Basic plan limits (5 teams), Business plan limits (unlimited)
- Stripe customer portal: users manage their own billing
- Upgrade prompt: shown when user hits plan limit
- Marketing site: homepage, pricing page, changelog page live
- User data export endpoint (GDPR)
- User data deletion flow (GDPR)
- Onboarding checklist for new workspaces (empty state guidance)

**Ship gate:**
- [ ] Stripe test payments complete without error
- [ ] Plan limits enforced: Free workspace blocked at 2 teams
- [ ] Upgrade flow completes and plan updates within 30 seconds
- [ ] Marketing site Lighthouse score 90+ on all metrics
- [ ] GDPR export returns complete user data as JSON
- [ ] GDPR deletion removes all user data and confirms in email

---

## 9. Cross-Cutting Concerns

Running alongside all phases:

**Testing:** Manual smoke test after each task. No automated test suite in v1 — time investment not justified yet. Add Playwright e2e tests in v2.

**Documentation:** `07_Guide.md` updated whenever a new pattern is established. No external docs in v1.

**Security:** RLS reviewed after every database migration. Stripe webhook signature verification from day one.

**Performance:** Lighthouse run after every phase. Any regression below 85 is a blocker.

---

## 10. Risks to the Plan

- R1 — Supabase Realtime complexity adds 3+ days to Phase 1. Mitigation: spike on Realtime in Phase 0 before writing any feature code.
- R2 — Stripe billing integration takes longer than 1 week. Mitigation: Phase 5 is isolated — if billing slips, marketing site can still launch without pay-gated tiers.
- R3 — Database performance issues emerge at Phase 2 scale. Mitigation: all indexes defined in Phase 0, query analysis in Phase 2 ship gate.

---

## 11. What Gets Cut If We Run Out of Time

Cut in this order:
1. Initiative view (Phase 2) — projects still ship, initiatives deferred to v2
2. Analytics view (Phase 4) — leads can use Supabase dashboard as fallback
3. Email notifications (Phase 3 extension) — in-app notifications only in v1
4. Workspace logo upload (Phase 4) — name and slug only

**Never cut:**
- Issue creation and tracking (Phase 1) — this is the product
- Cycles (Phase 2) — teams need this to plan
- RLS security (Phase 0) — non-negotiable
- Stripe billing (Phase 5) — without this, there is no revenue

---

## 12. Definition of Done

A feature is done when:
1. It works correctly for the happy path
2. It fails gracefully for error paths (shows error, does not crash)
3. It is accessible via keyboard
4. It renders correctly at 1280px, 1024px, and 768px width
5. The acceptance criteria in the corresponding user story are all met
6. The corresponding task is marked `[x]` in `06_Tasks.md`

---

## 13. What "Launched" Means

Phase 5 ship gate passes AND:
- [ ] Production environment deployed to `app.domain.com`
- [ ] Custom domain with SSL configured on Vercel
- [ ] Stripe production keys active (not test mode)
- [ ] At least 3 real teams (not internal) using the product
- [ ] Sentry error tracking active on production
- [ ] On-call process defined (who gets paged for P1 errors)
- [ ] Privacy policy and terms of service pages live

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Supabase Realtime complexity adding 3+ days to Phase 1 | High | High | Spike on Realtime in Phase 0 before writing any feature code (R1 — existing mitigation) |
| Stripe billing integration slipping Phase 5 | Medium | Medium | Phase 5 isolated — marketing site can launch without pay-gated tiers if needed (R2 — existing mitigation) |
| Database performance issues at Phase 2+ scale | Medium | High | All indexes defined in Phase 0 schema; run `EXPLAIN ANALYZE` on all queries in Phase 2 ship gate (R3 — existing mitigation) |
| RLS not covering all tables → workspace data leaks between orgs | High | High | After every DB migration: verify `row_security = true` on all tables; test user A accessing user B's workspace manually |
| Issue numbers duplicating under concurrent creation | Medium | High | Use DB sequence or trigger for sequential issue IDs; test with concurrent `INSERT` race condition |
| Stripe webhook signature not verified | Medium | High | Verify `stripe.webhooks.constructEvent(body, sig, secret)` in webhook handler — test with tampered payload |
| Plan limits enforced at UI only (not API level) | Medium | High | Plan limit checks must happen in API routes, not just client components; test by calling API directly at limit boundary |
