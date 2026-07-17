# 06 — Tasks
## Indian Premium Property Portal · bw_realestate_03

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest squareview --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

`next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`

---

## TASK-002 — TypeScript Types

**File:** `src/types/index.ts` — see `02_Architecture.md` for full listing.

Key differences from bw_realestate_01:
- `PremiumProperty` adds `rentalYield: number`, `capitalAppreciation: number`, `developerReputation?: DeveloperReputation`
- `Agent` is a new entity — entirely absent from bw_01/02
- `NewLaunch` adds `launchDate: string`
- `PropertyCategory` union type (not in bw_01)

---

## TASK-003 — Utilities

```typescript
// src/lib/formatYield.ts
export function formatYield(percent: number): string {
  return `${percent.toFixed(1)}% p.a.`
}

// src/lib/filterByCategory.ts
import { PremiumProperty, PropertyCategory } from '@/types'
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

---

## TASK-004 — globals.css + layout.tsx

```css
/* globals.css — hero gradient exception note */
/* hex values only appear in this file and in HeroSection gradient */
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

```tsx
// layout.tsx
import { DM_Sans } from 'next/font/google'
// NOTE: DM_Sans, not Poppins — this build uses a different font
const dmSans = DM_Sans({
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
type ButtonVariant = 'teal' | 'gold' | 'outlineTeal'
// .teal  → background: var(--color-teal); color: var(--color-white)  — 5.99:1 ✓
// .gold  → background: var(--color-gold); color: var(--color-text)   — 5.94:1 ✓
// .outlineTeal → transparent; color: var(--color-teal); border: 1.5px solid var(--color-teal)
```

### SqVerifiedBadge.tsx
```tsx
import { BadgeCheck } from 'lucide-react'
import styles from './SqVerifiedBadge.module.css'
export default function SqVerifiedBadge() {
  return (
    <span className={styles.badge} aria-label="Square Yards verified">
      <BadgeCheck size={12} aria-hidden="true" />
      SqYards Verified
    </span>
  )
}
// .badge { color: var(--color-teal); font-size: 0.75rem; font-weight: 600; }
// CRITICAL: var(--color-teal) NOT var(--color-green) — different verification system
```

### YieldBadge.tsx
```tsx
import { formatYield } from '@/lib/formatYield'
import styles from './YieldBadge.module.css'
export default function YieldBadge({ yield: pct }: { yield: number }) {
  return (
    <span className={styles.badge}>
      {formatYield(pct)} Yield
    </span>
  )
}
// .badge { background: var(--color-gold); color: var(--color-text); border-radius: 4px; }
// CRITICAL: color: var(--color-text) — NEVER var(--color-white) on gold (2.72:1 ✗)
```

---

## TASK-006 — SiteNav

```tsx
'use client'
import { DM_Sans } from 'next/font/google' // NOT needed here — via CSS variable
// Logo: color: var(--color-teal)
// Scroll shadow: useEffect on window.scroll
// 'Post Property Free': <Button variant="teal" size="sm">Post Property Free</Button>
```

---

## TASK-007 — HeroSection

```tsx
// src/components/home/HeroSection.tsx — static (no 'use client')
import styles from './HeroSection.module.css'

const POPULAR_LOCALITIES = [
  'Bandra West', 'Whitefield', 'Jubilee Hills', 'Koregaon Park',
  'DLF Cyber City', 'Worli', 'Adyar', 'Kanakpura Road',
]

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Find Your Premium Property</h1>
      <p className={styles.subheading}>Curated listings with verified agents and investment insights</p>
      <div className={styles.widget}>
        {/* City + Locality inputs + Search button */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select className={styles.select} aria-label="Select city">
            <option>Bangalore</option><option>Mumbai</option>
            <option>Hyderabad</option><option>Delhi NCR</option>
          </select>
          <input className={styles.input} type="text" placeholder="Enter locality" aria-label="Enter locality" />
          <Button variant="teal">Search Properties</Button>
        </div>
      </div>
      <div className={styles.tagCloud} aria-label="Popular localities">
        {POPULAR_LOCALITIES.map(loc => (
          <span key={loc} className={styles.tag}>{loc}</span>
        ))}
      </div>
    </section>
  )
}
```

```css
/* HeroSection.module.css */
.hero {
  background: linear-gradient(135deg, #0B6E77 0%, #073B42 100%); /* hex allowed in gradient */
  padding: 80px 24px;
}
```

---

## TASK-008 — CategoryFilter + PropertyGrid

```tsx
// src/components/home/CategoryFilter.tsx
'use client'
import { useState, useMemo } from 'react'
import type { PropertyCategory, PremiumProperty } from '@/types'
import { filterByCategory } from '@/lib/filterByCategory'
import PropertyGrid from './PropertyGrid'
import styles from './CategoryFilter.module.css'

const CATEGORIES: { value: PropertyCategory; label: string }[] = [
  { value: 'all',        label: 'All'           },
  { value: 'luxury',     label: 'Luxury'        },
  { value: 'ready',      label: 'Ready to Move' },
  { value: 'new-launch', label: 'New Launch'    },
  { value: 'high-yield', label: 'High Yield'    },
]

interface Props { properties: PremiumProperty[] }

export default function CategoryFilter({ properties }: Props) {
  const [category, setCategory] = useState<PropertyCategory>('all')

  const filtered = useMemo(
    () => filterByCategory(properties, category),
    [properties, category]
  )

  const count = filtered.length
  const label = `${count} ${count === 1 ? 'property' : 'properties'} found`

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.inner} role="tablist" aria-label="Property categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={category === cat.value}
              className={`${styles.chip} ${category === cat.value ? styles.chipActive : ''}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {/* ARIA live region */}
      <div aria-live="polite" className="sr-only">{label}</div>
      {/* PropertyGrid receives pre-filtered array */}
      <PropertyGrid properties={filtered} />
    </>
  )
}
```

**Note:** `CategoryFilter` is the `'use client'` boundary. `PropertyGrid` receives the already-filtered array — it is a static server component.

---

## TASK-009 — PremiumPropertyCard

```tsx
// src/components/home/PremiumPropertyCard.tsx
import type { PremiumProperty } from '@/types'
import { formatPrice } from '@/lib/formatPrice'
import { MapPin, Camera } from 'lucide-react'
import Button from '@/components/ui/Button'
import SqVerifiedBadge from '@/components/ui/SqVerifiedBadge'
import ReraBadge from '@/components/ui/ReraBadge'
import YieldBadge from '@/components/ui/YieldBadge'
import ListingSourcePill from '@/components/ui/ListingSourcePill'
import styles from './PremiumPropertyCard.module.css'

export default function PremiumPropertyCard({ property }: { property: PremiumProperty }) {
  return (
    <article className={styles.card}>
      {/* Image block */}
      <div className={styles.imageBlock}>
        <span className={styles.possessionBadge}>{property.possessionStatus}</span>
        <span className={styles.photoBadge}>
          <Camera size={12} aria-hidden="true" />{property.photos} Photos
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <ListingSourcePill source={property.listingSource} />
          {property.verified && <SqVerifiedBadge />}
          {property.reraRegistered && <ReraBadge />}
        </div>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.price}>{formatPrice(property.price)}</p>
        <p className={styles.meta}>
          {property.bhk} · {property.superArea} sqft ·
          <MapPin size={12} aria-hidden="true" /> {property.locality}, {property.city}
        </p>
        <Button variant="outlineTeal" size="sm" fullWidth>
          Contact {property.listingSource}
        </Button>
      </div>

      {/* Investment row — always at bottom */}
      <div className={styles.investRow}>
        <YieldBadge yield={property.rentalYield} />
        <span className={styles.appreciation}>
          {property.capitalAppreciation.toFixed(1)}% Appreciation
        </span>
      </div>
    </article>
  )
}
```

---

## TASK-010 — AgentCard

```tsx
// src/components/home/AgentCard.tsx
import type { Agent } from '@/types'
import { Star } from 'lucide-react'
import SqVerifiedBadge from '@/components/ui/SqVerifiedBadge'
import Button from '@/components/ui/Button'
import styles from './AgentCard.module.css'

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        {/* Photo — 8px radius, NO circles */}
        <div className={styles.photo} role="img" aria-label={`${agent.name} profile photo`} />
        <div>
          <h3 className={styles.name}>{agent.name}</h3>
          {agent.verified && <SqVerifiedBadge />}
          <p className={styles.rating}>
            {agent.rating.toFixed(1)} ★
            <span className={styles.reviewCount}> ({agent.reviewCount} reviews)</span>
          </p>
        </div>
      </div>
      <div className={styles.stats}>
        <span>{agent.transactionsCompleted} Transactions</span>
        <span>{agent.yearsOfExperience} Years Exp.</span>
        <span>{agent.city}</span>
      </div>
      <div className={styles.specs}>
        {agent.specializations.map(s => (
          <span key={s} className={styles.spec}>{s}</span>
        ))}
      </div>
      <Button variant="outlineTeal" size="sm" fullWidth>
        Contact Agent
      </Button>
    </article>
  )
}
// .photo { border-radius: 8px; } — NOT 50%
// .rating { color: var(--color-gold); } — gold for rating display
```

---

## TASK-011 — NewLaunchCard + NewLaunches

```tsx
// NewLaunchCard.tsx
import type { NewLaunch } from '@/types'
import { formatPriceRange } from '@/lib/formatPrice'
import { Camera } from 'lucide-react'
import ReraBadge from '@/components/ui/ReraBadge'
import styles from './NewLaunchCard.module.css'

