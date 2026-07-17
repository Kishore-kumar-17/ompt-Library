# 06 — Tasks
## BlueChef Culinary Subscription · sbecom_platform_04

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict. Playfair Display + Inter dual-font system.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. Both Playfair Display and Inter loaded via `next/font/google`.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — Deep Navy + Gold**
  Culinary editorial design system.

  Acceptance: `--color-navy` (Deep Navy), `--color-gold`, `--color-surface`, `--color-muted`, `--color-border`, `--color-text` defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `border-radius: 4px` on all interactive elements as token (sharp culinary aesthetic).
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `BoxStore`, `Recipe`, `Wine`, `WinePairing`, `SubscriptionTier`, `AddOnType`, `ChefProfile` exported. `AddOnType = 'wine_recurring' | 'market_one_time'`. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Tables: `profiles`, `recipes`, `wines`, `wine_pairings`, `subscriptions`, `subscription_add_ons`, `user_boxes`, `box_selections`, `market_products`, `orders`, `order_items`, `processed_webhook_events`.

  Acceptance: `wine_pairings` links `recipe_id` to `wine_id`. `subscription_add_ons` has `add_on_type: 'wine_recurring' | 'market_one_time'`. `user_boxes` has composite unique on `(subscription_id, week_start_date)`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + Stripe setup**
  `/account/*` and `/dashboard/*` require auth. Stripe product IDs for meal plan and wine cellar documented in `.env.example`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand box store — dual subscription tracking**
  `useBoxStore` manages selected meals and selected wine for the current week.

  Acceptance: `boxStore.selectedMealIds: string[]`. `boxStore.selectedWineId: string | null`. `boxStore.totalMeals: number` (from subscription plan). `boxStore.wineUnlocked: boolean` (from `subscription_add_ons`). No box state in `useState` — all in Zustand.
  Files: `src/store/box.ts`

---

## Phase 1 — Educational Onboarding

---

- [ ] **TASK-007** | Est: 4h
  **Chef profile quiz with Framer Motion step transitions**
  Multi-step culinary profiling.

  Acceptance: Steps: Cooking Style (Spicy vs Mild, etc.), Experience Level, Time Availability, Dietary Preferences. `AnimatePresence` on step changes. Answers drive plan recommendation: "Gourmet Explorer" (Signature Plan) or "Health First" (Wellness Plan). Quiz state in Zustand; survives refresh via `sessionStorage`.
  Files: `src/app/quiz/page.tsx`, `src/components/quiz/ChefProfileQuiz.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Plan selection — Signature vs Wellness + Wine Cellar add-on**
  Subscription tier cards with wine add-on upsell.

  Acceptance: Two plan cards from `plans` table. Wine Cellar add-on shown below plan selector: "Pair with our Sommelier-curated wines (+₹999/month)". Add-on is a separate Stripe subscription item — independent from the meal plan. Account creation interstitial between quiz and payment.
  Files: `src/app/plans/page.tsx`, `src/components/plans/PlanCard.tsx`, `src/components/plans/WineCellarAddOn.tsx`

---

## Phase 2 — Meal Selection Dashboard

---

- [ ] **TASK-009** | Est: 4h
  **Dashboard layout — fixed-right Active Box sidebar**
  Selection grid with persistent order summary sidebar.

  Acceptance: Desktop (≥1024px): `DashboardLayout` with `grid-template-columns: 1fr 320px`. Right sidebar: "Active Box" showing selected meals and wines, weekly total, "Confirm Box" CTA. Mobile: sidebar collapses to sticky footer. Sidebar drives from `boxStore` — no prop drilling. Weekly tabs for navigating past/future boxes.
  Files: `src/app/dashboard/page.tsx`, `src/components/dashboard/DashboardLayout.tsx`, `src/components/dashboard/ActiveBoxSidebar.tsx`

---

- [ ] **TASK-010** | Est: 3h
  **RecipeCard with WinePairingBadge**
  Editorial recipe grid with wine pairing signals.

  Acceptance: `RecipeCard`: `aspect-ratio: 4/3` image, recipe title (Playfair font), prep time, difficulty level, calorie count. `WinePairingBadge`: appears on cards where `recipe.wine_pairing_id` is set; "Pair with {wine.name}" with gold accent. Clicking badge opens wine details panel. "Selected" state: gold `box-shadow` ring.
  Files: `src/components/dashboard/RecipeCard.tsx`, `src/components/dashboard/WinePairingBadge.tsx`

---

- [ ] **TASK-011** | Est: 2h
  **RecipeSidePanel — ingredients, nutrition, wine notes**
  Detail panel for selected recipe.

  Acceptance: Slides in from right: `transform: translateX(100%) → 0`, `300ms ease-out`. Shows: *mise en place* ingredient list, nutrition table, chef tip, and wine pairing note if applicable. `role="complementary"`, closable via Esc or close button.
  Files: `src/components/dashboard/RecipeSidePanel.tsx`

---

## Phase 3 — Checkout and Subscriptions

---

- [ ] **TASK-012** | Est: 4h
  **Dual Stripe subscription checkout**
  Meal plan and optional wine cellar as separate Stripe subscription items.

  Acceptance: `POST /api/checkout/subscription`: creates Stripe Subscription with one required item (meal plan) and one optional item (wine cellar add-on). Wine cellar uses its own Stripe price ID from env vars — not hardcoded. Webhook `customer.subscription.created` creates `subscriptions` row and `subscription_add_ons` rows. Idempotency via `processed_webhook_events`.
  Files: `src/app/api/checkout/subscription/route.ts`, `src/app/api/webhooks/stripe/route.ts`

---

- [ ] **TASK-013** | Est: 3h
  **Seasonal Market — one-time kitchenware and celebration kits**
  Standalone product store for market items.

  Acceptance: `/market`: products from `market_products` table. `AddOnType = 'market_one_time'` — no recurring billing. Cart accepts mix of subscription-linked and one-time market items. Market checkout: Stripe Payment Intent (not subscription). Separate `order_items` rows with `is_market_item = true`.
  Files: `src/app/market/page.tsx`, `src/components/market/MarketCard.tsx`, `src/app/api/checkout/market/route.ts`

---

## Phase 4 — Interactive Recipe and QA

---

- [ ] **TASK-014** | Est: 3h
  **Interactive recipe guide (post-purchase)**
  Step-by-step video + instructions accessible after box confirmed.

  Acceptance: `/account/recipes/[id]`: full recipe with `<video controls preload="none">`, *mise en place* list, step-by-step chef instructions. Only accessible when recipe is in a confirmed `user_box` for the authenticated user. 404 (`notFound()`) if not purchased.
  Files: `src/app/account/recipes/[id]/page.tsx`

---

- [ ] **TASK-015** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Wine Cellar price ID not hardcoded ===" && \
    grep -r "price_.*wine\|wine.*price_" src/app/api/checkout --include="*.ts" | grep -v "process\.env" \
    && echo "FAIL — use env var" || echo "PASS"

  echo "=== ActiveBoxSidebar drives from boxStore (no prop drilling) ===" && \
    grep -r "props\." src/components/dashboard/ActiveBoxSidebar.tsx | grep -v "className\|aria" \
    && echo "REVIEW — check for prop drilling" || echo "PASS"

  echo "=== RecipeSidePanel uses transform not display:none ===" && \
    grep -r "display: none" src/components/dashboard/RecipeSidePanel.module.css && echo "FAIL" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
