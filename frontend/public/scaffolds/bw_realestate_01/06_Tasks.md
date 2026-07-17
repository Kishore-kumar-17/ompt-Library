# 06 — Tasks
## Indian Property Listing Portal · bw_realestate_01

---

## Task Index

| Task | Title | Day | Blocker |
|------|-------|-----|---------|
| TASK-001 | Project Scaffold | 1 | — |
| TASK-002 | next.config.ts Static Export | 1 | TASK-001 |
| TASK-003 | TypeScript Types | 1 | TASK-001 |
| TASK-004 | Mock Data | 1 | TASK-003 |
| TASK-005 | formatPrice Utility | 1 | TASK-003 |
| TASK-006 | filterProperties Utility | 1 | TASK-003 |
| TASK-007 | globals.css Token File | 1 | TASK-001 |
| TASK-008 | layout.tsx with Poppins | 1 | TASK-007 |
| TASK-009 | Button Component | 1 | TASK-007 |
| TASK-010 | SiteNav Component | 2 | TASK-009 |
| TASK-011 | HeroSearchWidget — Mode Tabs | 2 | TASK-007 |
| TASK-012 | HeroSearchWidget — Mode Fields | 2 | TASK-011 |
| TASK-013 | FilterBar Component | 2 | TASK-006 |
| TASK-014 | VerifiedBadge + ReraBadge | 2 | TASK-007 |
| TASK-015 | ListingSourcePill | 2 | TASK-003 |
| TASK-016 | PropertyCard Component | 2 | TASK-005,014,015 |
| TASK-017 | PropertyGrid Component | 3 | TASK-013,016 |
| TASK-018 | FeaturedProjects Section | 3 | TASK-005,009 |
| TASK-019 | TrustBar Section | 3 | TASK-007 |
| TASK-020 | CityLinks Section | 3 | TASK-007 |
| TASK-021 | Footer Component | 3 | TASK-007 |
| TASK-022 | page.tsx Assembly | 3 | TASK-010–021 |
| TASK-023 | Framer Motion Entrances | 4 | TASK-022 |
| TASK-024 | QA Grep Suite | 4 | TASK-023 |
| TASK-025 | Static Build Verification | 4 | TASK-024 |

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest veriproperty \
  --typescript \
  --app \
  --no-tailwind \
  --import-alias "@/*" \
  --no-src-dir

# Rename to use src/
mkdir src
mv app src/
mv components src/ 2>/dev/null || true

npm install lucide-react framer-motion
```

**Expected directory structure after scaffold:**
```
veriproperty/
  src/
    app/
      globals.css
      layout.tsx
      page.tsx
    components/
      home/
      layout/
      ui/
    lib/
    types/
  next.config.ts
  tsconfig.json
  package.json
```

---

## TASK-002 — next.config.ts Static Export

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

**Verify:** `npm run build` creates `/out` directory.

---

## TASK-003 — TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type SearchMode = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type PropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'Plot' | 'PG'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type CommercialType = 'Office Space' | 'Shop' | 'Warehouse' | 'Showroom'
export type PreferredBy = 'Boys' | 'Girls' | 'Any'

export interface Property {
  id: string
  title: string
  bhk: BHKType
  propertyType: PropertyType
  price: number            // raw INR — display via formatPrice()
  pricePerSqft: number
  superArea: number        // sqft
  carpetArea: number       // sqft
  floor: string            // e.g. "8th of 22 Floors"
  locality: string
  city: string
  listingSource: ListingSource
  verified: boolean
  reraRegistered: boolean
  possessionStatus: PossessionStatus
  furnishingStatus: FurnishingStatus
  photos: number
  postedDaysAgo: number
  amenities: string[]
  projectName?: string
  mode: SearchMode
}

export interface FeaturedProject {
  id: string
  projectName: string
  builderName: string
  locality: string
  city: string
  priceFrom: number
  priceTo: number
  possessionStatus: PossessionStatus
  reraRegistered: boolean
  photos: number
  unitTypes: string[]
}

export interface TrustStat {
  id: string
  value: string
  label: string
  iconName: string
}

export interface CityLink {
  city: string
  propertyCount: string
  iconName: string
}

export interface SearchFilters {
  bhk: BHKType[]
  possession: PossessionStatus | ''
  propertyType: PropertyType | ''
  furnished: FurnishingStatus | ''
}
```

