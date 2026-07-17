# 06 — Tasks
## Indian Payment Gateway Service Page · bw_service_03

---

## TASK-001 — Scaffold

```bash
npx create-next-app@14 payflow --typescript --app --no-tailwind --eslint --src-dir --import-alias "@/*"
cd payflow
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
  --color-blue:    #1D4ED8;
  --color-green:   #15803D;
  --color-dark:    #111827;
  --color-white:   #FFFFFF;
  --color-surface: #F9FAFB;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #030712;
  --font-sans:     'Manrope', sans-serif;
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
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PayFlow — Accept Payments Across India',
  description: 'Payment gateway with UPI, cards, net banking, and more. 2% flat fee.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## TASK-004 — src/types/index.ts

```typescript
// src/types/index.ts

export interface PaymentProduct {
  id: string
  name: string
  description: string
  icon: string           // lucide icon name
  feeRate: number        // decimal — 0.02 = 2%
  feeFixed: number       // INR fixed per-txn fee; 0 for most products
  highlighted: boolean   // true = blue card bg
}

export interface TrustBadge {
  id: string
  label: string
  icon: string
  description: string
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  category: 'digital' | 'card' | 'banking' | 'credit'
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

## TASK-005 — calculateTransactionFee.ts

```typescript
// src/lib/calculateTransactionFee.ts

/**
 * Returns the fee charged for a transaction, in whole rupees (Math.round).
 *
 * Why Math.round: payment gateways bill whole rupees.
 *   ₹10,000 × 2% = ₹200.00 → 200
 *   ₹10,547 × 2% = ₹210.94 → 211  ← rounds up
 *
 * Why feeFixed: some products (international cards, SMS) add a per-txn fixed cost.
 * Never omit the third argument — default is 0 but always pass it explicitly
 * from product data so future products with feeFixed > 0 work correctly.
 */
export function calculateTransactionFee(
  amount: number,
  feeRate: number,
  feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}

// Acceptance test cases (verify in console or Jest):
// calculateTransactionFee(10000, 0.02)      → 200
// calculateTransactionFee(10000, 0.02, 3)   → 203
// calculateTransactionFee(10547, 0.02)      → 211
// calculateTransactionFee(100,   0.02)      → 2
// calculateTransactionFee(50,    0.015)     → 1   (rounds 0.75)
// calculateTransactionFee(0,     0.02)      → 0
```

---

## TASK-006 — formatFeeRate.ts

```typescript
// src/lib/formatFeeRate.ts

/**
 * Formats a fee rate for display. Always call with both arguments.
 *
 *   formatFeeRate(0.02,  0)   → '2.0%'
 *   formatFeeRate(0.015, 0)   → '1.5%'
 *   formatFeeRate(0.02,  3)   → '2.0% + ₹3'
 *   formatFeeRate(0.025, 10)  → '2.5% + ₹10'
 *
 * The conditional (feeFixed === 0) lives here — never in JSX.
 * TypeScript error if called with one arg: Expected 2 arguments, got 1.
 */
export function formatFeeRate(feeRate: number, feeFixed: number): string {
  const pct = `${(feeRate * 100).toFixed(1)}%`
  return feeFixed === 0 ? pct : `${pct} + ₹${feeFixed}`
}
```

---

## TASK-007 — data.ts

```typescript
// src/lib/data.ts
import type { PaymentProduct, TrustBadge, PaymentMethod, TrustStat, HeroStat } from '@/types'

export const PAYMENT_PRODUCTS: PaymentProduct[] = [
  {
    id: 'pg',
    name: 'Payment Gateway',
    description: 'Accept payments on your website or mobile app with a single API integration',
    icon: 'CreditCard',
    feeRate: 0.02,
    feeFixed: 0,
    highlighted: true,
  },
  {
    id: 'pl',
    name: 'Payment Links',
    description: 'Share payment links via SMS, WhatsApp, or email — no code required',
    icon: 'Link2',
    feeRate: 0.02,
    feeFixed: 0,
    highlighted: false,
  },
  {
    id: 'sub',
    name: 'Subscriptions',
    description: 'Collect recurring payments automatically with smart retry logic',
    icon: 'RefreshCw',
    feeRate: 0.02,
    feeFixed: 0,
    highlighted: false,
  },
  {
    id: 'pp',
    name: 'Payment Pages',
    description: 'No-code hosted payment pages ready in minutes',
    icon: 'FileText',
    feeRate: 0.015,
    feeFixed: 0,
    highlighted: false,
  },
]

export const TRUST_BADGES: TrustBadge[] = [
  { id: 'tb1', label: 'PCI-DSS Level 1',  icon: 'Shield',     description: 'Highest payment security standard' },
  { id: 'tb2', label: 'ISO 27001',         icon: 'Lock',       description: 'Information security management' },
  { id: 'tb3', label: 'RBI Compliant',     icon: 'Landmark',   description: 'Regulated by Reserve Bank of India' },
  { id: 'tb4', label: 'SOC 2 Type II',     icon: 'BadgeCheck', description: 'Independent security audit certified' },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', name: 'UPI',         icon: 'Smartphone', category: 'digital'  },
  { id: 'pm2', name: 'Credit Card', icon: 'CreditCard', category: 'card'     },
  { id: 'pm3', name: 'Debit Card',  icon: 'CreditCard', category: 'card'     },
  { id: 'pm4', name: 'Net Banking', icon: 'Building2',  category: 'banking'  },
  { id: 'pm5', name: 'EMI',         icon: 'Calendar',   category: 'credit'   },
  { id: 'pm6', name: 'Wallet',      icon: 'Wallet',     category: 'digital'  },
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Building2',   value: '1 Crore+',     label: 'Businesses'   },
  { id: 'ts2', icon: 'TrendingUp',  value: '₹5 Lakh Cr+',  label: 'Processed'    },
  { id: 'ts3', icon: 'Server',      value: '99.99%',        label: 'Uptime'       },
  { id: 'ts4', icon: 'CheckCircle', value: '98.5%',         label: 'Success Rate' },
]

export const HERO_STATS: HeroStat[] = [
  { id: 'hs1', value: '1 Crore+', label: 'Businesses'      },
  { id: 'hs2', value: '99.99%',   label: 'Uptime'          },
  { id: 'hs3', value: '300+',     label: 'Payment Methods' },
]
```

---

## TASK-008 — Button.tsx

```tsx
// src/components/ui/Button.tsx
import styles from './Button.module.css'

type ButtonVariant = 'blue' | 'outlineBlue' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  as?: 'button' | 'a'
  href?: string
}

export default function Button({
  variant = 'blue',
  as: Tag = 'button',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const cls = [
    styles.btn,
    variant === 'blue'        ? styles.blue        : '',
    variant === 'outlineBlue' ? styles.outlineBlue : '',
    variant === 'ghost'       ? styles.ghost       : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  if (Tag === 'a') {
    return <a href={href} className={cls}>{children}</a>
  }
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

.blue        { background: var(--color-blue);  color: var(--color-white); }
.outlineBlue { background: transparent; border: 1.5px solid var(--color-blue); color: var(--color-blue); }
.ghost       { background: transparent; border: 1.5px solid var(--color-border); color: var(--color-dark); }
```

---

## TASK-009 — FeeCalculator.tsx

```tsx
// src/components/home/FeeCalculator.tsx
'use client'
import { useState } from 'react'
import { PAYMENT_PRODUCTS } from '@/lib/data'
import { calculateTransactionFee } from '@/lib/calculateTransactionFee'
import { formatFeeRate } from '@/lib/formatFeeRate'
import styles from './FeeCalculator.module.css'

export default function FeeCalculator() {
  const [amount, setAmount]       = useState<number>(10_000)
  const [productId, setProductId] = useState<string>('pg')

  // All derived — never in useState
  const product  = PAYMENT_PRODUCTS.find(p => p.id === productId)!
  const fee      = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
  const received = amount - fee

  return (
    <div className={styles.calculator}>
      <p className={styles.heading}>Calculate your fee</p>

      {/* Product selector */}
      <select
        className={styles.productSelect}
        value={productId}
        onChange={e => setProductId(e.target.value)}
        aria-label="Payment product"
      >
        {PAYMENT_PRODUCTS.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} — {formatFeeRate(p.feeRate, p.feeFixed)}
          </option>
        ))}
      </select>

      {/* Amount input */}
      <label className={styles.amountLabel} htmlFor="txn-amount">
        Transaction amount (₹)
      </label>
      <input
        id="txn-amount"
        type="number"
        className={styles.amountInput}
        value={amount}
        min={1}
        step={100}
        onChange={e => setAmount(Math.max(0, Number(e.target.value)))}
      />

      {/* Tri-line breakdown */}
      <div className={styles.breakdown} aria-live="polite" aria-atomic="true">
        {/* Line 1 — Amount */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>Amount charged</span>
          <span className={styles.lineAmount}>
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        <hr className={styles.divider} />

        {/* Line 2 — Fee */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>
            Fee ({formatFeeRate(product.feeRate, product.feeFixed)})
          </span>
          <span className={styles.lineFee}>
            −₹{fee.toLocaleString('en-IN')}
          </span>
        </div>

        <hr className={styles.divider} />

        {/* Line 3 — You receive (green — 5.02:1 on white ✓) */}
        <div className={styles.line}>
          <span className={styles.lineLabel}>You receive</span>
          <span className={styles.lineReceived}>
            ₹{received.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

## TASK-009b — FeeCalculator.module.css

*(See 03_Design.md for full CSS — copy verbatim. Key rule: `.lineReceived { color: var(--color-green) }` — the ONLY use of green in the project.)*

---

## TASK-010a — PaymentProducts.tsx

```tsx
// src/components/home/PaymentProducts.tsx
import * as LucideIcons from 'lucide-react'
import { PAYMENT_PRODUCTS } from '@/lib/data'
import { formatFeeRate } from '@/lib/formatFeeRate'
import type { PaymentProduct } from '@/types'
import styles from './PaymentProducts.module.css'

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={28} /> : null
}

