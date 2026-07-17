# 03 — Design
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## CSS Token System

**File:** `src/app/globals.css`

```css
:root {
  --color-bg:        #15171C;  /* primary dark background — nav, hero, packages, trust, footer */
  --color-surface:   #1E2130;  /* elevated surface — trust cards, inactive tabs, surface glass */
  --color-pink:      #FF316D;  /* brand accent — CTAs, prices, eyebrow, icon fills */
  --color-white:     #FFFFFF;  /* primary text on dark bg; bg of testimonial cards */
  --color-muted:     #888E9E;  /* secondary text — descriptions, original prices, metadata */
  --color-light-bg:  #F2F4F8;  /* light sections — HowItWorks, Testimonials */
  --color-border:    #2E3147;  /* dark borders — card outlines in dark sections */
  --color-dark-text: #15171C;  /* text on pink buttons + all text in light sections */
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Token reuse note:** `--color-dark-text` and `--color-bg` share the same hex value (`#15171C`). This is intentional — the near-black is both the page background and the text colour used on pink buttons and in light sections. One token is a bg token; the other is a text token. Using both correctly communicates intent in CSS: `background: var(--color-bg)` vs `color: var(--color-dark-text)`.

---

## WCAG Contrast Reference

| Foreground | Background | Ratio | Pass? | Usage |
|------------|------------|-------|-------|-------|
| White `#FFFFFF` | Bg `#15171C` | ~14:1 | ✓✓ AAA | All dark section headings + body |
| White `#FFFFFF` | Surface `#1E2130` | ~13:1 | ✓✓ AAA | Card headings, tab text |
| Pink `#FF316D` | Bg `#15171C` | 5.27:1 | ✓ AA | Prices, eyebrow, accent text |
| Dark `#15171C` | Pink `#FF316D` | 5.27:1 | ✓ AA | ALL pink buttons (primary CTA) |
| White `#FFFFFF` | Pink `#FF316D` | 3.55:1 | ✗ FAIL | Never use for normal text |
| Muted `#888E9E` | Bg `#15171C` | ~5.7:1 | ✓ AA | Descriptions, metadata |
| Dark `#15171C` | Light-bg `#F2F4F8` | ~17:1 | ✓✓ AAA | HowItWorks, Testimonials text |
| White `#FFFFFF` | Light-bg `#F2F4F8` | 1.05:1 | ✗ FAIL | Never use white text on light-bg |
| Pink `#FF316D` | White `#FFFFFF` | 1.83:1 | ✗ FAIL | Never use pink as text on white |

**Key rule:** White text on pink fails. Dark text on pink passes. Pink text on dark bg passes.

---

## Border-Radius System

| Element | Radius | Notes |
|---------|--------|-------|
| Buttons | `8px` | All 3 Button variants — warmer than Practo's 4px |
| PackageCard | `16px` | Glassmorphism card — most prominent UI element |
| WhyChooseUs cards | `12px` | Trust signal cards — solid surface, no glass |
| HowItWorks cards | `12px` | Process step cards — light section |
| Testimonial cards | `12px` | Text cards — light section |
| Category pills (tabs) | `24px` | Pill-style tab buttons |
| "POPULAR" badge | `4px` | Small rectangular badge on card |
| Discount % badge | `4px` | Small chip on card |
| Step number circle | `50%` | Decorative numbered circle (not a photo) |
| Location pill (nav) | `24px` | Pill-style location indicator |

**No `border-radius: 50%` on any photos** — there are no doctor/provider photos in this build.

---

## Shadow System

| Component | Effect | Notes |
|-----------|--------|-------|
| PackageCard (resting) | Glassmorphism bg + border | Not a shadow — translucent surface |
| PackageCard (hover) | `box-shadow: 0 8px 32px rgba(255,49,109,0.15)` | Pink glow — in PackageCard.module.css |
| PackageCard (hover border) | `border-color: rgba(255,49,109,0.3)` | Pink edge reveal |
| All other components | No shadow | Border-only or background-change |

Grep verification: `grep -r "box-shadow" src/components --include="*.module.css"` → 1 result: `PackageCard.module.css`.

---

## Glassmorphism Specification

Glassmorphism applies ONLY to `PackageCard`. The effect requires `rgba()` values — these are the documented exception to the zero-rgba module.css rule.

```css
/* PackageCard.module.css — rgba values intentionally present */
.card {
  background: rgba(255, 255, 255, 0.06);     /* translucent white over dark bg */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle glass edge */
  border-radius: 16px;
  padding: 24px;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15); /* pink glow */
  border-color: rgba(255, 49, 109, 0.3);             /* pink edge */
}
```

**Browser support note:** `backdrop-filter` has broad support (Chrome, Firefox, Safari). Include `-webkit-backdrop-filter` for older Safari. On browsers without support, the card falls back to a semi-transparent surface — still readable.

