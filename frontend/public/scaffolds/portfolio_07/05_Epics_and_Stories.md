# 05 — Epics and Stories
## Design-Forward Developer Blog · portfolio_platform_07

---

## Epic 1 — Foundation: HSL Color System + Dark Mode

The color system and dark mode are the technical identity of this site. Everything else depends on the tokens being correct.

### Story 1.1 — HSL token file
**As a** developer,
**I want** all colors defined as HSL CSS custom properties in a single `tokens.css` file,
**so that** any component can reference `var(--color-bg)` without knowing the actual value.

**Acceptance criteria:**
- [ ] `src/styles/tokens.css` exists
- [ ] `:root` defines dark-mode values using HSL notation (e.g. `hsl(210deg 15% 6%)`)
- [ ] `[data-theme="light"]` overrides 6 surface/text properties
- [ ] `--color-primary`, `--color-secondary`, `--color-tertiary`, `--gradient-accent` are unchanged in light mode
- [ ] No hex values present in the file

### Story 1.2 — No-flash dark mode script
**As a** dark-mode user,
**I want** the page to load in dark mode without a white flash,
**so that** the experience feels native and polished on first visit.

**Acceptance criteria:**
- [ ] Inline `<script>` in `<head>` runs before any stylesheet loads
- [ ] Script reads `localStorage.getItem('color-theme')` and falls back to `prefers-color-scheme`
- [ ] Sets `data-theme` attribute on `document.documentElement`
- [ ] Wrapped in try/catch for SSR environments
- [ ] `suppressHydrationWarning` on `<html>` element

### Story 1.3 — ThemeToggle component
**As a** user,
**I want** a visible toggle to switch between dark and light mode,
**so that** I can choose the mode that suits my environment.

**Acceptance criteria:**
- [ ] Button shows text label ("Dark mode" / "Light mode") — not icon-only
- [ ] Clicking updates `data-theme` on `document.documentElement`
- [ ] Clicking persists choice to `localStorage`
- [ ] Refreshing page after toggle preserves the chosen mode
- [ ] `aria-label` reflects the mode that clicking will switch TO

### Story 1.4 — Gradient text utility
**As a** designer reading the source,
**I want** gradient text as a reusable CSS class,
**so that** it can be applied to any heading without duplicating the CSS.

**Acceptance criteria:**
- [ ] `.gradient-text` class in `globals.css`
- [ ] Uses `background: var(--gradient-accent)`, `-webkit-background-clip: text`, `-webkit-text-fill-color: transparent`
- [ ] Applied to homepage hero tagline
- [ ] Applied to post page H1 title

---

## Epic 2 — Content Pipeline: MDX + TypeScript Schema

### Story 2.1 — TypeScript Post schema
**As a** TypeScript developer,
**I want** a fully typed `Post` interface and `Category` union type,
**so that** all content is validated at compile time.

**Acceptance criteria:**
- [ ] `Category` type union covers all 8 categories
- [ ] `Post` interface has all required fields typed correctly
- [ ] `TocEntry` interface exported
- [ ] `CATEGORY_COLORS: Record<Category, string>` exported with HSL values for all 8 categories
- [ ] `tsc --noEmit` passes with strict mode

### Story 2.2 — getAllPosts content loader
**As a** blog reader,
**I want** posts loaded from MDX files on the filesystem,
**so that** content is source-controlled and statically generated.

**Acceptance criteria:**
- [ ] `src/lib/posts.ts` exports `getAllPosts()` and `getPostBySlug()`
- [ ] Uses `gray-matter` for frontmatter parsing
- [ ] Returns only `published: true` posts
- [ ] Sorted newest-first by `publishedOn`
- [ ] TypeScript strict: no `any` types

### Story 2.3 — 8 seed MDX posts
**As a** developer previewing the site,
**I want** one seed post per category,
**so that** the blog list shows the category filter working across all 8 options.

**Acceptance criteria:**
- [ ] 8 `.mdx` files in `src/content/posts/`
- [ ] Each has valid frontmatter: `title`, `abstract`, `publishedOn`, `category`, `published: true`
- [ ] At least 3 posts use `featured: true`
- [ ] Each post body has at least 2 `##` headings (for ToC generation)
- [ ] At least 2 posts include `<Callout>` usage
- [ ] At least 1 post includes `<Counter />` usage

### Story 2.4 — ToC parser
**As a** post reader,
**I want** the table of contents generated from actual post headings,
**so that** it is always accurate and requires no manual maintenance.

**Acceptance criteria:**
- [ ] `src/lib/toc.ts` exports `parseToc(content: string): TocEntry[]`
- [ ] Correctly extracts `##` (level 2) and `###` (level 3) headings
- [ ] Generates `id` via slugify — lowercase, hyphens, no special chars
- [ ] Does not include `####` or deeper headings
- [ ] Does not match `###` as `##` (h3-before-h2 check order)

### Story 2.5 — Static generation
**As a** deployment engineer,
**I want** all post pages statically pre-rendered at build time,
**so that** the site can be deployed as static files with no server.

