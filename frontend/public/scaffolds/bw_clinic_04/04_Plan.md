# 04 — Build Plan
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, globals, layout, Button, SiteNav | Types, tokens, dark nav confirmed |
| 2 | HeroSection + CategoryTabs + PackageCard | Hero, glassmorphism cards, filtering |
| 3 | HowItWorks + WhyChooseUs + Testimonials | Light sections, trust content |
| 4 | Footer + Framer Motion + QA | Complete build, Lighthouse |

---

## Day 1 — Foundation

### Goals
- `tsc --noEmit` exits 0
- 8 CSS tokens confirmed; zero hex in any `.module.css`
- Inter 400+600+700 loaded via `next/font/google`
- SiteNav renders dark bg, "VitalCheck" logo in pink, "Book Now" with dark text on pink
- Button primary: `color: rgb(21,23,28)` (dark, NOT white) in DevTools

### Tasks

**1.1 — Scaffold**
```bash
npx create-next-app@latest vitalcheck \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd vitalcheck
npm install framer-motion lucide-react
```

**1.2 — next.config.ts**
```typescript
import type { NextConfig } from 'next'
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
export default config
```

**1.3 — TypeScript types**
File: `src/types/index.ts` — all 4 interfaces + `ServiceCategory` union type.
`tsc --noEmit` → must exit 0.

**1.4 — Mock data + utilities**
`src/lib/data.ts` — 4 arrays (8 packages, 3 steps, 4 trust signals, 3 testimonials).
`src/lib/filterPackages.ts` — `filterPackages()` function.
`src/lib/formatINR.ts` — `formatINR()` function.

**1.5 — globals.css**
8 tokens + `.sr-only` + `prefers-reduced-motion`.
Verify: `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` → empty.

**1.6 — layout.tsx**
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-sans' })
```

**1.7 — Button (3 variants)**
- `primary`: `background: var(--color-pink); color: var(--color-dark-text);` — dark text on pink ✓
- `outlineWhite`: for use on dark bg sections only
- `outlineLight`: for use on light bg sections
All: `border-radius: 8px`.

**1.8 — SiteNav (server component)**
Dark bg, no `'use client'`. Logo "VitalCheck" in pink. Nav links white, pink hover. Location pill with `border-radius: 24px`. "Book Now": primary button, dark text.

### Gate 1 Checks
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run dev` zero console errors
- [ ] SiteNav: dark bg (`rgb(21,23,28)`) in DevTools
- [ ] "VitalCheck" logo: pink text (`rgb(255,49,109)`)
- [ ] "Book Now" button: `color: rgb(21,23,28)` in DevTools — NOT white
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` → empty

---

## Day 2 — Hero + CategoryTabs + PackageCard

### Goals
- HeroSection: dark bg, aurora radial gradient, pink eyebrow, white headline, stats bar
- CategoryTabs: pill tabs with correct active state, useMemo filtering
- PackageCard: glassmorphism, strikethrough pricing with `<del>`, dark text on pink CTA
- `rgba()` present in PackageCard.module.css only

### Tasks

**2.1 — HeroSection (server component)**
- Dark bg + `background-image: radial-gradient(...)` aurora overlay (rgba in background-image is acceptable — it's a gradient, not a color value)
- Pink eyebrow: `color: var(--color-pink)`
- White H1: clamp(2.5rem, 5vw, 4rem), Inter 700
- Muted subheading
- Two CTAs: "Explore Packages" (primary) + "View Tests" (outlineWhite)
- Stats bar: "500+ Tests", "24hr Reports", "Home Collection", "NABL Certified"

**2.2 — PackageCard (server component)**
```tsx
// Strikethrough pricing — semantic <del> tag
<p className={styles.priceBlock}>
  <del className={styles.original}
       aria-label={`Original price ${formatINR(pkg.originalPrice)}`}>
    {formatINR(pkg.originalPrice)}
  </del>
  <strong className={styles.price}>{formatINR(pkg.discountedPrice)}</strong>
  <span className={styles.discountBadge}>{pkg.discountPercent}% off</span>
</p>

// Conditional POPULAR badge — JSX, not display:none
{pkg.popular && (
  <span className={styles.popularBadge} aria-label="Popular package">POPULAR</span>
)}

// CTA — dark text on pink
<Button variant="primary" fullWidth>Book Now</Button>
```

**2.3 — CategoryTabs (`'use client'`)**
```tsx
const [active, setActive] = useState<ServiceCategory | 'all'>('all')
const filtered = useMemo(() => filterPackages(packages, active), [active, packages])
```
Active tab: pink bg, dark text. Inactive: surface bg, white text. All `border-radius: 24px`.

### Gate 2 Checks
- [ ] HeroSection: dark bg visible, pink eyebrow, white headline
- [ ] Aurora gradient visible (subtle radial pink glow in hero)
- [ ] CategoryTabs "All" tab active on load: pink bg, dark text confirmed
- [ ] Switching to "Full Body" tab: only 1 card ("Complete Health Profile") visible
- [ ] PackageCard glassmorphism: `backdrop-filter: blur(12px)` in DevTools
- [ ] PackageCard "POPULAR" badge shown for Complete Health Profile + Senior Wellness
- [ ] Strikethrough: `<del>` tag confirmed in DevTools Elements (not `<span>`)
- [ ] "Book Now" button: `color: rgb(21,23,28)` in DevTools — dark, NOT white
- [ ] PackageCard hover: pink glow visible
- [ ] `grep -r "rgba(" src --include="*.module.css"` → only PackageCard.module.css

---

## Day 3 — HowItWorks + WhyChooseUs + Testimonials

### Goals
- HowItWorks: light bg, dark text, 3-step process with pink numbered circles
- WhyChooseUs: dark bg, surface cards (no glassmorphism), 4 trust signals
- Testimonials: light bg, white card, star ratings

### Tasks

**3.1 — HowItWorks (server component)**
Light bg (`var(--color-light-bg)`). Dark text throughout.
3 step cards: white bg, `border-radius: 12px`, border.
Step number circle: pink bg, dark text, `border-radius: 50%` (correct — it's a circle, not a photo).
Lucide icons from `iconName` map.

**3.2 — WhyChooseUs (server component)**
Dark bg (`var(--color-bg)`). 2×2 grid.
Trust cards: surface bg (`var(--color-surface)`), `border-radius: 12px`, `border: 1px solid var(--color-border)`.
**No glassmorphism** on these cards — solid surface, not glass.
Pink Lucide icons. White titles. Muted descriptions.

**3.3 — Testimonials (server component)**
Light bg. 3-column grid.
White card, `border-radius: 12px`, `border: 1px solid var(--color-border)`.
Star rating: amber `#F59E0B` SVG fill (inline). No `<img>` elements.
Patient name + package booked.

