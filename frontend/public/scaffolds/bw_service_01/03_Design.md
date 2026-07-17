# 03 — Design
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## Colour System

### Brand Colours

| Token | Hex | Use |
|-------|-----|-----|
| `--color-yellow` | `#FFE01B` | Primary brand — dark text ONLY on yellow bg |
| `--color-dark` | `#241C15` | Headings, body text, all text on yellow |
| `--color-white` | `#FFFFFF` | Card backgrounds, nav, page sections |
| `--color-surface` | `#F5F5F5` | Alternate section backgrounds (FeatureShowcase row 2) |
| `--color-yellow-tint` | `#FFFBDC` | Subtle yellow areas, plan card highlight alternative |
| `--color-muted` | `#6B7280` | Secondary metadata, descriptions |
| `--color-border` | `#E5E7EB` | Card borders, dividers |
| `--color-green` | `#15803D` | Feature checkmarks — 5.02:1 on white ✓ |

### globals.css

```css
/* globals.css */
/* NOTE: hex values only appear in :root */
:root {
  --color-yellow:      #FFE01B;
  --color-dark:        #241C15;
  --color-white:       #FFFFFF;
  --color-surface:     #F5F5F5;
  --color-yellow-tint: #FFFBDC;
  --color-muted:       #6B7280;
  --color-border:      #E5E7EB;
  --color-green:       #15803D;
  --font-sans:         'Inter', sans-serif;
  --radius-card:       12px;
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

### Yellow `#FFE01B`

```
RGB: 255, 224, 27

Using sRGB linearization (C > 0.04045: C_lin = ((C/255 + 0.055)/1.055)^2.4):

R = 255/255 = 1.0     → C > 0.04045 → ((1.0 + 0.055)/1.055)^2.4 = 1.0^2.4 = 1.0
G = 224/255 = 0.8784  → ((0.8784 + 0.055)/1.055)^2.4 = (0.8802)^2.4 ≈ 0.7491
B = 27/255  = 0.1059  → ((0.1059 + 0.055)/1.055)^2.4 = (0.1525)^2.4 ≈ 0.01881

L(yellow) = 0.2126 × 1.0 + 0.7152 × 0.7491 + 0.0722 × 0.01881
           = 0.2126 + 0.5358 + 0.001359
           = 0.7497 ≈ 0.749
```

**Contrast ratios:**

| Fg | Bg | Calculation | Ratio |
|----|-----|-------------|-------|
| White on yellow | (1.0+0.05)/(0.749+0.05) | 1.05/0.799 | **1.31:1 ✗✗ FORBIDDEN** |
| Dark on yellow | (0.749+0.05)/(0.01259+0.05) | 0.799/0.06259 | **12.77:1 ✓✓ AAA** |
| Yellow on dark | same calc | 0.799/0.06259 | **12.77:1 ✓✓ AAA** |
| Yellow on white | (1.0+0.05)/(0.749+0.05) | 1.05/0.799 | **1.31:1 ✗✗ FORBIDDEN** |

