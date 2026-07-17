# 06 — Tasks
## Modern Indian Rental Discovery · bw_realestate_04

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest zerolet --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

`next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`

---

## TASK-002 — TypeScript Types

**File:** `src/types/index.ts` — see `02_Architecture.md` for full listing.

Key differences from prior builds:
- `RentalProperty` — rental-only, no `price` field (has `monthlyRent` + `deposit`)
- `OwnerProfile` — nested on every `RentalProperty`, no separate `Agent` entity
- `RentalFilterState` — 5 dimensions including `maxRent: number | null` and `petFriendly: boolean | null`
- `TenantPreference` union type — `'Family' | 'Bachelor' | 'Any'`
- No `PropertyCategory` (that was bw_03)

---

## TASK-003 — Utilities

```typescript
// src/lib/formatPrice.ts
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr/mo`
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(2)} L/mo`
  return `₹${amount.toLocaleString('en-IN')}/mo`
}
// CRITICAL: Always appends /mo — DO NOT use for deposit display

// src/lib/calculateBrokerSavings.ts
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2
}
// Formula is fixed: always 2× rent. Do not change multiplier.

// src/lib/filterRentals.ts
import type { RentalProperty, RentalFilterState } from '@/types'

export function filterRentals(
  properties: RentalProperty[],
  filters: RentalFilterState
): RentalProperty[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.furnishing && p.furnishingStatus !== filters.furnishing) return false
    if (filters.maxRent !== null && p.monthlyRent > filters.maxRent) return false
    if (filters.petFriendly === true && !p.petFriendly) return false
    if (
      filters.tenantPreference &&
      p.tenantPreference !== filters.tenantPreference &&
      p.tenantPreference !== 'Any'
    ) return false
    return true
  })
}
```

---

## TASK-004 — globals.css + layout.tsx

```css
/* globals.css */
:root {
  --color-purple:  #6C3CE1;
  --color-green:   #15803D;
  --color-white:   #FFFFFF;
  --color-surface: #F8F7FF;
  --color-text:    #1A1033;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-dark:    #0D0B14;
  --radius-card:   10px;
  --radius-chip:   20px;
}
```

```tsx
// layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google'
// NOTE: Plus_Jakarta_Sans — not Poppins, not DM Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],   // no '700'
  variable: '--font-sans',
  display: 'swap',
})
```

---

## TASK-005 — UI Atoms

### Button.tsx
```tsx
type ButtonVariant = 'purple' | 'outlinePurple' | 'ghost'
// .purple       → background: var(--color-purple); color: var(--color-white)  — 6.23:1 ✓
// .outlinePurple → transparent; color: var(--color-purple); border: 1.5px solid var(--color-purple)
// .ghost        → transparent; color: var(--color-text); border: 1.5px solid var(--color-border)
```

### ZeroBrokerageBadge.tsx
```tsx
import { Tag } from 'lucide-react'
import styles from './ZeroBrokerageBadge.module.css'
export default function ZeroBrokerageBadge() {
  return (
    <span className={styles.badge} aria-label="Zero brokerage listing">
      <Tag size={11} aria-hidden="true" />
      Zero Brokerage
    </span>
  )
}
// .badge { color: var(--color-green); border: 1px solid var(--color-green); }
// SEMANTIC: green = savings/zero-brokerage only
```

### OwnerVerifiedBadge.tsx
```tsx
import { CheckCircle2 } from 'lucide-react'
import styles from './OwnerVerifiedBadge.module.css'
export default function OwnerVerifiedBadge() {
  return (
    <span className={styles.badge} aria-label="Owner verified">
      <CheckCircle2 size={11} aria-hidden="true" />
      Verified Owner
    </span>
  )
}
// .badge { color: var(--color-green); } — no border (different from ZeroBrokerageBadge)
```

### PetFriendlyBadge.tsx
```tsx
import { PawPrint } from 'lucide-react'
import styles from './PetFriendlyBadge.module.css'
export default function PetFriendlyBadge() {
  return (
    <span className={styles.badge} aria-label="Pet friendly">
      <PawPrint size={11} aria-hidden="true" />
      Pet Friendly
    </span>
  )
}
// .badge { color: var(--color-purple); }
```

---

## TASK-006 — SiteNav

```tsx
'use client'
// Logo: color: var(--color-purple)
// Nav links: Rent / Buy / Post Property / Help
// Right: "Post Property Free" Button variant="purple"
// Scroll shadow: useEffect on window.scroll
// <nav aria-label="Main navigation">
```

---

## TASK-007 — HeroSection + BrokerSavingsStrip

