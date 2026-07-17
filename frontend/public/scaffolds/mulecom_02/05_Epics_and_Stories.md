# 05 — Epics and Stories
## Work Breakdown · mulecom_platform_02
### Curated Artisan Marketplace · COD + Prepaid · INR

---

## Epic 1 — Craft Discovery

### Story 1.1 — Category and Craft Taxonomy Filtering
**As a** buyer,
**I want** to filter the catalogue by craft type, category, size, and return eligibility,
**so that** I find relevant artisan products without browsing every listing.

**Acceptance criteria:**
- [ ] PLP URL: `/search?category={}&craft={}&size={}&returns=true&price_min={}&price_max={}`; all params are server-readable on load
- [ ] Facet state survives page refresh: `useSearchParams()` reads params on mount; initial fetch passes them server-side
- [ ] Multi-value facets (size, craft): `listings.craft_tags text[]` — filter uses `.contains('craft_tags', [selectedCraft])`; not equality check
- [ ] Active facets shown as dismissible chips; removing a chip calls `router.replace` with that param removed
- [ ] TypeScript: `PLPParams = { category?: string; craft?: string[]; size?: string; returns?: boolean; price_min?: number; price_max?: number }`
- [ ] Zero-results state: "No {category} items found — try removing a filter"; no sponsored or OOT recommendations

### Story 1.2 — Craft PLP Cards
**As a** buyer,
**I want** listing cards to show dispatch window and return tag,
**so that** I can compare delivery confidence at a glance without opening each listing.

**Acceptance criteria:**
- [ ] Card: image (`aspect-ratio: 3/4`), title `<h3>`, price in INR (`₹{amount}`), dispatch tag ("Ships in X days"), return tag ("Returns accepted" / "No returns")
- [ ] Return tag colour: "Returns accepted" → `var(--color-success-bg)` text; "No returns" → `var(--color-text-muted)` — no hex values
- [ ] Dispatch tag sourced from `listings.dispatch_days integer`; rendered as "Ships in {dispatch_days} days"
- [ ] TypeScript: `ListingCard = { id: string; title: string; imageUrl: string; priceCents: number; dispatchDays: number; returnsAccepted: boolean }`
- [ ] `grep -r "border-radius: [^0-9]" src/components/listing/ListingCard` — all values must be numeric px tokens

---

## Epic 2 — Listing Confidence (LDP)

### Story 2.1 — Pincode Delivery Checker
**As a** buyer,
**I want** to enter my pincode and see delivery availability and estimated date,
**so that** I know the item can reach me before adding it to my bag.

**Acceptance criteria:**
- [ ] Pincode input: 6-digit numeric only (`pattern="[0-9]{6}"`); inline validation before API call
- [ ] `POST /api/pincode-check` accepts `{ pincode: string; listingId: string }`; returns `{ serviceable: boolean; estimatedDays: number | null; courierName: string | null }`
- [ ] Serviceable: "Delivery by {estimatedDate} via {courierName}" — date formatted as "Mon, 12 May"
- [ ] Unserviceable: "Delivery not available to {pincode}" — no alternative pincode suggestion in V1
- [ ] Pincode result cached in `sessionStorage` keyed by `{pincode}:{listingId}` for the session duration
- [ ] TypeScript: `PincodeResult = { serviceable: boolean; estimatedDays: number | null; courierName: string | null }`

### Story 2.2 — Dispatch Timeline and Return Eligibility Block
**As a** buyer,
**I want** to see dispatch timing and return eligibility above the fold on the listing page,
**so that** I can commit to a purchase with full policy awareness.

**Acceptance criteria:**
- [ ] Dispatch block: "Usually ships in {dispatch_days} working days" with an info icon linking to seller policy
- [ ] Return eligibility: "Returns accepted within {return_window} days" if `listings.returns_accepted = true`; "This item is non-returnable" if false
- [ ] Both blocks visible above the fold at 375px (mobile) and 768px (tablet) — no scroll required
- [ ] Return block uses a `<section aria-label="Return policy">` wrapper; not a tooltip or popover
- [ ] `grep -r "display:none\|display: none" src/components/listing/PolicyBlock` → zero results
- [ ] TypeScript: `ListingPolicy = { dispatchDays: number; returnsAccepted: boolean; returnWindowDays: number | null }`