*(Using L(dark #241C15) ≈ 0.01259 — see Dark section below)*

### Dark `#241C15`

```
RGB: 36, 28, 21

R = 36/255  = 0.1412 → ((0.1412+0.055)/1.055)^2.4 = (0.1860)^2.4 ≈ 0.01764
G = 28/255  = 0.1098 → ((0.1098+0.055)/1.055)^2.4 = (0.1562)^2.4 ≈ 0.01161
B = 21/255  = 0.0824 → ((0.0824+0.055)/1.055)^2.4 = (0.1302)^2.4 ≈ 0.00745

L(dark) = 0.2126 × 0.01764 + 0.7152 × 0.01161 + 0.0722 × 0.00745
         = 0.003749 + 0.008303 + 0.000538
         = 0.01259
```

### Green `#15803D`

```
L(green) ≈ 0.1592  (same as bw_realestate_04 — see that build's guide)

Green on white: (1.05)/(0.1592+0.05) = 1.05/0.2092 = 5.02:1 ✓ AA
Green on surface #F5F5F5: slightly lower — approximately 4.85:1 ✓ (marginal — use white bg)
Green on yellow-tint #FFFBDC: L(yellow-tint) ≈ 0.92 — approximately 3.85:1 ✗
RULE: FeatureCheckmark green must be on white background only, not on yellow-tint
```

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| Dark `#241C15` | Yellow `#FFE01B` | 12.77:1 | AAA ✓✓ | Plan card highlighted, TrustBar text, savings pill text |
| Yellow `#FFE01B` | Dark `#241C15` | 12.77:1 | AAA ✓✓ | Yellow accent on dark footer bg |
| White `#FFFFFF` | Yellow `#FFE01B` | 1.31:1 | FAIL ✗✗ | FORBIDDEN everywhere |
| Yellow `#FFE01B` | White `#FFFFFF` | 1.31:1 | FAIL ✗✗ | FORBIDDEN (logo text on white) |
| Dark `#241C15` | White `#FFFFFF` | ~13.5:1 | AAA ✓✓ | Body text, headings, nav links |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Descriptions, secondary text |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | Feature checkmarks on white bg only |
| White `#FFFFFF` | Dark `#241C15` | ~13.5:1 | AAA ✓✓ | Footer text, CTA button text |

---

## Module CSS

### Button.module.css

```css
/* Button.module.css */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-sans); font-weight: 600; cursor: pointer;
  border: 1.5px solid transparent; transition: opacity 0.15s ease;
  text-decoration: none;
}
.btn:focus-visible { outline: 2px solid var(--color-dark); outline-offset: 2px; }
.btn:hover { opacity: 0.85; }

.sm { padding: 8px 18px; font-size: 0.875rem; border-radius: 6px; }
.md { padding: 12px 26px; font-size: 1rem;    border-radius: 8px; }
.lg { padding: 14px 32px; font-size: 1.0625rem; border-radius: 8px; }

/* Primary — dark bg, white text */
.dark { background: var(--color-dark); color: var(--color-white); }
/* white on dark = 13.5:1 ✓✓ */

/* Outline — dark border and text */
.outlineDark {
  background: transparent;
  color: var(--color-dark);
  border-color: var(--color-dark);
}
/* dark on white = 13.5:1 ✓✓ */

/* Ghost — muted border */
.ghost {
  background: transparent;
  color: var(--color-dark);
  border-color: var(--color-border);
}

/* Highlighted plan CTA — dark button inverted for yellow card context */
/* On yellow card, use .dark variant — dark bg, white text = 13.5:1 ✓✓ */
/* Both dark and outlineDark work on yellow bg — dark button creates contrast-within-contrast */

.fullWidth { width: 100%; }
```

### PlanCard.module.css

```css
/* PlanCard.module.css */
.card {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-card);   /* 12px */
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 20px;
  transition: box-shadow 0.2s ease;
  position: relative;
}
.card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

/* HIGHLIGHTED PLAN — yellow bg, dark text */
.cardHighlighted {
  background: var(--color-yellow);    /* dark text on yellow = 12.77:1 ✓✓ */
  color: var(--color-dark);
  border-color: var(--color-yellow);
  box-shadow: 0 8px 32px rgba(36,28,21,0.15);
}
/* CRITICAL: .cardHighlighted NEVER has color: var(--color-white) */

.badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--color-dark);
  color: var(--color-white);           /* white on dark = 13.5:1 ✓✓ */
  font-size: 0.6875rem; font-weight: 600;
  padding: 4px 12px; border-radius: 4px;
  letter-spacing: 0.05em; text-transform: uppercase;
  white-space: nowrap;
}
/* Note: on yellow card, dark badge provides contrast reversal — intentional */

.planName {
  font-size: 1.125rem; font-weight: 600;
  color: inherit;   /* inherits var(--color-dark) in both variants */
}

.description { font-size: 0.875rem; color: var(--color-muted); }
/* On highlighted card, .description may need opacity: 0.8 since muted on yellow = low contrast */
/* Alternative: color: var(--color-dark); opacity: 0.7; */

.priceBlock { display: flex; flex-direction: column; gap: 4px; }
.price { font-size: 2.25rem; font-weight: 600; color: inherit; line-height: 1; }
.pricePeriod { font-size: 0.8125rem; color: var(--color-muted); }
.savings { font-size: 0.8125rem; font-weight: 600; color: var(--color-dark); }
/* .savings appears conditionally — conditional JSX, not CSS visibility */

.contactsLine { font-size: 0.8125rem; color: var(--color-muted); }

.featureList {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
  flex: 1;
}

.cta { margin-top: auto; }
```

### BillingToggle.module.css

```css
/* BillingToggle.module.css */
.wrapper { display: flex; justify-content: center; margin-bottom: 40px; }

.toggle {
  display: inline-flex;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 5px;
  gap: 4px;
}

.btn {
  padding: 9px 22px;
  border-radius: 7px;
  font-family: var(--font-sans);
  font-size: 0.9375rem; font-weight: 500;
  cursor: pointer; border: none;
  background: transparent; color: var(--color-muted);
  transition: all 0.15s ease;
  display: flex; align-items: center; gap: 8px;
}

.btnActive {
  background: var(--color-white);
  color: var(--color-dark);
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

.savingsPill {
  font-size: 0.6875rem; font-weight: 600;
  background: var(--color-yellow);   /* YELLOW bg — dark text = 12.77:1 ✓✓ */
  color: var(--color-dark);          /* NEVER var(--color-white) on yellow */
  padding: 2px 7px;
  border-radius: 4px;
}
```

### TrustBar.module.css

```css
/* TrustBar.module.css — YELLOW SECTION */
.section {
  background: var(--color-yellow);   /* YELLOW bg */
  padding: 64px 24px;
}

.inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
  text-align: center;
}
@media (max-width: 768px) { .inner { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .inner { grid-template-columns: 1fr; } }

.stat { display: flex; flex-direction: column; align-items: center; gap: 10px; }

.icon { color: var(--color-dark); }   /* dark on yellow = 12.77:1 ✓✓ */

.value {
  font-size: 2.25rem; font-weight: 600;
  color: var(--color-dark);          /* NEVER var(--color-white) */
}

.label {
  font-size: 0.9375rem;
  color: var(--color-dark);
  opacity: 0.75;
  /* Still dark — opacity reduces it visually while staying legible */
}
/* All text is var(--color-dark) — white text on yellow is forbidden (1.31:1 ✗✗) */
```

### FeatureCheckmark.module.css

```css
/* FeatureCheckmark.module.css */
.item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 0.9375rem;
}

.icon {
  color: var(--color-green);         /* green on white = 5.02:1 ✓ */
  flex-shrink: 0;
  margin-top: 2px;
}
/* RULE: FeatureCheckmark must only appear on white card backgrounds */
/* On yellow highlighted card: green on yellow = ~3.85:1 ✗ — use dark check icon instead */

.text { color: inherit; }
```

### FeatureShowcase.module.css

```css
/* FeatureShowcase.module.css */
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  padding: 80px 24px;
  max-width: 1100px; margin: 0 auto;
}
@media (max-width: 768px) { .row { grid-template-columns: 1fr; gap: 32px; } }

.rowAlt { direction: rtl; }
.rowAlt > * { direction: ltr; }
/* rtl trick for alternating layout without duplicating CSS */

.illustration {
  background: var(--color-surface);
  border-radius: 16px;
  aspect-ratio: 4/3;
  border: 1px solid var(--color-border);
  /* Placeholder for actual illustration asset */
}

.icon { color: var(--color-dark); margin-bottom: 16px; }
.title { font-size: 1.5rem; font-weight: 600; margin-bottom: 16px; }
.description { font-size: 1rem; color: var(--color-muted); line-height: 1.7; }

/* Section wrappers for alternating bg */
.sectionWhite   { background: var(--color-white); }
.sectionSurface { background: var(--color-surface); }
```

### PlanGrid.module.css

```css
/* PlanGrid.module.css */
.section { padding: 80px 24px; background: var(--color-white); }

.heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600; text-align: center;
  color: var(--color-dark); margin-bottom: 12px;
}

.subheading {
  font-size: 1.0625rem; text-align: center;
  color: var(--color-muted); margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1100px; margin: 0 auto;
  align-items: start;
}
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .grid { grid-template-columns: 1fr; } }
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden |
|-------------|---------------|
| `color: var(--color-white)` on yellow bg | White on yellow = 1.31:1 ✗✗ |
| `color: var(--color-yellow)` on white bg | Yellow on white = 1.31:1 ✗✗ (logo text) |
| `font-weight: 700` | Max weight 600 |
| `border-radius: 50%` | No circles |
| `display: none` / `visibility: hidden` for savings line | Conditional JSX |
| Hex `#FFE01B` in any `.module.css` | Use `var(--color-yellow)` |
| Green checkmarks on yellow-tint bg | Green on yellow-tint fails (3.85:1) |
| `tier.monthlyPrice` in JSX | Always use `formatPlanPrice(tier, period)` |
