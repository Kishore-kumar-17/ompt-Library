---
prompt_id: saas_platform_01
sub_category: SaaS Platform
sub_type: Project Management and Issue Tracking SaaS
title: Engineering-First — Project Management and Issue Tracking Platform
reference_patterns: keyboard_first_saas, dark_precision_ui, multi_role_team_product
inspiration: linear.app
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior full-stack engineer with 10+ years of experience building production-grade SaaS tools for software development teams. You write TypeScript, React, and SQL with strong opinions. You value correctness over cleverness, readability over brevity, and shipping over perfection.

You understand that a project management tool for engineering teams is a trust product: it must be fast, reliable, and keyboard-first. Latency is a UX failure. Inconsistent state is a trust failure. Every interaction must feel instant.

---

### Section 2 — Application Overview

This is a project management and issue tracking SaaS platform for software engineering teams. Teams create, assign, prioritize, and track issues. Work is organized into cycles (time-boxed sprints) and projects. Teams are multi-user with role-based access (admin, member, viewer).

The application must support: issue CRUD, status workflows, priority levels, cycle planning with automatic rollover, project grouping, team-level and project-level analytics, and customer request intake.

Primary conversion goal: free trial signup from the marketing landing page. Primary retention goal: daily active issue tracking with cycle velocity metrics.

Core application areas: Issue list, Issue detail, Cycle board, Project view, Insights dashboard, Settings, Team management, Customer requests.

---

### Section 3 — Brand Voice & Mood

The feeling is quiet confidence. The product is built by people who care about craft and the site should prove it. Not a startup trying to look premium. Actually premium.

Copy is short, declarative, and slightly austere. Headlines are statements. No exclamation marks. No aspirational language. No corporate phrases ("empower your team", "streamline your workflow").

Interface mood: dark, precise, minimal. Every pixel is intentional. No decorative elements. The product UI does the visual work.

Vibe word: precise.

---

### Section 4 — Core Features & Functionality

1. **Issue Tracking** — create, assign, prioritize (urgent/high/medium/low/none), and track issues with configurable status workflows and label support
2. **Cycle Planning** — time-boxed work periods with automatic rollover of incomplete issues and velocity tracking
3. **Project and Initiative View** — group issues into projects, group projects into initiatives for roadmap-level visibility
4. **Team Management** — multi-team support with role-based access (admin, member, viewer) and team-level settings
5. **Insights and Analytics** — real-time burndown, velocity, throughput, and cycle metrics per team and project
6. **Customer Requests** — intake user feedback, link requests to issues, track request resolution status
7. **AI Triage** — automatic categorization, priority suggestion, and routing for new issues

---

### Section 5 — Design Specifications

**Visual style:** Dark, precise, minimal. Interface-first. Zero decorative elements.

**Color mode:** Dark only.

**Color palette:**
- Background: `#08090A`
- Surface / card: `#141517`
- Border / divider: `rgba(255, 255, 255, 0.06)`
- Primary text: `#E4E5E9`
- Secondary text: `rgba(255, 255, 255, 0.48)`
- Tertiary text: `rgba(255, 255, 255, 0.28)`
- Accent: `#5E6AD2`
- Accent hover: `#6E7AE2`
- Destructive: `#E85D4A`
- Success: `#4AB87A`

**Typography:** Inter Variable throughout.
- Display: `clamp(40px, 5vw, 64px)`, weight 500, letter-spacing `-0.03em`, line-height 1.1
- H2: `clamp(28px, 3.5vw, 40px)`, weight 500, letter-spacing `-0.02em`, line-height 1.15
- H3: `20px`, weight 500, letter-spacing `-0.01em`, line-height 1.3
- Body: `16px`, weight 400, line-height 1.6
- Small / meta: `14px`, weight 400, line-height 1.5
- Micro / label: `12px`, weight 500, letter-spacing `0.02em`

**Spacing:** 8pt base.
- Section spacing: `128px` desktop / `80px` mobile
- Component padding: `24px` standard / `16px` compact