function ProductCard({ product }: { product: PaymentProduct }) {
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
        {formatFeeRate(product.feeRate, product.feeFixed)}
      </span>
    </div>
  )
}

export default function PaymentProducts() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>All the tools to accept payments</h2>
      <div className={styles.grid}>
        {PAYMENT_PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
```

---

## TASK-010b — TrustSection.tsx

```tsx
// src/components/home/TrustSection.tsx
import * as LucideIcons from 'lucide-react'
import { TRUST_BADGES } from '@/lib/data'
import type { TrustBadge } from '@/types'
import styles from './TrustSection.module.css'

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={32} /> : null
}

function TrustTile({ badge }: { badge: TrustBadge }) {
  return (
    <div className={styles.tile}>
      <div className={styles.icon}>{getIcon(badge.icon)}</div>
      <p className={styles.label}>{badge.label}</p>
      <p className={styles.description}>{badge.description}</p>
    </div>
  )
}

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Trusted by 1 Crore+ businesses</h2>
      <div className={styles.grid}>
        {TRUST_BADGES.map(b => (
          <TrustTile key={b.id} badge={b} />
        ))}
      </div>
    </section>
  )
}
```

---

## TASK-010c — PaymentMethods.tsx

```tsx
// src/components/home/PaymentMethods.tsx
import * as LucideIcons from 'lucide-react'
import { PAYMENT_METHODS } from '@/lib/data'
import type { PaymentMethod } from '@/types'
import styles from './PaymentMethods.module.css'

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={18} /> : null
}

