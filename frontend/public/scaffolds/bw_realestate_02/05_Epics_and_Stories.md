# 05 — Epics and Stories
## Indian Property Detail Page · bw_realestate_02
### VeriProperty Detail · Orange + White · Poppins · Sticky Sidebar + EMI Calculator

---

## Epic 1 — Design System Foundation

### S1.1 — CSS Token File
**As a** developer,
**I want** a `globals.css` with 8 CSS custom properties,
**so that** no hex codes appear in module files and all colours are tokenised.

**Acceptance criteria:**
- [ ] 8 tokens: `--color-orange`, `--color-white`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-green`, `--color-dark`
- [ ] `.sr-only` utility class included
- [ ] `prefers-reduced-motion` block: `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important`
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty

### S1.2 — Poppins Font Setup
**As a** developer,
**I want** Poppins loaded via `next/font/google` with weights 400/500/600 only,
**so that** typography is consistent and no FOUT occurs.

**Acceptance criteria:**
- [ ] `Poppins` imported with `weight: ['400', '500', '600']` — no `'700'`
- [ ] `variable: '--font-sans'` set
- [ ] `<html lang="en" className={poppins.variable}>`
- [ ] `grep -r "font-weight: 700" src --include="*.module.css"` → empty (max 600)

### S1.3 — TypeScript Types
**As a** developer,
**I want** all domain types in `src/types/index.ts`,
**so that** components are strictly typed with no `any`.

**Acceptance criteria:**
- [ ] All types exported: `TabSection`, `PropertyDetail`, `AmenityGroup`, `FloorPlan`, `LocalityInsights`, `NearbyPlace`, `PriceTrendPoint`, `SimilarProperty`, `EMIInputs`
- [ ] Union types: `ListingSource`, `BHKType`, `PossessionStatus`, `FurnishingStatus`, `Facing`, `PropertyAge`, `PlaceCategory`
- [ ] `TabSection = 'overview' | 'floor-plan' | 'amenities' | 'locality' | 'price-trends'`
- [ ] `SimilarProperty = { id: string; title: string; price: number; bhk: BHKType; locality: string; listingSource: ListingSource; imageUrl: string }`
- [ ] `EMIInputs = { principal: number; ratePercent: number; tenureYears: number }`
- [ ] `tsc --noEmit` exits 0

### S1.4 — formatPrice + calculateEMI Utilities
**As a** developer,
**I want** `formatPrice()` and `calculateEMI()` utilities,
**so that** all price and EMI display is formula-driven — never hardcoded.

**Acceptance criteria:**
- [ ] `formatPrice(12_000_000)` → `'₹1.20 Cr'`
- [ ] `formatPrice(9_500_000)` → `'₹95 L'`
- [ ] `formatPrice(78_152)` → `'₹78,152/mo'`
- [ ] `calculateEMI(9_000_000, 8.5, 20)` → `78152` (±1)
- [ ] EMI uses formula: `Math.round(P × r × (1+r)^n / ((1+r)^n − 1))` — not a lookup table
- [ ] `r` = monthly rate = `annualRate / 12 / 100`; `n` = months = `tenureYears * 12`

### S1.5 — UI Atom Components
**As a** developer,
**I want** Button (dark-on-orange), VerifiedBadge, ReraBadge, ListingSourcePill,
**so that** all cards and CTAs share consistent atoms.

**Acceptance criteria:**
- [ ] Button primary: `background: var(--color-orange); color: var(--color-text)` — NEVER white on orange
- [ ] `grep -r "color-white" src/components/ui/Button.module.css` → zero `color:` rules in `.primary` (orange = 4.15:1 at large text — dark text only)
- [ ] Button outlineOrange: `color: var(--color-orange); border: 1.5px solid var(--color-orange); background: transparent`
- [ ] VerifiedBadge: `color: var(--color-green)` — no green background
- [ ] ReraBadge: `color: var(--color-green); border: 1px solid var(--color-green); border-radius: 4px`
- [ ] No hex in any atom module CSS

---

## Epic 2 — Navigation & Layout Shell

### S2.1 — SiteNav
**As a** visitor,
**I want** a sticky nav with orange logo, links, and CTA,
**so that** I can navigate from any scroll position.

**Acceptance criteria:**
- [ ] `position: sticky; top: 0; z-index: 100`
- [ ] Logo: `color: var(--color-orange)`; weight 600; 24px
- [ ] Links: Buy, Rent, PG, Commercial, New Projects
- [ ] CTA: "Post Property Free" — primary Button (dark text on orange)
- [ ] Scroll shadow: `0 2px 8px rgba(0,0,0,0.08)` added via `useEffect` JS class
- [ ] `<nav aria-label="Main navigation">`

### S2.2 — Breadcrumb
**As a** visitor,
**I want** a breadcrumb showing my location in the site hierarchy,
**so that** I know where I am and can navigate back.

**Acceptance criteria:**
- [ ] Props: `crumbs: string[]`
- [ ] All crumbs except last are `<a href="#">` links
- [ ] Last crumb: `color: var(--color-text); font-weight: 500` (non-link)
- [ ] Separator: Lucide `ChevronRight`, `0.75rem`
- [ ] Responsive: wraps on mobile (no overflow-x scroll)

### S2.3 — Footer
**As a** visitor,
**I want** a dark footer with 4 navigation columns,
**so that** secondary navigation is accessible from the page bottom.

**Acceptance criteria:**
- [ ] `background: var(--color-dark)` — white text on dark = 16.5:1 ✓✓
- [ ] 4 columns: Company, Properties, Tools, Support
- [ ] `<footer>` semantic element

### S2.4 — Page Layout (Content + Sidebar)
**As a** developer,
**I want** a two-column layout with a sticky sidebar,
**so that** the contact form is always accessible while reading property details.

**Acceptance criteria:**
- [ ] `grid-template-columns: 1fr 360px` on desktop (≥1024px)
- [ ] Sidebar: `position: sticky; top: 80px` (64px nav + 16px gap); `align-self: start`
- [ ] Mobile (≤1024px): `grid-template-columns: 1fr` — sidebar below main content
- [ ] `<aside>` element wraps sidebar

---

## Epic 3 — Property Gallery & Header

### S3.1 — PropertyGallery Hero
**As a** visitor,
**I want** a full-width property photo as the first thing I see,
**so that** I can visually assess the property immediately.

**Acceptance criteria:**
- [ ] Full-width, `aspect-ratio: 16/9`
- [ ] `border-radius: 0` on hero — no rounded corners
- [ ] Image placeholder: `background: var(--color-surface)`
- [ ] Photo count badge: top-right, Lucide `Camera` icon, `background: rgba(0,0,0,0.6)`, white text

### S3.2 — PropertyGallery Thumbnails
**As a** visitor,
**I want** thumbnail images below the hero,
**so that** I can browse multiple photos.

**Acceptance criteria:**
- [ ] 5 thumbnails in horizontal strip; `scrollbar-width: none`
- [ ] Active thumbnail: `border: 2px solid var(--color-orange)` — token, NOT hex
- [ ] `useState<number>(0)` manages active index
- [ ] Thumbnail strip: `background: rgba(0,0,0,0.8)` overlay strip

### S3.3 — PropertyHeader Badges + Title
**As a** visitor,
**I want** to see listing source, verified status, and RERA status immediately,
**so that** I can assess trust signals before reading details.

**Acceptance criteria:**
- [ ] Badge row: `ListingSourcePill` + conditional `VerifiedBadge` + conditional `ReraBadge`
- [ ] Title: `font-size: 1.5rem; font-weight: 600`
- [ ] `postedDaysAgo`: "Posted X days ago" or "Posted Today"

### S3.4 — PropertyHeader Price
**As a** visitor,
**I want** the price in Indian lakh/crore format,
**so that** I can understand it without mental conversion.

**Acceptance criteria:**
- [ ] `{formatPrice(property.price)}` — never raw integer
- [ ] `font-size: 1.75rem; font-weight: 600; color: var(--color-orange)` — at 1.75rem bold = large text threshold; 4.15:1 passes WCAG large text (3:1 ✓)
- [ ] Price per sqft in `color: var(--color-muted)` below

### S3.5 — PropertyHeader Specs Grid
**As a** visitor,
**I want** key property specs in a structured grid,
**so that** I can quickly compare BHK, area, floor, facing, and age.

**Acceptance criteria:**
- [ ] Grid: 4-col desktop, 2-col mobile
- [ ] Specs: BHK, Super Area, Carpet Area, Floor, Total Floors, Facing, Age, Possession, Furnishing
- [ ] Label: `text-transform: uppercase; color: var(--color-muted); font-size: 0.6875rem`; Value: `font-size: 0.9375rem; font-weight: 600`
- [ ] Container: `background: var(--color-surface); border-radius: 8px; padding: 20px`

---

## Epic 4 — Tab-Based Content System

### S4.1 — PropertyTabs Container
**As a** visitor,
**I want** 5 content tabs,
**so that** I can navigate between overview, floor plans, amenities, locality, and price trends.

**Acceptance criteria:**
- [ ] 5 tabs: Overview, Floor Plan, Amenities, Locality, Price Trends
- [ ] Active tab: `color: var(--color-orange); border-bottom: 3px solid var(--color-orange)`
- [ ] `role="tablist"`, `role="tab"`, `aria-selected="true|false"` on all tabs
- [ ] Tab strip: `overflow-x: auto; scrollbar-width: none` on mobile

### S4.2 — Tab Conditional JSX
**As a** developer,
**I want** tab content rendered via conditional JSX,
**so that** inactive tab content is never in the DOM.

**Acceptance criteria:**
- [ ] `{activeTab === 'overview' && <OverviewTab />}` pattern for all 5 tabs
- [ ] `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → empty
- [ ] `grep -r "visibility.*hidden" src/components/property/PropertyTabs.tsx` → empty

