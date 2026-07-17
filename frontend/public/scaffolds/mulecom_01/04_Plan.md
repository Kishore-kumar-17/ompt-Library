# 04 — Build Plan
## Multi-Vendor Marketplace Platform · mulecom_platform_01

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | schema, auth, tokens, shell |
| 1 | Discovery | 2 weeks | search, facets, listing detail |
| 2 | Commerce Core | 2 weeks | grouped cart, quote, checkout, orders |
| 3 | Trust & Support | 1 week | help request, case lifecycle |
| 4 | Seller Ops | 1 week | listing/order/fee dashboard |
| 5 | Polish & Launch | 1 week | a11y/perf/reliability |

**Total: 8 weeks**

---

### Phase 0 — Foundation

Deliverables:
- project setup, schema, RLS
- auth roles for buyer/seller/admin
- global design token implementation

Ship gate:
- [ ] strict build passes
- [ ] role boundaries enforced on protected routes

---

### Phase 1 — Discovery

Deliverables:
- search page
- facet filtering
- listing cards and listing detail shell

Ship gate:
- [ ] filter interactions stable and performant
- [ ] listing page trust modules visible above fold

---

### Phase 2 — Commerce Core

Deliverables:
- grouped cart by shop
- quote endpoint
- checkout session and order creation
- webhook idempotency

Ship gate:
- [ ] grouped totals correct
- [ ] quote amount equals charged amount
- [ ] duplicate webhook does not duplicate order events

---

### Phase 3 — Trust & Support

Deliverables:
- help request flow
- case escalation and timeline UI
- status machine persistence

Ship gate:
- [ ] case lifecycle transitions validated end-to-end
- [ ] buyer and seller views reflect status correctly

---

### Phase 4 — Seller Ops

Deliverables:
- listing management
- order queue and dispatch updates
- fee/payout summary

Ship gate:
- [ ] seller can update listing and stock safely
- [ ] fee/payout events auditable and visible

---

### Phase 5 — Polish & Launch

Deliverables:
- accessibility audits
- performance tuning
- reliability checklist for checkout/case/payout

Ship gate:
- [ ] Lighthouse 95+ on core routes
- [ ] no P0/P1 trust or checkout defects

---

### Cut Order

Cut first: editorial homepage extras and advanced recommendations.
Never cut: grouped checkout correctness, trust clarity, case lifecycle integrity.

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Grouped cart totals not matching per-shop shipping calculations | High | High | Server quote endpoint must compute per-shop subtotals + shipping independently; test 2-shop cart |
| Quote amount not matching charged payment amount | High | High | Quote hash must be verified at checkout session creation; test with price manipulation attempt |
| Duplicate webhook creating duplicate order events | High | High | Idempotency key on webhook event ID; unique constraint on `payment_intent_id` in orders table |
| RLS not isolating buyer/seller data correctly | Medium | High | Test: buyer A cannot access buyer B's orders; seller A cannot see seller B's listings/payouts |
| Case lifecycle transitions not validated (e.g. skipping states) | Medium | High | State machine must enforce allowed transitions; test all invalid transition attempts |
| Seller payout events not auditable | Low | Medium | All fee/payout events must write to an `events` audit log before Phase 4 ships |
