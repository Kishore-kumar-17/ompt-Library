# 04 — Plan
## Indian Property Listing Portal · bw_realestate_01

---

## 4-Day Build Plan

---

### Day 1 — Foundation

**Goal:** Project scaffold, types, mock data, tokens, shared UI atoms

#### Tasks
1. `npx create-next-app@latest veriproperty --typescript --app --no-tailwind --import-alias "@/*"`
2. Configure `next.config.ts` → `output: 'export'`, `images: { unoptimized: true }`
3. Install dependencies: `lucide-react`, `framer-motion`
4. Write `src/types/index.ts` — all types (SearchMode, BHKType, ListingSource, Property, FeaturedProject, TrustStat, CityLink, SearchFilters)
5. Write `src/lib/data.ts` — 8 properties, 3 featuredProjects, 4 trustStats, 8 cityLinks
6. Write `src/lib/formatPrice.ts` — `formatPrice()` + `formatPriceRange()`
7. Write `src/lib/filterProperties.ts` — `filterProperties()` with 4 dimensions
8. Write `src/app/globals.css` — 8 CSS tokens + `.sr-only` + `prefers-reduced-motion`
9. Write `src/app/layout.tsx` — Poppins 400+500+600 via `next/font/google`, `<html lang="en">`
10. Write `src/components/ui/Button.tsx` + `Button.module.css` — primary + outlineRed variants, md + sm sizes, fullWidth

#### Gate Check — End of Day 1
- [ ] `tsc --noEmit` exits 0
- [ ] `grep -r "#" src/app/globals.css` → returns only comment lines (no inline hex)
- [ ] `grep -r "toLocaleString" src/lib/formatPrice.ts` → appears only for the `/mo` branch
- [ ] `node -e "const {formatPrice} = require('./src/lib/formatPrice'); console.log(formatPrice(12000000))"` → `₹1.20 Cr`
- [ ] `node -e "..."` → `formatPrice(4500000)` → `₹45 L`, `formatPrice(28000)` → `₹28,000/mo`

---

### Day 2 — Hero + Filter + PropertyCard

**Goal:** The three interactive components that define the core UX

#### Tasks

**HeroSearchWidget**
1. Write `src/components/home/HeroSearchWidget.tsx` — `'use client'`
2. `useState<SearchMode>('buy')` — 5 tabs rendered from a `MODES` constant array
3. Conditional JSX per mode — buy/rent: PropertyTypeSelect + BHKSelector + BudgetRangeSelect; pg: PreferredBySelector; commercial: CommercialTypeSelect; plot: PlotAreaSelect
4. Submit button scrolls to `#property-section` via `document.getElementById('property-section')?.scrollIntoView({ behavior: 'smooth' })`
5. Write `HeroSearchWidget.module.css`

**FilterBar**
6. Write `src/components/home/FilterBar.tsx` — `'use client'`
7. State: `bhk: BHKType[]`, `possession: PossessionStatus | ''`, `propertyType: PropertyType | ''`, `furnished: FurnishingStatus | ''`
8. Callback prop: `onFilterChange: (filters: FilterState) => void`
9. BHK chips: multi-select toggle; possession/type/furnished: single-select radio-chip
10. Write `FilterBar.module.css`

**PropertyCard**
11. Write `src/components/ui/VerifiedBadge.tsx` + `VerifiedBadge.module.css` — green text, no bg
12. Write `src/components/ui/ReraBadge.tsx` + `ReraBadge.module.css` — green text + border
13. Write `src/components/ui/ListingSourcePill.tsx` + `ListingSourcePill.module.css` — inline style colours
14. Write `src/components/home/PropertyCard.tsx` — static (no `'use client'`)
15. CTA: `<Button variant="outlineRed">Contact {property.listingSource}</Button>`
16. Price: `{formatPrice(property.price)}`
17. Possession badge on image; photo count badge on image
18. Write `PropertyCard.module.css`

