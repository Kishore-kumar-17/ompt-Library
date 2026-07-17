# 04 — Build Plan
## Roadmap & Milestones · dpecom_platform_01

### Phase 1: Neo-Brutalist Core (Weeks 1)
- Set up Next.js 14 project.
- Configure Tailwind with Neo-Brutalist utility classes (borders, shadows).
- Implement Shared Components (Nav, Footer, Neo-Box).
- **Goal:** A working UI shell with the correct "raw" aesthetic.

### Phase 2: Creator Infrastructure (Week 2)
- Set up Supabase Auth & Database schema.
- Build the "Creator Onboarding" flow (Username claim + Bio).
- Implement the "Creator Dashboard" (Sidebar + Empty States).
- **Goal:** Creators can log in and have a profile.

### Phase 3: Product & File Logic (Week 3)
- Build the "Create Product" form (Upload to Supabase Storage).
- Implement "Pay what you want" price logic.
- Build the "Creator Shop Page" (Public URL).
- **Goal:** Creators can publish digital goods.

### Phase 4: Frictionless Checkout (Week 4)
- Integrate Stripe Payment Intents.
- Build the "Checkout Overlay" (1-page slide-up).
- Implement Webhooks for order fulfillment & asset delivery.
- **Goal:** Real transactions are successful.

### Phase 5: Marketplace & Discovery (Week 5)
- Build the "Marketplace Home" (Trending/Categories).
- Implement Search & Filter logic.
- Final SEO & Performance audit.
- **Goal:** A public-facing marketplace.

---

### Cut Order

**Never cut:**
- Stripe Payment Intents + checkout overlay (core transaction layer)
- File delivery webhook — signed URL generation on `payment_intent.succeeded`
- Creator Shop Page (public-facing URL — the product)

**Cut first if time-constrained:**
- Marketplace Home discovery (Trending/Categories)
- Search & Filter logic
- "Pay what you want" floor enforcement (keep basic pricing only)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Asset download URL not signed/time-limited → anyone can share link | High | High | Use Supabase Storage signed URLs with short TTL (e.g. 1 hour) — never serve public permanent URLs |
| Stripe webhook not idempotent → duplicate orders for same payment | High | High | Idempotency check on `payment_intent_id` with unique DB constraint before fulfillment |
| File storage quota abused — no file size limits enforced | Medium | High | Enforce max file size at upload (e.g. 200MB); validate MIME type server-side |
| Neo-brutalist CSS (thick borders, box shadows) overriding Radix UI primitives unexpectedly | Medium | Medium | Apply Tailwind utility overrides explicitly; test all Radix components after token configuration |
| Creator can delete product while purchase is pending | Low | Medium | Soft-delete only; `status: 'archived'` — never hard delete products with order history |
| TypeScript strict mode errors blocking build | Medium | High | Run `tsc --noEmit` after each phase; Neo-Brutalist utility classes must be typed correctly |
