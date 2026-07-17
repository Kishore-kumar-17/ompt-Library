# 06 — Tasks
## Premium Fashion Retail Storefront · pfecomm_platform_01

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."

---

## Phase 0 — Foundation

### TASK-001: Project setup + dependencies
```bash
npx create-next-app@latest store --typescript --app --src-dir --no-eslint --no-tailwind
cd store
npm install zustand framer-motion @radix-ui/react-accordion lucide-react
```
`next.config.ts`:
```typescript
const nextConfig: NextConfig = { output: 'export', images: { unoptimized: true } }
```

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts` with all interfaces:
- `Brand` type (5 values)
- `Category` type (7 values)
- `SizeVariant` interface
- `ColorVariant` interface (with `images: string[]`)
- `Product` interface
- `CartItem` interface

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + globals
Create `src/app/globals.css`:
- 6 `--color-*` custom properties (from 03_Design.md)
- Base reset (`*, *::before, *::after { box-sizing: border-box; margin: 0 }`)
- Body styles: background, color, font-family
- Universal `:focus-visible` ring: `2px solid var(--color-text)` offset `2px`
- `prefers-reduced-motion` block

Setup Inter in `src/app/layout.tsx`:
- `next/font/google`, weights 400/500/600, `variable: '--font-inter'`
- Apply variable to `<html>` element

Done when: Body renders white; DevTools shows CSS custom properties; Inter loads.

---

### TASK-004: Zustand cart store
Create `src/store/cart.ts`:
- `zustand/middleware` persist to `'pfecomm-cart'`
- Items keyed by composite `productId::color::size`
- `addItem` increments quantity if key exists
- `removeItem`, `updateQuantity` (qty ≤ 0 removes item)
- `openCart`, `closeCart`, `toggleCart`
- `subtotal` and `itemCount` as getters

Done when: `useCartStore()` compiles; `tsc --noEmit` clean.

---

### TASK-005: PromoBanner
Create `src/components/layout/PromoBanner.tsx` + `PromoBanner.module.css`:
- 40px black bar, white `11px` uppercase centered text
- Dismiss X button with `aria-label="Dismiss banner"`
- `useState(dismissed)`, initialized from `sessionStorage` in `useEffect`
- Collapse: `style={{ maxHeight: dismissed ? '0' : '40px', overflow: 'hidden' }}`
- On dismiss: write `sessionStorage`, set state

Done when: Banner visible on first load; dismiss collapses it smoothly; refresh in same tab keeps it dismissed.

---

### TASK-006: MegaNav + CartDrawer
Create `src/components/layout/MegaNav.tsx` + `MegaNav.module.css`:
- Sticky, 60px height, `1px solid var(--color-border)` bottom
- Logo left, nav links center, icons right
- Cart icon: `ShoppingBag` from Lucide, cart count badge from `useCartStore().itemCount`
- Cart icon click: `useCartStore().openCart()`
- Mobile layout at `max-width: 900px`

Create `src/components/cart/CartDrawer.tsx` + `CartDrawer.module.css`:
- Framer Motion `AnimatePresence`
- Backdrop: `opacity 0 → 1`, `280ms`. Drawer: `x: '100%' → 0`, `280ms ease-out`
- `role="dialog"`, `aria-modal="true"`, `aria-label="Shopping bag"`
- Scroll lock: `document.body.style.overflow = 'hidden'` when open
- Empty state: "Your bag is empty."
- Free shipping note: `FREE_SHIPPING_THRESHOLD = 200`
- "Proceed to Checkout" full-width black button

Create `src/components/cart/CartItem.tsx` + `CartItem.module.css`:
- Colorway image (64×80px), sub-brand badge + name, color + size, stepper, remove link

Mount PromoBanner + MegaNav + CartDrawer in `src/app/layout.tsx`.

Done when: Cart opens/closes; badge shows item count; dismiss banner persists.

---

## Phase 1 — Product Data + Card

### TASK-007: Mock product data
Create `src/lib/products.ts`:
- 12 products: at least 2 per sub-brand (Aritzia, TNA, Wilfred, Sunday Best, Auxiliary)
- Cover at least 4 categories (tops, bottoms, dresses, outerwear or knitwear)
- Each product: 2–3 `ColorVariant` entries, each with 3 image URLs and 4–5 sizes
- At least 2 products `isSale: true` with `salePrice`
- At least 4 products `isNew: true`
- Realistic names: "Effortless Pant", "TNA Supima Tee", "Wilfred Babaton Dress", "Sunday Best Sequin Mini"
- Export `getProductBySlug`, `getFeaturedProducts`, helper functions

Done when: `getFeaturedProducts()` returns ≥ 4; all 5 sub-brands represented.

---

### TASK-008: ProductCard with swatch hover
Create `src/components/product/ProductCard.tsx` + `ProductCard.module.css`:
- `hoveredColorIndex` state, default 0
- Card image src: `product.colors[hoveredColorIndex].images[0]`
- Swatches: `onMouseEnter` sets `hoveredColorIndex`. `style={{ background: color.swatch }}` (only place hex appears)
- **No CSS transition on image element** — instant swap
- Sub-brand badge: only if `product.brand !== 'Aritzia'`
- Sale price: red `var(--color-sale)` + strikethrough original
- `aspect-ratio: 3/4` on image wrapper, `border-radius: 0`

Done when: Hovering each swatch changes card image instantly. Badges correct. Sale prices display correctly.

---

## Phase 2 — PDP

### TASK-009: ImageGallery
Create `src/components/product/ImageGallery.tsx` + `ImageGallery.module.css`:
- Props: `images: string[]`, `alt: string`
- `galleryIndex` state
- Large main image (aspect 3:4, `position: relative`, `fill`, no border-radius)
- Thumbnail row: clicking thumb sets `galleryIndex`
- Active thumb: `opacity: 1`. Others: `opacity: 0.5`
- No carousel arrows

Done when: Gallery loads; clicking thumbnails updates main image.

---

### TASK-010: ColorSelector + SizeSelector
Create `src/components/product/ColorSelector.tsx`:
- Props: `colors: ColorVariant[]`, `selected: ColorVariant`, `onChange: (c: ColorVariant) => void`
- 24px swatch circles, `border-radius: 50%`
- Active: `outline: 2px solid var(--color-text); outline-offset: 2px`
- Color name label updates on hover/active

Create `src/components/product/SizeSelector.tsx`:
- Props: `sizes: SizeVariant[]`, `selected: string | null`, `onChange: (s: string) => void`
- Render ALL sizes (never hide OOS)
- OOS: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`, `aria-disabled="true"`
- Selected: `background: var(--color-text); color: var(--color-bg)`
- Button `border-radius: 0`

