# 06 — Tasks
## Design-Forward Developer Blog · portfolio_platform_07

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."

---

## Phase 0 — Foundation

### TASK-001: Project setup
```bash
npx create-next-app@latest blog --typescript --app --src-dir --no-eslint --no-tailwind
cd blog
npm install gray-matter next-mdx-remote
```
In `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts`:
- `Category` type union (8 values)
- `Post` interface with all fields
- `TocEntry` interface
- `CATEGORY_COLORS: Record<Category, string>` with distinct HSL values for all 8 categories

Done when: `tsc --noEmit` passes; all types exported.

---

### TASK-003: CSS token system
Create `src/styles/tokens.css`:
- `:root` with all dark-mode HSL custom properties (from 00_Orchestrator.md Color System)
- `[data-theme="light"]` with 6 override properties
- No hex values — all HSL

Create `src/styles/globals.css`:
- `@import './tokens.css'`
- Base reset, body background/color/font
- `.gradient-text` class
- `pre`, `code` styles
- `.prose a`, `.prose h2`, `.prose h3` (with `scroll-margin-top`)
- `prefers-reduced-motion` block

Done when: Body renders dark (hsl 210 15% 6%); `.gradient-text` applied to a test heading shows blue-to-pink gradient.

---

### TASK-004: Dark mode inline script + layout
Create `src/app/layout.tsx`:
- `suppressHydrationWarning` on `<html lang="en">`
- Inline `<script>` via `dangerouslySetInnerHTML` in `<head>` BEFORE any stylesheet
- Script reads `localStorage` → falls back to `prefers-color-scheme` → sets `data-theme`
- Wrapped in try/catch

Done when:
- Load page → `data-theme="dark"` is on `<html>` before first paint (check DevTools)
- No white flash on hard reload
- Inline script is the FIRST thing in `<head>`

---

### TASK-005: ThemeToggle component
Create `src/components/ThemeToggle.tsx` + `ThemeToggle.module.css`:
- `useEffect` reads current `data-theme` to set initial state
- `toggle()` writes `data-theme` + `localStorage`
- Button shows text label: "Light mode" or "Dark mode"
- `aria-label` says what clicking will switch TO

Done when: Toggle switches theme; refresh preserves choice; label is correct for current mode.

---

## Phase 1 — Content Pipeline

### TASK-006: posts.ts content loader
Create `src/lib/posts.ts`:
- `getAllPosts()` — reads all `.mdx` from `src/content/posts/`, parses frontmatter with `gray-matter`, filters `published: true`, sorts newest-first
- `getPostBySlug(slug)` — returns `{ post, content }` or `null` if not found
- All return types explicitly typed; no `any`

Done when: `getAllPosts()` returns correct posts; TypeScript clean.

---

### TASK-007: toc.ts parser
Create `src/lib/toc.ts`:
- `parseToc(content: string): TocEntry[]`
- Extracts `##` (level 2) and `###` (level 3) headings
- Check h3 regex BEFORE h2 to avoid substring match
- `slugify()` — lowercase, replace non-alphanumeric with hyphens, trim leading/trailing hyphens

Done when: `parseToc` correctly returns level-2 and level-3 entries with slugified IDs.

---

### TASK-008: Seed MDX posts (8 posts)
Create 8 `.mdx` files in `src/content/posts/`, one per category:
- `understanding-css-custom-properties.mdx` (category: css, featured: true)
- `react-state-deep-dive.mdx` (category: react, featured: true)
- `animation-with-css.mdx` (category: animation, featured: true)
- `javascript-closures.mdx` (category: javascript)
- `getting-your-first-frontend-job.mdx` (category: career)
- `svg-path-basics.mdx` (category: svg)
- `nextjs-app-router-guide.mdx` (category: nextjs)
- `web-performance-101.mdx` (category: general)

Each post must have:
- Valid frontmatter with all required fields
- Body with at least 3 `##` section headings (for ToC)
- 300–500 words of realistic technical content
- At least 2 posts include `<Callout type="info|warning|success">`
- At least 1 post includes `<Counter />`

Done when: `getAllPosts()` returns 8 posts; 3 have `featured: true`.

---

## Phase 2 — Blog List

### TASK-009: PostCard component
Create `src/components/PostCard.tsx` + `PostCard.module.css`:
- Background: `var(--color-bg-card)`
- Category tag: small, uppercase, `style={{ color: CATEGORY_COLORS[post.category] }}`
- Title: large, hover → `var(--color-primary)`
- Abstract: 3-line clamp, `var(--color-text-muted)`
- Date: small, muted
- Card hover: `box-shadow: 0 0 0 2px var(--color-primary)`
- Entire card clickable via `<Link>` wrapping the content

Done when: Card renders all fields; hover shows glow + title color change.

---

### TASK-010: CategoryFilter component
Create `src/components/CategoryFilter.tsx` + `CategoryFilter.module.css`:
- `'use client'`
- `useState<Category | null>(null)`
- 8 pill buttons in a flex-wrap row
- Active: `background: CATEGORY_COLORS[cat]; color: '#fff'; borderColor: CATEGORY_COLORS[cat]`
- Inactive: `color: CATEGORY_COLORS[cat]; borderColor: CATEGORY_COLORS[cat]`
- Clicking active category → deselects (null) → shows all
- `aria-pressed={isActive}` on each button

