# 06 — Tasks
## FreshZest Meal-Kit Subscription · sbecom_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Create Next.js 14 App Router project with TypeScript strict and all dependencies.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts, `npm run build` succeeds. `tsconfig.json` has `"strict": true`.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens**
  Salem green design system with CSS custom properties only.

  Acceptance: `--color-brand` (Salem green), `--color-surface`, `--color-muted`, `--color-border`, `--color-text` all defined in `globals.css`. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` class present. `@media (prefers-reduced-motion: reduce)` block present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  All domain types in one file.

  Acceptance: `PlanStore`, `OnboardingStore`, `OrderSummary`, `BoxStore`, `Recipe`, `RecipeFilter`, `DietaryPreference`, `SubscriptionStatus`, `DeliveryAddress` all exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema and RLS migrations**
  Full schema in Supabase: `profiles`, `recipes`, `subscriptions`, `user_boxes`, `box_recipes`, `pricing_matrix`, `orders`.

  Acceptance: All tables visible in Supabase table editor. RLS enabled. `pricing_matrix` seeded with `(people, meals_per_week, price_cents)` rows. `user_boxes` has composite unique index on `(subscription_id, delivery_date)`.
  Files: `supabase/migrations/001_initial_schema.sql`, `supabase/seeds/pricing_matrix.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase client utilities + auth middleware**
  Browser, server, and admin clients; protected route middleware.

  Acceptance: `/onboarding` accessible without auth. `/account/*` redirects to `/auth/login?next=...` if not authenticated. Middleware uses `createServerClient` from `@supabase/ssr`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 2h
  **Zustand stores**
  `useOnboardingStore`, `usePlanStore`, and `useBoxStore` with slice isolation.

  Acceptance: `useOnboardingStore` holds `currentStep: 0 | 1 | 2 | 3`, `nextStep()`, `prevStep()`. `usePlanStore` holds `peopleCount`, `mealsPerWeek`, `basePrice`. `useBoxStore` holds `selectedRecipeIds`, `addRecipe(id)`, `removeRecipe(id)`. No cross-slice imports.
  Files: `src/store/onboarding.ts`, `src/store/plan.ts`, `src/store/box.ts`

---

## Phase 1 — Onboarding Shell

---

- [ ] **TASK-007** | STORY-1.2 | Est: 3h
  **OnboardingLayout with persistent Order Summary**
  4-step layout shell with sidebar and progress stepper.

  Acceptance: Order Summary sidebar visible at `≥1024px` on all 4 steps. Mobile: sticky footer bar shows total only; tap to expand. Zustand `useCheckoutStore` drives all summary values — no prop drilling. Discount line in `var(--color-brand)`. Progress stepper shows steps 1–4 with active/completed states.
  Files: `src/app/onboarding/layout.tsx`, `src/components/onboarding/OnboardingLayout.tsx`, `src/components/onboarding/OrderSummarySidebar.tsx`, `src/components/onboarding/StepStepper.tsx`

---

- [ ] **TASK-008** | STORY-1.1 | Est: 3h
  **Step 1: Plan Selector with real-time cost calculator**
  People count and meals-per-week steppers with live price from DB.

  Acceptance: `peopleCount` stepper (2–6); `mealsPerWeek` stepper (2–5). `calculatePrice(people, meals)` looks up `pricing_matrix` table — not hardcoded. `planStore.basePrice` updates on every stepper change. Original price shown with `<del>` tag; discounted first-box price below. Free shipping badge: "Free shipping on first box" green pill.
  Files: `src/app/onboarding/page.tsx`, `src/components/onboarding/PlanSelector.tsx`, `src/lib/calculatePrice.ts`

---

- [ ] **TASK-009** | STORY-1.3 | Est: 2h
  **Back button with state preservation**
  Step navigation that never loses form state.

  Acceptance: "Back" calls `prevStep()` — no store slice cleared. Browser back button respected via `window.history.pushState({ step })` + `popstate` listener. Returning to Step 1 restores `peopleCount` and `mealsPerWeek`. PaymentIntent not recreated if user returns from Step 4.
  Files: `src/app/onboarding/page.tsx`, `src/store/onboarding.ts`

---