#### Gate Check — End of Day 2
- [ ] `grep -r "Contact Owner" src/components --include="*.tsx"` → empty
- [ ] `grep -r "Contact Builder" src/components --include="*.tsx"` → empty
- [ ] `grep -r "Contact Agent" src/components --include="*.tsx"` → empty
- [ ] `grep -r "display.*none" src/components/home/HeroSearchWidget.tsx` → empty
- [ ] `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
- [ ] All 5 tabs render correct field sets (visual check)
- [ ] VerifiedBadge: green text on white background (not white on green)

---

### Day 3 — PropertyGrid + Supporting Sections

**Goal:** Filtered listing grid + FeaturedProjects + TrustBar + CityLinks + SiteNav

#### Tasks

**PropertyGrid**
1. Write `src/components/home/PropertyGrid.tsx` — `'use client'`
2. `useState<FilterState>` — passed to FilterBar via `onFilterChange`
3. `useMemo(() => filterProperties(properties, filters), [properties, filters])`
4. ARIA live region: `<div aria-live="polite" className="sr-only">{count} properties found</div>`
5. Result count display: `<p>{filteredProperties.length} properties found</p>`
6. Grid layout: 3 columns desktop, 2 tablet, 1 mobile
7. `id="property-section"` on the section element (hero search scrolls here)
8. Write `PropertyGrid.module.css`

**SiteNav**
9. Write `src/components/layout/SiteNav.tsx` — static server component
10. `useEffect` / `useState` for scroll shadow → no, this needs `'use client'` only for scroll shadow
11. Logo in red, nav links, city pill, "Post Property Free" primary button
12. Write `SiteNav.module.css`

**Supporting Sections**
13. Write `src/components/home/FeaturedProjects.tsx` + `FeaturedProjects.module.css`
    - 3 project cards; `formatPriceRange(project.priceFrom, project.priceTo)`
    - RERA badge if `reraRegistered`; photo count; unit types as pills
14. Write `src/components/home/TrustBar.tsx` + `TrustBar.module.css`
    - Dark bg `var(--color-dark)`, 4 stat blocks with Lucide icons
15. Write `src/components/home/CityLinks.tsx` + `CityLinks.module.css`
    - 8-column responsive grid; city name + property count

**Footer**
16. Write `src/components/layout/Footer.tsx` + `Footer.module.css`
    - Dark bg `var(--color-dark)`, 4-column nav grid

#### Gate Check — End of Day 3
- [ ] `useMemo` used in PropertyGrid (grep check)
- [ ] `aria-live="polite"` present in PropertyGrid
- [ ] `id="property-section"` on section element
- [ ] `formatPriceRange()` used in FeaturedProjects (not raw numbers)
- [ ] All 8 mock properties render with correct source pills
- [ ] TrustBar: white text on dark bg (contrast ✓)

---

### Day 4 — Motion + QA + Build

**Goal:** Framer Motion entrances, full QA sweep, production build

#### Tasks

**Framer Motion**
1. Wrap `PropertyGrid` section: `opacity: 0, y: 32 → visible`, `viewport={{ once: true }}`
2. Wrap `FeaturedProjects` section: `opacity: 0, y: 24 → visible`
3. Wrap `TrustBar`: stagger children `0.1s` delay
4. Wrap `CityLinks`: `opacity: 0, y: 24 → visible`
5. Verify all motion respects `prefers-reduced-motion` (globals.css already handles `animation-duration: 0.01ms`)

**QA Sweep**
6. `tsc --noEmit` → 0 errors
7. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
8. `grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components --include="*.tsx"` → empty
9. `grep -r "display.*none" src/components/home/HeroSearchWidget.tsx` → empty
10. `grep -r "toLocaleString" src/components --include="*.tsx"` → empty (formatPrice handles this)
11. `grep -r "box-shadow" src/components --include="*.module.css"` → only SearchWidget, PropertyCard, SiteNav, FilterBar
12. `grep -r "border-radius: 20px" src/components --include="*.module.css"` → only FilterBar chips
13. `grep -r "border-radius: 50%" src/components --include="*.module.css"` → empty
14. `grep -r "Poppins\|Roboto\|Inter\|Lato\|Nunito" src/app/layout.tsx` → only Poppins

**Accessibility**
15. All interactive elements have `aria-label` or visible text
16. FilterBar chips have `role="checkbox"` (BHK multi) or `role="radio"` (single-select)
17. Tab buttons in HeroSearchWidget have `aria-selected` + `role="tab"`
18. `<nav>` element wraps SiteNav links
19. `<footer>` element wraps Footer

**Build**
20. `npm run build` → exits 0, `/out` directory created
21. Serve `/out` locally → verify no 404s on static assets

#### Final Gate Check
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0, `/out` exists
- [ ] All grep checks pass (hex, hardcoded CTA, display:none, toLocaleString in components)
- [ ] 5 mode tabs each render correct field sets
- [ ] FilterBar: multi-select BHK + single-select possession/type/furnished all work simultaneously
- [ ] Result count updates on filter change with ARIA announcement
- [ ] Hero search submit scrolls to `#property-section`
- [ ] All prices display in lakh/crore format
- [ ] Verified badge: green text (not green bg)
- [ ] RERA badge: green text + border
- [ ] ListingSourcePill present on every PropertyCard
- [ ] CTA text matches listingSource on all 8 cards

---

### Cut Order

**Never cut:**
- HeroSearchWidget with 5 conditional mode field sets (core search UX — each mode must have unique JSX)
- PropertyGrid + FilterBar with 4-dimension `filterProperties` + `useMemo`
- Dynamic `Contact ${property.listingSource}` CTA (no hardcoded strings)

**Cut first if time-constrained:**
- FeaturedProjects section
- CityLinks grid
- Framer Motion stagger animations on PropertyGrid / TrustBar

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Hardcoded CTA text (`"Contact Owner"`, `"Contact Builder"`, etc.) | High | High | CTA must be dynamic: `Contact ${property.listingSource}`; `grep -r "Contact Owner\|Contact Builder\|Contact Agent" src` → must be empty |
| HeroSearchWidget uses `display: none` to toggle mode fields | High | High | Conditional JSX required — NOT `display: none`; `grep -r "display.*none" src/components/home/HeroSearchWidget.tsx` → empty |
| `toLocaleString` called directly in JSX | Medium | High | All prices must go through `formatPrice()`; `grep -r "toLocaleString" src/components --include="*.tsx"` → must be empty |
| VerifiedBadge / ReraBadge shows white text on green background | Medium | High | Both badges use green TEXT on white bg — never white-on-green; verify computed `color` in DevTools |
| `border-radius: 50%` anywhere in build | Medium | Medium | Circular photos explicitly forbidden; `grep -r "border-radius: 50%" src/components --include="*.module.css"` → empty |
| 5-mode widget has fewer than 5 distinct field sets | Medium | High | Each of buy / rent / pg / commercial / plot needs unique conditional JSX — verify all 5 modes visually |
| CSS token leak (hex in .module.css) | Medium | Medium | `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
