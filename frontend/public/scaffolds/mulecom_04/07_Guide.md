# 07 — Guide
## Artisan Empowerment Marketplace · mulecom_platform_04

---

### 1. Engineering Rules

- policy logic explicit and testable
- totals server-authoritative
- payment branch outcomes deterministic

---

### 2. Data Rules

- integer minor units for all money fields
- immutable quote snapshot before checkout creation
- event logs for return and support transitions

---

### 3. Security Rules

- strict role boundaries
- webhook verification and idempotency
- no sensitive production logging

---

### 4. Testing Rules

- unit tests for cart and policy reducers
- integration tests for quote and checkout branch behavior
- lifecycle tests for returns and support tickets

---

### 5. Common Mistakes

- hidden return eligibility conditions
- inconsistent COD/prepaid refund outcomes
- non-auditable support status transitions
