# 06 — Tasks
## Global Hospital Authority Portal · bw_clinic_03

---

## Task Index

| ID | Title | Day | Depends On |
|----|-------|-----|------------|
| TASK-001 | Scaffold Next.js project | 1 | — |
| TASK-002 | Install dependencies | 1 | TASK-001 |
| TASK-003 | Static export config | 1 | TASK-001 |
| TASK-004 | TypeScript types | 1 | TASK-001 |
| TASK-005 | Mock data | 1 | TASK-004 |
| TASK-006 | Filter utilities | 1 | TASK-004 |
| TASK-007 | Global CSS tokens | 1 | TASK-001 |
| TASK-008 | Root layout + Roboto font | 1 | TASK-007 |
| TASK-009 | Button component (3 variants) | 1 | TASK-007 |
| TASK-010 | TopBar | 1 | TASK-007 |
| TASK-011 | SiteNav | 1 | TASK-009 |
| TASK-012 | HeroSearch | 2 | TASK-007 |
| TASK-013 | OutcomesStrip | 2 | TASK-005 |
| TASK-014 | ConditionBrowser | 2 | TASK-005 |
| TASK-015 | AppointmentBadge | 3 | TASK-004 |
| TASK-016 | AcceptingBadge | 3 | TASK-004 |
| TASK-017 | ProviderCard | 3 | TASK-005, TASK-009, TASK-015, TASK-016 |
| TASK-018 | ProviderSearch | 3 | TASK-006, TASK-017 |
| TASK-019 | HealthLibraryPreview | 4 | TASK-005 |
| TASK-020 | AppointmentBanner | 4 | TASK-009 |
| TASK-021 | Footer | 4 | TASK-007 |
| TASK-022 | Framer Motion entrances | 4 | All sections |
| TASK-023 | QA pass | 4 | All tasks |

---

## TASK-001 — Scaffold

```bash
npx create-next-app@latest carecompass \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd carecompass
```

---

## TASK-002 — Install dependencies

```bash
npm install framer-motion lucide-react
```

---

## TASK-003 — Static export config

**File:** `next.config.ts`

```typescript
import type { NextConfig } from 'next'
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```

---

## TASK-004 — TypeScript types

**File:** `src/types/index.ts`

```typescript
export type AppointmentType = 'in-person' | 'virtual' | 'second-opinion'
export type AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'
export type ConditionCategory =
  | 'heart-vascular' | 'cancer' | 'brain-spine' | 'digestive'
  | 'orthopedics' | 'lung' | 'kidney-urinary' | 'endocrine'

export interface ProviderLocation {
  name: string
  city: string
}

export interface Provider {
  id: string
  name: string
  credentials: string
  specialty: string
  subspecialties: string[]
  conditionsTreated: string[]
  locations: ProviderLocation[]
  languages: string[]
  rating: number
  reviewCount: number
  photo: string
  appointmentTypes: AppointmentType[]
  acceptingStatus: AcceptingStatus
}

export interface Condition {
  id: string
  name: string
  category: ConditionCategory
  articleCount: number
}

export interface OutcomeMetric {
  id: string
  label: string
  value: string
  context: string
}

export interface HealthArticle {
  id: string
  title: string
  category: string
  readTimeMinutes: number
}
```

**Acceptance:** `tsc --noEmit` exits 0.

---

## TASK-005 — Mock data

**File:** `src/lib/data.ts`

Copy all four arrays from `02_Architecture.md`. Verify:
- 8 providers — acceptingStatus: 3 accepting, 3 limited, 2 not-accepting
- 8 conditions — one per ConditionCategory
- 5 outcomeMetrics
- 6 healthArticles

---

## TASK-006 — Filter utilities

**File:** `src/lib/filterProviders.ts`

```typescript
import { Provider, AppointmentType } from '@/types'

export function filterProviders(
  providers: Provider[],
  query: string,
  city: string,
  apptType: AppointmentType | ''
): Provider[] {
  return providers.filter(p => {
    if (query) {
      const q = query.toLowerCase()
      const matchName      = p.name.toLowerCase().includes(q)
      const matchSpecialty = p.specialty.toLowerCase().includes(q)
      const matchCondition = p.conditionsTreated.some(c => c.toLowerCase().includes(q))
      if (!matchName && !matchSpecialty && !matchCondition) return false
    }
    if (city && !p.locations.some(l => l.city === city)) return false
    if (apptType && !p.appointmentTypes.includes(apptType)) return false
    return true
  })
}

export function getUniqueCities(providers: Provider[]): string[] {
  return [...new Set(providers.flatMap(p => p.locations.map(l => l.city)))].sort()
}
```

---

## TASK-007 — Global CSS tokens

