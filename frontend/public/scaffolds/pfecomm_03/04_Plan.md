# 04 — Build Plan
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

5-day plan. Each day ends with a demonstrable working state.

---

## Day 1 — Foundation + Two Stores

**Goal:** Project setup, CSS tokens, Inter font, both Zustand stores wired, PromoBanner + TopNav + CartDrawer working.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | Install deps: `zustand framer-motion @radix-ui/react-accordion lucide-react` | Installed |
| 3 | `src/types/index.ts` — `ColorOption`, `SizeOption`, `Product`, `CartItem`, `WishlistItem` | `tsc --noEmit` clean |
| 4 | `src/app/globals.css` — 7 CSS tokens + base reset | Body background pure white |
| 5 | `src/lib/utils.ts` — `formatINR()` + `getDiscountPercent()` | `getDiscountPercent(2499, 1499)` returns `40` |
| 6 | `src/store/cart.ts` — Zustand, `'ajio-cart'`, composite key, `FREE_SHIPPING_THRESHOLD = 599` | Compiles |
| 7 | `src/store/wishlist.ts` — Zustand, `'ajio-wishlist'`, `toggle`, `isWishlisted` | Compiles, persists separately |
| 8 | `src/components/layout/PromoBanner.tsx` — orange bar, dismissible | Orange banner visible, dismiss works |
| 9 | `src/components/layout/TopNav.tsx` — sticky `60px`, search center, wishlist + cart counts | Nav renders; badges show live counts |
| 10 | `src/components/cart/CartDrawer.tsx` + `CartItem.tsx` | Cart opens/closes, orange "Proceed to Checkout" button |
| 11 | Mount all three in `src/app/layout.tsx`, Inter font | All present on every page |

**Gate:** Cart opens → drawer slides from right → orange checkout button visible. Cart and wishlist count badges both visible in nav. PromoBanner is orange.

---

## Day 2 — ProductCard + SizePicker

**Goal:** ProductCard fully working — discount badge, wishlist heart, quick-add hover, brand-first layout.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/lib/products.ts` — 12 products: Nike, Adidas, H&M, Levi's, Roadster, Biba, AJIO + mix of categories | All 12 load |
| 2 | `src/components/product/ProductCard.tsx` + CSS — discount badge (top-left), wishlist heart (top-right), quick-add pill (bottom, opacity 0) | Card renders |
| 3 | Verify discount badge: products with `price < mrp` show `{pct}% off` badge in red | Confirmed |
| 4 | Verify: products with `price === mrp` show NO badge and NO MRP row | Confirmed |
| 5 | Verify: brand name appears FIRST (above product name), uppercase, `weight: 700` | Confirmed |
| 6 | Verify: price row shows bold selling price + strikethrough MRP + red discount % (only when discounted) | Confirmed |
| 7 | Verify: quick-add pill appears on card hover (`opacity 0 → 1`) | Confirmed |
| 8 | Verify: wishlist heart fills when toggled, unfills on toggle again | Confirmed — wishlist count in nav updates |
| 9 | `src/components/product/SizePicker.tsx` — mini-overlay with size buttons | Opens on quick-add click |
| 10 | SizePicker: selecting size + "ADD TO BAG" → adds to cart, opens cart drawer, closes picker | Confirmed |

**Gate:** Browse 5 different product cards. Badge shows on discounted products. Heart fills/unfills. Quick-add opens size picker. Adding size increments cart badge. Non-discounted product has no badge and no MRP.

---

## Day 3 — PDP

**Goal:** Full product detail page — gallery, selectors, add to bag, wishlist.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/product/ImageGallery.tsx` — main image + thumbnail strip + arrow navigation | Arrows navigate gallery |
| 2 | `src/components/product/SizeSelector.tsx` — OOS strikethrough + orange selected | OOS sizes visible but non-interactive |
| 3 | `src/app/products/[slug]/page.tsx` — `generateStaticParams`, 50/50 layout | All product pages load |
| 4 | PDP right column: brand (`14px` uppercase) + H1 name (`18px`) + price block (selling + MRP + discount %) | Price block correct for discounted and non-discounted products |
| 5 | Color dots row — selected dot: `outline: 2px solid var(--color-brand)` | Color selection works |
| 6 | "Add to Bag" full-width orange `48px` — disabled until size selected, opens cart on success | Cart opens with correct item |
| 7 | Wishlist button — outline, `48px`, heart icon — toggles wishlist state | Persisted; heart fills |
| 8 | Radix UI accordions: Product Details, Size & Fit, Delivery & Returns | All 3 expand/collapse |

**Gate:** PDP for a discounted product: price block shows selling price + MRP + red discount %. PDP for non-discounted product: only selling price, no MRP. Add to bag → orange cart button.

