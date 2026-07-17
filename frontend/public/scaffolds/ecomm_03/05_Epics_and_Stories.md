# 05 — Epics and Stories
## Work Breakdown · ecomm_platform_03
### Functional Beverage D2C Platform · Better-for-You Soda

---

## Epic 1 — Discovery and Merchandising

### Story 1.1 — Homepage Flavor Discovery
**As a** first-time shopper,
**I want** to discover flavors quickly from the homepage,
**so that** I can find something appealing before committing to read the full catalogue.

**Acceptance criteria:**
- [ ] Homepage: hero section, flavor rail (`<ul>` of product cards), benefits strip, testimonials, subscription strip — in that DOM order
- [ ] Flavor rail: horizontal scroll on mobile (`overflow-x: auto; scroll-snap-type: x mandatory`); 4-column grid on desktop
- [ ] Each flavor card: product image (`aspect-ratio: 1/1`), flavor name, pack sizes available ("12pk, 24pk"), price starting at, "Quick Add" CTA
- [ ] "Quick Add" adds the default variant (smallest pack, one-time) to cart via `cartStore.addItem(defaultVariant, 1)` — no modal
- [ ] Default variant: `sku_variants` where `pack_size = MIN(pack_sizes)` and `purchase_type = 'one_time'`
- [ ] TypeScript: `FlavorCard = { id: string; name: string; imageUrl: string; packOptions: string[]; startingPriceCents: number; defaultVariantId: string }`

### Story 1.2 — PLP with Filters
**As a** shopper,
**I want** to filter the catalogue by dietary tags, pack size, and caffeine content,
**so that** I narrow results to products that match my lifestyle.

**Acceptance criteria:**
- [ ] PLP `/collections/all` — URL params: `?flavor=&pack=&caffeine=yes|no&tag={dietaryTag}`
- [ ] Filter chips: Flavor (multi), Pack Size (multi), Caffeine (toggle), Dietary tags (multi: "Vegan", "No Artificial Sweeteners", "Low Calorie")
- [ ] Filter state reflected in URL via `router.replace`; survives page refresh via server component param reading
- [ ] Dietary tags stored as `products.dietary_tags text[]`; filter uses `.contains('dietary_tags', [tag])` — not equality
- [ ] "Load more" pagination: "Load more" button at bottom; appends next 12 products; no infinite scroll
- [ ] TypeScript: `PLPFilters = { flavor: string[]; pack: string[]; caffeine: boolean | null; dietaryTags: string[] }`

---

## Epic 2 — Product Evaluation (PDP)

### Story 2.1 — Flavor and Pack Selector with SKU Mapping
**As a** shopper,
**I want** to select a flavor and pack size and see the correct price update immediately,
**so that** I always know what I'm adding to cart.

**Acceptance criteria:**
- [ ] Flavor selector: image tiles; selecting a flavor updates the hero image and `selectedVariantId`
- [ ] Pack selector: radio buttons ("12 pack", "24 pack", "48 pack"); selecting updates price display
- [ ] `selectedVariantId` derived from current `{ flavorId, packSizeId }` pair via `sku_variants` lookup
- [ ] Unavailable combination (out of stock): add-to-cart button disabled; label "Out of stock"; selection visually dimmed
- [ ] TypeScript: `SKUVariant = { id: string; flavorId: string; packSizeId: string; priceCents: number; inventoryCount: number; sku: string }`
- [ ] `resolveVariant(flavorId: string, packId: string, variants: SKUVariant[]): SKUVariant | null` — returns `null` for unavailable combinations

### Story 2.2 — PurchaseModelToggle (One-Time vs Subscribe)
**As a** shopper,
**I want** to toggle between a one-time purchase and a subscription before adding to cart,
**so that** I see the subscription savings clearly and can choose with full information.

**Acceptance criteria:**
- [ ] `PurchaseModelToggle` renders two options: "Buy once" and "Subscribe & Save {pct}%"; default "Buy once"
- [ ] `type PurchaseModel = 'one_time' | 'subscribe'` — TypeScript enum; not a boolean
- [ ] When `subscribe` selected: cadence selector appears below ("Every 2 weeks" / "Every 4 weeks" / "Every 8 weeks")
- [ ] `type Cadence = 2 | 4 | 8` (weeks); cadence selector hidden when `one_time` is active — conditional JSX, not `display:none`
- [ ] Price display updates: `one_time` shows full price; `subscribe` shows discounted price + "per delivery" label
- [ ] Cart payload: `{ variantId, qty, purchaseModel: PurchaseModel, cadenceWeeks: Cadence | null }` — `cadenceWeeks: null` for one-time

---

## Epic 3 — Trust and Product Facts

### Story 3.1 — Ingredient Panel Above Fold
**As a** shopper,
**I want** to read ingredient and nutrition details without scrolling,
**so that** I can evaluate the product's health claims before deciding to buy.

**Acceptance criteria:**
- [ ] Ingredient panel visible above the fold at 375px and 768px viewports — not inside an accordion by default
- [ ] Ingredients text sourced from `nutrition_profiles.ingredients_text`; rendered as plain text paragraph
- [ ] Key claims rendered as icon + label badges below the ingredient text (e.g., "No artificial sweeteners", "5 calories per can")
- [ ] Claims sourced from `products.dietary_tags text[]`; tag-to-label mapping in a `DIETARY_TAG_LABELS` const — no hardcoded strings in JSX
- [ ] No medical or disease-treatment language in any claim badge — content gate enforced in admin CMS
- [ ] TypeScript: `NutritionProfile = { productId: string; ingredientsText: string; caloriesPerServing: number; servingSize: string }`

