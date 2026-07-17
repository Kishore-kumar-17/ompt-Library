# 03 — Design
## Indian Web Agency Directory · bw_service_02

---

## Colour System

| Token | Hex | Use |
|-------|-----|-----|
| `--color-indigo` | `#4F46E5` | Primary brand — white on indigo = 6.29:1 ✓ |
| `--color-amber` | `#D97706` | Premier badge, star icon — dark on amber = 6.31:1 ✓ |
| `--color-dark` | `#0F0F23` | Body text, headings — near-black, blue undertone |
| `--color-white` | `#FFFFFF` | Card bg, nav bg, page bg |
| `--color-surface` | `#F5F5FF` | Page background (blue-tinted), spec tag fill |
| `--color-muted` | `#6B7280` | Secondary text, review counts, meta |
| `--color-border` | `#E5E7EB` | Card borders, dividers |
| `--color-footer` | `#070715` | Footer + TrustBar bg — deep dark |

### globals.css

```css
:root {
  --color-indigo:  #4F46E5;
  --color-amber:   #D97706;
  --color-dark:    #0F0F23;
  --color-white:   #FFFFFF;
  --color-surface: #F5F5FF;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #070715;
  --font-sans:     'Space Grotesk', sans-serif;
  --radius-card:   12px;
}

*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: var(--font-sans);
  background: var(--color-surface);
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

### Indigo `#4F46E5`

```
RGB: 79, 70, 229

R = 79/255  = 0.3098 → ((0.3098+0.055)/1.055)^2.4 = (0.3460)^2.4 ≈ 0.0782
G = 70/255  = 0.2745 → ((0.2745+0.055)/1.055)^2.4 = (0.3123)^2.4 ≈ 0.0612
B = 229/255 = 0.8980 → ((0.8980+0.055)/1.055)^2.4 = (0.9033)^2.4 ≈ 0.7836

L(indigo) = 0.2126×0.0782 + 0.7152×0.0612 + 0.0722×0.7836
           = 0.01662 + 0.04377 + 0.05658
           = 0.1170

White on indigo: (1.0+0.05)/(0.1170+0.05) = 1.05/0.167 = 6.29:1 ✓ AA
Indigo on white: same = 6.29:1 ✓ AA
```

### Amber `#D97706`

```
RGB: 217, 119, 6

R = 217/255 = 0.8510 → ((0.8510+0.055)/1.055)^2.4 = (0.8590)^2.4 ≈ 0.7033
G = 119/255 = 0.4667 → ((0.4667+0.055)/1.055)^2.4 = (0.4947)^2.4 ≈ 0.2122
B = 6/255   = 0.0235 → ((0.0235+0.055)/1.055)^2.4 = (0.0744)^2.4 ≈ 0.00461

L(amber) = 0.2126×0.7033 + 0.7152×0.2122 + 0.0722×0.00461
          = 0.14952 + 0.15175 + 0.000333
          = 0.3016 ≈ 0.301

White on amber: (1.0+0.05)/(0.301+0.05) = 1.05/0.351 = 2.99:1 ✗ FAIL
Dark on amber:  (0.301+0.05)/(L(dark)+0.05)
```

### Dark `#0F0F23`

