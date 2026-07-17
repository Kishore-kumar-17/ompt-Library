# 04 — Build Plan
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, styles, nav, Button | `types/`, `lib/data.ts`, `globals.css`, `StickyNav`, `Button` |
| 2 | Hero + OmniSearch + DiscoveryCards | Two-field search, stats row, discovery tiles |
| 3 | SymptomCards + SpecialtyCarousel + DoctorGrid/Card | Symptom CTAs, carousel scroll, filtered doctor cards |
| 4 | Testimonials + Footer + QA | Reviews, footer, Lighthouse, full checklist |

---

## Day 1 — Foundation

### Goals
- `tsc --noEmit` exits 0
- 8 CSS tokens confirmed; no hex in module files
- StickyNav renders white with navy "Login" outline button at `border-radius: 4px`
- Button `primary` variant: cyan bg, navy text — verify in DevTools

### Tasks

**1.1 — Scaffold**
```bash
npx create-next-app@latest medfind \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd medfind
npm install framer-motion lucide-react
```

**1.2 — Font (Lato — 400 + 700 only)**
```typescript
// src/app/layout.tsx
import { Lato } from 'next/font/google'
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
})
```

**1.3 — Types + data**
- `src/types/index.ts` — `ConsultMode`, `Doctor`, `SymptomCard`, `SpecialtyChip`, `DiscoveryCard`, `Testimonial`
- `src/lib/data.ts` — 8 doctors (2 clinic, 2 video, 4 both; 4 available, 4 not), 8 symptoms, 10 specialties, 4 discovery cards, 3 testimonials

**1.4 — globals.css**
- 8 tokens + `.sr-only` + prefers-reduced-motion
- Run: `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` → must return empty

**1.5 — Button (3 variants)**
- `primary`: `background: var(--color-cyan); color: var(--color-navy)` — verify navy text, not white
- `secondary`: navy bg, white text
- `outlineNavy`: navy border, navy text → fills navy on hover
- Hardcoded `border-radius: 4px` in CSS

**1.6 — StickyNav**
- Server component, no `'use client'`
- White bg, 74px, border-bottom
- "Login" uses `.loginBtn` class (navy border, navy text, 4px radius) — NOT a cyan outline button on white (contrast failure)

### Gate 1 checks
- [ ] `tsc --noEmit` passes
- [ ] `npm run dev` zero console errors
- [ ] Nav always white
- [ ] "Login" button: `border-radius: 4px`, navy text (not cyan text on white)
- [ ] Button primary: `background: #14BEF0; color: #28328C` in DevTools

---

## Day 2 — Hero + OmniSearch + DiscoveryCards

### Goals
- OmniSearch renders as two text inputs + Search button (NOT dropdown selects)
- Submit scrolls to `#doctor-grid`
- DiscoveryCards: 4 colored tiles on surface background
- No shadow on discovery cards (shadow only on OmniSearch widget)

### Tasks

**2.1 — OmniSearch (`'use client'`)**
- `locality` and `keyword` state via `useState`
- Two `<input type="text">` fields — NOT `<select>` elements
- `<form role="search">` wrapper with `<label>` for each field (sr-only)
- Widget card: `border-radius: 4px`, `box-shadow: 0 4px 8px rgba(0,0,0,0.12)` — ONLY shadow in build
- Submit button: `background: var(--color-cyan); color: var(--color-navy)` — verify color
- On submit: `document.getElementById('doctor-grid')?.scrollIntoView({ behavior: 'smooth' })`

**2.2 — Hero**
- `min-height: 60vh`, white, centered
- Eyebrow → H1 (Lato 700, navy) → subheading → `<OmniSearch />` → stats row
- Stats row: 3 stats with border dividers

**2.3 — DiscoveryCards (server component)**
- `var(--color-surface)` section background
- 4 colored tiles from `discoveryCards` array
- Bg via CSS class (`.bgBlue`, `.bgPurple`, `.bgGreen`, `.bgOrange`) — not inline hex
- `border-radius: 4px`, NO shadow

### Gate 2 checks
- [ ] OmniSearch has 2 `<input type="text">` fields (not selects)
- [ ] Search button: cyan bg, **navy text** (DevTools: `color: rgb(40, 50, 140)`)
- [ ] OmniSearch card has shadow; discovery cards have NO shadow
- [ ] Submitting form scrolls to `#doctor-grid`
- [ ] DiscoveryCards bg is `#F0F0F5` (surface, not white)

---

## Day 3 — SymptomCards + SpecialtyCarousel + DoctorGrid/Card

### Goals
- 8 symptom cards with "CONSULT NOW" in navy (not cyan — contrast failure on white)
- Specialty carousel scrolls horizontally with left/right buttons
- DoctorGrid filters by city text + specialty select; `useMemo`
- DoctorCard: photo 4px radius, availability badge conditional, correct CTAs per `consultMode`

### Tasks

**3.1 — SymptomCards (server component)**
- 8 cards, 4-col grid
- "CONSULT NOW" text: `color: var(--color-navy)` — not cyan (1.8:1 on white fails)
- White card, `border-radius: 4px`, `border: 1px solid var(--color-border)`, NO shadow
- Hover: border turns cyan