**Border radius:** Cards `12px`, buttons `8px`, chips `6px`, inputs `8px`.

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. 12-column grid, `1280px` max-width, `24px` gutters.

**Accessibility:** WCAG AA. Focus rings: `2px solid #5E6AD2` with `2px` offset. Full keyboard navigation including issue list and cycle board.

**Motion:**
- Fade-in on scroll: `opacity 0 → 1`, `400ms ease-out`
- Hover: `150ms ease`
- Forbidden: parallax, autoplay video, continuous loops, bounce easing
- All animations respect `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Marketing Homepage**
1. Sticky nav (logo, links, login, "Get started")
2. Hero (declarative headline, subtext, 2 CTAs, social proof stat, product screenshot)
3. Monochrome logo trust bar
4. Feature section 1 (text left, visual right)
5. Feature section 2 (text right, visual left)
6. Bento card grid (3-col, 6 cards)
7. Pricing preview
8. Final CTA section
9. 5-column footer

**Application Routes**
- `/` — marketing homepage
- `/app` — authenticated application shell
- `/app/issues` — issue list with filters
- `/app/issues/[id]` — issue detail
- `/app/cycles` — cycle board
- `/app/projects` — project list
- `/app/projects/[id]` — project detail
- `/app/insights` — analytics dashboard
- `/app/settings` — team and account settings
- `/app/requests` — customer request intake

---

### Section 7 — Technical Specifications

- Next.js 14 App Router + TypeScript strict mode
- Tailwind CSS + CSS variables for all tokens
- Prisma ORM + PostgreSQL
- NextAuth.js with email/Google OAuth
- Framer Motion for marketing animations
- Radix UI primitives for accessible interactive components
- Lucide icons: `size={16}` `strokeWidth={1.5}` only
- Zod for schema validation
- tRPC or Server Actions for type-safe API layer
- Performance: Lighthouse 95+, Core Web Vitals green

---

### Section 8 — Implementation Steps

1. Foundation: Next.js scaffold, CSS tokens, TypeScript types, Prisma schema, auth setup
2. Marketing homepage: Nav → Hero → Logo bar → Feature sections → Bento grid → Pricing → CTA → Footer
3. Core issue CRUD: issue list, issue detail, status workflow, priority, assignment
4. Cycle planning: cycle creation, board view, incomplete rollover
5. Project and initiative grouping
6. Team management and role-based access
7. Insights and analytics
8. Customer request intake
9. AI triage integration
10. QA: keyboard navigation, WCAG AA, performance

---

### Section 9 — User Experience

The primary user is a software engineer or engineering lead who is skeptical of project management tools. They have been burned by slow, bloated alternatives. They evaluate quality within 5 seconds.

On the marketing site: does this feel different? The hero must answer that question through design precision alone. If it looks generic, they leave.

In the application: latency is the enemy. Every interaction must feel instant. Keyboard shortcuts must work for all primary actions. The issue list must be scannable — no visual noise.

Friction to remove: no email required to see the product, no video autoplay, no cookie banner on hero, no mandatory onboarding wizard before first issue creation.

---

### Section 10 — Constraints

- no gradients (one subtle hero glow at `rgba(94,106,210,0.08)` max opacity is the only exception)
- no font weight above 500
- no border radius above `12px`
- no stock photography — product screenshots only
- no carousels or auto-advancing elements
- no corporate marketing copy
- no direct client database access — all mutations via server actions or API routes
- no unvalidated user input reaching the database

---

## Platform Versions

### Category A — Lovable

Build **Plane** — a dark, precise engineering-first project management SaaS — using Next.js 14 App Router, TypeScript strict, CSS Modules. Static export for marketing homepage. Font: Inter Variable 400/500 only via `next/font/google` — no weight 700.

**Design identity: Quiet confidence.** Dark surfaces (`#08090A` bg, `#141517` surface), accent `#5E6AD2`, zero decorative elements. Product screenshot does all the visual work. Font weight 500 maximum.

