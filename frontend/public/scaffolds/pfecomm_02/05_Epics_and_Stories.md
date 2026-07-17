# 05 — Epics and Stories
## Indian Heritage Fashion Storefront · pfecomm_platform_02

---

## Epic 1 — Design System and Global Shell

### Story 1.1 — CSS token system + warm ivory background
**As a** developer,
**I want** all UI colors defined as 7 CSS custom properties with a warm ivory background,
**so that** the warm artisan aesthetic is consistent and no hex values appear in component files.

**Acceptance criteria:**
- [ ] `globals.css` contains exactly 7 `--color-*` tokens
- [ ] Body background is `var(--color-bg)` — warm ivory, visibly different from pure white
- [ ] No hex values in any `.module.css` file (grep confirms)
- [ ] Color swatch backgrounds are the only inline hex values (via `style={{ background: color.swatch }}`)
- [ ] All interactive elements use CSS variable colors

### Story 1.2 — Two-font system via next/font
**As a** user,
**I want** Cormorant Garamond for headlines and Inter for UI text, loaded with zero layout shift,
**so that** the craft catalogue editorial feel is consistent from first paint.

**Acceptance criteria:**
- [ ] `next/font/google` loads both `Cormorant_Garamond` (weights 400/500/600) and `Inter` (weights 400/500/600)
- [ ] Applied as `--font-display` and `--font-body` on `<html>`
- [ ] `body` uses `font-family: var(--font-body)`
- [ ] No component uses `--font-display` for UI text (navigation, buttons, product card names, metadata)
- [ ] PDP product name `<h1>` and hero headline use `--font-display`
- [ ] Lighthouse CLS: 0

### Story 1.3 — PromoBanner with maroon background
**As a** shopper,
**I want** to see the current promotion in a maroon banner and dismiss it,
**so that** I see the brand color immediately and can clear the banner after reading.

**Acceptance criteria:**
- [ ] Banner is `40px` height, `var(--color-maroon)` background, white uppercase text
- [ ] `useState(true)` initially dismissed — corrected in `useEffect` from sessionStorage (avoids flash)
- [ ] Dismiss X button with `aria-label="Dismiss banner"`
- [ ] Collapse animation: `max-height` → 0, `200ms ease-out`
- [ ] Dismissed state persists in `sessionStorage` across page navigation

### Story 1.4 — MegaNav with Cormorant Garamond logo
**As a** shopper,
**I want** a navigation bar with the brand wordmark in Cormorant Garamond and a live cart count,
**so that** the brand's typographic character is established in the first element I see.

**Acceptance criteria:**
- [ ] Nav is sticky, `64px` desktop, `56px` mobile
- [ ] Logo wordmark uses `font-family: var(--font-display)`, `font-size: 22px`
- [ ] Nav link hover color: `var(--color-maroon)` (not black)
- [ ] Cart icon shows item count badge (maroon background)
- [ ] Mobile: hamburger + logo center + cart right

### Story 1.5 — Cart drawer with maroon checkout CTA
**As a** shopper who just added an item,
**I want** a cart drawer to slide in from the right with a maroon checkout button,
**so that** the brand color appears on the most trusted element in the conversion flow.

**Acceptance criteria:**
- [ ] Framer Motion: `x: '100%' → 0`, `280ms ease-out`
- [ ] Semi-transparent backdrop (`rgba(0,0,0,0.4)`)
- [ ] "Proceed to Checkout" button: full-width, `var(--color-maroon)` background, white text, `2px` radius
- [ ] Body scroll locked when drawer is open
- [ ] Free shipping note: "Add ₹X more for free shipping" when subtotal < ₹999

---

## Epic 2 — Product Data and ProductCard

### Story 2.1 — Product data model with craft metadata
**As a** TypeScript developer,
**I want** a fully typed product schema with craft technique, fabric, origin, and per-colorway image arrays,
**so that** the craft narrative and swatch hover can both source their data from the product record.

**Acceptance criteria:**
- [ ] `CraftTechnique` type has 8 values (7 techniques + 'none')
- [ ] `Fabric` type has 7 values
- [ ] `ColorVariant.name` uses natural dye vocabulary (not generic color names)
- [ ] `ColorVariant.images` is a `string[]` array (3–4 per colorway)
- [ ] `Product.origin` is optional string (artisan region)
- [ ] `CRAFT_LABELS` record maps `CraftTechnique` → display string
- [ ] `tsc --noEmit` strict passes

