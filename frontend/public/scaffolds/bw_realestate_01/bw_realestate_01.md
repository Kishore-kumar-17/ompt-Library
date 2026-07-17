# bw_realestate_01 — Indian Property Listing Portal
## Inspiration: MagicBricks (magicbricks.com)
## Theme: Mode-dependent search, lakhs/crores pricing, RERA-verified listings

---

## Design Identity

MagicBricks is India's largest property portal — a search-first platform where the hero search widget is the entire product. The defining UX pattern is a **mode-dependent search widget** with five tabs (Buy / Rent / PG / Commercial / Plots) that each surface different form fields. Property cards carry dense structured data: BHK, area, floor, locality, verified/RERA badges, and a listing-source-driven CTA ("Contact Owner" vs "Contact Builder" vs "Contact Agent"). Prices are displayed in Indian real estate convention: lakhs and crores (₹45 L, ₹1.2 Cr) — not raw numbers.

**Contrast note:** Brand red `#E03228` on white = 4.51:1 — just passes WCAG AA. Use only for buttons (large text) and accent elements. Never use for body-copy-size text on white.

**Palette:** `#E03228` (red) · `#FFFFFF` (white) · `#F4F5F7` (surface) · `#2D2D2D` (text) · `#717171` (muted) · `#E0E0E0` (border) · `#1A7A3A` (green) · `#1A1A1A` (dark)

**Typography:** Poppins — 400, 500, 600 · Google Fonts

**Radius:** Search widget `12px` · Property cards `8px` · Filter chips `20px` · Buttons `4px` · Badges `4px`

**Shadow:** SearchWidget `0 4px 24px rgba(0,0,0,0.12)` · PropertyCard `0 2px 8px rgba(0,0,0,0.08)`

**Project name:** VeriProperty

---

## Base Prompt

**Role:** Senior product designer specialising in Indian property portal UX, mode-dependent search widget design, and lakh/crore price convention display.

**Application Overview:** VeriProperty is an Indian property listing portal homepage built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). Inspired by MagicBricks — a search-first platform where the hero is a 5-mode search widget (Buy / Rent / PG / Commercial / Plots) with mode-dependent form fields. Font: Poppins 400/500/600 via `next/font/google`. No Tailwind, no weight 700.

**Brand Voice & Mood:** Practical and information-dense — red `#E03228` signals urgency and action; the neutral surface palette (`#F4F5F7`, `#2D2D2D`, `#717171`) keeps property data legible. Indian real estate pricing convention (₹45 L, ₹1.2 Cr) signals market familiarity. RERA-verified badges establish regulatory trust. The tone is transactional and search-led — users arrive to find properties, not to read.

**Core Features:**
1. **SiteNav** (server) — white sticky nav, red logo "VeriProperty", city selector pill, nav links (Buy / Rent / PG / Commercial / New Projects), right: "Post Property Free" (red bg, white, 4px radius) + Login
2. **HeroSearchWidget** (`'use client'`) — full-width hero with subtle bg; white widget card (`border-radius: 12px`, `box-shadow: 0 4px 24px rgba(0,0,0,0.12)`); 5 mode tabs (Buy / Rent / PG / Commercial / Plots) — active tab: red bottom border + red text; mode-dependent form fields (buy/rent: city + locality + type + BHK multi-select; PG: city + locality + tenant preference; commercial: city + type; plot: city + area range); submit scrolls to `#property-section`
3. **FilterBar** (`'use client'`) — sticky below nav; horizontal scrollable chips (no scrollbar): BHK | Budget | Property Type | Furnished | Possession | Posted By; active chip: red bg + white text; `border-radius: 20px`
4. **PropertyGrid** (`'use client'`) — `id="property-section"`; view toggle (Grid/List); result count; `useMemo` multi-dimensional filter (BHK + budget + propertyType + possession); ARIA live region; empty state
5. **PropertyCard** (server) — property image + photo count badge; green "Verified" badge (text only, not white-on-green); green "RERA" badge (text only); listing source pill (Owner/Builder/Agent); title (BHK + type); `formatPrice(price)` in red bold; `₹{pricePerSqft}/sqft` muted; super area + carpet area; floor; locality + city; posted days ago; CTA: `Contact ${property.listingSource}` (outline red, 4px radius)
6. **FeaturedProjects** (server) — surface bg, 3 new-project cards with builder name, project name, price range, possession date, status badge
7. **TrustBar** (server) — white bg, 4 stat columns with red icons
8. **CityLinks** (server) — surface bg, 8 major city quick-links with property counts
9. **Footer** (server) — dark bg (`--color-dark`), 4 columns, white text, red hover

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-red: #E03228`, `--color-white: #FFFFFF`, `--color-surface: #F4F5F7`, `--color-text: #2D2D2D`, `--color-muted: #717171`, `--color-border: #E0E0E0`, `--color-green: #1A7A3A`, `--color-dark: #1A1A1A`
- **Contrast:** Red `#E03228` on white = 4.51:1 ✓ AA (just passes — use only for large bold elements: buttons, hero price, nav logo). Never for body-copy-size text on white.
- **Green badges:** `color: var(--color-green)` on white card — NEVER white text on green background (3.19:1 fails)
- **Border-radius:** `12px` search widget, `8px` property cards + images (top-left/right only: `8px 8px 0 0`), `20px` filter chips + BHK multi-select chips, `4px` buttons + CTA buttons + badges. No 50%, no pill (9999px).
- **Shadows:** SearchWidget `0 4px 24px rgba(0,0,0,0.12)`, PropertyCard `0 2px 8px rgba(0,0,0,0.08)` — only these two
- **Zero hex in `.module.css`** — CSS custom properties only; exception: `rgba()` in shadows

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # SearchMode, BHKType, PropertyType, ListingSource, Property
  lib/
    data.ts            # 8+ properties (mixed modes/types/sources), cities, featuredProjects
    formatPrice.ts     # formatPrice(n): ₹1.20 Cr / ₹45 L / ₹X,XXX
    filterProperties.ts # filterProperties(properties, filters)
  components/
    layout/SiteNav/ Footer/
    home/
      HeroSearchWidget/   # 'use client', 5-mode tabs + mode-dependent fields
      FilterBar/          # 'use client', sticky chip row
      PropertyGrid/       # 'use client', useMemo multi-filter
      PropertyCard/       # server, dynamic CTA text
      FeaturedProjects/   # server
      TrustBar/           # server
      CityLinks/          # server
    ui/
      Button/
      VerifiedBadge/      # green text — no bg
      ReraBadge/          # green text — no bg
      ListingSourcePill/
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `formatPrice(amount: number): string` — `≥10,000,000 → ₹X.XX Cr`; `≥100,000 → ₹X L`; else `₹X,XXX` via `toLocaleString('en-IN')`
- `SearchMode = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot'`
- HeroSearchWidget: `useState<SearchMode>` for active tab; conditional JSX renders different form fields per mode
- PropertyGrid: `useMemo` applies all active filter dimensions simultaneously

