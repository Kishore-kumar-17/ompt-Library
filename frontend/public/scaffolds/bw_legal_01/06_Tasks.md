# 06 — Tasks
## Premier Indian Law Firm · bw_legal_platform_01

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]."

---

## Phase 0 — Foundation

### TASK-001: Project setup + dependencies
```bash
npx create-next-app@latest store --typescript --app --src-dir --no-eslint --no-tailwind
cd store
npm install framer-motion @radix-ui/react-accordion lucide-react
```
`next.config.ts`: `output: 'export', images: { unoptimized: true }`

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts`:
- `InsightCategory` type (4 values: 'Legal Update' | 'Client Alert' | 'Thought Leadership' | 'Publication')
- `PracticeArea` interface (id, title, description, icon, slug)
- `Leader` interface (id, name, title, practice, image, bioExcerpt)
- `Insight` interface (id, title, category, date, image, slug, excerpt)
- `Office` interface (city, country, isPrimary?)
- `Stat` interface (value, suffix, label)

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + global reset
`src/app/globals.css`:
- 6 `--color-*` tokens (brand purple, gold, text charcoal, muted, surface white, dark purple)
- `--font-display` and `--font-body` CSS variables
- `--container` and `--section-pad` layout variables
- Base reset (box-sizing, margin, padding, font, color, background)
- Focus ring: `2px solid var(--color-gold)` offset `3px`
- `prefers-reduced-motion` block

Done when: Body background white; no browser default spacing visible; token variables accessible in DevTools.

---

### TASK-004: Mock data
`src/lib/data.ts`:
- `stats`: 4 entries (75+ Years, 750+ Lawyers, 9 Offices, 50+ Rankings)
- `practiceAreas`: 8 entries (M&A, Banking, Disputes, Capital Markets, Competition, Tax, Real Estate, Technology) — each with SVG path icon
- `leaders`: 8 entries with name, title, practice, image path, bio excerpt
- `insights`: 6 entries with category, date, image path, slug, excerpt
- `offices`: 9 entries (Mumbai, Delhi-NCR, Bengaluru, Ahmedabad, Hyderabad, Chennai, GIFT City, Singapore, Abu Dhabi)
- `values`: 3 entries (Character, Competence, Commitment)

Done when: All arrays compile; `tsc --noEmit` clean.

---

### TASK-005: Font setup + layout
`src/app/layout.tsx`:
- `Playfair_Display` from `next/font/google` — weights 400, 700 — variable `'--font-playfair'`
- `Roboto` from `next/font/google` — weights 300, 400, 500 — variable `'--font-roboto'`
- Both applied as class names on `<html>`
- `globals.css` `--font-display` and `--font-body` reference the font variables
- Metadata: firm name + description

Done when: DevTools computed styles show Playfair Display on any serif-targeted element; Roboto on body.

---

### TASK-006: PillButton component
`src/components/ui/PillButton.tsx` + `PillButton.module.css`:
- Props: `variant: 'primary' | 'secondary' | 'ghost'`, `size: 'md' | 'sm'`, `children`, `href?`, `onClick?`
- `border-radius: 9999px` — confirmed in DevTools
- Sizes: `md` = 48px height, `32px` H-padding; `sm` = 40px height, `24px` H-padding
- Primary: `background: var(--color-brand); color: #fff`
- Secondary: `border: 2px solid var(--color-brand); color: var(--color-brand)`
- Ghost: `border: 2px solid rgba(255,255,255,0.8); color: #fff`
- Renders as `<Link>` if `href` provided, `<button>` otherwise

Done when: All 3 variants render; `border-radius: 9999px` confirmed in DevTools; no square corners.

---

### TASK-007: GoldCorner component
`src/components/ui/GoldCorner.tsx` + `GoldCorner.module.css`:
- Wrapper `div` with `position: relative; padding-top: 20px; padding-left: 20px`
- `::before`: `position: absolute; top: 0; left: 0; width: 24px; height: 24px; border-top: 2px solid var(--color-gold); border-left: 2px solid var(--color-gold)`

Done when: Gold L-bracket visible top-left when wrapping a test heading.

---

## Phase 1 — Layout Shell

### TASK-008: StickyNav
`src/components/layout/StickyNav.tsx` + `StickyNav.module.css`:
- `'use client'` — `useState(scrolled)`, `useEffect` scroll listener at `window.scrollY > 200`
- Default: `height: 80px`, `background: transparent`
- Scrolled: `height: 64px`, `background: rgba(98,23,85,0.95)`, `backdrop-filter: blur(8px)`
- Transition: `background 500ms ease-in-out, height 300ms ease`
- Logo text: `var(--color-brand)` at rest → white on scroll
- Nav links: dark at rest → white on scroll
- "Contact Us" PillButton (primary, sm) rightmost
- Scroll listener `{ passive: true }`; cleanup on unmount

Done when: Transparent at top; purple semi-transparent on scroll; logo and links turn white; pill CTA visible.

---

### TASK-009: Footer
`src/components/layout/Footer.tsx` + `Footer.module.css`:
- `background: var(--color-dark)` (`#3d0e35`)
- `border-top: 2px solid var(--color-gold)` — gold top border
- 4-column grid: logo+tagline | Practice Areas list | Offices list (all 9) | Connect links
- Link hover: `color: var(--color-gold)`
- Copyright row at bottom
- Responsive: 2-col tablet, 1-col mobile

