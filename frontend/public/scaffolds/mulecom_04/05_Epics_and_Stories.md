# 05 — Epics and Stories
## Work Breakdown · mulecom_platform_04
### Artisan Empowerment Marketplace · Payout Transparency + Non-Returnable Logic

---

## Epic 1 — Discovery Confidence

### Story 1.1 — Taxonomy and Faceted Discovery
**As a** buyer,
**I want** to discover artisan products through craft and category taxonomy with faceted filters,
**so that** I find handcrafted items that match my intent and values.

**Acceptance criteria:**
- [ ] Homepage: craft rail (linked to `/search?craft={value}`) + category cluster grid (e.g., "Apparel", "Home Décor", "Jewellery")
- [ ] PLP facets: craft (multi-select array), category, size, price range, return eligibility (boolean), ready-to-ship
- [ ] Multi-craft products: `listings.craft_tags text[]`; filter uses `.contains('craft_tags', [craftValue])` — not equality
- [ ] `ready-to-ship` filter: `.lte('dispatch_days', 2)` — derived from `dispatch_days`, not a stored boolean
- [ ] URL shareable: `/search?craft=kalamkari&returns=true&price_max=5000`; params server-readable on page load
- [ ] TypeScript: `FacetState = { craft: string[]; category: string | null; size: string | null; returnsOnly: boolean; priceMax: number | null }`

### Story 1.2 — Artisan Story on Listing Cards
**As a** buyer,
**I want** listing cards to hint at the artisan and craft origin,
**so that** I feel a connection to who made the item before I open the listing.

**Acceptance criteria:**
- [ ] Card footer: artisan first name + craft tag (e.g., "By Rekha · Block Print") in `var(--color-text-secondary)`
- [ ] Artisan name sourced from `shops.artisan_name text`; if null, falls back to `shops.display_name`
- [ ] "Handmade" badge shown when `listings.is_handmade = true`; badge: `var(--color-brand-bg)` background, contrasting text
- [ ] TypeScript: `ListingCard` extended: `artisanName: string; craftTag: string | null; isHandmade: boolean`
- [ ] Card image: `aspect-ratio: 3/4`; `object-fit: cover`; Next.js `<Image>` with `sizes="(max-width: 640px) 50vw, 25vw"`
- [ ] No `<img>` tags; `grep -r "<img " src/components/listing/ListingCard` → zero results

---

## Epic 2 — Listing Confidence (LDP)

### Story 2.1 — Pincode Checker with Courier Detail
**As a** buyer,
**I want** to check pincode serviceability and see which courier handles my delivery,
**so that** I can trust the delivery commitment before purchasing.

**Acceptance criteria:**
- [ ] `POST /api/pincode-check`: accepts `{ pincode: string; listingId: string }`; returns `{ serviceable: boolean; estimatedDays: number | null; courierPartner: string | null }`
- [ ] Pincode validated: `^[1-9][0-9]{5}$`; invalid pincode shows "Please enter a valid 6-digit pincode" before API call
- [ ] Serviceable: "Delivered in {estimatedDays} days via {courierPartner}" — exact copy; `estimatedDays` includes dispatch days + transit days
- [ ] Unserviceable: "Delivery not available to {pincode}" — no alternative upsell
- [ ] Result cached in `sessionStorage` key `pc:{pincode}:{listingId}` for session duration
- [ ] TypeScript: `PincodeResult = { serviceable: boolean; estimatedDays: number | null; courierPartner: string | null }`

### Story 2.2 — Non-Returnable Item Handling
**As a** buyer,
**I want** clear indication when a handmade item cannot be returned,
**so that** I make a fully informed purchase decision.

