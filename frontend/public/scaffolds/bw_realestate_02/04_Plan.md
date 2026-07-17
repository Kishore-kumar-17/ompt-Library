# 04 — Plan
## Indian Property Detail Page · bw_realestate_02

---

## 4-Day Build Plan

---

### Day 1 — Foundation

**Goal:** Project scaffold, types, utilities, tokens, shared UI atoms

#### Tasks
1. `npx create-next-app@latest veriAcres --typescript --app --no-tailwind --import-alias "@/*"`
2. Configure `next.config.ts` → `output: 'export'`, `images: { unoptimized: true }`
3. Install: `npm install lucide-react framer-motion`
4. Write `src/types/index.ts` — TabSection, PropertyDetail, AmenityGroup, FloorPlan, LocalityInsights, NearbyPlace, PriceTrendPoint, SimilarProperty, EMIInputs + all union types
5. Write `src/lib/data.ts` — one PropertyDetail (Whitefield 3 BHK) + 3 SimilarProperty entries
6. Write `src/lib/formatPrice.ts` — formatPrice() + formatPriceRange()
7. Write `src/lib/calculateEMI.ts` — EMI formula, validate with `calculateEMI(9_000_000, 8.5, 20)` → 78152
8. Write `src/app/globals.css` — 8 tokens, .sr-only, prefers-reduced-motion
9. Write `src/app/layout.tsx` — Poppins 400+500+600, no 700
10. Write `src/components/ui/Button.tsx` + `Button.module.css` — primary (dark-on-orange) + outlineOrange, radius 6px
11. Write `src/components/ui/VerifiedBadge.tsx` + `VerifiedBadge.module.css` — green text, no bg
12. Write `src/components/ui/ReraBadge.tsx` + `ReraBadge.module.css` — green text + border
13. Write `src/components/ui/ListingSourcePill.tsx` + `ListingSourcePill.module.css`

#### Gate Check — End of Day 1
- [ ] `tsc --noEmit` exits 0
- [ ] `calculateEMI(9_000_000, 8.5, 20)` → `78152`
- [ ] `formatPrice(12_000_000)` → `₹1.20 Cr`
- [ ] `formatPrice(9_500_000)` → `₹95 L`
- [ ] Button primary: `color: var(--color-text)` (NOT white)
- [ ] No hex in any `.module.css` file

---

### Day 2 — Layout + Gallery + Header + RERA

**Goal:** SiteNav, Breadcrumb, PropertyGallery, PropertyHeader, RERASection

#### Tasks

**SiteNav**
1. Write `src/components/layout/SiteNav.tsx` — `'use client'`, scroll shadow, orange logo, nav links
2. `SiteNav.module.css`

**Breadcrumb**
3. Write `src/components/layout/Footer.tsx` + `Footer.module.css` — dark bg, 4 columns
4. Write `src/components/property/Breadcrumb.tsx` + `Breadcrumb.module.css`
   - Props: `crumbs: string[]`; last crumb is active (text colour, not link)
   - Separator: ChevronRight Lucide, 12px

**PropertyGallery**
5. Write `src/components/property/PropertyGallery.tsx` — `'use client'`
   - `useState<number>(0)` for active thumbnail index
   - 5 thumbnails (image placeholders using `var(--color-surface)`)
   - Active thumbnail: `border: 2px solid var(--color-orange)`
   - Photo count badge: Camera icon + `{photos} Photos`, `rgba(0,0,0,0.6)` bg
   - Hero image: `border-radius: 0` (full bleed)
6. `PropertyGallery.module.css`

**PropertyHeader**
7. Write `src/components/property/PropertyHeader.tsx` — static
   - Badge row: `<ListingSourcePill>` + conditional `<VerifiedBadge>` + conditional `<ReraBadge>`
   - Price: `{formatPrice(property.price)}`, `1.75rem`, orange (large text — passes 4.15:1 at this size)
   - Specs grid: BHK, Super Area, Carpet Area, Floor, Total Floors, Facing, Age, Possession, Furnishing
