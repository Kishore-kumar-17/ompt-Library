# 00 — Orchestrator
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## Studio Context

**Studio Lotus** — award-winning interdisciplinary design practice, Delhi, India, est. 2002.
**Founders:** Three principals across Architecture, Interiors, and Research.
**Tagline:** "Conscious design — celebrating local resources, cultural influences, and contextual approaches."
**Disciplines:** Architecture · Interiors · Adaptive Reuse
**Press:** TIME, Condé Nast Traveller, Dezeen, Architectural Digest Middle East, Financial Times UK, The Hindu
**Awards:** Surface Design Awards 2025 (Supreme Award), The PLAN Awards 2024, LIV Hospitality Awards 2024, Dezeen Awards (longlisted Architecture Studio of the Year), JK AYA Awards 2024

---

## What This Site Is

A portfolio for a serious Indian architecture and interior design practice. Photography leads. The UI is infrastructure for showing work. Every component exists to frame images — not to decorate the page.

This is NOT a trendy portfolio. It is a rigorous, editorial archive of built work. Think Dezeen editorial meets Indian craft sensibility.

---

## Critical Design Constraints

| Constraint | Rule |
|-----------|------|
| Hover pattern | Caption slides UP from image bottom (translateY 100%→0). NEVER image scale. |
| Border-radius | Zero. Everywhere. Hard-reset in globals.css. |
| Font weights | 300 (body) and 500 (headings/labels) ONLY. No other weights. |
| Colors in components | Always via CSS custom properties. Never hardcoded hex. |
| Nav background | Transparent on hero. Transitions to `--color-bg` after 60px scroll (useScrolled hook). |
| Theme sections | `data-theme="dark"` or `data-theme="accent"` on `<section>` elements. Never on `<body>` for section-level theming. |
| Easing | `--ease: cubic-bezier(0.25,0.46,0.45,0.94)` for every transition. No other easing. |
| Filter system | TWO levels: discipline row (tabs) + category row (pills). Category list changes when discipline changes. |
| Web fonts | None. System stack only: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif |

---

## Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict, no `any`)
- **Styling:** CSS Modules + CSS custom properties
- **Images:** `next/image` throughout
- **Animation:** Framer Motion (grid filter transitions + page transitions)
- **Scroll reveal:** Custom `useInView` hook (IntersectionObserver)
- **Nav scroll detection:** Custom `useScrolled` hook
- **Deployment:** Vercel static export (`output: 'export'`)

---

## Pages

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Hero + discipline strip + featured projects |
| `/work` | `app/work/page.tsx` | 'use client', two-level filter + animated grid |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | generateStaticParams from projects.ts |
| `/about` | `app/about/page.tsx` | Manifesto + press + awards + team |
| `/contact` | `app/contact/page.tsx` | Address, emails, social links |

---

## Scaffold Files

| File | Contents |
|------|----------|
| `00_Orchestrator.md` | This file — brand context, critical constraints, stack |
| `01_PRD.md` | User personas, functional requirements, acceptance criteria |
| `02_Architecture.md` | Full TypeScript schema, folder structure, component specs, data patterns |
| `03_Design.md` | Complete CSS design system — all tokens, component CSS, anti-patterns |
| `04_Plan.md` | 7-day build plan with phase ship gates |
| `05_Epics_and_Stories.md` | 6 epics, 30 stories with acceptance criteria |
| `06_Tasks.md` | Step-by-step task list with verification commands |
| `07_Guide.md` | Developer reference — rules, common mistakes, deployment checklist |

---

## Discipline + Category Taxonomy

**Architecture:**
All / Hospitality / Institutional / Corporate / Culture / Mixed Use / Homes

**Interiors:**
All / Retail / Workplace / Leisure / Homes / Hotels / F&B / Brand Experiences

**Adaptive Reuse:**
(no sub-categories — discipline IS the category)

---

## What Makes This Different from portfolio_03

| Feature | portfolio_03 (Locomotive) | portfolio_04 (Studio Lotus) |
|---------|--------------------------|---------------------------|
| Hover | Image scale 1.04 | Caption slide-up |
| Nav | Sticky, always visible bg | Transparent on hero → cream on scroll |
| Filter | One-level (category pills) | Two-level (discipline tabs + category pills) |
| Color | Black/white high-contrast | Warm cream / near-black / terracotta |
| Content | Graphic design case studies | Architecture photography projects |
| Theme | `data-theme` 4 variants | `data-theme` 2 variants (dark + accent) |
| Hero | Video | Full-viewport static image |
| Project detail | Challenge/Approach/Outcome text | Synopsis + approach + image gallery + materials |
