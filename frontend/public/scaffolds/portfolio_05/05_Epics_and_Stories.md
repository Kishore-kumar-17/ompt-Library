# 05 — Epics and Stories
## Developer Personal Site + Blog · portfolio_platform_05

---

## Epic 1 — Foundation

**STORY-001: Project setup**
`create-next-app` with TypeScript and Tailwind; static export config; `@tailwindcss/typography` plugin; `next-themes`, `gray-matter`, `next-mdx-remote` installed; `tailwind.config.ts` with `darkMode: 'class'`; `tsc --noEmit` zero errors.

**STORY-002: Post interface and types**
`Post { slug, title, date, summary, published, featured? }` and `WorkEntry { company, role, start, end, description }` in `src/types/index.ts`. No `any`. File compiles clean.

**STORY-003: MDX content pipeline**
`src/lib/posts.ts` with `getAllPosts()`, `getFeaturedPosts()`, `getPostBySlug(slug)`. Reads `content/posts/*.mdx`, parses frontmatter with gray-matter. Returns typed Post[]. Sorted newest-first. Excludes `published: false` posts.

**STORY-004: Seed MDX content**
6 MDX files in `content/posts/` with valid frontmatter (title, date, summary, published: true, featured for 3). All have at least 3 paragraphs of technical content. Topics: React Server Components, web performance, TypeScript patterns, AI dev tools, deployment, developer documentation.

**STORY-005: Universal link class**
`src/lib/cn.ts` exports `linkClass` constant — the exact Tailwind underline classes used everywhere. Consistent import point for all components.

---

## Epic 2 — Layout Shell

**STORY-006: ThemeToggle component**
`'use client'`. `useTheme` from next-themes. `mounted` state prevents hydration mismatch (renders `<span className="w-12" />` until mounted). Button shows "[Dark]" or "[Light]". No icons. `text-sm text-neutral-500 hover:text-neutral-700 transition-colors`.

**STORY-007: Nav component**
Sticky, `z-10`. `border-b border-neutral-200 dark:border-neutral-800`. `bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm`. Site name left (`text-sm font-medium`). "Blog" + "Work" links + ThemeToggle right, `gap-4`. `text-sm text-neutral-500` for nav links. `transition-colors`.

**STORY-008: Root layout**
`ThemeProvider` (attribute="class", defaultTheme="system", enableSystem) wrapping everything. `<html suppressHydrationWarning>`. `<body className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased">`. SkipNav as first DOM element. Nav. `<main id="main">`. Metadata export.

**STORY-009: Globals and Tailwind config**
`globals.css`: Tailwind directives + `body { font-family: -apple-system, BlinkMacSystemFont, ... }`. `tailwind.config.ts`: Typography plugin with prose serif customisation, prose link underline style, code block colours.

---

## Epic 3 — Blog System

**STORY-010: PostList component**
Props: `posts: Post[]`. Renders `<ul class="space-y-1 list-disc list-inside pl-1">`. Each item: `<Link>` with `linkClass`. Title text only. No date rendered. No description.

**STORY-011: Prose component**
Wrapper div: `prose prose-neutral dark:prose-invert max-w-none leading-7` plus prose link overrides matching `linkClass`. Used in blog post pages to wrap MDX output.

**STORY-012: Blog index page**
`/blog/page.tsx` (server component). `getAllPosts()`. h1 "Writing" (`text-xl font-semibold tracking-tight`, `mb-6`). PostList. No filters, no dates, no categories.

**STORY-013: Blog post static generation**
`generateStaticParams` returns all post slugs from `getAllPosts()`. `notFound()` on unknown slug.

**STORY-014: Blog post rendering**
`getPostBySlug(slug)`. Post title as `<h1>` (`text-2xl font-semibold tracking-tight`). Date formatted below (`text-sm text-neutral-500`, formatted via `toLocaleDateString`). MDXRemote rendering inside Prose component.

**STORY-015: Blog post metadata**
`generateMetadata` per post: title from `post.title`, description from `post.summary`. Open Graph title + description. Correct per-page metadata, not just root layout metadata.

---

## Epic 4 — Homepage and Work

**STORY-016: SocialRow component**
Array of `{ label, href }` links. Rendered inline with `·` separator. Same `linkClass`. External links: `target="_blank" rel="noopener noreferrer"`. `text-sm`.

**STORY-017: Homepage structure**
`/page.tsx` (server component). Container: `max-w-xl mx-auto px-4 mt-8 md:mt-16`. Sections: name paragraph (`font-medium`) → bio paragraph → "Writing" label (`text-sm uppercase tracking-widest text-neutral-500`) → PostList(getFeaturedPosts()) → "Links" label → SocialRow.

**STORY-018: Homepage bio content**
Bio: 2–3 sentences. Current role + company. Focus area (e.g. developer experience, performance, tooling). One line on personal interests or previous role. Written in first person, direct.

**STORY-019: Work page**
`/work/page.tsx`. h1 "Work". WorkEntry data as prose: company name (`font-medium`), role + years below in `text-neutral-500 text-sm`. `description` as paragraph text. No timeline component, no logos, no bullet-point achievements list.

---

## Epic 5 — Polish and Launch

**STORY-020: Open Graph metadata**
Root `layout.tsx` metadata: site title, description. `/public/og-image.png` (1200×630). Per-post `generateMetadata` already handles individual post OG.

**STORY-021: Accessibility**
SkipNav component, first DOM element, visible on focus. One `<h1>` per page confirmed. All `<a>` elements have meaningful text. All interactive elements (`ThemeToggle`, nav links) keyboard reachable. Focus rings via Tailwind `focus-visible:outline-2 focus-visible:outline-neutral-400 focus-visible:outline-offset-2`.

**STORY-022: Performance verification**
No font files in Network tab. No custom images on homepage. `next/image` used for any avatar or MDX images. Lighthouse performance ≥ 95 on homepage.

**STORY-023: Dark mode correctness**
No flash of incorrect theme on reload. ThemeToggle `mounted` guard prevents mismatch. `suppressHydrationWarning` on `<html>`. System preference applied before first paint.

**STORY-024: Build verification**
`tsc --noEmit` zero errors. `npm run build` succeeds. All 6 post slugs present in `/out/blog/`. Unknown slug returns 404. Unpublished post not in `/out/blog/`.

**STORY-025: Final link style audit**
Every `<Link>` and `<a>` in the codebase uses `linkClass`. No blue links, no plain text links, no links missing the underline treatment. Consistent across Nav (different style intentionally — nav uses colour, not underline), PostList, Prose, SocialRow, work page inline links.

---

## Expanded Acceptance Criteria — Critical Stories

---

### STORY-003 — MDX Content Pipeline (expanded AC)

```typescript
// src/lib/posts.ts — exact interface
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '../types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, title: data.title, date: data.date, summary: data.summary, published: data.published ?? true, featured: data.featured ?? false }
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(p => p.featured)
}

export async function getPostBySlug(slug: string) {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return { post: { slug, ...data } as Post, content }
}
```

Acceptance criteria:
- `getAllPosts()` reads ALL `.mdx` files in `content/posts/`
- Posts with `published: false` are excluded
- Result sorted by date descending (newest first)
- `getPostBySlug()` returns `null` for missing slug (caller calls `notFound()`)

---

### STORY-006 — ThemeToggle (expanded AC)

The hydration mismatch problem: `next-themes` renders on the server without knowing the user's preferred theme. Without the `mounted` guard, the button text is wrong on first render and React throws a hydration error.

```tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <span className="w-12 inline-block" />  // placeholder maintains layout
  }

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

Acceptance criteria:
- No hydration error in console on page load
- Button shows correct label immediately after mount
- Theme persists across page refreshes (localStorage via next-themes)
- System preference applied on first visit with no manual setting

---

### STORY-014 — Blog Post Rendering (expanded AC)

```tsx
// src/app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'  // Note: /rsc for App Router
import { Prose } from '../../../components/Prose/Prose'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = await getPostBySlug(params.slug)
  if (!result) return {}
  return {
    title: result.post.title,
    description: result.post.summary,
    openGraph: { title: result.post.title, description: result.post.summary },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const result = await getPostBySlug(params.slug)
  if (!result) notFound()

  return (
    <main className="max-w-xl mx-auto px-4 py-8 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">{result.post.title}</h1>
      <p className="text-sm text-neutral-500 mb-8">
        {new Date(result.post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <Prose>
        <MDXRemote source={result.content} />
      </Prose>
    </main>
  )
}
```

Acceptance criteria:
- `MDXRemote` imported from `next-mdx-remote/rsc` (NOT from `next-mdx-remote`) — App Router requires the RSC version
- `generateMetadata` sets per-post title and description (not root layout metadata)
- Date formatted as human-readable string
- Prose wrapper applies `prose prose-neutral dark:prose-invert max-w-none leading-7`

---

## Epic 6 — Quality Verification

**STORY-026: MDX pipeline verification**
```bash
# All 6 posts generate at build time
npm run build 2>&1 | grep "blog/"  # should list 6 blog slugs

# No unpublished post in output
ls out/blog/  # must NOT include any slug from posts with published: false
```

**STORY-027: Dark mode verification**
- Hard refresh in dark mode → no flash of light theme
- `ThemeToggle` renders placeholder on initial server render (width matches button)
- `next-themes` ThemeProvider has `attribute="class"`, `defaultTheme="system"`, `enableSystem`
- `<html>` has `suppressHydrationWarning` — required by next-themes

**STORY-028: Link style consistency**
```bash
# Check for any plain blue default links (browser default color #0000EE)
# Manual: visit every page, inspect all links for consistent underline treatment
# All links: text-neutral-900 dark:text-neutral-100 underline decoration-neutral-400 underline-offset-2
```

**STORY-029: System font verification**
```bash
grep -r "@import\|fonts.google\|next/font" src/  # zero results
# Network tab: zero .woff/.woff2/.ttf requests
```
