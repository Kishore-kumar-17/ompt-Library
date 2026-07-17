# 06 — Tasks
## Indian Heritage Fashion Storefront · pfecomm_platform_02

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

### TASK-002: TypeScript schema + CRAFT_LABELS
Create `src/types/index.ts` with all interfaces:
- `CraftTechnique` type (8 values: 7 techniques + `'none'`)
- `Fabric` type (7 values)
- `Category` type (8 values)
- `SizeVariant` interface
- `ColorVariant` interface (with `images: string[]`, natural dye `name`)
- `Product` interface (with `craftTechnique`, `fabric`, optional `origin`)
- `CartItem` interface (with `craftTechnique`)
- `CRAFT_LABELS: Record<CraftTechnique, string>` const

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + globals + utility
Create `src/app/globals.css`:
- 7 `--color-*` custom properties
- Base reset (`*, *::before, *::after { box-sizing: border-box; margin: 0 }`)
- Body styles: `background: var(--color-bg)`, `color: var(--color-text)`, `font-family: var(--font-body)`
- Focus ring: `2px solid var(--color-maroon)` offset `2px`
- `prefers-reduced-motion` block

Create `src/lib/utils.ts`:
```typescript
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
```

Done when: Body renders warm ivory; DevTools shows 7 CSS custom properties; `formatINR(2499)` returns `"₹2,499"`.

---

### TASK-004: Font setup in layout.tsx
In `src/app/layout.tsx`:
```typescript
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})
// Apply both variables to <html>
```

Done when: Both `--font-display` and `--font-body` present in DevTools on `<html>` element.

---

### TASK-005: Zustand cart store
Create `src/store/cart.ts`:
- `zustand/middleware` persist to `'pfecomm-craft-cart'`
- Items keyed by composite `productId::color::size`
- `addItem` increments quantity if key exists
- `removeItem`, `updateQuantity` (qty ≤ 0 removes item)
- `openCart`, `closeCart`, `toggleCart`
- `subtotal` and `itemCount` as getters
- Export `FREE_SHIPPING_THRESHOLD = 999`

Done when: `useCartStore()` compiles; `tsc --noEmit` clean.

---

### TASK-006: PromoBanner
Create `src/components/layout/PromoBanner.tsx` + `PromoBanner.module.css`:
- `40px` maroon bar (`var(--color-maroon)`), white `11px` uppercase centered text
- `useState(true)` initially dismissed — `useEffect` reads sessionStorage, sets `false` if not dismissed
- Dismiss X button with `aria-label="Dismiss banner"`
- Collapse: `style={{ maxHeight: dismissed ? '0' : '40px', overflow: 'hidden' }}`
- On dismiss: write sessionStorage, set state

Done when: Banner visible on first load (maroon background); dismiss collapses; refresh in same tab keeps dismissed.

---

### TASK-007: MegaNav + CartDrawer
Create `src/components/layout/MegaNav.tsx` + `MegaNav.module.css`:
- Sticky, `64px` height, `1px solid var(--color-border)` bottom
- Logo: Cormorant Garamond wordmark, `22px`
- Nav links hover: `var(--color-maroon)`
- Cart count badge: maroon background

Create `src/components/cart/CartDrawer.tsx` + `CartDrawer.module.css`:
- Framer Motion `AnimatePresence`, `280ms ease-out` from right
- Semi-transparent backdrop (`rgba(0,0,0,0.4)`)
- `role="dialog"`, `aria-modal="true"`, `aria-label="Shopping cart"`
- Scroll lock: `document.body.style.overflow = 'hidden'` when open
- Empty state: "Your cart is empty."
- Free shipping note: ₹999 threshold, formatted with `formatINR`
- "Proceed to Checkout" full-width **maroon** button (`var(--color-maroon)`)

Create `src/components/cart/CartItem.tsx` + `CartItem.module.css`:
- Colorway image (64×80px), craft badge + name, color + size, stepper, remove link