**Verify:** `tsc --noEmit` exits 0.

---

## TASK-004 — Mock Data

**File:** `src/lib/data.ts` — see `02_Architecture.md` for full 8-property array.

Key patterns to verify:
- `price` values are raw INR integers (not strings)
- `mode: 'buy'` on 7 properties, `mode: 'rent'` on prop-07 (₹28,000/mo)
- Mix of `listingSource`: Owner × 3, Builder × 3, Agent × 2
- Mix of `verified`: 7 true, 1 false
- Mix of `reraRegistered`: 6 true, 2 false

---

## TASK-005 — formatPrice Utility

**File:** `src/lib/formatPrice.ts`

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
  return `₹${amount.toLocaleString('en-IN')}/mo`
}

export function formatPriceRange(from: number, to: number): string {
  return `${formatPrice(from)} – ${formatPrice(to)}`
}
```

**Unit test (manual):**
```
formatPrice(12_000_000)  → ₹1.20 Cr
formatPrice(35_000_000)  → ₹3.50 Cr
formatPrice(8_500_000)   → ₹85 L
formatPrice(4_500_000)   → ₹45 L
formatPrice(2_500_000)   → ₹25 L
formatPrice(28_000)      → ₹28,000/mo
formatPriceRange(7_500_000, 14_000_000) → ₹75 L – ₹1.40 Cr
```

---

## TASK-006 — filterProperties Utility

**File:** `src/lib/filterProperties.ts`

```typescript
import { Property, BHKType, PropertyType, PossessionStatus, FurnishingStatus } from '@/types'

export interface FilterState {
  bhk: BHKType[]
  possession: PossessionStatus | ''
  propertyType: PropertyType | ''
  furnished: FurnishingStatus | ''
}

export function filterProperties(
  properties: Property[],
  filters: FilterState
): Property[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.possession && p.possessionStatus !== filters.possession) return false
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false
    if (filters.furnished && p.furnishingStatus !== filters.furnished) return false
    return true
  })
}
```

**Test cases:**
- `bhk: []` → all 8 properties returned
- `bhk: ['2 BHK']` → props 02, 06, 07 (3 properties)
- `bhk: ['3 BHK'], possession: 'Ready to Move'` → props 01, 05 (2 properties)
- `furnished: 'Furnished'` → props 03, 07 (2 properties)

---

## TASK-007 — globals.css Token File

**File:** `src/app/globals.css`

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

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-white);
  -webkit-font-smoothing: antialiased;
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verify:** `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty (hex only in globals.css, not component modules).

---

## TASK-008 — layout.tsx with Poppins

**File:** `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VeriProperty — Verified Properties in India',
  description: 'Search verified, RERA-registered properties to buy, rent, or invest across India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Critical:** Weight `'700'` must NOT appear in the Poppins import. Max weight in this build is `600`.

---

## TASK-009 — Button Component

**File:** `src/components/ui/Button.tsx`

```tsx
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'outlineRed'
  size?: 'md' | 'sm'
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  children: React.ReactNode
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  fullWidth,
  children,
  type = 'button',
  className,
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ].join(' ')

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
```

**File:** `src/components/ui/Button.module.css` — see `03_Design.md`.

---

## TASK-010 — SiteNav Component

**File:** `src/components/layout/SiteNav.tsx`

```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import styles from './SiteNav.module.css'

const NAV_LINKS = [
  { label: 'Buy', href: '#' },
  { label: 'Rent', href: '#' },
  { label: 'PG', href: '#' },
  { label: 'Commercial', href: '#' },
  { label: 'New Projects', href: '#' },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>VeriProperty</Link>
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <Link href={link.href} className={styles.link}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.rightGroup}>
          <button className={styles.cityPill}>
            Bangalore <ChevronDown size={14} />
          </button>
          <Button href="#" size="sm">Post Property Free</Button>
        </div>
      </div>
    </nav>
  )
}
```

---

## TASK-011 — HeroSearchWidget — Mode Tabs

**File:** `src/components/home/HeroSearchWidget.tsx` (partial — tabs only)

```tsx
'use client'
import { useState } from 'react'
import type { SearchMode } from '@/types'
import styles from './HeroSearchWidget.module.css'

