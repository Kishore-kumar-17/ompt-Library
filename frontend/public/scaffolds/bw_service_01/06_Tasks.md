# 06 — Tasks
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest mailflow --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

`next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`

---

## TASK-002 — TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type BillingPeriod = 'monthly' | 'yearly'

export interface PricingTier {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  contacts: string
  emailsPerMonth: string
  features: string[]
  highlighted: boolean
  cta: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string
}

export interface TrustStat {
  id: string
  icon: string
  value: string
  label: string
}
```

---

## TASK-003 — Utilities

```typescript
// src/lib/formatPlanPrice.ts
import type { PricingTier, BillingPeriod } from '@/types'

export function formatPlanPrice(tier: PricingTier, period: BillingPeriod): string {
  const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
  if (price === 0) return 'Free'
  return `₹${price.toLocaleString('en-IN')}/mo`
}

// src/lib/calculateYearlySavings.ts
import type { PricingTier } from '@/types'

export function calculateYearlySavings(tier: PricingTier): number {
  return (tier.monthlyPrice - tier.yearlyPrice) * 12
}
// calculateYearlySavings({ monthlyPrice: 1499, yearlyPrice: 1199 }) → 3600
```

---

## TASK-004 — globals.css + layout.tsx

```css
/* globals.css */
:root {
  --color-yellow:      #FFE01B;
  --color-dark:        #241C15;
  --color-white:       #FFFFFF;
  --color-surface:     #F5F5F5;
  --color-yellow-tint: #FFFBDC;
  --color-muted:       #6B7280;
  --color-border:      #E5E7EB;
  --color-green:       #15803D;
  --radius-card:       12px;
}
```

```tsx
// layout.tsx
import { Inter } from 'next/font/google'
// NOTE: Inter — not Poppins, not DM Sans, not Plus Jakarta Sans
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],  // no '700'
  variable: '--font-sans',
  display: 'swap',
})
```

---

## TASK-005 — UI Atoms

### Button.tsx
```tsx
type ButtonVariant = 'dark' | 'outlineDark' | 'ghost'
// .dark        → background: var(--color-dark); color: var(--color-white)  — 13.5:1 ✓✓
// .outlineDark → transparent; color: var(--color-dark); border: 1.5px solid var(--color-dark)
// .ghost       → transparent; color: var(--color-dark); border: 1.5px solid var(--color-border)
```

### FeatureCheckmark.tsx
```tsx
import { Check } from 'lucide-react'
import styles from './FeatureCheckmark.module.css'

export default function FeatureCheckmark({ text }: { text: string }) {
  return (
    <li className={styles.item}>
      <Check size={16} className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
    </li>
  )
}
// .icon { color: var(--color-green); }  — green on white = 5.02:1 ✓
// On highlighted yellow card: use dark icon variant (see PlanCard below)
```

---

## TASK-006 — SiteNav

```tsx
'use client'
// Logo: "MailFlow" in var(--color-dark) text — NOT yellow (yellow on white = 1.31:1 ✗✗)
// Yellow accent: small yellow square/dot before "MailFlow" text, or yellow underline
// "Get Started Free": <Button variant="dark" size="sm">Get Started Free</Button>
// Scroll shadow: useEffect on window.scroll → add/remove className
// <nav aria-label="Main navigation">
```

---

## TASK-007 — HeroSection

```tsx
// src/components/home/HeroSection.tsx — static (no 'use client')
import Button from '@/components/ui/Button'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          Email marketing that grows with your business
        </h1>
        <p className={styles.subheading}>
          Send beautiful campaigns, automate your flows, and grow your Indian audience —
          starting at ₹0/mo.
        </p>
        <div className={styles.ctaRow}>
          <Button variant="dark" size="lg">Get Started Free</Button>
          <Button variant="ghost" size="lg">See Pricing</Button>
        </div>
      </div>
      <div className={styles.illustration} aria-hidden="true" />
    </section>
  )
}
// .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; background: var(--color-white); }
// .illustration { background: var(--color-surface); border-radius: 16px; aspect-ratio: 4/3; }
```

---

## TASK-008 — BillingToggle

```tsx
// src/components/home/BillingToggle.tsx — static (controlled component, no internal state)
import type { BillingPeriod } from '@/types'
import styles from './BillingToggle.module.css'