- [ ] **TASK-010** | STORY-4.2 | Est: 1h
  **"Cancel Anytime" footer on all onboarding steps**
  Trust message in onboarding footer.

  Acceptance: "No commitment. Cancel anytime from your dashboard. No fees." — verbatim on all 4 steps. `font-size: 13px; color: var(--color-text-muted)` — not smaller. Located in `OnboardingLayout` footer, not per-step.
  Files: `src/components/onboarding/OnboardingLayout.tsx`

---

- [ ] **TASK-011** | STORY-4.1 | Est: 2h
  **Verified reviews section below Plan Selector**
  Static CMS trust content near the conversion CTA.

  Acceptance: Positioned directly below Plan Selector, above "Start Cooking" CTA. Shows aggregate `4.8 ★` and "2,400+ reviews" plus 3 review cards. Review data from static `reviews.json` fixture — no Supabase query in V1. `reviews.json` includes a comment: "Replace with live Supabase query in v2". Aggregate star `color: #CA8A04` — contrast ≥ 4.5:1 on white ✓.
  Files: `src/components/onboarding/ReviewsStrip.tsx`, `src/data/reviews.json`

---

- [ ] **TASK-012** | Est: 3h
  **Step 2: Account creation**
  Email/password signup with Supabase auth.

  Acceptance: Email + password fields; Zod validation. On success: `profiles` row created, redirect to Step 3 with `currentStep` updated to `2`. Password min 8 characters. Social login (Google) optional — button present but may be disabled.
  Files: `src/app/onboarding/account/page.tsx`, `src/components/onboarding/AccountForm.tsx`

---

- [ ] **TASK-013** | Est: 2h
  **Step 3: Delivery address**
  Address form with Zod validation.

  Acceptance: Street, city, state, postcode, country. All fields required. Postcode validates format. `DeliveryAddress` type used throughout. On submit: stored in Zustand checkout store for use in Step 4 order creation.
  Files: `src/app/onboarding/delivery/page.tsx`, `src/components/onboarding/AddressForm.tsx`

---

- [ ] **TASK-014** | STORY-4.3 | Est: 3h
  **Step 4: Payment + free-shipping-first-box**
  Stripe Payment Element embedded in onboarding.

  Acceptance: `POST /api/onboarding/intent` creates PaymentIntent server-side from `planStore` amounts — never from client body. Stripe coupon `FIRST_BOX_FREE_SHIP` applied automatically if `isFirstBox(userId) === true`. Existing `clientSecret` reused on back-navigation. On `payment_intent.succeeded` webhook: creates `subscriptions` and `orders` rows. Order Summary shipping line shows "FREE" for first box.
  Files: `src/app/onboarding/payment/page.tsx`, `src/components/onboarding/PaymentStep.tsx`, `src/app/api/onboarding/intent/route.ts`, `src/lib/isFirstBox.ts`

---

## Phase 2 — Meal Picker (The Reward)

---

- [ ] **TASK-015** | STORY-2.1 | Est: 2h
  **Recipe filter chips**
  Four dietary filter buttons with Supabase `.contains` query.

  Acceptance: Chips: "All" | "Quick (≤20 min)" | "Veggie" | "Family Friendly" as `<button role="tab" aria-selected>`. Filter uses `.contains('dietary_tags', [tag])`. Changing filter does not clear `boxStore.selectedRecipeIds`. Zero-result state: "No {filter} recipes this week" message.
  Files: `src/components/meal-picker/FilterChips.tsx`

---

- [ ] **TASK-016** | STORY-2.3 | Est: 3h
  **Recipe cards with nutrition**
  High-res recipe grid with "selected" overlay state.

  Acceptance: Card: `aspect-ratio: 4/3` image with `<Image sizes="(max-width: 640px) 100vw, 50vw">`. Calorie and prep-time badge pills (`border-radius: 999px`). "Selected" state: green checkmark overlay + `box-shadow: 0 0 0 3px var(--color-brand)`. At-max state (box full): unselected cards `opacity: 0.5` + tooltip "Remove a meal to swap".
  Files: `src/components/meal-picker/RecipeCard.tsx`, `src/app/meal-picker/page.tsx`

---

- [ ] **TASK-017** | STORY-2.2 | Est: 2h
  **Box progress bar**
  Native `<progress>` element filling as recipes are selected.

  Acceptance: `<progress value={selectedCount} max={mealsPerWeek} aria-label="Box fullness">`. Fill: `var(--color-brand)`. Label: "2 of 3 meals chosen" — reactive via `boxStore.selectedRecipeIds.length`. At-max: label → "Box complete! ✓". "Confirm Box" button disabled until `selectedCount === mealsPerWeek`.
  Files: `src/components/meal-picker/BoxProgressBar.tsx`