**All CSS tokens in `globals.css` — zero hex in component files:**
```css
:root {
  --bg:              #08090A;
  --surface:         #141517;
  --border:          rgba(255, 255, 255, 0.06);
  --text-primary:    #E4E5E9;
  --text-secondary:  rgba(255, 255, 255, 0.48);
  --text-tertiary:   rgba(255, 255, 255, 0.28);
  --accent:          #5E6AD2;
  --accent-hover:    #6E7AE2;
  --destructive:     #E85D4A;
  --success:         #4AB87A;
  --radius-card:     12px;
  --radius-button:   8px;
  --section-spacing: 128px;
}
```

**Core marketing page types:**
```typescript
// src/types/index.ts
export interface NavLink { label: string; href: string }
export interface BentoCard { id: string; icon: string; title: string; description: string }
export interface PricingPlan {
  id: string; name: string; price: number; period: string
  description: string; features: string[]; highlighted: boolean; cta: string
}
export interface LogoItem { id: string; name: string }
export interface FeatureSectionProps {
  layout: 'text-left' | 'text-right'
  headline: string; subtext: string; visualAlt: string
}
```

**Page sections (build in this order):**
1. **SiteNav** — `position: sticky; top: 0; height: 60px; border-bottom: 1px solid var(--border)`; scroll shadow via `useEffect`; "Get started" filled accent button `36px` height `8px` radius
2. **HeroSection** — declarative headline max 8 words `clamp(40px,5vw,64px)` weight 500; subtext max 16 words; 2 CTAs `40px` height; "25,000+ teams" social proof in `var(--text-tertiary)`; product screenshot `<Image priority>` `90%` container width `12px` radius
3. **LogoTrustBar** — "Trusted by" label, 6-8 monochrome company wordmarks at `rgba(255,255,255,0.35)`, horizontal scroll mobile
4. **FeatureSection** × 2 — `layout: 'text-left' | 'text-right'` prop; `128px` vertical padding; H2 + 2-line subtext + product visual
5. **BentoGrid** — 3-col desktop, 2-col tablet, 1-col mobile; 6 cards; Framer Motion stagger `delay: index * 0.07s`; `useReducedMotion()` guarded
6. **PricingPreview** — 3 plan cards; highlighted plan `1px solid var(--accent)` border
7. **FinalCTASection** — 2-line headline + same CTA pair as hero; `var(--bg)` background; no image
8. **SiteFooter** — 5 columns; `1px var(--border)` top border; copyright `var(--text-tertiary)`

**Four non-negotiable constraints:**
- No font weight above 500 — Inter loaded with `weights: ['400', '500']` only
- No gradients (one hero glow exception: `rgba(94,106,210,0.08)` max opacity radial)
- `var(--border)` = `rgba(255,255,255,0.06)` — never override with higher opacity
- All color values via CSS custom properties — zero hex in `.module.css` files

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### Category A — ChatGPT Canvas

Build **Plane** — engineering-first project management SaaS — Next.js 14 App Router, TypeScript strict, Tailwind CSS + CSS variables, Prisma + PostgreSQL, NextAuth.js.

```bash
npx create-next-app@latest plane --typescript --app --no-tailwind --import-alias "@/*"
npm install prisma @prisma/client next-auth zod lucide-react framer-motion
```

