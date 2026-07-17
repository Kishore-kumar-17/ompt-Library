# 04 — Build Plan
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

5-day plan. Each day ends with a demonstrable working state.

---

## Day 1 — Foundation + Cart Store

**Goal:** Project setup, CSS tokens, Montserrat font, cart store wired, PromoBanner + TopNav + CartDrawer working with yellow CTA.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | Install deps: `zustand framer-motion @radix-ui/react-accordion lucide-react` | Installed |
| 3 | `src/types/index.ts` — `PrintStyle`, `PRINT_LABELS`, `ColorOption`, `Product`, `CartItem` | `tsc --noEmit` clean |
| 4 | `src/app/globals.css` — 7 CSS tokens including `--shadow-card` + `--shadow-card-hover` + base reset | Body background pure white |
| 5 | `src/lib/utils.ts` — `formatINR`, `getDiscountPercent`, `getComboSavings`, `getComboProgress`, `COMBO_QTY`, `COMBO_PRICE`, `FREE_SHIPPING_THRESHOLD` | `getDiscountPercent(799, 549)` returns `31`; `getComboProgress` with 2 items returns `neededForNext: 1` |
| 6 | `src/store/cart.ts` — Zustand, `'bewakoof-cart'`, composite key, `comboSavings` getter, `shippingFee` getter | Compiles |
| 7 | `src/components/layout/PromoBanner.tsx` — yellow banner, black text, dismissible | Yellow banner with black text visible; dismiss works |
| 8 | `src/components/layout/TopNav.tsx` — sticky 60px, search center, cart badge | Nav renders; cart badge shows live count |
| 9 | `src/components/cart/CartDrawer.tsx` + `CartItem.tsx` — Framer Motion, ComboProgress in footer | Cart opens/closes; yellow checkout button with black text |
| 10 | Mount all in `src/app/layout.tsx`, Montserrat font | All present on every page |

**Gate:** Yellow banner visible. TopNav sticky. Cart opens → yellow checkout button with BLACK text visible. Cart badge live.

---

## Day 2 — Product Data + ProductCard

**Goal:** ProductCard fully working — print badge, discount badge, combo-eligible indicators, per-color image swap, box shadows.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/lib/products.ts` — 12 products: mix of categories, print styles, combo-eligible and non-eligible items; at least 2 with `price === mrp` (no discount); at least 2 licensed IP | All 12 load |
| 2 | `src/components/product/ProductCard.tsx` + CSS — image wrapper 16px radius, box shadow, print badge (top-left yellow), discount badge (top-right red), color dots, coins row | Card renders with shadow |
| 3 | Verify: hover = shadow deepens + card lifts 2px | Confirmed |
| 4 | Verify: print badge shows only when `printStyle !== 'solid'` | Confirmed |
| 5 | Verify: discount badge shows only when `price < mrp` | Confirmed |
| 6 | Verify: clicking color dot swaps image instantly (no transition) | Confirmed |
| 7 | Verify: product name is the primary label (no separate brand name — D2C single brand) | Confirmed |
| 8 | Verify: price row shows bold selling price + strikethrough MRP + red discount % (only when discounted) | Confirmed |
| 9 | `src/components/product/ComboProgress.tsx` — progress bar, plain-language combo status | Renders standalone on test page |
| 10 | Verify: `coinsEarned` shows on card below price row | Confirmed |

**Gate:** Browse 6 cards. Shadow lifts on hover. Print badge shows on graphic tees, not on solid tees. Discount badge shows correct %. Color swap works. Yellow badge, black text. No white text on yellow anywhere.

---

## Day 3 — PDP

**Goal:** Full product detail page — gallery, selectors, combo integration, coins, UGC strip.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/product/ImageGallery.tsx` — main image + thumbnail strip + arrow navigation | Arrows navigate; selecting thumbnail updates main image |
| 2 | Per-color gallery: selecting a color dot updates the gallery images (different ColorOption.images[]) | Color → image swap instant |
| 3 | `src/components/product/SizeSelector.tsx` — OOS strikethrough + yellow selected state (black text on yellow selection) | OOS sizes strikethrough; selected = yellow bg, black text |
| 4 | `src/app/products/[slug]/page.tsx` — `generateStaticParams`, `notFound()`, 50/50 layout | All product pages load |
| 5 | PDP right column: H1 name (22px/700) + `printDescription` muted text + price block (26px selling + MRP + red discount %) | Price block correct for discounted + non-discounted |
| 6 | Coins row: "Earn {N} Bewakoof Coins on this order" | Visible below price block |
| 7 | Color dots: selected has `outline: 2px solid var(--color-text)` | Color selection works |
| 8 | SizeSelector + "Add to Bag" (full-width, yellow, black text, 48px, 8px radius, disabled until size selected) | Cart opens with correct item |
| 9 | `ComboProgress` component on PDP when `product.comboEligible` | Shows combo status; updates when cart changes |
| 10 | Radix UI accordions: Product Details, Size & Fit, Delivery & Returns | All 3 expand/collapse |
| 11 | UGC "Community Looks" strip — 4 placeholder photos below accordions | Strip visible; labeled correctly |

