# 04 — Build Plan
## Global Hospital Authority Portal · bw_clinic_03

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, filter utils, globals, layout, Button, TopBar, SiteNav | Types, data, tokens, nav |
| 2 | Hero + OutcomesStrip + ConditionBrowser | Search section, outcomes band, category grid |
| 3 | ProviderSearch + ProviderCard + badges | Full provider directory with filtering |
| 4 | HealthLibraryPreview + AppointmentBanner + Footer + Framer Motion + QA | Complete build, passing Lighthouse |

---

## Day 1 — Foundation

### Goals
- `tsc --noEmit` exits 0
- 8 CSS tokens confirmed, zero hex in any `.module.css`
- Roboto 400+700 loaded via `next/font/google`
- TopBar renders navy, 40px, white text — server component confirmed
- SiteNav renders white, sticky, with "Schedule Now" primary button
- Button primary: white text on blue (`color: rgb(255,255,255)` in DevTools)

### Tasks

**1.1 — Scaffold**
```bash
npx create-next-app@latest carecompass \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd carecompass
npm install framer-motion lucide-react
```

**1.2 — next.config.ts**
```typescript
import type { NextConfig } from 'next'
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
export default config
```

**1.3 — TypeScript types**
File: `src/types/index.ts` — all 4 types + 3 union types from 02_Architecture.md.
Run: `tsc --noEmit` → must exit 0.

**1.4 — Mock data + filter utils**
Files: `src/lib/data.ts` (4 arrays) + `src/lib/filterProviders.ts` (2 functions).
Verify: 8 providers, 8 conditions, 5 metrics, 6 articles.

**1.5 — globals.css**
Exactly 8 `--color-*` tokens + `.sr-only` + `prefers-reduced-motion`.
Run: `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` → empty.

**1.6 — layout.tsx**
```typescript
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-sans' })
```
`<html lang="en" className={roboto.variable}>`. No other fonts.

**1.7 — Button (3 variants)**
- `primary`: `background: var(--color-blue); color: var(--color-white)` — white text ✓
- `outlineWhite`: transparent bg, white border + text — for use on dark bg only
- `outlineBlue`: transparent bg, blue border + text

All: `border-radius: 4px`. Accepts `href`, `onClick`, `fullWidth`, `disabled`, `size`.

**1.8 — TopBar (server component)**
Navy bg, 40px, no `'use client'`.
Left: `<a href="tel:8002232273">800.223.2273</a>`.
Right: "MyChart Login" | "Need Help?" links.
`aria-label="Utility navigation"` on wrapper.

**1.9 — SiteNav (server component)**
White bg, sticky, border-bottom, no `'use client'`.
Logo: "CareCompass" as `<Link href="/">` in `var(--color-blue)`.
Links: Find a Provider / Health Library / Conditions / Appointments.
Right: `<Search size={20} />` icon + `<Button variant="primary" size="sm">Schedule Now</Button>`.

### Gate 1 Checks
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run dev` — no console errors
- [ ] TopBar: navy bg (`rgb(0, 48, 135)` in DevTools)
- [ ] SiteNav: white bg, sticky positioning
- [ ] Button primary: `color: rgb(255,255,255)` in DevTools (white, NOT navy)
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` → empty

---

## Day 2 — Hero + OutcomesStrip + ConditionBrowser

### Goals
- HeroSearch renders with single text input, gradient bg, suggestion pills
- Submit scrolls to `#provider-section`
- OutcomesStrip renders navy band with 5 metrics in `<dl>` structure
- ConditionBrowser renders 4×2 grid, surface bg, border-only cards

### Tasks

**2.1 — HeroSearch (`'use client'`)**
- Single `<input type="text">` with placeholder "Search by condition, symptom, or doctor name"
- `<label htmlFor="condition-search" className="sr-only">` matching the input id
- Gradient bg: `linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%)`
- Submit button: green bg (`var(--color-green)`), white text (7.31:1 ✓)
- On submit: scroll to `#provider-section` via `scrollIntoView({ behavior: 'smooth' })`
- Suggestion pills below: `border-radius: 20px`, white bg, navy text — 4 conditions

**2.2 — OutcomesStrip (server component)**
- `background: var(--color-navy)` — full-bleed section
- No `border-radius` on the section
- `<dl>` with 5 `<div>` children, each containing `<dt>` (value) + `<dd>` (context)
- White text, dividers between columns at `1px solid rgba(255,255,255,0.2)` (acceptable via inline style or CSS variable)
- Import `outcomeMetrics` from `@/lib/data`

