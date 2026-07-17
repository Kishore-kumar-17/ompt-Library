# 05 — Epics & Stories
## Work Breakdown · sbecom_platform_02
### ChaiRitual Beverage Subscription · D2C Tea + Razorpay

---

## Epic 1: The Ritualistic Marketplace

### Story 1.1 — Ritual-Based Product Browse
**As a** tea lover,
**I want** to browse products organised by daily ritual,
**so that** I find the right tea for the right moment without sifting through a generic catalogue.

**Acceptance criteria:**
- [ ] Homepage sections: "Morning Ritual", "Quick Fix", "Snack Time" — each maps to `products.format` filter
- [ ] "Morning Ritual" → `format = 'loose-leaf'`; "Quick Fix" → `format = 'instant'`; "Snack Time" → bundled items
- [ ] `pantryStore.fetchByRitual(ritual: 'morning' | 'quick-fix' | 'snack')` calls Supabase `.eq('format', mappedFormat)`
- [ ] TypeScript: `type TeaRitual = 'morning' | 'quick-fix' | 'snack'`; `type TeaFormat = 'instant' | 'loose-leaf' | 'tea-bags'`
- [ ] Section headings: serif font, earthy tones, `max-width: 1200px` container
- [ ] Product cards display: product image, title, `base_price_cents` formatted in INR (₹), "Bestseller" badge if `is_bestseller = true`

### Story 1.2 — Bestseller Ratings
**As a** first-time visitor,
**I want** to see verified bestseller products with customer ratings,
**so that** I can quickly identify the most popular teas.

**Acceptance criteria:**
- [ ] "Bestseller" badge: `products.is_bestseller = true`; amber background `var(--color-amber-bg)`; dark text — no white-on-amber
- [ ] Star rating: stored as `products.rating_avg numeric(3,2)` and `products.rating_count integer`; updated by trigger on review insert
- [ ] Stars rendered via `Math.round(rating_avg)` filled stars + `5 - rounded` empty stars; `aria-label="{rating_avg} out of 5 stars"`
- [ ] "Bestseller" homepage section: Supabase query `.eq('is_bestseller', true).order('rating_avg', { ascending: false }).limit(6)`
- [ ] TypeScript: `Product = { id: string; title: string; format: TeaFormat; basePriceCents: number; isBestseller: boolean; ratingAvg: number; ratingCount: number }`
- [ ] Rating count shown as "(420 reviews)" — not "420 ratings"

### Story 1.3 — Product Page (LDP)
**As a** buyer,
**I want** to view a high-quality product page before I subscribe,
**so that** I feel confident about the aroma and quality before purchasing.

**Acceptance criteria:**
- [ ] Product page `/products/[slug]`; ISR `revalidate = 300`; `generateMetadata` populates OG title and description
- [ ] Hero image: `aspect-ratio: 1 / 1`; `object-fit: cover`; Next.js `<Image>` with `priority` on above-fold image
- [ ] "Subscribe & Save" toggle visible on product page; default state: OFF; toggling updates displayed price
- [ ] Price display: toggle OFF → base price; toggle ON → `basePriceCents * (1 - subscriptionDiscountPercent / 100)` in INR
- [ ] `subscription_discount_percent` default: `15`; badge shows "Save 15%" when toggle is ON
- [ ] TypeScript: `discountedPrice(baseCents: number, discountPct: number): number` — `Math.round(baseCents * (1 - discountPct / 100))`

---

## Epic 2: Subscribe and Save

### Story 2.1 — Subscribe & Save Toggle
**As a** daily drinker,
**I want** to toggle "Subscribe & Save" on any product to get a 15% discount,
**so that** I save money on my regular order while committing to monthly delivery.

**Acceptance criteria:**
- [ ] Toggle is a Radix UI `<Switch>`; `aria-label="Subscribe & Save — save 15%"` on the switch element
- [ ] `subscriptionStore.isSubscription: boolean` in Zustand; toggle sets this flag
- [ ] When `isSubscription = true`: frequency selector appears: "Every 4 weeks" / "Every 8 weeks" / "Every 12 weeks"
- [ ] Frequency stored as `subscriptions.frequency_weeks: 4 | 8 | 12`
- [ ] `isSubscription` state passed to `POST /api/cart/add`; cart item carries `subscription: true | false`
- [ ] TypeScript: `SubscriptionConfig = { isSubscription: boolean; frequencyWeeks: 4 | 8 | 12 | null }`