### Gate 3 Checks
- [ ] HowItWorks: light bg (`rgb(242,244,248)`) confirmed
- [ ] HowItWorks text: dark (`rgb(21,23,28)`) — not white
- [ ] Step numbered circles: `border-radius: 50%` in DevTools — circle confirmed
- [ ] Step circle: pink bg, dark text ✓
- [ ] WhyChooseUs: dark bg
- [ ] WhyChooseUs cards: surface bg (`rgb(30,33,48)`) — no glassmorphism
- [ ] Testimonials: light bg
- [ ] No `<img>` in testimonial cards
- [ ] Star: amber fill in DevTools (not an image)
- [ ] `tsc --noEmit` exits 0

---

## Day 4 — Footer + Framer Motion + QA

### Tasks

**4.1 — Footer (server component)**
Dark bg (`var(--color-bg)`). 4 columns. Logo "VitalCheck" in pink. White text. Links hover to pink.
`© {new Date().getFullYear()} VitalCheck Health Technologies Pvt. Ltd.`

**4.2 — Framer Motion**
```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```
Wrap each major section. `once: true`.

**4.3 — QA Pass**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"     # must be empty
grep -r "rgba(" src --include="*.module.css"                    # PackageCard.module.css only
grep -r "border-radius: 50%" src/components --include="*.module.css"  # only HowItWorks .stepNum (acceptable)
grep -r "9999px" src                                            # must be empty
grep -r "box-shadow" src/components --include="*.module.css"    # PackageCard.module.css only
```

### Gate 4 Checks (Final)
- [ ] `npm run build` exits 0, `/out` directory produced
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] SiteNav: dark bg, sticky, Inter font
- [ ] "Book Now" in nav: dark text on pink (`rgb(21,23,28)`)
- [ ] All pink buttons: dark text — NOT white
- [ ] PackageCard: glassmorphism confirmed in DevTools
- [ ] Strikethrough: `<del>` tag in DevTools Elements
- [ ] CategoryTabs active: pink bg, dark text
- [ ] CategoryTabs inactive: surface bg, white text
- [ ] All tab pills: `border-radius: 24px`
- [ ] PackageCard: `border-radius: 16px`
- [ ] HowItWorks + Testimonials: light bg confirmed
- [ ] WhyChooseUs cards: NO glassmorphism — solid surface
- [ ] Step circles: `border-radius: 50%` (correct — decorative, not photo)
- [ ] Footer: dark bg, pink logo, links hover pink
- [ ] No doctor/provider card anywhere
- [ ] No specialty dropdown, no text search input
- [ ] No NABH/JCI modal badge (plain text in trust cards is correct)
- [ ] No emergency link
- [ ] Inter confirmed (no Roboto, Lato, Nunito)
- [ ] Prices formatted ₹1,999 style (toLocaleString)
- [ ] `prefers-reduced-motion` disables animations
- [ ] All interactive elements keyboard-accessible

---

### Cut Order

**Never cut:**
- CategoryTabs + PackageCard with glassmorphism (the dark-UI showcase — core design statement)
- `<del>` strike-through pricing on all PackageCards (semantic HTML requirement)
- Pink button dark-text rule — ALL `var(--color-pink)` elements must use `color: var(--color-dark-text)`

**Cut first if time-constrained:**
- HowItWorks process section
- Testimonials grid
- Framer Motion section entrance animations

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Pink button text set to white instead of dark | High | High | White on pink `#FF316D` = 3.55:1 — FAILS WCAG AA; ALL pink elements must use `color: var(--color-dark-text)` (#15171C) |
| `backdrop-filter` without `-webkit-` prefix | Medium | Medium | Safari requires `-webkit-backdrop-filter: blur(12px)` alongside standard property in `PackageCard.module.css` |
| `rgba()` used outside `PackageCard.module.css` | Medium | High | Glassmorphism exception applies to PackageCard only; `grep -r "rgba(" src/components --include="*.module.css"` → PackageCard only |
| CategoryTabs missing `role="tablist"` / `role="tab"` / `aria-selected` | Medium | High | Accessibility requirement; verify in DevTools Accessibility tree |
| Glassmorphism (`backdrop-filter`) applied to WhyChooseUs cards | Medium | Medium | WhyChooseUs uses solid `var(--color-surface)` — glassmorphism ONLY in `PackageCard.module.css` |
| Static export incompatibility | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing components |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` → `rgba(` in PackageCard is the only exception |
