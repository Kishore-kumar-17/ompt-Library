# 04 — Build Plan
## Functional Beverage D2C Platform · ecomm_platform_03

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | Setup stack, schema, tokens, auth |
| 1 | Catalog | 2 weeks | Homepage, PLP, PDP core browsing |
| 2 | Cart & Checkout | 2 weeks | Quote, checkout, webhook order flow |
| 3 | Subscriptions | 1 week | Subscribe cadence + account controls |
| 4 | Admin + Ops | 1 week | Basic admin visibility + controls |
| 5 | Polish & Launch | 1 week | Accessibility, performance, go-live |

**Total: 8 weeks**

Execution rule: do not advance phases until the current phase ship gate is fully green.

---

### Phase 0 — Foundation

Deliverables:
- Project/bootstrap
- DB schema + RLS
- Auth and protected routes
- globals.css design tokens

Ship gate:
- [ ] Build passes strict TypeScript
- [ ] Schema and RLS applied
- [ ] Auth + route guards working

---

### Phase 1 — Catalog

Deliverables:
- Homepage sections
- PLP filters + product cards + quick add
- PDP selectors, purchase model toggle, ingredient panel

Ship gate:
- [ ] Selector behavior maps to valid SKU variants
- [ ] Ingredient panel visible above fold
- [ ] Add-to-cart works across flavors/packs

---

### Phase 2 — Cart & Checkout

Deliverables:
- Cart drawer interactions
- Quote endpoint
- Checkout session endpoint
- Webhook order creation

Ship gate:
- [ ] Server quote equals charged amount
- [ ] Failed payment preserves cart
- [ ] Duplicate webhook does not duplicate order

---

### Phase 3 — Subscriptions

Deliverables:
- Subscribe pricing and cadence selection
- Subscription record creation and status sync
- Account actions: skip/pause/cancel/cadence

Ship gate:
- [ ] Subscription checkout end-to-end works
- [ ] Account actions persist and reflect correctly

---

### Phase 4 — Admin + Ops

Deliverables:
- Product/variant updates
- Order/subscription visibility

Ship gate:
- [ ] Admin role protection works
- [ ] Updates reflect on storefront correctly

---

### Phase 5 — Polish & Launch

Deliverables:
- A11y audits
- Performance optimization
- Metadata + sitemap + robots + error states

Ship gate:
- [ ] Lighthouse 95+ target on core pages
- [ ] No P0/P1 checkout/subscription defects

---

### Cut Order

Cut first: testimonials extras, secondary education modules, advanced filter presets.
Never cut: purchase toggle, ingredient visibility, checkout correctness.

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Ingredient panel placed inside accordion — hidden by default | High | High | IngredientPanel must be always-visible above fold on PDP — manual check after every deploy |
| Duplicate webhook creating duplicate subscription records | High | High | Idempotency key on subscription creation; store `stripe_subscription_id` with unique constraint |
| Purchase toggle state (subscription vs one-time) not validated server-side | Medium | High | Server quote endpoint must verify purchase type; never trust client-sent `isSubscription` flag |
| Subscription cancellation flow missing → user has no exit path | Medium | Medium | Account dashboard must include skip/pause/cancel actions before Phase 3 ships |
| Failed payment not restoring cart to previous state | Medium | Medium | Cart state must persist through Stripe redirect failures; test `payment_intent.payment_failed` webhook |
| Framer Motion slide animations not disabled under `prefers-reduced-motion` | Medium | Medium | `@media (prefers-reduced-motion: reduce)` must set `transition: none` on step switcher |
| TypeScript strict mode errors blocking build | Medium | High | Run `tsc --noEmit` after each phase; Phase 0 gate must enforce zero errors |
