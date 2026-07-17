# 06 — Tasks
## Indian Craft Marketplace · mulecom_platform_03

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict and Razorpay.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js razorpay framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens**
  CSS custom property system; no hex in component CSS.

  Acceptance: Brand, surface, muted, border, text, success-bg, success-text tokens defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `ListingCard`, `ListingVariant`, `SellerTrustCard`, `ShopGroup`, `CartItem`, `QuoteSnapshot`, `HelpReason`, `CaseStatus`, `FulfillmentStatus`, `PincodeResult` exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 4h
  **Database schema + RLS migrations**
  Tables: `profiles`, `shops`, `listings`, `listing_variants`, `cart_items`, `quote_snapshots`, `orders`, `order_items`, `help_requests`, `case_events`, `payout_ledger`, `processed_webhook_events`. RLS: sellers own-shop access only. `UNIQUE` on `orders.razorpay_order_id`.
  Files: `supabase/migrations/001_initial_schema.sql`, `supabase/migrations/002_rls_policies.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + COD flag**
  Role-aware middleware. `NEXT_PUBLIC_COD_ENABLED` env var.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand cart store**
  `cartStore.shopGroups(): ShopGroup[]` derived getter. Persisted to `"ic-cart"` localStorage.
  Files: `src/store/cart.ts`

---

## Phase 1 — Discovery

---

- [ ] **TASK-007** | Est: 4h
  **Homepage — search + craft taxonomy rails + curated collections**
  Search-first homepage with craft category gateways and curated collection modules.

  Acceptance: Search input above fold. Craft taxonomy rails (horizontal scroll). Curated collection grid sections. `/search?q={query}&{facets}` server-readable. Facets: category, craft, size, color, price, ready-to-ship, return eligibility. Active facets shown as dismissible chips.
  Files: `src/app/page.tsx`, `src/components/discovery/CraftRails.tsx`, `src/components/search/FacetBar.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Listing cards with artisan trust hints**
  `<ul>` grid with `<li>` cards. Image (`aspect-ratio: 1/1`), title `<h3>`, price ₹, artisan name, `{rating}★`, "Free shipping" badge, "Ready to ship" badge. Badges use CSS tokens — no hex.
  Files: `src/components/listing/ListingCard.tsx`

---

## Phase 2 — Listing Detail

---

- [ ] **TASK-009** | Est: 3h
  **Listing detail — seller trust card + pincode check + return policy**
  Seller trust card and policy block above fold at 768px. Pincode check: `/api/pincode?pin={code}` → `{ deliverable: boolean; estimatedDays: number }`. `grep -r "display:none" src/components/listing/SellerTrustCard` → zero results.
  Files: `src/app/listing/[slug]/page.tsx`, `src/components/listing/SellerTrustCard.tsx`, `src/components/listing/PincodeChecker.tsx`, `src/app/api/pincode/route.ts`

---

- [ ] **TASK-010** | Est: 3h
  **Variant selector + OOS handling**
  OOS variants: `disabled` + `opacity: 0.4; cursor: not-allowed; text-decoration: line-through`. Server rejects OOS variant ID at add-to-cart.
  Files: `src/components/listing/VariantSelector.tsx`, `src/app/api/cart/add/route.ts`

---

## Phase 3 — Cart and Checkout

---

- [ ] **TASK-011** | Est: 3h
  **Cart page grouped by shop**
  Per-shop subtotals + combined order total. Shop names link to `/shop/{slug}`.
  Files: `src/app/cart/page.tsx`, `src/components/cart/ShopGroup.tsx`

---

- [ ] **TASK-012** | Est: 4h
  **Server-authoritative quote + Razorpay prepaid + COD**
  `POST /api/quote` re-reads prices from DB; stores `quote_snapshots` row. Razorpay order amount from `total_cents` — never client body. Price drift → 409. COD: `POST /api/checkout/cod` creates `orders` row with `status = 'cod_pending'` directly.

  Acceptance: `POST /api/checkout/order` returns `{ razorpayOrderId, amount, currency: 'INR' }`. `quote_snapshot.used_at` set after webhook. COD `status = 'cod_pending'` confirmed in DB.
  Files: `src/app/api/quote/route.ts`, `src/app/api/checkout/order/route.ts`, `src/app/api/checkout/cod/route.ts`

---

- [ ] **TASK-013** | Est: 4h
  **Razorpay webhook + return/exchange APIs**
  Signature verified; idempotency via `processed_webhook_events`; `ON CONFLICT DO NOTHING`. Return request creates row; validates within return window.
  Files: `src/app/api/webhooks/razorpay/route.ts`, `src/app/api/orders/[id]/return/route.ts`

---

## Phase 4 — Support, Seller Ops, and QA

---

- [ ] **TASK-014** | Est: 3h
  **Help request + case timeline**
  State machine: `open → under_review → awaiting_response → resolved | escalated`; invalid transition → 422. Timeline as `<ol>`.
  Files: `src/app/account/orders/[id]/page.tsx`, `src/app/api/cases/route.ts`, `src/components/account/CaseTimeline.tsx`

---

- [ ] **TASK-015** | Est: 3h
  **Seller dashboard — listings, orders, payout summary**
  Listing table with status/inventory/edit. "Mark Dispatched" requires tracking. `calculateNetPayout()` for earnings breakdown.
  Files: `src/app/seller/listings/page.tsx`, `src/app/seller/orders/page.tsx`, `src/app/seller/earnings/page.tsx`

---

- [ ] **TASK-016** | Est: 2h
  **Integration tests + QA grep suite**

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

  Files: No code changes — read-only QA pass

---
