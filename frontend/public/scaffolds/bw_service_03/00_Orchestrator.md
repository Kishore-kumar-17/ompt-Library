# 00 — Orchestrator
## Indian Payment Gateway Service Page · bw_service_03

---

## How to use this scaffold

This is the third service-category build and the first fintech build in the library. It introduces transaction-based pricing, a three-value fee calculator, and trust certification display. Read this file first, then 01–07.

---

## Cross-Build Pricing Model Comparison

Every service build in the library uses a different pricing paradigm. This is intentional — each teaches a distinct real-world pattern:

| Build | Pricing model | Display | Key utility |
|-------|--------------|---------|-------------|
| bw_service_01 | Monthly subscription | `₹1,499/mo` | `formatPlanPrice(tier, period)` |
| bw_service_02 | Project budget range | `₹10L – ₹50L` | `formatBudgetRange(agency)` |
| **bw_service_03** | **Per-transaction fee** | **`2.0%` of each payment** | **`calculateTransactionFee(amount, rate, fixed)`** |

The pricing domain changes the entire page architecture: instead of a plan comparison table (bw_service_01) or agency cards (bw_service_02), this build centres on a **live fee calculator** where the user inputs an amount and sees the exact cost breakdown.

---

## The Four Core Constraints of bw_service_03

### Constraint 1: calculateTransactionFee Is the Only Fee Formula

```typescript
// The utility
export function calculateTransactionFee(
  amount: number, feeRate: number, feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}

// CORRECT
const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee

// WRONG — breaks for products with feeFixed > 0
const fee = amount * product.feeRate
const received = amount * (1 - product.feeRate)

// WRONG — hardcoded rate
const fee = amount * 0.02
```

Why `Math.round`? Payment gateways charge whole rupees. `₹10,000 × 2% = ₹200.00` — clean. But `₹10,547 × 2% = ₹210.94` — rounds to ₹211. The rounding is intentional and must be preserved.

Why `feeFixed`? Some payment products (SMS charges, international cards) add a fixed per-transaction cost. Today's mock data has `feeFixed: 0` for all products, but the utility is built to handle it. Any product with non-zero `feeFixed` would silently calculate wrong if the formula were `amount * feeRate` only.

### Constraint 2: All Fee Values Are Derived — Never Stored in State

```tsx
// CORRECT — derived on every render
const product = PAYMENT_PRODUCTS.find(p => p.id === productId)!
const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee

// WRONG — stale state if amount or productId changes
const [fee, setFee] = useState(200)
const [received, setReceived] = useState(9800)
```

`fee` and `received` are purely derived values. They should never be in `useState`. Storing them creates synchronisation bugs: when `amount` changes, `fee` state might not update atomically.

The pattern: only `amount` and `productId` are in state. Everything else is computed inline.

### Constraint 3: Green Is "You Receive" — Not a General UI Colour

Green `#15803D` has a specific semantic: **positive money the user receives**. This mirrors bw_realestate_04 where green = savings. In this build:

| Correct green use | Incorrect green use |
|------------------|---------------------|
| `lineReceived` — the "You receive" line | Product card background |
| Any confirmation state after payment success | Icon tints on product grid |
| Future: success notification text | Section headings |

The green must not "leak" into general UI. If icons, headings, or borders start using green, the "you receive" semantic loses meaning.

### Constraint 4: formatFeeRate Always Takes Both Arguments

```typescript
// CORRECT — both args always
formatFeeRate(product.feeRate, product.feeFixed)   // → '2.0%' or '2.0% + ₹3'

// WRONG — missing second arg
formatFeeRate(product.feeRate)   // TypeScript error: Expected 2 arguments, got 1
```

The function signature requires both arguments. The conditional logic (`feeFixed === 0 ? pct : pct + ' + ₹N'`) lives inside the function, not in JSX. This ensures the display format is consistent everywhere the rate is shown: product cards, calculator dropdown, breakdown label.

---

## Stop List

| Banned element | Why |
|----------------|-----|
| `received = amount * (1 - product.feeRate)` | Wrong for feeFixed > 0 |
| `fee` or `received` in `useState` | Derived values — not state |
| `formatFeeRate(product.feeRate)` (one arg) | TypeScript error + missing feeFixed logic |
| `var(--color-green)` on product cards or UI chrome | Green = received amounts only |
| `font-weight: 700` | Max weight 600 |
| `border-radius: 50%` | No circles |
| Hex in `.module.css` | Tokens only |
| `Manrope` weight `'700'` in layout.tsx | Not loaded |

---

## Proceed to: 01_PRD.md
