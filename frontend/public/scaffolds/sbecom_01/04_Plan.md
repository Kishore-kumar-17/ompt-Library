# 04 — Build Plan
## Roadmap & Milestones · sbecom_platform_01

### Phase 1: Onboarding Infrastructure (Week 1)
- Set up Next.js 14 + Zustand for multi-step state.
- Build the "Stepper Layout" with the persistent progress bar and Order Summary sidebar.
- Implement Phase 1 of Onboarding: Plan Configuration (Interactive sliders/buttons).
- **Goal:** A working state-machine for the signup flow.

### Phase 2: User & Delivery Logic (Week 2)
- Set up Supabase Auth and Address validation logic.
- Build the "Account Creation" and "Delivery Details" steps.
- Integrate social proof blocks between steps.
- **Goal:** Users can provide all necessary logistics data.

### Phase 3: Payment & Fulfillment (Week 3)
- Integrate Stripe Elements for secure payment.
- Build the "Payment Success" interstitial screen.
- Implement the "Meal Picker" grid with "Box is Full" logic.
- **Goal:** End-to-end flow from signup to meal selection.

### Phase 4: Subscription Dashboard (Week 4)
- Build the "Manage Box" calendar view.
- Implement "Skip Week" and "Box Size" update logic in Supabase.
- Build the "Past Deliveries" history view.
- **Goal:** Real-world subscription management for active users.

### Phase 5: Brand Polish & Zest (Week 5)
- Implement "Sticker" badges using script fonts.
- Add Framer Motion transitions between onboarding steps.
- Final SEO and Page Speed audit (Focus on LCP for recipe images).
- **Goal:** A high-vibrancy, conversion-optimized meal platform.

---

### Cut Order

**Never cut:**
- Multi-step signup state machine (Zustand) — the entire conversion funnel
- Stripe payment integration + order creation
- Meal Picker grid with "Box is Full" maximum-items logic

**Cut first if time-constrained:**
- Framer Motion step transition animations (keep static step switching)
- Past Deliveries history view
- Sticker badge script fonts (use standard font fallback)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Multi-step Zustand state lost on browser refresh | High | High | Persist onboarding state to localStorage; allow user to resume from last step |
| "Box is Full" logic allowing over-selection of meals | High | High | `maxItems` validation on meal selection — both UI disable state AND server-side quantity check |
| Stripe subscription not cancellable from user account | Medium | High | Subscription management dashboard must include cancel flow before Phase 4 ships |
| Script font loading failure → sticker badges use wrong font | Low | Medium | Font stack must include system-cursive fallback; `font-display: swap` required |
| Meal images LCP regression on mobile | Medium | Medium | Use `next/image` with explicit dimensions and `priority` on above-fold meal photos |
| Subscription creation idempotency not enforced | Medium | High | Prevent duplicate subscription records if user submits twice; use `stripe_subscription_id` unique constraint |