Done when: All 8 pills render; active/inactive states toggle correctly; deselect works.

---

### TASK-011: Blog list page
Create `src/app/blog/page.tsx` + `blog/page.module.css`:
- Server component fetches `getAllPosts()`
- Passes posts to a client wrapper that handles filter state
- Vertical list of `PostCard` components (NOT a grid)
- `CategoryFilter` above the list
- `max-width: 720px; margin: 0 auto`

Done when: `/blog` shows all 8 posts; filter works without page reload.

---

## Phase 3 — Post Page

### TASK-012: ScrollProgressBar component
Create `src/components/ScrollProgressBar.tsx` + `ScrollProgressBar.module.css`:
- `'use client'`
- `position: fixed; top: 0; left: 0; height: 3px; z-index: 100`
- Background: `var(--gradient-accent)`
- Width from scroll event: `(scrollY / (docHeight - viewHeight)) * 100`
- `{ passive: true }` event listener
- Cleanup on unmount
- `role="progressbar"` with `aria-valuenow`

Done when: Bar appears on post page; fills smoothly as user scrolls.

---

### TASK-013: TableOfContents component
Create `src/components/TableOfContents.tsx` + `TableOfContents.module.css`:
- `'use client'`
- Props: `entries: TocEntry[]`
- IntersectionObserver per heading, `rootMargin: '-20% 0px -70% 0px'`
- Active entry: `color: var(--color-primary)`
- H3 entries indented via `.level3 { padding-left: 0.75rem }`
- `position: sticky; top: 2rem`
- `aria-label="Table of contents"` on `<nav>`

Done when: ToC renders; active item updates while scrolling; clicking jumps to heading.

---

### TASK-014: Blog post page
Create `src/app/blog/[slug]/page.tsx` + `[slug]/page.module.css`:
- `generateStaticParams()` from `getAllPosts()`
- `generateMetadata()` from `getPostBySlug()`
- `notFound()` for missing slug
- Two-column grid layout: ToC sidebar (desktop only) + article
- `<ScrollProgressBar />` at top
- Post header: category tag, `<h1 className="gradient-text">`, `<time>`
- `<MDXRemote source={content} components={mdxComponents} />`

Done when: All 8 slugs render; gradient title; sidebar visible on desktop; 404 on unknown slug.

---

## Phase 4 — MDX Components

### TASK-015: Callout component
Create `src/components/mdx/Callout.tsx` + `Callout.module.css`:
- `type` prop: `'info' | 'warning' | 'success'`
- Three CSS classes: `.info`, `.warning`, `.success` — each with distinct HSL border + tinted bg
- `role="note"` (info/success) or `role="alert"` (warning)

Done when: All 3 types render with correct colors; usable in MDX without import.

---

### TASK-016: Counter component
Create `src/components/mdx/Counter.tsx` + `Counter.module.css`:
- `'use client'`
- `useState(0)`
- Two buttons: decrement (–) and increment (+)
- `aria-label` on both buttons
- Count in `<output>` element
- Styled with `var(--color-primary)` accents

Done when: Widget interactive; aria labels present; renders in MDX without import.

---

### TASK-017: ColorSwatch component
Create `src/components/mdx/ColorSwatch.tsx` + `ColorSwatch.module.css`:
- Props: `color: string` (HSL value), `label?: string`
- Inline flex: colored circle + code label
- Circle: `background: color` prop
- Renders inline (not block)

Done when: `<ColorSwatch color="hsl(225deg 100% 75%)" />` shows a blue circle + label in MDX.

---

### TASK-018: MDX components registry
Create `src/components/mdx/index.ts`:
```typescript
export const mdxComponents: MDXComponents = {
  Callout,
  Counter,
  ColorSwatch,
}
```
Pass `components={mdxComponents}` to `<MDXRemote />` in the post page.

Done when: All 3 components available in all MDX files without per-file imports.

---

## Phase 5 — Homepage + Audit

### TASK-019: Homepage + SiteHeader + final audit
**Homepage** (`src/app/page.tsx`):
- Hero section: gradient tagline (`<h1 className="gradient-text">`), description, CTA buttons
- Featured posts: `getAllPosts().filter(p => p.featured)` → 3 PostCards
- One `<h1>` per page

**SiteHeader** (`src/components/SiteHeader.tsx`):
- Sticky, `var(--color-bg)` bg, bottom border
- Nav: `/`, `/blog`, `/about`
- `ThemeToggle` on right
- Import in `layout.tsx`

**Audit:**
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/
```
- [ ] TypeScript: zero errors
- [ ] Build: zero errors; `/out/blog/` has 8 subdirectories
- [ ] Grep: no hex values in CSS files
- [ ] Dark mode: no flash on hard reload
- [ ] Toggle: refresh persists choice
- [ ] Scroll progress: only on post pages
- [ ] PostCard hover: glow appears
- [ ] ToC: active item updates while scrolling
- [ ] All 3 Callout types render correctly
- [ ] Counter: increment and decrement work
- [ ] One `<h1>` per page
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90

Done when: All checklist items confirmed.
