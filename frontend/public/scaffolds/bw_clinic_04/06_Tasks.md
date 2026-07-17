# 06 — Tasks
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## Task Index

| ID | Title | Day | Depends On |
|----|-------|-----|------------|
| TASK-001 | Scaffold Next.js project | 1 | — |
| TASK-002 | Install dependencies | 1 | TASK-001 |
| TASK-003 | Static export config | 1 | TASK-001 |
| TASK-004 | TypeScript types | 1 | TASK-001 |
| TASK-005 | Mock data | 1 | TASK-004 |
| TASK-006 | Filter + format utilities | 1 | TASK-004 |
| TASK-007 | Global CSS tokens | 1 | TASK-001 |
| TASK-008 | Root layout + Inter font | 1 | TASK-007 |
| TASK-009 | Button component (3 variants) | 1 | TASK-007 |
| TASK-010 | SiteNav | 1 | TASK-009 |
| TASK-011 | HeroSection | 2 | TASK-007, TASK-009 |
| TASK-012 | PackageCard | 2 | TASK-005, TASK-009 |
| TASK-013 | CategoryTabs | 2 | TASK-005, TASK-012 |
| TASK-014 | HowItWorks | 3 | TASK-005 |
| TASK-015 | WhyChooseUs | 3 | TASK-005 |
| TASK-016 | Testimonials | 3 | TASK-005 |
| TASK-017 | Footer | 4 | TASK-007 |
| TASK-018 | Framer Motion + QA | 4 | All tasks |

---

## TASK-001 — Scaffold

```bash
npx create-next-app@latest vitalcheck \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd vitalcheck
```

---

## TASK-002 — Install dependencies

```bash
npm install framer-motion lucide-react
```

---

## TASK-003 — Static export config

**File:** `next.config.ts`

```typescript
import type { NextConfig } from 'next'
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```

---

## TASK-004 — TypeScript types

**File:** `src/types/index.ts`

```typescript
export type ServiceCategory =
  | 'full-body' | 'senior' | 'women' | 'cardiac'
  | 'diabetes' | 'vitamin' | 'organ' | 'immunity'

export interface HealthPackage {
  id: string
  name: string
  category: ServiceCategory
  originalPrice: number
  discountedPrice: number
  discountPercent: number
  testsIncluded: number
  turnaroundHours: number
  popular: boolean
  homeCollection: boolean
  keyTests: string[]       // exactly 3 items
}

export interface ProcessStep {
  id: string; step: number; title: string
  description: string; iconName: string
}

export interface TrustSignal {
  id: string; iconName: string; title: string; description: string
}

export interface Testimonial {
  id: string; quote: string; patientName: string
  packageName: string; rating: number
}
```

**Acceptance:** `tsc --noEmit` exits 0.

---

## TASK-005 — Mock data

**File:** `src/lib/data.ts`

Copy all 4 arrays from `02_Architecture.md`. Verify:
- 8 packages — one per ServiceCategory; 2 marked `popular: true`; all `homeCollection: true`
- 3 processSteps
- 4 trustSignals
- 3 testimonials

---

## TASK-006 — Filter + format utilities

**File:** `src/lib/filterPackages.ts`

```typescript
import { HealthPackage, ServiceCategory } from '@/types'

export function filterPackages(
  packages: HealthPackage[],
  category: ServiceCategory | 'all'
): HealthPackage[] {
  if (category === 'all') return packages
  return packages.filter(p => p.category === category)
}
```

**File:** `src/lib/formatINR.ts`

```typescript
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
```

---

## TASK-007 — Global CSS tokens

**File:** `src/app/globals.css`

8 tokens + `.sr-only` + prefers-reduced-motion block.

**Verify:** `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty.

---

## TASK-008 — Root layout + Inter font

**File:** `src/app/layout.tsx`

```typescript
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],  // three weights — medium needed for Inter
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ background: 'var(--color-bg)', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
```

**Note:** `body` background is set to `var(--color-bg)` — dark — to prevent white flash before React hydrates.

**Acceptance:** Computed font-family = Inter. Body bg = `rgb(21,23,28)`.

---

## TASK-009 — Button component

**Files:** `src/components/ui/Button.tsx`, `Button.module.css`

```typescript
interface Props {
  variant: 'primary' | 'outlineWhite' | 'outlineLight'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
}
```

```css
.btn { border-radius: 8px; }
.primary     { background: var(--color-pink);  color: var(--color-dark-text); }
/* dark text on pink = 5.27:1 ✓ — NEVER use var(--color-white) here */
.outlineWhite{ background: transparent; color: var(--color-white);     border: 1.5px solid var(--color-white); }
.outlineLight{ background: transparent; color: var(--color-dark-text); border: 1.5px solid var(--color-dark-text); }
```

**Acceptance:** `.primary` computed `color` = `rgb(21,23,28)` (dark). NOT `rgb(255,255,255)`.

---

## TASK-010 — SiteNav

**Files:** `src/components/layout/SiteNav.tsx`, `SiteNav.module.css`

No `'use client'`. Server component.

```tsx
import Link from 'next/link'
import Button from '@/components/ui/Button'

<header className={styles.nav} role="banner">
  <div className={styles.inner}>
    <Link href="/" className={styles.logo}>VitalCheck</Link>
    <nav role="navigation" aria-label="Main navigation">
      <ul className={styles.links}>
        <li><Link href="#" className={styles.link}>Diagnostics</Link></li>
        <li><Link href="#" className={styles.link}>Health Packages</Link></li>
        <li><Link href="#" className={styles.link}>About</Link></li>
      </ul>
    </nav>
    <div className={styles.rightGroup}>
      <span className={styles.location} aria-label="Selected city: Chennai">📍 Chennai</span>
      <Button variant="primary" size="sm" href="#">Book Now</Button>
    </div>
  </div>