### S4.3 — OverviewTab
**As a** visitor,
**I want** an overview section with description and key highlights,
**so that** I understand the property at a glance.

**Acceptance criteria:**
- [ ] Full description from `property.description`; `line-height: 1.6`
- [ ] Possession status and furnishing status highlighted
- [ ] No `display: none` or CSS hide on any content element

### S4.4 — FloorPlanTab
**As a** visitor,
**I want** floor plan details for each BHK configuration,
**so that** I can compare unit sizes.

**Acceptance criteria:**
- [ ] Renders all `FloorPlan[]` entries from `property.floorPlans`
- [ ] Each entry: BHK label, Super Area (sqft), Carpet Area (sqft)
- [ ] Carpet-to-super ratio: `{Math.round(plan.carpetArea / plan.superArea * 100)}%`
- [ ] Image placeholder slot: surface bg

### S4.5 — AmenitiesTab
**As a** visitor,
**I want** amenities organised by category,
**so that** I can quickly find what I care about.

**Acceptance criteria:**
- [ ] Renders all 4 `AmenityGroup` categories: Fitness, Recreation, Security, Convenience
- [ ] Items as pill-tags: `border: 1px solid var(--color-border); border-radius: 4px; padding: 4px 12px`
- [ ] `grep -r "border-radius: 20px" src/components/property/AmenitiesTab.module.css` → empty (4px tags, NOT 20px)

