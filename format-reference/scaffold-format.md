# Scaffold Format — 8-File Structure

A scaffold is a directory of 8 markdown files that guide an AI coding agent through building a complete application. Files are read sequentially — each builds on the previous.

**Naming convention:** `{category}_platform_{nn}_scaffold/`
Examples: `ecomm_platform_01_scaffold/`, `pcpp_platform_14_scaffold/`, `bw_clinic_platform_02_scaffold/`

---

## File Overview

| # | File | Question it answers | Read after |
|---|------|--------------------|----|
| 00 | `00_Orchestrator.md` | Who are you and what are the rules? | — |
| 01 | `01_PRD.md` | WHAT are we building and WHY? | 00 |
| 02 | `02_Architecture.md` | HOW is the system structured? | 01 |
| 03 | `03_Design.md` | WHAT does it look like? | 02 |
| 04 | `04_Plan.md` | In WHAT ORDER do we build? | 03 |
| 05 | `05_Epics_and_Stories.md` | WHAT exactly are the work items? | 04 |
| 06 | `06_Tasks.md` | WHAT is the unit of work? | 05 |
| 07 | `07_Guide.md` | HOW should code be written? | 06 |

---

## File 00 — Orchestrator

The entry point. Pasted into the AI tool to start a build session. Sets the role, project context, reading sequence, and working rules.

### Structure

```markdown
# 00 — Orchestrator
## {Project Type} · {scaffold_id}

---

### 1. Role

You are a senior full-stack engineer specialising in {domain}. You build {tech
description}. You follow {conventions}. You have built {relevant experience}.

---

### 2. Project Context

You are building {what} for {who}. {2-3 sentences on the product}.

The platform covers: {page/feature list}.

**Target users:**
- **{User 1}** — {behavior}. {device}. {priority}.
- **{User 2}** — {behavior}. {needs}.
- **{User 3}** — {behavior}. {pain point}.

**Stack:** {Framework} · {Language} · {Styling} · {Database} · {Auth} · {Payments} · {Deployment}

---

### 3. Reading Sequence

Read and internalize all files in this order before writing any code. Do not skip ahead.

| Step | File | What it gives you |
|------|------|------------------|
| 1 | `00_Orchestrator.md` | This file — project context and rules |
| 2 | `01_PRD.md` | Personas, features, user journeys, non-goals |
| 3 | `02_Architecture.md` | Tech stack, database schema, API design |
| 4 | `03_Design.md` | Design system, CSS variables, component specs |
| 5 | `04_Plan.md` | Build phases, ship gates, cut order |
| 6 | `05_Epics_and_Stories.md` | Epics and user stories with acceptance criteria |
| 7 | `06_Tasks.md` | Granular tasks with file paths and estimates |
| 8 | `07_Guide.md` | Engineering conventions, naming, common mistakes |

---

### 4. Working Rules

- **Read all 8 files before writing any code.**
- **One task at a time.** Complete TASK-001 fully before starting TASK-002.
- **Check the ship gate** in `04_Plan.md` before moving to the next phase.
- **Never hardcode:** {domain-specific things to never hardcode}.
- **Ask before deviating** from the architecture in `02_Architecture.md`.
- **Design system is locked.** CSS variables are the only source of color truth.
- {Domain-specific safety rule, e.g., Stripe webhook handling, RLS policies}

---

### 5. Platform Variations

**Cursor:** Use `@00_Orchestrator.md` in chat to load context.
**Claude Code:** Save as `CLAUDE.md` in the project root.
**Codex:** Paste all 8 files concatenated into the system prompt.
**Gemini:** Upload all 8 files; ask Gemini to summarise before proceeding.

---

### 6. When to Stop and Ask

Stop and ask the user before:
- Changing the database schema after data exists
- Adding a new library not in `02_Architecture.md`
- Modifying webhook/payment handler logic
- Changing RLS/auth policies
- Implementing a feature marked as non-goal in `01_PRD.md`
```

