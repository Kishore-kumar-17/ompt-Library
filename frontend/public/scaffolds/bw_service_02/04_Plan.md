# 04 — Plan
## Indian Web Agency Directory · bw_service_02

---

## Four-Day Build Plan

---

### Day 1 — Foundation

**Goal:** Compile-clean project with tokens, types, utilities, and UI atoms.

**Tasks:**
1. Scaffold: `npx create-next-app@latest agencyhub --typescript --app --no-tailwind --import-alias "@/*"`
2. Install: `npm install lucide-react framer-motion`
3. `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
4. `globals.css`: 8 CSS tokens + `.sr-only` + `prefers-reduced-motion`
5. `layout.tsx`: `Space_Grotesk` from `next/font/google`, weights `['400','500','600']`
6. `src/types/index.ts`: `AgencyTier`, `Specialization`, `BudgetRange`, `TeamSize`, `Agency`, `AgencyFilterState`, `TrustStat`
7. `src/lib/formatBudgetRange.ts`: range display utility
8. `src/lib/filterAgencies.ts`: 5-condition filter + featured-first sort
9. `src/lib/data.ts`: `AGENCIES` (8), `SPECIALIZATIONS`, `BUDGET_RANGES`, `CITIES`, `TRUST_STATS`
10. UI atoms: `Button.tsx`, `TierBadge.tsx` (3 variants), `StarRating.tsx`, `SpecTag.tsx`

**Day 1 gate:**
- [ ] `tsc --noEmit` exits 0
- [ ] `formatBudgetRange(AGENCIES[0])` → `'₹10L – ₹50L'`
- [ ] `formatBudgetRange(AGENCIES[2])` → `'₹50L+'`
- [ ] `formatBudgetRange(AGENCIES[6])` → `'₹50K – ₹2L'`
- [ ] `filterAgencies(AGENCIES, { search: 'studio', ... })` → 2 results (ag-01, ag-06)
- [ ] `filterAgencies(AGENCIES, { tier: 'Premier', ... })` → 2 results, ag-01 first (featured)
- [ ] `filterAgencies(AGENCIES, {})` → 8 results, ag-01/ag-02/ag-03 first (all featured)
- [ ] Zero atoms use `font-weight: 700` or `border-radius: 50%`

---

### Day 2 — Hero + Filter + Cards

**Goal:** Core listing experience functional — hero search, filter bar, all agency cards.

**Tasks:**
11. `SiteNav.tsx + .module.css`: `'use client'`, sticky, scroll shadow, indigo logo, "List Your Agency" ghost CTA
12. `HeroSection.tsx + .module.css`: centered layout, headline, large search input + indigo button
13. `AgencyCard.tsx + .module.css`: portfolio thumbnail, featured strip (conditional JSX), TierBadge, StarRating, name, tagline, SpecTags, stats row, `formatBudgetRange`, "View Agency" CTA
14. `AgencyGrid.tsx + .module.css`: 3-col grid, empty state
15. `AgencyFilterBar.tsx + .module.css`: `'use client'`, `AgencyFilterState`, search input, specialization chips, budget/city/tier selects, `useMemo`, ARIA live region, renders `AgencyGrid`

**Day 2 gate:**
- [ ] Search input filters agencies in real time
- [ ] Specialization chip "SaaS" → 3 agencies visible (ag-01, ag-02, ag-06)
- [ ] Budget "₹2L–₹10L" → 3 agencies (ag-02, ag-05, ag-08)
- [ ] Premier tier → 2 agencies (PixelCraft Studio first — featured)
- [ ] Featured strip visible on ag-01, ag-02, ag-03 only
- [ ] `useMemo` present in `AgencyFilterBar.tsx`
- [ ] ARIA live region updates on every filter change
- [ ] Premier TierBadge: amber bg + dark text (not white text)

---

### Day 3 — Trust Bar + Footer + Assembly

**Goal:** Complete page, build passes.

**Tasks:**
16. `TrustBar.tsx + .module.css`: `'use client'` (Framer Motion), footer bg, 4 stats, stagger entrance
17. `Footer.tsx + .module.css`: footer bg, 4 columns (Company / For Agencies / Resources / Legal)
18. `page.tsx`: Server Component, no `'use client'`, assembles all sections
19. Verify: `AgencyFilterBar` imports `AGENCIES` directly (no props needed)

**Day 3 gate:**
- [ ] Page assembles without `'use client'` on `page.tsx`
- [ ] TrustBar bg is `var(--color-footer)`, white text on dark = high contrast ✓✓
- [ ] `npm run build` exits 0

---

### Day 4 — QA Pass

**Goal:** All 50 checklist items green.

**Tasks:**
20. Run full QA grep suite (see `06_Tasks.md` TASK-012)
21. Fix any failures
22. Verify responsive at 320px, 768px, 1280px
23. Verify `prefers-reduced-motion` disables Framer Motion stagger
24. Confirm `tsc --noEmit` and `npm run build` both exit 0
25. Spot-check: no amber bg element has white text
26. Spot-check: no `budgetMin`/`budgetMax` referenced directly in JSX

**Day 4 gate:**
- [ ] All QA greps pass
- [ ] `npm run build` exits 0, `/out` present
- [ ] `tsc --noEmit` exits 0

---

### Cut Order

**Never cut:**
- AgencyFilterBar with `filterAgencies` + `useMemo` (core directory UX — 5-condition filter)
- Featured-first sort in `filterAgencies` (featured agencies always appear at top of results)
- TierBadge component with 3 variants (Premier / Growth / Starter)

**Cut first if time-constrained:**
- TrustBar Framer Motion stagger animation (keep TrustBar; remove animation)
- Secondary filter dimensions (city + tier dropdowns — keep search + specialization)
- Agency detail hover states

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Premier TierBadge uses white text on amber background | High | High | Amber `#D97706` on white = 2.99:1 — FAILS WCAG AA; badge must use dark text; verify computed `color` in DevTools |
| `budgetMin` / `budgetMax` referenced directly in JSX | High | High | All budget display must use `formatBudgetRange()`; `grep -r "budgetMin\|budgetMax" src/components` → empty |
| Featured agencies not sorted first | Medium | Medium | `filterAgencies` must sort `featured: true` before `featured: false`; filter `Premier` → PixelCraft (featured) first |
| `useMemo` missing from AgencyFilterBar | Medium | High | `grep -r "useMemo" src/components/home/AgencyFilterBar.tsx` → must return a result |
| ARIA live region missing on filter changes | Medium | Medium | `aria-live="polite"` must be present and update on every filter change |
| Static export incompatibility | Low | High | Confirm `output: 'export'` in `next.config.ts` before writing components |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