```tsx
// src/components/home/HeroSection.tsx — static (no 'use client')
import { calculateBrokerSavings } from '@/lib/calculateBrokerSavings'
import BrokerSavingsStrip from './BrokerSavingsStrip'
import Button from '@/components/ui/Button'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Find Your Home. Pay Zero Brokerage.</h1>
        <p className={styles.subheading}>
          Connect directly with property owners — no agents, no commission, no hidden fees
        </p>
        <div className={styles.widget}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select className={styles.select} aria-label="Select city">
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Delhi NCR</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter locality"
              aria-label="Enter locality"
            />
            <Button variant="purple">Find Zero Brokerage Homes</Button>
          </div>
        </div>
      </section>
      <BrokerSavingsStrip exampleRent={30000} />
    </>
  )
}
```

```tsx
// src/components/home/BrokerSavingsStrip.tsx — static
import { calculateBrokerSavings } from '@/lib/calculateBrokerSavings'
import styles from './BrokerSavingsStrip.module.css'

interface Props { exampleRent: number }

export default function BrokerSavingsStrip({ exampleRent }: Props) {
  const savings = calculateBrokerSavings(exampleRent)
  return (
    <div className={styles.strip}>
      <span className={styles.text}>
        Save up to 2 months rent in brokerage — rent directly from owners
      </span>
      <span className={styles.savings}>
        ₹{savings.toLocaleString('en-IN')} saved on a ₹{exampleRent.toLocaleString('en-IN')}/mo rental
      </span>
    </div>
  )
}
// .strip { background: var(--color-purple); } — white text on purple = 6.23:1 ✓
```

---

## TASK-008 — OwnerProfileSnippet

```tsx
// src/components/home/OwnerProfileSnippet.tsx — static
import type { OwnerProfile } from '@/types'
import OwnerVerifiedBadge from '@/components/ui/OwnerVerifiedBadge'
import styles from './OwnerProfileSnippet.module.css'

export default function OwnerProfileSnippet({ owner }: { owner: OwnerProfile }) {
  return (
    <div className={styles.snippet}>
      <div className={styles.left}>
        {/* Owner photo — rect, 8px radius, NOT 50% */}
        <div className={styles.ownerPhoto} role="img" aria-label={`${owner.name} profile`} />
        <div>
          <span className={styles.ownerName}>{owner.name}</span>
          {owner.verified && <OwnerVerifiedBadge />}
        </div>
      </div>
      <span className={styles.responseTime}>{owner.responseTime}</span>
    </div>
  )
}
// .ownerPhoto { border-radius: 8px; } — NEVER 50%
```

---

## TASK-009 — RentalPropertyCard

```tsx
// src/components/home/RentalPropertyCard.tsx — static
import type { RentalProperty } from '@/types'
import { formatPrice } from '@/lib/formatPrice'
import { MapPin, Camera } from 'lucide-react'
import Button from '@/components/ui/Button'
import ZeroBrokerageBadge from '@/components/ui/ZeroBrokerageBadge'
import PetFriendlyBadge from '@/components/ui/PetFriendlyBadge'
import OwnerProfileSnippet from './OwnerProfileSnippet'
import styles from './RentalPropertyCard.module.css'

export default function RentalPropertyCard({ property }: { property: RentalProperty }) {
  return (
    <article className={styles.card}>
      {/* Image block */}
      <div className={styles.imageBlock}>
        <span className={styles.photoBadge}>
          <Camera size={12} aria-hidden="true" />{property.photos} Photos
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <ZeroBrokerageBadge />
          {property.petFriendly && <PetFriendlyBadge />}
        </div>

        <h3 className={styles.title}>{property.title}</h3>

        {/* Rent + Deposit row */}
        <div className={styles.rentRow}>
          <span className={styles.rent}>{formatPrice(property.monthlyRent)}</span>
          <span className={styles.deposit}>
            Deposit: ₹{property.deposit.toLocaleString('en-IN')}
          </span>
          {/* CRITICAL: deposit uses toLocaleString — NOT formatPrice (would wrongly add /mo) */}
        </div>

        <p className={styles.meta}>
          {property.bhk} · {property.superArea} sqft ·
          <MapPin size={12} aria-hidden="true" /> {property.locality}, {property.city}
        </p>

        <div className={styles.availRow}>
          <span className={styles.availLabel}>Available:</span>
          <span className={styles.availDate}>{property.availableFrom}</span>
          <span className={styles.tenantPref}>{property.tenantPreference}</span>
        </div>

        {/* Owner block */}
        <div className={styles.ownerBlock}>
          <OwnerProfileSnippet owner={property.owner} />
          {/* CTA: ALWAYS "Contact Owner" — never dynamic from data field */}
          <Button variant="outlinePurple" size="sm" fullWidth>
            Contact Owner
          </Button>
        </div>
      </div>
    </article>
  )
}
```

---

## TASK-010 — RentalFilterBar + PropertyGrid

