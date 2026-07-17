# bw_realestate_02
## Indian Property Detail Page · 99acres pattern
### Inspiration: 99acres.com — Property detail pages, RERA compliance display

---

## Base Prompt

**Role:** Senior product designer specialising in Indian real estate portal UX, property detail page patterns, and RERA compliance UI.

**Application Overview:** VeriAcres is an Indian property detail page built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). It follows the 99acres.com pattern — a single property detail view (no listing grid) that provides comprehensive property information, RERA compliance disclosure, EMI calculation, and direct agent/owner contact. Font: Poppins 400/500/600 via `next/font/google`. No Tailwind, no weight 700.

**Brand Voice & Mood:** Trust-forward and informative — orange `#E84118` signals energy and urgency (price callouts, CTAs, active states), while the surface palette (`#F5F5F5` bg, `#212121` text, `#666666` muted) keeps information legible. Green `#388E3C` is used exclusively for RERA compliance and positive verification signals. The tone is aspirational but grounded — this is someone's most significant purchase.

**Core Features:**
1. **SiteNav** — sticky, white bg, orange logo, nav links, "Post Property Free" orange CTA button; scroll shadow applied via JS class toggle
2. **Breadcrumb** — `Home > City > Type > Locality > [Property Name]`, `0.8125rem`, muted colour, `<nav aria-label="breadcrumb">`
3. **PropertyGallery** — full-width 16:9 hero image, 5-thumbnail strip, photo count badge top-right; active thumbnail has orange border; `border-radius: 0` on hero (full-bleed)
4. **PropertyHeader** — title, badge row (ListingSourcePill + VerifiedBadge + ReraBadge), price via `formatPrice()`, price per sqft, key specs grid (BHK, super area, carpet area, floor, facing, age, possession, furnishing)
5. **ContentLayout** — two-column: main 65% | sticky sidebar 35%
   - Main: PropertyTabs with 5 tabs (Overview / Floor Plan / Amenities / Locality / Price Trends) using conditional JSX — NOT `display: none`. RERASection always visible below tabs regardless of active tab.
   - Sidebar: ContactForm (default) | EMICalculator toggle — both `'use client'`
6. **RERASection** — dedicated compliance block: RERA number, expiry date, authority name, portal link; `border-left: 4px solid var(--color-green)`, `border-radius: 8px` — never just a badge
7. **SimilarProperties** — 3-column grid of compact `SimilarPropertyCard` (image, title, price, BHK, locality, CTA)
8. **Footer** — dark bg, 4-column nav

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-orange: #E84118`, `--color-white: #FFFFFF`, `--color-surface: #F5F5F5`, `--color-text: #212121`, `--color-muted: #666666`, `--color-border: #E0E0E0`, `--color-green: #388E3C`, `--color-dark: #1C1C1C`
- **Zero hex values in `.module.css`** — CSS custom properties only; exception: `rgba()` in `box-shadow`
- **Contrast critical:** Dark `#212121` on orange `#E84118` = 4.64:1 ✓ AA — use for button text. Orange text on white = 4.15:1 — only for large bold text ≥18px (prices, headings). NEVER white text on orange for normal/small text.
- **Border-radius:** `8px` cards/RERA block, `6px` buttons, `4px` badges/inputs/score bars, `0` gallery hero image. No `border-radius: 50%`.
- **Shadows:** Gallery `0 2px 12px rgba(0,0,0,0.1)`, SidebarCard `0 2px 8px rgba(0,0,0,0.08)` — only these two
- **Icons:** Lucide React — `MapPin`, `BedDouble`, `Maximize2`, `Building2`, `ShieldCheck`, `BadgeCheck`, `Calculator`, `Phone`, `Mail`, `ChevronRight`, `Camera`

