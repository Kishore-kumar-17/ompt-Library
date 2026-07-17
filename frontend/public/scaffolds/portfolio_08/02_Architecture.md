# 02 — Architecture
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

---

## 1. TypeScript Schema

```typescript
// src/types/index.ts

export type PostType = 'article' | 'note'

export interface Post {
  slug: string
  title: string
  date: string         // ISO 8601 — '2024-03-15'
  tags: string[]       // flat, arbitrary strings; multiple per post
  description: string  // used in <meta> and search
  type: PostType
  published: boolean   // false = draft; excluded from all lists
}

export interface Project {
  title: string
  year: number
  description: string  // one-line summary
  article?: string     // blog slug (e.g. '/blog/my-project') or external URL
  demo?: string        // external URL
  source?: string      // GitHub URL
}
```

---

## 2. CSS Token System

```css
/* src/styles/tokens.css */

/* Light mode — DEFAULT */
:root {
  --color-bg:          hsl(40deg 33% 97%);
  --color-bg-card:     hsl(40deg 25% 93%);
  --color-bg-elevated: hsl(40deg 20% 89%);
  --color-text:        hsl(210deg 12% 16%);
  --color-text-muted:  hsl(210deg  8% 50%);
  --color-border:      hsl(40deg  15% 83%);
  --color-accent:      hsl(332deg  61% 41%);
  --color-accent-bg:   hsl(332deg  61% 41% / 0.08);
}

/* Dark mode override */
[data-theme="dark"] {
  --color-bg:          hsl(210deg 12% 13%);
  --color-bg-card:     hsl(210deg 12% 18%);
  --color-bg-elevated: hsl(210deg 12% 23%);
  --color-text:        hsl(40deg  20% 90%);
  --color-text-muted:  hsl(210deg  8% 58%);
  --color-border:      hsl(210deg 12% 26%);
  --color-accent:      hsl(332deg 100% 76%);
  --color-accent-bg:   hsl(332deg 100% 76% / 0.08);
}
```

---

