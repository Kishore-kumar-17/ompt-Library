# 06 — Tasks
## Indian Web Agency Directory · bw_service_02

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest agencyhub --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

`next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`

---

## TASK-002 — TypeScript Types

**File:** `src/types/index.ts` — see `02_Architecture.md` for full listing.

Key differences from all prior builds:
- `Agency` has `budgetCategory: BudgetRange` (filter) AND `budgetMin/budgetMax` (display) — two separate purposes
- `AgencyFilterState` has `search: string` — first text-search field in the library
- `AgencyTier` union drives a 3-variant badge system with distinct contrast rules per tier

---

## TASK-003 — Utilities

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

// src/lib/filterAgencies.ts
import type { Agency, AgencyFilterState, Specialization } from '@/types'

export function filterAgencies(
  agencies: Agency[],
  filters: AgencyFilterState
): Agency[] {
  const result = agencies.filter(a => {
    // Text search: OR across name + tagline, case-insensitive, trim
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase()
      if (
        !a.name.toLowerCase().includes(q) &&
        !a.tagline.toLowerCase().includes(q)
      ) return false
    }
    // Specialization: array includes
    if (
      filters.specialization &&
      !a.specializations.includes(filters.specialization as Specialization)
    ) return false
    // Budget: pre-computed budgetCategory string compare (O(1))
    if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
    // City: exact match
    if (filters.city && a.city !== filters.city) return false
    // Tier: exact match
    if (filters.tier && a.tier !== filters.tier) return false
    return true
  })
  // Featured sort: encapsulated here — NOT in the component
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}
```

---

## TASK-004 — globals.css + layout.tsx

```css
/* globals.css */
:root {
  --color-indigo:  #4F46E5;
  --color-amber:   #D97706;
  --color-dark:    #0F0F23;
  --color-white:   #FFFFFF;
  --color-surface: #F5F5FF;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #070715;
  --radius-card:   12px;
}
```

```tsx
// layout.tsx
import { Space_Grotesk } from 'next/font/google'
// NOTE: Space_Grotesk — not Inter, Poppins, DM Sans, or Plus Jakarta Sans
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],  // no '700'
  variable: '--font-sans',
  display: 'swap',
})
```

---

## TASK-005 — UI Atoms

### TierBadge.tsx
```tsx
import type { AgencyTier } from '@/types'
import styles from './TierBadge.module.css'

const CLASS_MAP: Record<AgencyTier, string> = {
  Certified: styles.certified,
  Expert:    styles.expert,
  Premier:   styles.premier,
}

export default function TierBadge({ tier }: { tier: AgencyTier }) {
  return (
    <span className={`${styles.badge} ${CLASS_MAP[tier]}`}>
      {tier}
    </span>
  )
}
// .certified { color: var(--color-indigo); border: 1px solid var(--color-indigo); }
// .expert    { background: var(--color-indigo); color: var(--color-white); }  /* 6.29:1 ✓ */
// .premier   { background: var(--color-amber); color: var(--color-dark); }    /* 6.30:1 ✓ */
// CRITICAL: .premier NEVER uses color: var(--color-white) — white on amber = 2.99:1 ✗
```

### StarRating.tsx
```tsx
import { Star } from 'lucide-react'
import styles from './StarRating.module.css'

interface Props { rating: number; reviewCount: number }