function MethodPill({ method }: { method: PaymentMethod }) {
  return (
    <div className={styles.pill}>
      <span className={styles.pillIcon}>{getIcon(method.icon)}</span>
      {method.name}
    </div>
  )
}

export default function PaymentMethods() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>300+ payment methods. All in one integration.</h3>
      <div className={styles.row}>
        {PAYMENT_METHODS.map(m => (
          <MethodPill key={m.id} method={m} />
        ))}
      </div>
    </section>
  )
}
```

---

## TASK-011 — TrustBar.tsx

```tsx
// src/components/home/TrustBar.tsx
'use client'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { TRUST_STATS } from '@/lib/data'
import type { TrustStat } from '@/types'
import styles from './TrustBar.module.css'

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={28} /> : null
}

function StatItem({ stat, index }: { stat: TrustStat; index: number }) {
  return (
    <motion.div
      className={styles.stat}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className={styles.icon}>{getIcon(stat.icon)}</div>
      <p className={styles.value}>{stat.value}</p>
      <p className={styles.label}>{stat.label}</p>
    </motion.div>
  )
}

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {TRUST_STATS.map((s, i) => (
          <StatItem key={s.id} stat={s} index={i} />
        ))}
      </div>
    </section>
  )
}
```

```css
/* src/components/home/TrustBar.module.css */
.section {
  background: var(--color-footer);
  padding: 64px 24px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 400px) { .grid { grid-template-columns: 1fr; } }

