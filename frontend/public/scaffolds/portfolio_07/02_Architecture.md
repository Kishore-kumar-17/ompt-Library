# 02 — Architecture
## Design-Forward Developer Blog · portfolio_platform_07

---

## 1. TypeScript Schema

```typescript
// src/types/index.ts

export type Category =
  | 'css'
  | 'react'
  | 'animation'
  | 'javascript'
  | 'career'
  | 'svg'
  | 'nextjs'
  | 'general'

export interface Post {
  slug: string
  title: string
  abstract: string           // 2–3 sentence summary shown on PostCard
  publishedOn: string        // ISO 8601 date string e.g. '2024-03-15'
  updatedOn?: string
  category: Category
  featured?: boolean
  published: boolean         // false = draft, excluded from build
}

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3              // ## = 2, ### = 3
}

export const CATEGORY_COLORS: Record<Category, string> = {
  css:        'hsl(210deg 100% 65%)',
  react:      'hsl(193deg  95% 55%)',
  animation:  'hsl(333deg 100% 65%)',
  javascript: 'hsl(48deg  100% 55%)',
  career:     'hsl(142deg  70% 50%)',
  svg:        'hsl(280deg 100% 75%)',
  nextjs:     'hsl(0deg     0% 80%)',
  general:    'hsl(210deg  20% 65%)',
}
```

---

## 2. CSS Token System

```css
/* src/styles/tokens.css — imported once in globals.css */

/* Dark mode (default) */
:root {
  --color-bg:           hsl(210deg 15% 6%);
  --color-bg-card:      hsl(210deg 15% 12%);
  --color-bg-elevated:  hsl(210deg 15% 18%);
  --color-text:         hsl(210deg 10% 90%);
  --color-text-muted:   hsl(210deg 10% 60%);
  --color-border:       hsl(210deg 15% 22%);
  --color-primary:      hsl(225deg 100% 75%);
  --color-secondary:    hsl(333deg 100% 65%);
  --color-tertiary:     hsl(280deg 100% 85%);
  --gradient-accent:    linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%));
}

/* Light mode override */
[data-theme="light"] {
  --color-bg:           hsl(210deg 30% 98%);
  --color-bg-card:      hsl(210deg 20% 94%);
  --color-bg-elevated:  hsl(210deg 20% 88%);
  --color-text:         hsl(210deg 25% 12%);
  --color-text-muted:   hsl(210deg 15% 40%);
  --color-border:       hsl(210deg 20% 78%);
  /* primary, secondary, tertiary, gradient-accent: UNCHANGED */
}
```

---

## 3. Root Layout — Dark Mode Inline Script

```tsx
// src/app/layout.tsx

import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title:       { template: '%s · Blog', default: 'Dev Blog' },
  description: 'Deep dives into CSS, React, and web animations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script MUST be before any stylesheet to prevent white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('color-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored || preferred);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Why `suppressHydrationWarning`:** The inline script sets `data-theme` on `<html>` before React hydrates. React sees a mismatch between server-rendered HTML (no `data-theme`) and the DOM (has `data-theme`). The prop suppresses this warning for the `<html>` element only — it does not suppress warnings for child elements.

---

## 4. ThemeToggle Component

```tsx
// src/components/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme((current as 'dark' | 'light') || 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('color-theme', next)
    setTheme(next)
  }

  return (
    <button
      onClick={toggle}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
```

**Note:** No mounted guard is required. The initial server render always shows "Light mode" (default theme is dark). The `useEffect` corrects the label client-side before the user can interact.

---

## 5. MDX Content Pipeline

### File structure

```
src/
  content/
    posts/
      understanding-flexbox.mdx
      react-state-deep-dive.mdx
      css-custom-properties.mdx
      ...
  lib/
    posts.ts
    toc.ts
```

### lib/posts.ts

```typescript
// src/lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '../types'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR)

  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw  = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
      const { data } = matter(raw)

      return {
        slug,
        title:       data.title       as string,
        abstract:    data.abstract    as string,
        publishedOn: data.publishedOn as string,
        updatedOn:   data.updatedOn,
        category:    data.category    as Post['category'],
        featured:    data.featured    ?? false,
        published:   data.published   ?? true,
      } satisfies Post
    })
    .filter((p) => p.published)
    .sort((a, b) =>
      new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
    )
}