### Story 2.2 — My Rituals Dashboard
**As a** subscriber,
**I want** to manage all my active subscriptions in one dashboard,
**so that** I can skip, swap, or cancel without contacting support.

**Acceptance criteria:**
- [ ] Dashboard `/account/rituals`; fetches `SELECT * FROM subscriptions WHERE user_id = $1 AND status = 'active'`
- [ ] Each subscription card shows: product name, frequency, next delivery date (`next_delivery_date`), status badge
- [ ] "Skip next delivery" button calls `POST /api/subscriptions/skip`; sets `next_delivery_date` to `next_delivery_date + frequency_weeks * 7 days`
- [ ] "Swap Flavour" button opens a product picker modal filtered to the same `format` as the current product
- [ ] "Pause" button: sets `subscriptions.status = 'paused'`; Razorpay mandate not cancelled — pausing is a platform-level hold
- [ ] TypeScript: `Subscription = { id: string; productId: string; frequencyWeeks: number; nextDeliveryDate: string; status: 'active' | 'paused' | 'cancelled' }`

### Story 2.3 — Pre-Charge Notification
**As a** subscriber,
**I want** to receive a notification 2 days before my next charge,
**so that** I'm never surprised by a payment I forgot about.

**Acceptance criteria:**
- [ ] Cron runs daily: `SELECT * FROM subscriptions WHERE status = 'active' AND next_delivery_date = CURRENT_DATE + 2`
- [ ] For each match: Resend sends email "Your ChaiRitual order charges in 2 days" with product name, amount, delivery date, "Skip Delivery" link
- [ ] "Skip Delivery" link in email is a one-click action URL: `/api/subscriptions/skip?token={signedToken}` — no login required
- [ ] `signedToken` is a HMAC-SHA256 of `subscriptionId + nextDeliveryDate` using `process.env.SKIP_TOKEN_SECRET`
- [ ] Token expires after 48 hours; expired token returns 410 with "This skip link has expired"
- [ ] TypeScript: `generateSkipToken(subscriptionId: string, deliveryDate: string): string`

---

## Epic 3: High-Value Gifting

### Story 3.1 — Free Gift Progress Bar
**As a** shopper,
**I want** to see how close I am to unlocking a free gift in my cart,
**so that** I'm motivated to add one more item to reach the threshold.

**Acceptance criteria:**
- [ ] `cartStore.subtotal` compared against `cart_rewards` thresholds sorted ascending
- [ ] Progress bar: `<progress value={subtotal} max={threshold} aria-label="Progress to free gift">`
- [ ] Label: "Add ₹{remaining} more to unlock {reward.label}" — `remaining = threshold - subtotal`
- [ ] When `subtotal >= threshold`: bar fills; free gift auto-added to cart as a `0`-price line item; label changes to "{reward.label} added! 🎉"
- [ ] If multiple thresholds: only the next unclaimed threshold is shown; prior rewards stay in cart
- [ ] TypeScript: `CartReward = { thresholdCents: number; rewardProductId: string; label: string }`; `nextReward(subtotal: number, rewards: CartReward[]): CartReward | null`

### Story 3.2 — Gift Note and Premium Packaging
**As a** gift buyer,
**I want** to add a personalised gift note and select premium packaging,
**so that** my gift arrives as a polished, thoughtful present.

**Acceptance criteria:**
- [ ] "This is a gift" checkbox in cart; checking reveals: gift note textarea (max 200 chars) + packaging upgrade option
- [ ] Packaging upgrade: "Premium Jute Bag (+₹99)" — adds a `packaging_upgrade` product at ₹99 as a line item
- [ ] Gift note stored on `orders.gift_note text`; printed on packing slip (fulfilment team instruction in `07_Guide.md`)
- [ ] TypeScript: `CartStore` extended with `isGift: boolean; giftNote: string; hasPackagingUpgrade: boolean`
- [ ] Gift note `<textarea>`: `border-radius: 4px` (earthy brand max-radius); max 200 chars; counter `{remaining}/200`
- [ ] "This is a gift" checkbox unchecked: gift note and packaging fields hidden (not rendered — conditional JSX, not `display:none`)

