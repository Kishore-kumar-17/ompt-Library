# 04 — Build Plan
## Roadmap & Milestones · sbecom_platform_02

### Phase 1: The Home Cafe Shell (Week 1)
- Set up Next.js 14 with the "Modern Indian" theme (Earthy colors, bold typography).
- Build the Lifestyle Landing Page (Hero, Bestseller Carousel, Ritual Blocks).
- Implement the "Download App" sticky nav and mobile-first footer.
- **Goal:** A premium, aromatic brand presence.

### Phase 2: Product & Ritual Logic (Week 2)
- Set up Supabase with the `products` and `subscriptions` schema.
- Build the "Subscribe & Save" product page with quantity/frequency selectors.
- Implement Ritual-based filtering (e.g., `/rituals/morning`).
- **Goal:** Users can view products and select subscription options.

### Phase 3: Intelligent Checkout (Week 3)
- Build the "Shopping Bag" sliding drawer with "Free Gift" progress bar logic.
- Integrate Razorpay/Stripe for recurring e-mandates.
- Implement the "Gift Note" and personalized packaging UI.
- **Goal:** A high-AOV, frictionless transaction flow.

### Phase 4: Subscriber Portal (Week 4)
- Build the "My Rituals" dashboard for subscription management.
- Implement "Swap Product" and "Skip Next Delivery" logic in Supabase.
- Build the "Loyalty History" view showing unlocked gifts.
- **Goal:** Retention-focused tools for active subscribers.

### Phase 5: Mobile Polish & Performance (Week 5)
- Optimize all product images for mobile LCP.
- Implement floating "Subscribe" bars for the product page.
- Final SEO audit for Indian "Online Tea" keywords.
- **Goal:** A high-performance, culturally resonant beverage storefront.

---

### Cut Order

**Never cut:**
- Subscribe & Save PDP with quantity + frequency selectors
- Razorpay/Stripe recurring e-mandate integration
- Shopping Bag drawer with free gift progress bar

**Cut first if time-constrained:**
- Loyalty History view
- Ritual-based URL filtering (`/rituals/morning`)
- Floating "Subscribe" bar on PDP

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Recurring e-mandate setup failing (Razorpay subscription API differs from one-time payment) | High | High | Spike on Razorpay Subscriptions API before Phase 3 — different from Payment Intents; test with test mandate |
| Free gift progress bar threshold not updating on cart changes | Medium | Medium | Progress bar must be reactive to cart store; test by adding/removing items |
| Ritual-based URL returning 404 if not statically generated | Medium | Medium | Add `generateStaticParams` for ritual slugs; fallback to dynamic route with `notFound()` |
| Subscription management (swap/skip delivery) not persisting to Supabase | Medium | High | Each subscriber action must write to `subscriptions` table with correct `next_delivery_date` |
| High-res product photography causing LCP > 2.5s on mobile | High | Medium | Use `next/image` AVIF/WebP, explicit dimensions, `priority` on hero; test at 4G throttle |
| Subscription cancellation path missing for users | Medium | Medium | "My Rituals" dashboard must include cancel option before Phase 4 ships |