---

## File 01 — PRD (Product Requirements Document)

Defines the product: who it's for, what it does, what it doesn't do.

### Structure

```markdown
# 01 — Product Requirements Document
## {Project Type} · {scaffold_id}

---

### 1. Product Vision

{1 paragraph — what this product is and what makes it different.}

**Success metric:** {Concrete, measurable outcome.}

---

### 2. Personas

**{Name} — {Role} (primary)**
- {Age}, {context}
- {How they discovered/use the product}
- {Device/environment}
- Wants: {specific needs}
- Concern: "{direct quote}"
- They will leave if: {deal-breaker}

**{Name} — {Role}**
- {Same structure, 2-4 personas total}

---

### 3. Core Features

#### 3.1 {Feature Name}
- {Bullet list of specific behaviors}
- {UI details: what shows, what's clickable, what state changes}
- {Edge cases: empty states, error states, loading states}

#### 3.2 {Feature Name}
- {Same structure, 4-8 features total}

---

### 4. Non-Goals (v1)

- {Things explicitly NOT being built}
- {Prevents scope creep — AI must not implement these}

---

### 5. User Journeys

#### Journey 1: {Name}
1. User lands on {page}
2. User {action}
3. System {response}
4. User sees {outcome}

---

### 6. Success Criteria

| Metric | Target | How measured |
|--------|--------|-------------|
| {metric} | {number} | {method} |
```

---

## File 02 — Architecture

Defines the technical system: stack, schema, APIs, integrations.

### Structure

```markdown
# 02 — Architecture
## {Project Type} · {scaffold_id}

---

### 1. Architecture Decision

**{Monolith/Microservices/Jamstack/etc.}** {1-2 sentences on why.}

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | {e.g., Next.js 14 App Router} | {alternatives rejected} | {why} |
| Language | {e.g., TypeScript strict} | | |
| Styling | {e.g., Tailwind CSS v3} | | |
| Database | {e.g., Supabase PostgreSQL} | | |
| Auth | {e.g., Supabase Auth} | | |
| Payments | {e.g., Stripe} | | |
| Deployment | {e.g., Vercel} | | |

---

### 3. Folder Structure

```
src/
├── app/                    # Routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── {feature}/
│   ├── api/
│   └── auth/
├── components/
│   ├── layout/             # Navbar, Footer, Providers
│   ├── {domain}/           # Domain-specific components
│   └── ui/                 # Primitives
├── lib/
│   ├── supabase/           # Client utilities
│   ├── stripe.ts
│   └── utils.ts
├── store/                  # Zustand stores
├── types/
│   └── index.ts            # All shared TypeScript interfaces
└── middleware.ts
```

---

### 4. Database Schema

{SQL CREATE TABLE statements with column types, constraints, and RLS policies.}

---

### 5. API Routes

| Method | Route | Purpose | Auth required |
|--------|-------|---------|---------------|
| GET | `/api/{resource}` | {description} | {yes/no} |
| POST | `/api/{resource}` | {description} | {yes/no} |

---

### 6. Third-Party Integrations

{Stripe webhooks, email service, storage buckets, etc. with integration details.}
```

---

## File 03 — Design System

Defines the visual language: colors, typography, spacing, component specs.

### Structure

```markdown
# 03 — Design System
## {Project Type} · {scaffold_id}

---

### 1. Design Philosophy

{2-3 sentences on the visual personality. What it feels like. What it is NOT.}

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  /* Backgrounds */
  --bg-primary: #{hex};
  --bg-surface: #{hex};

  /* Text */
  --text-primary: #{hex};
  --text-secondary: #{hex};

  /* Accent */
  --accent: #{hex};
  --accent-hover: #{hex};

  /* Status */
  --error: #{hex};
  --success: #{hex};

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  /* ... */

  /* Border radius */
  --radius-btn: {n}px;
  --radius-card: {n}px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
}
```

---

### 3. Typography

**Font:** {Font Name} ({source}). Weights: {list}.

