# 05 — Epics and Stories
## Premium Fashion Retail Storefront · pfecomm_platform_01

---

## Epic 1 — Design System and Global Shell

### Story 1.1 — CSS token system
**As a** developer,
**I want** all UI colors defined as 6 CSS custom properties,
**so that** the monochromatic system is consistent and no hex values appear in component files.

**Acceptance criteria:**
- [ ] `globals.css` contains exactly 6 `--color-*` tokens
- [ ] No hex values in any `.module.css` file (grep confirms)
- [ ] Color swatch backgrounds are the only inline hex values (via `style={{ background: color.swatch }}` in JSX)
- [ ] All interactive elements use CSS variable colors, not Tailwind classes

### Story 1.2 — Inter font via next/font
**As a** user,
**I want** the Inter typeface loaded with zero layout shift,
**so that** the premium typographic feel is consistent from first paint.

**Acceptance criteria:**
- [ ] `next/font/google` loads Inter with weights 400, 500, 600
- [ ] Applied as CSS variable `--font-inter` on `<html>`
- [ ] Body and all components use `font-family: var(--font-inter, Inter, sans-serif)`
- [ ] Lighthouse CLS: 0

### Story 1.3 — PromoBanner
**As a** shopper,
**I want** to see the current promotion and be able to dismiss the banner,
**so that** it doesn't obstruct my shopping experience after I've seen it.

**Acceptance criteria:**
- [ ] Banner is `40px` height, black background, white uppercase text
- [ ] Dismiss X button present with `aria-label`
- [ ] Collapse animation: `max-height` → 0, `200ms ease-out`
- [ ] Dismissed state persisted to `sessionStorage` (stays dismissed across page navigation)
- [ ] Does not re-appear on page reload within the same session

### Story 1.4 — MegaNav with cart badge
**As a** shopper,
**I want** a navigation bar that shows my cart item count at all times,
**so that** I can see my cart status without opening it.

**Acceptance criteria:**
- [ ] Nav is sticky at top, `60px` height desktop, `52px` mobile
- [ ] Cart icon shows item count badge from Zustand `itemCount`
- [ ] Badge is `0` when cart is empty (hidden or shows 0)
- [ ] Cart icon click opens the cart drawer
- [ ] Mobile: logo centered, hamburger left, cart right

### Story 1.5 — Cart drawer
**As a** shopper who just added an item,
**I want** a cart drawer to slide in from the right,
**so that** I can review my bag without leaving the current page.

**Acceptance criteria:**
- [ ] Framer Motion: `x: '100%' → 0`, `280ms ease-out`
- [ ] Black semi-transparent backdrop, `rgba(0,0,0,0.5)`
- [ ] Clicking backdrop closes drawer
- [ ] Focus trap while drawer is open
- [ ] Body scroll locked when drawer is open
- [ ] "Proceed to Checkout" button full-width, black, `0` border-radius

---

## Epic 2 — Product Data and ProductCard

### Story 2.1 — Product data model
**As a** TypeScript developer,
**I want** a fully typed product schema with per-colorway image arrays,
**so that** swatch hover and PDP gallery can source their images from the data.

**Acceptance criteria:**
- [ ] `ColorVariant` has `images: string[]` (3-4 per colorway)
- [ ] `SizeVariant` has `size`, `inStock`, `sku`
- [ ] `Product` has `brand: Brand` with 5 valid values
- [ ] `tsc --noEmit` strict passes
- [ ] 12 mock products in `src/lib/products.ts` covering all 5 sub-brands

### Story 2.2 — ProductCard swatch hover image swap
**As a** shopper browsing the product grid,
**I want** to hover a color swatch on a product card and immediately see the product in that color,
**so that** I can evaluate colorways without clicking into each PDP.

