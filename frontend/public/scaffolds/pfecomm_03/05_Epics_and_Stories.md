# 05 — Epics and Stories
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03
### AJIO-style · Orange + Red · Inter · Wishlist + Discount System

---

## Epic 1 — Design System and Global Shell

### Story 1.1 — CSS tokens + pure white background
**As a** developer,
**I want** all UI colors defined as 7 CSS custom properties on a pure white canvas,
**so that** the high-energy marketplace feel is consistent and no hex values appear in component files.

**Acceptance criteria:**
- [ ] `globals.css` has exactly 7 `--color-*` tokens
- [ ] Body background: pure white — `var(--color-bg)` = `#FFFFFF` (NOT warm ivory from pfecomm_02)
- [ ] Two chromatic values: `--color-brand` (orange) and `--color-discount` (red) — visually distinct, never confused
- [ ] `--color-brand` orange on white = 3.0:1 — too low for body text; use ONLY as background or on large 600-weight text
- [ ] No hex values in any `.module.css` file; `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty
- [ ] TypeScript: `ColorToken = '--color-brand' | '--color-discount' | '--color-text' | '--color-muted' | '--color-border' | '--color-surface' | '--color-bg'`

### Story 1.2 — Inter font, single face
**As a** user,
**I want** Inter loaded with zero layout shift,
**so that** the clean, functional marketplace typographic feel is consistent from first paint.

**Acceptance criteria:**
- [ ] Inter loaded via `next/font/google`, weights 400/500/600/700
- [ ] Applied as `--font-inter` on `<html>`
- [ ] No display face (Cormorant, Montserrat, etc.) — Inter only throughout
- [ ] `grep -r "Cormorant\|Montserrat\|Playfair" src` → empty
- [ ] Lighthouse CLS: 0

### Story 1.3 — PromoBanner with orange background
**As a** visitor,
**I want** to see a promotional message in an orange banner and dismiss it,
**so that** I'm aware of current deals without being permanently distracted.

**Acceptance criteria:**
- [ ] `40px` height, `background: var(--color-brand)` (orange), white text — white on orange passes AA ✓
- [ ] Dismissible with X button; dismissed state persists in `sessionStorage`
- [ ] `useState(true)` initially dismissed (avoids flash on mount), corrected in `useEffect` from `sessionStorage`
- [ ] TypeScript: `PromoBannerProps = { message: string }`

### Story 1.4 — TopNav with search + wishlist + cart
**As a** visitor,
**I want** to search, access my wishlist, and see my cart item count from any page,
**so that** I can navigate and track saved items efficiently.

**Acceptance criteria:**
- [ ] Sticky `60px` height, `1px` bottom border
- [ ] Search input centered on desktop (visible text input); icon-only on mobile
- [ ] Wishlist icon: badge showing `wishlistStore.count` from Zustand
- [ ] Cart icon: badge showing `cartStore.itemCount` from Zustand
- [ ] Both badges update live without page refresh
- [ ] Cart badge and wishlist badge: `background: var(--color-brand)` (orange), white text

### Story 1.5 — Cart drawer with orange checkout button
**As a** visitor who has added items,
**I want** a slide-in cart drawer with an orange checkout button,
**so that** I can review and proceed to payment without leaving the current page.

**Acceptance criteria:**
- [ ] Framer Motion slide-in from right: `x: '100%' → 0`, `260ms ease-out`
- [ ] Semi-transparent backdrop; click closes drawer
- [ ] "Proceed to Checkout": `background: var(--color-brand)` (orange), white text, `border-radius: 4px`, `height: 48px`
- [ ] Free shipping note: "Add ₹X more for free shipping" when `subtotal < ₹599`
- [ ] Cart and wishlist stores are independent — different Zustand slices, different localStorage keys
- [ ] Accessible: focus trapped, `role="dialog"`, Escape key closes

---

## Epic 2 — Discount System

### Story 2.1 — Discount percent computed, not stored
**As a** developer,
**I want** all discount calculations centralised in one utility function,
**so that** badge displays, filter logic, and price blocks all share the same arithmetic.

**Acceptance criteria:**
- [ ] `getDiscountPercent(mrp: number, price: number): number` in `src/lib/utils.ts`
- [ ] `getDiscountPercent(999, 599)` → `40`; `getDiscountPercent(500, 500)` → `0`
- [ ] `Product` type has NO `discountPercent` field — always computed
- [ ] All badge displays call this function — never access stored discount data
- [ ] TypeScript: `getDiscountPercent(mrp: number, price: number): number` — pure function with no side effects

### Story 2.2 — Discount badge on cards
**As a** deal-seeking visitor,
**I want** a clear percentage badge on discounted items,
**so that** I can identify the best deals while scanning the grid.

**Acceptance criteria:**
- [ ] Badge visible top-left, `position: absolute` on image wrapper
- [ ] `background: var(--color-discount)` (red), white text, `border-radius: 2px`
- [ ] Shows ONLY when `product.price < product.mrp` — conditional JSX, not `display:none`
- [ ] Products with `price === mrp`: no badge at all in DOM
- [ ] Badge text: `"{getDiscountPercent(mrp, price)}% off"` — never hardcoded

### Story 2.3 — MRP + price row on cards
**As a** visitor browsing,
**I want** to see the selling price, original MRP, and discount on cards,
**so that** I can assess the deal without clicking through.

**Acceptance criteria:**
- [ ] Selling price: `15px`, `font-weight: 700` — always shown; formatted via `formatINR()`
- [ ] MRP: `13px`, `<del>` strikethrough, `color: var(--color-muted)` — ONLY when `price < mrp`
- [ ] Discount %: `13px`, weight 600, `color: var(--color-discount)` (red) — ONLY when `price < mrp`
- [ ] All amounts via `formatINR()` — ₹ symbol, no decimals
- [ ] `grep -r "toLocaleString\|toFixed" src/components/product/ProductCard --include="*.tsx"` → empty (use `formatINR`)

### Story 2.4 — PDP price block
**As a** visitor on a product page,
**I want** to see a clear price breakdown including original MRP,
**so that** I understand the saving before deciding to buy.

**Acceptance criteria:**
- [ ] Selling price: `22px`, `font-weight: 700` — always shown
- [ ] MRP: `16px`, `<del>` strikethrough muted — ONLY when `price < mrp`; uses `<del>` tag not `text-decoration: line-through` on `<span>`
- [ ] Discount %: `16px`, weight 600, `color: var(--color-discount)` (red) — ONLY when `price < mrp`
- [ ] Non-discounted product: only selling price shown; no MRP row, no red percentage

### Story 2.5 — Discount range filter on PLP
**As a** deal-seeking visitor,
**I want** to filter products by minimum discount percentage,
**so that** I only see items with deep discounts.

**Acceptance criteria:**
- [ ] Filter options: 30%+, 40%+, 50%+, 60%+, 70%+; rendered as single-select chips
- [ ] "50%+" shows only products where `getDiscountPercent(mrp, price) >= 50`
- [ ] Filter state in URL: `?minDiscount=50`; survives page refresh via server component param reading
- [ ] Combining with brand filter: both applied simultaneously via `useMemo`

---

## Epic 3 — Wishlist

### Story 3.1 — Wishlist store, separate from cart
**As a** developer,
**I want** the wishlist as a separate Zustand store from the cart,
**so that** the two concerns don't interfere with each other.

**Acceptance criteria:**
- [ ] `useWishlistStore` in `src/store/wishlist.ts` — separate file from `src/store/cart.ts`
- [ ] Persisted to `localStorage` under key `"mf-wishlist"` (not `"mf-cart"`)
- [ ] `toggle(item: WishlistItem): void` — adds if absent, removes if present
- [ ] `isWishlisted(productId: string): boolean` — returns boolean
- [ ] `count` getter — returns `items.length`
- [ ] TypeScript: `WishlistItem = { productId: string; name: string; brand: string; price: number; mrp: number; image: string }`

### Story 3.2 — Heart toggle on product cards
**As a** visitor browsing,
**I want** to save items to my wishlist directly from the product grid,
**so that** I can track interesting products without losing my place.

**Acceptance criteria:**
- [ ] Heart icon top-right of card image, `position: absolute`
- [ ] Filled heart (`❤`) when `isWishlisted(product.id)` is true; outline heart (`♡`) when false
- [ ] `aria-pressed={isWishlisted(product.id)}` on the button
- [ ] `aria-label` updates: "Save {product.name} to wishlist" / "Remove {product.name} from wishlist"
- [ ] `e.stopPropagation()` on click to prevent card link activation
- [ ] Scale animation: `1 → 1.2 → 1`, `200ms` ease (CSS `transform`)
- [ ] Wishlist count badge in TopNav updates immediately

### Story 3.3 — Wishlist page (/wishlist)
**As a** visitor,
**I want** to see all saved items on a dedicated wishlist page,
**so that** I can review and act on them later.

**Acceptance criteria:**
- [ ] Route: `/wishlist`; shows all `WishlistItem` objects in a 4-column product grid
- [ ] Heading: "Saved items ({count})"
- [ ] Remove button on each item — removes from `wishlistStore`
- [ ] "Add to Bag" on each item: opens `SizePicker` overlay for that product
- [ ] Empty state: "Your wishlist is empty" with link to homepage
- [ ] State persists across page refresh (localStorage)

---

## Epic 4 — Product Card + Quick-Add

### Story 4.1 — Brand name as primary identifier
**As a** brand-conscious shopper,
**I want** to see the brand name prominently above the product name,
**so that** I can quickly find items from brands I recognise.

**Acceptance criteria:**
- [ ] Brand name: first element in `.info` section, `12px`, `font-weight: 700`, `text-transform: uppercase`
- [ ] Product name: below brand name, `13px`, `font-weight: 400`, 2-line clamp
- [ ] Order never swapped — brand always above product name
- [ ] Same pattern in cart drawer line items (brand above product name)
- [ ] TypeScript: `Product = { id: string; name: string; brand: string; price: number; mrp: number; colorOptions: ColorOption[] }` — `brand` is a required field

### Story 4.2 — Quick-add hover interaction
**As a** visitor browsing,
**I want** to add items to my bag from the product grid without navigating to the PDP,
**so that** I can quickly build my bag.

**Acceptance criteria:**
- [ ] "ADD TO BAG" pill: `position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)`
- [ ] `opacity: 0` by default, `opacity: 1` on `.card:hover`
- [ ] `transition: opacity 150ms ease`
- [ ] `border-radius: 100px` (pill shape)
- [ ] Click opens `SizePicker` overlay — does NOT navigate to PDP
- [ ] `e.preventDefault()` to prevent card link activation when clicking pill

### Story 4.3 — SizePicker mini-overlay
**As a** visitor using quick-add,
**I want** to pick a size in a minimal overlay,
**so that** I add the correct variant without leaving the product grid.

**Acceptance criteria:**
- [ ] Bottom sheet on mobile (`< 640px`), centered modal on desktop
- [ ] Shows product's complete size list: available sizes selectable, OOS sizes `opacity: 0.4; text-decoration: line-through; cursor: not-allowed`
- [ ] Selecting size enables "ADD TO BAG" button in picker (disabled until size selected)
- [ ] Confirming: calls `addItem()` → opens cart drawer → closes `SizePicker`
- [ ] Closing overlay without selecting: no item added, grid remains unchanged
- [ ] TypeScript: `SizePickerProps = { product: Product; onClose: () => void }`

### Story 4.4 — Color dots (not per-colorway images)
**As a** visitor browsing,
**I want** to see color swatches on product cards,
**so that** I know what color options are available without clicking through.

**Acceptance criteria:**
- [ ] `10px` diameter circles in a row below price block
- [ ] `style={{ background: color.swatch }}` — inline hex only (swatch hex is data, not design token)
- [ ] Clicking a color dot on card: updates selected color state but does NOT change card image (unlike pfecomm_01/02 image swap)
- [ ] On PDP: selected color dot gets `outline: 2px solid var(--color-brand)` ring
- [ ] TypeScript: `ColorOption = { name: string; swatch: string }` — `swatch` is hex string

---

## Epic 5 — PLP, Filter, Homepage

### Story 5.1 — 5-column product grid
**As a** visitor browsing the catalogue,
**I want** products displayed in a dense 5-column grid,
**so that** I can scan many options at once — marketplace density, not boutique spaciousness.

**Acceptance criteria:**
- [ ] Desktop (1280px+): 5 columns — NOT 4 (that is pfecomm_01's pattern)
- [ ] Large tablet (900px–1280px): 3 columns
- [ ] Mobile (below 900px): 2 columns
- [ ] `gap: 12px` desktop, `8px` mobile
- [ ] `grep -r "repeat(4" src/components/product/ProductGrid --include="*.module.css"` → empty (must be 5 on desktop)

### Story 5.2 — Brand filter with search-within
**As a** brand-loyal visitor,
**I want** to filter products by brand with an inline brand search,
**so that** I can find my preferred brands quickly even in a large list.

**Acceptance criteria:**
- [ ] Brand checkboxes list all brands present in mock data
- [ ] Search `<input>` inside the brand filter section — filters the brand checkbox list (not the product grid)
- [ ] Multi-select: checking 2+ brands shows products from all selected brands
- [ ] Filter state in URL: `?brand=Nike&brand=Adidas`; survives page refresh

### Story 5.3 — Homepage deal sections
**As a** first-time visitor,
**I want** to immediately understand that this is a deals marketplace,
**so that** I know there are deep discounts to explore.

**Acceptance criteria:**
- [ ] Hero: bold promotional headline ("Up to 80% Off"), orange CTA with white text, lifestyle image
- [ ] At least 2 horizontal product rows with section labels like "Up to 60% Off" and "New Arrivals"
- [ ] Products in deal rows show discount badges (computed via `getDiscountPercent`)
- [ ] Brand logos strip: horizontal scroll row of 8+ brand logos

### Story 5.4 — Accessibility and performance
**As a** user with accessibility needs or a slow connection,
**I want** the site to be usable and fast,
**so that** shopping is inclusive and frustration-free.

**Acceptance criteria:**
- [ ] `--color-brand` orange NOT used as `color` on any text element under 18px — fails contrast at small size
- [ ] Focus rings: `outline: 2px solid var(--color-brand); outline-offset: 2px`
- [ ] `aria-pressed` on wishlist heart toggles
- [ ] `aria-disabled="true"` on OOS sizes (not just visual `opacity`)
- [ ] Focus trap in cart drawer; Escape key closes
- [ ] All product images: `next/image` with explicit `sizes` prop
- [ ] `tsc --noEmit` exits 0; `npm run build` exits 0; `/out/` present
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
