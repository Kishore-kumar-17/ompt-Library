# 02 — Architecture
## Indian Web Agency Directory · bw_service_02

---

## TypeScript Types

```typescript
// src/types/index.ts

export type AgencyTier     = 'Certified' | 'Expert' | 'Premier'
export type Specialization = 'E-commerce' | 'SaaS' | 'Marketing Sites' | 'Portfolio' | 'Enterprise' | 'Startup'
export type TeamSize       = '1–5' | '6–15' | '16–50' | '50+'
export type BudgetRange    = 'Under ₹2L' | '₹2L–₹10L' | '₹10L–₹50L' | '₹50L+'

export interface Agency {
  id: string
  name: string
  tagline: string
  city: string
  tier: AgencyTier
  specializations: Specialization[]
  teamSize: TeamSize
  budgetCategory: BudgetRange    // filter field — O(1) string compare
  budgetMin: number              // display field — pass to formatBudgetRange only
  budgetMax: number | null       // null = unlimited
  rating: number
  reviewCount: number
  projectsCompleted: number
  featured: boolean
}

export interface AgencyFilterState {
  search: string
  specialization: Specialization | ''
  budgetRange: BudgetRange | ''
  city: string
  tier: AgencyTier | ''
}

export interface TrustStat {
  id: string
  icon: string
  value: string
  label: string
}
```

---

## Mock Data

```typescript
// src/lib/data.ts
import type { Agency, TrustStat } from '@/types'

export const AGENCIES: Agency[] = [
  {
    id: 'ag-01',
    name: 'PixelCraft Studio',
    tagline: 'Award-winning e-commerce and SaaS experiences for Indian brands',
    city: 'Mumbai',
    tier: 'Premier',
    specializations: ['E-commerce', 'SaaS'],
    teamSize: '16–50',
    budgetCategory: '₹10L–₹50L',
    budgetMin: 1_000_000,
    budgetMax: 5_000_000,
    rating: 4.9,
    reviewCount: 47,
    projectsCompleted: 85,
    featured: true,
  },
  {
    id: 'ag-02',
    name: 'WebForge India',
    tagline: 'Fast, scalable SaaS products and startup MVPs',
    city: 'Bangalore',
    tier: 'Expert',
    specializations: ['SaaS', 'Startup'],
    teamSize: '6–15',
    budgetCategory: '₹2L–₹10L',
    budgetMin: 200_000,
    budgetMax: 1_000_000,
    rating: 4.7,
    reviewCount: 31,
    projectsCompleted: 62,
    featured: true,
  },
  {
    id: 'ag-03',
    name: 'Kinetic Digital',
    tagline: 'Enterprise digital transformation and large-scale e-commerce platforms',
    city: 'Hyderabad',
    tier: 'Premier',
    specializations: ['Enterprise', 'E-commerce'],
    teamSize: '50+',
    budgetCategory: '₹50L+',
    budgetMin: 5_000_000,
    budgetMax: null,
    rating: 4.8,
    reviewCount: 22,
    projectsCompleted: 38,
    featured: true,
  },
  {
    id: 'ag-04',
    name: 'DesignAxis',
    tagline: 'High-conversion marketing sites and portfolio builds for growing brands',
    city: 'Delhi',
    tier: 'Expert',
    specializations: ['Marketing Sites', 'Portfolio'],
    teamSize: '6–15',
    budgetCategory: '₹10L–₹50L',
    budgetMin: 1_000_000,
    budgetMax: 5_000_000,
    rating: 4.6,
    reviewCount: 58,
    projectsCompleted: 110,
    featured: false,
  },
  {
    id: 'ag-05',
    name: 'BuildRight Co',
    tagline: 'Portfolio websites and marketing pages built fast and right',
    city: 'Pune',
    tier: 'Certified',
    specializations: ['Portfolio', 'Marketing Sites'],
    teamSize: '6–15',
    budgetCategory: '₹2L–₹10L',
    budgetMin: 200_000,
    budgetMax: 1_000_000,
    rating: 4.3,
    reviewCount: 24,
    projectsCompleted: 41,
    featured: false,
  },
  {
    id: 'ag-06',
    name: 'StudioNorth',
    tagline: 'SaaS product design and enterprise-grade web applications',
    city: 'Chennai',
    tier: 'Expert',
    specializations: ['SaaS', 'Enterprise'],
    teamSize: '16–50',
    budgetCategory: '₹10L–₹50L',
    budgetMin: 1_000_000,
    budgetMax: 5_000_000,
    rating: 4.5,
    reviewCount: 19,
    projectsCompleted: 29,
    featured: false,
  },
  {
    id: 'ag-07',
    name: 'CreativeBloc',
    tagline: 'Affordable marketing sites and portfolio pages for small businesses',
    city: 'Kolkata',
    tier: 'Certified',
    specializations: ['Marketing Sites', 'Portfolio'],
    teamSize: '1–5',
    budgetCategory: 'Under ₹2L',
    budgetMin: 50_000,
    budgetMax: 200_000,
    rating: 4.2,
    reviewCount: 37,
    projectsCompleted: 73,
    featured: false,
  },
  {
    id: 'ag-08',
    name: 'AppMade',
    tagline: 'Startup MVPs and e-commerce launches, delivered in 6 weeks',
    city: 'Bangalore',
    tier: 'Certified',
    specializations: ['Startup', 'E-commerce'],
    teamSize: '6–15',
    budgetCategory: '₹2L–₹10L',
    budgetMin: 200_000,
    budgetMax: 1_000_000,
    rating: 4.4,
    reviewCount: 28,
    projectsCompleted: 55,
    featured: false,
  },
]

export const SPECIALIZATIONS: Array<{ value: string; label: string }> = [
  { value: '',              label: 'All Specialisations' },
  { value: 'E-commerce',   label: 'E-commerce' },
  { value: 'SaaS',         label: 'SaaS' },
  { value: 'Marketing Sites', label: 'Marketing Sites' },
  { value: 'Portfolio',    label: 'Portfolio' },
  { value: 'Enterprise',   label: 'Enterprise' },
  { value: 'Startup',      label: 'Startup' },
]

export const BUDGET_RANGES: Array<{ value: string; label: string }> = [
  { value: '',             label: 'Any Budget' },
  { value: 'Under ₹2L',   label: 'Under ₹2L' },
  { value: '₹2L–₹10L',   label: '₹2L–₹10L' },
  { value: '₹10L–₹50L',  label: '₹10L–₹50L' },
  { value: '₹50L+',       label: '₹50L+' },
]

export const CITIES: string[] = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata',
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Building2',    value: '500+',  label: 'Agencies Listed' },
  { id: 'ts2', icon: 'Briefcase',    value: '12,000+', label: 'Projects Delivered' },
  { id: 'ts3', icon: 'MapPin',       value: '50+',   label: 'Cities Covered' },
  { id: 'ts4', icon: 'ThumbsUp',     value: '98%',   label: 'Client Satisfaction' },
]
```