**3.2 — SpecialtyCarousel (`'use client'`)**
- `useRef` on scroll track, not `useState` for position
- Left/right `<button>` calls `trackRef.current.scrollBy({ left: ±240, behavior: 'smooth' })`
- Chips: white, `border-radius: 4px`, border — same radius as cards (not 20px)
- Icon map for all 10 Lucide icons

**3.3 — DoctorCard (server component)**
- Photo: `width: 80px; height: 80px; border-radius: 4px` — verify NOT 50%
- Availability badge: `{doctor.availableToday && <span className={styles.availabilityBadge}>...}` — conditional JSX
- Star color: amber `#F59E0B` (one-off, not a token — decorative only, no text at this color)
- `consultMode` CTAs:
  ```tsx
  const showClinic = doctor.consultMode === 'clinic' || doctor.consultMode === 'both'
  const showVideo  = doctor.consultMode === 'video'  || doctor.consultMode === 'both'
  ```
- Hover: card border turns cyan

**3.4 — DoctorGrid (`'use client'`)**
- City `<input>` + specialty `<select>` filter bar
- `useMemo` filters simultaneously
- ARIA live region: `<p className="sr-only" aria-live="polite">`
- Empty state when 0 results

### Gate 3 checks
- [ ] SymptomCards: "CONSULT NOW" text is navy, not cyan (check computed color)
- [ ] Specialty carousel scrolls left and right on button click
- [ ] Doctor photos: `border-radius: 4px` (NOT `50%`) in DevTools
- [ ] Dr. Rahul Mehta (clinic only): shows only "Book Clinic Visit"
- [ ] Dr. Sneha Patel (video only): shows only "Consult Online"
- [ ] Dr. Kavita Sharma (both): shows both buttons
- [ ] Dr. Rahul Mehta (availableToday: false): NO green badge in DOM
- [ ] Dr. Kavita Sharma (availableToday: true): green badge rendered
- [ ] AvailabilityBadge: `border-radius: 20px` in DevTools
- [ ] No `box-shadow` on doctor cards, symptom cards, or specialty chips
- [ ] ARIA live region in DOM

---

## Day 4 — Testimonials + Footer + QA

### Tasks

**4.1 — Testimonials (server component)**
- 3 text-only quote cards — no patient photos (Practo shows no user photos)
- `var(--color-surface)` background
- White card, `border-radius: 4px`, border

**4.2 — Footer**
- `var(--color-navy)` background
- 4 columns, cyan link hover
- Logo: cyan text on navy (6.4:1 — passes)

**4.3 — Framer Motion**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

**4.4 — Static export + QA**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"   # must be empty
grep -r "rgba(" src --include="*.module.css"                  # must be empty (OmniSearch exception is in globals or inline)
grep -r "border-radius: 50%" src/components                   # must return empty
grep -r "9999px" src                                          # must return empty
```

### Gate 4 checks (final)
- [ ] `npm run build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] All buttons: `border-radius: 4px` in DevTools
- [ ] AvailabilityBadge: `border-radius: 20px`
- [ ] Specialty chips: `border-radius: 4px` (not 20px — carousel chips are cards)
- [ ] No doctor photo: `border-radius: 50%`
- [ ] Primary button: cyan bg, navy text (not white)
- [ ] "CONSULT NOW": navy text (not cyan)
- [ ] Only OmniSearch has shadow; all other cards are border-only
- [ ] Footer links hover to cyan (not white)
- [ ] No NABH/JCI badges in build
- [ ] No "Emergency" link in nav
- [ ] No gold accent anywhere
- [ ] No Nunito Sans (font is Lato)

---

### Cut Order

**Never cut:**
- OmniSearch (2 text inputs, NOT selects — the core booking funnel)
- DoctorGrid + ConsultMode CTA logic (`'clinic' | 'video' | 'both'` — primary differentiator)
- AvailabilityBadge conditional JSX (conditional render, not display:none)

**Cut first if time-constrained:**
- SymptomCards section
- SpecialtyCarousel horizontal scroll
- Testimonials section

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Cyan button text set to white instead of navy | High | High | White on cyan `#14BEF0` = 1.8:1 — FAILS WCAG AA; primary button must use `color: var(--color-navy)` |
| Doctor photo given `border-radius: 50%` | Medium | High | Practo uses rectangular cards; enforce `border-radius: 4px` on photo; `grep -r "50%" src/components/home/DoctorCard.module.css` → empty |
| `ConsultMode` treated as boolean | Medium | High | Type must be `'clinic' \| 'video' \| 'both'` — never `boolean`; verify in `src/types/index.ts` |
| Nunito Sans accidentally imported in layout.tsx | Medium | Medium | Font is Lato 400+700 only; `grep -r "Nunito" src/app/layout.tsx` → must return empty |
| Shadow added to non-OmniSearch cards | Medium | Medium | Only OmniSearch widget has `box-shadow`; run `grep -r "box-shadow" src/components --include="*.module.css"` → OmniSearch only |
| NABH / JCI badges added to build | Low | High | Doctor-booking platform — no hospital accreditation badges; visual inspection required |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
