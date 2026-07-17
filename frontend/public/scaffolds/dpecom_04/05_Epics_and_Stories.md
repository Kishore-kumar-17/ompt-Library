# 05 — Epics & Stories
## Work Breakdown · dpecom_platform_04
### Top-Tier Creator Service Platform · Scheduling + Booking

---

## Epic 1: The Expert Profile

### Story 1.1 — Portrait and Bio Upload
**As a** creator,
**I want** to upload a high-resolution portrait and write a professional bio,
**so that** visitors immediately understand my expertise and trust me.

**Acceptance criteria:**
- [ ] Avatar upload: JPEG / PNG / WEBP ≤ 5MB; stored at `avatars/{userId}/avatar` in Supabase Storage; displayed at `120px × 120px`, `border-radius: 50%`
- [ ] Bio `<textarea>`: max 400 chars; `placeholder="Tell mentees what you specialise in..."`; counter `{remaining}/400`
- [ ] Headline input: max 80 chars; displayed as `<h2>` on profile page in Inter SemiBold 600, `font-size: 24px`
- [ ] TypeScript: `Profile = { id: string; username: string; displayName: string; headline: string | null; bio: string | null; avatarUrl: string | null }`
- [ ] Profile page `/[username]` is statically rendered; ISR `revalidate = 120`; `generateMetadata` uses creator's display name + headline
- [ ] Container: `max-width: 640px`; centred; no sidebar — mobile-first single-column layout

### Story 1.2 — Social Handle Connection
**As a** creator,
**I want** to connect my LinkedIn and Twitter handles,
**so that** potential mentees can verify my credentials on their preferred platform.

**Acceptance criteria:**
- [ ] Two optional text inputs: "LinkedIn URL" and "Twitter/X handle" (without the @)
- [ ] LinkedIn URL validated: must match `^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$`; error "Enter a valid LinkedIn profile URL"
- [ ] Twitter handle validated: `^[a-zA-Z0-9_]{1,15}$`; displayed on profile as `@{handle}` linking to `https://x.com/{handle}`
- [ ] Stored in `profiles.social_links jsonb`: `{ "linkedin": "https://...", "twitter": "handle" }`
- [ ] Social icons: LinkedIn SVG (`fill: #0A66C2`) and Twitter/X SVG (`fill: #000000`) — icon colours are hardcoded brand values, not CSS tokens
- [ ] TypeScript: `SocialLinks = { linkedin?: string; twitter?: string }`

### Story 1.3 — Accent Colour Customisation
**As a** creator,
**I want** to customise the primary accent colour of my profile page,
**so that** it matches my personal brand identity.

**Acceptance criteria:**
- [ ] Colour picker: `<input type="color">` with 6 preset swatches (vibrant blue, teal, orange, purple, green, red) + custom
- [ ] Selected hex stored as `profiles.accent_hex text`; validated server-side: must match `^#[0-9A-Fa-f]{6}$`
- [ ] Profile page injects `<style>:root { --color-accent: {accent_hex}; }</style>` as an inline style tag in `<head>`
- [ ] All CTA buttons and active states on the profile page use `var(--color-accent)` — no hardcoded button colours
- [ ] Contrast check: if `contrastRatio(accent_hex, '#FFFFFF') < 4.5`, show warning "This colour may be hard to read on white buttons"
- [ ] TypeScript: `validateAccentHex(hex: string): boolean` — regex check only; no luminance enforcement at save

---

## Epic 2: Real-Time Scheduling

### Story 2.1 — Date Picker Calendar
**As a** mentee,
**I want** to select a date from a mobile-friendly calendar showing only available dates,
**so that** I only see slots that are actually bookable.

**Acceptance criteria:**
- [ ] Calendar renders using `date-fns` for all date arithmetic; no moment.js or dayjs
- [ ] Available dates fetched from `GET /api/availability/[creatorUsername]?serviceId=...` — returns array of available `YYYY-MM-DD` dates for next 60 days
- [ ] Unavailable dates: `opacity: 0.3; cursor: not-allowed; pointer-events: none`
- [ ] Past dates always disabled: `isBefore(date, startOfDay(new Date()))`
- [ ] Calendar `<table>` with `role="grid"`, `aria-label="Select a date"`, `<td>` cells have `aria-disabled` for unavailable dates
- [ ] TypeScript: `AvailabilityDay = { date: string; hasSlots: boolean }[]`