**2.3 — ConditionBrowser (server component)**
- `background: var(--color-surface)` section
- Lucide icon map (`conditionIconMap` from 02_Architecture)
- 4×2 CSS grid of cards
- Cards: white bg, `border-radius: 6px`, `border: 1px solid var(--color-border)`, NO shadow
- Hover: `border-color: var(--color-blue)`
- Icon in `var(--color-blue)`, article count in `var(--color-muted)`

### Gate 2 Checks
- [ ] HeroSearch: single `<input type="text">` — confirmed in DevTools Elements
- [ ] HeroSearch: gradient bg — `linear-gradient` visible in DevTools Styles
- [ ] Submit scrolls to `#provider-section` (placeholder `<div id="provider-section">` temporarily)
- [ ] OutcomesStrip: navy bg, white text, 5 metrics visible
- [ ] OutcomesStrip uses `<dl><dt><dd>` — confirmed in DevTools Elements
- [ ] ConditionBrowser: 8 cards, surface bg (`#F5F7FA`)
- [ ] Condition cards: `border-radius: 6px` in DevTools — NOT 4px
- [ ] No `box-shadow` on condition cards

---

## Day 3 — ProviderSearch + ProviderCard + Badges

### Goals
- ProviderSearch filters by text, location, and appointment type simultaneously
- ProviderCard renders all provider data correctly
- AppointmentBadge: 3 types × correct colors
- AcceptingBadge: 3 statuses with colored dots
- Photo `border-radius: 6px` confirmed — NOT 50%
- Dr. Kim (not-accepting): shows "Request Second Opinion" CTA

### Tasks

**3.1 — AppointmentBadge (server component)**
```tsx
const config = {
  'in-person':      { label: 'In Person',   bg: '#0468CD' },
  'virtual':        { label: 'Virtual',      bg: '#006633' },
  'second-opinion': { label: '2nd Opinion', bg: '#003087' },
}
// border-radius: 20px, white text, inline style for bg
```

**3.2 — AcceptingBadge (server component)**
Status dot (6×6px, `border-radius: 50%`) + label text.
Dot colors via inline style: accepting=`#166534`, limited=`#92400E`, not-accepting=`#991B1B`.

**3.3 — ProviderCard (server component, no `'use client'`)**
- Photo: `width: 80px; height: 80px; border-radius: 6px; object-fit: cover; object-position: top`
- Conditions: first 3 items from `conditionsTreated[]` as chips
- All appointment type badges from `appointmentTypes[]`
- AcceptingBadge
- Rating: amber star SVG (`fill="#F59E0B"` inline) + rating value + review count
- CTA:
  ```tsx
  {provider.acceptingStatus !== 'not-accepting'
    ? <Button variant="primary" fullWidth>Request Appointment</Button>
    : <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
  }
  ```
- Card: `border-radius: 6px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`

**3.4 — ProviderSearch (`'use client'`)**
```tsx
const [nameQuery, setNameQuery] = useState('')
const [locationFilter, setLocationFilter] = useState('')
const [apptTypeFilter, setApptTypeFilter] = useState<AppointmentType | ''>('')

const filtered = useMemo(() =>
  filterProviders(providers, nameQuery, locationFilter, apptTypeFilter),
  [nameQuery, locationFilter, apptTypeFilter]
)
```
- `id="provider-section"` on the section element
- Filter bar: text input + location `<select>` + appointment type `<select>`
- ARIA live region: `<p className="sr-only" aria-live="polite">{filtered.length} providers found</p>`
- Empty state: "No providers match your search. Try different criteria."
- Grid: CSS grid, 1→2→3 columns

### Gate 3 Checks
- [ ] ProviderCard: photo `border-radius: 6px` in DevTools — NOT `50%`
- [ ] AppointmentBadge in-person: blue bg (`#0468CD`)
- [ ] AppointmentBadge virtual: green bg (`#006633`)
- [ ] AppointmentBadge second-opinion: navy bg (`#003087`)
- [ ] All appointment badges: `border-radius: 20px` in DevTools
- [ ] Dr. Blackstone: 3 badges (in-person, virtual, second-opinion)
- [ ] Dr. Torres: 1 badge (in-person only)
- [ ] Dr. Kim: "Request Second Opinion" button (not-accepting)
- [ ] Dr. Blackstone: "Request Appointment" button (accepting)
- [ ] ProviderCard: `box-shadow` visible in DevTools
- [ ] ConditionBrowser cards: NO `box-shadow` in DevTools
- [ ] Filter by "heart failure" — returns Dr. Blackstone
- [ ] Filter by virtual — excludes Dr. Torres (in-person only)
- [ ] ARIA live region present in DOM
- [ ] `tsc --noEmit` exits 0

