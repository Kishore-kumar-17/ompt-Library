# 04 — Build Plan
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 day | Setup, tokens, schema, seed data |
| 1 | Layout Shell | 1 day | Nav (scroll-aware), layout, footer |
| 2 | Homepage | 1 day | Hero, discipline strip, featured grid |
| 3 | Work Section | 2 days | Two-level filter, grid, project detail |
| 4 | About & Contact | 1 day | Studio statement, press, awards, team, contact |
| 5 | Polish & Launch | 1 day | Scroll reveals, reduced motion, a11y, perf |

**Total: 7 days**

---

## Phase 0 — Foundation (Day 1)

**Deliverables:**
- Next.js 14 + TypeScript + CSS Modules setup (no Tailwind, static export)
- `globals.css`: hard reset (border-radius:0), CSS vars, theme system, typography scale, spacing tokens, easing token
- `src/types/index.ts`: Discipline, ArchCategory, IntCategory, Project, Award, PressItem, TeamMember
- `src/data/projects.ts`: 8 projects (2 hospitality, 2 institutional, 2 interiors, 1 adaptive-reuse, 1 homes)
- `src/data/awards.ts`: 5 awards (with year, award name, project name)
- `src/data/press.ts`: 6 press items (publication, title, year)
- `src/data/team.ts`: 10–12 team members

**Ship gate:**
- [ ] `tsc --noEmit` zero errors
- [ ] `[data-theme="dark"]` gives light text on near-black background
- [ ] All project data fully typed, no `any`
- [ ] No `border-radius` in globals.css or any component

---

## Phase 1 — Layout Shell (Day 2)

**Deliverables:**
- `useScrolled` hook (returns boolean after 60px scroll threshold)
- `useInView` hook (IntersectionObserver, prefers-reduced-motion aware)
- `SkipNav` component
- `Nav` component: sticky, 3-col grid (logo / discipline links / utility), useScrolled for transparent→cream
- `Footer` component: dark theme, studio name, year, social links
- Root `layout.tsx`: SkipNav + Nav + `<main id="main">` + Footer + metadata
- Empty page files for all 5 routes

**Ship gate:**
- [ ] Nav transparent on `/` before scroll, cream after 60px
- [ ] Nav always cream on `/work`, `/about`, `/contact`
- [ ] SkipNav visible on Tab press; jumps to `#main`
- [ ] Footer renders with `data-theme="dark"`
- [ ] All 5 routes render without TypeScript errors

---

## Phase 2 — Homepage (Day 3)

**Deliverables:**
- `ProjectCard` component: 3/2 aspect ratio, caption slide-up hover, no image scale
- `ProjectGrid` component: 3-col CSS grid, Framer Motion AnimatePresence
- Homepage assembly:
  1. Full-viewport hero (first featured project image, `priority`)
  2. Discipline strip (`data-theme="accent"` or `data-theme="dark"`) — "Architecture. Interiors. Adaptive Reuse."
  3. Featured projects section: 3 ProjectCards filtered by `featured: true`, `priority` on first 2

**Ship gate:**
- [ ] Caption NOT visible by default (translateY: 100%)
- [ ] Caption slides up on hover — shows title, location, year
- [ ] Image does NOT scale on hover
- [ ] Hero fills 100svh; `priority` set on hero image
- [ ] 3 featured cards render and link to correct slugs

---

## Phase 3 — Work Section (Days 4–5)

**Deliverables:**
- `DisciplineFilter` component:
  - Row 1: Discipline tabs (All / Architecture / Interiors / Adaptive Reuse)
  - Row 2: Category pills (changes per discipline, empty for adaptive-reuse)
  - Active tab: border-bottom `--color-accent`
  - Active pill: filled `--color` background
- `/work` page: `'use client'`, two-state (discipline + category), filtered ProjectGrid
- `ProjectHero`: 100svh, `data-theme="dark"`, title + location overlay bottom-left
- `SynopsisSection`: two-col grid (1fr + 2fr), label + content, border-top divider
- `ImageGallery`: alternating full-width and half-width image rows
- `MaterialsList`: simple list of material names with border-top divider
- `NextProject`: dark section, wraps by index modulo
- `/work/[slug]` page: `generateStaticParams`, `notFound()`, full project layout assembly

**Ship gate:**
- [ ] Selecting "Architecture" shows correct category pills
- [ ] Selecting "Interiors" shows different category pills
- [ ] Selecting "Adaptive Reuse" shows NO category pills
- [ ] Switching disciplines resets category to "All"
- [ ] Grid animates on filter change (AnimatePresence)
- [ ] All 8 project slugs resolve correctly
- [ ] Unknown slug shows 404
- [ ] NextProject wraps from last to first

---

## Phase 4 — About & Contact (Day 6)

**Deliverables:**
- `StudioStatement`: dark section, display-size text, ≤ 20 words, `max-width: 20ch`
- `PressSection`: publication names (text-only, muted, opacity 0.4 → 1 on hover)
- `AwardsSection`: year / award / project grid rows with border-top dividers
- `/about` page: StudioStatement → founding story (two-col) → PressSection → AwardsSection → team grid
- `/contact` page: address block, general email, new business email (both `mailto:`), social links (noopener)