**Acceptance criteria:**
- [ ] `generateStaticParams()` returns all published post slugs
- [ ] `notFound()` called for unknown slugs
- [ ] `next.config.ts` has `output: 'export'` and `images: { unoptimized: true }`
- [ ] `npm run build` produces `/out/blog/[slug]/index.html` for all 8 posts

---

## Epic 3 — Blog UI: List + Post Page

### Story 3.1 — Blog list page
**As a** blog reader,
**I want** a clean list of all posts on `/blog`,
**so that** I can browse and decide what to read.

**Acceptance criteria:**
- [ ] Posts render as a vertical list (NOT a CSS grid)
- [ ] Each `PostCard` shows: category tag, title, abstract, date
- [ ] Category tag color matches `CATEGORY_COLORS[post.category]` (inline style)
- [ ] PostCard hover: `box-shadow: 0 0 0 2px var(--color-primary)` + title turns primary
- [ ] Page heading is correct; one `<h1>` per page

### Story 3.2 — Category filter
**As a** blog reader,
**I want** to filter posts by category without a full page reload,
**so that** I can quickly find content about a specific topic.

**Acceptance criteria:**
- [ ] Pill row of 8 category buttons above the post list
- [ ] Active pill: category HSL as `background`, white text
- [ ] Inactive pill: category HSL as `border-color` and `color`
- [ ] Clicking an active pill → deselects (shows all posts)
- [ ] `aria-pressed` on each pill button

### Story 3.3 — Scroll progress bar
**As a** post reader,
**I want** a visual indicator of how far through the article I am,
**so that** I can gauge the reading time remaining.

**Acceptance criteria:**
- [ ] `ScrollProgressBar` present ONLY on `/blog/[slug]` pages
- [ ] `position: fixed; top: 0; left: 0; height: 3px; z-index: 100`
- [ ] Background uses `var(--gradient-accent)`
- [ ] Width calculated: `(scrollY / (docHeight - viewportHeight)) * 100%`
- [ ] Scroll listener is `{ passive: true }`
- [ ] NOT present on `/blog` list page or homepage

### Story 3.4 — Post page header
**As a** post reader,
**I want** the post header to show the category, gradient title, and date,
**so that** I immediately understand the context and topic.

**Acceptance criteria:**
- [ ] Category tag with correct HSL color (inline style)
- [ ] `<h1>` title with `.gradient-text` class applied
- [ ] `<time>` element with `dateTime` attribute
- [ ] Formatted date (e.g. "March 15, 2024")

### Story 3.5 — Table of contents sidebar
**As a** post reader,
**I want** a sticky table of contents on desktop,
**so that** I can jump to any section and see my reading progress within the post.

**Acceptance criteria:**
- [ ] Rendered from `parseToc(content)` — headings only, no manual curation
- [ ] Sticky sidebar on lg+ screens (`position: sticky; top: 2rem`)
- [ ] Hidden on mobile (`display: none` below lg breakpoint)
- [ ] Active heading tracked via IntersectionObserver
- [ ] Active item color: `var(--color-primary)`
- [ ] H3 items indented relative to H2 items
- [ ] Clicking a ToC link scrolls to the heading smoothly

---

## Epic 4 — MDX Custom Components

### Story 4.1 — Callout component
**As a** post author,
**I want** to use `<Callout type="info|warning|success">` in MDX,
**so that** I can annotate important information without writing HTML.

**Acceptance criteria:**
- [ ] `info` type: blue left border + blue tinted background
- [ ] `warning` type: yellow left border + yellow tinted background
- [ ] `success` type: green left border + green tinted background
- [ ] `role="note"` for info/success; `role="alert"` for warning
- [ ] No import statement needed in the `.mdx` file

### Story 4.2 — Counter component
**As a** post author teaching React state,
**I want** an interactive counter widget inside an MDX post,
**so that** readers can see `useState` working in a live, embedded demo.

**Acceptance criteria:**
- [ ] `'use client'` directive
- [ ] `useState(0)` for count
- [ ] Increment (+) and decrement (–) buttons
- [ ] `aria-label` on both buttons
- [ ] Count displayed in an `<output>` element
- [ ] Renders inside MDX without import statement

### Story 4.3 — ColorSwatch component
**As a** post author writing about color,
**I want** to render a color circle + label inline in text,
**so that** readers can see the actual color alongside the HSL value.

**Acceptance criteria:**
- [ ] Accepts `color` prop (HSL string) and optional `label` prop
- [ ] Renders a circular `<span>` with `background: color`
- [ ] Renders a `<code>` label with the color value
- [ ] Renders inline (not block-level)
- [ ] No import statement needed in the `.mdx` file

### Story 4.4 — MDX components registry
**As a** developer,
**I want** a single `mdxComponents` export that registers all custom components,
**so that** `next-mdx-remote` can provide them globally without imports in each post.

**Acceptance criteria:**
- [ ] `src/components/mdx/index.ts` exports `mdxComponents: MDXComponents`
- [ ] Object includes `Callout`, `Counter`, `ColorSwatch`
- [ ] Passed to `<MDXRemote components={mdxComponents} />`
- [ ] Adding a new component only requires changing `index.ts`

