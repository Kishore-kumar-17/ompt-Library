# bw_service_02
## Indian Web Agency Directory · Webflow Services pattern
### Inspiration: webflow.com/services — Agency directory, tier badges, specialization filtering

---

## Base Prompt

**Role:** Senior product designer specialising in Indian B2B marketplace and directory platforms, with expertise in multi-dimensional filter UI, credentialing systems, and search-first landing experiences.

**Application Overview:**
AgencyHub is an Indian web design and development agency directory — a curated marketplace connecting Indian businesses with verified digital agencies. Visitors are business owners, marketing managers, or startup founders actively shortlisting a web development partner. The primary conversion goal: submit an agency enquiry or click through to an agency profile to start a conversation.

**Brand Voice & Mood:**
Professional, curated, authoritative. Indigo (`#4F46E5`) communicates precision and digital expertise — not aggressive like red, not generic like light blue. The amber Premier badges (`#D97706`) signal prestige without ostentation. Copy is direct and tool-like: "Find the right agency for your project." The design feels built by people who understand the agency selection process — not a generic classified site. Visitors should feel they're accessing a vetted, expert-curated list, not a sprawling directory.

**Core Features:**
1. Sticky navigation — indigo logo, "List Your Agency" ghost CTA, horizontal nav links
2. Search-first hero — headline, 2-line subhead, full-width text search input with "Search Agencies" button
3. Filter bar — sticky below nav: text search, specialization chips, budget range select, city select, tier select, Clear Filters
4. Agency grid — 3-column responsive grid; featured agencies pinned to top regardless of filter state
5. Agency card — tier badge (3 visual variants), name, tagline, city, specialization tags, star rating, review count, budget range, "View Agency" CTA
6. Trust bar — dark background, 4 directory stats
7. Footer — deep dark background, site links

**Design Specifications:**

Color palette (8 tokens):
- Indigo: `#4F46E5` — brand, nav, primary CTAs, active filter chips, Expert/filter badges; white on indigo = 6.29:1 ✓
- Amber: `#D97706` — Premier tier badge bg only; dark on amber = 6.31:1 ✓; NEVER white on amber = 2.99:1 ✗
- Dark: `#0F0F23` — headings and body text (near-black with blue undertone)
- White: `#FFFFFF` — page background, card backgrounds
- Surface: `#F5F5FF` — blue-tinted section alternates, specialization tag backgrounds
- Muted: `#6B7280` — metadata, secondary text
- Border: `#E5E7EB` — card and input borders
- Footer: `#070715` — deep dark footer background

Typography: Space Grotesk (Google Fonts) weights 400/500/600 only. No weight 700 anywhere. H1: `clamp(2.25rem, 4vw, 3rem)` weight 600. Card name: 1.0625rem weight 600. Body: 1rem/1.6 weight 400.

Border radius: 12px on AgencyCard, 8px on filter selects and search input, 20px on specialization chips, 4px on tier badges. No `border-radius: 50%`.

Spacing: 8pt grid. AgencyGrid gap: 24px. Section vertical padding: `clamp(60px, 8vw, 120px)`.

**Structure:**
1. SiteNav — sticky, white bg, indigo "AgencyHub" text logo, nav links (Browse / How It Works / Pricing / Blog), "List Your Agency" ghost button right
2. HeroSection — centered layout: H1, 2-line subhead, large SearchBar (text input + indigo "Search Agencies" button)
3. AgencyFilterBar — sticky below nav: search input with icon, specialization chips (horizontal scroll on mobile), BudgetSelect, CitySelect, TierSelect, "Clear Filters" text link; ARIA live region for result count
4. AgencyGrid — 3-col desktop / 2-col tablet / 1-col mobile; featured agencies always first
5. TrustBar — dark `#0F0F23` bg, 4 stats in horizontal row
6. Footer — `#070715` bg, 4-column layout

**Technical Specifications:**
- Framework: Next.js 14 App Router, TypeScript strict
- CSS: CSS Modules — zero hex in `.module.css` files, all colors via `var(--color-*)`
- Client boundary: `'use client'` on `AgencyFilterBar` only (holds filter state)
- State: `AgencyFilterState { search, specialization, budgetRange, city, tier }` in single `useState` object
- Filter logic: `filterAgencies(agencies, filters)` — text search matches name + tagline; featured sort is final step inside utility
- Performance: `useMemo` wraps `filterAgencies` call in AgencyFilterBar
- Fonts: Space Grotesk via `next/font/google`, weights `['400', '500', '600']`
- Export: static (`output: 'export'`)

**Implementation Steps:**
1. Types: `AgencyTier`, `Specialization`, `TeamSize`, `BudgetRange`, `Agency` (with `budgetCategory`), `AgencyFilterState`
2. Utilities: `formatBudgetRange(agency)`, `filterAgencies(agencies, filters)`
3. Mock data: 8 Indian agencies with pre-computed `budgetCategory` field
4. TierBadge + AgencyCard (primary content unit)
5. AgencyGrid (static, receives pre-filtered array)
6. AgencyFilterBar (client boundary — filter state + useMemo + renders AgencyGrid)
7. SiteNav + HeroSection (above-the-fold entry)
8. TrustBar + Footer

**User Experience:**
The visitor arrives knowing they need a web agency but unsure how to evaluate options. The search-first hero removes friction: they type their industry or need immediately. The filter bar lets them narrow by budget and location — the two most common constraints for Indian businesses. Featured agencies appear first, priming with quality examples before they scroll. The tier badge system (Certified → Expert → Premier) creates an instantly readable credibility hierarchy. The agency card shows budget range and specializations at a glance — enough to qualify without clicking through. The "View Agency" CTA starts a low-commitment profile view, not a direct form submission.

**Constraints:**
- NEVER white text on amber (`#D97706`) background — 2.99:1 fails WCAG AA; use `var(--color-dark)` on amber
- No `font-weight: 700` anywhere — Space Grotesk 600 is the maximum weight
- No `border-radius: 50%` — this is a B2B professional tool, not a social platform
- No hex values in `.module.css` files — CSS custom properties only
- `budgetCategory` (string) for ALL filter logic — never compare `budgetMin`/`budgetMax` range in filter code
- `formatBudgetRange(agency)` for ALL budget display in JSX — never render raw `budgetMin` or `budgetMax` numbers
- Featured sort executes inside `filterAgencies` utility — not in the component after calling the utility
- Text search must match name AND tagline fields — not name alone
- `filterAgencies` handles null `budgetMax` case via `formatBudgetRange`
- Static export — no API routes, no server-side search

---

## Platform Versions

---

### 1 — Lovable

Build **AgencyHub** — an Indian web design agency directory — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Font: Space Grotesk 400/500/600 via `next/font/google`. No weight 700.

**Brand: Indigo `#4F46E5`.** Token system in `globals.css`:
```css
--color-indigo:  #4F46E5;  /* brand — white on indigo = 6.29:1 ✓ */
--color-amber:   #D97706;  /* Premier tier, star rating — dark on amber = 6.31:1 ✓ */
--color-dark:    #0F0F23;  /* text — near-black, blue undertone */
--color-white:   #FFFFFF;
--color-surface: #F5F5FF;  /* blue-tinted surface */
--color-muted:   #6B7280;
--color-border:  #E5E7EB;
--color-footer:  #070715;  /* deep dark for footer */
```

Zero hex in `.module.css`. White on indigo = 6.29:1 ✓ AA. Dark on amber = 6.31:1 ✓ AA. **Never white on amber** (2.99:1 ✗).

**This build introduces new patterns not present in any prior build:**
- **Text search:** `search: string` in `AgencyFilterState` — first free-text filter in the library
- **`filterAgencies` with text matching:** `name.includes(query) || tagline.includes(query)`
- **Featured sort:** `filterAgencies` returns featured agencies first, regardless of filter state
- **Three-tier badge system:** Certified (indigo outline) / Expert (indigo fill) / Premier (amber fill + dark text)
- **`formatBudgetRange(agency)`** — first range-value formatter (not a single price)
- **`budgetCategory`** pre-computed on `Agency` type — filter is O(1) string compare, not range math

**New types unique to this build:**
```typescript
export type AgencyTier = 'Certified' | 'Expert' | 'Premier'
export type Specialization = 'E-commerce' | 'SaaS' | 'Marketing Sites' | 'Portfolio' | 'Enterprise' | 'Startup'
export type TeamSize = '1–5' | '6–15' | '16–50' | '50+'
export type BudgetRange = 'Under ₹2L' | '₹2L–₹10L' | '₹10L–₹50L' | '₹50L+'

export interface Agency {
  id: string
  name: string
  tagline: string
  city: string
  tier: AgencyTier
  specializations: Specialization[]
  teamSize: TeamSize
  budgetCategory: BudgetRange   // pre-computed — use this for filtering (O(1) string match)
  budgetMin: number             // use with formatBudgetRange for display only
  budgetMax: number | null      // null = unlimited
  rating: number
  reviewCount: number
  projectsCompleted: number
  featured: boolean
}

export interface AgencyFilterState {
  search: string                // text search — matches name + tagline
  specialization: Specialization | ''
  budgetRange: BudgetRange | ''
  city: string
  tier: AgencyTier | ''
}
```

**New utilities:**
```typescript
// formatBudgetRange.ts
export function formatBudgetRange(agency: Agency): string {
  const fmt = (n: number) => n >= 100_000
    ? `₹${(n / 100_000).toFixed(0)}L`
    : `₹${(n / 1_000).toFixed(0)}K`
  if (agency.budgetMax === null) return `${fmt(agency.budgetMin)}+`
  return `${fmt(agency.budgetMin)} – ${fmt(agency.budgetMax)}`
}
// formatBudgetRange({ budgetMin: 200000, budgetMax: 1000000 }) → '₹2L – ₹10L'
// formatBudgetRange({ budgetMin: 5000000, budgetMax: null })   → '₹50L+'

// filterAgencies.ts
export function filterAgencies(
  agencies: Agency[],
  filters: AgencyFilterState
): Agency[] {
  const result = agencies.filter(a => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
    }
    if (filters.specialization && !a.specializations.includes(filters.specialization)) return false
    if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
    if (filters.city && a.city !== filters.city) return false
    if (filters.tier && a.tier !== filters.tier) return false
    return true
  })
  // Featured agencies always sort to top — stable sort preserves relative order within groups
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}
```

**8 mock `Agency` entries** (all Indian cities):
- ag-01: PixelCraft Studio, Mumbai, Premier, E-commerce + SaaS, ₹10L–₹50L, 4.9★, featured
- ag-02: WebForge India, Bangalore, Expert, SaaS + Startup, ₹2L–₹10L, 4.7★, featured
- ag-03: Kinetic Digital, Hyderabad, Premier, Enterprise + E-commerce, ₹50L+, 4.8★, featured
- ag-04: DesignAxis, Delhi, Expert, Marketing Sites + Portfolio, ₹10L–₹50L, 4.6★
- ag-05: BuildRight Co, Pune, Certified, Portfolio + Marketing Sites, ₹2L–₹10L, 4.3★
- ag-06: StudioNorth, Chennai, Expert, SaaS + Enterprise, ₹10L–₹50L, 4.5★
- ag-07: CreativeBloc, Kolkata, Certified, Marketing Sites + Portfolio, Under ₹2L, 4.2★
- ag-08: AppMade, Bangalore, Certified, Startup + E-commerce, ₹2L–₹10L, 4.4★

**Page sections:**
1. **SiteNav** — indigo logo, "List Your Agency" ghost CTA
2. **HeroSection** — headline, subheading, large `SearchBar` (text input + "Search" button)
3. **AgencyFilterBar** — specialization chips + budget select + city select + tier select + Clear
4. **AgencyGrid** — 3-col grid of `AgencyCard`s (featured pinned to top)
5. **TrustBar** — dark bg, 4 stats
6. **Footer** — deep dark bg

**`AgencyFilterBar`** — `'use client'`:
```tsx
const [filters, setFilters] = useState<AgencyFilterState>(INITIAL_FILTERS)
const filtered = useMemo(() => filterAgencies(agencies, filters), [agencies, filters])
// search input: <input type="search"> — no debounce needed for 8 items
```

**`TierBadge`** — three distinct visual variants:
```css
.certified { color: var(--color-indigo); border: 1px solid var(--color-indigo); }
/* indigo on white = 6.29:1 ✓ */
.expert    { background: var(--color-indigo); color: var(--color-white); }
/* white on indigo = 6.29:1 ✓ */
.premier   { background: var(--color-amber); color: var(--color-dark); }
/* dark on amber = 6.31:1 ✓ — NEVER white on amber (2.99:1 ✗) */
```

