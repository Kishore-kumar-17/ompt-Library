# 04 — Build Plan
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, global styles, nav | `types/`, `lib/data.ts`, `globals.css`, `StickyNav` |
| 2 | Hero + TrustStrip | `Hero`, `TrustStrip`, marquee animation verified |
| 3 | ServiceTiers + HowItWorks + StatsRow | Pricing cards, step flow, count-up animation |
| 4 | ExpertStrip + Footer + QA pass | `ExpertStrip`, `Footer`, Lighthouse run, checklist |

---

## Day 1 — Foundation

### Goals
- TypeScript compiles clean: `tsc --noEmit` exits 0
- All 8 CSS tokens in `globals.css`, no hex in any module file
- StickyNav renders with correct height, always-dark background
- `npm run dev` serves the page with no console errors

### Tasks

**1.1 — Project scaffold**
```
npx create-next-app@latest taxguard --typescript --tailwind=false --app
cd taxguard
npm install framer-motion lucide-react
```

**1.2 — Font**
```typescript
// src/app/layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**1.3 — Types + data**
- Create `src/types/index.ts` — all interfaces from `02_Architecture.md`
- Create `src/lib/data.ts` — all mock data arrays

**1.4 — `globals.css`**
- 8 tokens exactly; verify with grep: `grep "var(--color" src/app/globals.css | wc -l` returns 0 false positives
- Verify no hex in any `.module.css`: `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` returns empty

**1.5 — StickyNav**
- Server component (no `'use client'`)
- Height 64px, `background: var(--color-darker)`, `border-bottom: 0.5px solid var(--color-border)`
- Logo (text), centered nav links, "File Now" blue CTA at right
- "File Now" CTA: `height: 40px; border-radius: 4px; background: var(--color-blue)`

### Gate 1 checks
- [ ] `tsc --noEmit` passes
- [ ] `npm run dev` serves with zero console errors
- [ ] Nav background is `#0d0d0d` throughout — no scroll state change
- [ ] "File Now" button radius is exactly 4px (inspect in DevTools)
- [ ] No hex in any `.module.css` file

---

## Day 2 — Hero + TrustStrip

### Goals
- Hero renders with all 5 elements: eyebrow, H1, subheading, trust row, dual CTAs
- TrustStrip marquee animates; stops under `prefers-reduced-motion`
- Certification badges render below logo strip

### Tasks

**2.1 — Hero**
- Eyebrow: `color: var(--color-blue); font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase`
- H1: `font-weight: 800; font-size: clamp(2.5rem, 5vw, 3.75rem); color: var(--color-text)`
- Trust row: star emoji + "4.9/5 | 45K+ Reviews | ₹5,346 Cr+ Refunds Delivered"
- Dual CTAs side by side: "File Yourself" (primary) + "Get CA Help" (secondary)
- Both CTAs same height, same `border-radius: 4px`

**2.2 — TrustStrip**
- Duplicate `trustLogos` array for seamless loop
- `.track { animation: marquee 20s linear infinite; display: flex; width: 200% }`
- Logo opacity `0.5`, `filter: brightness(0) invert(1)` — monochrome white
- Fade mask: `mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)`
- Certifications row below marquee

**2.3 — Framer Motion entrance**
- Wrap each section in `<motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>`
- Hero children stagger: `0.3s` delay increments

### Gate 2 checks
- [ ] Hero has both "File Yourself" AND "Get CA Help" CTAs — both visible, equal size
- [ ] Star rating "4.9/5" visible in hero trust row
- [ ] ₹ refund amount visible in hero trust row
- [ ] Marquee animates continuously in normal mode
- [ ] Marquee is static in `prefers-reduced-motion` (test via Chrome DevTools)
- [ ] Certification badges (ISO 27001, SSL, SOC 2) visible below logo strip
- [ ] All logos are monochrome (not full-color) on dark background

---

## Day 3 — ServiceTiers + HowItWorks + StatsRow

### Goals
- All 3 pricing tiers visible with prices (₹0, ₹999, ₹1,999)
- Recommended card has blue border and tint background
- "Recommended" badge positioned above card (absolute, not inside)
- 3 How It Works steps with numbered circles and connector line
- Stats count up on scroll (once only)

### Tasks

**3.1 — ServiceTiers (server component)**
- Map over `serviceTiers` array
- Wrap each card in `.cardWrapper` with `position: relative; padding-top: 20px`
- Recommended badge: `position: absolute; top: 0; left: 50%; transform: translateX(-50%)`
- Feature list: blue checkmark icon (Lucide `Check`) for `included: true`, grey dash for `false`
- CTA: `fullWidth` prop on Button, `primary` variant for recommended, `secondary` for others

