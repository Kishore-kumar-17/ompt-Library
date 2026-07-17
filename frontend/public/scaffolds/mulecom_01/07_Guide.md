# 07 — Guide
## Multi-Vendor Marketplace Platform · mulecom_platform_01

---

### 1. Engineering Principles

- Treat buyer and seller domains as separate bounded contexts
- Keep transaction math server-authoritative
- Keep trust and policy communication explicit and product-adjacent

---

### 2. Naming Conventions

- Components: PascalCase
- Hooks/utils: camelCase
- API routes: resource-centric naming
- Case statuses: stable enum strings

---

### 3. Data and Money Rules

- Use integer minor units for all money fields
- Require quote snapshot before checkout session creation
- Keep payout and refund adjustments auditable

---

### 4. UI Rules

- Shipping and return summaries visible near conversion controls
- Grouped cart totals always shown by shop and globally
- Case timeline labels must be human-readable and deterministic

---

### 5. Security Rules

- strict RLS boundaries for buyer/seller/admin
- webhook signature verification required
- idempotency required for all payment/case side-effect handlers
- no sensitive logging in production

---

### 6. Testing Rules

- unit tests for filter/cart/case reducers
- integration tests for quote/checkout/webhook
- regression tests for grouped-cart and case transitions
- seller dashboard smoke tests for listing/order updates

---

### 7. Common Mistakes To Avoid

- implicit single-shop assumptions in checkout flow
- exposing inconsistent totals between cart and checkout
- hidden or ambiguous policy language
- non-auditable fee/payout state transitions
- inaccessible filter and support dialogs
