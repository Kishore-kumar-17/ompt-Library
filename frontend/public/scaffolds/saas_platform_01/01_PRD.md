# 01 — Product Requirements Document
## SaaS Project Management Platform

---

## 1. Executive Summary

We are building a fast, keyboard-first project management and issue tracking SaaS platform for software engineering teams. Teams use it to create issues, organise them into cycles and projects, track progress, and ship software. The product competes on speed, precision, and design quality — not feature breadth. Success at 6 months: 50 paying teams, NPS above 40, average session length over 8 minutes, and zero critical data loss incidents.

---

## 2. Problem Statement

Engineering teams using existing project management tools report three consistent pain points:

**Pain 1 — Slowness.** Every interaction requires a page load or a spinner. Keyboard shortcuts are an afterthought. Power users feel punished.

**Pain 2 — Bloat.** Tools accumulate features for every edge case until the core workflow is buried. New team members take weeks to onboard.

**Pain 3 — Poor design.** Most tools look and feel like enterprise software from 2015. Teams that care about craft feel embarrassed using them.

Affected users: software engineers (daily), product managers (daily), engineering leads (weekly for reporting).

---

## 3. Goals and Non-Goals

**Goals:**
- G1: Ship a working issue tracker with cycle planning that engineering teams use daily
- G2: Achieve sub-100ms response on all read operations, sub-500ms on writes
- G3: Support keyboard-first navigation with shortcuts for all core actions
- G4: Deliver a design quality that passes the "would a design-conscious team be proud to use this?" bar
- G5: Ship multi-team and multi-project support from day one
- G6: Support real-time updates — if one team member updates an issue, all viewers see it instantly

**Non-Goals:**
- NG1: Mobile app — web only in v1
- NG2: Time tracking — not in scope
- NG3: Invoicing or billing UI — handled by Stripe, not custom-built
- NG4: AI features — deferred to v2
- NG5: Public API — deferred to v2
- NG6: Gantt charts or timeline view — not in scope
- NG7: White labelling — not in scope

---

## 4. Success Metrics

**Adoption:**
- 50 paying teams within 6 months of launch
- 70% of registered teams active in the last 14 days (WAU/MAU)
- Average 3+ team members per workspace

**Operational:**
- P95 page load under 1.5 seconds
- P95 API response under 200ms
- Real-time update delivery under 300ms
- Uptime 99.9% monthly

**Business:**
- Month 3 MRR: $2,000+
- Month 6 MRR: $8,000+
- Churn under 5% monthly

**What we are NOT measuring in v1:** NPS (too early), support ticket volume (no support yet), SEO traffic.

---

## 5. Users and Personas

**Persona 1 — Arjun, Software Engineer**
Age 27. Writes code all day, switches between editor and issue tracker constantly. Frustrated by slow tools that break his flow. Uses keyboard shortcuts for everything. Evaluates tools by how fast they feel in the first 10 minutes. Creates and updates 5–10 issues per day. Wants: instant load, keyboard shortcuts, clean UI.

**Persona 2 — Priya, Product Manager**
Age 31. Manages roadmap across 2 engineering teams. Needs to see what is in progress, what is blocked, and what ships this cycle. Does not write code. Uses the tool for planning, prioritisation, and status checks. Creates issues, moves them between statuses, assigns to engineers. Wants: project view, initiative grouping, clear status visibility.

**Persona 3 — Rohan, Engineering Lead**
Age 34. Responsible for team output and delivery. Reviews cycle completion rates and flags blockers in weekly syncs. Uses the tool for 30 minutes per day — mostly reviewing, rarely creating. Wants: analytics view, team-level progress, burndown data.

**Persona 4 — New Team Member**
Age 24. Joins an existing workspace. Has 20 minutes to get up to speed. Wants: onboarding that does not require reading documentation, intuitive issue creation, immediate sense of what their team is working on.

---

## 6. Core Features

**Customer (team member) features:**
- F1.1 — Issue creation: create an issue with title, description, assignee, priority, label, and status in under 10 seconds
- F1.2 — Issue detail view: full description (markdown), activity log, comments, sub-issues, attachments
- F1.3 — Issue list view: filter by status, assignee, priority, label; sort by any field; bulk-select and update
- F1.4 — Keyboard shortcuts: C to create issue, K for command palette, J/K to navigate list, Enter to open, Esc to close
- F1.5 — Command palette: search all issues, projects, members; execute any action without mouse
- F1.6 — Cycle view: see all issues in the current cycle, progress bar, days remaining, auto-rollover on cycle end
- F1.7 — Project view: group issues by project, see project-level progress, link issues to a project
- F1.8 — Real-time sync: changes by any team member appear instantly without page refresh
- F1.9 — Notifications: in-app notifications for mentions, assignments, and status changes