**3.2 — HowItWorks (server component)**
- 5-column grid: step | connector | step | connector | step
- Number circle: `width: 40px; height: 40px; border-radius: 50%; background: var(--color-blue)`
- Connector: `height: 1px; background: rgba(22, 120, 251, 0.3)` — desktop only, hidden mobile

**3.3 — StatsRow (`'use client'`)**
- IntersectionObserver: threshold 0.5, fires once (`observer.disconnect()` after first trigger)
- Ease-out cubic: `const eased = 1 - Math.pow(1 - progress, 3)`
- `Math.round(eased * value * 10) / 10` — preserves one decimal for `4.9` and `99.9`
- Background: `var(--color-dark)` — NOT a colored strip

### Gate 3 checks
- [ ] 3 pricing cards all visible with prices (free, ₹999, ₹1,999)
- [ ] CA Filing card has blue border (`var(--color-blue)`) and blue-tint background
- [ ] "Recommended" badge sits ABOVE the card, not inside it
- [ ] Feature checkmarks are blue (not green, not grey) on included features
- [ ] "File Yourself" and "Expert Assist" cards have secondary (outline) CTAs
- [ ] Step connector line visible on desktop, hidden on mobile
- [ ] Stats count up when scrolled into view
- [ ] Stats background is same dark as rest of page (no colored strip)
- [ ] Count-up fires only once (scroll away and back — numbers don't reset)

---

## Day 4 — ExpertStrip + Footer + QA Pass

### Goals
- ExpertStrip shows 3 capability callouts (500+ CAs, <24hr, 100%)
- Footer 4-column layout with cert badges at bottom
- Lighthouse Performance ≥90, Accessibility ≥90
- `npm run build` succeeds

### Tasks

**4.1 — ExpertStrip (server component)**
- 3 cards from `expertStats` array
- Icons from `lucide-react`: Users, Clock, Shield — in `var(--color-blue)`
- Not individual profiles — team capability callout only

**4.2 — Footer**
- 4 columns: Brand+tagline | Services | Resources | Company
- Link hover: `color: var(--color-blue)`
- Bottom bar: copyright left, cert badges right
- Cert badge images: `opacity: 0.5`

**4.3 — Static export config**
```typescript
// next.config.ts
const config = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```

**4.4 — QA pass**
- Run `npm run build` — must exit 0
- Run `tsc --noEmit` — zero errors
- Run Lighthouse in Chrome on `npm run start`
- Grep for hex in module files: `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"`
- Inspect button radius in DevTools: must read `4px` on every interactive button
- Inspect card radius: must read `8px` on every card

### Gate 4 checks (final)
- [ ] `npm run build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] Zero hex values in any `.module.css` file
- [ ] Every button: `border-radius: 4px` in DevTools
- [ ] Every card: `border-radius: 8px` in DevTools
- [ ] No `border-radius: 9999px` anywhere in the codebase
- [ ] No white or near-white section background anywhere
- [ ] All 3 pricing tiers show prices
- [ ] Hero has dual CTAs + star ratings + ₹ refund amount
- [ ] Logo marquee works, stops under prefers-reduced-motion
- [ ] Count-up animation fires once only
- [ ] No serif font in any rendered text (inspect font-family in DevTools)
- [ ] Footer cert badges visible at bottom

---

### Cut Order

**Never cut:**
- ServiceTiers pricing section with all 3 tiers + Recommended badge (conversion-critical)
- Dual CTAs in hero ("File Yourself" + "Get CA Help") + star rating trust row
- TrustStrip marquee with `prefers-reduced-motion` support

**Cut first if time-constrained:**
- StatsRow count-up animation (keep StatsRow as static numbers)
- ExpertStrip section
- HowItWorks connector line (keep steps, remove desktop connector)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Button given `border-radius: 9999px` (pill shape) | High | High | ALL buttons must be `border-radius: 4px` — no pill shapes; `grep -r "9999px" src` → must be empty |
| White or light section background added | Medium | High | All content sections use dark bg — `grep -r "background.*white\|#fff" src/components --include="*.module.css"` → empty |
| "Recommended" badge placed inside card content | Medium | Medium | Badge must be `position: absolute; top: 0` on `.cardWrapper` — sits above card, not inside it |
| Count-up animation fires on every scroll pass | Low | Medium | `observer.disconnect()` after first trigger ensures single-fire; verify by scrolling away and back |
| Marquee not stopping under `prefers-reduced-motion` | Medium | High | CSS `@media (prefers-reduced-motion: reduce)` must set `animation: none` on `.track` |
| Cert badges missing from footer bottom bar | Low | Medium | ISO 27001, SSL, SOC 2 badges at `opacity: 0.5` required in footer; visual inspection |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
