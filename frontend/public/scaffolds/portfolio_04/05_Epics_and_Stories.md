# 05 — Epics and Stories
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## Epic 1 — Foundation

**STORY-001: Project setup**
`create-next-app` no-Tailwind; CSS Modules; static export (`output: 'export'`); `tsc --noEmit` zero errors; no web font requests; `border-radius: 0` hard reset.

**STORY-002: Theme system**
`data-theme="default|dark|accent"` CSS vars on any element; default: #1A1A1A on #F5F2EE; dark: #F5F2EE on #1A1A1A; accent: #F5F2EE on #C4501A; transition 0.3s `var(--ease)`.

**STORY-003: TypeScript schema**
`Discipline`, `ArchCategory`, `IntCategory`, `ProjectCategory`, `Project`, `Award`, `PressItem`, `TeamMember` interfaces in `src/types/index.ts`. No `any`.

**STORY-004: Project data**
`src/data/projects.ts` with 8 projects: all fields typed; disciplines balanced (architecture/interiors/adaptive-reuse); 3 marked `featured: true`; Indian city locations; materials arrays with real Indian materials.

**STORY-005: Supporting data**
`src/data/awards.ts` (5 awards, year + award + project); `src/data/press.ts` (6 press items); `src/data/team.ts` (10+ members by discipline).

---

## Epic 2 — Layout Shell

**STORY-006: useScrolled hook**
`useScrolled(threshold = 60)` — scroll event listener, passive, returns boolean. Threshold 60px. Cleans up listener on unmount.

**STORY-007: useInView hook**
`useInView(threshold = 0.12)` — IntersectionObserver, fires once (unobserve after intersect), prefers-reduced-motion: immediately returns `inView: true`. Cleans up on unmount.

**STORY-008: Navigation**
Sticky nav; 3-col grid layout (logo / discipline links / utility); logo left (studio name, weight 500, uppercase, 0.05em tracking); discipline links centre (Architecture / Interiors / Adaptive Reuse); About + Contact right. Text: `var(--size-label)`, uppercase, 0.1em tracking. Hover: opacity 0.5→1, 0.2s var(--ease). Active route: opacity 1.

**STORY-009: Nav scroll behaviour**
On `/` (homepage): nav transparent before 60px scroll; background transitions to `var(--color-bg)` after threshold, 0.3s `var(--ease)`. On all other pages: nav always shows `var(--color-bg)`. Implemented via `useScrolled` + `isHome` pathname check.

**STORY-010: Footer**
`data-theme="dark"`; studio name left; year + social links right; social links `target="_blank" rel="noopener noreferrer"`.

**STORY-011: Root layout + routing**
`layout.tsx`: SkipNav + Nav + `<main id="main">` + Footer + metadata export. All 5 routes render without errors: `/` `/work` `/work/[slug]` `/about` `/contact`.

---

## Epic 3 — Homepage

**STORY-012: ProjectCard component**
`next/image`, 3:2 aspect ratio, `overflow: hidden`. Caption `div` absolutely positioned at bottom, `translateY(100%)` by default, slides to `translateY(0)` on `.card:hover` + `.card:focus-visible`, 0.4s `var(--ease)`. Caption content: title (weight 500) + location + year. Gradient behind caption text. NO image scale on hover. Entire card is `<Link>`.

**STORY-013: ProjectGrid component**
`display: grid`, 3-col desktop (1200px+), 2-col tablet (768px–1199px), 1-col mobile. Gap: `var(--space-lg) var(--space-md)`. `AnimatePresence` wrapping each card for filter transitions.

**STORY-014: Homepage hero**
Full-viewport hero section (100svh), `next/image fill`, `object-fit: cover`, `priority`. Gradient overlay (transparent → rgba(26,26,26,0.5)) from bottom. No headline text on hero — image only. Links to first featured project on click (optional — or static image only).

**STORY-015: Discipline strip**
`<section data-theme="dark">` (or `data-theme="accent"`): horizontal bar listing "Architecture · Interiors · Adaptive Reuse" at `var(--size-h2)`, weight 500, letter-spacing -0.02em. Generous vertical padding `var(--space-xl)`.

**STORY-016: Featured projects**
3 ProjectCards filtered by `featured: true`; rendered below discipline strip; `priority` on first 2 images; 3-col desktop grid.

---

## Epic 4 — Work Section