**Implementation Steps:**
1. Scaffold, install `lucide-react`, `framer-motion`
2. Define types: `SearchMode`, `BHKType`, `PropertyType`, `ListingSource`, `Property`
3. Write `globals.css` with 8 tokens; `layout.tsx` with Poppins `weight: ['400','500','600']`
4. Implement `formatPrice` utility — test `12_000_000 → ₹1.20 Cr`, `4_500_000 → ₹45 L`
5. Create 8+ mock `Property` entries covering all `SearchMode` values and all 3 `ListingSource` values
6. Build `HeroSearchWidget` (`'use client'`) — 5 tab modes with conditional JSX field sets
7. Build `PropertyCard` (server) — dynamic CTA `Contact ${property.listingSource}`, green text badges (not white-on-green)
8. Build `FilterBar` + `PropertyGrid` (`'use client'`) — multi-dimensional useMemo filter
9. Build remaining server sections
10. Verify: no `Contact Owner` hardcoded, green badges are text-only, `tsc --noEmit` clean, build passes

**User Experience:**
- 5-mode widget lets users immediately signal intent (buy vs rent vs PG) — different fields surface for each
- FilterBar sticky below nav — filter chips always accessible while scrolling the property grid
- Dynamic CTA ("Contact Owner" vs "Contact Builder" vs "Contact Agent") mirrors real portal data-driven CTAs
- Green RERA badge as text-only (not filled) maintains visual hierarchy — trust signal without competing with the red price CTA
- `formatPrice()` in lakh/crore convention signals deep Indian market familiarity

**Constraints:**
- `formatPrice()` for ALL price displays — NEVER raw integers, NEVER `toLocaleString` alone
- CTA button: `Contact ${property.listingSource}` — NEVER hardcode "Contact Owner"
- Green badges (Verified, RERA): text colour on white — NEVER white text on green background
- Active filter chip: red bg + white text — acceptable at 14px bold (≥14px bold = large text threshold for 4.51:1)
- HeroSearchWidget field layout: conditional JSX per mode — NOT CSS `display: none`
- Button radius: `4px` — NOT 8px (that's Apollo/clinic pattern), NOT 9999px pill
- Filter chips: `20px` radius — only these
- No font weight 700 — max is 600
- No hex values in `.module.css` (except `rgba()` in shadows)
- `page.tsx` must be a Server Component

---

## Platform Versions

---

## 1 — Lovable

Build a property listing portal called **VeriProperty** — modelled on MagicBricks. Next.js 14, TypeScript, CSS Modules. No Tailwind.

**Brand palette (8 tokens in globals.css):**
```
--color-red:     #E03228   primary — CTAs, active tabs, badges, logo
--color-white:   #FFFFFF   default bg, card bg, text on red
--color-surface: #F4F5F7   section bg, filter chip bg, input bg
--color-text:    #2D2D2D   headings, property titles, primary body
--color-muted:   #717171   metadata — sqft, floor, posted date
--color-border:  #E0E0E0   card borders, input borders, dividers
--color-green:   #1A7A3A   verified badge, RERA badge, success states
--color-dark:    #1A1A1A   footer bg, dark section text
```

**Font:** Poppins (Google Fonts, weights 400 + 500 + 600) via `next/font/google`, `variable: '--font-sans'`.

**Key data types:**
```typescript
type SearchMode = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot'
type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
type PropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'Plot' | 'PG'
type ListingSource = 'Owner' | 'Builder' | 'Agent'
type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'

interface Property {
  id: string; title: string; bhk: BHKType; propertyType: PropertyType
  price: number             // raw INR — display via formatPrice()
  pricePerSqft: number      // ₹ per sqft
  superArea: number         // sqft
  carpetArea: number        // sqft
  floor: string             // "3rd of 15 Floors"
  locality: string          // "Whitefield"
  city: string              // "Bangalore"
  listingSource: ListingSource
  verified: boolean
  reraRegistered: boolean
  possessionStatus: PossessionStatus
  furnishingStatus: FurnishingStatus
  photos: number            // photo count
  postedDaysAgo: number
  amenities: string[]
  projectName?: string      // builder listings only
  mode: SearchMode          // 'buy' or 'rent' for residential
}
```

**Price utility:**
```typescript
// src/lib/formatPrice.ts
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(0)} L`
  return `₹${amount.toLocaleString('en-IN')}`
}
// formatPrice(12_000_000) → "₹1.20 Cr"
// formatPrice(4_500_000)  → "₹45 L"
// formatPrice(1_800_000)  → "₹18 L"
```

**Sections to build (top to bottom):**

1. `SiteNav` — white sticky nav · Logo "VeriProperty" in red · City selector pill · Nav links: Buy / Rent / PG / Commercial / New Projects · Right: "Post Property Free" (red bg, white text, `border-radius: 4px`) + Login · No `'use client'`

2. `HeroSearchWidget` — `'use client'` · Full-width hero with subtle city-skyline bg image · White widget card (`border-radius: 12px`, `box-shadow: 0 4px 24px rgba(0,0,0,0.12)`) sitting on hero · **5 mode tabs** at top of card: Buy / Rent / PG / Commercial / Plots — active tab has red bottom border + red text · Mode-dependent fields:
   - **buy/rent**: City `<select>` + Locality text input + Property Type `<select>` + BHK multi-select + "Search" button (red bg, white text)
   - **pg**: City `<select>` + Locality text input + Preferred By (Boys/Girls/Any) radio + Search button
   - **commercial**: City `<select>` + Locality text input + Type `<select>` (Office/Shop/Warehouse) + Search button
   - **plot**: City `<select>` + Locality text input + Area Range `<select>` + Search button
   · Submit scrolls to `#property-section`