Done when: Color selector active state visible; size OOS state visible; OOS click has no effect.

---

### TASK-011: PDP page
Create `src/app/products/[slug]/page.tsx` + CSS Module:
- `generateStaticParams` from `products.map(p => ({ slug: p.slug }))`
- `notFound()` if product not found
- State: `selectedColor`, `selectedSize`, `galleryIndex`
- `handleColorChange`: set color, reset gallery to 0, reset size
- `canAddToCart`: `selectedSize !== null && sizes find inStock === true`
- "Add to Cart" onClick: `addItem({ ...cartItemData })` + `openCart()`
- 3 Radix `<Accordion>` sections: Details, Care, Delivery & Returns
- Left 55% / Right 45% CSS grid

Done when: All product pages load; color change updates gallery; Add to Cart works; accordions expand.

---

## Phase 3 — PLP + Filter

### TASK-012: ProductGrid + PLP page
Create `src/components/product/ProductGrid.tsx`:
- CSS Grid: 4/3/2 columns at breakpoints
- Renders array of ProductCards

Create `src/app/products/page.tsx` + CSS Module:
- `'use client'`
- Reads `useSearchParams()` for filter state
- Filters `products` array by active brands, categories, sizes, saleOnly
- Shows filtered count
- Renders ProductGrid + FilterPanel side by side on desktop

Done when: `/products` shows all 12 products; URL filter params apply correctly.

---

### TASK-013: FilterPanel
Create `src/components/product/FilterPanel.tsx` + CSS Module:
- Desktop: sticky sidebar
- Mobile: bottom sheet (Framer Motion, triggered by "Filter" button above grid)
- Filter sections: Sub-brand (checkboxes), Category (checkboxes), Size (toggle buttons), Sale only (checkbox)
- Each filter change: `router.push` with updated URL params
- Active filter chips above grid
- "Clear all" link

Done when: Filtering by TNA shows only TNA products; chips display; chips remove individual filters; back button restores filter state.

---

## Phase 4 — Homepage + Audit

### TASK-014: Homepage
Create `src/app/page.tsx`:
- Editorial hero: full-bleed `90vh`, Next.js `<Image priority>`, minimal overlay
- Collection strip: `getFeaturedProducts()` in a 4-col `ProductCard` grid with section label "NEW IN"
- Footer: `src/components/layout/Footer.tsx` — 4 columns, `13px` links

Done when: Homepage renders without errors; hero image loads; product grid shows.

---

### TASK-015: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/app/ src/components/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds; `/out/products/` has all 12 slugs
- [ ] grep CSS hex: zero results (swatch inline styles are in JSX, not CSS — these are acceptable)
- [ ] DevTools: every button and image container has `border-radius: 0` or no border-radius
- [ ] Swatch hover: instant image swap, no transition visible on 5 different products
- [ ] Sub-brand badges: all 4 non-Aritzia brands show badge; Aritzia products don't
- [ ] Sale products: red price + strikethrough original
- [ ] PDP add to cart: adds item, opens drawer, correct colorway image in drawer
- [ ] Filter: brand + category combination filters correctly
- [ ] PromoBanner: dismisses and stays dismissed in session
- [ ] Focus rings visible on keyboard navigation
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90

Done when: All checklist items confirmed.
