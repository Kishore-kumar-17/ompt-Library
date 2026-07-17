# 04 — Build Plan
## Indian Hospital Network · bw_clinic_01

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, styles, nav, Button | `types/`, `lib/data.ts`, `globals.css`, `StickyNav`, `Button` |
| 2 | Hero + BookingWidget + SpecialtyGrid | Booking widget, stats row, specialty cards |
| 3 | DoctorDirectory + DoctorCard + WhyUs | Filter state, doctor cards, accreditation |
| 4 | HealthPackages + Testimonials + Footer + QA | Packages, reviews, footer, Lighthouse |

---

## Day 1 — Foundation

### Goals
- `tsc --noEmit` exits 0
- Exactly 8 CSS tokens, no hex in any module file
- StickyNav renders white with "Emergency: 1066" in red and teal "Book Appointment" button
- Button renders at `border-radius: 8px` in DevTools

### Tasks

**1.1 — Scaffold**
```bash
npx create-next-app@latest helioshealth \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd helioshealth
npm install framer-motion lucide-react
```

**1.2 — Font**
```typescript
// src/app/layout.tsx
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans',
})
```

**1.3 — Types + data**
- `src/types/index.ts` — all interfaces and union types
- `src/lib/data.ts` — 8 doctors, 12 specialties, 3 packages, 4 stats, 3 testimonials, 2 accreditations

**1.4 — globals.css**
- 8 tokens exactly + emergency link class + `.sr-only` utility
- Verify: `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty

**1.5 — Button (server component)**
- `primary`: teal bg → teal-dark hover
- `secondary`: teal outline → fill on hover
- `border-radius: 8px` hardcoded — no prop, no override

**1.6 — StickyNav (server component)**
- White, 68px, border-bottom
- Logo: brand name in teal Nunito 800
- Nav links center
- Right: `.emergency-link` class "Emergency: 1066" + `<Link className={styles.navCta}>Book Appointment</Link>`

### Gate 1 checks
- [ ] `tsc --noEmit` passes
- [ ] `npm run dev` serves with zero console errors
- [ ] Nav background is white at all scroll positions
- [ ] "Emergency: 1066" is red and always visible
- [ ] "Book Appointment" nav button: `border-radius: 8px` in DevTools
- [ ] No hex in any `.module.css` file

---

## Day 2 — Hero + BookingWidget + SpecialtyGrid

### Goals
- Hero renders with booking widget (city + specialty + submit) visible below H1
- Stats row shows 4 inline stats
- SpecialtyGrid shows 12 specialty cards in 4-col grid on surface background

### Tasks

**2.1 — BookingWidget (`'use client'`)**
- `useState<City | ''>` and `useState<Specialty | ''>`
- City and specialty `<select>` elements with labels
- "Find Doctors" submit button: `border-radius: 8px`
- On submit: smooth scroll to `#doctor-directory`
- Widget card: white, `border-radius: 12px`, shadow

**2.2 — Hero**
- Centered, `min-height: 70vh`, white bg
- Eyebrow (teal, uppercase, tracking) → H1 (Nunito 800, `clamp`) → subheading (muted)
- `<BookingWidget />` below subheading
- Stats row: 4 stats with border dividers between them

**2.3 — SpecialtyGrid (server component)**
- Map `specialtyCards` array (12 items)
- White card, 12px radius, shadow
- Lucide icon in teal inside surface-colored icon box
- Name (Nunito 600) + doctor count (muted)
- Section background: `var(--color-surface)`

### Gate 2 checks
- [ ] Booking widget renders below H1 (not at top, not at bottom)
- [ ] City dropdown has all 7 cities
- [ ] Specialty dropdown has all 12 specialties
- [ ] "Find Doctors" button: 8px radius
- [ ] Stats row shows 4 stats
- [ ] 12 specialty cards render in 4 columns
- [ ] SpecialtyGrid bg: `#F0F7FA` (not white, not navy)
- [ ] Specialty card icons are Lucide components in teal (not emoji)

---

## Day 3 — DoctorDirectory + DoctorCard + WhyUs

### Goals
- DoctorDirectory shows 3 filter controls + doctor card grid
- All 3 filters work simultaneously via `useMemo`
- Every DoctorCard shows: circular photo, name, qualifications, experience, rating, fee, dual CTAs
- ARIA live region announces result count
- WhyUs shows 4 stats + NABH + JCI

### Tasks

**3.1 — DoctorCard (server component)**
- Circular photo: `width: 96px; height: 96px; border-radius: 50%; object-fit: cover`
- Info block: name → title (teal) → qualifications (muted) → experience → rating → hospital → fee
- Star icon: Lucide `Star` with `fill: var(--color-gold)` in CSS
- Fee: `₹{consultFee.toLocaleString('en-IN')} Consult Fee` in teal, Nunito 700
- Actions: always "Book Appointment" (primary); "Video Consult" (secondary) ONLY if `videoConsult: true`

