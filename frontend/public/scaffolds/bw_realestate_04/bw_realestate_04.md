# bw_realestate_04
## Modern Indian Rental Discovery · NoBroker pattern
### Inspiration: nobroker.in — Zero-brokerage rental platform, direct owner contact

---

## Base Prompt

**Role:** Senior product designer specialising in Indian rental platform UX, zero-brokerage positioning, and direct owner-tenant connection flows.

**Application Overview:** ZeroLet is a zero-brokerage Indian rental discovery platform built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). It follows the NoBroker pattern — rental-only listings, owner-direct contact, and a core value proposition of saving users 2 months' brokerage. Font: Plus Jakarta Sans 400/500/600 via `next/font/google`. No Tailwind, no weight 700.

**Brand Voice & Mood:** Empowering and direct — purple `#6C3CE1` signals a modern challenger brand disrupting traditional brokerage. Green `#15803D` is exclusively for zero-brokerage messaging, savings amounts, and owner verification signals. The surface palette uses a subtle purple tint (`#F8F7FF`, `#1A1033`, `#E2E0F0`) throughout to reinforce the brand even in neutral areas.

**Core Features:**
1. **SiteNav** — purple logo, "Zero Brokerage" tag pill in nav, "List Property Free" CTA
2. **HeroSection** — white bg with purple accents, city+locality search, `BrokerSavingsWidget` (interactive rent input → live savings display)
3. **BrokerSavingsStrip** — full-width purple bg strip: "₹4,200 Crore+ saved by our users"
4. **RentalFilterBar** (`'use client'`) — 5-dimension filter: BHK (multi-select chips) + Furnishing (single-select) + Max Rent (select) + Pet-Friendly (toggle chip) + Tenant Preference. `useMemo` wraps `filterRentals`. ARIA live region for count.
5. **RentalPropertyGrid** — 3-column grid of `RentalPropertyCard` (monthlyRent + deposit + `OwnerProfileSnippet` + `ZeroBrokerageBadge`)
6. **HowItWorks** — 3-step explainer: Post Property Free / Connect Directly / Move In Zero Brokerage
7. **CityLinks** — 8 Indian cities
8. **TrustBar** — dark bg, 4 trust stats
9. **Footer** — dark bg

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-purple: #6C3CE1`, `--color-white: #FFFFFF`, `--color-surface: #F8F7FF`, `--color-text: #1A1033`, `--color-muted: #64748B`, `--color-border: #E2E0F0`, `--color-green: #15803D`, `--color-dark: #0F0A1E`
- **Zero hex values in `.module.css`** — CSS custom properties only; exception: `rgba()` in `box-shadow` and card hover shadows
- **Contrast:** White on purple `#6C3CE1` = 6.23:1 ✓ AA. Green on white = 5.03:1 ✓ AA. Green on surface `#F8F7FF` ≈ 4.9:1 ✓.
- **Border-radius:** `8px` cards, `6px` buttons, `20px` filter chips, `4px` badges, `50px` BrokerSavingsWidget input (pill), no `border-radius: 50%`
- **ZeroBrokerageBadge:** `color: var(--color-green); border: 1px solid var(--color-green)` — on every rental card
- **OwnerVerifiedBadge:** green text, no border (distinct from ZeroBrokerageBadge)
- **PetFriendlyBadge:** purple text + PawPrint icon

**Structure:**
```
src/
  app/
    globals.css          # 8 CSS tokens (purple brand) + Plus Jakarta Sans import
    page.tsx             # Server Component
    layout.tsx
  components/
    layout/SiteNav/ Footer/
    home/
      HeroSection/
      BrokerSavingsWidget/   # 'use client' — rent input, live savings
      BrokerSavingsStrip/    # purple full-width strip
      OwnerProfileSnippet/
      RentalPropertyCard/    # monthlyRent + deposit + badges + owner
      RentalPropertyGrid/    # 'use client', useMemo
      RentalFilterBar/       # 'use client', 5 filter dims
      HowItWorks/            # 3-step explainer
      CityLinks/ TrustBar/
    ui/
      Button/                # purple primary, outlinePurple
      ZeroBrokerageBadge/    # green text + border
      OwnerVerifiedBadge/    # green text, no border
      PetFriendlyBadge/      # purple text, PawPrint icon
  lib/
    formatPrice.ts
    calculateBrokerSavings.ts
    filterRentals.ts
    data.ts              # 8 RentalProperty (all Owner, all rent), trustStats, cityLinks
  types/
    index.ts             # TenantPreference, RentalPropertyType, OwnerProfile, RentalProperty, RentalFilterState
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `calculateBrokerSavings(monthlyRent: number): number` → `monthlyRent * 2` (2 months industry-standard brokerage)
- `filterRentals(properties, filters)` — 5-dimension filter: BHK (multi-select array), furnishing (single-select), maxRent (number | null — null = no cap), petFriendly (boolean | null — null = any), tenantPreference (single-select)
- `formatPrice(n)` for ALL monthly rent displays → produces `/mo` suffix for amounts < ₹1L
- `deposit` displayed as `` ₹${property.deposit.toLocaleString('en-IN')} `` — NOT via `formatPrice()` (deposit has no `/mo` suffix)
- `TenantPreference = 'Family' | 'Bachelor' | 'Any'`
- All 8 mock properties must have `mode: 'rent'` and `listingSource: 'Owner'`

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define types in `src/types/index.ts` — `TenantPreference`, `RentalPropertyType`, `OwnerProfile`, `RentalProperty`, `RentalFilterState`
3. Write `globals.css` with 8 purple-brand CSS tokens + Plus Jakarta Sans import (no weight 700)
4. Create 8 mock `RentalProperty` entries — all `mode: 'rent'`, all `listingSource: 'Owner'`, rent range ₹12K–₹65K/mo
5. Implement `calculateBrokerSavings`, `filterRentals`, `formatPrice` utilities
6. Build UI atoms: `Button`, `ZeroBrokerageBadge`, `OwnerVerifiedBadge`, `PetFriendlyBadge`
7. Build `BrokerSavingsWidget` (`'use client'`) — rent input, live savings, `aria-live="polite"` on result
8. Build `BrokerSavingsStrip` — purple full-width, white text
9. Build `RentalPropertyCard` with correct price/deposit display pattern
10. Build `RentalFilterBar` with 5-dimension filter state and `useMemo`
11. Verify QA greps (no mode:buy, no Contact Agent/Builder, no 50% radius, no hex in modules), then build

**User Experience:**
- Hero + BrokerSavingsWidget immediately quantifies the savings promise — converts skeptics
- BrokerSavingsStrip social proof ("₹4,200 Crore+ saved") below the fold reinforces trust
- Rental filter has pet-friendly and tenant preference dimensions not found in buy portals — tailored to rental use case
- Every card shows OwnerProfile + response time — transparency builds direct contact confidence
- No RERA, no EMI calculator, no investment metrics — clean rental-specific UX

**Constraints:**
- All 8 mock properties: `mode: 'rent'` — NEVER `mode: 'buy'`
- All 8 mock properties: `listingSource: 'Owner'` — NEVER 'Agent' or 'Builder'
- CTA: always "Contact Owner" — hardcoded is acceptable since listingSource is always Owner (exception to the dynamic CTA rule used in bw_realestate_01–03)
- `monthlyRent` ALWAYS via `formatPrice()` — produces `₹X,XXX/mo`
- `deposit` ALWAYS via `toLocaleString('en-IN')` with ₹ prefix — NEVER via `formatPrice()`
- `calculateBrokerSavings(rent)` = `rent * 2` — never a hardcoded lookup table
- No RERA badge, no EMI calculator, no rental yield or capital appreciation metrics
- No `border-radius: 50%` anywhere
- No font weight 700 — max is 600
- No hex values in `.module.css` (except `rgba()` in shadows)
- `page.tsx` must be a Server Component — no `'use client'` on the page file

---

## Platform Versions

---

### 1 — Lovable

Build **ZeroLet** — a zero-brokerage Indian rental discovery platform — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Font: Plus Jakarta Sans 400/500/600 via `next/font/google`. No weight 700.

**Brand: Purple `#6C3CE1`.** Token system in `globals.css`:
```css
--color-purple:  #6C3CE1;  /* brand — white on purple = 6.23:1 ✓ */
--color-white:   #FFFFFF;
--color-surface: #F8F7FF;  /* very light purple tint */
--color-text:    #1A1033;  /* near-black, purple undertone */
--color-muted:   #64748B;
--color-border:  #E2E0F0;  /* purple-tinted border */
--color-green:   #15803D;  /* zero brokerage, savings — 5.03:1 ✓ */
--color-dark:    #0F0A1E;  /* footer */
```

Zero hex in `.module.css`. White on purple = 6.23:1 ✓ AA. Green on white = 5.03:1 ✓ AA.

