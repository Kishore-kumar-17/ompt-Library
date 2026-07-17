# 06 — Tasks
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]."

---

## Phase 0 — Foundation

### TASK-001: Project setup + dependencies
```bash
npx create-next-app@latest store --typescript --app --src-dir --no-eslint --no-tailwind
cd store
npm install zustand framer-motion @radix-ui/react-accordion lucide-react
```
`next.config.ts`: `output: 'export', images: { unoptimized: true }`

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts`:
- `Size` type (XS|S|M|L|XL|XXL)
- `Category` type (8 values)
- `ColorOption` interface (name, swatch, inStock, sku)
- `SizeOption` interface (size, inStock)
- `Product` interface (`mrp` + `price` — no `discountPercent` field)
- `CartItem` interface (brand + name + mrp + price + color + colorSwatch + size)
- `WishlistItem` interface (productId + brand + name + price + mrp + image)

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + utils
`src/app/globals.css`:
- 7 `--color-*` variables (pure white bg, two chromatic values: brand orange + discount red)
- Base reset, body styles, focus ring (`2px solid var(--color-brand)`)
- `prefers-reduced-motion` block

`src/lib/utils.ts`:
```typescript
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
export function getDiscountPercent(mrp: number, price: number): number {
  if (price >= mrp) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}
```

Done when: `getDiscountPercent(2499, 1499) === 40`; `formatINR(1499) === "₹1,499"`.

---

### TASK-004: Zustand cart store
`src/store/cart.ts`:
- Persisted to `'ajio-cart'`
- `items: CartItem[]`, composite key `productId::color::size`
- `addItem` (increment if exists), `removeItem`, `updateQuantity`
- `openCart`, `closeCart`, `toggleCart`
- `subtotal` and `itemCount` as getters
- Export `FREE_SHIPPING_THRESHOLD = 599`

Done when: Compiles; `tsc --noEmit` clean.

---

### TASK-005: Zustand wishlist store
`src/store/wishlist.ts`:
- Persisted to `'ajio-wishlist'` (different key from cart)
- `items: WishlistItem[]`
- `toggle(item: WishlistItem)` — adds if absent, removes if present
- `isWishlisted(productId: string): boolean`
- `remove(productId: string)`
- `count` getter

Done when: Compiles; wishlist persists separately from cart.

---

### TASK-006: PromoBanner + TopNav + CartDrawer
`src/components/layout/PromoBanner.tsx`:
- `40px`, `background: var(--color-brand)`, white `11px` uppercase text
- `useState(true)` initially dismissed; `useEffect` from sessionStorage

`src/components/layout/TopNav.tsx` + CSS Module:
- Sticky `60px`, `1px` border-bottom
- Logo (AJIO wordmark, orange text)
- Search input centered
- Wishlist badge: `wishlistStore.count`
- Cart badge: `cartStore.itemCount`
- Both badges: `var(--color-brand)` background

`src/components/cart/CartDrawer.tsx` + `CartItem.tsx`:
- Framer Motion, `260ms ease-out` from right
- "Proceed to Checkout": `var(--color-brand)`, `4px` radius, `48px`
- Free shipping note at ₹599
- Cart item: brand name above product name, color + size, stepper, remove

Mount PromoBanner + TopNav + CartDrawer in `src/app/layout.tsx`. Inter font via `next/font/google`.

Done when: Orange banner; TopNav sticky; cart opens/closes with orange button; both badges live.

---

## Phase 1 — Product Data + Card

### TASK-007: Mock product data (12 products)
`src/lib/products.ts`:
- Brands: Nike, Adidas, H&M, Levi's, Roadster, Biba, W, AJIO (own-label)
- Categories: tshirts, jeans, dresses, kurtas, trousers, activewear (4+ represented)
- Most products discounted 30–70% (`price < mrp`)
- At least 2 products with `price === mrp` (no discount) — tests conditional rendering
- Each product: 2–3 `ColorOption` entries (hex swatches), `sizes` array with 4–5 sizes, at least 1 OOS size
- `images: string[]` — shared across colors (3 images per product)

Done when: `getFeaturedProducts()` returns ≥ 4; brands include 5+ different values.

---

### TASK-008: ProductCard
`src/components/product/ProductCard.tsx` + CSS Module:

**Layout:**
- `imageWrapper`: `aspect-ratio: 3/4`, `border-radius: 4px`, `overflow: hidden`
- Discount badge: top-left absolute, `var(--color-discount)` bg — ONLY if `discountPct > 0`
- Wishlist heart: top-right absolute, `background: rgba(255,255,255,0.9)`, circle
- Product image: fills `imageWrapper`
- Quick-add pill: bottom center, `opacity: 0` → `.card:hover .quickAdd { opacity: 1 }`, `150ms`
- Brand name: `12px` weight 700 uppercase FIRST
- Product name: `13px` weight 400, 2-line clamp
- Price row: selling price (bold) + MRP (strikethrough, muted, only if discounted) + discount % (red, only if discounted)
- Color dots: `10px` circles

**Key logic:**
```typescript
const discountPct = getDiscountPercent(product.mrp, product.price)
const isDiscounted = discountPct > 0
// Brand name first, never product name first
// discountBadge: only if isDiscounted
// MRP row: only if isDiscounted
```

Done when: Non-discounted product shows NO badge and NO MRP. Discounted product shows correct % badge. Brand name uppercase before product name.

---

### TASK-009: SizePicker mini-overlay
`src/components/product/SizePicker.tsx` + CSS Module:
- Bottom sheet on mobile, centered on desktop
- All product sizes shown; OOS = strikethrough + `disabled`
- Selecting a size enables "ADD TO BAG" button in picker
- On confirm: `addItem(cartItem)` → `openCart()` → `onClose()`
- On backdrop click: `onClose()` (no item added)
- Cart item uses first in-stock color as default color

Done when: Quick-add on card → size picker opens → select size → add → cart opens with item.

---

## Phase 2 — PDP

### TASK-010: ImageGallery + SizeSelector
`src/components/product/ImageGallery.tsx`:
- Main image + thumbnail strip
- Left/right arrow navigation
- Active thumbnail: border highlight

`src/components/product/SizeSelector.tsx`:
- All sizes rendered
- OOS: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`
- Selected: `background: var(--color-brand); color: #fff`
- `border-radius: 4px`

