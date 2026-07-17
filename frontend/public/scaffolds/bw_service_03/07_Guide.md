# 07 — Guide
## Indian Payment Gateway Service Page · bw_service_03

---

## The Four Constraints — Why They Exist

---

### Constraint 1: calculateTransactionFee Is the Only Fee Formula

#### The Wrong Approaches

```typescript
// Wrong #1 — ignores feeFixed entirely
const fee = amount * product.feeRate

// Wrong #2 — same error, different syntax
const received = amount * (1 - product.feeRate)

// Wrong #3 — hardcoded rate, ignores product selection
const fee = amount * 0.02
```

All three fail silently when `feeFixed > 0`. Today's mock data happens to have `feeFixed: 0` for all four products, which means wrong code passes all visible test cases. A future product with `feeFixed: 3` (international cards) would calculate 3 rupees short on every transaction.

#### The Correct Approach

```typescript
// src/lib/calculateTransactionFee.ts
export function calculateTransactionFee(
  amount: number,
  feeRate: number,
  feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}

// Usage in FeeCalculator.tsx
const fee      = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee
```

#### Why Math.round?

Payment gateways charge whole rupees. The merchant sees a single deduction — not `₹210.94`. The rounding is part of the business model.

```
₹10,000 × 2%    = ₹200.00  → 200  (clean)
₹10,547 × 2%    = ₹210.94  → 211  (rounds up)
₹50,001 × 2%    = ₹1,000.02 → 1,000 (rounds down)
₹75 × 2%        = ₹1.50    → 2    (rounds up to whole rupee)
```

If `Math.floor` were used instead, the merchant would see ₹1 instead of ₹2 for the ₹75 transaction — undercounting the fee. `Math.round` is the standard (round-half-up) used by most Indian payment processors.

#### Why Accept feeFixed Even When All Current Products Have 0?

The function signature communicates the domain model, not just today's data. Payment products with fixed per-transaction charges are common:

- SMS OTP verification: ₹0.50 per SMS (could be rounded to ₹1)
- International card surcharge: ₹5 flat + 3.5%
- EMI processing: ₹15 per installment

If `feeFixed` were omitted from the function, adding any such product later would require changing both the function AND every call site. With the current design, you add a new product to `data.ts` with `feeFixed: 5` and the calculator works correctly with zero code changes.

---

### Constraint 2: fee and received Are Derived — Never Stored in State

#### The State Model

```typescript
// CORRECT — only inputs are state
const [amount, setAmount]       = useState<number>(10_000)
const [productId, setProductId] = useState<string>('pg')

// Derived on every render — never setState on these
const product  = PAYMENT_PRODUCTS.find(p => p.id === productId)!
const fee      = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee
```

#### Why Not Store fee in State?

Consider what happens with `useState` for `fee`:

```typescript
// WRONG
const [amount, setAmount]       = useState(10_000)
const [productId, setProductId] = useState('pg')
const [fee, setFee]             = useState(200)    // ← stored state
const [received, setReceived]   = useState(9_800)  // ← stored state

// Now every handler must keep them synchronised:
function handleAmountChange(e) {
  const newAmount = Number(e.target.value)
  setAmount(newAmount)
  const product = PAYMENT_PRODUCTS.find(p => p.id === productId)!
  const newFee = calculateTransactionFee(newAmount, product.feeRate, product.feeFixed)
  setFee(newFee)                    // ← manual sync
  setReceived(newAmount - newFee)   // ← manual sync
}
function handleProductChange(e) {
  setProductId(e.target.value)
  const product = PAYMENT_PRODUCTS.find(p => p.id === e.target.value)!
  const newFee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
  setFee(newFee)                    // ← manual sync
  setReceived(amount - newFee)      // ← manual sync
}
```

This is 2× more state updates, duplicated logic, and a potential bug: if `setFee` is called but `setReceived` is missed in one handler, the display shows inconsistent values. React batches state updates, but the opportunity for stale closure bugs is real.

The correct pattern: `fee` and `received` have no independent state. They are deterministic functions of `amount` and `productId`. Compute them inline — React re-renders automatically.

#### How to Verify in Code Review

```bash
# Neither fee nor received should appear in useState calls
grep -r "useState.*fee\|useState.*Fee\|useState.*received\|useState.*Received" src/components
# Expected: empty output
```

---

### Constraint 3: Blue Luminance — 6.65:1 on White

#### Calculation

```
Blue: #1D4ED8 → RGB(29, 78, 216)

Linear channel values (sRGB → linear):
  R = 29/255  = 0.1137 → ((0.1137+0.055)/1.055)^2.4 = (0.1599)^2.4 ≈ 0.01838
  G = 78/255  = 0.3059 → ((0.3059+0.055)/1.055)^2.4 = (0.3419)^2.4 ≈ 0.07477
  B = 216/255 = 0.8471 → ((0.8471+0.055)/1.055)^2.4 = (0.8553)^2.4 ≈ 0.69847

Relative luminance:
  L = 0.2126 × 0.01838 + 0.7152 × 0.07477 + 0.0722 × 0.69847
    = 0.003907 + 0.053472 + 0.050450
    = 0.10783 ≈ 0.1078

Contrast: white on blue:
  (L_white + 0.05) / (L_blue + 0.05) = 1.05 / (0.1078 + 0.05) = 1.05 / 0.1578 = 6.65:1 ✓ AA
```

#### Where Blue Is Used

| Use | Contrast | Pass? |
|-----|----------|-------|
| White text on blue button | 6.65:1 | AA ✓ |
| White icon on highlighted product card | 6.65:1 | AA ✓ |
| White fee tag on highlighted card | 6.65:1 | AA ✓ |
| Blue logo text on white nav | 6.65:1 | AA ✓ |
| Blue icon on white card | 6.65:1 | AA ✓ |
| Blue pill icon on white | 6.65:1 | AA ✓ |

All safe. Blue is the only brand colour in this build that works for both text-on-bg and bg-on-white.

#### Green for Received Amounts

```
Green: #15803D → L ≈ 0.1592  (documented in bw_realestate_04 and bw_service_03)

Green on white:
  1.05 / (0.1592 + 0.05) = 1.05 / 0.2092 = 5.02:1 ✓ AA
```

5.02:1 passes AA for normal text (≥4.5:1 required). Adequate for the received amount display — a prominent, large value.

---

### Constraint 4: Green = "You Receive" — Not a General UI Colour

#### The Semantic Rule

Green `#15803D` carries one meaning in this build: **positive money the user receives after the fee is deducted**. This is the same semantic as bw_realestate_04 where green = broker savings (money not spent).

The rule: `var(--color-green)` must ONLY appear in `.lineReceived` in `FeeCalculator.module.css`.

#### What Green CANNOT Be Used For

| Forbidden use | Why |
|---------------|-----|
| Product card background | Cards use blue (highlighted) or white — never green |
| Icon tint on TrustSection | Blue icons only (6.65:1 ✓) |
| Section headings | Dark `#111827` only |
| TrustBar icons | White on dark footer |
| Success/confirmation state | Out of scope for this build |
| Any border or divider | Tokens: blue, border, surface |

#### Why This Matters

If green appears on product cards, section headers, or icon tints, a screen reader user who relies on programmatic colour semantics (or a sighted user with colour vision differences) loses the signal that green = financial gain. The "You receive ₹9,800" line stands out because it is the ONLY green element on the page. Dilute the green and the visual hierarchy breaks.

#### How to Verify

```bash
# Green should appear only in FeeCalculator.module.css
grep -r "color-green" src --include="*.module.css"
# Expected: one line, only in FeeCalculator.module.css

# Green should never be on a background
grep -r "background.*color-green\|background-color.*color-green" src
# Expected: empty output
```

---

## Full Contrast Reference Table

| Foreground | Background | Ratio | WCAG | Usage |
|------------|-----------|-------|------|-------|
| White `#FFFFFF` | Blue `#1D4ED8` | 6.65:1 | AA ✓ | Buttons, active nav, highlighted card, fee tag |
| Blue `#1D4ED8` | White `#FFFFFF` | 6.65:1 | AA ✓ | Logo, card icons, pill icons, trust tile icons |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | `.lineReceived` in FeeCalculator ONLY |
| Dark `#111827` | White `#FFFFFF` | 18.20:1 | AAA ✓✓ | Headings, body text, input text |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Descriptions, fee label, metadata |
| White `#FFFFFF` | Footer `#030712` | ~20:1 | AAA ✓✓ | TrustBar values, footer text |
| White `#FFFFFF` (opacity 0.8) | Blue `#1D4ED8` | ~5.3:1 | AA ✓ | `.descMuted` on highlighted card |

---

## 50-Item Pre-Delivery Checklist

### Utilities and Types
- [ ] 1. `calculateTransactionFee(10000, 0.02)` → `200`
- [ ] 2. `calculateTransactionFee(10000, 0.02, 3)` → `203`
- [ ] 3. `calculateTransactionFee(10547, 0.02)` → `211`
- [ ] 4. `calculateTransactionFee(0, 0.02)` → `0`
- [ ] 5. `formatFeeRate(0.02, 0)` → `'2.0%'`
- [ ] 6. `formatFeeRate(0.015, 0)` → `'1.5%'`
- [ ] 7. `formatFeeRate(0.02, 3)` → `'2.0% + ₹3'`
- [ ] 8. All 5 type interfaces exported from `src/types/index.ts`
- [ ] 9. `PAYMENT_PRODUCTS` has exactly 4 items
- [ ] 10. `TRUST_BADGES` has exactly 4 items
- [ ] 11. `PAYMENT_METHODS` has exactly 6 items
- [ ] 12. `TRUST_STATS` has exactly 4 items
- [ ] 13. `HERO_STATS` has exactly 3 items