**Prisma schema (core entities):**
```prisma
model Issue {
  id          String    @id @default(cuid())
  title       String
  description String?
  status      IssueStatus @default(TODO)
  priority    Priority    @default(NONE)
  assigneeId  String?
  projectId   String
  cycleId     String?
  labels      Label[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  project     Project   @relation(fields: [projectId], references: [id])
  cycle       Cycle?    @relation(fields: [cycleId], references: [id])
}

enum IssueStatus { BACKLOG TODO IN_PROGRESS IN_REVIEW DONE CANCELLED }
enum Priority    { URGENT HIGH MEDIUM LOW NONE }

model Cycle {
  id        String   @id @default(cuid())
  name      String
  startDate DateTime
  endDate   DateTime
  teamId    String
  issues    Issue[]
  team      Team     @relation(fields: [teamId], references: [id])
}

model Project {
  id          String   @id @default(cuid())
  name        String
  identifier  String   @unique  // 3-char prefix e.g. 'PLN'
  teamId      String
  issues      Issue[]
  team        Team     @relation(fields: [teamId], references: [id])
}

model Team {
  id       String       @id @default(cuid())
  name     String
  slug     String       @unique
  members  TeamMember[]
  projects Project[]
  cycles   Cycle[]
}

model TeamMember {
  id     String   @id @default(cuid())
  teamId String; userId String
  role   TeamRole @default(MEMBER)
  team   Team     @relation(fields: [teamId], references: [id])
}

enum TeamRole { ADMIN MEMBER VIEWER }
```

**TypeScript types (application layer):**
```typescript
// src/types/index.ts
export type IssueStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED'
export type Priority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'
export type TeamRole = 'ADMIN' | 'MEMBER' | 'VIEWER'

export interface IssueListItem {
  id: string; title: string; identifier: string  // 'PLN-123'
  status: IssueStatus; priority: Priority
  assignee: { name: string; avatarUrl: string } | null
  projectName: string; cycleId: string | null; updatedAt: string
}

export interface CycleStats {
  total: number; completed: number; inProgress: number; notStarted: number
  velocity: number   // issues completed per day
  completionRate: number  // 0-100
}
```

**Key utilities:**
```typescript
// src/lib/formatIssueIdentifier.ts
export function formatIssueIdentifier(projectIdentifier: string, issueNumber: number): string {
  return `${projectIdentifier}-${issueNumber}`
}
// formatIssueIdentifier('PLN', 47) → 'PLN-47'

// src/lib/getStatusColor.ts — for CSS variable-based status badges
export function getStatusLabel(status: IssueStatus): string {
  const labels: Record<IssueStatus, string> = {
    BACKLOG: 'Backlog', TODO: 'Todo', IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review', DONE: 'Done', CANCELLED: 'Cancelled'
  }
  return labels[status]
}
```

**Routes:**
- `/` — marketing homepage (static export)
- `/app/issues` — issue list with filters (status, priority, assignee, project)
- `/app/issues/[id]` — issue detail (status/priority/assignment editing)
- `/app/cycles` — cycle board with active/upcoming/completed tabs
- `/app/projects` — project list
- `/app/insights` — burndown, velocity, throughput charts
- `/app/settings` — team management, roles, integrations

---

### Category A — Bolt

Build the **Plane** marketing homepage. Next.js 14 App Router, TypeScript, CSS Modules. Static export. Inter 400/500 only.

**CSS variables in `globals.css` (all color tokens — zero hex in component files):**
```css
:root {
  --bg:              #08090A;
  --surface:         #141517;
  --border:          rgba(255, 255, 255, 0.06);
  --text-primary:    #E4E5E9;
  --text-secondary:  rgba(255, 255, 255, 0.48);
  --text-tertiary:   rgba(255, 255, 255, 0.28);
  --accent:          #5E6AD2;
  --accent-hover:    #6E7AE2;
  --radius-card:     12px;
  --radius-button:   8px;
  --section-spacing: 128px;
}
```

**File structure:**
```
src/
  types/index.ts          — NavLink, BentoCard, PricingPlan, LogoItem, FeatureSectionProps
  lib/
    data.ts               — NAV_LINKS, BENTO_CARDS (6), PRICING_PLANS (3), LOGOS (8), FEATURES (2)
  components/
    layout/
      SiteNav.tsx + .module.css     — sticky 60px, scroll shadow, accent button
      SiteFooter.tsx + .module.css  — 5-col, border-top var(--border)
    home/
      HeroSection.tsx + .module.css — headline, CTAs, screenshot <Image priority>
      LogoTrustBar.tsx + .module.css — monochrome logos rgba(255,255,255,0.35)
      FeatureSection.tsx + .module.css — text-left|text-right layout prop
      BentoGrid.tsx + .module.css   — 3-col, Framer Motion stagger
      BentoCard.tsx + .module.css   — Lucide icon + H3 + description
      PricingPreview.tsx + .module.css — 3 plan cards
      FinalCTASection.tsx + .module.css — 2-line headline + CTAs
  app/
    globals.css, layout.tsx, page.tsx
```

