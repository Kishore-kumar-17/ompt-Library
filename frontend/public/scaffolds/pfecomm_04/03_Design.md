# 03 — Design Tokens and Component CSS
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

---

## `src/app/globals.css`

```css
/* ===========================
   BEWAKOOF — CSS TOKENS
   =========================== */

:root {
  /* Brand yellow — CTA BACKGROUND ONLY. Never use as text color. */
  --color-brand: hsl(47deg 100% 60%);

  /* Deal orange — combo pricing callouts ONLY. Not a button or nav color. */
  --color-deal: hsl(26deg 100% 50%);

  /* Discount red — badge on discounted products */
  --color-discount: hsl(354deg 78% 44%);

  /* Near-black — ALL text INCLUDING labels on yellow CTAs */
  --color-text: hsl(0deg 0% 10%);

  /* Secondary text — muted labels, coins, print description */
  --color-text-muted: hsl(0deg 0% 45%);

  /* Border — card borders, separators */
  --color-border: hsl(0deg 0% 88%);

  /* Surface — pure white background */
  --color-surface: hsl(0deg 0% 100%);

  /* Font */
  --font-sans: var(--font-montserrat, 'Montserrat', sans-serif);

  /* Card shadow — Bewakoof signature */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 4px 16px rgba(0, 0, 0, 0.14);
}

/* === Base reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-surface);
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Focus ring — yellow brand, visible on white */
:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Typography Scale

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Hero headline | Montserrat | `clamp(2rem, 5vw, 3.5rem)` | 800 | Bold, impactful |
| Section heading | Montserrat | `clamp(1.25rem, 2.5vw, 1.75rem)` | 700 | |
| Product name (card) | Montserrat | `14px` | 600 | 2-line clamp |
| Price (card) | Montserrat | `15px` | 700 | |
| MRP (card) | Montserrat | `13px` | 400 | Strikethrough, muted |
| Discount % (card) | Montserrat | `13px` | 600 | Red |
| Coins (card) | Montserrat | `11px` | 500 | Muted |
| Brand (PDP) | Montserrat | N/A | — | No separate brand field (D2C) |
| Product name (PDP H1) | Montserrat | `22px` | 700 | |
| Print description | Montserrat | `13px` | 400 | Muted italic |
| Price (PDP) | Montserrat | `26px` | 700 | |
| MRP (PDP) | Montserrat | `16px` | 400 | Strikethrough, muted |
| Button label | Montserrat | `14px` | 700 | Uppercase or title case |
| Nav links | Montserrat | `13px` | 600 | Uppercase |

**No display or serif font — Montserrat only throughout.**

---

## PromoBanner — `src/components/layout/PromoBanner.module.css`

```css
.banner {
  background: var(--color-brand);
  color: var(--color-text);  /* BLACK text on yellow */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  position: relative;
}

.dismiss {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
}
```

---

## TopNav — `src/components/layout/TopNav.module.css`

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 24px;
}

.logo {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-brand);  /* Logo uses yellow — it's decorative, not body text */
  letter-spacing: -0.02em;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: hsl(0deg 0% 96%);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 0 16px;
  height: 36px;
  width: 320px;
}

.searchInput {
  flex: 1;
  border: none;
  background: none;
  font-size: 13px;
  font-family: var(--font-sans);
  color: var(--color-text);
  outline: none;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
}

.iconBtn {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--color-text);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-brand);
  color: var(--color-text);  /* Black text on yellow badge */
  font-size: 10px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
```

---

## ProductCard — `src/components/product/ProductCard.module.css`

```css
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* Shadow is on the card root — wraps image + info */
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.imageLink {
  display: block;
}

.imageWrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 16px;  /* Matches card for top corners */
  overflow: hidden;
}

.image {
  object-fit: cover;
}

/* Print badge — top-left, yellow background */
.printBadge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--color-brand);
  color: var(--color-text);  /* BLACK text on yellow badge */
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  z-index: 1;
}

/* Discount badge — top-right, red background */
.discountBadge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-discount);
  color: #fff;  /* White on red — passes contrast */
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 1;
}

.info {
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.productName {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.priceRow {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.price {
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

.coins {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.colorDots {
  display: flex;
  gap: 6px;
  margin-top: 2px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  padding: 0;
  transition: transform 100ms ease;
}

.dotActive {
  border-color: var(--color-text);
  transform: scale(1.25);
}
```

