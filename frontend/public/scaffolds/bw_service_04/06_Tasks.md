# 06 — Tasks
## Indian Stock Broker Service Page · bw_service_04

---

## TASK-001 — Scaffold

```bash
npx create-next-app@14 zerotrade --typescript --app --no-tailwind --eslint --src-dir --import-alias "@/*"
cd zerotrade
npm install lucide-react framer-motion
```

**`next.config.ts`**
```typescript
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default nextConfig
```

---

## TASK-002 — globals.css

```css
/* src/app/globals.css */
:root {
  --color-navy:    #1E3A5F;
  --color-green:   #15803D;
  --color-dark:    #111827;
  --color-white:   #FFFFFF;
  --color-surface: #F9FAFB;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #030712;
  --font-sans:     'DM Sans', sans-serif;
  --radius-card:   12px;
}

*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-dark);
  margin: 0;
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## TASK-003 — layout.tsx

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZeroTrade — Zero Brokerage on Delivery',
  description: 'Flat-fee stockbroker. ₹0 for equity delivery and mutual funds. ₹20 flat for everything else.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## TASK-004 — src/types/index.ts

```typescript
// src/types/index.ts

export interface TradingProduct {
  id: string
  name: string
  description: string
  icon: string             // lucide icon name
  flatFee: number          // 0 = free, 20 = max
  percentFee: number | null // 0.0003 for intraday; null otherwise
  highlighted: boolean
}

export interface TrustBadge {
  id: string
  label: string
  icon: string
  description: string
}

export interface TrustStat {
  id: string
  icon: string
  value: string
  label: string
}

export interface HeroStat {
  id: string
  value: string
  label: string
}
```

---

## TASK-005 — calculateBrokerage.ts

```typescript
// src/lib/calculateBrokerage.ts

/**
 * Returns brokerage charged for a trade, in whole rupees.
 *
 * Three fee structures:
 * 1. flatFee === 0 → free (equity delivery, direct mutual funds)
 * 2. percentFee !== null → min(flatFee, ceil(orderValue × percentFee))
 *    Real rule: ₹20 or 0.03%, whichever is lower (equity intraday)
 * 3. percentFee === null → flatFee always (F&O, currency, commodity)
 *
 * Why Math.ceil for the percent branch:
 * Brokers charge whole rupees, rounding up in their favour.
 * ceil(₹3.0) = 3 (clean)  ceil(₹19.9998) = 20 (cap kicks in correctly)
 *
 * Why Math.min:
 * The cap exists because 0.03% of large orders exceeds ₹20.
 * ₹70,000 × 0.03% = ₹21 → Math.min(20, 21) = ₹20 flat.
 */
export function calculateBrokerage(
  flatFee: number,
  percentFee: number | null,
  orderValue: number
): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}

// Acceptance test cases:
// calculateBrokerage(0, null, 100000)    → 0
// calculateBrokerage(0, null, 0)         → 0
// calculateBrokerage(20, null, 50000)    → 20
// calculateBrokerage(20, null, 1000)     → 20
// calculateBrokerage(20, 0.0003, 10000)  → 3
// calculateBrokerage(20, 0.0003, 50000)  → 15
// calculateBrokerage(20, 0.0003, 66666)  → 20  (ceil(19.9998) = 20)
// calculateBrokerage(20, 0.0003, 70000)  → 20  (cap)
// calculateBrokerage(20, 0.0003, 100000) → 20  (cap)
```

---

## TASK-006 — formatBrokerageTag.ts

```typescript
// src/lib/formatBrokerageTag.ts

/**
 * Returns the display tag for a product card and dropdown option.
 * Always call with both arguments — TypeScript error if one arg is passed.
 *
 * Three display cases:
 *   (0, null)       → '₹0'
 *   (20, null)      → '₹20 flat'
 *   (20, 0.0003)    → '₹20 or 0.03%'
 *
 * Conditional display logic lives here, not in JSX.
 */
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
```

---

## TASK-007 — data.ts

```typescript
// src/lib/data.ts
import type { TradingProduct, TrustBadge, TrustStat, HeroStat } from '@/types'

export const TRADITIONAL_FEE_RATE = 0.003  // 0.3% — typical full-service broker