---

## Epic 5 — Polish: Homepage + Accessibility + Build

### Story 5.1 — Homepage
**As a** first-time visitor,
**I want** a compelling homepage hero with featured posts,
**so that** I immediately understand the blog's focus and see the best content.

**Acceptance criteria:**
- [ ] Hero section: gradient tagline, description, CTA links
- [ ] Featured posts section below hero
- [ ] One `<h1>` on the page
- [ ] `SiteHeader` with nav links + `ThemeToggle`

### Story 5.2 — Site header
**As a** reader on any page,
**I want** a sticky header with navigation and the theme toggle,
**so that** I can always navigate the site and switch modes.

**Acceptance criteria:**
- [ ] Sticky at top (`position: sticky; top: 0`)
- [ ] Navigation links to `/`, `/blog`, `/about`
- [ ] `ThemeToggle` visible and functional
- [ ] Background: `var(--color-bg)` with bottom border `var(--color-border)`

### Story 5.3 — Accessibility
**As a** keyboard and screen reader user,
**I want** all interactive elements to be accessible,
**so that** the blog is usable regardless of input method.

**Acceptance criteria:**
- [ ] One `<h1>` per page
- [ ] All images have `alt` text
- [ ] `ThemeToggle` has `aria-label`
- [ ] `Counter` buttons have `aria-label`
- [ ] `CategoryFilter` pills have `aria-pressed`
- [ ] `TableOfContents` `<nav>` has `aria-label="Table of contents"`
- [ ] `ScrollProgressBar` has `role="progressbar"` with `aria-valuenow`
- [ ] All external links have `target="_blank" rel="noopener noreferrer"`
- [ ] Lighthouse accessibility ≥ 90

### Story 5.4 — Build + static export
**As a** deployment engineer,
**I want** the site to build as a static export with zero errors,
**so that** it can be deployed to Vercel or any static host.

**Acceptance criteria:**
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] All 8 post slugs pre-rendered in `/out/blog/`
- [ ] No hex values in any `.module.css` file (grep check)
- [ ] Lighthouse performance ≥ 90

---

## Expanded Acceptance Criteria — Critical Stories

### Story 1.2 — No-Flash Dark Mode Script (exact implementation)

```tsx
// src/app/layout.tsx — inline script in <head>
// This script MUST run before any stylesheet to prevent flash
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('color-theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

Acceptance criteria:
- `dangerouslySetInnerHTML` is the correct API — not `src=` external script
- `suppressHydrationWarning` on `<html>` is required — next-themes and custom scripts both modify the attribute
- try/catch prevents SSR/hydration crashes
- Script reads `localStorage` first; falls back to `prefers-color-scheme`; default is dark (not light)

---

### Story 3.3 — ScrollProgressBar (exact calculation)

```tsx
'use client'
import { useEffect, useState } from 'react'
import styles from './ScrollProgressBar.module.css'

export function ScrollProgressBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollable = docHeight - viewportHeight
      if (scrollable > 0) {
        setWidth((scrollY / scrollable) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={styles.bar}
      style={{ width: `${width}%` }}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
```

Acceptance criteria:
- `{ passive: true }` on scroll listener — required for performance
- Formula: `scrollY / (scrollHeight - innerHeight)` — NOT `scrollY / scrollHeight`
- `role="progressbar"` with `aria-valuenow` for accessibility
- `scrollHeight - innerHeight` approaches zero when content is short — guard with `if (scrollable > 0)`

---

### Story 2.4 — ToC Parser + rehype-slug Requirement

The ToC sidebar requires heading elements to have `id` attributes so IntersectionObserver can target them. MDX renders headings without IDs by default.

**Two approaches — choose one:**

**Option A: rehype-slug plugin (recommended)**
```ts
// src/app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'

<MDXRemote
  source={content}
  options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
  components={mdxComponents}
/>
```
Install: `npm install rehype-slug`

**Option B: Manual id generation in parseToc**
`parseToc()` generates slugified ids. The same slug function must be applied to heading text inside the MDX rendering to produce matching ids. This is fragile if heading text changes.

Acceptance criteria:
- ToC `entry.id` values must exactly match the `id` attributes on rendered `<h2>` and `<h3>` elements
- Without matching ids, `document.getElementById(entry.id)` returns null — IntersectionObserver observes nothing
- Verify in DevTools: rendered `<h2>` elements must have `id` attributes

---

### Story 1.4 — .gradient-text (exact CSS)

```css
/* src/styles/globals.css */
.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* color: transparent is equivalent to -webkit-text-fill-color: transparent */
  /* both included for maximum browser compatibility */
}
```

Common mistakes:
- Using only `background-clip: text` without `-webkit-background-clip: text` — Safari requires the prefixed version
- Using `color: transparent` without `background-clip: text` — makes text invisible with no gradient
- Setting `background-clip: text` on a parent element — only works on the element that has the `background` set
- `var(--gradient-accent)` must be a CSS gradient (e.g. `linear-gradient(...)`) — not a solid colour