### Tokens and CSS
- [ ] 14. All 8 colour tokens defined in `globals.css`
- [ ] 15. Zero hex values in any `.module.css` file
- [ ] 16. `font-weight: 700` never appears in any file
- [ ] 17. `border-radius: 50%` never appears in any file
- [ ] 18. `--font-sans: 'Manrope', sans-serif` in `:root`
- [ ] 19. `--radius-card: 12px` in `:root`
- [ ] 20. `.sr-only` class in `globals.css`
- [ ] 21. `prefers-reduced-motion` block in `globals.css`

### FeeCalculator
- [ ] 22. Only `amount` and `productId` in `useState`
- [ ] 23. `fee` is computed inline — not in `useState`
- [ ] 24. `received` is computed inline — not in `useState`
- [ ] 25. `received = amount - fee` (not `amount * (1 - feeRate)`)
- [ ] 26. Default state: ₹10,000 + Payment Gateway → fee ₹200, received ₹9,800
- [ ] 27. Switching to Payment Pages (1.5%) → fee ₹150, received ₹9,850
- [ ] 28. Breakdown container has `aria-live="polite"`
- [ ] 29. Amount input has `<label>` connected via `htmlFor`
- [ ] 30. `formatFeeRate` called with both args in product select dropdown
- [ ] 31. `formatFeeRate` called with both args in fee breakdown label
- [ ] 32. `.lineReceived` uses `var(--color-green)` — 5.02:1 ✓

### Payment Products Grid
- [ ] 33. Highlighted card (Payment Gateway): `background: var(--color-blue); color: var(--color-white)`
- [ ] 34. Highlighted card icon uses `.iconWhite` (white) — not `.icon` (blue)
- [ ] 35. Highlighted card description uses `.descMuted` — not `.description` with `var(--color-muted)`
- [ ] 36. Highlighted card fee tag uses `.feeTagWhite` — not `.feeTag`
- [ ] 37. No `background: var(--color-green)` on any product card
- [ ] 38. Grid is 2-col on desktop, 1-col on mobile (<640px)
- [ ] 39. `formatFeeRate(product.feeRate, product.feeFixed)` — both args on every card

### Navigation and Footer
- [ ] 40. `SiteNav` has `'use client'` directive
- [ ] 41. Scroll shadow applied via `useEffect` scroll listener
- [ ] 42. `<nav aria-label="Main navigation">` wrapper
- [ ] 43. Logo text uses `var(--color-blue)` — 6.65:1 on white ✓
- [ ] 44. Footer uses `var(--color-footer)` background

### TrustBar
- [ ] 45. TrustBar has `'use client'` directive (Framer Motion)
- [ ] 46. Framer Motion stagger: `delay: index * 0.1`
- [ ] 47. `viewport={{ once: true }}` on each motion element
- [ ] 48. Icons use `var(--color-white)` — ≈20:1 on footer bg ✓✓

### Build
- [ ] 49. `tsc --noEmit` exits 0
- [ ] 50. `npm run build` exits 0, `/out` directory present

---

## Common Failure Modes

| Symptom | Root cause | Fix |
|---------|-----------|-----|
| `received` goes stale when product changes | `received` in `useState` | Derive inline: `const received = amount - fee` |
| Fee wrong for product with feeFixed > 0 | Using `amount * feeRate` | Use `calculateTransactionFee(amount, product.feeRate, product.feeFixed)` |
| Green on product card header | Copy-paste from TrustSection / icon colour | Only `.lineReceived` in FeeCalculator uses green |
| White text invisible on non-highlighted card | Using same card style for all cards | Conditional: `hl ? styles.iconWhite : styles.icon` |
| TypeScript error: formatFeeRate argument count | Called with 1 arg | Always: `formatFeeRate(product.feeRate, product.feeFixed)` |
| Highlighted card has `.feeTag` (blue on blue) | Not switching to `.feeTagWhite` | `hl ? styles.feeTagWhite : styles.feeTag` |
| `npm run build` fails | `'use client'` on `page.tsx` or import order issue | `page.tsx` is Server Component; `FeeCalculator` boundary is inside `HeroSection` |
| Manrope weight 700 not found at runtime | Added `'700'` to weights array | Only `['400', '500', '600']` in `layout.tsx` |