### Story 2.2 — ProductCard swatch hover — instant image swap
**As a** shopper browsing the product grid,
**I want** to hover a color swatch and immediately see the product in that colorway,
**so that** I can evaluate natural dye colorways without clicking into each PDP.

**Acceptance criteria:**
- [ ] `hoveredColorIndex` state drives the card image `src`
- [ ] `onMouseEnter` on each swatch sets the index
- [ ] Image swap is INSTANT — no CSS transition on the `<img>` element
- [ ] Color name accessible via `aria-label` on each swatch
- [ ] Natural dye color name visible on swatch hover

### Story 2.3 — Craft technique badge
**As a** shopper interested in specific craft techniques,
**I want** to see a craft badge on product cards,
**so that** I can identify hand-block printed, handloom, ajrakh, and chikankari items at a glance.

**Acceptance criteria:**
- [ ] Products with `craftTechnique !== 'none'` show their technique label above the product name
- [ ] Products with `craftTechnique === 'none'` show no badge
- [ ] Badge: `10px` Inter, uppercase, `letter-spacing: 0.08em`, `var(--color-text-muted)`
- [ ] Badge text matches exactly the `CRAFT_LABELS` record

### Story 2.4 — Sale price display with saffron-orange
**As a** shopper looking for deals,
**I want** sale prices shown in saffron-orange with the original crossed out,
**so that** the discount is clear without being aggressive.

**Acceptance criteria:**
- [ ] Sale products: saffron-orange (`var(--color-sale)`) sale price + muted strikethrough original
- [ ] Non-sale: single muted price
- [ ] Sale formatting: `₹[salePrice]` in saffron-orange, `₹[price]` strikethrough
- [ ] No "SALE" badge or percentage-off text

### Story 2.5 — INR pricing throughout
**As a** shopper,
**I want** all prices displayed in Indian Rupees with proper formatting,
**so that** the pricing feels native to the Indian market.

**Acceptance criteria:**
- [ ] All prices formatted as `₹X,XXX` using `formatINR()` utility
- [ ] `toLocaleString('en-IN')` used for number grouping
- [ ] No decimal places (₹2,499 not ₹2,499.00)
- [ ] Free shipping threshold: ₹999
- [ ] Cart subtotal in ₹

---

## Epic 3 — Product Detail Page

### Story 3.1 — Image gallery with colorway sync
**As a** shopper on a PDP,
**I want** to select a color and have the entire gallery update to that colorway's images,
**so that** I can see the natural dye color from multiple angles.

**Acceptance criteria:**
- [ ] Selecting a color sets `selectedColor` to that `ColorVariant`
- [ ] Gallery images update to `selectedColor.images`
- [ ] Gallery index resets to 0 on color change
- [ ] Size selection resets to null on color change
- [ ] No carousel arrows — thumbnails navigate

### Story 3.2 — PDP typography: Cormorant Garamond for product name
**As a** shopper on a PDP,
**I want** the product name in Cormorant Garamond,
**so that** the editorial typographic character is concentrated at the most important text on the page.

**Acceptance criteria:**
- [ ] `<h1>` product name: `font-family: var(--font-display)`, `24px`, `weight: 500`
- [ ] Origin provenance line below name: `12px` Inter muted (e.g., "Hand-block printed in Bagru, Rajasthan")
- [ ] All other PDP text: Inter (`--font-body`)

### Story 3.3 — Size selector with OOS states
**As a** shopper selecting a size,
**I want** to see all available and out-of-stock sizes,
**so that** I understand availability before adding to cart.

**Acceptance criteria:**
- [ ] All sizes always rendered
- [ ] OOS: `opacity: 0.4`, `text-decoration: line-through`, `aria-disabled="true"`
- [ ] Selected in-stock: maroon fill, white text
- [ ] `border-radius: 2px` on size buttons
- [ ] Clicking OOS size has no effect

### Story 3.4 — Add to Cart CTA
**As a** shopper who has selected color and size,
**I want** to add the item to my cart and see it confirmed in the drawer,
**so that** I can continue browsing.

**Acceptance criteria:**
- [ ] Button disabled until valid in-stock size selected
- [ ] Button: full-width, `48px` height, maroon background, white text, `2px` radius
- [ ] On click: adds item to Zustand store (with `craftTechnique`), opens cart drawer
- [ ] Cart item contains: productId, name, craftTechnique, price, color, colorSwatch, size, quantity=1, image

### Story 3.5 — Product accordions
**As a** shopper evaluating a craft purchase,
**I want** to read details about the technique, care for natural dyes, and delivery,
**so that** I can make an informed decision about this specific craft object.

