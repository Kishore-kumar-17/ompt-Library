# 03 — Design Specification
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

---

## 1. CSS Token System

```css
/* src/app/globals.css — 7 values, complete, no additions */

:root {
  --color-bg:         hsl(0deg 0% 100%);      /* pure white */
  --color-surface:    hsl(0deg 0% 97%);       /* very light gray — hover, sections */
  --color-text:       hsl(0deg 0% 14%);       /* near-black charcoal */
  --color-text-muted: hsl(0deg 0% 48%);       /* medium gray — MRP, metadata */
  --color-border:     hsl(0deg 0% 90%);       /* light gray — all dividers */
  --color-brand:      hsl(18deg 87% 53%);     /* AJIO orange — CTAs, active states */
  --color-discount:   hsl(354deg 78% 44%);    /* discount red — % labels and badges ONLY */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-inter, Inter, sans-serif);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 2. Typography Scale

| Use | Size | Weight | Notes |
|-----|------|--------|-------|
| Promo banner | `11px` | 600 | Uppercase, `letter-spacing: 0.06em` |
| Nav links | `13px` | 500 | |
| Search placeholder | `14px` | 400 | |
| Card brand name | `12px` | 700 | UPPERCASE, `letter-spacing: 0.04em` |
| Card product name | `13px` | 400 | 2-line clamp |
| Card selling price | `15px` | 700 | Dominant — biggest number on card |
| Card MRP | `13px` | 400 | Strikethrough, muted |
| Card discount % | `13px` | 600 | `var(--color-discount)` |
| Discount badge | `11px` | 700 | White on discount-red |
| PDP brand name | `14px` | 700 | UPPERCASE |
| PDP product H1 | `18px` | 600 | |
| PDP selling price | `22px` | 700 | |
| PDP MRP | `16px` | 400 | Strikethrough, muted |
| PDP discount % | `16px` | 600 | `var(--color-discount)` |
| Button text | `14px` | 600 | |
| Filter section label | `13px` | 600 | |
| Filter option | `13px` | 400 | |

Single font throughout: Inter.

---

## 3. Component CSS

### PromoBanner.module.css

```css
.banner {
  transition: max-height 200ms ease-out;
}

.inner {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-brand);
  padding: 0 16px;
  position: relative;
}

