# 01 — Product Requirements Document
## Indian Heritage Fashion Storefront · pfecomm_platform_02

---

## 1. Product Vision

A storefront that makes Indian craft legible and purchasable. The product photography shows living color, handmade texture, and artisan craft. The UI communicates what the craft is, where it comes from, and how to care for it — without becoming a museum. Every design decision asks: does this make the product and its craft narrative clearer, or does it add noise? If noise, remove it.

---

## 2. User Personas

### Persona A — Priya, Urban Professional (Primary)
- **Who:** 31-year-old urban professional in Mumbai or Bangalore. Wears Indian ethnic wear for festivals, weddings, and casual occasions. Has bought from FabIndia and Myntra. Values authentic craft over fast fashion.
- **Goal:** Find a hand-block printed kurta in indigo for an upcoming puja event. Wants to see how the colorway photographs on a model before buying.
- **Behaviour:** Arrives from Instagram or Google. Browses the "Kurtas" category. Filters by "Hand-Block Print" and "Cotton". Hovers color swatches on cards to see the indigo vs natural colorways. Clicks through to PDP. Reads the origin line ("printed in Bagru, Rajasthan"). Selects size M. Adds to cart.
- **Key pain point:** Color names like "Blue" don't communicate whether it's indigo, navy, or sky. "Indigo" is the correct vocabulary.
- **Success:** Natural dye color names on swatches. Craft technique badge on cards. Product description names the artisan region.

### Persona B — Ananya, Festival Gifter (Seasonal)
- **Who:** 26-year-old looking for a gift for her mother before Diwali. Has a ₹3,000 budget. Wants something that feels meaningful, not generic.
- **Goal:** Find a kurta set or dupatta that communicates craft heritage. Budget-conscious but willing to pay for authenticity.
- **Behaviour:** Arrives from a gift-guide article. Lands on homepage. Clicks "Kurta Sets". Scrolls the grid, reading the craft badges. Finds a khadi block-print kurta set. Checks the price (₹2,799). Adds to cart. Notes the free shipping threshold.
- **Key pain point:** Sites that look generic — no craft story, no provenance, no explanation of why the price is fair.
- **Success:** Craft badge on card. Origin provenance on PDP. Price in INR. Cart shows free shipping note.

### Persona C — Rohan, Men's Ethnic Wear Buyer (Secondary)
- **Who:** 35-year-old who buys one or two handloom kurtas per year for important occasions.
- **Goal:** Find a handloom cotton kurta in natural or off-white. Comfortable fit, easy care.
- **Behaviour:** Navigates to Men's. Filters by "Handloom" + "Cotton". Finds a product. Reads the care instructions (accordion). Adds to cart.
- **Success:** Handloom badge visible on card. Care accordion on PDP. Size selector shows OOS sizes clearly.

### Persona D — QA / Content Reviewer (Admin)
- **Who:** Internal team member checking the storefront before launch.
- **Goal:** Verify all 12 products display correctly. Confirm craft badges appear on correct products. Confirm swatch hover works. Confirm INR pricing everywhere.
- **Behaviour:** Browses PLP, hovers all swatches on several cards, clicks through to 4-5 PDPs, adds items, checks cart.
- **Success:** All craft badges correct. Swatch hover instant on all products. Prices show ₹ symbol. INR free shipping threshold (₹999) correct.

---

## 3. Functional Requirements

### FR-001: Color swatch hover → instant image swap
- `ProductCard` has a `hoveredColorIndex` state (default 0)
- `onMouseEnter` on a swatch sets `hoveredColorIndex`
- Card image source = `product.colors[hoveredColorIndex].images[0]`
- **NO CSS transition on the image element — instant swap**
- Natural dye color name shown in tooltip/label on hover

### FR-002: Per-colorway PDP gallery
- Selecting a color resets the entire gallery to that colorway's `images` array
- Gallery index resets to 0 on color change
- Thumbnail row updates with new colorway's images
- Clicking a thumbnail updates the main image

### FR-003: Craft technique badge system
- Products with `craftTechnique !== 'none'` display a craft badge above the product name
- Badge text: "Hand-Block Print" | "Handloom" | "Natural Dye" | "Hand Embroidery" | "Ajrakh Print" | "Ikat Weave" | "Chikankari"
- Badge style: `10px` Inter, uppercase, `letter-spacing: 0.08em`, `var(--color-text-muted)`
- Products with `craftTechnique === 'none'` show no badge

### FR-004: Size selector with OOS states
- All sizes always rendered (never hidden)
- In-stock size: interactive, selected state = maroon fill + white text
- Out-of-stock size: `opacity: 0.4`, `text-decoration: line-through`, `cursor: not-allowed`
- "Add to Cart" disabled until a valid in-stock size is selected

