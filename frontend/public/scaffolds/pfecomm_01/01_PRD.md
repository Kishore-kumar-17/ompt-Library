# 01 — Product Requirements Document
## Premium Fashion Retail Storefront · pfecomm_platform_01

---

## 1. Product Vision

A storefront where the photography sells the product and the UI simply confirms the purchase. Every design decision asks: does this make the product look better, or does it distract from it? If it distracts, remove it. The result is a site that reads as premium because it has the confidence to be quiet.

---

## 2. User Personas

### Persona A — Maya, Fashion-Conscious Professional (Primary)
- **Who:** 28-year-old working professional, shops for quality wardrobe basics and occasional statement pieces. Instagram browser. Shops at Aritzia, COS, Reformation.
- **Goal:** Find a specific type of piece (e.g., "a flowing midi dress for a summer event"). Wants to see how it looks in different colors before committing.
- **Behaviour:** Arrives from Instagram story or friend recommendation. Browses the new arrivals. Clicks a product card. On PDP: cycles through colors using swatches to see how each colorway photographs. Checks the size guide mentally. Adds to cart. Checks cart total before proceeding.
- **Key pain point:** Sites where the swatch doesn't update the image. Buying a color she couldn't see properly.
- **Success:** Color swatch hover shows the product in that colorway within milliseconds. Size selector clearly shows what's in stock. Add to Cart works the first time.

### Persona B — Priya, Loyal Brand Customer (Returning)
- **Who:** 34-year-old who knows the brand well. Has bought from TNA and Wilfred before. Knows her sizes in both sub-brands differ slightly.
- **Goal:** Reorder a beloved style in a new color, or discover what's new in her preferred sub-brands.
- **Behaviour:** Navigates directly to "New In". Filters by sub-brand (Wilfred). Browses the filtered grid. Finds a dress, checks the colors, reads the fabric description in the accordion. Buys.
- **Key pain point:** Not being able to filter by sub-brand from the PLP. Not knowing if a size is in stock before clicking through.
- **Success:** Sub-brand filter in the PLP. Size availability shown directly on the product card or on hover. The brand badge on cards helps her immediately identify Wilfred items.

### Persona C — Rachel, Occasional Shopper (Discovery)
- **Who:** 24-year-old, first time on this site, arrived from a Google search for "midi dresses under $150".
- **Goal:** Evaluate if the brand is worth the price. Find a specific type of dress.
- **Behaviour:** Lands on the PLP. Scans the grid. Notices the brand feels premium — clean, fast, not cluttered. Opens a product page. The photography quality confirms: this is a quality brand. Checks the price — $145 for a dress. Reads the description. Adds to cart. Hesitates at checkout link (abandons this session, returns later).
- **Key pain point:** Sites that feel aggressive — urgency copy, pop-ups, chat widgets covering the CTA.
- **Success:** No urgency copy, no pop-ups, no chat widget. Cart drawer confirms item clearly. The brand passes the "is this legit?" test.

### Persona D — Store Buyer, Content Evaluator (Admin)
- **Who:** Internal team member evaluating the frontend before launch.
- **Goal:** Confirm all products display correctly across sub-brands. Verify sale pricing shows correctly. Confirm swatch hover works for all products.
- **Behaviour:** Browses PLP, hovers all color swatches on several cards, clicks through to 4-5 PDPs, adds items to cart, checks cart content, tests filter combinations.
- **Success:** Every product's swatches change the card image. Sale prices show red + strikethrough. Sub-brand badges are correct. Filter combinations work without errors.

---

## 3. Functional Requirements

### FR-001: Color swatch hover → instant image swap
- ProductCard has a `hoveredColorIndex` state
- `onMouseEnter` on a swatch sets `hoveredColorIndex`
- Card image source is `product.colors[hoveredColorIndex].images[0]`
- NO CSS transition on the image element — instant swap
- On `mouseLeave` from the swatch row: reset to `hoveredColorIndex = 0` (or keep last hovered — either acceptable)

### FR-002: Per-colorway PDP gallery
- Selecting a color on the PDP changes the entire image gallery
- Gallery images = `selectedColor.images` (3-4 images)
- Thumbnail row updates with the new colorway's images
- Clicking a thumbnail updates the main image

### FR-003: Sub-brand badge system
- Products with `brand !== 'Aritzia'` display a sub-brand badge above the product name
- Badge text: "TNA" | "Wilfred" | "Sunday Best" | "Auxiliary"
- Badge style: `10px`, uppercase, `letter-spacing: 0.06em`, `var(--color-text-muted)`
- Aritzia main line products: no badge

