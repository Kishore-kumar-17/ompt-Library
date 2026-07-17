# 06 — Tasks
## ChaiRitual Beverage Subscription · sbecom_platform_02

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict and Indian market payment libraries.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js razorpay framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. Razorpay importable.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — Deep Green + Warm Paper**
  Earthy Indian home-cafe design system.

  Acceptance: `--color-brand` (Deep Green), `--color-surface` (Warm Paper), `--color-muted`, `--color-border`, `--color-text` all defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `CartReward`, `SubscribeToggleState`, `GiftNotePayload`, `CartItem`, `OrderStatus`, `SubscriptionStatus` exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Tables: `profiles`, `products`, `product_variants`, `cart_items`, `cart_rewards`, `orders`, `order_items`, `subscriptions`, `processed_webhook_events`, `platform_settings`. `platform_settings` seeded with `subscribe_discount_pct = 15`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + Razorpay/UPI setup**
  Browser, server, admin clients. Razorpay key IDs in `.env.example`. UPI mandate configuration for recurring subscriptions documented.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand cart + rewards store**
  Cart with Subscribe & Save toggle state and gift reward progress tracking.

  Acceptance: `cartStore.subscribeMode: boolean`. `cartStore.giftRewardUnlocked(threshold): boolean` — derived from subtotal. Cart persisted to `"cr-cart"` localStorage.
  Files: `src/store/cart.ts`

---

## Phase 1 — Homepage (Home Cafe Shell)

---

- [ ] **TASK-007** | Est: 3h
  **Navbar with "Download App" CTA**
  Sticky nav with brand logo, links, and mobile app download CTA.

  Acceptance: "Download App" button — `<a href>` with `target="_blank"`. `<nav aria-label="Main navigation">`. Mobile hamburger opens overlay. Cart badge shows `cartStore.itemCount`.
  Files: `src/components/layout/Navbar.tsx`, `src/app/layout.tsx`

---

- [ ] **TASK-008** | Est: 4h
  **Homepage — BestsellerCarousel + RitualBlock + CategoryGrid**
  Home cafe lifestyle homepage.

  Acceptance: `BestsellerCarousel`: horizontal scroll on mobile, 4-column on desktop; each card has "Quick Add" CTA that calls `cartStore.addItem(defaultVariant, 1)` — no modal. `RitualBlock`: image overlays with text links to category pages. `CategoryGrid`: Loose Leaf, Instant, Snacks as visual gateway cards.
  Files: `src/app/page.tsx`, `src/components/home/BestsellerCarousel.tsx`, `src/components/home/RitualBlock.tsx`, `src/components/home/CategoryGrid.tsx`

---

## Phase 2 — Product Pages

---

- [ ] **TASK-009** | Est: 4h
  **Product page — Subscribe & Save toggle + pricing state**
  PDP with subscription pricing model toggle.

  Acceptance: `<RadioGroup>` with "Buy Once (MRP)" and "Subscribe & Save (15% off)". `type PurchaseMode = 'one_time' | 'subscribe'`. Price display: subscribe mode shows discounted price + "per delivery"; one-time shows full MRP. Cadence selector appears only when subscribe is active — conditional JSX, not `display:none`. Subscription discount from `platform_settings.subscribe_discount_pct` — not hardcoded.
  Files: `src/app/products/[slug]/page.tsx`, `src/components/product/SubscribeToggle.tsx`, `src/components/product/CadenceSelector.tsx`

---

## Phase 3 — Cart and Checkout

---

- [ ] **TASK-010** | Est: 3h
  **Cart drawer — GiftProgressBar + GiftNoteInput**
  Cart with subscription badges, gift reward progress, and gift note.

  Acceptance: Each line item: product name, pack size, "Subscribe" badge if `purchaseMode = 'subscribe'`. `GiftProgressBar`: "Add ₹X more to unlock {gift}" — threshold sourced from `cart_rewards` table. `GiftNoteInput`: max 200 chars with char counter. Focus trapped; `role="dialog"`; Escape closes.
  Files: `src/components/cart/CartDrawer.tsx`, `src/components/cart/GiftProgressBar.tsx`, `src/components/cart/GiftNoteInput.tsx`

---

- [ ] **TASK-011** | Est: 4h
  **Razorpay checkout + UPI mandate for subscriptions**
  Server-validated checkout with UPI recurring mandate for subscriptions.

  Acceptance: `POST /api/quote` re-reads prices from DB; applies subscribe discount from `platform_settings`. One-time orders: Razorpay standard checkout. Subscription orders: Razorpay recurring mandate (`razorpay.subscriptions.create`). Amount never from client body. `orders` insert: `ON CONFLICT (razorpay_order_id) DO NOTHING`.
  Files: `src/app/api/quote/route.ts`, `src/app/api/checkout/order/route.ts`, `src/app/api/checkout/subscription/route.ts`, `src/app/api/webhooks/razorpay/route.ts`

---

## Phase 4 — Subscription Management

---

- [ ] **TASK-012** | Est: 3h
  **"My Rituals" dashboard — skip, pause, swap flavor**
  Account portal for subscription self-service.

  Acceptance: `/account/subscriptions` lists active subscriptions. **Skip next month**: sets `user_deliveries.is_skipped = true` for target date. **Pause**: `razorpay.subscriptions.pause(id)`. **Swap flavor**: updates `subscriptions.product_variant_id` for next cycle with confirmation modal. Actions reflect in UI after server response — no optimistic updates.
  Files: `src/app/account/subscriptions/page.tsx`, `src/app/api/subscriptions/skip/route.ts`, `src/app/api/subscriptions/pause/route.ts`, `src/app/api/subscriptions/swap/route.ts`

---

## Phase 5 — QA

---

- [ ] **TASK-013** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== CadenceSelector is conditional JSX (not display:none) ===" && \
    grep -r "display: none" src/components/product/CadenceSelector.module.css && echo "FAIL" || echo "PASS"

  echo "=== Subscribe discount not hardcoded ===" && \
    grep -r "0\.15\|15%" src/app/api/quote/route.ts \
    && echo "FAIL — read from platform_settings" || echo "PASS"

  echo "=== GiftProgressBar threshold from DB ===" && \
    grep -r "cart_rewards" src/components/cart/GiftProgressBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