8. `PropertyHeader.module.css`

**RERASection**
9. Write `src/components/property/RERASection.tsx` — static
   - Props: `reraNumber: string`, `reraExpiryDate?: string`, `reraAuthority?: string`
   - `border-left: 4px solid var(--color-green)`; `background: var(--color-surface)`; `border-radius: 8px`
   - Grid: registration number, expiry date, authority
   - "View on RERA Portal" link (href="#")
10. `RERASection.module.css`

#### Gate Check — End of Day 2
- [ ] Gallery renders with 5 thumbnail placeholders; clicking changes active thumbnail
- [ ] Active thumbnail gets orange border (token, not hex)
- [ ] Header price in orange at 1.75rem
- [ ] RERASection always visible (not inside a tab)
- [ ] RERASection has green left border
- [ ] `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty

---

### Day 3 — Tabs + Sidebar + Similar Properties

**Goal:** PropertyTabs (5 conditional content sections), sidebar panels, similar properties

#### Tasks

**PropertyTabs**
1. Write `src/components/property/PropertyTabs.tsx` — `'use client'`
   - `useState<TabSection>('overview')` — 5 tab buttons
   - `role="tablist"`, `role="tab"`, `aria-selected` on each tab
   - Conditional JSX for tab content — NO `display: none`
   - Active tab: `color: var(--color-orange); border-bottom: 3px solid var(--color-orange)`
2. `PropertyTabs.module.css`

**Tab Components (all static)**
3. `src/components/property/tabs/OverviewTab.tsx` — description paragraph + possession/furnishing summary
4. `src/components/property/tabs/FloorPlanTab.tsx` — render `FloorPlan[]` as a table/grid with BHK, super area, carpet area
5. `src/components/property/tabs/AmenitiesTab.tsx` — render `AmenityGroup[]` with category heading + item chips
6. `src/components/property/tabs/LocalityTab.tsx` — walk score bar, transit score bar, nearby places grid
   - Score bar: `width: {score}%`, `background: var(--color-green)`, `border-radius: 4px`
   - Category icons: School → `GraduationCap`, Hospital → `Cross`, Metro → `Train`, Mall → `ShoppingBag`, Restaurant → `Utensils`
7. `src/components/property/tabs/PriceTrendTab.tsx` — 6-point trend as data list (month + price/sqft)
   - Arrow up indicator if current > previous month

**Sidebar**
8. Write `src/components/sidebar/ContactForm.tsx` — `'use client'`
   - Inputs: Name, Phone, Email, Message
   - Submit button: primary orange (dark text)
   - Basic validation: required fields
9. `ContactForm.module.css`
10. Write `src/components/sidebar/EMICalculator.tsx` — `'use client'`
    - Inputs: Loan Amount (number), Annual Rate (number, default 8.5), Tenure Years (number, default 20)
    - Live result: `calculateEMI(loanAmount, rate, years)`, displayed via `formatPrice(emi)`
    - `useEffect` or derived value — recalculates on every input change
11. `EMICalculator.module.css`
12. Write `src/components/sidebar/SidebarPanel.tsx` — `'use client'`
    - Toggle state: `'contact' | 'emi'`
    - Two toggle buttons at top; renders `<ContactForm />` or `<EMICalculator />`
    - Props: `defaultPrincipal?: number` (passed to EMICalculator)
13. `SidebarPanel.module.css`

**Similar Properties**
14. Write `src/components/property/SimilarPropertyCard.tsx` + `.module.css`
    - Compact: image placeholder, title, `formatPrice(price)`, BHK, locality, `Contact {listingSource}` CTA
15. Write `src/components/property/SimilarProperties.tsx` + `.module.css`
    - 3-column grid of `SimilarPropertyCard`
    - Section heading: "Similar Properties in Whitefield"

#### Gate Check — End of Day 3
- [ ] All 5 tabs switch correctly via conditional JSX
- [ ] `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → empty
- [ ] `aria-selected` updates on tab click (ARIA check)
- [ ] EMICalculator: `calculateEMI(9_000_000, 8.5, 20)` renders `₹78,152/mo`
- [ ] SidebarPanel toggle switches between ContactForm and EMICalculator
- [ ] SimilarPropertyCard CTA: `Contact {source}` — not hardcoded
- [ ] `tsc --noEmit` exits 0

