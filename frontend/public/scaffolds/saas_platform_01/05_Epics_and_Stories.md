# 05 — Epics and Stories
## SaaS Project Management Platform

---

## Conventions

**Epic format:** EPIC-00N — Name (Phase N, N stories, ~N days)
**Story format:** As a `<user>`, I want `<action>` so that `<outcome>`
**Acceptance criteria:** Concrete, testable, written in present tense
**Definition of ready:** Story has acceptance criteria, dependencies identified, estimated
**Definition of done:** All acceptance criteria met, task marked complete in `06_Tasks.md`

---

## EPIC-001 — Project Foundation
Phase 0 | 6 stories | ~5 days

**Description:** The technical foundation every feature builds on. Nothing ships until this epic is complete.

---

**STORY-001** As a developer, I want the Next.js project initialised with all dependencies so that I can begin building features immediately.
- AC: `npm run dev` starts on port 3000 without errors
- AC: TypeScript strict mode enabled, zero type errors on fresh clone
- AC: Tailwind configured with custom theme tokens from `03_Design.md`
- AC: CSS variables defined in `globals.css` matching design spec
- AC: Radix UI and Lucide installed
- Dependencies: none
- Estimate: 0.5 days

**STORY-002** As a developer, I want Supabase configured locally and in staging so that database development is consistent across environments.
- AC: `supabase start` runs local Supabase stack without errors
- AC: All tables from `02_Architecture.md` created via migrations
- AC: RLS enabled on all tables
- AC: Staging Supabase project connected and migrations applied
- Dependencies: STORY-001
- Estimate: 1 day

**STORY-003** As a user, I want to sign up with email and password so that I can access the application.
- AC: Sign up form accepts email and password
- AC: Validation: email format, password minimum 8 characters
- AC: On success: workspace creation prompt shown
- AC: On error: specific error message shown (email taken, invalid format)
- AC: Confirmation email sent via Resend
- Dependencies: STORY-002
- Estimate: 0.5 days

**STORY-004** As a user, I want to log in and log out so that I can access my workspace securely.
- AC: Login form accepts email and password
- AC: On success: redirect to workspace dashboard
- AC: On failure: "Invalid email or password" shown
- AC: Log out clears session and redirects to login page
- AC: Session persists across page refreshes
- Dependencies: STORY-003
- Estimate: 0.5 days

**STORY-005** As a user, I want to see the app shell after logging in so that I can navigate the application.
- AC: Sidebar renders with workspace name, navigation items
- AC: Top bar renders with breadcrumb and action area
- AC: Main content area renders (empty state acceptable)
- AC: Sidebar is responsive: collapses on screens under 1024px
- Dependencies: STORY-004
- Estimate: 1 day

**STORY-006** As a developer, I want automatic deployment to Vercel on push to main so that staging is always up to date.
- AC: Push to `main` triggers Vercel deployment
- AC: Deployment succeeds without manual intervention
- AC: Preview deployments created on PRs
- AC: Environment variables configured in Vercel (not hardcoded)
- Dependencies: STORY-001
- Estimate: 0.5 days

---

## EPIC-002 — Core Issue Tracking
Phase 1 | 8 stories | ~10 days

**Description:** The core product. Engineers create, track, and complete issues.

---

**STORY-007** As an engineer, I want to create an issue with a title, status, priority, and assignee so that I can track my work.
- AC: Press C opens create issue modal from anywhere in the app
- AC: Title is required; all other fields optional with defaults
- AC: Default status: backlog. Default priority: no priority.
- AC: Assignee picker shows all workspace members
- AC: Submit with Ctrl+Enter or clicking "Create issue" button
- AC: Issue appears in list immediately after creation (optimistic)
- AC: Issue is assigned a sequential number (ENG-1, ENG-2...)
- Dependencies: EPIC-001 complete
- Estimate: 2 days

**STORY-008** As an engineer, I want to see all issues in my team as a list so that I know what work exists.
- AC: Issue list shows all team issues sorted by updated_at descending
- AC: Each row shows: status icon, priority icon, issue ID, title, assignee avatar, label chips
- AC: List loads in under 500ms with 50 issues
- AC: Empty state shown when no issues exist
- AC: List updates in real-time when another user creates or updates an issue
- Dependencies: STORY-007
- Estimate: 1.5 days

**STORY-009** As an engineer, I want to filter issues by status, assignee, and priority so that I can find what I need.
- AC: Filter bar shows status, assignee, priority filter buttons
- AC: Multiple filters can be active simultaneously
- AC: Active filters shown as chips with clear (x) button
- AC: Filter state persists in URL params (shareable links)
- AC: Clearing all filters returns full list
- Dependencies: STORY-008
- Estimate: 1 day

**STORY-010** As an engineer, I want to open an issue and see all its details so that I can understand and update it.
- AC: Clicking an issue row opens the issue detail view
- AC: Detail shows: title (editable), description (markdown), status, priority, assignee, labels, cycle, project, created date, updated date
- AC: All fields editable inline without a separate edit mode
- AC: Changes saved on blur or on explicit save
- AC: Esc key closes detail view and returns to list
- Dependencies: STORY-008
- Estimate: 2 days