**Anti-patterns:**
- Never `color: var(--color-white)` on amber bg — 2.99:1 ✗ forbidden
- Never use `budgetMin`/`budgetMax` for filter logic — use `budgetCategory` (string match)
- Never use `budgetMin`/`budgetMax` directly in JSX — use `formatBudgetRange(agency)`
- Never `border-radius: 50%` anywhere (no circular elements)
- Never `font-weight: 700` anywhere
- Featured sort must happen inside `filterAgencies`, not in the component

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **AgencyHub** — Indian web agency directory — Next.js 14, TypeScript strict, CSS Modules. Static export.

```bash
npx create-next-app@latest agencyhub --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Tokens:**
```css
:root {
  --color-indigo:  #4F46E5;
  --color-amber:   #D97706;
  --color-dark:    #0F0F23;
  --color-white:   #FFFFFF;
  --color-surface: #F5F5FF;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #070715;
}
```

Font: Space Grotesk 400/500/600. No weight 700. Zero hex in `.module.css`.

**Contrast:** White on indigo = 6.29:1 ✓. Dark on amber = 6.31:1 ✓. White on amber = 2.99:1 ✗ (forbidden).

**New types** (unique to this build — first agency/directory build):
- `AgencyTier = 'Certified' | 'Expert' | 'Premier'`
- `Specialization` union (6 values)
- `BudgetRange` union (4 values)
- `Agency` — includes `budgetCategory: BudgetRange` for filter and `budgetMin/budgetMax` for display
- `AgencyFilterState { search, specialization, budgetRange, city, tier }`

**New utilities:**
- `formatBudgetRange(agency)` → `'₹2L – ₹10L'` or `'₹50L+'`
- `filterAgencies(agencies, filters)` — text search + 4 field filters + featured-first sort

**Text search (first in library):**
```typescript
if (filters.search.trim()) {
  const q = filters.search.toLowerCase()
  if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
}
```

**Budget filtering uses pre-computed `budgetCategory`** — not range math:
```typescript
if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
```

**Key components:**
- `AgencyFilterBar` — `'use client'`, `AgencyFilterState`, `useMemo` wrapping `filterAgencies`, renders `AgencyGrid`
- `AgencyCard` — TierBadge, StarRating, specialization tags, `formatBudgetRange`, "View Agency" CTA
- `TierBadge` — 3 variants: Certified (indigo outline), Expert (indigo fill), Premier (amber fill + dark text)
- `StarRating` — amber star icon (decorative) + dark rating number + muted review count

---

### 3 — Bolt

Build **AgencyHub** — Indian web agency directory. Next.js 14, TypeScript strict, CSS Modules, no Tailwind. Static export.

```bash
npx create-next-app@latest agencyhub --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**8 tokens:** `--color-indigo: #4F46E5` · `--color-amber: #D97706` · `--color-dark: #0F0F23` · `--color-white: #FFFFFF` · `--color-surface: #F5F5FF` · `--color-muted: #6B7280` · `--color-border: #E5E7EB` · `--color-footer: #070715`

Font: Space Grotesk 400/500/600. No weight 700. Zero hex in `.module.css`.

**File structure:**
```
src/
  types/index.ts          — AgencyTier, Specialization, BudgetRange, TeamSize, Agency, AgencyFilterState
  lib/
    data.ts               — AGENCIES (8), SPECIALIZATIONS, BUDGET_RANGES, CITIES, TRUST_STATS
    formatBudgetRange.ts  — formatBudgetRange(agency): string
    filterAgencies.ts     — text search + 4 filters + featured sort
  components/
    layout/SiteNav.tsx + .module.css
    layout/Footer.tsx + .module.css
    home/
      HeroSection.tsx + .module.css
      AgencyFilterBar.tsx + .module.css   — 'use client', AgencyFilterState, useMemo
      AgencyCard.tsx + .module.css
      AgencyGrid.tsx + .module.css        — receives filtered array
      TrustBar.tsx + .module.css
    ui/
      Button.tsx + .module.css
      TierBadge.tsx + .module.css         — 3 variants by tier
      StarRating.tsx + .module.css        — amber star, dark text
      SpecTag.tsx + .module.css           — specialization pill
  app/globals.css, layout.tsx, page.tsx
```