---

### Day 4 — Framer Motion + QA + Build

**Goal:** Motion entrances, full QA sweep, production build

#### Tasks

**Framer Motion**
1. PropertyGallery: `opacity: 0, y: 20 → visible`, `viewport={{ once: true }}`
2. PropertyHeader: `opacity: 0, y: 16 → visible`
3. RERASection: `opacity: 0, x: -20 → visible` (slides from left — matches left-border accent direction)
4. SimilarProperties cards: stagger 0.1s per card
5. Verify `prefers-reduced-motion` is suppressed by `globals.css`

**page.tsx**
6. Assemble full page — see Architecture `02_Architecture.md` for assembly

**QA**
7. `tsc --noEmit` → 0 errors
8. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
9. `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → empty
10. `grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components --include="*.tsx"` → empty (dynamic only)
11. `grep -r "border-radius: 50%" src/components --include="*.module.css"` → empty
12. `grep -r "font-weight: 700" src --include="*.module.css"` → empty
13. `grep -r "box-shadow" src/components --include="*.module.css"` → SidebarPanel + SiteNav only
14. Orange button check: `grep -r "var(--color-white)" src/components/ui/Button.module.css` → must NOT appear on `.primary`

**Accessibility**
15. All images: descriptive `alt` attribute
16. Icon-only elements: `aria-hidden="true"` + sibling text/`aria-label`
17. Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, tab panel `role="tabpanel"`
18. Contact form inputs: `<label>` elements linking to inputs
19. `<nav aria-label="Main navigation">` in SiteNav
20. `<footer>` element wraps Footer

**Build**
21. `npm run build` → exit 0, `/out` created
22. Serve `/out` locally → verify no 404s, all sections load

#### Final Gate Check
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0, `/out` exists
- [ ] All tab content switches correctly
- [ ] RERASection always visible, not inside a tab
- [ ] EMICalculator produces correct results
- [ ] Sidebar sticky on desktop, static on mobile
- [ ] All similar property CTAs dynamic
- [ ] Orange button text is dark, not white
- [ ] All 8 QA greps pass

---

### Cut Order

**Never cut:**
- PropertyTabs with conditional JSX (5 tabs — no `display: none`)
- RERASection as always-visible standalone section (legal compliance — outside and below tabs)
- EMICalculator with `calculateEMI` utility + SidebarPanel toggle

**Cut first if time-constrained:**
- SimilarProperties grid
- PriceTrendTab data list
- Framer Motion section entrance animations

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Tab content toggled with `display: none` instead of conditional JSX | High | High | `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → must be empty |
| Orange button text set to white | High | High | Dark text on orange `#E84118` = 4.64:1 ✓ for large text — button `color` must be `var(--color-text)`, NOT white |
| RERASection placed inside a PropertyTab | Medium | High | RERA must always be visible — outside tab component, not behind any tab toggle |
| `font-weight: 700` used in CSS modules | Medium | Medium | Poppins 700 not loaded (400/500/600 only); `grep -r "font-weight: 700" src --include="*.module.css"` → empty |
| `toLocaleString` called in JSX for rent/deposit formatting | Medium | Medium | All price display must use `formatPrice()` — no raw `toLocaleString` in component files |
| `calculateEMI` producing wrong result | Low | High | Validate before integrating: `calculateEMI(9_000_000, 8.5, 20)` → `78152` |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
