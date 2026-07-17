# 02 — Architecture
## Premier Indian Law Firm · bw_legal_platform_01

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type InsightCategory =
  | 'Legal Update'
  | 'Client Alert'
  | 'Thought Leadership'
  | 'Publication'

export interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string        // SVG path data (d attribute value)
  slug: string        // For "learn more" links — /practice-areas/[slug]
}

export interface Leader {
  id: string
  name: string
  title: string       // "Senior Partner, M&A"
  practice: string    // Which practice area
  image: string       // Portrait photo URL
  bioExcerpt: string  // 1–2 sentences, formal language
}

export interface Insight {
  id: string
  title: string
  category: InsightCategory
  date: string        // ISO date string "2025-03-15"
  image: string       // Hero image URL
  slug: string
  excerpt: string     // 1–2 sentence summary
}

export interface Office {
  city: string
  country: string
  isPrimary?: boolean // true for Mumbai (HQ)
}

export interface Stat {
  value: number       // Numeric value for count-up animation
  suffix: string      // "+" or "%"
  label: string       // "Years of Excellence"
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import { PracticeArea, Leader, Insight, Office, Stat } from '@/types'

export const stats: Stat[] = [
  { value: 75, suffix: '+', label: 'Years of Excellence' },
  { value: 750, suffix: '+', label: 'Legal Professionals' },
  { value: 9, suffix: '', label: 'Offices Across India & Abroad' },
  { value: 50, suffix: '+', label: 'Top-Ranked Practices' },
]

export const practiceAreas: PracticeArea[] = [
  {
    id: 'ma',
    title: 'Mergers & Acquisitions',
    description: 'End-to-end advisory on domestic and cross-border M&A transactions, from structuring to regulatory clearance.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    slug: 'mergers-acquisitions',
  },
  {
    id: 'banking',
    title: 'Banking & Finance',
    description: 'Comprehensive counsel on project finance, syndicated lending, structured finance, and regulatory compliance.',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    slug: 'banking-finance',
  },
  {
    id: 'disputes',
    title: 'Disputes & Arbitration',
    description: 'Representation in commercial disputes, international arbitration, and regulatory enforcement proceedings.',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    slug: 'disputes-arbitration',
  },
  {
    id: 'capital-markets',
    title: 'Capital Markets',
    description: 'Advisory on IPOs, QIPs, debt issuances, and securities regulation for India\'s most significant market transactions.',
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    slug: 'capital-markets',
  },
  {
    id: 'competition',
    title: 'Competition Law',
    description: 'Merger control filings, cartel defense, and competition compliance programs before the Competition Commission of India.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    slug: 'competition-law',
  },
  {
    id: 'tax',
    title: 'Tax',
    description: 'Direct and indirect tax advisory, transfer pricing, and representation before tribunals and appellate authorities.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    slug: 'tax',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Transaction counsel on acquisitions, joint ventures, REITs, and development agreements for landmark real estate projects.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    slug: 'real-estate',
  },
  {
    id: 'technology',
    title: 'Technology & Digital',
    description: 'Data protection, technology transactions, fintech regulation, and digital commerce for India\'s fast-growing digital sector.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
    slug: 'technology-digital',
  },
]

export const leaders: Leader[] = [
  {
    id: 'l1',
    name: 'Cyril S. Shroff',
    title: 'Managing Partner',
    practice: 'Firm Leadership',
    image: '/imgs/leaders/shroff.jpg',
    bioExcerpt: 'Leads the firm with over 30 years of transactional practice, widely regarded as one of India\'s foremost corporate lawyers.',
  },
  {
    id: 'l2',
    name: 'Vandana Shroff',
    title: 'Senior Partner, M&A',
    practice: 'Mergers & Acquisitions',
    image: '/imgs/leaders/vshroff.jpg',
    bioExcerpt: 'Recognised as a leading practitioner in domestic and cross-border M&A, with particular expertise in the financial services sector.',
  },
  // ... 6 more leaders
]

export const insights: Insight[] = [
  {
    id: 'i1',
    title: 'SEBI\'s New Framework for Alternative Investment Funds: Key Implications',
    category: 'Legal Update',
    date: '2025-03-20',
    image: '/imgs/insights/sebi-aif.jpg',
    slug: 'sebi-aif-framework-2025',
    excerpt: 'The Securities and Exchange Board of India has introduced significant amendments to the AIF Regulations, affecting fund structures and governance requirements.',
  },
  {
    id: 'i2',
    title: 'Competition Commission of India: Emerging Trends in Merger Control',
    category: 'Thought Leadership',
    date: '2025-03-10',
    image: '/imgs/insights/cci-merger.jpg',
    slug: 'cci-merger-control-trends',
    excerpt: 'An analysis of recent CCI decisions and their implications for transaction structuring in the current regulatory climate.',
  },
  {
    id: 'i3',
    title: 'The Digital Personal Data Protection Act: Compliance Roadmap',
    category: 'Client Alert',
    date: '2025-02-28',
    image: '/imgs/insights/dpdp.jpg',
    slug: 'dpdpa-compliance-roadmap',
    excerpt: 'Practical guidance for businesses navigating India\'s landmark data protection legislation as implementation timelines crystallise.',
  },
  // ... 3 more insights
]

export const offices: Office[] = [
  { city: 'Mumbai', country: 'India', isPrimary: true },
  { city: 'Delhi-NCR', country: 'India' },
  { city: 'Bengaluru', country: 'India' },
  { city: 'Ahmedabad', country: 'India' },
  { city: 'Hyderabad', country: 'India' },
  { city: 'Chennai', country: 'India' },
  { city: 'GIFT City', country: 'India' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Abu Dhabi', country: 'UAE' },
]

export const values = [
  { label: 'Character', description: 'Integrity and ethics as the foundation of every engagement.' },
  { label: 'Competence', description: 'Deep expertise developed over decades of complex work.' },
  { label: 'Commitment', description: 'Unwavering dedication to client outcomes.' },
]
```

---

## App Layout — `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Roboto } from 'next/font/google'
import './globals.css'
import StickyNav from '@/components/layout/StickyNav'
import Footer from '@/components/layout/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cyril Amarchand Mangaldas — India\'s Premier Law Firm',
  description: 'Full-service law firm with 750+ lawyers across 9 offices. Trusted counsel for India\'s most complex transactions and disputes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body>
        <StickyNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## StickyNav — `src/components/layout/StickyNav.tsx`

```typescript
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PillButton from '@/components/ui/PillButton'
import styles from './StickyNav.module.css'

const navLinks = [
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'People', href: '/people' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Offices', href: '/offices' },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 200)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Cyril Amarchand Mangaldas — Home">
          {/* SVG wordmark */}
          <span className={styles.logoText}>Cyril Amarchand Mangaldas</span>
        </Link>

        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <PillButton variant="primary" href="/contact" size="sm">
          Contact Us
        </PillButton>
      </div>
    </nav>
  )
}
```

---

## GoldCorner — `src/components/ui/GoldCorner.tsx`

```typescript
import styles from './GoldCorner.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function GoldCorner({ children, className = '' }: Props) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  )
}
```

```css
/* GoldCorner.module.css */
.wrapper {
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
}

.wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border-top: 2px solid var(--color-gold);
  border-left: 2px solid var(--color-gold);
}
```

---

## PillButton — `src/components/ui/PillButton.tsx`

```typescript
import Link from 'next/link'
import styles from './PillButton.module.css'

interface Props {
  variant: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md'
  disabled?: boolean
}

export default function PillButton({ variant, children, href, onClick, size = 'md', disabled }: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]}`

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>
  }
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
```

---

## StatCounter — `src/components/home/StatsStrip.tsx`

```typescript
'use client'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/data'
import styles from './StatsStrip.module.css'

