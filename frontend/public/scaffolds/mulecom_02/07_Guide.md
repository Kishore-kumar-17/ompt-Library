# 07 — Guide
## Curated Artisan Marketplace · mulecom_platform_02

---

### Engineering Rules

- keep policy logic explicit and versioned
- keep totals server-authoritative
- keep payment-mode-dependent refund behavior deterministic

### Data Rules

- integer minor units for money
- immutable quote snapshot for checkout session creation
- audit logs for return/support transitions

### Security Rules

- role and RLS boundaries enforced
- webhook signature verification
- idempotent handlers for payment and refund events

### Testing Rules

- unit tests for cart and policy reducers
- integration tests for quote/checkout/payment-mode branching
- lifecycle tests for returns and support tickets

### Common Mistakes

- hidden return eligibility conditions
- mismatched COD/prepaid refund outcomes
- non-auditable support status transitions