3. `FilterBar` — `'use client'` · Sticky below nav when scrolling · Horizontal scrollable chips (no scrollbar visible): BHK | Budget | Property Type | Furnished | Possession | Posted By · Active chip: red bg, white text · Inactive: surface bg, text color · `border-radius: 20px`

4. `PropertyGrid` — `'use client'` · Section `id="property-section"` · View toggle: Grid / List icons (top right) · Result count text ("248 Properties Found") · `useMemo` filters by BHK + budget + propertyType + possession simultaneously · Empty state

5. `PropertyCard` — Server component · Property image placeholder (full-width, `border-radius: 8px 8px 0 0`) + photo count badge · Verified badge (green checkmark + "Verified") if `verified` · RERA badge ("RERA" in green) if `reraRegistered` · "POPULAR" / "NEW LAUNCH" tag if applicable · Listing source pill: Owner/Builder/Agent · Title (BHK + property type) · `formatPrice(price)` in red, bold · `₹{pricePerSqft}/sqft` in muted · Super area + Carpet area · Floor info · Locality + City · Posted days ago · CTA button: "Contact {listingSource}" (outline red, `border-radius: 4px`) · Card: `border-radius: 8px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`, `border: 1px solid var(--color-border)`

6. `FeaturedProjects` — Surface bg · 3 featured new-project cards with builder name, project name, price range, location, possession date, "New Launch" / "Under Construction" badge

7. `TrustBar` — White bg · 4 columns: "10 Lakh+ Listings", "Verified Properties", "Owner Properties", "RERA Registered" with icons in red

8. `CityLinks` — Surface bg · Quick links grid: 8 major cities with property count

9. `Footer` — Dark bg (`var(--color-dark)`) · 4 columns · White text · Links hover red

**Critical rules:**
- `HeroSearchWidget` and `FilterBar` and `PropertyGrid`: `'use client'`
- `SiteNav`, `PropertyCard`, `FeaturedProjects`, `TrustBar`, `CityLinks`, `Footer`: server components
- `PropertyCard` CTA text is DYNAMIC: `Contact ${property.listingSource}` — never hardcode "Contact Owner"
- Verified badge uses `--color-green` text + icon on white card — never white text on green bg (3.19:1 fails)
- RERA badge: same pattern — green text on white, not white on green
- Price display: ALWAYS `formatPrice()` — never raw numbers, never `toLocaleString` alone
- Active filter chip: red bg + white text (4.51:1 ✓ for chip text size at 14px bold — passes as large text)
- `border-radius: 20px` on filter chips ONLY — no other elements use this radius
- SearchWidget shadow is the hero shadow — only one with `0 4px 24px`
- PropertyCard shadow: lighter `0 2px 8px`

---

## 2 — ChatGPT Canvas

Build VeriProperty — a MagicBricks-style Indian property portal. Next.js 14 App Router + TypeScript + CSS Modules.

**Setup:**
```bash
npx create-next-app@latest veriproperty --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd veriproperty
npm install framer-motion lucide-react
```

**globals.css — 8 tokens:**
```css
:root {
  --color-red:     #E03228;
  --color-white:   #FFFFFF;
  --color-surface: #F4F5F7;
  --color-text:    #2D2D2D;
  --color-muted:   #717171;
  --color-border:  #E0E0E0;
  --color-green:   #1A7A3A;
  --color-dark:    #1A1A1A;
}
```

**layout.tsx:**
```typescript
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})
```

**Types (src/types/index.ts)** — all types from Section 1 above.

