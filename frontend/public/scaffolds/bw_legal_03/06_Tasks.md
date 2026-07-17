# 06 — Tasks
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## Task Index

| ID | Title | Day | Depends On | Status |
|----|-------|-----|------------|--------|
| TASK-001 | Scaffold Next.js project | 1 | — | — |
| TASK-002 | Install dependencies | 1 | TASK-001 | — |
| TASK-003 | TypeScript types | 1 | TASK-001 | — |
| TASK-004 | Mock data | 1 | TASK-003 | — |
| TASK-005 | Global CSS tokens | 1 | TASK-001 | — |
| TASK-006 | Root layout + font | 1 | TASK-005 | — |
| TASK-007 | Button component | 1 | TASK-005 | — |
| TASK-008 | StickyNav | 1 | TASK-007 | — |
| TASK-009 | Hero section | 2 | TASK-008 | — |
| TASK-010 | TrustStrip | 2 | TASK-004 | — |
| TASK-011 | ServiceTiers | 3 | TASK-004, TASK-007 | — |
| TASK-012 | HowItWorks | 3 | TASK-004 | — |
| TASK-013 | StatsRow | 3 | TASK-004 | — |
| TASK-014 | ExpertStrip | 4 | TASK-004 | — |
| TASK-015 | Footer | 4 | TASK-007 | — |
| TASK-016 | Framer Motion entrances | 4 | All sections | — |
| TASK-017 | Static export config | 4 | TASK-001 | — |
| TASK-018 | QA pass + launch checklist | 4 | All tasks | — |

---

## TASK-001 — Scaffold Next.js project

**Day:** 1
**Estimate:** 10 min

```bash
npx create-next-app@latest taxguard \
  --typescript \
  --no-tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd taxguard
```

**Acceptance:** `npm run dev` starts without errors. `src/app/` directory exists.

---

## TASK-002 — Install dependencies

**Day:** 1
**Depends on:** TASK-001

```bash
npm install framer-motion lucide-react
```

**Acceptance:** Both packages appear in `package.json` dependencies. No peer dependency errors.

---

## TASK-003 — TypeScript types

**Day:** 1
**Depends on:** TASK-001
**File:** `src/types/index.ts`

Copy all interfaces from `02_Architecture.md`:
- `ServiceTier`, `TierFeature`
- `Stat`, `Step`, `TrustLogo`, `Certification`, `ExpertStat`

**Acceptance:** `tsc --noEmit` exits 0 after creation.

---

## TASK-004 — Mock data

**Day:** 1
**Depends on:** TASK-003
**File:** `src/lib/data.ts`

Copy all data arrays from `02_Architecture.md`:
- `serviceTiers` (3 items: self, expert, ca)
- `stats` (4 items)
- `steps` (3 items)
- `trustLogos` (6 items)
- `certifications` (3 items)
- `expertStats` (3 items)

**Acceptance:** TypeScript compiles. `tsc --noEmit` still exits 0.

---

## TASK-005 — Global CSS tokens

**Day:** 1
**File:** `src/app/globals.css`

```css
:root {
  --color-dark:       #151515;
  --color-darker:     #0d0d0d;
  --color-blue:       #1678FB;
  --color-blue-tint:  rgba(22, 120, 251, 0.08);
  --color-text:       #EDEFF2;
  --color-muted:      #929FB0;
  --color-border:     rgba(155, 170, 189, 0.3);
  --color-surface:    rgba(255, 255, 255, 0.04);
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}
/* plus reset, html/body background, prefers-reduced-motion block */
```

**Acceptance:** Exactly 8 `--color-*` custom properties. `grep "#" src/app/globals.css` returns only the `:root` token definitions, nowhere else.

---

## TASK-006 — Root layout + font

**Day:** 1
**Depends on:** TASK-005
**File:** `src/app/layout.tsx`