.message {
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.close {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
  opacity: 0.85;
}

.close:hover { opacity: 1; }
```

### TopNav.module.css

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.inner {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
}

.logo {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-brand);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.searchWrapper {
  position: relative;
  width: 100%;
}

.searchInput {
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0 16px 0 40px;
  font-size: 14px;
  background: var(--color-surface);
  color: var(--color-text);
}

.searchInput:focus {
  outline: none;
  border-color: var(--color-brand);
  background: var(--color-bg);
}

.searchIcon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}

.icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.iconBtn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  padding: 4px;
}

.iconBtn:hover { color: var(--color-brand); }

.badge {
  position: absolute;
  top: -4px;
  right: -6px;
  background: var(--color-brand);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}
```

### ProductCard.module.css

```css
.card {
  position: relative;
  display: flex;
  flex-direction: column;
}

.imageWrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 4px;          /* Mainstream — not 0, not 2px */
  background: var(--color-surface);
}

.imageLink {
  display: block;
  position: absolute;
  inset: 0;
}

.image {
  object-fit: cover;
  display: block;
  transition: transform 300ms ease;
}

.card:hover .image { transform: scale(1.03); }   /* Subtle zoom — common on AJIO */

/* Discount badge — top-left */
.discountBadge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  background: var(--color-discount);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 2px;
  pointer-events: none;
}

/* Wishlist heart — top-right */
.wishlistBtn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: color 150ms, transform 200ms;
}

.wishlistBtn:hover { color: var(--color-discount); }

.wishlisted { color: var(--color-discount); }

/* Quick-add pill — bottom center, shows on hover */
.quickAdd {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 7px 18px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
  cursor: pointer;
  opacity: 0;
  transition: opacity 150ms ease;
  color: var(--color-text);
}

.card:hover .quickAdd { opacity: 1; }

/* Info section */
.info {
  padding: 8px 0 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brandName {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text);
  line-height: 1.2;
}

.nameLink {
  text-decoration: none;
  color: var(--color-text);
}

.productName {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-text);
}

.priceRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.sellingPrice {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.mrp {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.discountPct {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-discount);
}

.colorDots {
  display: flex;
  gap: 4px;
  margin-top: 5px;
  flex-wrap: wrap;
}

.colorDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}
```

### ProductGrid.module.css

```css
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);  /* 5 columns — AJIO density */
  gap: 12px;
}

@media (max-width: 1280px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
}
```

### SizeSelector.module.css (PDP)

```css
.sizeGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sizeBtn {
  min-width: 52px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
}

.sizeBtn:hover:not(.oos) {
  border-color: var(--color-brand);
}

.selected {
  background: var(--color-brand);
  color: #fff;
  border-color: var(--color-brand);
}

.oos {
  opacity: 0.4;
  text-decoration: line-through;
  cursor: not-allowed;
}
```

### SizePicker.module.css (Quick-add overlay)

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 300;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

@media (min-width: 640px) {
  .overlay { align-items: center; }
}

.picker {
  background: var(--color-bg);
  border-radius: 12px 12px 0 0;
  padding: 20px 24px 32px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 640px) {
  .picker { border-radius: 8px; }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 15px;
  font-weight: 600;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 4px;
}

.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sizeBtn {
  min-width: 52px;
  height: 40px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.selected {
  background: var(--color-brand);
  color: #fff;
  border-color: var(--color-brand);
}

.oos {
  opacity: 0.4;
  text-decoration: line-through;
  cursor: not-allowed;
}

.addBtn {
  width: 100%;
  height: 48px;
  background: var(--color-brand);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.addBtn:disabled {
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
  width: 380px;
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
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 4px;
}

.itemList {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  list-style: none;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: var(--color-text-muted);
}

.footer {
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.shippingNote {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  padding: 8px;
  background: var(--color-surface);
  border-radius: 4px;
}

.subtotalRow {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
}

.checkoutBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background: var(--color-brand);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.checkoutBtn:hover { background: hsl(18deg 87% 46%); }
```

---

## 4. Anti-Patterns

| Wrong | Right | Why |
|-------|-------|-----|
| Hiding discount badges | Show `{N}% off` badge prominently | Discount is the primary value proposition |
| `product.discountPercent` in data | `getDiscountPercent(mrp, price)` computed | Discount is derived — single source of truth |
| Showing MRP always | Show MRP only when `price < mrp` | Non-discounted products have no MRP to show |
| `border-radius: 0` on buttons | `border-radius: 4px` | This is mainstream, not luxury. 0px is Aritzia. |
| `border-radius: 0` on images | `border-radius: 4px` | Unlike pfecomm_01/02, images have slight rounding |
| Using `--color-brand` (orange) on small text | Large CTAs only | Orange fails WCAG AA contrast at small sizes |
| Single discount/sale color | Two colors: `--color-brand` (orange CTA) + `--color-discount` (red badge) | They must be visually distinct |
| Product name first on card | **Brand name first**, then product name | Marketplace: brand is primary identifier |
| No wishlist | Separate Zustand `wishlistStore` | At this product density, wishlist is essential UX |
| Wishlist inside cart store | Separate `store/wishlist.ts` | Different data, different persistence key |
| No quick-add | Hover pill "ADD TO BAG" | Drives faster add-to-bag flow at scale |
| Per-colorway image arrays | Shared images, color dots | AJIO products are marketplace — one image set |
| 4-column grid | **5 columns** on desktop | Higher information density for browsing |
| `price.toFixed(2)` in INR | `formatINR(price)` — no decimals | Indian retail convention: ₹1,299 not ₹1,299.00 |
| Countdown timers | No countdown timers | Discount badges are factual; timers are theatre |