---

## Filter Results (acceptance criteria)

Using `filterAgencies(AGENCIES, filters)`:

| Filter | Matching IDs | Count | Featured-first order |
|--------|-------------|-------|----------------------|
| `{}` (no filters) | all 8 | 8 | ag-01, ag-02, ag-03, then ag-04–ag-08 |
| `{ specialization: 'SaaS' }` | ag-01, ag-02, ag-06 | 3 | ag-01, ag-02, ag-06 |
| `{ tier: 'Premier' }` | ag-01, ag-03 | 2 | ag-01, ag-03 |
| `{ budgetRange: '₹2L–₹10L' }` | ag-02, ag-05, ag-08 | 3 | ag-02, then ag-05, ag-08 |
| `{ city: 'Bangalore' }` | ag-02, ag-08 | 2 | ag-02, ag-08 |
| `{ search: 'studio' }` | ag-01 (name), ag-06 (name) | 2 | ag-01, ag-06 |
| `{ search: 'saas', specialization: 'SaaS' }` | ag-01, ag-02, ag-06 | 3 | ag-01, ag-02, ag-06 |
| `{ tier: 'Certified', city: 'Bangalore' }` | ag-08 | 1 | ag-08 |

---

## Utility Functions

```typescript
// src/lib/formatBudgetRange.ts
import type { Agency } from '@/types'

export function formatBudgetRange(agency: Agency): string {
  const fmt = (n: number): string => {
    if (n >= 100_000) return `₹${(n / 100_000).toFixed(0)}L`
    return `₹${(n / 1_000).toFixed(0)}K`
  }
  if (agency.budgetMax === null) return `${fmt(agency.budgetMin)}+`
  return `${fmt(agency.budgetMin)} – ${fmt(agency.budgetMax)}`
}

// formatBudgetRange(AGENCIES[6]) → '₹50K – ₹2L'   (CreativeBloc)
// formatBudgetRange(AGENCIES[0]) → '₹10L – ₹50L'  (PixelCraft Studio)
// formatBudgetRange(AGENCIES[2]) → '₹50L+'         (Kinetic Digital)


// src/lib/filterAgencies.ts
import type { Agency, AgencyFilterState } from '@/types'

export function filterAgencies(
  agencies: Agency[],
  filters: AgencyFilterState
): Agency[] {
  const result = agencies.filter(a => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
    }
    if (filters.specialization && !a.specializations.includes(filters.specialization as any)) return false
    if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
    if (filters.city && a.city !== filters.city) return false
    if (filters.tier && a.tier !== filters.tier) return false
    return true
  })
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}
```

---

## Component Map

```
src/
  app/
    layout.tsx              ← Space_Grotesk, --font-sans
    page.tsx                ← Server Component
    globals.css             ← 8 tokens + .sr-only + prefers-reduced-motion
  components/
    layout/
      SiteNav.tsx           ← 'use client', scroll shadow, indigo logo
      Footer.tsx            ← footer bg
    home/
      HeroSection.tsx       ← static, centered search bar
      AgencyFilterBar.tsx   ← 'use client', AgencyFilterState, useMemo, renders AgencyGrid
      AgencyGrid.tsx        ← static, receives Agency[], renders AgencyCard list
      AgencyCard.tsx        ← static, TierBadge + StarRating + SpecTags + formatBudgetRange
      TrustBar.tsx          ← 'use client' (Framer Motion), dark bg
    ui/
      Button.tsx            ← indigo / outlineIndigo / ghost
      TierBadge.tsx         ← CLASS_MAP for 3 tier variants
      StarRating.tsx        ← amber Star icon (decorative) + dark rating + muted count
      SpecTag.tsx           ← specialization pill, surface bg
  lib/
    formatBudgetRange.ts
    filterAgencies.ts
    data.ts
  types/
    index.ts
```

---

## Initial Filter State

```typescript
export const INITIAL_FILTERS: AgencyFilterState = {
  search: '',
  specialization: '',
  budgetRange: '',
  city: '',
  tier: '',
}
```

All empty. `filterAgencies(AGENCIES, INITIAL_FILTERS)` returns all 8 agencies, featured first.