**Structure:**
```
src/
  app/
    globals.css          # all CSS tokens + Poppins import
    page.tsx             # Server Component — imports property data, renders layout
    layout.tsx
  components/
    SiteNav/
    Breadcrumb/
    PropertyGallery/     # 'use client' for thumbnail selection
    PropertyHeader/
    ContentLayout/
    PropertyTabs/        # 'use client' for tab state
    OverviewTab/
    FloorPlanTab/
    AmenitiesTab/
    LocalityTab/
    PriceTrendTab/
    RERASection/
    ContactForm/         # 'use client'
    EMICalculator/       # 'use client'
    SimilarProperties/
    SimilarPropertyCard/
    Footer/
  lib/
    utils.ts             # formatPrice, calculateEMI
  types/
    index.ts             # TabSection, PropertyDetail, AmenityGroup, FloorPlan, LocalityInsights, NearbyPlace
  data/
    property.ts          # mock PropertyDetail object
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `formatPrice(value: number): string` — `≥1 Cr → ₹X.XX Cr`, `≥1 L → ₹X L`, `<1 L → ₹X,XXX`
- `calculateEMI(principal: number, annualRate: number, years: number): number` — `Math.round(P × r × (1+r)^n / ((1+r)^n − 1))` where `r = annualRate/12/100`, `n = years×12`
- Tab state managed in `PropertyTabs` as `'use client'`; tab content components are Server-compatible
- `TabSection = 'overview' | 'floorplan' | 'amenities' | 'locality' | 'pricetrend'`

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias)
2. Install `lucide-react`, `framer-motion`
3. Define all types in `src/types/index.ts`
4. Write `globals.css` with all 8 CSS custom properties + Poppins import
5. Create mock `property.ts` data with realistic Bangalore apartment data including RERA fields
6. Implement `formatPrice` and `calculateEMI` in `lib/utils.ts`
7. Build leaf components first (badges, pills, cards) then compose upward
8. Implement `PropertyTabs` with conditional JSX — never `display: none`
9. Implement `RERASection` as a full block — never as a badge only
10. Connect `ContactForm` and `EMICalculator` as sidebar toggle panels
11. Verify `tsc --noEmit` and `npm run build` pass before finalising

**User Experience:**
- First viewport: gallery hero + property header with price — immediate value signal
- Sticky sidebar ensures contact/EMI is always accessible without scrolling
- RERA block below tabs provides compliance transparency without cluttering the primary info hierarchy
- Tab switching is instant (no network) — conditional JSX with zero layout shift
- EMI calculator updates on every input change (`aria-live="polite"` on result)
- Mobile: single column, sidebar drops below main content, tabs scroll horizontally

**Constraints:**
- `formatPrice()` for ALL price displays — never `toLocaleString`, never raw integers in JSX
- CTA button label: `Contact ${property.listingSource}` — never hardcode "Contact Owner" or "Contact Agent"
- Tab content: conditional JSX only — `{activeTab === 'overview' && <OverviewTab />}` pattern — NEVER `display: none`
- RERA: must be a full dedicated section block, not a small badge
- No `border-radius: 50%` anywhere
- No font weight 700 — max is 600
- No hex values in `.module.css` — CSS variables only (except `rgba()` in shadows)
- `page.tsx` must be a Server Component — no `'use client'` on the page file

---

## Platform Versions

---

### 1 — Lovable

Build a complete Indian real estate property detail page called **VeriAcres** using Next.js 14 App Router, TypeScript strict mode, and CSS Modules. No Tailwind. Static export (`output: 'export'`). Font: Poppins 400/500/600 via `next/font/google`. No weight 700.

**Brand:** Orange `#E84118`. Tokens in `globals.css`: `--color-orange: #E84118`, `--color-white: #FFFFFF`, `--color-surface: #F5F5F5`, `--color-text: #212121`, `--color-muted: #666666`, `--color-border: #E0E0E0`, `--color-green: #388E3C`, `--color-dark: #1C1C1C`. Zero hex values in `.module.css` files — use CSS variables only. Exception: `rgba()` in `box-shadow`.

**Contrast critical:** Dark `#212121` on orange `#E84118` = 4.64:1 ✓ AA. Orange text on white = 4.15:1 — use only for large bold text ≥18px (prices, headings). Never white text on orange for normal/small text.

**Page:** A single property detail page (no listing grid). Structure:

1. **SiteNav** — sticky, white bg, orange logo, nav links, "Post Property Free" orange CTA button. Scroll shadow via JS class.
2. **Breadcrumb** — `Home > Bangalore > Apartments > Whitefield > [Property Name]`, `0.8125rem`, muted colour.
3. **PropertyGallery** — full-width hero image (16:9), thumbnail strip (5 thumbnails), photo count badge top-right. Active thumbnail: orange border. `border-radius: 0` on full-bleed image.
4. **PropertyHeader** — title, badge row (ListingSourcePill + VerifiedBadge + ReraBadge), price in `formatPrice()`, price per sqft, key specs (BHK, super area, carpet area, floor, facing, age, possession, furnishing).
5. **ContentLayout** — two-column: main (65%) | sticky sidebar (35%).
   - **Main:** PropertyTabs (5 tabs: Overview / Floor Plan / Amenities / Locality / Price Trends) — conditional JSX per tab, NOT CSS display:none. Below tabs: RERASection always visible regardless of active tab.
   - **Sidebar:** Two-panel toggle — ContactForm (default) | EMICalculator. Both are `'use client'`.
