# 06 — Tasks
## Studio Portfolio with Case Studies · portfolio_platform_03

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Ask before changing theme system, case study schema, or page structure.

---

## Phase 0 — Foundation

### TASK-001: Project setup
```bash
npx create-next-app@latest studio --typescript --no-tailwind --app --src-dir --no-eslint
cd studio
npm install framer-motion
```
Verify: `npm run dev` runs; `tsc --noEmit` zero errors; no web font requests in Network tab.

---

### TASK-002: CSS globals and theme system
Create/replace `src/app/globals.css` with:
1. Hard reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0; }`
2. Theme CSS vars: `:root` (default) + `[data-theme="dark"]` + `[data-theme="red"]` + `[data-theme="blue"]`
3. `--ease: cubic-bezier(0.215, 0.61, 0.355, 1)`
4. Body: `background-color: var(--color-bg); color: var(--color); transition: background-color 0.3s var(--ease), color 0.3s var(--ease)`
5. Font: `font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`
6. Responsive base size: `html { font-size: 15px }` → `17px` at 1600px → `21px` at 2400px
7. All spacing tokens (`--space-xs` through `--space-xxl`)
8. All type size tokens (`--size-display` through `--size-label`)

Test: Add `data-theme="dark"` to `<body>` temporarily — page should show white text on black.

Done when: All 4 themes work; `--ease` token defined; `border-radius: 0` in reset.

---

### TASK-003: TypeScript types
Create `src/types/index.ts` with all interfaces from 02_Architecture.md § TypeScript Schema.

Done when: All types exported; no `any`; file compiles clean.

---

### TASK-004: Work data
Create `src/data/work.ts` with 6–8 case studies:
- At least 2 entries per category (branding, digital, experience, ecommerce, content — can double up)
- 3 entries with `featured: true`
- All image paths pointing to `/work/[name].jpg` (add actual images or use placeholder `/work/placeholder.jpg`)
- `nextSlug` is handled by array order — no need to store it

Done when: All entries typed; `tsc --noEmit` passes; import works in a test file.

---

### TASK-005: Team and awards data
Create `src/data/team.ts` (3 discipline pillars, 3+ members each) and `src/data/awards.ts` (5+ awards, year + award + project).

Done when: Both files importable with correct types.

---

## Phase 1 — Layout Shell

### TASK-006: SkipNav component
```tsx
// src/components/SkipNav/SkipNav.tsx
export function SkipNav() {
  return <a href="#main" className="skip-nav">Skip to content</a>
}
```
CSS in `globals.css`:
```css
.skip-nav { position: absolute; top: -100%; left: 0; padding: 0.75rem 1.5rem; background: var(--color); color: var(--color-bg); font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; z-index: 999; }
.skip-nav:focus { top: 0; }
```

Done when: Tab from page top shows skip link; Enter jumps to `#main`.

---

### TASK-007: Nav component
Create `src/components/Nav/Nav.tsx` + `Nav.module.css`.

Links: Work → `/work` | About → `/about` | Contact → `/contact`
- Sticky `position: sticky; top: 0; z-index: 100`
- `background: var(--color-bg)` — inherits from section behind it
- `color: var(--color)` — adapts to section theme
- Logo left (studio name, weight 700, letter-spacing -0.02em)
- Links right: `var(--size-label)`, weight 700, uppercase, letter-spacing 0.08em
- Hover: `opacity: 0.5`, 0.2s `var(--ease)`
- Active route: `opacity: 1` (use `usePathname()` from next/navigation)

Done when: Nav on all pages; white on dark sections, black on light; active route visible.

---

### TASK-008: Root layout and footer
`src/app/layout.tsx`: `<SkipNav>`, `<Nav>`, `<main id="main">`, `<Footer>`, metadata export.

Footer (dark theme, simple): studio name left, year + social links right.

Create empty page files: `work/page.tsx`, `work/[slug]/page.tsx`, `about/page.tsx`, `contact/page.tsx` — each returns a placeholder `<div>`.

Done when: All 5 routes render nav + footer without errors.

---

## Phase 2 — Homepage

