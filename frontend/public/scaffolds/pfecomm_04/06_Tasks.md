# 06 — Tasks
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

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
- `Size` type (XS|S|M|L|XL|XXL|3XL)
- `Category` type (8 values)
- `PrintStyle` type (7 values: hyperprint|minimal|acid-wash|typography|solid|graphic|licensed)
- `PRINT_LABELS: Record<PrintStyle, string>` const
- `ColorOption` interface (name, swatch, inStock, sku, **images: string[]**)
- `SizeOption` interface (size, inStock)
- `Product` interface (`mrp` + `price`, `printStyle`, `collection?`, `printDescription?`, `comboEligible`, `coinsEarned`)
- `CartItem` interface (productId + name + price + mrp + color + colorSwatch + size + quantity + image + **comboEligible**)
- `WishlistItem` interface (productId + name + price + mrp + image)

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + utils
`src/app/globals.css`:
- 7 `--color-*` variables (yellow brand, orange deal, red discount, near-black text, muted, border, pure white surface)
- `--shadow-card` and `--shadow-card-hover` custom properties
- Base reset, body styles, focus ring (`2px solid var(--color-brand)`)
- `prefers-reduced-motion` block

`src/lib/utils.ts`:
```typescript
export const COMBO_QTY = 3
export const COMBO_PRICE = 1199
export const FREE_SHIPPING_THRESHOLD = 499

export function formatINR(amount: number): string
export function getDiscountPercent(mrp: number, price: number): number
export function getComboSavings(items: CartItem[]): number
export function getComboProgress(items: CartItem[]): { count: number; neededForNext: number }
```

Done when: `getDiscountPercent(799, 549)` returns `31`; `getComboProgress([...2 eligible items...])` returns `{ count: 2, neededForNext: 1 }`; `getComboSavings([...3 eligible items @ ₹549...])` returns correct savings.

---

### TASK-004: Zustand cart store
`src/store/cart.ts`:
- Persisted to `'bewakoof-cart'`
- `items: CartItem[]`, composite key `productId::color::size`
- `addItem` (increment if exists), `removeItem`, `updateQuantity`
- `openCart`, `closeCart`, `toggleCart`
- `subtotal`, `itemCount`, `comboSavings`, `shippingFee` as getters
- `comboSavings` calls `getComboSavings(get().items)` from utils

Done when: Compiles; `tsc --noEmit` clean.

---

### TASK-005: PromoBanner + TopNav + CartDrawer
`src/components/layout/PromoBanner.tsx`:
- `40px`, `background: var(--color-brand)`, `color: var(--color-text)` (black text — not white)
- `useState(true)` initially dismissed; `useEffect` from sessionStorage

`src/components/layout/TopNav.tsx` + CSS Module:
- Sticky `60px`, `1px` border-bottom
- Logo (Bewakoof wordmark, yellow text)
- Search input centered
- Cart badge: `cartStore.itemCount`, yellow background, black text

`src/components/cart/CartDrawer.tsx` + `CartItem.tsx`:
- Framer Motion, `260ms ease-out` from right
- "Proceed to Checkout": `var(--color-brand)`, black text, `8px` radius, `48px`
- Free shipping note at ₹499
- `ComboProgress` component in footer (rendered when cart has eligible items)

Mount PromoBanner + TopNav + CartDrawer in `src/app/layout.tsx`. Montserrat font via `next/font/google`.

Done when: Yellow banner with BLACK text; TopNav sticky; cart opens with yellow+black button; cart badge live.

---

## Phase 1 — Product Data + Card

### TASK-006: Mock product data (12 products)
`src/lib/products.ts`:
- Categories: tshirts (6), hoodies (2), crop-tops (2), sweatshirts (2)
- Print styles: 3+ different values represented; at least 2 solid (no badge), at least 2 licensed
- Most products discounted 20–50% (`price < mrp`)
- At least 2 products with `price === mrp` (no discount) — tests conditional rendering
- Each product: 2 `ColorOption` entries with different `images[]` arrays, `sizes` with 5–6 sizes, at least 1 OOS size
- `comboEligible: true` on all tshirts and crop-tops; `false` on hoodies and sweatshirts
- `coinsEarned`: 30–60 per product
- Licensed products: at least 2 with `collection` field ("Star Wars", "Marvel", "Friends")

Done when: `getFeaturedProducts()` returns ≥ 4; at least 2 licensed; at least 2 with no discount.

---

### TASK-007: ProductCard
`src/components/product/ProductCard.tsx` + CSS Module:

**Layout:**
- `card`: `border-radius: 16px`, `box-shadow: var(--shadow-card)`, hover lifts + deepens shadow
- `imageWrapper`: `aspect-ratio: 3/4`, `border-radius: 16px`, `overflow: hidden`
- Print badge: top-left absolute, `var(--color-brand)` bg, `var(--color-text)` text (black) — ONLY if `printStyle !== 'solid'`
- Discount badge: top-right absolute, `var(--color-discount)` bg, white text — ONLY if `discountPct > 0`
- Product name: `14px` weight 600, 2-line clamp
- Price row: selling price (bold) + MRP (strikethrough, muted, only if discounted) + discount % (red, only if discounted)
- Coins: `11px` muted always
- Color dots: `12px` circles; active dot has border highlight

**Key logic:**
```typescript
const discountPct = getDiscountPercent(product.mrp, product.price)
const isDiscounted = discountPct > 0
const showPrintBadge = product.printStyle !== 'solid'
const badgeLabel = product.printStyle === 'licensed' && product.collection
  ? product.collection
  : PRINT_LABELS[product.printStyle]
```

Done when: Solid product = no print badge. Non-discounted product = no discount badge, no MRP. Shadow deepens on hover. Black text on yellow print badge.

---

