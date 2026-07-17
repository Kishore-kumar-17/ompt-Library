# 06 — Tasks
## Squeezed SaaS Storefront (Merchant of Record) · dpecom_platform_02

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict and Shadcn/UI.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend recharts clsx tailwind-merge
  npx shadcn@latest init
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. Shadcn button and card components installable.
  Files: `package.json`, `tsconfig.json`, `components.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — high-trust SaaS**
  Soft-shadow SaaS design system with `rounded-xl` default.

  Acceptance: `--color-brand`, `--color-surface`, `--color-muted`, `--color-border`, `--color-text`, `--color-success`, `--radius-card: 12px` defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` present.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `SubscriptionTier`, `LicenseKey`, `MRRSnapshot`, `RevenueEvent`, `PlatformProduct`, `CheckoutSession` exported. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Tables: `profiles`, `platform_products`, `subscription_tiers`, `customer_subscriptions`, `license_keys`, `orders`, `revenue_events`, `processed_webhook_events`, `tax_rates`.

  Acceptance: `license_keys` has `UNIQUE` on `key_value`. `revenue_events` has `event_type: 'mrr_new' | 'mrr_churn' | 'mrr_expansion' | 'one_time'`. `tax_rates` table with country code + rate for MoR logic. `processed_webhook_events` idempotency table present.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + role setup**
  Creator vs buyer role-aware middleware.

  Acceptance: `/dashboard/*` requires `profiles.role = 'creator'`. `/admin/*` requires `profiles.role = 'admin'`. Public: `/`, `/product/*`, `/checkout/*`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

## Phase 1 — Marketing Shell

---

- [ ] **TASK-006** | Est: 3h
  **Homepage — hero + modular feature grid + pricing preview**
  High-trust SaaS landing page.

  Acceptance: `<nav>` with `backdrop-blur` on scroll. Hero: centered text, revenue graph illustration, two CTAs. Feature grid: modular cards with SVG icons — `grid-template-columns: repeat(3, 1fr)` desktop, 1-col mobile. Pricing preview: 3 tier cards with "Start Free", "Pro", "Business" from `subscription_tiers` table.
  Files: `src/app/page.tsx`, `src/components/home/HeroSection.tsx`, `src/components/home/FeatureGrid.tsx`, `src/components/home/PricingPreview.tsx`

---

## Phase 2 — Creator Dashboard

---

- [ ] **TASK-007** | Est: 3h
  **Dashboard layout + StatCards with Recharts sparklines**
  Revenue reporting dashboard.

  Acceptance: `DashboardLayout`: sidebar navigation + main content area. StatCards: MRR, Churn Rate, LTV, Net Revenue — each with Recharts `<LineChart>` sparkline. Monthly/Yearly toggle on `RevenueChart` updates chart data range. Data fetched server-side from `revenue_events` aggregation.
  Files: `src/app/dashboard/page.tsx`, `src/components/dashboard/DashboardLayout.tsx`, `src/components/dashboard/StatCard.tsx`, `src/components/dashboard/RevenueChart.tsx`

---

- [ ] **TASK-008** | Est: 3h
  **Subscription tier management**
  Create/edit subscription pricing plans.

  Acceptance: Creator can define: Free, Pro, Business tiers with monthly/annual pricing. Each tier: feature list, price, highlights. Tiers saved to `subscription_tiers`; Stripe price IDs stored per tier. "Highlighted" plan gets visual emphasis.
  Files: `src/app/dashboard/products/page.tsx`, `src/components/dashboard/TierCard.tsx`

---

- [ ] **TASK-009** | Est: 3h
  **License key management**
  Automated key issuance and display.

  Acceptance: Keys auto-generated on `orders.status = 'succeeded'` webhook. Format: `XXXX-XXXX-XXXX-XXXX` (UUID-derived). `license_keys` table with `UNIQUE` on `key_value`. `/dashboard/keys`: table of issued keys with status and order reference. "Click to Copy" button with clipboard API + "Copied!" toast at 2s. Key validation endpoint: `POST /api/keys/validate` → `{ valid: boolean; expiresAt: Date | null }`.
  Files: `src/app/dashboard/keys/page.tsx`, `src/components/dashboard/LicenseKeyRow.tsx`, `src/app/api/keys/validate/route.ts`

---

## Phase 3 — MoR Checkout Overlay

---

- [ ] **TASK-010** | Est: 4h
  **Native checkout overlay — multi-step, 20+ payment methods**
  Conversion-optimized checkout modal.

  Acceptance: Opens via `useCheckoutStore.open(productId)`. Multi-step: (1) Product summary + email, (2) Payment. Rendered via React portal; `z-index: 9999`. Payment Element shows all browser-available methods (card, Apple Pay, Google Pay, etc.). `role="dialog"`, focus trapped, Esc closes. "Secure Checkout" trust badge + "Merchant of Record" badge both visible.
  Files: `src/components/checkout/CheckoutOverlay.tsx`, `src/components/checkout/PaymentStep.tsx`

---

- [ ] **TASK-011** | Est: 3h
  **Tax calculation (MoR engine)**
  Server-side VAT/tax calculation by country before payment.

  Acceptance: `POST /api/checkout/calculate-tax` accepts `{ email, countryCode, productId }`. Looks up `tax_rates` table for country. Returns `{ subtotal, taxAmount, taxRate, total, taxLabel }`. Tax amount added to Stripe PaymentIntent `amount`. Tax invoice generated via Resend post-purchase. Never trusts client-provided country for tax; verified by Stripe's `billing_details.address`.
  Files: `src/app/api/checkout/calculate-tax/route.ts`, `src/emails/TaxInvoice.tsx`

---

- [ ] **TASK-012** | Est: 4h
  **Idempotent webhook + license key issuance**
  Process `payment_intent.succeeded`; issue license keys.

  Acceptance: Signature verified — unverified → 400. Idempotency check. Order insert: `ON CONFLICT (stripe_payment_intent_id) DO NOTHING`. License key auto-generated and inserted into `license_keys`. Customer confirmation email with license key sent via Resend.
  Files: `src/app/api/webhooks/stripe/route.ts`, `src/lib/generateLicenseKey.ts`

---

## Phase 4 — Dunning and QA

---

- [ ] **TASK-013** | Est: 3h
  **Failed payment recovery (dunning)**
  Retry logic and subscriber notification for failed subscription payments.

  Acceptance: Webhook `invoice.payment_failed`: update `customer_subscriptions.status = 'past_due'`. Send dunning email via Resend with "Update Payment Method" link. Retry schedule: 3, 5, 7 days after first failure. After 3 failures: `status = 'cancelled'`. Cancellation email sent.
  Files: `src/app/api/webhooks/stripe/route.ts` (extend), `src/emails/DunningEmail.tsx`, `src/emails/SubscriptionCancelled.tsx`

---

- [ ] **TASK-014** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Tax never from client country ===" && \
    grep -r "body\.country\|req\.body\.country" src/app/api/checkout/calculate-tax/route.ts \
    && echo "REVIEW — validate via Stripe billing_details" || echo "PASS"

  echo "=== License key format is UUID-derived ===" && \
    grep -r "generateLicenseKey" src/lib/generateLicenseKey.ts && echo "PASS" || echo "FAIL"

  echo "=== CheckoutOverlay uses portal ===" && \
    grep -r "createPortal" src/components/checkout/CheckoutOverlay.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