Mount PromoBanner + MegaNav + CartDrawer in `src/app/layout.tsx`.

Done when: Cart opens/closes; badge shows item count; maroon banner + maroon checkout button; dismiss banner persists.

---

## Phase 1 — Product Data + Card

### TASK-008: Mock product data
Create `src/lib/products.ts`:
- 12 products: cover 4+ categories (kurtas, dupattas, kurta-sets, tops)
- Cover 4+ craft techniques (hand-block-print, handloom, embroidery, ajrakh)
- Cover 3+ fabrics (cotton, linen, silk) and 3+ artisan origins
- Each product: 2–3 `ColorVariant` entries, each with 3 image URLs and 4–5 sizes
- At least 2 `isSale: true` with `salePrice`
- At least 4 `isNew: true`
- Natural dye color names: "Indigo", "Madder Red", "Turmeric", "Natural", "Mud Brown", "Sage"
- Export `getProductBySlug`, `getFeaturedProducts`, `getNewProducts`, helpers

Done when: `getFeaturedProducts()` returns ≥ 4; all 4+ craft techniques represented.

---

### TASK-009: ProductCard with swatch hover + craft badge
Create `src/components/product/ProductCard.tsx` + `ProductCard.module.css`:
- `hoveredColorIndex` state, default 0
- Card image src: `product.colors[hoveredColorIndex].images[0]`
- Swatches: `onMouseEnter` sets index. `style={{ background: color.swatch }}` (only hex in JSX)
- **No CSS transition on image** — instant swap
- Craft badge: only if `product.craftTechnique !== 'none'` → `CRAFT_LABELS[product.craftTechnique]`
- Fabric label: `12px` muted below product name
- Sale price: saffron-orange `var(--color-sale)` + strikethrough original
- Prices via `formatINR()`
- `aspect-ratio: 3/4` on image wrapper, `border-radius: 0`

Done when: Hovering swatches changes image instantly. Craft badges appear on correct products. Sale prices are saffron-orange in ₹.

---

## Phase 2 — PDP

### TASK-010: ImageGallery
Create `src/components/product/ImageGallery.tsx` + `ImageGallery.module.css`:
- Props: `images: string[]`, `alt: string`
- `galleryIndex` state
- Large main image (`aspect-ratio: 3/4`, no border-radius)
- Thumbnail row (`72×90px` each): clicking thumb sets `galleryIndex`
- Active thumb: `opacity: 1`. Others: `opacity: 0.5`
- No carousel arrows

Done when: Gallery loads; clicking thumbnails updates main image.

---

### TASK-011: ColorSelector + SizeSelector
Create `src/components/product/ColorSelector.tsx`:
- Props: `colors: ColorVariant[]`, `selected: ColorVariant`, `onChange: (c: ColorVariant) => void`
- `24px` swatch circles, `border-radius: 50%`
- Active: `outline: 2px solid var(--color-maroon); outline-offset: 2px`
- Color name label shows natural dye name on active/hover

Create `src/components/product/SizeSelector.tsx`:
- Props: `sizes: SizeVariant[]`, `selected: string | null`, `onChange: (s: string) => void`
- Render ALL sizes (never hide OOS)
- OOS: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`, `aria-disabled="true"`
- Selected: `background: var(--color-maroon); color: #fff`
- Button `border-radius: 2px`

Done when: Color selector active state visible in maroon; size OOS state visible; OOS click has no effect.

---

### TASK-012: PDP page
Create `src/app/products/[slug]/page.tsx` + CSS Module:
- `generateStaticParams` from `products.map(p => ({ slug: p.slug }))`
- `notFound()` if product not found
- State: `selectedColor`, `selectedSize`, `galleryIndex`
- `handleColorChange`: set color, reset gallery to 0, reset size
- PDP layout: left 55% (ImageGallery), right 45% (info)
- Right column top to bottom: craft badge, H1 product name in `--font-display` 24px weight 500, origin line if `product.origin`, price, ColorSelector, SizeSelector, Add to Cart button
- `canAddToCart`: `selectedSize !== null && sizes.find(s.size === selectedSize)?.inStock === true`
- On Add to Cart: `addItem(cartItem)` + `openCart()`
- 3 Radix `<Accordion>` sections: Details (includes craft technique, fabric, origin), Care (natural dye wash care), Delivery & Returns