Done when: Gallery arrows navigate; OOS sizes strikethrough.

---

### TASK-011: PDP page
`src/app/products/[slug]/page.tsx`:
- `generateStaticParams`, `notFound()` if missing
- 50/50 layout: left = ImageGallery, right = product info
- Right column:
  - Brand: `14px` uppercase weight 700
  - H1: `18px` weight 600 product name
  - Price block: selling (`22px` bold) + MRP (strikethrough muted, only if discounted) + discount % (red, only if discounted)
  - Color dots: `16px` circles, selected has `outline: 2px solid var(--color-brand)`
  - SizeSelector
  - "Add to Bag": full-width, `48px`, `var(--color-brand)`, `4px` radius, disabled until size selected
  - Wishlist button: outline variant, `48px`, `4px` radius
  - 3 Radix accordions: Product Details, Size & Fit, Delivery & Returns
- On Add to Bag: `addItem(...)` → `openCart()`

Done when: PDP loads; price block correct on discounted + non-discounted; Add to Bag works; wishlist button updates heart state.

---

## Phase 3 — PLP + Filters

### TASK-012: ProductGrid + PLP page
`src/components/product/ProductGrid.tsx`:
- 5 cols desktop, 3 cols 900px+, 2 cols mobile
- `gap: 12px` desktop

`src/app/products/page.tsx`:
- `'use client'`
- Reads searchParams: brand (multi), category (multi), size (multi), minDiscount (single number)
- Applies filters including discount range: `getDiscountPercent(mrp, price) >= minDiscount`
- Shows product count above grid: "Showing N products"

Done when: `/products` shows all 12; discount filter shows correct subset.

---

### TASK-013: FilterPanel
`src/components/product/FilterPanel.tsx` + CSS Module:
- Desktop: sticky sidebar, 240px
- Mobile: Framer Motion bottom sheet
- Sections:
  - Brand: checkboxes with search-within input to filter the brand list
  - Category: checkboxes
  - Discount: radio-style (30%+, 40%+, 50%+, 60%+, 70%+) — single minDiscount value
  - Size: toggle buttons
- Active filter chips above grid
- Filter state → URL params

Done when: Brand + discount filter combination works; chips appear; URL reflects state.

---

## Phase 4 — Homepage + Wishlist + Audit

### TASK-014: Homepage + Wishlist page
`src/app/page.tsx`:
- Hero: bold headline + orange CTA
- Deal section "Up to 60% Off": horizontal product row, 8 products, ProductCard with badges
- Deal section "Trending Now": same
- Brand logos strip: horizontal scroll
- New arrivals: 5-col grid

`src/app/wishlist/page.tsx`:
- "Saved items ({count})" heading
- Product grid of saved items
- Remove from wishlist; Add to bag (opens SizePicker)
- Empty state

`src/components/layout/Footer.tsx`

Done when: Homepage renders with deal rows. Wishlist page shows persisted items.

---

### TASK-015: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds; all product slugs in `/out/products/`
- [ ] No hex in CSS Module files
- [ ] DevTools: CTA buttons have `border-radius: 4px`
- [ ] DevTools: image wrappers have `border-radius: 4px`
- [ ] DevTools: discount badges have `border-radius: 2px`
- [ ] DevTools: quick-add pill has `border-radius: 100px`
- [ ] 5-col grid confirmed on desktop (count columns in DevTools)
- [ ] Non-discounted products: no badge, no MRP visible
- [ ] Discounted products: badge shows correct %, price row shows MRP + discount %
- [ ] Brand name appears FIRST on all cards (above product name)
- [ ] Wishlist heart toggles; persists on page refresh
- [ ] Cart and wishlist badges update live in nav
- [ ] Cart and wishlist are independent stores (different localStorage keys)
- [ ] Quick-add → size picker → add → cart opens
- [ ] PDP price block correct for both discounted and non-discounted products
- [ ] Orange `--color-brand` not used on any text element under 18px
- [ ] All prices: `₹X,XXX` format, no decimals
- [ ] No countdown timers anywhere
- [ ] PromoBanner is orange
- [ ] Lighthouse ≥90/90
