# 07 — Guide
## Indian Stock Broker Service Page · bw_service_04

---

## The Four Constraints — Why They Exist

---

### Constraint 1: calculateBrokerage Uses Math.min — Not a Simple Flat Fee

#### The Three Fee Structures

Zerodha (and ZeroTrade by extension) has three genuinely different fee structures across its products:

```
Structure A — Free:       flatFee=0, percentFee=null   → always 0
Structure B — Intraday:   flatFee=20, percentFee=0.0003 → min(₹20, 0.03%)
Structure C — Flat:       flatFee=20, percentFee=null   → always ₹20
```

A single formula cannot handle all three. The function has three branches:

```typescript
export function calculateBrokerage(
  flatFee: number,
  percentFee: number | null,
  orderValue: number
): number {
  if (flatFee === 0) return 0                                                    // Structure A
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))  // Structure B
  return flatFee                                                                 // Structure C
}
```

#### Why Math.min Matters for Intraday

The intraday rule is "₹20 OR 0.03%, whichever is lower." This creates a crossover point:

```
Crossover = 20 / 0.0003 = ₹66,666.67

Below ₹66,666:  0.03% < ₹20  →  charge the percentage
Above ₹66,666:  0.03% > ₹20  →  charge the flat cap

Order ₹10,000:  0.03% = ₹3.00  → Math.min(20, 3)  = ₹3   (percentage wins)
Order ₹50,000:  0.03% = ₹15.00 → Math.min(20, 15) = ₹15  (percentage wins)
Order ₹70,000:  0.03% = ₹21.00 → Math.min(20, 21) = ₹20  (cap wins)
Order ₹1,00,000: 0.03% = ₹30.00 → Math.min(20, 30) = ₹20  (cap wins)
```

#### Why Math.ceil (Not Math.round)

```typescript
// WRONG — may produce ₹0 for small orders
Math.round(100 * 0.0003)  = Math.round(0.03)  = 0   (would show free when it's not)

// CORRECT — rounds up in broker's favour
Math.ceil(100 * 0.0003)   = Math.ceil(0.03)   = 1   (₹1 minimum charge)
Math.ceil(10000 * 0.0003) = Math.ceil(3.0)    = 3   (clean whole number)
Math.ceil(66666 * 0.0003) = Math.ceil(19.9998) = 20  (correctly hits the cap)
```

`Math.ceil` ensures no sub-rupee charges and correctly brings the 0.03% calculation up to the cap boundary.

#### The Common Mistakes

```typescript
// WRONG #1 — missing Math.min: overcharges large orders
const fee = Math.ceil(orderValue * percentFee)
// ₹70,000 → ₹21 instead of ₹20

// WRONG #2 — missing Math.ceil: produces decimals
const fee = Math.min(flatFee, orderValue * percentFee)
// ₹10,001 → 3.0003 (non-whole rupee)

// WRONG #3 — hardcoded percentage: breaks for any other percentFee
const fee = Math.min(20, Math.ceil(orderValue * 0.0003))
// Doesn't work for a future product with percentFee: 0.0005

// CORRECT — handles all three fee types
const fee = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
```

---

### Constraint 2: "You Save" Is a Comparison — Not a Deduction

#### The Semantic Difference from bw_service_03

bw_service_03 (PayFlow) shows a fee deduction:
```
Amount you send: ₹10,000
Fee deducted:   −₹200
You receive:     ₹9,800  ← green (money returned to you)
```

bw_service_04 (ZeroTrade) shows a cost comparison:
```
ZeroTrade charges:       ₹20
Traditional would charge: ₹300
You save:                 ₹280  ← green (money not spent)
```

Both use green for financial benefit to the user. The distinction is:
- bw_03 green = actual amount returned (part of the same transaction)
- bw_04 green = hypothetical savings (comparison against an alternative)

#### The TRADITIONAL_FEE_RATE Constant

`TRADITIONAL_FEE_RATE = 0.003` is a constant in `data.ts`. It represents a typical traditional full-service broker's delivery brokerage rate (0.3%). This number:
- Is not editable by the user
- Is not in React state
- Is not a prop
- Is not in the component — it lives in `data.ts` and is imported

```typescript
// data.ts
export const TRADITIONAL_FEE_RATE = 0.003

// BrokerageCalculator.tsx
import { TRADITIONAL_FEE_RATE } from '@/lib/data'

// CORRECT — derived per render
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
const savings        = traditionalFee - brokerage

// WRONG — in state
const [traditionalFee, setTraditionalFee] = useState(300)
// This will go stale the moment orderValue changes
```

#### Savings Is Always Non-Negative

For any realistic order value, ZeroTrade's brokerage (₹0 or ₹20 max) will always be ≤ the traditional 0.3% fee. The only edge case: for a ₹1 order, traditional fee = Math.round(1 × 0.003) = 0, and brokerage = 0, so savings = 0. The display should handle savings === 0 gracefully (show ₹0 in green).

---

### Constraint 3: Navy Luminance — 11.50:1 AAA

