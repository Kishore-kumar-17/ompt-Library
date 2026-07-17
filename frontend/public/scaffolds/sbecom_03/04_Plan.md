# 04 — Build Plan
## Roadmap & Milestones · sbecom_platform_03

### Phase 1: Onboarding Quiz Core (Week 1)
- Set up Next.js 14 + Zustand for the multi-step quiz state.
- Build the "Visual Input" components for skin/hair data collection.
- Implement the "Step Switcher" with Framer Motion slide animations.
- **Goal:** Users can complete the Beauty Profile and see a "Personalizing..." loader.

### Phase 2: Plan & Checkout (Week 2)
- Build the Plan Selection landing page with tiered commitment cards.
- Set up Supabase Auth and User Profile storage.
- Integrate Stripe Checkout with support for subscription commitment periods.
- **Goal:** End-to-end conversion from Quiz to Paid Subscription.

### Phase 3: The Digital unboxing (Week 3)
- Build the "My Box" dashboard showing monthly samples.
- Implement the "Sample Reveal" animation (Card flip or scale-up).
- Build the rating and review components that trigger "Glow Points."
- **Goal:** Subscribers can interact with their monthly box online.

### Phase 4: Full-Size Shop Loop (Week 4)
- Build the integrated "Shop" with search and filters.
- Implement the "Sample Link" logic (Sample detail -> Full-size SKU).
- Build the "Glow Points" wallet and redemption UI at checkout.
- **Goal:** The Sample-to-Full-Size commerce loop is functional.

### Phase 5: Gifting & Polish (Week 5)
- Build the "Gift a Box" dedicated onboarding flow.
- Add "Delight" animations: Sparkling particles on quiz finish, unboxing confetti.
- Final SEO and Page Speed audit for beauty-industry imagery.
- **Goal:** A production-ready, highly delightful discovery platform.

---

### Cut Order

**Never cut:**
- Beauty Profile quiz state machine (the core onboarding funnel)
- Stripe subscription checkout + commitment period tiers
- "My Box" dashboard with monthly sample visibility

**Cut first if time-constrained:**
- Delight animations (particles/confetti) — replace with simple fade-in
- "Gift a Box" onboarding flow
- Glow Points redemption at checkout (keep earn-only display)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Quiz answers not persisted before Stripe redirect → lost on browser back | High | High | Store quiz state in `sessionStorage` or Supabase before initiating Stripe checkout |
| Glow Points balance computed client-side without server validation | High | High | Points balance must be fetched from DB — never computed locally; redemption requires server-side validation |
| Sample-to-Full-Size product link broken (SKU not linked in schema) | Medium | High | `samples.full_size_product_id` foreign key required in schema; test that Sample page navigates to correct PDP |
| Card flip animation not respecting `prefers-reduced-motion` | Medium | Medium | `@media (prefers-reduced-motion: reduce)` must disable all transforms; replace with opacity fade |
| High-res beauty product images causing LCP regression on mobile | High | Medium | All images via `next/image` AVIF/WebP; above-fold images with `priority`; test at 4G throttle |
| Subscription commitment tier selection not enforced at renewal | Low | High | Stripe subscription metadata must store commitment period; enforce at `invoice.payment_succeeded` |