**File:** `src/app/globals.css`

8 tokens + `.sr-only` + prefers-reduced-motion block.

**Verify:** `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty.

---

## TASK-008 — Root layout + Roboto

**File:** `src/app/layout.tsx`

```typescript
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],  // ONLY these two weights
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Acceptance:** Computed font-family shows Roboto. No Lato, no Nunito Sans.

---

## TASK-009 — Button component

**Files:** `src/components/ui/Button.tsx`, `Button.module.css`

```typescript
interface Props {
  variant: 'primary' | 'outlineWhite' | 'outlineBlue'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
}
```

CSS critical rules:
```css
.btn { border-radius: 4px; }
.primary     { background: var(--color-blue);  color: var(--color-white); }
.outlineWhite{ background: transparent; color: var(--color-white); border: 1.5px solid var(--color-white); }
.outlineBlue { background: transparent; color: var(--color-blue);  border: 1.5px solid var(--color-blue); }
```

**Acceptance:** DevTools confirms `.primary` has `color: rgb(255,255,255)` (white).

---

## TASK-010 — TopBar

**Files:** `src/components/layout/TopBar.tsx`, `TopBar.module.css`

No `'use client'`. Server component.

```tsx
<header className={styles.topbar} role="banner">
  <div className={styles.inner}>
    <a href="tel:8002232273" className={styles.phone}>800.223.2273</a>
    <nav className={styles.links} aria-label="Utility navigation">
      <a href="#" className={styles.link}>MyChart Login</a>
      <span className={styles.divider} aria-hidden="true" />
      <a href="#" className={styles.link}>Need Help?</a>
    </nav>
  </div>
</header>
```

**Acceptance:**
- Navy bg (`rgb(0,48,135)`)
- 40px height
- No `'use client'`
- Phone as `tel:` link

---

## TASK-011 — SiteNav

**Files:** `src/components/layout/SiteNav.tsx`, `SiteNav.module.css`

No `'use client'`. Server component.

```tsx
import { Search } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

<nav className={styles.nav} role="navigation" aria-label="Main navigation">
  <div className={styles.inner}>
    <Link href="/" className={styles.logo}>CareCompass</Link>
    <ul className={styles.links}>
      <li><Link href="#provider-section" className={styles.link}>Find a Provider</Link></li>
      <li><Link href="#" className={styles.link}>Health Library</Link></li>
      <li><Link href="#" className={styles.link}>Conditions</Link></li>
      <li><Link href="#" className={styles.link}>Appointments</Link></li>
    </ul>
    <div className={styles.rightGroup}>
      <Search size={20} className={styles.searchIcon} aria-label="Search" />
      <Button variant="primary" size="sm" href="#">Schedule Now</Button>
    </div>
  </div>
</nav>
```

**Acceptance:**
- White bg, sticky `top: 0`, `z-index: 100`
- Border-bottom only (no shadow)
- "Schedule Now": primary button, `border-radius: 4px`, white text
- No `'use client'`

---

## TASK-012 — HeroSearch

**Files:** `src/components/home/HeroSearch.tsx`, `HeroSearch.module.css`

`'use client'`.

```tsx
'use client'
import { useState } from 'react'

interface Props {
  suggestedConditions: string[]
}

export default function HeroSearch({ suggestedConditions }: Props) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('provider-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>World-class care, close to home</p>
      <h1 className={styles.headline}>Find the right specialist for you</h1>
      <p className={styles.subheading}>Search by condition, symptom, or doctor name</p>

      <form className={styles.form} onSubmit={handleSubmit}
            role="search" aria-label="Find a provider">
        <div className={styles.inputRow}>
          <label htmlFor="condition-search" className="sr-only">
            Search by condition, symptom, or doctor name
          </label>
          <input
            id="condition-search"
            type="text"
            className={styles.input}
            placeholder="e.g. Heart Failure, Multiple Sclerosis, Dr. Nair"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.submitBtn}>Search</button>
        </div>
      </form>

      <div className={styles.suggestions} aria-label="Suggested conditions">
        {suggestedConditions.map(condition => (
          <button key={condition} type="button" className={styles.suggestionPill}
                  onClick={() => setQuery(condition)}>
            {condition}
          </button>
        ))}
      </div>
    </section>
  )
}
```

**Acceptance:**
- Single `<input type="text">` — verified in DevTools
- Gradient background (`linear-gradient` visible in DevTools)
- Submit scrolls to `#provider-section`
- 4 suggestion pills: `border-radius: 20px`

---

## TASK-013 — OutcomesStrip

**Files:** `src/components/home/OutcomesStrip.tsx`, `OutcomesStrip.module.css`

No `'use client'`. Server component.