**Critical rules:**
1. `budgetCategory` (string) for filtering — never range math in `filterAgencies`
2. `formatBudgetRange(agency)` for display — never raw `budgetMin`/`budgetMax` in JSX
3. Premier TierBadge: `background: var(--color-amber); color: var(--color-dark)` — NEVER white on amber
4. Featured sort inside `filterAgencies` — not in AgencyFilterBar component
5. Text search: matches `name` OR `tagline`, case-insensitive, trims whitespace before comparing
6. `useMemo` wraps `filterAgencies`
7. ARIA live region for filtered count

**QA checks:**
```bash
grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"          # empty (use formatBudgetRange)
grep -r "color-white.*amber\|white.*color-amber" src/components               # empty
grep -r "border-radius: 50%" src --include="*.module.css"                    # empty
grep -r "font-weight: 700" src --include="*.module.css"                      # empty
grep -r "Space_Grotesk\|Poppins\|DM_Sans" src/app/layout.tsx                # Space_Grotesk present, others empty
```

---

### 4 — v0

Design **AgencyHub** component CSS system — Indian web agency directory. Next.js 14, TypeScript, CSS Modules, no Tailwind.

**Tokens:** `--color-indigo: #4F46E5` + 7 others. Space Grotesk 400/500/600. Zero hex in modules.

**AgencyCard.module.css:**
```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.card:hover {
  box-shadow: 0 4px 24px rgba(79,70,229,0.12);
  border-color: var(--color-indigo);
}
.thumb {
  height: 180px;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
  /* CSS gradient for placeholder — no hex in module */
}
.featuredStrip {
  position: absolute; top: 12px; left: 12px;
  background: var(--color-indigo); color: var(--color-white);
  /* white on indigo = 6.29:1 ✓ */
  font-size: 0.6875rem; font-weight: 600;
  padding: 3px 10px; border-radius: 4px;
  letter-spacing: 0.04em; text-transform: uppercase;
}
.body { padding: 20px; }
.topRow { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.name { font-size: 1.0625rem; font-weight: 600; color: var(--color-dark); }
.tagline { font-size: 0.875rem; color: var(--color-muted); margin: 4px 0 12px; }
.specRow { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.statsRow {
  display: flex; gap: 16px; padding-top: 12px;
  border-top: 1px solid var(--color-border);
  font-size: 0.8125rem; color: var(--color-muted);
}
.statValue { font-weight: 600; color: var(--color-dark); }
.budget { font-size: 0.875rem; font-weight: 600; color: var(--color-indigo); }
/* indigo on white = 6.29:1 ✓ */
```