export const TRADING_PRODUCTS: TradingProduct[] = [
  {
    id: 'delivery',
    name: 'Equity Delivery',
    description: 'Buy and hold stocks for the long term — zero brokerage, always',
    icon: 'TrendingUp',
    flatFee: 0,
    percentFee: null,
    highlighted: true,
  },
  {
    id: 'intraday',
    name: 'Equity Intraday',
    description: 'Buy and sell within the same trading day — ₹20 or 0.03%, lower wins',
    icon: 'Activity',
    flatFee: 20,
    percentFee: 0.0003,
    highlighted: false,
  },
  {
    id: 'fno',
    name: 'Futures & Options',
    description: 'Trade index and stock derivatives — ₹20 flat per executed order',
    icon: 'BarChart2',
    flatFee: 20,
    percentFee: null,
    highlighted: false,
  },
  {
    id: 'mutualfund',
    name: 'Mutual Funds (Direct)',
    description: 'Zero-commission direct funds — no trail fee, no hidden charges',
    icon: 'PieChart',
    flatFee: 0,
    percentFee: null,
    highlighted: false,
  },
  {
    id: 'currency',
    name: 'Currency',
    description: 'Trade USD/INR and other currency pairs on NSE and BSE',
    icon: 'DollarSign',
    flatFee: 20,
    percentFee: null,
    highlighted: false,
  },
  {
    id: 'commodity',
    name: 'Commodity (MCX)',
    description: 'Trade gold, silver, crude oil and other commodities on MCX',
    icon: 'Package',
    flatFee: 20,
    percentFee: null,
    highlighted: false,
  },
]

export const TRUST_BADGES: TrustBadge[] = [
  { id: 'tb1', label: 'SEBI Registered', icon: 'Shield',    description: 'Regulated by Securities & Exchange Board of India' },
  { id: 'tb2', label: 'NSE Member',      icon: 'Building2', description: 'Member of National Stock Exchange since 2010' },
  { id: 'tb3', label: 'BSE Member',      icon: 'Landmark',  description: 'Member of Bombay Stock Exchange' },
  { id: 'tb4', label: 'CDSL DP',         icon: 'Lock',      description: 'Depository Participant — your securities held safely' },
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Users',        value: '1.5 Crore+', label: 'Active Clients'     },
  { id: 'ts2', icon: 'TrendingDown', value: '₹0',         label: 'Delivery Brokerage' },
  { id: 'ts3', icon: 'Server',       value: '99.9%',      label: 'Platform Uptime'    },
  { id: 'ts4', icon: 'Award',        value: 'Since 2010', label: 'Track Record'       },
]

export const HERO_STATS: HeroStat[] = [
  { id: 'hs1', value: '1.5 Crore+', label: 'Active Clients'  },
  { id: 'hs2', value: '₹0',         label: 'Delivery Fee'    },
  { id: 'hs3', value: 'Since 2010', label: 'Track Record'    },
]
```

---

## TASK-008 — Button.tsx

```tsx
// src/components/ui/Button.tsx
import styles from './Button.module.css'

type ButtonVariant = 'navy' | 'outlineNavy' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  as?: 'button' | 'a'
  href?: string
}

