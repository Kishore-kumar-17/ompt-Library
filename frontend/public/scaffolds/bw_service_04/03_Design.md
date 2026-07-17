# 03 — Design
## Indian Stock Broker Service Page · bw_service_04

---

## Colour System

| Token | Hex | Use |
|-------|-----|-----|
| `--color-navy` | `#1E3A5F` | Primary brand — white on navy = 11.50:1 ✓✓ AAA |
| `--color-green` | `#15803D` | "You save" amounts ONLY — 5.02:1 on white ✓ |
| `--color-dark` | `#111827` | Headings, body text — ≈18:1 on white ✓✓ |
| `--color-white` | `#FFFFFF` | Card bg, nav, page |
| `--color-surface` | `#F9FAFB` | TrustSection section bg |
| `--color-muted` | `#6B7280` | Secondary text, traditional fee, descriptions |
| `--color-border` | `#E5E7EB` | Card borders, calculator divider |
| `--color-footer` | `#030712` | Footer + TrustBar bg |

### globals.css

```css
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

## Contrast Calculations

### Navy `#1E3A5F` — First AAA Primary in the Service Library

```
RGB: 30, 58, 95

R = 30/255  = 0.11765 → ((0.11765+0.055)/1.055)^2.4 = (0.16360)^2.4 ≈ 0.01305
G = 58/255  = 0.22745 → ((0.22745+0.055)/1.055)^2.4 = (0.26770)^2.4 ≈ 0.04230
B = 95/255  = 0.37255 → ((0.37255+0.055)/1.055)^2.4 = (0.40529)^2.4 ≈ 0.11487

L(navy) = 0.2126×0.01305 + 0.7152×0.04230 + 0.0722×0.11487
         = 0.002775 + 0.030248 + 0.008294
         = 0.041317 ≈ 0.0413

White on navy: (1.0+0.05)/(0.0413+0.05) = 1.05/0.0913 = 11.50:1 ✓✓ AAA
Navy on white: same ratio = 11.50:1 ✓✓ AAA
```

**Why this matters:** At 11.50:1, navy is the strongest primary colour in the service library. Previous primaries achieved AA (6.29:1–6.65:1). Navy achieves AAA even for small text. This means the ZeroTrade logo in the nav (typically 18–20px), small card labels, and fine-print brokerage tags all pass without special treatment.

### Green `#15803D` (same as bw_service_03, bw_realestate_04)

```
L(green) ≈ 0.1592  (documented in prior builds)
Green on white: (1.05)/(0.1592+0.05) = 1.05/0.2092 = 5.02:1 ✓ AA
```

### Dark `#111827`

```
L(dark) ≈ 0.00770  (documented in prior builds)
Dark on white: (1.05)/(0.00770+0.05) = 1.05/0.0577 = 18.20:1 ✓✓ AAA
```

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|----|-------|-------|-------|
| White `#FFFFFF` | Navy `#1E3A5F` | 11.50:1 | AAA ✓✓ | Buttons, highlighted card text, icon on highlighted |
| Navy `#1E3A5F` | White `#FFFFFF` | 11.50:1 | AAA ✓✓ | Logo, trust badge icons, nav links |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | "You save" line ONLY |
| Dark `#111827` | White `#FFFFFF` | 18.20:1 | AAA ✓✓ | Headings, body, input text |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Traditional fee line, descriptions |
| White `#FFFFFF` | Footer `#030712` | ~20:1 | AAA ✓✓ | TrustBar + footer text |
| White (op 0.8) | Navy `#1E3A5F` | ~9.2:1 | AAA ✓✓ | Description on highlighted card |

---

## Module CSS

### BrokerageCalculator.module.css