### Story 3.3 — Single-Page Safe Checkout
**As a** buyer,
**I want** a single-page checkout that saves my address for future orders,
**so that** repeat purchases are completed in under 30 seconds.

**Acceptance criteria:**
- [ ] Checkout page: one URL `/checkout`; all fields (address, payment) on a single page — no multi-step stepper
- [ ] Returning user: address auto-populated from `profiles.default_address jsonb` on page load
- [ ] "Save this address" checkbox (default checked); on order complete: `PATCH /api/profile` updates `default_address`
- [ ] Payment: Razorpay Checkout JS for Indian buyers; Stripe Payment Element fallback for non-Indian buyers (detected via `CF-IPCountry`)
- [ ] TypeScript: `CheckoutForm = { address: DeliveryAddress; saveAddress: boolean; paymentMethod: 'razorpay' | 'stripe' }`
- [ ] RLS: `profiles.default_address` readable and writable only by `auth.uid() = id`

---

## Epic 4: Pantry Management

### Story 4.1 — Skip Monthly Delivery
**As a** subscriber,
**I want** to skip a delivery with one click when I'm on vacation,
**so that** I don't pay for a box I can't use.

**Acceptance criteria:**
- [ ] "Skip" button on each subscription card in `/account/rituals`; single click — no confirmation modal
- [ ] `POST /api/subscriptions/skip` advances `next_delivery_date` by `frequency_weeks * 7` days
- [ ] Razorpay e-mandate is NOT cancelled on skip; the next charge triggers on the new delivery date
- [ ] Toast: "Delivery skipped. Next delivery: {newDate}." — date formatted as "12 May 2026"
- [ ] Skip can be undone before the original delivery date: "Undo Skip" sets `next_delivery_date` back to original
- [ ] TypeScript: `skipDelivery(subscriptionId: string): Promise<Date>` — returns the new `next_delivery_date`

### Story 4.2 — Flavour Swap
**As a** subscriber,
**I want** to swap the product in my subscription,
**so that** I can try a different variety without cancelling and restarting.

**Acceptance criteria:**
- [ ] "Swap" opens a modal listing products with the same `format` as the current subscription product
- [ ] `GET /api/products?format={currentFormat}&exclude={currentProductId}` returns swap candidates
- [ ] On swap confirm: `subscriptions.product_id` updated; effective next delivery date shown
- [ ] Razorpay mandate amount unchanged; swap does not change subscription price (same format = same price tier)
- [ ] If new product has a different price: user shown price diff and must confirm; Razorpay mandate updated via mandate amendment flow
- [ ] TypeScript: `swapProduct(subscriptionId: string, newProductId: string): Promise<void>`

### Story 4.3 — Update UPI Mandate
**As a** subscriber,
**I want** to update my UPI ID or switch to a different payment method,
**so that** my subscription continues when my bank account changes.

**Acceptance criteria:**
- [ ] "Update Payment" in `/account/rituals` links to Razorpay's hosted mandate update page for Razorpay subscriptions
- [ ] Razorpay mandate update: call `razorpay.subscriptions.update(subscriptionId, { payment_method: 'upi', upi_mandate: { customer_vpa: newUpi } })`
- [ ] For non-Razorpay (Stripe): Stripe SetupIntent flow to replace payment method; existing subscription updated via `stripe.subscriptions.update()`
- [ ] Payment method displayed as masked UPI: `{first4chars}****@{vpa_suffix}` — not the full VPA
- [ ] Update confirmation email sent via Resend: "Your payment method has been updated"
- [ ] TypeScript: `PaymentMethod = { type: 'upi'; maskedVpa: string } | { type: 'card'; last4: string; brand: string }`