## 3. Root Layout — Dark Mode Script (Light Default)

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import '../styles/globals.css'

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: { template: '%s · Blog', default: 'Dev Blog' },
  description: 'Software engineer and open-source creator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <head>
        {/* Must be first in <head> — sets data-theme before CSS loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('color-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored || preferred);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
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

**Critical difference from portfolio_07:** The fallback in the `catch` block is `'light'`, not `'dark'`. The `:root` CSS defines light mode, so if the script fails, the page still looks correct.

**Font usage:** `next/font/google` loads Outfit and injects it as a CSS variable (`--font-heading`). Applied in globals.css: `h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading), sans-serif; }`.

---

## 4. ThemeToggle Component

```tsx
// src/components/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme((current as 'light' | 'dark') || 'light')
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('color-theme', next)
    setTheme(next)
  }

  return (
    <button
      onClick={toggle}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}
```

---

## 5. Content Pipeline

### File structure

```
src/
  content/
    articles/
      javascript-closures.mdx
      react-hooks-guide.mdx
      ...
    notes/
      learning-rust.mdx
      ...
  lib/
    posts.ts
    projects.ts
```

### Sample MDX frontmatter (article)

```yaml
---
title: "Understanding JavaScript Closures"
description: "Closures are one of the most powerful features in JavaScript. This guide explains exactly what they are, how they work, and when to use them."
date: "2024-03-15"
tags: ["javascript", "fundamentals"]
type: "article"
published: true
---
```

### Sample MDX frontmatter (note)

```yaml
---
title: "Notes on Learning Rust"
description: "A quick brain dump on my first week learning Rust — what surprised me and what didn't."
date: "2024-04-02"
tags: ["rust", "learning"]
type: "note"
published: true
---
```

### lib/posts.ts

```typescript
// src/lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostType } from '../types'

const CONTENT_DIR = path.join(process.cwd(), 'src/content')

function readPostsFromDir(dir: string, type: PostType): Post[] {
  const dirPath = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(dirPath)) return []

  return fs.readdirSync(dirPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug    = filename.replace(/\.mdx$/, '')
      const raw     = fs.readFileSync(path.join(dirPath, filename), 'utf8')
      const { data } = matter(raw)

      return {
        slug,
        title:       data.title       as string,
        date:        data.date        as string,
        tags:        (data.tags       as string[]) ?? [],
        description: data.description as string,
        type,
        published:   data.published   ?? true,
      } satisfies Post
    })
    .filter((p) => p.published)
}

export function getAllPosts(): Post[] {
  const articles = readPostsFromDir('articles', 'article')
  const notes    = readPostsFromDir('notes', 'note')

  return [...articles, ...notes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllArticles(): Post[] {
  return readPostsFromDir('articles', 'article').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllNotes(): Post[] {
  return readPostsFromDir('notes', 'note').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostsByYear(posts: Post[]): Map<number, Post[]> {
  const map = new Map<number, Post[]>()
  for (const post of posts) {
    const year = new Date(post.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(post)
  }
  // Sort years descending
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tagSet   = new Set<string>()
  allPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return [...tagSet].sort()
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getPostBySlug(
  slug: string,
  type: PostType
): { post: Post; content: string } | null {
  const dir      = type === 'article' ? 'articles' : 'notes'
  const filepath = path.join(CONTENT_DIR, dir, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  const post: Post = {
    slug,
    title:       data.title       as string,
    date:        data.date        as string,
    tags:        (data.tags       as string[]) ?? [],
    description: data.description as string,
    type,
    published:   data.published   ?? true,
  }

  return { post, content }
}
```

### lib/projects.ts

```typescript
// src/lib/projects.ts
import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: 'Chip8.js',
    year: 2022,
    description: 'A CHIP-8 emulator written in JavaScript',
    article: '/blog/chip8-emulator-javascript',
    source: 'https://github.com/taniarascia/chip8',
    demo: 'https://taniarascia.github.io/chip8/',
  },
  // ... more projects
]

export function getProjectsByYear(): Map<number, Project[]> {
  const map = new Map<number, Project[]>()
  for (const project of projects) {
    if (!map.has(project.year)) map.set(project.year, [])
    map.get(project.year)!.push(project)
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]))
}
```

---

## 6. Year-Grouped Archive Component

```tsx
// src/components/YearGroup.tsx
import type { Post } from '../types'
import styles from './YearGroup.module.css'

interface YearGroupProps {
  year: number
  posts: Post[]
  isCurrentYear: boolean
  basePath: string   // '/blog' or '/notes'
}

export default function YearGroup({ year, posts, isCurrentYear, basePath }: YearGroupProps) {
  return (
    <details className={styles.group} open={isCurrentYear || undefined}>
      <summary className={styles.summary}>
        <span className={styles.year}>{year}</span>
        <span className={styles.count}>({posts.length})</span>
      </summary>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <time className={styles.date} dateTime={post.date}>
              {formatShortDate(post.date)}
            </time>
            <a href={`${basePath}/${post.slug}`} className={styles.title}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
```

---

## 7. Blog Archive Page

```tsx
// src/app/blog/page.tsx
import Link from 'next/link'
import { getAllArticles, getPostsByYear, getAllTags } from '../../lib/posts'
import YearGroup from '../../components/YearGroup'
import styles from './page.module.css'

export default function BlogPage() {
  const articles  = getAllArticles()
  const byYear    = getPostsByYear(articles)
  const yearKeys  = [...byYear.keys()]
  const thisYear  = new Date().getFullYear()

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Articles</h1>
        <Link href="/topics" className={styles.topicsLink}>View all topics →</Link>
      </div>
      <div className={styles.archive}>
        {yearKeys.map((year) => (
          <YearGroup
            key={year}
            year={year}
            posts={byYear.get(year)!}
            isCurrentYear={year === thisYear}
            basePath="/blog"
          />
        ))}
      </div>
    </main>
  )
}
```

---

## 8. Post Page

```tsx
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getPostBySlug } from '../../../lib/posts'
import styles from './page.module.css'

export async function generateStaticParams() {
  return getAllArticles().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug, 'article')
  if (!result) return {}
  return { title: result.post.title, description: result.post.description }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug, 'article')
  if (!result) notFound()

  const { post, content } = result

  return (
    <main className={styles.page}>
      <Link href="/blog" className={styles.back}>← Back to Articles</Link>
      <article>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time dateTime={post.date} className={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
            {post.tags.length > 0 && (
              <ul className={styles.tags} aria-label="Post tags">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <a href={`/topics/${tag}`} className={styles.tag}>{tag}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>
        <div className={styles.prose}>
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  )
}
```

---

## 9. Topics Pages

```tsx
// src/app/topics/page.tsx
import Link from 'next/link'
import { getAllTags, getPostsByTag } from '../../lib/posts'
import styles from './page.module.css'

export default function TopicsPage() {
  const tags = getAllTags()

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>All Topics</h1>
      <ul className={styles.tagList}>
        {tags.map((tag) => {
          const count = getPostsByTag(tag).length
          return (
            <li key={tag}>
              <Link href={`/topics/${tag}`} className={styles.tagLink}>
                {tag}
                <span className={styles.count}>{count}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
```

```tsx
// src/app/topics/[tag]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllTags, getPostsByTag } from '../../../lib/posts'
import styles from './page.module.css'

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag)
  if (posts.length === 0) notFound()

  return (
    <main className={styles.page}>
      <Link href="/topics" className={styles.back}>← All Topics</Link>
      <h1 className={styles.heading}>{params.tag}</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <span className={styles.typeBadge}>{post.type}</span>
            <time dateTime={post.date} className={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
            <Link href={`/${post.type === 'article' ? 'blog' : 'notes'}/${post.slug}`} className={styles.title}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

---

## 10. Projects Page

```tsx
// src/app/projects/page.tsx
import { projects } from '../../lib/projects'
import ProjectCard from '../../components/ProjectCard'
import styles from './page.module.css'

export default function ProjectsPage() {
  // Group by year descending
  const byYear = new Map<number, typeof projects>()
  for (const p of [...projects].sort((a, b) => b.year - a.year)) {
    if (!byYear.has(p.year)) byYear.set(p.year, [])
    byYear.get(p.year)!.push(p)
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Projects</h1>
      <div className={styles.grid}>
        {projects
          .sort((a, b) => b.year - a.year)
          .map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
      </div>
    </main>
  )
}
```

```tsx
// src/components/ProjectCard.tsx
import type { Project } from '../types'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <span className={styles.year}>{project.year}</span>
      <h2 className={styles.title}>{project.title}</h2>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.links}>
        {project.article && <a href={project.article} className={styles.link}>Article</a>}
        {project.demo    && <a href={project.demo}    className={styles.link} target="_blank" rel="noopener noreferrer">Demo</a>}
        {project.source  && <a href={project.source}  className={styles.link} target="_blank" rel="noopener noreferrer">Source</a>}
      </div>
    </article>
  )
}
```

---

## 11. Build Configuration

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
