# 00 — Orchestrator
## Indian Stock Broker Service Page · bw_service_04

---

## How to use this scaffold

This is the fourth service-category build and the second fintech build in the library. It introduces flat-fee pricing, a comparison-based brokerage calculator, and the `Math.min` fee cap pattern. Read this file first, then 01–07.

---

## Cross-Build Pricing Model Comparison

Every service build uses a different pricing paradigm:

| Build | Pricing model | Display | Key utility |
|-------|--------------|---------|-------------|
| bw_service_01 | Monthly subscription | `₹1,499/mo` | `formatPlanPrice(tier, period)` |
| bw_service_02 | Project budget range | `₹2L – ₹10L` | `formatBudgetRange(agency)` |
| bw_service_03 | Per-transaction % | `2.0%` of each payment | `calculateTransactionFee(amount, rate, fixed)` |
| **bw_service_04** | **Flat fee (₹0 or ₹20)** | **`₹0` / `₹20 flat` / `₹20 or 0.03%`** | **`calculateBrokerage(flatFee, percentFee, orderValue)`** |

The key distinction from bw_service_03: bw_03 calculates the fee YOU pay from a percentage. bw_04 has a **hard cap** — intraday is the lower of ₹20 or 0.03%. Two products are completely free. The comparison calculator shows savings vs traditional brokers.

---

## The Four Core Constraints of bw_service_04

### Constraint 1: calculateBrokerage Handles Three Fee Types

```typescript
export function calculateBrokerage(
  flatFee: number,           // 0 or 20
  percentFee: number | null, // 0.0003 for intraday, null otherwise
  orderValue: number
): number {
  if (flatFee === 0) return 0                                          // delivery, mutual funds
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))  // intraday
  return flatFee                                                        // F&O, currency, commodity
}
```

**Why three branches?**
- **Free products** (delivery, mutual funds): `flatFee === 0` → always 0, skip all math
- **Intraday**: true flat cap — ₹20 OR 0.03%, whichever is lower. The cap exists because on tiny orders (e.g. ₹5,000), 0.03% = ₹1.50, which rounds to ₹2 — less than ₹20. On large orders (₹1,00,000+), 0.03% = ₹30, so the cap kicks in.
- **All other paid products**: always ₹20 flat — F&O, currency, commodity have no percentage component

```
# Fee by order value for Equity Intraday:
₹10,000  → Math.min(20, Math.ceil(3.0))    = Math.min(20, 3)  = ₹3
₹50,000  → Math.min(20, Math.ceil(15.0))   = Math.min(20, 15) = ₹15
₹66,666  → Math.min(20, Math.ceil(19.9998))= Math.min(20, 20) = ₹20
₹70,000  → Math.min(20, Math.ceil(21.0))   = Math.min(20, 21) = ₹20  ← cap
₹1,00,000 → Math.min(20, Math.ceil(30.0))  = Math.min(20, 30) = ₹20  ← cap
```

**WRONG approaches:**
```typescript
const fee = orderValue * 0.0003          // Missing Math.min cap — overcharges large orders
const fee = Math.min(20, orderValue * 0.0003)  // Missing Math.ceil — may produce decimals
```

### Constraint 2: The "You Save" Line Is a Comparison — Not a Receipt

bw_service_03 showed what YOU RECEIVE after a fee deduction:
```
Amount: ₹10,000  →  Fee: ₹200  →  You receive: ₹9,800  (green)
```

bw_service_04 shows what you SAVE vs a traditional broker:
```
ZeroTrade: ₹20  vs  Traditional (0.3%): ₹300  →  You save: ₹280  (green)
```

These are semantically different:
- bw_03 green = money returned to you from a transaction
- bw_04 green = money NOT spent compared to the alternative

Both use green for the same reason: green signals financial benefit to the user. The distinction is in what the green number represents.

`TRADITIONAL_FEE_RATE = 0.003` is a **constant**, not state. It never changes. It lives in `data.ts`.

```typescript
// CORRECT
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
const savings        = traditionalFee - brokerage

// WRONG — both in state
const [traditionalFee, setTraditionalFee] = useState(300)
const [savings, setSavings] = useState(280)
```

### Constraint 3: formatBrokerageTag Always Takes Both Arguments

```typescript
// CORRECT
formatBrokerageTag(product.flatFee, product.percentFee)

// WRONG — one arg
formatBrokerageTag(product.flatFee)   // TypeScript error: Expected 2 arguments, got 1

// WRONG — conditional in JSX
{product.flatFee === 0 ? '₹0' : product.percentFee ? '₹20 or 0.03%' : '₹20 flat'}
// Display logic belongs inside the function, not in JSX templates
```

Three display cases the function handles:
| `flatFee` | `percentFee` | Output |
|-----------|-------------|--------|
| 0 | null | `'₹0'` |
| 20 | 0.0003 | `'₹20 or 0.03%'` |
| 20 | null | `'₹20 flat'` |

### Constraint 4: Navy Is the First AAA Primary in the Library

```
Navy #1E3A5F: L ≈ 0.0413
White on navy: 1.05 / (0.0413 + 0.05) = 1.05 / 0.0913 = 11.50:1 ✓✓ AAA
```

Previous primaries:
- bw_service_01: Yellow #FFE01B — L=0.749 — white on yellow = 1.31:1 ✗✗ (catastrophic, dark text required)
- bw_service_02: Indigo #4F46E5 — L=0.1170 — white on indigo = 6.29:1 ✓ AA
- bw_service_03: Blue #1D4ED8 — L=0.1078 — white on blue = 6.65:1 ✓ AA
- **bw_service_04: Navy #1E3A5F — L=0.0413 — white on navy = 11.50:1 ✓✓ AAA**

The deep navy is appropriate for financial services: communicates trust, stability, and authority.

---

## Stop List

| Banned element | Why |
|----------------|-----|
| `Math.min(flatFee, orderValue * percentFee)` (missing Math.ceil) | Decimal brokerage — must be whole rupees |
| `orderValue * percentFee` alone | Missing flat cap — overcharges on large orders |
| `useState` for `brokerage`, `traditionalFee`, or `savings` | All derived values — never state |
| `formatBrokerageTag(product.flatFee)` (one arg) | TypeScript error + missing percentFee logic |
| `var(--color-green)` outside BrokerageCalculator savings line | Green = "you save" only |
| `background: var(--color-green)` anywhere | Not a background colour |
| `font-weight: 700` | Max 600 |
| `border-radius: 50%` | No circles |
| Hex in `.module.css` | Tokens only |
| `DM_Sans` weight `'700'` in layout.tsx | Not loaded |

---

## Proceed to: 01_PRD.md
