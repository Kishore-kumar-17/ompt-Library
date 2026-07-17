# 05 — Epics and Stories
## Studio Portfolio with Case Studies · portfolio_platform_03

---

## Epic 1 — Foundation

**STORY-001: Project setup**
`create-next-app` no-Tailwind; CSS Modules; `tsc --noEmit` zero errors; no web font requests.

**STORY-002: Theme system**
`data-theme="default|dark|red|blue"` CSS vars on any element; background + color transition 0.3s `var(--ease)`; `--ease: cubic-bezier(0.215,0.61,0.355,1)` token.

**STORY-003: TypeScript schema**
`CaseStudy`, `Category`, `Theme`, `TeamMember`, `TeamData`, `Award` interfaces in `src/types/index.ts`. No `any`.

**STORY-004: Work data**
`src/data/work.ts` with 6–8 case studies; all fields typed; at least 2 per category; 3 marked `featured: true`.

**STORY-005: Team and awards data**
`src/data/team.ts`: 3 discipline pillars, 3+ members each. `src/data/awards.ts`: 5+ awards.

---

## Epic 2 — Layout Shell

**STORY-006: Navigation**
Sticky nav; logo left, links right; `var(--color)` text (adapts to section theme); opacity 0.5 on hover; active route at opacity 1; skip-nav as first DOM element.

**STORY-007: Footer**
`data-theme="dark"`; studio name; copyright year; social links (target blank noopener); renders on all pages.

**STORY-008: Page routing**
All 5 routes render without error: `/` `/work` `/work/[slug]` `/about` `/contact`. `generateStaticParams` exports all slugs. `notFound()` on unknown slug.

---

## Epic 3 — Homepage

**STORY-009: Video hero**
Full-viewport `<section data-theme="dark">`; `<video autoPlay muted loop playsInline>` fills section; `poster="/hero-poster.jpg"`; studio tagline centered, `var(--size-display)`, font-weight 700; `prefers-reduced-motion`: video paused, poster shown.

**STORY-010: Featured work cards**
3 WorkCards filtered by `featured: true` from work data; render below hero; each links to `/work/[slug]`.

**STORY-011: WorkCard component**
Cover image (`next/image`, 4:3 aspect ratio); client name (h3, weight 700); category (label size, uppercase, muted); year (right-aligned, muted); hover: image `scale(1.04)` 300ms `var(--ease)`; entire card is a `<Link>` to `/work/[slug]`.

**STORY-012: Studio statement strip**
`<section data-theme="dark">` between hero and featured work; 1–2 sentence manifesto; `var(--size-h2)` size; centered.

---

## Epic 4 — Work Section

**STORY-013: FilterBar**
Category pills: All / Branding / Digital / Experience / E-commerce / Content; active pill: filled (`bg: var(--color)`, `color: var(--color-bg)`); inactive: bordered; transition 0.2s `var(--ease)`; `border-radius: 4px` only; keyboard focusable.

**STORY-014: WorkGrid**
2-col grid (`gap: var(--space-xl) var(--space-lg)`); 1-col mobile; receives filtered case studies as prop; Framer Motion `AnimatePresence` for grid item exit/enter on filter change.

**STORY-015: Work index page**
Client-side filter state (`useState`); `FilterBar` + `WorkGrid` composed; all case studies shown at "All"; instant filter on category click.

**STORY-016: Case study static generation**
`generateStaticParams` maps all slugs; `notFound()` on unknown; page resolves correct `CaseStudy` object from slug.

**STORY-017: CaseStudyHero**
Full-width `next/image` hero image; project title overlay (dark theme, display size); client name below title (label size, uppercase, muted).

**STORY-018: MetaStrip**
Horizontal strip of 4 cells: Client name / Scope (comma-joined) / Deliverables (comma-joined) / Year; each cell has small label above and value below; border-top 1px `var(--color)`.

**STORY-019: NarrativeSection**
Two-column: label column (1fr) + body column (2fr); label uppercase small weight 700 muted; body `var(--size-body)` 1.7 line-height; border-top 1px `var(--color)`; single column on mobile. Used for Challenge, Approach, Outcome.