**TierBadge.module.css:**
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.6875rem; font-weight: 600;
  padding: 3px 9px; border-radius: 4px;
  letter-spacing: 0.03em;
}
.certified {
  color: var(--color-indigo);              /* indigo on white = 6.29:1 ✓ */
  border: 1px solid var(--color-indigo);
  background: transparent;
}
.expert {
  background: var(--color-indigo);
  color: var(--color-white);               /* white on indigo = 6.29:1 ✓ */
  border: 1px solid var(--color-indigo);
}
.premier {
  background: var(--color-amber);
  color: var(--color-dark);               /* dark on amber = 6.31:1 ✓ */
  border: 1px solid var(--color-amber);
}
/* CRITICAL: .premier NEVER sets color: var(--color-white) — white on amber = 2.99:1 ✗ */
```

**AgencyFilterBar.module.css:**
```css
.bar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky; top: 64px; z-index: 90;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}
.inner {
  max-width: 1200px; margin: 0 auto; padding: 14px 24px;
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}
.searchInput {
  flex: 1; min-width: 200px;
  border: 1.5px solid var(--color-border); border-radius: 8px;
  padding: 9px 14px 9px 36px;           /* left padding for search icon */
  font-family: var(--font-sans); font-size: 0.9375rem; color: var(--color-dark);
}
.searchInput:focus { outline: none; border-color: var(--color-indigo); }
.searchWrapper { position: relative; flex: 1; min-width: 200px; }
.searchIcon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--color-muted); }
.select {
  border: 1.5px solid var(--color-border); border-radius: 8px;
  padding: 9px 32px 9px 12px; font-family: var(--font-sans);
  font-size: 0.875rem; color: var(--color-dark); background: var(--color-white);
  appearance: none; cursor: pointer;
}
.select:focus { outline: none; border-color: var(--color-indigo); }
.chip {
  border: 1.5px solid var(--color-border); border-radius: 20px;
  padding: 6px 14px; font-family: var(--font-sans);
  font-size: 0.8125rem; font-weight: 500; cursor: pointer;
  background: var(--color-white); color: var(--color-dark);
}
.chipActive {
  background: var(--color-indigo); color: var(--color-white);
  border-color: var(--color-indigo);
}
/* white on indigo = 6.29:1 ✓ */
```

---

### 5 — Claude Artifacts

Build **AgencyHub** — production-quality Indian web agency directory — Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Space Grotesk 400/500/600.

**Four defining constraints for this build:**

**Constraint 1 — `budgetCategory` for filtering, `formatBudgetRange` for display:**
`Agency` has two budget fields serving distinct purposes:
```typescript
budgetCategory: BudgetRange   // 'Under ₹2L' | '₹2L–₹10L' | '₹10L–₹50L' | '₹50L+'
budgetMin: number             // for formatBudgetRange display only
budgetMax: number | null      // for formatBudgetRange display only
```
Filter: `if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false`
Display: `{formatBudgetRange(agency)}` → `'₹2L – ₹10L'`

Never use `budgetMin`/`budgetMax` for filtering. Never use raw numbers in JSX price display.

**Constraint 2 — Text search matches name AND tagline:**
```typescript
if (filters.search.trim()) {
  const q = filters.search.toLowerCase()
  // OR condition — matches either field
  if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
}
```
Both fields must be searched. An agency should surface on a partial name match OR partial tagline match.

**Constraint 3 — Featured sort is inside `filterAgencies`, not in the component:**
```typescript
export function filterAgencies(agencies: Agency[], filters: AgencyFilterState): Agency[] {
  const result = agencies.filter(/* ...5 conditions... */)
  // Sort: featured first — stable, preserves order within groups
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}
```
`AgencyFilterBar` calls `filterAgencies` and renders the result. It does not sort the result itself. The sort is encapsulated in the utility.

**Constraint 4 — Amber badge must use dark text:**
```css
/* TierBadge.module.css */
.premier { background: var(--color-amber); color: var(--color-dark); }
/* dark on amber = 6.31:1 ✓ — white on amber = 2.99:1 ✗ FORBIDDEN */
```

**Complete type system:**
```typescript
export type AgencyTier    = 'Certified' | 'Expert' | 'Premier'
export type Specialization = 'E-commerce' | 'SaaS' | 'Marketing Sites' | 'Portfolio' | 'Enterprise' | 'Startup'
export type TeamSize      = '1–5' | '6–15' | '16–50' | '50+'
export type BudgetRange   = 'Under ₹2L' | '₹2L–₹10L' | '₹10L–₹50L' | '₹50L+'

export interface Agency {
  id: string; name: string; tagline: string; city: string
  tier: AgencyTier; specializations: Specialization[]; teamSize: TeamSize
  budgetCategory: BudgetRange     // filter field
  budgetMin: number; budgetMax: number | null  // display field (formatBudgetRange)
  rating: number; reviewCount: number; projectsCompleted: number
  featured: boolean
}

export interface AgencyFilterState {
  search: string
  specialization: Specialization | ''
  budgetRange: BudgetRange | ''
  city: string
  tier: AgencyTier | ''
}
```

**All QA checks:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"              # empty
grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"          # empty
grep -r "color-white.*amber\|white.*color-amber" src/components              # empty
grep -r "border-radius: 50%" src --include="*.module.css"                   # empty
grep -r "font-weight: 700" src --include="*.module.css"                     # empty
grep -r "useMemo" src/components/home/AgencyFilterBar.tsx                    # present ✓
npm run build
```

---

### 6 — Grok

Generate all source files for **AgencyHub** — Indian web agency directory. Next.js 14, TypeScript strict, CSS Modules. Static export. Space Grotesk 400/500/600.