</header>
```

**Acceptance:**
- Dark bg
- "VitalCheck": pink text
- "Book Now": dark text on pink
- No `'use client'`

---

## TASK-011 — HeroSection

**Files:** `src/components/home/HeroSection.tsx`, `HeroSection.module.css`

No `'use client'`. Server component.

```tsx
<section className={styles.section} aria-label="Hero">
  <div className={styles.inner}>
    <p className={styles.eyebrow}>India's Modern Diagnostic Marketplace</p>
    <h1 className={styles.headline}>Your health, tested right — at home</h1>
    <p className={styles.subheading}>
      Certified diagnostic packages from NABL-accredited labs. Book before 10am for same-day collection.
    </p>
    <div className={styles.ctaRow}>
      <Button variant="primary" size="md" href="#packages">Explore Packages</Button>
      <Button variant="outlineWhite" size="md" href="#">View All Tests</Button>
    </div>
    <div className={styles.statsBar}>
      {[
        { value: '500+', label: 'Tests Available' },
        { value: '24hr', label: 'Report Delivery' },
        { value: 'Free', label: 'Home Collection' },
        { value: 'NABL', label: 'Certified Labs' },
      ].map(stat => (
        <div key={stat.label} className={styles.stat}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## TASK-012 — PackageCard

**Files:** `src/components/home/PackageCard.tsx`, `PackageCard.module.css`

No `'use client'`. Server component.

```tsx
import { CheckCircle, Clock, Home } from 'lucide-react'
import { HealthPackage } from '@/types'
import { formatINR } from '@/lib/formatINR'
import Button from '@/components/ui/Button'

export default function PackageCard({ pkg }: { pkg: HealthPackage }) {
  return (
    <article className={styles.card}>

      {/* Conditional badge — JSX, not display:none */}
      {pkg.popular && (
        <span className={styles.popularBadge} aria-label="Popular package">
          POPULAR
        </span>
      )}

      <h3 className={styles.name}>{pkg.name}</h3>

      {/* Strike-through pricing — semantic <del> tag */}
      <p className={styles.priceBlock}>
        <del className={styles.original}
             aria-label={`Original price ${formatINR(pkg.originalPrice)}`}>
          {formatINR(pkg.originalPrice)}
        </del>
        <strong className={styles.price}>{formatINR(pkg.discountedPrice)}</strong>
        <span className={styles.discountBadge}>{pkg.discountPercent}% off</span>
      </p>

      <p className={styles.testCount}>
        <strong>{pkg.testsIncluded}</strong> Tests Included
      </p>

      <ul className={styles.keyTests} aria-label="Key tests included">
        {pkg.keyTests.map(test => (
          <li key={test} className={styles.keyTest}>
            <CheckCircle size={14} aria-hidden="true" />
            {test}
          </li>
        ))}
      </ul>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={14} aria-hidden="true" />
          {pkg.turnaroundHours}hr Reports
        </span>
        {/* Conditional home collection — JSX, not display:none */}
        {pkg.homeCollection && (
          <span className={styles.metaItem}>
            <Home size={14} aria-hidden="true" />
            Home Collection
          </span>
        )}
      </div>

      <div className={styles.cta}>
        <Button variant="primary" fullWidth>Book Now</Button>
      </div>

    </article>
  )
}
```

**Acceptance:** See Epic 5 (14 specific checks).

---

## TASK-013 — CategoryTabs

**Files:** `src/components/home/CategoryTabs.tsx`, `CategoryTabs.module.css`

`'use client'`.

```tsx
'use client'
import { useState, useMemo } from 'react'
import { filterPackages } from '@/lib/filterPackages'
import PackageCard from './PackageCard'
import { HealthPackage, ServiceCategory } from '@/types'

const CATEGORIES: { label: string; value: ServiceCategory | 'all' }[] = [
  { label: 'All',            value: 'all' },
  { label: 'Full Body',      value: 'full-body' },
  { label: 'Senior Care',    value: 'senior' },
  { label: "Women's Health", value: 'women' },
  { label: 'Cardiac',        value: 'cardiac' },
  { label: 'Diabetes',       value: 'diabetes' },
  { label: 'Vitamins',       value: 'vitamin' },
  { label: 'Organ Profile',  value: 'organ' },
  { label: 'Immunity',       value: 'immunity' },
]

export default function CategoryTabs({ packages }: { packages: HealthPackage[] }) {
  const [active, setActive] = useState<ServiceCategory | 'all'>('all')

  const filtered = useMemo(
    () => filterPackages(packages, active),
    [active, packages]
  )

  return (
    <section className={styles.section} id="packages">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Browse Health Packages</h2>

        <div
          className={styles.tabsRow}
          role="tablist"
          aria-label="Filter packages by health category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={active === cat.value}
              className={`${styles.tab} ${active === cat.value ? styles.active : ''}`}
              onClick={() => setActive(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## TASK-014 — HowItWorks

**Files:** `src/components/home/HowItWorks.tsx`, `HowItWorks.module.css`

No `'use client'`. Server component. Light bg. 3-step cards with `border-radius: 12px`. Step circles `border-radius: 50%` (decorative number circle — correct use of 50%).

Lucide icon map:
```typescript
import { ClipboardList, CalendarCheck, FileText } from 'lucide-react'
const iconMap = { ClipboardList, CalendarCheck, FileText }
```

---

## TASK-015 — WhyChooseUs

**Files:** `src/components/home/WhyChooseUs.tsx`, `WhyChooseUs.module.css`

No `'use client'`. Server component. Dark bg. 2×2 grid. Surface bg cards (`var(--color-surface)`), `border-radius: 12px`, `border: 1px solid var(--color-border)`. NO backdrop-filter — solid surface only.

Lucide icon map:
```typescript
import { ShieldCheck, Award, Clock, Home } from 'lucide-react'
const iconMap = { ShieldCheck, Award, Clock, Home }
```

---

## TASK-016 — Testimonials

**Files:** `src/components/home/Testimonials.tsx`, `Testimonials.module.css`

No `'use client'`. Server component. Light bg. 3 text-only cards. White card bg, `border-radius: 12px`. No `<img>` in component. Star rating via SVG inline.

---

## TASK-017 — Footer

**Files:** `src/components/layout/Footer.tsx`, `Footer.module.css`

No `'use client'`. Server component. Dark bg (`var(--color-bg)`). 4 columns. Pink logo. Links hover to pink.

```tsx
<footer className={styles.footer}>
  <div className={styles.inner}>
    {/* 4 columns */}
  </div>
  <div className={styles.bottom}>
    <p>© {new Date().getFullYear()} VitalCheck Health Technologies Pvt. Ltd.</p>
  </div>
</footer>
```

---

## TASK-018 — Framer Motion + QA

```tsx
// Wrap each major section in page.tsx:
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

<motion.div {...fadeUp}><HowItWorks steps={processSteps} /></motion.div>
// etc.
```

**QA commands:**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"     # only PackageCard.module.css
grep -r "box-shadow" src/components --include="*.module.css"  # only PackageCard.module.css
grep -r "9999px" src
```

Run Lighthouse. Verify 07_Guide launch checklist.
