# 02 — Architecture
## Top-Tier Indian Law Firm · bw_legal_platform_02

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type TabId = 'energy' | 'expertise' | 'execution' | 'unmatched'

export type Office = 'Mumbai' | 'Delhi' | 'Bangalore' | 'Chennai' | 'Pune'

export type InsightCategory =
  | 'Legal Update'
  | 'Client Alert'
  | 'Thought Leadership'
  | 'Publication'

export interface HeroTab {
  id: TabId
  label: string           // "Energy", "Expertise", etc.
  headline: string        // Large H1 text in terracotta
  subheading: string      // White subtitle
  body: string            // Supporting text, white 75%
  ctaLabel: string        // "Explore our M&A practice"
  ctaHref: string
}

export interface PracticeArea {
  id: string
  title: string           // Stored as title-case; displayed UPPERCASE in UI
  description: string
  slug: string
}

export interface Person {
  id: string
  name: string
  role: string            // "Senior Partner", "Partner", "Founding Partner"
  practice: string        // Primary practice area — used for filtering
  office: Office
  image: string
  quote: string           // "What drives my practice is..." — personal statement
}

export interface Insight {
  id: string
  title: string
  category: InsightCategory
  date: string            // ISO: "2025-03-20"
  image: string
  slug: string
  excerpt: string
}