**STORY-011** As an engineer, I want to change an issue's status so that the team can see progress.
- AC: Status shown as icon + label in issue detail and list
- AC: Clicking status opens dropdown with all 6 status options
- AC: Status change saved immediately on selection
- AC: Status icon updates in list in real-time for all viewers
- AC: Completed_at timestamp set when status changes to "done"
- Dependencies: STORY-010
- Estimate: 0.5 days

**STORY-012** As an engineer, I want to use keyboard shortcuts to navigate the issue list so that I don't need the mouse.
- AC: J moves selection down one issue
- AC: K moves selection up one issue
- AC: Enter opens selected issue detail
- AC: Esc closes detail and returns to list with previous selection
- AC: Selected issue highlighted with bg-active background
- AC: Shortcuts work when no input is focused
- Dependencies: STORY-008
- Estimate: 0.5 days

**STORY-013** As an engineer, I want a command palette to search and navigate quickly so that I don't need to click through menus.
- AC: Pressing K (or Ctrl+K) opens command palette from anywhere
- AC: Search field filters: issues by title, pages by name
- AC: Arrow keys navigate results, Enter selects
- AC: Esc closes palette
- AC: Top results: recent issues, then search matches
- AC: Palette closes after selection
- Dependencies: STORY-005
- Estimate: 1 day

**STORY-014** As an engineer, I want issues to update in real-time so that I always see the latest state without refreshing.
- AC: Creating an issue appears in all viewers' lists within 3 seconds
- AC: Updating an issue status reflects in all viewers' lists within 3 seconds
- AC: Real-time works across browser tabs and different users
- AC: If real-time connection drops, reconnection happens automatically
- AC: After reconnect, stale data refreshed (no missed events shown as correct)
- Dependencies: STORY-008
- Estimate: 1 day

---

## EPIC-003 — Cycles and Projects
Phase 2 | 6 stories | ~9 days

**Description:** Sprint planning and project organisation.

---

**STORY-015** As a PM, I want to create a cycle with a name and date range so that the team has a defined work period.
- AC: Cycle creation form: name (required), start date (required), end date (required)
- AC: End date must be after start date — validation error if not
- AC: Created cycle appears in team sidebar under Cycles
- AC: Active cycle shown with highlighted indicator
- AC: Maximum 1 active cycle per team at any time
- Dependencies: EPIC-002 complete
- Estimate: 1 day

**STORY-016** As a PM, I want to see the cycle view with progress and all issues in the cycle so that I can track sprint health.
- AC: Cycle view shows: cycle name, date range, days remaining, progress bar
- AC: Progress bar = completed issues / total issues in cycle (percentage)
- AC: Issue list filtered to cycle, same columns as main list
- AC: Backlog section below: unscheduled issues that can be added to cycle
- AC: Real-time updates: progress bar updates when issue completed
- Dependencies: STORY-015
- Estimate: 1.5 days

**STORY-017** As a PM, I want to add and remove issues from a cycle so that I can plan the sprint.
- AC: Issue detail: cycle picker shows all active and upcoming cycles
- AC: Selecting a cycle assigns the issue to it
- AC: In cycle view: clicking "+ Add issue" opens filtered backlog to select from
- AC: Removing an issue from cycle moves it back to backlog
- AC: Issue count in cycle updates immediately on add/remove
- Dependencies: STORY-016
- Estimate: 1 day

**STORY-018** As a PM, I want incomplete issues to automatically move to the backlog when a cycle ends so that no work is lost.
- AC: Cron job runs daily at 00:00 UTC
- AC: Identifies cycles whose end_date is yesterday and status is 'active'
- AC: Moves all non-done, non-cancelled issues to backlog (cycle_id = null)
- AC: Sets cycle status to 'completed'
- AC: Does not affect done or cancelled issues
- AC: Cron protected by CRON_SECRET header
- Dependencies: STORY-015
- Estimate: 0.5 days

**STORY-019** As a PM, I want to create projects and assign issues to them so that I can group related work.
- AC: Project creation: name (required), description (optional), target date (optional)
- AC: Projects listed in sidebar under team
- AC: Issue detail: project picker shows all projects in workspace
- AC: Project view: issues grouped and filtered by project
- AC: Project progress: percentage of issues done
- Dependencies: STORY-015
- Estimate: 1.5 days

**STORY-020** As a lead, I want to create initiatives to group related projects for roadmap visibility.
- AC: Initiative creation: name, description
- AC: Initiatives listed in workspace sidebar (above teams)
- AC: Project detail: initiative picker to link project to initiative
- AC: Initiative view: all linked projects with their progress
- Dependencies: STORY-019
- Estimate: 1 day

---

## EPIC-004 — Collaboration
Phase 3 | 4 stories | ~5 days

---