6. **RERASection** — dedicated compliance block: RERA number, expiry date, authority name, link to RERA portal. Green accent, `border-left: 4px solid var(--color-green)`, `border-radius: 8px`.
7. **SimilarProperties** — 3-column grid of `SimilarPropertyCard` (compact: image, title, price, BHK, locality, CTA).
8. **Footer** — dark bg, 4-column nav.

**Tab content — conditional JSX:**
```tsx
{activeTab === 'overview' && <OverviewTab property={property} />}
{activeTab === 'floorplan' && <FloorPlanTab plans={property.floorPlans} />}
{activeTab === 'amenities' && <AmenitiesTab groups={property.amenities} />}
{activeTab === 'locality' && <LocalityTab insights={property.localityInsights} />}
{activeTab === 'pricetrend' && <PriceTrendTab trends={property.priceTrends} />}
```

**EMI formula:** `Math.round(P × r × (1+r)^n / ((1+r)^n − 1))` where `r = annualRate/12/100`, `n = years×12`. Display result via `formatPrice()`.

**formatPrice:** `≥1 Cr → ₹X.XX Cr`, `≥1 L → ₹X L`, `<1 L → ₹X,XXX/mo`.

**Lucide icons:** `MapPin`, `BedDouble`, `Maximize2`, `Building2`, `ShieldCheck`, `BadgeCheck`, `Calculator`, `Phone`, `Mail`, `ChevronRight`, `Camera`.

**Anti-patterns to avoid:**
- White text on orange: fails contrast for normal text
- CSS `display:none` to hide tab content: use conditional JSX
- Raw price integers in JSX: always use `formatPrice()`
- Hardcoded "Contact Owner": use `Contact ${property.listingSource}`
- Circular elements: no `border-radius: 50%`
- Font weight 700: max is 600
- RERA as a small badge only: it needs a dedicated section block
- `toLocaleString` for price display in components: use `formatPrice()` only

**Border-radius:** `8px` cards/RERA block, `6px` buttons, `4px` badges/inputs/score bars, `0` gallery hero image, no 50%.

**Shadows:** Gallery `0 2px 12px rgba(0,0,0,0.1)`, SidebarCard `0 2px 8px rgba(0,0,0,0.08)`, only these two.

**`tsc --noEmit` must exit 0. `npm run build` must produce `/out`.**

---

### 2 — ChatGPT Canvas

Create **VeriAcres** — an Indian property detail page — with Next.js 14, TypeScript, CSS Modules, no Tailwind. Static export.

Run first:
```bash
npx create-next-app@latest veriAcres --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Color system** (`src/app/globals.css`):
```css
:root {
  --color-orange:  #E84118;
  --color-white:   #FFFFFF;
  --color-surface: #F5F5F5;
  --color-text:    #212121;
  --color-muted:   #666666;
  --color-border:  #E0E0E0;
  --color-green:   #388E3C;
  --color-dark:    #1C1C1C;
}
```

Zero hex in `.module.css`. Font: Poppins 400/500/600 only (no 700). Orange = brand primary.

**Contrast note:** `#212121` on `#E84118` = 4.64:1 ✓. Use dark text on orange buttons. Orange text on white only for large bold elements (≥18px).

**Core types** (`src/types/index.ts`):
- `TabSection = 'overview' | 'floorplan' | 'amenities' | 'locality' | 'pricetrend'`
- `PropertyDetail` — all property fields + `reraNumber`, `reraExpiryDate`, `description`, `amenities: AmenityGroup[]`, `floorPlans: FloorPlan[]`, `localityInsights: LocalityInsights`, `priceTrends: PriceTrendPoint[]`
- `AmenityGroup { category: string; items: string[] }`
- `FloorPlan { bhk: string; superArea: number; carpetArea: number }`
- `LocalityInsights { walkScore: number; transitScore: number; nearbyPlaces: NearbyPlace[] }`
- `NearbyPlace { name: string; category: 'school'|'hospital'|'metro'|'mall'|'restaurant'; distance: string }`
- `PriceTrendPoint { month: string; pricePerSqft: number }`

**Utilities:**
- `formatPrice(n)` — lakh/crore formatter
- `calculateEMI(principal, annualRate, years)` — `Math.round(P×r×(1+r)^n/((1+r)^n−1))`

**Page structure:**
```
SiteNav → Breadcrumb → PropertyGallery → PropertyHeader →
ContentLayout (tabs + sidebar) → RERASection → SimilarProperties → Footer
```