| Role | Size | Weight | Tracking | Line height | Usage |
|------|------|--------|----------|-------------|-------|
| Display | `clamp({min}, {vw}, {max})` | {wt} | {em} | {lh} | Hero headline |
| H1 | `clamp(...)` | | | | Page titles |
| H2 | `{px}` | | | | Section headers |
| Body | `{px}` | | | | Paragraphs |
| Small | `{px}` | | | | Metadata |

---

### 4. Color Rules

{Contrast requirements. Which colors pair with which. Accessibility notes.}

---

### 5. Component Specifications

#### {Component Name}
- Container: {padding, border, radius, shadow}
- States: default, hover, active, focus, disabled
- Responsive: {breakpoint behavior}

---

### 6. Motion & Animation

- {What animates and how (duration, easing)}
- {What does NOT animate}
- `prefers-reduced-motion: reduce` — {fallback behavior}

---

### 7. Responsive Breakpoints

| Name | Min-width | Behavior |
|------|-----------|----------|
| Mobile | 0 | {layout} |
| Tablet | 768px | {layout} |
| Desktop | 1024px | {layout} |
| Wide | 1280px | {layout} |
```

---

## File 04 — Plan

Defines the build sequence: phases, dependencies, ship gates.

### Structure

```markdown
# 04 — Plan
## {Project Type} · {scaffold_id}

---

### 1. Phasing Strategy

{Why phased. What principle guides the phasing (e.g., each phase delivers one
complete user journey end-to-end).}

---

### 2. Phase Overview

| Phase | Focus | Duration | Outcome |
|-------|-------|----------|---------|
| 0 | Foundation | {weeks} | Project running, deploys working |
| 1 | {Core feature} | {weeks} | {What users can do} |
| 2 | {Next feature} | {weeks} | {What users can do} |
| ... | | | |

---

### 3. Phase Details

#### Phase 0 — Foundation

**Goal:** {What this phase delivers}
**Ship gate (must pass before Phase 1):**
- [ ] {Concrete checklist item}
- [ ] {Concrete checklist item}

**Dependencies:** None

#### Phase 1 — {Name}

**Goal:** {What users can do after this phase}
**Ship gate:**
- [ ] {Testable condition}
- [ ] {Testable condition}

**Dependencies:** Phase 0 complete
```

---

## File 05 — Epics and Stories

Defines the work breakdown: features grouped into epics, broken into user stories with acceptance criteria.

### Structure

```markdown
# 05 — Epics and User Stories
## {Project Type} · {scaffold_id}

---

## Conventions

**Epic format:** `EPIC-XXX: Title`
**Story format:** `STORY-XXX: As a <user>, I want to <action> so that <outcome>.`
**Definition of done:** Code shipped, tests passing, acceptance criteria verified.

---

## EPIC-001 — {Name}

{1-2 sentences on what this epic delivers.}

**Phase:** {n}
**Stories:** {count}

---

**STORY-001-01: {Title}**
As a {user}, I want to {action} so that {outcome}.

Acceptance criteria:
- {Concrete, testable condition}
- {Concrete, testable condition}
- {Concrete, testable condition}

```typescript
// TypeScript interfaces relevant to this story
interface {Name} {
  id: string
  // ...
}
```

Dependencies: {STORY-XXX or none}
Estimate: {days}

---

**STORY-001-02: {Title}**
{Same structure. 3-8 stories per epic.}
```

### Quality markers for acceptance criteria
- Specific: "Submitting creates a record with status 'pending'" not "it works"
- Testable: can be verified with a grep command or browser check
- TypeScript types included for data-heavy stories
- Edge cases called out (empty states, error handling)

---

## File 06 — Tasks

Defines the granular task list: checkboxes, 1-4 hour units of work.

### Structure

```markdown
# 06 — Tasks
## {Project Type} · {scaffold_id}

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## How to use this file