### FR-004: Size selector with OOS states
- All sizes are always rendered (never hidden)
- In-stock size: interactive, selected state = black fill + white text
- Out-of-stock size: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`
- Clicking OOS size has no effect
- "Add to Cart" disabled until a valid in-stock size is selected

### FR-005: Dismissible PromoBanner
- Thin top bar (40px) with black background + white text
- Dismiss button (X) on right
- On dismiss: `max-height` collapses to 0, `overflow: hidden`, `200ms ease-out`
- Dismissal state persisted to `sessionStorage` (banner stays dismissed for the session)

### FR-006: MegaNav with sticky behavior
- Sticky at top of viewport
- On desktop: logo + nav links + search/account/cart icons
- Cart icon: shows live item count badge from Zustand store
- Mobile: hamburger (left) + logo (center) + cart (right), nav in side drawer
- Nav height: `60px` desktop, `52px` mobile

### FR-007: Cart drawer
- Zustand `isOpen` controls visibility
- Framer Motion: `x: '100%' → x: 0`, `280ms ease-out`
- Black semi-transparent backdrop closes on click
- Line items: colorway-specific image, sub-brand label + name, color + size, quantity stepper, remove
- Free shipping note: "Spend $[X] more for free shipping" when subtotal below $200 threshold
- "Proceed to Checkout" button: full-width, black

### FR-008: PLP filter panel
- Desktop: left sidebar (sticky), 240px wide
- Mobile: bottom sheet drawer (Framer Motion slide up)
- Filters: Sub-brand checkboxes, Category checkboxes, Size toggles, Sale only toggle
- Active filter chips in a row above the grid
- Clearing a chip removes that filter
- Filter state in URL query params (`?brand=TNA&category=tops`)

### FR-009: Product grid
- Desktop: 4 columns. Tablet (900px+): 3 columns. Mobile: 2 columns.
- 16px gap desktop, 8px gap mobile
- Product images: `aspect-ratio: 3/4`, no border-radius
- No quick-add overlay (drives PDP visits, consistent with Aritzia behavior)

### FR-010: PDP layout
- Left column (55%): large image + thumbnail strip (no carousel, no arrows)
- Right column (45%): sub-brand badge (if applicable), H1 name, price, color selector, size selector, CTA, 3 accordions
- Sticky right column on desktop (image gallery scrolls, right column stays visible)
- Mobile: stacked (gallery full width, info below)

### FR-011: Accessibility
- WCAG AA contrast for all text
- Focus rings: `2px solid var(--color-text)` offset `2px`
- Keyboard navigation: swatches, size buttons, quantity stepper, cart operations all keyboard accessible
- Cart drawer: focus trap while open
- `aria-label` on icon buttons (search, cart, close)
- OOS sizes: `aria-disabled="true"`

### FR-012: Performance
- Next.js `<Image>` on all product images
- `priority` prop on hero and above-fold product images
- Inter loaded via `next/font/google` (no layout shift)
- Lighthouse 95+ all metrics target

---

## 4. Non-Goals (Do Not Build)

- Checkout flow (Stripe or otherwise)
- User accounts / order history
- Wishlist / saved items
- Product reviews
- Size guide pop-up (use link to external size guide page)
- Live inventory sync (mock data only)
- Backend / API (frontend-only build)
- Dark mode
- Chat widget

---

## 5. Acceptance Criteria

### Swatch hover
- [ ] Hovering any swatch on a ProductCard changes the card image to that colorway's image
- [ ] The image swap is instant — no visible CSS transition
- [ ] All 3–5 swatches per card are individually testable

### Sub-brand badges
- [ ] Aritzia products have no badge
- [ ] TNA, Wilfred, Sunday Best, Auxiliary products each show their label
- [ ] Badge is 10px, uppercase, muted color

### Size selector
- [ ] All sizes render (none hidden)
- [ ] Selected size: black fill + white text
- [ ] OOS sizes: strikethrough + 0.4 opacity, non-interactive
- [ ] Add to Cart stays disabled until valid size selected

### Cart
- [ ] Adding product to cart increments nav badge
- [ ] Cart drawer opens with the correct item
- [ ] Quantity stepper works: + increments, − decrements (min 1)
- [ ] Remove button deletes the line item
- [ ] Free shipping note shows when subtotal < $200
- [ ] Sub-brand label appears on each cart line item

### Sale prices
- [ ] Sale products show red sale price + muted strikethrough original
- [ ] Regular products show standard muted price
- [ ] No sale badges on non-sale products

### PromoBanner
- [ ] Banner dismisses on X click
- [ ] Banner remains dismissed on page navigation within session
- [ ] Dismissal animation: smooth collapse

### Build
- [ ] `tsc --noEmit` zero errors
- [ ] No border-radius on any button (verified in DevTools)
- [ ] No border-radius on any product image container
- [ ] No hex values in any CSS Module file
- [ ] No urgency copy anywhere in the codebase
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