### TASK-008: ComboProgress component
`src/components/product/ComboProgress.tsx` + CSS Module:
- Reads cart state via `useCartStore`
- Calls `getComboProgress(items)` from utils
- Three states: empty (explain deal), progressing (add N more), active (combo locked in)
- Progress bar: fills proportionally
- Active state text: `var(--color-deal)` (orange) — only usage of deal color in UI
- Container: light yellow tint background, yellow border, `8px` radius

Done when: Adding 1 eligible item shows "Add 2 more". Adding 3 shows "Combo active!". Progress bar fills.

---

## Phase 2 — PDP

### TASK-009: ImageGallery + SizeSelector
`src/components/product/ImageGallery.tsx`:
- Main image + thumbnail strip
- Left/right arrow navigation
- Active thumbnail: border highlight
- Accepts `images: string[]` prop; parent controls which colorway's images to pass

`src/components/product/SizeSelector.tsx`:
- All sizes rendered
- OOS: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`, `aria-disabled="true"`
- Selected: `background: var(--color-brand); color: var(--color-text)` (black on yellow)
- `border-radius: 8px`

Done when: Gallery arrows navigate; OOS sizes strikethrough; selected size shows yellow bg + black text.

---

### TASK-010: PDP page
`src/app/products/[slug]/page.tsx`:
- `generateStaticParams`, `notFound()` if missing
- 50/50 layout: left = ImageGallery (images from `activeColor.images`), right = product info
- Right column:
  - H1: `22px` weight 700 product name
  - `printDescription` in muted italic if present
  - Price block: selling (`26px` bold) + MRP (strikethrough muted, only if discounted) + discount % (red, only if discounted)
  - Coins: "Earn {N} Bewakoof Coins on this order"
  - Color dots: `16px` circles, selected has `outline: 2px solid var(--color-text)`; clicking changes `activeColor` → gallery updates
  - SizeSelector
  - "Add to Bag": full-width, `48px`, yellow, black text, `8px` radius, disabled until size selected
  - `ComboProgress` (when `product.comboEligible`)
  - 3 Radix accordions: Product Details, Size & Fit, Delivery & Returns
  - UGC "Community Looks" — 4 placeholder images

Done when: PDP loads; price block correct on discounted + non-discounted; color swap updates gallery; Add to Bag works; ComboProgress on eligible products; UGC strip visible.

---

## Phase 3 — PLP + Filters

### TASK-011: ProductGrid + PLP page
`src/components/product/ProductGrid.tsx`:
- 4 cols desktop, 2 cols 768px+, 2 cols mobile (smaller gap)
- `gap: 16px` desktop

`src/app/products/page.tsx`:
- `'use client'`
- Reads searchParams: category (multi), printStyle (multi), size (multi), minDiscount (single number)
- Applies filters including discount range: `getDiscountPercent(mrp, price) >= minDiscount`
- Shows product count above grid: "Showing N products"

Done when: `/products` shows all 12; discount filter shows correct subset; print style filter works.

---

### TASK-012: FilterPanel
`src/components/product/FilterPanel.tsx` + CSS Module:
- Desktop: sticky sidebar, 240px
- Mobile: Framer Motion bottom sheet
- Sections:
  - Category: checkboxes
  - Print Style: checkboxes (hyperprint, graphic, licensed, etc.)
  - Discount: radio-style (30%+, 40%+, 50%+) — single `minDiscount` value
  - Size: toggle buttons
- Active filter chips above grid
- Filter state → URL params

Done when: PrintStyle + discount filter combination works; chips appear; URL reflects state.

---

## Phase 4 — Homepage + Audit

### TASK-013: Homepage
`src/app/page.tsx`:
- Hero: bold headline + yellow CTA (black text)
- Combo deal callout section: "Buy 3 tees for ₹1,199" prominent placement
- Deal section "Top Picks": horizontal product row, 6–8 products, ProductCard with badges
- Deal section "Trending Prints": same
- Categories strip: horizontal scroll of category tiles
- `src/components/layout/Footer.tsx`

Done when: Homepage renders with deal rows and combo callout section. Yellow CTA visible with black text.

---

### TASK-014: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds; all product slugs in `/out/products/`
- [ ] No hex in CSS Module files
- [ ] DevTools: CTA buttons have `border-radius: 8px`
- [ ] DevTools: image wrappers have `border-radius: 16px`
- [ ] DevTools: print badge has `border-radius: 4px`
- [ ] DevTools: ALL yellow buttons have `color: var(--color-text)` (black) — no white text on yellow
- [ ] 4-col grid confirmed on desktop (count columns in DevTools)
- [ ] Cards have box shadow at rest; shadow deepens on hover
- [ ] Solid products: no print badge
- [ ] Licensed products: print badge shows collection name (e.g., "Star Wars"), not "Licensed"
- [ ] Non-discounted products: no discount badge, no MRP visible
- [ ] Discounted products: badge shows correct %, MRP shown strikethrough
- [ ] Coins shown on all cards and PDP
- [ ] ComboProgress on PDP for eligible products
- [ ] ComboProgress in cart footer when eligible items in cart
- [ ] `getComboSavings` returns correct savings for 3 items, 6 items, 7 items
- [ ] Color dot clicking changes gallery images on PDP
- [ ] Cart persists on refresh (localStorage `'bewakoof-cart'`)
- [ ] UGC Community Looks strip on PDP
- [ ] Montserrat only — no other font family in DevTools computed styles
- [ ] `--color-brand` yellow not used as text color on any element
- [ ] `--color-deal` orange not used on any CTA or nav element
- [ ] No countdown timers anywhere
- [ ] No coins redemption UI
- [ ] All prices: `₹X,XXX` format, no decimals
- [ ] Lighthouse ≥90/90