**Tab switching — conditional JSX only:**
```tsx
{activeTab === 'overview'   && <OverviewTab property={property} />}
{activeTab === 'floorplan'  && <FloorPlanTab plans={property.floorPlans} />}
{activeTab === 'amenities'  && <AmenitiesTab groups={property.amenities} />}
{activeTab === 'locality'   && <LocalityTab insights={property.localityInsights} />}
{activeTab === 'pricetrend' && <PriceTrendTab trends={property.priceTrends} />}
```
Never `display: none`. Tab state unmounts/mounts content.

**RERASection** — not a badge. A full block:
- `border-left: 4px solid var(--color-green)`
- RERA number, expiry date, authority, portal link
- ShieldCheck Lucide icon

**EMICalculator** — `'use client'`, 3 inputs (loan amount slider, interest rate, tenure), live result via `calculateEMI()`, display via `formatPrice()`.

**SimilarPropertyCard** — compact: image placeholder, title, `formatPrice(price)`, BHK, locality, `Contact ${listingSource}` button.

Mock data: one `PropertyDetail` object for a 3 BHK apartment in Whitefield, Bangalore — price ₹1.20 Cr, 1600 sqft, Builder listing, RERA registered (number: `PRM/KA/RERA/1251/446/PR/171018/002`), 4 amenity groups, 3 floor plans, 5 nearby places, 6 price trend points.

---

### 3 — Bolt

Build **VeriAcres** property detail page. Next.js 14 App Router, TypeScript strict, CSS Modules. `npm install lucide-react framer-motion`. Static export.

**8 tokens, zero hex in modules:**
`--color-orange: #E84118` · `--color-white: #FFFFFF` · `--color-surface: #F5F5F5` · `--color-text: #212121` · `--color-muted: #666666` · `--color-border: #E0E0E0` · `--color-green: #388E3C` · `--color-dark: #1C1C1C`

Font: Poppins 400/500/600 via `next/font/google`. Max weight 600.

Contrast rule: dark `#212121` on orange buttons = 4.64:1 ✓. Orange text on white for prices/headings only (≥18px bold).

**File structure:**
```
src/
  types/index.ts          — all types
  lib/
    data.ts               — one PropertyDetail + 3 similar properties
    formatPrice.ts        — formatPrice() + formatPriceRange()
    calculateEMI.ts       — calculateEMI(principal, annualRate, years)
  components/
    layout/
      SiteNav.tsx + .module.css   — 'use client' (scroll shadow)
      Footer.tsx + .module.css
    property/
      Breadcrumb.tsx + .module.css
      PropertyGallery.tsx + .module.css   — 'use client' (active thumbnail)
      PropertyHeader.tsx + .module.css
      PropertyTabs.tsx + .module.css      — 'use client' (tab state)
      tabs/
        OverviewTab.tsx
        FloorPlanTab.tsx
        AmenitiesTab.tsx
        LocalityTab.tsx
        PriceTrendTab.tsx
      RERASection.tsx + .module.css
      SimilarProperties.tsx + .module.css
      SimilarPropertyCard.tsx + .module.css
    sidebar/
      ContactForm.tsx + .module.css       — 'use client'
      EMICalculator.tsx + .module.css     — 'use client'
      SidebarPanel.tsx + .module.css      — 'use client' (panel toggle)
    ui/
      Button.tsx + .module.css
      VerifiedBadge.tsx + .module.css
      ReraBadge.tsx + .module.css
      ListingSourcePill.tsx + .module.css
  app/
    globals.css
    layout.tsx
    page.tsx
```

**Critical constraints:**
1. Tab content: conditional JSX only — never `display: none` or `visibility: hidden`
2. Prices: always `formatPrice()` — never raw integers
3. CTA: `Contact ${property.listingSource}` — not hardcoded
4. RERA: full block, not a badge — RERA number + expiry + authority
5. Dark text on orange buttons: `color: var(--color-text)` — never white on orange for UI elements

**QA grep checks:**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"   # empty
grep -r "display.*none" src/components/property/PropertyTabs.tsx  # empty
grep -r "Contact Owner" src/components --include="*.tsx"          # empty
grep -r "border-radius: 50%" src/components --include="*.module.css" # empty
grep -r "font-weight: 700" src --include="*.module.css"           # empty
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.

---

### 4 — v0

Design a pixel-precise Indian property detail page component system for **VeriAcres**. Next.js 14 App Router, TypeScript, CSS Modules. No Tailwind, no component libraries.

