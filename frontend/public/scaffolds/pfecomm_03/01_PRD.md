# 01 — Product Requirements Document
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

---

## 1. Product Vision

A storefront where the deal is visible before the product name, the brand is trusted before the description, and the wishlist makes indecision cheap. Every decision asks: does this help a deal-hunter make a faster, more confident decision? If yes, keep it. If it slows browsing, remove it.

---

## 2. User Personas

### Persona A — Aarav, Deal-Hunter (Primary)
- **Who:** 24-year-old in Hyderabad. Buys most clothes on sale. Follows AJIO on Instagram. Knows Nike, Roadster, H&M. Price-conscious but brand-aware.
- **Goal:** Find a Nike running tee under ₹1,500. Wants to see the discount clearly before clicking.
- **Behaviour:** Opens homepage, taps sale section. Browses 5-col grid fast. Scans brand names and discount badges. Clicks card with "40% off" badge. On PDP: checks size availability (often M or L). Adds to bag. Checks subtotal.
- **Key pain point:** Sites where discount is buried in the price row. Wants the % off badge to be the first thing he reads on a product.
- **Success:** `{N}% off` badge top-left on card. Bold selling price. Strikethrough MRP immediately adjacent. All visible before hovering.

### Persona B — Pooja, Wishlist Curator (Returning)
- **Who:** 29-year-old in Pune. Saves 20–30 products before buying 2–3. Comes back to wishlist when she has budget. Buys across multiple sessions.
- **Goal:** Save interesting products without committing to buy. Return to wishlist at payday.
- **Behaviour:** Browses PLP, taps heart on 8–12 products. Leaves. Returns next week. Opens wishlist. Compares the saved products. Removes some, adds to bag for 3.
- **Key pain point:** Losing saved items between sessions. Wishlist not persisted.
- **Success:** Wishlist persisted to localStorage. Heart toggle is instant and satisfying (scale animation). `/wishlist` page shows all saved items.

### Persona C — Sunita, Brand Loyalist (Secondary)
- **Who:** 35-year-old who shops Biba and W for ethnic wear. Uses AJIO for convenience.
- **Goal:** Find a new Biba kurta for an upcoming occasion.
- **Behaviour:** Navigates to Women → Kurtas. Filters by Brand: Biba. Browses the filtered grid. Finds a product at 35% off. Clicks. Checks the product details and size chart. Adds to bag.
- **Success:** Brand filter works. Biba products show the Biba brand name as the first text on the card. Filter + brand visible in URL params.

### Persona D — QA Reviewer (Admin)
- **Who:** Internal team checking discount badge accuracy and wishlist behavior.
- **Goal:** Verify discount percentages are computed correctly, wishlist persists correctly, cart and wishlist don't interfere.
- **Behaviour:** Adds to wishlist (heart fills), adds to cart (count increments), removes from wishlist (heart empties), checks cart still has item, refreshes page (wishlist still shows item).
- **Success:** Zustand persisted correctly. Cart and wishlist are independent. Discount percentages match manual calculation.

---

## 3. Functional Requirements

### FR-001: Discount badge — computed, conditional
- `getDiscountPercent(mrp, price)` in `lib/utils.ts` — the only place discount is computed
- Badge renders ONLY when `product.price < product.mrp`
- Badge text: `{discountPct}% off` — e.g., "42% off"
- Badge style: top-left absolute, `var(--color-discount)` background, white text, `2px` radius
- Products with `price === mrp` (no discount): no badge, no MRP display

### FR-002: MRP + price display
- Selling price: `15px` weight 700 — dominant
- MRP: `13px` strikethrough muted — shown ONLY when `price < mrp`
- Discount %: `13px` weight 600 `var(--color-discount)` — shown ONLY when `price < mrp`
- All prices via `formatINR()` — ₹ symbol, `en-IN` grouping, no decimals

### FR-003: Wishlist store — separate from cart
- `useWishlistStore` — Zustand, persisted to `'ajio-wishlist'`
- `toggle(item: WishlistItem)` — adds if not present, removes if present
- `isWishlisted(productId: string): boolean`
- Heart button on card: `aria-pressed={isWishlisted(product.id)}`, `aria-label="Add to wishlist"` / `"Remove from wishlist"`
- Scale animation on heart toggle: `1 → 1.2 → 1`, `200ms`

### FR-004: Wishlist page
- `/wishlist` — shows all saved items in a product grid
- "Remove" action on each card
- "Add to Bag" action on each card (opens size selector before adding)
- Empty state: "Your wishlist is empty. Start saving products."
- Item count shown: "Saved items (12)"

### FR-005: Quick-add hover button
- Position: `absolute; bottom: 8px; left: 50%; transform: translateX(-50%)`
- Visibility: `opacity: 0` by default; `.card:hover .quickAdd { opacity: 1 }`
- `transition: opacity 150ms ease`
- On click: show a size picker mini-modal (not page navigation)
- Size picker: shows the product's sizes, OOS shown but non-interactive
- Selecting a size: adds to cart, closes size picker, cart count increments

