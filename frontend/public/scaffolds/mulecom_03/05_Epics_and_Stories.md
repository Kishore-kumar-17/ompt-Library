# 05 — Epics and Stories
## Work Breakdown · mulecom_platform_03
### Indian Craft Marketplace · Craft Taxonomy + COD/Prepaid

---

## Epic 1 — Craft Discovery

### Story 1.1 — Craft Taxonomy Search and Facets
**As a** buyer,
**I want** to discover products through craft categories and faceted filters,
**so that** I find authentic Indian handcrafted items that match my intent.

**Acceptance criteria:**
- [ ] Homepage: craft taxonomy rail (e.g., "Block Print", "Handloom", "Pottery", "Embroidery") — each links to `/search?craft={value}`
- [ ] `listings.craft_tags text[]` — filter uses `.contains('craft_tags', [selectedCraft])`; multi-technique items (belonging to two crafts) match both
- [ ] PLP facets: craft (multi-select), category, size, price range, ready-to-ship (`dispatch_days <= 2`), return eligibility
- [ ] "Ready to ship" filter: `.lte('dispatch_days', 2)` — not a boolean field; derived from `dispatch_days`
- [ ] URL-shareable filter state: `/search?craft=block-print&size=S&ready=true`; survives refresh
- [ ] TypeScript: `type CraftTag = 'block-print' | 'handloom' | 'pottery' | 'embroidery' | 'kalamkari' | 'chanderi' | string`

### Story 1.2 — Curated Collection Modules
**As a** buyer,
**I want** to browse curated collections on the homepage,
**so that** I discover new craft styles without knowing specific search terms.

**Acceptance criteria:**
- [ ] Collections data from `curated_collections` table: `{ id, title, description, slug, listing_ids uuid[], image_url }`
- [ ] Homepage shows 3 collection modules; each: cover image, title, item count, "Explore" CTA linking to `/collections/{slug}`
- [ ] `/collections/[slug]` fetches `SELECT * FROM listings WHERE id = ANY($listingIds)`
- [ ] Collections managed by admin only; no seller self-curation in V1
- [ ] ISR `revalidate = 3600` on collection pages; `revalidatePath` called on admin collection update
- [ ] TypeScript: `CuratedCollection = { id: string; title: string; slug: string; listingIds: string[]; imageUrl: string }`

---

## Epic 2 — Listing Confidence (LDP)

### Story 2.1 — Pincode Checker
**As a** buyer,
**I want** to enter my pincode and immediately see whether this item can be delivered to me,
**so that** I don't discover a delivery problem only after checkout.

**Acceptance criteria:**
- [ ] Pincode input with 6-digit validation (`/^[1-9][0-9]{5}$/`); "Check" CTA button; result rendered inline — no page reload
- [ ] `POST /api/pincode-check`: `{ pincode, listingId }` → `{ serviceable: boolean; estimatedDays: number | null; courierPartner: string | null }`
- [ ] Serviceable result: "Delivery in {estimatedDays} days via {courierPartner}" — exact format; do not rephrase
- [ ] Unserviceable: "Delivery not available to pincode {pincode}" — no alternative or upsell
- [ ] Pincode result cached in `sessionStorage` key `pc:{pincode}:{listingId}`; same pincode + listing combo not re-fetched in session
- [ ] TypeScript: `PincodeResult = { serviceable: boolean; estimatedDays: number | null; courierPartner: string | null }`

### Story 2.2 — Dispatch and Return Blocks Above Fold
**As a** buyer,
**I want** to see dispatch timeline and return eligibility before I scroll,
**so that** I can evaluate the listing with full policy context before adding to bag.

