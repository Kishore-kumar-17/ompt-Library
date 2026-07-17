# 02 — Architecture
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export interface ServiceTier {
  id: 'self' | 'expert' | 'ca'
  name: string             // "Self File", "Expert Assist", "CA Filing"
  price: number            // 0, 999, 1999
  priceLabel: string       // "Free", "₹999/year", "₹1,999/year"
  tagline: string          // "Perfect for salaried employees"
  recommended: boolean
  features: TierFeature[]
  ctaLabel: string         // "Start for Free", "Get Expert Help", "Get CA Filing"
}

export interface TierFeature {
  label: string
  included: boolean        // true = blue checkmark, false = grey dash
}

export interface Stat {
  value: number            // Numeric for count-up animation
  prefix?: string          // "₹" for currency
  suffix: string           // "Cr+", "M+", "%", "★"
  label: string
}

export interface Step {
  number: number
  title: string
  description: string
  icon?: string            // Optional lucide icon name
}

export interface TrustLogo {
  name: string
  src: string              // Image path — monochrome version
}

export interface Certification {
  name: string             // "ISO 27001"
  subtitle: string         // "Certified"
  icon: string             // Image path
}

export interface ExpertStat {
  value: string            // "500+", "< 24hr", "100%"
  label: string
  icon: string             // Lucide icon name
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import { ServiceTier, Stat, Step, TrustLogo, Certification, ExpertStat } from '@/types'

export const serviceTiers: ServiceTier[] = [
  {
    id: 'self',
    name: 'Self File',
    price: 0,
    priceLabel: 'Free',
    tagline: 'For confident filers with straightforward income',
    recommended: false,
    features: [
      { label: 'ITR-1 & ITR-2 filing', included: true },
      { label: 'Auto-fill from Form 26AS', included: true },
      { label: 'Tax calculation & optimizer', included: true },
      { label: 'CA review before submission', included: false },
      { label: 'Dedicated CA support', included: false },
      { label: 'Notice handling assistance', included: false },
    ],
    ctaLabel: 'Start for Free',
  },
  {
    id: 'expert',
    name: 'Expert Assist',
    price: 999,
    priceLabel: '₹999/year',
    tagline: 'For freelancers, multiple income sources, and capital gains',
    recommended: false,
    features: [
      { label: 'All ITR forms', included: true },
      { label: 'Auto-fill from Form 26AS', included: true },
      { label: 'Tax calculation & optimizer', included: true },
      { label: 'CA review before submission', included: true },
      { label: 'Dedicated CA support', included: false },
      { label: 'Notice handling assistance', included: false },
    ],
    ctaLabel: 'Get Expert Help',
  },
  {
    id: 'ca',
    name: 'CA Filing',
    price: 1999,
    priceLabel: '₹1,999/year',
    tagline: 'Your personal CA handles everything end-to-end',
    recommended: true,
    features: [
      { label: 'All ITR forms', included: true },
      { label: 'Auto-fill from Form 26AS', included: true },
      { label: 'Tax calculation & optimizer', included: true },
      { label: 'CA review before submission', included: true },
      { label: 'Dedicated CA support', included: true },
      { label: 'Notice handling assistance', included: true },
    ],
    ctaLabel: 'Get CA Filing',
  },
]

export const stats: Stat[] = [
  { value: 5346, prefix: '₹', suffix: ' Cr+', label: 'Lifetime Refunds Delivered' },
  { value: 8, suffix: 'M+', label: 'Happy Taxpayers' },
  { value: 99.9, suffix: '%', label: 'Filing Accuracy' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
]

export const steps: Step[] = [
  {
    number: 1,
    title: 'Upload Documents',
    description: 'Share your Form 16, bank statements, and investment proofs in minutes.',
    icon: 'Upload',
  },
  {
    number: 2,
    title: 'CA Reviews & Prepares',
    description: 'Your dedicated ICAI-qualified CA reviews, optimises, and prepares your ITR.',
    icon: 'UserCheck',
  },
  {
    number: 3,
    title: 'File & Get Refund',
    description: 'CA files your return. Track your refund status in real time.',
    icon: 'CheckCircle',
  },
]

export const trustLogos: TrustLogo[] = [
  { name: 'Swiggy', src: '/imgs/logos/swiggy.svg' },
  { name: 'Myntra', src: '/imgs/logos/myntra.svg' },
  { name: 'Zomato', src: '/imgs/logos/zomato.svg' },
  { name: 'Flipkart', src: '/imgs/logos/flipkart.svg' },
  { name: 'PhonePe', src: '/imgs/logos/phonepe.svg' },
  { name: 'Paytm', src: '/imgs/logos/paytm.svg' },
]

export const certifications: Certification[] = [
  { name: 'ISO 27001', subtitle: 'Certified', icon: '/imgs/certs/iso.svg' },
  { name: 'SSL 128-bit', subtitle: 'Encryption', icon: '/imgs/certs/ssl.svg' },
  { name: 'SOC 2', subtitle: 'Compliant', icon: '/imgs/certs/soc2.svg' },
]

export const expertStats: ExpertStat[] = [
  { value: '500+', label: 'ICAI-Qualified CAs', icon: 'Users' },
  { value: '< 24hr', label: 'Turnaround Time', icon: 'Clock' },
  { value: '100%', label: 'Accuracy Guarantee', icon: 'Shield' },
]
```

---

## Button — `src/components/ui/Button.tsx`

```typescript
import Link from 'next/link'
import styles from './Button.module.css'

interface Props {
  variant: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
}

export default function Button({ variant, size = 'md', children, href, onClick, disabled, fullWidth }: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ].filter(Boolean).join(' ')

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} onClick={onClick} disabled={disabled}>{children}</button>
}
```

---

## StarRating — `src/components/ui/StarRating.tsx`

```typescript
interface Props {
  value: number     // 4.9
  count?: number    // 45000
  size?: 'sm' | 'md'
}

