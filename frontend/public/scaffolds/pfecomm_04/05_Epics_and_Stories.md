# 05 — Epics and Stories
## Indian D2C Youth Fashion Brand · pfecomm_platform_04
### Bewakoof-style · Yellow + Dark · Montserrat · Combo Deal System

---

## Epic 1 — Design System and Global Shell

### Story 1.1 — CSS tokens + yellow brand
**As a** developer,
**I want** all UI colors defined as 7 CSS custom properties with yellow as the brand identity,
**so that** the bold Indian youth fashion aesthetic is consistent and no hex values appear in component files.

**Acceptance criteria:**
- [ ] `globals.css` has exactly 7 `--color-*` tokens
- [ ] `--color-brand` is yellow `hsl(47deg 100% 60%)` — primary CTA and badge backgrounds
- [ ] `--color-deal` is orange `hsl(26deg 100% 50%)` — used ONLY for combo active state in `ComboProgress`
- [ ] `--color-discount` is red — distinct from brand yellow; used for discount badges
- [ ] `--color-text` is near-black — used as label color ON yellow backgrounds (yellow as background requires dark text)
- [ ] `--shadow-card` and `--shadow-card-hover` defined as CSS custom properties
- [ ] No hex values in any `.module.css` file; `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty

### Story 1.2 — Montserrat font, single face
**As a** user,
**I want** Montserrat loaded with zero layout shift,
**so that** the bold, energetic typographic feel is consistent from first paint.

**Acceptance criteria:**
- [ ] Montserrat loaded via `next/font/google`, weights 400/500/600/700/800
- [ ] Applied as `--font-sans` on `<html>`
- [ ] No serif, display, or other sans-serif font anywhere in the codebase
- [ ] `grep -r "Inter\|Poppins\|Roboto\|DM_Sans" src/app/layout.tsx` → empty
- [ ] Lighthouse CLS: 0

### Story 1.3 — PromoBanner with yellow background + black text
**As a** visitor,
**I want** to see a yellow promo banner and be able to dismiss it,
**so that** I notice current deals without being permanently distracted.

**Acceptance criteria:**
- [ ] `40px`, `background: var(--color-brand)` (yellow), `color: var(--color-text)` (near-black)
- [ ] **No white text on yellow** — yellow on white = 1.22:1 fails; dark text on yellow = 6.1:1 passes ✓
- [ ] `useState(true)` initially dismissed (avoids flash), corrected in `useEffect` from `sessionStorage`
- [ ] Dismissible with X button; dismissed state persists in `sessionStorage` across page navigation
- [ ] TypeScript: `PromoBannerProps = { message: string }`

### Story 1.4 — TopNav with search bar + live cart count
**As a** visitor,
**I want** to search products and see my cart item count from any page,
**so that** I can quickly navigate and track my bag.

**Acceptance criteria:**
- [ ] Sticky `60px` height, `1px` bottom border in `var(--color-border)`
- [ ] Search input centered on desktop (visible text input); icon-only on mobile
- [ ] Cart icon badge shows `cartStore.itemCount` from Zustand
- [ ] Cart badge: `background: var(--color-brand)` (yellow), `color: var(--color-text)` (black) — no white text on yellow
- [ ] Badge updates live without page refresh
- [ ] TypeScript: `NavbarProps = { cartItemCount: number }`

### Story 1.5 — CartDrawer with yellow checkout + ComboProgress
**As a** visitor who has added items,
**I want** a slide-in cart drawer with a yellow checkout button,
**so that** I can review and proceed to payment without leaving the current page.

**Acceptance criteria:**
- [ ] Framer Motion slide-in from right: `x: '100%' → 0`, `260ms ease-out`
- [ ] Semi-transparent backdrop; click closes drawer
- [ ] "Proceed to Checkout" button: `background: var(--color-brand)` (yellow), `color: var(--color-text)` (black), `border-radius: 8px`, `height: 48px`
- [ ] Free shipping note: "Add ₹X more for free shipping" when `subtotal < ₹499`; uses `formatINR()`
- [ ] `ComboProgress` component visible in cart footer when any `comboEligible: true` items present
- [ ] Body scroll locked when drawer is open; focus trapped; Escape key closes

---

## Epic 2 — Card Design System

### Story 2.1 — Card box shadow + rounded images
**As a** visitor browsing products,
**I want** cards with a subtle shadow that lifts on hover,
**so that** the grid feels energetic and interactive.

**Acceptance criteria:**
- [ ] Every product card: `box-shadow: var(--shadow-card)` (`0 2px 8px rgba(0,0,0,0.08)`) at rest
- [ ] Hover: `box-shadow: var(--shadow-card-hover)` (`0 4px 16px rgba(0,0,0,0.14); transform: translateY(-2px)`)
- [ ] `border-radius: 16px` on image wrapper
- [ ] Card shadow wraps the entire card (not just the image)
- [ ] Transition: `200ms ease` on shadow and transform
- [ ] `@media (prefers-reduced-motion: reduce)`: no transform, no shadow transition

### Story 2.2 — PrintStyle badge on cards
**As a** shopper interested in specific print types,
**I want** a badge on product cards showing the print style,
**so that** I can quickly identify licensed, graphic, or seasonal items.

**Acceptance criteria:**
- [ ] Badge visible top-left, `position: absolute` on image wrapper
- [ ] `background: var(--color-brand)` (yellow), `color: var(--color-text)` (black), `border-radius: 4px`
- [ ] Shows ONLY when `product.printStyle !== 'solid'` — solid products have no badge
- [ ] For `printStyle === 'licensed'`: badge text = `product.collection` value (e.g., "Star Wars")
- [ ] For other print styles: badge text = `PRINT_LABELS[product.printStyle]`
- [ ] TypeScript: `type PrintStyle = 'solid' | 'graphic' | 'stripe' | 'licensed' | 'seasonal'`; `PRINT_LABELS: Record<Exclude<PrintStyle, 'solid' | 'licensed'>, string>`

### Story 2.3 — Discount badge on cards
**As a** deal-seeking visitor,
**I want** to see a clear discount percentage on sale items,
**so that** I can identify the best deals at a glance.

**Acceptance criteria:**
- [ ] Badge visible top-right, `position: absolute` on image wrapper
- [ ] `background: var(--color-discount)` (red), white text, `border-radius: 4px`
- [ ] Shows ONLY when `product.price < product.mrp`
- [ ] Products with `price === mrp`: no badge at all — conditional JSX, not `display:none`
- [ ] Badge text: `{Math.round((1 - price/mrp) * 100)}% off` — computed, not hardcoded
- [ ] `grep -r "% off" src/components --include="*.tsx"` → empty (text always computed)

### Story 2.4 — Price row + coins on cards
**As a** visitor browsing,
**I want** to see the selling price, original MRP, discount, and coins earned on every card,
**so that** I fully understand the value before clicking through.

**Acceptance criteria:**
- [ ] Selling price: `15px` weight 700 — always shown; formatted via `formatINR()`
- [ ] MRP: `13px` strikethrough muted — ONLY when `price < mrp`; uses `<del>` tag
- [ ] Discount %: `13px` weight 600, `color: var(--color-discount)` (red) — ONLY when `price < mrp`
- [ ] Coins: `11px` muted — always shown: `"+ {coinsEarned} Coins"`
- [ ] All amounts via `formatINR()` — ₹ symbol, no decimal places
- [ ] TypeScript: `Product = { id: string; name: string; price: number; mrp: number; coinsEarned: number; printStyle: PrintStyle; collection?: string; comboEligible: boolean; colorOptions: ColorOption[] }`

---

## Epic 3 — Combo Deal System

### Story 3.1 — Combo utilities in lib/utils.ts
**As a** developer,
**I want** combo deal logic encapsulated in pure utility functions,
**so that** the store and UI components both rely on a single correct source of truth.

**Acceptance criteria:**
- [ ] `COMBO_QTY = 3` and `COMBO_PRICE = 1199` exported from `src/lib/utils.ts`
- [ ] `getComboSavings(items: CartItem[]): number` — returns savings for combo-eligible items: `Math.floor(eligibleCount / COMBO_QTY) * (eligibleCount * avgUnitPrice - COMBO_PRICE)`; correct for 3, 6, 7 eligible items
- [ ] `getComboProgress(items: CartItem[]): { count: number; neededForNext: number }` — `neededForNext = COMBO_QTY - (count % COMBO_QTY)` when count not at threshold; 0 when count = 0
- [ ] Neither function exists in the Zustand store (store calls utils, never duplicates logic)
- [ ] `comboEligible: boolean` on `CartItem` — copied from `product.comboEligible` at add-time; never re-fetched
- [ ] TypeScript: `getComboSavings(items: CartItem[]): number`; `getComboProgress(items: CartItem[]): { count: number; neededForNext: number }`

### Story 3.2 — ComboProgress component
**As a** visitor with combo-eligible items in cart,
**I want** to see a live progress bar showing how close I am to the combo deal,
**so that** I'm motivated to add one more tee.

**Acceptance criteria:**
- [ ] Shows when `count === 0`: "Add 3 tees for ₹1,199 — save big!"
- [ ] Shows when `0 < count < COMBO_QTY`: `"Add {neededForNext} more tee(s) for the ₹1,199 combo deal"`
- [ ] Shows when `count >= COMBO_QTY`: `"Combo active! {count} tees @ ₹1,199"` in `color: var(--color-deal)` (orange)
- [ ] Progress bar fills proportionally to nearest combo threshold (e.g., 2/3 = 66% filled)
- [ ] `var(--color-deal)` (orange) used ONLY in combo active state — nowhere else
- [ ] Container: yellow tint background + `border: 1px solid var(--color-brand)`

### Story 3.3 — ComboProgress in CartDrawer
**As a** visitor reviewing my cart,
**I want** to see the combo deal progress while reviewing my bag,
**so that** I know to add one more item before checking out.

**Acceptance criteria:**
- [ ] Visible in cart footer when `cartStore.items.some(i => i.comboEligible)`
- [ ] `ComboProgress` absent from cart footer when no combo-eligible items in cart — conditional JSX, not `display:none`
- [ ] Updates live (no page refresh needed) as items are added/removed via Zustand subscription

### Story 3.4 — ComboProgress on PDP
**As a** visitor on a product detail page,
**I want** to see the combo deal progress on combo-eligible products,
**so that** I understand the deal at the point of decision.

**Acceptance criteria:**
- [ ] Shown on PDP when `product.comboEligible === true`
- [ ] Not shown on PDP when `product.comboEligible === false` — conditional JSX
- [ ] Reads from live `cartStore` — reflects actual current cart contents
- [ ] Positioned below the Add to Bag button; above the accordions

---

## Epic 4 — Product Detail Page

### Story 4.1 — Image gallery with per-color images
**As a** visitor evaluating a product,
**I want** the image gallery to update instantly when I select a color,
**so that** I can see exactly what I'll receive before adding to cart.

**Acceptance criteria:**
- [ ] Main image + thumbnail strip below; thumbnail count = number of images for selected color
- [ ] Left/right arrow navigation through main image
- [ ] Selecting a color dot → gallery switches to that `ColorOption.images[]` instantly (no CSS transition on `<img>`)
- [ ] Selected thumbnail: `border: 2px solid var(--color-text)` highlight
- [ ] Selected color dot: `outline: 2px solid var(--color-text)` on the dot
- [ ] TypeScript: `ColorOption = { name: string; hex: string; images: string[] }`

### Story 4.2 — PDP price block
**As a** visitor on a product page,
**I want** to see the full price breakdown including coins I'll earn,
**so that** I understand the total value of buying this item.

**Acceptance criteria:**
- [ ] Selling price: `26px` weight 700 — always shown
- [ ] MRP: `16px` `<del>` strikethrough muted — ONLY when `price < mrp`
- [ ] Discount %: `16px` weight 600, `color: var(--color-discount)` (red) — ONLY when `price < mrp`
- [ ] Coins: "Earn {coinsEarned} Coins on this order" below price block — always shown
- [ ] Non-discounted product: only selling price + coins shown; no MRP, no red %
- [ ] All amounts via `formatINR()`

### Story 4.3 — Add to Bag button (PDP)
**As a** visitor who has selected a size,
**I want** to add the product to my bag so I can purchase it.

**Acceptance criteria:**
- [ ] Full-width, `height: 48px`, `border-radius: 8px`
- [ ] `background: var(--color-brand)` (yellow), `color: var(--color-text)` (black)
- [ ] Disabled until size selected: `opacity: 0.45; cursor: not-allowed`
- [ ] Clicking while disabled: no action; shows "Please select a size" validation text below selector
- [ ] On click (when size selected): `addItem()` → `openCart()` (opens CartDrawer)
- [ ] TypeScript: `addItem(item: Omit<CartItem, 'quantity'>): void` in cart store

### Story 4.4 — UGC Community Looks
**As a** style-conscious visitor,
**I want** to see real customers wearing the product,
**so that** I can visualise how it looks in everyday life.

**Acceptance criteria:**
- [ ] Section labeled "Community Looks — Real people, real style"
- [ ] 4 images in a horizontal grid (2×2 on mobile, 4 in a row on desktop)
- [ ] Positioned below the product accordions
- [ ] Static/placeholder images in this build (v1)
- [ ] Present on every PDP regardless of product

### Story 4.5 — Radix accordions
**As a** visitor wanting product details,
**I want** to expand accordion sections without cluttering the main view,
**so that** the PDP stays scannable while details are accessible.

**Acceptance criteria:**
- [ ] 3 accordion items: "Product Details", "Size & Fit", "Delivery & Returns"
- [ ] Radix `<Accordion type="single" collapsible>` — one open at a time or all closed
- [ ] Focus-accessible, keyboard navigable (Space/Enter toggles)
- [ ] No countdown timer or urgency copy in any accordion section
- [ ] `grep -r "countdown\|Countdown\|sale ends\|offer ends" src/components/product --include="*.tsx"` → empty

---

## Epic 5 — PLP, Filter, Homepage

### Story 5.1 — 4-column product grid
**As a** visitor browsing,
**I want** products displayed in a 4-column grid on desktop,
**so that** I can scan the catalogue efficiently — not 5 columns (AJIO's pattern) or 3 (Myntra's).

**Acceptance criteria:**
- [ ] Desktop (1280px+): 4 columns
- [ ] Tablet (768px–1280px): 2 columns
- [ ] Mobile (below 768px): 2 columns (smaller gap)
- [ ] `gap: 16px` desktop, `12px` tablet, `8px` mobile
- [ ] `grep -r "repeat(5\|repeat(3" src/components/product/ProductGrid --include="*.module.css"` → empty

### Story 5.2 — PrintStyle filter
**As a** visitor who knows what style they want,
**I want** to filter by print style,
**so that** I see only graphic tees, solid tees, or licensed products.

**Acceptance criteria:**
- [ ] Filter options show all `PrintStyle` values present in mock data
- [ ] Multi-select: can filter by 2+ print styles simultaneously
- [ ] "Licensed" filter shows only `printStyle === 'licensed'` products
- [ ] Filter state in URL: `?printStyle=licensed&printStyle=graphic`; survives page refresh via server component param reading

### Story 5.3 — Discount range filter
**As a** deal-seeking visitor,
**I want** to filter by minimum discount percentage,
**so that** I only see the best sales.

**Acceptance criteria:**
- [ ] Options: 30%+, 40%+, 50%+, 60%+, 70%+
- [ ] "40%+" shows only products where `Math.round((1 - price/mrp) * 100) >= 40`
- [ ] Filter state in URL: `?minDiscount=40`
- [ ] Single-select (only one discount floor at a time)

### Story 5.4 — Homepage combo promotion
**As a** first-time visitor,
**I want** to immediately understand the combo deal offer from the homepage,
**so that** I'm motivated to buy 3 tees.

**Acceptance criteria:**
- [ ] Hero section: bold Montserrat 800 headline, yellow CTA with black text
- [ ] Combo deal callout: "Buy 3 tees for ₹1,199" — prominent banner above product rows
- [ ] At least 2 horizontal product rows: "Top Picks" and "Trending Prints"
- [ ] Products in rows display print badges and discount badges where applicable

### Story 5.5 — Accessibility and performance
**As a** user with accessibility needs or a slow connection,
**I want** the site to be usable and fast,
**so that** the experience is inclusive and not frustrating.

**Acceptance criteria:**
- [ ] `--color-brand` (yellow) is NEVER used as `color` property on text (only as `background`) — `grep -r "color: var(--color-brand)" src/components --include="*.module.css"` → empty
- [ ] `--color-deal` (orange) NOT used as CTA color — only in combo active text — `grep -r "color-deal" src/components --include="*.module.css"` → only `ComboProgress.module.css`
- [ ] Focus rings: `outline: 2px solid var(--color-text); outline-offset: 2px` — visible on white backgrounds
- [ ] OOS sizes: `aria-disabled="true"`, `opacity: 0.4`, `text-decoration: line-through`
- [ ] Focus trap in CartDrawer
- [ ] All product images use `next/image` with explicit `sizes` prop
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0; `/out/` contains all product pages
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