### S4.6 — LocalityTab
**As a** visitor,
**I want** walk score, transit score, and nearby places,
**so that** I understand the neighbourhood before visiting.

**Acceptance criteria:**
- [ ] Walk score and transit score as labelled bar fills (0–100)
- [ ] Bar fill: `background: var(--color-green); border-radius: 4px`
- [ ] Bar track: `background: var(--color-border); height: 8px; border-radius: 4px`
- [ ] Nearby places: name + category icon + distance. Icons: `GraduationCap`, `Cross`, `Train`, `ShoppingBag`, `Utensils`

### S4.7 — PriceTrendTab
**As a** visitor,
**I want** 6 months of price trend data,
**so that** I understand whether the locality is appreciating.

**Acceptance criteria:**
- [ ] Renders all 6 `PriceTrendPoint` entries
- [ ] Each row: month + `₹{pricePerSqft.toLocaleString('en-IN')}/sqft`
- [ ] Trend indicator: Lucide `TrendingUp` if current > previous, `TrendingDown` otherwise
- [ ] Most recent month: `color: var(--color-orange)`

---

## Epic 5 — RERA Compliance Section

### S5.1 — RERASection Block
**As a** visitor,
**I want** a dedicated RERA compliance block with the registration number,
**so that** I can verify the property's legal status.