```
RGB: 15, 15, 35

R = 15/255  = 0.0588 → ((0.0588+0.055)/1.055)^2.4 = (0.1079)^2.4 ≈ 0.00481
G = 15/255  = same   ≈ 0.00481
B = 35/255  = 0.1373 → ((0.1373+0.055)/1.055)^2.4 = (0.1823)^2.4 ≈ 0.01697

L(dark) = 0.2126×0.00481 + 0.7152×0.00481 + 0.0722×0.01697
         = 0.001022 + 0.003441 + 0.001225
         = 0.005688 ≈ 0.00569

Dark on amber: (0.301+0.05)/(0.00569+0.05) = 0.351/0.05569 = 6.30:1 ✓ AA
```

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Indigo `#4F46E5` | 6.29:1 | AA ✓ | Expert badge, active chips, indigo buttons |
| Indigo `#4F46E5` | White `#FFFFFF` | 6.29:1 | AA ✓ | Certified badge text, logo, indigo text |
| Dark `#0F0F23` | Amber `#D97706` | 6.30:1 | AA ✓ | Premier badge text, amber-bg elements |
| White `#FFFFFF` | Amber `#D97706` | 2.99:1 | FAIL ✗ | FORBIDDEN on amber bg |
| Dark `#0F0F23` | White `#FFFFFF` | ~17.5:1 | AAA ✓✓ | Body text, headings |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Review counts, meta |
| Indigo `#4F46E5` | Surface `#F5F5FF` | ~6.1:1 | AA ✓ | Indigo text on surface bg |
| White `#FFFFFF` | Footer `#070715` | ~19:1 | AAA ✓✓ | Footer, TrustBar text |

---

## Module CSS

### Button.module.css

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-sans); font-weight: 600; cursor: pointer;
  border: 1.5px solid transparent; transition: opacity 0.15s;
  text-decoration: none;
}
.btn:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }
.btn:hover { opacity: 0.85; }

.sm { padding: 8px 18px; font-size: 0.875rem; border-radius: 6px; }
.md { padding: 11px 24px; font-size: 1rem;    border-radius: 8px; }

.indigo       { background: var(--color-indigo); color: var(--color-white); }
/* white on indigo = 6.29:1 ✓ */
.outlineIndigo {
  background: transparent;
  color: var(--color-indigo);
  border-color: var(--color-indigo);
}
/* indigo on white = 6.29:1 ✓ */
.ghost {
  background: transparent;
  color: var(--color-dark);
  border-color: var(--color-border);
}
.fullWidth { width: 100%; }
```

### TierBadge.module.css

```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.6875rem; font-weight: 600;
  padding: 3px 9px; border-radius: 4px;
  letter-spacing: 0.03em; white-space: nowrap;
}

/* Certified — indigo outline, transparent bg */
.certified {
  color: var(--color-indigo);           /* indigo on white = 6.29:1 ✓ */
  border: 1px solid var(--color-indigo);
  background: transparent;
}

/* Expert — indigo fill, white text */
.expert {
  background: var(--color-indigo);
  color: var(--color-white);            /* white on indigo = 6.29:1 ✓ */
  border: 1px solid var(--color-indigo);
}

/* Premier — amber fill, DARK text */
.premier {
  background: var(--color-amber);
  color: var(--color-dark);             /* dark on amber = 6.30:1 ✓ */
  border: 1px solid var(--color-amber);
}
/* CRITICAL: .premier NEVER sets color: var(--color-white) — white on amber = 2.99:1 ✗ */
```

### StarRating.module.css

```css
.rating {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.875rem;
}
.star { color: var(--color-amber); }
/* Star is a decorative icon — rating number in dark text provides the accessible value */
.value { font-weight: 600; color: var(--color-dark); }
.count { color: var(--color-muted); }
```

### SpecTag.module.css

```css
.tag {
  display: inline-block;
  background: var(--color-surface);
  color: var(--color-dark);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 3px 9px;
  font-size: 0.75rem; font-weight: 500;
  white-space: nowrap;
}
```

### AgencyCard.module.css

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  display: flex; flex-direction: column;
}
.card:hover {
  box-shadow: 0 4px 24px rgba(79,70,229,0.12);
  border-color: var(--color-indigo);
}
/* hover shadow uses rgba for indigo-tinted shadow — acceptable */

.imageBlock {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, var(--color-surface), var(--color-border));
  /* gradient using tokens — no hex */
  flex-shrink: 0;
}

/* Featured strip — conditional JSX renders this */
.featuredStrip {
  position: absolute; top: 12px; left: 12px;
  background: var(--color-indigo);
  color: var(--color-white);            /* white on indigo = 6.29:1 ✓ */
  font-size: 0.6875rem; font-weight: 600;
  padding: 3px 10px; border-radius: 4px;
  letter-spacing: 0.04em; text-transform: uppercase;
}

.body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 10px; }

.topRow { display: flex; align-items: flex-start; justify-content: space-between; }
.name { font-size: 1.0625rem; font-weight: 600; color: var(--color-dark); line-height: 1.3; }
.tagline { font-size: 0.875rem; color: var(--color-muted); line-height: 1.5; }

.specRow { display: flex; flex-wrap: wrap; gap: 6px; }

.statsRow {
  display: flex; gap: 16px; padding-top: 10px;
  border-top: 1px solid var(--color-border);
  font-size: 0.8125rem; color: var(--color-muted);
  flex-wrap: wrap;
}
.statValue { font-weight: 600; color: var(--color-dark); }

.budgetLine {
  font-size: 0.9375rem; font-weight: 600;
  color: var(--color-indigo);           /* indigo on white = 6.29:1 ✓ */
}

.cta { margin-top: auto; padding-top: 14px; }
```