```tsx
// src/components/home/RentalFilterBar.tsx
'use client'
import { useState, useMemo } from 'react'
import type { BHKType, FurnishingStatus, TenantPreference, RentalProperty, RentalFilterState } from '@/types'
import { filterRentals } from '@/lib/filterRentals'
import PropertyGrid from './PropertyGrid'
import styles from './RentalFilterBar.module.css'

const BHK_OPTIONS: BHKType[] = ['1 BHK', '2 BHK', '3 BHK', '4 BHK']
const FURNISHING_OPTIONS: FurnishingStatus[] = ['Fully Furnished', 'Semi-Furnished', 'Unfurnished']
const MAX_RENT_PRESETS: { label: string; value: number | null }[] = [
  { label: '₹15K',     value: 15000 },
  { label: '₹25K',     value: 25000 },
  { label: '₹35K',     value: 35000 },
  { label: '₹50K',     value: 50000 },
  { label: 'No Limit', value: null  },
]
const TENANT_OPTIONS: TenantPreference[] = ['Family', 'Bachelor', 'Any']

const INITIAL: RentalFilterState = {
  bhk: [], furnishing: '', maxRent: null, petFriendly: null, tenantPreference: '',
}

interface Props { properties: RentalProperty[] }

export default function RentalFilterBar({ properties }: Props) {
  const [filters, setFilters] = useState<RentalFilterState>(INITIAL)

  const filtered = useMemo(
    () => filterRentals(properties, filters),
    [properties, filters]
  )

  const count = filtered.length
  const ariaLabel = `${count} ${count === 1 ? 'property' : 'properties'} found`

  function toggleBhk(bhk: BHKType) {
    setFilters(f => ({
      ...f,
      bhk: f.bhk.includes(bhk) ? f.bhk.filter(b => b !== bhk) : [...f.bhk, bhk],
    }))
  }

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.inner}>

          {/* BHK — multi-select */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>BHK</span>
            {BHK_OPTIONS.map(b => (
              <button
                key={b}
                className={`${styles.chip} ${filters.bhk.includes(b) ? styles.chipActive : ''}`}
                onClick={() => toggleBhk(b)}
                aria-pressed={filters.bhk.includes(b)}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Furnishing — single-select */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Furnishing</span>
            {FURNISHING_OPTIONS.map(f => (
              <button
                key={f}
                className={`${styles.chip} ${filters.furnishing === f ? styles.chipActive : ''}`}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  furnishing: prev.furnishing === f ? '' : f,
                }))}
                aria-pressed={filters.furnishing === f}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Max Rent presets */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Max Rent</span>
            {MAX_RENT_PRESETS.map(preset => (
              <button
                key={preset.label}
                className={`${styles.chip} ${filters.maxRent === preset.value ? styles.chipActive : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, maxRent: preset.value }))}
                aria-pressed={filters.maxRent === preset.value}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Pet Friendly */}
          <div className={styles.group}>
            <button
              className={`${styles.chip} ${filters.petFriendly === true ? styles.chipActive : ''}`}
              onClick={() => setFilters(prev => ({
                ...prev,
                petFriendly: prev.petFriendly === true ? null : true,
              }))}
              aria-pressed={filters.petFriendly === true}
            >
              Pet Friendly
            </button>
          </div>

          {/* Tenant Preference */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>For</span>
            {TENANT_OPTIONS.map(t => (
              <button
                key={t}
                className={`${styles.chip} ${filters.tenantPreference === t ? styles.chipActive : ''}`}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  tenantPreference: prev.tenantPreference === t ? '' : t,
                }))}
                aria-pressed={filters.tenantPreference === t}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Clear all */}
          <button
            className={styles.clearBtn}
            onClick={() => setFilters(INITIAL)}
          >
            Clear all
          </button>

        </div>
      </div>

      {/* ARIA live region */}
      <div aria-live="polite" className="sr-only">{ariaLabel}</div>

      <PropertyGrid properties={filtered} />
    </>
  )
}
```

```tsx
// src/components/home/PropertyGrid.tsx — static server component
import type { RentalProperty } from '@/types'
import RentalPropertyCard from './RentalPropertyCard'
import styles from './PropertyGrid.module.css'

interface Props { properties: RentalProperty[] }

export default function PropertyGrid({ properties }: Props) {
  if (properties.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No properties match your filters. Try adjusting your search.</p>
      </div>
    )
  }
  return (
    <div className={styles.grid}>
      {properties.map(p => (
        <RentalPropertyCard key={p.id} property={p} />
      ))}
    </div>
  )
}
// .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
// @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
// @media (max-width: 640px)  { .grid { grid-template-columns: 1fr; } }
```

---

## TASK-011 — BrokerSavingsWidget

```tsx
// src/components/home/BrokerSavingsWidget.tsx
'use client'
import { useState } from 'react'
import { calculateBrokerSavings } from '@/lib/calculateBrokerSavings'
import styles from './BrokerSavingsWidget.module.css'

