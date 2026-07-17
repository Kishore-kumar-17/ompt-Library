# 06 — Tasks
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Ask before changing theme system, project schema, or filter architecture.

---

## Phase 0 — Foundation

### TASK-001: Project setup
```bash
npx create-next-app@latest studio-lotus --typescript --no-tailwind --app --src-dir --no-eslint
cd studio-lotus
npm install framer-motion
```
Add to `next.config.ts`:
```typescript
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```
Verify: `npm run dev` runs; `tsc --noEmit` zero errors; no web font requests in Network tab.

---

### TASK-002: CSS globals and theme system
Create/replace `src/app/globals.css`:
1. Hard reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0; }`
2. Theme vars: `:root` (default) + `[data-theme="dark"]` + `[data-theme="accent"]`
3. `--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)`
4. Body: `font-family: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif; font-weight: 300; background-color: var(--color-bg); color: var(--color);`
5. Responsive base: `html { font-size: 15px }` → `16px` at 1440px → `18px` at 1920px
6. Spacing tokens: `--space-xs` through `--space-xxl`
7. Type tokens: `--size-display` through `--size-label`

Test: Add `data-theme="dark"` to `<body>` temporarily — should show #F5F2EE text on #1A1A1A bg.

Done when: All 3 themes work; `--ease` defined; `border-radius: 0` in reset; weights 300 on body.

---

### TASK-003: TypeScript types
Create `src/types/index.ts` with all interfaces from 02_Architecture.md § TypeScript Schema.

Done when: All types exported; no `any`; file compiles clean.

---

### TASK-004: Project data
Create `src/data/projects.ts` with 8 projects:
- 2 hospitality (architecture)
- 2 institutional (architecture)
- 2 interiors (1 retail, 1 workplace)
- 1 adaptive-reuse
- 1 homes
- 3 entries with `featured: true`
- All image paths: `/work/[slug]-cover.jpg`, `/work/[slug]-hero.jpg`, `/work/[slug]-1.jpg` etc.
- Indian city locations: Delhi, Mumbai, Jaipur, Bengaluru, Udaipur, Hyderabad, Pondicherry
- Materials arrays with real Indian materials (Rajasthani sandstone, lime plaster, handwoven cane, Kota stone, etc.)

Done when: All entries typed; `tsc --noEmit` passes; import works.

---

### TASK-005: Supporting data files
- `src/data/awards.ts`: 5 awards (year, award, project) — Surface Design Awards 2025, PLAN Awards 2024, LIV Hospitality 2024, JK AYA 2024, Dezeen longlisted
- `src/data/press.ts`: 6 press items (publication, title, year) — TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times, The Hindu
- `src/data/team.ts`: 10+ team members (name, role, discipline)

Done when: All 3 files importable with correct types; `tsc --noEmit` passes.

---

## Phase 1 — Layout Shell

### TASK-006: useScrolled hook
Create `src/hooks/useScrolled.ts`:
```typescript
export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}
```

Done when: Hook exports correctly; TypeScript clean.

---

### TASK-007: useInView hook
Create `src/hooks/useInView.ts` (from 02_Architecture.md § useInView Hook). Include `prefers-reduced-motion` check that immediately returns `inView: true`.

Done when: Hook compiles; returns `{ ref, inView }`.

---

### TASK-008: SkipNav component
```tsx
// src/components/SkipNav/SkipNav.tsx
export function SkipNav() {
  return <a href="#main" className="skip-nav">Skip to content</a>
}
```
Add `.skip-nav` CSS to `globals.css` (position absolute, off-screen default, on-screen on focus).

Done when: Tab from top of page shows skip link; Enter jumps to `#main`.

---

### TASK-009: Nav component
Create `src/components/Nav/Nav.tsx` + `Nav.module.css`.
- 3-col grid: logo (left) / discipline links (center) / utility links (right)
- Discipline links: Architecture / Interiors / Adaptive Reuse → `/work?discipline=[value]`
- Utility: About → `/about` | Contact → `/contact`
- Logo: studio name, weight 500, uppercase, letter-spacing 0.05em
- Links: `var(--size-label)`, weight 500, uppercase, letter-spacing 0.1em
- Hover: opacity 0.5→1, 0.2s `var(--ease)`
- Active route: opacity 1 (usePathname)
- `useScrolled(60)` hook: `transparent` class when !scrolled && isHome; `filled` class otherwise
- Transparent class: `background: transparent`; filled: `background: var(--color-bg)`, transition 0.3s

Done when: Nav transparent on homepage hero; cream after scroll; always cream on other pages.

---

### TASK-010: Footer component + root layout
Create `src/components/Footer/Footer.tsx` + `Footer.module.css`:
- `data-theme="dark"`
- Studio name left, year + social links right
- Social links: `target="_blank" rel="noopener noreferrer"`