### TASK-009: VideoHero component
`src/components/VideoHero/VideoHero.tsx`:
```tsx
<section data-theme="dark" className={styles.section}>
  <video
    autoPlay muted loop playsInline
    poster="/hero-poster.jpg"
    className={styles.video}
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>
  <h1 className={styles.headline}>{headline}</h1>
</section>
```
Add `/public/hero.mp4` (placeholder or real video) and `/public/hero-poster.jpg`.
`prefers-reduced-motion`: add CSS to hide `video` and show a poster `<img>` instead.

Done when: Video plays muted looped on load; poster shows under reduced-motion.

---

### TASK-010: WorkCard component
`src/components/WorkCard/WorkCard.tsx`:
- Wraps in `<Link href={/work/${slug}}>` (Next.js Link)
- `next/image` with `aspect-ratio: 4/3`, `object-fit: cover`, `fill` inside wrapper div
- Image wrapper: `overflow: hidden`; image: `transition: transform 0.3s var(--ease)`
- `.card:hover .image { transform: scale(1.04) }`
- Below image: client name (h3, weight 700) + year (right-aligned, muted) + category (label, uppercase, muted)

Done when: Card renders; hover scale works; links to correct slug.

---

### TASK-011: Homepage assembly
`src/app/page.tsx`:
1. `<VideoHero headline="Digital-First Design Studio" />`
2. Studio statement strip (`<section data-theme="dark">` + 1 sentence)
3. `<section>` with heading "Featured Work" + grid of 3 WorkCards (filtered `featured: true`)

WorkCards on homepage: `grid-template-columns: repeat(3, 1fr)` desktop, 1-col mobile.

Done when: Homepage renders hero + strip + 3 featured cards; cards link correctly.

---

## Phase 3 — Work Section

### TASK-012: FilterBar component
`src/components/FilterBar/FilterBar.tsx`:
- Props: `categories`, `active`, `onSelect`
- Pills: `<button>` elements, not links
- Active: `background: var(--color); color: var(--color-bg)`
- Inactive: `border: 1px solid var(--color); background: transparent`
- Hover: fill to active style, 0.2s `var(--ease)`
- `border-radius: 4px` only
- `aria-pressed={active === cat.value}` on each button

Done when: All category pills render; active fills correctly; `aria-pressed` toggles.

---

### TASK-013: WorkGrid component
`src/components/WorkGrid/WorkGrid.tsx`:
- Props: `items: CaseStudy[]`
- `display: grid; grid-template-columns: repeat(2, 1fr)` desktop
- Gap: `var(--space-xl) var(--space-lg)`
- 1-col on mobile
- Wraps each item in `<WorkCard>`
- Framer Motion `AnimatePresence` + `motion.div` on each card for filter transitions

Done when: 6+ work cards in 2-col grid; responsive; filter animation works.

---

### TASK-014: Work index page
`src/app/work/page.tsx` (`'use client'`):
```tsx
const [active, setActive] = useState<Category | 'all'>('all')
const filtered = active === 'all' ? caseStudies : caseStudies.filter(cs => cs.category === active)
```
Render: page heading "Work" + `<FilterBar>` + `<WorkGrid items={filtered}>`.

Done when: All categories filter correctly; "All" shows all 6+ cards.

---

### TASK-015: Case study static generation
`src/app/work/[slug]/page.tsx`:
```typescript
export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find(c => c.slug === params.slug)
  if (!cs) notFound()
  // render layout
}
```

Done when: All slugs resolve; unknown slug shows Next.js 404; `npm run build` pre-renders all routes.

---

### TASK-016: CaseStudyHero
`src/components/CaseStudyHero/CaseStudyHero.tsx`:
- `<section data-theme="dark">`, full-width, 70svh height
- `next/image fill` with `object-fit: cover`, `opacity: 0.6` (darkened for text contrast)
- Project title: display size, weight 700, white, centered, `z-index: 1`
- Client name above title: label size, uppercase, muted

Done when: Hero image renders full-width; title legible over darkened image.

---

