# 03 — Design
## Premium Fashion Retail Storefront · pfecomm_platform_01

All colors via CSS custom properties. No hex in CSS files. `border-radius: 0` on buttons and images.

---

## 1. globals.css

```css
/* src/app/globals.css */

:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-bg-subtle:  hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 7%);
  --color-text-muted: hsl(0deg 0% 42%);
  --color-border:     hsl(0deg 0% 88%);
  --color-sale:       hsl(0deg 72% 45%);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; }

html { font-size: 16px; }

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-inter, Inter, -apple-system, sans-serif);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
a:hover { color: inherit; }

img { display: block; max-width: 100%; }

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
}

/* Focus rings — consistent across all interactive elements */
:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
  }
}
```

---

## 2. PromoBanner

```css
/* src/components/layout/PromoBanner.module.css */

.banner {
  background: var(--color-text);
  transition: max-height 200ms ease-out;
}

.inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.message {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: hsl(0deg 0% 100%);  /* white text on black banner — acceptable hex-in-CSS */
}

/* Exception: white text on the black banner is not part of the design token system.
   The banner is black-on-white-inverted. Use literal white here. */

.close {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: hsl(0deg 0% 100%);
  font-size: 12px;
  line-height: 1;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.close:hover { opacity: 1; }
```

---

## 3. MegaNav

```css
/* src/components/layout/MegaNav.module.css */

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  height: 60px;
}

.inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  flex-shrink: 0;
}

.links {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.link {
  padding: 0.5rem 0.75rem;
  font-size: 13px;
  letter-spacing: 0.01em;
  color: var(--color-text);
  transition: color 0.15s;
  white-space: nowrap;
}

.link:hover { color: var(--color-text-muted); }

.icons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.iconBtn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: color 0.15s;
  position: relative;
}

.iconBtn:hover { color: var(--color-text-muted); }

.cartCount {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

@media (max-width: 900px) {
  .links { display: none; }
  .nav   { height: 52px; }
}
```

---

## 4. ProductCard

```css
/* src/components/product/ProductCard.module.css */

.card { position: relative; }

.imageLink { display: block; }

.imageWrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--color-bg-subtle);
  /* NEVER add border-radius here */
}

.image {
  object-fit: cover;
  /* NEVER add transition here — instant swap is intentional */
}

.newBadge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--color-bg);
  color: var(--color-text);
  padding: 0.2rem 0.4rem;
  /* No border-radius */
}

.info {
  padding: 0.625rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brandBadge {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  display: block;
}

.nameLink { display: block; }

.name {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.priceRow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.125rem;
}

.price       { font-size: 14px; color: var(--color-text-muted); }
.salePrice   { font-size: 14px; font-weight: 500; color: var(--color-sale); }
.originalPrice { font-size: 14px; color: var(--color-text-muted); text-decoration: line-through; }

.swatches {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 0.375rem;
  flex-wrap: wrap;
}

.swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0;
  background: none;
  flex-shrink: 0;
  transition: border-color 0.1s;
}

.swatchActive,
.swatch:hover {
  outline: 1.5px solid var(--color-text);
  outline-offset: 1.5px;
}
```

---

## 5. Product Grid + PLP

```css
/* src/components/product/ProductGrid.module.css */

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1280px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
}
```

```css
/* src/app/products/page.module.css */

.page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}

.filterSidebar { position: sticky; top: 80px; }

.pageHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.resultCount {
  font-size: 13px;
  color: var(--color-text-muted);
}

.activeFilters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filterChip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--color-border);
  font-size: 12px;
  cursor: pointer;
  /* No border-radius */
}
```

---

## 6. Filter Panel

```css
/* src/components/product/FilterPanel.module.css */

.panel {}

.section {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.sectionLabel {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.checkboxList { display: flex; flex-direction: column; gap: 0.5rem; }

.checkboxItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  cursor: pointer;
}

.checkbox {
  width: 14px;
  height: 14px;
  border: 1px solid var(--color-border);
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  /* No border-radius — sharp checkboxes */
}

.checkbox:checked { background: var(--color-text); border-color: var(--color-text); }

.sizeGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.sizeBtn {
  padding: 0.375rem 0;
  font-size: 12px;
  border: 1px solid var(--color-border);
  text-align: center;
  cursor: pointer;
  background: var(--color-bg);
  color: var(--color-text);
  /* No border-radius */
  transition: border-color 0.1s, background 0.1s;
}

.sizeBtnActive {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}
```

---

## 7. PDP

