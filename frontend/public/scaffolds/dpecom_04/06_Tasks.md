# 06 — Tasks
## Top-Tier Creator Service Platform · dpecom_platform_04

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict. Inter font. Mobile-first 640px max-width container.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend date-fns clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. Root layout `max-width: 640px; margin: 0 auto`. Sub-1s LCP target noted in `07_Guide.md`.
  Files: `package.json`, `tsconfig.json`, `.env.example`, `src/app/layout.tsx`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — vibrant blue accents + soft slate**
  Professional and approachable design system.

  Acceptance: `--color-brand` (vibrant blue), `--color-bg` (soft slate), `--color-surface`, `--color-muted`, `--color-border`, `--color-text` defined. `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty. `.sr-only` and `@media (prefers-reduced-motion)` present.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  `Service`, `ServiceType`, `TimeSlot`, `Booking`, `AvailabilityBlock`, `MeetingPlatform`, `Review` exported. `ServiceType = '1on1' | 'webinar' | 'digital_product'`. `MeetingPlatform = 'zoom' | 'google_meet'`. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Tables: `profiles`, `services`, `availability_blocks`, `bookings`, `time_slots`, `reviews`, `orders`, `processed_webhook_events`.

  Acceptance: `availability_blocks`: `{ creator_id, day_of_week: 0-6, start_time, end_time }`. `bookings` has `UNIQUE` on `(service_id, slot_start_at)` — no double-booking. `time_slots` generated from `availability_blocks` — not stored (generated on-demand). `orders` has `UNIQUE` on `stripe_payment_intent_id`. `reviews.is_verified: boolean` — only true if `booking.status = 'completed'`.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase clients + auth + meeting platform setup**
  Creator dashboard protected. Booking flow public. Meeting platform credentials documented.

  Acceptance: `/[username]/dashboard` requires auth + ownership check. Zoom/Google Meet OAuth client IDs in `.env.example` with setup instructions. `NEXT_PUBLIC_DEFAULT_MEETING_PLATFORM` env var.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

---

## Phase 1 — Creator Profile

---

- [ ] **TASK-006** | Est: 3h
  **Creator public profile — link-in-bio storefront**
  Mobile-first centered profile page.

  Acceptance: `/[username]`: avatar, display name (`<h1>` Inter Bold), bio, specialties list, social links. Below bio: service cards and testimonial strip. Server Component with `generateMetadata` → `<title>{displayName} | Top-Tier`. 404 (`notFound()`) if username not found. `ProfileHeader`: `border-radius: 50%` on avatar, bold sans H1, social link icons.
  Files: `src/app/[username]/page.tsx`, `src/components/profile/ProfileHeader.tsx`, `src/components/profile/SocialLinks.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **ServiceCard with duration, price, and booking CTA**
  Modular service listing cards.

  Acceptance: `ServiceCard`: service title, type badge (`1:1 Session`, `Webinar`, `Digital Product`), duration (e.g., "30 min"), price in INR/USD, description. "Book Now" / "Buy Now" CTA. `CategorySwitcher` tabs filter cards by `ServiceType`. Active tab: `aria-selected="true"` on the `<button role="tab">`.
  Files: `src/components/profile/ServiceCard.tsx`, `src/components/profile/CategorySwitcher.tsx`

---

- [ ] **TASK-008** | Est: 2h
  **Testimonial strip with verified reviews**
  Social proof section with creator-endorsed handles.

  Acceptance: Reviews rendered from `reviews` where `is_verified = true`. Review card: reviewer name, handle (e.g., "@rohan_dev"), star rating, quote, "Verified Booking" badge. `is_verified` only set `true` when associated booking `status = 'completed'`.
  Files: `src/components/profile/TestimonialStrip.tsx`

---

## Phase 2 — Scheduling and Booking

---