`src/app/layout.tsx`: SkipNav + Nav + `<main id="main">{children}</main>` + Footer + metadata export.

Create empty page files: `work/page.tsx`, `work/[slug]/page.tsx`, `about/page.tsx`, `contact/page.tsx`.

Done when: All 5 routes render nav + footer without errors.

---

## Phase 2 — Homepage

### TASK-011: ProjectCard component
Create `src/components/ProjectCard/ProjectCard.tsx` + `ProjectCard.module.css`:
- `<Link>` wraps entire card
- `next/image fill` in `aspectRatio: 3/2` wrapper with `overflow: hidden`
- Caption div: `position absolute; bottom 0; translateY(100%)` default
- On `.card:hover .caption` and `.card:focus-visible .caption`: `translateY(0)`, 0.4s `var(--ease)`
- Gradient behind caption: `linear-gradient(transparent, rgba(26,26,26,0.75))`
- Caption content: title (weight 500) + location + year
- Below image: category label (uppercase, muted)
- CONFIRM: no `transform` on `.image` itself — no scale

Done when: Caption slides up on hover; image does NOT scale; keyboard focus triggers same state.

---

### TASK-012: ProjectGrid component
Create `src/components/ProjectGrid/ProjectGrid.tsx` + `ProjectGrid.module.css`:
- CSS grid: 3-col (1200px+), 2-col (768–1199px), 1-col (<768px)
- Gap: `var(--space-lg) var(--space-md)`
- Framer Motion `AnimatePresence` + `motion.div` on each card

Done when: Grid renders; responsive; animation placeholder ready for filter.

---

### TASK-013: Homepage assembly
`src/app/page.tsx`:
1. Hero: 100svh section, `next/image fill`, `priority`, first featured project image, gradient overlay, no text
2. Discipline strip: `<section data-theme="dark">` — "Architecture. Interiors. Adaptive Reuse." at `var(--size-h2)`, weight 500, generous padding
3. Featured work: `<section>` heading "Selected Work" + 3 ProjectCards (featured: true), `priority` on first 2

Done when: Homepage renders hero + strip + 3 cards; cards link correctly.

---

## Phase 3 — Work Section

### TASK-014: DisciplineFilter component
Create `src/components/DisciplineFilter/DisciplineFilter.tsx` + `DisciplineFilter.module.css`:
- Props: `activeDiscipline`, `onDisciplineChange`, `categories`, `activeCategory`, `onCategoryChange`
- Row 1 (discipline tabs): All / Architecture / Interiors / Adaptive Reuse
  - Active: `border-bottom: 2px solid var(--color-accent)`
  - `aria-selected={activeDiscipline === tab.value}`
- Row 2 (category pills): rendered only when discipline !== 'all' AND categories.length > 0
  - Active pill: `background: var(--color); color: var(--color-bg)`
  - `aria-pressed={activeCategory === pill.value}`
- Border-bottom on filter container: `1px solid var(--color-divider)`

Done when: Switching Architecture shows 6 category pills; Interiors shows 7 different pills; Adaptive Reuse shows no pills; switching discipline resets category.

---

### TASK-015: Work index page
`src/app/work/page.tsx` (`'use client'`):
```tsx
const [discipline, setDiscipline] = useState<Discipline | 'all'>('all')
const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
const handleDisciplineChange = (d) => { setDiscipline(d); setCategory('all') }
const filtered = projects
  .filter(p => discipline === 'all' || p.discipline === discipline)
  .filter(p => category === 'all' || p.category === category)
```
Render: heading "Work" + DisciplineFilter + ProjectGrid.

Done when: All filter combinations work; grid animates on change; "All" shows all 8 projects.

---

### TASK-016: Case study static generation
`src/app/work/[slug]/page.tsx`:
```typescript
export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}
export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()
  // render layout
}
```

Done when: All slugs resolve; unknown slug shows 404; `npm run build` pre-renders all routes.

---

### TASK-017: ProjectHero component
`src/components/ProjectHero/ProjectHero.tsx` + `ProjectHero.module.css`:
- `<section data-theme="dark">`, 100svh, `overflow: hidden`
- `next/image fill`, `priority`
- Gradient overlay: transparent top → rgba(26,26,26,0.6) bottom
- Bottom-left overlay: category label (label size, uppercase, muted) + title (h1 size, weight 500, -0.03em) + location (small, muted)

Done when: Hero fills viewport; title legible over gradient; dark theme applies.

---

### TASK-018: SynopsisSection and ApproachSection
`src/components/SynopsisSection/SynopsisSection.tsx`:
- Props: `label: string`, `content: string`
- Two-col grid: label (1fr) / content (2fr)
- Label: label size, uppercase, weight 500, muted, padding-top 0.2rem
- Content: body size, line-height 1.75, max-width 65ch
- `border-top: 1px solid var(--color-divider)`
- Mobile: single column

