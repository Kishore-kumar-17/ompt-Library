# 02 — Architecture
## Indian Stock Broker Service Page · bw_service_04

---

## TypeScript Types

```typescript
// src/types/index.ts

export interface TradingProduct {
  id: string
  name: string
  description: string
  icon: string             // lucide icon name
  flatFee: number          // 0 = free, 20 = max flat fee
  percentFee: number | null // 0.0003 for intraday only; null for all other products
  highlighted: boolean     // true = navy card bg
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

## Mock Data

```typescript
// src/lib/data.ts
import type { TradingProduct, TrustBadge, TrustStat, HeroStat } from '@/types'

// Traditional full-service broker benchmark rate
// Used in BrokerageCalculator to compute traditionalFee and savings
// This is a CONSTANT — never in state
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
    description: 'Buy and sell within the same trading day — ₹20 or 0.03%, whichever is lower',
    icon: 'Activity',
    flatFee: 20,
    percentFee: 0.0003,
    highlighted: false,
  },
  {
    id: 'fno',
    name: 'Futures & Options',
    description: 'Trade index and stock derivatives with a flat ₹20 per executed order',
    icon: 'BarChart2',
    flatFee: 20,
    percentFee: null,
    highlighted: false,
  },
  {
    id: 'mutualfund',
    name: 'Mutual Funds (Direct)',
    description: 'Invest in zero-commission direct mutual funds — no trail fee, no hidden charges',
    icon: 'PieChart',
    flatFee: 0,
    percentFee: null,
    highlighted: false,
  },
  {
    id: 'currency',
    name: 'Currency',
    description: 'Trade USD/INR and other currency pairs on NSE and BSE currency segments',
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
  { id: 'tb1', label: 'SEBI Registered',        icon: 'Shield',    description: 'Regulated by Securities & Exchange Board of India' },
  { id: 'tb2', label: 'NSE Member',             icon: 'Building2', description: 'Member of National Stock Exchange since 2010' },
  { id: 'tb3', label: 'BSE Member',             icon: 'Landmark',  description: 'Member of Bombay Stock Exchange' },
  { id: 'tb4', label: 'CDSL DP',                icon: 'Lock',      description: 'Depository Participant — securities held safely' },
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Users',        value: '1.5 Crore+', label: 'Active Clients'        },
  { id: 'ts2', icon: 'TrendingDown', value: '₹0',         label: 'Delivery Brokerage'    },
  { id: 'ts3', icon: 'Server',       value: '99.9%',      label: 'Platform Uptime'       },
  { id: 'ts4', icon: 'Award',        value: 'Since 2010', label: 'Track Record'          },
]

export const HERO_STATS: HeroStat[] = [
  { id: 'hs1', value: '1.5 Crore+', label: 'Active Clients'    },
  { id: 'hs2', value: '₹0',         label: 'Delivery Fee'      },
  { id: 'hs3', value: 'Since 2010', label: 'Track Record'      },
]
```

---

## Utility Functions

```typescript
// src/lib/calculateBrokerage.ts

/**
 * Returns brokerage charged for a trade, in whole rupees.
 *
 * Three cases:
 * 1. flatFee === 0         → always free (equity delivery, direct mutual funds)
 * 2. percentFee !== null   → lower of flatFee or Math.ceil(orderValue × percentFee)
 *                            (equity intraday: ₹20 or 0.03%, whichever is lower)
 * 3. percentFee === null   → flat fee always (F&O, currency, commodity)
 *
 * Why Math.ceil for the percent branch?
 * Brokers charge whole rupees, rounding up fractions in their favour.
 * Math.round would sometimes produce ₹0 for very small orders.
 * Math.ceil ensures at least ₹1 is charged when any percentage applies.
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
// calculateBrokerage(0, null, 100000)    → 0      (delivery — free)
// calculateBrokerage(0, null, 0)         → 0      (delivery — free regardless of value)
// calculateBrokerage(20, null, 50000)    → 20     (F&O — always flat)
// calculateBrokerage(20, null, 1000)     → 20     (F&O — flat even on small orders)
// calculateBrokerage(20, 0.0003, 10000)  → 3      (intraday: 0.03% = ₹3 < ₹20)
// calculateBrokerage(20, 0.0003, 50000)  → 15     (intraday: 0.03% = ₹15 < ₹20)
// calculateBrokerage(20, 0.0003, 66666)  → 20     (intraday: 0.03% = ₹19.9998 → ceil ₹20)
// calculateBrokerage(20, 0.0003, 70000)  → 20     (intraday: 0.03% = ₹21 → cap ₹20)
// calculateBrokerage(20, 0.0003, 100000) → 20     (intraday: 0.03% = ₹30 → cap ₹20)
```

```typescript
// src/lib/formatBrokerageTag.ts

/**
 * Returns the display tag for a product card and calculator dropdown.
 *
 * Three display cases matching the three fee structures:
 *   flatFee=0, percentFee=null  → '₹0'
 *   flatFee=20, percentFee=null → '₹20 flat'
 *   flatFee=20, percentFee≠null → '₹20 or 0.03%'
 *
 * ALWAYS call with both arguments. TypeScript error if called with one arg.
 * Conditional display logic lives here — never in JSX.
 */
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}

// Test cases:
// formatBrokerageTag(0, null)      → '₹0'
// formatBrokerageTag(20, null)     → '₹20 flat'
// formatBrokerageTag(20, 0.0003)   → '₹20 or 0.03%'
```

---

## BrokerageCalculator Derived Values

| orderValue | productId | flatFee | percentFee | brokerage | traditionalFee (0.3%) | savings |
|------------|-----------|---------|------------|-----------|----------------------|---------|
| 1,00,000 | delivery | 0 | null | 0 | 300 | 300 |
| 1,00,000 | intraday | 20 | 0.0003 | 20 | 300 | 280 |
| 1,00,000 | fno | 20 | null | 20 | 300 | 280 |
| 10,000 | intraday | 20 | 0.0003 | 3 | 30 | 27 |
| 50,000 | intraday | 20 | 0.0003 | 15 | 150 | 135 |
| 1,00,000 | mutualfund | 0 | null | 0 | 300 | 300 |

---

## BrokerageCalculator State Model

```typescript
// Only these two values are in state
const [orderValue, setOrderValue] = useState<number>(100_000)
const [productId, setProductId]   = useState<string>('delivery')

// All other values are derived — never in state
const product        = TRADING_PRODUCTS.find(p => p.id === productId)!
const brokerage      = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
const savings        = traditionalFee - brokerage
// All four update automatically when orderValue or productId changes
```

---

## Component Map

```
src/
  app/
    layout.tsx                  ← DM_Sans, --font-sans
    page.tsx                    ← Server Component
    globals.css                 ← 8 tokens + .sr-only + prefers-reduced-motion
  components/
    layout/
      SiteNav.tsx               ← 'use client', scroll shadow, navy logo
      Footer.tsx                ← footer bg
    home/
      HeroSection.tsx           ← static, headline + stats pills + CTA pair
      TradingProducts.tsx       ← static, 3×2 grid, highlighted delivery card
      BrokerageCalculator.tsx   ← 'use client', segment select + value + 3-line comparison
      TrustSection.tsx          ← static, 4 TrustBadge tiles
      TrustBar.tsx              ← 'use client' (Framer Motion), dark bg
    ui/
      Button.tsx                ← navy / outlineNavy / ghost
  lib/
    calculateBrokerage.ts
    formatBrokerageTag.ts
    data.ts
  types/
    index.ts
```