- [ ] **TASK-009** | Est: 4h
  **`useAvailability` hook + CalendarPicker**
  Real-time availability computed from `availability_blocks`.

  Acceptance: `useAvailability(creatorId, month): AvailableDay[]` — fetches `availability_blocks` and existing `bookings` for the month; returns array of dates with available slots. `CalendarPicker`: highlights available days; disabled days are `aria-disabled="true"` + `pointer-events: none`. Date-fns used for all date calculations — no raw `Date` arithmetic.
  Files: `src/hooks/useAvailability.ts`, `src/components/booking/CalendarPicker.tsx`

---

- [ ] **TASK-010** | Est: 3h
  **TimeSlotGrid with real-time selection**
  Available time slots for a selected date.

  Acceptance: `TimeSlotGrid`: shows available 30/60-min slots for selected date. Booked slots: `disabled` + `opacity: 0.4; cursor: not-allowed`. Selected slot: `background: var(--color-brand); color: white`. No time zone conversion in V1 — display in creator's local time zone (noted as V2 enhancement in `07_Guide.md`). "Book this slot" button disabled until slot selected.
  Files: `src/components/booking/TimeSlotGrid.tsx`

---

- [ ] **TASK-011** | Est: 3h
  **Booking checkout with Stripe Payment + confirmation**
  One-page booking checkout.

  Acceptance: Booking checkout: name + email form + Stripe Payment Element. `POST /api/checkout/booking`: creates Stripe PaymentIntent for service price; amount server-validated from `services.price_cents` — never client body. On success: `bookings` row created with `status = 'confirmed'`. Confirmation email sent via Resend with calendar invite (.ics attachment).
  Files: `src/app/booking/[serviceId]/page.tsx`, `src/app/api/checkout/booking/route.ts`, `src/emails/BookingConfirmation.tsx`

---

- [ ] **TASK-012** | Est: 4h
  **Meeting link automation**
  Zoom or Google Meet link generation post-booking.

  Acceptance: Webhook `payment_intent.succeeded`: after `bookings` insert, call meeting platform API to create meeting link. `MeetingPlatform` determined by `services.meeting_platform`. Zoom: `POST https://api.zoom.us/v2/users/me/meetings` with OAuth token. Google Meet: `POST https://www.googleapis.com/calendar/v3/calendars/primary/events` (creates Calendar event with Meet link). Meeting URL stored in `bookings.meeting_url`. Resend confirmation email includes meeting URL. If meeting API fails: log error; booking still created; admin alerted via email.
  Files: `src/app/api/webhooks/stripe/route.ts`, `src/lib/zoom.ts`, `src/lib/googleMeet.ts`

---

## Phase 3 — Creator Dashboard and QA

---

- [ ] **TASK-013** | Est: 3h
  **Creator dashboard — upcoming bookings + availability setup**
  Self-service profile and scheduling management.

  Acceptance: `/[username]/dashboard/bookings`: upcoming bookings table (date, attendee name masked, service, meeting URL). "Mark Complete" CTA → `bookings.status = 'completed'`; `reviews.is_verified` becomes eligible. Availability setup: `availability_blocks` CRUD — day-of-week toggles + time range per day.
  Files: `src/app/[username]/dashboard/bookings/page.tsx`, `src/app/[username]/dashboard/availability/page.tsx`

---

- [ ] **TASK-014** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Booking amount never from client ===" && \
    grep -r "body\.price\|body\.amount" src/app/api/checkout/booking/route.ts \
    && echo "FAIL — use services.price_cents from DB" || echo "PASS"

  echo "=== Double-booking prevented by DB UNIQUE ===" && \
    grep -r "UNIQUE.*slot_start_at\|slot_start_at.*UNIQUE" supabase/migrations && echo "PASS" || echo "FAIL"

  echo "=== is_verified only on completed bookings ===" && \
    grep -r "is_verified.*true" src/app/api --include="*.ts" | grep -v "completed" \
    && echo "REVIEW — should only be set on booking completion" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