```tsx
import { outcomeMetrics } from '@/lib/data'

export default function OutcomesStrip() {
  return (
    <section className={styles.strip} aria-label="Our outcomes">
      <dl className={styles.metrics}>
        {outcomeMetrics.map((metric, i) => (
          <>
            {i > 0 && <div className={styles.divider} aria-hidden="true" />}
            <div key={metric.id} className={styles.metric}>
              <dt className={styles.value}>{metric.value}</dt>
              <dd className={styles.context}>{metric.context}</dd>
            </div>
          </>
        ))}
      </dl>
    </section>
  )
}
```

**Acceptance:**
- Navy bg, full-bleed (no `border-radius`)
- `<dl>` markup in DevTools
- 5 metrics with values and context labels
- White text on navy ≥ 12:1 ✓✓

---

## TASK-014 — ConditionBrowser

**Files:** `src/components/home/ConditionBrowser.tsx`, `ConditionBrowser.module.css`

No `'use client'`. Server component.

```tsx
import { Heart, Ribbon, Brain, Activity, Bone, Wind, Droplets, Zap } from 'lucide-react'
import { ConditionCategory } from '@/types'
import { LucideIcon } from 'lucide-react'

const iconMap: Record<ConditionCategory, LucideIcon> = {
  'heart-vascular': Heart, 'cancer': Ribbon, 'brain-spine': Brain,
  'digestive': Activity, 'orthopedics': Bone, 'lung': Wind,
  'kidney-urinary': Droplets, 'endocrine': Zap,
}
```

Cards: white bg, `border-radius: 6px`, `border: 1px solid var(--color-border)`, NO shadow.

**Acceptance:**
- 8 cards visible
- Surface section bg
- Lucide icons (not emoji)
- `border-radius: 6px` in DevTools — NOT 4px
- No `box-shadow`

---

## TASK-015 — AppointmentBadge

**Files:** `src/components/ui/AppointmentBadge.tsx`, `AppointmentBadge.module.css`

No `'use client'`. Server component.

```tsx
import { AppointmentType } from '@/types'

const config = {
  'in-person':      { label: 'In Person',   bg: '#0468CD' },
  'virtual':        { label: 'Virtual',      bg: '#006633' },
  'second-opinion': { label: '2nd Opinion', bg: '#003087' },
} satisfies Record<AppointmentType, { label: string; bg: string }>

export default function AppointmentBadge({ type }: { type: AppointmentType }) {
  const { label, bg } = config[type]
  return (
    <span className={styles.badge} style={{ background: bg }}>
      {label}
    </span>
  )
}
```

CSS: `border-radius: 20px; color: var(--color-white); padding: 2px 10px; font-size: 0.75rem; font-weight: 700;`

**Note:** Hex values in the JS config are intentional (dynamic inline styles cannot use CSS custom properties). Documented exception in 07_Guide.

---

## TASK-016 — AcceptingBadge

**Files:** `src/components/ui/AcceptingBadge.tsx`, `AcceptingBadge.module.css`

No `'use client'`. Server component.

```tsx
import { AcceptingStatus } from '@/types'

const config = {
  'accepting':     { label: 'Accepting Patients',  dotColor: '#166534' },
  'limited':       { label: 'Limited Availability', dotColor: '#92400E' },
  'not-accepting': { label: 'Not Accepting',        dotColor: '#991B1B' },
} satisfies Record<AcceptingStatus, { label: string; dotColor: string }>

export default function AcceptingBadge({ status }: { status: AcceptingStatus }) {
  const { label, dotColor } = config[status]
  return (
    <span className={styles.row}>
      <span className={styles.dot} style={{ background: dotColor }} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}
```

CSS: `.dot { width: 6px; height: 6px; border-radius: 50%; }` (decorative, not a photo — `50%` here is correct).

---

## TASK-017 — ProviderCard

**Files:** `src/components/home/ProviderCard.tsx`, `ProviderCard.module.css`

No `'use client'`. Server component.