**Mock data — 8 properties (src/lib/data.ts):**
```typescript
export const properties: Property[] = [
  {
    id: 'prop-01', title: '3 BHK Apartment in Brigade Orchards',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 12_000_000, pricePerSqft: 7500, superArea: 1600, carpetArea: 1200,
    floor: '8th of 22 Floors', locality: 'Devanahalli', city: 'Bangalore',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 18, postedDaysAgo: 2, amenities: ['Gym', 'Pool', 'Clubhouse'],
    projectName: 'Brigade Orchards', mode: 'buy',
  },
  {
    id: 'prop-02', title: '2 BHK Apartment — Owner Direct',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 4_500_000, pricePerSqft: 5625, superArea: 800, carpetArea: 640,
    floor: '3rd of 10 Floors', locality: 'Electronic City', city: 'Bangalore',
    listingSource: 'Owner', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Unfurnished',
    photos: 9, postedDaysAgo: 5, amenities: ['Parking', 'Security', 'Power Backup'],
    mode: 'buy',
  },
  {
    id: 'prop-03', title: '4 BHK Villa in Bandra West',
    bhk: '4 BHK', propertyType: 'Villa',
    price: 35_000_000, pricePerSqft: 35000, superArea: 1000, carpetArea: 850,
    floor: 'Ground of 3 Floors', locality: 'Bandra West', city: 'Mumbai',
    listingSource: 'Agent', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Furnished',
    photos: 24, postedDaysAgo: 1, amenities: ['Terrace', 'Private Garden', 'Parking'],
    mode: 'buy',
  },
  {
    id: 'prop-04', title: '1 BHK Apartment — New Launch',
    bhk: '1 BHK', propertyType: 'Apartment',
    price: 2_500_000, pricePerSqft: 4167, superArea: 600, carpetArea: 480,
    floor: '2nd of 18 Floors', locality: 'Sector 56', city: 'Gurgaon',
    listingSource: 'Builder', verified: false, reraRegistered: false,
    possessionStatus: 'New Launch', furnishingStatus: 'Unfurnished',
    photos: 5, postedDaysAgo: 14, amenities: ['Lift', 'Parking'],
    projectName: 'Emerald Heights', mode: 'buy',
  },
  {
    id: 'prop-05', title: '3 BHK Independent House',
    bhk: '3 BHK', propertyType: 'Independent House',
    price: 8_500_000, pricePerSqft: 4250, superArea: 2000, carpetArea: 1700,
    floor: 'Ground + 1', locality: 'Kondapur', city: 'Hyderabad',
    listingSource: 'Owner', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 15, postedDaysAgo: 3, amenities: ['Garden', 'Parking', 'Generator'],
    mode: 'buy',
  },
  {
    id: 'prop-06', title: '2 BHK in Viman Nagar',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 6_800_000, pricePerSqft: 8500, superArea: 800, carpetArea: 650,
    floor: '5th of 12 Floors', locality: 'Viman Nagar', city: 'Pune',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Under Construction', furnishingStatus: 'Unfurnished',
    photos: 11, postedDaysAgo: 7, amenities: ['Gym', 'Security', 'Lift'],
    projectName: 'Paranjape Blue Ridge', mode: 'buy',
  },
  {
    id: 'prop-07', title: '2 BHK for Rent — Furnished',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 28_000, pricePerSqft: 35, superArea: 800, carpetArea: 660,
    floor: '4th of 8 Floors', locality: 'Koramangala', city: 'Bangalore',
    listingSource: 'Owner', verified: true, reraRegistered: false,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Furnished',
    photos: 12, postedDaysAgo: 2, amenities: ['WiFi', 'AC', 'Parking'],
    mode: 'rent',
  },
  {
    id: 'prop-08', title: '3 BHK on Sarjapur Road',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 9_500_000, pricePerSqft: 5278, superArea: 1800, carpetArea: 1440,
    floor: '10th of 28 Floors', locality: 'Sarjapur Road', city: 'Bangalore',
    listingSource: 'Agent', verified: true, reraRegistered: true,
    possessionStatus: 'Under Construction', furnishingStatus: 'Unfurnished',
    photos: 8, postedDaysAgo: 10, amenities: ['Pool', 'Gym', 'Clubhouse', 'Tennis Court'],
    mode: 'buy',
  },
]
```

**Component structure:**
```
src/
  app/layout.tsx, globals.css, page.tsx
  types/index.ts
  lib/data.ts, formatPrice.ts, filterProperties.ts
  components/
    layout/SiteNav.tsx + .module.css
    layout/Footer.tsx + .module.css
    home/HeroSearchWidget.tsx + .module.css
    home/FilterBar.tsx + .module.css
    home/PropertyGrid.tsx + .module.css
    home/PropertyCard.tsx + .module.css
    home/FeaturedProjects.tsx + .module.css
    home/TrustBar.tsx + .module.css
    home/CityLinks.tsx + .module.css
    ui/Button.tsx + .module.css
    ui/VerifiedBadge.tsx + .module.css
    ui/ReraBadge.tsx + .module.css
    ui/ListingSourcePill.tsx + .module.css
```

**Critical CSS rules:**
```css
/* Button.module.css */
.btn { border-radius: 4px; }
.primary { background: var(--color-red); color: var(--color-white); }
/* white on red #E03228 = 4.51:1 ✓ AA */
.outlineRed { background: transparent; color: var(--color-red); border: 1.5px solid var(--color-red); }

/* FilterBar.module.css */
.chip { border-radius: 20px; }
.chipActive { background: var(--color-red); color: var(--color-white); }
.chipInactive { background: var(--color-surface); color: var(--color-text); }

/* PropertyCard.module.css */
.card { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

/* VerifiedBadge: green TEXT/ICON on white bg — never white on green */
.verified { color: var(--color-green); }
```

