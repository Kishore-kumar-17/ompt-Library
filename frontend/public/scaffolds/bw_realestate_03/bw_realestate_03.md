# bw_realestate_03
## Indian Premium Property Portal · Square Yards pattern
### Inspiration: squareyards.com — Premium property portal with agent directory and investment metrics

---

## Base Prompt

**Role:** Senior product designer specialising in Indian premium property portal UX, investment-grade listing design, and real estate agent directory patterns.

**Application Overview:** SquareView is a premium Indian property portal homepage built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). It follows the Square Yards pattern — a premium two-colour brand system (teal + gold), investment metric display on every property card, agent directory, and single-dimension category filter. Font: DM Sans 400/500/600 via `next/font/google`. No Tailwind, no weight 700.

**Brand Voice & Mood:** Premium and investment-forward — teal `#0B6E77` signals authority and trust; gold `#C9941A` signals premium yield and high-value properties. The portal speaks to serious buyers and NRI investors, not casual browsers. Investment metrics (rental yield, capital appreciation) are first-class citizens on every property card.

**Core Features:**
1. **SiteNav** — sticky, teal logo, navigation, language selector, "Post Property Free" teal CTA button
2. **HeroSection** — dark teal gradient background (`linear-gradient(135deg, #0B6E77, #073B42)`), search input + city dropdown, tag cloud of popular localities — NOT a white-bg hero
3. **CategoryFilter** (`'use client'`) — single-dimension tab filter: All | Luxury | Ready to Move | New Launch | High Yield. `useMemo` wraps `filterByCategory`. ARIA live region for count. One chip active at a time — NOT multi-select.
4. **PropertyGrid** — 3-column grid of `PremiumPropertyCard`, each showing investment metrics (yield + appreciation)
5. **AgentDirectory** — 3 `AgentCard` components with rating stars, transaction count, specialization pills
6. **NewLaunches** — horizontal scroll of 3 new launch cards with launch date display
7. **Services** — 4 service tiles: Home Loans | Legal Services | Interior Design | NRI Services
8. **CityLinks** — 10 cities including Dubai and London (international reach)
9. **TrustBar** — dark bg, 4 trust stats
10. **Footer** — dark bg, 5-column nav

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-teal: #0B6E77`, `--color-gold: #C9941A`, `--color-white: #FFFFFF`, `--color-surface: #F7F8FA`, `--color-text: #1A1A2E`, `--color-muted: #6B7280`, `--color-border: #E5E7EB`, `--color-dark: #0D1117`
- **Zero hex values in `.module.css`** — CSS custom properties only; exception: `rgba()` in `box-shadow` and hex in `linear-gradient()` within HeroSection (document with comment)
- **Contrast critical:** White on teal `#0B6E77` = 5.99:1 ✓ AA. Dark `#1A1A2E` on gold `#C9941A` = 5.94:1 ✓ AA. White on gold = 2.72:1 ✗ — NEVER white text on gold.
- **Border-radius:** `12px` property/agent cards (premium — larger than standard 8px), `6px` buttons, `24px` category filter chips (pill), `4px` badges, `8px` agent photos. No `border-radius: 50%`.
- **YieldBadge:** `background: var(--color-gold); color: var(--color-text)` — dark text on gold always
- **SqVerifiedBadge:** `color: var(--color-teal)` — NOT green (green = RERA/standard verification; teal = Square Yards platform verification)
- **Icons:** Lucide React throughout

