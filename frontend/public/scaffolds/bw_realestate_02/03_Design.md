# 03 — Design
## Indian Property Detail Page · bw_realestate_02

---

## CSS Token System

**File:** `src/app/globals.css`

```css
:root {
  --color-orange:  #E84118;  /* brand — logo, active tabs, CTA buttons, prices (large only) */
  --color-white:   #FFFFFF;  /* default bg, card bg, sidebar bg */
  --color-surface: #F5F5F5;  /* section bg, RERA block bg, score bar track */
  --color-text:    #212121;  /* headings, body copy — also: text ON orange buttons */
  --color-muted:   #666666;  /* metadata, labels, secondary info */
  --color-border:  #E0E0E0;  /* card borders, input borders, tab underline */
  --color-green:   #388E3C;  /* RERA section accent, verified badge, score fills */
  --color-dark:    #1C1C1C;  /* footer bg */
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

## WCAG Contrast Reference

| Foreground | Background | Ratio | Pass? | Usage |
|------------|------------|-------|-------|-------|
| Text `#212121` | Orange `#E84118` | 4.64:1 | ✓ AA | Button text on orange — always dark |
| Orange `#E84118` | White `#FFFFFF` | 4.15:1 | ⚠ borderline | Large text only: prices ≥18px, headings |
| Orange `#E84118` | Surface `#F5F5F5` | ~4.0:1 | ✗ | Avoid orange text on surface bg |
| Text `#212121` | White `#FFFFFF` | ~13:1 | ✓✓ AAA | Titles, body copy |
| Muted `#666666` | White `#FFFFFF` | ~5.7:1 | ✓ AA | Labels, metadata, spec values |
| Green `#388E3C` | White `#FFFFFF` | ~5.9:1 | ✓ AA | RERA heading, Verified badge text |
| Green `#388E3C` | Surface `#F5F5F5` | ~5.7:1 | ✓ AA | RERA block text on surface bg |
| White `#FFFFFF` | Dark `#1C1C1C` | ~16.5:1 | ✓✓ AAA | Footer text |
| White `#FFFFFF` | Orange `#E84118` | 4.15:1 | ✗ normal text | Never for body copy — large text only |

**Key constraint:** White on orange `#E84118` = 4.15:1 — fails WCAG AA for normal text (4.5:1 threshold). Use `color: var(--color-text)` (#212121) on all orange buttons. Orange text on white permitted only for large bold elements (≥18.66px = 14pt bold, or ≥24px = 18pt regular).

---

## Border-Radius System

| Element | Radius | Notes |
|---------|--------|-------|
| PropertyGallery hero image | `0` | Full-bleed, no radius |
| Thumbnails | `4px` | Small image previews |
| PropertyCard / SimilarPropertyCard | `8px` | Standard card |
| RERASection block | `8px` | Matches card radius |
| SidebarPanel | `8px` | Matches card radius |
| Score bars (walk/transit) | `4px` | Short bars |
| All buttons | `6px` | Slightly more than bw_01 (4px) |
| Input fields | `4px` | Form inputs |
| Badges (Verified, RERA, Source) | `4px` | Small badges |
| `border-radius: 50%` | — | FORBIDDEN — no circles |
| `border-radius: 20px` | — | FORBIDDEN — no pills in this build |

---

## Shadow System

| Element | Shadow | Notes |
|---------|--------|-------|
| SidebarPanel | `0 2px 8px rgba(0,0,0,0.08)` | Card lift |
| SiteNav (scrolled) | `0 2px 8px rgba(0,0,0,0.08)` | Same as sidebar |
| All other elements | No shadow | Border-only |

Only 2 elements cast shadows in this build. `grep -r "box-shadow" src/components --include="*.module.css"` → SidebarPanel and SiteNav only.

---

## Component CSS Specifications

### Button.module.css
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 6px; font-family: var(--font-sans); font-weight: 600;
  cursor: pointer; text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  border: none; white-space: nowrap;
}
.md { padding: 12px 24px; font-size: 1rem; }
.sm { padding: 8px 16px; font-size: 0.875rem; }
.fullWidth { width: 100%; }

.primary { background: var(--color-orange); color: var(--color-text); }
/* #212121 on #E84118 = 4.64:1 ✓ AA — NEVER var(--color-white) on orange */
.primary:hover { opacity: 0.9; }