**Critical QA:**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"   # must be empty
grep -r "font-weight: 7" src --include="*.module.css"             # must be empty (max 500)
grep -r "border-radius: [2-9][0-9]" src --include="*.module.css" # must be empty (max 12px)
tsc --noEmit && npm run build
```

---

### Category A — v0

Design **Plane** marketing homepage components. Next.js 14, CSS Modules, no Tailwind. Inter 400/500 max weight.

**SiteNav.module.css:**
```css
.nav {
  position: sticky; top: 0; z-index: 50;
  height: 60px; background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center;
  padding: 0 24px; gap: 32px;
  transition: box-shadow 0.2s;
}
.navScrolled { box-shadow: 0 1px 0 var(--border), 0 4px 16px rgba(0,0,0,0.4); }
.logo { font-size: 1rem; font-weight: 500; color: var(--text-primary); }
.links { display: flex; gap: 24px; margin-left: auto; margin-right: 24px; }
.link { font-size: 0.9375rem; color: var(--text-secondary); transition: color 0.15s; text-decoration: none; }
.link:hover { color: var(--text-primary); }
.loginLink { font-size: 0.9375rem; color: var(--text-secondary); }
.ctaButton {
  height: 36px; padding: 0 16px;
  background: var(--accent); color: #fff;
  border-radius: var(--radius-button); border: none;
  font-size: 0.9375rem; font-weight: 500; cursor: pointer;
  transition: background 0.15s;
}
.ctaButton:hover { background: var(--accent-hover); }
/* Focus ring */
.ctaButton:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

**BentoCard.module.css:**
```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.icon { color: var(--text-secondary); }
.title { font-size: 1.25rem; font-weight: 500; color: var(--text-primary); letter-spacing: -0.01em; }
.description { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; }
```

**HeroSection.module.css:**
```css
.section {
  padding: var(--section-spacing) 24px;
  text-align: center;
  position: relative;
}
/* One permitted hero glow — max 0.08 opacity */
.section::before {
  content: '';
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse at center top, rgba(94,106,210,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.headline {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 500; color: var(--text-primary);
  letter-spacing: -0.03em; line-height: 1.1;
  max-width: 720px; margin: 0 auto;
}
.subtext {
  font-size: 1.125rem; color: var(--text-secondary);
  max-width: 480px; margin: 20px auto 0;
}
.ctaRow { display: flex; gap: 12px; justify-content: center; margin-top: 32px; }
.ctaPrimary {
  height: 40px; padding: 0 20px;
  background: var(--accent); color: #fff;
  border-radius: var(--radius-button); border: none;
  font-size: 0.9375rem; font-weight: 500; cursor: pointer;
}
.ctaGhost {
  height: 40px; padding: 0 20px;
  background: transparent; color: var(--text-primary);
  border: 1px solid var(--border); border-radius: var(--radius-button);
  font-size: 0.9375rem; cursor: pointer; transition: border-color 0.15s;
}
.socialProof { font-size: 0.875rem; color: var(--text-tertiary); margin-top: 20px; }
.screenshotWrap {
  margin-top: 48px;
  width: 90%; max-width: 960px; margin-left: auto; margin-right: auto;
  border-radius: var(--radius-card);
  border: 1px solid var(--border);
  overflow: hidden;
}
```

---

### Category B — Claude Artifacts

Implement the full **Plane** SaaS platform: Next.js 14 App Router, TypeScript strict, CSS Modules, Prisma + PostgreSQL, NextAuth.js. Inter 400/500 only.

