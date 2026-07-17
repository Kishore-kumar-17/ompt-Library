# 06 — Tasks
## Multi-Vendor Marketplace Platform · mulecom_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict and all marketplace dependencies.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. `tsc --noEmit` exits 0 on empty scaffold.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens**
  CSS custom property system for the marketplace brand.

  Acceptance: `--color-brand`, `--color-success-bg`, `--color-success-text`, `--color-surface`, `--color-muted`, `--color-border`, `--color-text`, `--color-text-secondary` all defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` block present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  All domain types in one file.

  Acceptance: `ListingCard`, `ListingVariant`, `SellerTrustCard`, `ShopGroup`, `CartItem`, `QuoteSnapshot`, `QuoteLine`, `HelpReason`, `CaseStatus`, `CaseEvent`, `ListingStatus`, `FulfillmentStatus`, `LedgerEvent` all exported. `SearchParams` exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 4h
  **Database schema + RLS migrations**
  Multi-role schema with buyer/seller/admin access boundaries.

  Acceptance: Tables: `profiles`, `shops`, `listings`, `listing_variants`, `cart_items`, `quote_snapshots`, `orders`, `order_items`, `help_requests`, `case_events`, `payout_ledger`, `processed_webhook_events`. RLS: sellers can only SELECT/UPDATE their own shop's listings and orders. Buyers can only read their own `help_requests`. `quote_snapshots.cart_hash` has `UNIQUE` index. `orders` has `UNIQUE` on `stripe_checkout_session_id`. `case_events` has `status_from` and `status_to` columns.
  Files: `supabase/migrations/001_initial_schema.sql`, `supabase/migrations/002_rls_policies.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase client utilities + auth middleware**
  Role-aware route protection.

  Acceptance: `/seller/*` redirects to `/auth/login` if not authenticated or if `profiles.role != 'seller'`. `/admin/*` requires `profiles.role = 'admin'`. Public routes: `/`, `/search`, `/listing/*`, `/shop/*`, `/cart`, `/checkout`. Middleware uses `createServerClient` from `@supabase/ssr`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand cart store with shop grouping**
  Cart store with `shopGroups()` derived getter.

  Acceptance: `cartStore.items: CartItem[]`. `cartStore.shopGroups(): ShopGroup[]` is a derived getter (not stored state) that groups items by `shop_id` with per-shop subtotals. Cart persisted to `localStorage` under `"mk-cart"`. Adding same variant twice increments quantity — no duplicate entries.
  Files: `src/store/cart.ts`

---

## Phase 1 — Discovery

---

- [ ] **TASK-007** | STORY-1.1 | Est: 4h
  **Homepage + keyword search with facets**
  Search-first homepage feeding into faceted PLP.

  Acceptance: Homepage: search input prominently placed, featured categories grid. `/search?q={query}&{facets}` readable by server component on load. Facets: price range, shipping speed (`standard | express`), condition (`new | vintage | custom`), rating, location. Facet change updates URL via `router.replace`. Active facets shown as dismissible chips. Zero-result state: "No results for '{query}'" — no recommendations.
  Files: `src/app/page.tsx`, `src/app/search/page.tsx`, `src/components/search/FacetBar.tsx`, `src/components/search/ActiveFacetChips.tsx`

---

- [ ] **TASK-008** | STORY-1.2 | Est: 3h
  **Listing cards with seller trust hints**
  Card component with semantic list structure and trust signals.

  Acceptance: Cards use `<ul>` grid; each card is `<li>`. Card contains: image (`aspect-ratio: 1/1`), title `<h3>`, price, seller username, seller `{rating}★`, "Free shipping" badge when applicable. "Free shipping" badge: `background: var(--color-success-bg); color: var(--color-success-text)` — no hex. Card `<a>` wraps entire area with `aria-label="{title} by {seller}, ${price}"`.
  Files: `src/components/listing/ListingCard.tsx`

---

## Phase 2 — Listing Detail

---

- [ ] **TASK-009** | STORY-2.1 | Est: 3h
  **Listing detail page — seller trust card and policies**
  Listing page with seller trust block visible above fold.

  Acceptance: Seller trust card and policy summary both above fold at 768px. Trust card: avatar (40px, `border-radius: 50%`), display name, total sales, avg rating, response time, shop link. Policy block: dispatch window, return eligibility tag, "View full shop policies" link. `listing.returns_accepted` renders "Returns accepted within {window} days" or "No returns accepted". `grep -r "display:none\|display: none" src/components/listing/SellerTrustCard` → zero results.
  Files: `src/app/listing/[slug]/page.tsx`, `src/components/listing/SellerTrustCard.tsx`, `src/components/listing/PolicyBlock.tsx`

---

- [ ] **TASK-010** | STORY-2.2 | Est: 3h
  **Variant selector with OOS handling**
  Attribute-based variant picker with server-side inventory guard.

  Acceptance: Variants as `<button>` elements per attribute group. OOS variant: `disabled` attribute + `opacity: 0.4; cursor: not-allowed; text-decoration: line-through`. No variant selected + "Add to Cart" click → inline error "Please select a {attribute}". "Add to Cart" disabled + label "Sold Out" when `inventory_count = 0`. Server-side add-to-cart rejects OOS variant even if client sends the ID.
  Files: `src/components/listing/VariantSelector.tsx`, `src/app/api/cart/add/route.ts`

---

## Phase 3 — Cart and Checkout

---

- [ ] **TASK-011** | STORY-3.1 | Est: 3h
  **Cart page grouped by shop**
  Cart view with per-shop subtotals and combined order total.

  Acceptance: `cartStore.shopGroups()` drives the grouping. Each group: shop name `<h3>`, items, per-shop subtotal (items + shipping estimate). "Order Total" rendered below all groups. Shop name links to `/shop/{shopSlug}`.
  Files: `src/app/cart/page.tsx`, `src/components/cart/ShopGroup.tsx`, `src/components/cart/CartLineItem.tsx`

---

- [ ] **TASK-012** | STORY-3.2 | Est: 4h
  **Server-authoritative checkout quote**
  `POST /api/quote` re-reads prices from DB and stores snapshot.

  Acceptance: `POST /api/quote` re-reads `listings.price_cents` and shipping rules from DB. `quote_snapshots` row created: `{ id, cart_hash, line_items jsonb, total_cents, created_at, used_at: null }`. Stripe session `amount` from `quote_snapshot.total_cents` — never from client body. Price drift → 409 `{ error: 'PRICE_CHANGED', diff: [...] }` with cart update prompt. `quote_snapshot.used_at` set after webhook; second use → 410.
  Files: `src/app/api/quote/route.ts`, `src/lib/calculateQuote.ts`

---

- [ ] **TASK-013** | Est: 3h
  **Checkout flow — address, summary, payment**
  Full checkout page with Stripe Checkout or Payment Element.

  Acceptance: Order summary shows per-shop breakdown + combined total matching last quote. Address form validated with Zod. `POST /api/checkout/session` creates Stripe session from `quote_snapshot.total_cents`. On success: redirect to `/checkout/success?session_id=...`. Cart cleared on success.
  Files: `src/app/checkout/page.tsx`, `src/app/api/checkout/session/route.ts`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/OrderSummaryPanel.tsx`

---

- [ ] **TASK-014** | Est: 4h
  **Idempotent Stripe webhook + order creation**
  Process `checkout.session.completed` and handle multi-shop order fan-out.

  Acceptance: Signature verified — unsigned → 400. Idempotency: `processed_webhook_events` checked; duplicate → 200 no-op. Order insert: `ON CONFLICT (stripe_checkout_session_id) DO NOTHING`. Per-shop `order_items` created; `payout_ledger` `'sale'` event inserted for each item. `quote_snapshot.used_at` marked. Responds within 3 seconds.
  Files: `src/app/api/webhooks/stripe/route.ts`

---

## Phase 4 — Help Requests and Cases

---

- [ ] **TASK-015** | STORY-4.1 | Est: 3h
  **Open help request from order detail**
  Support flow accessible from `/account/orders/[id]`.

  Acceptance: "Get help with this order" visible only when `orders.status != 'cancelled'`. Form: reason `<select>` (`HelpReason` options) + description textarea (max 500 chars). `POST /api/cases` creates `help_requests` row with `status: 'open'`. Redirect to `/account/cases/{id}` + toast "Help request opened — we'll review within 2 business days". RLS: readable only by `buyer_id` and `admin` role.
  Files: `src/app/account/orders/[id]/page.tsx`, `src/app/api/cases/route.ts`, `src/components/account/HelpRequestForm.tsx`

---

- [ ] **TASK-016** | STORY-4.2 | Est: 4h
  **Case timeline and status state machine**
  Case lifecycle engine with audit trail.

  Acceptance: State machine: `open → under_review → awaiting_response → resolved | escalated` — no other transitions. Invalid transition → 422 `{ error: 'INVALID_TRANSITION' }`. `case_events` records every transition: `{ case_id, actor_role, status_from, status_to, note, created_at }`. Timeline rendered as `<ol>` with timestamp, actor role, status label, note. Auto-close after 14 days: `actor_role = 'system'` event.
  Files: `src/app/account/cases/[id]/page.tsx`, `src/app/api/cases/[id]/transition/route.ts`, `src/components/account/CaseTimeline.tsx`

---

## Phase 5 — Seller Operations

---

- [ ] **TASK-017** | STORY-5.1 | Est: 4h
  **Seller dashboard — listings and order queue**
  Paginated tables for listing and order management.

  Acceptance: `/seller/listings`: `<table>` with title, status badge, inventory count, price, edit/archive actions. Status auto-set to `'sold_out'` when `inventory_count = 0`. `/seller/orders`: columns — order ID, buyer (masked first name + last initial), items, total, date, fulfillment status, "Mark Dispatched" CTA. "Mark Dispatched": requires carrier + tracking number; buyer receives automated email. RLS blocks sellers from reading other shops' data.
  Files: `src/app/seller/listings/page.tsx`, `src/app/seller/orders/page.tsx`, `src/components/seller/ListingsTable.tsx`, `src/components/seller/OrderQueue.tsx`

---

- [ ] **TASK-018** | STORY-5.2 | Est: 3h
  **Fee and payout summary**
  Earnings tab with `payout_ledger` breakdown.

  Acceptance: Earnings tab: payout events grouped by settlement period; gross, fees, net per period. Per order-item breakdown: 4 rows — gross, platform fee, processing fee, net payout. `calculateNetPayout(grossCents, platformFeePct, processingFeeCents)` in `src/lib/utils.ts`. Pending payouts show estimated date; paid payouts show Stripe transfer ID. `event_type` values: `'sale' | 'platform_fee' | 'payment_processing_fee' | 'refund_debit' | 'payout'`.
  Files: `src/app/seller/earnings/page.tsx`, `src/components/seller/EarningsTable.tsx`, `src/lib/utils.ts`

---

## Phase 6 — QA

---

- [ ] **TASK-019** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Quote total never from client ===" && \
    grep -r "body\.total\|body\.amount" src/app/api/checkout/session/route.ts \
    && echo "FAIL — use quote_snapshot" || echo "PASS"

  echo "=== SellerTrustCard never hidden via display:none ===" && \
    grep -r "display:none\|display: none" src/components/listing/SellerTrustCard.module.css \
    && echo "FAIL" || echo "PASS"

  echo "=== shopGroups() is derived not stored ===" && \
    grep -r "shopGroups.*useState\|setState.*shopGroups" src/store/cart.ts \
    && echo "FAIL — shopGroups must be a getter" || echo "PASS"

  echo "=== Case transitions reject invalid states ===" && \
    grep -r "INVALID_TRANSITION" src/app/api/cases --include="*.ts" && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