export default function NewLaunchCard({ launch }: { launch: NewLaunch }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageBlock}>
        <span className={styles.launchBadge}>New Launch</span>
        <span className={styles.photoBadge}>
          <Camera size={12} aria-hidden="true" />{launch.photos} Photos
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.badgeRow}>
          {launch.reraRegistered && <ReraBadge />}
        </div>
        <h3 className={styles.projectName}>{launch.projectName}</h3>
        <p className={styles.builder}>by {launch.builderName}</p>
        <p className={styles.locality}>{launch.locality}, {launch.city}</p>
        <p className={styles.price}>{formatPriceRange(launch.priceFrom, launch.priceTo)}</p>
        <p className={styles.launchDate}>
          <span className={styles.launchLabel}>Launching:</span> {launch.launchDate}
        </p>
        <div className={styles.unitTypes}>
          {launch.unitTypes.map(u => <span key={u} className={styles.unitPill}>{u}</span>)}
        </div>
      </div>
    </article>
  )
}
```

```tsx
// NewLaunches.tsx — horizontal scroll
import type { NewLaunch } from '@/types'
import NewLaunchCard from './NewLaunchCard'
import styles from './NewLaunches.module.css'
// .scroll { display: flex; gap: 24px; overflow-x: auto; scrollbar-width: none; padding-bottom: 8px; }
// .card { flex-shrink: 0; width: 320px; }
```

---

## TASK-012 — Services + CityLinks + TrustBar

### Services
```tsx
// Services.tsx
const ICON_MAP: Record<string, LucideIcon> = { Briefcase, Scale, PaintBucket, Globe }
// 4-column grid → 2-col tablet → 1-col mobile
// Each tile: Icon (teal colour), title, description, Button (outlineTeal)
```

### CityLinks (10 cities)
```tsx
// CityLinks.tsx
// 5-column grid
// international?: boolean → render optional "International" label in gold text
// .international { font-size: 0.625rem; color: var(--color-gold); font-weight: 600; }
```

### TrustBar
```tsx
// TrustBar.tsx — same ICON_MAP pattern as bw_realestate_01
const ICON_MAP: Record<string, LucideIcon> = { Building2, Users, MapPin, Rocket }
// .section { background: var(--color-dark); }
// .icon { color: var(--color-teal); }  ← teal icons, not red (bw_01 used var(--color-red))
```

---

## TASK-013 — QA Grep Suite

```bash
echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

echo "=== No hex in module CSS ===" && \
  grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"
# Exception: HeroSection gradient is in .hero{background:linear-gradient(…)} — acceptable

echo "=== No white on gold ===" && \
  grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css && echo "FAIL" || echo "PASS"

echo "=== SqVerifiedBadge uses teal not green ===" && \
  grep -r "var(--color-green)" src/components/ui/SqVerifiedBadge.module.css && echo "FAIL" || echo "PASS"

echo "=== No circular radius ===" && \
  grep -r "border-radius: 50%" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No font-weight 700 ===" && \
  grep -r "font-weight: 700" src --include="*.module.css" && echo "FAIL" || echo "PASS"

echo "=== No hardcoded CTA ===" && \
  grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components --include="*.tsx" \
  && echo "FAIL" || echo "PASS"

echo "=== useMemo in CategoryFilter ===" && \
  grep -r "useMemo" src/components/home/CategoryFilter.tsx && echo "PASS" || echo "FAIL"

echo "=== DM Sans in layout (not Poppins) ===" && \
  grep -r "Poppins" src/app/layout.tsx && echo "FAIL — wrong font" || echo "PASS"

echo "=== Build ===" && npm run build && echo "PASS"
```