---

## Epic 3 — Checkout Reliability

### Story 3.1 — Server Quote and Total Consistency
**As a** system,
**I want** all checkout totals to be validated server-side before payment is created,
**so that** stale cart prices or client manipulation cannot cause incorrect charges.

**Acceptance criteria:**
- [ ] `POST /api/quote` re-fetches `listing_variants.price_cents` and shipping rules from DB; builds snapshot
- [ ] Quote snapshot: `{ id, line_items: { variantId, qty, unitPriceCents, lineTotalCents }[], shippingCents, grandTotalCents, createdAt }`
- [ ] Checkout session/payment intent amount set from `quote.grandTotalCents` — never from client payload amount
- [ ] Price drift: if any variant price changed since cart was last fetched, `POST /api/quote` returns 409 `{ error: 'PRICE_CHANGED' }`
- [ ] TypeScript: `QuoteLine = { variantId: string; qty: number; unitPriceCents: number; lineTotalCents: number }`
- [ ] `quote_snapshots.used_at` set on webhook success; reuse rejected with 410

### Story 3.2 — COD and Prepaid Payment Branching
**As a** buyer,
**I want** to choose between Cash on Delivery and prepaid payment at checkout,
**so that** I can pay in the way that suits my preference.

**Acceptance criteria:**
- [ ] Payment mode selector: two radio options "Pay Online" and "Cash on Delivery"; default "Pay Online"
- [ ] Prepaid path: Stripe Payment Intent created; `orders.payment_mode = 'prepaid'`; `orders.status = 'awaiting_shipment'` after webhook success
- [ ] COD path: no Stripe call; `orders.payment_mode = 'cod'`; `orders.status = 'cod_pending'` on order creation
- [ ] COD order confirmed to `cod_confirmed` only when seller marks dispatch; never auto-confirmed
- [ ] TypeScript: `type PaymentMode = 'prepaid' | 'cod'`; `type OrderStatus = 'awaiting_shipment' | 'cod_pending' | 'cod_confirmed' | 'dispatched' | 'delivered' | 'cancelled' | 'returned'`
- [ ] COD path does not call `stripe.paymentIntents.create` — verified by no Stripe import in `src/lib/cod.ts`

---

## Epic 4 — Returns and Support

### Story 4.1 — Return Request Lifecycle
**As a** buyer,
**I want** to request a return or exchange from my order and track the resolution,
**so that** I can resolve issues without contacting support manually.

**Acceptance criteria:**
- [ ] Return request form on `/account/orders/[id]`: type selector ("Return for refund" / "Exchange"), reason, optional photo upload
- [ ] Return eligibility gated: button shown only if `listings.returns_accepted = true` and `order.delivered_at > now() - {return_window} days`
- [ ] `returns` table status machine: `requested → under_review → approved | rejected → refund_pending | exchange_pending → resolved`
- [ ] `exchange_pending` and `refund_pending` are distinct states — never collapsed into a single "processing" status
- [ ] TypeScript: `type ReturnStatus = 'requested' | 'under_review' | 'approved' | 'rejected' | 'refund_pending' | 'exchange_pending' | 'resolved'`
- [ ] Invalid status transition returns 422 `{ error: 'INVALID_TRANSITION', from: current, to: attempted }`

### Story 4.2 — Refund vs Store Credit Branching
**As a** buyer,
**I want** my return resolved with refund to source or store credit depending on how I paid,
**so that** the refund method is fair and consistent with platform policy.