**Four non-negotiable constraints:**

**Constraint 1 — No direct database access from client:**
```typescript
// WRONG: Prisma in a Client Component
'use client'
import { prisma } from '@/lib/prisma'
const issues = await prisma.issue.findMany()  // ✗ runtime error + security violation

// RIGHT: Server Component or Server Action only
// app/app/issues/page.tsx (Server Component)
import { prisma } from '@/lib/prisma'
export default async function IssuesPage() {
  const issues = await prisma.issue.findMany(...)  // ✓ server-only
}

// Or Server Action
'use server'
export async function updateIssueStatus(id: string, status: IssueStatus) {
  await prisma.issue.update({ where: { id }, data: { status } })
}
```

**Constraint 2 — Zod validation on all user inputs:**
```typescript
// WRONG: raw form data to Prisma
const title = formData.get('title') as string
await prisma.issue.create({ data: { title } })  // ✗ unvalidated

// RIGHT: Zod schema first
const CreateIssueSchema = z.object({
  title: z.string().min(1).max(255),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW', 'NONE']),
  projectId: z.string().cuid(),
})
const parsed = CreateIssueSchema.safeParse(Object.fromEntries(formData))
if (!parsed.success) return { error: parsed.error.flatten() }
await prisma.issue.create({ data: parsed.data })  // ✓
```

**Constraint 3 — Font weight max 500 on marketing site:**
```css
/* WRONG */
font-weight: 700;   /* ✗ */
font-weight: bold;  /* ✗ */

/* RIGHT — max allowed */
font-weight: 500;   /* ✓ */
/* Inter loaded with weights: ['400', '500'] only */
```

**Constraint 4 — Zero hex in CSS Module files:**
```css
/* WRONG — any .module.css file */
.heading { color: #E4E5E9; }  /* ✗ */
.card { border: 1px solid rgba(255,255,255,0.06); }  /* ✗ */

/* RIGHT — CSS custom properties from globals.css */
.heading { color: var(--text-primary); }  /* ✓ */
.card { border: 1px solid var(--border); }  /* ✓ */
```

**Complete folder structure:**
```
src/
  types/index.ts              — IssueStatus, Priority, TeamRole, IssueListItem, CycleStats
  lib/
    prisma.ts                 — PrismaClient singleton
    auth.ts                   — NextAuth config (email + Google OAuth)
    formatIssueIdentifier.ts  — 'PLN-47' format
    getStatusLabel.ts         — IssueStatus → display label
  actions/
    issues.ts                 — createIssue, updateIssue, deleteIssue (Server Actions + Zod)
    cycles.ts                 — createCycle, rolloverIncomplete
    projects.ts
  components/
    layout/SiteNav.tsx + SiteFooter.tsx
    home/HeroSection + LogoTrustBar + FeatureSection + BentoGrid + PricingPreview + FinalCTA
    app/
      IssueListItem.tsx       — identifier, title, status badge, priority icon, assignee
      IssueStatusBadge.tsx    — status → color + label
      PriorityIcon.tsx        — priority → Lucide icon + color
      CycleBoardColumn.tsx    — status column for cycle board
  app/
    globals.css               — all CSS tokens, .sr-only, reduced-motion
    layout.tsx                — Inter font 400+500 only
    page.tsx                  — marketing homepage
    app/
      layout.tsx              — auth guard + app shell (sidebar + main)
      issues/page.tsx         — issue list with filter state
      issues/[id]/page.tsx    — issue detail
      cycles/page.tsx         — cycle board
      projects/page.tsx + [id]/page.tsx
      insights/page.tsx
      settings/page.tsx
```

