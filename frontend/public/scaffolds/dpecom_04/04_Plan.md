# 04 — Build Plan
## Roadmap & Milestones · dpecom_platform_04

### Phase 1: Professional Shell (Week 1)
- Set up Next.js 14 project with high-contrast Inter typography.
- Implement the "Profile Header" and centered layout shell (max-width 640px).
- Build the shared `Button` and `Card` components with Blue accents.
- **Goal:** A professional-looking link-in-bio shell.

### Phase 2: Scheduling Core (Week 2)
- Build the availability logic using `date-fns`.
- Implement the `Calendar` and `TimeSlotGrid` components.
- Set up Supabase for profile and service data storage.
- **Goal:** Creators can see a mock calendar on their profile.

### Phase 3: Service Catalog (Week 3)
- Build the modular `ServiceCard` for sessions and products.
- Implement the category switcher (1:1s, Webinars, etc.).
- Build the "Create Service" form for creators.
- **Goal:** Creators can add and display their monetization services.

### Phase 4: Meeting & Payment Automation (Week 4)
- Integrate Stripe for global service payments.
- Implement the Zoom/Google Meet API integration for link generation.
- Build the automated calendar invite system.
- **Goal:** End-to-end booking flow with automated meeting links.

### Phase 5: Social Proof & Analytics (Week 5)
- Build the `TestimonialStrip` for social proof.
- Implement basic booking analytics for creators.
- Final mobile-responsiveness and performance audit.
- **Goal:** A high-conversion, production-ready creator storefront.

---

### Cut Order

**Never cut:**
- Availability logic + `Calendar` + `TimeSlotGrid` (core scheduling product)
- Stripe payment integration for services
- Automated meeting link generation on payment success

**Cut first if time-constrained:**
- `TestimonialStrip` social proof section
- Booking analytics dashboard
- Advanced calendar invite customisation

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Two buyers book the same time slot (race condition) | High | High | Lock slot immediately when payment intent created; release lock on failure; use DB transaction for slot claim + payment |
| Zoom/Google Meet OAuth token expires → broken meeting links | High | High | Store refresh token + expiry; implement token refresh before meeting link generation |
| Time zone not stored with availability slots → wrong booking times | High | High | Always store availability in UTC; convert to user's local timezone only at display layer |
| Meeting link generated but Stripe payment not yet confirmed | Medium | High | Meeting link created ONLY after `payment_intent.succeeded` webhook — never optimistically |
| `date-fns` timezone handling inconsistent with server timezone | Medium | Medium | Use `date-fns-tz` for all timezone operations; set server to UTC explicitly |
| Creator profile max-width 640px breaking on edge case viewports | Low | Low | Test at 320px, 375px, 640px, 768px breakpoints specifically |