### Story 2.2 — Time Slot Selection
**As a** mentee,
**I want** to choose a time slot based on the creator's real-time availability,
**so that** I book a confirmed session, not a request.

**Acceptance criteria:**
- [ ] On date select: `GET /api/slots/[creatorUsername]?date=YYYY-MM-DD&serviceId=...` returns available slots
- [ ] Slots calculated server-side using `date-fns`: `eachMinuteOfInterval` stepped by `service.duration_minutes`; excludes existing `bookings` in that range
- [ ] Booked slots excluded: `SELECT start_time FROM bookings WHERE service_id = $1 AND DATE(start_time) = $2 AND status != 'cancelled'`
- [ ] Time slots rendered in mentee's local timezone; `Intl.DateTimeFormat` with `timeZoneName: 'short'`
- [ ] TypeScript: `TimeSlot = { startTime: string; endTime: string; available: boolean }` — ISO 8601 UTC strings
- [ ] Slots displayed as `9:00 AM`, `9:30 AM` etc; not ISO strings directly in UI

### Story 2.3 — Race Condition Prevention
**As a** mentee,
**I want** my booking to be guaranteed once I pay,
**so that** two people can't book the same slot simultaneously.

**Acceptance criteria:**
- [ ] `bookings` table has unique constraint: `UNIQUE (service_id, start_time)` where `status != 'cancelled'`
- [ ] `POST /api/bookings/reserve`: inserts a `status = 'pending'` row with a 10-minute TTL before payment completes
- [ ] If unique constraint violation on insert: return 409 `{ error: 'SLOT_TAKEN' }`; client shows "Slot just booked — pick another"
- [ ] Pending bookings older than 10 minutes cleaned by cron: `DELETE FROM bookings WHERE status = 'pending' AND created_at < now() - interval '10 minutes'`
- [ ] Stripe webhook `payment_intent.succeeded` updates `bookings.status = 'confirmed'` by `bookings.stripe_payment_intent_id`
- [ ] TypeScript: `BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'`

---

## Epic 3: Monetisation Engine

### Story 3.1 — 1:1 Session Pricing
**As a** creator,
**I want** to create 1:1 sessions with custom durations and prices,
**so that** mentees can book exactly the kind of help they need.

**Acceptance criteria:**
- [ ] Service form fields: title, description (max 300 chars), duration_minutes (15 / 30 / 45 / 60 / 90), price_cents, currency (INR / USD)
- [ ] `services.type = 'session'` distinguishes from webinars and products
- [ ] Duration picker: radio buttons (not a text input); values `[15, 30, 45, 60, 90]`
- [ ] INR prices displayed as "₹{amount}"; USD as "${amount}" — currency symbol rendered from `Intl.NumberFormat`
- [ ] TypeScript: `Service = { id: string; creatorId: string; type: 'session' | 'webinar' | 'product'; durationMinutes: number | null; priceCents: number; currency: 'INR' | 'USD' }`
- [ ] `durationMinutes: null` is only valid for `type = 'product'`; server returns 400 if session submitted without duration

### Story 3.2 — Group Webinar with Seat Limit
**As a** creator,
**I want** to launch group webinars with a fixed date and participant limit,
**so that** I can earn from a live event without 1:1 scheduling overhead.

**Acceptance criteria:**
- [ ] Webinar form additional fields: `event_date timestamp`, `max_participants integer`, `zoom_link text` (optional pre-set)
- [ ] `services.type = 'webinar'`; availability logic skipped — single slot at `event_date`
- [ ] Participant count: `SELECT COUNT(*) FROM bookings WHERE service_id = $1 AND status != 'cancelled'`; if `>= max_participants`, "Sold Out" badge shown
- [ ] Sold-out CTA: "Join Waitlist" — stores email in `waitlist` table; no payment taken
- [ ] TypeScript: `isWebinarFull(serviceId: string): Promise<boolean>` using the count query above
- [ ] Webinar card on profile: shows date + time in `MMM d, YYYY h:mm a` format, seat count "X spots left"