**This build is fundamentally different from bw_realestate_01–03:**
- **Rental-only:** all 8 mock properties are `mode: 'rent'`; prices are monthly rent (all < ₹1 L) — `formatPrice(25000)` → `₹25,000/mo`
- **Owner-only:** all `listingSource: 'Owner'` — no Agent, no Builder ever appears
- **Zero Brokerage positioning:** `ZeroBrokerageBadge` (green) on every card, `BrokerSavingsStrip`, `BrokerSavingsWidget`
- **Deposit display:** every card shows `monthlyRent` + `deposit` separately
- **OwnerProfile** on every card: name, verified status, response time
- **Tenant preferences:** `TenantPreference = 'Family' | 'Bachelor' | 'Any'`

**New types unique to this build:**
```typescript
export type TenantPreference = 'Family' | 'Bachelor' | 'Any'
export type AvailabilityStatus = 'Immediately' | string  // 'Immediately' or 'Jun 2025'
export type RentalPropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'PG'

export interface OwnerProfile {
  name: string
  verified: boolean
  responseTime: string         // 'Usually replies in 1 hour'
  propertiesListed: number
}

export interface RentalProperty {
  id: string; title: string; bhk: BHKType; propertyType: RentalPropertyType
  monthlyRent: number          // always < 100,000 — formatPrice() → '₹X,XXX/mo'
  deposit: number              // security deposit in INR
  superArea: number; carpetArea: number; floor: string
  locality: string; city: string
  verified: boolean            // OwnerVerifiedBadge (green)
  availableFrom: AvailabilityStatus
  furnishingStatus: FurnishingStatus
  tenantPreference: TenantPreference
  petFriendly: boolean
  photos: number; postedDaysAgo: number
  amenities: string[]
  owner: OwnerProfile
}
```

**New utility:**
```typescript
// calculateBrokerSavings.ts
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2  // industry standard: 2 months brokerage
}
// calculateBrokerSavings(25000) → 50000
// Display: `₹${savings.toLocaleString('en-IN')}` (not formatPrice — no /mo suffix)
```