**STORY-020: NextProject CTA**
`data-theme="dark"` section at foot; "Next Project" label (small, muted); next client name as large link (`→`); wraps to first case study from last.

---

## Epic 5 — About & Contact

**STORY-021: ManifestoSection**
`data-theme="dark"` section; single paragraph, `var(--size-display)` size, weight 700, max 15 words, max-width 18ch; line-height 1.1.

**STORY-022: CapabilitiesSection**
Two columns: Design services list + Development services list; each item: service name (weight 700); no icons; no border-radius; border-top dividers.

**STORY-023: TeamSection**
Three `<div>` blocks side by side (desktop), stacked (mobile); heading per discipline (Design / Development / Operations); each member: name (weight 700), role, year joined (muted); list of members per pillar.

**STORY-024: AwardsSection**
List: year (muted, right-aligned) / award name (weight 700) / project name (muted); border-top dividers; no logos.

**STORY-025: Contact page**
Studio address; general email (`mailto:` link); new business email (`mailto:` link); social links (LinkedIn, GitHub, Instagram); all weight 700 uppercase; target blank noopener on social links.

---

## Epic 6 — Polish & Accessibility

**STORY-026: Scroll reveals**
`useInView` hook with `IntersectionObserver`; `.reveal` → `.visible` class toggle; opacity 0→1, translateY 20→0, 0.6s `var(--ease)`; `prefers-reduced-motion`: skip animation, render visible immediately.

**STORY-027: Page transitions**
Framer Motion `AnimatePresence` at layout level; fade: opacity 0→1 on enter, 0 on exit; 0.3s `var(--ease)`; fallback: no transition if Framer Motion not loaded.

**STORY-028: Reduced motion**
```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  video[autoplay] { display: none; }
  .videoPoster { display: block; }
}
```

**STORY-029: Open Graph meta**
`layout.tsx`: `og:title`, `og:description`, `og:image` (1200×630), `og:type: website`; studio name + tagline; `/og-image.png` in public.

**STORY-030: Accessibility audit**
Heading hierarchy: `<h1>` once per page, `<h2>` section headings; all images with alt text; all interactive elements keyboard reachable; focus rings visible (`outline: 2px solid var(--color)`); FilterBar pills: `aria-pressed` state; Lighthouse a11y ≥ 90.

**STORY-031: Performance**
`next/image`: `priority` on above-fold images (hero, first 2 work cards on homepage); correct `sizes` attribute on WorkCard images; no unused JS; Lighthouse perf ≥ 90 on /work.

---

## Expanded Acceptance Criteria — Critical Stories

The stories above are written in shorthand. The following AC expansions are required for the most complex stories:

---

### STORY-009 — Video Hero (expanded AC)

Acceptance criteria:
- `<video autoPlay muted loop playsInline>` — all four attributes required; missing any breaks mobile
- `poster="/hero-poster.jpg"` — shows during video load and when video is paused
- Video fills full viewport: `width: 100%; height: 100vh; object-fit: cover`
- Section has `data-theme="dark"` — white text, black background behind video
- Studio tagline: centered, `var(--size-display)`, `font-weight: 700`, `color: var(--color)` (white)
- `prefers-reduced-motion: reduce` → `<video>` gets `style={{ display: 'none' }}`, poster shown as static `<img>`
- Dev tools check: `poster` attribute visible in DOM; `autoPlay` attribute present

**Verified by:**
```bash
grep -r "autoPlay" src/components/VideoHero/  # must exist
grep -r "playsInline" src/components/VideoHero/  # must exist
grep -r "poster" src/components/VideoHero/  # must exist
```

---

### STORY-013 — FilterBar (expanded AC)

Acceptance criteria:
- Pill states:
  - Active: `background: var(--color)`, `color: var(--color-bg)` — inverted
  - Inactive: `background: transparent`, `border: 1px solid var(--color)`, `color: var(--color)`
  - Hover (inactive): `background: var(--color)` at 0.1 opacity, 0.2s `var(--ease)` transition