**Acceptance criteria:**
- [ ] `border-left: 4px solid var(--color-green)`
- [ ] `background: var(--color-surface); border-radius: 8px; padding: 20px 24px`
- [ ] Lucide `ShieldCheck` icon beside heading
- [ ] Grid: RERA Number, Valid Until, Authority — 3-col desktop, 2-col mobile
- [ ] "View on RERA Portal" `<a>` link

### S5.2 — RERASection Always Visible
**As a** visitor switching tabs,
**I want** the RERA section to remain visible regardless of tab,
**so that** I can always reference the compliance information.

**Acceptance criteria:**
- [ ] `RERASection` rendered OUTSIDE `PropertyTabs` in page assembly
- [ ] Switching tabs does not affect `RERASection` visibility
- [ ] RERASection sits between the tab panel and SimilarProperties in DOM order

### S5.3 — RERASection Conditional Render
**As a** developer,
**I want** RERASection to render only when RERA data is present,
**so that** properties without RERA don't show an empty block.

**Acceptance criteria:**
- [ ] `{propertyDetail.reraNumber && <RERASection reraNumber={...} />}` pattern
- [ ] If `reraNumber` is undefined/null: RERASection is absent from DOM, no empty space
- [ ] `grep -r "display.*none" src/components/property/RERASection.tsx` → empty

---

## Epic 6 — Sidebar — Contact + EMI

### S6.1 — SidebarPanel Toggle
**As a** visitor,
**I want** to toggle between a contact form and EMI calculator in the sidebar,
**so that** I can access both without scrolling or navigating away.

**Acceptance criteria:**
- [ ] Two toggle buttons: "Contact" | "EMI Calculator"
- [ ] `useState<'contact' | 'emi'>('contact')` — panel toggle state
- [ ] Active toggle: `color: var(--color-orange); background: var(--color-surface)`
- [ ] Conditional render: `{panel === 'contact' && <ContactForm />}` / `{panel === 'emi' && <EMICalculator />}`

### S6.2 — ContactForm
**As a** visitor,
**I want** to send a contact request to the listing source,
**so that** I can schedule a viewing.

**Acceptance criteria:**
- [ ] 4 inputs: Name (text), Phone (tel), Email (email), Message (textarea)
- [ ] Submit button: primary orange, dark text (`var(--color-text)`), `fullWidth`
- [ ] `required` attribute on all inputs
- [ ] `<label htmlFor>` on every input; no unlabeled inputs

### S6.3 — EMICalculator Inputs
**As a** visitor,
**I want** to enter loan parameters,
**so that** I can understand my monthly EMI commitment.

**Acceptance criteria:**
- [ ] 3 `<input type="number">` fields: Loan Amount (default: 75% of property price), Interest Rate % (default 8.5), Tenure in years (default 20)
- [ ] Each input: `type="number"` with `min`/`max`/`step`
- [ ] All inputs labeled via `<label htmlFor>`
- [ ] `defaultPrincipal` prop pre-populates Loan Amount

### S6.4 — EMICalculator Result
**As a** visitor,
**I want** my monthly EMI updated live as I change inputs,
**so that** I can explore different loan scenarios without submitting.

**Acceptance criteria:**
- [ ] EMI recalculates on every `onChange` (controlled inputs + derived value)
- [ ] Formula: `Math.round(P × r × (1+r)^n / ((1+r)^n − 1))`
- [ ] Result via `formatPrice(emi)` → displays as `₹X,XXX/mo`
- [ ] `grep -r "useState.*emi\|useState.*fee\|useState.*monthly" src/components/property/EMICalculator.tsx` → empty (derived, not state)

### S6.5 — Sidebar Sticky
**As a** visitor,
**I want** the sidebar to remain visible while scrolling through property details,
**so that** I can contact or calculate at any point.

**Acceptance criteria:**
- [ ] `position: sticky; top: 80px`; `align-self: start` in grid context
- [ ] Reverts to static on mobile (≤1024px)

---

## Epic 7 — Similar Properties

### S7.1 — SimilarPropertyCard
**As a** visitor,
**I want** compact similar property cards,
**so that** I can discover alternatives without leaving the current page.

**Acceptance criteria:**
- [ ] Image placeholder: 16:9, surface bg
- [ ] Title, `{formatPrice(property.price)}` (never raw), BHK, locality, `ListingSourcePill`
- [ ] CTA: `Contact {listingSource}` — dynamic, NOT hardcoded
- [ ] Hover: `border-color: var(--color-orange)`
- [ ] `border-radius: 8px` on card

