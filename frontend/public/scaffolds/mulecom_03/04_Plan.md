# 04 — Build Plan
## Indian Craft Marketplace · mulecom_platform_03

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | schema/auth/tokens |
| 1 | Discovery | 2 weeks | taxonomy/search/PLP |
| 2 | LDP Conversion | 1 week | pincode/dispatch/return modules |
| 3 | Cart & Checkout | 2 weeks | quote/payment branching/order states |
| 4 | Returns & Support | 1 week | return/exchange + support lifecycle |
| 5 | Seller Ops | 1 week | listing/order/payout tools |
| 6 | Polish & Launch | 1 week | a11y/perf/reliability |

---

### Phase Gates

- [ ] policy visibility pass on LDP and checkout
- [ ] quote and charged totals consistency
- [ ] COD/prepaid branch behavior validated
- [ ] return/support lifecycle integrity validated
- [ ] seller ops updates reflected correctly
- [ ] core routes pass accessibility/performance checks

---

### Cut Order

**Never cut:**
- LDP policy visibility (dispatch/returns/pincode blocks above fold)
- COD + prepaid checkout branching correctness
- Return/exchange + support lifecycle state machine

**Cut first if time-constrained:**
- Seller analytics view (keep order queue; cut analytics charts)
- Editorial/curation homepage extras
- Advanced craft taxonomy filtering

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| COD/prepaid branch routing to wrong order states | High | High | Two distinct paths: prepaid → `awaiting_shipment`; COD → `cod_pending` → `cod_confirmed`; test both |
| Policy visibility gate failing on checkout page | High | High | Returns + shipping policy must be visible near "Place Order" CTA — not only on LDP |
| Return lifecycle not distinguishing exchange vs refund paths | Medium | High | Separate `exchange_pending` and `refund_pending` states required; test end-to-end for each |
| Seller stock update not immediately reflecting in buyer LDP | Medium | Medium | Cache invalidation / ISR revalidation on seller update; test 30-second reflection window |
| Craft taxonomy filter breaking for multi-technique items | Low | Medium | Products can belong to multiple craft categories; filter must use array `includes()` not equality check |
| RLS isolating artisan seller data from other sellers | Medium | High | Test: seller A cannot view/modify seller B's listings or payouts |