**STORY-017: DisciplineFilter — tabs row**
Row 1 always visible: All / Architecture / Interiors / Adaptive Reuse. Active tab: border-bottom 2px `var(--color-accent)` (#C4501A). Inactive: opacity 0.5. `aria-selected` on each tab. Keyboard focusable.

**STORY-018: DisciplineFilter — category pills row**
Row 2 appears only when discipline ≠ 'all'. Category list: Architecture → 6 categories; Interiors → 7 categories; Adaptive Reuse → no pills (not rendered). Active pill: `background: var(--color)`, `color: var(--color-bg)`. Inactive: bordered. `aria-pressed`. Switching discipline resets category to 'all'.

**STORY-019: Work index page**
`'use client'`. Two useState: `discipline` (Discipline | 'all') and `category` (ProjectCategory | 'all'). Filtered array: discipline filter then category filter. `handleDisciplineChange` resets category. Renders: page heading "Work" + DisciplineFilter + ProjectGrid.

**STORY-020: Static generation**
`generateStaticParams` maps all project slugs. `notFound()` on unknown slug. `npm run build` pre-renders all 8 routes.

**STORY-021: ProjectHero**
`data-theme="dark"`, 100svh, `next/image fill`, `priority`. Bottom-left overlay: category label (label size, uppercase, muted) + title (h1 size, weight 500, letter-spacing -0.03em) + location (small, muted).

**STORY-022: SynopsisSection**
Two-column grid: label col (1fr) — "Synopsis" uppercase label; content col (2fr) — synopsis text. `border-top: 1px solid var(--color-divider)`. Padding `var(--space-xl)` vertical. Single col on mobile.

**STORY-023: ApproachSection**
Same layout as SynopsisSection. Label: "Approach". Content: approach text, `line-height: 1.75`, `max-width: 65ch`.

**STORY-024: ImageGallery**
Alternating: every 3rd image (index 0, 3, 6...) spans full width (16/9 aspect ratio); others are half-width pairs (3/2 aspect ratio). Gap `var(--space-sm)`. Single col on mobile.

**STORY-025: MaterialsList**
`border-top: 1px solid var(--color-divider)`, label "Materials" (uppercase, muted), list of material names (weight 500). Two-column layout: label 1fr, materials 2fr.

**STORY-026: NextProject CTA**
`data-theme="dark"`. "Next Project" label (label size, muted). Next project title as large `<Link>` with →. Next project location + year below. Wraps: `(index + 1) % projects.length`.

**STORY-027: Project detail page assembly**
ProjectHero → SynopsisSection → ApproachSection → ImageGallery → MaterialsList → AwardsSection (if project.awards) → NextProject.

---

## Epic 5 — About & Contact

**STORY-028: StudioStatement**
`data-theme="dark"` section. Single paragraph: `var(--size-display)`, weight 500, line-height 1.1, letter-spacing -0.03em, `max-width: 20ch`. Text: "Conscious design. Celebrating local resources, cultural influences, and context." (≤ 20 words).

**STORY-029: PressSection**
Text-only list of publication names (TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times, The Hindu). No logos, no images. `color: var(--color-muted)`. Hover: `color: var(--color)`, 0.2s `var(--ease)`. Grid layout, 3-col desktop.

**STORY-030: AwardsSection**
`border-top: 1px solid var(--color-divider)` on each row. Three columns: year (muted) / award name (weight 500) / project name (muted, right-aligned). Sorted newest first.

**STORY-031: About page assembly**
StudioStatement → two-column founding story → PressSection → AwardsSection → team grid (name weight 500 + role + discipline grouping).

**STORY-032: Contact page**
Studio address block. General email `mailto:` link (weight 500, uppercase). New business email `mailto:` link (weight 500, uppercase, labelled "New Business"). Social links: Instagram, LinkedIn — `target="_blank" rel="noopener noreferrer"`.

---

## Epic 6 — Polish & Accessibility

**STORY-033: Scroll reveals**
`useInView` applied to: ProjectCards on homepage, SynopsisSection, ImageGallery rows, team members. `.reveal` → `.visible` class: opacity 0→1, translateY 20px→0, 0.6s `var(--ease)`. Skip under `prefers-reduced-motion`.

**STORY-034: prefers-reduced-motion**
In `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  .caption { transform: translateY(0); }  /* always visible, no slide */
}
```

**STORY-035: Focus states**
All interactive elements: `outline: 2px solid var(--color-accent); outline-offset: 2px` on `:focus-visible`. Discipline tabs: `aria-selected`. Category pills: `aria-pressed`. Nav links: keyboard reachable.

**STORY-036: Open Graph meta**
`layout.tsx` metadata export: `og:title`, `og:description`, `og:image` (`/og-image.png`, 1200×630), `og:type: website`. Studio name + tagline.

**STORY-037: Performance**
`next/image priority` on: homepage hero, homepage ProjectCards (first 2), ProjectHero on detail page. Correct `sizes` attribute on all ProjectCard images. No unused JS.

---

## Expanded Acceptance Criteria — Critical Stories

---

### STORY-012 — ProjectCard (expanded AC)

Acceptance criteria:
- `.imageWrapper` has `position: relative; overflow: hidden; aspect-ratio: 3 / 2`
- `.caption` has `position: absolute; bottom: 0; left: 0; right: 0; transform: translateY(100%); transition: transform 0.4s var(--ease)`
- `.card:hover .caption, .card:focus-visible .caption { transform: translateY(0) }`
- Caption shows: title (weight 500) + location (muted) + year (muted)
- Caption background: `linear-gradient(transparent, rgba(26,26,26,0.75))`
- Caption text colour: `#F5F2EE` (always light — gradient is always dark)
- **NO scale on image** — zero instances of `transform: scale` on `.image` in hover state
- Entire card is a `<Link href={/work/${project.slug}}>` wrapping the image + caption

**QA grep:**
```bash
# Must return ZERO — image scale on hover is forbidden
grep -r "scale" src/components/ProjectCard/
```

---

### STORY-017 — DisciplineFilter Tab Row (expanded AC)

Acceptance criteria:
- Four tabs: "All" / "Architecture" / "Interiors" / "Adaptive Reuse"
- Active tab: `border-bottom: 2px solid var(--color-accent)` (#C4501A); opacity 1
- Inactive tabs: opacity 0.5; no border-bottom
- `aria-selected="true"` on active tab; `aria-selected="false"` on inactive
- Keyboard: tab through with Tab key; activate with Enter/Space
- Font: `var(--size-label)`, uppercase, letter-spacing 0.1em, weight 500

---

### STORY-018 — DisciplineFilter Category Row (expanded AC)

Acceptance criteria:
- Row ONLY appears when discipline ≠ 'all'
- When discipline === 'architecture': show `ARCH_CATEGORIES` (6 options: Hospitality, Institutional, Corporate, Culture, Mixed Use, Homes)
- When discipline === 'interiors': show `INT_CATEGORIES` (7 options: Retail, Workplace, Leisure, Homes, Hotels, F&B, Brand Experiences)
- When discipline === 'adaptive-reuse': show NO category row (empty `categories` array)
- Active pill: `background: var(--color)`, `color: var(--color-bg)`
- Inactive pill: `border: 1px solid var(--color)`, transparent background
- `aria-pressed="true"` on active pill; `aria-pressed="false"` on inactive
- Switching discipline resets category to 'all' — **must call `setCategory('all')` inside `handleDisciplineChange`**

---

### STORY-019 — Work Index Page (expanded AC)

Acceptance criteria:
- `'use client'` directive at top of file
- `const [discipline, setDiscipline] = useState<Discipline | 'all'>('all')`
- `const [category, setCategory] = useState<ProjectCategory | 'all'>('all')`
- `handleDisciplineChange(d)` always calls both `setDiscipline(d)` AND `setCategory('all')`
- Filtered array: projects filtered by discipline first, then by category
- When discipline === 'all' and category === 'all': all 8 projects shown
- When discipline === 'adaptive-reuse': show all adaptive-reuse projects, no category sub-filter
- ProjectGrid wrapped in `<AnimatePresence>` for smooth filter transitions

---

### STORY-021 — ProjectHero (expanded AC)

Acceptance criteria:
- `data-theme="dark"` on the `<section>` wrapping the hero
- Hero fills exactly `100svh` (use `svh` not `vh` — avoids mobile browser chrome issues)
- `<Image fill priority sizes="100vw" style={{ objectFit: 'cover' }}>`
- Overlay text positioned `bottom-left`:
  - Category label: `var(--size-label)`, uppercase, `var(--color-muted)`, margin-bottom 0.5rem
  - `<h1>` title: `var(--size-h1)`, weight 500, letter-spacing -0.03em
  - Location: `var(--size-label)`, `var(--color-muted)`
- Gradient behind text: `linear-gradient(transparent, rgba(26,26,26,0.6))` from image bottom
- `<h1>` is the ONLY `<h1>` on the page — the project title

---

## Epic 7 — Quality Verification

**Goal:** Verify non-negotiable constraints before launch: no image scale, correct category pills per discipline, caption slide-up works, no web fonts, `tsc --noEmit` clean.

### Stories

**STORY-038: Caption + image constraint verification**
```bash
# MUST return zero — image scale on hover is forbidden
grep -r "scale" src/components/ProjectCard/
# Must exist — overflow:hidden is critical for caption clip
grep -r "overflow: hidden" src/components/ProjectCard/
```
Manual: hover each card → caption slides up; image does NOT move.

**STORY-039: Two-level filter state machine verification**
- Switch to Architecture → 6 pills visible; switch to Interiors → 7 DIFFERENT pills; switch to Adaptive Reuse → 0 pills
- Select Architecture → Institutional → switch to Interiors → category resets to "All", correct Interiors pills shown
- All 8 projects pre-rendered: `npm run build` shows 8 routes under `/out/work/`

**STORY-040: System font and border-radius audits**
```bash
grep -r "border-radius" src/ | grep -v "border-radius: 0"  # zero results
grep -r "@import\|fonts.google" src/                        # zero results
grep -r "font-weight: 400\|font-weight: 700" src/          # zero results (only 300 and 500 allowed)
```

**STORY-041: Accessibility audit**
- One `<h1>` per page: the ProjectHero title on project pages, the page heading on list pages
- All `next/image` instances have descriptive `alt` text — never empty or generic
- `aria-selected` on discipline tabs toggles in browser DevTools
- `aria-pressed` on category pills toggles
- Lighthouse accessibility ≥ 90 on /work, /about, /contact

**STORY-042: Nav transparency verification**
- Homepage: on load, check Network tab — nav background is transparent
- Scroll 70px on homepage — nav background transitions to `--color-bg`
- Navigate to /work — nav immediately shows `--color-bg` (no transparent mode)
- `useScrolled` hook: confirm event listener is removed on unmount (check with React DevTools)