interface Props {
  period: BillingPeriod
  onChange: (p: BillingPeriod) => void
}

export default function BillingToggle({ period, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle} role="group" aria-label="Billing period">
        <button
          className={`${styles.btn} ${period === 'monthly' ? styles.btnActive : ''}`}
          aria-pressed={period === 'monthly'}
          onClick={() => onChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`${styles.btn} ${period === 'yearly' ? styles.btnActive : ''}`}
          aria-pressed={period === 'yearly'}
          onClick={() => onChange('yearly')}
        >
          Yearly
          <span className={styles.savingsPill} aria-label="Save up to 20% with yearly billing">
            Save 20%
          </span>
          {/* savingsPill: background: var(--color-yellow); color: var(--color-dark) — 12.77:1 ✓✓ */}
        </button>
      </div>
    </div>
  )
}
```

---

## TASK-009 — PlanCard

```tsx
// src/components/home/PlanCard.tsx — static (receives period as prop)
import type { PricingTier, BillingPeriod } from '@/types'
import { formatPlanPrice } from '@/lib/formatPlanPrice'
import { calculateYearlySavings } from '@/lib/calculateYearlySavings'
import FeatureCheckmark from '@/components/ui/FeatureCheckmark'
import Button from '@/components/ui/Button'
import styles from './PlanCard.module.css'

interface Props { tier: PricingTier; period: BillingPeriod }

export default function PlanCard({ tier, period }: Props) {
  const isHighlighted = tier.highlighted
  const yearlySavings = calculateYearlySavings(tier)

  return (
    <article className={`${styles.card} ${isHighlighted ? styles.cardHighlighted : ''}`}>
      {isHighlighted && (
        <span className={styles.badge} aria-label="Most popular plan">Most Popular</span>
      )}

      <div>
        <h3 className={styles.planName}>{tier.name}</h3>
        <p className={styles.description}>{tier.description}</p>
      </div>

      <div className={styles.priceBlock}>
        <span className={styles.price}>{formatPlanPrice(tier, period)}</span>
        {/* formatPlanPrice encapsulates all price logic — never access tier.monthlyPrice directly */}
        {period === 'yearly' && tier.monthlyPrice > 0 && (
          <p className={styles.savings}>
            Save ₹{yearlySavings.toLocaleString('en-IN')}/yr
            {/* Conditional JSX — NOT display: none */}
          </p>
        )}
        <p className={styles.pricePeriod}>
          {tier.monthlyPrice > 0 ? 'per month' : 'forever free'}
        </p>
      </div>

      <p className={styles.contactsLine}>{tier.contacts} · {tier.emailsPerMonth}</p>

      <div className={styles.cta}>
        <Button
          variant={isHighlighted ? 'dark' : 'outlineDark'}
          size="md"
          fullWidth
        >
          {tier.cta}
        </Button>
      </div>

      <ul className={styles.featureList}>
        {tier.features.map(f => (
          <FeatureCheckmark key={f} text={f} />
        ))}
      </ul>
    </article>
  )
}
// .cardHighlighted { background: var(--color-yellow); color: var(--color-dark); }
// dark on yellow = 12.77:1 ✓✓ — NEVER color: var(--color-white) on yellow bg
```

---

## TASK-010 — PlanGrid

```tsx
// src/components/home/PlanGrid.tsx
'use client'
import { useState } from 'react'
import type { BillingPeriod } from '@/types'
import { PRICING_TIERS } from '@/lib/data'
import BillingToggle from './BillingToggle'
import PlanCard from './PlanCard'
import styles from './PlanGrid.module.css'

