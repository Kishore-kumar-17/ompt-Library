# 04 — Plan
## Indian Premium Property Portal · bw_realestate_03

---

## 4-Day Build Plan

### Day 1 — Foundation

1. `npx create-next-app@latest squareview --typescript --app --no-tailwind --import-alias "@/*"`
2. `next.config.ts` → `output: 'export'`, `images: { unoptimized: true }`
3. `npm install lucide-react framer-motion`
4. `src/types/index.ts` — all types
5. `src/lib/data.ts` — 6 properties, 3 agents, 3 launches, 4 services, trustStats, cityLinks
6. `src/lib/formatPrice.ts`
7. `src/lib/formatYield.ts` — `formatYield(n)` → `'4.2% p.a.'`
8. `src/lib/filterByCategory.ts` — 5-case switch
9. `src/app/globals.css` — 8 tokens, .sr-only, prefers-reduced-motion
10. `src/app/layout.tsx` — DM Sans 400+500+600 (NOT Poppins)
11. `Button.tsx + .module.css` — teal (white text), gold (dark text), outlineTeal
12. `SqVerifiedBadge.tsx + .module.css` — `color: var(--color-teal)` — NOT green
13. `ReraBadge.tsx + .module.css` — green text + border
14. `YieldBadge.tsx + .module.css` — `background: var(--color-gold); color: var(--color-text)` — no white
15. `ListingSourcePill.tsx + .module.css`

**Gate Check — Day 1:**
- [ ] `tsc --noEmit` exits 0
- [ ] `filterByCategory(properties, 'high-yield')` → 3 properties (sq-02, sq-04, sq-06)
- [ ] `formatYield(4.2)` → `'4.2% p.a.'`
- [ ] `YieldBadge.module.css`: no `var(--color-white)` in `.badge`
- [ ] `SqVerifiedBadge.module.css`: `var(--color-teal)` not `var(--color-green)`
- [ ] `layout.tsx` imports `DM_Sans` not `Poppins`

---

### Day 2 — SiteNav + Hero + CategoryFilter + PropertyGrid

1. `SiteNav.tsx + .module.css` — `'use client'`, teal logo, scroll shadow
2. `Footer.tsx + .module.css` — dark bg, 5 columns
3. `HeroSection.tsx + .module.css` — gradient bg (hex exception with comment), search widget, tag cloud
4. `PremiumPropertyCard.tsx + .module.css` — 12px radius, investment row (YieldBadge + appreciation %)
5. `PropertyGrid.tsx + .module.css` — receives `PremiumProperty[]`, 3-column grid
6. `CategoryFilter.tsx + .module.css` — `'use client'`, 5 pill chips, `useMemo`, ARIA live region, renders `PropertyGrid`

**Gate Check — Day 2:**
- [ ] All 5 category tabs filter correctly
- [ ] `useMemo` wraps `filterByCategory`
- [ ] ARIA live region: `aria-live="polite"` + `.sr-only`
- [ ] Category chips: `border-radius: 24px` (not 20px from bw_01)
- [ ] PremiumPropertyCard investment row shows yield badge + appreciation
- [ ] Agent photo radius: `8px` (not 50%)
- [ ] `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty (hero gradient handled in globals or documented)
- [ ] CTA: `Contact {property.listingSource}` — dynamic

---

### Day 3 — AgentDirectory + NewLaunches + Services + CityLinks + TrustBar

1. `AgentCard.tsx + .module.css` — 8px photo, gold rating, specs, teal SqVerifiedBadge
2. `AgentDirectory.tsx + .module.css` — 3-column grid
3. `NewLaunchCard.tsx + .module.css` — launchDate display, `formatPriceRange()`, RERA badge
4. `NewLaunches.tsx + .module.css` — horizontal scroll (`overflow-x: auto`, `scrollbar-width: none`)
5. `ServiceTile.tsx + .module.css` — icon, title, description, CTA button
6. `Services.tsx + .module.css` — 4-column grid
7. `CityLinks.tsx + .module.css` — 5-column grid (10 cities), international marker for Dubai/London
8. `TrustBar.tsx + .module.css` — dark bg, ICON_MAP pattern

**Gate Check — Day 3:**
- [ ] Agent photo: `border-radius: 8px` — confirmed no `50%`
- [ ] Agent rating displayed in gold colour
- [ ] NewLaunches horizontal scroll works without showing scrollbar
- [ ] CityLinks shows 10 entries including Dubai and London
- [ ] `tsc --noEmit` exits 0

---

### Day 4 — page.tsx + Framer Motion + QA + Build

1. `src/app/page.tsx` — full page assembly
2. Framer Motion: HeroSection, CategoryFilter section, AgentDirectory (stagger 0.1s), NewLaunches, Services (stagger 0.08s), CityLinks
3. QA grep suite (see TASK-022 in `06_Tasks.md`)
4. `npm run build` → verify `/out`

**Final Gate Check:**
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0, `/out` exists
- [ ] No hex in `.module.css` (gradient exception documented)
- [ ] No `border-radius: 50%` anywhere
- [ ] No `font-weight: 700` anywhere
- [ ] No white on gold in YieldBadge
- [ ] SqVerifiedBadge is teal
- [ ] All CTAs dynamic
- [ ] All prices via `formatPrice()`
- [ ] All yields via `formatYield()`
- [ ] CategoryFilter: single-select only

---

### Cut Order

**Never cut:**
- CategoryFilter + `filterByCategory` + `useMemo` (core search/filter UX)
- YieldBadge with dark text on gold (contrast-critical — white on gold #C9941A FAILS)
- SqVerifiedBadge using teal (not green — brand distinction)

**Cut first if time-constrained:**
- AgentDirectory section
- NewLaunches horizontal scroll strip
- Services grid section

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| White text on YieldBadge gold background | High | High | White on `#C9941A` = 2.72:1 — FAILS WCAG AA; YieldBadge must use `color: var(--color-text)` (dark) |
| SqVerifiedBadge uses `var(--color-green)` instead of `var(--color-teal)` | High | High | Brand spec: teal for SquareYards verification; `grep -r "color-green" src/components/ui/SqVerifiedBadge.module.css` → empty |
| `border-radius: 50%` on agent or property photos | Medium | High | Agent photo: `8px` radius, property photos: `12px` — no circular photos; `grep -r "50%" src/components --include="*.module.css"` → empty |
| `font-weight: 700` in CSS modules | Medium | Medium | DM Sans 700 not loaded (400/500/600 only); `grep -r "font-weight: 700" src --include="*.module.css"` → empty |
| CategoryFilter allows multi-select | Medium | Medium | Single-select only — clicking second chip must deselect first; verify interaction manually |
| PremiumPropertyCard CTA is hardcoded | Low | Medium | CTA must be `Contact ${property.listingSource}` dynamic; `grep -r "Contact " src/components/home/PremiumPropertyCard.tsx` |
| CSS token leak (hex in .module.css) | Medium | Medium | Hero gradient is documented exception; `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty |
