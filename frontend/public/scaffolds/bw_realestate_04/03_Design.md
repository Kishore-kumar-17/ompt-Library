# 03 — Design
## Modern Indian Rental Discovery · bw_realestate_04

---

## Colour System

### Brand Colours

| Token | Hex | Use |
|-------|-----|-----|
| `--color-purple` | `#6C3CE1` | Primary brand, buttons, active chips, header accent |
| `--color-green` | `#15803D` | Savings, ZeroBrokerageBadge, OwnerVerifiedBadge |
| `--color-white` | `#FFFFFF` | Button text on purple, card backgrounds |
| `--color-surface` | `#F8F7FF` | Page background (purple-tinted) |
| `--color-text` | `#1A1033` | Body text (purple-undertone near-black) |
| `--color-muted` | `#6B7280` | Secondary metadata |
| `--color-border` | `#E5E7EB` | Card borders, dividers |
| `--color-dark` | `#0D0B14` | Footer, TrustBar (dark purple-black) |

### globals.css

```css
/* globals.css */
/* NOTE: hex values only appear in :root and the HeroSection gradient */
:root {
  --color-purple:  #6C3CE1;
  --color-green:   #15803D;
  --color-white:   #FFFFFF;
  --color-surface: #F8F7FF;
  --color-text:    #1A1033;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-dark:    #0D0B14;
  --font-sans:     'Plus Jakarta Sans', sans-serif;
  --radius-card:   10px;
  --radius-chip:   20px;
}

*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: var(--font-sans);
  background: var(--color-surface);
  color: var(--color-text);
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

### Purple `#6C3CE1`

```
RGB: 108, 60, 225
R_lin = (108/255)^2.2 ≈ 0.1384
G_lin = (60/255)^2.2  ≈ 0.0468
B_lin = (225/255)^2.2 ≈ 0.7683
L(purple) = 0.2126×0.1384 + 0.7152×0.0468 + 0.0722×0.7683
          = 0.0294 + 0.0335 + 0.0555 = 0.1184

White on purple:
(1.0 + 0.05) / (0.1184 + 0.05) = 1.05 / 0.1684 = 6.23:1 ✓ AA
```

**Purple usage rules:**
- Purple bg → white text ✓ (primary buttons, active filter chips, BrokerSavingsStrip)
- Purple text on white → `(1.0 + 0.05) / (0.1184 + 0.05) = 6.23:1` ✓ (outline buttons, logo)
- Purple text on surface `#F8F7FF` → approximately 6.1:1 ✓

### Green `#15803D`

```
RGB: 21, 128, 61
R_lin = (21/255)^2.2  ≈ 0.0055
G_lin = (128/255)^2.2 ≈ 0.2158
B_lin = (61/255)^2.2  ≈ 0.0497
L(green) = 0.2126×0.0055 + 0.7152×0.2158 + 0.0722×0.0497
         = 0.0012 + 0.1544 + 0.0036 = 0.1592

Green on white:
(1.0 + 0.05) / (0.1592 + 0.05) = 1.05 / 0.2092 = 5.02:1 ✓ AA
```

**Green usage rules:**
- Green text on white ✓ (ZeroBrokerageBadge text, OwnerVerifiedBadge text)
- Green text on surface `#F8F7FF` → approximately 4.9:1 ✓ (marginal — use white bg for badges)
- White on green bg: `(1.0 + 0.05) / (0.1592 + 0.05) = 5.02:1` ✓ (green buttons if used)
- Green ONLY for savings/verification semantics — not general UI

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Purple `#6C3CE1` | 6.23:1 | AA ✓ | Primary buttons, active chips, strip text |
| Purple `#6C3CE1` | White `#FFFFFF` | 6.23:1 | AA ✓ | Logo, outline button text, purple text |
| Purple `#6C3CE1` | Surface `#F8F7FF` | ~6.1:1 | AA ✓ | Purple text on page background |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | ZeroBrokerageBadge, OwnerVerifiedBadge |
| Dark `#1A1033` | White `#FFFFFF` | ~14.5:1 | AAA ✓✓ | Body, titles, card text |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Metadata (locality, floor, area) |
| White `#FFFFFF` | Dark `#0D0B14` | ~18:1 | AAA ✓✓ | Footer, TrustBar |

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
.btn:focus-visible { outline: 2px solid var(--color-purple); outline-offset: 2px; }
.btn:hover { opacity: 0.88; }

/* size variants */
.sm  { padding: 8px 16px; font-size: 0.875rem; border-radius: 6px; }
.md  { padding: 12px 24px; font-size: 1rem; border-radius: 8px; }

/* colour variants */
.purple       { background: var(--color-purple); color: var(--color-white); }
/* white on purple = 6.23:1 ✓ */

.outlinePurple {
  background: transparent;
  color: var(--color-purple);
  border-color: var(--color-purple);
}
/* purple on white = 6.23:1 ✓ */

.ghost {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

/* full width */
.fullWidth { width: 100%; }
```

### ZeroBrokerageBadge.module.css

```css
/* ZeroBrokerageBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green);       /* 5.02:1 on white ✓ */
  border: 1px solid var(--color-green);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: transparent;
}
/* SEMANTIC: green = savings/zero-brokerage only */
```

### OwnerVerifiedBadge.module.css

```css
/* OwnerVerifiedBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 3px;
  color: var(--color-green);       /* 5.02:1 on white ✓ */
  font-size: 0.6875rem;
  font-weight: 600;
}
/* Different component from ZeroBrokerageBadge — no border, inline with owner name */
```

### PetFriendlyBadge.module.css

```css
/* PetFriendlyBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 3px;
  color: var(--color-purple);      /* 6.23:1 on white ✓ */
  font-size: 0.6875rem;
  font-weight: 500;
}
```

### RentalPropertyCard.module.css

```css
/* RentalPropertyCard.module.css */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);  /* 10px */
  overflow: hidden;
}
/* CRITICAL: --radius-card is 10px — not 8px (bw_01/02) nor 12px (bw_03) */