**Token system:**
```css
--color-orange:  #E84118;   /* brand */
--color-white:   #FFFFFF;
--color-surface: #F5F5F5;
--color-text:    #212121;
--color-muted:   #666666;
--color-border:  #E0E0E0;
--color-green:   #388E3C;
--color-dark:    #1C1C1C;
```

Poppins 400/500/600. No 700 weight. No hex in `.module.css`.

**Component specifications:**

**PropertyGallery.module.css:**
```css
.gallery { position: relative; }
.hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 0; }
.thumbStrip { display: flex; gap: 8px; padding: 8px 0; }
.thumb { width: 80px; aspect-ratio: 16/9; object-fit: cover; border-radius: 4px; border: 2px solid transparent; cursor: pointer; }
.thumbActive { border-color: var(--color-orange); }
.photoCount {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.6); color: var(--color-white);
  font-size: 0.8125rem; padding: 4px 10px; border-radius: 4px;
}
```

**RERASection.module.css:**
```css
.section {
  border-left: 4px solid var(--color-green);
  border-radius: 8px; background: var(--color-surface);
  padding: 20px 24px; margin: 24px 0;
}
.heading { color: var(--color-green); font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.item { display: flex; flex-direction: column; gap: 4px; }
.itemLabel { font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.itemValue { font-size: 0.9375rem; font-weight: 600; color: var(--color-text); }
.portal { display: inline-flex; align-items: center; gap: 4px; color: var(--color-green); font-size: 0.875rem; font-weight: 500; }
```

**Button orange pattern:**
```css
.primary { background: var(--color-orange); color: var(--color-text); }
/* dark on orange = 4.64:1 ✓ AA — NEVER var(--color-white) on orange */
.primary:hover { opacity: 0.9; }
```

**PropertyTabs.module.css:**
```css
.tabs { display: flex; border-bottom: 1px solid var(--color-border); }
.tab { padding: 14px 20px; font-size: 0.9375rem; font-weight: 500; color: var(--color-muted); background: transparent; border: none; cursor: pointer; border-bottom: 3px solid transparent; transition: color 0.15s, border-color 0.15s; }
.tabActive { color: var(--color-orange); border-bottom-color: var(--color-orange); }
```

**ContentLayout.module.css:**
```css
.layout { max-width: 1280px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
.sidebar { position: sticky; top: 80px; }
@media (max-width: 1024px) { .layout { grid-template-columns: 1fr; } .sidebar { position: static; } }
```

Tab switching: conditional JSX. `{activeTab === 'overview' && <OverviewTab />}` pattern for all 5 tabs.

Locality score bars: `border-radius: 4px`, orange fill `var(--color-orange)`.

EMICalculator: `calculateEMI(principal, annualRate, years)` formula. Result via `formatPrice()`.

---

### 5 — Claude Artifacts

Build **VeriAcres** — a production-quality Indian property detail page — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export.

**Three defining constraints:**

**Constraint 1 — Tab content via conditional JSX, not CSS:**
```tsx
// CORRECT: content unmounts on tab switch
{activeTab === 'overview'   && <OverviewTab property={property} />}
{activeTab === 'floorplan'  && <FloorPlanTab plans={property.floorPlans} />}
{activeTab === 'amenities'  && <AmenitiesTab groups={property.amenities} />}
{activeTab === 'locality'   && <LocalityTab insights={property.localityInsights} />}
{activeTab === 'pricetrend' && <PriceTrendTab trends={property.priceTrends} />}

// WRONG: hides with CSS — screen readers still encounter content
<OverviewTab style={{ display: activeTab === 'overview' ? 'block' : 'none' }} />
```

**Constraint 2 — RERA as a section block, not a badge:**
RERA must be a dedicated `<section>` with: registration number, expiry date, authority name, link. Green left-border accent. A badge (`RERA ✓`) may also appear in the header, but there must be a full RERASection block in the page.
```tsx
// RERASection always visible regardless of active tab
<RERASection rera={property.reraNumber} expiry={property.reraExpiryDate} authority="KRERA" />
```

**Constraint 3 — Dark text on orange buttons:**
```css
.primary { background: var(--color-orange); color: var(--color-text); }
/* #212121 on #E84118 = 4.64:1 ✓ AA
   White on #E84118 = 4.15:1 ✗ (fails for normal text) */
```