---

## SizeSelector — `src/components/product/SizeSelector.module.css`

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sizeBtn {
  min-width: 52px;
  height: 40px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;  /* Consistent with button radius */
  background: none;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease, color 150ms ease;
}

.sizeBtn:hover:not(:disabled) {
  border-color: var(--color-text);
}

.selected {
  background: var(--color-brand);
  color: var(--color-text);  /* Black text on yellow selection */
  border-color: var(--color-brand);
}

.oos {
  opacity: 0.4;
  text-decoration: line-through;
  cursor: not-allowed;
}
```

---

## Add to Bag Button (PDP) — shared pattern

```css
.addToBag {
  width: 100%;
  height: 48px;
  background: var(--color-brand);       /* Yellow */
  color: var(--color-text);             /* BLACK — critical rule */
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  border-radius: 8px;                   /* 8px — not 16px, not 0px */
  cursor: pointer;
  transition: opacity 150ms ease;
}

.addToBag:hover:not(:disabled) {
  opacity: 0.88;
}

.addToBag:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
```

---

## ComboProgress — `src/components/product/ComboProgress.module.css`

```css
.combo {
  background: hsl(47deg 100% 96%);  /* Very light yellow tint */
  border: 1.5px solid var(--color-brand);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comboHeadline {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
}

.comboSub {
  font-size: 12px;
  color: var(--color-text-muted);
}

.comboActive {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-deal);  /* Orange only for active combo success state */
}

.progressBar {
  height: 4px;
  background: var(--color-border);
  border-radius: 100px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: var(--color-brand);
  border-radius: 100px;
  transition: width 300ms ease;
}
```

---

## CartDrawer — `src/components/cart/CartDrawer.module.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: var(--color-surface);
  z-index: 201;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkoutBtn {
  width: 100%;
  height: 48px;
  background: var(--color-brand);   /* Yellow */
  color: var(--color-text);          /* Black */
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.shipping {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
}
```

---

## Product Grid — `src/components/product/ProductGrid.module.css`

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 columns — not 5, not 3 */
  gap: 16px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .grid {
    gap: 8px;
  }
}
```

---

## Anti-Patterns Table

| Wrong | Correct | Why |
|-------|---------|-----|
| `color: #fff` on yellow button | `color: var(--color-text)` | White on yellow = 1.5:1 contrast (WCAG fail) |
| `border-radius: 16px` on buttons | `border-radius: 8px` | 16px is for image wrappers |
| `border-radius: 8px` on image wrappers | `border-radius: 16px` | 8px is for buttons |
| No box shadow on cards | `box-shadow: var(--shadow-card)` | Shadows are the Bewakoof card signature |
| `--color-deal` on CTA or nav | `--color-deal` only in combo success state | Orange is exclusively for combo pricing |
| `font-family: 'Cormorant Garamond'` | Montserrat only | pfecomm_02 pattern — wrong site |
| `grid-template-columns: repeat(5, 1fr)` | `repeat(4, 1fr)` | 5 cols is pfecomm_03 (AJIO) |
| Countdown timer | Nothing | Not in spec; timers are urgency theatre |
| Coins "Apply" or redemption UI | `coinsEarned` display only | Not in scope for this build |
| `printStyle` badge on solid products | `{product.printStyle !== 'solid' && ...}` | Solid tees have no print to badge |
| Licensed badge showing "Licensed" | Show `product.collection` instead | "Star Wars" is more informative than "Licensed" |
| Separate font for bold numbers | Montserrat weight 700 | No decorative font — Montserrat only |
| Hex values in `.module.css` | `var(--color-*)` tokens | All colors via CSS variables |