**Acceptance criteria:**
- [ ] `hoveredColorIndex` state drives the card image `src`
- [ ] `onMouseEnter` on each swatch sets the index
- [ ] Image swap is INSTANT — no CSS transition on the `<img>` element
- [ ] All swatches are testable independently
- [ ] Correct colorway name is accessible via `aria-label` on each swatch

### Story 2.3 — Sub-brand badge
**As a** repeat customer of a specific sub-brand,
**I want** to see a sub-brand label on product cards,
**so that** I can identify TNA, Wilfred, Sunday Best, and Auxiliary items at a glance.

**Acceptance criteria:**
- [ ] Products with `brand !== 'Aritzia'` show their brand label above the product name
- [ ] Products with `brand === 'Aritzia'` show no badge
- [ ] Badge: `10px`, uppercase, `var(--color-text-muted)`
- [ ] Badge text matches exactly: "TNA" | "Wilfred" | "Sunday Best" | "Auxiliary"

### Story 2.4 — Sale price display
**As a** shopper looking for deals,
**I want** sale prices clearly shown with the original crossed out,
**so that** I understand the discount without it being aggressive.

**Acceptance criteria:**
- [ ] Sale products: red (`var(--color-sale)`) sale price + muted strikethrough original price
- [ ] Non-sale products: single muted price, no badge
- [ ] Sale formatting: `$[salePrice]` in red, `$[price]` strikethrough in muted
- [ ] No "SALE" badge or percentage-off text

---

## Epic 3 — Product Detail Page

### Story 3.1 — Image gallery with colorway sync
**As a** shopper on a PDP,
**I want** to select a color and have the entire gallery update to show that colorway,
**so that** I can see the product in my chosen color from multiple angles.

**Acceptance criteria:**
- [ ] Selecting a color sets `selectedColor` state to that `ColorVariant`
- [ ] Gallery images update to `selectedColor.images`
- [ ] Thumbnail strip updates to show the new colorway's thumbnails
- [ ] Gallery index resets to 0 on color change
- [ ] No carousel arrows — thumbnails are the navigation

### Story 3.2 — Size selector with OOS states
**As a** shopper selecting a size,
**I want** to see which sizes are available and which are sold out,
**so that** I'm not surprised at checkout.

**Acceptance criteria:**
- [ ] All sizes always rendered (never hidden)
- [ ] OOS size: `opacity: 0.4`, `text-decoration: line-through`, `aria-disabled="true"`, non-interactive
- [ ] Selected in-stock size: black fill, white text
- [ ] Clicking OOS size has no effect
- [ ] `border-radius: 0` on all size buttons

### Story 3.3 — Add to Cart CTA
**As a** shopper who has selected color and size,
**I want** to add the item to my cart and see it in my bag immediately,
**so that** I can continue browsing.

**Acceptance criteria:**
- [ ] Button disabled until valid in-stock size is selected
- [ ] Button enabled text: "Add to Cart"
- [ ] Disabled text: "Select a size" or greyed out "Add to Cart"
- [ ] On click: adds item to Zustand store, opens cart drawer
- [ ] Cart item contains: productId, name, brand, price (sale price if applicable), color name, swatch hex, size, quantity=1, colorway image

### Story 3.4 — Product accordions
**As a** shopper evaluating a purchase,
**I want** to read product details, care instructions, and delivery info in collapsible sections,
**so that** the PDP doesn't feel overwhelming.

**Acceptance criteria:**
- [ ] Three Radix `<Accordion>` sections: Details, Care, Delivery & Returns
- [ ] One section can be open at a time (or all closed)
- [ ] Keyboard accessible: Enter/Space toggles
- [ ] Smooth expand/collapse animation

---

## Epic 4 — PLP and Filtering

### Story 4.1 — Product grid
**As a** shopper browsing,
**I want** products displayed in a clean grid with correct responsive behavior,
**so that** I can scan the catalog efficiently on any device.