export default function StarRating({ value, count, size = 'md' }: Props) {
  const label = count
    ? `Rated ${value} out of 5 stars, ${count.toLocaleString('en-IN')} reviews`
    : `Rated ${value} out of 5 stars`

  return (
    <div
      className={styles.rating}
      role="img"
      aria-label={label}
    >
      <span className={styles.star} aria-hidden="true">⭐</span>
      <span className={styles.value}>{value}/5</span>
      {count && (
        <span className={styles.count}>{(count / 1000).toFixed(0)}K+ Reviews</span>
      )}
    </div>
  )
}
```

---

## StatsRow — Count-up with IntersectionObserver

```typescript
// src/components/home/StatsRow.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/data'
import styles from './StatsRow.module.css'

function Counter({ value, prefix = '', suffix }: { value: number; prefix?: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1000
        const start = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * value * 10) / 10)
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className={styles.stat}>
      <p className={styles.value}>
        {prefix}{count}{suffix}
      </p>
    </div>
  )
}

export default function StatsRow() {
  return (
    <section className={styles.section} aria-label="Platform outcomes">
      <div className={styles.container}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## Logo Marquee — CSS-Only Animation

```typescript
// src/components/home/TrustStrip.tsx
import { trustLogos, certifications } from '@/lib/data'
import styles from './TrustStrip.module.css'

export default function TrustStrip() {
  // Duplicate array for seamless loop
  const doubled = [...trustLogos, ...trustLogos]

  return (
    <div className={styles.strip}>
      {/* Company logo marquee */}
      <div className={styles.marqueeWrapper} aria-label="Trusted by leading companies">
        <div className={styles.track}>
          {doubled.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className={styles.logo}
            />
          ))}
        </div>
      </div>

      {/* Certification badges */}
      <div className={styles.certs} aria-label="Security certifications">
        {certifications.map((cert) => (
          <div key={cert.name} className={styles.cert}>
            <img src={cert.icon} alt={cert.name} className={styles.certIcon} />
            <div>
              <p className={styles.certName}>{cert.name}</p>
              <p className={styles.certSub}>{cert.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Key Architectural Rules

1. **No scroll listener in StickyNav** — nav is always dark, no state needed; `StickyNav` can be a server component
2. **StatsRow is `'use client'`** — needs IntersectionObserver
3. **ServiceTiers is a server component** — static pricing data, no interactivity
4. **Logo marquee is CSS-only** — `@keyframes marquee` on the `.track` element, no JS
5. **`prefers-reduced-motion` on marquee**: `@media (prefers-reduced-motion: reduce) { .track { animation: none; } }`
6. **Counter stops at final value** — `observer.disconnect()` after firing; `Math.round` to avoid float display
7. **Service tier features**: `TierFeature.included` drives the icon — blue checkmark (✓) vs grey dash (—); not a boolean-to-string in the component
8. **Recommended badge**: rendered above the recommended card, not inside it — `position: absolute; top: -12px`
9. **Button `fullWidth` prop**: ServiceTiers uses `fullWidth` on tier CTAs — fills card width
10. **Font weight 800**: explicitly used on H1 and all `.value` stat elements — verify it loads