```typescript
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

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

**Acceptance:** DevTools Elements panel shows `<html class="...">` with the font variable class. Computed font-family on `body` shows Plus Jakarta Sans before any fallback.

---

## TASK-007 — Button component

**Day:** 1
**Depends on:** TASK-005
**Files:** `src/components/ui/Button.tsx`, `src/components/ui/Button.module.css`

Key constraint: `border-radius: 4px` in CSS — not configurable, not a prop.

**Acceptance:**
- Renders `<Link>` when `href` prop provided
- Renders `<button>` when no `href`
- `variant="primary"` → blue background
- `variant="secondary"` → transparent with border
- `fullWidth` → `width: 100%`
- DevTools shows `border-radius: 4px` on rendered output

---

## TASK-008 — StickyNav

**Day:** 1
**Depends on:** TASK-007
**Files:** `src/components/layout/StickyNav.tsx`, `src/components/layout/StickyNav.module.css`

**Critical requirements:**
- NO `'use client'` — server component only
- NO scroll event listener
- NO useState for transparency
- Background is ALWAYS `var(--color-darker)`

Structure:
```tsx
export default function StickyNav() {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>Tax<span>Guard</span></Link>
        <ul className={styles.links}>
          <li><Link href="#services" className={styles.link}>Services</Link></li>
          <li><Link href="#how" className={styles.link}>How It Works</Link></li>
          <li><Link href="#experts" className={styles.link}>Our CAs</Link></li>
        </ul>
        <Link href="#services" className={styles.cta}>File Now</Link>
      </div>
    </nav>
  )
}
```

**Acceptance:**
- Rendered HTML has no `data-react-hydration` markers (server rendered)
- Nav background is always `rgb(13, 13, 13)` at top, middle, and bottom of page
- "File Now" link has `border-radius: 4px` in DevTools

---

## TASK-009 — Hero section

**Day:** 2
**Depends on:** TASK-008
**Files:** `src/components/home/Hero.tsx`, `src/components/home/Hero.module.css`

Required elements (in order):
1. Eyebrow: "India's #1 Tax Platform"
2. H1: "File Your Taxes Right. Get Every Rupee Back."
3. Subheading
4. Trust row: star + 4.9/5 + divider + 45K+ Reviews + divider + ₹5,346 Cr+ Refunds
5. CTA row: "File Yourself" (primary) + "Get CA Help" (secondary)

**Acceptance:**
- Both CTAs present
- Trust row contains all 3 data points
- H1 font-weight: 800 in DevTools
- Section background: `rgb(21, 21, 21)`

---

## TASK-010 — TrustStrip

**Day:** 2
**Depends on:** TASK-004
**Files:** `src/components/home/TrustStrip.tsx`, `src/components/home/TrustStrip.module.css`

```typescript
// Duplicate for seamless loop
const doubled = [...trustLogos, ...trustLogos]
```

CSS keyframe must be in the `.module.css` file:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.track {
  animation: marquee 20s linear infinite;
  display: flex;
  width: 200%;
}
@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
}
```

**Acceptance:**
- Logos animate continuously in browser
- Animation stops with `prefers-reduced-motion: reduce` in DevTools
- Logos appear white/monochrome (filter applied)
- No visible seam/jump in marquee loop
- Cert badges (ISO, SSL, SOC2) render below marquee

---

## TASK-011 — ServiceTiers

**Day:** 3
**Depends on:** TASK-004, TASK-007
**Files:** `src/components/home/ServiceTiers.tsx`, `src/components/home/ServiceTiers.module.css`

Server component. No `'use client'`.

Recommended badge pattern:
```tsx
<div className={styles.cardWrapper}>
  {tier.recommended && (
    <span className={styles.recommendedBadge}>Recommended</span>
  )}
  <div className={cn(styles.card, tier.recommended && styles.recommended)}>
    {/* card content */}
  </div>
</div>
```

Feature icon pattern:
```tsx
import { Check, Minus } from 'lucide-react'
// ...
{feature.included
  ? <Check className={cn(styles.featureIcon, styles.check)} size={18} />
  : <Minus className={cn(styles.featureIcon, styles.dash)} size={18} />
}
```

**Acceptance:**
- All 3 price labels visible (Free, ₹999/year, ₹1,999/year)
- CA Filing card has blue border, blue-tint background
- "Recommended" badge sits above card top edge
- Feature icons are Lucide components, not text characters
- No `'use client'`

---

