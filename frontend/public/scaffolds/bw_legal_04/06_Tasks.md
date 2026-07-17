# 06 — Tasks
## Productized Indian Legal Services · bw_legal_platform_04

---

## Task Index

| ID | Title | Day | Depends On |
|----|-------|-----|------------|
| TASK-001 | Scaffold Next.js project | 1 | — |
| TASK-002 | Install dependencies | 1 | TASK-001 |
| TASK-003 | TypeScript types | 1 | TASK-001 |
| TASK-004 | Mock data (12 products, 4 signals, 3 steps, 3 testimonials) | 1 | TASK-003 |
| TASK-005 | Global CSS tokens | 1 | TASK-001 |
| TASK-006 | Root layout + Roboto font | 1 | TASK-005 |
| TASK-007 | Button component (3 variants) | 1 | TASK-005 |
| TASK-008 | StickyNav | 1 | TASK-007 |
| TASK-009 | RatingBadge component | 2 | TASK-005 |
| TASK-010 | Hero section | 2 | TASK-007, TASK-009 |
| TASK-011 | ProductCard | 3 | TASK-004, TASK-007 |
| TASK-012 | ServiceTabs | 3 | TASK-011 |
| TASK-013 | TrustSignals | 3 | TASK-004 |
| TASK-014 | HowItWorks | 4 | TASK-004 |
| TASK-015 | Testimonials | 4 | TASK-004 |
| TASK-016 | Footer | 4 | TASK-007 |
| TASK-017 | Framer Motion section entrances | 4 | All sections |
| TASK-018 | Static export config | 4 | TASK-001 |
| TASK-019 | QA pass + launch checklist | 4 | All tasks |

---

## TASK-001 — Scaffold Next.js project

```bash
npx create-next-app@latest lexflow \
  --typescript \
  --no-tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd lexflow
```

**Acceptance:** `npm run dev` starts. `src/app/` exists.

---

## TASK-002 — Install dependencies

```bash
npm install framer-motion lucide-react
```

**Acceptance:** Both in `package.json` dependencies. Zero peer dependency warnings.

---

## TASK-003 — TypeScript types

**File:** `src/types/index.ts`

```typescript
export type TabId = 'startup' | 'business' | 'compliance' | 'ip'

export interface ServiceProduct {
  id: string
  name: string
  category: TabId
  originalPrice: number
  discountedPrice: number
  discountPercent: number
  govtFee: string
  deliveryDays: string
  features: string[]
  popular: boolean
  ctaLabel: string
}

export interface Testimonial {
  id: string
  name: string
  companyType: string
  rating: 4 | 5
  quote: string
}

export interface TrustSignal {
  id: string
  icon: string
  headline: string
  subtext: string
}

export interface Step {
  number: number
  title: string
  description: string
}
```

**Acceptance:** `tsc --noEmit` exits 0.

---

## TASK-004 — Mock data

**File:** `src/lib/data.ts`

Copy all arrays from `02_Architecture.md`:
- `serviceProducts` — 12 items (3 per `TabId`)
- `trustSignals` — 4 items (ISO, guarantee, Google, businesses)
- `steps` — 3 items
- `testimonials` — 3 items

**Acceptance:** All arrays typed correctly. `tsc --noEmit` still exits 0.

---

## TASK-005 — Global CSS tokens

**File:** `src/app/globals.css`

```css
:root {
  --color-navy:    #022B50;
  --color-yellow:  #FFD000;
  --color-blue:    #007AFF;
  --color-surface: #F5FAFF;
  --color-text:    #231F20;
  --color-muted:   #606162;
  --color-border:  #E4E7EB;
  --color-white:   #FFFFFF;
  --font-sans: 'Roboto', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-family: var(--font-sans); background: var(--color-white); color: var(--color-text); }
```

Plus `prefers-reduced-motion` block.

**Acceptance:** Exactly 8 `--color-*` tokens. Grep for hex in modules returns empty.

---

## TASK-006 — Root layout + Roboto font

**File:** `src/app/layout.tsx`

