# 04 — Build Plan
## Productized Indian Legal Services · bw_legal_platform_04

---

## Overview

| Day | Focus | Output |
|-----|-------|--------|
| 1 | Foundation — types, data, global styles, nav | `types/`, `lib/data.ts`, `globals.css`, `StickyNav` |
| 2 | Hero + RatingBadge | Split hero, dual ratings, ISO badge, visual panel |
| 3 | ServiceTabs + ProductCard + TrustSignals | Tabbed catalog, strike-through pricing, trust band |
| 4 | HowItWorks + Testimonials + Footer + QA | Steps, reviews, nav footer, Lighthouse run |

---

## Day 1 — Foundation

### Goals
- TypeScript compiles clean: `tsc --noEmit` exits 0
- All 8 CSS tokens in `globals.css`, no hex in any module file
- StickyNav renders white, with yellow "Get Started" button at 6px radius
- `npm run dev` serves with no console errors

### Tasks

**1.1 — Scaffold**
```bash
npx create-next-app@latest lexflow --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd lexflow
npm install framer-motion lucide-react
```

**1.2 — Font**
```typescript
// src/app/layout.tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})
```

**1.3 — Types + data**
- `src/types/index.ts` — `TabId`, `ServiceProduct`, `Testimonial`, `TrustSignal`, `Step`
- `src/lib/data.ts` — 12 `serviceProducts` (3 per tab), 4 `trustSignals`, 3 `steps`, 3 `testimonials`

**1.4 — globals.css**
- Exactly 8 `--color-*` tokens
- Verify: `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty

**1.5 — StickyNav (server component)**
- White background always — no scroll state
- Logo: "Lex**Flow**" (Flow in `--color-blue`)
- Nav links: Services, About, Blog, Contact
- CTA: `<Link>` with `.cta` class — yellow bg, navy text, 6px radius

### Gate 1 checks
- [ ] `tsc --noEmit` passes
- [ ] `npm run dev` serves with zero console errors
- [ ] Nav is white with yellow "Get Started" button
- [ ] "Get Started" button radius: 6px in DevTools
- [ ] No hex in any `.module.css` file

---

## Day 2 — Hero + RatingBadge

### Goals
- Split hero (55% left content, 45% right visual panel) renders correctly
- Both Google AND Trustpilot rating badges present
- ISO 27001 badge visible in ratings row
- Money-back guarantee text in hero
- Both CTAs present: "Register My Business" (navy primary) + "Talk to an Expert" (secondary outline)

### Tasks

**2.1 — RatingBadge component**
- `src/components/ui/RatingBadge.tsx` + `RatingBadge.module.css`
- Props: `platform: 'google' | 'trustpilot'`, `rating: number`, `count: string`
- Rendered twice in Hero with different `platform` values

**2.2 — Hero section**
- Left col: eyebrow → H1 → subheading → ratings row → guarantee line → CTA row
- Ratings row: `<RatingBadge platform="google" rating={4.5} count="20K+" />` + divider + `<RatingBadge platform="trustpilot" rating={4.5} count="7.5K+" />` + ISO chip
- Right col: floating card showing top 3 services with strike-through prices
- Guarantee: "7-day application submission or 100% money back"
- Two CTAs: "Register My Business" (primary) + "Talk to an Expert" (secondary)

**2.3 — Framer Motion hero entrance**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
```
Stagger hero children: 200ms increments.

### Gate 2 checks
- [ ] Both rating badges visible (Google + Trustpilot)
- [ ] ISO 27001 badge in ratings row
- [ ] Money-back guarantee text in hero
- [ ] "Register My Business" AND "Talk to an Expert" CTAs both present
- [ ] Right visual panel visible on desktop, hidden on mobile (≤900px)
- [ ] H1 color is navy (`#022B50`) — not black, not dark grey
- [ ] Both CTAs: `border-radius: 6px` in DevTools

---

## Day 3 — ServiceTabs + ProductCard + TrustSignals

### Goals
- Tab switching works: 4 tabs filter 3 cards each
- Every ProductCard shows original (struck-through) + discounted price
- Yellow discount badge on every card
- "Most Popular" ribbon on popular cards
- TrustSignals band renders on `#F5FAFF` background

### Tasks

**3.1 — ProductCard (server component)**
- `<del>₹1,499</del>` for original price — semantic HTML
- Discounted price: Roboto 700, navy, large
- Yellow discount badge: `-{discountPercent}% Off`
- Delivery: Clock icon + "Filed in X days" in blue
- Feature list: Lucide `Check` in blue
- `popular` → "Most Popular" ribbon `position: absolute; top: -1px; right: 16px`
- CTA: `<Button variant="primary" fullWidth>Get Started</Button>`

