# 04 — Build Plan
## Roadmap & Milestones · dpecom_platform_03

### Phase 1: Audience-First Infrastructure (Week 1)
- Set up Next.js 14 project with custom serif-sans typography.
- Configure Resend API for newsletter and transactional emails.
- Implement the "Subscribe Form" and "Lead Magnet" logic.
- **Goal:** A working email-capture shell that delivers a freebie.

### Phase 2: The Tip Jar (Week 2)
- Build the "Virtual Tip Jar" component with preset amounts.
- Implement the "Support Me" page with a personal creator story.
- Integrate Stripe for one-time contributions.
- **Goal:** Fans can send tips and receive a "Thank You" email.

### Phase 3: Digital Product Suite (Week 3)
- Build the Product Detail Page (Centered, high-readability).
- Implement Supabase Storage for digital asset hosting.
- Build the "Digital Fulfillment" worker (Resend + Storage links).
- **Goal:** Creators can publish and sell PDFs/Presets.

### Phase 4: Integrated Checkout (Week 4)
- Build the 1-page Checkout flow with "Newsletter Opt-in" logic.
- Implement Stripe Webhooks for "Sale -> Tag -> Deliver" automation.
- Build the "Post-Purchase" success page.
- **Goal:** End-to-end commerce-growth loop is complete.

### Phase 5: Creator Home & Polish (Week 5)
- Build the full Creator Landing Page (Newsletter + Product Grid).
- Implement "Tag-based" content visibility (e.g., "Special offer for subscribers").
- Final UX polish: Fade-in animations and serif-optimized spacing.
- **Goal:** A complete "Kit-Style" creator ecosystem.

---

### Cut Order

**Never cut:**
- Stripe checkout for digital products + `payment_intent.succeeded` webhook → file delivery
- Lead magnet capture + Resend email delivery (core growth loop)
- Digital product detail page + checkout flow

**Cut first if time-constrained:**
- Tag-based content visibility for subscribers
- Advanced subscriber segmentation
- Fade-in entrance animations

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Digital download served without verifying payment | High | High | Delivery endpoint must check `orders` table for `status: 'completed'` before issuing signed URL |
| Stripe webhook "Sale → Tag → Deliver" sequence not atomic → file delivery fails after payment | High | High | Use a reliable queue (or Supabase function) to process delivery; log failures for retry |
| Resend API key not set in production environment | Medium | High | `RESEND_API_KEY` in Vercel production env; test with real send before launch |
| Newsletter opt-in in checkout not explicit (GDPR) | Medium | Medium | Opt-in checkbox must be unchecked by default + separate from purchase confirmation |
| Serif font loading failure → layout shift on article pages | Low | Medium | Font must have system-serif fallback in font stack; `font-display: swap` required |
| Creator can create products without price validation | Low | Medium | Server-side minimum price validation; free products must be explicitly allowed with `allowFree: true` flag |