**Acceptance criteria:**
- [ ] `listings.return_status: 'returnable' | 'non_returnable' | 'exchange_only'` — three distinct values; not a boolean
- [ ] `returnable`: "Returns accepted within {window} days of delivery" in a green-tinted block
- [ ] `non_returnable`: "This handmade item cannot be returned. Defects are covered under our Artisan Promise." — verbatim copy; amber-tinted block
- [ ] `exchange_only`: "Exchange accepted within {window} days — no refunds on handmade items" — distinct amber block
- [ ] All three states visible above fold at 375px; `<section aria-label="Return policy">` wrapper
- [ ] TypeScript: `type ReturnStatus = 'returnable' | 'non_returnable' | 'exchange_only'`; no boolean `returns_accepted` field on this scaffold

---

## Epic 3 — Checkout Reliability

### Story 3.1 — Server Quote Validation
**As a** system,
**I want** all checkout amounts derived from a server-authoritative quote,
**so that** price drift or client manipulation cannot cause incorrect charges.

**Acceptance criteria:**
- [ ] `POST /api/quote`: re-reads `listing_variants.price_cents` from DB; computes per-seller shipping; returns `QuoteSnapshot`
- [ ] `QuoteSnapshot` stored; Stripe session amount set from `quote.grandTotalCents`; client-provided amounts ignored
- [ ] Price drift → 409 with `{ error: 'PRICE_CHANGED', diff: UpdatedLine[] }`
- [ ] `quote_snapshots.used_at` set on webhook; reuse → 410
- [ ] TypeScript: `QuoteSnapshot = { id: string; grandTotalCents: number; lineItems: QuoteLine[]; shippingCents: number; createdAt: Date; usedAt: Date | null }`
- [ ] `grep -r "amount.*req.body\|amount.*params" src/app/api/checkout` → zero results (no client-supplied amount used)

### Story 3.2 — Prepaid and COD Branching with Non-Returnable Guard
**As a** buyer,
**I want** to complete checkout with my preferred payment method,
**so that** I can pay in a way that suits my comfort level.

**Acceptance criteria:**
- [ ] Prepaid: Stripe PaymentIntent → `orders.status = 'awaiting_shipment'` on webhook success
- [ ] COD: no Stripe call → `orders.status = 'cod_pending'`; COD handling fee as line item in quote
- [ ] `orders.payment_mode: 'prepaid' | 'cod'`; COD path never calls Stripe API
- [ ] Non-returnable item in cart + COD selected: warning banner "Non-returnable items cannot be refunded on COD orders" — checkout proceeds; buyer must acknowledge
- [ ] Acknowledgement: `<input type="checkbox">` "I understand non-returnable items bought on COD cannot be refunded" — required before "Place Order" enabled
- [ ] TypeScript: `type OrderStatus = 'awaiting_shipment' | 'cod_pending' | 'cod_confirmed' | 'dispatched' | 'delivered' | 'cancelled' | 'returned'`

---

## Epic 4 — Returns and Support

### Story 4.1 — Return Eligibility Enforcement
**As a** buyer,
**I want** the return request flow to enforce the listing's return policy,
**so that** I can only request returns for items that qualify.

**Acceptance criteria:**
- [ ] Return CTA shown only if `listing.return_status = 'returnable'` AND `order.delivered_at > now() - return_window_days`
- [ ] `exchange_only` items: return form type locked to "Exchange" — "Return for refund" option not rendered
- [ ] `non_returnable` items: no return CTA; "This item cannot be returned" label instead — `cursor: not-allowed` on greyed label
- [ ] `returns.type: 'return' | 'exchange'`; server validates `type` against `listing.return_status` — client override rejected with 400
- [ ] TypeScript: `validateReturnEligibility(listing: Listing, order: Order, requestType: 'return' | 'exchange'): { eligible: boolean; reason: string }`
- [ ] `exchange_pending` and `refund_pending` are distinct statuses; never collapsed into a single `'processing'`

### Story 4.2 — Artisan Promise Support Path
**As a** buyer,
**I want** to raise a defect claim on a non-returnable handmade item under the "Artisan Promise",
**so that** I have recourse when a handmade item is genuinely defective.

