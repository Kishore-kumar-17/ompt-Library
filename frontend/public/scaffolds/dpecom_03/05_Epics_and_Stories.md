# 05 — Epics & Stories
## Work Breakdown · dpecom_platform_03
### Kit-Style Creator Storefront · Email-First + Resend

---

## Epic 1: The List Growth Loop

### Story 1.1 — Lead Magnet Opt-In
**As a** creator,
**I want** to offer a free lead magnet in exchange for an email address,
**so that** every visitor becomes a potential future buyer.

**Acceptance criteria:**
- [ ] Lead magnet form: email input + "Get Free [Resource]" button; no account required
- [ ] `POST /api/subscribers/optin` upserts into `subscribers` table; adds tag `'lead-magnet'` to `tags` array if not present
- [ ] On submit: Resend sends the lead magnet email with `products.lead_magnet_url` as a download link; link signed for 24 hours
- [ ] Duplicate email upsert uses `ON CONFLICT (email) DO UPDATE SET tags = array_append(...)` — no duplicate rows
- [ ] TypeScript: `Subscriber = { id: string; email: string; firstName: string | null; tags: string[]; createdAt: Date }`
- [ ] Form width: max `480px`; serif heading above form; warm neutral background `#FAF7F2`; no modal — inline block

### Story 1.2 — Auto-Tag New Buyers
**As a** creator,
**I want** new buyers automatically added to my email list with a purchase tag,
**so that** I can send them follow-up sequences without manual CSV imports.

**Acceptance criteria:**
- [ ] Stripe webhook `checkout.session.completed` triggers `/api/webhooks/stripe`
- [ ] Handler upserts `subscribers` with buyer email and appends tag `customer:{productSlug}` (e.g., `customer:writing-masterclass`)
- [ ] Tag normalised to lowercase, hyphens only: `productSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')`
- [ ] If "Subscribe" checkbox was unchecked at checkout: buyer record created with `opted_in: false`; tag still applied
- [ ] TypeScript: `tagSubscriber(email: string, tag: string): Promise<void>` — idempotent; calling twice does not duplicate the tag
- [ ] `grep "opted_in" src/lib/subscribers.ts` → present; `opted_in = false` rows excluded from newsletter broadcast queries

### Story 1.3 — Newsletter Opt-In on Checkout
**As a** creator,
**I want** a "Join my newsletter" opt-in checkbox on the checkout page,
**so that** 70% of buyers also subscribe to my list.

**Acceptance criteria:**
- [ ] Checkbox labelled "Keep me updated with new guides and newsletters" — pre-checked by default
- [ ] Checkbox state stored in Zustand `checkoutStore.subscribeToList: boolean`
- [ ] Passed to `POST /api/checkout` as `payload.subscribeToList`; webhook reads from Stripe session metadata
- [ ] When `subscribeToList = true`: `subscribers.opted_in` set to `true`; when false: `false`
- [ ] Opt-in rate tracked in `daily_metrics.optin_count`; visible in creator analytics as "Email Opt-in Rate"
- [ ] GDPR: checkbox unchecked state still processes the purchase; opt-in is voluntary, not required for checkout

---

## Epic 2: The Tip Jar

### Story 2.1 — Tip Amount Selection
**As a** fan,
**I want** to select from preset tip amounts or enter a custom one,
**so that** I can support my favourite creator with exactly what feels right.

**Acceptance criteria:**
- [ ] Preset buttons: "$5", "$10", "$25"; clicking a button sets `tipStore.amount` and applies active style
- [ ] Custom input: clears preset selection when focused; accepts integers only (no decimals in UI, stored as cents internally)
- [ ] `amount * 100` converted to cents before passing to `POST /api/tip`; minimum $1 enforced server-side
- [ ] TypeScript: `TipAmount = 5 | 10 | 25 | number` — `number` for custom; `TipStore = { amount: number; message: string }`
- [ ] Below-minimum custom amount: "Minimum tip is $1" shown inline; submit button disabled
- [ ] Active preset button: `background: var(--color-accent); color: #FFFFFF`; inactive: `border: 1px solid currentColor`

### Story 2.2 — Personal Message with Tip
**As a** fan,
**I want** to add a personal message to my tip,
**so that** the creator knows what motivated my support.

**Acceptance criteria:**
- [ ] `<textarea>`: max 160 chars; `placeholder="What inspired this tip? (optional)"`; counter `{remaining}/160`
- [ ] Message stored in `transactions.tip_message text`; passed to Stripe PaymentIntent `metadata.tip_message`
- [ ] Message displayed to creator in the "Tips" section of their dashboard
- [ ] Empty message does not render a blank card in the dashboard — `null` messages are excluded from display
- [ ] No profanity filter in v1; moderation note added to `07_Guide.md` for v2
- [ ] TypeScript: `transactions.tip_message: string | null`

### Story 2.3 — Post-Tip Thank You Animation
**As a** fan,
**I want** to see a delightful animation after my tip goes through,
**so that** the experience feels personal and memorable.

**Acceptance criteria:**
- [ ] On `stripe.confirmPayment` success: Tip Jar component transitions to "Thank You" view via Framer Motion `<AnimatePresence>`
- [ ] Animation: `<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }}`
- [ ] Thank You view shows: creator's name, tip amount ("You sent $10 ♥"), and creator avatar
- [ ] Under `prefers-reduced-motion`: animation skipped; Thank You view renders immediately at full opacity
- [ ] `@media (prefers-reduced-motion: reduce)` check in `globals.css` disables all Framer Motion transitions globally
- [ ] Thank You view has no "Buy something" upsell — strictly appreciation, not conversion

