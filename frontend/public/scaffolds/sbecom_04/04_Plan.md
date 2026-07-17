# 04 — Build Plan
## Roadmap & Milestones · sbecom_platform_04

### Phase 1: Culinary Shell & Dashboard (Week 1)
- Set up Next.js 14 project with the "Culinary Editorial" theme.
- Build the "Dashboard Shell" featuring the Selection Grid and the "Active Box" sidebar.
- Implement the "Recipe Card" with Serif-Sans typography.
- **Goal:** A professional-looking dashboard for meal selection.

### Phase 2: Dual Subscription Logic (Week 2)
- Set up Supabase with the `recipes`, `wines`, and `subscriptions` schema.
- Implement the Zustand state machine for managing "Meal + Wine" box contents.
- Build the "Wine Pairing" badge and the side-peek modal for recipe details.
- **Goal:** Users can select meals and see linked wine pairings.

### Phase 3: Educational Onboarding (Week 3)
- Build the "Chef's Profile" multi-step onboarding quiz.
- Implement the "Culinary Result" logic that suggests a personalized plan.
- Integrate Stripe for the initial subscription purchase (with proration placeholders).
- **Goal:** End-to-end flow from onboarding to first box confirmation.

### Phase 4: Seasonal Market (Week 4)
- Build the "Market" storefront for kitchen tools and celebration kits.
- Implement the "Market Cart" logic (One-time purchases handled separately from subscription).
- Build the "Order History" and "Billing Summary" sections.
- **Goal:** Users can purchase add-ons and manage their financial profile.

### Phase 5: Interactive Recipe Guide (Week 5)
- Build the mobile-first "Cooking Mode" for recipes.
- Implement step-by-step video integration and ingredient checklists.
- Final SEO and Performance audit for high-res media.
- **Goal:** A complete, professional-grade culinary platform.

---

### Cut Order

**Never cut:**
- Dual subscription logic — Meal + Wine box Zustand state machine
- Stripe subscription purchase + order confirmation
- Recipe Card with wine pairing badge (`WinePairing` badge linked to recipe)

**Cut first if time-constrained:**
- Interactive Cooking Mode (complex Phase 5 feature)
- Step-by-step video integration
- Market cart for one-time purchases (defer to v2)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| One-time Market purchases accidentally creating subscription records | High | High | Separate cart logic for Market (one-time) vs Subscription box — different Stripe product types |
| Wine pairing badge linked to wrong recipe after product swap | Medium | High | `wine_pairing_id` foreign key on `recipes` table; test all 4 possible swaps after Phase 2 |
| Chef's profile quiz result not persisted → different plan suggested on refresh | Medium | Medium | Store quiz result in `sessionStorage` + Supabase user profile before checkout redirect |
| Proration placeholder logic shipped to production as real billing | High | High | Mark all proration calculations `// TODO: implement proration` — never display as confirmed amounts |
| High-res recipe/food photography causing LCP regression | High | Medium | `next/image` AVIF/WebP with explicit dimensions; `priority` on above-fold dish photo; 4G throttle test |
| Dual subscription state machine getting out of sync with Supabase | Medium | High | Webhook handlers for `customer.subscription.updated` must update both meal AND wine subscription states |
