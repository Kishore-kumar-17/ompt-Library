# 06 — Tasks
## Curated Artisan Marketplace · mulecom_platform_02

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict and Indian-market payment library.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js razorpay framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. Razorpay SDK importable.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens**
  Craft marketplace brand token system.

  Acceptance: `--color-brand`, `--color-surface`, `--color-muted`, `--color-border`, `--color-text`, `--color-success-bg`, `--color-success-text` all defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` block present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  All domain types in one file.

  Acceptance: `ListingCard`, `ListingVariant`, `SellerTrustCard`, `ShopGroup`, `CartItem`, `QuoteSnapshot`, `HelpReason`, `CaseStatus`, `FulfillmentStatus`, `PincodeResult` all exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 4h
  **Database schema + RLS migrations**
  Multi-role schema with buyer/seller/support boundaries.

  Acceptance: Tables: `profiles`, `shops`, `listings`, `listing_variants`, `cart_items`, `quote_snapshots`, `orders`, `order_items`, `help_requests`, `case_events`, `payout_ledger`, `processed_webhook_events`. RLS: sellers SELECT/UPDATE own shop only. `quote_snapshots` has `UNIQUE` on `cart_hash`. `orders` has `UNIQUE` on `razorpay_order_id`. COD orders use `payment_method = 'cod'` column.
  Files: `supabase/migrations/001_initial_schema.sql`, `supabase/migrations/002_rls_policies.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase client utilities + auth + COD flag**
  Role-aware route protection; COD as first-class payment option.

  Acceptance: `/seller/*` requires `profiles.role = 'seller'`. `/admin/*` requires `profiles.role = 'admin'`. `NEXT_PUBLIC_COD_ENABLED=true` env var gates COD payment option display. Razorpay key IDs documented in `.env.example`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand cart store with shop grouping**
  Cart with derived `shopGroups()` getter.

  Acceptance: `cartStore.shopGroups(): ShopGroup[]` is a derived getter — not stored state. Cart persisted to `localStorage` under `"am-cart"`. Adding same variant increments quantity; no duplicates.
  Files: `src/store/cart.ts`

---

## Phase 1 — Discovery

---