### FR-006: TopNav with search
- Sticky, `60px` height, `1px` bottom border
- Logo left (AJIO wordmark)
- Search bar center: `width: 40%` desktop, becomes icon on mobile
- Icons right: Heart (`useWishlistStore().items.length`), User, ShoppingBag (`useCartStore().itemCount`)
- Cart/wishlist count badges: `var(--color-brand)` background

### FR-007: 5-column product grid
- Desktop (1280px+): 5 columns
- Tablet (900px+): 3 columns
- Mobile: 2 columns
- Gap: `12px` desktop, `8px` mobile

### FR-008: Filter panel
- Desktop: left sidebar, sticky, 240px wide
- Mobile: bottom sheet, Framer Motion slide-up
- Filter sections:
  - Brand (checkboxes with search-within input)
  - Category checkboxes
  - Price range (slider or min/max inputs: ₹0 – ₹10,000)
  - Discount: 30%+, 40%+, 50%+, 60%+, 70%+ (radio or checkbox)
  - Size toggles
- Filter state in URL params
- Active filter chips above grid

### FR-009: PDP
- Image gallery: main image + thumbnail strip + left/right arrow navigation
- Brand name: `14px` uppercase weight 700 (larger than card brand label)
- H1 product name: `18px` weight 600
- Price block: selling price (large, bold) + MRP (strikethrough) + discount % — vertically or inline
- Color dots: `16px` circles, selected has `outline: 2px solid var(--color-brand)`
- Size selector: all sizes shown, OOS = strikethrough + opacity 0.4, selected = orange fill
- "Add to Bag" button: full-width, `48px`, `var(--color-brand)`, `4px` radius
- Wishlist button: full-width outline, `48px`, `4px` radius, heart icon
- Accordions: Product Details, Size & Fit, Delivery & Returns

### FR-010: Cart drawer
- Framer Motion: `260ms ease-out` from right
- Semi-transparent backdrop
- Line items: image, brand + name, color + size, `−  n  +` stepper (min 1), remove
- Free shipping note: ₹599 threshold
- "Proceed to Checkout": full-width, `var(--color-brand)`, `4px` radius

### FR-011: Accessibility
- WCAG AA on all text
- Orange on CTAs only (large text/buttons — not small text)
- Focus rings: `2px solid var(--color-brand)` offset `2px`
- Heart button: `aria-pressed`, `aria-label` updates with state
- OOS sizes: `aria-disabled="true"`
- Cart drawer: focus trap

---

## 4. Non-Goals

- Checkout flow
- User authentication
- Product reviews
- Live inventory sync (mock data only)
- Backend / API
- Dark mode
- Push notifications
- Chat widget
- Countdown timers (discount badges are factual; timers are theatre)

---

## 5. Acceptance Criteria

### Discount system
- [ ] Products with `price < mrp` show discount badge
- [ ] Badge shows computed percentage: `Math.round(((mrp-price)/mrp)*100)%`
- [ ] Products with `price === mrp` show no badge and no MRP
- [ ] MRP strikethrough shows only on discounted products
- [ ] Discount % text is `var(--color-discount)` (red), not orange

### Wishlist
- [ ] Heart toggle fills on save, empties on remove
- [ ] Scale animation plays on toggle
- [ ] Wishlist persists across page refreshes
- [ ] `/wishlist` page shows all saved items
- [ ] Wishlist count badge on nav heart icon updates live
- [ ] Cart and wishlist are independent (removing from wishlist does not affect cart)

### Quick-add
- [ ] "ADD TO BAG" pill appears on card hover (`opacity 0 → 1`)
- [ ] Clicking quick-add opens size picker overlay
- [ ] Selecting size adds item to cart and closes picker
- [ ] Cart count badge increments

### ProductCard
- [ ] Brand name appears FIRST (above product name), uppercase, weight 700
- [ ] Price row: bold selling price + strikethrough MRP + red discount %

### Filter
- [ ] Brand filter filters products by brand
- [ ] Discount filter (50%+) shows only products with `getDiscountPercent >= 50`
- [ ] Filter state in URL params
- [ ] Active filter chips appear, clicking removes filter

### Build
- [ ] `tsc --noEmit` zero errors
- [ ] `border-radius: 4px` on all buttons (not 0, not 2)
- [ ] `border-radius: 4px` on all product image wrappers
- [ ] `border-radius: 2px` on discount badges
- [ ] `border-radius: 100px` on quick-add pill
- [ ] No hex in CSS Module files
- [ ] All prices in `₹X,XXX` format (INR, no decimals)
- [ ] Lighthouse performance ≥ 90, accessibility ≥ 90