### S7.2 — SimilarProperties Grid
**As a** visitor,
**I want** 3 similar properties in a grid,
**so that** I have immediate alternatives to compare.

**Acceptance criteria:**
- [ ] 3-col desktop, 2-col tablet (≤768px), 1-col mobile (≤480px)
- [ ] Section heading: "Similar Properties in {locality}"
- [ ] `SimilarProperty[]` prop sourced from mock data

### S7.3 — Similar Properties Framer Motion
**As a** visitor,
**I want** similar property cards to animate in on scroll,
**so that** the section feels polished.

**Acceptance criteria:**
- [ ] Stagger: `delay: index * 0.1`
- [ ] `opacity: 0, y: 24 → visible`
- [ ] `viewport={{ once: true }}`
- [ ] `prefers-reduced-motion`: animation skipped via `globals.css`

---

## Epic 8 — QA & Launch

### S8.1 — TypeScript Clean Build
**As a** developer,
**I want** `tsc --noEmit` to exit 0,
**so that** there are no type errors in production.

**Acceptance criteria:**
- [ ] `tsc --noEmit` exits 0; strict mode enabled
- [ ] No `any` types. No `@ts-ignore`
- [ ] All `PropertyDetail`, `SimilarProperty`, `EMIInputs`, `FloorPlan` types consumed correctly

### S8.2 — No Hex in Module CSS
**As a** developer,
**I want** all component stylesheets to use CSS tokens,
**so that** the design system is maintainable.

**Acceptance criteria:**
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty
- [ ] `rgba()` in `box-shadow` only — not in background or color rules

### S8.3 — No CSS Tab/Panel Hiding
**As a** developer,
**I want** zero `display:none` or `visibility:hidden` in conditional components,
**so that** screen readers never encounter invisible form fields.

**Acceptance criteria:**
- [ ] `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → empty
- [ ] `grep -r "display.*none" src/components/property/SidebarPanel.tsx` → empty
- [ ] `grep -r "visibility.*hidden" src/components/property/PropertyTabs.tsx` → empty

### S8.4 — No Hardcoded CTA Text
**As a** developer,
**I want** all "Contact Owner/Builder/Agent" text derived from data,
**so that** CTA text is never hardcoded.

**Acceptance criteria:**
- [ ] `grep -r "Contact Owner" src/components --include="*.tsx"` → empty
- [ ] `grep -r "Contact Builder" src/components --include="*.tsx"` → empty
- [ ] `grep -r "Contact Agent" src/components --include="*.tsx"` → empty

### S8.5 — Orange Button — Dark Text Only
**As a** developer,
**I want** all orange buttons to use dark text (never white),
**so that** the contrast trap is enforced in production.

**Acceptance criteria:**
- [ ] `grep -r "color-white" src/components/ui/Button.module.css` → zero `color:` rules in `.primary`
- [ ] Orange (≈4.15:1 at large text size) — dark text passes, white fails

### S8.6 — EMI Derived Values — Never in State
**As a** developer,
**I want** EMI-derived values computed inline,
**so that** calculated results are never stale.

**Acceptance criteria:**
- [ ] `grep -r "useState.*emi\|useState.*monthly\|useState.*result" src/components/property/EMICalculator.tsx` → empty
- [ ] `emi` value computed inline from `calculateEMI(principal, rate, tenure)` — not stored

### S8.7 — Static Export Build
**As a** developer,
**I want** `npm run build` to produce a `/out` directory,
**so that** the site can be deployed to any static host.

**Acceptance criteria:**
- [ ] `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- [ ] `npm run build` exits 0
- [ ] `/out/index.html` exists and assets load correctly
- [ ] Lighthouse Performance ≥90, Accessibility ≥90

### S8.8 — No Forbidden Patterns
**As a** developer,
**I want** a final grep sweep for all forbidden patterns,
**so that** no anti-patterns reach production.

**Acceptance criteria:**
- [ ] `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] `grep -r "font-weight: 700" src --include="*.module.css"` → empty (max 600)
- [ ] `grep -r "border-radius: 20px" src/components/property/AmenitiesTab.module.css` → empty (4px tags only)
- [ ] `grep -r "Roboto\|Inter\|Nunito\|Lato" src` → empty (Poppins only)