Generate in order:
1. `src/types/index.ts` — AgencyTier, Specialization, BudgetRange, TeamSize, Agency, AgencyFilterState, TrustStat
2. `src/lib/formatBudgetRange.ts` — `formatBudgetRange(agency): string`
3. `src/lib/filterAgencies.ts` — text search + 4 field filters + featured-first sort
4. `src/lib/data.ts` — AGENCIES (8), SPECIALIZATIONS, BUDGET_RANGES, CITIES, TRUST_STATS
5. `src/app/globals.css` — 8 tokens (indigo brand + amber accent), .sr-only, prefers-reduced-motion
6. `src/app/layout.tsx` — `Space_Grotesk` from `next/font/google`, weights `['400','500','600']`
7. `src/components/ui/Button.tsx + .module.css` — indigo / outlineIndigo / ghost
8. `src/components/ui/TierBadge.tsx + .module.css` — 3 variants (Certified/Expert/Premier)
9. `src/components/ui/StarRating.tsx + .module.css` — amber star icon + dark text
10. `src/components/ui/SpecTag.tsx + .module.css` — specialization pill, surface bg
11. `src/components/layout/SiteNav.tsx + .module.css` — sticky, indigo logo
12. `src/components/layout/Footer.tsx + .module.css` — footer bg
13. `src/components/home/HeroSection.tsx + .module.css`
14. `src/components/home/AgencyCard.tsx + .module.css` — full card with all fields
15. `src/components/home/AgencyGrid.tsx + .module.css` — static, receives filtered array
16. `src/components/home/AgencyFilterBar.tsx + .module.css` — 'use client', useMemo, ARIA live region
17. `src/components/home/TrustBar.tsx + .module.css` — dark bg, Framer Motion stagger
18. `src/app/page.tsx`

**Rules for every file:**
- No hex in `.module.css`; no `font-weight: 700`; no `border-radius: 50%`
- `budgetCategory` for filtering, `formatBudgetRange(agency)` for display — never raw budget numbers in JSX
- Premier badge: `color: var(--color-dark)` — never `color: var(--color-white)` on amber
- Text search: case-insensitive, trims, searches both `name` and `tagline`
- Featured sort inside `filterAgencies` — not in component

---

### 7 — Gemini

**Project:** AgencyHub — Indian web agency directory. Next.js 14 App Router, TypeScript strict, CSS Modules. Static export. Space Grotesk 400/500/600. Framer Motion.

**Design system:**
- `--color-indigo: #4F46E5` — brand; white text = 6.29:1 ✓ AA
- `--color-amber: #D97706` — Premier badge, star icon; dark text = 6.31:1 ✓ AA; white text = 2.99:1 ✗
- `--color-dark: #0F0F23` — body text, near-black
- `--color-surface: #F5F5FF` — blue-tinted page bg, spec tag fills

**Architecture — 5 layers:**

Layer 1 — Foundation: types (AgencyTier, Specialization, BudgetRange, Agency with `budgetCategory`), utilities (`formatBudgetRange`, `filterAgencies`), mock data, globals.css, layout.tsx.

Layer 2 — UI Atoms: Button (indigo / outlineIndigo / ghost), TierBadge (3 variants), StarRating (amber Star icon, dark text), SpecTag (surface bg, border, small pill).

Layer 3 — Layout: SiteNav (indigo `AgencyHub` text logo, "List Your Agency" ghost CTA), Footer (footer bg).

Layer 4 — Hero:
- `HeroSection` — centered layout, headline, subheading, large search bar (full-width input + indigo Search button)
- Hero background: white; large headline uses `clamp(2rem, 5vw, 3.5rem)` font-size

Layer 5 — Filter + Grid + Trust:
- `AgencyFilterBar` (`'use client'`) — search input (Search icon), specialization chips (multi-choice), budget select, city select, tier select, `useMemo` wrapping `filterAgencies`, ARIA live region
- `AgencyCard` — portfolio thumbnail placeholder, featured strip badge, TierBadge, StarRating, name, tagline, SpecTags, stats row (projects + team size + budget via `formatBudgetRange`), "View Agency" CTA
- `AgencyGrid` — 3-col responsive grid, empty state message
- `TrustBar` — dark bg, 4 stats: agencies listed, projects delivered, cities covered, satisfaction rate

**Critical requirements:**
- `filterAgencies(AGENCIES, { search: 'studio', ... })` → matches PixelCraft **Studio** + **Studio**North
- `filterAgencies(AGENCIES, { tier: 'Premier', ... })` → 2 agencies (PixelCraft Studio + Kinetic Digital), featured first
- `formatBudgetRange({ budgetMin: 5000000, budgetMax: null })` → `'₹50L+'`
- Premier TierBadge: amber bg + dark text (never white on amber)