**Acceptance criteria:**
- [ ] "Report a defect" CTA visible on non-returnable item orders — distinct from the standard return flow
- [ ] Defect claim form: description (max 500 chars) + photo upload (max 3 images, ≤ 5MB each, JPEG/PNG only)
- [ ] Creates `defect_claims` table row: `{ id, order_item_id, description, photo_urls text[], status: 'submitted' | 'under_review' | 'approved' | 'rejected', created_at }`
- [ ] Approved defect claim: platform initiates store credit refund regardless of payment mode (COD or prepaid)
- [ ] TypeScript: `DefectClaimStatus = 'submitted' | 'under_review' | 'approved' | 'rejected'`
- [ ] `defect_claims` RLS: readable only by `auth.uid() = user_id` on the parent order

### Story 4.3 — Support Ticket Timeline
**As a** buyer or seller,
**I want** to view support ticket status and updates in an auditable timeline,
**so that** I can follow case progress without contacting support repeatedly.

**Acceptance criteria:**
- [ ] Ticket status machine: `open → in_progress → awaiting_buyer → resolved | escalated`
- [ ] `support_events` table: `{ id, ticket_id, actor_role, status_from, status_to, note, created_at }`; every transition logged
- [ ] Timeline `<ol>`: sorted oldest-first; each item: timestamp, actor ("You" / "Support Team"), status label, note
- [ ] Escalated ticket SLA: "Escalated cases are reviewed within 3 business days" — visible on the ticket detail page
- [ ] TypeScript: `TicketStatus = 'open' | 'in_progress' | 'awaiting_buyer' | 'resolved' | 'escalated'`
- [ ] RLS: `support_tickets` visible to the buyer (`user_id = auth.uid()`) and `admin` role only

---

## Epic 5 — Seller Operations

### Story 5.1 — Listing and Dispatch Management
**As a** seller,
**I want** to manage my artisan listings and dispatch orders from a single dashboard,
**so that** I can fulfil orders accurately and keep my catalogue current.

**Acceptance criteria:**
- [ ] `/seller/dashboard/listings`: table — title, `is_handmade` badge, `return_status` tag, stock, price (INR), status, edit action
- [ ] `return_status` rendered as a colour-coded tag: `returnable` = green, `exchange_only` = amber, `non_returnable` = red
- [ ] Inline stock update: `<input type="number">` on stock cell; `PATCH /api/seller/listings/[id]/stock`; `revalidatePath` on update
- [ ] Order dispatch: "Mark Dispatched" requires courier name + tracking number; `orders.fulfillment_status = 'dispatched'`; buyer email sent
- [ ] RLS: seller reads/writes listings where `shop.owner_id = auth.uid()` only
- [ ] TypeScript: `SellerListing = { id: string; title: string; isHandmade: boolean; returnStatus: ReturnStatus; inventoryCount: number; priceCents: number }`

### Story 5.2 — Payout Transparency (Artisan Empowerment)
**As a** seller,
**I want** to see gross earnings, platform fees, and net payout clearly labelled,
**so that** I trust the platform and can verify what I'm paid.

**Acceptance criteria:**
- [ ] Dashboard "My Earnings" tab: settlement table — period, orders, gross (INR), platform fee, COD handling fee, return debits, **net payout** — all six columns
- [ ] "Artisan Earning Rate" displayed: `(netPayout / grossRevenue * 100).toFixed(1)%` — e.g., "Artisan Earning Rate: 82.3%" — platform empowerment metric
- [ ] `calculateArtisanNet(grossCents: number, platformFeePct: number, codFeeCents: number, returnDebitCents: number): number`
- [ ] Pending payout: "Expected by {date}" with "How payouts work" info link to policy page
- [ ] Payout history: each paid settlement shows gross, net, bank reference, date paid — all four fields
- [ ] TypeScript: `EarningsSummary = { periodLabel: string; grossCents: number; platformFeeCents: number; codFeeCents: number; returnDebitCents: number; netCents: number; artisanEarningRatePct: number }`
