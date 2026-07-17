# 05 — Epics and Stories
## Indian Property Listing Portal · bw_realestate_01

---

## Epic Overview

| # | Epic | Stories | Priority |
|---|------|---------|----------|
| E1 | Design System Foundation | 5 | Must |
| E2 | Navigation & Layout Shell | 4 | Must |
| E3 | Hero Search Widget | 6 | Must |
| E4 | Filter Bar | 5 | Must |
| E5 | Property Cards | 6 | Must |
| E6 | Property Grid | 4 | Must |
| E7 | Supporting Sections | 8 | Should |
| E8 | QA & Launch | 7 | Must |

**Total: 45 stories**

---

## E1 — Design System Foundation

### S1.1 — CSS Token File
**As a** developer,
**I want** a `globals.css` with 8 CSS custom properties,
**so that** all components reference tokens and no hex codes appear in module files.

**Acceptance criteria:**
- 8 tokens defined: `--color-red`, `--color-white`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-green`, `--color-dark`
- `.sr-only` utility class included
- `prefers-reduced-motion` block disables animations
- `grep -r "#[0-9A-Fa-f]" src/app/globals.css` returns only the comment-only lines (token values may use hex; module files may not)

### S1.2 — Font Setup
**As a** developer,
**I want** Poppins loaded via `next/font/google` with weights 400, 500, 600,
**so that** all text uses the correct typeface with no FOUT.

**Acceptance criteria:**
- `layout.tsx` imports `Poppins` from `next/font/google`
- `weights: [400, 500, 600]` — no 700 weight
- `<html lang="en" className={poppins.variable}>` pattern used
- `var(--font-sans)` used in `globals.css` body rule

### S1.3 — TypeScript Types
**As a** developer,
**I want** all domain types in `src/types/index.ts`,
**so that** components have strict type contracts.

**Acceptance criteria:**
- `SearchMode`, `BHKType`, `PropertyType`, `ListingSource`, `PossessionStatus`, `FurnishingStatus`, `CommercialType`, `PreferredBy` union types exported
- `Property` interface with all fields (id, title, bhk, propertyType, price, pricePerSqft, superArea, carpetArea, floor, locality, city, listingSource, verified, reraRegistered, possessionStatus, furnishingStatus, photos, postedDaysAgo, amenities, projectName?, mode)
- `FeaturedProject`, `TrustStat`, `CityLink`, `SearchFilters` interfaces exported
- `tsc --noEmit` exits 0

### S1.4 — formatPrice Utility
**As a** developer,
**I want** a `formatPrice(amount: number): string` function,
**so that** all prices display in Indian lakh/crore convention.

**Acceptance criteria:**
- `formatPrice(12_000_000)` → `₹1.20 Cr`
- `formatPrice(4_500_000)` → `₹45 L`
- `formatPrice(28_000)` → `₹28,000/mo`
- `formatPriceRange(7_500_000, 14_000_000)` → `₹75 L – ₹1.40 Cr`
- No `toLocaleString` used except for the `/mo` branch

### S1.5 — Button Component
**As a** developer,
**I want** a `Button` component with primary and outlineRed variants,
**so that** all CTA buttons share consistent styles.

**Acceptance criteria:**
- Props: `variant: 'primary' | 'outlineRed'`, `size: 'md' | 'sm'`, `href?: string`, `onClick?: () => void`, `fullWidth?: boolean`, `children: ReactNode`, `type?: 'button' | 'submit'`
- Renders `<a>` when `href` provided, `<button>` otherwise
- `border-radius: 4px` on all buttons
- Primary: `background: var(--color-red); color: var(--color-white)` (4.51:1 ✓)
- OutlineRed: `background: transparent; color: var(--color-red); border: 1.5px solid var(--color-red)`
- No hex in `Button.module.css`

---

## E2 — Navigation & Layout Shell

### S2.1 — SiteNav Component
**As a** visitor,
**I want** a sticky top navigation with logo, links, and city selector,
**so that** I can navigate the portal from any scroll position.

**Acceptance criteria:**
- Sticky (`position: sticky; top: 0; z-index: 100`)
- Logo text in `var(--color-red)`, 24px, weight 700
- Nav links: Buy, Rent, PG, Commercial, New Projects, Post Property Free
- City pill with dropdown arrow icon (Lucide `ChevronDown`)
- "Post Property Free" renders as primary Button
- `useEffect` adds scroll shadow class (requires `'use client'`)
- `<nav>` element with `aria-label="Main navigation"`

### S2.2 — SiteNav Scroll Shadow
**As a** visitor,
**I want** the nav to gain a shadow on scroll,
**so that** it visually separates from content while scrolling.

**Acceptance criteria:**
- `window.scrollY > 0` adds `.navScrolled` class
- `.navScrolled` applies `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`
- `useEffect` cleanup removes listener on unmount

### S2.3 — Footer Component
**As a** visitor,
**I want** a dark footer with 4 navigation columns,
**so that** I can access secondary links from the bottom of any page.

**Acceptance criteria:**
- Background: `var(--color-dark)` (#1A1A1A)
- Text: `var(--color-white)` on dark — 16:1 ✓
- 4 columns: Company, Properties, Tools, Support
- Each column: heading + 5 links
- Copyright line at bottom
- `<footer>` semantic element

### S2.4 — Page Assembly
**As a** developer,
**I want** `src/app/page.tsx` to assemble all sections,
**so that** the full homepage renders in correct order.

**Acceptance criteria:**
- Import order: SiteNav → HeroSearchWidget → PropertyGrid → FeaturedProjects → TrustBar → CityLinks → Footer
- All data imported from `src/lib/data`
- Props passed: `PropertyGrid` receives `properties`, `FeaturedProjects` receives `projects`, `TrustBar` receives `stats`, `CityLinks` receives `cities`
- No `'use client'` on page.tsx

---

## E3 — Hero Search Widget

### S3.1 — Mode Tabs
**As a** visitor,
**I want** 5 search mode tabs (Buy, Rent, PG, Commercial, Plots),
**so that** I can switch between property categories.

**Acceptance criteria:**
- Tabs rendered from `MODES` constant array — not hardcoded 5× JSX
- Active tab: `color: var(--color-red); border-bottom: 3px solid var(--color-red)`
- Inactive tab: `color: var(--color-muted); border-bottom: 3px solid transparent`
- `role="tablist"` on container, `role="tab"` on each tab, `aria-selected` reflects active state
- Tab click updates `mode` state

### S3.2 — Buy/Rent Fields
**As a** visitor in Buy or Rent mode,
**I want** to see City, Locality, Property Type, BHK multi-select, and Budget fields,
**so that** I can specify my residential property requirements.

**Acceptance criteria:**
- Fields only render when `mode === 'buy' || mode === 'rent'` — conditional JSX, not CSS hide
- BHK multi-select: toggle chips for Studio, 1 BHK, 2 BHK, 3 BHK, 4 BHK, 4+ BHK
- Budget: dropdown with range options (Under ₹25 L, ₹25–50 L, ₹50–80 L, ₹80 L–1 Cr, ₹1–2 Cr, ₹2 Cr+)
- All labels uppercase, muted colour, `0.75rem`

### S3.3 — PG Fields
**As a** visitor in PG mode,
**I want** to see City, Locality, and Preferred By (Boys/Girls/Any),
**so that** I can search for paying-guest accommodation.

**Acceptance criteria:**
- Renders only when `mode === 'pg'`
- PreferredBySelector: 3 options as clickable chips
- BHK selector does NOT render
- Property Type does NOT render

### S3.4 — Commercial Fields
**As a** visitor in Commercial mode,
**I want** to see City, Locality, and Commercial Type,
**so that** I can search for office space, shops, or warehouses.

**Acceptance criteria:**
- Renders only when `mode === 'commercial'`
- CommercialTypeSelect: Office Space, Shop, Warehouse, Showroom
- BHK selector does NOT render

### S3.5 — Plot Fields
**As a** visitor in Plot mode,
**I want** to see City, Locality, and Plot Area range,
**so that** I can search for land/plots.

**Acceptance criteria:**
- Renders only when `mode === 'plot'`
- PlotAreaSelect: Under 500 sqft, 500–1000 sqft, 1000–2000 sqft, 2000+ sqft
- BHK selector does NOT render

### S3.6 — Search Submit
**As a** visitor,
**I want** the Search button to scroll to the property listing section,
**so that** I can immediately see results after submitting.

**Acceptance criteria:**
- Button text: "Search Properties"
- `onClick`: `document.getElementById('property-section')?.scrollIntoView({ behavior: 'smooth' })`
- Button is `variant="primary"` Button component
- Hero background: `var(--color-surface)` with subtle red gradient overlay

---

## E4 — Filter Bar

### S4.1 — BHK Multi-Select Chips
**As a** visitor browsing listings,
**I want** to filter by multiple BHK types simultaneously,
**so that** I can see e.g. 2 BHK and 3 BHK in the same results.

**Acceptance criteria:**
- Chips: Studio, 1 BHK, 2 BHK, 3 BHK, 4 BHK, 4+ BHK
- Multi-select: clicking active chip deselects; clicking inactive chip adds to array
- `role="checkbox"` on each chip, `aria-checked` reflects selection state
- Active chip: `background: var(--color-red); color: var(--color-white); border-color: var(--color-red)`
- Inactive chip: `background: var(--color-white); color: var(--color-text); border: 1.5px solid var(--color-border)`

### S4.2 — Possession Status Filter
**As a** visitor,
**I want** to filter by possession status (Ready to Move / Under Construction / New Launch),
**so that** I can find properties matching my timeline.

**Acceptance criteria:**
- Single-select (only one active at a time)
- Clicking active chip clears the filter
- `role="radio"` on each chip

### S4.3 — Property Type Filter
**As a** visitor,
**I want** to filter by property type (Apartment / Independent House / Villa / Plot / PG),
**so that** I can narrow results to my preferred property category.

**Acceptance criteria:**
- Single-select radio chip pattern
- Clicking active chip clears the filter

### S4.4 — Furnished Status Filter
**As a** visitor,
**I want** to filter by furnishing status (Furnished / Semi-Furnished / Unfurnished),
**so that** I can find move-in-ready properties.

**Acceptance criteria:**
- Single-select radio chip pattern
- Clicking active chip clears the filter

### S4.5 — Sticky Filter Bar
**As a** visitor scrolling through listings,
**I want** the filter bar to remain visible while scrolling,
**so that** I can adjust filters without scrolling back to top.

**Acceptance criteria:**
- `position: sticky; top: 64px; z-index: 90` (below SiteNav at z-index 100)
- `box-shadow: 0 2px 4px rgba(0,0,0,0.06)`
- Horizontal scroll on overflow with hidden scrollbar (`scrollbar-width: none`)
- Filter chips do not wrap to second line on desktop

---

## E5 — Property Cards

### S5.1 — PropertyCard Layout
**As a** visitor viewing listings,
**I want** a property card showing all key information,
**so that** I can assess a property without clicking through.

**Acceptance criteria:**
- Image block: 16:9 aspect ratio, `var(--color-surface)` placeholder bg
- Content: badges row → title → price row → area row → floor → locality → posted date → CTA
- `border-radius: 8px` on card
- `border: 1px solid var(--color-border)`
- `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.12)`

### S5.2 — Price Display
**As a** visitor,
**I want** prices shown in lakh/crore format,
**so that** I can immediately understand the price in familiar Indian convention.

**Acceptance criteria:**
- `{formatPrice(property.price)}` — never raw number
- Price font: `1.375rem`, weight 700, `color: var(--color-red)` (4.51:1 ✓)
- Price per sqft: `₹{property.pricePerSqft.toLocaleString('en-IN')}/sqft`, muted colour, `0.8125rem`

### S5.3 — VerifiedBadge
**As a** visitor,
**I want** verified properties marked with a green badge,
**so that** I can trust the listing quality.

**Acceptance criteria:**
- Only renders when `property.verified === true`
- `color: var(--color-green)` on white card — contrast 7.78:1 ✓✓
- No `background: var(--color-green)` — text-only badge pattern
- Lucide `ShieldCheck` icon, `0.75rem` text

### S5.4 — ReraBadge
**As a** visitor,
**I want** RERA-registered properties marked with an outlined badge,
**so that** I can identify regulatory-compliant listings.

**Acceptance criteria:**
- Only renders when `property.reraRegistered === true`
- `color: var(--color-green); border: 1px solid var(--color-green); border-radius: 4px`
- Text: "RERA ✓", `0.75rem`, weight 700
- Inline with VerifiedBadge in badge row

### S5.5 — ListingSourcePill
**As a** visitor,
**I want** each card to show whether the listing is from an Owner, Builder, or Agent,
**so that** I know upfront whether brokerage applies.

**Acceptance criteria:**
- Renders for every property — never omitted
- Source-specific contextual colours via inline style (Owner: green bg, Builder: blue bg, Agent: orange bg — contextual, outside token system)
- Text uppercase, `0.6875rem`, weight 700
- `border-radius: 4px`

### S5.6 — Dynamic CTA Button
**As a** visitor,
**I want** the contact button text to match the listing source,
**so that** I know who I'm contacting.

**Acceptance criteria:**
- `<Button variant="outlineRed">Contact {property.listingSource}</Button>`
- Renders "Contact Owner", "Contact Builder", or "Contact Agent"
- `grep -r "Contact Owner" src/components --include="*.tsx"` → empty (text is generated, not hardcoded)
- Button present on every PropertyCard

---

## E6 — Property Grid

### S6.1 — Filtered Grid
**As a** visitor,
**I want** the listing grid to update when I apply filters,
**so that** I only see relevant properties.

**Acceptance criteria:**
- `useMemo(() => filterProperties(properties, filters), [properties, filters])` — no inline filter logic
- All 4 filter dimensions applied simultaneously
- Grid updates without page reload

### S6.2 — Result Count
**As a** visitor,
**I want** to see how many properties match my current filters,
**so that** I know whether to broaden or narrow my search.

**Acceptance criteria:**
- `"{count} Properties Found"` displayed above grid
- Updates immediately on filter change
- Singular/plural: "1 Property Found" vs "8 Properties Found"

### S6.3 — ARIA Live Region
**As a** screen reader user,
**I want** filter result count changes announced,
**so that** I can understand results without seeing the visual update.

**Acceptance criteria:**
- `<div aria-live="polite" className="sr-only">` with result count text
- Updates on every filter change
- Not visually rendered (`.sr-only` class)

### S6.4 — Property Section Anchor
**As a** developer,
**I want** the property section to have `id="property-section"`,
**so that** the hero search submit button can scroll to it.

**Acceptance criteria:**
- `<section id="property-section">` wraps the grid
- HeroSearchWidget submit scrolls here via `scrollIntoView({ behavior: 'smooth' })`

---

## E7 — Supporting Sections

### S7.1 — FeaturedProjects Section
**As a** visitor,
**I want** to see featured builder projects on the homepage,
**so that** I discover curated new developments.

**Acceptance criteria:**
- 3 project cards from `featuredProjects` mock data
- Each card: project name, builder name, locality, `formatPriceRange(priceFrom, priceTo)`, unit type pills, photo count, RERA badge if registered
- Price range uses `formatPriceRange()` — never raw numbers
- Section heading: "Featured New Projects"
- `border-radius: 8px` on cards (matches PropertyCard)

### S7.2 — FeaturedProject Card Image
**As a** visitor,
**I want** project cards to show a photo count badge,
**so that** I know how many images are available before clicking.

**Acceptance criteria:**
- Photo badge: `"{project.photos} Photos"`, bottom-left of image
- `background: rgba(0,0,0,0.6); color: var(--color-white)` — passes contrast
- Camera icon (Lucide `Camera`) beside count

### S7.3 — TrustBar Section
**As a** visitor,
**I want** to see platform trust statistics,
**so that** I understand the scale and credibility of VeriProperty.

**Acceptance criteria:**
- Dark background: `var(--color-dark)` (#1A1A1A)
- White text on dark — 16:1 ✓✓
- 4 stats: "10 Lakh+ Active Listings", "4 Lakh+ Verified Properties", "2 Lakh+ Owner Properties", "1.5 Lakh+ RERA Registered"
- Lucide icons: Building2, ShieldCheck, User, BadgeCheck
- Stats in a 4-column grid, responsive to 2×2 on mobile

### S7.4 — TrustBar Icon Rendering
**As a** developer,
**I want** TrustBar icons resolved from `iconName` strings in mock data,
**so that** the icon system is data-driven rather than hardcoded.

**Acceptance criteria:**
- `ICON_MAP: Record<string, LucideIcon>` maps `iconName → LucideIcon component`
- `const Icon = ICON_MAP[stat.iconName]` — no `switch` statement
- TypeScript: `ICON_MAP` typed, no `any`

### S7.5 — CityLinks Section
**As a** visitor,
**I want** to see links to search properties in major Indian cities,
**so that** I can quickly explore listings in cities I care about.

**Acceptance criteria:**
- 8 city cards: Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad
- Each card: city name + property count string
- MapPin icon (Lucide)
- Responsive: 4 columns → 2 columns → 1 column
- Section heading: "Search Properties by City"

### S7.6 — CityLinks Hover State
**As a** visitor,
**I want** city cards to respond to hover,
**so that** the interaction feels responsive.

**Acceptance criteria:**
- Hover: border colour changes to `var(--color-red)`
- Hover: city name colour changes to `var(--color-red)`
- Transition: `0.15s` on border-color and color

### S7.7 — Framer Motion — Section Entrances
**As a** visitor,
**I want** sections to animate in as I scroll,
**so that** the page feels polished and dynamic.

**Acceptance criteria:**
- PropertyGrid: `opacity: 0, y: 32 → opacity: 1, y: 0`, `viewport={{ once: true }}`
- FeaturedProjects: `opacity: 0, y: 24 → visible`
- TrustBar stats: stagger `0.1s` delay per item
- CityLinks: `opacity: 0, y: 24 → visible`
- All wrapped in `<motion.section>` or `<motion.div>` — no external dependencies beyond framer-motion

### S7.8 — Reduced Motion Compliance
**As a** visitor with `prefers-reduced-motion: reduce`,
**I want** animations to be suppressed,
**so that** motion-sensitive visitors are not harmed.

**Acceptance criteria:**
- `globals.css` block: `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }`
- Framer Motion respects CSS — no JS override needed
- No `useReducedMotion` hook required (CSS approach sufficient)

---

## E8 — QA & Launch

### S8.1 — TypeScript Clean Build
**As a** developer,
**I want** `tsc --noEmit` to exit 0,
**so that** there are no type errors in production.

**Acceptance criteria:**
- `tsc --noEmit` exits 0 with no errors or warnings
- Strict mode enabled in `tsconfig.json`

### S8.2 — No Hex in Module CSS
**As a** developer,
**I want** all component stylesheets to use CSS tokens (not hex values),
**so that** the design system is consistent and maintainable.

**Acceptance criteria:**
- `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
- Exception: `rgba()` values in `box-shadow` and glassmorphism are allowed (shadows aren't part of the token system)

### S8.3 — No Hardcoded CTA Text
**As a** developer,
**I want** zero hardcoded "Contact Owner/Builder/Agent" strings in component files,
**so that** CTA text is always derived from data.

**Acceptance criteria:**
- `grep -r "Contact Owner" src/components --include="*.tsx"` → empty
- `grep -r "Contact Builder" src/components --include="*.tsx"` → empty
- `grep -r "Contact Agent" src/components --include="*.tsx"` → empty

### S8.4 — No CSS Field Hiding
**As a** developer,
**I want** mode-dependent search fields rendered via conditional JSX (not CSS display:none),
**so that** screen readers never encounter invisible form fields.

**Acceptance criteria:**
- `grep -r "display.*none" src/components/home/HeroSearchWidget.tsx` → empty
- `grep -r "visibility.*hidden" src/components/home/HeroSearchWidget.tsx` → empty

### S8.5 — Static Export Build
**As a** developer,
**I want** `npm run build` to produce a `/out` directory,
**so that** the site can be deployed to any static host.

**Acceptance criteria:**
- `next.config.ts` contains `output: 'export'` and `images: { unoptimized: true }`
- `npm run build` exits 0
- `/out` directory created with `index.html` and all assets

### S8.6 — ARIA Accessibility Check
**As a** developer,
**I want** all interactive elements to have correct ARIA roles and labels,
**so that** the site meets WCAG AA accessibility standards.

**Acceptance criteria:**
- HeroSearchWidget tabs: `role="tablist"`, `role="tab"`, `aria-selected`
- FilterBar BHK chips: `role="checkbox"`, `aria-checked`
- FilterBar single-select chips: `role="radio"`, `aria-checked`
- PropertyGrid: `aria-live="polite"` live region for result count
- SiteNav: `<nav aria-label="Main navigation">`
- Footer: `<footer>` element

### S8.7 — No Forbidden Patterns
**As a** developer,
**I want** a final grep sweep to catch all forbidden patterns,
**so that** no anti-patterns reach production.

**Acceptance criteria:**
- No `border-radius: 50%` anywhere
- No `border-radius: 20px` except FilterBar chips
- No raw price display (no `property.price` or `project.priceFrom` without `formatPrice()`)
- No Roboto, Inter, Lato, or Nunito — only Poppins
- No `700` font weight — max weight is `600`