.imageBlock {
  position: relative;
  background: var(--color-border);
  height: 200px;
}

.badgeRow {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  margin-bottom: 8px;
}

.content { padding: 16px; }

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 4px;
}

.rentRow {
  display: flex; align-items: baseline; gap: 8px;
  margin: 8px 0;
}

.rent {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-purple);
}

.deposit {
  font-size: 0.8125rem;
  color: var(--color-muted);
}
/* deposit displayed as ₹{deposit.toLocaleString('en-IN')} — NOT formatPrice */

.meta {
  font-size: 0.8125rem;
  color: var(--color-muted);
  display: flex; align-items: center; gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.availRow {
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 12px;
  font-size: 0.8125rem;
}

.availLabel { color: var(--color-muted); }
.availDate  { color: var(--color-text); font-weight: 500; }

.ownerBlock {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  margin-top: 4px;
}
```

### OwnerProfileSnippet.module.css

```css
/* OwnerProfileSnippet.module.css */
.snippet {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px;
}

.left {
  display: flex; align-items: center; gap: 6px;
}

.ownerPhoto {
  width: 32px; height: 32px;
  border-radius: 8px;            /* NOT 50% */
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.ownerName {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.responseTime {
  font-size: 0.75rem;
  color: var(--color-muted);
}
```

### BrokerSavingsStrip.module.css

```css
/* BrokerSavingsStrip.module.css */
.strip {
  background: var(--color-purple);  /* white text on purple = 6.23:1 ✓ */
  padding: 14px 24px;
  text-align: center;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  flex-wrap: wrap;
}

.text {
  color: var(--color-white);
  font-size: 0.9375rem;
  font-weight: 600;
}

.savings {
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 600;
  /* decorative large savings amount — always white on purple */
}
```

### BrokerSavingsWidget.module.css

```css
/* BrokerSavingsWidget.module.css */
.widget {
  background: var(--color-white);
  border: 2px solid var(--color-purple);
  border-radius: 12px;
  padding: 24px;
}

.heading {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px;
}

.label {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 6px;
}

.input {
  width: 100%;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 16px;
}
.input:focus { outline: none; border-color: var(--color-purple); }

.result {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.savingsAmount {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-green);   /* savings = green */
  display: block;
}

.savingsLabel {
  font-size: 0.875rem;
  color: var(--color-muted);
}
```

### RentalFilterBar.module.css

```css
/* RentalFilterBar.module.css */
.bar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 24px;
  position: sticky;
  top: 64px;
  z-index: 90;
}

.inner {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  max-width: 1200px; margin: 0 auto;
}

.group {
  display: flex; align-items: center; gap: 6px;
}

.groupLabel {
  font-size: 0.75rem;
  color: var(--color-muted);
  font-weight: 500;
  white-space: nowrap;
}

.chip {
  border: 1.5px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  border-radius: var(--radius-chip);  /* 20px */
  padding: 6px 14px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.chipActive {
  background: var(--color-purple);
  color: var(--color-white);         /* 6.23:1 ✓ */
  border-color: var(--color-purple);
}

.chip:focus-visible { outline: 2px solid var(--color-purple); outline-offset: 2px; }

.maxRentInput {
  border: 1.5px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 10px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  width: 100px;
  color: var(--color-text);
}
.maxRentInput:focus { outline: none; border-color: var(--color-purple); }

.clearBtn {
  background: transparent;
  border: none;
  color: var(--color-muted);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 6px 8px;
  text-decoration: underline;
}
```

### HeroSection.module.css

```css
/* HeroSection.module.css */
.hero {
  background: linear-gradient(135deg, #6C3CE1 0%, #3D1FA3 100%);
  /* hex allowed in gradient — CSS variables cannot be used in gradient colour stops */
  padding: 80px 24px 48px;
  color: var(--color-white);
}

.heading {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  color: var(--color-white);
  text-align: center;
  margin: 0 0 16px;
}

.subheading {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-white);
  text-align: center;
  opacity: 0.9;
  margin: 0 0 40px;
}

.widget {
  background: var(--color-white);
  border-radius: 12px;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto 32px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
}

.select, .input {
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--color-text);
  flex: 1;
}
.select:focus, .input:focus { outline: none; border-color: var(--color-purple); }
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden |
|-------------|---------------|
| `formatPrice(property.deposit)` | Appends `/mo` — deposit is one-time, not monthly |
| `color: var(--color-white)` on purple text outside bg | Unclear — ensure purple/green text always on white/surface bg |
| `listingSource` field on `RentalProperty` | Owner-only — no agent/builder source |
| `"Contact Agent"` as any CTA | Zero-brokerage positioning — always "Contact Owner" |
| `border-radius: 50%` | No circles — owner photos are 8px rect |
| `font-weight: 700` | Max weight for Plus Jakarta Sans is 600 in this design system |
| `var(--color-green)` for non-savings UI | Green = savings only — dilutes the semantic |