---

## 3 — Bolt

**VeriProperty — MagicBricks-pattern Indian Property Portal**
Next.js 14 · TypeScript strict · CSS Modules · Static export

**Colors:** `--color-red: #E03228` · `--color-white: #FFFFFF` · `--color-surface: #F4F5F7` · `--color-text: #2D2D2D` · `--color-muted: #717171` · `--color-border: #E0E0E0` · `--color-green: #1A7A3A` · `--color-dark: #1A1A1A`

Font: Poppins via `next/font/google` (400, 500, 600). Variable: `--font-sans`.

**Hero Search Widget (client) — the central UX piece:**

5 mode tabs: Buy | Rent | PG | Commercial | Plots. Active tab: red underline + red text. State: `mode: SearchMode`.

Fields rendered per mode (conditional JSX — NOT CSS show/hide):
```tsx
{(mode === 'buy' || mode === 'rent') && (
  <>
    <CitySelect /> <LocalityInput /> <PropertyTypeSelect /> <BHKSelect />
  </>
)}
{mode === 'pg' && (
  <>
    <CitySelect /> <LocalityInput /> <PreferredByRadio />
  </>
)}
{mode === 'commercial' && (
  <>
    <CitySelect /> <LocalityInput /> <CommercialTypeSelect />
  </>
)}
{mode === 'plot' && (
  <>
    <CitySelect /> <LocalityInput /> <AreaRangeSelect />
  </>
)}
```

**FilterBar (client):** Sticky, horizontal scrollable chips. State: `bhk[]`, `budget`, `propertyType`, `furnished`, `possession`. All chips `border-radius: 20px`. Active: red bg, white text.

**PropertyCard (server):**
```tsx
// Price in red, formatted
<p className={styles.price}>{formatPrice(property.price)}</p>

// CTA — driven by listingSource
<Button variant="outlineRed">Contact {property.listingSource}</Button>

// Verified badge — green text on white, NOT white on green
{property.verified && <VerifiedBadge />}
{property.reraRegistered && <ReraBadge />}
```

**Price format rule:**
```typescript
formatPrice(12_000_000) → "₹1.20 Cr"
formatPrice(4_500_000)  → "₹45 L"
formatPrice(28_000)     → "₹28,000"  // rent — monthly amount
```

**Radius system:**
- SearchWidget container: `12px`
- PropertyCards: `8px`
- Filter chips: `20px`
- All buttons: `4px`
- Badges (verified, RERA, source pill): `4px`
- Image top: `8px 8px 0 0`

**Shadow system:**
- SearchWidget: `0 4px 24px rgba(0,0,0,0.12)` — hero prominence
- PropertyCard: `0 2px 8px rgba(0,0,0,0.08)` — subtle lift
- SiteNav scroll: `0 2px 8px rgba(0,0,0,0.08)` — separation from content

**QA:**
```bash
tsc --noEmit && npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"    # must be empty
grep -r "rgba(" src --include="*.module.css"                   # SearchWidget + PropertyCard + SiteNav shadows
grep -r "border-radius: 20px" src --include="*.module.css"    # only FilterBar chips
grep -r "Contact Owner" src --include="*.tsx"                  # must be empty — CTA is dynamic
```

---

## 4 — v0

Build these components for an Indian property portal (VeriProperty — MagicBricks pattern). TypeScript + CSS Modules. No Tailwind.

**Component 1: HeroSearchWidget**
`'use client'`. State: `mode: SearchMode` + city + locality + propertyType + bhk + budget.
5 tab buttons at top: Buy / Rent / PG / Commercial / Plots. Active: `border-bottom: 3px solid var(--color-red); color: var(--color-red)`.
Widget card: `background: var(--color-white); border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); padding: 0`.
Tabs in `border-bottom: 1px solid var(--color-border)` row. Fields below in padded area.
Conditional JSX per mode — not `display: none`. Submit scrolls to `#property-section`.

**Component 2: PropertyCard**
Props: `property: Property`
Layout: image block (`border-radius: 8px 8px 0 0`, aspect-ratio 16/9, bg surface) + content block.
Image overlay: photo count badge (bottom-left) + possession status badge (top-right, red bg).
Content: verified + RERA badges row → title → price row → area + floor row → locality → CTA.
```tsx
// Price — always formatted, always red
<p className={styles.price}>{formatPrice(property.price)}</p>
<span className={styles.pricePerSqft}>₹{property.pricePerSqft.toLocaleString('en-IN')}/sqft</span>

// Areas
<span>{property.superArea.toLocaleString('en-IN')} sqft Super Area</span>
<span>{property.carpetArea.toLocaleString('en-IN')} sqft Carpet Area</span>

// CTA — dynamic, never hardcoded
<Button variant="outlineRed">Contact {property.listingSource}</Button>
```
Card: `border-radius: 8px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`, `border: 1px solid var(--color-border)`.

**Component 3: FilterBar**
`'use client'`. State: `activeBHK: BHKType[]` + `activeBudget: string` + `activeType: PropertyType | ''` + etc.
Horizontal scrollable `<div>` with `scrollbar-width: none`. Chip groups with label + options.
Active chip: `background: var(--color-red); color: var(--color-white); border-radius: 20px`.
Inactive: `background: var(--color-surface); color: var(--color-text); border-radius: 20px`.