**QA checks:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"        # empty
grep -r "prisma\." src/components --include="*.tsx"                    # empty (no Prisma in components)
grep -r "font-weight: [6-9]" src --include="*.module.css"             # empty
npm run build
```

---

### Category B — Grok

Generate all source files for **Plane** — full-stack engineering SaaS platform. Next.js 14, TypeScript strict, CSS Modules, Prisma, PostgreSQL, NextAuth.js.

Generate in order:
1. `prisma/schema.prisma` — Issue, Cycle, Project, Team, TeamMember, User, Request, Label models
2. `src/types/index.ts` — IssueStatus, Priority, TeamRole, IssueListItem, CycleStats, FeatureSectionProps, BentoCard, PricingPlan
3. `src/lib/prisma.ts` — PrismaClient singleton
4. `src/lib/auth.ts` — NextAuth config (email + Google OAuth, role session)
5. `src/lib/formatIssueIdentifier.ts` — `'PLN-47'` format
6. `src/lib/getStatusLabel.ts` + `src/lib/getPriorityLabel.ts`
7. `src/actions/issues.ts` — createIssue, updateIssueStatus, updateIssuePriority, deleteIssue (Server Actions + Zod)
8. `src/actions/cycles.ts` — createCycle, rolloverIncomplete (moves BACKLOG+TODO issues to next cycle)
9. `src/app/globals.css` — all 10 CSS tokens, .sr-only, reduced-motion
10. `src/app/layout.tsx` — Inter 400+500 only
11. Marketing components: SiteNav, HeroSection, LogoTrustBar, FeatureSection, BentoGrid, BentoCard, PricingPreview, FinalCTASection, SiteFooter
12. App components: IssueListItem, IssueStatusBadge, PriorityIcon, CycleBoardColumn
13. `src/app/page.tsx` — marketing homepage
14. `src/app/app/layout.tsx` — auth guard + sidebar shell
15. `src/app/app/issues/page.tsx` — issue list (filter: status, priority, project, assignee)
16. `src/app/app/issues/[id]/page.tsx` — issue detail (editable: status, priority, assignee, labels)
17. `src/app/app/cycles/page.tsx` — cycle board (columns by status)
18. `src/app/app/projects/page.tsx` + `[id]/page.tsx`
19. `src/app/app/insights/page.tsx` — burndown, velocity, throughput
20. `src/app/app/settings/page.tsx` — team management, member roles

**Rules for every file:**
- No Prisma in Client Components or component files — Server Actions and Server Components only
- Zod validation before every `prisma.*` write
- No hex in `.module.css` — CSS custom properties only
- Font weight max 500 on marketing components
- `<Image priority>` on hero screenshot; Lucide `size={16} strokeWidth={1.5}` only

---

### Category B — Gemini

**Project:** Plane — engineering-first project management SaaS. Next.js 14 App Router, TypeScript strict, CSS Modules, Prisma + PostgreSQL, NextAuth.js. Inter 400/500 only.

**Design system — marketing homepage:**
- All tokens in `globals.css` CSS custom properties — zero hex in components
- `--bg: #08090A` · `--surface: #141517` · `--border: rgba(255,255,255,0.06)` · `--accent: #5E6AD2`
- Font weight 500 maximum; zero gradients (one hero glow `rgba(94,106,210,0.08)` only)
- Bento cards: `var(--surface)` bg · `12px` radius · `1px var(--border)` border · `24px` padding

**Architecture — 4 layers:**

Layer 1 — Foundation: Prisma schema (Issue, Cycle, Project, Team, User enums), TypeScript types, Zod schemas, Server Actions (all mutations), auth config (NextAuth email + Google).

Layer 2 — Marketing homepage: SiteNav (sticky 60px, scroll shadow), HeroSection (Inter 500 max, screenshot `<Image priority>`), LogoTrustBar (monochrome), FeatureSection × 2, BentoGrid (3-col stagger), PricingPreview, FinalCTA, SiteFooter (5-col).

Layer 3 — App shell: NextAuth session guard in `app/layout.tsx`, sidebar navigation (issues/cycles/projects/insights/settings), responsive collapse on mobile.