---

## Day 4 — PLP + Filters

**Goal:** Product listing with 5-column grid, discount range filter, brand filter.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/product/ProductGrid.tsx` — 5-col desktop, 3-col tablet, 2-col mobile | Grid renders correctly |
| 2 | `src/components/product/FilterPanel.tsx` — brand checkboxes (with search-within), category, price, discount range, size | Panel renders |
| 3 | Discount filter: "50% off and more" shows only products where `getDiscountPercent(mrp, price) >= 50` | Filter works |
| 4 | Brand filter: "Nike" shows only Nike products | Filter works |
| 5 | Filter state in URL params | URL updates, back button restores |
| 6 | Active filter chips above grid | Chips visible, clicking removes filter |
| 7 | Mobile filter: bottom sheet Framer Motion slide-up | Works on mobile |

**Gate:** Apply "Nike" + "50% off and more" → grid shows only Nike products with ≥50% discount. URL shows `?brand=Nike&minDiscount=50`. Back button restores filter.

---

## Day 5 — Homepage + Wishlist Page + Audit

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/app/page.tsx` — hero (bold promotional), deal sections ("Up to 60% Off" scroll row), brand logos strip, new arrivals 5-col | Homepage renders |
| 2 | `src/app/wishlist/page.tsx` — grid of wishlisted items, remove, add to bag | Wishlist page shows saved items |
| 3 | `src/components/layout/Footer.tsx` | Footer renders |
| 4 | `tsc --noEmit` → fix any type errors | Zero errors |
| 5 | `npm run build` | Build succeeds |
| 6 | DevTools: every `<button>` (CTA) has `border-radius: 4px` | Confirmed |
| 7 | DevTools: every product image wrapper has `border-radius: 4px` | Confirmed |
| 8 | DevTools: discount badge has `border-radius: 2px` | Confirmed |
| 9 | DevTools: quick-add pill has `border-radius: 100px` | Confirmed |
| 10 | Grep: no hex in CSS Module files | Zero results |
| 11 | Verify: wishlist persists across refresh (localStorage `'ajio-wishlist'`) | Confirmed |
| 12 | Verify: cart persists across refresh (localStorage `'ajio-cart'`) | Confirmed |
| 13 | Verify: wishlist and cart are independent (remove from wishlist doesn't affect cart) | Confirmed |
| 14 | Verify: discount percent computed correctly for 5 products | Manual check |
| 15 | Lighthouse | ≥90/90 |

**Gate checklist:**
- [ ] 5-column grid on desktop
- [ ] Discount badges on discounted products; none on non-discounted
- [ ] Brand name first, uppercase, weight 700
- [ ] Wishlist heart fills/unfills; persists on refresh
- [ ] Quick-add opens size picker; selecting size adds to cart
- [ ] Cart badge and wishlist badge in TopNav update live
- [ ] PDP price block correct (selling + MRP + %)
- [ ] Discount filter working (`getDiscountPercent >= N`)
- [ ] Brand filter working
- [ ] `border-radius: 4px` on all buttons and image wrappers
- [ ] PromoBanner orange
- [ ] INR formatting throughout
- [ ] No countdown timers
- [ ] `tsc --noEmit` clean
- [ ] Lighthouse ≥90/90

---

### Cut Order

**Never cut:**
- Dual Zustand stores (cart + wishlist — independent, separate localStorage keys)
- ProductCard with wishlist heart + discount badge logic
- PDP with Add to Bag + orange checkout button

**Cut first if time-constrained:**
- Wishlist page `/wishlist` (keep heart icon toggle; defer full page)
- Mobile filter bottom sheet
- Brand logo strip on homepage

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Wishlist and cart sharing same Zustand key → removing from wishlist removes from cart | High | High | Cart key: `'ajio-cart'`; wishlist key: `'ajio-wishlist'` — must differ; test independence manually |
| Non-discounted products showing MRP row and discount badge | High | High | Badge and MRP row render ONLY when `price < mrp`; verify on products where `price === mrp` |
| `getDiscountPercent` returning decimal instead of integer | Medium | High | Must return `40` not `40.32`; use `Math.round()` — verify `getDiscountPercent(2499, 1499)` → `40` |
| 5-column grid not applied on desktop (using 4-col from other builds) | Medium | Medium | PLP must use `grid-template-columns: repeat(5, 1fr)` at desktop — confirmed in DevTools |
| Brand name shown BELOW product name in card | Medium | Medium | Brand-first layout: brand (uppercase, 700) above product name — verify in browser |
| Countdown timer added to homepage deal section | Low | High | Explicitly forbidden; no timers anywhere; grep for `setInterval` / `countdown` in components |