#### Calculation

```
Navy: #1E3A5F → RGB(30, 58, 95)

Linear channel values:
  R = 30/255  = 0.11765 → ((0.11765+0.055)/1.055)^2.4 = (0.16360)^2.4 ≈ 0.01305
  G = 58/255  = 0.22745 → ((0.22745+0.055)/1.055)^2.4 = (0.26770)^2.4 ≈ 0.04230
  B = 95/255  = 0.37255 → ((0.37255+0.055)/1.055)^2.4 = (0.40529)^2.4 ≈ 0.11487

Relative luminance:
  L = 0.2126×0.01305 + 0.7152×0.04230 + 0.0722×0.11487
    = 0.002775 + 0.030248 + 0.008294
    = 0.041317 ≈ 0.0413

White on navy: (1.0+0.05) / (0.0413+0.05) = 1.05 / 0.0913 = 11.50:1 ✓✓ AAA
```

#### Library Context

| Build | Primary colour | L | White-on-primary | Level |
|-------|---------------|---|-----------------|-------|
| bw_service_01 | Yellow #FFE01B | 0.7490 | 1.31:1 ✗✗ | FAIL |
| bw_service_02 | Indigo #4F46E5 | 0.1170 | 6.29:1 ✓ | AA |
| bw_service_03 | Blue #1D4ED8 | 0.1078 | 6.65:1 ✓ | AA |
| bw_service_04 | Navy #1E3A5F | 0.0413 | 11.50:1 ✓✓ | **AAA** |

Navy's L=0.0413 is much darker than the previous blues. The deeper desaturation (less blue-channel dominance) and lower lightness together produce AAA contrast.

**Practical implication:** At 11.50:1, even 12px text in white on navy passes WCAG AAA for small text (7:1 threshold). All UI elements using navy/white — buttons, highlighted card, nav logo, trust icons — comfortably exceed AA requirements.

---

### Constraint 4: Green = "You Save" — Not a General Financial Colour

#### The Semantic Rule

Green `#15803D` carries one meaning across the entire BusiWeb library: **positive financial benefit to the user**.

| Build | Green use | Meaning |
|-------|-----------|---------|
| bw_realestate_04 | `BrokerSavingsWidget` | broker fee saved |
| bw_service_03 | `.lineReceived` | money received after fee |
| **bw_service_04** | `.lineSavings` | money saved vs traditional |

The consistent pattern: green = the user is better off by this amount.

#### What Green Cannot Be Used For in This Build

| Forbidden | Correct alternative |
|-----------|---------------------|
| Product card background (including ₹0 cards) | `var(--color-navy)` for highlighted, `var(--color-white)` for others |
| Trust badge icons | `var(--color-navy)` — 11.50:1 AAA |
| "Free" pill or badge on delivery card | Navy feeTag with "₹0" text |
| Section heading accent | `var(--color-dark)` |
| TrustBar icons | `var(--color-white)` — on footer bg |

#### Special Temptation: Delivery Card Is "Free" — Why Not Green?

It's tempting to use green on the delivery card to signal "free = good". This must be rejected:
1. Green on a card background would be `background: var(--color-green)` — explicitly forbidden as a background
2. The delivery card's benefit is communicated by `flatFee: 0` → `formatBrokerageTag` → `'₹0'` tag
3. Navy (11.50:1 AAA) provides stronger visual emphasis than green (5.02:1 AA) for the highlighted card
4. Green is reserved for the savings comparison line, which directly quantises the benefit in rupees

---

## Full Contrast Reference Table

| Foreground | Background | Ratio | WCAG | Usage |
|------------|-----------|-------|------|-------|
| White `#FFFFFF` | Navy `#1E3A5F` | 11.50:1 | AAA ✓✓ | Buttons, highlighted card, nav CTA |
| Navy `#1E3A5F` | White `#FFFFFF` | 11.50:1 | AAA ✓✓ | Logo, trust icons, card icons, outline button |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | `.lineSavings` ONLY |
| Dark `#111827` | White `#FFFFFF` | 18.20:1 | AAA ✓✓ | Headings, body, calculator input |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Traditional fee line, descriptions |
| White `#FFFFFF` | Footer `#030712` | ~20:1 | AAA ✓✓ | TrustBar + footer text |
| White (op 0.8) | Navy `#1E3A5F` | ~9.2:1 | AAA ✓✓ | `.descMuted` on highlighted card |

---

## 50-Item Pre-Delivery Checklist

