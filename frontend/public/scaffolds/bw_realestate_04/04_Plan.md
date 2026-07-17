# 04 — Plan
## Modern Indian Rental Discovery · bw_realestate_04

---

## Four-Day Build Plan

---

### Day 1 — Foundation

**Goal:** Compile-clean project with tokens, types, utilities, and UI atoms.

**Tasks:**
1. Scaffold: `npx create-next-app@latest zerolet --typescript --app --no-tailwind --import-alias "@/*"`
2. Install: `npm install lucide-react framer-motion`
3. `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
4. `globals.css`: 8 CSS tokens + `.sr-only` + `prefers-reduced-motion`
5. `layout.tsx`: `Plus_Jakarta_Sans` from `next/font/google`, weights `['400','500','600']`
6. `src/types/index.ts`: All types — `BHKType`, `FurnishingStatus`, `TenantPreference`, `OwnerProfile`, `RentalProperty`, `RentalFilterState`, `ServiceTile`, `TrustStat`, `CityLink`
7. `src/lib/formatPrice.ts`: Indian lakh/crore formatter with `/mo` suffix
8. `src/lib/calculateBrokerSavings.ts`: `return monthlyRent * 2`
9. `src/lib/filterRentals.ts`: 5-condition filter function
10. `src/data/rentalProperties.ts`: 8 mock `RentalProperty` entries
11. UI atoms: `Button.tsx` (purple / outlinePurple / ghost), `ZeroBrokerageBadge.tsx`, `OwnerVerifiedBadge.tsx`, `PetFriendlyBadge.tsx`, `ReraBadge.tsx`

**Day 1 gate:**
- [ ] `tsc --noEmit` exits 0
- [ ] `filterRentals(RENTAL_PROPERTIES, { bhk: [], furnishing: '', maxRent: null, petFriendly: null, tenantPreference: '' })` → 8 results
- [ ] `filterRentals(RENTAL_PROPERTIES, { bhk: ['2 BHK'], furnishing: '', maxRent: null, petFriendly: null, tenantPreference: '' })` → 3 results (nb-01, nb-04, nb-07)
- [ ] `calculateBrokerSavings(28000)` → `56000`
- [ ] `formatPrice(28000)` → `'₹28,000/mo'`
- [ ] `formatPrice(65000)` → `'₹65,000/mo'`
- [ ] Zero atom uses `font-weight: 700`

---

### Day 2 — Hero + Filter + Cards

**Goal:** All above-the-fold content functional — hero, savings strip, filter bar, property cards.

**Tasks:**
12. `HeroSection.tsx`: Purple gradient bg, search widget (city + locality + search button), `BrokerSavingsStrip` embedded or immediately below
13. `BrokerSavingsStrip.tsx`: Full-width purple strip, static savings example (`calculateBrokerSavings(30000)` = 60,000 displayed)
14. `OwnerProfileSnippet.tsx`: Owner photo (32×32px, 8px radius, NOT 50%), name, `OwnerVerifiedBadge`, responseTime
15. `RentalPropertyCard.tsx`: Full card — `ZeroBrokerageBadge`, rent via `formatPrice`, deposit via `toLocaleString`, meta row, `availableFrom`, `tenantPreference` pill, conditional `PetFriendlyBadge`, `OwnerProfileSnippet`, "Contact Owner" CTA
16. `PropertyGrid.tsx`: Responsive grid (3-col → 2-col → 1-col), receives pre-filtered array
17. `RentalFilterBar.tsx`: `'use client'`, `RentalFilterState`, BHK chips, furnishing chips, max-rent presets, pet-friendly toggle, tenant-preference chips, `useMemo` wrapping `filterRentals`, ARIA live region, renders `PropertyGrid`
18. `BrokerSavingsWidget.tsx`: `'use client'`, rent number input, live savings display in green

**Day 2 gate:**
- [ ] Card displays deposit as `₹56,000` (NOT `₹56,000/mo`)
- [ ] Card displays rent as `₹28,000/mo`
- [ ] CTA text is exactly `"Contact Owner"` — no other variant
- [ ] Filter: clicking "2 BHK" shows 3 properties
- [ ] Filter: clicking "Pet Friendly" toggle shows 4 properties
- [ ] `useMemo` present in `RentalFilterBar.tsx`
- [ ] ARIA live region updates on filter change

---

### Day 3 — Supporting Sections

**Goal:** Page complete with trust bar, services, city links.

**Tasks:**
19. `TrustBar.tsx`: Dark bg, 4 stats, Framer Motion stagger entrance, `viewport={{ once: true }}`
20. `Services.tsx`: 4 service tiles in 4-column grid (responsive), Lucide icon map: `Home`, `UserCheck`, `Calculator`, `MapPin`
21. `CityLinks.tsx`: 12 Indian cities in 4-column grid (responsive). No international cities (unlike bw_03)
22. `SiteNav.tsx`: Sticky, purple logo, nav links (Rent / Buy / Post Property / Help), "Post Property Free" purple button, scroll shadow
23. `Footer.tsx`: Dark bg, 4 columns (Company / Rent / Tools / Legal), white text

**Day 3 gate:**
- [ ] TrustBar: `grep "prefers-reduced-motion"` → present in globals.css ✓
- [ ] SiteNav: sticky, scroll shadow active on scroll
- [ ] Page assembles without `'use client'` on `page.tsx`
- [ ] `npm run build` exits 0

---

### Day 4 — QA Pass

**Goal:** All 50 checklist items green, build confirmed.

**Tasks:**
24. Run full QA grep suite (see `06_Tasks.md` TASK-020)
25. Fix any grep failures
26. Verify responsive layout at 320px, 768px, 1280px
27. Verify `prefers-reduced-motion` disables Framer Motion
28. Confirm `tsc --noEmit` and `npm run build` both exit 0
29. Spot-check: no `border-radius: 50%` on any owner photo
30. Spot-check: no `formatPrice(deposit)` anywhere in codebase

**Day 4 gate:**
- [ ] All QA greps pass (0 hits on failure patterns)
- [ ] `npm run build` exits 0, `/out` directory present
- [ ] `tsc --noEmit` exits 0

---

### Cut Order

**Never cut:**
- RentalFilterBar with `filterRentals` + `useMemo` (core directory UX — 5-condition filter)
- `calculateBrokerSavings` widget with live input (brand differentiator — zero brokerage positioning)
- `ZeroBrokerageBadge` + `OwnerVerifiedBadge` atoms (rental-specific identity components)

**Cut first if time-constrained:**
- Services section (4 tiles)
- CityLinks grid (12 cities)
- BrokerSavingsStrip static banner (keep BrokerSavingsWidget; cut strip)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `formatPrice(deposit)` called — shows `/mo` suffix on deposit | High | High | Deposit must use `toLocaleString('en-IN')` — NOT `formatPrice()`; `grep -r "formatPrice.*deposit" src` → empty |
| CTA text not "Contact Owner" for all 8 properties | High | High | All mock properties must have `listingSource: 'Owner'`; CTA hardcoded to "Contact Owner" is correct here |
| Owner photo given `border-radius: 50%` | Medium | High | `OwnerProfileSnippet` photo must use `border-radius: 8px` — NOT circular; grep `.module.css` |
| RERA / EMI / investment data in mock property objects | Medium | Medium | This is rental-only; data types must have `mode: 'rent'` only — no `reraNumber`, no EMI, no `yield` fields |
| `font-weight: 700` in CSS modules | Medium | Medium | Plus Jakarta Sans 700 not loaded; `grep -r "font-weight: 700" src --include="*.module.css"` → empty |
| `calculateBrokerSavings` not called in BrokerSavingsStrip | Low | Medium | Strip must call `calculateBrokerSavings(30000)` = 60000 — not a hardcoded value |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