**Filter (different from bw_01's 4-dim filter):**
```typescript
export interface RentalFilterState {
  bhk: BHKType[]
  furnishing: FurnishingStatus | ''
  maxRent: number | null       // null = no limit
  petFriendly: boolean | null  // null = any
  tenantPreference: TenantPreference | ''
}
```

**Page sections:**
1. **SiteNav** — purple logo, "Zero Brokerage" tag pill in nav, "List Property Free" CTA
2. **HeroSection** — white bg, purple accents, city+search, `BrokerSavingsWidget` (interactive)
3. **BrokerSavingsStrip** — full-width purple bg strip: "₹4,200 Crore+ saved by our users"
4. **RentalFilterBar** — BHK chips + Furnishing single-select + Pet-Friendly toggle + Tenant Preference
5. **RentalPropertyGrid** — 3-column grid of `RentalPropertyCard` (with OwnerProfile + ZeroBrokerageBadge + deposit)
6. **HowItWorks** — 3-step explainer (Post Property / Connect Directly / Move In)
7. **CityLinks** — 8 Indian cities
8. **TrustBar** — dark bg, 4 stats
9. **Footer** — dark bg

**`BrokerSavingsWidget`** — `'use client'`:
```tsx
const [rent, setRent] = useState(25_000)
const savings = calculateBrokerSavings(rent)
// Shows: "Your expected rent → Savings with ZeroLet: ₹50,000"
```

**`ZeroBrokerageBadge`** — green text + border:
```css
.badge { color: var(--color-green); border: 1px solid var(--color-green); border-radius: 4px; padding: 1px 8px; }
/* green on white = 5.03:1 ✓ */
```

**Anti-patterns:**
- Never `listingSource: 'Agent'` or `'Builder'` — Owner only
- Never `mode: 'buy'` — rent only
- Never `Contact Builder` or `Contact Agent` — always `Contact Owner`
- No RERA badge (rental platform)
- No investment metrics (yield, appreciation)
- No EMI calculator
- `monthlyRent` always via `formatPrice()` → shows `/mo` suffix
- Never display `property.deposit` raw — use `toLocaleString('en-IN')` with ₹ prefix

**Border-radius:** `8px` cards, `6px` buttons, `20px` filter chips (same as bw_01), `4px` badges, `50px` `BrokerSavingsWidget` input pill, no `border-radius: 50%`.

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **ZeroLet** — zero-brokerage Indian rental platform — Next.js 14, TypeScript strict, CSS Modules. Static export.

```bash
npx create-next-app@latest zerolet --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Tokens:**
```css
:root {
  --color-purple:  #6C3CE1;
  --color-white:   #FFFFFF;
  --color-surface: #F8F7FF;
  --color-text:    #1A1033;
  --color-muted:   #64748B;
  --color-border:  #E2E0F0;
  --color-green:   #15803D;
  --color-dark:    #0F0A1E;
}
```

Font: Plus Jakarta Sans 400/500/600. No Poppins, no DM Sans. Zero hex in `.module.css`.

**Contrast:** White on purple = 6.23:1 ✓. Green on white = 5.03:1 ✓.

**New types** (unique to this build — all previous builds used `Property` or `PremiumProperty`):
- `TenantPreference = 'Family' | 'Bachelor' | 'Any'`
- `RentalProperty` — has `monthlyRent`, `deposit`, `owner: OwnerProfile`, `tenantPreference`, `petFriendly`, `availableFrom`
- `OwnerProfile { name, verified, responseTime, propertiesListed }`
- `RentalFilterState { bhk: BHKType[], furnishing, maxRent, petFriendly, tenantPreference }`

**New utility:** `calculateBrokerSavings(monthlyRent: number): number` → `monthlyRent * 2`

**8 mock `RentalProperty` entries** — all `listingSource: 'Owner'`, all `mode: 'rent'`:
- prop-r01: 2 BHK, Koramangala Bangalore, ₹28,000/mo, deposit ₹56,000, Furnished, Family
- prop-r02: 1 BHK, HSR Layout Bangalore, ₹15,000/mo, deposit ₹30,000, Semi-Furnished, Bachelor
- prop-r03: 3 BHK, Bandra Mumbai, ₹65,000/mo, deposit ₹1,30,000, Furnished, Family
- prop-r04: 2 BHK, Kondapur Hyderabad, ₹18,000/mo, deposit ₹36,000, Unfurnished, Any, petFriendly
- prop-r05: 1 BHK, Viman Nagar Pune, ₹12,000/mo, deposit ₹24,000, Semi-Furnished, Bachelor
- prop-r06: 3 BHK, Whitefield Bangalore, ₹32,000/mo, deposit ₹64,000, Furnished, Family
- prop-r07: 2 BHK, Sector 62 Noida, ₹16,000/mo, deposit ₹32,000, Semi-Furnished, Any
- prop-r08: Studio, Powai Mumbai, ₹22,000/mo, deposit ₹44,000, Furnished, Bachelor, petFriendly

**`filterRentals` function:**
```typescript
export function filterRentals(
  properties: RentalProperty[],
  filters: RentalFilterState
): RentalProperty[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.furnishing && p.furnishingStatus !== filters.furnishing) return false
    if (filters.maxRent !== null && p.monthlyRent > filters.maxRent) return false
    if (filters.petFriendly !== null && p.petFriendly !== filters.petFriendly) return false
    if (filters.tenantPreference && p.tenantPreference !== filters.tenantPreference) return false
    return true
  })
}
```

**Key components:**
- `BrokerSavingsWidget` — `'use client'`, rent input, live savings calculation
- `BrokerSavingsStrip` — purple bg, white text, full-width
- `ZeroBrokerageBadge` — green text + border, on every card
- `OwnerVerifiedBadge` — green text (different from previous builds' VerifiedBadge — this is owner-specific)
- `OwnerProfileSnippet` — name + verified + response time, at bottom of each card
- `PetFriendlyBadge` — small badge for pet-friendly listings
- `RentalPropertyCard` — includes all above + deposit display

---

### 3 — Bolt

Build **ZeroLet** — zero-brokerage rental platform. Next.js 14, TypeScript strict, CSS Modules, no Tailwind. Static export.

```bash
npx create-next-app@latest zerolet --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**8 tokens:** `--color-purple: #6C3CE1` · `--color-white` · `--color-surface: #F8F7FF` · `--color-text: #1A1033` · `--color-muted: #64748B` · `--color-border: #E2E0F0` · `--color-green: #15803D` · `--color-dark: #0F0A1E`

Font: Plus Jakarta Sans 400/500/600. No weight 700. Zero hex in `.module.css`.