**For the AI:**
1. Find the next uncompleted task (first `[ ]` from the top).
2. Read the task description and acceptance criteria.
3. Implement the task.
4. Test the implementation.
5. Show the diff for review.
6. Mark the task `[x]` and move to the next.
7. Do NOT skip tasks. Do NOT batch multiple tasks.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | STORY-001-01 | Est: {hours}h
  **{Short description}**
  {What to do. Command to run if applicable.}

  ```bash
  # Setup command (if applicable)
  npx create-next-app@latest . --typescript --tailwind --app
  npm install {dependencies}
  ```

  Acceptance: {One-line "done" condition}
  Files: {comma-separated list of files this task creates or modifies}

  ```bash
  # QA verification commands
  grep -r "{pattern}" src/ --include="*.tsx"   # expected: {result}
  tsc --noEmit                                  # exits 0
  npm run build                                 # succeeds
  ```

---

- [ ] **TASK-002** | STORY-001-02 | Est: {hours}h
  **{Short description}**
  {Same structure.}

  Acceptance: {condition}
  Files: {file list}
```

### Quality markers for tasks
- Each task is 1-4 hours (if bigger, split it)
- Acceptance is a single testable sentence
- Files list tells the AI exactly what to create/modify
- Bash QA commands provide grep/build verification
- Tasks are ordered by dependency (never circular)

---

## File 07 — Guide

Defines engineering conventions: how to write the code, where files go, what patterns to follow.

### Structure

```markdown
# 07 — Engineering Guide
## {Project Type} · {scaffold_id}

---

### 1. Golden Rules

1. **{Rule name}.** {Explanation with right/wrong examples.}
2. **{Rule name}.** {Explanation.}
3. **{Rule name}.** {Explanation.}
{3-6 rules that prevent the most common AI mistakes for this domain.}

---

### 2. Project Folder Structure

```
src/
├── app/                    # Routes
├── components/
│   ├── layout/             # {what goes here}
│   ├── {domain}/           # {what goes here}
│   └── ui/                 # {what goes here}
├── store/                  # {state management}
├── lib/                    # {utilities}
├── types/                  # {shared interfaces}
└── middleware.ts
```

---

### 3. TypeScript Conventions

```typescript
// Always use interfaces for object shapes
interface Product {
  id: string
  price: number  // always cents
}

// Never use 'any' — use 'unknown' and narrow
```

---

### 4. Component Conventions

- Server components for data fetching
- Client components (`'use client'`) only for interactivity
- {Naming: PascalCase files, kebab-case folders}
- {Props: always typed via interface, never inline}

---

### 5. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Utilities | camelCase | `formatPrice.ts` |
| CSS variables | kebab-case | `--bg-primary` |
| Types | PascalCase | `interface CartItem` |
| Constants | UPPER_SNAKE | `FREE_SHIPPING_THRESHOLD` |

---

### 6. Error Handling

{Patterns for error boundaries, try/catch, user-facing errors.}

---

### 7. Testing Strategy

{What to test, how to test, minimum coverage expectations.}

---

### 8. Common Mistakes to Avoid

- {Mistake 1} — {why it's wrong} — {what to do instead}
- {Mistake 2} — {why it's wrong} — {what to do instead}
```

---

## Complete Example Directory

```
ecomm_platform_01_scaffold/
├── 00_Orchestrator.md          (~70 lines)
├── 01_PRD.md                   (~150-300 lines)
├── 02_Architecture.md          (~200-400 lines)
├── 03_Design.md                (~150-250 lines)
├── 04_Plan.md                  (~100-200 lines)  [sometimes absent]
├── 05_Epics_and_Stories.md     (~200-400 lines)  [sometimes absent]
├── 06_Tasks.md                 (~150-300 lines)
└── 07_Guide.md                 (~100-200 lines)
```

**Note:** Not all scaffolds have all 8 files. Files 04 (Plan) and 05 (Epics) are sometimes omitted for simpler projects. The minimum set is: 00, 01, 02, 03, 07.
