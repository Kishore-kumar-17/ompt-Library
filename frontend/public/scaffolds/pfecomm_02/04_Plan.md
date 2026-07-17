# 04 — Build Plan
## Indian Heritage Fashion Storefront · pfecomm_platform_02

5-day plan. Each day ends with a working, demonstrable state.

---

## Day 1 — Foundation

**Goal:** Project setup, CSS tokens, both fonts, cart store, PromoBanner and MegaNav working.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | `npm install zustand framer-motion @radix-ui/react-accordion lucide-react` | Deps installed |
| 3 | Create `src/types/index.ts` — `CraftTechnique`, `Fabric`, `Category`, `ColorVariant`, `SizeVariant`, `Product`, `CartItem`, `CRAFT_LABELS` | `tsc --noEmit` clean |
| 4 | Create `src/app/globals.css` — 7 CSS tokens + base reset | Body renders warm ivory background |
| 5 | Setup `Cormorant_Garamond` + `Inter` via `next/font/google` in `layout.tsx` | Both `--font-display` and `--font-body` variables applied to `<html>` |
| 6 | Create `src/lib/utils.ts` — `formatINR()` function | `formatINR(2499)` returns `"₹2,499"` |
| 7 | Create `src/store/cart.ts` — Zustand store + persist, `FREE_SHIPPING_THRESHOLD = 999` | `useCartStore()` compiles |
| 8 | Create `src/components/layout/PromoBanner.tsx` — dismissible maroon bar | Banner shows; dismiss collapses it; sessionStorage persists dismissal |
| 9 | Create `src/components/layout/MegaNav.tsx` — sticky `64px`, Cormorant Garamond logo, cart badge | Nav renders; badge shows itemCount |
| 10 | Create `src/components/cart/CartDrawer.tsx` — Framer Motion slide-in, maroon checkout button | Cart opens/closes; empty state shows |
| 11 | Mount PromoBanner + MegaNav + CartDrawer in `src/app/layout.tsx` | All three present on every page |

**Gate:** Open cart (empty) — drawer slides in from right, maroon checkout button visible, close works. Banner is maroon, not black.

---

## Day 2 — Product Data + ProductCard

**Goal:** 12 seed products created, ProductCard renders with working swatch hover and craft badge.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/lib/products.ts` — 12 products, 4+ categories, 4+ craft techniques, 3+ fabrics, natural dye color names | `getFeaturedProducts()` returns ≥ 4 products |
| 2 | Create `src/components/product/ProductCard.tsx` — image, craft badge, fabric label, swatches, price in ₹ | Card renders |
| 3 | Verify swatch hover: hovering each swatch changes card image instantly — no transition visible | Visual test |
| 4 | Verify craft badges: hand-block-print products show "Hand-Block Print", handloom shows "Handloom" | Confirmed in browser |
| 5 | Verify `craftTechnique === 'none'` products show no badge | Confirmed |
| 6 | Verify sale pricing: saffron-orange sale price + strikethrough original | Confirmed on sale-tagged products |
| 7 | Verify INR formatting: `₹2,499` not `₹2499` or `₹2,499.00` | Confirmed |

**Gate:** Open browser, hover every swatch on every card — image changes instantly. Craft badges display on correct products. Sale prices are saffron-orange.

---

## Day 3 — PDP

**Goal:** Full product detail page working — gallery, selectors, add to cart.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/components/product/ImageGallery.tsx` — large image + thumbnails | Thumbnail click updates main image |
| 2 | Create `src/components/product/ColorSelector.tsx` — swatch circles + natural dye name label | Selecting color changes gallery to that colorway's images |
| 3 | Create `src/components/product/SizeSelector.tsx` — all sizes shown, OOS state visible | OOS sizes strikethrough + 0.4 opacity, non-interactive |
| 4 | Wire `src/app/products/[slug]/page.tsx` — `generateStaticParams`, color/size/gallery state, origin line | Page loads for all slugs |
| 5 | PDP layout: 55% gallery / 45% info, Cormorant Garamond for H1 product name | Layout renders correctly |
| 6 | Add to Cart: disabled until valid in-stock size selected | Button enables on size selection |
| 7 | Add to Cart: click adds item to Zustand store, opens cart drawer (maroon button in drawer) | Cart drawer opens with correct item |
| 8 | Verify Radix UI accordions: Details, Care, Delivery & Returns | All 3 expand/collapse |

