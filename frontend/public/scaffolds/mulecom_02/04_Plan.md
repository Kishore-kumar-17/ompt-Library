# 04 — Build Plan
## Curated Artisan Marketplace · mulecom_platform_02

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | schema/auth/tokens |
| 1 | Discovery | 2 weeks | taxonomy/search/PLP |
| 2 | LDP Conversion | 1 week | pincode/dispatch/returns blocks |
| 3 | Cart & Checkout | 2 weeks | quote/payment branching/order states |
| 4 | Returns & Support | 1 week | return/exchange + ticket lifecycle |
| 5 | Seller Ops | 1 week | listing/order/payout controls |
| 6 | Polish & Launch | 1 week | reliability, a11y, perf |

---

### Ship Gates

- [ ] policy visibility checks pass on LDP and checkout
- [ ] quote and charged totals match for prepaid path
- [ ] COD flow order state and refund/store-credit logic validated
- [ ] return and support lifecycle transitions tested
- [ ] seller ops updates reflect in buyer views
- [ ] core routes meet accessibility and performance targets

---

### Cut Order

**Never cut:**
- LDP policy visibility (pincode/dispatch/returns blocks above fold — trust critical)
- Checkout quote = charged amount (prepaid path)
- Return/support lifecycle state machine

**Cut first if time-constrained:**
- Editorial homepage extras (curated collections, editorial stories)
- Advanced recommendations engine
- Seller analytics dashboard (keep order queue; cut analytics)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Policy blocks not visible above fold on LDP | High | High | Pincode check + dispatch + returns must render before scroll; LDP ship gate confirms this |
| COD refund/store-credit logic producing wrong amounts | High | High | COD return flow: refund vs store-credit branching must be explicitly modelled and tested end-to-end |
| Quote and charged totals mismatch between prepaid and COD paths | High | High | Quote endpoint must handle both payment types; test each path independently |
| Return lifecycle missing exchange vs refund distinction | Medium | High | State machine must include `exchange_pending` distinct from `refund_pending`; test both paths |
| Seller ops stock update not reflecting immediately in buyer LDP | Medium | Medium | ISR revalidation must trigger on seller stock update; test within 30-second window |
| Pincode serviceability check not covering remote/tier-3 pincodes | Low | Medium | Test serviceability with pincodes from 6 different states including tier-3 cities |