.stat  { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.icon  { color: var(--color-white); }          /* white on footer ≈20:1 ✓✓ */
.value { font-size: 1.5rem; font-weight: 600; color: var(--color-white); margin: 0; }
.label { font-size: 0.875rem; color: var(--color-muted); margin: 0; }
```

---

## TASK-012 — page.tsx

```tsx
// src/app/page.tsx
// Server Component — no 'use client'
import SiteNav          from '@/components/layout/SiteNav'
import HeroSection      from '@/components/home/HeroSection'
import PaymentProducts  from '@/components/home/PaymentProducts'
import TrustSection     from '@/components/home/TrustSection'
import PaymentMethods   from '@/components/home/PaymentMethods'
import TrustBar         from '@/components/home/TrustBar'
import Footer           from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <PaymentProducts />
        <TrustSection />
        <PaymentMethods />
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
```

**Note:** `FeeCalculator` is imported inside `HeroSection.tsx` (not directly in `page.tsx`). The `'use client'` boundary is `FeeCalculator.tsx` itself — all other sections are Server Components.

---

## TASK-013 — QA Grep Suite

Run all greps from project root. Every command must return zero matches (exit 0 with no output).

```bash
# 1. No hex in module CSS
grep -r "#[0-9a-fA-F]\{3,6\}" src --include="*.module.css"

# 2. No font-weight: 700
grep -r "font-weight.*700" src

# 3. No border-radius: 50%
grep -r "border-radius.*50%" src

# 4. fee not in useState (derived only)
grep -r "useState.*fee\|useState.*Fee" src/components

# 5. received not in useState
grep -r "useState.*received\|useState.*Received" src/components

# 6. formatFeeRate called with one arg only (missing feeFixed)
grep -r "formatFeeRate([^,)]*)" src --include="*.tsx" --include="*.ts"

# 7. Green used outside FeeCalculator module CSS
grep -r "color-green" src --include="*.module.css" | grep -v "FeeCalculator"

# 8. Green on backgrounds anywhere
grep -r "background.*color-green\|background-color.*color-green" src

# 9. received computed wrong way
grep -r "1 - .*feeRate\|1-.*feeRate" src

# 10. page.tsx has no 'use client'
grep "use client" src/app/page.tsx

# 11. Manrope weight 700 not loaded
grep "700" src/app/layout.tsx

# 12. TypeScript clean
npx tsc --noEmit

# 13. Build succeeds
npm run build
```

**Expected:** Commands 1–11 return empty output. Commands 12–13 exit 0.
