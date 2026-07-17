# 07 — Developer Guide
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

The most important engineering insight for this build: **the constraints are inverted from the pfecomm_01/02 stores.** What was forbidden there is correct here.

---

## 1. The Big Inversion — Read This First

If you have already built pfecomm_01 (Aritzia) or pfecomm_02 (FabIndia), your muscle memory will fight this build. Reset explicitly.

| Pattern | pfecomm_01/02 rule | pfecomm_03 rule |
|---------|-------------------|-----------------|
| Discount badges | NEVER — no urgency | **ALWAYS** — discount is the value prop |
| MRP strikethrough | NEVER — no urgency | **ALWAYS** when discounted |
| Prominent discount % | NEVER | **ALWAYS** — bold, red, on every discounted card |
| Quick-add button | NEVER | **ALWAYS** — hover pill on card |
| Wishlist | Not built | **Core feature** — separate Zustand store |
| Grid density | 4 columns | **5 columns** on desktop |
| Button radius | `0px` (01) / `2px` (02) | **`4px`** — mainstream |
| Image radius | `0px` always | **`4px`** — matches button |
| Brand accent | None (01) / maroon (02) | **AJIO orange** on all CTAs |
| Countdown timers | Never | Still never — different from discount badges |

**One thing that didn't change:** Discount badges are factual (the % off is real). Countdown timers are theatre (they create fake urgency). AJIO uses badges, not timers.

---

## 2. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| `getDiscountPercent(mrp, price)` is the only computation | No stored `discountPercent` in product data — always derived |
| Show badge ONLY when `price < mrp` | Non-discounted products must have no badge |
| Brand name FIRST on cards | Marketplace: brand is identity, product name is description |
| 5 columns on desktop | Information density signal: "thousands of products" |
| `border-radius: 4px` on buttons AND images | Consistent softness — neither sharp nor rounded |
| Two chromatic colors: brand orange + discount red | They must be visually distinct — orange ≠ red |
| Orange on large CTAs only (WCAG) | Orange fails AA contrast at small text sizes |
| Two Zustand stores, separate keys | Cart and wishlist are different user behaviors |
| Quick-add opens size picker, not page | Reduces friction in the discovery phase |

---

## 3. Discount Calculation — The Only Rule

```typescript
// src/lib/utils.ts — only place this logic lives
export function getDiscountPercent(mrp: number, price: number): number {
  if (price >= mrp) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}
```

```typescript
// In ProductCard.tsx — every usage pattern
const discountPct = getDiscountPercent(product.mrp, product.price)
const isDiscounted = discountPct > 0

// Correct:
{isDiscounted && <span className={styles.discountBadge}>{discountPct}% off</span>}
{isDiscounted && <span className={styles.mrp}>{formatINR(product.mrp)}</span>}
{isDiscounted && <span className={styles.discountPct}>{discountPct}% off</span>}

// Wrong:
{product.discountPercent && ...}                       // No such field in Product type
<span>{discountPct}% off</span>                        // Shows on non-discounted products too
{product.price < product.mrp && <span>42% off</span>} // Hardcoded percentage
```

**Test with a non-discounted product:** If `product.price === product.mrp`, the card should show ONLY the price, with no badge, no MRP, and no discount % text.

---

## 4. The Two-Store Pattern

Cart and wishlist are separate stores with completely different state shapes, behaviors, and localStorage keys.

```typescript
// Store 1 — Cart: items + bag open state + quantity management
// src/store/cart.ts → persisted to 'ajio-cart'
// CartItem has: productId, brand, name, price, mrp, color, colorSwatch, size, quantity, image
// Key behavior: composite key productId::color::size
// Adding twice → increments quantity

// Store 2 — Wishlist: product ids + toggle behavior
// src/store/wishlist.ts → persisted to 'ajio-wishlist'
// WishlistItem has: productId, brand, name, price, mrp, image (no color, no size)
// Key behavior: toggle adds/removes by productId
```

**Why separate?**
- Wishlist items don't have size or color (you haven't committed to a variant yet)
- Wishlist persists forever; cart may clear on session
- The UI behaviors are completely different: cart has quantity steppers, wishlist has remove-only
- If merged, removing from wishlist could accidentally affect cart items

```typescript
// Correct — two independent imports
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

// Wrong — one store with both
import { useStore } from '@/store/index' // Don't do this
```

---

## 5. Quick-Add Flow — State Diagram

```
ProductCard (normal state)
  └── User hovers card
      └── quickAdd pill appears (opacity 1)
          └── User clicks quickAdd
              └── e.preventDefault() (prevents card link)
                  └── setSizePickerOpen(true)
                      └── SizePicker renders (overlay)
                          ├── User clicks outside → setSizePickerOpen(false) → card returns to normal
                          ├── User selects size
                          │   └── User clicks "ADD TO BAG"
                          │       ├── addItem(cartItem) → cartStore
                          │       ├── openCart()
                          │       └── setSizePickerOpen(false)
                          └── User clicks X → setSizePickerOpen(false) → no item added
```

**Key: `e.preventDefault()` on the quickAdd click.** The card image is wrapped in a `<Link>`. Without `e.preventDefault()` on the quick-add button, clicking it would also trigger the link and navigate to the PDP.

---

## 6. WCAG Orange Warning

AJIO orange (`hsl(18deg 87% 53%)`) has approximately 3.1:1 contrast on white. This fails WCAG AA for normal text (requires 4.5:1) but passes for large text (requires 3:1).

```css
/* CORRECT — orange on large CTAs only */
.addToBagBtn { background: var(--color-brand); color: #fff; height: 48px; }
/* White on orange passes contrast (21:1) */

/* WRONG — orange on small text */
.brandName { color: var(--color-brand); font-size: 12px; }
/* 3.1:1 fails WCAG AA for 12px text */
```