```typescript
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Acceptance:** DevTools shows Roboto in computed font-family. No serif fallback active.

---

## TASK-007 — Button component

**Files:** `src/components/ui/Button.tsx`, `Button.module.css`

Three variants: `primary` (navy), `secondary` (navy outline), `yellow` (yellow bg, navy text).

**Critical:** `border-radius: 6px` hardcoded in CSS. Not a prop. Cannot be overridden.

**Acceptance:** All 3 variants render. DevTools shows `border-radius: 6px` on all instances. `fullWidth` fills container. `href` renders `<Link>`.

---

## TASK-008 — StickyNav

**Files:** `src/components/layout/StickyNav.tsx`, `StickyNav.module.css`

```tsx
// NO 'use client' — server component
export default function StickyNav() {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Lex<span>Flow</span>
        </Link>
        <ul className={styles.links}>
          <li><Link href="#services" className={styles.link}>Services</Link></li>
          <li><Link href="#about" className={styles.link}>About</Link></li>
          <li><Link href="#contact" className={styles.link}>Contact</Link></li>
        </ul>
        <Link href="#services" className={styles.cta}>Get Started</Link>
      </div>
    </nav>
  )
}
```

**Acceptance:** Nav always white. "Get Started" is yellow with navy text. `border-radius: 6px`. No `'use client'`.

---

## TASK-009 — RatingBadge component

**Files:** `src/components/ui/RatingBadge.tsx`, `RatingBadge.module.css`

```tsx
interface Props {
  platform: 'google' | 'trustpilot'
  rating: number
  count: string
}
```

Shows: platform name | ⭐ | rating/5 | count Reviews.

Used TWICE in Hero — once for Google, once for Trustpilot.

**Acceptance:** Both instances render in hero. `aria-label` includes platform name and rating.

---

## TASK-010 — Hero section

**Files:** `src/components/home/Hero.tsx`, `Hero.module.css`

Left col (55%):
1. Eyebrow — blue, uppercase, tracking
2. H1 — Roboto 700, navy, `clamp(2.25rem, 4vw, 3.25rem)`
3. Subheading — Roboto 400, muted
4. Ratings row: `<RatingBadge platform="google" ... />` | divider | `<RatingBadge platform="trustpilot" ... />` | ISO chip
5. Guarantee line: "7-day application submission or 100% money back"
6. CTA row: primary "Register My Business" + secondary "Talk to an Expert"

Right col (45%): floating card, white, 10px radius, shadow — shows 3 services with `<del>` prices.

**Acceptance:**
- Both rating badges present
- Both CTAs present at 6px radius
- H1 is navy, Roboto 700
- Right panel visible desktop, hidden mobile

---

## TASK-011 — ProductCard

**Files:** `src/components/home/ProductCard.tsx`, `ProductCard.module.css`

No `'use client'`. Server component.

Key elements:
- `<del className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</del>`
- `<span className={styles.discountedPrice}>₹{product.discountedPrice.toLocaleString('en-IN')}</span>`
- `<span className={styles.discountBadge}>-{product.discountPercent}% Off</span>`
- `{product.popular && <span className={styles.popularRibbon}>Most Popular</span>}` — absolute positioned
- Feature list: `<Check size={16} className={styles.checkIcon} />` in blue
- Footer: `<Button variant="primary" fullWidth>Get Started</Button>`

**Acceptance:**
- `<del>` tag present in DOM for original price (verify in Elements)
- Discount badge yellow, navy text
- Popular ribbon absolute positioned at card top-right
- Lucide Check icons in blue (not text characters)
- No `'use client'`

---

## TASK-012 — ServiceTabs

**File:** `src/components/home/ServiceTabs.tsx`, `ServiceTabs.module.css`

`'use client'` — this is the ONLY client component.

```tsx
const [active, setActive] = useState<TabId>('startup')
const filtered = serviceProducts.filter((p) => p.category === active)
```

Active tab CSS class applies `border-bottom: 3px solid var(--color-yellow)`.

ARIA pattern: `role="tablist"` on strip, `role="tab"` + `aria-selected` on each button, `role="tabpanel"` on grid.

**Acceptance:**
- All 4 tabs clickable, filter cards correctly
- Active tab shows yellow underline
- ARIA roles present
- Only this file has `'use client'`

---

## TASK-013 — TrustSignals

**Files:** `src/components/home/TrustSignals.tsx`, `TrustSignals.module.css`

Server component. Map `trustSignals` array.

Icon map pattern:
```tsx
import { Shield, Clock, Star, Users } from 'lucide-react'
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = { Shield, Clock, Star, Users }
const Icon = iconMap[signal.icon]
```

**Acceptance:** 4 blocks, surface `#F5FAFF` background, navy Lucide icons in white icon box.

---

## TASK-014 — HowItWorks

**Files:** `src/components/home/HowItWorks.tsx`, `HowItWorks.module.css`

Server component.

5-column grid with connector elements:
```tsx
{steps.map((step, i) => (
  <Fragment key={step.number}>
    <div className={styles.step}>...</div>
    {i < steps.length - 1 && (
      <div className={styles.connector} aria-hidden="true" />
    )}
  </Fragment>
))}
```

**Critical:** Connector color is `var(--color-yellow)` — yellow, NOT blue (blue would copy ClearTax).

**Acceptance:** Yellow connectors, navy circles, hidden on mobile.

---

## TASK-015 — Testimonials

**Files:** `src/components/home/Testimonials.tsx`, `Testimonials.module.css`

Server component. 3 cards. White bg, 10px radius, shadow.

Star rating: render `rating` number of star characters or Lucide `Star` icons.

**Acceptance:** 3 cards, star ratings visible, name in navy, company type in muted.

---

## TASK-016 — Footer

**Files:** `src/components/layout/Footer.tsx`, `Footer.module.css`

Server component. 4 columns. Navy `#022B50` background.

**Critical:** Link hover color is `var(--color-yellow)` — yellow on dark navy. Not white.

```typescript
// Dynamic year
© {new Date().getFullYear()} LexFlow. All rights reserved.
```

**Acceptance:** 4 columns, yellow link hover, cert badges at 50% opacity with white filter.

---

## TASK-017 — Framer Motion section entrances

Wrap major sections in motion wrappers. Each section: `opacity: 0, y: 40` → visible, `700ms easeOut`, `once: true`.

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <SectionComponent />
</motion.div>
```

For child stagger (hero only): `staggerChildren: 0.2`.

**Acceptance:** Sections animate in on scroll. `once: true` prevents re-trigger. Reduced motion = instant.

---

## TASK-018 — Static export config

**File:** `next.config.ts`

```typescript
import type { NextConfig } from 'next'
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```

**Acceptance:** `npm run build` produces `/out`. No server dependency.

---

## TASK-019 — QA pass

```bash
tsc --noEmit                                                        # must exit 0
npm run build                                                       # must exit 0
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"        # must return empty
grep -r "rgba(" src --include="*.module.css"                       # must return empty
grep -r "9999px" src                                               # must return empty
grep -r "border-radius: 4px" src/components                       # must return empty
```

Then run Lighthouse in Chrome on `npm run start`. Both scores ≥90.

**Acceptance:** All 07_Guide launch checklist items confirmed green.