**3.2 — DoctorDirectory (`'use client'`)**
- 3 `useState` hooks: city, specialty, query
- `useMemo` filter: all 3 criteria applied simultaneously
- ARIA: `<p aria-live="polite">Showing {filtered.length} doctors</p>` in `.sr-only`
- Empty state: "No doctors found matching your filters."
- Section `id="doctor-directory"` — BookingWidget scrolls here

**3.3 — WhyUs (server component)**
- Surface background
- 4 stat blocks from `stats` array — Lucide icons in teal
- `accreditations` array → 2 badge cards: NABH + JCI side by side

### Gate 3 checks
- [ ] DoctorCard: photo is circular (50% radius) in DevTools
- [ ] DoctorCard: "Book Appointment" always present
- [ ] DoctorCard: "Video Consult" appears only for `videoConsult: true` doctors (check Dr. Arjun Mehta — he has `videoConsult: false`, should show no Video button)
- [ ] DoctorCard: consultation fee visible in teal
- [ ] DoctorCard: star rating visible (gold star icon, not emoji)
- [ ] All 3 filters change the displayed doctors
- [ ] Filtering to "cardiology" + "chennai" shows only Dr. Ramesh Kumar
- [ ] ARIA live region present (`.sr-only` class, `aria-live="polite"`)
- [ ] WhyUs: both NABH and JCI badges visible
- [ ] WhyUs background: `#F0F7FA`

---

## Day 4 — HealthPackages + Testimonials + Footer + QA

### Goals
- 3 health packages with strike-through prices and test counts
- 3 testimonial cards with star ratings
- Footer teal-dark with gold link hover
- Lighthouse ≥90/90, TypeScript clean, build succeeds

### Tasks

**4.1 — HealthPackages (server component)**
- 3 cards from `healthPackages` array
- `<del>₹{originalPrice}</del>` + discounted price
- Test count: "68 Tests Included"
- Feature list: Lucide `Check` in teal
- "Book Now" primary button, 8px radius
- `popular` → "Most Popular" teal top ribbon

**4.2 — Testimonials (server component)**
- 3 white cards, 12px radius, shadow
- 5 Lucide `Star` icons filled gold
- Quote + name + treatment type

**4.3 — Footer**
- `var(--color-teal-dark)` background
- 4 columns
- Link hover: `var(--color-gold)` — gold on teal-dark = 5.8:1 (AA)
- Bottom bar: NABH + JCI at 50% opacity with white filter

**4.4 — Framer Motion**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
```

**4.5 — Static export + QA**
```typescript
// next.config.ts
const config = { output: 'export', images: { unoptimized: true } }
```
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"
grep -r "9999px" src
```

### Gate 4 checks (final)
- [ ] `npm run build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] Zero hex / rgba in `.module.css` files
- [ ] Every button: `border-radius: 8px` (DevTools)
- [ ] Doctor photos: `border-radius: 50%` (DevTools)
- [ ] "Emergency: 1066" in red in nav
- [ ] Gold never used as text on white section
- [ ] All packages show `<del>` original + discounted price
- [ ] Footer links hover to gold (not white)
- [ ] Both NABH + JCI in footer bottom bar
- [ ] No pill buttons (9999px) anywhere
- [ ] No serif font

---

### Cut Order

**Never cut:**
- DoctorDirectory with 3-filter search (city + specialty + text query — the booking funnel)
- NABH + JCI accreditation badges in WhyUs + footer (hospital trust is non-negotiable)
- HealthPackages section with `<del>` strike-through pricing

**Cut first if time-constrained:**
- Testimonials section
- WhyUs statistics section (keep accreditation badges; cut stats)
- Framer Motion stagger animations (keep structure, remove `whileInView` wrappers)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Gold used as text on white background | High | High | `#FDB931` on white = 1.9:1 — FAILS WCAG AA; `var(--color-gold)` is decorative only (dividers, footer border) — never body text |
| Doctor photo radius set to `8px` or `0` instead of `50%` | Medium | High | DoctorCard photo must be `border-radius: 50%`; run `grep -r "border-radius" src/components/home/DoctorCard.module.css` |
| Emergency nav link loses red styling | Medium | High | `.emergency-link` class must set `color: #DC2626` (inline-style exception per spec) |
| NABH / JCI badge missing from WhyUs or footer | Medium | Medium | Grep for `NABH` — must appear in both `WhyUs.tsx` and `Footer.tsx` |
| Static export incompatibility with dynamic routes | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing any component |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
| TypeScript strict mode errors on build | Medium | High | Run `tsc --noEmit` after each logical group of files, not only at end |