.outlineOrange {
  background: transparent; color: var(--color-orange);
  border: 1.5px solid var(--color-orange);
}
.outlineOrange:hover { background: var(--color-orange); color: var(--color-text); }
/* hover: dark on orange = 4.64:1 ✓ */
```

### SiteNav.module.css
```css
.nav {
  background: var(--color-white); position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid var(--color-border);
}
.navScrolled { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.inner {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; gap: 32px; height: 64px;
}
.logo { color: var(--color-orange); font-size: 1.5rem; font-weight: 600; text-decoration: none; }
.links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; flex: 1; }
.link { color: var(--color-text); font-size: 0.9375rem; font-weight: 500; text-decoration: none; }
.link:hover { color: var(--color-orange); }
```

### Breadcrumb.module.css
```css
.breadcrumb {
  max-width: 1280px; margin: 0 auto; padding: 12px 24px;
  display: flex; gap: 6px; align-items: center; flex-wrap: wrap;
}
.crumb { font-size: 0.8125rem; color: var(--color-muted); text-decoration: none; }
.crumb:hover { color: var(--color-orange); }
.crumbActive { font-size: 0.8125rem; color: var(--color-text); font-weight: 500; }
.sep { color: var(--color-muted); font-size: 0.75rem; }
```

### PropertyGallery.module.css
```css
.gallery { background: var(--color-dark); position: relative; }
.heroWrap { position: relative; max-height: 480px; overflow: hidden; }
.hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 0; display: block; }
.photoCount {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.6); color: var(--color-white);
  font-size: 0.8125rem; padding: 4px 10px; border-radius: 4px;
  display: flex; align-items: center; gap: 6px;
}
.thumbStrip {
  display: flex; gap: 8px; padding: 8px 24px;
  background: rgba(0,0,0,0.8); overflow-x: auto;
  scrollbar-width: none;
}
.thumbStrip::-webkit-scrollbar { display: none; }
.thumb {
  width: 80px; flex-shrink: 0; aspect-ratio: 16/9; object-fit: cover;
  border-radius: 4px; border: 2px solid transparent; cursor: pointer;
  transition: border-color 0.15s;
}
.thumbActive { border-color: var(--color-orange); }
```

### PropertyHeader.module.css
```css
.header { padding: 24px 0; border-bottom: 1px solid var(--color-border); }
.badgeRow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
.title { font-size: 1.5rem; font-weight: 600; color: var(--color-text); margin: 0 0 8px; line-height: 1.3; }
.priceRow { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
.price { font-size: 1.75rem; font-weight: 600; color: var(--color-orange); }
/* orange on white at 1.75rem (≥18px bold) = 4.15:1 — passes large-text threshold ✓ */
.pricePerSqft { font-size: 0.875rem; color: var(--color-muted); }
.specsGrid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  padding: 20px; background: var(--color-surface); border-radius: 8px;
}
.spec { display: flex; flex-direction: column; gap: 4px; }
.specLabel { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted); }
.specValue { font-size: 0.9375rem; font-weight: 600; color: var(--color-text); }
@media (max-width: 768px) { .specsGrid { grid-template-columns: repeat(2, 1fr); } }
```

### PropertyTabs.module.css
```css
.tabs {
  display: flex; border-bottom: 1px solid var(--color-border);
  overflow-x: auto; scrollbar-width: none;
}
.tabs::-webkit-scrollbar { display: none; }
.tab {
  padding: 14px 20px; font-size: 0.9375rem; font-weight: 500; font-family: var(--font-sans);
  color: var(--color-muted); background: transparent; border: none; cursor: pointer;
  border-bottom: 3px solid transparent; transition: color 0.15s, border-color 0.15s;
  white-space: nowrap; flex-shrink: 0;
}
.tabActive { color: var(--color-orange); border-bottom-color: var(--color-orange); }
.tabPanel { padding: 24px 0; }
```

### RERASection.module.css
```css
.section {
  border-left: 4px solid var(--color-green);
  border-radius: 8px; background: var(--color-surface);
  padding: 20px 24px; margin: 24px 0;
}
.heading {
  display: flex; align-items: center; gap: 8px;
  color: var(--color-green); font-size: 1rem; font-weight: 600;
  margin: 0 0 16px;
}
/* green on surface = ~5.7:1 ✓ */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.item { display: flex; flex-direction: column; gap: 4px; }
.itemLabel { font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.itemValue { font-size: 0.9375rem; font-weight: 600; color: var(--color-text); word-break: break-all; }
.portal {
  display: inline-flex; align-items: center; gap: 4px; margin-top: 16px;
  color: var(--color-green); font-size: 0.875rem; font-weight: 500;
  text-decoration: none;
}
.portal:hover { text-decoration: underline; }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr 1fr; } }
```

### LocalityTab.module.css
```css
.section { display: flex; flex-direction: column; gap: 24px; }
.scoreRow { display: flex; gap: 32px; }
.score { display: flex; flex-direction: column; gap: 8px; }
.scoreLabel { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
.scoreValue { font-size: 1.5rem; font-weight: 600; color: var(--color-orange); }
/* orange on white at 1.5rem (large text) — 4.15:1 passes large-text threshold */
.bar { height: 8px; background: var(--color-border); border-radius: 4px; width: 200px; }
.barFill { height: 100%; background: var(--color-green); border-radius: 4px; }
.placesGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.place {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border: 1px solid var(--color-border); border-radius: 8px;
}
.placeIcon { color: var(--color-orange); flex-shrink: 0; }
.placeName { font-size: 0.875rem; font-weight: 500; color: var(--color-text); }
.placeDistance { font-size: 0.8125rem; color: var(--color-muted); }
```

### SidebarPanel.module.css
```css
.panel {
  background: var(--color-white); border: 1px solid var(--color-border);
  border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}
.toggle {
  display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--color-border);
}
.toggleBtn {
  padding: 14px; font-size: 0.875rem; font-weight: 500; font-family: var(--font-sans);
  background: transparent; border: none; cursor: pointer;
  color: var(--color-muted); transition: color 0.15s, background 0.15s;
}
.toggleBtnActive { color: var(--color-orange); background: var(--color-surface); }
.body { padding: 20px; }
```

### EMICalculator.module.css
```css
.form { display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 0.8125rem; font-weight: 600; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.input {
  padding: 10px 14px; border: 1.5px solid var(--color-border);
  border-radius: 4px; font-family: var(--font-sans); font-size: 0.9375rem;
  color: var(--color-text); background: var(--color-white); outline: none;
}
.input:focus { border-color: var(--color-orange); }
.result { margin-top: 8px; padding: 16px; background: var(--color-surface); border-radius: 8px; }
.resultLabel { font-size: 0.8125rem; color: var(--color-muted); margin-bottom: 4px; }
.resultValue { font-size: 1.5rem; font-weight: 600; color: var(--color-orange); }
/* large text ≥18px — 4.15:1 passes large-text AA threshold */
```

### SimilarPropertyCard.module.css
```css
.card {
  background: var(--color-white); border-radius: 8px;
  border: 1px solid var(--color-border); overflow: hidden;
  transition: border-color 0.15s;
}
.card:hover { border-color: var(--color-orange); }
.imageBlock { aspect-ratio: 16/9; background: var(--color-surface); position: relative; }
.content { padding: 12px; display: flex; flex-direction: column; gap: 6px; }
.title { font-size: 0.875rem; font-weight: 600; color: var(--color-text); line-height: 1.4; }
.price { font-size: 1.125rem; font-weight: 600; color: var(--color-orange); }
/* 1.125rem = 18px — on the large-text border. Use at this size only. */
.meta { font-size: 0.8125rem; color: var(--color-muted); }
.cta { margin-top: 4px; }
```

---

## Anti-Patterns Table

| Anti-Pattern | Wrong | Correct |
|-------------|-------|---------|
| White text on orange button | `color: var(--color-white)` on `.primary` | `color: var(--color-text)` — 4.64:1 ✓ |
| RERA as badge only | `<ReraBadge />` with no section | `<ReraBadge />` in header + `<RERASection />` block |
| Tab hiding with CSS | `display: activeTab === 'overview' ? 'block' : 'none'` | Conditional JSX — unmount/mount |
| Raw price display | `₹12,000,000` | `formatPrice(12_000_000)` → `₹1.20 Cr` |
| EMI lookup table | Pre-computed EMI values | `Math.round(P×r×(1+r)^n/((1+r)^n−1))` |
| Hardcoded CTA | `Contact Builder` | `Contact ${property.listingSource}` |
| Orange text on surface | `color: var(--color-orange)` at 12px on surface | Use `var(--color-text)` for small text |
| Orange on surface for any text | Small orange labels on surface bg | Orange only on white, and only large |
| Pill-radius chips | `border-radius: 20px` | No filter chips in this build |
| Circular elements | `border-radius: 50%` | No circles in this build |
| Font-weight 700 | Bold headings | Max weight 600 |
| Hex in module.css | `color: #E84118` | `color: var(--color-orange)` |
| RERASection inside a tab | RERA hidden when user switches tab | RERASection always-visible, below tabs |
| RERA as a modal | Full-screen RERA overlay | Inline section block |
| EMI result as raw number | `78152` | `formatPrice(78152)` → `₹78,152/mo` |
| Score bars as circles | `border-radius: 50%` pill-bar ends | `border-radius: 4px` straight bars |