const MODES: { value: SearchMode; label: string }[] = [
  { value: 'buy',        label: 'Buy' },
  { value: 'rent',       label: 'Rent' },
  { value: 'pg',         label: 'PG' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'plot',       label: 'Plots' },
]

export default function HeroSearchWidget() {
  const [mode, setMode] = useState<SearchMode>('buy')

  return (
    <section className={styles.hero}>
      <div className={styles.widget}>
        <div className={styles.tabs} role="tablist" aria-label="Property search mode">
          {MODES.map(m => (
            <button
              key={m.value}
              role="tab"
              aria-selected={mode === m.value}
              className={`${styles.tab} ${mode === m.value ? styles.tabActive : ''}`}
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
        {/* Fields rendered below — see TASK-012 */}
      </div>
    </section>
  )
}
```

---

## TASK-012 — HeroSearchWidget — Mode Fields

**Continuing HeroSearchWidget.tsx** — add inside `<div className={styles.widget}>` after tabs:

```tsx
<div className={styles.fields}>
  {/* Common: City + Locality */}
  <div className={styles.field}>
    <label className={styles.fieldLabel}>City</label>
    <select className={styles.select}>
      <option>Bangalore</option>
      <option>Mumbai</option>
      <option>Delhi NCR</option>
      <option>Hyderabad</option>
      <option>Pune</option>
    </select>
  </div>
  <div className={styles.field}>
    <label className={styles.fieldLabel}>Locality</label>
    <input className={styles.input} type="text" placeholder="Enter locality" />
  </div>

  {/* Buy / Rent fields — conditional JSX */}
  {(mode === 'buy' || mode === 'rent') && (
    <>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>Property Type</label>
        <select className={styles.select}>
          <option value="">Any Type</option>
          <option>Apartment</option>
          <option>Independent House</option>
          <option>Villa</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>BHK</label>
        <select className={styles.select}>
          <option value="">Any</option>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
          <option>4 BHK</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>Budget</label>
        <select className={styles.select}>
          <option value="">Any Budget</option>
          <option>Under ₹25 L</option>
          <option>₹25 L – ₹50 L</option>
          <option>₹50 L – ₹80 L</option>
          <option>₹80 L – ₹1 Cr</option>
          <option>₹1 Cr – ₹2 Cr</option>
          <option>Above ₹2 Cr</option>
        </select>
      </div>
    </>
  )}

  {/* PG fields */}
  {mode === 'pg' && (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>Preferred By</label>
      <select className={styles.select}>
        <option>Any</option>
        <option>Boys</option>
        <option>Girls</option>
      </select>
    </div>
  )}

  {/* Commercial fields */}
  {mode === 'commercial' && (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>Commercial Type</label>
      <select className={styles.select}>
        <option value="">Any</option>
        <option>Office Space</option>
        <option>Shop</option>
        <option>Warehouse</option>
        <option>Showroom</option>
      </select>
    </div>
  )}

  {/* Plot fields */}
  {mode === 'plot' && (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>Plot Area</label>
      <select className={styles.select}>
        <option value="">Any Area</option>
        <option>Under 500 sqft</option>
        <option>500 – 1,000 sqft</option>
        <option>1,000 – 2,000 sqft</option>
        <option>Above 2,000 sqft</option>
      </select>
    </div>
  )}

  <Button
    type="button"
    onClick={() => document.getElementById('property-section')?.scrollIntoView({ behavior: 'smooth' })}
  >
    Search Properties
  </Button>
</div>
```

**Critical check:** No `display: none` anywhere. Fields are unmounted/mounted via conditional JSX.

---

## TASK-013 — FilterBar Component

**File:** `src/components/home/FilterBar.tsx`

```tsx
'use client'
import { useState } from 'react'
import type { BHKType, PossessionStatus, PropertyType, FurnishingStatus } from '@/types'
import type { FilterState } from '@/lib/filterProperties'
import styles from './FilterBar.module.css'

const BHK_OPTIONS: BHKType[] = ['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const POSSESSION_OPTIONS: PossessionStatus[] = ['Ready to Move', 'Under Construction', 'New Launch']
const TYPE_OPTIONS: PropertyType[] = ['Apartment', 'Independent House', 'Villa', 'Plot']
const FURNISHED_OPTIONS: FurnishingStatus[] = ['Furnished', 'Semi-Furnished', 'Unfurnished']

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [bhk, setBhk] = useState<BHKType[]>([])
  const [possession, setPossession] = useState<PossessionStatus | ''>('')
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
  const [furnished, setFurnished] = useState<FurnishingStatus | ''>('')

  const emit = (next: Partial<FilterState>) => {
    onFilterChange({ bhk, possession, propertyType, furnished, ...next })
  }

  const toggleBhk = (val: BHKType) => {
    const next = bhk.includes(val) ? bhk.filter(b => b !== val) : [...bhk, val]
    setBhk(next)
    emit({ bhk: next })
  }

  const toggleSingle = <T extends string>(
    val: T,
    current: T | '',
    set: (v: T | '') => void,
    key: keyof FilterState
  ) => {
    const next = current === val ? '' : val
    set(next)
    emit({ [key]: next } as Partial<FilterState>)
  }

  return (
    <div className={styles.bar} role="group" aria-label="Property filters">
      <div className={styles.inner}>
        {BHK_OPTIONS.map(val => (
          <button
            key={val}
            role="checkbox"
            aria-checked={bhk.includes(val)}
            className={`${styles.chip} ${bhk.includes(val) ? styles.chipActive : ''}`}
            onClick={() => toggleBhk(val)}
          >
            {val}
          </button>
        ))}
        <div className={styles.divider} />
        {POSSESSION_OPTIONS.map(val => (
          <button
            key={val}
            role="radio"
            aria-checked={possession === val}
            className={`${styles.chip} ${possession === val ? styles.chipActive : ''}`}
            onClick={() => toggleSingle(val, possession, setPossession, 'possession')}
          >
            {val}
          </button>
        ))}
        <div className={styles.divider} />
        {TYPE_OPTIONS.map(val => (
          <button
            key={val}
            role="radio"
            aria-checked={propertyType === val}
            className={`${styles.chip} ${propertyType === val ? styles.chipActive : ''}`}
            onClick={() => toggleSingle(val, propertyType, setPropertyType, 'propertyType')}
          >
            {val}
          </button>
        ))}
        <div className={styles.divider} />
        {FURNISHED_OPTIONS.map(val => (
          <button
            key={val}
            role="radio"
            aria-checked={furnished === val}
            className={`${styles.chip} ${furnished === val ? styles.chipActive : ''}`}
            onClick={() => toggleSingle(val, furnished, setFurnished, 'furnished')}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

## TASK-014 — VerifiedBadge + ReraBadge

**File:** `src/components/ui/VerifiedBadge.tsx`

```tsx
import { ShieldCheck } from 'lucide-react'
import styles from './VerifiedBadge.module.css'

export default function VerifiedBadge() {
  return (
    <span className={styles.badge} aria-label="Verified listing">
      <ShieldCheck size={12} aria-hidden="true" />
      Verified
    </span>
  )
}
```

```css
/* VerifiedBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green);
  font-size: 0.75rem; font-weight: 600;
}
```

**File:** `src/components/ui/ReraBadge.tsx`

```tsx
import styles from './ReraBadge.module.css'

export default function ReraBadge() {
  return (
    <span className={styles.badge} aria-label="RERA registered">
      RERA ✓
    </span>
  )
}
```

```css
/* ReraBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--color-green);
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.02em;
  border: 1px solid var(--color-green); border-radius: 4px;
  padding: 1px 6px;
}
```

---

## TASK-015 — ListingSourcePill

**File:** `src/components/ui/ListingSourcePill.tsx`

```tsx
import type { ListingSource } from '@/types'
import styles from './ListingSourcePill.module.css'

const SOURCE_STYLES: Record<ListingSource, { background: string; color: string }> = {
  Owner:   { background: '#EBF5EC', color: '#1A7A3A' },
  Builder: { background: '#EBF0FA', color: '#1A50A0' },
  Agent:   { background: '#FEF3E5', color: '#B45309' },
}

interface Props {
  source: ListingSource
}

export default function ListingSourcePill({ source }: Props) {
  return (
    <span className={styles.pill} style={SOURCE_STYLES[source]}>
      {source}
    </span>
  )
}
```

```css
/* ListingSourcePill.module.css */
.pill {
  display: inline-flex; align-items: center;
  font-size: 0.6875rem; font-weight: 700; padding: 2px 8px;
  border-radius: 4px; letter-spacing: 0.03em; text-transform: uppercase;
}
```

**Note:** Inline styles for source colours are intentional — contextual colours outside the 8-token system.

---

## TASK-016 — PropertyCard Component

**File:** `src/components/home/PropertyCard.tsx`

```tsx
import Image from 'next/image'
import { MapPin, Camera } from 'lucide-react'
import type { Property } from '@/types'
import { formatPrice } from '@/lib/formatPrice'
import Button from '@/components/ui/Button'
import VerifiedBadge from '@/components/ui/VerifiedBadge'
import ReraBadge from '@/components/ui/ReraBadge'
import ListingSourcePill from '@/components/ui/ListingSourcePill'
import styles from './PropertyCard.module.css'

interface Props {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  const postedLabel =
    property.postedDaysAgo === 0
      ? 'Today'
      : property.postedDaysAgo === 1
      ? 'Yesterday'
      : `${property.postedDaysAgo} days ago`

  return (
    <article className={styles.card}>
      {/* Image block */}
      <div className={styles.imageBlock}>
        <Image
          src={`/images/property-${property.id}.jpg`}
          alt={property.title}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          unoptimized
        />
        {/* Possession badge */}
        <span className={styles.possessionBadge}>{property.possessionStatus}</span>
        {/* Photo count badge */}
        <span className={styles.photoBadge}>
          <Camera size={12} aria-hidden="true" />
          {property.photos} Photos
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Badge row */}
        <div className={styles.badgeRow}>
          <ListingSourcePill source={property.listingSource} />
          {property.verified && <VerifiedBadge />}
          {property.reraRegistered && <ReraBadge />}
        </div>

        {/* Title */}
        <h3 className={styles.title}>{property.title}</h3>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(property.price)}</span>
          <span className={styles.pricePerSqft}>
            ₹{property.pricePerSqft.toLocaleString('en-IN')}/sqft
          </span>
        </div>

        {/* Area */}
        <div className={styles.areaRow}>
          <div className={styles.areaItem}>
            <span className={styles.areaLabel}>Super Area</span>
            <span className={styles.areaValue}>{property.superArea} sqft</span>
          </div>
          <div className={styles.areaItem}>
            <span className={styles.areaLabel}>Carpet Area</span>
            <span className={styles.areaValue}>{property.carpetArea} sqft</span>
          </div>
        </div>

        {/* Floor */}
        <p className={styles.floor}>{property.floor}</p>

        {/* Locality */}
        <p className={styles.locality}>
          <MapPin size={14} aria-hidden="true" />
          {property.locality}, {property.city}
        </p>

        {/* Posted date */}
        <p className={styles.postedDate}>Posted: {postedLabel}</p>

        {/* CTA */}
        <div className={styles.cta}>
          <Button variant="outlineRed" size="sm" fullWidth>
            Contact {property.listingSource}
          </Button>
        </div>
      </div>
    </article>
  )
}
```

**Critical:** `Contact {property.listingSource}` — never hardcoded. Grep check: all three hardcoded variants must return empty.

---

## TASK-017 — PropertyGrid Component

**File:** `src/components/home/PropertyGrid.tsx`

```tsx
'use client'
import { useState, useMemo } from 'react'
import type { Property } from '@/types'
import { filterProperties, type FilterState } from '@/lib/filterProperties'
import FilterBar from './FilterBar'
import PropertyCard from './PropertyCard'
import styles from './PropertyGrid.module.css'

const INITIAL_FILTERS: FilterState = {
  bhk: [], possession: '', propertyType: '', furnished: '',
}

interface Props {
  properties: Property[]
}

export default function PropertyGrid({ properties }: Props) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  )

  const count = filtered.length
  const label = `${count} ${count === 1 ? 'Property' : 'Properties'} Found`

  return (
    <>
      <FilterBar onFilterChange={setFilters} />
      <section id="property-section" className={styles.section}>
        {/* ARIA live region */}
        <div aria-live="polite" className="sr-only">{label}</div>

        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Properties for Sale</h2>
            <p className={styles.count}>{label}</p>
          </div>
          <div className={styles.grid}>
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className={styles.empty}>
              No properties match your filters. Try removing some filters.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
```

---

## TASK-018 — FeaturedProjects Section

**File:** `src/components/home/FeaturedProjects.tsx`

```tsx
import { Camera } from 'lucide-react'
import type { FeaturedProject } from '@/types'
import { formatPriceRange } from '@/lib/formatPrice'
import ReraBadge from '@/components/ui/ReraBadge'
import styles from './FeaturedProjects.module.css'

interface Props {
  projects: FeaturedProject[]
}

export default function FeaturedProjects({ projects }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Featured New Projects</h2>
        <div className={styles.grid}>
          {projects.map(project => (
            <article key={project.id} className={styles.card}>
              <div className={styles.imageBlock}>
                <span className={styles.photoBadge}>
                  <Camera size={12} aria-hidden="true" />
                  {project.photos} Photos
                </span>
              </div>
              <div className={styles.content}>
                <div className={styles.badgeRow}>
                  {project.reraRegistered && <ReraBadge />}
                  <span className={styles.statusPill}>{project.possessionStatus}</span>
                </div>
                <h3 className={styles.projectName}>{project.projectName}</h3>
                <p className={styles.builderName}>by {project.builderName}</p>
                <p className={styles.locality}>{project.locality}, {project.city}</p>
                <p className={styles.priceRange}>
                  {formatPriceRange(project.priceFrom, project.priceTo)}
                </p>
                <div className={styles.unitTypes}>
                  {project.unitTypes.map(u => (
                    <span key={u} className={styles.unitPill}>{u}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## TASK-019 — TrustBar Section

**File:** `src/components/home/TrustBar.tsx`

```tsx
import {
  Building2, ShieldCheck, User, BadgeCheck, type LucideIcon
} from 'lucide-react'
import type { TrustStat } from '@/types'
import styles from './TrustBar.module.css'

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, ShieldCheck, User, BadgeCheck,
}

interface Props {
  stats: TrustStat[]
}

export default function TrustBar({ stats }: Props) {
  return (
    <section className={styles.section} aria-label="Trust statistics">
      <div className={styles.inner}>
        {stats.map(stat => {
          const Icon = ICON_MAP[stat.iconName]
          return (
            <div key={stat.id} className={styles.stat}>
              {Icon && <Icon size={32} className={styles.icon} aria-hidden="true" />}
              <p className={styles.value}>{stat.value}</p>
              <p className={styles.label}>{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

```css
/* TrustBar.module.css */
.section { background: var(--color-dark); padding: 48px 24px; }
.inner {
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
}
.stat { text-align: center; color: var(--color-white); }
.icon { color: var(--color-red); margin: 0 auto 12px; display: block; }
.value { font-size: 1.75rem; font-weight: 600; margin-bottom: 4px; }
.label { font-size: 0.875rem; color: rgba(255,255,255,0.7); }
@media (max-width: 768px) {
  .inner { grid-template-columns: repeat(2, 1fr); }
}
```

---

## TASK-020 — CityLinks Section

**File:** `src/components/home/CityLinks.tsx`

```tsx
import { MapPin } from 'lucide-react'
import type { CityLink } from '@/types'
import styles from './CityLinks.module.css'

interface Props {
  cities: CityLink[]
}

export default function CityLinks({ cities }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Search Properties by City</h2>
        <div className={styles.grid}>
          {cities.map(city => (
            <a key={city.city} href="#" className={styles.card}>
              <MapPin size={20} className={styles.icon} aria-hidden="true" />
              <span className={styles.cityName}>{city.city}</span>
              <span className={styles.count}>{city.propertyCount}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## TASK-021 — Footer Component

**File:** `src/components/layout/Footer.tsx`

```tsx
import styles from './Footer.module.css'

const COLUMNS = [
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  },
  {
    heading: 'Properties',
    links: ['Buy in Bangalore', 'Rent in Mumbai', 'PG in Delhi', 'Commercial', 'New Projects'],
  },
  {
    heading: 'Tools',
    links: ['Home Loan EMI', 'Price Trends', 'Area Converter', 'RERA Check', 'Post Property Free'],
  },
  {
    heading: 'Support',
    links: ['Help Centre', 'Report a Listing', 'Advertise with Us', 'Sitemap', 'Terms of Use'],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <ul className={styles.linkList}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className={styles.link}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 VeriProperty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

---

## TASK-022 — page.tsx Assembly

**File:** `src/app/page.tsx` — see `02_Architecture.md` for the full assembly. No `'use client'`.

---

## TASK-023 — Framer Motion Entrances

**Pattern for each section (example: FeaturedProjects):**

```tsx
import { motion } from 'framer-motion'

// Wrap section:
<motion.section
  className={styles.section}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  {/* content */}
</motion.section>
```

**TrustBar stats — staggered children:**
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {stats.map(stat => (
    <motion.div key={stat.id} variants={item} className={styles.stat}>
      ...
    </motion.div>
  ))}
</motion.div>
```

**Note:** `prefers-reduced-motion` is handled by `globals.css` — no JS needed.

---

## TASK-024 — QA Grep Suite

Run all checks and confirm empty output (or expected output):

```bash
# 1. TypeScript
npx tsc --noEmit

# 2. No hex in component CSS
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"
# Expected: empty (rgba() for shadows is allowed)

# 3. No hardcoded CTA
grep -r "Contact Owner" src/components --include="*.tsx"
grep -r "Contact Builder" src/components --include="*.tsx"
grep -r "Contact Agent" src/components --include="*.tsx"
# All expected: empty

# 4. No CSS field hiding
grep -r "display.*none" src/components/home/HeroSearchWidget.tsx
grep -r "visibility.*hidden" src/components/home/HeroSearchWidget.tsx
# Expected: empty

# 5. No raw price in components (toLocaleString only for /sqft label)
grep -r "property\.price[^P]" src/components --include="*.tsx"
# Expected: empty (price always wrapped in formatPrice())

# 6. Shadow system — only allowed in these 4
grep -r "box-shadow" src/components --include="*.module.css"
# Expected: SearchWidget, PropertyCard, SiteNav, FilterBar only

# 7. No circular radius
grep -r "border-radius: 50%" src/components --include="*.module.css"
# Expected: empty

# 8. 20px radius only on filter chips
grep -r "border-radius: 20px" src/components --include="*.module.css"
# Expected: FilterBar.module.css only

# 9. Font weight check
grep -r "font-weight: 700" src/components --include="*.module.css"
# Expected: empty (max is 600)

# 10. Poppins only
grep -r "Roboto\|Inter\|Lato\|Nunito" src/app/layout.tsx
# Expected: empty
```

---

## TASK-025 — Static Build Verification

```bash
npm run build
# Expected: exit 0, /out directory created

# Verify key files exist
ls out/index.html
ls out/_next/static/

# Serve locally and check
npx serve out
# Open http://localhost:3000 and verify:
# 1. All 5 mode tabs switch correctly
# 2. Filter bar chips work (multi-select BHK, single-select others)
# 3. Result count updates
# 4. Hero search scrolls to #property-section
# 5. 8 property cards render with correct CTA text
# 6. FeaturedProjects: 3 cards with price ranges in lakh/crore format
# 7. TrustBar: dark bg, 4 stats
# 8. CityLinks: 8 city cards
# 9. Footer: dark bg, 4 columns
```