export default function BrokerSavingsWidget() {
  const [rent, setRent] = useState<number>(30000)
  const savings = calculateBrokerSavings(rent)

  return (
    <div className={styles.widget}>
      <h2 className={styles.heading}>See how much you save with ZeroLet</h2>
      <label className={styles.label} htmlFor="rentInput">
        Enter monthly rent (₹)
      </label>
      <input
        id="rentInput"
        className={styles.input}
        type="number"
        min={5000}
        step={1000}
        value={rent}
        onChange={e => setRent(Number(e.target.value))}
        aria-label="Monthly rent amount"
      />
      <div className={styles.result} aria-live="polite">
        <span className={styles.savingsAmount}>
          ₹{savings.toLocaleString('en-IN')}
        </span>
        {/* savings displayed in var(--color-green) */}
        <span className={styles.savingsLabel}>
          saved in brokerage (= 2 months rent)
        </span>
      </div>
    </div>
  )
}
```

---

## TASK-012 — TrustBar

```tsx
// src/components/home/TrustBar.tsx — static
'use client'
import { motion } from 'framer-motion'
import { Building2, PiggyBank, Users, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import styles from './TrustBar.module.css'

const ICON_MAP: Record<string, LucideIcon> = { Building2, PiggyBank, Users, Zap }

const STATS = [
  { id: 's1', icon: 'Building2', value: '50 Lakh+', label: 'Rental Listings'    },
  { id: 's2', icon: 'PiggyBank', value: '₹0',       label: 'Brokerage Charged'  },
  { id: 's3', icon: 'Users',     value: '2 Cr+',    label: 'Happy Tenants'      },
  { id: 's4', icon: 'Zap',       value: 'Instant',  label: 'Owner Connect'      },
]

export default function TrustBar() {
  return (
    <section className={styles.section} aria-label="Trust statistics">
      <div className={styles.inner}>
        {STATS.map((stat, i) => {
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
// .section { background: var(--color-dark); }
// .icon    { color: var(--color-purple); }  ← purple icons (not teal like bw_03)
```

---

## TASK-013 — page.tsx Assembly

```tsx
// src/app/page.tsx — Server Component
import { RENTAL_PROPERTIES } from '@/data/rentalProperties'
import HeroSection from '@/components/home/HeroSection'
import RentalFilterBar from '@/components/home/RentalFilterBar'
import BrokerSavingsWidget from '@/components/home/BrokerSavingsWidget'
import TrustBar from '@/components/home/TrustBar'
import Services from '@/components/home/Services'
import CityLinks from '@/components/home/CityLinks'
import SiteNav from '@/components/home/SiteNav'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <section aria-label="Rental properties">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h2>Zero Brokerage Rentals</h2>
          </div>
          <RentalFilterBar properties={RENTAL_PROPERTIES} />
        </section>
        <section aria-label="Savings calculator" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <BrokerSavingsWidget />
          </div>
        </section>
        <Services />
        <CityLinks />
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
```

---

## TASK-014 — QA Grep Suite

```bash
echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

echo "=== No hex in module CSS ===" && \
  grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"
# Exception: HeroSection.module.css gradient only — must have /* hex allowed in gradient */ comment

echo "=== No formatPrice on deposit ===" && \
  grep -rn "formatPrice.*deposit\|formatPrice(property\.deposit)" src/components && echo "FAIL" || echo "PASS"

echo "=== No font-weight 700 ===" && \
  grep -r "font-weight: 700" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No circular radius ===" && \
  grep -r "border-radius: 50%" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No agent/builder CTAs ===" && \
  grep -r "Contact Agent\|Contact Builder" src/components --include="*.tsx" \
  && echo "FAIL" || echo "PASS"

echo "=== Contact Owner present on card ===" && \
  grep -r "Contact Owner" src/components/home/RentalPropertyCard.tsx && echo "PASS" || echo "FAIL"

echo "=== useMemo in RentalFilterBar ===" && \
  grep -r "useMemo" src/components/home/RentalFilterBar.tsx && echo "PASS" || echo "FAIL"

echo "=== calculateBrokerSavings in BrokerSavingsWidget ===" && \
  grep -r "calculateBrokerSavings" src/components/home/BrokerSavingsWidget.tsx && echo "PASS" || echo "FAIL"

echo "=== Plus Jakarta Sans in layout (not Poppins/DM Sans) ===" && \
  grep -r "Poppins\|DM_Sans" src/app/layout.tsx && echo "FAIL — wrong font" || echo "PASS"

echo "=== Green is for savings only — not in Button or SiteNav ===" && \
  grep -r "var(--color-green)" src/components/ui/Button.module.css \
    src/components/home/SiteNav.module.css && echo "FAIL" || echo "PASS"

echo "=== Build ===" && npm run build && echo "PASS"
```