**Complete type system** (`src/types/index.ts`):
```typescript
export type TabSection = 'overview' | 'floorplan' | 'amenities' | 'locality' | 'pricetrend'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type Facing = 'East' | 'West' | 'North' | 'South'
export type PropertyAge = 'New Construction' | '0–5 Years' | '5–10 Years' | '10+ Years'

export interface PropertyDetail {
  id: string; title: string; bhk: BHKType
  price: number; pricePerSqft: number
  superArea: number; carpetArea: number
  floor: string; totalFloors: number; facing: Facing; age: PropertyAge
  locality: string; city: string
  listingSource: ListingSource; verified: boolean
  reraNumber?: string; reraExpiryDate?: string; reraAuthority?: string
  possessionStatus: PossessionStatus; furnishingStatus: FurnishingStatus
  photos: number; postedDaysAgo: number; description: string
  amenities: AmenityGroup[]; floorPlans: FloorPlan[]
  localityInsights: LocalityInsights; priceTrends: PriceTrendPoint[]
}
export interface AmenityGroup { category: string; items: string[] }
export interface FloorPlan { bhk: string; superArea: number; carpetArea: number }
export interface LocalityInsights { walkScore: number; transitScore: number; nearbyPlaces: NearbyPlace[] }
export interface NearbyPlace { name: string; category: 'school'|'hospital'|'metro'|'mall'|'restaurant'; distance: string }
export interface PriceTrendPoint { month: string; pricePerSqft: number }
export interface SimilarProperty { id: string; title: string; price: number; bhk: BHKType; locality: string; listingSource: ListingSource; photos: number }
```

**Utilities:**
```typescript
// formatPrice.ts
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100_000) {
    const l = amount / 100_000
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`
  }
  return `₹${amount.toLocaleString('en-IN')}/mo`
}

// calculateEMI.ts
export function calculateEMI(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100
  const n = years * 12
  return Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
}
```

**Mock data:** one 3 BHK Builder apartment in Whitefield, Bangalore — ₹1.20 Cr, 1600 sqft super/1200 sqft carpet, 8th of 22 floors, East facing, 0–5 Years age, RERA number `PRM/KA/RERA/1251/446/PR/171018/002`, 4 amenity groups, 3 floor plan variants (2/3/4 BHK), 5 nearby places, 6 price trend points. Three similar properties from the same locality.

**All QA checks must pass before build:**
```bash
tsc --noEmit                                                              # 0 errors
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"           # empty
grep -r "display.*none" src/components/property/PropertyTabs.tsx          # empty
grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components    # empty
grep -r "border-radius: 50%" src/components --include="*.module.css"      # empty
grep -r "font-weight: 700" src --include="*.module.css"                   # empty
npm run build                                                              # exit 0
```

---

### 6 — Grok

Generate all source files for **VeriAcres**, an Indian real estate property detail page. Next.js 14 App Router, TypeScript strict, CSS Modules, no Tailwind. Static export (`output: 'export'`). Poppins 400/500/600 only.

Generate in this exact order:
1. `src/types/index.ts` — TabSection, PropertyDetail, AmenityGroup, FloorPlan, LocalityInsights, NearbyPlace, PriceTrendPoint, SimilarProperty, ListingSource, BHKType, PossessionStatus, FurnishingStatus, Facing, PropertyAge
2. `src/lib/formatPrice.ts` — formatPrice(), formatPriceRange()
3. `src/lib/calculateEMI.ts` — calculateEMI(principal, annualRate, years)
4. `src/lib/data.ts` — one PropertyDetail + similarProperties array
5. `src/app/globals.css` — 8 tokens, .sr-only, prefers-reduced-motion
6. `src/app/layout.tsx` — Poppins via next/font/google
7. `src/components/ui/Button.tsx + .module.css` — primary (dark-on-orange) + outlineOrange variants
8. `src/components/ui/VerifiedBadge.tsx + .module.css` — green text, no bg
9. `src/components/ui/ReraBadge.tsx + .module.css` — green text + border
10. `src/components/ui/ListingSourcePill.tsx + .module.css` — inline style source colours
11. `src/components/layout/SiteNav.tsx + .module.css` — 'use client', scroll shadow
12. `src/components/layout/Footer.tsx + .module.css`
13. `src/components/property/Breadcrumb.tsx + .module.css`
14. `src/components/property/PropertyGallery.tsx + .module.css` — 'use client', thumbnail state
15. `src/components/property/PropertyHeader.tsx + .module.css`
16. `src/components/property/PropertyTabs.tsx + .module.css` — 'use client', tab state, conditional JSX
17. `src/components/property/tabs/OverviewTab.tsx`
18. `src/components/property/tabs/FloorPlanTab.tsx`
19. `src/components/property/tabs/AmenitiesTab.tsx`
20. `src/components/property/tabs/LocalityTab.tsx`
21. `src/components/property/tabs/PriceTrendTab.tsx`
22. `src/components/property/RERASection.tsx + .module.css` — full compliance block
23. `src/components/property/SimilarProperties.tsx + .module.css`
24. `src/components/property/SimilarPropertyCard.tsx + .module.css`
25. `src/components/sidebar/SidebarPanel.tsx + .module.css` — 'use client', toggle state
26. `src/components/sidebar/ContactForm.tsx + .module.css` — 'use client'
27. `src/components/sidebar/EMICalculator.tsx + .module.css` — 'use client', calculateEMI()
28. `src/app/page.tsx` — assembles all components

**Rules to enforce in every file:**
- No hex in `.module.css` (use `var(--color-*)`)
- No `font-weight: 700`
- No `border-radius: 50%`
- Orange buttons: `color: var(--color-text)` not `var(--color-white)`
- Tab content: conditional JSX, never `display: none`
- Prices: `formatPrice()` only
- CTA text: `Contact ${property.listingSource}` — never hardcoded

---

### 7 — Gemini

**Project:** VeriAcres — Indian property detail page. Next.js 14 App Router, TypeScript strict mode, CSS Modules (no Tailwind). Static export. Lucide React icons. Framer Motion for scroll entrances.

**Design system:**
- Font: Poppins 400/500/600 — `next/font/google`. No 700 weight in this build.
- 8 CSS tokens in `globals.css`:
  - `--color-orange: #E84118` — brand primary; 4.64:1 with dark text ✓ AA
  - `--color-white: #FFFFFF`
  - `--color-surface: #F5F5F5`
  - `--color-text: #212121` — used on orange buttons (passes 4.64:1)
  - `--color-muted: #666666`
  - `--color-border: #E0E0E0`
  - `--color-green: #388E3C` — RERA section, verified badge
  - `--color-dark: #1C1C1C` — footer background
