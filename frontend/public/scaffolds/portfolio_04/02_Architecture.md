# 02 — Architecture
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## 1. Architecture Decision

Multi-page static site. Next.js 14 App Router with `output: 'export'`. All project routes pre-generated from `src/data/projects.ts`. CSS custom properties handle all theming. Framer Motion for filter grid animations and page transitions. Two custom hooks: `useScrolled` (nav transparency) and `useInView` (scroll reveals).

---

## 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Vite | Static generation of `/work/[slug]` |
| Language | TypeScript strict | JS | Typed project schema, no `any` |
| Styling | CSS Modules + CSS vars | Tailwind | Explicit custom property control for theming |
| Images | `next/image` | `<img>` | Automatic WebP/AVIF, `sizes`, priority loading |
| Animation | Framer Motion | GSAP | Filter grid exit/enter animations |
| Scroll reveal | IntersectionObserver hook | Locomotive Scroll | No external dependency |
| Nav scroll | Custom scroll event hook | `position: fixed` + IntersectionObserver | Simple, reliable |
| Fonts | System stack | Web fonts | Zero FOUT, no network requests |
| Deployment | Vercel static export | Server | Fully static, no runtime needed |

---

## 3. Folder Structure

```text
src/
├── app/
│   ├── layout.tsx               ← root: SkipNav, Nav, main#main, Footer, metadata
│   ├── page.tsx                 ← / Homepage
│   ├── work/
│   │   ├── page.tsx             ← /work (use client — filter state)
│   │   └── [slug]/
│   │       └── page.tsx         ← /work/[slug] project detail
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── Nav/
│   │   ├── Nav.tsx              ← sticky, useScrolled, transparent→cream
│   │   └── Nav.module.css
│   ├── SkipNav/
│   │   └── SkipNav.tsx
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── ProjectCard/
│   │   ├── ProjectCard.tsx      ← caption slide-up hover, NOT image scale
│   │   └── ProjectCard.module.css
│   ├── ProjectGrid/
│   │   ├── ProjectGrid.tsx      ← 3-col grid, AnimatePresence
│   │   └── ProjectGrid.module.css
│   ├── DisciplineFilter/
│   │   ├── DisciplineFilter.tsx ← two-level: tabs + pills
│   │   └── DisciplineFilter.module.css
│   ├── ProjectHero/
│   │   ├── ProjectHero.tsx      ← 100vh, next/image fill, title overlay
│   │   └── ProjectHero.module.css
│   ├── SynopsisSection/
│   │   ├── SynopsisSection.tsx  ← two-col: label/text
│   │   └── SynopsisSection.module.css
│   ├── ImageGallery/
│   │   ├── ImageGallery.tsx     ← alternating full-width + 2-col rows
│   │   └── ImageGallery.module.css
│   ├── MaterialsList/
│   │   ├── MaterialsList.tsx    ← comma-separated or ruled list
│   │   └── MaterialsList.module.css
│   ├── NextProject/
│   │   ├── NextProject.tsx      ← dark section, wrap by index
│   │   └── NextProject.module.css
│   ├── StudioStatement/
│   │   ├── StudioStatement.tsx  ← dark section, display-size text
│   │   └── StudioStatement.module.css
│   ├── PressSection/
│   │   ├── PressSection.tsx     ← text-only publications, muted treatment
│   │   └── PressSection.module.css
│   └── AwardsSection/
│       ├── AwardsSection.tsx    ← year/award/project rows with dividers
│       └── AwardsSection.module.css
├── data/
│   ├── projects.ts              ← all Project entries
│   ├── awards.ts                ← awards list
│   ├── press.ts                 ← press items
│   └── team.ts                  ← team members by discipline
├── types/
│   └── index.ts
├── hooks/
│   ├── useScrolled.ts           ← returns boolean: scrolled past threshold
│   └── useInView.ts             ← IntersectionObserver scroll reveal
└── public/
    ├── og-image.png             ← 1200×630 Open Graph image
    └── work/                    ← project images
        ├── [slug]-cover.jpg
        ├── [slug]-hero.jpg
        └── [slug]-1.jpg ...
```

---

## 4. TypeScript Schema

```typescript
// src/types/index.ts

export type Discipline = 'architecture' | 'interiors' | 'adaptive-reuse'

export type ArchCategory =
  | 'hospitality'
  | 'institutional'
  | 'corporate'
  | 'culture'
  | 'mixed-use'
  | 'homes'

export type IntCategory =
  | 'retail'
  | 'workplace'
  | 'leisure'
  | 'homes'
  | 'hotels'
  | 'fb'
  | 'brand-experiences'

export type ProjectCategory = ArchCategory | IntCategory

export interface Project {
  slug: string
  title: string
  client: string
  discipline: Discipline
  category: ProjectCategory
  location: string         // e.g. "Delhi, India"
  year: number
  featured: boolean
  coverImage: string       // /work/[slug]-cover.jpg
  heroImage: string        // /work/[slug]-hero.jpg
  images: string[]         // ['/work/[slug]-1.jpg', ...]
  synopsis: string         // 1–2 sentences; what the project is
  approach: string         // 2–4 sentences; how the studio worked
  materials: string[]      // e.g. ['Rajasthani sandstone', 'Handwoven cane', 'Lime plaster']
  area?: string            // e.g. '4,200 sqm'
  awards?: string[]        // e.g. ['Surface Design Awards 2025 — Supreme Award']
}

export interface Award {
  year: number
  award: string
  project: string
}

export interface PressItem {
  publication: string      // e.g. 'TIME'
  title: string
  year: number
  url?: string
}

export interface TeamMember {
  name: string
  role: string
  discipline: 'architecture' | 'interiors' | 'operations' | 'research'
}
```

---

## 5. CSS Theme System

```css
/* src/app/globals.css */

:root,
[data-theme="default"] {
  --color:          #1A1A1A;
  --color-bg:       #F5F2EE;
  --color-muted:    rgba(26, 26, 26, 0.45);
  --color-divider:  rgba(26, 26, 26, 0.12);
  --color-accent:   #C4501A;
}

[data-theme="dark"] {
  --color:    #F5F2EE;
  --color-bg: #1A1A1A;
}

[data-theme="accent"] {
  --color:    #F5F2EE;
  --color-bg: #C4501A;
}

body {
  background-color: var(--color-bg);
  color: var(--color);
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}

/* Section-level theming */
section[data-theme] {
  background-color: var(--color-bg);
  color: var(--color);
}
```

---

## 6. Static Generation

```typescript
// src/app/work/[slug]/page.tsx

import { projects } from '../../../data/projects'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()
  return <ProjectDetailLayout project={project} />
}
```

---

## 7. Two-Level Filter Architecture

```typescript
// src/app/work/page.tsx
'use client'

import { useState } from 'react'
import { projects } from '../../data/projects'
import type { Discipline, ProjectCategory } from '../../types'

const ARCH_CATEGORIES: { label: string; value: ArchCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Institutional', value: 'institutional' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Culture', value: 'culture' },
  { label: 'Mixed Use', value: 'mixed-use' },
  { label: 'Homes', value: 'homes' },
]

const INT_CATEGORIES: { label: string; value: IntCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Retail', value: 'retail' },
  { label: 'Workplace', value: 'workplace' },
  { label: 'Leisure', value: 'leisure' },
  { label: 'Homes', value: 'homes' },
  { label: 'Hotels', value: 'hotels' },
  { label: 'F&B', value: 'fb' },
  { label: 'Brand Experiences', value: 'brand-experiences' },
]

export default function WorkPage() {
  const [discipline, setDiscipline] = useState<Discipline | 'all'>('all')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')

  // Reset category when discipline changes
  const handleDisciplineChange = (d: Discipline | 'all') => {
    setDiscipline(d)
    setCategory('all')
  }

  const filtered = projects
    .filter((p) => discipline === 'all' || p.discipline === discipline)
    .filter((p) => category === 'all' || p.category === category)

  const categories =
    discipline === 'architecture' ? ARCH_CATEGORIES :
    discipline === 'interiors'    ? INT_CATEGORIES  :
    []  // adaptive-reuse has no sub-categories

  return (
    <main id="main">
      <DisciplineFilter
        activeDiscipline={discipline}
        onDisciplineChange={handleDisciplineChange}
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <ProjectGrid items={filtered} />
    </main>
  )
}
```

---

## 8. useScrolled Hook

```typescript
// src/hooks/useScrolled.ts
import { useEffect, useState } from 'react'

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
```

---

## 9. useInView Hook

```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setInView(true); return }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
```

---

## 10. NextProject Logic

```typescript
// src/components/NextProject/NextProject.tsx
import { projects } from '../../data/projects'

export function NextProject({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug)
  const next = projects[(index + 1) % projects.length]

  return (
    <section data-theme="dark" className={styles.section}>
      <p className={styles.label}>Next Project</p>
      <Link href={`/work/${next.slug}`} className={styles.link}>
        {next.title} →
      </Link>
      <p className={styles.sub}>{next.location} · {next.year}</p>
    </section>
  )
}
```

---

## 11. ProjectCard Caption Hover

```typescript
// src/components/ProjectCard/ProjectCard.tsx
export function ProjectCard({ project, priority = false }: Props) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.client}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.caption}>
          <p className={styles.captionTitle}>{project.title}</p>
          <p className={styles.captionMeta}>{project.location} · {project.year}</p>
        </div>
      </div>
      <p className={styles.category}>{project.category}</p>
    </Link>
  )
}
```

---

## 12. ImageGallery Pattern

```typescript
// src/components/ImageGallery/ImageGallery.tsx
// Alternating layout: full-width image, then 2-col pair, then full-width, etc.
export function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className={styles.gallery}>
      {images.map((src, i) => {
        const isFullWidth = i % 3 === 0  // every 3rd starting from 0 is full width
        return (
          <div
            key={src}
            className={isFullWidth ? styles.fullRow : styles.halfRow}
          >
            <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        )
      })}
    </div>
  )
}
```

---

## 13. Nav Behaviour

```typescript
// src/components/Nav/Nav.tsx
'use client'
import { useScrolled } from '../../hooks/useScrolled'
import { usePathname } from 'next/navigation'

export function Nav() {
  const scrolled = useScrolled(60)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Nav is transparent only on homepage before scroll
  const transparent = isHome && !scrolled

  return (
    <nav className={`${styles.nav} ${transparent ? styles.transparent : styles.filled}`}>
      <Link href="/" className={styles.logo}>Studio Lotus</Link>
      <ul className={styles.disciplines}>
        <li><Link href="/work?discipline=architecture">Architecture</Link></li>
        <li><Link href="/work?discipline=interiors">Interiors</Link></li>
        <li><Link href="/work?discipline=adaptive-reuse">Adaptive Reuse</Link></li>
      </ul>
      <ul className={styles.utility}>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}
```

---

## 14. Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },  // required for static export
}

export default config
```