```css
/* src/app/products/[slug]/page.module.css */

.page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
}

.layout {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}

/* Image gallery */
.gallery { position: sticky; top: 80px; }

.mainImage {
  position: relative;
  aspect-ratio: 3 / 4;
  width: 100%;
  overflow: hidden;
  /* No border-radius */
}

.thumbnails {
  display: flex;
  gap: 4px;
  margin-top: 4px;
  overflow-x: auto;
}

.thumb {
  flex-shrink: 0;
  width: 64px;
  height: 80px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.15s;
  /* No border-radius */
}

.thumb.active { opacity: 1; }
.thumb:hover  { opacity: 0.85; }

/* Product info */
.info { display: flex; flex-direction: column; gap: 1rem; }

.brandBadge {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.name {
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.priceRow { display: flex; align-items: center; gap: 0.5rem; }
.price        { font-size: 15px; color: var(--color-text-muted); }
.salePrice    { font-size: 15px; font-weight: 500; color: var(--color-sale); }
.originalPrice { font-size: 15px; color: var(--color-text-muted); text-decoration: line-through; }

/* Color selector */
.colorSection { display: flex; flex-direction: column; gap: 0.5rem; }
.colorLabel { font-size: 13px; }
.colorName  { font-size: 13px; color: var(--color-text-muted); }

.colorSwatches { display: flex; gap: 6px; flex-wrap: wrap; }

.colorSwatch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0;
}

.colorSwatch.active {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}

/* Size selector */
.sizeSection { display: flex; flex-direction: column; gap: 0.5rem; }
.sizeHeader { display: flex; align-items: center; justify-content: space-between; }
.sizeLabel { font-size: 13px; }
.sizeGuide { font-size: 12px; color: var(--color-text-muted); text-decoration: underline; cursor: pointer; }

.sizes { display: flex; gap: 4px; flex-wrap: wrap; }

.sizeBtn {
  min-width: 52px;
  height: 40px;
  padding: 0 0.75rem;
  font-size: 13px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  /* No border-radius */
  transition: border-color 0.1s, background 0.1s;
}

.sizeBtnActive {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

.sizeBtnOos {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
}

/* Add to Cart */
.addToCart {
  width: 100%;
  height: 48px;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  /* No border-radius */
  transition: background 0.15s;
}

.addToCart:hover { background: hsl(0deg 0% 20%); }

.addToCart:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* Accordions */
.accordions { margin-top: 0.5rem; }
```

---

## 8. Cart Drawer

```css
/* src/components/cart/CartDrawer.module.css */

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
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

@media (max-width: 460px) {
  .drawer { width: 100vw; }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.title { font-size: 14px; font-weight: 500; }

.closeBtn {
  font-size: 14px;
  color: var(--color-text-muted);
  padding: 4px;
  transition: color 0.15s;
}

.closeBtn:hover { color: var(--color-text); }

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 13px;
}

.itemList {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer {
  border-top: 1px solid var(--color-border);
  padding: 1.25rem 1.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shippingNote {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
}

.subtotalRow {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.checkoutBtn {
  display: block;
  width: 100%;
  height: 48px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-align: center;
  line-height: 48px;
  text-decoration: none;
  /* No border-radius */
  transition: background 0.15s;
}

.checkoutBtn:hover { background: hsl(0deg 0% 20%); }
```

```css
/* src/components/cart/CartItem.module.css */

.item {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  align-items: start;
}

.image {
  position: relative;
  width: 64px;
  height: 80px;
  overflow: hidden;
  flex-shrink: 0;
  /* No border-radius */
}

.info { display: flex; flex-direction: column; gap: 0.2rem; }

.brandBadge {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.name { font-size: 13px; font-weight: 400; }
.variant { font-size: 12px; color: var(--color-text-muted); }

.priceAndActions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.price { font-size: 13px; }

.stepper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
}

.stepperBtn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--color-text);
  transition: background 0.1s;
}

.stepperBtn:hover { background: var(--color-bg-subtle); }

.qty { font-size: 13px; min-width: 20px; text-align: center; }

.remove {
  font-size: 11px;
  color: var(--color-text-muted);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.15s;
}

.remove:hover { color: var(--color-text); }
```

---

## 9. Anti-Patterns

| Anti-pattern | Problem | Correct |
|---|---|---|
| `border-radius: 4px` on buttons | Wrong brand DNA — this is not the sustainable D2C brand | `border-radius: 0` always |
| CSS transition on product card image | Fashion convention is instant — animated swap reads cheap | No transition on `.image` |
| Adding an accent color | The monochrome restraint is the design system | 6 tokens only — `--color-sale` is the only chromatic value |
| `bg-green-*` or any Tailwind color | Project uses CSS Modules + custom properties | CSS variables only |
| Quick-add overlay on product cards | Aritzia doesn't use it — it drives direct PDP visits | No quick-add; cards link to PDP |
| Sale badge on all products | Makes the site look discount-driven | Sale badge only when `product.isSale === true` |
| Urgency copy ("Only 2 left!") | Contradicts the premium brand voice | Never. Remove if found. |
| Sub-brand badge on Aritzia products | Main line carries no badge | `if (product.brand !== 'Aritzia')` |
| Hero carousel | One image, one message | Single editorial hero, no arrows |
| Swatch hex values in CSS | They're data, not design system values | Inline style from `color.swatch` only |
| Chat widget on mobile | Covers the Add to Cart button | Hide below 768px or remove entirely |
| Loading spinner on swatch hover | Instant swap requires no loading state | No spinner — preload images or accept instant swap |

---

## 10. Typography Reference

| Element | Size | Weight | Letter-spacing | Color |
|---------|------|--------|----------------|-------|
| PromoBanner | 11px | 500 | 0.08em | white |
| Nav links | 13px | 400 | 0.01em | `--color-text` |
| Section label | 11px | 600 | 0.1em (uppercase) | `--color-text-muted` |
| Product name (card) | 14px | 400 | 0 | `--color-text` |
| Product name (PDP) | 22px | 400 | -0.01em | `--color-text` |
| Price (card + PDP) | 14–15px | 400 | 0 | `--color-text-muted` |
| Sale price | 14–15px | 500 | 0 | `--color-sale` |
| Sub-brand badge | 10px | 500 | 0.06em (uppercase) | `--color-text-muted` |
| Button text | 13px | 500 | 0.03em | white on dark bg |
| Body (description) | 14px | 400 | 0 | `--color-text` |
| Meta (variant info) | 12–13px | 400 | 0 | `--color-text-muted` |