---

## Epic 3: Digital Product Sales

### Story 3.1 — Product Upload (Under 2 Minutes)
**As a** creator,
**I want** to upload a PDF and set a price in under 2 minutes,
**so that** I can publish new products without friction.

**Acceptance criteria:**
- [ ] Product form fields: title, description (max 500 chars), price (cents), file upload, lead_magnet_url (optional)
- [ ] File upload: Supabase Storage presigned URL; accepts PDF only for the "product file"; any MIME for lead magnet
- [ ] `products.price_cents = 0` marks product as "Free download" — no payment step at checkout
- [ ] TypeScript: `Product = { id: string; title: string; description: string; priceCents: number; fileUrl: string; leadMagnetUrl: string | null }`
- [ ] After save: creator sees a shareable URL `/p/{slug}` where `slug` is auto-generated from the title
- [ ] Slug generation: `title.toLowerCase().replace(/\s+/g, '-').slice(0, 50)` — uniqueness enforced by DB unique index

### Story 3.2 — Sales Page
**As a** creator,
**I want** a distraction-free sales page for each product,
**so that** buyers can focus on the purchase without navigation clutter.

**Acceptance criteria:**
- [ ] `/p/[slug]` route: no navigation bar, no footer links — only the product content and checkout CTA
- [ ] Layout: `max-width: 720px`; centred; serif `<h1>` for product title; `font-family: var(--font-serif)`
- [ ] Page contains: product title `<h1>`, description (markdown rendered), price, "Buy Now" button, opt-in form below CTA
- [ ] Metadata: `generateMetadata` sets OG image from `products.image_url` (if set) or a fallback SVG
- [ ] "Buy Now" button opens the checkout modal; no separate checkout page navigation
- [ ] Page is statically rendered with `generateStaticParams`; ISR `revalidate = 300` (5 minutes)

### Story 3.3 — Secure Automated Delivery via Resend
**As a** buyer,
**I want** to receive my purchased file via email immediately,
**so that** I don't need to log in to access my purchase.

**Acceptance criteria:**
- [ ] Stripe webhook `checkout.session.completed` → `sendFulfillmentEmail(buyerEmail, product, orderId)`
- [ ] Resend email: subject "Your download is ready — {product.title}"; includes creator's name and a signed download link
- [ ] Download link: `createSignedUrl(products.file_url, 86400)` — valid 24 hours; `/api/download?orderId=` validates ownership
- [ ] Email sent within 30 seconds of webhook receipt; Resend delivery receipt logged to `email_events` table
- [ ] TypeScript: `sendFulfillmentEmail(email: string, product: Product, orderId: string): Promise<void>`
- [ ] If Resend API call fails: error logged to Supabase `error_log`; webhook still returns 200 (no retry loop)

---

## Epic 4: Audience Automation

### Story 4.1 — Tag Subscribers by Purchase
**As a** creator,
**I want** to automatically tag subscribers based on purchase history,
**so that** I can send targeted sequences to buyers of specific products.

**Acceptance criteria:**
- [ ] Tag format: `customer:{productSlug}`; e.g., `customer:writing-masterclass`, `customer:lightroom-presets`
- [ ] Tags stored as `text[]` in `subscribers.tags`; Supabase query: `.contains('tags', ['customer:writing-masterclass'])`
- [ ] `tagSubscriber` is idempotent: `array_append` only if tag not already in array (Postgres: `WHERE NOT (tags @> ARRAY[$tag]::text[])`)
- [ ] Creator dashboard "Audience" tab shows tag breakdown: list of tags + subscriber count per tag
- [ ] TypeScript: `AudienceSegment = { tag: string; count: number }[]` — sorted by `count` descending
- [ ] Tags visible to creator only; never exposed in public API responses

### Story 4.2 — First-Time Buyer Thank You Sequence
**As a** creator,
**I want** to trigger a "Thank You" email sequence for first-time buyers,
**so that** I build a relationship immediately after the sale.

**Acceptance criteria:**
- [ ] "First-time buyer" defined as: `transactions` count for this `subscriber_id` is exactly `1` after the current purchase
- [ ] After tagging, webhook checks `SELECT COUNT(*) FROM transactions WHERE subscriber_id = $1` — if result = 1, queue welcome email
- [ ] Welcome email sent via Resend 10 minutes after purchase (scheduled via Vercel Cron or Resend's scheduled send)
- [ ] Welcome email subject: "Thank you for your purchase, {firstName}" — falls back to "Thank you for your purchase" if `firstName` is null
- [ ] Repeat buyers receive the fulfillment email only — no second welcome sequence triggered
- [ ] TypeScript: `isFirstTimeBuyer(subscriberId: string): Promise<boolean>` — returns `true` only when transaction count = 1

### Story 4.3 — Already Purchased State
**As a** returning fan,
**I want** product cards to show "Already purchased" when I've bought something before,
**so that** I don't accidentally pay twice.

**Acceptance criteria:**
- [ ] Authenticated user: product page queries `SELECT id FROM transactions WHERE subscriber_id = $1 AND product_id = $2 LIMIT 1`
- [ ] If row found: "Buy Now" button replaced with "Already Purchased ✓" — disabled, `cursor: not-allowed`
- [ ] Unauthenticated user: "Buy Now" shown normally; no pre-check
- [ ] "Already Purchased" badge: `background: var(--color-success-bg); color: var(--color-success-text)`; no hex values
- [ ] TypeScript: `hasPurchased(subscriberId: string, productId: string): Promise<boolean>`
- [ ] State check is server-side in the page component; not a client-side effect after hydration