Use the same component for both Synopsis and Approach sections (different label props).

Done when: Two-col layout desktop; stacked mobile; divider renders.

---

### TASK-019: ImageGallery component
`src/components/ImageGallery/ImageGallery.tsx`:
- Props: `images: string[]`
- 2-col CSS grid
- Every 3rd image starting from index 0 (i % 3 === 0): `grid-column: 1 / -1`, aspect 16/9
- Other images: single column, aspect 3/2
- Gap: `var(--space-sm)`
- Mobile: all images full width

Done when: Gallery alternates between full-width and paired images.

---

### TASK-020: MaterialsList component
`src/components/MaterialsList/MaterialsList.tsx`:
- Uses SynopsisSection layout (or same component with list rendering)
- Label: "Materials"
- Content: materials array displayed as comma-separated text or ruled list

Done when: Materials display from project data.

---

### TASK-021: NextProject component
`src/components/NextProject/NextProject.tsx` (from 02_Architecture.md § NextProject Logic):
- `data-theme="dark"` section
- Finds `(index + 1) % projects.length`
- Shows "Next Project" label + next project title as large Link + location + year below

Done when: Wraps correctly from last to first; dark theme applies.

---

### TASK-022: Project detail page assembly
Assemble `src/app/work/[slug]/page.tsx`:
ProjectHero → SynopsisSection (synopsis) → SynopsisSection (approach) → ImageGallery → MaterialsList → AwardsSection (conditional) → NextProject

Done when: Full project page renders all sections correctly.

---

## Phase 4 — About & Contact

### TASK-023: StudioStatement component
`src/components/StudioStatement/StudioStatement.tsx`:
- `<section data-theme="dark">`
- Paragraph: `var(--size-display)`, weight 500, line-height 1.1, letter-spacing -0.03em, max-width 20ch
- Padding: `var(--space-xxl) var(--space-lg)`

Done when: Dark section; display-size text; max 20 words.

---

### TASK-024: PressSection component
`src/components/PressSection/PressSection.tsx`:
- Grid of publication names (text-only — no logos, no images)
- `color: var(--color-muted)`, hover: `color: var(--color)`, 0.2s `var(--ease)`
- 3-col desktop, 2-col tablet, 1-col mobile

Done when: 6 publications render as text; no images in Network tab.

---

### TASK-025: AwardsSection component
`src/components/AwardsSection/AwardsSection.tsx`:
- `border-top: 1px solid var(--color-divider)` on each row
- Row: year (muted) / award name (weight 500) / project name (muted, right)
- Sorted newest first from awards.ts data
- Mobile: two-col (year + award, project below)

Done when: 5 awards render from data; newest first; dividers between rows.

---

### TASK-026: About page assembly
`src/app/about/page.tsx`:
1. StudioStatement
2. Founding story (two-col text block — year founded, founders, philosophy paragraph)
3. PressSection with heading "Press"
4. AwardsSection with heading "Recognition"
5. Team grid (grouped by discipline)

Done when: All sections render; StudioStatement has correct dark theme.

---

### TASK-027: Contact page
`src/app/contact/page.tsx`:
- Studio name + address block
- General email: `mailto:` anchor, weight 500, uppercase
- New Business email: `mailto:` anchor, weight 500, uppercase, "New Business" label
- Social links: Instagram + LinkedIn, `target="_blank" rel="noopener noreferrer"`

Done when: All links functional; social links open new tab.

---

## Phase 5 — Polish & Launch

### TASK-028: Scroll reveals
Apply `useInView` to: homepage ProjectCards, SynopsisSection, ImageGallery, team grid entries.
CSS `.reveal` → `.visible` pattern in `globals.css`.

Done when: Elements fade up on scroll; no animation under reduced motion.

---

### TASK-029: prefers-reduced-motion
Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  .caption { transform: translateY(0) !important; }
}
```

Done when: Enabling reduced motion makes caption always visible; all transitions instant.

---

### TASK-030: Open Graph meta
`layout.tsx` metadata export with title, description, og:image (`/og-image.png`, 1200×630). Create placeholder `/public/og-image.png`.

Done when: OG tags in page source.

---

### TASK-031: Final audit
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all 8 slugs in `/out/work/`
- [ ] Zero `border-radius` on structural elements
- [ ] No font files in Network tab
- [ ] Caption slides up on hover; image does NOT scale
- [ ] Nav transparent on homepage hero before scroll; cream after
- [ ] Two-level filter: architecture/interiors show correct pills; adaptive-reuse shows no pills
- [ ] `aria-selected` on discipline tabs; `aria-pressed` on category pills
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] NextProject wraps from last to first
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages

Deploy: `vercel --prod`

Done when: All checklist items confirmed.
