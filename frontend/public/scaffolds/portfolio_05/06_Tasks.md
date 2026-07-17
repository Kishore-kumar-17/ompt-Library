# 06 — Tasks
## Developer Personal Site + Blog · portfolio_platform_05

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Ask before changing the MDX pipeline, type schema, or link style system.

---

## Phase 0 — Foundation

### TASK-001: Project setup
```bash
npx create-next-app@latest site --typescript --tailwind --app --src-dir --no-eslint
cd site
npm install next-themes gray-matter next-mdx-remote @tailwindcss/typography
```
Add to `next.config.ts`:
```typescript
const config: NextConfig = { output: 'export' }
```
Add to `tailwind.config.ts`:
```typescript
darkMode: 'class',
plugins: [require('@tailwindcss/typography')],
```
Verify: `npm run dev` runs; `tsc --noEmit` zero errors.

---

### TASK-002: Types
Create `src/types/index.ts`:
```typescript
export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  published: boolean
  featured?: boolean
}

export interface WorkEntry {
  company: string
  role: string
  start: string
  end: string
  description: string
}
```

Done when: File compiles; no `any`; both interfaces exported.

---

### TASK-003: Universal link class
Create `src/lib/cn.ts`:
```typescript
export const linkClass =
  'underline decoration-1 underline-offset-[2.5px] ' +
  'decoration-neutral-400 hover:decoration-neutral-500 ' +
  'dark:decoration-neutral-600 dark:hover:decoration-neutral-500 ' +
  'transition-colors'
```

Done when: Exported constant, importable from any component.

---

### TASK-004: MDX content pipeline
Create `src/lib/posts.ts` with `getAllPosts()`, `getFeaturedPosts()`, `getPostBySlug(slug)` (from 02_Architecture.md § Content Pipeline).

Done when: All three functions exported; TypeScript clean; sorted newest-first confirmed in test import.

---

### TASK-005: Seed MDX posts
Create `content/posts/` directory and 6 MDX files:

1. `react-server-components.mdx` — featured: true
2. `web-performance-budgets.mdx` — featured: true
3. `typescript-patterns.mdx` — featured: true
4. `ai-developer-tools.mdx`
5. `deployment-strategies.mdx`
6. `developer-documentation.mdx`

Each file needs valid frontmatter + minimum 3 paragraphs of technical content. Use realistic but placeholder prose.

Example:
```mdx
---
title: "React Server Components Are Not What You Think"
date: "2024-11-12"
summary: "Server Components change the mental model for data fetching in ways the docs don't fully explain."
published: true
featured: true
---

Server Components introduce a boundary that most tutorials gloss over...
```

Done when: `getAllPosts()` returns 6 posts; `getFeaturedPosts()` returns 3; dates sort correctly.

---

## Phase 1 — Layout Shell