export default function StarRating({ rating, reviewCount }: Props) {
  return (
    <span className={styles.rating}>
      <Star size={14} className={styles.star} aria-hidden="true" />
      {/* amber star is decorative — rating number is the accessible value */}
      <span className={styles.value}>{rating.toFixed(1)}</span>
      <span className={styles.count}>({reviewCount} reviews)</span>
    </span>
  )
}
// .star  { color: var(--color-amber); }
// .value { color: var(--color-dark); font-weight: 600; }
// .count { color: var(--color-muted); }
```

### SpecTag.tsx
```tsx
import styles from './SpecTag.module.css'
export default function SpecTag({ text }: { text: string }) {
  return <span className={styles.tag}>{text}</span>
}
// .tag { background: var(--color-surface); color: var(--color-dark); border: 1px solid var(--color-border); }
```

---

## TASK-006 — SiteNav

```tsx
'use client'
// Logo: color: var(--color-indigo) — "AgencyHub" text in indigo on white nav = 6.29:1 ✓
// "List Your Agency": <Button variant="outlineIndigo" size="sm">List Your Agency</Button>
// Scroll shadow: useEffect on window.scroll
// <nav aria-label="Main navigation">
```

---

## TASK-007 — HeroSection

```tsx
// src/components/home/HeroSection.tsx — static
import Button from '@/components/ui/Button'
import { Search } from 'lucide-react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          Find the Right Web Agency for Your Business
        </h1>
        <p className={styles.subheading}>
          Browse 500+ verified Indian web design and development agencies — filtered by
          specialisation, budget, and city.
        </p>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} aria-hidden="true" />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search by agency name or specialisation..."
            aria-label="Search agencies"
          />
          <Button variant="indigo" size="md">Search Agencies</Button>
        </div>
      </div>
    </section>
  )
}
// .hero { background: var(--color-white); padding: 80px 24px 60px; }
// .heading { font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 600; text-align: center; }
```

---

## TASK-008 — AgencyCard

```tsx
// src/components/home/AgencyCard.tsx — static
import type { Agency } from '@/types'
import { formatBudgetRange } from '@/lib/formatBudgetRange'
import TierBadge from '@/components/ui/TierBadge'
import StarRating from '@/components/ui/StarRating'
import SpecTag from '@/components/ui/SpecTag'
import Button from '@/components/ui/Button'
import styles from './AgencyCard.module.css'

export default function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <article className={styles.card}>
      {/* Portfolio thumbnail */}
      <div className={styles.imageBlock}>
        {/* Featured strip — conditional JSX, not CSS display */}
        {agency.featured && (
          <span className={styles.featuredStrip} aria-label="Featured agency">
            Featured
          </span>
        )}
      </div>

      <div className={styles.body}>
        {/* Top row: TierBadge + StarRating */}
        <div className={styles.topRow}>
          <TierBadge tier={agency.tier} />
          <StarRating rating={agency.rating} reviewCount={agency.reviewCount} />
        </div>

        <h3 className={styles.name}>{agency.name}</h3>
        <p className={styles.tagline}>{agency.tagline}</p>

        {/* Specialization tags */}
        <div className={styles.specRow}>
          {agency.specializations.map(s => (
            <SpecTag key={s} text={s} />
          ))}
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <span>
            <span className={styles.statValue}>{agency.projectsCompleted}</span> projects
          </span>
          <span>
            <span className={styles.statValue}>{agency.teamSize}</span> team
          </span>
          <span>
            <span className={styles.budgetLine}>{formatBudgetRange(agency)}</span>
            {/* formatBudgetRange — never raw agency.budgetMin in JSX */}
          </span>
        </div>

        <div className={styles.cta}>
          <Button variant="outlineIndigo" size="sm" fullWidth>
            View Agency
          </Button>
        </div>
      </div>
    </article>
  )
}
```

---

## TASK-009 — AgencyGrid

```tsx
// src/components/home/AgencyGrid.tsx — static server component
import type { Agency } from '@/types'
import AgencyCard from './AgencyCard'
import styles from './AgencyGrid.module.css'

export default function AgencyGrid({ agencies }: { agencies: Agency[] }) {
  if (agencies.length === 0) {
    return (
      <div className={styles.grid}>
        <p className={styles.empty}>
          No agencies match your search. Try adjusting your filters.
        </p>
      </div>
    )
  }
  return (
    <div className={styles.grid}>
      {agencies.map(a => (
        <AgencyCard key={a.id} agency={a} />
      ))}
    </div>
  )
}
```

---

## TASK-010 — AgencyFilterBar

```tsx
// src/components/home/AgencyFilterBar.tsx
'use client'
import { useState, useMemo } from 'react'
import type { AgencyFilterState, Specialization, BudgetRange, AgencyTier } from '@/types'
import { filterAgencies } from '@/lib/filterAgencies'
import { AGENCIES, SPECIALIZATIONS, BUDGET_RANGES, CITIES } from '@/lib/data'
import AgencyGrid from './AgencyGrid'
import { Search } from 'lucide-react'
import styles from './AgencyFilterBar.module.css'

const INITIAL: AgencyFilterState = {
  search: '', specialization: '', budgetRange: '', city: '', tier: '',
}

const TIERS: Array<{ value: string; label: string }> = [
  { value: '',          label: 'All Tiers' },
  { value: 'Certified', label: 'Certified' },
  { value: 'Expert',    label: 'Expert' },
  { value: 'Premier',   label: 'Premier' },
]

