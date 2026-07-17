# 05 — Epics and Stories
## Work Breakdown · mulecom_platform_01
### Multi-Vendor Marketplace Platform

---

## Epic 1 — Search and Discovery

### Story 1.1 — Keyword Search and Faceted Results
**As a** buyer,
**I want** to search by keyword and narrow results with facets,
**so that** I find relevant listings quickly from a broad catalogue.

**Acceptance criteria:**
- [ ] `/search?q={query}&{facets}` — both `q` and facet params readable by server component on load; state survives refresh
- [ ] Facets: price range (min/max), shipping speed (`standard | express`), item condition (`new | vintage | custom`), rating (1–5), location
- [ ] Facet change updates URL params via `router.replace` without full page reload; result set re-fetched server-side
- [ ] Query + active facets shown as dismissible chips above the result grid; each chip `×` removes only that facet
- [ ] Zero-results state: "No results for '{query}'" — no suggested products or paid placements in V1
- [ ] TypeScript: `SearchParams = { q?: string; price_min?: number; price_max?: number; shipping?: 'standard' | 'express'; condition?: string; rating?: number }`

### Story 1.2 — Listing Cards with Seller Trust Hints
**As a** buyer,
**I want** listing cards to show seller reputation signals alongside price and shipping,
**so that** I can compare options at a glance without opening every listing.

**Acceptance criteria:**
- [ ] Card contains: primary image (`aspect-ratio: 1/1`), listing title `<h3>`, price (formatted `$X.XX`), seller username, seller star rating (1 decimal), and "Free shipping" badge if applicable
- [ ] "Free shipping" badge: `background: var(--color-success-bg); color: var(--color-success-text)` — no hex values
- [ ] Seller rating rendered as `{rating}★` in `var(--color-text-secondary)` — not a star SVG row in V1
- [ ] Card `<a>` wraps entire clickable area; `aria-label="{listing.title} by {seller.username}, ${price}"`
- [ ] TypeScript: `ListingCard = { id: string; title: string; imageUrl: string; priceCents: number; sellerUsername: string; sellerRating: number; freeShipping: boolean }`
- [ ] Cards use `<ul>` grid; each card is `<li>` — not `<div>` soup

---

## Epic 2 — Listing Trust and Conversion

### Story 2.1 — Seller Trust Card and Policy Visibility
**As a** buyer,
**I want** to see seller trust signals and policy summary on the listing page before adding to cart,
**so that** I can evaluate risk before committing.

**Acceptance criteria:**
- [ ] Seller trust card contains: avatar (40px, `border-radius: 50%`), display name, `{totalSales} sales`, `{avgRating}/5 stars`, average response time, "Sold by {shopName}" link
- [ ] Policy summary block: dispatch window (e.g., "Ships in 3–5 days"), return eligibility tag ("Returns accepted" / "No returns"), and a "View full shop policies" link
- [ ] Both seller trust card and policy summary block visible above the fold at 768px viewport — no scroll required
- [ ] Return eligibility stored as `listings.returns_accepted boolean`; renders "Returns accepted within {window} days" or "No returns accepted"
- [ ] TypeScript: `SellerTrustCard = { avatarUrl: string; displayName: string; totalSales: number; avgRating: number; responseTime: string; shopSlug: string }`
- [ ] `grep -r "display:none\|display: none" src/components/listing/SellerTrustCard` → zero results (visibility must not be toggled off)

### Story 2.2 — Variant Selection with Out-of-Stock Handling
**As a** buyer,
**I want** to select valid listing variants and see unavailable options clearly marked,
**so that** I don't attempt to add an out-of-stock item to my cart.

**Acceptance criteria:**
- [ ] Variant options rendered as `<button>` elements grouped by attribute (e.g., size, colour)
- [ ] Out-of-stock variant: `disabled` attribute set; `opacity: 0.4; cursor: not-allowed; text-decoration: line-through`
- [ ] Attempting to add to cart with no variant selected: inline error "Please select a {attribute}" — no alert/window.confirm
- [ ] "Add to Cart" button disabled when `inventory_count = 0`; label changes to "Sold Out"
- [ ] TypeScript: `ListingVariant = { id: string; attributes: Record<string, string>; priceCents: number; inventoryCt: number; sku: string }`
- [ ] `inventoryCt = 0` variant never passes server-side add-to-cart validation even if client sends the ID

---

## Epic 3 — Multi-Shop Cart and Checkout

### Story 3.1 — Cart Grouped by Shop
**As a** buyer,
**I want** to see my cart items grouped by seller shop with per-shop subtotals,
**so that** I understand exactly what I'm paying to whom before checkout.

**Acceptance criteria:**
- [ ] Cart page groups `cart_items` by `listings.shop_id`; each group renders shop name as `<h3>`, its items, and a per-shop subtotal
- [ ] Per-shop subtotal: sum of `(line_item.priceCents * quantity)` + shop shipping estimate
- [ ] Combined order total rendered below all groups: sum of all per-shop subtotals; labelled "Order Total"
- [ ] Shop name in each group links to `/shop/{shopSlug}`
- [ ] Zustand `cartStore`: `{ items: CartItem[]; shopGroups: () => ShopGroup[] }` — `shopGroups()` is a derived getter, not stored state
- [ ] TypeScript: `ShopGroup = { shopId: string; shopName: string; items: CartItem[]; subtotalCents: number; shippingCents: number }`