**Acceptance criteria:**
- [ ] Three Radix `<Accordion>` sections: Details (includes craft technique + origin), Care (natural dye care instructions), Delivery & Returns
- [ ] Keyboard accessible: Enter/Space toggles
- [ ] Smooth expand/collapse

---

## Epic 4 — PLP and Filtering

### Story 4.1 — Product grid
**As a** shopper browsing,
**I want** products in a clean grid with craft badges and natural dye swatches visible,
**so that** I can scan the catalog by technique and color.

**Acceptance criteria:**
- [ ] 4 columns desktop (1280px+), 3 columns tablet (900px+), 2 columns mobile
- [ ] `16px` gap desktop, `8px` gap mobile
- [ ] Image `aspect-ratio: 3/4`, no border-radius

### Story 4.2 — Filter panel (desktop)
**As a** shopper who wants to find handloom kurtas in size M,
**I want** to filter by craft technique, category, fabric, and size simultaneously,
**so that** I see only the relevant products.

**Acceptance criteria:**
- [ ] Filter sections: Category, Craft Technique, Fabric, Size, Sale Only
- [ ] Filter state in URL (`?craft=handloom&category=kurtas`)
- [ ] Multiple values per filter type supported
- [ ] Active filter chips above grid

### Story 4.3 — Filter panel (mobile)
**As a** mobile shopper,
**I want** a bottom sheet with the same filters,
**so that** filters don't take up screen space when not in use.

**Acceptance criteria:**
- [ ] "Filter" button above grid on mobile
- [ ] Bottom sheet: Framer Motion slide-up, `260ms ease-out`
- [ ] Same filter options as desktop

### Story 4.4 — Active filter chips
**As a** shopper with filters applied,
**I want** to see and individually remove active filters,
**so that** I can refine my search.

**Acceptance criteria:**
- [ ] One chip per active filter value
- [ ] Chip shows the display value (e.g., "Handloom", "Kurtas", "XL")
- [ ] Clicking chip removes that filter, URL updates
- [ ] "Clear all" button when any filter active

---

## Epic 5 — Homepage and Polish

### Story 5.1 — Editorial hero with artisan photography
**As a** first-time visitor,
**I want** to see a full-bleed editorial hero that establishes craft heritage,
**so that** the brand identity is immediately clear.

**Acceptance criteria:**
- [ ] Full-bleed hero, `90vh` min-height
- [ ] Next.js `<Image>` with `fill` + `priority`
- [ ] Cormorant Garamond headline if text overlay present
- [ ] CTA link text uses `var(--color-maroon)` or white depending on image lightness

### Story 5.2 — Craft collection strips
**As a** returning visitor,
**I want** to see featured craft edits (e.g., "The Indigo Edit", "Handloom Essentials"),
**so that** I can navigate by craft tradition rather than generic categories.

**Acceptance criteria:**
- [ ] 2 craft strips on homepage
- [ ] Each strip: large image (1/2 width) + content (1/2 width, `var(--color-bg-warm)` background)
- [ ] Collection title in Cormorant Garamond
- [ ] "Shop [technique]" link in maroon

### Story 5.3 — Artisan Story strip
**As a** values-conscious shopper,
**I want** to see the brand's artisan mission stated plainly,
**so that** I understand who makes these products.

**Acceptance criteria:**
- [ ] Full-width section with `var(--color-bg-warm)` background
- [ ] Centered text in Cormorant Garamond: "Crafted by 55,000+ artisans across India"
- [ ] No CTA — this is a values statement, not a conversion moment

### Story 5.4 — Accessibility and performance
**As a** user with accessibility needs,
**I want** all interactive elements to be keyboard and screen-reader accessible,
**so that** the shopping experience is fully accessible.

**Acceptance criteria:**
- [ ] Focus rings: `2px solid var(--color-maroon)` offset `2px`
- [ ] `aria-label` on icon-only buttons
- [ ] OOS sizes: `aria-disabled="true"`
- [ ] Cart drawer: focus trap when open
- [ ] Color swatches: `aria-label` = color name, `aria-pressed` for selected

### Story 5.5 — Build and type safety
**As a** deploying engineer,
**I want** a clean static export with zero TypeScript errors and INR pricing verified,
**so that** the build is correct.

**Acceptance criteria:**
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all product pages in `/out/`
- [ ] No hex in CSS Module files
- [ ] `border-radius: 2px` on buttons, `0` on images (DevTools confirmed)
- [ ] All prices formatted as `₹X,XXX` (no decimals)
- [ ] No urgency copy
- [ ] Lighthouse performance ≥ 90, accessibility ≥ 90
