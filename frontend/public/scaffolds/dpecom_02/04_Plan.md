# 04 — Build Plan
## Roadmap & Milestones · dpecom_platform_02

### Phase 1: High-Trust Shell (Week 1)
- Set up Next.js 14 + Shadcn/UI primitives.
- Implement the "Squeezed" theme (soft shadows, 12px radii).
- Build the Marketing Landing Page (Hero + Modular Grid).
- **Goal:** A professional, "expensive-feeling" brand presence.

### Phase 2: Revenue Reporting (Week 2)
- Set up Supabase DB with the `daily_metrics` schema.
- Build the Dashboard Overview with MRR and Churn charts (Recharts).
- Implement the "Overview" and "Reporting" tabs.
- **Goal:** Creators can see (mock) financial growth.

### Phase 3: Product & Subscription Logic (Week 3)
- Build the "Create Product" flow (Digital Download vs. Subscription).
- Implement "Tier" management (Basic/Pro/Enterprise).
- Build the "License Key" generator logic.
- **Goal:** Creators can define software assets.

### Phase 4: Native Checkout (Week 4)
- Build the multi-step Checkout Modal (Conversion optimized).
- Integrate Stripe Connect for MoR payment routing.
- Implement tax calculation placeholders and invoice generation.
- **Goal:** End-to-end purchase flow with tax logic.

### Phase 5: Affiliate & Marketing (Week 5)
- Build the "Affiliate Program" manager.
- Implement "Discount Code" logic and "Customer Portal."
- Final polish: Staggered animations and glassmorphism effects.
- **Goal:** A complete "Easy Peasy" commerce platform.

---

### Cut Order

**Never cut:**
- Stripe Connect checkout + MoR payment routing (core revenue flow)
- Subscription tier management (Basic/Pro/Enterprise)
- License key generation per purchase

**Cut first if time-constrained:**
- Affiliate Program manager
- Discount codes
- Glassmorphism polish (keep structure; remove `backdrop-filter`)
- Staggered animations

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Wrong Stripe Connect type used (standard vs express) | High | High | Clarify "Merchant of Record" routing model — use Stripe Connect Express for platform-as-MoR |
| License key generation not cryptographically secure | Medium | High | Use `crypto.randomBytes(32).toString('hex')` — not `Math.random()` or sequential IDs |
| Tax calculation placeholder shipped to production as real tax | High | High | Tax placeholders must be clearly marked `// TODO: integrate tax API`; never display as real tax to users |
| MRR chart displaying mock data in production | Medium | Medium | Data source flag must switch from mock to real Supabase `daily_metrics` table before Phase 5 |
| Glassmorphism `backdrop-filter` causing performance regression on mobile Safari | Medium | Medium | Test on iOS Safari specifically; add `-webkit-backdrop-filter` alongside standard property |
| Subscription webhook not syncing status back to Supabase | Medium | High | Handle `customer.subscription.updated` and `customer.subscription.deleted` events in webhook |
