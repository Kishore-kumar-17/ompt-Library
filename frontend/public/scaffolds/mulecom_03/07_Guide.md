# 07 — Guide
## Indian Craft Marketplace · mulecom_platform_03

---

### 1. Engineering Rules

- policy logic explicit, versioned, and testable
- totals server-authoritative
- payment branch outcomes deterministic

---

### 2. Data Rules

- integer money fields only
- immutable quote snapshot before checkout creation
- event logs for return/support transitions

---

### 3. Security Rules

- strict role boundaries
- webhook verification + idempotency
- no sensitive logging

---

### 4. Testing Rules

- unit tests for cart/policy reducers
- integration tests for quote and checkout branches
- lifecycle tests for returns and support tickets

---

### 5. Common Mistakes

- hidden return eligibility conditions
- inconsistent COD/prepaid refund outcomes
- non-auditable support status transitions
