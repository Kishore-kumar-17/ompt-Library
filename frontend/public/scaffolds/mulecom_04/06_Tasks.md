# 06 — Tasks
## Artisan Empowerment Marketplace · mulecom_platform_04

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
  Role-aware middleware. `NEXT_PUBLIC_COD_ENABLED` env var gates COD option.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand cart store**
  `cartStore.shopGroups(): ShopGroup[]` derived getter. Persisted to `"ae-cart"` localStorage.
  Files: `src/store/cart.ts`

---

## Phase 1 — Discovery

---

- [ ] **TASK-007** | Est: 4h
  **Homepage — search + taxonomy rails + curated collections**
  Search-first homepage. Craft taxonomy rails (horizontal scroll). Curated collection modules. `/search?q={query}&{facets}` server-readable. Facets: category, craft, size, color, price, ready-to-ship, return eligibility. Artisan story cards embedded in homepage sections — not just product listings.

  Acceptance: Artisan story cards visible on homepage. Active facets dismissible via chips.
  Files: `src/app/page.tsx`, `src/components/discovery/CraftRails.tsx`, `src/components/discovery/ArtisanStoryCard.tsx`, `src/components/search/FacetBar.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Listing cards with artisan trust signals**
  `<ul>` grid with `<li>` cards. Image, title `<h3>`, price ₹, artisan name, rating, "Free shipping", "Ready to ship" badges. CSS tokens only — no hex.
  Files: `src/components/listing/ListingCard.tsx`

---

## Phase 2 — Listing Detail

---

- [ ] **TASK-009** | Est: 3h
  **Listing detail — seller trust card + pincode check + return policy**
  Seller trust card and policy block above fold at 768px. Pincode input calls `/api/pincode?pin={code}` → `{ deliverable: boolean; estimatedDays: number }`. Artisan story section below the fold with provenance detail. `grep -r "display:none" src/components/listing/SellerTrustCard` → zero results.
  Files: `src/app/listing/[slug]/page.tsx`, `src/components/listing/SellerTrustCard.tsx`, `src/components/listing/PincodeChecker.tsx`, `src/app/api/pincode/route.ts`

---

- [ ] **TASK-010** | Est: 3h
  **Variant selector + OOS handling**
  OOS: `disabled` + `opacity: 0.4; cursor: not-allowed; text-decoration: line-through`. Server rejects OOS variant ID.
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
  `POST /api/quote` re-reads prices from DB; `total_cents` drives payment amount — never client body. COD: `orders` row with `status = 'cod_pending'` created directly.

  Acceptance: Price drift → 409 `{ error: 'PRICE_CHANGED' }`. Razorpay order returns `{ razorpayOrderId, amount, currency: 'INR' }`. `quote_snapshot.used_at` set after webhook.
  Files: `src/app/api/quote/route.ts`, `src/app/api/checkout/order/route.ts`, `src/app/api/checkout/cod/route.ts`

---

- [ ] **TASK-013** | Est: 4h
  **Razorpay webhook + return/exchange APIs**
  Signature verified; idempotency check; `ON CONFLICT DO NOTHING`. Return validates within window.
  Files: `src/app/api/webhooks/razorpay/route.ts`, `src/app/api/orders/[id]/return/route.ts`

---

## Phase 4 — Support, Seller Ops, and QA

---

- [ ] **TASK-014** | Est: 3h
  **Help request + case timeline**
  State machine with `open → under_review → awaiting_response → resolved | escalated`; invalid → 422. Timeline as `<ol>`.
  Files: `src/app/account/orders/[id]/page.tsx`, `src/app/api/cases/route.ts`, `src/components/account/CaseTimeline.tsx`

---

- [ ] **TASK-015** | Est: 3h
  **Seller dashboard — listings, orders, payout summary**
  Listing table with status/inventory/edit. "Mark Dispatched" requires tracking number. `calculateNetPayout()` for earnings.
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
