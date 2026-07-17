# 04 — Build Plan
## Premium Fashion Retail Storefront · pfecomm_platform_01

5-day plan. Each day ends with a working, demonstrable state.

---

## Day 1 — Foundation

**Goal:** Project setup, CSS tokens, cart store, PromoBanner and MegaNav working.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | `npm install zustand framer-motion @radix-ui/react-accordion lucide-react` | Deps installed |
| 3 | Create `src/types/index.ts` — `Brand`, `Category`, `SizeVariant`, `ColorVariant`, `Product`, `CartItem` | `tsc --noEmit` clean |
| 4 | Create `src/app/globals.css` — 6 CSS tokens + base reset | Body renders white background |
| 5 | Setup `Inter` via `next/font/google` in `layout.tsx` | Font loads, `--font-inter` variable applied |
| 6 | Create `src/store/cart.ts` — Zustand store with persist middleware | `useCartStore()` compiles |
| 7 | Create `src/components/layout/PromoBanner.tsx` — dismissible black bar | Banner shows, dismisses with animation, stays dismissed in session |
| 8 | Create `src/components/layout/MegaNav.tsx` — sticky, cart count badge | Nav renders, cart count shows Zustand itemCount |
| 9 | Create `src/components/cart/CartDrawer.tsx` — Framer Motion slide-in, backdrop | Cart opens/closes, line items render |
| 10 | Mount PromoBanner + MegaNav + CartDrawer in `src/app/layout.tsx` | All three present on every page |

**Gate:** Open cart (empty) — drawer slides in, backdrop visible, close works.

---

## Day 2 — Product Data + ProductCard

**Goal:** 12 seed products created, ProductCard renders with working swatch hover.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/lib/products.ts` — 12 products across all 5 sub-brands and 4+ categories | `getFeaturedProducts()` returns 4 products |
| 2 | Create `src/components/product/ProductCard.tsx` — image, swatches, sub-brand badge, price | Card renders |
| 3 | Verify swatch hover: hovering each swatch changes card image instantly | Visual test — no transition visible |
| 4 | Verify sub-brand badges: TNA/Wilfred/Sunday Best/Auxiliary show badge; Aritzia does not | Confirmed in browser |
| 5 | Verify sale pricing: sale product shows red price + strikethrough original | Confirmed on a sale-tagged product |

**Gate:** Open browser, hover every swatch on every card — image changes instantly for all. No transition visible. Sub-brand badges correct.

---

## Day 3 — PDP

**Goal:** Full product detail page working — gallery, selectors, add to cart.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/components/product/ImageGallery.tsx` — large image + thumbnails | Thumbnail click updates main image |
| 2 | Create `src/components/product/ColorSelector.tsx` — swatches + active state | Selecting color changes gallery to that colorway's images |
| 3 | Create `src/components/product/SizeSelector.tsx` — all sizes shown, OOS state | OOS sizes are strikethrough + 0.4 opacity, non-interactive |
| 4 | Wire `src/app/products/[slug]/page.tsx` — `generateStaticParams`, color/size/gallery state | Page loads for all slugs |
| 5 | Add to Cart: disabled until valid in-stock size selected | Button enables on size selection |
| 6 | Add to Cart: click adds item to Zustand store, opens cart drawer | Cart drawer opens with correct item |
| 7 | Verify: Radix UI accordions for Details, Care, Delivery | All 3 expand/collapse |

**Gate:** On PDP — cycle through 3 colors (gallery updates each time), select a size, add to cart, verify cart drawer shows correct item with colorway image.

---

## Day 4 — PLP + Filter Panel

**Goal:** Product listing page with working filter panel and URL-based state.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/components/product/ProductGrid.tsx` — responsive 4/3/2 col grid | Grid renders all products |
| 2 | Create `src/components/product/FilterPanel.tsx` — brand + category + size + sale filters | Checkboxes render; checking one updates filter state |
| 3 | Wire filter state to URL search params | URL shows `?brand=TNA` when TNA checked |
| 4 | Filtered results: grid shows only matching products | Filtering to TNA shows only TNA products |
| 5 | Active filter chips: chips display above grid, clicking removes filter | Chip appears, click removes it |
| 6 | Mobile filter: bottom sheet with Framer Motion slide-up | Filter accessible on mobile without sidebar |

**Gate:** Filter by sub-brand + category simultaneously → grid updates, URL reflects state, back button restores previous filter.

---

## Day 5 — Homepage + Audit

**Goal:** Homepage live, build passes, all acceptance criteria met.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create homepage `src/app/page.tsx` — hero, collection grid, new arrivals grid | Homepage renders without errors |
| 2 | Create `src/components/layout/Footer.tsx` | Footer renders |
| 3 | `tsc --noEmit` → fix any type errors | Zero errors |
| 4 | `npm run build` → verify `/out/` | Build succeeds |
| 5 | DevTools audit: check border-radius on all buttons and image containers | Zero instances of non-zero border-radius |
| 6 | Grep CSS: no hex values in `.module.css` files | Zero results |
| 7 | Accessibility: focus rings on all interactive elements, aria-labels on icons | DevTools Accessibility pane clean |
| 8 | Lighthouse run | Performance ≥ 90, Accessibility ≥ 90 |

**Gate checklist:**
- [ ] All 12 products render on PLP
- [ ] Every product's swatch hover changes card image — instant, no transition
- [ ] All PDP pages load correctly
- [ ] Color selector changes gallery images
- [ ] Add to Cart adds item, opens drawer
- [ ] Cart stepper +/− works; remove works
- [ ] Filter combinations work correctly
- [ ] PromoBanner dismisses and stays dismissed
- [ ] `border-radius: 0` on all buttons and image wrappers (DevTools confirmed)
- [ ] No hex in CSS Module files
- [ ] Lighthouse ≥ 90/90

---

### Cut Order

**Never cut:**
- ProductCard with swatch hover (instant image swap — no transition)
- PDP with ColorSelector + SizeSelector + Add to Cart
- CartDrawer with Framer Motion slide-in

**Cut first if time-constrained:**
- Mobile filter bottom sheet (use sidebar-only filter as fallback)
- "You may also like" related products section
- PLP load-more pagination (show all products on single page instead)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `border-radius` applied to any button or image container | High | High | Aritzia brand: ALL buttons and image containers must be `border-radius: 0`; Day 5 DevTools audit confirms |
| Swatch hover triggers visible CSS transition | High | High | Must be instantaneous — no `transition` on card image; `grep -r "transition" src/components/product/ProductCard.module.css` → empty (on image) |
| Sub-brand badge appearing on Aritzia-brand products | Medium | Medium | Badge renders ONLY for TNA / Wilfred / Sunday Best / Auxiliary — not for `brand === 'Aritzia'` |
| ColorSelector not updating gallery to correct colorway's images | Medium | High | `ColorOption.images[]` must be per-colorway; selecting a color replaces entire gallery |
| Hex values in CSS Module files | Medium | Medium | `grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"` → zero results |
| OOS sizes hidden instead of shown with strikethrough | Low | Medium | OOS sizes must be visible at `0.4 opacity` with strikethrough — NOT `display: none` |