---

## Phase 3 — Subscription Management

---

- [ ] **TASK-018** | STORY-3.1 | Est: 3h
  **Skip a delivery**
  `/account/subscriptions` page with skip functionality.

  Acceptance: "Upcoming Deliveries" shows next delivery date + "Skip this week" button. `POST /api/subscriptions/skip` sets `user_boxes.is_skipped = true` — does not pause Stripe subscription. "Undo Skip" CTA available until 3 days before delivery. Toast on success: "Week of {date} skipped. No box will be delivered." — auto-dismisses at 3s.
  Files: `src/app/account/subscriptions/page.tsx`, `src/app/api/subscriptions/skip/route.ts`, `src/components/account/UpcomingDeliveries.tsx`

---

- [ ] **TASK-019** | STORY-3.2 | Est: 2h
  **Change dietary preference**
  Per-subscription dietary preference selector.

  Acceptance: Preference options: `'omnivore' | 'vegetarian' | 'family'`. Change takes effect from next cycle — not current in-progress box. `stripe.subscriptions.update()` sets `metadata.dietary_preference`. Confirmation modal before saving. Effective-date note: "Your new preference will apply from {nextCycleDate}".
  Files: `src/app/api/subscriptions/preference/route.ts`, `src/components/account/PreferenceModal.tsx`

---

- [ ] **TASK-020** | STORY-3.3 | Est: 3h
  **Update payment method and delivery address**
  Stripe SetupIntent flow and address update with lock-check.

  Acceptance: Payment update uses Stripe `SetupIntent`; new method replaces old via `stripe.customers.update`. Masked card displayed: "Visa ending in 4242" via `paymentMethod.card.last4`. Address change validated with Zod; updates `subscriptions.delivery_address jsonb`. "Delivery address locked" shown when `is_locked = true`; change takes effect next cycle.
  Files: `src/app/api/subscriptions/payment-method/route.ts`, `src/app/api/subscriptions/address/route.ts`, `src/components/account/PaymentMethodForm.tsx`, `src/components/account/AddressUpdateForm.tsx`

---

- [ ] **TASK-021** | STORY-4.2 | Est: 2h
  **Cancel subscription**
  Cancellation API with Resend confirmation email.

  Acceptance: `POST /api/subscriptions/cancel` calls `stripe.subscriptions.cancel({ prorate: false })`. Confirmation modal required before API call. Confirmation email sent via Resend within 60 seconds.
  Files: `src/app/api/subscriptions/cancel/route.ts`, `src/emails/CancellationConfirmation.tsx`

---

## Phase 4 — Stripe Webhook and Orders

---

- [ ] **TASK-022** | Est: 4h
  **Idempotent Stripe webhook**
  Process `payment_intent.succeeded` and `customer.subscription.*` events.

  Acceptance: Signature verified — unsigned → 400. Idempotency table `processed_webhook_events` checked before processing. `orders` insert: `ON CONFLICT (stripe_payment_intent_id) DO NOTHING`. `subscriptions` insert/update: `ON CONFLICT (stripe_subscription_id) DO NOTHING`. Responds within 3 seconds.
  Files: `src/app/api/webhooks/stripe/route.ts`

---

## Phase 5 — QA

---

- [ ] **TASK-023** | Est: 2h
  **QA grep suite and Lighthouse**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Cancel Anytime on all steps ===" && \
    grep -r "Cancel anytime" src/components/onboarding/OnboardingLayout.tsx && echo "PASS" || echo "FAIL"

  echo "=== <del> tag for original price (not text-decoration) ===" && \
    grep -r "text-decoration: line-through" src/components/onboarding/PlanSelector.module.css \
    && echo "FAIL — use <del>" || echo "PASS"

  echo "=== No direct planStore amounts in PaymentIntent ===" && \
    grep -r "planStore\." src/app/api/onboarding/intent/route.ts \
    && echo "FAIL — server must read DB" || echo "PASS"

  echo "=== BoxProgressBar uses native <progress> ===" && \
    grep -r "<progress" src/components/meal-picker/BoxProgressBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