export default function Button({
  variant = 'navy',
  as: Tag = 'button',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const cls = [
    styles.btn,
    variant === 'navy'        ? styles.navy        : '',
    variant === 'outlineNavy' ? styles.outlineNavy : '',
    variant === 'ghost'       ? styles.ghost       : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  if (Tag === 'a') return <a href={href} className={cls}>{children}</a>
  return <button className={cls} {...props}>{children}</button>
}
```

```css
/* src/components/ui/Button.module.css */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 11px 24px; border-radius: 8px;
  font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 600;
  cursor: pointer; border: none; text-decoration: none;
  transition: opacity 0.15s ease;
}
.btn:hover { opacity: 0.88; }

.navy        { background: var(--color-navy);  color: var(--color-white); }
.outlineNavy { background: transparent; border: 1.5px solid var(--color-navy); color: var(--color-navy); }
.ghost       { background: transparent; border: 1.5px solid var(--color-border); color: var(--color-dark); }
```

---

## TASK-009 — BrokerageCalculator.tsx

```tsx
// src/components/home/BrokerageCalculator.tsx
'use client'
import { useState } from 'react'
import { TRADING_PRODUCTS, TRADITIONAL_FEE_RATE } from '@/lib/data'
import { calculateBrokerage } from '@/lib/calculateBrokerage'
import { formatBrokerageTag } from '@/lib/formatBrokerageTag'
import styles from './BrokerageCalculator.module.css'

export default function BrokerageCalculator() {
  const [orderValue, setOrderValue] = useState<number>(100_000)
  const [productId, setProductId]   = useState<string>('delivery')

  // All derived — never in useState
  const product        = TRADING_PRODUCTS.find(p => p.id === productId)!
  const brokerage      = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
  const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
  const savings        = traditionalFee - brokerage

  return (
    <div className={styles.calculator}>
      <p className={styles.heading}>Calculate your savings</p>

      {/* Segment selector */}
      <select
        className={styles.segmentSelect}
        value={productId}
        onChange={e => setProductId(e.target.value)}
        aria-label="Trading segment"
      >
        {TRADING_PRODUCTS.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} — {formatBrokerageTag(p.flatFee, p.percentFee)}
          </option>
        ))}
      </select>

      {/* Order value input */}
      <label className={styles.valueLabel} htmlFor="order-value">
        Order value (₹)
      </label>
      <input
        id="order-value"
        type="number"
        className={styles.valueInput}
        value={orderValue}
        min={100}
        step={1000}
        onChange={e => setOrderValue(Math.max(0, Number(e.target.value)))}
      />

      {/* Three-line comparison breakdown */}
      <div className={styles.breakdown} aria-live="polite" aria-atomic="true">
        {/* Line 1 — ZeroTrade brokerage */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>ZeroTrade brokerage</span>
          <span className={styles.lineBrokerage}>
            ₹{brokerage.toLocaleString('en-IN')}
          </span>
        </div>

        <hr className={styles.divider} />

        {/* Line 2 — Traditional broker */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>Traditional broker (0.3%)</span>
          <span className={styles.lineTraditional}>
            ₹{traditionalFee.toLocaleString('en-IN')}
          </span>
        </div>

        <hr className={styles.divider} />

        {/* Line 3 — You save (green — 5.02:1 on white ✓) */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>You save</span>
          <span className={styles.lineSavings}>
            ₹{savings.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  )
}
```

*(Copy BrokerageCalculator.module.css from 03_Design.md verbatim.)*

---

## TASK-010 — TradingProducts.tsx

```tsx
// src/components/home/TradingProducts.tsx
import * as LucideIcons from 'lucide-react'
import { TRADING_PRODUCTS } from '@/lib/data'
import { formatBrokerageTag } from '@/lib/formatBrokerageTag'
import type { TradingProduct } from '@/types'
import styles from './TradingProducts.module.css'

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={28} /> : null
}

function ProductCard({ product }: { product: TradingProduct }) {
  const hl = product.highlighted
  return (
    <div className={`${styles.card} ${hl ? styles.cardHighlighted : ''}`}>
      <div className={hl ? styles.iconWhite : styles.icon}>
        {getIcon(product.icon)}
      </div>
      <p className={styles.name}>{product.name}</p>
      <p className={hl ? styles.descMuted : styles.description}>
        {product.description}
      </p>
      <span className={hl ? styles.feeTagWhite : styles.feeTag}>
        {formatBrokerageTag(product.flatFee, product.percentFee)}
      </span>
    </div>
  )
}

export default function TradingProducts() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Every market. One flat fee.</h2>
      <div className={styles.grid}>
        {TRADING_PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
```

---

## TASK-011 — page.tsx

```tsx
// src/app/page.tsx
// Server Component — no 'use client'
import SiteNav         from '@/components/layout/SiteNav'
import HeroSection     from '@/components/home/HeroSection'
import TradingProducts from '@/components/home/TradingProducts'
import TrustSection    from '@/components/home/TrustSection'
import TrustBar        from '@/components/home/TrustBar'
import Footer          from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <TradingProducts />
        <TrustSection />
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
```

`BrokerageCalculator` is imported inside `HeroSection.tsx`. The `'use client'` boundary is the component itself — `page.tsx` remains a Server Component.

---

## TASK-012 — QA Grep Suite

Run all commands from project root. Every grep must return empty output.

```bash
# 1. No hex in module CSS
grep -r "#[0-9a-fA-F]\{3,6\}" src --include="*.module.css"

# 2. No font-weight: 700
grep -r "font-weight.*700" src

# 3. No border-radius: 50%
grep -r "border-radius.*50%" src

# 4. brokerage not in useState
grep -r "useState.*brokerage\|useState.*Brokerage" src/components

# 5. savings not in useState
grep -r "useState.*savings\|useState.*Savings" src/components

# 6. traditionalFee not in useState
grep -r "useState.*traditional\|useState.*Traditional" src/components

# 7. formatBrokerageTag called with one arg
grep -r "formatBrokerageTag([^,)]*)" src --include="*.tsx" --include="*.ts"

# 8. Green used outside BrokerageCalculator module CSS
grep -r "color-green" src --include="*.module.css" | grep -v "BrokerageCalculator"

# 9. Green on backgrounds anywhere
grep -r "background.*color-green\|background-color.*color-green" src

# 10. Intraday fee computed without Math.min
grep -r "percentFee \* \|percentFee\*" src --include="*.tsx" --include="*.ts" | grep -v "Math.min"

# 11. page.tsx has no 'use client'
grep "use client" src/app/page.tsx

# 12. DM_Sans weight 700 not loaded
grep "700" src/app/layout.tsx

# 13. TypeScript clean
npx tsc --noEmit

# 14. Build succeeds
npm run build
```

**Expected:** Commands 1–12 return empty output. Commands 13–14 exit 0.