- `border-radius: 4px` on pills ONLY — this is the only element in the entire UI with any border-radius
- Keyboard: all pills `<button type="button">` — focusable via Tab; Enter triggers filter
- "All" pill always shown; clicking it resets to full grid
- `aria-pressed="true"` on active pill; `aria-pressed="false"` on inactive
- State is `'use client'` — `useState` in the `/work` page component

---

### STORY-016 — Case Study Static Generation (expanded AC)

Acceptance criteria:
- `generateStaticParams()` returns `{ slug: string }[]` for ALL slugs in `work.ts`
- Page component: `const study = work.find(s => s.slug === params.slug)` then `if (!study) notFound()`
- `notFound()` from `'next/navigation'` — do NOT use `return null` (renders blank page, not 404)
- `npm run build` output: all case study slugs listed as pre-rendered routes
- Unknown URL `/work/nonexistent-slug` → HTTP 404 response

**Verified by:**
```bash
npm run build 2>&1 | grep "work/"  # should list all slugs
```

---

### STORY-002 — Theme System (expanded AC)

Acceptance criteria:
- CSS custom properties in `globals.css`:
  ```css
  :root { --color: #000; --color-bg: #F5F5F2; }
  [data-theme="dark"] { --color: #F5F5F2; --color-bg: #0D0D0D; }
  [data-theme="red"] { --color: #F5F5F2; --color-bg: #C5341C; }
  [data-theme="blue"] { --color: #F5F5F2; --color-bg: #1C3C6B; }
  ```
- All component CSS uses `var(--color)` and `var(--color-bg)` — never hardcoded hex
- Theme transition: `transition: background-color 0.3s var(--ease), color 0.3s var(--ease)` on `body` (or inherited)
- Verify: change `data-theme` attribute in DevTools on any section → colours update instantly

**QA grep:**
```bash
# Must return ZERO — no hardcoded theme colours in component files
grep -r "#0D0D0D\|#F5F5F2\|#C5341C\|#1C3C6B" src/components/
```

---

### STORY-019 — NarrativeSection (expanded AC)

Acceptance criteria:
- Two-column grid: `.label` column (1fr) + `.body` column (2fr) — using CSS Grid
- Label: text like "Challenge", "Approach", "Outcome" — uppercase, `var(--size-small)`, weight 700, `color: var(--color)` at 0.5 opacity
- Body: `var(--size-body)`, `line-height: 1.7`, `max-width: 65ch`
- `border-top: 1px solid var(--color)` at 0.15 opacity on the section
- Single-column on mobile: `@media (max-width: 768px) { .narrative { display: block } }`
- Used three times on case study page: Challenge → Approach → Outcome

---

## Epic 7 — Quality Verification

**Goal:** Verify all non-negotiable constraints are met before deploy.

### Stories

**STORY-032: Theme system audit**
- `grep -r "#0D0D0D\|#F5F5F2" src/components/` → zero results
- All 4 theme variants render correctly in DevTools (test by toggling `data-theme` on `<body>`)
- Nav text is readable on each theme background
- Theme transition is smooth (0.3s ease)

**STORY-033: Case study content verification**
- All 6–8 case studies have: `slug`, `client`, `category`, `year`, `featured`, `coverImage`, `heroImage`, `challenge`, `approach`, `outcome`
- `tsc --noEmit` passes with all content data
- All slugs generate a valid page via `generateStaticParams`
- Unknown slug returns 404

**STORY-034: Border-radius audit**
- `grep -r "border-radius" src/` returns ONLY:
  1. The `border-radius: 0` reset in `globals.css`
  2. `border-radius: 4px` on FilterBar pills
  3. Nothing else
- DevTools: no element has `border-radius` other than the filter pills

**STORY-035: Performance verification**
- First 2 WorkCards on `/`: `priority` attribute on `<Image>`
- VideoHero: `poster` attribute set; loads without layout shift
- `/work` Lighthouse performance ≥ 90
- No unused JavaScript loaded on any page

**STORY-036: Accessibility verification**
- Single `<h1>` per page: `grep -rn "<h1" src/app/` — 1 result per page
- All `<img>` have `alt` text (including case study images)
- FilterBar pills have `aria-pressed` state
- Skip-nav jumps to `<main id="main-content">`
- Tab order: skip-nav → nav → content — no focus traps