### AgencyGrid.module.css

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px; margin: 0 auto;
  padding: 32px 24px;
}
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .grid { grid-template-columns: 1fr; } }

.empty {
  grid-column: 1 / -1;
  text-align: center; padding: 60px 24px;
  color: var(--color-muted); font-size: 1rem;
}
```

### AgencyFilterBar.module.css

```css
.bar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.inner {
  max-width: 1200px; margin: 0 auto; padding: 14px 24px;
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}

.searchWrapper { position: relative; flex: 1; min-width: 220px; }
.searchIcon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--color-muted); pointer-events: none; }
.searchInput {
  width: 100%; border: 1.5px solid var(--color-border);
  border-radius: 8px; padding: 9px 14px 9px 36px;
  font-family: var(--font-sans); font-size: 0.9375rem; color: var(--color-dark);
  background: var(--color-white);
}
.searchInput:focus { outline: none; border-color: var(--color-indigo); }
.searchInput::placeholder { color: var(--color-muted); }

.select {
  border: 1.5px solid var(--color-border); border-radius: 8px;
  padding: 9px 32px 9px 12px; font-family: var(--font-sans);
  font-size: 0.875rem; color: var(--color-dark); background: var(--color-white);
  appearance: none; cursor: pointer;
}
.select:focus { outline: none; border-color: var(--color-indigo); }

.chip {
  border: 1.5px solid var(--color-border); border-radius: 20px;
  padding: 6px 14px; font-family: var(--font-sans);
  font-size: 0.8125rem; font-weight: 500; cursor: pointer;
  background: var(--color-white); color: var(--color-dark);
  transition: all 0.15s ease; white-space: nowrap;
}
.chipActive {
  background: var(--color-indigo); color: var(--color-white);
  border-color: var(--color-indigo);
}
/* white on indigo = 6.29:1 ✓ */
.chip:focus-visible { outline: 2px solid var(--color-indigo); outline-offset: 2px; }

.clearBtn {
  background: transparent; border: none;
  color: var(--color-muted); font-family: var(--font-sans);
  font-size: 0.8125rem; cursor: pointer; text-decoration: underline;
  padding: 6px 8px;
}
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden |
|-------------|---------------|
| `color: var(--color-white)` on amber bg | 2.99:1 ✗ — Premier badge must use dark text |
| `agency.budgetMin` in JSX | Use `formatBudgetRange(agency)` |
| Budget range math in `filterAgencies` | Use `a.budgetCategory` string compare |
| Sort in component after `useMemo` | Encapsulate sort in `filterAgencies` |
| `font-weight: 700` | Max 600 |
| `border-radius: 50%` | No circles |
| Hex in `.module.css` | Tokens only |