- Zero hex values in `.module.css` files. `rgba()` in `box-shadow` is permitted.
- Contrast rules: white on orange = 4.15:1 (use only for large text ≥18px). Dark text on orange buttons always.

**Architecture — 5 layers:**

Layer 1 — Foundation: types, utilities (`formatPrice`, `calculateEMI`), mock data, globals.css, layout.tsx.

Layer 2 — Shared UI: Button (dark-on-orange primary), VerifiedBadge (green text, no bg), ReraBadge (green text + border), ListingSourcePill (inline-style source colours).

Layer 3 — Layout: SiteNav (`'use client'`, scroll shadow), Footer (dark bg, 4 columns).

Layer 4 — Property Detail Components:
- `PropertyGallery` (`'use client'`) — hero image + thumbnails + photo count badge
- `PropertyHeader` — price in `formatPrice()`, key specs grid, badge row
- `PropertyTabs` (`'use client'`) — 5 tabs, conditional JSX content, ARIA roles
- Tab components — OverviewTab, FloorPlanTab, AmenitiesTab, LocalityTab, PriceTrendTab
- `RERASection` — full compliance block (NOT a badge), green left-border accent
- `SimilarProperties` + `SimilarPropertyCard`

Layer 5 — Sidebar:
- `SidebarPanel` (`'use client'`) — toggles between ContactForm and EMICalculator
- `ContactForm` (`'use client'`) — name, phone, email, message inputs
- `EMICalculator` (`'use client'`) — loan amount, interest rate, tenure inputs; live EMI via `calculateEMI()`; result displayed via `formatPrice()`

**Critical requirements:**
- `PropertyTabs` switching: conditional JSX only — `{activeTab === 'overview' && <OverviewTab />}` etc.
- RERA block always visible, below tabs, regardless of active tab
- EMI formula: `Math.round(P × r × (1+r)^n / ((1+r)^n − 1))`, `r = annualRate/12/100`, `n = years×12`
- All prices via `formatPrice()` — including EMI result, property price, similar property prices
- CTA: `Contact {property.listingSource}` — dynamic, never hardcoded

**Framer Motion entrances:**
- PropertyGallery: `opacity: 0, y: 20 → visible`
- RERASection: `opacity: 0, x: -20 → visible` (slides in from left, matching left-border accent)
- SimilarProperties cards: stagger 0.1s
- All `viewport={{ once: true }}`