**Structure:**
```
src/
  app/
    globals.css          # all 8 CSS tokens + DM Sans import
    page.tsx             # Server Component — imports data, renders sections
    layout.tsx
  components/
    layout/SiteNav/ Footer/
    home/
      HeroSection/       # dark teal gradient bg
      CategoryFilter/    # 'use client' — single-tab filter, useMemo
      PremiumPropertyCard/  # 12px radius, investment row
      PropertyGrid/      # receives filtered props
      AgentCard/         # 8px photo radius, rating, specs
      AgentDirectory/
      NewLaunchCard/ NewLaunches/  # horizontal scroll
      ServiceTile/ Services/
      CityLinks/ TrustBar/
    ui/
      Button/            # teal (white text), gold (dark text), outlineTeal
      SqVerifiedBadge/   # teal text — NOT green
      ReraBadge/         # green text + border
      YieldBadge/        # gold bg, dark text — NEVER white on gold
      ListingSourcePill/
  lib/
    formatPrice.ts
    formatYield.ts       # formatYield(n) → '4.2% p.a.'
    filterByCategory.ts
    data.ts              # 6 properties, 3 agents, 3 launches, 4 services, 10 cities
  types/
    index.ts             # PropertyCategory, PremiumProperty, Agent, NewLaunch, ServiceTile
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `formatYield(percent: number): string` → `${percent.toFixed(1)}% p.a.`
- `filterByCategory(properties, category)` — single-dimension filter function:
  - `'all'` → return all; `'luxury'` → price ≥ 10,000,000; `'ready'` → Ready to Move; `'new-launch'` → New Launch; `'high-yield'` → rentalYield ≥ 4.0
- `PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'`
- HeroSection gradient exception: hex values inside `linear-gradient()` are acceptable — document with `/* hex allowed in gradient */` comment

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define all types in `src/types/index.ts` — `PropertyCategory`, `PremiumProperty`, `Agent`, `NewLaunch`, `ServiceTile`
3. Write `globals.css` with 8 CSS custom properties + DM Sans import (no weight 700)
4. Create mock data: 6 `PremiumProperty` (rentalYield 2.8–5.2%, capitalAppreciation 7.5–12.5%), 3 `Agent`, 3 `NewLaunch`, 4 `ServiceTile`, 10 city links
5. Implement `formatPrice`, `formatYield`, `filterByCategory` utilities
6. Build UI atoms: `Button`, `SqVerifiedBadge` (teal text), `YieldBadge` (gold bg, dark text), `ReraBadge`, `ListingSourcePill`
7. Build `HeroSection` with dark teal gradient and search widget
8. Build `CategoryFilter` as `'use client'` with single-select tabs and `useMemo`
9. Build `PremiumPropertyCard` with 12px radius and investment metric row
10. Build `AgentCard` with 8px rectangular photo, rating (gold), specialization tags
11. Compose page, verify contrast rules and QA greps pass, then `tsc --noEmit` and build

**User Experience:**
- First viewport: dark teal hero with search — premium positioning immediately
- CategoryFilter sticky below nav — filter always accessible while browsing grid
- Every property card surfaces yield and appreciation — investment context at a glance
- Agent directory below grid — trust signals for high-commitment buyers
- International cities (Dubai, London) signal NRI reach
- Horizontal scroll for new launches — browse without pagination

**Constraints:**
- `formatPrice()` for ALL price displays — never raw integers in JSX
- CTA on cards: `Contact ${property.listingSource}` — never hardcode "Contact Owner" or "Contact Agent"
- CategoryFilter: one chip active at a time — NOT multi-select; clicking active chip does NOT deselect
- YieldBadge: `color: var(--color-text)` on gold bg — NEVER `var(--color-white)` on gold
- SqVerifiedBadge: `color: var(--color-teal)` — NOT `var(--color-green)`
- Agent photos: `border-radius: 8px` — no circles anywhere
- No font weight 700 — max is 600
- No hex values in `.module.css` (except: `rgba()` in shadows, hex in HeroSection gradient with comment)
- `page.tsx` must be a Server Component — no `'use client'` on the page file

---

## Platform Versions

---

### 1 — Lovable

Build **SquareView** — a premium Indian property portal homepage — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export (`output: 'export'`). Font: DM Sans 400/500/600 via `next/font/google`. No weight 700.

**Two-colour brand system** (`globals.css`):
```css
--color-teal:    #0B6E77;  /* primary — logo, CTA buttons, active states */
--color-gold:    #C9941A;  /* premium accent — yield badges, featured labels */
--color-white:   #FFFFFF;
--color-surface: #F7F8FA;
--color-text:    #1A1A2E;
--color-muted:   #6B7280;
--color-border:  #E5E7EB;
--color-dark:    #0D1117;
```

**Contrast rules:** White on teal `#0B6E77` = 5.99:1 ✓ AA. Dark `#1A1A2E` on gold `#C9941A` = 5.94:1 ✓ AA. White on gold = 2.72:1 ✗ — NEVER white text on gold. Zero hex in `.module.css` files.

**Two primary entities** — `PremiumProperty` and `Agent`:

```typescript
export interface PremiumProperty {
  id: string; title: string; bhk: BHKType; propertyType: PropertyType
  price: number; pricePerSqft: number; superArea: number
  floor: string; locality: string; city: string
  listingSource: ListingSource; verified: boolean; reraRegistered: boolean
  possessionStatus: PossessionStatus; furnishingStatus: FurnishingStatus
  photos: number; postedDaysAgo: number
  rentalYield: number              // %, e.g. 4.2
  capitalAppreciation: number      // % annual, e.g. 9.8
  developerReputation?: 'A+' | 'A' | 'B+'
  mode: 'buy' | 'rent'
}

export interface Agent {
  id: string; name: string; verified: boolean
  rating: number; reviewCount: number
  transactionsCompleted: number
  specializations: string[]
  languages: string[]; city: string
  yearsOfExperience: number
}
```

**Page sections (in order):**
1. **SiteNav** — sticky, teal logo, navigation, language selector, "Post Property Free" teal button
2. **HeroSection** — dark teal gradient bg (`linear-gradient(135deg, #0B6E77, #073B42)`), search input + city dropdown, tag cloud of popular localities, NOT white-bg hero
3. **CategoryFilter** — single-dimension tab filter: All | Luxury | Ready to Move | New Launch | High Yield. `useMemo` for filtering. ARIA live region for count.
4. **PropertyGrid** — 3-column grid of `PremiumPropertyCard` (includes investment metrics: yield % + appreciation %)
5. **AgentDirectory** — 3 `AgentCard` components. Rating stars, transaction count, specialization pills.
6. **NewLaunches** — horizontal scroll of 3 new launch cards with launch date display
7. **Services** — 4 service tiles: Home Loans | Legal Services | Interior Design | NRI Services
8. **CityLinks** — 10 cities including Dubai and London (international)
9. **TrustBar** — dark bg, 4 stats
10. **Footer** — dark bg, 5-column nav

**Category filter — single dimension:**
```typescript
export type PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'

function filterByCategory(props: PremiumProperty[], cat: PropertyCategory): PremiumProperty[] {
  if (cat === 'all') return props
  if (cat === 'luxury') return props.filter(p => p.price >= 10_000_000)
  if (cat === 'ready') return props.filter(p => p.possessionStatus === 'Ready to Move')
  if (cat === 'new-launch') return props.filter(p => p.possessionStatus === 'New Launch')
  if (cat === 'high-yield') return props.filter(p => p.rentalYield >= 4.0)
  return props
}
```

**Investment metric display** (`formatYield`):
```typescript
export function formatYield(percent: number): string {
  return `${percent.toFixed(1)}% p.a.`
}
// Usage: formatYield(4.2) → '4.2% p.a.'
```

**YieldBadge component** — gold accent:
```css
.badge { background: var(--color-gold); color: var(--color-text); border-radius: 4px; }
/* dark on gold = 5.94:1 ✓ — NEVER white on gold */
```

**AgentCard** — `border-radius: 8px` on agent photo (no circles). Rating as `{agent.rating.toFixed(1)} ★`. Verification: `SqVerifiedBadge` (teal checkmark, distinct from green VerifiedBadge).