### Story 3.3 — Digital Asset Sale
**As a** creator,
**I want** to sell digital guides and templates as downloadable products from my profile,
**so that** passive income supplements my session revenue.

**Acceptance criteria:**
- [ ] `services.type = 'product'`; no scheduling — purchase triggers immediate download
- [ ] File uploaded to Supabase Storage `products/{creatorId}/{serviceId}`; `services.file_url` set on upload
- [ ] Purchase flow: Stripe PaymentIntent → webhook `payment_intent.succeeded` → `generateSignedUrl(file_url, 3600)` → email via Resend
- [ ] Product card on profile: no calendar; "Buy Now" button goes directly to Stripe checkout; no slot selection step
- [ ] TypeScript: `downloadProduct(serviceId: string, paymentIntentId: string): Promise<string>` returns signed URL
- [ ] `services.file_url` SELECT-restricted by RLS to creator only; buyers access via the signed URL endpoint only

---

## Epic 4: Automation and Trust

### Story 4.1 — Zoom / Google Meet Link Generation
**As a** creator,
**I want** automatic meeting links generated for every confirmed booking,
**so that** I never manually create or share calendar invites.

**Acceptance criteria:**
- [ ] Creator onboarding: choose "Zoom" or "Google Meet" as default meeting provider; stored as `profiles.meeting_provider: 'zoom' | 'google_meet'`
- [ ] Zoom: webhook calls `POST https://api.zoom.us/v2/users/me/meetings` with `start_time`, `duration`; stores `meeting_link` in `bookings`
- [ ] Google Meet: creates event via `calendar.events.insert` with `conferenceData: { createRequest }` — `conferenceDataVersion: 1`
- [ ] `bookings.meeting_link` set within 10 seconds of webhook receipt; confirmation email sent after link is set
- [ ] If API call fails: `bookings.meeting_link = null`; creator notified via email "Meeting link creation failed — add manually"
- [ ] TypeScript: `MeetingProvider = 'zoom' | 'google_meet'`; `createMeetingLink(provider: MeetingProvider, startTime: Date, durationMinutes: number): Promise<string>`

### Story 4.2 — Verified Reviews
**As a** potential mentee,
**I want** to see verified reviews from previous session attendees,
**so that** I trust the creator's expertise before paying.

**Acceptance criteria:**
- [ ] Review submitted only by users with `bookings.status = 'completed'` for that service — not open to all
- [ ] `reviews` table: `{ id, booking_id UNIQUE, creator_id, rating integer CHECK(1-5), text, created_at }`
- [ ] `UNIQUE (booking_id)` prevents double reviews; one review per completed booking
- [ ] Creator profile shows: star rating aggregate `(AVG(rating))` rounded to 1 decimal, review count, last 5 reviews
- [ ] Review text: max 300 chars; no markdown; plain text only; displayed with reviewer's first name and booking date
- [ ] TypeScript: `Review = { id: string; rating: number; text: string; reviewerFirstName: string; bookingDate: string }`

### Story 4.3 — Automated 15-Minute Reminder
**As a** mentee,
**I want** to receive an automated reminder 15 minutes before my session,
**so that** I never miss a booked call.

**Acceptance criteria:**
- [ ] Cron runs every 5 minutes: `SELECT * FROM bookings WHERE status = 'confirmed' AND start_time BETWEEN now() AND now() + interval '20 minutes' AND reminder_sent_at IS NULL`
- [ ] For each matching booking: Resend sends reminder email to `bookings.mentee_email` with `meeting_link` and creator name
- [ ] After send: `UPDATE bookings SET reminder_sent_at = now()` — prevents duplicate sends on next cron run
- [ ] Reminder email subject: "Your session with {creatorName} starts in 15 minutes"
- [ ] `bookings.reminder_sent_at timestamp` column added in migration; nullable; index on `(status, start_time, reminder_sent_at)`
- [ ] TypeScript: `sendSessionReminder(booking: Booking, creator: Profile): Promise<void>`