export function getPostBySlug(slug: string): { post: Post; content: string } | null {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  const post: Post = {
    slug,
    title:       data.title       as string,
    abstract:    data.abstract    as string,
    publishedOn: data.publishedOn as string,
    updatedOn:   data.updatedOn,
    category:    data.category    as Post['category'],
    featured:    data.featured    ?? false,
    published:   data.published   ?? true,
  }

  return { post, content }
}
```

### Sample MDX frontmatter

```yaml
---
title: "Understanding CSS Custom Properties"
abstract: "CSS custom properties are more than variables — they participate in the cascade, can be animated, and enable runtime theming without JavaScript. Here is how to use them well."
publishedOn: "2024-03-15"
category: "css"
featured: true
published: true
---
```

---

## 6. ToC Parser

```typescript
// src/lib/toc.ts
import type { TocEntry } from '../types'

export function parseToc(mdxContent: string): TocEntry[] {
  const lines   = mdxContent.split('\n')
  const entries: TocEntry[] = []

  for (const line of lines) {
    // Check h3 BEFORE h2 — "###" contains "##" as a substring
    const h3 = line.match(/^###\s+(.+)$/)
    const h2 = line.match(/^##\s+(.+)$/)

    if (h3) {
      const text = h3[1].trim()
      entries.push({ id: slugify(text), text, level: 3 })
    } else if (h2) {
      const text = h2[1].trim()
      entries.push({ id: slugify(text), text, level: 2 })
    }
  }

  return entries
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
```

---

## 7. Post Page — generateStaticParams + MDX

```tsx
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { parseToc } from '../../../lib/toc'
import { mdxComponents } from '../../../components/mdx'
import { CATEGORY_COLORS } from '../../../types'
import TableOfContents from '../../../components/TableOfContents'
import ScrollProgressBar from '../../../components/ScrollProgressBar'
import styles from './page.module.css'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug)
  if (!result) return {}
  return { title: result.post.title, description: result.post.abstract }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug)
  if (!result) notFound()

  const { post, content } = result
  const toc = parseToc(content)

  return (
    <>
      <ScrollProgressBar />
      <div className={styles.layout}>
        <aside className={styles.tocColumn}>
          <TableOfContents entries={toc} />
        </aside>
        <article className={styles.article}>
          <header className={styles.header}>
            <span
              className={styles.category}
              style={{ color: CATEGORY_COLORS[post.category] }}
            >
              {post.category}
            </span>
            <h1 className={`${styles.title} gradient-text`}>{post.title}</h1>
            <time className={styles.date} dateTime={post.publishedOn}>
              {new Date(post.publishedOn).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          </header>
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </div>
    </>
  )
}
```

---

## 8. MDX Components Registry

```typescript
// src/components/mdx/index.ts
import type { MDXComponents } from 'mdx/types'
import Callout from './Callout'
import Counter from './Counter'
import ColorSwatch from './ColorSwatch'

export const mdxComponents: MDXComponents = {
  Callout,
  Counter,
  ColorSwatch,
}
```

### Callout Component

```tsx
// src/components/mdx/Callout.tsx
import styles from './Callout.module.css'

type CalloutType = 'info' | 'warning' | 'success'

interface CalloutProps {
  type?: CalloutType
  children: React.ReactNode
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <aside
      className={`${styles.callout} ${styles[type]}`}
      role={type === 'warning' ? 'alert' : 'note'}
    >
      {children}
    </aside>
  )
}
```

```css
/* src/components/mdx/Callout.module.css */
.callout {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid transparent;
}
.info    { background: hsl(210deg 100% 65% / 0.1); border-left-color: hsl(210deg 100% 65%); }
.warning { background: hsl(48deg  100% 55% / 0.1); border-left-color: hsl(48deg  100% 55%); }
.success { background: hsl(142deg  70% 50% / 0.1); border-left-color: hsl(142deg  70% 50%); }
```

### Counter Component

```tsx
// src/components/mdx/Counter.tsx
'use client'