```css
/* BrokerageCalculator.module.css */
.calculator {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  max-width: 480px; width: 100%;
  box-shadow: 0 4px 24px rgba(30,58,95,0.08);
}

.heading { font-size: 1.125rem; font-weight: 600; color: var(--color-dark); margin-bottom: 20px; }

.segmentSelect {
  width: 100%; border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 10px 14px;
  font-family: var(--font-sans); font-size: 0.9375rem; color: var(--color-dark);
  margin-bottom: 16px; appearance: none; background: var(--color-white); cursor: pointer;
}
.segmentSelect:focus { outline: none; border-color: var(--color-navy); }

.valueLabel { font-size: 0.875rem; color: var(--color-muted); display: block; margin-bottom: 6px; }

.valueInput {
  width: 100%; border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 10px 14px;
  font-family: var(--font-sans); font-size: 1.125rem;
  color: var(--color-dark); margin-bottom: 20px;
}
.valueInput:focus { outline: none; border-color: var(--color-navy); }

.breakdown {
  background: var(--color-surface); border-radius: 10px;
  padding: 18px; display: flex; flex-direction: column; gap: 12px;
}

.line {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.9375rem;
}
.lineLabel        { color: var(--color-muted); }
.lineBrokerage    { font-weight: 600; color: var(--color-dark); font-size: 1.0625rem; }
.lineTraditional  { font-weight: 600; color: var(--color-muted); }

.lineSavings {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-green);   /* green = money saved — 5.02:1 ✓ */
}
/* SEMANTIC: green ONLY on .lineSavings — never reuse for icons, headings, or card bgs */

.divider { border: none; border-top: 1px solid var(--color-border); margin: 0; }
```

### TradingProducts.module.css

```css
/* TradingProducts.module.css */
.section { padding: 80px 24px; background: var(--color-white); }
.heading { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 600; text-align: center; margin-bottom: 48px; }

.grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; max-width: 1000px; margin: 0 auto;
}
@media (max-width: 900px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px)  { .grid { grid-template-columns: 1fr; } }

.card {
  background: var(--color-white); border: 1.5px solid var(--color-border);
  border-radius: var(--radius-card); padding: 28px 24px;
  transition: box-shadow 0.2s ease;
}
.card:hover { box-shadow: 0 4px 20px rgba(30,58,95,0.1); }

.cardHighlighted {
  background: var(--color-navy);   /* white on navy = 11.50:1 AAA ✓✓ */
  color: var(--color-white);
  border-color: var(--color-navy);
}
/* NEVER: background: var(--color-green) on any card */

.icon      { color: var(--color-navy);  margin-bottom: 14px; }
.iconWhite { color: var(--color-white); margin-bottom: 14px; }

.name        { font-size: 1.0625rem; font-weight: 600; margin-bottom: 6px; }
.description { font-size: 0.875rem; color: var(--color-muted); line-height: 1.6; }
.descMuted   { font-size: 0.875rem; color: var(--color-white); opacity: 0.8; line-height: 1.6; }

.feeTag {
  display: inline-block; margin-top: 14px;
  font-size: 0.8125rem; font-weight: 600;
  color: var(--color-navy);
  background: rgba(30,58,95,0.08);
  padding: 3px 10px; border-radius: 4px;
}
.feeTagWhite {
  display: inline-block; margin-top: 14px;
  font-size: 0.8125rem; font-weight: 600;
  color: var(--color-white);
  background: rgba(255,255,255,0.15);
  padding: 3px 10px; border-radius: 4px;
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
.icon        { color: var(--color-navy); margin-bottom: 10px; }  /* navy on white = 11.50:1 ✓✓ */
.label       { font-size: 0.9375rem; font-weight: 600; color: var(--color-dark); }
.description { font-size: 0.75rem; color: var(--color-muted); margin-top: 4px; }
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden |
|-------------|---------------|
| `orderValue * percentFee` without `Math.min` | Missing flat cap — overcharges large orders |
| `Math.min(flatFee, orderValue * percentFee)` (no `Math.ceil`) | Produces decimal brokerage |
| `brokerage`, `traditionalFee`, or `savings` in `useState` | All derived — synchronisation bugs |
| `var(--color-green)` on product cards or icons | Green = "you save" line only |
| `background: var(--color-green)` anywhere | Not a background colour |
| `formatBrokerageTag(product.flatFee)` one arg | Missing percentFee — TypeScript error |
| Conditional in JSX for brokerage display | Logic belongs in `formatBrokerageTag` |
| `font-weight: 700` | Max 600 |
| `border-radius: 50%` | No circles |
