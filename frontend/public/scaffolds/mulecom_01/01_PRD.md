# 01 — Product Requirements Document
## Multi-Vendor Marketplace Platform · mulecom_platform_01

---

### 1. Product Vision

A two-sided marketplace for handmade, vintage, and custom goods where buyers discover unique products with confidence and sellers operate shops with predictable tools and clear economics.

**Success metric:** A buyer can search, evaluate, and purchase from one or more shops in under 4 minutes on mobile with clear trust and support expectations.

---

### 2. Personas

**Aarav — Gift-driven explorer (buyer)**
- starts broad in search/category pages
- values uniqueness and social proof
- needs confidence in delivery and returns

**Nina — Intent buyer**
- arrives with specific product intent
- uses facets heavily for narrowing
- expects fast checkout and transparent totals

**Sofia — Independent maker (seller)**
- manages listings, inventory, and fulfillment alone
- needs fee clarity and fair protection policies

**Ops Moderator — Marketplace operator**
- monitors policy compliance, fraud signals, case resolution
- needs audit trails and role-safe tooling

---

### 3. Core Features

#### 3.1 Search and Discovery
- Search-first homepage
- Faceted PLP (price, shipping speed, location, item type, rating)
- Sort options and pagination
- Listing cards with seller trust hints

#### 3.2 Listing Detail and Conversion
- Media gallery and variant options
- Seller trust card (rating, response norms, policy snapshot)
- Shipping estimate and return policy visibility
- Add to cart/favorites

#### 3.3 Cart and Checkout
- Group cart by seller/shop
- Per-shop shipping/tax/subtotal visibility
- Combined total summary
- Guest + account checkout paths

#### 3.4 Buyer Account and Support
- Order history and tracking
- Help request creation
- Case escalation and status timeline

#### 3.5 Seller Dashboard
- Listing CRUD and inventory updates
- Order management and dispatch states
- Fee and payout summary views

---

### 4. User Journeys

#### Journey 1 — Buyer purchase (single shop)
1. Search by keyword
2. Filter results
3. Open listing
4. Add to cart
5. Checkout

#### Journey 2 — Buyer purchase (multi-shop)
1. Add listings from two different shops
2. View grouped cart
3. Verify per-shop shipping and combined total
4. Checkout

#### Journey 3 — Buyer issue flow
1. Open help request from order
2. Wait policy window
3. Escalate to case
4. View resolution status

#### Journey 4 — Seller fulfillment
1. Receive order
2. Mark dispatch and tracking
3. View fees/payout status

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Social feed / creator timeline | not transaction-critical |
| NG2 | Live-stream commerce | out of V1 scope |
| NG3 | Full ads network and bidding tools | future phase |
| NG4 | AI auto-generation of listing descriptions | quality and trust risk |

---

### 6. Constraints

**Technical:**
- grouped multi-shop totals resolved server-side
- payout and refund states auditable
- case workflow state machine enforced backend-side

**Business:**
- trust and protection language visible pre-purchase
- seller fees clearly represented in dashboard
- buyer support path discoverable from order detail

**Compliance:**
- no deceptive urgency
- no hidden policy exclusions

---

### 7. Acceptance Criteria (Top Level)

- [ ] Search + facets return relevant, stable results
- [ ] Listing pages show seller trust and policy highlights above fold
- [ ] Cart groups items by shop correctly
- [ ] Checkout totals match server quote
- [ ] Help request -> case escalation path works with correct timing rules
- [ ] Seller dashboard reflects order and fee events accurately
- [ ] Buyer and seller access boundaries enforced via RLS/role checks

---

### 8. Appendix A — Product Model (High Level)

```
User
  -> may own Shop
  -> may place Orders
  -> may open HelpRequests/Cases

Shop
  -> has many Listings
  -> receives Orders via listing sales

Listing
  -> has variants, images, shipping policy, return policy
  -> belongs to Shop

Order
  -> has many OrderItems
  -> linked to one or more Shop groups in cart context

Case
  -> belongs to Order and Buyer
  -> has status timeline and resolution outcome
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/search` | Search results | No |
| `/listing/[slug]` | Listing detail | No |
| `/cart` | Grouped cart | No |
| `/checkout` | Checkout | No |
| `/account/orders` | Buyer order history | Yes |
| `/account/orders/[id]` | Buyer order detail/help | Yes |
| `/account/cases` | Buyer cases | Yes |
| `/seller/dashboard` | Seller dashboard | Yes (seller role) |
| `/seller/listings` | Seller listings | Yes (seller role) |
| `/seller/orders` | Seller order queue | Yes (seller role) |
| `/admin` | Marketplace ops | Yes (admin role) |