import { useState } from 'react'
import styles from './Counter.module.css'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.counter}>
      <button
        onClick={() => setCount((c) => c - 1)}
        className={styles.button}
        aria-label="Decrement counter"
      >
        –
      </button>
      <output className={styles.display}>{count}</output>
      <button
        onClick={() => setCount((c) => c + 1)}
        className={styles.button}
        aria-label="Increment counter"
      >
        +
      </button>
    </div>
  )
}
```

### ColorSwatch Component

```tsx
// src/components/mdx/ColorSwatch.tsx
import styles from './ColorSwatch.module.css'

interface ColorSwatchProps {
  color: string    // e.g. "hsl(225deg 100% 75%)"
  label?: string
}

export default function ColorSwatch({ color, label }: ColorSwatchProps) {
  return (
    <span className={styles.swatch}>
      <span
        className={styles.circle}
        style={{ background: color }}
        aria-hidden="true"
      />
      <code className={styles.label}>{label || color}</code>
    </span>
  )
}
```

---

## 9. ScrollProgressBar Component

```tsx
// src/components/ScrollProgressBar.tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './ScrollProgressBar.module.css'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY    = window.scrollY
      const docHeight  = document.documentElement.scrollHeight
      const viewHeight = window.innerHeight
      const scrollable = docHeight - viewHeight

      if (scrollable <= 0) return
      setProgress((scrollY / scrollable) * 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={styles.bar}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
```

```css
/* src/components/ScrollProgressBar.module.css */
.bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  z-index: 100;
  background: var(--gradient-accent);
  transition: width 0.1s linear;
  pointer-events: none;
}
```

---

## 10. TableOfContents Component

```tsx
// src/components/TableOfContents.tsx
'use client'

import { useEffect, useState } from 'react'
import type { TocEntry } from '../types'
import styles from './TableOfContents.module.css'

interface TableOfContentsProps {
  entries: TocEntry[]
}

export default function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (entries.length === 0) return

    const observers: IntersectionObserver[] = []

    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <p className={styles.label}>On this page</p>
      <ol className={styles.list}>
        {entries.map(({ id, text, level }) => (
          <li
            key={id}
            className={`${styles.item} ${styles[`level${level}`]} ${
              activeId === id ? styles.active : ''
            }`}
          >
            <a href={`#${id}`} className={styles.link}>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

```css
/* src/components/TableOfContents.module.css */
.toc { position: sticky; top: 2rem; padding: 0 1rem; }

.label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.list  { list-style: none; padding: 0; margin: 0; }
.item  { margin: 0.25rem 0; }
.level3 { padding-left: 0.75rem; }

.link {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s;
}

.link:hover   { color: var(--color-text); }
.active .link { color: var(--color-primary); }
```

---

## 11. CategoryFilter Component

```tsx
// src/components/CategoryFilter.tsx
'use client'

import { useState } from 'react'
import { CATEGORY_COLORS } from '../types'
import type { Category } from '../types'
import styles from './CategoryFilter.module.css'

const ALL_CATEGORIES: Category[] = [
  'css', 'react', 'animation', 'javascript', 'career', 'svg', 'nextjs', 'general',
]

interface CategoryFilterProps {
  onFilterChange: (category: Category | null) => void
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [active, setActive] = useState<Category | null>(null)

  const handleClick = (category: Category) => {
    const next = active === category ? null : category
    setActive(next)
    onFilterChange(next)
  }

  return (
    <div className={styles.row} role="group" aria-label="Filter posts by category">
      {ALL_CATEGORIES.map((cat) => {
        const isActive = active === cat
        const color    = CATEGORY_COLORS[cat]

        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={styles.pill}
            aria-pressed={isActive}
            style={
              isActive
                ? { background: color, color: '#fff', borderColor: color }
                : { color, borderColor: color }
            }
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
```

---

## 12. Build Configuration

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

### Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
```