**File structure:**
```
src/
  types/index.ts             — RentalProperty, OwnerProfile, RentalFilterState, TenantPreference + unions
  lib/
    data.ts                  — 8 RentalProperty, trustStats, cityLinks
    formatPrice.ts           — unchanged — formatPrice(25000) → '₹25,000/mo'
    calculateBrokerSavings.ts — monthlyRent * 2
    filterRentals.ts         — 5-dimension filter
  components/
    layout/SiteNav.tsx + .module.css     — 'use client', purple logo, "Zero Brokerage" pill
    layout/Footer.tsx + .module.css
    home/
      HeroSection.tsx + .module.css
      BrokerSavingsWidget.tsx + .module.css   — 'use client'
      BrokerSavingsStrip.tsx + .module.css    — purple bg, white text
      RentalFilterBar.tsx + .module.css       — 'use client', 5 filter dims
      RentalPropertyCard.tsx + .module.css
      RentalPropertyGrid.tsx + .module.css    — 'use client', useMemo
      OwnerProfileSnippet.tsx + .module.css
      HowItWorks.tsx + .module.css
      CityLinks.tsx + .module.css
      TrustBar.tsx + .module.css
    ui/
      Button.tsx + .module.css
      ZeroBrokerageBadge.tsx + .module.css    — green text + border
      OwnerVerifiedBadge.tsx + .module.css    — green text, no border
      PetFriendlyBadge.tsx + .module.css      — purple text + paw icon
  app/globals.css, layout.tsx, page.tsx
```

**Critical rules:**
1. `listingSource: 'Owner'` on all 8 properties — no Agent, no Builder
2. `mode: 'rent'` on all 8 properties
3. `monthlyRent` always via `formatPrice()` — produces `₹X,XXX/mo` for amounts < ₹1L
4. `deposit` displayed as `₹${property.deposit.toLocaleString('en-IN')}` — raw format (not /mo)
5. CTA: always "Contact Owner" — hardcoded once since listingSource is always Owner. Exception to the dynamic CTA rule.
6. `calculateBrokerSavings(rent)` = `rent * 2`
7. `useMemo` wraps `filterRentals`
8. ARIA live region for filtered count
9. No RERA badge, no EMI calculator, no investment metrics

**QA checks:**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"  # empty
grep -r "Contact Agent\|Contact Builder" src/components          # empty
grep -r "border-radius: 50%" src --include="*.module.css"       # empty
grep -r "font-weight: 700" src --include="*.module.css"         # empty
grep -r "mode.*buy\|'buy'" src/lib/data.ts                      # empty
```

---

### 4 — v0

Design **ZeroLet** component CSS system — zero-brokerage rental platform. Next.js 14, TypeScript, CSS Modules, no Tailwind.

**Tokens:** `--color-purple: #6C3CE1` + 7 others. Plus Jakarta Sans 400/500/600. Zero hex in modules.

**RentalPropertyCard.module.css:**
```css
.card {
  background: var(--color-white); border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 4px 20px rgba(108,60,225,0.12); }
/* hover shadow uses rgba — not a token, acceptable */
.imageBlock { position: relative; aspect-ratio: 16/9; background: var(--color-surface); }
.possessionBadge {
  position: absolute; top: 8px; left: 8px;
  background: var(--color-purple); color: var(--color-white);
  font-size: 0.6875rem; font-weight: 700; padding: 3px 8px; border-radius: 4px;
}
/* white on purple = 6.23:1 ✓ */
.content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.badgeRow { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.title { font-size: 1rem; font-weight: 600; color: var(--color-text); line-height: 1.4; }
.rentRow { display: flex; align-items: baseline; gap: 12px; }
.rent { font-size: 1.375rem; font-weight: 600; color: var(--color-purple); }
/* purple on white = 6.23:1 ✓ */
.deposit { font-size: 0.8125rem; color: var(--color-muted); }
.ownerStrip {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; margin: 0 -16px;
  background: var(--color-surface); border-top: 1px solid var(--color-border);
}
.ownerName { font-size: 0.8125rem; font-weight: 600; color: var(--color-text); }
.responseTime { font-size: 0.75rem; color: var(--color-muted); }
```

**ZeroBrokerageBadge.module.css:**
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green); border: 1px solid var(--color-green);
  font-size: 0.6875rem; font-weight: 700; padding: 1px 8px; border-radius: 4px;
  letter-spacing: 0.02em;
}
/* green on white = 5.03:1 ✓ */
```

**BrokerSavingsStrip.module.css:**
```css
.strip {
  background: var(--color-purple);
  padding: 16px 24px; text-align: center;
}
.text { color: var(--color-white); font-size: 1.125rem; font-weight: 600; }
/* white on purple = 6.23:1 ✓ */
.highlight { color: rgba(255,255,255,0.9); font-weight: 400; }
```

**BrokerSavingsWidget.module.css:**
```css
.widget {
  background: var(--color-surface); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 20px 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.label { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
.inputRow { display: flex; align-items: center; gap: 0; }
.currencyPrefix {
  padding: 10px 12px; background: var(--color-border);
  border: 1.5px solid var(--color-border); border-right: none;
  border-radius: 6px 0 0 6px; font-size: 0.9375rem; color: var(--color-muted);
}
.input {
  flex: 1; padding: 10px 14px;
  border: 1.5px solid var(--color-border); border-radius: 0 6px 6px 0;
  font-size: 0.9375rem; color: var(--color-text); outline: none;
}
.input:focus { border-color: var(--color-purple); }
.savings { font-size: 1.25rem; font-weight: 600; color: var(--color-green); }
/* green on surface #F8F7FF: ~4.9:1 ✓ */
```

**RentalFilterBar.module.css:**
```css
.bar {
  background: var(--color-white); border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
  box-shadow: 0 2px 4px rgba(0,0,0,0.06);
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 12px 24px;
  display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
}
.chip {
  white-space: nowrap; border: 1.5px solid var(--color-border);
  border-radius: 20px; padding: 6px 16px; font-size: 0.875rem; font-weight: 500;
  font-family: var(--font-sans); cursor: pointer; transition: all 0.15s;
  background: var(--color-white); color: var(--color-text); flex-shrink: 0;
}
.chip:hover { border-color: var(--color-purple); color: var(--color-purple); }
.chipActive { background: var(--color-purple); color: var(--color-white); border-color: var(--color-purple); }
/* white on purple = 6.23:1 ✓ */
.petToggle { display: flex; align-items: center; gap: 6px; }
```

**Button:** `background: var(--color-purple); color: var(--color-white)` — 6.23:1 ✓. Outline: `color: var(--color-purple); border: 1.5px solid var(--color-purple)`.

---

### 5 — Claude Artifacts

Build **ZeroLet** — production-quality zero-brokerage Indian rental platform — Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Plus Jakarta Sans 400/500/600.

**Four defining constraints for this build:**

**Constraint 1 — Owner-only, rent-only data:**
All 8 mock `RentalProperty` entries must have `listingSource` field absent (or: since Owner is the only source, the type can omit it — but keep for consistency). All have `mode: 'rent'`. All `monthlyRent < 100_000`. `formatPrice()` then always produces the `/mo` format.
```typescript
// Verification:
properties.every(p => p.mode === 'rent')  // true
// formatPrice(28000) → '₹28,000/mo'  ← correct rental display
```

**Constraint 2 — Deposit display is not formatPrice():**
`monthlyRent` → `formatPrice(property.monthlyRent)` → `₹28,000/mo`
`deposit` → `₹${property.deposit.toLocaleString('en-IN')}` → `₹56,000` (no /mo suffix)
Never mix these up. Deposit is a one-time payment, not monthly.

**Constraint 3 — calculateBrokerSavings must use the formula, not a lookup:**
```typescript
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2  // 2 months industry-standard brokerage
}
```
`BrokerSavingsWidget` calls this live as user types rent amount.

**Constraint 4 — RentalFilterState has 5 dimensions including two new types:**
```typescript
export interface RentalFilterState {
  bhk: BHKType[]                    // multi-select (same as bw_01)
  furnishing: FurnishingStatus | ''  // single-select
  maxRent: number | null             // null = no cap, e.g. 25000 = max ₹25K/mo
  petFriendly: boolean | null        // null = any, true = pet-friendly only
  tenantPreference: TenantPreference | ''  // single-select
}

export function filterRentals(
  properties: RentalProperty[],
  filters: RentalFilterState
): RentalProperty[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.furnishing && p.furnishingStatus !== filters.furnishing) return false
    if (filters.maxRent !== null && p.monthlyRent > filters.maxRent) return false
    if (filters.petFriendly !== null && p.petFriendly !== filters.petFriendly) return false
    if (filters.tenantPreference && p.tenantPreference !== filters.tenantPreference) return false
    return true
  })
}
```

**Complete unique type system:**
```typescript
export type TenantPreference = 'Family' | 'Bachelor' | 'Any'
export type RentalPropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'PG'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'

export interface OwnerProfile {
  name: string; verified: boolean
  responseTime: string     // 'Usually replies in 1 hour'
  propertiesListed: number
}