export default function AgencyFilterBar() {
  const [filters, setFilters] = useState<AgencyFilterState>(INITIAL)

  // useMemo — filterAgencies result; AGENCIES is stable import
  const filtered = useMemo(() => filterAgencies(AGENCIES, filters), [filters])
  const count = filtered.length

  function set<K extends keyof AgencyFilterState>(key: K, value: AgencyFilterState[K]) {
    setFilters(f => ({ ...f, [key]: value }))
  }

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.inner}>

          {/* Text search */}
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search agencies..."
              value={filters.search}
              onChange={e => set('search', e.target.value)}
              aria-label="Search agencies by name or specialisation"
            />
          </div>

          {/* Specialization chips */}
          {SPECIALIZATIONS.map(spec => (
            <button
              key={spec.value}
              className={`${styles.chip} ${filters.specialization === spec.value ? styles.chipActive : ''}`}
              onClick={() => set('specialization', filters.specialization === spec.value ? '' : spec.value as Specialization | '')}
              aria-pressed={filters.specialization === spec.value}
            >
              {spec.label}
            </button>
          ))}

          {/* Budget select */}
          <select
            className={styles.select}
            value={filters.budgetRange}
            onChange={e => set('budgetRange', e.target.value as BudgetRange | '')}
            aria-label="Filter by budget range"
          >
            {BUDGET_RANGES.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>

          {/* City select */}
          <select
            className={styles.select}
            value={filters.city}
            onChange={e => set('city', e.target.value)}
            aria-label="Filter by city"
          >
            <option value="">All Cities</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Tier select */}
          <select
            className={styles.select}
            value={filters.tier}
            onChange={e => set('tier', e.target.value as AgencyTier | '')}
            aria-label="Filter by tier"
          >
            {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          {/* Clear */}
          <button className={styles.clearBtn} onClick={() => setFilters(INITIAL)}>
            Clear filters
          </button>
        </div>
      </div>

      {/* ARIA live region */}
      <div aria-live="polite" className="sr-only">{count} agencies found</div>

      {/* AgencyGrid — receives sorted + filtered array */}
      <AgencyGrid agencies={filtered} />
    </>
  )
}
```

---

## TASK-011 — TrustBar

```tsx
'use client'
import { motion } from 'framer-motion'
import { Building2, Briefcase, MapPin, ThumbsUp, type LucideIcon } from 'lucide-react'
import { TRUST_STATS } from '@/lib/data'
import styles from './TrustBar.module.css'

const ICON_MAP: Record<string, LucideIcon> = { Building2, Briefcase, MapPin, ThumbsUp }

export default function TrustBar() {
  return (
    <section className={styles.section} aria-label="Platform statistics">
      {/* .section { background: var(--color-footer); } */}
      <div className={styles.inner}>
        {TRUST_STATS.map((stat, i) => {
          const Icon = ICON_MAP[stat.icon]
          return (
            <motion.div
              key={stat.id}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Icon size={28} className={styles.icon} aria-hidden="true" />
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
// .section { background: var(--color-footer); padding: 60px 24px; }
// .icon, .value, .label { color: var(--color-white); }
// white on footer (#070715) ≈ 19:1 ✓✓
```

---

## TASK-012 — QA Grep Suite

```bash
echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

echo "=== No hex in module CSS ===" && \
  grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No font-weight 700 ===" && \
  grep -r "font-weight: 700" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No circular radius ===" && \
  grep -r "border-radius: 50%" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No white on amber ===" && \
  grep -r "color-white" src/components/ui/TierBadge.module.css && echo "FAIL" || echo "PASS"

echo "=== No raw budget in component JSX ===" && \
  grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx" && echo "FAIL" || echo "PASS"

echo "=== useMemo in AgencyFilterBar ===" && \
  grep -r "useMemo" src/components/home/AgencyFilterBar.tsx && echo "PASS" || echo "FAIL"

echo "=== No sort in AgencyFilterBar ===" && \
  grep -r "\.sort(" src/components/home/AgencyFilterBar.tsx && echo "FAIL" || echo "PASS"

echo "=== filterAgencies has sort ===" && \
  grep -r "\.sort(" src/lib/filterAgencies.ts && echo "PASS" || echo "FAIL"

echo "=== Space Grotesk in layout ===" && \
  grep -r "Space_Grotesk" src/app/layout.tsx && echo "PASS" || echo "FAIL"

echo "=== No other fonts in layout ===" && \
  grep -r "Inter\b\|Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx \
  && echo "FAIL — wrong font" || echo "PASS"

echo "=== Build ===" && npm run build && echo "PASS"
```