**Border-radius:** `12px` property/agent cards (premium = more rounded than bw_01's 8px), `6px` buttons, `24px` category filter chips, `4px` badges, `8px` agent photos, no 50%.

**formatPrice:** same lakh/crore convention. `CTA: Contact ${property.listingSource}`.

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **SquareView** — premium Indian property portal — Next.js 14, TypeScript strict, CSS Modules, no Tailwind. Static export.

```bash
npx create-next-app@latest squareview --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Two-colour system** (`src/app/globals.css`):
```css
:root {
  --color-teal:    #0B6E77;
  --color-gold:    #C9941A;
  --color-white:   #FFFFFF;
  --color-surface: #F7F8FA;
  --color-text:    #1A1A2E;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-dark:    #0D1117;
}
```

Font: DM Sans 400/500/600 — `next/font/google`. No weight 700. Zero hex in `.module.css`.

**Contrast:** White on teal = 5.99:1 ✓. Dark text on gold = 5.94:1 ✓. White on gold = 2.72:1 ✗ — forbidden.

**Core types** (`src/types/index.ts`):
- `PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'`
- `PremiumProperty` — all standard property fields + `rentalYield: number`, `capitalAppreciation: number`, `developerReputation?: 'A+' | 'A' | 'B+'`
- `Agent { id, name, verified, rating, reviewCount, transactionsCompleted, specializations, languages, city, yearsOfExperience }`
- `NewLaunch { id, projectName, builderName, locality, city, priceFrom, priceTo, launchDate, reraRegistered, unitTypes }`
- `ServiceTile { id, title, description, iconName, ctaText }`

**Utilities:**
- `formatPrice(n)` — lakh/crore formatter
- `formatYield(n)` — `${n.toFixed(1)}% p.a.`
- `filterByCategory(properties, category)` — single-dimension filter

**6 mock PremiumProperty entries:**
- prop-01: 4 BHK Penthouse, Bandra West Mumbai, ₹3.50 Cr, Builder, Ready to Move, rentalYield: 2.8, capitalAppreciation: 12.5
- prop-02: 3 BHK Luxury, Jubilee Hills Hyderabad, ₹1.20 Cr, Builder, Ready to Move, rentalYield: 4.2, capitalAppreciation: 9.8
- prop-03: 2 BHK, Whitefield Bangalore, ₹85 L, Owner, Ready to Move, rentalYield: 3.9, capitalAppreciation: 8.1
- prop-04: Studio, DLF Cyber City Gurgaon, ₹45 L, Builder, New Launch, rentalYield: 5.2, capitalAppreciation: 11.0
- prop-05: 4 BHK Villa, Adyar Chennai, ₹2.20 Cr, Agent, Ready to Move, rentalYield: 3.1, capitalAppreciation: 7.5
- prop-06: 3 BHK, Koregaon Park Pune, ₹1.10 Cr, Builder, New Launch, rentalYield: 4.5, capitalAppreciation: 10.2

**3 Agent entries:**
- agent-01: Arjun Mehta, verified, rating 4.8, 340 transactions, specializations: ['Luxury Apartments', 'NRI Services']
- agent-02: Priya Nair, verified, rating 4.6, 280 transactions, specializations: ['Residential', 'Ready to Move']
- agent-03: Vikram Shah, verified, rating 4.9, 500 transactions, specializations: ['Commercial', 'Investment Properties']

**CategoryFilter — single tab, not multi-select:**
```tsx
// CategoryFilter.tsx — 'use client'
const [category, setCategory] = useState<PropertyCategory>('all')
const filtered = useMemo(() => filterByCategory(properties, category), [properties, category])
// Tabs: All | Luxury | Ready to Move | New Launch | High Yield
// Tab radius: 24px (pill)
// Active: background: var(--color-teal); color: var(--color-white)
```

**SqVerifiedBadge** — teal (not green): `color: var(--color-teal)` — distinct from VerifiedBadge (green) used in bw_01/bw_02.

**YieldBadge** — gold background: `background: var(--color-gold); color: var(--color-text)`.

---

### 3 — Bolt

Build **SquareView** premium property portal. Next.js 14 App Router, TypeScript strict, CSS Modules. `npm install lucide-react framer-motion`. Static export.

**8 tokens, zero hex in modules:**
`--color-teal: #0B6E77` · `--color-gold: #C9941A` · `--color-white: #FFFFFF` · `--color-surface: #F7F8FA` · `--color-text: #1A1A2E` · `--color-muted: #6B7280` · `--color-border: #E5E7EB` · `--color-dark: #0D1117`

Font: DM Sans 400/500/600 — no 700. Contrast: white/teal 5.99:1 ✓, dark/gold 5.94:1 ✓.

**File structure:**
```
src/
  types/index.ts          — PremiumProperty, Agent, NewLaunch, ServiceTile + unions
  lib/
    data.ts               — 6 properties, 3 agents, 3 launches, 4 services, 10 cities
    formatPrice.ts        — formatPrice(), formatPriceRange()
    formatYield.ts        — formatYield(n) → '4.2% p.a.'
    filterByCategory.ts   — filterByCategory(properties, category)
  components/
    layout/SiteNav.tsx + .module.css
    layout/Footer.tsx + .module.css
    home/
      HeroSection.tsx + .module.css        — dark teal gradient bg
      CategoryFilter.tsx + .module.css     — 'use client', tab filter
      PropertyGrid.tsx + .module.css       — 'use client', receives filtered props
      PremiumPropertyCard.tsx + .module.css
      AgentDirectory.tsx + .module.css
      AgentCard.tsx + .module.css
      NewLaunches.tsx + .module.css        — horizontal scroll
      NewLaunchCard.tsx + .module.css
      Services.tsx + .module.css
      ServiceTile.tsx + .module.css
      CityLinks.tsx + .module.css
      TrustBar.tsx + .module.css
    ui/
      Button.tsx + .module.css             — teal primary, gold accent, outlineTeal
      SqVerifiedBadge.tsx + .module.css    — teal text (not green)
      ReraBadge.tsx + .module.css          — green text + border
      YieldBadge.tsx + .module.css         — gold bg, dark text
      ListingSourcePill.tsx + .module.css
  app/globals.css, layout.tsx, page.tsx
```

**Critical constraints:**
1. White never on gold: YieldBadge always uses `color: var(--color-text)` on gold bg
2. SqVerifiedBadge uses `color: var(--color-teal)` — NOT green (green = RERA/standard verification)
3. CategoryFilter: single-dimension, one chip active at a time — NOT multi-select
4. `useMemo` wraps `filterByCategory` in the component that holds filter state
5. Agent photos: `border-radius: 8px` — rectangular (no circles)
6. Investment metrics on every PremiumPropertyCard: `formatYield(rentalYield)` + `capitalAppreciation.toFixed(1)%`
7. CTA: `Contact ${property.listingSource}` — never hardcoded
8. All prices: `formatPrice()` — never raw integers

**QA grep checks:**
```bash
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"   # empty
grep -r "border-radius: 50%" src --include="*.module.css"         # empty
grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css # empty
grep -r "Contact Owner" src/components --include="*.tsx"          # empty
grep -r "font-weight: 700" src --include="*.module.css"           # empty
```

---

### 4 — v0

Design **SquareView** — premium Indian property portal — component CSS specifications. Next.js 14, TypeScript, CSS Modules, no Tailwind, no component libraries.

**Token system:**
```css
--color-teal: #0B6E77; --color-gold: #C9941A; --color-white: #FFFFFF;
--color-surface: #F7F8FA; --color-text: #1A1A2E; --color-muted: #6B7280;
--color-border: #E5E7EB; --color-dark: #0D1117;
```

DM Sans 400/500/600. No 700. No hex in `.module.css`.

**HeroSection.module.css:**
```css
.hero {
  background: linear-gradient(135deg, #0B6E77 0%, #073B42 100%);
  /* Exception: gradient uses hex — not possible with CSS variables in gradient */
  padding: 80px 24px;
}
.widget {
  max-width: 720px; margin: 0 auto; background: var(--color-white);
  border-radius: 12px; padding: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.heading { font-size: 2.5rem; font-weight: 600; color: var(--color-white); text-align: center; margin-bottom: 32px; }
.tagCloud { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 24px; }
.tag {
  padding: 4px 14px; border-radius: 24px; font-size: 0.8125rem; font-weight: 500;
  background: rgba(255,255,255,0.15); color: var(--color-white); cursor: pointer;
  transition: background 0.15s;
}
.tag:hover { background: rgba(255,255,255,0.25); }
```

**CategoryFilter.module.css:**
```css
.bar {
  background: var(--color-white); border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
}
.inner { max-width: 1280px; margin: 0 auto; padding: 12px 24px; display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
.chip {
  padding: 8px 20px; border-radius: 24px; font-size: 0.875rem; font-weight: 500;
  font-family: var(--font-sans); cursor: pointer; white-space: nowrap; flex-shrink: 0;
  border: 1.5px solid var(--color-border); background: var(--color-white); color: var(--color-text);
  transition: all 0.15s;
}
.chip:hover { border-color: var(--color-teal); color: var(--color-teal); }
.chipActive { background: var(--color-teal); color: var(--color-white); border-color: var(--color-teal); }
/* white on teal = 5.99:1 ✓ */
```

**YieldBadge.module.css:**
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--color-gold); color: var(--color-text);  /* dark on gold = 5.94:1 ✓ */
  font-size: 0.6875rem; font-weight: 700; padding: 2px 8px;
  border-radius: 4px; letter-spacing: 0.03em;
}
/* NEVER: color: var(--color-white) on gold bg — that's 2.72:1 ✗ */
```

**AgentCard.module.css:**
```css
.card {
  background: var(--color-white); border-radius: 12px;
  border: 1px solid var(--color-border); padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.photo {
  width: 72px; height: 72px; border-radius: 8px;    /* NO border-radius: 50% */
  background: var(--color-surface); object-fit: cover;
}
.name { font-size: 1rem; font-weight: 600; color: var(--color-text); }
.rating { color: var(--color-gold); font-size: 0.875rem; font-weight: 600; }
.stat { font-size: 0.8125rem; color: var(--color-muted); }
.specs { display: flex; gap: 8px; flex-wrap: wrap; }
.spec {
  font-size: 0.75rem; font-weight: 500; padding: 3px 10px;
  border: 1px solid var(--color-border); border-radius: 4px; color: var(--color-text);
}
```

**PremiumPropertyCard.module.css:**
```css
.card {
  background: var(--color-white); border-radius: 12px;   /* 12px — premium, vs 8px in bw_01 */
  border: 1px solid var(--color-border); overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
.investRow {
  display: flex; gap: 8px; flex-wrap: wrap;
  padding: 8px 16px; background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}
```

**Button variants:**
```css
.teal { background: var(--color-teal); color: var(--color-white); border-radius: 6px; }
/* white on teal = 5.99:1 ✓ */
.gold { background: var(--color-gold); color: var(--color-text); border-radius: 6px; }
/* dark on gold = 5.94:1 ✓ — never white on gold */
.outlineTeal { background: transparent; color: var(--color-teal); border: 1.5px solid var(--color-teal); border-radius: 6px; }
```

---

### 5 — Claude Artifacts

Build **SquareView** — production-quality premium Indian property portal — Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. DM Sans 400/500/600.

**Three defining constraints:**

**Constraint 1 — Gold requires dark text, always:**
```css
/* YieldBadge.module.css */
.badge { background: var(--color-gold); color: var(--color-text); }
/* #1A1A2E on #C9941A = 5.94:1 ✓ AA
   White on #C9941A = 2.72:1 ✗ FAILS — never use */
```

**Constraint 2 — SqVerifiedBadge is teal, not green:**
`VerifiedBadge` (from bw_01 pattern) uses `color: var(--color-green)`. This build's `SqVerifiedBadge` uses `color: var(--color-teal)`. Both are text-only badges, no background. The colour difference signals that Square Yards verification is distinct from generic listing verification.

**Constraint 3 — Category filter is single-dimension tab, not multi-select:**
```tsx
// CategoryFilter.tsx — 'use client'
const [category, setCategory] = useState<PropertyCategory>('all')
// Clicking active chip switches to 'all' — no deselect-to-empty behaviour
// Only one chip active at a time — NOT multi-select like BHK in bw_01
const filtered = useMemo(() => filterByCategory(properties, category), [properties, category])
```

**Complete type system** (`src/types/index.ts`):
```typescript
export type PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type PropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'Penthouse' | 'Plot'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type DeveloperReputation = 'A+' | 'A' | 'B+'

export interface PremiumProperty {
  id: string; title: string; bhk: BHKType; propertyType: PropertyType
  price: number; pricePerSqft: number; superArea: number
  floor: string; locality: string; city: string
  listingSource: ListingSource; verified: boolean; reraRegistered: boolean
  possessionStatus: PossessionStatus; furnishingStatus: FurnishingStatus
  photos: number; postedDaysAgo: number
  rentalYield: number          // % e.g. 4.2
  capitalAppreciation: number  // % annual e.g. 9.8
  developerReputation?: DeveloperReputation
  mode: 'buy' | 'rent'
}

export interface Agent {
  id: string; name: string; verified: boolean
  rating: number; reviewCount: number
  transactionsCompleted: number
  specializations: string[]
  languages: string[]; city: string
  yearsOfExperience: number
}

export interface NewLaunch {
  id: string; projectName: string; builderName: string
  locality: string; city: string
  priceFrom: number; priceTo: number
  launchDate: string    // 'Jun 2025'
  reraRegistered: boolean; photos: number
  unitTypes: string[]
}

export interface ServiceTile {
  id: string; title: string; description: string
  iconName: string; ctaText: string
}
```

**Utilities:**
```typescript
// formatYield.ts
export function formatYield(percent: number): string {
  return `${percent.toFixed(1)}% p.a.`
}

// filterByCategory.ts
export function filterByCategory(
  properties: PremiumProperty[],
  category: PropertyCategory
): PremiumProperty[] {
  if (category === 'all')        return properties
  if (category === 'luxury')     return properties.filter(p => p.price >= 10_000_000)
  if (category === 'ready')      return properties.filter(p => p.possessionStatus === 'Ready to Move')
  if (category === 'new-launch') return properties.filter(p => p.possessionStatus === 'New Launch')
  if (category === 'high-yield') return properties.filter(p => p.rentalYield >= 4.0)
  return properties
}
```

**Mock data:** 6 `PremiumProperty`, 3 `Agent`, 3 `NewLaunch`, 4 `ServiceTile`, 10 city links (8 Indian + Dubai + London). See `02_Architecture.md`.

**HeroSection:** Dark teal gradient background — `linear-gradient(135deg, #0B6E77 0%, #073B42 100%)`. Gradient hex is an exception to the no-hex rule (CSS variables cannot be used inside `linear-gradient` colour stops). Document this exception in a comment.

**All QA checks before build:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"              # empty
grep -r "border-radius: 50%" src --include="*.module.css"                    # empty
grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css         # empty
grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components        # empty
grep -r "font-weight: 700" src --include="*.module.css"                      # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **SquareView** — premium Indian property portal. Next.js 14 App Router, TypeScript strict, CSS Modules, no Tailwind. Static export. DM Sans 400/500/600 only.

Generate in order:
1. `src/types/index.ts` — PropertyCategory, PremiumProperty, Agent, NewLaunch, ServiceTile, DeveloperReputation + all union types
2. `src/lib/formatPrice.ts`
3. `src/lib/formatYield.ts` — `formatYield(n)` → `'4.2% p.a.'`
4. `src/lib/filterByCategory.ts`
5. `src/lib/data.ts` — 6 properties, 3 agents, 3 launches, 4 services, trustStats, cityLinks (inc. Dubai + London)
6. `src/app/globals.css` — 8 tokens, .sr-only, prefers-reduced-motion
7. `src/app/layout.tsx` — DM Sans via next/font/google, weights ['400','500','600']
8. `src/components/ui/Button.tsx + .module.css` — teal (white text), gold (dark text), outlineTeal variants
9. `src/components/ui/SqVerifiedBadge.tsx + .module.css` — TEAL text, not green
10. `src/components/ui/ReraBadge.tsx + .module.css` — green text + border
11. `src/components/ui/YieldBadge.tsx + .module.css` — GOLD bg, dark text — never white
12. `src/components/ui/ListingSourcePill.tsx + .module.css`
13. `src/components/layout/SiteNav.tsx + .module.css` — 'use client'
14. `src/components/layout/Footer.tsx + .module.css`
15. `src/components/home/HeroSection.tsx + .module.css` — dark teal gradient, search widget
16. `src/components/home/CategoryFilter.tsx + .module.css` — 'use client', single-tab filter, 24px pill radius
17. `src/components/home/PremiumPropertyCard.tsx + .module.css` — 12px radius, investment row
18. `src/components/home/PropertyGrid.tsx + .module.css` — receives filtered props
19. `src/components/home/AgentCard.tsx + .module.css` — 8px photo radius, rating, specs
20. `src/components/home/AgentDirectory.tsx + .module.css`
21. `src/components/home/NewLaunchCard.tsx + .module.css`
22. `src/components/home/NewLaunches.tsx + .module.css` — horizontal scroll
23. `src/components/home/ServiceTile.tsx + .module.css`
24. `src/components/home/Services.tsx + .module.css`
25. `src/components/home/CityLinks.tsx + .module.css`
26. `src/components/home/TrustBar.tsx + .module.css`
27. `src/app/page.tsx`

**Rules in every file:**
- No hex in `.module.css` (exception: gradient in HeroSection with comment)
- No `font-weight: 700`; max 600
- No `border-radius: 50%`
- Gold always paired with dark text
- Teal can use white text (5.99:1 ✓)
- `formatPrice()` for all prices; `formatYield()` for yield metrics
- CTA: `Contact ${property.listingSource}`

---

### 7 — Gemini

**Project:** SquareView — premium Indian property portal. Next.js 14 App Router, TypeScript strict, CSS Modules. Static export. DM Sans 400/500/600.

**Design system — two-colour brand:**
- `--color-teal: #0B6E77` — primary; white text passes 5.99:1 ✓ AA
- `--color-gold: #C9941A` — premium accent; dark text only (5.94:1 ✓); white fails (2.72:1 ✗)
- `--color-white`, `--color-surface: #F7F8FA`, `--color-text: #1A1A2E`, `--color-muted: #6B7280`, `--color-border: #E5E7EB`, `--color-dark: #0D1117`

**Architecture — 6 layers:**

Layer 1 — Foundation: types, utilities (formatPrice, formatYield, filterByCategory), mock data, globals.css, layout.tsx.

Layer 2 — UI Atoms: Button (teal/gold/outlineTeal variants), SqVerifiedBadge (teal text — NOT green), ReraBadge (green text + border), YieldBadge (gold bg, dark text), ListingSourcePill.

Layer 3 — Layout: SiteNav (teal logo, scroll shadow), Footer (dark bg, 5 columns).

Layer 4 — Hero + Filter:
- `HeroSection` — dark teal gradient (`linear-gradient(135deg, #0B6E77, #073B42)`), city+locality search, popular locality tag cloud
- `CategoryFilter` (`'use client'`) — 5 pill tabs, single-select, `useMemo`, ARIA live region

Layer 5 — Property Grid:
- `PremiumPropertyCard` — 12px radius, investment row showing `formatYield(rentalYield)` + `{capitalAppreciation.toFixed(1)}% Appreciation`
- `PropertyGrid` — receives filtered `PremiumProperty[]` from page
- `AgentCard` — 8px agent photo, rating (gold colour), transaction count, specialization tags
- `AgentDirectory` — 3 agents in 3-column grid

Layer 6 — Supporting Sections:
- `NewLaunches` — horizontal scroll of `NewLaunchCard` with launch date and price range
- `Services` — 4 tiles (Home Loans / Legal / Interior / NRI) in 4-column grid
- `CityLinks` — 10 cities (8 Indian + Dubai + London) in 5-column grid
- `TrustBar` — dark bg, 4 stats

**Critical requirements:**
- `filterByCategory`: one active category at a time — NOT multi-select
- YieldBadge: `color: var(--color-text)` on gold — never `var(--color-white)`
- SqVerifiedBadge: `color: var(--color-teal)` — not green (green = RERA/standard verification in bw_01/02)
- Agent photos: `border-radius: 8px` — no circles
- All prices via `formatPrice()`; all yields via `formatYield()`
- Hero gradient exception: hex values inside `linear-gradient()` are acceptable — comment `/* hex allowed in gradient */`

**Framer Motion:**
- HeroSection: `opacity: 0, y: 24 → visible`
- CategoryFilter tab content: instant (no animation — filter UX should feel snappy)
- AgentDirectory cards: stagger 0.1s
- Services tiles: stagger 0.08s
- All: `viewport={{ once: true }}`

**Mock data highlights:**
- 6 `PremiumProperty` with rentalYield range 2.8–5.2%, capitalAppreciation 7.5–12.5%
- 3 `Agent`: ratings 4.6–4.9, transactions 280–500
- 3 `NewLaunch` with `launchDate` field (string: 'Jun 2025', 'Aug 2025', 'Oct 2025')
- 10 city links: Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Dubai, London
- 4 `ServiceTile`: Home Loans (Briefcase icon), Legal Services (Scale icon), Interior Design (PaintBucket icon), NRI Services (Globe icon)

---

### 8 — Cursor

Build **SquareView** premium property portal. Next.js 14 App Router, TypeScript, CSS Modules. Static export. DM Sans 400/500/600.

**`src/app/globals.css`:**
```css
:root {
  --color-teal: #0B6E77; --color-gold: #C9941A; --color-white: #FFFFFF;
  --color-surface: #F7F8FA; --color-text: #1A1A2E; --color-muted: #6B7280;
  --color-border: #E5E7EB; --color-dark: #0D1117;
}
```

**`src/app/layout.tsx`:**
```tsx
import { DM_Sans } from 'next/font/google'
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-sans', display: 'swap' })
// weight '700' must NOT appear
```

**`src/lib/filterByCategory.ts`:**
```typescript
export type PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'
export function filterByCategory(properties: PremiumProperty[], category: PropertyCategory): PremiumProperty[] {
  if (category === 'all')        return properties
  if (category === 'luxury')     return properties.filter(p => p.price >= 10_000_000)
  if (category === 'ready')      return properties.filter(p => p.possessionStatus === 'Ready to Move')
  if (category === 'new-launch') return properties.filter(p => p.possessionStatus === 'New Launch')
  if (category === 'high-yield') return properties.filter(p => p.rentalYield >= 4.0)
  return properties
}
```

**`src/lib/formatYield.ts`:**
```typescript
export function formatYield(percent: number): string {
  return `${percent.toFixed(1)}% p.a.`
}
```

**YieldBadge pattern (gold bg, dark text):**
```tsx
// src/components/ui/YieldBadge.tsx
export default function YieldBadge({ yield: pct }: { yield: number }) {
  return <span className={styles.badge}>{formatYield(pct)} Yield</span>
}
// .badge { background: var(--color-gold); color: var(--color-text); border-radius: 4px; }
// dark on gold = 5.94:1 ✓ — NEVER var(--color-white) on gold
```

**SqVerifiedBadge (teal, not green):**
```tsx
// color: var(--color-teal) — NOT var(--color-green)
// This signals Square Yards platform verification vs RERA/listing verification
```

**CategoryFilter pattern (single-select):**
```tsx
'use client'
const [category, setCategory] = useState<PropertyCategory>('all')
const filtered = useMemo(() => filterByCategory(properties, category), [properties, category])
// Only one chip active — no multi-select
// Clicking active chip does NOT deselect — stays on current category
```

**AgentCard photo — no circles:**
```css
.photo { width: 72px; height: 72px; border-radius: 8px; }
/* NEVER: border-radius: 50% — no circular elements in this build */
```

**PremiumPropertyCard investment row:**
```tsx
<div className={styles.investRow}>
  <YieldBadge yield={property.rentalYield} />
  <span className={styles.appreciation}>
    {property.capitalAppreciation.toFixed(1)}% Appreciation
  </span>
</div>
```

**Page assembly order:**
```tsx
<SiteNav />
<HeroSection />
<CategoryFilter properties={properties} />     {/* manages filter state, renders PropertyGrid */}
<AgentDirectory agents={agents} />
<NewLaunches launches={newLaunches} />
<Services tiles={services} />
<CityLinks cities={cityLinks} />
<TrustBar stats={trustStats} />
<Footer />
```

**Forbidden pattern greps:**
```bash
grep -r "border-radius: 50%" src --include="*.module.css"                    # empty
grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css         # empty
grep -r "color: var(--color-green)" src/components/ui/SqVerifiedBadge.module.css # empty (must use teal)
grep -r "font-weight: 700" src --include="*.module.css"                      # empty
grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components        # empty
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
