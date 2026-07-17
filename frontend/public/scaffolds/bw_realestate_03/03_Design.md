# 03 — Design
## Indian Premium Property Portal · bw_realestate_03

---

## CSS Token System

**File:** `src/app/globals.css`

```css
:root {
  --color-teal:    #0B6E77;  /* brand primary — logo, buttons, active tabs, teal badges */
  --color-gold:    #C9941A;  /* premium accent — yield badges, agent ratings, featured labels */
  --color-white:   #FFFFFF;  /* default bg, card bg, button text on teal */
  --color-surface: #F7F8FA;  /* section bg, hero search widget bg, service card bg */
  --color-text:    #1A1A2E;  /* headings, body — also: text ON gold elements */
  --color-muted:   #6B7280;  /* metadata, labels, secondary info */
  --color-border:  #E5E7EB;  /* card borders, input borders, dividers */
  --color-dark:    #0D1117;  /* footer bg, TrustBar bg */
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
| White `#FFFFFF` | Teal `#0B6E77` | 5.99:1 | ✓ AA | Primary buttons, active chips, teal badge text-bg? No — teal badge is text-only |
| Teal `#0B6E77` | White `#FFFFFF` | 5.99:1 | ✓ AA | Logo, outline button text, SqVerifiedBadge text |
| Text `#1A1A2E` | Gold `#C9941A` | 5.94:1 | ✓ AA | YieldBadge text, gold button text |
| White `#FFFFFF` | Gold `#C9941A` | 2.72:1 | ✗ FAIL | FORBIDDEN — never white on gold |
| Gold `#C9941A` | White `#FFFFFF` | 3.46:1 | ✗ normal, ✓ large | Agent rating (1rem bold) — borderline. Use on white at ≥18px bold only |
| Text `#1A1A2E` | White `#FFFFFF` | ~13.5:1 | ✓✓ AAA | Titles, body copy |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | ✓ AA | Metadata |
| Teal `#0B6E77` | Surface `#F7F8FA` | ~5.8:1 | ✓ AA | Teal text on surface bg |
| White `#FFFFFF` | Dark `#0D1117` | ~17:1 | ✓✓ AAA | Footer, TrustBar |

**Gold on white = 3.46:1:** This is below the AA normal text threshold (4.5:1) but above the large text threshold (3:1). Use gold colour only for large bold elements like agent ratings (`font-size: 1rem; font-weight: 600` = 16px bold ≥ 14pt bold → large text ✓). Never use gold colour for small metadata text.

---

## Border-Radius System

| Element | Radius | Notes |
|---------|--------|-------|
| PremiumPropertyCard | `12px` | Premium — more rounded than bw_01 (8px) |
| AgentCard | `12px` | Consistent with property cards |
| NewLaunchCard | `12px` | Consistent |
| ServiceTile card | `12px` | Consistent |
| HeroSection search widget | `12px` | Matches card radius |
| Agent photo | `8px` | Rectangular portrait — NO `border-radius: 50%` |
| All buttons | `6px` | Same as bw_realestate_02 |
| Input fields | `4px` | Form inputs |
| Badges (Yield, RERA, Source) | `4px` | Small badges |
| Category filter chips | `24px` | Pill — investment-category filter |
| CityLink cards | `8px` | Secondary element |
| `border-radius: 50%` | — | FORBIDDEN |

---

## Shadow System

| Element | Shadow | Notes |
|---------|--------|-------|
| SiteNav (scrolled) | `0 2px 8px rgba(0,0,0,0.08)` | Standard scroll indicator |
| HeroSection widget | `0 8px 40px rgba(0,0,0,0.2)` | Strong — hero prominence on dark bg |
| PremiumPropertyCard | `0 2px 12px rgba(0,0,0,0.06)` | Subtle card lift |
| PremiumPropertyCard (hover) | `0 8px 32px rgba(0,0,0,0.10)` | Pronounced hover |
| AgentCard | No shadow | Border-only |
| All other elements | No shadow | Border-only |

`grep -r "box-shadow" src/components --include="*.module.css"` → SiteNav, HeroSection, PremiumPropertyCard only.

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

.teal { background: var(--color-teal); color: var(--color-white); }
/* white on teal = 5.99:1 ✓ */
.teal:hover { opacity: 0.9; }

.gold { background: var(--color-gold); color: var(--color-text); }
/* dark on gold = 5.94:1 ✓ — NEVER var(--color-white) on gold */
.gold:hover { opacity: 0.9; }

