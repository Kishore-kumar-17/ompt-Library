# 06 — Tasks
## Kit-Style Creator Storefront · dpecom_platform_03

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict. Playfair Display + Inter dual-font. 720px max-width layout.

  ```bash
  npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*" --no-tailwind
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend
  ```

  Acceptance: `npm run dev` starts. Root layout has `max-width: 720px; margin: 0 auto`. Playfair Display (headings) and Inter (body) loaded via `next/font/google`.
  Files: `package.json`, `tsconfig.json`, `.env.example`, `src/app/layout.tsx`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — Kit Green + Warm Cream**
  Clean creative design system.

  Acceptance: `--color-brand` (Kit Green), `--color-bg` (Warm Cream), `--color-surface`, `--color-muted`, `--color-border`, `--color-text` defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` present.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `LeadMagnet`, `AudienceTag`, `TipAmount`, `Product`, `DigitalDelivery`, `EmailSubscriber` exported. `AudienceTag = 'subscriber' | string` — extensible. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 2h
  **Database schema + RLS migrations**
  Tables: `profiles`, `email_subscribers`, `products`, `orders`, `digital_deliveries`, `audience_tags`, `processed_webhook_events`.

  Acceptance: `email_subscribers` has `UNIQUE` on `(creator_id, email)`. `audience_tags`: `{ subscriber_id, tag, created_at }`. `orders` has `UNIQUE` on `stripe_payment_intent_id`. `digital_deliveries`: records each Resend email send with `sent_at`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + Stripe + Resend setup**
  Creator dashboard protected. Public: `/`, `/[slug]`, `/buy/[productSlug]`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/stripe.ts`, `src/lib/resend.ts`, `src/middleware.ts`

---

## Phase 1 — Audience-First Infrastructure

---

- [ ] **TASK-006** | Est: 3h
  **SubscribeForm with Resend integration**
  Email capture that delivers lead magnet instantly.

  Acceptance: `POST /api/subscribe` validates email with Zod, inserts into `email_subscribers` with `tag = 'subscriber'`, sends lead magnet via Resend (`POST /api/email/lead-magnet`). Inline success message: "Check your inbox! Your {lead magnet} is on its way." Duplicate email: silent success (no error to user). ReCAPTCHA or honeypot field to prevent spam.
  Files: `src/components/SubscribeForm.tsx`, `src/app/api/subscribe/route.ts`, `src/emails/LeadMagnet.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Audience tagging on purchase**
  Auto-tag buyers in `audience_tags` on order completion.

  Acceptance: Webhook `payment_intent.succeeded`: after `orders` insert, insert `audience_tags` row `{ subscriber_id, tag: 'customer:${product.slug}' }`. Tag normalised to lowercase `customer:product-slug` format. Tags visible in creator dashboard audience table.
  Files: `src/app/api/webhooks/stripe/route.ts`, `src/app/dashboard/audience/page.tsx`

---

## Phase 2 — Tip Jar

---

- [ ] **TASK-008** | Est: 3h
  **Tip amount grid + custom input**
  Fan support contribution component.

  Acceptance: `TipAmountGrid`: preset buttons $5, $10, $25 as `<button role="radio" aria-checked>`. `CustomAmountInput`: `<input type="number" min="1">` with Zod validation. Selected amount highlighted. "Support" button disabled when no amount selected; `disabled` attribute set + `cursor: not-allowed`. `POST /api/tip` creates Stripe PaymentIntent for selected amount.
  Files: `src/components/TipAmountGrid.tsx`, `src/components/CustomAmountInput.tsx`, `src/app/api/tip/route.ts`

---

- [ ] **TASK-009** | Est: 2h
  **"Support Me" page**
  Creator support page with biography and tip jar.

  Acceptance: `/support` or `/[username]/support`: creator bio (from `profiles.bio`), avatar, and `TipAmountGrid`. "Thank you" page after successful tip. Thank-you email sent via Resend with heart animation in HTML email (CSS animation, not GIF). Tip success also inserts `audience_tags` row with `tag = 'supporter'`.
  Files: `src/app/support/page.tsx`, `src/emails/ThankYouTip.tsx`

---

## Phase 3 — Product Sales and Automated Delivery

---

- [ ] **TASK-010** | Est: 3h
  **Product page — sales page + newsletter opt-in**
  Integrated sales page with email capture.

  Acceptance: `/buy/[productSlug]`: product name, description, price, "Buy Now" CTA. Below CTA: `SubscribeForm` with opt-in copy "Join the newsletter for free updates". Checkout is 1-page — no multi-step. Guest checkout supported (no account required).
  Files: `src/app/buy/[slug]/page.tsx`, `src/components/ProductSalesPage.tsx`

---

- [ ] **TASK-011** | Est: 3h
  **Automated digital delivery via Resend**
  Instant file delivery email post-purchase.

  Acceptance: Webhook `payment_intent.succeeded`: create `orders` row; send digital delivery email via Resend with signed download URL (3600s TTL from Supabase Storage). `digital_deliveries` row created with `sent_at`. Duplicate webhook → `ON CONFLICT DO NOTHING` on `orders`, no duplicate email. File URL access: validate `orders.status = 'succeeded'` and `orders.buyer_email` before generating signed URL.
  Files: `src/app/api/webhooks/stripe/route.ts`, `src/emails/DigitalDelivery.tsx`, `src/app/api/download/route.ts`

---

## Phase 4 — Creator Dashboard and QA

---

- [ ] **TASK-012** | Est: 2h
  **Creator dashboard — sales + audience overview**
  Simple sales tracking and audience list.

  Acceptance: `/dashboard`: total sales count, total revenue, subscriber count. Audience table: email, tags, join date. Products table: title, price, sales count. All data fetched server-side — no client-side polling.
  Files: `src/app/dashboard/page.tsx`, `src/app/dashboard/audience/page.tsx`

---

- [ ] **TASK-013** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Duplicate subscribe is silent success ===" && \
    grep -r "DUPLICATE\|unique_violation\|23505" src/app/api/subscribe/route.ts && echo "PASS" || echo "FAIL"

  echo "=== TipAmountGrid buttons use aria-checked ===" && \
    grep -r "aria-checked" src/components/TipAmountGrid.tsx && echo "PASS" || echo "FAIL"

  echo "=== Delivery email sent after webhook, not checkout ===" && \
    grep -r "DigitalDelivery\|digital_deliveries" src/app/api/webhooks/stripe/route.ts && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