Done when: All product pages load; color change updates gallery; H1 in Cormorant Garamond; origin line shows; Add to Cart opens maroon cart.

---

## Phase 3 — PLP + Filter

### TASK-013: ProductGrid + PLP page
Create `src/components/product/ProductGrid.tsx`:
- CSS Grid: 4/3/2 columns at breakpoints
- Renders array of ProductCards

Create `src/app/products/page.tsx` + CSS Module:
- `'use client'`
- Reads `useSearchParams()` for filter state (category, craft, fabric, size, sale)
- Filters `products` array by all active filters
- Shows filtered count
- Renders ProductGrid + FilterPanel side by side on desktop

Done when: `/products` shows all 12 products; URL filter params apply correctly.

---

### TASK-014: FilterPanel
Create `src/components/product/FilterPanel.tsx` + CSS Module:
- Desktop: sticky sidebar, 240px wide
- Mobile: bottom sheet (Framer Motion slide-up)
- Filter sections: Category (checkboxes), Craft Technique (checkboxes using CRAFT_LABELS), Fabric (checkboxes), Size (toggle buttons), Sale only (checkbox)
- Each change: `router.push` with updated URL params
- Active filter chips above grid
- "Clear all" link

Done when: Filtering by "Handloom" shows only handloom products; craft technique names display correctly; chips appear and remove filters; URL reflects state.

---

## Phase 4 — Homepage + Audit

### TASK-015: Homepage
Create `src/app/page.tsx`:
- Editorial hero: full-bleed `90vh`, `<Image priority>`, Cormorant Garamond headline
- Craft collection strip 1: "The Indigo Edit" — image left, content right (`var(--color-bg-warm)`)
- Craft collection strip 2: "Handloom Essentials" — image right, content left
- New arrivals section: label "NEW IN" (`11px` uppercase), 4-col ProductCard grid
- Artisan Story strip: full-width `var(--color-bg-warm)`, Cormorant Garamond centered text
- Footer: `src/components/layout/Footer.tsx` — 4 columns, `13px` links

Done when: Homepage renders; hero loads; craft strips display; artisan story strip centered.

---

### TASK-016: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/app/ src/components/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds; `/out/products/` has all 12 slugs
- [ ] Grep CSS hex: zero results
- [ ] DevTools: every `<button>` has `border-radius: 2px` (not 0, not 4)
- [ ] DevTools: every product image container has `border-radius: 0`
- [ ] DevTools: body background is warm ivory (not pure white)
- [ ] Swatch hover: instant image swap on 5 different products
- [ ] Craft badges: all 4+ technique products show correct label
- [ ] `craftTechnique === 'none'` products: no badge
- [ ] Sale products: saffron-orange price + strikethrough original
- [ ] OOS sizes: strikethrough + 0.4 opacity, non-interactive
- [ ] PDP H1: in Cormorant Garamond (`font-family: var(--font-display)`)
- [ ] PDP origin line: shows for products with `origin` field
- [ ] Add to Cart: adds item, opens drawer with maroon checkout button
- [ ] Cart free shipping: shows ₹999 threshold in `₹X,XXX` format
- [ ] All prices: ₹ symbol, no decimals, `en-IN` formatting
- [ ] PromoBanner: maroon background, dismisses, stays dismissed
- [ ] Focus rings: `2px solid var(--color-maroon)` visible on keyboard navigation
- [ ] No urgency copy (grep: "only", "limited", "selling", "hurry")
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90

Done when: All checklist items confirmed.