export default function PlanGrid() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className={styles.heading}>
        Simple, transparent pricing
      </h2>
      <p className={styles.subheading}>
        Start free, scale when you're ready. All plans include a 14-day free trial.
      </p>

      <BillingToggle period={period} onChange={setPeriod} />

      {/* ARIA live region — announces period change to screen readers */}
      <div aria-live="polite" className="sr-only">
        Showing {period} pricing
      </div>

      <div className={styles.grid}>
        {PRICING_TIERS.map(tier => (
          <PlanCard key={tier.id} tier={tier} period={period} />
        ))}
      </div>
    </section>
  )
}
```

---

## TASK-011 — FeatureShowcase

```tsx
// src/components/home/FeatureShowcase.tsx — static
import { Mail, Zap, BarChart2, type LucideIcon } from 'lucide-react'
import { FEATURES } from '@/lib/data'
import styles from './FeatureShowcase.module.css'

const ICON_MAP: Record<string, LucideIcon> = { Mail, Zap, BarChart2 }

export default function FeatureShowcase() {
  return (
    <>
      {FEATURES.map((feature, i) => {
        const Icon = ICON_MAP[feature.icon]
        const isAlt = i % 2 === 1  // alternate layout every other row
        return (
          <div
            key={feature.id}
            className={`${styles.rowWrapper} ${i % 2 === 1 ? styles.rowWrapperSurface : ''}`}
          >
            <div className={`${styles.row} ${isAlt ? styles.rowAlt : ''}`}>
              <div className={styles.textBlock}>
                <Icon size={32} className={styles.icon} aria-hidden="true" />
                <h2 className={styles.title}>{feature.title}</h2>
                <p className={styles.description}>{feature.description}</p>
              </div>
              <div className={styles.illustration} aria-hidden="true" />
            </div>
          </div>
        )
      })}
    </>
  )
}
```

---

## TASK-012 — TrustBar

```tsx
// src/components/home/TrustBar.tsx
'use client'
import { motion } from 'framer-motion'
import { Building2, Send, CheckCircle, Star, type LucideIcon } from 'lucide-react'
import { TRUST_STATS } from '@/lib/data'
import styles from './TrustBar.module.css'

const ICON_MAP: Record<string, LucideIcon> = { Building2, Send, CheckCircle, Star }

export default function TrustBar() {
  return (
    <section className={styles.section} aria-label="Trust statistics">
      {/* .section { background: var(--color-yellow); } — dark text on yellow = 12.77:1 ✓✓ */}
      <div className={styles.inner}>
        {TRUST_STATS.map((stat, i) => {
          const Icon = ICON_MAP[stat.icon]
          return (
            <motion.div
              key={stat.id}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Icon size={28} className={styles.icon} aria-hidden="true" />
              {/* .icon { color: var(--color-dark); } — NOT yellow, NOT white */}
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
```

---

## TASK-013 — QA Grep Suite

```bash
echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

echo "=== No hex in module CSS ===" && \
  grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No font-weight 700 ===" && \
  grep -r "font-weight: 700" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No circular radius ===" && \
  grep -r "border-radius: 50%" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No white text on yellow bg in same rule ===" && \
  grep -rA2 "color-yellow" src/components --include="*.module.css" | grep "color-white" \
  && echo "FAIL — white on yellow" || echo "PASS"

echo "=== TrustBar has no white text ===" && \
  grep -r "color-white" src/components/home/TrustBar.module.css && echo "FAIL" || echo "PASS"

echo "=== PlanCard has no white text in highlighted rule ===" && \
  grep -r "color-white" src/components/home/PlanCard.module.css && echo "FAIL" || echo "PASS"

echo "=== formatPlanPrice is used (not raw tier.monthlyPrice) ===" && \
  grep -r "tier\.monthlyPrice\b\|tier\.yearlyPrice\b" src/components --include="*.tsx" \
  && echo "FAIL — use formatPlanPrice" || echo "PASS"

echo "=== BillingToggle uses aria-pressed ===" && \
  grep -r "aria-pressed" src/components/home/BillingToggle.tsx && echo "PASS" || echo "FAIL"

echo "=== Yearly savings is conditional JSX (no display: none) ===" && \
  grep -r "display: none\|visibility:" src/components/home/PlanCard.module.css \
  && echo "FAIL" || echo "PASS"

echo "=== Inter font in layout (not Poppins/DM Sans) ===" && \
  grep -r "Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx \
  && echo "FAIL — wrong font" || echo "PASS"

echo "=== Build ===" && npm run build && echo "PASS"
```
