# 02 — Architecture
## Iconic Developer Portfolio · portfolio_platform_06

---

## 1. Architecture Decision

Single-page static site. Next.js 14 App Router, `output: 'export'`. One `page.tsx` — all sections are anchor IDs. No routing. `page.tsx` is a client component (`'use client'`) because it uses `useActiveSection`. Data lives in `src/data/`. Two custom hooks handle scroll behaviour.

---

## 2. Folder Structure

```text
src/
├── app/
│   ├── layout.tsx           ← metadata, html/body, globals
│   ├── page.tsx             ← 'use client', full layout assembly
│   └── globals.css
├── components/
│   ├── Header.tsx           ← sticky left panel
│   ├── Nav.tsx              ← vertical nav with active state
│   ├── SocialLinks.tsx      ← bottom-of-left-panel icon links
│   ├── AboutSection.tsx     ← bio + skills grid
│   ├── ExperienceSection.tsx
│   ├── JobTabs.tsx          ← 'use client', tab switcher
│   ├── ProjectsSection.tsx
│   ├── FeaturedProject.tsx  ← props: project + index
│   └── ProjectCard.tsx      ← small card for grid
├── data/
│   ├── jobs.ts
│   └── projects.ts
├── hooks/
│   ├── useActiveSection.ts
│   └── useInView.ts
└── types/
    └── index.ts
```

---

## 3. TypeScript Schema

```typescript
// src/types/index.ts

export interface Job {
  company: string
  title: string
  url: string
  range: string          // "January 2022 — Present"
  bullets: string[]      // achievement sentences, present-tense or past-tense
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string        // full URL
  external?: string      // full URL
  image?: string         // /projects/project-name.png
  featured: boolean
}
```

---

## 4. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',   // not used (always dark) — included for completeness
  theme: {
    extend: {
      colors: {
        'navy':            '#0a192f',
        'light-navy':      '#112240',
        'lightest-navy':   '#233554',
        'slate':           '#8892b0',
        'light-slate':     '#a8b2d8',
        'lightest-slate':  '#ccd6f6',
        'off-white':       '#e6f1ff',
        'teal':            '#64ffda',
      },
      fontFamily: {
        sans: ['Calibre', 'Inter', 'San Francisco', 'SF Pro Text', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    },
  },
}

export default config
```

---

## 5. useActiveSection Hook

```typescript
// src/hooks/useActiveSection.ts
'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return activeId
}
```

**rootMargin explained:**
- `-30% 0px -60% 0px` = the observer fires when the section enters the middle 40% band of the viewport (30% from top to 60% from bottom)
- This means the nav updates when the section headline is roughly at eye level
- The 60% bottom margin prevents the next section from activating before the current one is fully exited

---

## 6. useInView Hook

```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip animation under reduced motion
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

// Usage:
// const { ref, inView } = useInView()
// <section ref={ref} className={inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ...>
```

---

## 7. Page Assembly

```typescript
// src/app/page.tsx
'use client'
import { useActiveSection } from '../hooks/useActiveSection'
import Header from '../components/Header'
import AboutSection from '../components/AboutSection'
import ExperienceSection from '../components/ExperienceSection'
import ProjectsSection from '../components/ProjectsSection'

const SECTION_IDS = ['about', 'experience', 'projects'] as const

export default function HomePage() {
  const activeSection = useActiveSection([...SECTION_IDS])

  return (
    <div className="bg-navy text-slate min-h-screen selection:bg-teal/30 selection:text-off-white">
      <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        {/* Left — sticky */}
        <Header activeSection={activeSection} />

        {/* Right — scrollable */}
        <main id="main" className="px-6 pb-24 lg:px-16 lg:py-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <footer className="text-slate text-xs font-mono text-center mt-24">
            <p>Built with Next.js + Tailwind CSS. Designed with care.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
```

---

## 8. Header Component

```typescript
// src/components/Header.tsx
import Nav from './Nav'
import SocialLinks from './SocialLinks'

interface Props {
  activeSection: string
}

export default function Header({ activeSection }: Props) {
  return (
    <header className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24 lg:px-12 px-6 pt-24 pb-12">
      {/* Top block */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-off-white tracking-tight">
          Your Name
        </h1>
        <h2 className="text-lg lg:text-xl font-medium text-lightest-slate mt-3">
          Senior Software Engineer
        </h2>
        <p className="text-slate text-sm mt-4 max-w-[260px] leading-normal">
          I build accessible, pixel-perfect products for the web.
        </p>
        {/* Nav — only visible on desktop in left panel */}
        <nav className="hidden lg:block mt-16">
          <Nav activeSection={activeSection} />
        </nav>
      </div>

      {/* Bottom: social links */}
      <div>
        <SocialLinks />
      </div>
    </header>
  )
}
```

---

## 9. Nav Component

```typescript
// src/components/Nav.tsx
const NAV_ITEMS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
]

export default function Nav({ activeSection }: { activeSection: string }) {
  return (
    <ul className="space-y-5">
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`group flex items-center gap-4 transition-all duration-200 ${
                isActive ? 'text-off-white' : 'text-slate opacity-60 hover:opacity-100 hover:text-lightest-slate'
              }`}
            >
              {/* Growing line indicator */}
              <span
                className={`block h-px transition-all duration-300 ease-custom ${
                  isActive ? 'w-16 bg-off-white' : 'w-8 bg-slate group-hover:w-12 group-hover:bg-lightest-slate'
                }`}
              />
              {/* Label */}
              <span className={`text-xs font-mono uppercase tracking-widest ${
                isActive ? 'font-medium' : ''
              }`}>
                {label}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
```

---

## 10. JobTabs Component

```typescript
// src/components/JobTabs.tsx
'use client'
import { useState } from 'react'
import { jobs } from '../data/jobs'

export default function JobTabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = jobs[activeIndex]

  return (
    <div className="flex flex-col md:flex-row gap-0">
      {/* Tab list */}
      <ul role="tablist" className="flex md:flex-col overflow-x-auto md:overflow-visible min-w-[140px] border-b md:border-b-0 md:border-l border-lightest-navy">
        {jobs.map((job, i) => (
          <li key={job.company} role="none">
            <button
              role="tab"
              aria-selected={i === activeIndex}
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={`w-full text-left px-5 py-3 font-mono text-sm whitespace-nowrap transition-all duration-150 ${
                i === activeIndex
                  ? 'border-l-2 border-teal text-teal bg-light-navy/50'
                  : 'border-l-2 border-transparent text-slate hover:text-teal hover:bg-light-navy/30'
              }`}
            >
              {job.company}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div role="tabpanel" className="px-6 py-2 flex-1">
        <h3 className="text-lightest-slate font-medium text-lg">
          {active.title}{' '}
          <a href={active.url} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
            @ {active.company}
          </a>
        </h3>
        <p className="font-mono text-xs text-slate mt-1 mb-4">{active.range}</p>
        <ul className="space-y-3">
          {active.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-lightest-slate leading-relaxed">
              <span className="text-teal font-mono mt-0.5 shrink-0">▹</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

---

## 11. FeaturedProject Component

```typescript
// src/components/FeaturedProject.tsx
import Image from 'next/image'
import { Project } from '../types'

interface Props {
  project: Project
  index: number
}

export default function FeaturedProject({ project, index }: Props) {
  const isEven = index % 2 === 0   // even: image left, odd: image right

  return (
    <div className={`relative grid lg:grid-cols-12 gap-4 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'}`}>
      {/* Image */}
      <div className="lg:col-span-7 relative rounded-sm overflow-hidden bg-teal/10">
        {project.image ? (
          <a href={project.external || project.github} target="_blank" rel="noopener noreferrer">
            <Image
              src={project.image}
              alt={project.title}
              width={700}
              height={438}
              className="w-full h-full object-cover mix-blend-multiply filter grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </a>
        ) : (
          <div className="w-full aspect-video bg-light-navy" />
        )}
      </div>

      {/* Content */}
      <div className={`lg:col-span-7 lg:absolute ${isEven ? 'lg:right-0 lg:text-right' : 'lg:left-0 lg:text-left'} z-10`}>
        <p className="font-mono text-xs text-teal mb-2 tracking-widest">Featured Project</p>
        <h3 className="text-off-white font-bold text-2xl mb-5 hover:text-teal transition-colors">
          <a href={project.external || project.github} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>
        <div className="bg-light-navy p-6 lg:p-7 text-lightest-slate text-sm leading-relaxed shadow-xl">
          {project.description}
        </div>
        <ul className={`flex flex-wrap gap-4 font-mono text-xs text-slate mt-4 ${isEven ? 'lg:justify-end' : ''}`}>
          {project.tech.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className={`flex gap-4 mt-4 ${isEven ? 'lg:justify-end' : ''} text-lightest-slate`}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`} className="hover:text-teal transition-colors">
              GitHub ↗
            </a>
          )}
          {project.external && (
            <a href={project.external} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className="hover:text-teal transition-colors">
              Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

## 12. Section Heading Pattern

```typescript
// Reusable numbered heading pattern used in all three sections
// "01. About" — where "01." is mono teal and "About" is lightest-slate

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-lightest-slate font-semibold text-2xl mb-12 after:content-[''] after:block after:h-px after:flex-grow after:bg-lightest-navy">
      <span className="font-mono text-teal">{number}.</span>
      {title}
    </h2>
  )
}
// <SectionHeading number="01" title="About" />
```

---

## 13. Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

::selection {
  background-color: rgba(100, 255, 218, 0.3);
  color: #e6f1ff;
}
```