### TASK-017: MetaStrip
`src/components/MetaStrip/MetaStrip.tsx`:
- `display: grid; grid-template-columns: repeat(4, 1fr)`
- Cells: Client / Scope (joined) / Deliverables (joined) / Year
- Each cell: small label above (`var(--size-label)`, uppercase, muted), value below (weight 700)
- `border-top: 1px solid var(--color)` + `border-bottom: 1px solid var(--color)`
- Padding: `var(--space-md)` vertical

Done when: 4 cells render in a row with correct content from case study data.

---

### TASK-018: NarrativeSection and case study layout
`src/components/NarrativeSection/NarrativeSection.tsx`:
- Props: `label: string`, `body: string`, `image?: string`
- Two-column grid: label (1fr) / body (2fr)
- Label: label size, uppercase, weight 700, opacity 0.5, padding-top 0.25rem
- Body: body size, 1.7 line-height, max-width 65ch
- `border-top: 1px solid var(--color)`
- Mobile: single column

Assemble case study page: `<CaseStudyHero>` + `<MetaStrip>` + `<NarrativeSection label="Challenge">` + `<NarrativeSection label="Approach">` + `<NarrativeSection label="Outcome">` + `<NextProject>`.

Done when: Case study renders all sections; narrative is readable on mobile.

---

### TASK-019: NextProject CTA
`src/components/NextProject/NextProject.tsx`:
- Finds index of current slug in `caseStudies` array
- `next = caseStudies[(index + 1) % caseStudies.length]`
- `<section data-theme="dark">`: "Next Project" label + next client name as large `<Link>`
- Arrow: `→` after client name
- Full-width, generous padding

Done when: Next project wraps correctly from last to first; dark theme applies.

---

## Phase 4 — About & Contact

### TASK-020: ManifestoSection
`<section data-theme="dark">`:
- Single paragraph, `var(--size-display)`, weight 700, line-height 1.1, max-width 18ch
- Letter-spacing -0.02em
- Padding: `var(--space-xxl)`

Done when: Manifesto at display size; dark section; max 15 words of text.

---

### TASK-021: CapabilitiesSection
Two-column grid: Design column + Development column. Each column: heading (uppercase, weight 700) + list of service names separated by `border-bottom: 1px solid var(--color)` dividers.

Done when: Two columns side by side desktop; stacked mobile; dividers between items.

---

### TASK-022: TeamSection
Three columns (Design / Development / Operations), each with discipline heading + list of `{ name, role, year }`. Mobile: stacked.

Done when: 3 pillars with members; name bold; role + year muted.

---

### TASK-023: AwardsSection
List: `border-top: 1px solid var(--color)` on each item; year (muted, right-aligned) + award name (weight 700, left). No logos.

Done when: Awards list renders from `awards.ts`; newest first.

---

### TASK-024: Contact page
`/contact`: studio name + address block; general email `mailto:` (weight 700, uppercase); new business email `mailto:` (weight 700, uppercase, marked "New Business"); social links row.

Done when: All links functional; social links open new tab with noopener.

---

## Phase 5 — Polish & Launch

### TASK-025: useInView scroll reveal
Create `src/hooks/useInView.ts` (from 02_Architecture.md). Apply `.reveal` + `.visible` pattern to WorkCards, NarrativeSections, TeamSection members. Skip animation under `prefers-reduced-motion`.

Done when: Elements fade up on scroll; no animation under reduced motion preference.

---

### TASK-026: prefers-reduced-motion
Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  video[autoplay] { display: none; }
  .video-poster { display: block !important; }
}
```

Done when: Enabling reduced motion hides autoplay video; all transitions instant.

---

### TASK-027: Open Graph meta
`layout.tsx` metadata export with title, description, og:image (`/og-image.png`, 1200×630). Create OG image in public.

Done when: OG tags in page source; image loads when URL shared.

---

### TASK-028: Final audit
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds, all slugs pre-rendered
- [ ] Zero `border-radius` on structural elements (inspector)
- [ ] No font files in Network tab
- [ ] All `data-theme` attributes present on correct sections
- [ ] FilterBar `aria-pressed` toggles correctly
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] NextProject wraps from last to first

Deploy: `vercel --prod`

Done when: All checklist items confirmed.