Done when: Dark purple bg; gold top border; all 9 offices listed; link hover turns gold.

---

## Phase 2 — Hero + Stats

### TASK-010: Hero section
`src/components/home/Hero.tsx` + CSS Module:
- `min-height: 100vh`
- Background: `linear-gradient(135deg, var(--color-brand) 0%, var(--color-dark) 100%)`
- Left-aligned content, `max-width: 55%`
- Gold rule: `width: 80px; height: 2px; background: var(--color-gold); margin-bottom: 32px`
- H1: `--font-display`, weight 700, `clamp(2.5rem,5vw,4rem)`, white
- Subheading: `--font-body`, weight 300, white 85% opacity
- Two PillButtons: primary (white bg variant needed — add `white` to PillButton variants OR style inline) + ghost
- Mobile: content 100% width, CTAs stacked

Done when: Full-viewport purple hero; gold rule above H1; Playfair Display H1; two CTAs visible.

**Note on "white" CTA variant:** The hero needs a CTA with white background and purple text. Add a `white` variant to PillButton: `background: #fff; color: var(--color-brand)`. This is the primary CTA on the dark hero.

---

### TASK-011: StatsStrip
`src/components/home/StatsStrip.tsx` + CSS Module:
- Purple background `var(--color-brand)`
- 4-column layout with gold vertical dividers
- Numbers: `--font-display`, weight 700, `3rem`, white
- Labels: `--font-body`, weight 300, uppercase, white 75%
- IntersectionObserver: count-up from 0 to final value, `1200ms` ease, fires once only
- Gold dividers via `.stat:not(:last-child)::after` pseudo-element
- `prefers-reduced-motion`: show final value immediately, no animation

Done when: Purple strip; 4 stats visible; count-up fires on scroll into view; dividers visible on desktop.

---

## Phase 3 — Content Sections

### TASK-012: PracticeAreas section
`src/components/home/PracticeAreas.tsx` + CSS Module:
- Section heading wrapped in `<GoldCorner>`, Playfair Display 700
- 3-col CSS grid, `gap: 24px`
- Cards: `border: 1px solid #e5e7eb; border-radius: 0; padding: 32px`
- Hover: `border-left: 4px solid var(--color-brand); box-shadow: 0 8px 32px rgba(98,23,85,0.12)`
- Card content: SVG icon (purple) + Playfair title + Roboto 300 desc (3-line clamp) + "Learn more →" link
- Framer Motion `whileInView` fade-up, `staggerChildren: 0.08`

Done when: 8 cards in 3-col grid; no border-radius; hover left-border works; GoldCorner on heading.

---

### TASK-013: LeadershipGrid section
`src/components/home/LeadershipGrid.tsx` + CSS Module:
- Section heading in `<GoldCorner>`
- 4-col grid desktop, 2-col tablet, 1-col mobile
- Photos: square aspect ratio, `filter: grayscale(1)`, hover `grayscale(0)`, `transition: filter 400ms ease`
- Name: Playfair Display 500 `1rem`
- Title: Roboto 300, uppercase, muted
- Bio: Roboto 300, 2-line clamp
- Framer Motion `whileInView` stagger

Done when: 8 leaders in grid; photos grayscale at rest; color on hover; Playfair names.

---

### TASK-014: Insights section
`src/components/home/Insights.tsx` + CSS Module:
- Section heading in `<GoldCorner>`
- 3-col grid, `gap: 24px`
- Image: 16:9 aspect ratio
- Category pill: `background: var(--color-brand); color: #fff; border-radius: 9999px; padding: 4px 12px; font-size: 0.75rem`
- Date: Roboto 300, muted, formatted
- Title: Playfair Display 700, `1.25rem`, 2-line clamp
- "Read more →": purple text, hover underline

Done when: 6 insights in 3-col; category pills are pill-shaped; Playfair titles.

---

## Phase 4 — Composition + Audit

### TASK-015: Page composition
`src/app/page.tsx`:
Compose in order:
1. `<Hero />`
2. `<StatsStrip />`
3. `<PracticeAreas />`
4. `<LeadershipGrid />`
5. `<Insights />`

Done when: All sections render; page scrolls smoothly through all sections.

---

### TASK-016: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds
- [ ] No hex in CSS Module files
- [ ] DevTools: ALL buttons `border-radius: 9999px`
- [ ] DevTools: ALL cards `border-radius: 0`
- [ ] DevTools: no element has `color: #d0a56d` or `color: var(--color-gold)`
- [ ] Nav: transparent at top, semi-transparent purple at scroll >200px
- [ ] Hero: full viewport height, gold rule above H1, Playfair Display confirmed
- [ ] Stats count-up fires on intersection
- [ ] Leadership photos: grayscale at rest, color on hover
- [ ] GoldCorner bracket visible on 3 section headings
- [ ] Footer: dark purple bg, gold top border, 9 offices listed
- [ ] No star ratings, no pricing, no countdown timers, no chat widget
- [ ] Lighthouse ≥90/90