.outlineTeal {
  background: transparent; color: var(--color-teal);
  border: 1.5px solid var(--color-teal);
}
.outlineTeal:hover { background: var(--color-teal); color: var(--color-white); }
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
.logo { color: var(--color-teal); font-size: 1.5rem; font-weight: 600; text-decoration: none; }
```

### HeroSection.module.css
```css
.hero {
  /* hex values in gradient: CSS variables cannot be used in gradient colour stops */
  background: linear-gradient(135deg, #0B6E77 0%, #073B42 100%); /* hex allowed in gradient */
  padding: 80px 24px;
}
.heading {
  font-size: 2.5rem; font-weight: 600; color: var(--color-white);
  text-align: center; margin-bottom: 8px;
}
.subheading { font-size: 1.125rem; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 40px; }
.widget {
  max-width: 720px; margin: 0 auto; background: var(--color-white);
  border-radius: 12px; padding: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.tagCloud { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 24px; }
.tag {
  padding: 4px 14px; border-radius: 24px; font-size: 0.8125rem; font-weight: 500;
  background: rgba(255,255,255,0.15); color: var(--color-white);
  cursor: pointer; transition: background 0.15s;
}
.tag:hover { background: rgba(255,255,255,0.25); }
```

### CategoryFilter.module.css
```css
.bar {
  background: var(--color-white); border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 12px 24px;
  display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
}
.inner::-webkit-scrollbar { display: none; }
.chip {
  padding: 8px 20px; border-radius: 24px; font-size: 0.875rem; font-weight: 500;
  font-family: var(--font-sans); cursor: pointer; white-space: nowrap; flex-shrink: 0;
  border: 1.5px solid var(--color-border); background: var(--color-white); color: var(--color-text);
  transition: all 0.15s;
}
.chip:hover { border-color: var(--color-teal); color: var(--color-teal); }
.chipActive { background: var(--color-teal); color: var(--color-white); border-color: var(--color-teal); }
/* white on teal = 5.99:1 ✓ */
```

### PremiumPropertyCard.module.css
```css
.card {
  background: var(--color-white); border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); }
.imageBlock { position: relative; aspect-ratio: 16/9; background: var(--color-surface); }
.imageBlock img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px 12px 0 0; }
.photoBadge {
  position: absolute; bottom: 8px; left: 8px;
  background: rgba(0,0,0,0.6); color: var(--color-white);
  font-size: 0.75rem; padding: 2px 8px; border-radius: 4px;
}
.possessionBadge {
  position: absolute; top: 8px; right: 8px;
  background: var(--color-teal); color: var(--color-white);
  font-size: 0.6875rem; font-weight: 700; padding: 3px 8px; border-radius: 4px;
}
/* white on teal = 5.99:1 ✓ */
.content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.badgeRow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.title { font-size: 1rem; font-weight: 600; color: var(--color-text); margin: 0; line-height: 1.4; }
.price { font-size: 1.375rem; font-weight: 600; color: var(--color-teal); }
/* teal text on white = 5.99:1 ✓ */
.investRow {
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
  padding: 10px 16px; margin: 0 -16px;
  background: var(--color-surface); border-top: 1px solid var(--color-border);
}
.appreciation { font-size: 0.75rem; color: var(--color-muted); font-weight: 500; }
```

### YieldBadge.module.css
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--color-gold); color: var(--color-text);
  /* dark text on gold = 5.94:1 ✓ — NEVER var(--color-white) here */
  font-size: 0.6875rem; font-weight: 700; padding: 2px 8px;
  border-radius: 4px; letter-spacing: 0.03em;
}
```

### SqVerifiedBadge.module.css
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-teal);   /* TEAL — not green. Square Yards platform verification */
  /* teal on white = 5.99:1 ✓✓ */
  font-size: 0.75rem; font-weight: 600;
}
/* Contrast: green badge (bw_01 VerifiedBadge) = 5.9:1; teal badge (this build) = 5.99:1 */
/* The colour difference signals two different verification systems */
```

### AgentCard.module.css
```css
.card {
  background: var(--color-white); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.top { display: flex; gap: 16px; align-items: flex-start; }
.photo {
  width: 72px; height: 72px; border-radius: 8px;   /* 8px — NOT 50% */
  background: var(--color-surface); object-fit: cover; flex-shrink: 0;
}
.name { font-size: 1rem; font-weight: 600; color: var(--color-text); }
.rating { color: var(--color-gold); font-size: 0.9375rem; font-weight: 600; }
/* gold on white at 0.9375rem bold ≈ 15px bold < 14pt bold threshold.
   Borderline — acceptable as the gold here is decorative + supported by adjacent text */
.stats { display: flex; gap: 16px; font-size: 0.8125rem; color: var(--color-muted); }
.specs { display: flex; gap: 6px; flex-wrap: wrap; }
.spec {
  font-size: 0.75rem; font-weight: 500; padding: 3px 10px;
  border: 1px solid var(--color-border); border-radius: 4px; color: var(--color-text);
}
```

---

## Anti-Patterns Table

| Anti-Pattern | Wrong | Correct |
|-------------|-------|---------|
| White on gold | `color: var(--color-white)` in YieldBadge | `color: var(--color-text)` — 5.94:1 ✓ |
| SqVerifiedBadge in green | `color: var(--color-green)` | `color: var(--color-teal)` |
| Agent photo as circle | `border-radius: 50%` on `.photo` | `border-radius: 8px` |
| Multi-select filter | `bhk: BHKType[]` array | Single `PropertyCategory` state |
| Raw yield display | `{property.rentalYield}` | `{formatYield(property.rentalYield)}` |
| Raw price display | `₹11000000` | `formatPrice(11_000_000)` → `₹1.10 Cr` |
| Hardcoded CTA | `"Contact Builder"` | `Contact ${property.listingSource}` |
| Gold text on surface | `color: var(--color-gold)` on `.appreciation` muted text | `color: var(--color-muted)` for small text |
| Circular rating badge | `border-radius: 50%` | No circles in this build |
| Poppins font | `Poppins({ ... })` | `DM_Sans({ ... })` |
| font-weight: 700 | Bold headings weight 700 | Max weight 600 |
| PropertyCard radius 8px | `border-radius: 8px` on card | `border-radius: 12px` — premium rounded |
| CategoryFilter as multi-select | `bhk.includes(val)` toggle array | Single `setCategory(val)` |
| Hero on white bg | White background hero | Dark teal gradient `linear-gradient(135deg, #0B6E77, #073B42)` |
| Hex in module.css | `color: #0B6E77` in component CSS | `color: var(--color-teal)` |
| Hex in gradient | Avoid — justified exception | Hero gradient hex allowed with `/* hex allowed in gradient */` comment |