**Lead / manager features:**
- F2.1 — Initiative view: group multiple projects under an initiative for roadmap-level visibility
- F2.2 — Team analytics: cycle velocity, throughput, issue completion rate per team
- F2.3 — Member management: invite members, assign roles (admin, member, viewer)

**Owner / admin features:**
- F3.1 — Workspace settings: name, logo, billing plan
- F3.2 — Team management: create teams, add members to teams
- F3.3 — Billing: Stripe-powered plan selection and payment (Free, Basic, Business)

---

## 7. User Journeys

**Journey 1 — Engineer creates and ships an issue**
1. Opens app, lands on team inbox/today view
2. Presses C — issue creation modal opens
3. Types title, selects priority and assignee with keyboard
4. Presses Enter — issue created, appears in backlog
5. Lead moves it to current cycle
6. Engineer works, updates status to "In Progress" then "Done"
7. Cycle ends, issue marked complete

**Journey 2 — PM plans a cycle**
1. Opens Cycles view for their team
2. Sees backlog of unscheduled issues
3. Drags or selects issues into the current cycle
4. Sets cycle end date
5. During cycle, checks progress bar daily
6. At cycle end, reviews completed vs rolled-over issues

**Journey 3 — Lead reviews team health**
1. Opens Analytics view
2. Selects team and date range
3. Sees: issues completed this cycle, velocity trend, top contributors
4. Exports or screenshots for weekly sync

**Journey 4 — New member onboards**
1. Receives email invite, clicks link
2. Creates account with email + password
3. Lands in workspace — sees team's current cycle and open issues
4. Creates first issue within 5 minutes using onboarding tooltip

---

## 8. Constraints and Dependencies

**Technical:**
- Must work in Chrome, Firefox, Safari, Edge (last 2 major versions)
- No native app — web only
- Supabase for database, auth, and real-time — not self-hosted
- Vercel for deployment

**Business:**
- Stripe for all billing — no custom payment processing
- GDPR compliance required — EU users must be able to delete their data
- No Indian-specific compliance requirements in v1 (no GST billing, no DPDP obligations until user count triggers it)

**External dependencies:**
- Supabase uptime (SLA 99.9%)
- Vercel edge network
- Stripe payment processing
- Resend for transactional email

---

## 9. Risks and Assumptions

**Risks:**
- R1 — Real-time complexity: Supabase Realtime may have edge cases at scale. Likelihood: medium. Impact: high. Mitigation: test with 20+ concurrent users in staging before launch.
- R2 — Performance targets: sub-100ms reads require careful indexing and query design. Likelihood: medium. Impact: high. Mitigation: performance testing in Phase 2.
- R3 — Scope creep: PM and lead stakeholders may request features mid-build. Likelihood: high. Impact: medium. Mitigation: strict non-goals list, weekly scope review.

**Assumptions:**
- A1: Users have a stable internet connection — offline support is not required in v1
- A2: Teams are small (under 50 members) — no pagination performance edge cases in v1
- A3: English-only UI in v1
- A4: Stripe handles all tax and invoice complexity — we show price + "taxes may apply"

---

## 10. Open Questions

- Q1: Should cycle length be fixed (2 weeks) or configurable per team? Default to 2 weeks, make configurable in v2.
- Q2: Should sub-issues have their own sub-issues (infinite nesting)? No — one level of sub-issues only in v1.
- Q3: Should guests (external collaborators) be supported? No — members only in v1.

---

## 11. Approval

- [ ] Product owner sign-off
- [ ] Lead developer sign-off
- [ ] Designer sign-off

---

## Appendix A — Glossary

| Term | Definition |
|------|-----------|
| Issue | The atomic unit of work. Has a title, description, status, priority, assignee, and labels. |
| Cycle | A time-boxed period of work (default 2 weeks). Issues are assigned to cycles. |
| Project | A grouping of related issues with a defined goal and timeline. |
| Initiative | A grouping of related projects for roadmap-level visibility. |
| Team | A group of members working together. A workspace can have multiple teams. |
| Workspace | The top-level container. One company = one workspace. |
| Backlog | Issues not assigned to any active cycle. |
| Triage | Reviewing and categorising new issues before they enter the backlog. |

---

## Appendix B — References

- Supabase docs: database, auth, realtime
- Stripe docs: subscription billing, customer portal
- Resend docs: transactional email
- GDPR checklist: data deletion, export rights
