# 03 — Design
## Indian Property Listing Portal · bw_realestate_01

---

## CSS Token System

**File:** `src/app/globals.css`

```css
:root {
  --color-red:     #E03228;  /* brand — logo, active tabs, CTA buttons, prices */
  --color-white:   #FFFFFF;  /* default bg, card bg, button text on red */
  --color-surface: #F4F5F7;  /* section bg, filter chip bg, image placeholders */
  --color-text:    #2D2D2D;  /* headings, property titles, primary body */
  --color-muted:   #717171;  /* area, floor, posted date, secondary info */
  --color-border:  #E0E0E0;  /* card borders, input borders, dividers */
  --color-green:   #1A7A3A;  /* verified badge text/icon, RERA badge, success */
  --color-dark:    #1A1A1A;  /* footer bg, dark section backgrounds */
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
| White `#FFFFFF` | Red `#E03228` | 4.51:1 | ✓ AA | Primary buttons, active chips |
| Red `#E03228` | White `#FFFFFF` | 4.51:1 | ✓ AA | Prices, outline button text, logo |
| Red `#E03228` | Surface `#F4F5F7` | ~4.3:1 | ⚠ borderline | Avoid small red text on surface |
| Text `#2D2D2D` | White `#FFFFFF` | ~12:1 | ✓✓ AAA | Card titles, body copy |
| Muted `#717171` | White `#FFFFFF` | ~4.7:1 | ✓ AA | Metadata (sqft, floor, date) |
| Green `#1A7A3A` | White `#FFFFFF` | ~7.8:1 | ✓✓ AAA | Verified text, RERA text |
| White `#FFFFFF` | Dark `#1A1A1A` | ~16:1 | ✓✓ AAA | Footer text |
| White `#FFFFFF` | Green `#1A7A3A` | ~7.8:1 | ✓✓ AAA | White text on green would pass, but green-bg badges not used |

**Key constraint:** Red `#E03228` with white text = 4.51:1. This JUST passes AA. Use for large-text elements (buttons ≥ 14px, price headings). Do NOT use red for body-copy-size text (12px or smaller) — that would fail.

---

## Border-Radius System

| Element | Radius | Notes |
|---------|--------|-------|
| HeroSearchWidget card | `12px` | Hero widget — most prominent surface |
| Property image (top) | `8px 8px 0 0` | Card image rounds only top corners |
| PropertyCard | `8px` | Standard card radius |
| FeaturedProject cards | `8px` | Consistent with property cards |
| All buttons | `4px` | Clinical precision — form elements |
| Filter chips | `20px` | Pill — tag/chip style |
| Badges (Verified, RERA, Source) | `4px` | Small rectangular badge |
| Input fields | `4px` | Match button radius |
| Possession badge on image | `4px` | Overlay badge |
| No `border-radius: 50%` | — | No circular elements |

---

## Shadow System

| Element | Shadow | Notes |
|---------|--------|-------|
| HeroSearchWidget | `0 4px 24px rgba(0,0,0,0.12)` | Hero prominence — strongest shadow |
| PropertyCard | `0 2px 8px rgba(0,0,0,0.08)` | Subtle card lift |
| SiteNav (on scroll) | `0 2px 8px rgba(0,0,0,0.08)` | Same as card |
| FilterBar (sticky) | `0 2px 4px rgba(0,0,0,0.06)` | Lighter — secondary element |
| All other elements | No shadow | Border-only |

Grep check: `grep -r "box-shadow" src/components --include="*.module.css"` → returns SearchWidget, PropertyCard, SiteNav, FilterBar only.

---

## Component CSS Specifications

### Button.module.css
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 4px; font-family: var(--font-sans); font-weight: 600;
  cursor: pointer; text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  border: none; white-space: nowrap;
}
.md { padding: 12px 24px; font-size: 1rem; }
.sm { padding: 8px 16px; font-size: 0.875rem; }
.fullWidth { width: 100%; }

.primary { background: var(--color-red); color: var(--color-white); }
/* white on red = 4.51:1 ✓ AA */
.primary:hover { opacity: 0.9; }

