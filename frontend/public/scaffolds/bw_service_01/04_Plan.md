# 04 — Plan
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## Four-Day Build Plan

---

### Day 1 — Foundation

**Goal:** Compile-clean project with tokens, types, utilities, and UI atoms.

**Tasks:**
1. Scaffold: `npx create-next-app@latest mailflow --typescript --app --no-tailwind --import-alias "@/*"`
2. Install: `npm install lucide-react framer-motion`
3. `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
4. `globals.css`: 8 CSS tokens + `.sr-only` + `prefers-reduced-motion` block
5. `layout.tsx`: `Inter` from `next/font/google`, weights `['400','500','600']`, `variable: '--font-sans'`
6. `src/types/index.ts`: `BillingPeriod`, `PricingTier`, `FeatureItem`, `Testimonial`, `TrustStat`
7. `src/lib/formatPlanPrice.ts`: format utility taking `(tier, period)` — see `02_Architecture.md`
8. `src/lib/calculateYearlySavings.ts`: `(monthlyPrice - yearlyPrice) * 12`
9. `src/lib/data.ts`: `PRICING_TIERS` (4), `FEATURES` (3), `TESTIMONIALS` (3), `TRUST_STATS` (4)
10. `src/components/ui/Button.tsx + .module.css`: dark / outlineDark / ghost variants
11. `src/components/ui/FeatureCheckmark.tsx + .module.css`: green Check icon + text

**Day 1 gate:**
- [ ] `tsc --noEmit` exits 0
- [ ] `formatPlanPrice(PRICING_TIERS[2], 'monthly')` → `'₹1,499/mo'`
- [ ] `formatPlanPrice(PRICING_TIERS[2], 'yearly')` → `'₹1,199/mo'`
- [ ] `formatPlanPrice(PRICING_TIERS[0], 'monthly')` → `'Free'`
- [ ] `calculateYearlySavings(PRICING_TIERS[2])` → `3600`
- [ ] `calculateYearlySavings(PRICING_TIERS[0])` → `0`
- [ ] Zero atoms use `font-weight: 700` or `border-radius: 50%`

---

### Day 2 — Core Sections: Nav + Hero + Pricing

**Goal:** Above-the-fold content functional — sticky nav, hero, billing toggle, plan cards.

**Tasks:**
12. `SiteNav.tsx + .module.css`: `'use client'`, sticky, scroll shadow, dark text logo with yellow accent, "Get Started Free" dark button, `<nav aria-label="Main navigation">`
13. `HeroSection.tsx + .module.css`: split grid layout — left (headline + subheading + CTA pair), right (illustration placeholder div)
14. `BillingToggle.tsx + .module.css`: controlled component, `aria-pressed` buttons, savings pill (yellow bg / dark text)
15. `PlanCard.tsx + .module.css`: highlighted variant (yellow bg / dark text), `formatPlanPrice(tier, period)`, conditional savings JSX, feature list, CTA button
16. `PlanGrid.tsx + .module.css`: `'use client'`, `BillingPeriod` state, `BillingToggle` + 4 `PlanCard`s in grid, ARIA live region ("Showing monthly / yearly pricing")

**Day 2 gate:**
- [ ] PlanGrid renders with billing toggle functional
- [ ] Switching to "Yearly" updates all 4 plan prices simultaneously
- [ ] "Yearly" shows savings line on Essentials, Standard, Premium cards (not Free)
- [ ] Free tier shows "Free" in both periods — no savings line
- [ ] Highlighted Standard card has yellow bg + dark text (not white text)
- [ ] `grep -r "color-white.*Highlighted\|white.*cardHighlighted" src` → empty
- [ ] `useMemo` not needed here (no list filtering) — confirm state is simple `useState`

---

### Day 3 — Supporting Sections

**Goal:** Full page assembled — features, testimonials, trust bar.

**Tasks:**
17. `FeatureShowcase.tsx + .module.css`: 3 alternating layout rows, illustration placeholders, icon + title + description
18. `TestimonialCard.tsx + .module.css`: quote, name, company, role — white card, 12px radius
19. `TestimonialGrid.tsx + .module.css`: 3 cards in row (responsive to 1-col mobile)
20. `TrustBar.tsx + .module.css`: **yellow bg**, dark text stats, Framer Motion stagger, `viewport={{ once: true }}`
21. `Footer.tsx + .module.css`: dark bg, 4 columns, white text
22. `page.tsx`: Server Component — no `'use client'`, assembles all sections

**Day 3 gate:**
- [ ] TrustBar: background is `var(--color-yellow)`, all text is `var(--color-dark)`
- [ ] `grep -r "color-white" src/components/home/TrustBar.module.css` → empty
- [ ] Page assembles without `'use client'` on `page.tsx`
- [ ] `npm run build` exits 0

---

### Day 4 — QA Pass

**Goal:** All 50 checklist items green, build confirmed.

**Tasks:**
23. Run full QA grep suite (see `06_Tasks.md` TASK-013)
24. Fix any grep failures
25. Verify responsive at 320px, 768px, 1280px
26. Verify `prefers-reduced-motion` disables Framer Motion stagger in TrustBar
27. Confirm `tsc --noEmit` and `npm run build` both exit 0
28. Spot-check: no yellow-bg element has white text anywhere
29. Spot-check: FeatureCheckmark green appears only on white card backgrounds (not yellow card)

**Day 4 gate:**
- [ ] All QA greps pass
- [ ] `npm run build` exits 0, `/out` directory present
- [ ] `tsc --noEmit` exits 0

---

### Cut Order

**Never cut:**
- PlanGrid + BillingToggle with `BillingPeriod` state driving all 4 cards simultaneously
- `formatPlanPrice(tier, period)` utility — all prices must go through this function
- Highlighted Standard card with yellow bg + dark text (contrast-critical)

**Cut first if time-constrained:**
- FeatureShowcase alternating layout rows
- TestimonialGrid
- TrustBar Framer Motion stagger animation (keep TrustBar; remove animation)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Highlighted card uses white text on yellow background | High | High | White on yellow = 1.07:1 — FAILS WCAG; yellow bg cards must use `color: var(--color-dark)` |
| TrustBar uses white text on yellow background | High | High | TrustBar bg is `var(--color-yellow)` with dark text — `grep -r "color-white" src/components/home/TrustBar.module.css` → empty |
| `formatPlanPrice` not called for prices in PlanCard JSX | Medium | High | No raw number formatting in JSX; `grep -r "toLocaleString" src/components --include="*.tsx"` → empty |
| `BillingPeriod` state not lifted to PlanGrid | Medium | High | State must live in `PlanGrid`, passed to all 4 `PlanCard` children — NOT per-card state |
| Free tier shows savings line | Low | Medium | `calculateYearlySavings(PRICING_TIERS[0])` → `0`; savings JSX must be conditional on `savings > 0` |
| Static export incompatibility | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing components |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