### Story 3.2 — Server-Authoritative Checkout Quote
**As a** system,
**I want** checkout totals to be validated server-side before any payment is created,
**so that** stale prices or modified client payloads cannot cause incorrect charges.

**Acceptance criteria:**
- [ ] `POST /api/quote` accepts cart payload; re-fetches `listings.price_cents` and `shipping rules` from DB; returns a `quote_snapshot` with line totals and grand total
- [ ] Quote snapshot stored in `quote_snapshots` table: `{ id, cart_hash, line_items jsonb, total_cents, created_at, used_at }`
- [ ] Stripe checkout session `amount` set from `quote_snapshot.total_cents` — never from client-provided amount
- [ ] If any item price has changed since cart was built: `POST /api/quote` returns 409 `{ error: 'PRICE_CHANGED', diff: [...] }`; client shows "Prices updated — review your cart"
- [ ] `quote_snapshot.used_at` set after successful webhook; second use of same snapshot rejected with 410
- [ ] TypeScript: `QuoteSnapshot = { id: string; totalCents: number; lineItems: QuoteLine[]; createdAt: Date; usedAt: Date | null }`

---

## Epic 4 — Help Requests and Cases

### Story 4.1 — Open Help Request from Order
**As a** buyer,
**I want** to open a help request directly from my order detail page,
**so that** I have a clear support path without needing to search for a contact form.

**Acceptance criteria:**
- [ ] "Get help with this order" button on `/account/orders/[id]`; visible only when `orders.status != 'cancelled'`
- [ ] Opens a form: reason selector (dropdown: "Item not received" / "Item not as described" / "Return request" / "Other") + optional description (max 500 chars)
- [ ] `POST /api/cases` creates `help_requests` row: `{ id, order_id, buyer_id, reason, description, status: 'open', created_at }`
- [ ] Confirmation: page redirects to `/account/cases/{id}`; toast "Help request opened — we'll review within 2 business days"
- [ ] RLS: `help_requests` row only readable by the `buyer_id` and users with `admin` role
- [ ] TypeScript: `HelpReason = 'not_received' | 'not_as_described' | 'return_request' | 'other'`

### Story 4.2 — Case Timeline and Status Transitions
**As a** buyer or seller,
**I want** to follow case progress through a clear status timeline,
**so that** I always know what has happened and what comes next.

**Acceptance criteria:**
- [ ] Case status machine: `open → under_review → awaiting_response → resolved | escalated`; no other transitions permitted server-side
- [ ] `case_events` table: `{ id, case_id, actor_role, status_from, status_to, note, created_at }` — every transition recorded
- [ ] Timeline rendered as a `<ol>` list; each event shows: timestamp, actor role ("Support" / "Buyer" / "Seller"), status label, and note
- [ ] Invalid state transition (e.g., `resolved → under_review`) returns 422 `{ error: 'INVALID_TRANSITION' }`
- [ ] TypeScript: `CaseStatus = 'open' | 'under_review' | 'awaiting_response' | 'resolved' | 'escalated'`
- [ ] `CaseEvent` actor_role: `'buyer' | 'seller' | 'support' | 'system'` — "system" for automated transitions (e.g., auto-close after 14 days)

---

## Epic 5 — Seller Operations

### Story 5.1 — Listing and Order Management
**As a** seller,
**I want** to create, update, and manage my listings and dispatch orders from a single dashboard,
**so that** I can run my shop without needing multiple tools.

**Acceptance criteria:**
- [ ] `/seller/listings`: paginated `<table>` of listings; columns: title, status badge, inventory count, price, edit/archive actions
- [ ] Listing status: `type ListingStatus = 'draft' | 'active' | 'paused' | 'sold_out'`; auto-set to `'sold_out'` when `inventory_count = 0`
- [ ] `/seller/orders`: order queue with columns: order ID, buyer (masked), item(s), total, order date, fulfillment status, "Mark Dispatched" CTA
- [ ] "Mark Dispatched": requires tracking carrier + tracking number; `orders.fulfillment_status` updated to `'dispatched'`; buyer receives automated email
- [ ] RLS: seller can only `SELECT/UPDATE` listings and orders where `shop.owner_id = auth.uid()`
- [ ] TypeScript: `FulfillmentStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'returned'`

### Story 5.2 — Fee and Payout Summary
**As a** seller,
**I want** to view itemised fee events and payout status for each sale,
**so that** I can reconcile my earnings and trust the platform's fee calculations.

**Acceptance criteria:**
- [ ] `payout_ledger` table: `{ id, shop_id, order_item_id, event_type, amount_cents, created_at }` — event types: `'sale' | 'platform_fee' | 'payment_processing_fee' | 'refund_debit' | 'payout'`
- [ ] Dashboard "Earnings" tab: list of payout events grouped by settlement period; shows gross, fees, net per period
- [ ] Fee breakdown per order item: gross sale amount, platform fee (%), payment processing fee ($), net payout — four distinct rows
- [ ] `calculateNetPayout(grossCents: number, platformFeePct: number, processingFeeCents: number): number` — `Math.round(grossCents * (1 - platformFeePct / 100)) - processingFeeCents`
- [ ] Pending payouts shown with estimated date; "Paid" payouts show Stripe transfer ID as an audit reference
- [ ] TypeScript: `LedgerEvent = { id: string; eventType: 'sale' | 'platform_fee' | 'payment_processing_fee' | 'refund_debit' | 'payout'; amountCents: number; createdAt: Date }`