```tsx
import Button from '@/components/ui/Button'
import AppointmentBadge from '@/components/ui/AppointmentBadge'
import AcceptingBadge from '@/components/ui/AcceptingBadge'
import { Provider } from '@/types'

export default function ProviderCard({ provider }: { provider: Provider }) {
  const conditions = provider.conditionsTreated.slice(0, 3)

  return (
    <article className={styles.card}>
      <div className={styles.photoRow}>
        <img
          src={provider.photo}
          alt={`Photo of ${provider.name}`}
          className={styles.photo}
          width={80}
          height={80}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{provider.name}</h3>
          <p className={styles.credentials}>{provider.credentials}</p>
          <p className={styles.specialty}>{provider.specialty}</p>
        </div>
      </div>

      <div className={styles.conditions}>
        {conditions.map(c => (
          <span key={c} className={styles.conditionChip}>{c}</span>
        ))}
      </div>

      <div className={styles.badges}>
        {provider.appointmentTypes.map(type => (
          <AppointmentBadge key={type} type={type} />
        ))}
      </div>

      <div className={styles.ratingRow}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#F59E0B" stroke="none" />
        </svg>
        <span className={styles.ratingValue}>{provider.rating}</span>
        <span aria-label={`${provider.reviewCount} reviews`}>
          ({provider.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      <AcceptingBadge status={provider.acceptingStatus} />

      <div className={styles.locations}>
        {provider.locations.map(l => l.name).join(' · ')}
      </div>

      <div className={styles.cta}>
        {provider.acceptingStatus !== 'not-accepting' ? (
          <Button variant="primary" fullWidth>Request Appointment</Button>
        ) : (
          <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
        )}
      </div>
    </article>
  )
}
```

**Acceptance:** See Epic 7 (13 specific checks).

---

## TASK-018 — ProviderSearch

**Files:** `src/components/home/ProviderSearch.tsx`, `ProviderSearch.module.css`

`'use client'`.

```tsx
'use client'
import { useState, useMemo } from 'react'
import { filterProviders, getUniqueCities } from '@/lib/filterProviders'
import ProviderCard from './ProviderCard'
import { providers } from '@/lib/data'
import { AppointmentType } from '@/types'

export default function ProviderSearch() {
  const [nameQuery, setNameQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [apptTypeFilter, setApptTypeFilter] = useState<AppointmentType | ''>('')

  const cities = useMemo(() => getUniqueCities(providers), [])

  const filtered = useMemo(
    () => filterProviders(providers, nameQuery, locationFilter, apptTypeFilter),
    [nameQuery, locationFilter, apptTypeFilter]
  )

  return (
    <section className={styles.section} id="provider-section">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Find a Provider</h2>

        <div className={styles.filterBar} role="search" aria-label="Filter providers">
          <label htmlFor="name-query" className="sr-only">Search by name, specialty, or condition</label>
          <input id="name-query" type="text" className={styles.filterInput}
                 placeholder="Search by name, specialty, or condition"
                 value={nameQuery} onChange={e => setNameQuery(e.target.value)} />

          <label htmlFor="location-select" className="sr-only">Filter by location</label>
          <select id="location-select" className={styles.filterSelect}
                  value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>

          <label htmlFor="appt-type-select" className="sr-only">Filter by appointment type</label>
          <select id="appt-type-select" className={styles.filterSelect}
                  value={apptTypeFilter} onChange={e => setApptTypeFilter(e.target.value as AppointmentType | '')}>
            <option value="">All Appointment Types</option>
            <option value="in-person">In Person</option>
            <option value="virtual">Virtual</option>
            <option value="second-opinion">Second Opinion</option>
          </select>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} provider{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <p className={styles.emptyState}>No providers match your search. Try different criteria.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

---

## TASK-019 — HealthLibraryPreview

**Files:** `src/components/home/HealthLibraryPreview.tsx`, `HealthLibraryPreview.module.css`

No `'use client'`. Server component. Surface bg. 3×2 grid. Border-only article cards (`border-radius: 6px`).

---

## TASK-020 — AppointmentBanner

**Files:** `src/components/home/AppointmentBanner.tsx`, `AppointmentBanner.module.css`

No `'use client'`. Server component.

Blue bg (`var(--color-blue)`). White text. Two CTAs:
- `<Button variant="outlineWhite" href="tel:8002232273">Call 800.223.2273</Button>`
- `<Button variant="outlineWhite" href="#">Schedule Online</Button>`

---

## TASK-021 — Footer

**Files:** `src/components/layout/Footer.tsx`, `Footer.module.css`

No `'use client'`. Server component. Navy bg. 4 columns. Links hover to `var(--color-blue)` (blue on navy = 5.56:1 ✓).

```tsx
© {new Date().getFullYear()} CareCompass Medical Center. All rights reserved.
```

---

## TASK-022 — Framer Motion

```tsx
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// Wrap each section:
<motion.div {...fadeUp}>
  <OutcomesStrip />
</motion.div>
```

All major sections wrapped. `once: true` prevents re-trigger on scroll-up.

---

## TASK-023 — QA pass

```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"   # expect 1: ProviderCard (box-shadow)
grep -r "border-radius: 50%" src/components    # must be empty (dot uses inline style)
grep -r "9999px" src                           # must be empty
grep -r "box-shadow" src/components --include="*.module.css"  # expect 1: ProviderCard
```

Run Lighthouse. Verify 07_Guide launch checklist.
