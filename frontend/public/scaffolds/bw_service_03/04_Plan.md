# 04 — Plan
## Indian Payment Gateway Service Page · bw_service_03

---

## Three-Day Build Plan

(Simpler than prior builds — fewer interactive components, no filter state)

---

### Day 1 — Foundation + Calculator

**Goal:** Compile-clean project with all utilities proven, FeeCalculator interactive and correct.

**Tasks:**
1. Scaffold + install (see TASK-001)
2. `globals.css`: 8 tokens + `.sr-only` + `prefers-reduced-motion`
3. `layout.tsx`: `Manrope` from `next/font/google`, weights `['400','500','600']`
4. `src/types/index.ts`: `PaymentProduct`, `TrustBadge`, `PaymentMethod`, `TrustStat`, `HeroStat`
5. `src/lib/calculateTransactionFee.ts`
6. `src/lib/formatFeeRate.ts`
7. `src/lib/data.ts`: `PAYMENT_PRODUCTS` (4), `TRUST_BADGES` (4), `PAYMENT_METHODS` (6), `TRUST_STATS` (4), `HERO_STATS` (3)
8. `Button.tsx + .module.css`: blue / outlineBlue / ghost
9. `FeeCalculator.tsx + .module.css`: `'use client'`, product select, amount input, tri-line breakdown

**Day 1 gate:**
- [ ] `tsc --noEmit` exits 0
- [ ] `calculateTransactionFee(10000, 0.02)` → `200`
- [ ] `calculateTransactionFee(10000, 0.02, 3)` → `203`
- [ ] `calculateTransactionFee(10547, 0.02)` → `211` (rounds correctly)
- [ ] `formatFeeRate(0.02, 0)` → `'2.0%'`
- [ ] `formatFeeRate(0.015, 3)` → `'1.5% + ₹3'`
- [ ] FeeCalculator: default state (₹10,000, Payment Gateway) → fee ₹200, received ₹9,800 in green
- [ ] Switching to Payment Pages (1.5%) → fee ₹150, received ₹9,850
- [ ] `fee` and `received` NOT in `useState` (verify in code review)

---

### Day 2 — Sections

**Goal:** All content sections built and assembled.

**Tasks:**
10. `SiteNav.tsx + .module.css`: `'use client'`, sticky, scroll shadow, blue logo
11. `HeroSection.tsx + .module.css`: headline, subheading, CTA pair, 3 hero stat pills
12. `PaymentProducts.tsx + .module.css`: 2×2 grid, highlighted card (blue bg/white text), `formatFeeRate` on each card
13. `TrustSection.tsx + .module.css`: 4 TrustBadge tiles, surface bg
14. `PaymentMethods.tsx + .module.css`: 6 method pills, centred row
15. `TrustBar.tsx + .module.css`: dark bg, 4 stats, Framer Motion stagger
16. `Footer.tsx + .module.css`: footer bg, 4 columns
17. `page.tsx`: Server Component, assembles all sections

**Day 2 gate:**
- [ ] Highlighted PaymentProducts card: blue bg + white text — no green bg
- [ ] `formatFeeRate` called with both args on product cards
- [ ] Page assembles without `'use client'` on `page.tsx`
- [ ] `npm run build` exits 0

---

### Day 3 — QA Pass

**Tasks:**
18. Run full QA grep suite (see `06_Tasks.md` TASK-010)
19. Verify responsive at 320px, 768px, 1280px
20. Spot-check: green appears ONLY on `.lineReceived` in FeeCalculator
21. Confirm `tsc --noEmit` and `npm run build` exit 0

**Day 3 gate:**
- [ ] All greps pass
- [ ] `npm run build` exits 0, `/out` present

---

### Cut Order

**Never cut:**
- FeeCalculator with `calculateTransactionFee` + `formatFeeRate` (core interactive tool — the product demo)
- PaymentProducts grid with `formatFeeRate` called on each card (pricing transparency)
- Green "you receive" line in FeeCalculator (`.lineReceived` — only use of green)

**Cut first if time-constrained:**
- PaymentMethods pill row
- TrustSection badge tiles
- Framer Motion stagger in TrustBar (keep TrustBar; remove animation)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `fee` and `received` stored in `useState` | High | High | Both values are derived from `amount` and `product` state — must be computed inline, NOT stored in state |
| Green color used outside `.lineReceived` in FeeCalculator | High | High | `var(--color-green)` reserved for "you receive" line only; `grep -r "color-green" src/components --include="*.module.css"` → only FeeCalculator |
| `formatFeeRate` called with only 1 argument | Medium | High | Signature: `formatFeeRate(rate, fixedFee)` — both args required on all product cards |
| Highlighted product card uses green bg instead of blue | Medium | Medium | Highlighted PaymentProducts card must have blue bg + white text; no green backgrounds |
| Static export incompatibility | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing components |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
| TypeScript strict mode errors | Medium | High | Run `tsc --noEmit` after each component file, not only at end |