**Rule:** `--color-brand` orange appears as a background color (on buttons with white text) or as large icon fills. It NEVER appears as text color on any element under 18px.

The nav badge (tiny) uses orange as background with white text — this passes because white text on orange has 7:1 contrast.

---

## 7. Common Mistakes

### Mistake 1: Storing discountPercent in product data

```typescript
// WRONG — discount is derived
interface Product {
  discountPercent: number  // Should not exist
}

// CORRECT — derive at render time
const discountPct = getDiscountPercent(product.mrp, product.price)
```

### Mistake 2: Showing badge on all products

```tsx
// WRONG — shows badge even when price === mrp
<span className={styles.discountBadge}>
  {getDiscountPercent(product.mrp, product.price)}% off
</span>

// CORRECT — conditional
{product.price < product.mrp && (
  <span className={styles.discountBadge}>
    {getDiscountPercent(product.mrp, product.price)}% off
  </span>
)}
```

### Mistake 3: Making buttons `border-radius: 0`

```css
/* WRONG — that's Aritzia */
.addToBagBtn { border-radius: 0; }

/* CORRECT — AJIO is mainstream */
.addToBagBtn { border-radius: 4px; }
```

### Mistake 4: Using same color for CTA and discount badge

```css
/* WRONG — both orange, user can't distinguish CTA from discount */
.discountBadge { background: var(--color-brand); }
.addToBagBtn { background: var(--color-brand); }

/* CORRECT — distinct colors for distinct meanings */
.discountBadge { background: var(--color-discount); }  /* red */
.addToBagBtn { background: var(--color-brand); }       /* orange */
```

### Mistake 5: 4-column grid (copying from pfecomm_01)

```css
/* WRONG */
.grid { grid-template-columns: repeat(4, 1fr); }

/* CORRECT */
.grid { grid-template-columns: repeat(5, 1fr); }
```

### Mistake 6: Product name before brand name

```tsx
// WRONG — product name first (that's a mono-brand store)
<p className={styles.productName}>{product.name}</p>
<p className={styles.brandName}>{product.brand}</p>

// CORRECT — brand FIRST (marketplace convention)
<p className={styles.brandName}>{product.brand.toUpperCase()}</p>
<p className={styles.productName}>{product.name}</p>
```

### Mistake 7: Merging cart and wishlist stores

```typescript
// WRONG — one store for both
const store = create(() => ({
  cartItems: [],
  wishlistItems: [],
  // ...
}))

// CORRECT — separate stores
// store/cart.ts → 'ajio-cart'
// store/wishlist.ts → 'ajio-wishlist'
```

### Mistake 8: Quick-add navigates to PDP instead of opening picker

```tsx
// WRONG — causes navigation
<button className={styles.quickAdd} onClick={() => setSizePickerOpen(true)}>
  ADD TO BAG
</button>

// CORRECT — prevent link activation
<button
  className={styles.quickAdd}
  onClick={(e) => { e.preventDefault(); setSizePickerOpen(true) }}
>
  ADD TO BAG
</button>
```

### Mistake 9: Adding countdown timers

```tsx
// WRONG — this is urgency theatre, not discount factuality
<div>Sale ends in: {countdown}</div>

// Discount badges ARE correct:
<span>{discountPct}% off</span>  // Factual, not manufactured urgency
```

### Mistake 10: Per-colorway images like pfecomm_01/02

```typescript
// WRONG — AJIO products have shared images
interface ColorVariant {
  images: string[]  // This is pfecomm_01 architecture
}

// CORRECT — shared images, color dots only
interface Product {
  images: string[]       // Shared across all colors
  colors: ColorOption[]  // name + swatch hex, no images
}
```

---

## 8. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] DevTools: CTA buttons `border-radius: 4px`
- [ ] DevTools: product image wrappers `border-radius: 4px`
- [ ] DevTools: discount badges `border-radius: 2px`
- [ ] DevTools: quick-add pill `border-radius: 100px`
- [ ] 5-column grid confirmed on desktop
- [ ] Non-discounted product: NO badge, NO MRP, NO discount %
- [ ] Discounted product: badge shows correct computed %, price row shows MRP + %
- [ ] Brand name is FIRST (uppercase, weight 700) on all cards
- [ ] Quick-add hover: pill appears on hover, disappears on leave
- [ ] Quick-add click: size picker opens (not PDP navigation)
- [ ] Size picker: selecting size + confirm adds to cart and opens drawer
- [ ] Wishlist heart: fills on save, unfills on remove, animates
- [ ] Wishlist persists on page refresh (localStorage 'ajio-wishlist')
- [ ] Cart persists on page refresh (localStorage 'ajio-cart')
- [ ] Wishlist and cart are independent (different localStorage keys confirmed)
- [ ] TopNav wishlist badge = wishlist.count
- [ ] TopNav cart badge = cart.itemCount
- [ ] Both badges update without page refresh
- [ ] PromoBanner is orange (not black, not maroon)
- [ ] Cart checkout button is orange
- [ ] `--color-brand` not used on any text under 18px (inspect text elements)
- [ ] All prices: `₹X,XXX` format, no decimals
- [ ] Discount filter: "50%+" shows products with ≥50% off only
- [ ] Brand filter: "Nike" shows only Nike products
- [ ] Filter state in URL params
- [ ] `/wishlist` page shows all saved items
- [ ] No countdown timers anywhere
- [ ] No hex in CSS Module files
- [ ] Lighthouse performance ≥90
- [ ] Lighthouse accessibility ≥90
