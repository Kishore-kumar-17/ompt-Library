# 06 — Tasks
## Functional Beverage D2C Platform · ecomm_platform_03

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Create Next.js 14 App Router project with TypeScript strict, Tailwind, and all dependencies.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react @radix-ui/react-accordion clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts, `npm run build` succeeds with zero errors.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens and globals.css**
  Configure all CSS custom properties and suppress hex values in component CSS.

  Acceptance: All color tokens defined as `--color-*` vars. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` class present. `@media (prefers-reduced-motion)` block present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  Define all domain types in a single source of truth.

  Acceptance: `FlavorCard`, `SKUVariant`, `NutritionProfile`, `FAQItem`, `PurchaseModel`, `Cadence`, `CartItem`, `CartQuote`, `QuoteLine`, `WebhookEvent`, `SubscriptionStatus`, `SubscriptionAction` all exported from `src/types/index.ts`. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema and RLS migrations**
  Execute full schema in Supabase SQL editor: `products`, `flavors`, `pack_sizes`, `sku_variants`, `nutrition_profiles`, `orders`, `order_items`, `subscriptions`, `processed_webhook_events`, `platform_settings`.

  Acceptance: All 10 tables visible in Supabase table editor. RLS enabled. `processed_webhook_events` has `UNIQUE` constraint on `stripe_event_id`. `orders` has `UNIQUE` constraint on `stripe_checkout_session_id`. `platform_settings` has row `{ key: 'subscribe_discount_pct', value: '15' }`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase client utilities**
  Create browser, server, and admin Supabase clients.

  Acceptance: `createBrowserClient()`, `createServerClient()`, and `createAdminClient()` importable from `@/lib/supabase/client`, `@/lib/supabase/server`, `@/lib/supabase/admin` respectively. No TypeScript errors.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Cart Zustand store**
  Implement cart with `productId:flavorId:packSizeId:purchaseType` composite key.

  Acceptance: Cart key format: `{productId}:{flavorId}:{packSizeId}:{purchaseType}`. Adding same key twice increments quantity instead of creating a duplicate entry. `cartStore.itemCount` is sum of all quantities. Cart persisted to `localStorage` under `"bfy-cart"`.
  Files: `src/store/cart.ts`

---

- [ ] **TASK-007** | Est: 2h
  **Seed product and flavor data**
  Insert realistic beverage data into Supabase.

  Acceptance: At least 4 products with 3 flavor variants each. Each flavor × 3 pack sizes = 9 `sku_variants` rows per product. At least 3 `sku_variants` per product with `inventory_count = 0`. `nutrition_profiles` row per product with `ingredients_text` populated.
  Files: `supabase/seeds/products.sql`

---

## Phase 1 — Catalog

---

- [ ] **TASK-008** | STORY-1.1 | Est: 3h
  **Navbar component**
  Sticky navigation with logo, cart icon, and account link.

  Acceptance: Cart badge shows `cartStore.itemCount` from Zustand and updates live. Mobile: hamburger opens overlay menu. `<nav aria-label="Main navigation">`. No dark nav — white background.
  Files: `src/components/layout/Navbar.tsx`, `src/app/layout.tsx`

---

- [ ] **TASK-009** | STORY-1.1 | Est: 4h
  **Homepage — flavor rail and hero**
  Hero section plus horizontal-scroll flavor discovery rail.

  Acceptance: Flavor rail: horizontal scroll on mobile (`overflow-x: auto; scroll-snap-type: x mandatory`), 4-column grid on desktop. Each `FlavorCard` shows product image (`aspect-ratio: 1/1`), flavor name, pack options, starting price, "Quick Add" button. "Quick Add" calls `cartStore.addItem(defaultVariant, 1)` — no modal. Default variant is smallest pack × `purchase_type = 'one_time'`.
  Files: `src/app/page.tsx`, `src/components/home/Hero.tsx`, `src/components/home/FlavorRail.tsx`, `src/components/product/FlavorCard.tsx`

---

- [ ] **TASK-010** | STORY-1.2 | Est: 4h
  **PLP with filter chips**
  `/collections/all` page with flavor, pack size, caffeine, and dietary tag filters.

  Acceptance: URL params `?flavor=&pack=&caffeine=yes|no&tag=` updated via `router.replace`. Filters survive page refresh (Server Component reads params). Dietary tag filter uses `.contains('dietary_tags', [tag])` — not equality. "Load more" button appends next 12 products. ARIA live region announces "Showing X products" on filter change.
  Files: `src/app/collections/all/page.tsx`, `src/components/product/FilterBar.tsx`, `src/components/product/ProductGrid.tsx`

---

- [ ] **TASK-011** | STORY-2.1 | Est: 4h
  **PDP — flavor and pack selector with SKU mapping**
  Product detail page with variant resolution and OOS handling.

  Acceptance: Flavor selector (image tiles) + pack size selector (radio buttons) derive `selectedVariantId` via `resolveVariant(flavorId, packId, variants)`. Selecting an unavailable combination disables add-to-cart; label shows "Out of stock"; option visually dimmed (`opacity: 0.4`). Price updates immediately on selection change without page navigation.
  Files: `src/app/products/[slug]/page.tsx`, `src/components/product/FlavorSelector.tsx`, `src/components/product/PackSelector.tsx`, `src/lib/resolveVariant.ts`

---

- [ ] **TASK-012** | STORY-2.2 | Est: 3h
  **PurchaseModelToggle — one-time vs subscribe**
  Embedded toggle on PDP showing subscription savings and cadence selector.

  Acceptance: Two options: "Buy once" and "Subscribe & Save {pct}%"; default "Buy once". `type PurchaseModel = 'one_time' | 'subscribe'`. When `subscribe` is active, cadence selector appears (`type Cadence = 2 | 4 | 8` weeks) — conditional JSX, not `display:none`. Price display updates: `subscribe` shows discounted price + "per delivery". Cart payload includes `{ variantId, qty, purchaseModel, cadenceWeeks }` — `cadenceWeeks: null` for one-time.
  Files: `src/components/product/PurchaseModelToggle.tsx`, `src/components/product/CadenceSelector.tsx`

---

- [ ] **TASK-013** | STORY-3.1 | Est: 2h
  **Ingredient panel — always above fold**
  Visible ingredient and dietary claim section on PDP, never inside an accordion.

  Acceptance: Ingredient panel visible above fold at 375px and 768px — `grep -r "Accordion.*IngredientPanel\|IngredientPanel.*Accordion" src/app/products --include="*.tsx"` → empty. Ingredients text from `nutrition_profiles.ingredients_text`. Claim badges from `products.dietary_tags` via `DIETARY_TAG_LABELS` const — no hardcoded claim strings in JSX.
  Files: `src/components/product/IngredientPanel.tsx`, `src/lib/dietaryTagLabels.ts`

---

- [ ] **TASK-014** | STORY-3.2 | Est: 2h
  **Nutrition facts and FAQ accordions**
  Below-fold accordions using Radix for standard nutrition label and FAQ.

  Acceptance: Nutrition Facts uses `<Accordion type="single">`. FAQ uses `<Accordion type="multiple">` (multi-open). FAQ items sourced from `products.faq_items` jsonb — max 8 items. `aria-expanded` state handled by Radix automatically. Above-fold content not displaced by accordion expand.
  Files: `src/components/product/NutritionAccordion.tsx`, `src/components/product/FAQAccordion.tsx`

---

## Phase 2 — Cart and Checkout

---

- [ ] **TASK-015** | Est: 3h
  **Cart drawer**
  Slide-in Framer Motion cart with line items, quantity controls, and subscription badge.

  Acceptance: Opens on cart icon click. Each line item shows product name, flavor, pack size, purchase model badge ("Subscribe" chip if `purchaseModel = 'subscribe'`). Quantity stepper works. Remove clears item. Shipping threshold progress bar: "Add ₹X more for free shipping" when `subtotal < FREE_SHIPPING_THRESHOLD_CENTS`. Focus trapped; `role="dialog"`; Escape closes.
  Files: `src/components/cart/CartDrawer.tsx`, `src/components/cart/CartLineItem.tsx`, `src/components/cart/ShippingProgress.tsx`

---

- [ ] **TASK-016** | STORY-4.1 | Est: 4h
  **Server-validated cart quote API**
  `POST /api/cart/quote` re-reads prices from DB and applies subscription discount.

  Acceptance: All `price_cents` values re-read from `sku_variants` — never trusts client price. Subscription discount rate from `platform_settings` row `subscribe_discount_pct` — not hardcoded. `FREE_SHIPPING_THRESHOLD_CENTS` from `process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CENTS`. Price drift → `409 { error: 'PRICE_CHANGED' }`. Returns `CartQuote = { lineItems, subtotalCents, shippingCents, discountCents, totalCents }`.
  Files: `src/app/api/cart/quote/route.ts`, `src/lib/calculateQuote.ts`

---

- [ ] **TASK-017** | STORY-4.1 | Est: 3h
  **Checkout session API**
  `POST /api/checkout/session` creates Stripe Checkout Session from validated quote.

  Acceptance: Amount derived from `POST /api/cart/quote` result — never from client body. Stripe session `metadata` includes serialised cart snapshot for webhook reconstruction. Subscription items use Stripe `price` IDs; one-time items use `price_data`. Returns `{ url }` for redirect. Invalid quote → 400.
  Files: `src/app/api/checkout/session/route.ts`, `src/lib/stripe.ts`

---

- [ ] **TASK-018** | STORY-4.1 | Est: 3h
  **Checkout page — address and summary**
  Shipping address form and order summary before Stripe redirect.

  Acceptance: Line items from Zustand render in summary. Subtotal and shipping from last valid quote response. All address fields validated. Logged-in user sees pre-filled email. "Pay now" calls `POST /api/checkout/session` and redirects to Stripe-hosted checkout.
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/OrderSummary.tsx`