**Acceptance criteria:**
- [ ] Dispatch block: `"Usually ships in {dispatch_days} working days"` — `dispatch_days` from `listings.dispatch_days integer`
- [ ] Return block: `listings.returns_accepted = true` → "Returns accepted within {return_window_days} days"; `false` → "Non-returnable item"
- [ ] Both blocks rendered above fold at 375px and 768px; tested by screenshot at both viewports in Phase 2 ship gate
- [ ] Fabric/material disclosure: `listings.material_details text` rendered as a `<dl>` with `<dt>Material</dt><dd>{value}</dd>` etc.
- [ ] `<section aria-label="Shipping and returns">` wraps both blocks; not inside a `<details>` or accordion by default
- [ ] TypeScript: `ListingPolicy = { dispatchDays: number; returnsAccepted: boolean; returnWindowDays: number | null; materialDetails: string | null }`

---

## Epic 3 — Checkout Reliability

### Story 3.1 — Quote Endpoint as Pricing Authority
**As a** system,
**I want** checkout totals derived from server-side quote validation,
**so that** client-side cart state or stale prices cannot affect the charged amount.

**Acceptance criteria:**
- [ ] `POST /api/quote`: re-reads `listing_variants.price_cents` from DB; calculates shipping per seller dispatch policy; returns `QuoteSnapshot`
- [ ] `QuoteSnapshot` stored in `quote_snapshots` table; Stripe session `line_items` amounts set from snapshot — never from client payload
- [ ] Price drift → 409 `{ error: 'PRICE_CHANGED', updatedLines: [...] }`; client re-renders cart with updated prices
- [ ] `quote_snapshots.used_at` set atomically on webhook success; second use returns 410
- [ ] TypeScript: `QuoteSnapshot = { id: string; grandTotalCents: number; lineItems: QuoteLine[]; shippingCents: number; createdAt: Date }`
- [ ] `calculateGrandTotal(lines: QuoteLine[], shippingCents: number): number` — sum of `lineTotalCents` + `shippingCents`; no client-side recalculation

### Story 3.2 — Prepaid and COD Order States
**As a** buyer,
**I want** to complete checkout with either online payment or Cash on Delivery,
**so that** I can use the payment method I trust most.

**Acceptance criteria:**
- [ ] Prepaid path: Stripe PaymentIntent created from quote; `orders.status = 'awaiting_shipment'` set in `payment_intent.succeeded` webhook
- [ ] COD path: no Stripe call; `orders.status = 'cod_pending'`; advances to `'cod_confirmed'` only when seller marks dispatch
- [ ] TypeScript: `type OrderStatus = 'awaiting_shipment' | 'cod_pending' | 'cod_confirmed' | 'dispatched' | 'delivered' | 'cancelled' | 'returned'`
- [ ] `payment_mode = 'cod'` orders: COD handling fee added as a `quote_line` with `type: 'cod_fee'`; shown on checkout summary
- [ ] COD cancellation within 24h: `orders.status = 'cancelled'`; `payout_ledger` COD fee reversed
- [ ] Server webhook handler: `if (paymentMode === 'cod') throw new Error('COD orders must not reach Stripe webhook')` — defensive guard

---

## Epic 4 — Returns and Support

### Story 4.1 — Return vs Exchange State Machine
**As a** buyer,
**I want** to request either a return for refund or an exchange,
**so that** I get the resolution that fits my situation.

**Acceptance criteria:**
- [ ] Return form: type selector ("Return for refund" / "Exchange for different size or variant"), reason dropdown, optional photo `<input type="file">`
- [ ] `returns.type: 'return' | 'exchange'` — distinct column; drives downstream resolution flow
- [ ] `returns` status machine: `requested → under_review → approved | rejected`; approved branches: return → `refund_pending`; exchange → `exchange_pending`
- [ ] `exchange_pending` and `refund_pending` are separate DB status values — never a single `'pending'` state
- [ ] TypeScript: `type ReturnType = 'return' | 'exchange'`; `type ReturnStatus = 'requested' | 'under_review' | 'approved' | 'rejected' | 'refund_pending' | 'exchange_pending' | 'resolved'`
- [ ] Return button shown only if `listing.returns_accepted = true` AND delivery date within return window; otherwise button absent

### Story 4.2 — Refund and Store Credit Resolution
**As a** buyer,
**I want** my return resolved correctly based on how I paid,
**so that** my refund lands in the right place.

