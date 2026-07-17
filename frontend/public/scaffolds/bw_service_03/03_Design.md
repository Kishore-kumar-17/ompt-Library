# 03 — Design
## Indian Payment Gateway Service Page · bw_service_03

---

## Colour System

| Token | Hex | Use |
|-------|-----|-----|
| `--color-blue` | `#1D4ED8` | Primary brand — white on blue = 6.65:1 ✓ |
| `--color-green` | `#15803D` | "You receive" amounts ONLY — 5.02:1 on white ✓ |
| `--color-dark` | `#111827` | Headings, body text — ≈18:1 on white ✓✓ |
| `--color-white` | `#FFFFFF` | Card bg, nav, page |
| `--color-surface` | `#F9FAFB` | TrustSection, PaymentMethods section bg |
| `--color-muted` | `#6B7280` | Secondary text, fee label, descriptions |
| `--color-border` | `#E5E7EB` | Card borders, calculator divider |
| `--color-footer` | `#030712` | Footer + TrustBar bg |

### globals.css

```css
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

## Contrast Calculations

### Blue `#1D4ED8`

```
RGB: 29, 78, 216

R = 29/255  = 0.1137 → ((0.1137+0.055)/1.055)^2.4 = (0.1599)^2.4 ≈ 0.01838
G = 78/255  = 0.3059 → ((0.3059+0.055)/1.055)^2.4 = (0.3419)^2.4 ≈ 0.07477
B = 216/255 = 0.8471 → ((0.8471+0.055)/1.055)^2.4 = (0.8553)^2.4 ≈ 0.69847

L(blue) = 0.2126×0.01838 + 0.7152×0.07477 + 0.0722×0.69847
         = 0.003907 + 0.053472 + 0.050450
         = 0.10783 ≈ 0.1078

White on blue: (1.0+0.05)/(0.1078+0.05) = 1.05/0.1578 = 6.65:1 ✓ AA
Blue on white: same = 6.65:1 ✓ AA
```

### Green `#15803D` (same as bw_service_01, bw_realestate_04)

```
L(green) ≈ 0.1592  (documented in prior builds)
Green on white: (1.05)/(0.1592+0.05) = 1.05/0.2092 = 5.02:1 ✓ AA
```

### Dark `#111827`

```
RGB: 17, 24, 39
R = 17/255 = 0.0667 → ≈ 0.00451
G = 24/255 = 0.0941 → ≈ 0.00745
B = 39/255 = 0.1529 → ≈ 0.01956

L(dark) = 0.2126×0.00451 + 0.7152×0.00745 + 0.0722×0.01956
         = 0.000959 + 0.005328 + 0.001412 = 0.007699 ≈ 0.00770

Dark on white: (1.05)/(0.00770+0.05) = 1.05/0.0577 = 18.20:1 ✓✓ AAA
```

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Blue `#1D4ED8` | 6.65:1 | AA ✓ | Blue buttons, active chips, highlighted product card |
| Blue `#1D4ED8` | White `#FFFFFF` | 6.65:1 | AA ✓ | Logo, trust badge icons, blue text |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | "You receive" line ONLY |
| Dark `#111827` | White `#FFFFFF` | 18.20:1 | AAA ✓✓ | Headings, body text |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Descriptions, fee label, metadata |
| White `#FFFFFF` | Footer `#030712` | ~20:1 | AAA ✓✓ | Footer, TrustBar text |

---

## Module CSS

### FeeCalculator.module.css

```css
/* FeeCalculator.module.css */
.calculator {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  max-width: 480px; width: 100%;
  box-shadow: 0 4px 24px rgba(29,78,216,0.08);
}

.heading { font-size: 1.125rem; font-weight: 600; color: var(--color-dark); margin-bottom: 20px; }

.productSelect {
  width: 100%; border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 10px 14px;
  font-family: var(--font-sans); font-size: 0.9375rem; color: var(--color-dark);
  margin-bottom: 16px; appearance: none; background: var(--color-white); cursor: pointer;
}
.productSelect:focus { outline: none; border-color: var(--color-blue); }

.amountLabel { font-size: 0.875rem; color: var(--color-muted); display: block; margin-bottom: 6px; }

.amountInput {
  width: 100%; border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 10px 14px;
  font-family: var(--font-sans); font-size: 1.125rem;
  color: var(--color-dark); margin-bottom: 20px;
}
.amountInput:focus { outline: none; border-color: var(--color-blue); }

.breakdown {
  background: var(--color-surface); border-radius: 10px;
  padding: 18px; display: flex; flex-direction: column; gap: 12px;
}

.line {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.9375rem;
}
.lineLabel  { color: var(--color-muted); }
.lineAmount { font-weight: 600; color: var(--color-dark); font-size: 1.0625rem; }
.lineFee    { font-weight: 600; color: var(--color-muted); }

.lineReceived {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-green);   /* green = positive money received — 5.02:1 ✓ */
}
/* SEMANTIC: green ONLY on .lineReceived — never reuse for icons or section headings */

.divider { border: none; border-top: 1px solid var(--color-border); margin: 0; }
```

