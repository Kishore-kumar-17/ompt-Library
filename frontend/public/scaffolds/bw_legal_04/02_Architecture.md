# 02 — Architecture
## Productized Indian Legal Services · bw_legal_platform_04

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type TabId = 'startup' | 'business' | 'compliance' | 'ip'

export interface ServiceProduct {
  id: string
  name: string                // "Private Limited Company"
  category: TabId
  originalPrice: number       // 1499 — shown struck-through
  discountedPrice: number     // 999 — shown large
  discountPercent: number     // 33 — shown in yellow badge "-33% Off"
  govtFee: string             // "+ Govt. Fee (varies)"
  deliveryDays: string        // "4-7 days"
  features: string[]          // max 4 items for feature checklist
  popular: boolean            // drives "Most Popular" ribbon
  ctaLabel: string            // "Get Started"
}

export interface Testimonial {
  id: string
  name: string                // "Priya Sharma"
  companyType: string         // "Private Limited Company"
  rating: 4 | 5
  quote: string               // 2 sentences max
}

export interface TrustSignal {
  id: string
  icon: string                // Lucide icon name: "Shield", "Clock", "Star", "Users"
  headline: string            // "ISO 27001 Certified"
  subtext: string             // "Only certified platform in India"
}

export interface Step {
  number: number
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import { ServiceProduct, Testimonial, TrustSignal, Step } from '@/types'

export const serviceProducts: ServiceProduct[] = [
  // Startup tab
  {
    id: 'pvt-ltd',
    name: 'Private Limited Company',
    category: 'startup',
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    govtFee: '+ Govt. Fee (varies)',
    deliveryDays: '4-7 days',
    features: [
      'Your company name filed in 4-7 days',
      'DSC for 2 directors included',
      'MOA & AOA drafting',
      'PAN & TAN registration',
    ],
    popular: true,
    ctaLabel: 'Get Started',
  },
  {
    id: 'llp',
    name: 'Limited Liability Partnership',
    category: 'startup',
    originalPrice: 1999,
    discountedPrice: 1499,
    discountPercent: 25,
    govtFee: '+ Govt. Fee (varies)',
    deliveryDays: '7-10 days',
    features: [
      'LLP agreement drafting',
      'DSC for 2 partners',
      'DPIN for all partners',
      'PAN & TAN registration',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'opc',
    name: 'One Person Company',
    category: 'startup',
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    govtFee: '+ Govt. Fee (varies)',
    deliveryDays: '5-7 days',
    features: [
      'Ideal for solo founders',
      'DSC for 1 director',
      'MOA & AOA drafting',
      'PAN & TAN included',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  // Business tab
  {
    id: 'gst-reg',
    name: 'GST Registration',
    category: 'business',
    originalPrice: 799,
    discountedPrice: 499,
    discountPercent: 38,
    govtFee: 'No Govt. Fee',
    deliveryDays: '3-5 days',
    features: [
      'GSTIN in 3-5 working days',
      'Document preparation',
      'Application filing',
      'GSTIN certificate delivery',
    ],
    popular: true,
    ctaLabel: 'Get Started',
  },
  {
    id: 'msme',
    name: 'MSME / Udyam Registration',
    category: 'business',
    originalPrice: 599,
    discountedPrice: 399,
    discountPercent: 33,
    govtFee: 'No Govt. Fee',
    deliveryDays: '1-2 days',
    features: [
      'Udyam certificate in 1-2 days',
      'Priority sector loan eligibility',
      'Government subsidy benefits',
      'Lifetime valid certificate',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'shop-act',
    name: 'Shop & Establishment Licence',
    category: 'business',
    originalPrice: 1299,
    discountedPrice: 899,
    discountPercent: 31,
    govtFee: '+ State Govt. Fee',
    deliveryDays: '7-14 days',
    features: [
      'Mandatory for all businesses',
      'Document preparation',
      'Govt. portal filing',
      'Licence delivered digitally',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  // Compliance tab
  {
    id: 'annual-filing',
    name: 'Annual ROC Filing',
    category: 'compliance',
    originalPrice: 2999,
    discountedPrice: 1999,
    discountPercent: 33,
    govtFee: '+ MCA Fee (varies)',
    deliveryDays: '5-7 days',
    features: [
      'AOC-4 & MGT-7 filing',
      'Board resolution drafting',
      'Director report preparation',
      'MCA portal submission',
    ],
    popular: true,
    ctaLabel: 'Get Started',
  },
  {
    id: 'gst-return',
    name: 'GST Return Filing',
    category: 'compliance',
    originalPrice: 699,
    discountedPrice: 499,
    discountPercent: 29,
    govtFee: 'No Govt. Fee',
    deliveryDays: '1-2 days',
    features: [
      'GSTR-1 & GSTR-3B filing',
      'Input tax credit reconciliation',
      'Monthly or quarterly plans',
      'CA-reviewed before submission',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'itr-filing',
    name: 'Income Tax Return Filing',
    category: 'compliance',
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    govtFee: 'No Govt. Fee',
    deliveryDays: '2-3 days',
    features: [
      'All ITR forms covered',
      'CA-prepared & reviewed',
      'Capital gains & ESOP handled',
      'Notice handling support',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  // IP tab
  {
    id: 'trademark',
    name: 'Trademark Registration',
    category: 'ip',
    originalPrice: 1999,
    discountedPrice: 1499,
    discountPercent: 25,
    govtFee: '+ ₹4,500 Govt. Fee',
    deliveryDays: '2-3 days (filing)',
    features: [
      'Trademark search report',
      'Application drafting',
      'IP India portal filing',
      'TM acknowledgement in 2-3 days',
    ],
    popular: true,
    ctaLabel: 'Get Started',
  },
  {
    id: 'copyright',
    name: 'Copyright Registration',
    category: 'ip',
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    govtFee: '+ ₹500 Govt. Fee',
    deliveryDays: '7-10 days',
    features: [
      'Covers creative works & software',
      'Application preparation',
      'Copyright office filing',
      'Certificate dispatch',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'patent-search',
    name: 'Patent Search',
    category: 'ip',
    originalPrice: 2499,
    discountedPrice: 1799,
    discountPercent: 28,
    govtFee: 'Included',
    deliveryDays: '3-5 days',
    features: [
      'Prior art search (India + global)',
      'Patentability opinion',
      'Detailed search report',
      'Expert consultation call',
    ],
    popular: false,
    ctaLabel: 'Get Started',
  },
]

export const trustSignals: TrustSignal[] = [
  {
    id: 'iso',
    icon: 'Shield',
    headline: 'ISO 27001 Certified',
    subtext: 'Only certified legal platform in India',
  },
  {
    id: 'guarantee',
    icon: 'Clock',
    headline: '7-Day Money-Back',
    subtext: 'Application submitted in 7 days or 100% refund',
  },
  {
    id: 'google',
    icon: 'Star',
    headline: 'Google 4.5★',
    subtext: '20,000+ verified customer reviews',
  },
  {
    id: 'businesses',
    icon: 'Users',
    headline: '50,000+ Businesses',
    subtext: 'Registered across India since 2010',
  },
]

export const steps: Step[] = [
  {
    number: 1,
    title: 'Choose a Service',
    description: 'Pick from our catalog of fixed-price legal services. No hidden fees.',
  },
  {
    number: 2,
    title: 'Share Documents',
    description: 'Upload your documents securely. Our team reviews everything.',
  },
  {
    number: 3,
    title: 'We Handle the Rest',
    description: 'Our experts file with the government. Track status in real time.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    companyType: 'Private Limited Company',
    rating: 5,
    quote:
      'Registered my Pvt Ltd in exactly 6 days. The process was completely hands-off for me. The team handled every document and even followed up with the MCA portal.',
  },
  {
    id: 't2',
    name: 'Priya Nair',
    companyType: 'Trademark Registration',
    rating: 5,
    quote:
      'Got my brand trademark filed within 2 days of sharing documents. The trademark search report was thorough and the team explained everything clearly.',
  },
  {
    id: 't3',
    name: 'Ravi Shankar',
    companyType: 'GST Registration',
    rating: 5,
    quote:
      'Fastest GST registration I've seen — 4 working days from payment to GSTIN certificate. The price was half what my CA was quoting for the same work.',
  },
]
```

---

## Button — `src/components/ui/Button.tsx`

```typescript
import Link from 'next/link'
import styles from './Button.module.css'

interface Props {
  variant: 'primary' | 'secondary' | 'yellow'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant,
  size = 'md',
  children,
  href,
  onClick,
  disabled,
  fullWidth,
}: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
```

---

## RatingBadge — `src/components/ui/RatingBadge.tsx`

```typescript
import styles from './RatingBadge.module.css'

interface Props {
  platform: 'google' | 'trustpilot'
  rating: number      // 4.5
  count: string       // "20K+"
}

export default function RatingBadge({ platform, rating, count }: Props) {
  const label = `Rated ${rating} out of 5 on ${platform}, ${count} reviews`

  return (
    <div className={styles.badge} role="img" aria-label={label}>
      <span className={styles.platform}>
        {platform === 'google' ? 'Google' : 'Trustpilot'}
      </span>
      <span className={styles.star} aria-hidden="true">⭐</span>
      <span className={styles.rating}>{rating}/5</span>
      <span className={styles.count}>{count} Reviews</span>
    </div>
  )
}
```

---

## ServiceTabs — `src/components/home/ServiceTabs.tsx`

```typescript
'use client'
import { useState } from 'react'
import { serviceProducts } from '@/lib/data'
import type { TabId } from '@/types'
import ProductCard from './ProductCard'
import styles from './ServiceTabs.module.css'

const TABS: { id: TabId; label: string }[] = [
  { id: 'startup', label: 'Startup' },
  { id: 'business', label: 'Business' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'ip', label: 'IP & Trademark' },
]

export default function ServiceTabs() {
  const [active, setActive] = useState<TabId>('startup')
  const filtered = serviceProducts.filter((p) => p.category === active)

  return (
    <section className={styles.section} aria-label="Legal services catalog">
      {/* Tab strip */}
      <div className={styles.tabStrip} role="tablist" aria-label="Service categories">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={[styles.tab, active === tab.id ? styles.activeTab : ''].join(' ')}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div
        id={`tabpanel-${active}`}
        role="tabpanel"
        aria-label={`${TABS.find((t) => t.id === active)?.label} services`}
        className={styles.grid}
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
```

---

## ProductCard — `src/components/home/ProductCard.tsx`

```typescript
import { Check, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { ServiceProduct } from '@/types'
import styles from './ProductCard.module.css'

interface Props {
  product: ServiceProduct
}

export default function ProductCard({ product }: Props) {
  return (
    <div className={[styles.card, product.popular ? styles.popular : ''].join(' ')}>
      {product.popular && (
        <span className={styles.popularRibbon} aria-label="Most popular">
          Most Popular
        </span>
      )}

      <div className={styles.header}>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Strike-through original + discounted price */}
        <div className={styles.pricing}>
          <del className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</del>
          <span className={styles.discountedPrice}>₹{product.discountedPrice.toLocaleString('en-IN')}</span>
          <span className={styles.discountBadge}>-{product.discountPercent}% Off</span>
        </div>
        <p className={styles.govtFee}>{product.govtFee}</p>

        <div className={styles.delivery}>
          <Clock size={14} aria-hidden="true" />
          <span>Filed in {product.deliveryDays}</span>
        </div>
      </div>

      {/* Feature list */}
      <ul className={styles.features} aria-label="What's included">
        {product.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Check size={16} className={styles.checkIcon} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant="primary" fullWidth href={`#${product.id}`}>
        {product.ctaLabel}
      </Button>
    </div>
  )
}
```

---

## Key Architectural Rules

1. **ServiceTabs is the only `'use client'` component** — tab state is the only dynamic UI; all cards, trust signals, steps, and testimonials are server-rendered
2. **ProductCard is a server component** — static pricing data, no interactivity
3. **`border-radius: 6px` on buttons** — not a prop, not overridable; hardcoded in `Button.module.css`
4. **`border-radius: 10px` on cards** — with `box-shadow: 0 4px 18px rgba(0,0,0,0.10)` at rest
5. **Strike-through price uses `<del>` tag** — semantic HTML for accessibility; screen readers announce "deleted" price
6. **Both Google + Trustpilot in hero** — `RatingBadge` used twice with different `platform` props; neither is optional
7. **"Most Popular" ribbon** — `position: absolute; top: -1px; right: 16px` on the card; yellow bg, navy text
8. **Yellow connector on HowItWorks** — `height: 2px; background: var(--color-yellow)` — distinct from ClearTax's blue connector
9. **Footer links hover to yellow** — on navy background, yellow hover (not white hover) matches brand accent
10. **Money-back guarantee** — appears in TrustSignals AND as a line in hero trust row; never hidden