**Acceptance criteria:**
- [ ] `resolveReturn`: `payment_mode = 'prepaid'` → `stripe.refunds.create({ payment_intent: order.stripe_payment_intent_id, amount: refundCents })`
- [ ] `payment_mode = 'cod'` → `user_credits` table credit: `UPDATE user_credits SET balance_cents = balance_cents + {refundCents}` (atomic)
- [ ] TypeScript: `RefundOutcome = { type: 'stripe_refund'; stripeRefundId: string; amountCents: number } | { type: 'store_credit'; creditCents: number }`
- [ ] Resolution notification via Resend: subject "Your return for Order #{orderId} has been resolved"
- [ ] `return_events` table audits every state change: `{ id, return_id, actor_role, from_status, to_status, note, created_at }`
- [ ] No manual refund calculation in UI — all amounts derived from `order_items.paid_price_cents` server-side

### Story 4.3 — Support Ticket and Escalation
**As a** buyer,
**I want** to open a support ticket from my order and see its status timeline,
**so that** I can track resolution without sending repeated emails.

**Acceptance criteria:**
- [ ] Support ticket creation from `/account/orders/[id]`; reason: dropdown with 5 options (not free text); optional description max 400 chars
- [ ] `support_tickets.status` machine: `open → in_progress → awaiting_buyer → resolved | escalated`
- [ ] Timeline `<ol>`: each event shows timestamp, actor ("You" / "Support Team"), status, and note; sorted oldest-first
- [ ] Escalation: `status = 'escalated'`; SLA label shown: "Escalated cases are reviewed within 3 business days"
- [ ] RLS: `support_tickets` visible only to `user_id` who created it and users with `admin` role
- [ ] TypeScript: `TicketStatus = 'open' | 'in_progress' | 'awaiting_buyer' | 'resolved' | 'escalated'`

---

## Epic 5 — Seller Operations

### Story 5.1 — Listing and Stock Management
**As a** seller,
**I want** to manage my listings and stock levels from a seller dashboard,
**so that** buyers always see accurate availability.

**Acceptance criteria:**
- [ ] `/seller/dashboard`: sidebar with "Listings", "Orders", "Returns", "Earnings" nav links; active link `font-weight: 500`
- [ ] Listings table: title, craft tags (comma-joined), stock, price in INR, status badge, edit/archive actions
- [ ] Inline stock edit: `<input type="number" min="0">` on the stock cell; `PATCH /api/seller/listings/[id]/stock` on blur; `revalidatePath` called
- [ ] Status auto-update: when `inventory_count = 0`, DB trigger sets `listings.status = 'sold_out'`; buyer-facing listing shows "Sold Out"
- [ ] RLS: seller can only read/write listings where `listings.shop_id IN (SELECT id FROM shops WHERE owner_id = auth.uid())`
- [ ] TypeScript: `SellerListing = { id: string; title: string; craftTags: string[]; inventoryCount: number; priceCents: number; status: 'active' | 'paused' | 'sold_out' }`

### Story 5.2 — Order Dispatch and Payout Reconciliation
**As a** seller,
**I want** to dispatch orders and view my fee/payout breakdown,
**so that** I can fulfill orders accurately and trust my earnings statements.

**Acceptance criteria:**
- [ ] Order queue `/seller/orders`: columns: order ID (masked), item(s), total (INR), payment mode badge, status, "Mark Dispatched" CTA
- [ ] "Mark Dispatched": requires courier name + tracking number; updates `orders.fulfillment_status = 'dispatched'`; buyer email sent
- [ ] Payout ledger entries per order item: `event_type IN ('sale', 'platform_fee', 'cod_fee', 'return_debit', 'payout')`
- [ ] Earnings tab: net payout = gross − platform_fee − cod_fee − return_debits; each term shown as a labelled line
- [ ] TypeScript: `type FulfillmentStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'returned'`; `type LedgerEventType = 'sale' | 'platform_fee' | 'cod_fee' | 'return_debit' | 'payout'`
- [ ] Pending payout: `"Expected by {date}"` (7 days post-delivery); Paid payout: `"Paid on {date} — Ref: {bankRef}"`