**Mock data requirements:**
- One `PropertyDetail`: 3 BHK Builder apartment, Whitefield, Bangalore, ₹1.20 Cr (12_000_000), 1600 sqft super, 1200 sqft carpet, 8th of 22 floors, East facing, RERA number `PRM/KA/RERA/1251/446/PR/171018/002`, expiry `31 Dec 2026`, authority `KRERA`
- 4 `AmenityGroup` items: Fitness (Gym, Swimming Pool, Yoga Deck), Recreation (Clubhouse, Children's Play Area, Amphitheatre), Security (24x7 Security, CCTV, Intercom), Convenience (Power Backup, Lift, Covered Parking)
- 3 `FloorPlan` entries: 2 BHK 1100/880sqft, 3 BHK 1600/1200sqft, 4 BHK 2200/1650sqft
- `LocalityInsights`: walkScore 72, transitScore 85, 5 nearbyPlaces (TISB School 0.8km, Apollo Clinic 1.2km, Whitefield Metro 1.5km, VR Bengaluru Mall 2.1km, Olive Garden 0.4km)
- 6 `PriceTrendPoint`: Nov 2024 through Apr 2025, prices ranging ₹7200–7550/sqft
- 3 `SimilarProperty` objects from Whitefield

`tsc --noEmit` exits 0. `npm run build` exits 0.

---

### 8 — Cursor

Build **VeriAcres** property detail page — Indian real estate, 99acres pattern. Next.js 14 App Router, TypeScript, CSS Modules. Static export.

**`next.config.ts`:**
```typescript
const nextConfig = { output: 'export', images: { unoptimized: true } }
export default nextConfig
```

**`src/app/globals.css`:**
```css
:root {
  --color-orange: #E84118; --color-white: #FFFFFF; --color-surface: #F5F5F5;
  --color-text: #212121; --color-muted: #666666; --color-border: #E0E0E0;
  --color-green: #388E3C; --color-dark: #1C1C1C;
}
.sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0 }
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:0.01ms!important;transition-duration:0.01ms!important } }
```

**`src/app/layout.tsx`:**
```tsx
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-sans', display: 'swap' })
// weight: '700' must NOT appear
```

**Key `src/types/index.ts` types:**
```typescript
export type TabSection = 'overview' | 'floorplan' | 'amenities' | 'locality' | 'pricetrend'
export interface PropertyDetail {
  id: string; title: string; bhk: BHKType; price: number; pricePerSqft: number
  superArea: number; carpetArea: number; floor: string; totalFloors: number
  facing: Facing; age: PropertyAge; locality: string; city: string
  listingSource: ListingSource; verified: boolean
  reraNumber?: string; reraExpiryDate?: string; reraAuthority?: string
  possessionStatus: PossessionStatus; furnishingStatus: FurnishingStatus
  photos: number; postedDaysAgo: number; description: string
  amenities: AmenityGroup[]; floorPlans: FloorPlan[]
  localityInsights: LocalityInsights; priceTrends: PriceTrendPoint[]
}
```

**`src/lib/calculateEMI.ts`:**
```typescript
export function calculateEMI(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100
  const n = years * 12
  return Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
}
// e.g. calculateEMI(9_000_000, 8.5, 20) → ₹78,152/mo
```

**Page assembly (`src/app/page.tsx`):**
```tsx
// No 'use client'
import SiteNav from '@/components/layout/SiteNav'
import Breadcrumb from '@/components/property/Breadcrumb'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyHeader from '@/components/property/PropertyHeader'
import PropertyTabs from '@/components/property/PropertyTabs'
import RERASection from '@/components/property/RERASection'
import SimilarProperties from '@/components/property/SimilarProperties'
import SidebarPanel from '@/components/sidebar/SidebarPanel'
import Footer from '@/components/layout/Footer'
import { propertyDetail, similarProperties } from '@/lib/data'
```

**Forbidden patterns (grep check before build):**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"  # empty
grep -r "display.*none" src/components/property/PropertyTabs.tsx # empty — use conditional JSX
grep -r "Contact Owner" src/components --include="*.tsx"         # empty
grep -r "font-weight: 700" src --include="*.module.css"         # empty
grep -r "border-radius: 50%" src --include="*.module.css"       # empty
```

**RERASection** — NOT a badge. A full block with green left-border:
```tsx
<section className={styles.section}>
  <h3 className={styles.heading}><ShieldCheck size={16}/> RERA Registered</h3>
  <div className={styles.grid}>
    <div><span className={styles.label}>Reg. Number</span><span className={styles.value}>{reraNumber}</span></div>
    <div><span className={styles.label}>Valid Until</span><span className={styles.value}>{reraExpiryDate}</span></div>
    <div><span className={styles.label}>Authority</span><span className={styles.value}>{reraAuthority}</span></div>
  </div>
</section>
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
