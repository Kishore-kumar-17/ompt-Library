# 01 — Product Requirements Document
## Functional Beverage D2C Platform · ecomm_platform_03

---

### 1. Product Vision

A direct-to-consumer e-commerce platform for a better-for-you soda brand. The store must feel energetic and flavor-forward while remaining trustworthy and clear about ingredients and nutrition. Shopping should feel fast and low-friction: no dark patterns, no artificial urgency, and no hidden subscription behavior.

**Success metric:** A first-time mobile shopper can discover a flavor, select pack + purchase type, and complete checkout in under 3 minutes without creating an account.

---

### 2. Personas

**Asha — First-time shopper (primary)**
- 27, discovers brand on social
- Curious about taste, skeptical about health claims
- Wants: quick flavor discovery, clear ingredients, smooth checkout
- Leaves if: claims feel vague or pricing feels confusing

**Karan — Repeat buyer**
- 34, reorders monthly
- Wants: subscription convenience, easy cadence changes, fast reorder
- Expects: skip/pause/cancel without support contact

**Neha — Support/admin operator**
- Manages catalog and order operations
- Needs reliable order/payment/subscription status visibility
- Non-technical, needs UI not SQL access

---

### 3. Core Features

#### 3.1 Catalog and Discovery
- Homepage with hero, flavor rail, benefits, testimonials, subscription strip
- PLP with filters: flavor, pack size, caffeine/no-caffeine, dietary tags
- Product cards with quick add and pack visibility
- Load more pagination (no infinite scroll)

#### 3.2 Product Detail Page (PDP)
- Flavor selector with image switching
- Pack selector with immediate price update
- `PurchaseModelToggle`: `one_time | subscribe`
- Cadence selector for subscriptions: 2/4/8 weeks
- Ingredient panel visible above fold
- Nutrition facts and FAQ accordions below fold

#### 3.3 Cart and Checkout
- Cart drawer with quantity controls and free shipping progress
- Guest checkout available (no forced account)
- Stripe checkout for one-time and subscription purchases
- Server-side quote validation before checkout session creation

#### 3.4 Accounts
- Auth via Supabase (email + OAuth)
- Order history
- Subscription management: skip/pause/cancel/cadence

#### 3.5 Admin (V1-lite)
- Product/variant management
- Order status visibility
- Subscription status visibility

---

### 4. User Journeys

#### Journey 1 — First purchase
1. Land on homepage
2. Open PDP from flavor rail
3. Select flavor + pack + purchase model
4. Add to cart
5. Checkout as guest

#### Journey 2 — Subscription signup
1. On PDP, switch to `subscribe`
2. Select cadence
3. Checkout
4. Confirm subscription in account

#### Journey 3 — Subscription management
1. Login
2. Open subscriptions
3. Skip next delivery or pause
4. Confirm updated status

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Loyalty points engine | Future phase |
| NG2 | Multi-vendor marketplace | Single brand platform |
| NG3 | Advanced personalization ML | Out of V1 scope |
| NG4 | Community/social feed | Not commerce-critical |
| NG5 | Multi-currency global rollout | Region-limited launch |

---

### 6. Constraints

**Technical:**
- All monetary values in integer minor units (`*_cents`)
- No client-trusted pricing for checkout
- Webhook idempotency required

**Business:**
- Free shipping threshold is configurable env value
- Clear one-time vs subscription pricing required on PDP
- Ingredient visibility is non-negotiable

**Legal/compliance:**
- No medical/disease-treatment claims
- Ingredient and nutrition content must be factual

---

### 7. Acceptance Criteria (Top Level)

- [ ] Guest can complete one-time purchase without account
- [ ] Shopper can complete subscription purchase with cadence selection
- [ ] `PurchaseModelToggle` changes cart payload and checkout pricing correctly
- [ ] Ingredient panel is visible above fold on PDP
- [ ] Webhook creates/updates order and subscription state idempotently
- [ ] Cart persists across refresh/reopen
- [ ] WCAG AA compliance on PDP/cart/checkout
- [ ] No PII or secrets logged in production

---

### 8. Appendix A — Product Model (High Level)

```
Product
  -> has many Flavors
  -> has many PackSizes
  -> has many SKUVariants (flavor x pack)
  -> has one NutritionProfile

SKUVariant
  -> has price_cents, inventory_count, sku

Order
  -> has many OrderItems
  -> may create/attach Subscription (if purchaseType=subscribe)
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/collections/all` | PLP | No |
| `/products/[slug]` | PDP | No |
| `/checkout` | Checkout | No |
| `/checkout/success` | Success | No |
| `/account` | Account | Yes |
| `/account/orders` | Order history | Yes |
| `/account/subscriptions` | Subscription management | Yes |
| `/admin` | Admin dashboard | Yes (admin role) |