**Gate:** PDP for discounted tee: price block shows selling + MRP + red %. PDP for non-discounted: only selling price. Coins shown. ComboProgress on eligible products. UGC strip visible. Add to Bag yellow + black text.

---

## Day 4 — PLP + Filters

**Goal:** Product listing with 4-column grid, discount filter, print style filter.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/product/ProductGrid.tsx` — 4-col desktop, 2-col tablet/mobile | Grid renders correctly |
| 2 | `src/components/product/FilterPanel.tsx` — category, print style, discount range, size | Panel renders |
| 3 | Discount filter: "50% off+" shows only products where `getDiscountPercent(mrp, price) >= 50` | Filter works |
| 4 | Print style filter: "Licensed" shows only licensed products | Filter works |
| 5 | Filter state in URL params | URL updates, back button restores |
| 6 | Active filter chips above grid | Chips visible, clicking removes filter |
| 7 | Mobile filter: bottom sheet Framer Motion slide-up | Works on mobile |
| 8 | `src/app/products/page.tsx` — reads searchParams, applies filters, shows product count | "Showing N products" above grid |

**Gate:** Apply "Licensed" + "30% off+" → shows only licensed products with ≥30% discount. URL shows params. Back button restores.

---

## Day 5 — Homepage + Audit

**Goal:** Homepage with deal sections and combo promotion. Full audit pass.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/app/page.tsx` — hero (bold headline, yellow CTA with black text), "Top Picks" deal row, "Trending Prints" row, categories strip | Homepage renders |
| 2 | `src/components/layout/Footer.tsx` | Footer renders |
| 3 | Combo deal callout section on homepage: "Buy 3 tees for ₹1,199" with `ComboProgress` CTA | Section visible |
| 4 | `tsc --noEmit` → fix any type errors | Zero errors |
| 5 | `npm run build` | Build succeeds |
| 6 | DevTools: every CTA button `border-radius: 8px` | Confirmed |
| 7 | DevTools: every product image wrapper `border-radius: 16px` | Confirmed |
| 8 | DevTools: print badge `border-radius: 4px` | Confirmed |
| 9 | DevTools: all yellow buttons have black text (`color: var(--color-text)`) | Confirmed |
| 10 | Grep: no hex in CSS Module files | Zero results |
| 11 | Verify: shadow on every product card | Confirmed |
| 12 | Verify: shadow deepens on hover | Confirmed |
| 13 | Verify: `getComboSavings` returns correct savings for 3 eligible items | Manual check |
| 14 | Verify: cart persists on refresh (localStorage `'bewakoof-cart'`) | Confirmed |
| 15 | Lighthouse | ≥90/90 |

**Gate checklist:**
- [ ] Yellow CTA with BLACK text everywhere
- [ ] Card box shadows on all product cards
- [ ] 16px radius on image wrappers, 8px on buttons
- [ ] 4-column grid on desktop
- [ ] Print badge only on non-solid products
- [ ] Discount badge only when price < mrp
- [ ] ComboProgress shows on PDP for eligible products
- [ ] Combo savings shown in cart footer when applicable
- [ ] Coins shown on PDP and cards
- [ ] UGC Community Looks on PDP
- [ ] Color dot swap changes image
- [ ] PromoBanner is yellow with black text
- [ ] No countdown timers
- [ ] No coins redemption UI
- [ ] `tsc --noEmit` clean
- [ ] Lighthouse ≥90/90

---

### Cut Order

**Never cut:**
- Yellow "Add to Bag" button with BLACK text (`color: var(--color-text)`)
- ComboProgress logic with `getComboSavings` + `getComboProgress` in CartDrawer
- ProductCard box shadow + hover lift effect

**Cut first if time-constrained:**
- Coins redemption UI (earn-only in this build; no redemption flow)
- UGC "Community Looks" strip on PDP
- Advanced combo deal callout on homepage

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Yellow button text set to white instead of black | High | High | Yellow `#FFE01B` on white = 1.31:1 — FAILS; ALL yellow buttons must use `color: var(--color-text)` (black); DevTools: `rgb(0,0,0)` or equivalent |
| Countdown timer added | High | High | Explicitly forbidden; `grep -r "setInterval\|countdown\|timer" src/components` → empty |
| Coins redemption UI built (earn-only build) | Medium | Medium | Only display `coinsEarned` — no wallet, no redeem button, no balance; grep for "redeem" in JSX |
| `border-radius: 16px` on buttons (should be 8px) | Medium | High | Image wrappers get `16px`; CTA buttons get `8px`; they are different — DevTools audit both |
| Print badge showing on `printStyle: 'solid'` products | Medium | Medium | Badge conditional: `{product.printStyle !== 'solid' && <PrintBadge />}` |
| `getComboProgress` not called in ComboProgress component | Low | Medium | Component must call utility function — not hardcode combo state; verify in code review |