- [ ] **TASK-007** | Est: 4h
  **Homepage — search + craft taxonomy nav**
  Search-first homepage with craft category gateways.

  Acceptance: Search input prominent above fold. Craft taxonomy rails: horizontal-scroll rows of craft category cards. Category gateway grid below rails. `/search?q={query}&{facets}` server-readable on load. Facets: category, craft, size, color, price range, ready-to-ship toggle, return eligibility toggle.
  Files: `src/app/page.tsx`, `src/components/discovery/CraftRails.tsx`, `src/components/search/FacetBar.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Listing cards with trust hints**
  Card list structure with artisan signals.

  Acceptance: Cards use `<ul>` grid; each card is `<li>`. Card: image (`aspect-ratio: 1/1`), title `<h3>`, price in ₹, artisan/shop name, `{rating}★`, "Free shipping" badge, "Ready to ship" badge from `listing.ready_to_ship`. Badges: `--color-success-bg`/`--color-success-text` — no hex.
  Files: `src/components/listing/ListingCard.tsx`

---

## Phase 2 — Listing Detail

---

- [ ] **TASK-009** | Est: 3h
  **Listing detail — seller trust card + pincode delivery check**
  Listing page with seller block and delivery validation above fold.

  Acceptance: Seller trust card and policy summary above fold at 768px. Pincode input + "Check delivery" button calls `/api/pincode?pin={code}` → `{ deliverable: boolean; estimatedDays: number }`. Return eligibility: "Returns accepted within {window} days" or "No returns accepted". `grep -r "display:none" src/components/listing/SellerTrustCard` → zero results.
  Files: `src/app/listing/[slug]/page.tsx`, `src/components/listing/SellerTrustCard.tsx`, `src/components/listing/PincodeChecker.tsx`, `src/app/api/pincode/route.ts`

---

- [ ] **TASK-010** | Est: 3h
  **Variant selector with OOS handling**
  Attribute-based variant picker; server-side inventory guard.

  Acceptance: OOS variants: `disabled` + `opacity: 0.4; cursor: not-allowed; text-decoration: line-through`. No variant selected + add attempt → inline error. Server rejects OOS variant ID at add-to-cart regardless of client payload.
  Files: `src/components/listing/VariantSelector.tsx`, `src/app/api/cart/add/route.ts`

---

## Phase 3 — Cart and Checkout

---

- [ ] **TASK-011** | Est: 3h
  **Cart page grouped by shop**
  Shop-grouped cart with per-shop subtotals.

  Acceptance: Each group: shop name `<h3>`, items, per-shop subtotal. "Order Total" below all groups. Shop name links to `/shop/{shopSlug}`.
  Files: `src/app/cart/page.tsx`, `src/components/cart/ShopGroup.tsx`

---

- [ ] **TASK-012** | Est: 4h
  **Server-authoritative quote + prepaid Razorpay checkout**
  Quote validation then Razorpay order creation.

  Acceptance: `POST /api/quote` re-reads prices from DB; creates `quote_snapshots` row. `total_cents` drives Razorpay order amount — never client body. Price drift → 409 `{ error: 'PRICE_CHANGED' }`. `POST /api/checkout/order` creates Razorpay order; returns `{ razorpayOrderId, amount, currency: 'INR' }`. `quote_snapshot.used_at` set after webhook.
  Files: `src/app/api/quote/route.ts`, `src/app/api/checkout/order/route.ts`

---

- [ ] **TASK-013** | Est: 3h
  **COD checkout path**
  Cash on delivery order creation with status transitions.

  Acceptance: `POST /api/checkout/cod` creates `orders` row with `payment_method = 'cod'`, `status = 'cod_pending'` directly — no Razorpay call. Confirmation page shows order ID and expected delivery window. Status transitions: `cod_pending → processing → dispatched → delivered`. `cod_pending → cancelled` allowed within 1 hour.
  Files: `src/app/api/checkout/cod/route.ts`, `src/components/checkout/PaymentOptions.tsx`

---

- [ ] **TASK-014** | Est: 4h
  **Razorpay webhook + return/exchange APIs**
  Idempotent payment handler and return flow.

  Acceptance: Razorpay signature verified — unverified → 400. Idempotency via `processed_webhook_events`. `ON CONFLICT (razorpay_order_id) DO NOTHING`. `POST /api/orders/[id]/return` creates return request; validates within return window. Exchange creates new `orders` row linked to original.
  Files: `src/app/api/webhooks/razorpay/route.ts`, `src/app/api/orders/[id]/return/route.ts`

---

## Phase 4 — Support and Seller Ops

---

- [ ] **TASK-015** | Est: 3h
  **Help request + case timeline**
  Support ticket from order with case state machine.

  Acceptance: `POST /api/cases` creates `help_requests` row. State machine: `open → under_review → awaiting_response → resolved | escalated`; invalid transition → 422. Timeline as `<ol>` with timestamps and actor roles.
  Files: `src/app/account/orders/[id]/page.tsx`, `src/app/api/cases/route.ts`, `src/components/account/CaseTimeline.tsx`

---

- [ ] **TASK-016** | Est: 3h
  **Seller dashboard — listings, order queue, payout summary**
  Listing management, dispatch flow, earnings breakdown.

  Acceptance: Listing table with status/inventory/edit. Status auto-`'sold_out'` at `inventory_count = 0`. Order queue: Mark Dispatched requires carrier + tracking. Payout summary: gross, fees, net per settlement period. `calculateNetPayout()` in `src/lib/utils.ts`.
  Files: `src/app/seller/listings/page.tsx`, `src/app/seller/orders/page.tsx`, `src/app/seller/earnings/page.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-017** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"
  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"
  echo "=== Quote total never from client ===" && \
    grep -r "body\.total\|body\.amount" src/app/api/checkout --include="*.ts" \
    && echo "FAIL" || echo "PASS"
  echo "=== COD status is cod_pending ===" && \
    grep -r "cod_pending" src/app/api/checkout/cod/route.ts && echo "PASS" || echo "FAIL"
  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