**Component 4: VerifiedBadge + ReraBadge**
Both are server components. Green text + icon on white card — not white on green bg.
```tsx
// VerifiedBadge
<span className={styles.verified}>
  <CheckCircle size={12} aria-hidden="true" />
  Verified
</span>
// CSS: .verified { color: var(--color-green); display: flex; gap: 4px; font-size: 0.75rem; font-weight: 600; }
```

**Component 5: ListingSourcePill**
Props: `source: ListingSource`. Renders `Owner` / `Builder` / `Agent` as a small pill.
```tsx
const colors = {
  Owner: { bg: '#EEF7F1', text: '#1A7A3A' },     // green tint — owner = no brokerage
  Builder: { bg: '#FEF3E2', text: '#B45309' },    // amber tint
  Agent: { bg: '#EFF6FF', text: '#1D4ED8' },      // blue tint
}
// Inline style for bg + text — these are not tokens (contextual colors)
```

---

## 5 — Claude Artifacts

Build **VeriProperty** — a MagicBricks-pattern Indian property portal. Next.js 14 + TypeScript + CSS Modules. Static export.

### File-by-file:

**TASK-001 — Scaffold + deps**
```bash
npx create-next-app@latest veriproperty --typescript --no-tailwind --app --src-dir --import-alias "@/*"
npm install framer-motion lucide-react
```

**TASK-002 — Types** → `src/types/index.ts` — all 8 types.

**TASK-003 — globals.css** → 8 tokens + `.sr-only` + prefers-reduced-motion.

**TASK-004 — layout.tsx**
```typescript
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' })
```

**TASK-005 — formatPrice + filterProperties**
```typescript
// src/lib/formatPrice.ts
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(0)} L`
  return `₹${amount.toLocaleString('en-IN')}`
}

// src/lib/filterProperties.ts
export function filterProperties(
  properties: Property[],
  bhk: BHKType[],
  budget: string,
  propertyType: PropertyType | '',
  possession: PossessionStatus | '',
  furnished: FurnishingStatus | '',
): Property[] {
  return properties.filter(p => {
    if (bhk.length > 0 && !bhk.includes(p.bhk)) return false
    if (propertyType && p.propertyType !== propertyType) return false
    if (possession && p.possessionStatus !== possession) return false
    if (furnished && p.furnishingStatus !== furnished) return false
    // budget range parsing omitted for brevity — implement as crore/lakh range buckets
    return true
  })
}
```

**TASK-006 — Mock data** → `src/lib/data.ts` — 8 properties from Section 2.

**TASK-007 — Button (2 variants)**
- `primary`: red bg, white text, `border-radius: 4px`
- `outlineRed`: transparent bg, red border + text, `border-radius: 4px`

**TASK-008 — SiteNav (server component)**
```tsx
// No 'use client'. White bg, sticky.
<nav aria-label="Main navigation">
  <Link href="/" className={styles.logo}>VeriProperty</Link>
  {/* Nav links: Buy / Rent / PG / Commercial / New Projects */}
  <Button variant="primary" size="sm">Post Property Free</Button>
</nav>
```

**TASK-009 — HeroSearchWidget (client)**
```tsx
'use client'
const [mode, setMode] = useState<SearchMode>('buy')
const [city, setCity] = useState('Bangalore')
const [locality, setLocality] = useState('')
const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
const [bhk, setBhk] = useState<BHKType[]>([])

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  document.getElementById('property-section')?.scrollIntoView({ behavior: 'smooth' })
}

// 5 tabs: buy, rent, pg, commercial, plot
// Conditional fields rendered via JSX per mode — not CSS visibility
```

**TASK-010 — VerifiedBadge + ReraBadge + ListingSourcePill** (server components)
Green text, not white-on-green. Verified: CheckCircle icon + "Verified". RERA: "RERA ✓". ListingSourcePill: inline style bg/text per source.

**TASK-011 — PropertyCard (server component)**
```tsx
import { formatPrice } from '@/lib/formatPrice'

// Possession badge on image (conditional JSX)
{property.possessionStatus === 'New Launch' && (
  <span className={styles.launchBadge}>New Launch</span>
)}
{property.possessionStatus === 'Under Construction' && (
  <span className={styles.ucBadge}>Under Construction</span>
)}

// Price — always formatPrice(), always red class
<p className={styles.price}>{formatPrice(property.price)}</p>

// CTA — dynamic per listingSource
<Button variant="outlineRed" fullWidth>
  Contact {property.listingSource}