### FR-005: Dismissible PromoBanner
- `40px` top bar with maroon background (`var(--color-maroon)`) + white text
- Dismiss button (X) on right with `aria-label="Dismiss banner"`
- On dismiss: `max-height` collapses to 0, `200ms ease-out`
- Dismissed state persisted to `sessionStorage`
- `useState(true)` (dismissed initially) — corrected in `useEffect` to avoid flash

### FR-006: MegaNav
- Sticky at top. `64px` desktop, `56px` mobile.
- Logo wordmark in Cormorant Garamond font
- Desktop: logo + nav links (Women, Men, Kids, Home & Living, Sale) + search/account/cart icons
- Cart icon: shows live item count from Zustand `itemCount`
- Mobile: hamburger + logo center + cart right

### FR-007: Cart drawer
- Framer Motion: `x: '100%' → x: 0`, `280ms ease-out`
- Semi-transparent backdrop (`rgba(0,0,0,0.4)`) — slightly lighter than Aritzia's `0.5`
- Line items: colorway image, craft badge + name, color + size, quantity stepper, remove
- Free shipping note: "Add ₹X more for free shipping" when subtotal below ₹999
- "Proceed to Checkout" button: full-width, maroon (`var(--color-maroon)`)

### FR-008: PLP filter panel
- Desktop: left sidebar, sticky, 240px wide
- Mobile: bottom sheet drawer (Framer Motion slide up)
- Filters: Category checkboxes, Craft technique checkboxes, Fabric checkboxes, Size toggle buttons, Sale only toggle
- Filter chips above grid, clickable to remove
- Filter state in URL params (`?category=kurtas&craft=handloom`)

### FR-009: Product grid
- Desktop: 4 columns. Tablet (900px+): 3 columns. Mobile: 2 columns.
- `16px` gap desktop, `8px` gap mobile
- Images: `aspect-ratio: 3/4`, no border-radius

### FR-010: PDP layout
- Left column (55%): large image + thumbnail strip (no carousel, no arrows)
- Right column (45%): craft badge, H1 name (Cormorant Garamond), origin provenance line, price, color selector, size selector, CTA, 3 accordions
- Mobile: stacked (gallery full width, info below)

### FR-011: INR pricing
- All prices display as `₹{price.toLocaleString('en-IN')}` — Indian number formatting
- No decimals. `₹2,499` not `₹2499.00` and not `₹2,499.00`
- Cart subtotal, free shipping threshold, product prices all in INR
- Free shipping threshold: ₹999

### FR-012: Accessibility
- WCAG AA contrast for all text on warm ivory background
- Maroon on ivory: ~7:1 contrast ✓
- Focus rings: `2px solid var(--color-maroon)` offset `2px`
- Keyboard navigation: swatches, size buttons, quantity stepper, cart operations
- Cart drawer: focus trap while open
- `aria-label` on icon buttons

---

## 4. Non-Goals (Do Not Build)

- Checkout flow
- User accounts / order history
- Wishlist / saved items
- Product reviews
- Size guide pop-up
- Live inventory sync (mock data only)
- Backend / API
- Dark mode
- Chat widget
- Decorative Indian motifs in UI chrome (the products provide all the pattern)
- Multi-currency switching (₹ only for this build)

---

## 5. Acceptance Criteria

### Swatch hover
- [ ] Hovering any swatch on a ProductCard changes the card image to that colorway's image
- [ ] The image swap is instant — no visible CSS transition
- [ ] Natural dye color name visible on hover/active

### Craft badges
- [ ] Products with `craftTechnique !== 'none'` show their technique badge
- [ ] Products with `craftTechnique === 'none'` show no badge
- [ ] Badge is `10px`, uppercase, muted color

### Size selector
- [ ] All sizes render (none hidden)
- [ ] Selected size: maroon fill + white text
- [ ] OOS sizes: strikethrough + `0.4` opacity, non-interactive
- [ ] Add to Cart stays disabled until valid in-stock size selected

### Cart
- [ ] Adding product increments nav badge
- [ ] Cart drawer opens with correct item (maroon checkout button)
- [ ] Quantity stepper works: + increments, − decrements (min 1)
- [ ] Remove button deletes the line item
- [ ] Free shipping note shows ₹999 threshold
- [ ] Craft badge appears on cart line items

### Sale prices
- [ ] Sale products show saffron-orange sale price + strikethrough original
- [ ] Regular products show standard muted price
- [ ] No "SALE" badge

### PromoBanner
- [ ] Maroon background banner dismisses on X click
- [ ] Stays dismissed on page navigation within session
- [ ] Smooth collapse animation

### Build
- [ ] `tsc --noEmit` zero errors
- [ ] `border-radius: 2px` on all buttons (not 0, not 4)
- [ ] `border-radius: 0` on all product image containers
- [ ] No hex values in any CSS Module file
- [ ] No urgency copy anywhere
- [ ] All prices formatted as `₹X,XXX` (INR, no decimals)
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