export interface RentalProperty {
  id: string; title: string; bhk: BHKType; propertyType: RentalPropertyType
  monthlyRent: number      // formatPrice() → '₹X,XXX/mo'
  deposit: number          // toLocaleString → '₹X,XXX' (no /mo)
  superArea: number; carpetArea: number; floor: string
  locality: string; city: string
  verified: boolean; availableFrom: string
  furnishingStatus: FurnishingStatus; tenantPreference: TenantPreference
  petFriendly: boolean; photos: number; postedDaysAgo: number
  amenities: string[]; owner: OwnerProfile
}
```

**All QA checks:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"   # empty
grep -r "mode.*buy\|'buy'" src/lib/data.ts                        # empty — rent only
grep -r "Contact Agent\|Contact Builder" src/components            # empty
grep -r "border-radius: 50%" src --include="*.module.css"         # empty
grep -r "font-weight: 700" src --include="*.module.css"           # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **ZeroLet** — zero-brokerage rental platform. Next.js 14, TypeScript strict, CSS Modules. Static export. Plus Jakarta Sans 400/500/600.

Generate in order:
1. `src/types/index.ts` — TenantPreference, RentalPropertyType, BHKType, FurnishingStatus, OwnerProfile, RentalProperty, RentalFilterState, TrustStat, CityLink
2. `src/lib/formatPrice.ts`
3. `src/lib/calculateBrokerSavings.ts` — `monthlyRent * 2`
4. `src/lib/filterRentals.ts`
5. `src/lib/data.ts` — 8 RentalProperty (all Owner, all rent), trustStats, cityLinks
6. `src/app/globals.css` — 8 tokens (purple brand), .sr-only, prefers-reduced-motion
7. `src/app/layout.tsx` — Plus_Jakarta_Sans from next/font/google, weights ['400','500','600']
8. `src/components/ui/Button.tsx + .module.css` — purple primary, outlinePurple
9. `src/components/ui/ZeroBrokerageBadge.tsx + .module.css` — green text + border
10. `src/components/ui/OwnerVerifiedBadge.tsx + .module.css` — green text, no border
11. `src/components/ui/PetFriendlyBadge.tsx + .module.css` — purple text, PawPrint icon
12. `src/components/layout/SiteNav.tsx + .module.css` — 'use client', purple logo, Zero Brokerage pill
13. `src/components/layout/Footer.tsx + .module.css`
14. `src/components/home/HeroSection.tsx + .module.css`
15. `src/components/home/BrokerSavingsWidget.tsx + .module.css` — 'use client'
16. `src/components/home/BrokerSavingsStrip.tsx + .module.css` — purple full-width
17. `src/components/home/OwnerProfileSnippet.tsx + .module.css`
18. `src/components/home/RentalPropertyCard.tsx + .module.css`
19. `src/components/home/RentalPropertyGrid.tsx + .module.css`
20. `src/components/home/RentalFilterBar.tsx + .module.css` — 'use client', useMemo
21. `src/components/home/HowItWorks.tsx + .module.css` — 3-step explainer
22. `src/components/home/CityLinks.tsx + .module.css`
23. `src/components/home/TrustBar.tsx + .module.css`
24. `src/app/page.tsx`

**Rules for every file:**
- No hex in `.module.css`; no `font-weight: 700`; no `border-radius: 50%`
- All monthly rents via `formatPrice()` → produces `/mo`
- Deposits via `₹${deposit.toLocaleString('en-IN')}`
- `calculateBrokerSavings(rent)` = `rent * 2` — not a hardcoded table
- No mode: 'buy', no listingSource: 'Agent'/'Builder' in data

---

### 7 — Gemini

**Project:** ZeroLet — zero-brokerage Indian rental discovery. Next.js 14 App Router, TypeScript strict, CSS Modules. Static export. Plus Jakarta Sans 400/500/600. Framer Motion.

**Design system:**
- `--color-purple: #6C3CE1` — brand; white text 6.23:1 ✓ AA
- `--color-green: #15803D` — savings, verified, zero brokerage; text on white 5.03:1 ✓ AA
- `--color-surface: #F8F7FF` — light purple-tinted surface
- `--color-text: #1A1033` — near-black with purple undertone
- `--color-border: #E2E0F0` — purple-tinted border

**Architecture — 5 layers:**

Layer 1 — Foundation: types, utilities (formatPrice, calculateBrokerSavings, filterRentals), mock data, globals.css, layout.tsx.

Layer 2 — UI Atoms: Button (purple primary/outlinePurple), ZeroBrokerageBadge (green text+border), OwnerVerifiedBadge (green text), PetFriendlyBadge (purple text, PawPrint icon).

Layer 3 — Layout: SiteNav (purple logo + "Zero Brokerage" pill in nav), Footer (dark bg).

Layer 4 — Hero + Savings:
- `HeroSection` — white bg, city+locality search, purple CTA
- `BrokerSavingsWidget` (`'use client'`) — rent input, live `calculateBrokerSavings()`, green result
- `BrokerSavingsStrip` — full-width purple bg, "₹4,200 Crore+ saved by our users", white text