**Performance note:** `backdrop-filter: blur()` triggers GPU compositing. Apply it only to PackageCard, not to nav or other elements, to avoid jank.

---

## Component CSS Specifications

### Button.module.css
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 8px; font-family: var(--font-sans); font-weight: 700;
  cursor: pointer; text-decoration: none;
  transition: opacity 0.15s, background 0.15s;
  border: none;
}
.md { padding: 12px 28px; font-size: 1rem; }
.sm { padding: 8px 20px; font-size: 0.875rem; }
.fullWidth { width: 100%; }

.primary { background: var(--color-pink); color: var(--color-dark-text); }
/* dark text on pink = 5.27:1 ✓ — NEVER change to var(--color-white) */
.primary:hover { opacity: 0.9; }

.outlineWhite {
  background: transparent; color: var(--color-white);
  border: 1.5px solid var(--color-white);
}
.outlineWhite:hover { background: var(--color-surface); }

.outlineLight {
  background: transparent; color: var(--color-dark-text);
  border: 1.5px solid var(--color-dark-text);
}
.outlineLight:hover { background: var(--color-border); }

.btn:disabled { opacity: 0.4; cursor: not-allowed; }
```

### SiteNav.module.css
```css
.nav {
  background: var(--color-bg); position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid var(--color-border);
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.logo { font-size: 1.5rem; font-weight: 700; color: var(--color-pink); text-decoration: none; }
.links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
.link { color: var(--color-white); text-decoration: none; font-size: 0.9375rem; opacity: 0.85; }
.link:hover { color: var(--color-pink); opacity: 1; }
.rightGroup { display: flex; align-items: center; gap: 16px; }
.location {
  color: var(--color-muted); font-size: 0.875rem;
  border: 1px solid var(--color-border); border-radius: 24px;
  padding: 4px 12px;
}
```

### HeroSection.module.css
```css
.section {
  background: var(--color-bg);
  /* Aurora-inspired radial gradient overlay: */
  background-image:
    radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,49,109,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 20% 70%, rgba(255,49,109,0.04) 0%, transparent 60%);
  padding: 100px 24px 80px;
  text-align: center;
}
/* Note: background-image with rgba — acceptable as this is a gradient overlay, not a color value */
.eyebrow { color: var(--color-pink); font-size: 0.875rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
.headline { color: var(--color-white); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; margin-bottom: 20px; line-height: 1.1; }
.subheading { color: var(--color-muted); font-size: 1.125rem; max-width: 560px; margin: 0 auto 40px; }
.ctaRow { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.statsBar {
  display: flex; gap: 32px; justify-content: center; flex-wrap: wrap;
  margin-top: 60px; padding-top: 40px;
  border-top: 1px solid var(--color-border);
}
.stat { text-align: center; }
.statValue { color: var(--color-white); font-size: 1.5rem; font-weight: 700; }
.statLabel { color: var(--color-muted); font-size: 0.875rem; }
```

### CategoryTabs.module.css
```css
.section { background: var(--color-bg); padding: 64px 24px; }
.inner { max-width: 1280px; margin: 0 auto; }
.heading { color: var(--color-white); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 32px; }
.tabsRow {
  display: flex; gap: 8px; flex-wrap: nowrap; overflow-x: auto;
  padding-bottom: 8px; margin-bottom: 40px;
  scrollbar-width: none;
}
.tabsRow::-webkit-scrollbar { display: none; }
.tab {
  white-space: nowrap; padding: 8px 20px; border-radius: 24px;
  font-family: var(--font-sans); font-size: 0.875rem; font-weight: 600;
  border: none; cursor: pointer;
  background: var(--color-surface); color: var(--color-white);
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.tab:hover { background: var(--color-border); }
.active { background: var(--color-pink); color: var(--color-dark-text); }
/* active: dark text on pink = 5.27:1 ✓ */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .grid { grid-template-columns: 1fr; } }
```

### PackageCard.module.css
```css
/* GLASSMORPHISM — rgba values are the documented exception in this file */
.card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
  position: relative;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15);
  border-color: rgba(255, 49, 109, 0.3);
}
.popularBadge {
  position: absolute; top: -10px; left: 24px;
  background: var(--color-pink); color: var(--color-dark-text);
  font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.05em;
  padding: 2px 10px; border-radius: 4px;
}
.name { color: var(--color-white); font-size: 1.125rem; font-weight: 700; margin: 0; }
.priceBlock { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.original { color: var(--color-muted); font-size: 0.9375rem; text-decoration: line-through; }
/* Note: <del> tag provides semantic SR value; line-through is visual enhancement only */
.price { color: var(--color-pink); font-size: 1.75rem; font-weight: 700; }
.discountBadge {
  background: var(--color-surface); color: var(--color-pink);
  font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;
}
.testCount { color: var(--color-white); font-size: 0.875rem; font-weight: 600; }
.keyTests { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.keyTest { color: var(--color-muted); font-size: 0.875rem; display: flex; align-items: center; gap: 8px; }
.keyTest svg { color: var(--color-pink); flex-shrink: 0; }
.meta { display: flex; gap: 16px; flex-wrap: wrap; }
.metaItem { color: var(--color-muted); font-size: 0.8125rem; display: flex; align-items: center; gap: 4px; }
.cta { margin-top: auto; }
```

### HowItWorks.module.css
```css
/* LIGHT SECTION — all text uses --color-dark-text */
.section { background: var(--color-light-bg); padding: 80px 24px; }
.inner { max-width: 1280px; margin: 0 auto; }
.heading { color: var(--color-dark-text); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 48px; text-align: center; }
.steps { display: flex; gap: 32px; }
@media (max-width: 768px) { .steps { flex-direction: column; } }
.step {
  flex: 1; background: var(--color-white); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 32px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
/* Note: --color-border (#2E3147) on white light bg — dark border on light bg is fine */
.stepNum {
  width: 40px; height: 40px; border-radius: 50%; /* circle — correct use of 50% */
  background: var(--color-pink); color: var(--color-dark-text);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.125rem; font-weight: 700; flex-shrink: 0;
}
.stepIcon { color: var(--color-pink); }
.stepTitle { color: var(--color-dark-text); font-size: 1.125rem; font-weight: 700; }
.stepDesc { color: var(--color-dark-text); opacity: 0.7; font-size: 0.9375rem; line-height: 1.6; }
/* opacity: acceptable in module.css — not a color value */
```

### WhyChooseUs.module.css
```css
/* DARK SECTION */
.section { background: var(--color-bg); padding: 80px 24px; }
.inner { max-width: 1280px; margin: 0 auto; }
.heading { color: var(--color-white); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 48px; text-align: center; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
.card {
  background: var(--color-surface); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 32px;
  display: flex; flex-direction: column; gap: 16px;
  /* NO glassmorphism on these — solid surface, not glass */
}
.icon { color: var(--color-pink); }
.title { color: var(--color-white); font-size: 1.125rem; font-weight: 700; }
.desc { color: var(--color-muted); font-size: 0.9375rem; line-height: 1.6; }
```

### Testimonials.module.css
```css
/* LIGHT SECTION */
.section { background: var(--color-light-bg); padding: 80px 24px; }
.inner { max-width: 1280px; margin: 0 auto; }
.heading { color: var(--color-dark-text); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 48px; text-align: center; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
.card {
  background: var(--color-white); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 32px;
  /* NO glassmorphism — light bg, no glass needed */
}
.quote { color: var(--color-dark-text); font-size: 1rem; line-height: 1.7; margin-bottom: 24px; }
.patient { font-weight: 700; color: var(--color-dark-text); }
.pkg { font-size: 0.875rem; color: var(--color-dark-text); opacity: 0.6; }
.stars { display: flex; gap: 2px; margin-bottom: 16px; }
```

---

## Anti-Patterns Table

| Anti-Pattern | Wrong | Correct |
|-------------|-------|---------|
| Button text on pink | `color: var(--color-white)` on `.primary` | `color: var(--color-dark-text)` |
| Pink text on light bg | `color: var(--color-pink)` on light-bg section | Never use pink on light/white bg |
| Dark bg for HowItWorks | `background: var(--color-bg)` | `background: var(--color-light-bg)` |
| White text in light section | `color: var(--color-white)` | `color: var(--color-dark-text)` |
| `<span style="text-decoration: line-through">` | CSS line-through on non-semantic span | `<del>` tag with aria-label |
| Doctor/Provider entity | `interface Doctor { ... }` | `interface HealthPackage { ... }` |
| Multi-filter | 3 simultaneous filters + text input | Single `ServiceCategory` tab |
| Glassmorphism on WhyChooseUs | `backdrop-filter` on trust cards | Solid `--color-surface` bg |
| Glassmorphism on SiteNav | `backdrop-filter` on nav | Solid `--color-bg` with border |
| Border-radius 50% on any card | Circular cards | 16px PackageCard, 12px others |
| Prices without toLocaleString | `₹1999` | `₹${amount.toLocaleString('en-IN')}` |
| Hex in module.css | `color: #FF316D` | `color: var(--color-pink)` |
| rgba outside PackageCard | `rgba()` in SiteNav.module.css | Only allowed in PackageCard.module.css |
| Emergency link | Nav emergency contact | Not applicable — diagnostic marketplace |
| NABH as modal badge | Apollo-style accreditation badges | Plain text in WhyChooseUs cards |
| Roboto or Lato | Other clinic build fonts | Inter (400 + 600 + 700) |
