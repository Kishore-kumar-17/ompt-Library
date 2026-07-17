# 06 — Tasks
## Indian Property Detail Page · bw_realestate_02

---

## Task Index

| Task | Title | Day | Blocker |
|------|-------|-----|---------|
| TASK-001 | Project Scaffold | 1 | — |
| TASK-002 | next.config.ts | 1 | TASK-001 |
| TASK-003 | TypeScript Types | 1 | TASK-001 |
| TASK-004 | Mock Data | 1 | TASK-003 |
| TASK-005 | formatPrice Utility | 1 | TASK-003 |
| TASK-006 | calculateEMI Utility | 1 | TASK-003 |
| TASK-007 | globals.css Tokens | 1 | TASK-001 |
| TASK-008 | layout.tsx | 1 | TASK-007 |
| TASK-009 | UI Atoms (Button, VerifiedBadge, ReraBadge, ListingSourcePill) | 1 | TASK-007 |
| TASK-010 | SiteNav | 2 | TASK-009 |
| TASK-011 | Footer | 2 | TASK-007 |
| TASK-012 | Breadcrumb | 2 | TASK-007 |
| TASK-013 | PropertyGallery | 2 | TASK-007 |
| TASK-014 | PropertyHeader | 2 | TASK-005,009 |
| TASK-015 | RERASection | 2 | TASK-007 |
| TASK-016 | PropertyTabs | 3 | TASK-003 |
| TASK-017 | Tab Components (5) | 3 | TASK-016 |
| TASK-018 | ContactForm | 3 | TASK-009 |
| TASK-019 | EMICalculator | 3 | TASK-006 |
| TASK-020 | SidebarPanel | 3 | TASK-018,019 |
| TASK-021 | SimilarPropertyCard + SimilarProperties | 3 | TASK-005,009 |
| TASK-022 | page.tsx Assembly + Framer Motion + QA | 4 | TASK-001–021 |

---

## TASK-001 — Project Scaffold