**Framer Motion:**
- AgencyCard: stagger 0.06s per card, `opacity: 0, y: 16 → visible`
- HeroSection: heading `opacity: 0, y: 24 → visible`
- TrustBar stats: stagger 0.1s
- All `viewport={{ once: true }}`

---

### 8 — Cursor

Build **AgencyHub** Indian web agency directory. Next.js 14, TypeScript, CSS Modules. Static export.

**`src/app/layout.tsx`:**
```tsx
import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-sans', display: 'swap',
})
// NOT Poppins, NOT Inter, NOT DM Sans
```

**`src/lib/formatBudgetRange.ts`:**
```typescript
import type { Agency } from '@/types'
export function formatBudgetRange(agency: Agency): string {
  const fmt = (n: number) => n >= 100_000
    ? `₹${(n / 100_000).toFixed(0)}L`
    : `₹${(n / 1_000).toFixed(0)}K`
  if (agency.budgetMax === null) return `${fmt(agency.budgetMin)}+`
  return `${fmt(agency.budgetMin)} – ${fmt(agency.budgetMax)}`
}
// formatBudgetRange({ budgetMin: 200000, budgetMax: 1000000 }) → '₹2L – ₹10L'
// formatBudgetRange({ budgetMin: 5000000, budgetMax: null })   → '₹50L+'
```

**`src/lib/filterAgencies.ts`:**
```typescript
import type { Agency, AgencyFilterState } from '@/types'
export function filterAgencies(agencies: Agency[], filters: AgencyFilterState): Agency[] {
  const result = agencies.filter(a => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
    }
    if (filters.specialization && !a.specializations.includes(filters.specialization)) return false
    if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
    if (filters.city && a.city !== filters.city) return false
    if (filters.tier && a.tier !== filters.tier) return false
    return true
  })
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}
```

**`AgencyFilterBar.tsx` (filter + grid boundary):**
```tsx
'use client'
import { useState, useMemo } from 'react'
import type { AgencyFilterState, Agency } from '@/types'
import { filterAgencies } from '@/lib/filterAgencies'
import { AGENCIES, SPECIALIZATIONS, BUDGET_RANGES, CITIES } from '@/lib/data'
import AgencyGrid from './AgencyGrid'
import styles from './AgencyFilterBar.module.css'

const INITIAL: AgencyFilterState = {
  search: '', specialization: '', budgetRange: '', city: '', tier: '',
}

export default function AgencyFilterBar() {
  const [filters, setFilters] = useState<AgencyFilterState>(INITIAL)
  const filtered = useMemo(() => filterAgencies(AGENCIES, filters), [filters])
  const count = filtered.length

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.inner}>
          <div className={styles.searchWrapper}>
            {/* Search icon — lucide Search */}
            <input
              type="search" className={styles.searchInput}
              placeholder="Search agencies..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              aria-label="Search agencies by name or specialisation"
            />
          </div>
          {/* Specialization chips, budget select, city select, tier select */}
          {/* ... */}
        </div>
      </div>
      <div aria-live="polite" className="sr-only">{count} agencies found</div>
      <AgencyGrid agencies={filtered} />
    </>
  )
}
```

**`AgencyCard.tsx` (budget pattern):**
```tsx
<span className={styles.budget}>{formatBudgetRange(agency)}</span>
{/* formatBudgetRange encapsulates all budget display — never raw agency.budgetMin */}
```

**`TierBadge.tsx`:**
```tsx
const CLASS_MAP: Record<AgencyTier, string> = {
  Certified: styles.certified,
  Expert:    styles.expert,
  Premier:   styles.premier,
}
// .certified { color: var(--color-indigo); border: 1px solid var(--color-indigo); }
// .expert    { background: var(--color-indigo); color: var(--color-white); }
// .premier   { background: var(--color-amber); color: var(--color-dark); }
// CRITICAL: .premier uses var(--color-dark) — NEVER var(--color-white) on amber (2.99:1 ✗)
```

**Forbidden patterns:**
```bash
grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"   # empty
grep -r "color-white.*amber" src/components                            # empty
grep -r "border-radius: 50%" src --include="*.module.css"             # empty
grep -r "font-weight: 700" src --include="*.module.css"               # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"       # empty
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