---

- [ ] **TASK-019** | STORY-4.2 | Est: 4h
  **Idempotent Stripe webhook handler**
  `POST /api/webhooks/stripe` processes `checkout.session.completed` and `customer.subscription.*` events.

  Acceptance: Signature verified via `stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)` — unsigned → 400. Idempotency: check `processed_webhook_events` before processing; if `stripe_event_id` found → return 200 without reprocessing. Order insert: `ON CONFLICT (stripe_checkout_session_id) DO NOTHING`. Subscription insert: `ON CONFLICT (stripe_subscription_id) DO NOTHING`. Responds within 3 seconds.
  Files: `src/app/api/webhooks/stripe/route.ts`

---

- [ ] **TASK-020** | Est: 2h
  **Order confirmation page**
  Post-payment success page and Resend confirmation email.

  Acceptance: Redirect to `/checkout/success?session_id=...`. Cart cleared on arrival. Order items, totals, and address displayed. Confirmation email sent via Resend within 2 minutes of order creation. Email includes order number, items, and total.
  Files: `src/app/checkout/success/page.tsx`, `src/emails/OrderConfirmation.tsx`, `src/lib/resend.ts`

---

## Phase 3 — Subscriptions

---

- [ ] **TASK-021** | STORY-5.1 | Est: 3h
  **Account — subscription list page**
  `/account/subscriptions` listing active subscriptions with action buttons.

  Acceptance: Auth guard — redirect to `/auth/login?next=/account/subscriptions` if not logged in. Each row: product name, flavor, pack size, cadence badge, next delivery date, status chip, and three action buttons (Skip, Pause, Cancel). Status chip colours match `SubscriptionStatus` values.
  Files: `src/app/account/subscriptions/page.tsx`, `src/components/account/SubscriptionCard.tsx`