### TASK-006: globals.css
Replace default Tailwind globals with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
}
```

Done when: System font renders; no web font requests in Network tab.

---

### TASK-007: Tailwind Typography prose configuration
In `tailwind.config.ts`, add typography customisation (from 03_Design.md § Prose Typography Configuration). Key requirements:
- `p, li, blockquote`: `fontFamily: "'Stix Two Text', Georgia, serif"`
- `a`: match `linkClass` treatment
- `code`: neutral-100 bg, 0.875em size
- `pre`: neutral-950 bg, neutral-100 text

Done when: A test page with `.prose` class shows serif text in `<p>` elements.

---

### TASK-008: ThemeToggle component
Create `src/components/ThemeToggle.tsx` (from 02_Architecture.md § ThemeToggle Component):
- `'use client'`
- `mounted` state — renders `<span className="w-12" />` until mounted (prevents hydration mismatch)
- Renders "[Dark]" or "[Light]" text button
- No icons
- `text-sm text-neutral-500`

Done when: Theme toggle changes mode; no hydration error in console.

---

### TASK-009: Nav component
Create `src/components/Nav.tsx` (from 02_Architecture.md § Nav Component):
- Sticky, z-10
- `border-b border-neutral-200 dark:border-neutral-800`
- `bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm`
- Name left → href="/"
- Blog, Work, ThemeToggle right

Done when: Nav visible on all pages; backdrop-blur visible on scroll.

---

### TASK-010: SkipNav and root layout
Create `src/components/SkipNav.tsx` — first DOM element, visible on focus:
```tsx
export function SkipNav() {
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-neutral-900 focus:text-sm">
      Skip to content
    </a>
  )
}
```

`src/app/layout.tsx`: ThemeProvider wrapping → SkipNav → Nav → `<main id="main">` → children. `suppressHydrationWarning` on `<html>`. Body classes. Root metadata.

Done when: Dark mode persists on reload; SkipNav appears on Tab press.

---

## Phase 2 — Blog System

### TASK-011: PostList component
Create `src/components/PostList.tsx`:
- Props: `posts: Post[]`
- `<ul className="space-y-1 list-disc list-inside pl-1">`
- Each post: `<li><Link href={/blog/${slug}} className={linkClass}>{title}</Link></li>`
- Import `linkClass` from `src/lib/cn`

Done when: List renders; links styled with underline treatment; no dates shown.

---

### TASK-012: Prose component
Create `src/components/Prose.tsx` (from 02_Architecture.md § Prose Component).

Done when: MDX content inside Prose shows serif font for paragraphs; code blocks styled.

---

### TASK-013: Blog index page
`src/app/blog/page.tsx` (server component):
```tsx
import { getAllPosts } from '../../lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
        Writing
      </h1>
      <PostList posts={posts} />
    </main>
  )
}
```

Done when: All 6 published posts listed; no dates; each title links to /blog/[slug].

---

### TASK-014: Blog post static generation
`src/app/blog/[slug]/page.tsx`:
- `generateStaticParams` from `getAllPosts()`
- `generateMetadata` returning `{ title, description, openGraph }`
- `getPostBySlug(slug)` → `notFound()` on null
- Render: article > h1 > date > Prose > MDXRemote

Done when: All 6 slugs render; unknown slug returns 404; per-post OG meta correct; `npm run build` pre-renders all routes.

---

## Phase 3 — Homepage and Work

### TASK-015: SocialRow component
Create `src/components/SocialRow.tsx`:
- Links array: GitHub, X, YouTube, LinkedIn, Email
- Inline with `·` separator
- All external: `target="_blank" rel="noopener noreferrer"`
- Same `linkClass` treatment

Done when: Social links render inline with · separators; open new tabs.

---

### TASK-016: Homepage
`src/app/page.tsx` (server component, from 03_Design.md § Homepage Structure):
1. Name paragraph (font-medium)
2. Bio paragraph (2–3 sentences)
3. "Writing" label (text-sm uppercase tracking-widest text-neutral-500)
4. PostList(getFeaturedPosts()) — 3 posts
5. "Links" label
6. SocialRow

Done when: Homepage shows name, bio, 3 featured titles, social row — no images.

---

### TASK-017: Work page
`src/app/work/page.tsx`:
- h1 "Work"
- WorkEntry array defined inline in the file (no separate data file)
- Each entry: company (font-medium) + role + years (text-sm text-neutral-500) + description paragraph
- Prose format — no timeline, no logos, no skill badges

Done when: Work page renders as clean prose paragraphs.

---

## Phase 4 — Polish and Launch

### TASK-018: Open Graph metadata
`layout.tsx` root metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Name',
  description: '2–3 sentence bio.',
  openGraph: {
    title: 'Your Name',
    description: '...',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}
```
Create `/public/og-image.png` (placeholder, 1200×630).

Done when: OG tags present in page source.

---

### TASK-019: Accessibility audit
- [ ] SkipNav visible on Tab press; jumps to #main
- [ ] One `<h1>` per page (confirm /blog, /blog/[slug], /work, /)
- [ ] All links have meaningful text
- [ ] ThemeToggle button text is visible (not icon-only)
- [ ] Focus rings visible on all interactive elements
- Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400` to ThemeToggle and nav links if not already present

Done when: Lighthouse accessibility ≥ 95 on homepage.

---

### TASK-020: Final build verification
```bash
npx tsc --noEmit
npm run build
```

Check:
- [ ] TypeScript: zero errors
- [ ] Build: zero errors
- [ ] `/out/blog/` contains 6 directories (one per post slug)
- [ ] No font files in Network tab
- [ ] Dark mode: no flash on reload

Done when: All checklist items confirmed. Ready to deploy.

```bash
vercel --prod
```
