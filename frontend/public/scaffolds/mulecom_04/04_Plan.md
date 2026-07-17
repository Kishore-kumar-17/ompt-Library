# 04 — Build Plan
## Artisan Empowerment Marketplace · mulecom_platform_04

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | schema/auth/tokens |
| 1 | Discovery | 2 weeks | taxonomy/search/PLP |
| 2 | LDP Conversion | 1 week | pincode/dispatch/return modules |
| 3 | Cart & Checkout | 2 weeks | quote/payment branching/order states |
| 4 | Returns & Support | 1 week | return/exchange + support lifecycle |
| 5 | Seller Ops | 1 week | listing/order/payout controls |
| 6 | Polish & Launch | 1 week | a11y/perf/reliability |

---

### Phase Gates

- [ ] policy visibility gate on LDP and checkout
- [ ] quote and charged totals consistency
- [ ] COD/prepaid branch behavior validated
- [ ] return/support lifecycle integrity validated
- [ ] seller ops updates reflected correctly
- [ ] core routes pass accessibility/performance targets

---

### Cut Order

**Never cut:**
- LDP policy visibility (pincode/dispatch/returns — buyer trust non-negotiable)
- COD + prepaid checkout correctness with quote validation
- Seller ops: listing management + order status + payout visibility

**Cut first if time-constrained:**
- Artisan profile storytelling features (photos, craft story, bio)
- Recommendation algorithm
- Advanced search filters beyond basic category + price

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| COD/prepaid payment branching routing incorrectly | High | High | Explicit branch: prepaid → Razorpay; COD → direct `cod_pending` order; test both independently |
| Policy visibility gate failing (returns policy not near checkout CTA) | High | High | Policy blocks must appear on both LDP and checkout; automated check in Phase 5 |
| Return lifecycle not validated for artisan-made items (handmade return exceptions) | Medium | High | Artisan-specific return windows may differ; state machine must support `non_returnable` status |
| Seller payout events not auditable | Medium | High | Payout events must write to audit log before Phase 5; fee calculation must be traceable |
| RLS not isolating artisan seller data | Medium | High | Test: artisan A cannot view artisan B's listings, orders, or payout records |
| Artisan empowerment messaging not appearing for sellers | Low | Medium | Seller-facing pages must show payout transparency; verify seller dashboard shows gross vs net |