**Ship gate:**
- [ ] StudioStatement has `data-theme="dark"` at section level
- [ ] Press section shows text-only — no images, no logos
- [ ] Awards sorted newest first
- [ ] All email links are `mailto:` anchors
- [ ] All social links: `target="_blank" rel="noopener noreferrer"`

---

## Phase 5 — Polish & Launch (Day 7)

**Deliverables:**
- `useInView` applied to: ProjectCards on homepage, SynopsisSection, materials list, team grid entries
- Scroll reveal CSS: `.reveal` → `.visible` (opacity + translateY), respects prefers-reduced-motion
- `prefers-reduced-motion` CSS: all transitions 0.01ms, caption always visible without animation
- Framer Motion page transitions (optional if time allows — opacity fade)
- Open Graph meta in `layout.tsx` (title, description, og:image 1200×630)
- `/public/og-image.png` — create placeholder
- Final type check + build verification

**Ship gate (launch):**
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all 8 project slugs pre-rendered in `/out`
- [ ] Zero `border-radius` on structural elements (DevTools inspector)
- [ ] No font files in Network tab (system fonts only)
- [ ] Caption slide-up works; image does NOT scale
- [ ] Nav transparent on homepage hero before scroll
- [ ] `prefers-reduced-motion`: caption visible without animation, transitions instant
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] NextProject wraps from last to first

---

## Cut Order

**Never cut:**
- Caption slide-up hover pattern (it IS the card interaction)
- Two-level discipline/category filter (client workflow depends on it)
- ProjectHero 100svh full image (first impression of quality)
- `/about` studio statement dark section (brand voice)
- `/contact` with two email addresses (business requirement)
- System font stack (zero FOUT is a requirement, not an option)

**Cut first (if time pressure):**
- Framer Motion page transitions (fall back to CSS opacity only)
- useInView scroll reveals on team grid (lower impact)
- MaterialsList detailed component (can be plain `<p>` with comma-separated text)
- PressSection hover opacity animation (keep text-only, remove hover)
- `/public/og-image.png` (blank placeholder is fine at launch)

**Cut last:**
- ImageGallery alternating layout (simplify to uniform 2-col grid if needed)
- AwardsSection three-column layout (simplify to two-column year/award)

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Caption visible below image (no overflow:hidden) | High | High | `.imageWrapper { overflow: hidden }` is critical — grep before Phase 2 gate |
| Image scale added by AI agent | High | High | QA grep `grep -r "scale" src/components/ProjectCard/` — must return zero |
| Category not resetting on discipline change | High | Medium | `handleDisciplineChange` must call both `setDiscipline` AND `setCategory('all')` |
| Adaptive Reuse showing category pills | Medium | Medium | Categories array is `[]` for adaptive-reuse — `if (categories.length > 0)` gates the render |
| Nav transparent on wrong pages | Medium | Medium | `isHome` check uses `usePathname()` — only `'/'` should trigger transparent mode |
| `100svh` causes layout on desktop | Low | Low | `svh` is widely supported; fallback with `100vh` as backup is fine |
| Font weight 400 or 700 introduced | Medium | Medium | Only `300` and `500` allowed — `grep -r "font-weight: 400\|font-weight: 700" src/` must return zero |

---

## Testing Strategy

| Phase | Critical Test | Method |
|-------|--------------|--------|
| 0 | `[data-theme="dark"]` and `[data-theme="accent"]` resolve correctly | DevTools element toggle |
| 0 | No `border-radius` other than reset | `grep -r "border-radius" src/ | grep -v ": 0"` |
| 1 | Nav transparent on `/` homepage before scroll | Manual |
| 1 | Nav solid on `/work`, `/about`, `/contact` | Manual — navigate to each route |
| 2 | Caption hidden by default: `translateY(100%)` | DevTools Computed → `transform` |
| 2 | Caption slides up on hover | Manual hover test |
| 2 | Image does NOT scale on hover | DevTools Computed → `transform` on image element |
| 3 | Architecture → 6 category pills shown | Manual |
| 3 | Interiors → 7 different category pills shown | Manual |
| 3 | Adaptive Reuse → NO category pills | Manual |
| 3 | Switching discipline resets category | Manual — set Architecture → Institutional, then switch to Interiors |
| 3 | All 8 project slugs pre-render | `npm run build` → check `/out/work/` |
| 4 | Press section: text only, no images | DevTools Elements — confirm no `<img>` in press section |
| 5 | Caption always visible under `prefers-reduced-motion` | Chrome DevTools Rendering tab |
| 5 | Lighthouse ≥ 90 performance + accessibility on /work | Lighthouse CLI |

---

## Phase Gate Summary

| Phase | Gate must pass before next phase |
|-------|----------------------------------|
| 0 | TypeScript clean; theme vars correct; project data typed |
| 1 | Nav behaviour correct; all 5 routes render |
| 2 | Caption pattern verified; no image scale |
| 3 | Filter state machine correct; all slugs build |
| 4 | About/Contact pages complete; email links work |
| 5 | All launch checklist items passed |
