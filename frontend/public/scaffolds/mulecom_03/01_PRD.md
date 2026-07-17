# 01 — Product Requirements Document
## Indian Craft Marketplace · mulecom_platform_03

---

### 1. Product Vision

A craft-first marketplace where discovery of Indian artisanal products is rich, but transaction and support flows are explicit and operationally reliable.

**Success metric:** A buyer can discover a listing, verify pincode and return eligibility, and complete checkout in under 4 minutes on mobile with no policy ambiguity.

---

### 2. Personas

**Anaya — Craft Explorer (buyer)**
- browses by craft and category
- values artisan detail and authenticity
- needs confidence in shipping and return behavior

**Rohit — Intent Buyer**
- searches for a specific product type and size
- cares about delivery certainty and checkout speed

**Brand Ops Lead (seller/curator)**
- manages listing quality, stock, dispatch commitments
- handles return approvals and payout reconciliation

**Support Specialist (ops)**
- resolves tickets, escalations, and return disputes
- requires deterministic status workflow and audit visibility

---

### 3. Core Features

#### 3.1 Discovery and Search
- search-first homepage
- craft taxonomy rails
- category clusters and curated collections
- faceted search/PLP

#### 3.2 Listing Conversion
- gallery and variant selectors
- pincode checker
- dispatch timeline
- return eligibility block
- material/fabric disclosures

#### 3.3 Cart and Checkout
- transparent totals
- prepaid/COD branching
- guest checkout and account checkout
- policy notes and support links

#### 3.4 Post-Purchase
- order tracking
- return/exchange requests
- refund/store-credit states
- ticket lifecycle

#### 3.5 Seller/Ops
- listing and stock management
- dispatch updates
- return decision workflows
- fee/payout views

---

### 4. User Journeys

#### Journey 1 — Buyer purchase
1. browse/search
2. filter to listing
3. verify pincode and return eligibility
4. add to cart
5. checkout with payment mode choice

#### Journey 2 — Return request
1. open order detail
2. request return/exchange (if eligible)
3. receive review updates
4. resolve via refund/store credit

#### Journey 3 — Seller fulfillment
1. receive order
2. update dispatch
3. monitor return requests
4. reconcile payout and fee events

#### Journey 4 — Support escalation
1. buyer opens ticket
2. support reviews and responds
3. escalate if unresolved
4. close with documented resolution

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Social feed and influencer network | not core to transactional reliability |
| NG2 | Live commerce streaming | out of V1 scope |
| NG3 | Ad-bidding marketplace | future phase |
| NG4 | Auto-generated listing copy | quality/trust risk |

---

### 6. Constraints

**Technical:**
- quote endpoint is pricing authority
- payment mode branching server-side
- return/support statuses event-tracked

**Business:**
- explicit per-item return eligibility required
- COD and prepaid refund behavior must be disclosed
- dispatch and delivery windows visible before purchase

**Compliance:**
- no deceptive urgency
- no hidden policy exclusions

---

### 7. Acceptance Criteria (Top Level)

- [ ] pincode checker works with clear delivery messaging
- [ ] return eligibility visible pre-purchase
- [ ] quote and charged totals match
- [ ] COD/prepaid refund outcomes follow policy rules
- [ ] return and support timelines persist and render correctly
- [ ] seller ops updates reflect accurately in buyer-facing order states

---

### 8. Appendix A — Product Model (High Level)

```
User
  -> places Orders
  -> creates ReturnRequests
  -> creates SupportTickets

Listing
  -> has variants
  -> has dispatch SLA
  -> has return eligibility

Order
  -> has payment_mode
  -> has fulfillment_state timeline

ReturnRequest
  -> has eligibility_state, review_state, resolution_state
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
| `/account/returns` | Buyer returns | Yes |
| `/support` | Buyer support | Yes/Guest token |
| `/seller/dashboard` | Seller ops dashboard | Yes (seller/admin) |
