# 01 — Product Requirements Document
## Artisan Empowerment Marketplace · mulecom_platform_04

---

### 1. Product Vision

A handcrafted commerce platform where discovery highlights artisan value and transactional flows provide explicit confidence on delivery, returns, and support.

**Success metric:** A buyer can discover a listing, validate pincode and return eligibility, and complete checkout in under 4 minutes on mobile without policy ambiguity.

---

### 2. Personas

**Mira — Craft Explorer (buyer)**
- browses by craft and values artisan stories
- needs trust in authenticity and fulfillment details

**Arjun — Intent Buyer**
- arrives with specific product/category intent
- prioritizes delivery certainty and fast checkout

**Seller/Brand Operator**
- manages listing quality, stock, and dispatch commitments
- handles return decisions and payout visibility

**Support Moderator**
- resolves delivery, return, and payment issues
- requires deterministic status timelines and auditability

---

### 3. Core Features

#### 3.1 Discovery and Search
- search-first homepage
- taxonomy rails (craft + category)
- faceted PLP (size/color/price/ready-to-ship/return eligibility)
- curated collection modules

#### 3.2 Listing Conversion
- image gallery + variant selectors
- pincode checker
- dispatch timeline and shipping details
- return/replacement eligibility block
- Add to Bag / Buy Now

#### 3.3 Cart and Checkout
- transparent subtotal/shipping/tax/total
- prepaid and COD payment branch
- guest and account checkout
- policy and support references before order placement

#### 3.4 Post-Purchase and Support
- order history and tracking
- return/exchange request creation
- refund/store-credit status visibility
- ticket and escalation timeline

#### 3.5 Seller/Ops Dashboard
- listing CRUD and inventory updates
- dispatch SLA and fulfillment status
- return decision logs
- fee and payout summary

---

### 4. User Journeys

#### Journey 1 — Buyer purchase
1. search/browse taxonomy
2. open listing
3. check pincode, dispatch, return eligibility
4. choose variant and add to cart
5. checkout (prepaid or COD)

#### Journey 2 — Buyer return
1. open order detail
2. submit return/exchange request
3. receive review updates
4. resolve through refund/store credit

#### Journey 3 — Seller fulfillment
1. update dispatch status
2. monitor return requests
3. reconcile fee/payout entries

#### Journey 4 — Support escalation
1. buyer opens support ticket
2. support investigates
3. escalate if required
4. close with documented resolution

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Social creator feed | not transaction-critical |
| NG2 | Live-stream commerce | out of V1 scope |
| NG3 | Ad marketplace/bidding | future phase |
| NG4 | Auto-generated listing copy | quality/trust risk |

---

### 6. Constraints

**Technical:**
- quote endpoint is pricing authority
- payment branch behavior enforced server-side
- return/support status transitions event-tracked

**Business:**
- explicit per-item return eligibility required
- explicit COD/prepaid refund behavior required
- dispatch and delivery window visible pre-purchase

**Compliance:**
- no deceptive urgency
- no hidden policy exclusions

---

### 7. Acceptance Criteria (Top Level)

- [ ] pincode and dispatch details visible and accurate on listing pages
- [ ] return eligibility visible pre-purchase
- [ ] quote and charged totals match
- [ ] COD/prepaid refund outcomes follow policy rules
- [ ] return/support timelines persist and render correctly
- [ ] seller/ops updates correctly reflect in buyer-facing states

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
  -> has fulfillment_status timeline

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
| `/seller/dashboard` | Seller/ops dashboard | Yes (seller/admin) |