</Button>
```

**TASK-012 — FilterBar (client)**
State: `bhk[]`, `budget`, `propertyType`, `possession`, `furnished`.
Chips: `border-radius: 20px`. Active: red bg, white text.
`filterProperties()` called via `useMemo`.

**TASK-013 — PropertyGrid (client)**
```tsx
'use client'
// Receives raw properties, manages filter state, renders FilterBar + grid
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
const filtered = useMemo(() => filterProperties(properties, bhk, budget, type, possession, furnished), [...deps])
// View toggle: Grid icon / List icon (Lucide)
// Result count: "{filtered.length} Properties Found"
// ARIA live: aria-live="polite" for result count
```

**TASK-014 — FeaturedProjects, TrustBar, CityLinks, Footer** (server components)

**TASK-015 — Framer Motion**
```tsx
<motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
```

**TASK-016 — QA pass**
```bash
tsc --noEmit; npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"  # must be empty
grep -r "Contact Owner" src/components --include="*.tsx"      # must be empty — CTA is dynamic
```

---

## 6 — Grok

**VeriProperty — MagicBricks pattern**

**Unit 1: formatPrice — Indian real estate convention**
```typescript
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100_000) {
    const l = amount / 100_000
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`
  }
  return `₹${amount.toLocaleString('en-IN')}/mo`  // rent prices shown as /mo
}
// Tests:
// formatPrice(12_000_000) → "₹1.20 Cr"
// formatPrice(35_000_000) → "₹3.50 Cr"
// formatPrice(8_500_000)  → "₹85 L"
// formatPrice(9_500_000)  → "₹95 L"
// formatPrice(28_000)     → "₹28,000/mo"
```

**Unit 2: filterProperties — multi-dimension filter**
```typescript
export function filterProperties(
  props: Property[],
  bhk: BHKType[],
  possession: PossessionStatus | '',
  propertyType: PropertyType | '',
  furnished: FurnishingStatus | '',
): Property[] {
  return props.filter(p => {
    if (bhk.length > 0 && !bhk.includes(p.bhk)) return false
    if (possession && p.possessionStatus !== possession) return false
    if (propertyType && p.propertyType !== propertyType) return false
    if (furnished && p.furnishingStatus !== furnished) return false
    return true
  })
}
```

**Unit 3: HeroSearchWidget mode-dependent fields**
```tsx
// CORRECT — conditional JSX renders/unmounts fields
{(mode === 'buy' || mode === 'rent') && (
  <BHKSelector value={bhk} onChange={setBhk} />
)}
{mode === 'pg' && (
  <PreferredBySelector value={preferredBy} onChange={setPreferredBy} />
)}

// WRONG — CSS visibility/display manipulation
<BHKSelector style={{ display: mode === 'buy' ? 'block' : 'none' }} />
// Screen readers still encounter hidden elements. Unmount them instead.
```

**Unit 4: PropertyCard CTA — dynamic source text**
```tsx
// CORRECT — derived from data, never hardcoded
<Button variant="outlineRed">Contact {property.listingSource}</Button>

// WRONG — hardcoded assumption
<Button variant="outlineRed">Contact Owner</Button>
// Breaks for Builder and Agent listings. All 8 mock properties have different sources.
```

**Unit 5: VerifiedBadge contrast pattern**
```tsx
// CORRECT — green TEXT on white CARD bg
// #1A7A3A on #FFFFFF = 7.78:1 ✓✓ AAA
<span className={styles.verified}>
  <CheckCircle size={12} />Verified
</span>
// .verified { color: var(--color-green); }  ← green text, white card bg

// WRONG — white text on green bg
// #FFFFFF on #1A7A3A = 7.78:1 ✓ — actually this passes! But green bg badge is visually distracting
// The convention for property portals: green text on white, not colored badge
```

**Contrast table:**
| Combination | Ratio | Pass? | Usage |
|------------|-------|-------|-------|
| White on red `#E03228` | 4.51:1 | ✓ AA | Primary buttons, "Post Property Free" |
| Red `#E03228` on white | 4.51:1 | ✓ AA | Prices, outlineRed button text |
| Red on surface `#F4F5F7` | ~4.3:1 | ⚠ borderline | Avoid small red text on surface |
| Text `#2D2D2D` on white | ~12:1 | ✓✓ | Card headings, body |
| Muted `#717171` on white | ~4.7:1 | ✓ AA | Metadata, sqft, floor |
| Green `#1A7A3A` on white | ~7.8:1 | ✓✓ | Verified, RERA badge text |
| White on dark `#1A1A1A` | ~16:1 | ✓✓ | Footer text |

---

## 7 — Gemini

**Project:** VeriProperty — MagicBricks-pattern Indian property portal
**Stack:** Next.js 14 App Router · TypeScript strict · CSS Modules · No Tailwind · Static export

### Context

Indian property portals differ from Western real estate sites in four ways:
1. **Price convention:** Properties are priced in lakhs (L) and crores (Cr) — `₹45 L` means ₹45,00,000; `₹1.2 Cr` means ₹1,20,00,000. A `formatPrice()` utility is mandatory.
2. **RERA registration:** India's Real Estate Regulatory Authority registration is a legal requirement — displayed as a trust badge on listings.
3. **Mode-first search:** The search widget has 5 modes (Buy/Rent/PG/Commercial/Plots), each surfacing different form fields. PG (Paying Guest) is a major residential category in India.
4. **Listing source:** Properties are listed by Owners, Builders, or Agents. The contact CTA text must derive from `listingSource` — never hardcoded.

### Color palette (8 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-red` | `#E03228` | Brand accent — logo, tabs, buttons, prices, active states |
| `--color-white` | `#FFFFFF` | Default bg, card bg, nav bg, button text on red |
| `--color-surface` | `#F4F5F7` | Alternating sections, filter chip bg, input bg |
| `--color-text` | `#2D2D2D` | Headings, property titles, primary body |
| `--color-muted` | `#717171` | Area, floor, posted date, secondary labels |
| `--color-border` | `#E0E0E0` | Card borders, input borders, nav border-bottom |
| `--color-green` | `#1A7A3A` | Verified badge text/icon, RERA badge, success |
| `--color-dark` | `#1A1A1A` | Footer bg, footer headings |

### Typography

Poppins via `next/font/google`. Weights: `['400', '500', '600']`.

### Mode-dependent search widget state machine

```typescript
type SearchMode = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot'

// State in HeroSearchWidget:
const [mode, setMode] = useState<SearchMode>('buy')

// Fields rendered per mode:
// buy/rent: city + locality + propertyType + bhk multi-select + budget range
// pg:       city + locality + preferredBy (Boys/Girls/Any)
// commercial: city + locality + commercialType (Office/Shop/Warehouse)
// plot:     city + locality + plotArea range
```

### Radius system

| Element | Radius |
|---------|--------|
| HeroSearchWidget card | `12px` |
| Property cards | `8px` |
| Filter chips | `20px` |
| All buttons | `4px` |
| All badges (Verified, RERA, Source) | `4px` |
| Property image top corners | `8px 8px 0 0` |

### Component client/server split

| Component | Type | Reason |
|-----------|------|--------|
| SiteNav | Server | No scroll listener |
| HeroSearchWidget | Client | 5-mode state + form fields + submit |
| FilterBar | Client | Multi-chip filter state + useMemo |
| PropertyGrid | Client | View toggle state + filtered results |
| PropertyCard | Server | Receives `property` prop, no state |
| VerifiedBadge | Server | Static conditional render |
| ReraBadge | Server | Static conditional render |
| FeaturedProjects | Server | Static project cards |
| TrustBar | Server | Static trust data |
| CityLinks | Server | Static city grid |
| Footer | Server | Static links |

---

## 8 — Cursor

**VeriProperty — MagicBricks-pattern Indian Property Portal**

Scaffold:
```bash
npx create-next-app@latest veriproperty --typescript --no-tailwind --app --src-dir --import-alias "@/*"
npm install framer-motion lucide-react
```

**Architecture notes for Cursor AI:**

This build has **four novel patterns** vs clinic builds:

**Pattern 1 — Mode-dependent search widget**
The hero search widget is the product centrepiece. It has 5 mode tabs. Each mode renders DIFFERENT form fields via conditional JSX (not CSS display toggle):
```tsx
const [mode, setMode] = useState<SearchMode>('buy')
// Fields unmount/mount on mode change — not hidden/shown
{(mode === 'buy' || mode === 'rent') && <BHKSelector />}
{mode === 'pg' && <PreferredBySelector />}
{mode === 'commercial' && <CommercialTypeSelector />}
{mode === 'plot' && <PlotAreaSelector />}
```

**Pattern 2 — Indian price formatting**
Never display raw INR numbers. Use `formatPrice()`:
- ≥ 1 crore (₹1,00,00,000) → `₹X.XX Cr`
- ≥ 1 lakh (₹1,00,000) → `₹X L`
- < 1 lakh (rent, etc.) → `₹X,XXX/mo`

**Pattern 3 — Dynamic CTA from `listingSource`**
```tsx
// This is the CTA on every PropertyCard:
<Button variant="outlineRed">Contact {property.listingSource}</Button>
// listingSource is 'Owner' | 'Builder' | 'Agent'
// Never hardcode "Contact Owner"
```

**Pattern 4 — Verified/RERA as text badges, not colored bg badges**
Indian property portals use green TEXT + icon on white card, not white-on-green button-style badges. The pattern:
```tsx
// VerifiedBadge.tsx — green text on white card
<span className={styles.verified}>
  <CheckCircle size={12} /> Verified
</span>
// .verified { color: var(--color-green); } ← green text, white bg
```

**Key constraints:**
- Poppins 400+500+600 (distinct from Inter/Roboto/Lato/Nunito Sans)
- `border-radius: 12px` on SearchWidget
- `border-radius: 8px` on PropertyCards
- `border-radius: 20px` on FilterBar chips ONLY
- `border-radius: 4px` on all buttons and badges
- SearchWidget shadow: `0 4px 24px rgba(0,0,0,0.12)` — hero prominence
- PropertyCard shadow: `0 2px 8px rgba(0,0,0,0.08)` — subtle
- `formatPrice()` called on EVERY price display — no exceptions
- `Contact ${property.listingSource}` — never hardcoded CTA text
- Verified/RERA: green text on white — not white on green
- No doctor/package/diagnostic entities — `Property` is the core type
- `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`

**File tree:**
```
src/app/layout.tsx (Poppins, globals)
src/app/globals.css (8 tokens)
src/app/page.tsx
src/types/index.ts (SearchMode, BHKType, PropertyType, ListingSource, Property, etc.)
src/lib/data.ts (8 properties)
src/lib/formatPrice.ts
src/lib/filterProperties.ts
src/components/layout/SiteNav.tsx + .module.css
src/components/layout/Footer.tsx + .module.css
src/components/home/HeroSearchWidget.tsx + .module.css  ← 'use client'
src/components/home/FilterBar.tsx + .module.css          ← 'use client'
src/components/home/PropertyGrid.tsx + .module.css       ← 'use client'
src/components/home/PropertyCard.tsx + .module.css       ← server
src/components/home/FeaturedProjects.tsx + .module.css
src/components/home/TrustBar.tsx + .module.css
src/components/home/CityLinks.tsx + .module.css
src/components/ui/Button.tsx + .module.css
src/components/ui/VerifiedBadge.tsx + .module.css
src/components/ui/ReraBadge.tsx + .module.css
src/components/ui/ListingSourcePill.tsx + .module.css
next.config.ts
```