export interface Stat {
  value: string           // String — "Est. 1997", "500+", etc.
  label: string
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import { HeroTab, PracticeArea, Person, Insight, Stat } from '@/types'

export const heroTabs: HeroTab[] = [
  {
    id: 'energy',
    label: 'Energy',
    headline: 'The drive that moves India\'s most complex transactions forward.',
    subheading: 'Relentless pursuit of the best outcome for every client.',
    body: 'We bring the same intensity to a ₹200 crore advisory as to a landmark cross-border deal. Every matter gets our full force.',
    ctaLabel: 'Our approach →',
    ctaHref: '/about',
  },
  {
    id: 'expertise',
    label: 'Expertise',
    headline: '17 practice areas. 500+ lawyers. One firm.',
    subheading: 'Full-service counsel for India\'s most consequential legal matters.',
    body: 'From M&A and capital markets to competition law and dispute resolution — comprehensive expertise under one roof.',
    ctaLabel: 'Explore our practices →',
    ctaHref: '/practice-areas',
  },
  {
    id: 'execution',
    label: 'Execution',
    headline: 'Advice that translates into outcomes.',
    subheading: 'Strategy is only as good as its implementation.',
    body: 'We stay with clients through every stage: structuring, regulatory clearance, documentation, and closing. No handoffs.',
    ctaLabel: 'See our work →',
    ctaHref: '/insights',
  },
  {
    id: 'unmatched',
    label: 'Unmatched',
    headline: 'India\'s most recognised law firm across independent rankings.',
    subheading: 'Ranked #1 in M&A, Capital Markets, and Competition Law.',
    body: 'Chambers Asia-Pacific, Legal 500, and IFLR1000 consistently recognise AZB across more categories than any Indian firm.',
    ctaLabel: 'Our recognition →',
    ctaHref: '/about',
  },
]

export const practiceAreas: PracticeArea[] = [
  { id: 'ma', title: 'Mergers & Acquisitions', description: 'Domestic and cross-border M&A, including PE/VC transactions and joint ventures.', slug: 'mergers-acquisitions' },
  { id: 'banking', title: 'Banking & Finance', description: 'Project finance, syndicated lending, structured finance, and regulatory advisory.', slug: 'banking-finance' },
  { id: 'disputes', title: 'Dispute Resolution', description: 'Commercial litigation, international arbitration, and enforcement proceedings.', slug: 'dispute-resolution' },
  { id: 'capital', title: 'Capital Markets', description: 'IPOs, QIPs, debt issuances, and securities regulatory matters.', slug: 'capital-markets' },
  { id: 'competition', title: 'Competition Law', description: 'Merger control, cartel defense, and compliance programs before the CCI.', slug: 'competition-law' },
  { id: 'tax', title: 'Tax', description: 'Direct and indirect tax, transfer pricing, and appellate representation.', slug: 'tax' },
  { id: 'realestate', title: 'Real Estate', description: 'Acquisitions, joint ventures, REITs, and development transaction counsel.', slug: 'real-estate' },
  { id: 'tech', title: 'Technology & Digital', description: 'Data protection, fintech regulation, and digital commerce advisory.', slug: 'technology-digital' },
  { id: 'employment', title: 'Employment & Labour', description: 'Employment contracts, industrial disputes, and HR compliance advisory.', slug: 'employment-labour' },
  { id: 'ip', title: 'Intellectual Property', description: 'IP protection, licensing, and enforcement across sectors.', slug: 'intellectual-property' },
  { id: 'aviation', title: 'Aviation', description: 'Aircraft finance, leasing, regulatory, and M&A in the aviation sector.', slug: 'aviation' },
  { id: 'pharma', title: 'Pharmaceuticals & Healthcare', description: 'Regulatory, transactional, and IP counsel for pharma and healthcare clients.', slug: 'pharma-healthcare' },
  { id: 'energy', title: 'Energy & Infrastructure', description: 'Project development, finance, and regulatory advisory across energy and infra.', slug: 'energy-infrastructure' },
  { id: 'fintech', title: 'Fintech & Payments', description: 'Regulatory advisory for digital payments, lending, and financial services.', slug: 'fintech-payments' },
  { id: 'insolvency', title: 'Insolvency & Restructuring', description: 'IBC proceedings, creditor rights, and financial restructuring advisory.', slug: 'insolvency-restructuring' },
  { id: 'environment', title: 'Environment & Climate', description: 'Environmental compliance, green finance, and climate-related regulatory advisory.', slug: 'environment-climate' },
  { id: 'general', title: 'General Corporate', description: 'Entity structuring, corporate governance, and routine transactional support.', slug: 'general-corporate' },
]

export const people: Person[] = [
  {
    id: 'p1',
    name: 'Zia Mody',
    role: 'Founding Partner',
    practice: 'Mergers & Acquisitions',
    office: 'Mumbai',
    image: '/imgs/people/mody.jpg',
    quote: 'What drives me is the privilege of being trusted with matters that define a client\'s future. That trust demands the highest standard every single time.',
  },
  {
    id: 'p2',
    name: 'Ajay Bahl',
    role: 'Founding Partner',
    practice: 'Banking & Finance',
    office: 'Delhi',
    image: '/imgs/people/bahl.jpg',
    quote: 'The most complex transactions are the most rewarding — they require you to think across every discipline simultaneously.',
  },
  {
    id: 'p3',
    name: 'Bahram Vakil',
    role: 'Founding Partner',
    practice: 'Competition Law',
    office: 'Mumbai',
    image: '/imgs/people/vakil.jpg',
    quote: 'Competition law in India is still being shaped. I find it extraordinary to be part of building that jurisprudence.',
  },
  // ... 6 more people
]

export const insights: Insight[] = [
  {
    id: 'i1',
    title: 'IBC 2.0: What the Proposed Amendments Mean for Creditors',
    category: 'Legal Update',
    date: '2025-04-01',
    image: '/imgs/insights/ibc.jpg',
    slug: 'ibc-amendments-creditors-2025',
    excerpt: 'The proposed amendments to the Insolvency and Bankruptcy Code introduce significant changes to the resolution timeline and creditor committee powers.',
  },
  {
    id: 'i2',
    title: 'CCI\'s Revised Merger Control Thresholds: A Practitioner\'s View',
    category: 'Thought Leadership',
    date: '2025-03-18',
    image: '/imgs/insights/cci.jpg',
    slug: 'cci-merger-thresholds-2025',
    excerpt: 'An analysis of how the revised CCI thresholds affect deal structuring and notification obligations for transactions involving India.',
  },
  {
    id: 'i3',
    title: 'SEBI\'s New Cybersecurity Framework: Compliance Priorities for Listed Entities',
    category: 'Client Alert',
    date: '2025-03-05',
    image: '/imgs/insights/sebi-cyber.jpg',
    slug: 'sebi-cybersecurity-2025',
    excerpt: 'SEBI\'s comprehensive cybersecurity and cyber resilience framework imposes new obligations on listed entities, with a phased compliance timeline.',
  },
  // ... 3 more insights
]

export const stats: Stat[] = [
  { value: 'Est. 1997', label: 'Founded' },
  { value: '500+', label: 'Legal Professionals' },
  { value: '5', label: 'Offices Across India' },
  { value: '17', label: 'Practice Areas' },
]

export const officeList: string[] = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune']
```

---

## StickyNav — Dark-Section Aware

```typescript
// StickyNav.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PillButton from '@/components/ui/PillButton'
import styles from './StickyNav.module.css'

export default function StickyNav() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-dark-section]')
    if (!darkSections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Nav is dark if ANY dark section is currently intersecting
        const anyVisible = entries.some((e) => e.isIntersecting)
        setIsDark(anyVisible)
      },
      { threshold: 0.3 }
    )

    darkSections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`${styles.nav} ${isDark ? styles.dark : ''}`}
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          AZB & Partners
        </Link>

        <ul className={styles.links} role="list">
          {['Expertise', 'People', 'Insights', 'About', 'Offices'].map((label) => (
            <li key={label}>
              <Link href={`/${label.toLowerCase()}`} className={styles.link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <PillButton variant="primary" href="/contact" size="sm">
          Contact
        </PillButton>
      </div>
    </nav>
  )
}
```

---

## HeroTabs Component

```typescript
// HeroTabs.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroTabs } from '@/lib/data'
import { TabId } from '@/types'
import styles from './HeroTabs.module.css'

export default function HeroTabs() {
  const [activeId, setActiveId] = useState<TabId>('energy')
  const activeTab = heroTabs.find((t) => t.id === activeId)!

  const handleKeyDown = (e: React.KeyboardEvent, currentIdx: number) => {
    if (e.key === 'ArrowRight') {
      const next = (currentIdx + 1) % heroTabs.length
      setActiveId(heroTabs[next].id)
    }
    if (e.key === 'ArrowLeft') {
      const prev = (currentIdx - 1 + heroTabs.length) % heroTabs.length
      setActiveId(heroTabs[prev].id)
    }
  }

  return (
    <section className={styles.hero} data-dark-section aria-label="About the firm">
      {/* Geometric pattern overlay */}
      <div className={styles.pattern} aria-hidden="true" />

      <div className={styles.container}>
        {/* Tab bar */}
        <div role="tablist" className={styles.tabList} aria-label="Firm pillars">
          {heroTabs.map((tab, idx) => (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={tab.id === activeId}
              aria-controls={`panel-${tab.id}`}
              className={`${styles.tab} ${tab.id === activeId ? styles.activeTab : ''}`}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          role="tabpanel"
          id={`panel-${activeId}`}
          aria-labelledby={`tab-${activeId}`}
          className={styles.panel}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className={styles.headline}>{activeTab.headline}</h1>
              <p className={styles.subheading}>{activeTab.subheading}</p>
              <p className={styles.body}>{activeTab.body}</p>
              <a href={activeTab.ctaHref} className={styles.cta}>
                {activeTab.ctaLabel}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
```

---

## PeopleGrid — Filter Logic

```typescript
// PeopleGrid.tsx
'use client'
import { useState, useMemo } from 'react'
import { people, officeList } from '@/lib/data'
import { practiceAreas } from '@/lib/data'
import styles from './PeopleGrid.module.css'

export default function PeopleGrid() {
  const [nameQuery, setNameQuery] = useState('')
  const [officeFilter, setOfficeFilter] = useState('all')
  const [practiceFilter, setPracticeFilter] = useState('all')

  const filtered = useMemo(() =>
    people.filter((p) => {
      const matchName = p.name.toLowerCase().includes(nameQuery.toLowerCase())
      const matchOffice = officeFilter === 'all' || p.office === officeFilter
      const matchPractice = practiceFilter === 'all' || p.practice === practiceFilter
      return matchName && matchOffice && matchPractice
    }),
    [nameQuery, officeFilter, practiceFilter]
  )

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Filter bar */}
        <div className={styles.filterBar} role="search" aria-label="Filter people">
          <input
            type="search"
            placeholder="Search by name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search people by name"
          />
          <select
            value={officeFilter}
            onChange={(e) => setOfficeFilter(e.target.value)}
            className={styles.select}
            aria-label="Filter by office"
          >
            <option value="all">All Offices</option>
            {officeList.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <select
            value={practiceFilter}
            onChange={(e) => setPracticeFilter(e.target.value)}
            className={styles.select}
            aria-label="Filter by practice area"
          >
            <option value="all">All Practices</option>
            {practiceAreas.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
          </select>
          <button
            onClick={() => { setNameQuery(''); setOfficeFilter('all'); setPracticeFilter('all') }}
            className={styles.resetBtn}
          >
            Reset
          </button>
        </div>

        {/* Result count for screen readers */}
        <p aria-live="polite" className={styles.srOnly}>
          Showing {filtered.length} of {people.length} people
        </p>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((person) => (
            <article key={person.id} className={styles.card}>
              <img
                src={person.image}
                alt={`${person.name}, ${person.role}`}
                className={styles.photo}
              />
              <div className={styles.info}>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.practice}>{person.practice} · {person.office}</p>
                <blockquote className={styles.quote}>
                  <p>"{person.quote}"</p>
                </blockquote>
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

## Key Architectural Rules

1. **`data-dark-section` on all navy sections** — hero, practice areas section. Footer does NOT need it (IntersectionObserver should disconnect before footer for best UX).
2. **HeroTabs is `'use client'`** — it holds `activeId` state.
3. **PeopleGrid is `'use client'`** — filter state.
4. **StickyNav is `'use client'`** — `isDark` state.
5. **All other sections can be server components** — no state needed.
6. **Quote text uses `<blockquote>`** — semantic HTML for accessibility.
7. **`useMemo` on people filter** — prevents recomputing on every render.
8. **ARIA live region** on people count — screen reader announces filter changes.
9. **Practice area titles displayed UPPERCASE via CSS** (`text-transform: uppercase`) — not stored uppercase in data.
10. **Geometric pattern overlay**: SVG `<ellipse>` elements with terracotta fill at 5% opacity — `position: absolute; top: 0; right: 0; pointer-events: none; overflow: hidden`.