**Acceptance criteria:**
- [ ] Refund routing: `payment_mode = 'prepaid'` → Stripe refund to original payment method; `payment_mode = 'cod'` → store credit (no Stripe refund path)
- [ ] `resolveReturn(returnId: string, mode: PaymentMode): Promise<RefundOutcome>` — branching determined by `orders.payment_mode`, not client input
- [ ] Store credit: `user_credits` table updated atomically; credit amount = `order_item.paid_price_cents` minus platform restocking fee (if any)
- [ ] TypeScript: `RefundOutcome = { type: 'stripe_refund'; refundId: string } | { type: 'store_credit'; creditCents: number }`
- [ ] Buyer notified via Resend email: "Your return has been resolved — {refundDescription}"
- [ ] Return resolution audit: `return_events` table records `{ return_id, actor_role, event_type, amount_cents, stripe_refund_id, created_at }`

### Story 4.3 — Support Ticket Timeline
**As a** buyer or seller,
**I want** to view support ticket status and updates in a chronological timeline,
**so that** I can follow the case progress without contacting support repeatedly.

**Acceptance criteria:**
- [ ] `support_tickets` table: `{ id, order_id, user_id, reason, status, created_at }`; `support_events` table: `{ id, ticket_id, actor_role, status_from, status_to, note, created_at }`
- [ ] Ticket status machine: `open → in_progress → awaiting_buyer → resolved | escalated`
- [ ] Timeline rendered as `<ol>`; each event: timestamp, actor label ("Support Team" / "You"), status label, note
- [ ] Escalated ticket: `status = 'escalated'`; platform ops team SLA visible: "We aim to resolve escalations within 3 business days"
- [ ] RLS: `support_tickets` readable by `user_id` (buyer) or seller whose `shop.owner_id = auth.uid()` where the `order_item.listing.shop_id` matches
- [ ] TypeScript: `TicketStatus = 'open' | 'in_progress' | 'awaiting_buyer' | 'resolved' | 'escalated'`

---

## Epic 5 — Seller/Brand Operations

### Story 5.1 — Listing and Inventory Management
**As a** seller,
**I want** to manage my listing catalogue and update stock without developer access,
**so that** my shop stays accurate and buyers don't order out-of-stock items.

**Acceptance criteria:**
- [ ] `/seller/dashboard/listings`: table with title, craft tags, stock count, price, status (`active | paused | sold_out`), edit action
- [ ] Stock update: inline editable `<input type="number">` on the stock column; `PATCH /api/seller/listings/[id]/stock` on blur
- [ ] `listing_variants.inventory_count` updated; if `= 0` → `listings.status` auto-set to `'sold_out'` by DB trigger
- [ ] ISR: product pages have `revalidate = 60`; seller stock update calls `revalidatePath('/listing/[slug]')` via Next.js on-demand revalidation
- [ ] RLS: `listings` writable only where `shop.owner_id = auth.uid()`
- [ ] TypeScript: `SellerListing = { id: string; title: string; craftTags: string[]; stockCount: number; priceCents: number; status: 'active' | 'paused' | 'sold_out' }`

### Story 5.2 — Payout and Fee Visibility
**As a** seller,
**I want** to see itemised fee events and payout summaries,
**so that** I can verify my earnings and reconcile against expected amounts.

**Acceptance criteria:**
- [ ] `payout_ledger` events: `'sale' | 'platform_fee' | 'cod_confirmation_fee' | 'return_debit' | 'payout'`
- [ ] Dashboard "Earnings" tab: grouped by settlement period; shows gross, platform fees, COD fees, return debits, net
- [ ] COD confirmation fee listed separately from platform fee — distinct `event_type` in `payout_ledger`
- [ ] Pending payout: estimated settlement date shown; "Paid" payout shows bank transfer reference
- [ ] `calculateNetPayout(grossCents: number, platformFeePct: number, codFeeCents: number, returnDebitCents: number): number` — explicit four-argument function
- [ ] TypeScript: `LedgerEvent = { id: string; eventType: 'sale' | 'platform_fee' | 'cod_confirmation_fee' | 'return_debit' | 'payout'; amountCents: number; createdAt: Date }`