function Counter({ value, suffix, duration = 1200 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const animate = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          setCount(Math.floor(progress * value))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsStrip() {
  return (
    <section className={styles.strip} aria-label="Firm credentials">
      {stats.map((stat, i) => (
        <div key={i} className={styles.stat}>
          <p className={styles.number}>
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className={styles.label}>{stat.label}</p>
        </div>
      ))}
    </section>
  )
}
```

---

## Key Architectural Rules

1. **Font variables**: `--font-display` (Playfair Display) for all headings; `--font-body` (Roboto) for all body text, nav, buttons
2. **GoldCorner is a wrapper component** — not a CSS class applied inline. Wrap heading containers: `<GoldCorner><h2 className={styles.sectionTitle}>Our Practices</h2></GoldCorner>`
3. **PillButton is the only button component** — never use a raw `<button>` or `<a>` for CTAs
4. **Leadership grayscale via CSS only** — no JavaScript toggling, pure `filter: grayscale(1)` → hover `grayscale(0)`
5. **StatsStrip counter uses IntersectionObserver** — starts count-up only on first viewport entry (not on every scroll pass)
6. **No `border-radius` on cards** — use `border-radius: 0` explicitly to override any Tailwind defaults or CSS resets
7. **Scroll nav uses `passive: true`** on the event listener for performance