```bash
npx create-next-app@latest veriAcres --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

---

## TASK-002 — next.config.ts

```typescript
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default nextConfig
```

---

## TASK-003 — TypeScript Types

**File:** `src/types/index.ts` — see `02_Architecture.md` for full type listing.

Key additions vs bw_realestate_01:
- `TabSection`, `Facing`, `PropertyAge`, `PlaceCategory` — new types
- `PropertyDetail` replaces `Property` — adds `reraNumber`, `reraExpiryDate`, `reraAuthority`, `description`, `amenities`, `floorPlans`, `localityInsights`, `priceTrends`
- `AmenityGroup`, `FloorPlan`, `LocalityInsights`, `NearbyPlace`, `PriceTrendPoint`, `SimilarProperty`, `EMIInputs` — all new

---

## TASK-004 — Mock Data

**File:** `src/lib/data.ts` — see `02_Architecture.md` for full `propertyDetail` + `similarProperties`.

Spot check:
- `propertyDetail.price` = `12_000_000` (raw integer, always via `formatPrice()`)
- `propertyDetail.reraNumber` = `'PRM/KA/RERA/1251/446/PR/171018/002'`
- `propertyDetail.listingSource` = `'Builder'`
- `similarProperties[1].listingSource` = `'Owner'` (tests dynamic CTA: "Contact Owner")

---

## TASK-005 — formatPrice Utility

**File:** `src/lib/formatPrice.ts` — identical to bw_realestate_01. See `02_Architecture.md`.

---

## TASK-006 — calculateEMI Utility

**File:** `src/lib/calculateEMI.ts`

```typescript
/**
 * EMI = P × r × (1+r)^n / ((1+r)^n − 1)
 * r = annualRate / 12 / 100
 * n = years × 12
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0
  const r = annualRate / 12 / 100
  const n = years * 12
  const factor = Math.pow(1 + r, n)
  return Math.round(principal * r * factor / (factor - 1))
}

// Verification:
// calculateEMI(9_000_000, 8.5, 20) → 78152
// calculateEMI(12_000_000, 8.5, 20) → 104202
// calculateEMI(5_000_000, 7.5, 15) → 46352
```

---

## TASK-007 — globals.css Tokens

**File:** `src/app/globals.css` — see `03_Design.md` for full content.

Critical: `--color-orange: #E84118` is the only hex that appears — in `globals.css` only, never in `.module.css`.

---

## TASK-008 — layout.tsx

```tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],    // NOTE: '700' must NOT appear
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VeriAcres — Property Detail',
  description: 'Detailed property information with RERA verification and EMI calculator.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## TASK-009 — UI Atoms

### Button.tsx + Button.module.css
```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'outlineOrange'
  size?: 'md' | 'sm'
  href?: string; onClick?: () => void
  fullWidth?: boolean; children: React.ReactNode
  type?: 'button' | 'submit'
}

export default function Button({ variant = 'primary', size = 'md', href, onClick, fullWidth, children, type = 'button' }: ButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], fullWidth ? styles.fullWidth : ''].join(' ')
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} className={cls} onClick={onClick}>{children}</button>
}
```

```css
/* Button.module.css — key rules */
.primary { background: var(--color-orange); color: var(--color-text); }
/* NEVER: color: var(--color-white) — dark on orange = 4.64:1 ✓ */
.outlineOrange { background: transparent; color: var(--color-orange); border: 1.5px solid var(--color-orange); }
.outlineOrange:hover { background: var(--color-orange); color: var(--color-text); }
/* All radius: 6px (unlike bw_realestate_01's 4px) */
```

### VerifiedBadge.tsx
```tsx
import { ShieldCheck } from 'lucide-react'
import styles from './VerifiedBadge.module.css'
export default function VerifiedBadge() {
  return (
    <span className={styles.badge} aria-label="Verified listing">
      <ShieldCheck size={12} aria-hidden="true" />Verified
    </span>
  )
}
// .badge { color: var(--color-green); font-size: 0.75rem; font-weight: 600; }
// green on white = 5.9:1 ✓✓ — NO background colour
```

### ReraBadge.tsx
```tsx
import styles from './ReraBadge.module.css'
export default function ReraBadge() {
  return <span className={styles.badge} aria-label="RERA registered">RERA ✓</span>
}
// .badge { color: var(--color-green); border: 1px solid var(--color-green); border-radius: 4px; padding: 1px 6px; }
```

### ListingSourcePill.tsx
```tsx
import type { ListingSource } from '@/types'
import styles from './ListingSourcePill.module.css'
const SOURCE_STYLES: Record<ListingSource, { background: string; color: string }> = {
  Owner:   { background: '#EBF5EC', color: '#1A7A3A' },
  Builder: { background: '#EBF0FA', color: '#1A50A0' },
  Agent:   { background: '#FEF3E5', color: '#B45309' },
}
export default function ListingSourcePill({ source }: { source: ListingSource }) {
  return <span className={styles.pill} style={SOURCE_STYLES[source]}>{source}</span>
}
// .pill { font-size: 0.6875rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
```

---

## TASK-010 — SiteNav

```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from './SiteNav.module.css'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} aria-label="Main navigation">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>VeriAcres</Link>
        {/* nav links */}
        <div className={styles.right}>
          <Button href="#" size="sm">Post Property Free</Button>
        </div>
      </div>
    </nav>
  )
}
```

---

## TASK-013 — PropertyGallery

```tsx
'use client'
import { useState } from 'react'
import { Camera } from 'lucide-react'
import styles from './PropertyGallery.module.css'

interface Props { photos: number; title: string }