Layer 4 — Core views:
- Issue list: filterable by status/priority/project; keyboard navigation; `IssueListItem` rows
- Issue detail: inline status/priority editing via Server Actions; label management
- Cycle board: columns by status; drag-to-move via `@dnd-kit`; rollover action for incomplete issues
- Insights: burndown chart, velocity trend, throughput per week

**Motion (marketing only):**
- BentoGrid: `whileInView, delay: index * 0.07s`, `viewport={{ once: true }}`, `useReducedMotion()` guard
- HeroSection: `opacity: 0, y: 16 → visible`, `duration: 0.4`
- App UI: no Framer Motion — CSS `transition: 150ms ease` for hover/focus only

---

### Category B — Cursor

Implement **Plane** full-stack project management SaaS. Next.js 14, TypeScript strict, CSS Modules, Prisma, PostgreSQL, NextAuth.js.

**Build order (implement one phase at a time, test before proceeding):**

**Phase 1 — Data model:**
```prisma
// prisma/schema.prisma — key enums
enum IssueStatus { BACKLOG TODO IN_PROGRESS IN_REVIEW DONE CANCELLED }
enum Priority    { URGENT HIGH MEDIUM LOW NONE }
enum TeamRole    { ADMIN MEMBER VIEWER }
// Issue: id, title, description, status, priority, assigneeId, projectId, cycleId, labels[], timestamps
// Cycle: id, name, startDate, endDate, teamId
// Project: id, name, identifier (3-char), teamId
// Team: id, name, slug
// TeamMember: teamId, userId, role
```

**Phase 2 — Auth:**
```typescript
// src/lib/auth.ts — NextAuth config
// Providers: EmailProvider + GoogleProvider
// Session: include user.id + active teamId + TeamRole
// Middleware: protect /app/** routes — redirect to /login if unauthenticated
```

**Phase 3 — Server Actions (all mutations):**
```typescript
// src/actions/issues.ts
'use server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

const CreateIssueSchema = z.object({
  title: z.string().min(1).max(255),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW', 'NONE']),
  projectId: z.string().cuid(),
  cycleId: z.string().cuid().optional(),
})

export async function createIssue(formData: FormData) {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')
  const parsed = CreateIssueSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  const issue = await prisma.issue.create({ data: { ...parsed.data, status: 'TODO' } })
  return { data: issue }
}

// Also: updateIssueStatus, updateIssuePriority, assignIssue, deleteIssue
// Also: src/actions/cycles.ts — createCycle, rolloverIncomplete (status IN ['BACKLOG','TODO'])
```

**Phase 4 — Marketing homepage:**
```
SiteNav → HeroSection → LogoTrustBar → FeatureSection × 2 → BentoGrid → PricingPreview → FinalCTA → SiteFooter
Rules: zero hex in .module.css; font-weight max 500; Inter 400+500 loaded; hero screenshot <Image priority>
```

**Phase 5 — App views:**
```
/app/issues — issue list, filter sidebar, IssueListItem rows with status/priority badges
/app/issues/[id] — detail with inline editing via Server Actions
/app/cycles — board columns by status; rolloverIncomplete Server Action
/app/projects — list; /app/projects/[id] — project issue list
/app/insights — charts (burndown, velocity)
```

**`src/lib/formatIssueIdentifier.ts`:**
```typescript
export function formatIssueIdentifier(projectIdentifier: string, issueNumber: number): string {
  return `${projectIdentifier}-${issueNumber}`
}
// formatIssueIdentifier('PLN', 47) → 'PLN-47'
```

**Absolute rules:**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"         # empty (CSS vars only)
grep -r "prisma\." src/components --include="*.tsx"                     # empty (Server Actions only)
grep -r "font-weight: [6-9]\|fontWeight: [6-9]" src --include="*.css"  # empty (max 500)
tsc --noEmit && npm run build
```

---

## Review Notes

- Lovable:
- ChatGPT Canvas:
- Bolt:
- v0:
- Claude Artifacts:
- Grok:
- Gemini:
- Cursor:
- Overall score: /5
- What to fix:
