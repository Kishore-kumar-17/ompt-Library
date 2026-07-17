# 02 — Architecture
## Studio Portfolio with Case Studies · portfolio_platform_03

---

### 1. Architecture Decision

Multi-page static site. Next.js 14 App Router with `output: 'export'` for static generation. All case study routes pre-generated from `src/data/work.ts`. CSS custom properties handle all theming — no JavaScript theme switching. Framer Motion for page transitions and work grid animations.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Vite | Static generation of `/work/[slug]` routes |
| Language | TypeScript strict | JS | typed case study schema |
| Styling | CSS Modules + CSS vars | Tailwind | manual theme system requires explicit CSS custom property control |
| Images | `next/image` | `<img>` | automatic WebP/AVIF, `sizes` attribute, priority loading |
| Animations | Framer Motion | GSAP | page transitions + work grid re-renders |
| Scroll reveal | Intersection Observer (custom hook) | Locomotive Scroll | no external dependency needed |
| Fonts | System stack | Web fonts | instant render, no FOUT |
| Deployment | Vercel static export | Server | no dynamic routes at runtime |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── layout.tsx               ← root: Nav, metadata, body theme attr
│   ├── page.tsx                 ← / Homepage
│   ├── work/
│   │   ├── page.tsx             ← /work index
│   │   └── [slug]/
│   │       └── page.tsx         ← /work/[slug] case study
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── Nav/
│   │   ├── Nav.tsx              ← sticky horizontal nav
│   │   └── Nav.module.css
│   ├── VideoHero/
│   │   ├── VideoHero.tsx        ← full-viewport video section
│   │   └── VideoHero.module.css
│   ├── WorkCard/
│   │   ├── WorkCard.tsx         ← case study card with hover
│   │   └── WorkCard.module.css
│   ├── WorkGrid/
│   │   ├── WorkGrid.tsx         ← 2-col grid, accepts filtered items
│   │   └── WorkGrid.module.css
│   ├── FilterBar/
│   │   ├── FilterBar.tsx        ← category filter pills
│   │   └── FilterBar.module.css
│   ├── CaseStudyHero/
│   │   ├── CaseStudyHero.tsx
│   │   └── CaseStudyHero.module.css
│   ├── MetaStrip/
│   │   ├── MetaStrip.tsx        ← client, year, scope, deliverables
│   │   └── MetaStrip.module.css
│   ├── NarrativeSection/
│   │   ├── NarrativeSection.tsx ← Challenge / Approach / Outcome
│   │   └── NarrativeSection.module.css
│   ├── ManifestoSection/
│   │   ├── ManifestoSection.tsx ← dark theme, display-size text
│   │   └── ManifestoSection.module.css
│   ├── TeamSection/
│   │   ├── TeamSection.tsx
│   │   └── TeamSection.module.css
│   ├── NextProject/
│   │   ├── NextProject.tsx      ← CTA to next case study
│   │   └── NextProject.module.css
│   └── SkipNav/
│       └── SkipNav.tsx
├── data/
│   ├── work.ts                  ← all CaseStudy entries
│   ├── team.ts                  ← team members by discipline
│   └── awards.ts                ← awards list
├── types/
│   └── index.ts
├── hooks/
│   └── useInView.ts             ← IntersectionObserver scroll reveal
└── public/
    ├── hero.mp4
    ├── hero-poster.jpg          ← video fallback poster
    └── work/                    ← case study images
```

---

### 4. TypeScript Schema

```typescript
// src/types/index.ts

export type Category = 'branding' | 'digital' | 'experience' | 'ecommerce' | 'content'
export type Theme = 'default' | 'dark' | 'red' | 'blue'

export interface CaseStudy {
  slug: string
  client: string
  category: Category
  year: number
  featured: boolean
  coverImage: string
  heroImage: string
  tagline: string
  scope: string[]
  deliverables: string[]
  challenge: string
  approach: string
  outcome: string
  images: string[]
  liveUrl?: string
  awards?: string[]
}

export interface TeamMember {
  name: string
  role: string
  year: number          // year they joined
}

export interface TeamData {
  design: TeamMember[]
  development: TeamMember[]
  operations: TeamMember[]
}

export interface Award {
  year: number
  award: string
  project: string
}
```

---

### 5. CSS Theme System

```css
/* src/app/globals.css */

:root,
[data-theme="default"] {
  --color:    #0A0A0A;
  --color-bg: #FFFFFF;
}

[data-theme="dark"] {
  --color:    #FFFFFF;
  --color-bg: #0A0A0A;
}

[data-theme="red"] {
  --color:    #FFFFFF;
  --color-bg: #DA382E;
}

[data-theme="blue"] {
  --color:    #FFFFFF;
  --color-bg: #312DFB;
}

/* Apply to any element — section, div, body */
/* Usage: <section data-theme="dark"> */

body {
  background-color: var(--color-bg);
  color: var(--color);
  transition:
    background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

/* Section-level theming: each section can have its own theme */
section[data-theme] {
  background-color: var(--color-bg);
  color: var(--color);
}
```

**How section theming works:**
```tsx
// Manifesto section is always dark
<section data-theme="dark" className={styles.manifesto}>
  <p>Design and code are only tools of expression.</p>
</section>

// Homepage hero is always dark (video bg)
<section data-theme="dark" className={styles.hero}>
  <video ... />
  <h1>Digital-First Design Studio</h1>
</section>

// Default sections inherit from :root
<section className={styles.work}>
  {/* white bg, black text */}
</section>
```

---

### 6. Static Generation Pattern

```typescript
// src/app/work/[slug]/page.tsx

import { caseStudies } from '../../../data/work'
import { notFound } from 'next/navigation'

// Pre-generate all case study routes at build time
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug)
  if (!cs) notFound()
  return <CaseStudyLayout caseStudy={cs} />
}
```

---

### 7. Work Filter Architecture

```typescript
// src/app/work/page.tsx
'use client'

import { useState } from 'react'
import { caseStudies } from '../../data/work'
import type { Category } from '../../types'

const CATEGORIES: { label: string; value: Category | 'all' }[] = [
  { label: 'All',         value: 'all'        },
  { label: 'Branding',    value: 'branding'   },
  { label: 'Digital',     value: 'digital'    },
  { label: 'Experience',  value: 'experience' },
  { label: 'E-commerce',  value: 'ecommerce'  },
  { label: 'Content',     value: 'content'    },
]

export default function WorkPage() {
  const [active, setActive] = useState<Category | 'all'>('all')

  const filtered = active === 'all'
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === active)

  return (
    <>
      <FilterBar categories={CATEGORIES} active={active} onSelect={setActive} />
      <WorkGrid items={filtered} />
    </>
  )
}
```

---

### 8. Scroll Reveal Hook

```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

// Usage in component:
// const { ref, inView } = useInView()
// <section ref={ref} className={inView ? styles.visible : styles.hidden}>
```

---

### 9. Next Project CTA Logic

```typescript
// src/components/NextProject/NextProject.tsx
import { caseStudies } from '../../data/work'

export function NextProject({ currentSlug }: { currentSlug: string }) {
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === currentSlug)
  const next = caseStudies[(currentIndex + 1) % caseStudies.length]

  return (
    <section data-theme="dark" className={styles.nextProject}>
      <p className={styles.label}>Next Project</p>
      <Link href={`/work/${next.slug}`} className={styles.link}>
        {next.client} →
      </Link>
    </section>
  )
}
```

---

### 10. Environment and Build

```typescript
// next.config.ts
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },   // or remove for Vercel image optimization
}

// No environment variables needed — fully static
```

```bash
npm run build   # generates /out directory (static)
vercel --prod   # deploy static output
```

---

### 11. Component Data Flow

```
layout.tsx
  └── Nav.tsx (static — no props)
  └── SkipNav.tsx (static)
  └── {children} → page.tsx

page.tsx  (/ homepage)
  ├── VideoHero.tsx (no props — imports studio content internally)
  ├── StudioStatement.tsx (no props — static text)
  ├── WorkGrid.tsx ← items={caseStudies.filter(cs => cs.featured).slice(0, 3)}

work/page.tsx  ('use client')
  ├── [discipline, setActive] useState
  ├── FilterBar.tsx ← categories, active, onSelect
  └── WorkGrid.tsx ← items={filtered}
       └── WorkCard.tsx ← caseStudy={cs} (per item)

work/[slug]/page.tsx  (Server Component)
  ├── generateStaticParams() → all slugs
  ├── const cs = find(slug) or notFound()
  ├── CaseStudyHero.tsx ← caseStudy={cs}
  ├── MetaStrip.tsx ← caseStudy={cs}
  ├── NarrativeSection.tsx ← label="Challenge" body={cs.challenge}
  ├── NarrativeSection.tsx ← label="Approach" body={cs.approach}
  ├── NarrativeSection.tsx ← label="Outcome" body={cs.outcome}
  └── NextProject.tsx ← currentSlug={cs.slug}

about/page.tsx  (Server Component)
  ├── ManifestoSection.tsx (static)
  ├── CapabilitiesSection.tsx (static)
  ├── TeamSection.tsx ← teamData (imported)
  └── AwardsSection.tsx ← awards (imported)
```

---

### 12. VideoHero Component

```tsx
// src/components/VideoHero/VideoHero.tsx
'use client'  // needed for useEffect + matchMedia

import { useEffect, useRef } from 'react'
import styles from './VideoHero.module.css'

export function VideoHero({ tagline }: { tagline: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  return (
    <section data-theme="dark" className={styles.hero}>
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        poster="/hero-poster.jpg"
        className={styles.video}
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1 className={styles.tagline}>{tagline}</h1>
      </div>
    </section>
  )
}
```

```css
/* VideoHero.module.css */
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: relative;  /* above video */
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}
.tagline {
  font-size: var(--size-display);
  font-weight: 700;
  color: var(--color);   /* white in dark section */
  text-align: center;
  max-width: 20ch;
  line-height: 1.1;
}

@media (prefers-reduced-motion: reduce) {
  .video { display: none; }
  .hero { background-color: var(--color-bg); }
}
```

---

### 13. WorkCard Hover Pattern

```css
/* WorkCard.module.css */
.card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.imageWrapper {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  margin-bottom: var(--space-sm);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms var(--ease);
}

.card:hover .image {
  transform: scale(1.04);
}

.client {
  font-weight: 700;
  font-size: var(--size-body);
  color: var(--color);
  margin-bottom: 0.25rem;
}

.meta {
  font-size: var(--size-small);
  color: var(--color);
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
}

.category {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

---

### 14. AnimatePresence Grid Pattern

The work grid must animate cards in/out when the filter changes:

```tsx
// src/components/WorkGrid/WorkGrid.tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import type { CaseStudy } from '../../types'
import { WorkCard } from '../WorkCard/WorkCard'
import styles from './WorkGrid.module.css'

export function WorkGrid({ items }: { items: CaseStudy[] }) {
  return (
    <div className={styles.grid}>
      <AnimatePresence mode="popLayout">
        {items.map((cs) => (
          <motion.div
            key={cs.slug}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WorkCard caseStudy={cs} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

`mode="popLayout"` is critical — it removes exiting elements from layout flow immediately, preventing remaining cards from briefly snapping positions. `key={cs.slug}` ensures each card has a stable identity across filter changes.

---

### 15. Sample work.ts Content

```typescript
// src/data/work.ts
import type { CaseStudy } from '../types'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'meridian-rebrand',
    client: 'Meridian Financial',
    category: 'branding',
    year: 2024,
    featured: true,
    coverImage: '/work/meridian-cover.jpg',
    heroImage: '/work/meridian-hero.jpg',
    tagline: 'A complete brand overhaul for a fintech challenger',
    scope: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    deliverables: ['Logo System', 'Typography', 'Colour System', 'Brand Book'],
    challenge: 'Meridian had outgrown their startup-era visual identity...',
    approach: 'We began with a three-week strategy sprint...',
    outcome: 'The new identity launched with a 40% increase in brand recognition...',
    images: ['/work/meridian-01.jpg', '/work/meridian-02.jpg'],
    liveUrl: 'https://meridianfinancial.com',
  },
  // 5-7 more case studies covering all categories
]
```