.outlineRed {
  background: transparent; color: var(--color-red);
  border: 1.5px solid var(--color-red);
}
.outlineRed:hover { background: var(--color-red); color: var(--color-white); }
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
.logo { color: var(--color-red); font-size: 1.5rem; font-weight: 700; text-decoration: none; }
.links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; flex: 1; }
.link { color: var(--color-text); font-size: 0.9375rem; font-weight: 500; text-decoration: none; }
.link:hover { color: var(--color-red); }
.rightGroup { display: flex; align-items: center; gap: 12px; }
.cityPill {
  color: var(--color-muted); font-size: 0.875rem;
  border: 1px solid var(--color-border); border-radius: 4px; padding: 4px 10px;
  cursor: pointer; display: flex; align-items: center; gap: 4px;
}
```

### HeroSearchWidget.module.css
```css
.hero {
  background: var(--color-surface);
  background-image: linear-gradient(180deg, rgba(224,50,40,0.04) 0%, transparent 100%);
  padding: 40px 24px 80px;
}
.widget {
  max-width: 900px; margin: 0 auto;
  background: var(--color-white); border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  overflow: hidden;
}
.tabs {
  display: flex; border-bottom: 1px solid var(--color-border);
}
.tab {
  padding: 16px 24px; font-size: 0.9375rem; font-weight: 500; font-family: var(--font-sans);
  color: var(--color-muted); background: transparent; border: none; cursor: pointer;
  border-bottom: 3px solid transparent; transition: color 0.15s, border-color 0.15s;
}
.tabActive { color: var(--color-red); border-bottom-color: var(--color-red); }
.fields { padding: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.field { display: flex; flex-direction: column; gap: 4px; }
.fieldLabel { font-size: 0.75rem; font-weight: 600; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.input, .select {
  padding: 10px 14px; border: 1.5px solid var(--color-border);
  border-radius: 4px; font-family: var(--font-sans); font-size: 0.9375rem;
  color: var(--color-text); background: var(--color-white);
  outline: none; min-width: 140px;
}
.input:focus, .select:focus { border-color: var(--color-red); }
```

### FilterBar.module.css
```css
.bar {
  background: var(--color-white); border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
  box-shadow: 0 2px 4px rgba(0,0,0,0.06);
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: flex; gap: 8px; overflow-x: auto; padding-top: 12px; padding-bottom: 12px;
  scrollbar-width: none;
}
.inner::-webkit-scrollbar { display: none; }
.chip {
  white-space: nowrap; border: 1.5px solid var(--color-border);
  border-radius: 20px; padding: 6px 16px; font-size: 0.875rem; font-weight: 500;
  font-family: var(--font-sans); cursor: pointer; transition: all 0.15s;
  background: var(--color-white); color: var(--color-text);
  flex-shrink: 0;
}
.chip:hover { border-color: var(--color-red); color: var(--color-red); }
.chipActive { background: var(--color-red); color: var(--color-white); border-color: var(--color-red); }
/* active: white on red = 4.51:1 ✓ */
```

### PropertyCard.module.css
```css
.card {
  background: var(--color-white); border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden; transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
.imageBlock { position: relative; aspect-ratio: 16/9; background: var(--color-surface); }
.imageBlock img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px 8px 0 0; }
.photoBadge {
  position: absolute; bottom: 8px; left: 8px;
  background: rgba(0,0,0,0.6); color: var(--color-white);
  font-size: 0.75rem; padding: 2px 8px; border-radius: 4px;
  display: flex; align-items: center; gap: 4px;
}
.possessionBadge {
  position: absolute; top: 8px; right: 8px;
  background: var(--color-red); color: var(--color-white);
  font-size: 0.6875rem; font-weight: 700; padding: 3px 8px; border-radius: 4px;
}
.content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.badgeRow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.title { font-size: 1rem; font-weight: 600; color: var(--color-text); margin: 0; line-height: 1.4; }
.priceRow { display: flex; align-items: baseline; gap: 12px; }
.price { font-size: 1.375rem; font-weight: 700; color: var(--color-red); }
/* red text on white = 4.51:1 ✓ */
.pricePerSqft { font-size: 0.8125rem; color: var(--color-muted); }
.areaRow { display: flex; gap: 16px; font-size: 0.8125rem; color: var(--color-muted); }
.areaItem { display: flex; flex-direction: column; gap: 2px; }
.areaLabel { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.04em; }
.areaValue { font-weight: 600; color: var(--color-text); font-size: 0.875rem; }
.floor { font-size: 0.8125rem; color: var(--color-muted); }
.locality { font-size: 0.875rem; color: var(--color-text); font-weight: 500; display: flex; align-items: center; gap: 4px; }
.postedDate { font-size: 0.75rem; color: var(--color-muted); }
.cta { margin-top: 4px; }
```

### VerifiedBadge.module.css + ReraBadge.module.css
```css
/* VerifiedBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green);         /* green TEXT on white card — 7.78:1 ✓✓ */
  font-size: 0.75rem; font-weight: 600;
}
/* NOT: background: var(--color-green); color: white; — that's a different pattern */
```

```css
/* ReraBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green);
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.02em;
  border: 1px solid var(--color-green); border-radius: 4px;
  padding: 1px 6px;
}
```

### ListingSourcePill.module.css
```css
.pill {
  display: inline-flex; align-items: center;
  font-size: 0.6875rem; font-weight: 700; padding: 2px 8px;
  border-radius: 4px; letter-spacing: 0.03em; text-transform: uppercase;
  /* bg + text colour set via inline style — contextual colours outside token system */
}
```

---

## Anti-Patterns Table

| Anti-Pattern | Wrong | Correct |
|-------------|-------|---------|
| Hardcoded CTA text | `"Contact Owner"` | `` `Contact ${property.listingSource}` `` |
| Raw price display | `₹8500000` or `₹85,00,000` | `formatPrice(8_500_000)` → `₹85 L` |
| CSS field hiding | `display: mode === 'buy' ? 'flex' : 'none'` | Conditional JSX — unmount/mount |
| Green badge (white on green) | `bg: green, color: white` | `color: var(--color-green)` on white card |
| RERA as a modal/large badge | Apollo-style accreditation block | Small inline `RERA ✓` text badge |
| 20px radius on cards | `border-radius: 20px` on PropertyCard | `border-radius: 8px` |
| 12px radius on buttons | SearchWidget radius on buttons | Buttons: `4px`, SearchWidget: `12px` |
| `border-radius: 50%` | Circular elements | No circles in this build |
| Red text at < 12px | Small red text labels | Muted grey for small text |
| Poppins 700 weight | Bold headings | Max weight is 600 in this build |
| toLocaleString alone | `₹${(4500000).toLocaleString('en-IN')}` | `formatPrice(4_500_000)` |
| Single filter dimension | Only BHK filter | Simultaneous: BHK + possession + type + furnished |
| Clinic-pattern entities | Doctor/Provider/HealthPackage | `Property` — the only core entity |
| No ListingSourcePill | Generic "Property" label | Always show Owner/Builder/Agent pill |
| Hex in module.css | `color: #E03228` | `color: var(--color-red)` |