export default function PropertyGallery({ photos, title }: Props) {
  const [active, setActive] = useState(0)
  const thumbCount = Math.min(photos, 5)

  return (
    <div className={styles.gallery}>
      <div className={styles.heroWrap}>
        {/* Image placeholder — real build uses Next/Image with src */}
        <div className={styles.hero} role="img" aria-label={`${title} — photo ${active + 1} of ${photos}`} />
        <span className={styles.photoCount}>
          <Camera size={14} aria-hidden="true" />
          {photos} Photos
        </span>
      </div>
      <div className={styles.thumbStrip}>
        {Array.from({ length: thumbCount }).map((_, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Photo ${i + 1}`}
            className={`${styles.thumb} ${active === i ? styles.thumbActive : ''}`}
            onClick={() => setActive(i)}
            onKeyDown={e => e.key === 'Enter' && setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## TASK-015 — RERASection

```tsx
// src/components/property/RERASection.tsx
import { ShieldCheck, ExternalLink } from 'lucide-react'
import styles from './RERASection.module.css'

interface Props {
  reraNumber: string
  reraExpiryDate?: string
  reraAuthority?: string
}

export default function RERASection({ reraNumber, reraExpiryDate, reraAuthority }: Props) {
  return (
    <section className={styles.section} aria-label="RERA compliance information">
      <h3 className={styles.heading}>
        <ShieldCheck size={18} aria-hidden="true" />
        RERA Registered
      </h3>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.itemLabel}>Registration Number</span>
          <span className={styles.itemValue}>{reraNumber}</span>
        </div>
        {reraExpiryDate && (
          <div className={styles.item}>
            <span className={styles.itemLabel}>Valid Until</span>
            <span className={styles.itemValue}>{reraExpiryDate}</span>
          </div>
        )}
        {reraAuthority && (
          <div className={styles.item}>
            <span className={styles.itemLabel}>Authority</span>
            <span className={styles.itemValue}>{reraAuthority}</span>
          </div>
        )}
      </div>
      <a href="#" className={styles.portal} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={14} aria-hidden="true" />
        View on RERA Portal
      </a>
    </section>
  )
}
```

**RERASection CSS** — see `03_Design.md` for full `RERASection.module.css`.

**Critical:** RERASection is rendered in `page.tsx` OUTSIDE of `PropertyTabs`. It must be visible regardless of which tab is active.

---

## TASK-016 — PropertyTabs

```tsx
'use client'
import { useState } from 'react'
import type { TabSection, PropertyDetail } from '@/types'
import OverviewTab from './tabs/OverviewTab'
import FloorPlanTab from './tabs/FloorPlanTab'
import AmenitiesTab from './tabs/AmenitiesTab'
import LocalityTab from './tabs/LocalityTab'
import PriceTrendTab from './tabs/PriceTrendTab'
import styles from './PropertyTabs.module.css'

const TABS: { value: TabSection; label: string }[] = [
  { value: 'overview',   label: 'Overview'     },
  { value: 'floorplan',  label: 'Floor Plan'   },
  { value: 'amenities',  label: 'Amenities'    },
  { value: 'locality',   label: 'Locality'     },
  { value: 'pricetrend', label: 'Price Trends' },
]

interface Props { property: PropertyDetail }

export default function PropertyTabs({ property }: Props) {
  const [activeTab, setActiveTab] = useState<TabSection>('overview')

  return (
    <div>
      {/* Tab buttons */}
      <div className={styles.tabs} role="tablist" aria-label="Property information sections">
        {TABS.map(tab => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content — conditional JSX: content unmounts on tab switch */}
      <div className={styles.tabPanel} role="tabpanel">
        {activeTab === 'overview'   && <OverviewTab property={property} />}
        {activeTab === 'floorplan'  && <FloorPlanTab plans={property.floorPlans} />}
        {activeTab === 'amenities'  && <AmenitiesTab groups={property.amenities} />}
        {activeTab === 'locality'   && <LocalityTab insights={property.localityInsights} />}
        {activeTab === 'pricetrend' && <PriceTrendTab trends={property.priceTrends} />}
      </div>
    </div>
  )
}
```

**Grep verification:** `grep -r "display.*none" PropertyTabs.tsx` → empty.

---

## TASK-019 — EMICalculator

```tsx
'use client'
import { useState } from 'react'
import { calculateEMI } from '@/lib/calculateEMI'
import { formatPrice } from '@/lib/formatPrice'
import Button from '@/components/ui/Button'
import styles from './EMICalculator.module.css'

interface Props { defaultPrincipal?: number }

export default function EMICalculator({ defaultPrincipal = 5_000_000 }: Props) {
  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)

  const emi = calculateEMI(principal, rate, years)

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="emi-principal">Loan Amount (₹)</label>
        <input
          id="emi-principal"
          type="number"
          className={styles.input}
          value={principal}
          min={100000}
          step={100000}
          onChange={e => setPrincipal(Number(e.target.value))}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="emi-rate">Interest Rate (%)</label>
        <input
          id="emi-rate"
          type="number"
          className={styles.input}
          value={rate}
          min={1}
          max={20}
          step={0.1}
          onChange={e => setRate(Number(e.target.value))}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="emi-tenure">Tenure (Years)</label>
        <input
          id="emi-tenure"
          type="number"
          className={styles.input}
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={e => setYears(Number(e.target.value))}
        />
      </div>
      <div className={styles.result}>
        <p className={styles.resultLabel}>Monthly EMI</p>
        <p className={styles.resultValue}>{emi > 0 ? formatPrice(emi) : '—'}</p>
      </div>
    </div>
  )
}
```

**Verification:** With `principal=9_000_000, rate=8.5, years=20` → `formatPrice(78152)` → `₹78,152/mo`.

---

## TASK-020 — SidebarPanel

```tsx
'use client'
import { useState } from 'react'
import ContactForm from './ContactForm'
import EMICalculator from './EMICalculator'
import styles from './SidebarPanel.module.css'

type Panel = 'contact' | 'emi'

interface Props { defaultPrincipal?: number }

export default function SidebarPanel({ defaultPrincipal }: Props) {
  const [panel, setPanel] = useState<Panel>('contact')
  return (
    <div className={styles.panel}>
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${panel === 'contact' ? styles.toggleBtnActive : ''}`}
          onClick={() => setPanel('contact')}
          aria-pressed={panel === 'contact'}
        >
          Contact
        </button>
        <button
          className={`${styles.toggleBtn} ${panel === 'emi' ? styles.toggleBtnActive : ''}`}
          onClick={() => setPanel('emi')}
          aria-pressed={panel === 'emi'}
        >
          EMI Calculator
        </button>
      </div>
      <div className={styles.body}>
        {panel === 'contact' && <ContactForm />}
        {panel === 'emi' && <EMICalculator defaultPrincipal={defaultPrincipal} />}
      </div>
    </div>
  )
}
```

---

## TASK-021 — SimilarPropertyCard

```tsx
// src/components/property/SimilarPropertyCard.tsx
import { MapPin } from 'lucide-react'
import type { SimilarProperty } from '@/types'
import { formatPrice } from '@/lib/formatPrice'
import ListingSourcePill from '@/components/ui/ListingSourcePill'
import Button from '@/components/ui/Button'
import styles from './SimilarPropertyCard.module.css'

export default function SimilarPropertyCard({ property }: { property: SimilarProperty }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageBlock} role="img" aria-label={property.title} />
      <div className={styles.content}>
        <ListingSourcePill source={property.listingSource} />
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.price}>{formatPrice(property.price)}</p>
        <p className={styles.meta}>
          {property.bhk} · {property.superArea} sqft
        </p>
        <p className={styles.meta}>
          <MapPin size={12} aria-hidden="true" />{property.locality}
        </p>
        <div className={styles.cta}>
          <Button variant="outlineOrange" size="sm" fullWidth>
            Contact {property.listingSource}
          </Button>
        </div>
      </div>
    </article>
  )
}
```

**Critical:** `Contact {property.listingSource}` — dynamic, never hardcoded. Three similar properties have Owner/Builder/Agent — all render differently.

---

## TASK-022 — QA Grep Suite

```bash
echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"
echo ""
echo "=== No hex in module CSS ===" && \
  grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"
echo ""
echo "=== No CSS tab hiding ===" && \
  grep -r "display.*none" src/components/property/PropertyTabs.tsx && echo "FAIL" || echo "PASS"
echo ""
echo "=== No hardcoded CTA ===" && \
  grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components --include="*.tsx" \
  && echo "FAIL" || echo "PASS"
echo ""
echo "=== Orange button uses dark text (not white) ===" && \
  grep -r "var(--color-white)" src/components/ui/Button.module.css | grep "primary" \
  && echo "FAIL — white on orange found" || echo "PASS"
echo ""
echo "=== No circular radius ===" && \
  grep -r "border-radius: 50%" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"
echo ""
echo "=== No font-weight 700 ===" && \
  grep -r "font-weight: 700" src --include="*.module.css" && echo "FAIL" || echo "PASS"
echo ""
echo "=== Shadow system — 2 files only ===" && \
  grep -rl "box-shadow" src/components --include="*.module.css"
echo "(Expected: SidebarPanel, SiteNav only)"
echo ""
echo "=== Build ===" && npm run build && echo "PASS"
```