### Story 3.2 — Nutrition Facts and FAQ Accordions
**As a** shopper,
**I want** to expand a Nutrition Facts panel and FAQ without leaving the PDP,
**so that** I can get deeper product information without a separate page.

**Acceptance criteria:**
- [ ] Nutrition Facts: Radix `<Accordion>` with `<AccordionItem value="nutrition">`; renders standard nutrition label layout
- [ ] FAQ: `<Accordion type="multiple">` (multiple items open simultaneously); items sourced from `products.faq_items jsonb` array
- [ ] `faq_items`: `{ question: string; answer: string }[]`; max 8 items per product
- [ ] Both accordions below the fold; above-fold content not pushed down by accordion expand
- [ ] `aria-expanded` correctly reflects open/closed state — Radix handles this automatically
- [ ] TypeScript: `FAQItem = { question: string; answer: string }`; `products.faqItems: FAQItem[]`

---

## Epic 4 — Checkout Reliability

### Story 4.1 — Server-Validated Quote
**As a** system,
**I want** checkout amounts validated server-side before any Stripe session is created,
**so that** stale cart prices or client manipulation cannot affect the charged amount.

**Acceptance criteria:**
- [ ] `POST /api/cart/quote`: re-reads `sku_variants.price_cents` from DB; applies subscription discount if `purchaseModel = 'subscribe'`
- [ ] Subscription discount rate sourced from `platform_settings.subscribe_discount_pct`; not hardcoded
- [ ] `POST /api/checkout/session`: creates Stripe session from quote total; `amount` never from client body
- [ ] `FREE_SHIPPING_THRESHOLD_CENTS` read from `process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CENTS` (default: 5000); not hardcoded
- [ ] Price drift → 409 `{ error: 'PRICE_CHANGED' }`; client re-renders cart totals
- [ ] TypeScript: `CartQuote = { lineItems: QuoteLine[]; subtotalCents: number; shippingCents: number; discountCents: number; totalCents: number }`

### Story 4.2 — Idempotent Webhook Handling
**As a** system,
**I want** Stripe webhooks to be idempotent,
**so that** duplicate event deliveries never create duplicate orders or subscriptions.

**Acceptance criteria:**
- [ ] Webhook signature verified: `stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)` — unsigned → 400
- [ ] Idempotency key: `processed_webhook_events` table: `{ stripe_event_id text UNIQUE, processed_at timestamp }`
- [ ] Handler: `SELECT FROM processed_webhook_events WHERE stripe_event_id = $1`; if row found → return 200 immediately without reprocessing
- [ ] Order creation: `INSERT INTO orders ... ON CONFLICT (stripe_checkout_session_id) DO NOTHING`
- [ ] Subscription creation: `INSERT INTO subscriptions ... ON CONFLICT (stripe_subscription_id) DO NOTHING`
- [ ] TypeScript: `WebhookEvent = { stripeEventId: string; type: string; processedAt: Date }`; handler returns `{ received: true }` in all non-error cases

---

## Epic 5 — Subscription Management

### Story 5.1 — Skip, Pause, Cancel from Account
**As a** subscriber,
**I want** to skip a delivery, pause, or cancel my subscription from my account dashboard,
**so that** I control my subscription without contacting support.

**Acceptance criteria:**
- [ ] `/account/subscriptions` lists active subscriptions: product name, cadence, next delivery date, status badge, three action buttons
- [ ] **Skip next delivery**: `POST /api/subscriptions/skip` — advances `next_delivery_date` by `cadenceWeeks * 7` days; Stripe subscription NOT paused
- [ ] **Pause**: `POST /api/subscriptions/pause` — `stripe.subscriptions.update(id, { pause_collection: { behavior: 'void' } })`; local `subscriptions.status = 'paused'`
- [ ] **Cancel**: `POST /api/subscriptions/cancel` — `stripe.subscriptions.cancel(id)`; confirmation modal required before API call
- [ ] All three actions reflected in the account UI immediately after success (optimistic update not required — wait for server response)
- [ ] TypeScript: `type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'past_due'`; `type SubscriptionAction = 'skip' | 'pause' | 'cancel'`

### Story 5.2 — Cadence Change
**As a** subscriber,
**I want** to change my delivery cadence without cancelling and restarting,
**so that** I adjust my subscription to my changing consumption rate.

**Acceptance criteria:**
- [ ] "Change frequency" link on each subscription card; opens a cadence selector: "Every 2 weeks" / "Every 4 weeks" / "Every 8 weeks"
- [ ] `POST /api/subscriptions/cadence`: `stripe.subscriptions.update(id, { items: [{ id: itemId, price: newPriceId }] })` — cadence maps to a distinct Stripe price ID per cadence
- [ ] Price ID mapping: `CADENCE_PRICE_MAP: Record<Cadence, string>` sourced from env vars, not hardcoded
- [ ] `subscriptions.cadence_weeks` updated in DB after Stripe update succeeds
- [ ] Effective date note: "Your new frequency starts from your next billing date" — no proration on cadence change
- [ ] TypeScript: `changeCadence(subscriptionId: string, newCadence: Cadence): Promise<void>`; `type Cadence = 2 | 4 | 8`