---

- [ ] **TASK-022** | STORY-5.1 | Est: 4h
  **Skip, pause, and cancel subscription actions**
  Three server-side subscription mutation endpoints.

  Acceptance: **Skip**: `POST /api/subscriptions/skip` — advances `next_delivery_date` by `cadenceWeeks * 7` days; Stripe subscription NOT paused. **Pause**: `POST /api/subscriptions/pause` — `stripe.subscriptions.update(id, { pause_collection: { behavior: 'void' } })`; local `status = 'paused'`. **Cancel**: `POST /api/subscriptions/cancel` — requires `{ confirmed: true }` in body (UI shows confirmation modal before call); calls `stripe.subscriptions.cancel(id)`. All three reflect updated state in UI immediately after server response (wait for response — no optimistic update).
  Files: `src/app/api/subscriptions/skip/route.ts`, `src/app/api/subscriptions/pause/route.ts`, `src/app/api/subscriptions/cancel/route.ts`

---

- [ ] **TASK-023** | STORY-5.2 | Est: 3h
  **Cadence change**
  Allow subscribers to change delivery frequency without cancellation.

  Acceptance: "Change frequency" opens cadence selector (2 / 4 / 8 weeks). `POST /api/subscriptions/cadence` calls `stripe.subscriptions.update` with new `price` from `CADENCE_PRICE_MAP: Record<Cadence, string>` sourced from env vars — not hardcoded. `subscriptions.cadence_weeks` updated in DB after Stripe succeeds. Note: "Your new frequency starts from your next billing date" shown — no proration.
  Files: `src/app/api/subscriptions/cadence/route.ts`, `src/components/account/CadenceModal.tsx`

---

## Phase 4 — Polish and Launch

---

- [ ] **TASK-024** | Est: 2h
  **Loading and error boundaries**
  Skeleton loaders and error recovery UI for all routes.

  Acceptance: `loading.tsx` for `/`, `/collections/all`, `/products/[slug]`, `/account/subscriptions` — skeletons match layout. `error.tsx` with recovery action. `not-found.tsx` present.
  Files: `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/collections/all/loading.tsx`, `src/app/products/[slug]/loading.tsx`, `src/app/account/subscriptions/loading.tsx`

---

- [ ] **TASK-025** | Est: 2h
  **SEO metadata and sitemap**

  Acceptance: `generateMetadata` on homepage, PLP, and PDP. PDP title: `{product name} · {flavor} | Brand`. OG image = product primary image. Sitemap at `/sitemap.xml`. `robots.txt` blocks `/account`, `/api`, `/checkout`.
  Files: `src/app/sitemap.ts`, `src/app/robots.ts`

---

- [ ] **TASK-026** | Est: 3h
  **Automated tests for critical paths**

  Acceptance: Unit tests: `resolveVariant` (available, OOS, null cases), `calculateQuote` (one-time and subscribe discount), `CADENCE_PRICE_MAP` mapping. Integration tests: cart quote API, webhook idempotency (duplicate event → 200, single order row). All tests pass with `npm test`.
  Files: `src/lib/__tests__/resolveVariant.test.ts`, `src/lib/__tests__/calculateQuote.test.ts`, `src/app/api/__tests__/webhook.test.ts`

---

- [ ] **TASK-027** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== IngredientPanel never inside Accordion ===" && \
    grep -r "Accordion.*IngredientPanel\|IngredientPanel.*Accordion" src/app/products --include="*.tsx" \
    && echo "FAIL" || echo "PASS"

  echo "=== Cart key includes purchaseType ===" && \
    grep -r "productId.*flavour\|productId.*flavor" src/store/cart.ts && echo "CHECK KEY FORMAT" || echo "PASS"

  echo "=== Checkout session never trusts client total ===" && \
    grep -r "req\.body.*total\|body\.total\|body\.amount" src/app/api/checkout/session/route.ts \
    && echo "FAIL — client total in checkout" || echo "PASS"

  echo "=== CADENCE_PRICE_MAP sourced from env ===" && \
    grep -r "CADENCE_PRICE_MAP" src/app/api/subscriptions/cadence/route.ts && echo "PASS" || echo "FAIL"

  echo "=== Cadence display:none absent ===" && \
    grep -r "display: none" src/components/product/CadenceSelector.module.css && echo "FAIL" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90 on mobile PDP.
  Files: No code changes — read-only QA pass

---