**STORY-021** As a team member, I want to comment on issues so that I can communicate without leaving the tool.
- AC: Comment box at bottom of issue detail
- AC: Markdown supported: bold, italic, code, code block, lists, links
- AC: Submit on Ctrl+Enter
- AC: Comment appears immediately for all viewers (real-time)
- AC: Edit own comments (pencil icon on hover)
- AC: Delete own comments (with confirmation)
- Dependencies: EPIC-002 complete
- Estimate: 1.5 days

**STORY-022** As a team member, I want to see the activity log on each issue so that I know what changed and when.
- AC: Activity log below issue metadata, above comments
- AC: All changes recorded: status, priority, assignee, cycle, project, label changes
- AC: Each entry: user avatar, action description, timestamp (relative: "2 hours ago")
- AC: Ordered chronologically, oldest first
- AC: Issue creation shown as first activity entry
- Dependencies: STORY-021
- Estimate: 1 day

**STORY-023** As a team member, I want to be notified when I am mentioned or assigned so that I don't miss important updates.
- AC: @username in a comment creates a mention
- AC: Mention creates in-app notification for mentioned user
- AC: Being assigned to an issue creates in-app notification
- AC: Issue status changed creates notification for assignee
- AC: Notification bell in top bar shows unread count badge
- AC: Clicking bell opens notification dropdown
- AC: Each notification: issue ID, action, ago timestamp, link to issue
- AC: Marking as read removes badge count
- Dependencies: STORY-021
- Estimate: 1.5 days

---

## EPIC-005 — Analytics and Admin
Phase 4 | 5 stories | ~5 days

---

**STORY-024** As a lead, I want to see team analytics so that I can review health and velocity.
- AC: Analytics view: select team, select date range
- AC: Metrics shown: issues completed, velocity (per week), top contributors (by issues completed)
- AC: Cycle comparison: last 4 cycles shown as bar chart
- AC: Loads in under 1 second with 6 months of data
- Dependencies: EPIC-003 complete
- Estimate: 1.5 days

**STORY-025** As an admin, I want to invite members by email so that the team can join the workspace.
- AC: Invite form: email address, role selection
- AC: Invite email sent via Resend within 60 seconds
- AC: Invite link expires after 7 days
- AC: Invitee accepts, creates account, lands in workspace
- AC: Pending invites shown in member settings with cancel option
- Dependencies: EPIC-001 complete
- Estimate: 1 day

**STORY-026** As an admin, I want to manage member roles and remove members so that access is controlled.
- AC: Members list: name, email, role, joined date, actions
- AC: Admin can change role (member ↔ admin, not owner)
- AC: Admin can remove member — immediately revokes access
- AC: Owner role cannot be changed or removed
- AC: Removed member session invalidated within 60 seconds
- Dependencies: STORY-025
- Estimate: 1 day

---

## EPIC-006 — Billing and Launch
Phase 5 | 5 stories | ~5 days

---

**STORY-027** As an owner, I want to subscribe to a paid plan so that my team gets access to premium features.
- AC: Pricing page shows Free, Basic ($10/user), Business ($16/user) plans
- AC: Clicking upgrade opens Stripe Checkout
- AC: On payment success: workspace plan updated within 30 seconds
- AC: Stripe customer portal accessible from workspace settings
- AC: Invoice history visible in customer portal
- Dependencies: EPIC-001 complete
- Estimate: 1.5 days

**STORY-028** As an owner, I want plan limits enforced so that free workspaces do not exceed their limits.
- AC: Free plan: 2 teams max — creating 3rd team shows upgrade prompt
- AC: Basic plan: 5 teams max
- AC: Business plan: unlimited teams
- AC: Upgrade prompt links to pricing page
- AC: Limits checked server-side, not just client-side
- Dependencies: STORY-027
- Estimate: 0.5 days

**STORY-029** As a user, I want to export my data so that I control my information (GDPR).
- AC: `/api/user/export` endpoint returns JSON of all user data
- AC: Includes: profile, workspaces, issues created, comments, activity
- AC: Download triggered from account settings page
- AC: Response within 10 seconds for typical user data volumes
- Dependencies: EPIC-001 complete
- Estimate: 0.5 days

**STORY-030** As a user, I want to delete my account so that my data is removed (GDPR).
- AC: Delete account option in account settings with confirmation dialog
- AC: Typing "DELETE" required to confirm
- AC: On confirm: all user data deleted from database
- AC: Confirmation email sent after deletion
- AC: Workspaces owned by deleted user: ownership transferred to oldest admin, or workspace deleted if no other admins
- Dependencies: STORY-029
- Estimate: 0.5 days

---

## Open Stories (identified, not yet sized)

- Bulk issue operations (select multiple, change status/assignee in bulk)
- Issue templates
- Label management UI
- Workspace audit log
- Email digest notifications

---

## Suggested Additions

Items identified during planning — not implemented without owner approval:

- SA-001: GitHub integration (link PRs to issues) — high value, deferred to v2
- SA-002: Slack notifications — deferred to v2
- SA-003: Mobile app — explicitly out of scope v1