## TASK-012 — HowItWorks

**Day:** 3
**Depends on:** TASK-004
**Files:** `src/components/home/HowItWorks.tsx`, `src/components/home/HowItWorks.module.css`

5-column grid on desktop (step | connector | step | connector | step):
```tsx
<div className={styles.steps}>
  {steps.map((step, i) => (
    <>
      <div key={step.number} className={styles.step}>...</div>
      {i < steps.length - 1 && (
        <div key={`conn-${i}`} className={styles.connector} aria-hidden="true" />
      )}
    </>
  ))}
</div>
```

**Acceptance:**
- 3 steps render with correct content
- Blue number circles (40×40, `border-radius: 50%`)
- Connector line visible desktop, hidden mobile
- Connector line color: `rgba(22, 120, 251, 0.3)`

---

## TASK-013 — StatsRow

**Day:** 3
**Depends on:** TASK-004
**Files:** `src/components/home/StatsRow.tsx`, `src/components/home/StatsRow.module.css`

`'use client'` required. Copy `Counter` component from `02_Architecture.md` exactly — do not simplify the ease-out cubic.

**Critical:** `Math.round(eased * value * 10) / 10` — the `* 10 / 10` preserves one decimal for `4.9` and `99.9`.

**Acceptance:**
- Numbers animate on scroll
- 4.9 shows as "4.9" not "5" or "4"
- 99.9 shows as "99.9" not "100"
- Scrolling away and back does not reset (verify `started.current`)
- Background is same dark as page (not a colored strip)

---

## TASK-014 — ExpertStrip

**Day:** 4
**Depends on:** TASK-004
**Files:** `src/components/home/ExpertStrip.tsx`, `src/components/home/ExpertStrip.module.css`

```tsx
import { Users, Clock, Shield } from 'lucide-react'
// Map icon name string to Lucide component
const iconMap = { Users, Clock, Shield }
```

**Acceptance:**
- 3 cards: "500+", "< 24hr", "100%"
- Lucide icons in blue
- No individual CA photos or names

---

## TASK-015 — Footer

**Day:** 4
**Depends on:** TASK-007
**Files:** `src/components/layout/Footer.tsx`, `src/components/layout/Footer.module.css`

4 columns: Brand | Services | Resources | Company

Bottom bar structure:
```tsx
<div className={styles.bottom}>
  <p className={styles.copyright}>
    © {new Date().getFullYear()} TaxGuard. All rights reserved.
  </p>
  <div className={styles.certBadges}>
    {certifications.map(cert => (
      <div key={cert.name} className={styles.certBadge}>
        <img src={cert.icon} alt={cert.name} />
        <span>{cert.name}</span>
      </div>
    ))}
  </div>
</div>
```

**Acceptance:**
- 4 columns on desktop, 2 on tablet, 1 on mobile
- Footer background: `var(--color-darker)`
- Links hover to `var(--color-blue)`
- Cert badges at bottom bar

---

## TASK-016 — Framer Motion entrances

**Day:** 4
**Depends on:** All section components

Wrap each major section in a motion wrapper. Example pattern:

```tsx
'use client'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

// Usage on each section:
<motion.div
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  <SectionComponent />
</motion.div>
```

For child staggering (hero only):
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
>
```

**Acceptance:**
- Each section fades + slides in as it enters viewport
- Animations don't re-trigger on scroll up/down (`once: true`)
- Under `prefers-reduced-motion`, sections appear instantly (Framer Motion respects `useReducedMotion`)

---

## TASK-017 — Static export config

**Day:** 4
**File:** `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default config
```

**Acceptance:** `npm run build` produces `/out` directory. No runtime Next.js server required.

---

## TASK-018 — QA pass + launch checklist

**Day:** 4
**Depends on:** All tasks

Run all checks from `07_Guide.md` launch checklist. Sign off each item. Do not ship until all are green.

**Required commands:**
```bash
tsc --noEmit
npm run build
# Then run Lighthouse in Chrome on http://localhost:3000 after npm run start
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
```

**Acceptance:** All 30+ launch checklist items green. Lighthouse Performance ≥90, Accessibility ≥90.
