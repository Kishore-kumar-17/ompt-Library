# 04 — Plan
## Indian Stock Broker Service Page · bw_service_04

---

## Three-Day Build Plan

(Similar complexity to bw_service_03 — interactive calculator, no filter state. Adds 6-product grid.)

---

### Day 1 — Foundation + Calculator

**Goal:** Compile-clean project with all utilities proven, BrokerageCalculator interactive and correct.

**Tasks:**
1. Scaffold + install (see TASK-001)
2. `globals.css`: 8 tokens + `.sr-only` + `prefers-reduced-motion`
3. `layout.tsx`: `DM_Sans` from `next/font/google`, weights `['400','500','600']`
4. `src/types/index.ts`: `TradingProduct`, `TrustBadge`, `TrustStat`, `HeroStat`
5. `src/lib/calculateBrokerage.ts`
6. `src/lib/formatBrokerageTag.ts`
7. `src/lib/data.ts`: `TRADING_PRODUCTS` (6), `TRUST_BADGES` (4), `TRUST_STATS` (4), `HERO_STATS` (3), `TRADITIONAL_FEE_RATE`
8. `Button.tsx + .module.css`: navy / outlineNavy / ghost
9. `BrokerageCalculator.tsx + .module.css`: `'use client'`, segment select, value input, 3-line comparison

**Day 1 gate:**
- [ ] `tsc --noEmit` exits 0
- [ ] `calculateBrokerage(0, null, 100000)` → `0`
- [ ] `calculateBrokerage(20, null, 50000)` → `20`
- [ ] `calculateBrokerage(20, 0.0003, 10000)` → `3`
- [ ] `calculateBrokerage(20, 0.0003, 70000)` → `20` (cap kicks in)
- [ ] `formatBrokerageTag(0, null)` → `'₹0'`
- [ ] `formatBrokerageTag(20, null)` → `'₹20 flat'`
- [ ] `formatBrokerageTag(20, 0.0003)` → `'₹20 or 0.03%'`
- [ ] BrokerageCalculator default (₹1,00,000 + Equity Delivery) → brokerage ₹0, traditional ₹300, savings ₹300 (green)
- [ ] Switch to Equity Intraday → brokerage ₹20, traditional ₹300, savings ₹280
- [ ] Switch to Equity Intraday, set ₹10,000 → brokerage ₹3, traditional ₹30, savings ₹27
- [ ] `brokerage`, `traditionalFee`, `savings` NOT in `useState` (verify in code review)

---

### Day 2 — Sections

**Goal:** All content sections built and assembled.

**Tasks:**
10. `SiteNav.tsx + .module.css`: `'use client'`, sticky, scroll shadow, navy logo
11. `HeroSection.tsx + .module.css`: headline, subheading, CTA pair, 3 hero stat pills
12. `TradingProducts.tsx + .module.css`: 3×2 grid, highlighted delivery card (navy bg/white text), `formatBrokerageTag` on each card
13. `TrustSection.tsx + .module.css`: 4 TrustBadge tiles, surface bg
14. `TrustBar.tsx + .module.css`: dark bg, 4 stats, Framer Motion stagger
15. `Footer.tsx + .module.css`: footer bg, 4 columns
16. `page.tsx`: Server Component, assembles all sections

**Day 2 gate:**
- [ ] Highlighted TradingProducts card: navy bg + white text — no green bg
- [ ] `formatBrokerageTag` called with both args on every product card
- [ ] Page assembles without `'use client'` on `page.tsx`
- [ ] `npm run build` exits 0

---

### Day 3 — QA Pass

**Tasks:**
17. Run full QA grep suite (see `06_Tasks.md` TASK-011)
18. Verify responsive at 320px, 768px, 1280px (3×2 grid → 2-col → 1-col)
19. Spot-check: green appears ONLY on `.lineSavings` in BrokerageCalculator
20. Confirm `tsc --noEmit` and `npm run build` exit 0

**Day 3 gate:**
- [ ] All greps pass
- [ ] `npm run build` exits 0, `/out` present

---

### Cut Order

**Never cut:**
- BrokerageCalculator with `calculateBrokerage` cap logic + comparison table (core interactive tool)
- TradingProducts grid with `formatBrokerageTag` on all 6 cards (pricing transparency)
- Green savings line in BrokerageCalculator (`.lineSavings` — only use of green)

**Cut first if time-constrained:**
- TrustSection badge tiles
- Framer Motion stagger in TrustBar (keep TrustBar; remove animation)
- Additional product description copy

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `brokerage`, `traditionalFee`, `savings` stored in `useState` | High | High | All 3 are derived from segment + tradeValue state — computed inline, NOT stored in state |
| Equity Delivery highlighted card has wrong background color | High | High | Must be navy bg + white text; no green bg on any product card |
| `calculateBrokerage` cap logic not applied | High | High | Validate: `calculateBrokerage(20, 0.0003, 70000)` → `20` (flat fee cap); `calculateBrokerage(20, 0.0003, 10000)` → `3` |
| Green color used outside `.lineSavings` | Medium | High | `var(--color-green)` reserved for savings line only; `grep -r "color-green" src/components --include="*.module.css"` → only BrokerageCalculator |
| `formatBrokerageTag` called with missing second arg | Medium | Medium | Signature: `(flatFee, percentFee)` — both required; verify on all 6 product cards |
| Static export incompatibility | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing components |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