---

## Day 4 — Remaining Sections + Framer Motion + QA

### Tasks

**4.1 — HealthLibraryPreview (server component)**
- Surface bg
- 3×2 grid of article cards
- Each card: category label (small, colored chip) + title + read time
- Cards: white bg, `border-radius: 6px`, border-only (no shadow)
- "Explore Health Library →" link in `var(--color-blue)`

**4.2 — AppointmentBanner (server component)**
- Blue bg (`var(--color-blue)`)
- White headline + subtext
- Two buttons: `<Button variant="outlineWhite">Call 800.223.2273</Button>` + `<Button variant="outlineWhite">Schedule Online</Button>`
- Or: first button uses `href="tel:8002232273"`, second uses primary-on-blue (solid white bg, blue text via inline or variant)

**4.3 — Footer (server component)**
- Navy bg (`var(--color-navy)`)
- 4 columns: CareCompass (logo + description) | Find Care | Health Library | About
- Links: white text, hover to `var(--color-blue)` — blue on navy: 5.56:1 ✓ (passes)
- Copyright: `© {new Date().getFullYear()} CareCompass Medical Center`

**4.4 — Framer Motion**
Wrap each major section:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```
`once: true` — triggers once, no re-animation on scroll up.

**4.5 — QA Pass**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"   # expect 1 result: ProviderCard (box-shadow)
grep -r "border-radius: 50%" src/components    # must be empty (dots are inline style)
grep -r "9999px" src                           # must be empty
grep -r "box-shadow" src/components --include="*.module.css"   # expect 1 result: ProviderCard
```

### Gate 4 Checks (Final)
- [ ] `npm run build` exits 0, `/out` directory produced
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] TopBar: navy (`rgb(0,48,135)`)
- [ ] SiteNav: white, sticky
- [ ] Button primary: white text (`rgb(255,255,255)`)
- [ ] Button outlineWhite: only on dark backgrounds
- [ ] Provider photos: `border-radius: 6px` — not 50%
- [ ] AppointmentBadge pills: `border-radius: 20px`
- [ ] Condition cards: `border-radius: 6px`, no shadow
- [ ] ProviderCard: `border-radius: 6px`, shadow present
- [ ] OutcomesStrip: navy bg, `<dl>` markup, 5 metrics
- [ ] HeroSearch: single text input, gradient bg
- [ ] Submit scrolls to `#provider-section`
- [ ] No NABH/JCI badges
- [ ] No "Emergency" link anywhere
- [ ] Roboto font confirmed in DevTools (not Lato, not Nunito)
- [ ] Footer links hover to blue (not cyan) — blue on navy passes
- [ ] All images have `alt` attributes
- [ ] All inputs have `<label>` elements
- [ ] `prefers-reduced-motion` disables animations

---

### Cut Order

**Never cut:**
- ProviderSearch + ProviderCard with AcceptingBadge CTA switching logic (primary discovery UX)
- OutcomesStrip with `<dl><dt><dd>` semantic structure (authority content, SEO-critical)
- HeroSearch single text input + scroll-to-provider-section behaviour

**Cut first if time-constrained:**
- HealthLibraryPreview article grid
- AppointmentBanner CTA band
- Framer Motion section entrance animations

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Provider photo `border-radius` set to `50%` | High | High | Must be `6px` rectangular — NOT circular; `grep -r "border-radius: 50%" src/components/home/ProviderCard.module.css` → must be empty |
| `box-shadow` added to ConditionBrowser or HealthLibrary cards | Medium | Medium | Only `ProviderCard.module.css` contains `box-shadow`; `grep -r "box-shadow" src/components --include="*.module.css"` → ProviderCard only |
| NABH / JCI badges added | Low | High | CareCompass is a US hospital — no Indian accreditation; visual inspection required |
| OutcomesStrip uses `<div>` instead of `<dl><dt><dd>` | Medium | High | Semantic markup required; verify in DevTools Elements panel |
| Roboto loaded with weights beyond 400 and 700 | Low | Medium | Only weights 400 and 700 allowed; inspect `next/font/google` import in `layout.tsx` |
| CSS token leak (hex in .module.css) | Medium | Medium | `rgba()` in `ProviderCard.module.css` for shadow is the only accepted exception; all others must be CSS tokens |
| TypeScript strict mode errors on build | Medium | High | Run `tsc --noEmit` after each group of components, not only at end |