**Gate:** On PDP — cycle through colors (gallery updates, origin line stays), select size, click Add to Cart, verify maroon button in drawer. OOS sizes strikethrough. H1 name in Cormorant Garamond.

---

## Day 4 — PLP + Filter Panel

**Goal:** Product listing page with craft-based filtering and URL state.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/components/product/ProductGrid.tsx` — responsive 4/3/2 col grid | Grid renders all products |
| 2 | Create `src/components/product/FilterPanel.tsx` — category + craft + fabric + size + sale filters | Checkboxes render |
| 3 | Wire filter state to URL search params | URL shows `?craft=handloom` when Handloom checked |
| 4 | Filtered results: grid shows only matching products | Filtering to "Ajrakh Print" shows only ajrakh products |
| 5 | Active filter chips: chips display above grid, clicking removes filter | Chip appears, click removes it |
| 6 | Mobile filter: bottom sheet with Framer Motion slide-up | Filter accessible on mobile |

**Gate:** Filter by craft technique + category simultaneously → grid updates, URL reflects state, back button restores filter.

---

## Day 5 — Homepage + Audit

**Goal:** Homepage live, build passes, all acceptance criteria met.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/app/page.tsx` — hero, craft collection strips ("The Indigo Edit", "Handloom Essentials"), new arrivals grid | Homepage renders without errors |
| 2 | Add Artisan Story strip — full-width warm beige section, Cormorant Garamond centered text | Strip renders |
| 3 | Create `src/components/layout/Footer.tsx` | Footer renders |
| 4 | `tsc --noEmit` → fix any type errors | Zero errors |
| 5 | `npm run build` → verify `/out/` | Build succeeds |
| 6 | DevTools audit: check `border-radius: 2px` on all buttons, `0` on image containers | Confirmed |
| 7 | Grep CSS: `grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"` | Zero results |
| 8 | Verify: no `--font-display` (Cormorant Garamond) applied to UI text, buttons, nav | Zero incorrect uses |
| 9 | Verify: all prices show ₹ symbol, Indian formatting, no decimals | Confirmed |
| 10 | Lighthouse run | Performance ≥ 90, Accessibility ≥ 90 |

**Gate checklist:**
- [ ] All 12 products render on PLP
- [ ] Every product's swatch hover changes card image — instant, no transition
- [ ] Craft badges display on correct products; `none` products have no badge
- [ ] All PDP pages load; H1 name in Cormorant Garamond; origin line shows
- [ ] Color selector changes gallery images to selected colorway
- [ ] Add to Cart adds item, opens drawer, maroon checkout button
- [ ] Cart stepper works; remove works; ₹999 free shipping note
- [ ] Craft + category filter combination works
- [ ] PromoBanner is maroon, dismisses, stays dismissed
- [ ] `border-radius: 2px` on all buttons, `0` on all image wrappers (DevTools confirmed)
- [ ] No hex in CSS Module files
- [ ] Prices: ₹X,XXX format throughout
- [ ] No urgency copy anywhere
- [ ] Lighthouse ≥ 90/90

---

### Cut Order

**Never cut:**
- ProductCard with craft badges + swatch hover (instant swap)
- PDP with Cormorant Garamond H1 + ColorSelector + Add to Cart
- CartDrawer with maroon checkout button

**Cut first if time-constrained:**
- Mobile filter bottom sheet (sidebar-only fallback)
- Artisan Story strip (keep heading; cut full-width editorial)
- Craft collection editorial strips ("The Indigo Edit" etc.)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `--font-display` (Cormorant Garamond) applied to UI text, buttons, or nav | High | High | Display font = headings only; `grep -r "font-display" src/ --include="*.module.css"` → only product H1, section headings |
| `border-radius` more than `2px` on buttons | Medium | High | Buttons must be exactly `border-radius: 2px`; image wrappers `border-radius: 0`; DevTools audit confirms |
| Urgency copy added accidentally ("Only 3 left!", "Limited stock!") | Medium | High | Explicitly forbidden — no urgency messaging anywhere; grep for "Only" / "Limited" in JSX |
| INR formatting showing decimals (`₹2,499.00`) | Medium | Medium | `formatINR()` must strip decimals; verify `formatINR(2499)` → `"₹2,499"` (no `.00`) |
| Craft badge appearing on `craftTechnique: 'none'` products | Medium | Medium | Conditional render: `{product.craftTechnique !== 'none' && <CraftBadge />}` |
| Hex values in CSS Module files | Medium | Medium | `grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"` → zero results |