**Acceptance criteria:**
- [ ] 4 columns desktop (1280px+)
- [ ] 3 columns tablet (900px–1280px)
- [ ] 2 columns mobile (below 900px)
- [ ] 16px gap desktop, 8px gap mobile
- [ ] Image `aspect-ratio: 3/4`, no border-radius

### Story 4.2 — Filter panel (desktop)
**As a** shopper who wants to narrow results,
**I want** a left sidebar with filter options that are reflected immediately in the grid,
**so that** I can find specific products quickly.

**Acceptance criteria:**
- [ ] Sidebar: sub-brand, category, size, sale-only filters
- [ ] Filter state in URL query params (`?brand=TNA`)
- [ ] Checking a filter: URL updates, grid filters immediately
- [ ] Multiple values per filter type supported (`?brand=TNA&brand=Wilfred`)
- [ ] Active filter chips visible above the grid

### Story 4.3 — Filter panel (mobile)
**As a** mobile shopper,
**I want** to access filters via a bottom sheet,
**so that** the filter panel doesn't take up screen space on small screens.

**Acceptance criteria:**
- [ ] Desktop sidebar hidden on mobile
- [ ] "Filter" button visible above grid on mobile
- [ ] Bottom sheet: Framer Motion slide-up, `260ms ease-out`
- [ ] Same filter options as desktop
- [ ] "Apply" button closes sheet and applies filters

### Story 4.4 — Active filter chips
**As a** shopper with filters applied,
**I want** to see what filters are active and remove them individually,
**so that** I can adjust my search without clearing everything.

**Acceptance criteria:**
- [ ] One chip per active filter value
- [ ] Chip shows: filter value (e.g., "TNA", "XS")
- [ ] Clicking chip removes that filter, URL updates
- [ ] "Clear all" button when any filter is active

---

## Epic 5 — Homepage and Polish

### Story 5.1 — Editorial hero
**As a** first-time visitor,
**I want** to see a full-bleed editorial image with minimal text,
**so that** I immediately understand the brand's aesthetic.

**Acceptance criteria:**
- [ ] Full-bleed hero, `90vh` min-height
- [ ] Next.js `<Image>` with `fill` + `priority` + `object-cover`
- [ ] Minimal or no text overlay
- [ ] Single CTA if text present: links to PLP
- [ ] No carousel — single image

### Story 5.2 — New arrivals grid on homepage
**As a** returning visitor,
**I want** to see the newest products without navigating to the full PLP,
**so that** I can quickly scan what's new.

**Acceptance criteria:**
- [ ] Section label "NEW IN" (`11px` uppercase muted)
- [ ] 4-column product grid of `isNew: true` products
- [ ] ProductCards with full swatch hover behavior
- [ ] "View all" link to PLP

### Story 5.3 — Accessibility and performance
**As a** user with accessibility needs,
**I want** all interactive elements to be keyboard and screen-reader accessible,
**so that** the shopping experience is fully accessible.

**Acceptance criteria:**
- [ ] Focus rings on all interactive elements: `2px solid var(--color-text)` offset `2px`
- [ ] `aria-label` on icon-only buttons (search, cart, close)
- [ ] OOS sizes: `aria-disabled="true"`
- [ ] Cart drawer: focus trap when open
- [ ] Color swatches: `aria-label` is the color name, `aria-pressed` for selected state
- [ ] One `<h1>` per page
- [ ] All product images: descriptive `alt` text
- [ ] Lighthouse accessibility ≥ 90

### Story 5.4 — Build and type safety
**As a** deploying engineer,
**I want** a clean static export with zero TypeScript errors,
**so that** the build is reliable and deployable.

**Acceptance criteria:**
- [ ] `tsc --noEmit` zero errors in strict mode
- [ ] `npm run build` succeeds; `/out/` contains all product pages
- [ ] `generateStaticParams` covers all product slugs
- [ ] No hex values in any `.module.css` file
- [ ] `border-radius: 0` on all buttons and image containers (DevTools confirmed)
- [ ] Lighthouse performance ≥ 90