**3.2 — ServiceTabs (`'use client'`)**
- `useState<TabId>('startup')` for active tab
- `serviceProducts.filter(p => p.category === active)` for card grid
- ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`
- Active tab: `border-bottom: 3px solid var(--color-yellow)` via CSS class

**3.3 — TrustSignals (server component)**
- 4 blocks on `#F5FAFF` background
- Map `trustSignals` array
- Lucide icon in navy inside white `10px` rounded icon box

### Gate 3 checks
- [ ] Clicking tab changes card grid (verify all 4 tabs)
- [ ] Every card shows BOTH original (del) AND discounted price
- [ ] Yellow `-X% Off` badge on every card
- [ ] "Most Popular" ribbon on popular=true cards
- [ ] Feature items have blue Lucide Check icons (not text "✓")
- [ ] `ServiceTabs.tsx` is the ONLY file with `'use client'`
- [ ] `ProductCard.tsx` has NO `'use client'`
- [ ] TrustSignals background is `#F5FAFF` (not white, not navy)
- [ ] ISO guarantee money-back text visible in TrustSignals

---

## Day 4 — HowItWorks + Testimonials + Footer + QA

### Goals
- 3 steps with navy circles and yellow connector lines
- 3 testimonial cards with star ratings
- Footer navy with yellow hover on links
- Lighthouse ≥90/90, TypeScript clean, build succeeds

### Tasks

**4.1 — HowItWorks (server component)**
- 5-col grid: step | connector | step | connector | step
- Connector: `height: 2px; background: var(--color-yellow); width: 48px` — yellow, not blue (contrast with bw_legal_03)
- Navy circles 40×40px

**4.2 — Testimonials (server component)**
- 3 cards: white bg, 10px radius, shadow
- StarRating: 5 filled stars (Lucide `Star` or unicode ⭐)
- Quote in muted, name in navy, company type in muted

**4.3 — Footer**
- Navy `#022B50` background
- Links hover to `var(--color-yellow)` — NOT white (yellow on navy = brand accent)
- Cert badges at 50% opacity, `filter: brightness(0) invert(1)` for white on navy

**4.4 — Static export**
```typescript
// next.config.ts
const config = { output: 'export', images: { unoptimized: true } }
```

**4.5 — QA**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"
```
Then Lighthouse in Chrome.

### Gate 4 checks (final)
- [ ] `npm run build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] Zero hex / rgba in any `.module.css` file
- [ ] Every button: `border-radius: 6px` (DevTools)
- [ ] Every card: `border-radius: 10px` (DevTools)
- [ ] No `border-radius: 9999px` anywhere in codebase
- [ ] No `border-radius: 4px` on any button
- [ ] No dark section backgrounds
- [ ] All ProductCards show both prices (del + discounted)
- [ ] Hero has both Google + Trustpilot rating badges
- [ ] Yellow connector lines in HowItWorks (not blue)
- [ ] Footer links hover to yellow (not white)
- [ ] No serif font anywhere
- [ ] `ServiceTabs` is only `'use client'` component

---

### Cut Order

**Never cut:**
- ServiceTabs + ProductCard with `<del>` strike-through + yellow discount badges (catalog core)
- Both Google + Trustpilot rating badges in hero (trust credibility)
- HowItWorks with yellow connector lines (brand colour reinforcement)

**Cut first if time-constrained:**
- Testimonials section
- TrustSignals band
- ISO chip in hero ratings row (keep Google + Trustpilot; cut ISO badge)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Button given pill shape (`border-radius: 9999px` or `24px`) | High | High | ALL buttons must be `border-radius: 6px`; `grep -r "9999px\|24px" src/components --include="*.module.css"` → empty |
| Yellow button text set to white instead of navy | High | High | White on yellow `#FFD000` = 1.07:1 — FAILS WCAG; yellow buttons ALWAYS use `color: var(--color-navy)` |
| `<span>` used instead of `<del>` for strike-through price | Medium | High | Semantic HTML required for accessibility; verify `<del>` tag in DevTools Elements panel |
| Only one rating badge visible (Google OR Trustpilot) | Medium | Medium | Hero must show BOTH Google AND Trustpilot badges simultaneously — dual trust signal |
| Dark section background added (besides footer) | Medium | Medium | No dark bg sections in content area; all use white or `#F5FAFF`; visual inspection required |
| `ServiceTabs` not the only `'use client'` component | Medium | High | `grep -r "'use client'" src/components --include="*.tsx"` → must return only `ServiceTabs.tsx` |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
