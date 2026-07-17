# 02 — Architecture
## Developer Personal Site + Blog · portfolio_platform_05

---

## 1. Architecture Decision

Static site. Next.js 14 App Router with `output: 'export'`. Blog posts as MDX files in `content/posts/` — no database, no CMS, no API calls at runtime. All post routes pre-generated at build time. `gray-matter` parses frontmatter. `next-mdx-remote` renders MDX content.

---

## 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Vite, Astro | Static generation + familiar RSC patterns |
| Language | TypeScript strict | JS | Typed Post interface |
| Styling | Tailwind CSS + Typography plugin | CSS Modules | Content site maps to utility classes; prose plugin handles MDX |
| Content | MDX via next-mdx-remote | Contentful, Sanity | Files in repo — zero latency, zero API |
| Frontmatter | gray-matter | remark-frontmatter | Simple, well-understood |
| Dark mode | next-themes | Manual context | Handles hydration, localStorage, system preference |
| Fonts | System stack | Google Fonts / next/font | Zero FOUT, no network request |
| Deployment | Vercel static export | Server | Fully static, CDN-distributed |

---

## 3. Folder Structure

```text
├── content/
│   └── posts/
│       ├── react-server-components.mdx
│       ├── web-performance-budgets.mdx
│       ├── typescript-patterns.mdx
│       ├── ai-developer-tools.mdx
│       ├── deployment-strategies.mdx
│       └── developer-documentation.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← ThemeProvider + Nav + main + footer + metadata
│   │   ├── page.tsx            ← homepage (bio + featured posts + social)
│   │   ├── blog/
│   │   │   ├── page.tsx        ← all posts list
│   │   │   └── [slug]/
│   │   │       └── page.tsx    ← MDX post rendering
│   │   ├── work/
│   │   │   └── page.tsx        ← work history prose
│   │   └── globals.css
│   ├── components/
│   │   ├── Nav.tsx             ← sticky nav with ThemeToggle
│   │   ├── ThemeToggle.tsx     ← 'use client', text-only button
│   │   ├── PostList.tsx        ← <ul> of post title links
│   │   ├── SocialRow.tsx       ← inline links with · separator
│   │   └── Prose.tsx           ← MDX wrapper with prose classes
│   ├── lib/
│   │   └── posts.ts            ← reads MDX files, parses frontmatter
│   └── types/
│       └── index.ts
└── public/
    └── avatar.png              ← 40×40px (optional)
```

---

## 4. TypeScript Schema

```typescript
// src/types/index.ts

export interface Post {
  slug: string
  title: string
  date: string          // ISO 8601 — "2024-03-15"
  summary: string       // 1–2 sentences for OG description
  published: boolean
  featured?: boolean    // shown on homepage if true
}

export interface WorkEntry {
  company: string
  role: string
  start: string         // "2020"
  end: string           // "2023" or "Present"
  description: string   // 1–2 sentences
}
```

---

## 5. Content Pipeline

```typescript
// src/lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '../types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
  const { data } = matter(raw)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    published: data.published as boolean,
    featured: data.featured as boolean | undefined,
  }
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parsePost)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured)
}

export function getPostBySlug(slug: string): { post: Post; content: string } | null {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  return {
    post: {
      slug,
      title: data.title as string,
      date: data.date as string,
      summary: data.summary as string,
      published: data.published as boolean,
      featured: data.featured as boolean | undefined,
    },
    content,
  }
}
```

---

## 6. Static Generation for Blog Posts

```typescript
// src/app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug)
  if (!result) return {}
  return {
    title: result.post.title,
    description: result.post.summary,
    openGraph: {
      title: result.post.title,
      description: result.post.summary,
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const result = getPostBySlug(params.slug)
  if (!result) notFound()

  const { post, content } = result

  return (
    <article className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {post.title}
      </h1>
      <p className="text-sm text-neutral-500 mt-1 mb-8">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        })}
      </p>
      <Prose>
        <MDXRemote source={content} />
      </Prose>
    </article>
  )
}
```

---

## 7. ThemeProvider Setup

```typescript
// src/app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main id="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

`suppressHydrationWarning` is required on `<html>` — next-themes adds a class to `<html>` which causes a hydration mismatch warning without it.

---

## 8. ThemeToggle Component

```typescript
// src/components/ThemeToggle.tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch — render nothing until mounted
  if (!mounted) return <span className="w-12 inline-block" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
    >
      {theme === 'dark' ? '[Light]' : '[Dark]'}
    </button>
  )
}
```

---

## 9. Nav Component

```typescript
// src/components/Nav.tsx
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
        >
          Your Name
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            Blog
          </Link>
          <Link href="/work" className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            Work
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
```

---

## 10. PostList Component

```typescript
// src/components/PostList.tsx
import Link from 'next/link'
import type { Post } from '../types'

const linkClass =
  'underline decoration-1 underline-offset-[2.5px] decoration-neutral-400 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-500 transition-colors'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-1 list-disc list-inside pl-1">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className={linkClass}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

---

## 11. Prose Component

```typescript
// src/components/Prose.tsx
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none leading-7 prose-a:decoration-neutral-400 prose-a:underline-offset-[2.5px] prose-a:decoration-1">
      {children}
    </div>
  )
}
```

Configure serif font for prose in `tailwind.config.ts`:
```typescript
typography: {
  DEFAULT: {
    css: {
      'p, li': {
        fontFamily: "'Stix Two Text', Georgia, serif",
      },
    },
  },
},
```

---

## 12. Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  // Images in MDX content need this for static export
  // Remove if staying on Vercel with image optimization
}

export default config
```

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.mdx'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {},
  },
}

export default config
```

---

## 13. MDX Frontmatter Schema

Every `.mdx` file in `content/posts/` must have this frontmatter:

```yaml
---
title: "Descriptive Title in Sentence Case"
date: "2024-03-15"
summary: "One sentence that could appear as a description anywhere."
published: true
featured: false
---
```

- `date`: ISO 8601 format. Used for sort order. Not displayed on blog list — only on post page.
- `published: false`: Post is draft. Excluded from all lists and static params.
- `featured: true`: Post appears on homepage Writing section.
- `summary`: Used for `<meta name="description">` and OG tags. Keep under 160 chars.
