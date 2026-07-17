# 02 — Architecture
## Indian Payment Gateway Service Page · bw_service_03

---

## TypeScript Types

```typescript
// src/types/index.ts

export interface PaymentProduct {
  id: string
  name: string
  description: string
  icon: string           // lucide icon name
  feeRate: number        // decimal — 0.02 = 2%; used in calculateTransactionFee
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

## Mock Data

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
  { id: 'tb1', label: 'PCI-DSS Level 1',   icon: 'Shield',   description: 'Highest payment security standard' },
  { id: 'tb2', label: 'ISO 27001',          icon: 'Lock',     description: 'Information security management' },
  { id: 'tb3', label: 'RBI Compliant',      icon: 'Landmark', description: 'Regulated by Reserve Bank of India' },
  { id: 'tb4', label: 'SOC 2 Type II',      icon: 'BadgeCheck', description: 'Independent security audit certified' },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', name: 'UPI',         icon: 'Smartphone',   category: 'digital'  },
  { id: 'pm2', name: 'Credit Card', icon: 'CreditCard',   category: 'card'     },
  { id: 'pm3', name: 'Debit Card',  icon: 'CreditCard',   category: 'card'     },
  { id: 'pm4', name: 'Net Banking', icon: 'Building2',    category: 'banking'  },
  { id: 'pm5', name: 'EMI',         icon: 'Calendar',     category: 'credit'   },
  { id: 'pm6', name: 'Wallet',      icon: 'Wallet',       category: 'digital'  },
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Building2',   value: '1 Crore+',        label: 'Businesses' },
  { id: 'ts2', icon: 'TrendingUp',  value: '₹5 Lakh Cr+',    label: 'Processed' },
  { id: 'ts3', icon: 'Server',      value: '99.99%',           label: 'Uptime' },
  { id: 'ts4', icon: 'CheckCircle', value: '98.5%',            label: 'Success Rate' },
]

export const HERO_STATS: HeroStat[] = [
  { id: 'hs1', value: '1 Crore+',          label: 'Businesses' },
  { id: 'hs2', value: '99.99%',             label: 'Uptime' },
  { id: 'hs3', value: '300+',               label: 'Payment Methods' },
]
```

---

## Utility Functions

```typescript
// src/lib/calculateTransactionFee.ts
export function calculateTransactionFee(
  amount: number,
  feeRate: number,
  feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}

// Test cases (acceptance criteria):
// calculateTransactionFee(10000, 0.02)      → 200
// calculateTransactionFee(10000, 0.02, 3)   → 203
// calculateTransactionFee(10547, 0.02)      → 211   (rounds 210.94)
// calculateTransactionFee(100, 0.02)        → 2
// calculateTransactionFee(50, 0.015)        → 1     (rounds 0.75 → 1)
// calculateTransactionFee(0, 0.02)          → 0


// src/lib/formatFeeRate.ts
export function formatFeeRate(feeRate: number, feeFixed: number): string {
  const pct = `${(feeRate * 100).toFixed(1)}%`
  return feeFixed === 0 ? pct : `${pct} + ₹${feeFixed}`
}

// Test cases:
// formatFeeRate(0.02, 0)    → '2.0%'
// formatFeeRate(0.015, 0)   → '1.5%'
// formatFeeRate(0.02, 3)    → '2.0% + ₹3'
// formatFeeRate(0.025, 10)  → '2.5% + ₹10'
```

---

## FeeCalculator Derived Values (acceptance criteria)

| amount | productId | feeRate | feeFixed | fee | received |
|--------|-----------|---------|----------|-----|---------|
| 10,000 | pg | 0.02 | 0 | 200 | 9,800 |
| 10,000 | pp | 0.015 | 0 | 150 | 9,850 |
| 50,000 | pg | 0.02 | 0 | 1,000 | 49,000 |
| 100 | pg | 0.02 | 0 | 2 | 98 |
| 1 | pg | 0.02 | 0 | 0 | 1 |

---

## FeeCalculator State Model

```typescript
// Only these two values are in state
const [amount, setAmount]       = useState<number>(10_000)
const [productId, setProductId] = useState<string>('pg')

// All other values are derived — never in state
const product  = PAYMENT_PRODUCTS.find(p => p.id === productId)!
const fee      = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee
// fee and received update automatically when amount or productId changes
```

---

## Component Map

```
src/
  app/
    layout.tsx                  ← Manrope, --font-sans
    page.tsx                    ← Server Component
    globals.css                 ← 8 tokens + .sr-only + prefers-reduced-motion
  components/
    layout/
      SiteNav.tsx               ← 'use client', scroll shadow, blue logo
      Footer.tsx                ← footer bg
    home/
      HeroSection.tsx           ← static, headline + stats pills + CTA pair
      PaymentProducts.tsx       ← static, 2×2 grid, highlighted card
      FeeCalculator.tsx         ← 'use client', product select + amount + tri-line
      TrustSection.tsx          ← static, 4 TrustBadge tiles
      PaymentMethods.tsx        ← static, 6 method pills
      TrustBar.tsx              ← 'use client' (Framer Motion), dark bg
    ui/
      Button.tsx                ← blue / outlineBlue / ghost
  lib/
    calculateTransactionFee.ts
    formatFeeRate.ts
    data.ts
  types/
    index.ts
```
