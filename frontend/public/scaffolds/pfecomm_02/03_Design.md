# 03 — Design Specification
## Indian Heritage Fashion Storefront · pfecomm_platform_02

---

## 1. CSS Token System

### globals.css (complete — implement exactly as written)

```css
/* src/app/globals.css */

:root {
  /* Color system — 7 values, complete, no additions allowed */
  --color-bg:         hsl(36deg 25% 97%);   /* warm ivory — main background */
  --color-bg-warm:    hsl(36deg 25% 93%);   /* deeper warm beige — section bands */
  --color-text:       hsl(0deg 0% 10%);     /* near-black — primary text */
  --color-text-muted: hsl(20deg 6% 45%);    /* warm medium gray — metadata */
  --color-border:     hsl(36deg 15% 85%);   /* warm light border */
  --color-maroon:     hsl(348deg 68% 30%);  /* FabIndia brand maroon — CTAs, banner */
  --color-sale:       hsl(25deg 88% 50%);   /* saffron-orange — sale prices only */

  /* Typography */
  /* --font-display is Cormorant Garamond (set in layout.tsx via next/font) */
  /* --font-body is Inter (set in layout.tsx via next/font) */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  /* font variables applied via className in layout.tsx */
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body, Inter, sans-serif);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Focus ring — maroon to match brand */
:focus-visible {
  outline: 2px solid var(--color-maroon);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 2. Typography Scale

| Use | Font | Size | Weight | Tracking | Transform |
|-----|------|------|--------|----------|-----------|
| Hero headline | Cormorant Garamond (`--font-display`) | `clamp(32px, 5vw, 72px)` | 400 | `-0.01em` | — |
| Collection name (section) | Cormorant Garamond | `clamp(20px, 3vw, 36px)` | 500 | `0` | — |
| PDP product name | Cormorant Garamond | `24px` | 500 | `-0.01em` | — |
| Section label | Inter (`--font-body`) | `11px` | 600 | `0.1em` | uppercase |
| Promo banner | Inter | `11px` | 500 | `0.08em` | uppercase |
| Nav links | Inter | `13px` | 400 | `0.01em` | — |
| Card product name | Inter | `14px` | 400 | `0` | — |
| Craft/tech badge | Inter | `10px` | 500 | `0.08em` | uppercase |
| Fabric label (card) | Inter | `12px` | 400 | `0` | — |
| Price | Inter | `14px` | 400 (regular) / 500 (sale) | `0` | — |
| Body / descriptions | Inter | `14px` | 400 | `0` | — |
| Button text | Inter | `13px` | 500 | `0.03em` | — |

**Rule:** Cormorant Garamond for editorial weight (hero, section headlines, PDP product name). Inter for all UI, navigation, metadata, buttons. Never swap these.

---

## 3. Component CSS

### PromoBanner.module.css

```css
.banner {
  transition: max-height 200ms ease-out;
  /* max-height set inline via React state: '0' or '40px' */
}

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  background: var(--color-maroon);
  position: relative;
}

.message {
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--font-body);
}

.close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  opacity: 0.8;
}

.close:hover {
  opacity: 1;
}
```

### MegaNav.module.css

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.link {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--color-text);
  text-decoration: none;
}

.link:hover {
  color: var(--color-maroon);
}

.icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.iconBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  padding: 4px;
  position: relative;
}

.iconBtn:hover {
  color: var(--color-maroon);
}

.badge {
  position: absolute;
  top: -4px;
  right: -6px;
  background: var(--color-maroon);
  color: #fff;
  font-size: 9px;
  font-weight: 600;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}

@media (max-width: 900px) {
  .nav { height: 56px; }
  .links { display: none; }
}
```

### ProductCard.module.css

```css
.card {
  display: flex;
  flex-direction: column;
}

.imageLink {
  display: block;
  text-decoration: none;
}

.imageWrapper {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  position: relative;
  border-radius: 0;      /* Always 0 — handcraft photography bleeds to edge */
  background: var(--color-bg-warm);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* NO transition here — instant swap is correct */
}

.newBadge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
}

.info {
  padding: 10px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.craftBadge {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  line-height: 1.2;
}

.nameLink {
  text-decoration: none;
  color: var(--color-text);
}

.name {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  font-family: var(--font-body);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fabricLabel {
  font-size: 12px;
  color: var(--color-text-muted);
  font-family: var(--font-body);
}

.priceRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}

.price {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-muted);
}

.salePrice {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-sale);
}

.originalPrice {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.swatches {
  display: flex;
  gap: 5px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.swatchActive {
  outline: 2px solid var(--color-maroon);
  outline-offset: 2px;
}
```

### ProductGrid.module.css

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1280px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
}
```

### ColorSelector.module.css (PDP)

```css
.wrapper { display: flex; flex-direction: column; gap: 8px; }

.label {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text);
}

.colorName {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-muted);
  /* Updates to show active color name */
}

.swatches {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.swatch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.swatchActive {
  outline: 2px solid var(--color-maroon);
  outline-offset: 2px;
}
```

### SizeSelector.module.css (PDP)

```css
.wrapper { display: flex; flex-direction: column; gap: 10px; }

.label {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text);
}

.sizeGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sizeBtn {
  min-width: 48px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 400;
  font-family: var(--font-body);
  cursor: pointer;
  border-radius: 2px;     /* FabIndia's slightly softer corner */
}

.sizeBtn:hover:not(.sizeBtnOos) {
  border-color: var(--color-maroon);
}

.sizeBtnActive {
  background: var(--color-maroon);
  color: #fff;
  border-color: var(--color-maroon);
}

.sizeBtnOos {
  opacity: 0.4;
  text-decoration: line-through;
  cursor: not-allowed;
}
```

### AddToCart button

```css
.addToCartBtn {
  width: 100%;
  height: 48px;
  background: var(--color-maroon);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.addToCartBtn:hover {
  background: hsl(348deg 68% 24%);  /* 6% darker */
}

.addToCartBtn:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
```

### CartDrawer.module.css

```css
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: var(--color-bg);
  z-index: 201;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--color-border);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
}

.closeBtn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 4px;
}

.itemList {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
  list-style: none;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.footer {
  padding: 20px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.shippingNote {
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
  padding: 8px 12px;
  background: var(--color-bg-warm);
  border-radius: 2px;
}

.subtotalRow {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
}

.checkoutBtn {
  display: block;
  width: 100%;
  height: 48px;
  background: var(--color-maroon);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.checkoutBtn:hover {
  background: hsl(348deg 68% 24%);
}

@media (max-width: 640px) {
  .drawer { width: 100%; }
}
```

### ImageGallery.module.css (PDP)

```css
.wrapper { display: flex; flex-direction: column; gap: 8px; }

.mainImageWrapper {
  aspect-ratio: 3 / 4;
  position: relative;
  overflow: hidden;
  border-radius: 0;    /* Always 0 */
}

.mainImage {
  object-fit: cover;
  display: block;
}

.thumbRow {
  display: flex;
  gap: 6px;
}

.thumbWrapper {
  width: 72px;
  height: 90px;   /* 3/4 ratio */
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  flex-shrink: 0;
}

.thumb { object-fit: cover; }

.thumbActive { opacity: 1; }
.thumbInactive { opacity: 0.5; }
```

---

## 4. Homepage Sections

### Hero
```css
.hero {
  position: relative;
  min-height: 90vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 64px 48px;
}

.heroImage {
  position: absolute;
  inset: 0;
  object-fit: cover;
}

.heroContent {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.heroTitle {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 72px);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 24px;
}

.heroCta {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 2px;
}
```

### Craft Collection Strip
```css
.craftStrip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 1440px;
  margin: 0 auto;
}

.stripImage {
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
}

.stripContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 64px;
  background: var(--color-bg-warm);
}

.stripLabel {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.stripTitle {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 42px);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 24px;
}

.stripCta {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-maroon);
  text-decoration: none;
  letter-spacing: 0.03em;
  border-bottom: 1px solid var(--color-maroon);
  display: inline-block;
  padding-bottom: 2px;
}
```

### Artisan Story Strip
```css
.artisanStrip {
  padding: 88px 24px;
  text-align: center;
  background: var(--color-bg-warm);
  margin: 88px 0;
}

.artisanText {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 400;
  color: var(--color-text);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.4;
}
```

---

## 5. Anti-Patterns

| Wrong | Right | Why |
|-------|-------|-----|
| `background: #fff` on body | `background: var(--color-bg)` | Token system — no raw hex in CSS |
| `background: black` on CTA button | `background: var(--color-maroon)` | Brand color is maroon, not black |
| `border-radius: 0` on buttons | `border-radius: 2px` | FabIndia is slightly softer than Aritzia |
| `border-radius: 4px` on buttons | `border-radius: 2px` | Not DTC-generic; precisely 2px |
| `border-radius: any` on images | `border-radius: 0` | Textile photography bleeds to edge |
| `color: blue` in natural dye color name | `name: 'Indigo'` | Natural dye vocabulary is data, not CSS |
| CSS transition on card image | No `transition` on `.image` | Instant swatch swap is the behavior |
| `font-family: var(--font-display)` on buttons | `font-family: var(--font-body)` | Cormorant Garamond is display-only |
| `font-family: var(--font-display)` on product card names | `font-family: var(--font-body)` | Card names are UI text, not display |
| Hiding OOS sizes | Render all, apply `.sizeBtnOos` | Show OOS communicates availability clearly |
| `--color-maroon` for decorative purposes | Use only for CTAs and active states | Maroon is a functional brand color, not decoration |
| Sale badge ("SALE") on sale products | Sale price in `var(--color-sale)` + strikethrough | Quiet price display matches brand tone |
| Adding a 4th color accent | Never | 7 tokens are complete |
| `₹2499.00` | `₹2,499` | INR formatting: no decimals, `en-IN` grouping |
| Decorative borders or motifs in CSS | No ornamental CSS | Products carry the pattern — UI must be clean |
| `.button { background: var(--color-text) }` | `.button { background: var(--color-maroon) }` | This is not Aritzia. CTAs are maroon here. |
