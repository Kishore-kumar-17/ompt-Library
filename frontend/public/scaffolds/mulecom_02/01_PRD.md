# 01 — Product Requirements Document
## Curated Artisan Marketplace · mulecom_platform_02

---

### 1. Product Vision

A craft-first marketplace where buyers discover high-quality artisanal products and complete purchases with clear fulfillment and return expectations.

**Success metric:** A mobile buyer can discover an item, validate pincode delivery and return eligibility, and complete checkout in under 4 minutes without account creation.

---

### 2. Personas

**Ira — Craft Explorer (buyer)**
- browses by craft and category
- values product story and authenticity
- needs confidence in delivery timing and return rules

**Dev — Intent Buyer**
- arrives with a known product type (kurta, saree, décor)
- filters by size/price/delivery quickly
- expects checkout speed and transparent totals

**Brand Ops Lead (seller/curator)**
- maintains catalog and stock
- manages dispatch SLAs and return approvals

**Support Specialist (ops)**
- handles delivery issues, return disputes, support escalations
- needs auditable workflow states

---

### 3. Core Features

#### 3.1 Discovery and Search
- Search-first homepage with craft and category gateways
- PLP facet filters: category, craft, size, color, price, ready-to-ship, return eligibility
- Sort options and paginated loading

#### 3.2 Listing Detail Conversion
- Gallery, variants, fabric/material details
- Pincode delivery checker
- Dispatch days and shipping notes
- Return eligibility tag and policy summary
- Add to bag and Buy Now

#### 3.3 Cart and Checkout
- Grouped totals and shipping transparency
- Guest checkout + account checkout
- Payment mode branch: COD/prepaid
- Confirmation flow with order and support links

#### 3.4 Post-Purchase and Support
- Buyer account: orders, tracking, returns/exchanges
- Support flow: ticket creation, status updates, escalation

#### 3.5 Seller/Brand Operations
- Listing management and stock updates
- Dispatch updates and return approvals
- Fee/payout summary and reconciliation visibility

---

### 4. User Journeys

#### Journey 1 — Buyer purchase
1. Search or browse craft/category
2. Open listing page
3. Check pincode + return eligibility
4. Select variant and add to bag
5. Checkout (COD or prepaid)

#### Journey 2 — Buyer return
1. Open order in account
2. Submit return request (if eligible)
3. Receive approval/status updates
4. Refund/store-credit resolution

#### Journey 3 — Ops dispatch and support
1. Update dispatch status for order
2. Handle support ticket
3. Resolve return/exchange case

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Social feed/content network | not transaction-critical |
| NG2 | Live-stream shopping | out of V1 scope |
| NG3 | Advanced ad marketplace | future phase |
| NG4 | AI auto-generated listing copy | quality/trust risk |

---

### 6. Constraints

**Technical:**
- server-authoritative quote and totals
- deterministic refund and store-credit branching
- auditable support/return states

**Business:**
- explicit per-item return eligibility
- explicit COD/prepaid refund behavior
- dispatch and delivery windows visible pre-purchase

**Compliance:**
- no deceptive urgency
- no hidden policy exclusions

---

### 7. Acceptance Criteria (Top Level)

- [ ] pincode check and dispatch info visible and functional on listing pages
- [ ] return eligibility clearly shown per listing
- [ ] checkout total matches server quote
- [ ] COD/prepaid refund behavior follows policy logic
- [ ] return/exchange state lifecycle is persisted and visible
- [ ] support tickets and escalations are traceable
- [ ] ops updates reflect correctly in buyer-facing order state

---

### 8. Appendix A — Product Model (High Level)

```
User
  -> places Orders
  -> raises Returns/Support Tickets

Listing
  -> has variants
  -> has dispatch SLA and return eligibility

Order
  -> has payment_mode (prepaid/cod)
  -> has fulfillment and support state timeline

ReturnRequest
  -> has eligibility, review status, resolution_type
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/search` | Search/PLP | No |
| `/listing/[slug]` | LDP | No |
| `/cart` | Cart | No |
| `/checkout` | Checkout | No |
| `/account/orders` | Buyer orders | Yes |
| `/account/orders/[id]` | Buyer order detail | Yes |
| `/account/returns` | Return requests | Yes |
| `/support` | Buyer support | Yes/Guest link |
| `/seller/dashboard` | Seller/brand ops | Yes (seller/admin) |
