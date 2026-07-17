# 06 — Tasks
## GlowProfile Beauty Discovery Subscription · sbecom_platform_03

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — pastel pink / coral**
  Playful premium beauty design system.

  Acceptance: `--color-brand` (coral/pink), `--color-surface`, `--color-muted`, `--color-border`, `--color-text`, `--color-loyalty` (Glow Points accent) defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `border-radius: 16px` for cards as token.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `BeautyProfile`, `QuizStep`, `VisualOption`, `CommitmentPlan`, `BoxContents`, `SampleRating`, `GlowPoints` exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Tables: `profiles`, `beauty_profiles` (encrypted), `plans`, `subscriptions`, `monthly_boxes`, `box_items`, `product_catalog`, `full_size_links`, `sample_ratings`, `glow_points_ledger`, `orders`, `processed_webhook_events`.

  Acceptance: `beauty_profiles` has note in migration: "Encrypt this column at rest before production." `monthly_boxes.box_items` references `product_catalog`. `glow_points_ledger` has `event_type: 'rating' | 'referral' | 'purchase'`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth middleware**
  `/account/*` requires auth. `/quiz` and `/plans` are public (no auth required to start).
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand quiz + checkout stores**
  `useQuizStore` with persistence middleware (quiz answers survive page refresh). `useCheckoutStore` for plan selection.

  Acceptance: `quizStore.answers: Record<string, string | string[]>` persisted to `sessionStorage`. `checkoutStore.selectedPlan: CommitmentPlan | null`.
  Files: `src/store/quiz.ts`, `src/store/checkout.ts`

---

## Phase 1 — Beauty Profile Quiz

---

- [ ] **TASK-007** | Est: 4h
  **Multi-step beauty profile quiz with Framer Motion**
  Visual option quiz collecting skin, hair, and style data.

  Acceptance: `QuizStep` component with Framer Motion `AnimatePresence` for step transitions ≤200ms. `VisualOption`: image + radio group logic; accessible via `aria-checked`. Steps: Skin Type (single-select), Concerns (multi-select), Hair Type (single-select), Style Preferences (multi-select). Back button preserves all answers. Progress indicator shows step X of 4.
  Files: `src/app/quiz/page.tsx`, `src/components/quiz/QuizStep.tsx`, `src/components/quiz/VisualOption.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Plan selector — tiered commitment cards**
  1-month, 3-month (Popular), 12-month (Best Value) plans.

  Acceptance: Cards rendered from `plans` table data — not hardcoded. "Most Popular" and "Best Value" badges for 3-month and 12-month. Per-box price decreases with commitment length. Account creation interstitial between quiz completion and payment (Step: Account → Payment).
  Files: `src/app/plans/page.tsx`, `src/components/plans/PlanCard.tsx`

---

## Phase 2 — Checkout and Subscription Start

---

- [ ] **TASK-009** | Est: 3h
  **Stripe subscription checkout**
  Subscription creation tied to quiz-derived beauty profile.

  Acceptance: `POST /api/checkout/subscription`: creates Stripe Subscription with plan price ID. `beauty_profiles` row created after payment succeeds — not before. Stripe Webhook `customer.subscription.created` triggers `subscriptions` row insert and welcome email via Resend. `processed_webhook_events` idempotency check.
  Files: `src/app/api/checkout/subscription/route.ts`, `src/app/api/webhooks/stripe/route.ts`

---

## Phase 3 — Digital Unboxing Experience

---

- [ ] **TASK-010** | Est: 4h
  **BoxReveal dashboard**
  Subscriber monthly box reveal with product cards.

  Acceptance: `/account/box` shows current month's box contents. `BoxContents` fetched from `monthly_boxes` + `box_items` for the subscriber. Each item card: product image, name, brand, "Rate this sample" CTA. Rating stars component: `POST /api/ratings` with `{ sampleId, rating: 1 | 2 | 3 | 4 | 5 }` — calls Supabase on click. Rating success: +10 Glow Points awarded (`glow_points_ledger` `'rating'` event).
  Files: `src/app/account/box/page.tsx`, `src/components/account/BoxReveal.tsx`, `src/components/account/RatingStars.tsx`, `src/app/api/ratings/route.ts`

---

- [ ] **TASK-011** | Est: 2h
  **TutorialModal with video player**
  How-to tutorial accessible from each sample in the box.

  Acceptance: "How to use" CTA on each sample card opens `TutorialModal`. Modal: `role="dialog"`, focus trapped, Esc closes. Video player: `<video>` element with `controls`; `preload="none"` for performance.
  Files: `src/components/account/TutorialModal.tsx`

---

## Phase 4 — Sample-to-Full-Size Shop + Glow Points

---

- [ ] **TASK-012** | Est: 3h
  **Sample-to-Full-Size shop**
  Integrated shop where sampled products link to full-size counterparts.

  Acceptance: `/shop` lists products from `product_catalog` where `has_full_size = true`. Each product card: "Buy Full Size" links to `full_size_links.purchase_url`. Glow Points discount: if `glowPoints >= 100`, show "Apply 10% Glow discount" toggle. Discount applied server-side via Stripe coupon — never client-calculated.
  Files: `src/app/shop/page.tsx`, `src/components/shop/ProductCard.tsx`

---

- [ ] **TASK-013** | Est: 2h
  **Glow Points ledger display**
  Points balance and history in account.

  Acceptance: `/account/points` shows total balance and event log. Events: rating (+10), referral (+50), purchase (+1 per ₹100 spent). Balance computed server-side from `SUM(amount) FROM glow_points_ledger WHERE user_id = $1`.
  Files: `src/app/account/points/page.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-014** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Beauty profile not created before payment ===" && \
    grep -r "beauty_profiles" src/app/api/checkout --include="*.ts" \
    && echo "REVIEW — should only be in webhook handler" || echo "PASS"

  echo "=== Glow discount applied server-side ===" && \
    grep -r "coupon\|discount" src/app/api --include="*.ts" && echo "PASS" || echo "FAIL — must be server-side"

  echo "=== Quiz AnimatePresence present ===" && \
    grep -r "AnimatePresence" src/components/quiz/QuizStep.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