### Utilities and Types
- [ ] 1. `calculateBrokerage(0, null, 100000)` → `0`
- [ ] 2. `calculateBrokerage(20, null, 50000)` → `20`
- [ ] 3. `calculateBrokerage(20, 0.0003, 10000)` → `3`
- [ ] 4. `calculateBrokerage(20, 0.0003, 50000)` → `15`
- [ ] 5. `calculateBrokerage(20, 0.0003, 70000)` → `20` (cap)
- [ ] 6. `calculateBrokerage(20, 0.0003, 100000)` → `20` (cap)
- [ ] 7. `formatBrokerageTag(0, null)` → `'₹0'`
- [ ] 8. `formatBrokerageTag(20, null)` → `'₹20 flat'`
- [ ] 9. `formatBrokerageTag(20, 0.0003)` → `'₹20 or 0.03%'`
- [ ] 10. `TRADITIONAL_FEE_RATE = 0.003` exported from `data.ts`
- [ ] 11. All 4 type interfaces exported from `src/types/index.ts`
- [ ] 12. `TRADING_PRODUCTS` has exactly 6 items
- [ ] 13. `TRUST_BADGES` has exactly 4 items

### Tokens and CSS
- [ ] 14. All 8 colour tokens in `globals.css`
- [ ] 15. Zero hex in any `.module.css`
- [ ] 16. `font-weight: 700` never appears
- [ ] 17. `border-radius: 50%` never appears
- [ ] 18. `--font-sans: 'DM Sans', sans-serif` in `:root`
- [ ] 19. `--radius-card: 12px` in `:root`
- [ ] 20. `.sr-only` class in `globals.css`
- [ ] 21. `prefers-reduced-motion` block in `globals.css`

### BrokerageCalculator
- [ ] 22. Only `orderValue` and `productId` in `useState`
- [ ] 23. `brokerage` computed inline — not in `useState`
- [ ] 24. `traditionalFee` computed inline — not in `useState`
- [ ] 25. `savings` computed inline — not in `useState`
- [ ] 26. Default: ₹1,00,000 + Delivery → brokerage ₹0, traditional ₹300, savings ₹300
- [ ] 27. Switch to Intraday ₹1,00,000 → brokerage ₹20, savings ₹280
- [ ] 28. Intraday ₹10,000 → brokerage ₹3 (not ₹20)
- [ ] 29. Intraday ₹70,000 → brokerage ₹20 (cap confirmed)
- [ ] 30. Breakdown has `aria-live="polite"`
- [ ] 31. Order value input has `<label>` via `htmlFor`
- [ ] 32. `.lineSavings` uses `var(--color-green)` — only green in project

### Trading Products Grid
- [ ] 33. Highlighted card (Delivery): `background: var(--color-navy); color: var(--color-white)`
- [ ] 34. Highlighted icon: `.iconWhite` (white) — not `.icon` (navy)
- [ ] 35. Highlighted description: `.descMuted` — not `.description` with muted colour
- [ ] 36. Highlighted fee tag: `.feeTagWhite` — not `.feeTag`
- [ ] 37. No `background: var(--color-green)` on any card
- [ ] 38. Grid is 3-col desktop, 2-col tablet (<900px), 1-col mobile (<580px)
- [ ] 39. `formatBrokerageTag(product.flatFee, product.percentFee)` — both args on every card

### Navigation and Footer
- [ ] 40. `SiteNav` has `'use client'`
- [ ] 41. Scroll shadow via `useEffect` scroll listener
- [ ] 42. `<nav aria-label="Main navigation">`
- [ ] 43. Logo text: `var(--color-navy)` — 11.50:1 AAA on white
- [ ] 44. Footer: `var(--color-footer)` background

### TrustBar
- [ ] 45. `TrustBar` has `'use client'`
- [ ] 46. Framer Motion stagger: `delay: index * 0.1`
- [ ] 47. `viewport={{ once: true }}`
- [ ] 48. TrustBar icons: `var(--color-white)` — on dark footer ✓✓

### Build
- [ ] 49. `tsc --noEmit` exits 0
- [ ] 50. `npm run build` exits 0, `/out` present

---

## Common Failure Modes

| Symptom | Root cause | Fix |
|---------|-----------|-----|
| Intraday ₹70,000 shows ₹21 | Missing `Math.min` | `Math.min(flatFee, Math.ceil(...))` |
| Intraday shows decimal brokerage | Missing `Math.ceil` | `Math.ceil(orderValue * percentFee)` before `Math.min` |
| Savings goes stale after segment change | `savings` in `useState` | Derive: `const savings = traditionalFee - brokerage` |
| TypeScript error on `formatBrokerageTag` | Called with one arg | Always `formatBrokerageTag(product.flatFee, product.percentFee)` |
| Delivery card shows green background | Misapplied colour semantic | Highlighted card = navy, never green |
| White text invisible on non-highlighted card | Reusing highlighted styles | Conditional: `hl ? styles.iconWhite : styles.icon` |
| Delivery shows ₹20 in calculator | Wrong product lookup | `TRADING_PRODUCTS.find(p => p.id === productId)` — check id matches 'delivery' |
| `npm run build` fails | `'use client'` on `page.tsx` | `page.tsx` is Server Component; remove `'use client'` |
| DM Sans not found at runtime | Added weight `'700'` | Only `['400', '500', '600']` in `layout.tsx` |
| `TRADITIONAL_FEE_RATE` not available in calculator | Not exported from `data.ts` | `export const TRADITIONAL_FEE_RATE = 0.003` in `data.ts` |