Layer 5 — Filter + Grid + Support:
- `RentalFilterBar` (`'use client'`) — 5 filter dims: BHK (multi-select), Furnishing (single-select), Max Rent (select), Pet-Friendly (toggle chip), Tenant Preference (single-select). `useMemo` wraps `filterRentals`. ARIA live region.
- `RentalPropertyCard` — monthlyRent via `formatPrice()`, deposit via `toLocaleString`, ZeroBrokerageBadge, OwnerProfileSnippet at bottom, pet badge if `petFriendly`
- `HowItWorks` — 3 steps: "List Your Property Free" / "Renters Contact You Directly" / "Move In — Zero Brokerage". Purple numbered circles (no `border-radius: 50%` on decorative elements is for photos/avatars — step numbers may use it since they're purely decorative non-interactive elements)
- `CityLinks`, `TrustBar`

**Critical requirements:**
- `calculateBrokerSavings(25000)` → `50000`; display as `₹${50000..toLocaleString('en-IN')}` → `₹50,000`
- `formatPrice(28000)` → `₹28,000/mo` — rent display
- Deposit: `₹${property.deposit.toLocaleString('en-IN')}` — no `/mo` suffix
- All 8 mock properties: `mode: 'rent'`, no `mode: 'buy'`
- `filterRentals` with `maxRent: number | null` — null means no cap

**Framer Motion:**
- HeroSection: `opacity: 0, y: 24 → visible`
- BrokerSavingsStrip: `opacity: 0, x: 0, scale: 0.98 → visible`
- RentalPropertyCard: stagger 0.08s per card
- HowItWorks steps: stagger 0.15s
- All `viewport={{ once: true }}`

---

### 8 — Cursor

Build **ZeroLet** zero-brokerage rental platform. Next.js 14, TypeScript, CSS Modules. Static export.

**`next.config.ts`:** `output: 'export'`, `images: { unoptimized: true }`

**`src/app/layout.tsx`:**
```tsx
import { Plus_Jakarta_Sans } from 'next/font/google'
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-sans', display: 'swap',
})
// weight '700' must NOT appear
```

**`src/lib/calculateBrokerSavings.ts`:**
```typescript
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2
}
// calculateBrokerSavings(25000) → 50000
// Display: `₹${savings.toLocaleString('en-IN')}` → '₹50,000'
```

**`src/lib/filterRentals.ts`:**
```typescript
export function filterRentals(
  properties: RentalProperty[],
  filters: RentalFilterState
): RentalProperty[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.furnishing && p.furnishingStatus !== filters.furnishing) return false
    if (filters.maxRent !== null && p.monthlyRent > filters.maxRent) return false
    if (filters.petFriendly !== null && p.petFriendly !== filters.petFriendly) return false
    if (filters.tenantPreference && p.tenantPreference !== filters.tenantPreference) return false
    return true
  })
}
```

**`BrokerSavingsWidget.tsx`:**
```tsx
'use client'
import { useState } from 'react'
import { calculateBrokerSavings } from '@/lib/calculateBrokerSavings'
import styles from './BrokerSavingsWidget.module.css'

export default function BrokerSavingsWidget() {
  const [rent, setRent] = useState(25_000)
  const savings = calculateBrokerSavings(rent)
  return (
    <div className={styles.widget}>
      <p className={styles.label}>Your expected monthly rent</p>
      <div className={styles.inputRow}>
        <span className={styles.currencyPrefix}>₹</span>
        <input
          id="broker-rent"
          type="number" className={styles.input}
          value={rent} min={5000} step={1000}
          onChange={e => setRent(Math.max(0, Number(e.target.value)))}
          aria-label="Monthly rent amount"
        />
      </div>
      <p className={styles.savingsLabel}>You save with ZeroLet</p>
      <p className={styles.savings}>₹{savings.toLocaleString('en-IN')}</p>
      <p className={styles.savingsNote}>2 months brokerage — straight to your pocket</p>
    </div>
  )
}
```

**`RentalPropertyCard.tsx` (price + deposit pattern):**
```tsx
<div className={styles.rentRow}>
  <span className={styles.rent}>{formatPrice(property.monthlyRent)}</span>
  {/* formatPrice(28000) → '₹28,000/mo' ✓ */}
  <span className={styles.deposit}>
    Deposit: ₹{property.deposit.toLocaleString('en-IN')}
    {/* toLocaleString — NOT formatPrice — deposit has no /mo */}
  </span>
</div>
```

**Forbidden patterns:**
```bash
grep -r "mode.*buy\|'buy'" src/lib/data.ts         # empty — rent only
grep -r "Contact Agent\|Contact Builder" src        # empty
grep -r "border-radius: 50%" src/components --include="*.module.css"  # empty
grep -r "font-weight: 700" src --include="*.module.css"               # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"        # empty
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