### PaymentProducts.module.css

```css
/* PaymentProducts.module.css */
.section { padding: 80px 24px; background: var(--color-white); }
.heading { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 600; text-align: center; margin-bottom: 48px; }

.grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 20px; max-width: 900px; margin: 0 auto;
}
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }

.card {
  background: var(--color-white); border: 1.5px solid var(--color-border);
  border-radius: var(--radius-card); padding: 28px 24px;
  transition: box-shadow 0.2s ease;
}
.card:hover { box-shadow: 0 4px 20px rgba(29,78,216,0.1); }

.cardHighlighted {
  background: var(--color-blue);   /* white on blue = 6.65:1 ✓ */
  color: var(--color-white);
  border-color: var(--color-blue);
}
/* NEVER: background: var(--color-green) on any card */

.icon          { color: var(--color-blue);  margin-bottom: 14px; }
.iconWhite     { color: var(--color-white); margin-bottom: 14px; }
/* icon must be white on highlighted card */

.name          { font-size: 1.0625rem; font-weight: 600; margin-bottom: 6px; }
.description   { font-size: 0.875rem; color: var(--color-muted); line-height: 1.6; }
.descMuted     { font-size: 0.875rem; color: var(--color-white); opacity: 0.8; line-height: 1.6; }
/* on highlighted card, description uses white with opacity — not var(--color-muted) */

.feeTag {
  display: inline-block; margin-top: 14px;
  font-size: 0.8125rem; font-weight: 600;
  color: var(--color-blue);
  background: rgba(29,78,216,0.08); /* rgba acceptable — not a token value */
  padding: 3px 10px; border-radius: 4px;
}
.feeTagWhite {
  font-size: 0.8125rem; font-weight: 600;
  color: var(--color-white); margin-top: 14px;
  /* on highlighted card — white on blue = 6.65:1 ✓ */
  display: inline-block;
  background: rgba(255,255,255,0.15); padding: 3px 10px; border-radius: 4px;
}
```

### TrustSection.module.css

```css
/* TrustSection.module.css */
.section { background: var(--color-surface); padding: 64px 24px; }
.heading { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; text-align: center; margin-bottom: 40px; }

.grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; max-width: 1000px; margin: 0 auto;
}
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 400px) { .grid { grid-template-columns: 1fr; } }

.tile {
  background: var(--color-white); border: 1px solid var(--color-border);
  border-radius: var(--radius-card); padding: 24px 20px; text-align: center;
}
.icon { color: var(--color-blue); margin-bottom: 10px; }  /* blue on white = 6.65:1 ✓ */
.label { font-size: 0.9375rem; font-weight: 600; color: var(--color-dark); }
.description { font-size: 0.75rem; color: var(--color-muted); margin-top: 4px; }
```

### PaymentMethods.module.css

```css
/* PaymentMethods.module.css */
.section { background: var(--color-surface); padding: 48px 24px; }
.heading { font-size: 1.125rem; font-weight: 600; text-align: center; color: var(--color-dark); margin-bottom: 24px; }

.row {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 12px; max-width: 700px; margin: 0 auto;
}

.pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--color-white); border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 10px 18px;
  font-size: 0.9375rem; font-weight: 500; color: var(--color-dark);
}
.pillIcon { color: var(--color-blue); }
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden |
|-------------|---------------|
| `received = amount * (1 - feeRate)` | Wrong for feeFixed > 0 |
| `fee` or `received` in `useState` | Derived values — compute inline |
| `color: var(--color-green)` on icons/headers | Green = received amounts only |
| `background: var(--color-green)` anywhere | Not a background colour |
| `formatFeeRate(product.feeRate)` (one arg) | Missing second arg — TypeScript error |
| `font-weight: 700` | Max 600 |
| `border-radius: 50%` | No circles |
