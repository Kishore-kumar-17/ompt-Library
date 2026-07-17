# 06 — Tasks
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

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
const nextConfig: NextConfig = { output: 'export', images: { unoptimized: true } }
```

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts`:
```typescript
export type PostType = 'article' | 'note'
export interface Post {
  slug: string; title: string; date: string; tags: string[];
  description: string; type: PostType; published: boolean
}
export interface Project {
  title: string; year: number; description: string;
  article?: string; demo?: string; source?: string
}
```

Done when: Types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS token system
Create `src/styles/tokens.css`:
- `:root` = light mode defaults (beige bg: `hsl(40deg 33% 97%)`, accent: `hsl(332deg 61% 41%)`)
- `[data-theme="dark"]` = dark overrides (dark bg: `hsl(210deg 12% 13%)`, accent: `hsl(332deg 100% 76%)`)
- All 8 token pairs listed. No hex values.

Create `src/styles/globals.css`:
- `@import './tokens.css'`
- Base reset, body bg/color/font (system sans), headings use `var(--font-heading)`, code styles
- `prefers-reduced-motion` block at end

Done when: Body renders beige background; DevTools Computed Styles shows HSL custom properties.

---

### TASK-004: Root layout + dark mode script
Create `src/app/layout.tsx`:
- `Outfit` from `next/font/google` — weights `['400', '600', '700']`, variable `'--font-heading'`
- `<html lang="en" suppressHydrationWarning className={outfit.variable}>`
- Inline `<script>` as FIRST element in `<head>` (before any `<link>`)
- Script: reads `localStorage('color-theme')` → `prefers-color-scheme` fallback → `catch` defaults to `'light'`
- Sets `data-theme` on `document.documentElement`

Done when:
- First visit (no localStorage) → beige background, no flash
- `localStorage('color-theme') = 'dark'` → dark mode loads immediately
- DevTools shows `data-theme` on `<html>` before CSS loads

---

### TASK-005: ThemeToggle + SiteHeader
Create `src/components/ThemeToggle.tsx`:
- `useEffect` reads `document.documentElement.getAttribute('data-theme')` to set initial state
- Toggle writes `data-theme` + `localStorage`
- Label: "Dark" (when light) / "Light" (when dark)
- `aria-label` indicates target mode
- Monospace font, border style

Create `src/components/SiteHeader.tsx`:
- Sticky, 56px height, border-bottom
- Left: logo/name link
- Right: nav links (Blog, Notes, Projects, About — where About links to `/me`) + ThemeToggle
- Active nav item: `aria-current="page"` + accent color

Done when: Header renders; toggle switches themes and persists; refresh preserves mode.

---

## Phase 1 — Content Pipeline

### TASK-006: Seed content
Create `src/content/articles/` with 7 `.mdx` files:
- `javascript-closures.mdx` (tags: javascript, fundamentals)
- `react-hooks-guide.mdx` (tags: react, javascript)
- `understanding-css-grid.mdx` (tags: css, layout)
- `node-js-restful-api.mdx` (tags: node, javascript, api)
- `getting-started-typescript.mdx` (tags: typescript, javascript)
- `git-workflow-guide.mdx` (tags: git, tooling)
- `how-i-became-a-developer.mdx` (tags: career, learning)

Create `src/content/notes/` with 3 `.mdx` files:
- `notes-on-vim.mdx` (tags: tooling, learning)
- `thoughts-on-open-source.mdx` (tags: open-source, career)
- `learning-a-new-framework.mdx` (tags: learning)

Requirements: Posts should span at least 3 years (some dated 2022, 2023, 2024). Each has valid frontmatter with `description` field and `type` set correctly.

Done when: 10 `.mdx` files exist with valid frontmatter; `getAllPosts()` returns 10 posts.

---

### TASK-007: lib/posts.ts
Create `src/lib/posts.ts` with all exports:
- `readPostsFromDir(dir, type)` — private helper
- `getAllArticles()` — reads articles/, sorted newest-first
- `getAllNotes()` — reads notes/, sorted newest-first
- `getAllPosts()` — combines both, sorted
- `getPostsByYear(posts)` — returns `Map<number, Post[]>`, years descending
- `getAllTags()` — all unique tags alphabetically
- `getPostsByTag(tag)` — all published posts with tag
- `getPostBySlug(slug, type)` — returns `{ post, content }` or null

Done when: All functions return correct types; no `any`; `tsc --noEmit` passes.

---

### TASK-008: lib/projects.ts
Create `src/lib/projects.ts`:
- 6 `Project` objects as a typed array
- Mix of years (at least 2023 and 2024)
- At least 1 project with all 3 links (article, demo, source)
- At least 1 project with only source link
- No image fields

Done when: `import { projects } from '../lib/projects'` compiles; 6 projects returned.

---

## Phase 2 — Archive Pages

### TASK-009: YearGroup component
Create `src/components/YearGroup.tsx` + `YearGroup.module.css`:
- `<details open={isCurrentYear || undefined}>` — `undefined` prevents `open=""` in HTML
- `<summary>` with year (Outfit, accent color) + count (monospace, muted)
- Remove default `<details>` marker via CSS
- `<ul>` of posts: `<time>` (monospace, muted, "Mar 15" format) + title `<a>` link
- `basePath` prop: '/blog' or '/notes'
- No images, no descriptions — title + date only

Done when: Renders correctly; current-year version is open; past-year version is closed; clicking summary toggles.

---

### TASK-010: Blog archive page (/blog)
Create `src/app/blog/page.tsx` + `blog/page.module.css`:
- Server component: `getAllArticles()` → `getPostsByYear()`
- One `YearGroup` per year, current year open
- "View all topics →" link navigating to `/topics`
- `<h1>` "Articles" heading

Done when: `/blog` shows 7 articles in year groups; current year expanded; topics link works.

---

### TASK-011: Notes archive page (/notes)
Create `src/app/notes/page.tsx` + `notes/page.module.css`:
- Same structure as blog page; `getAllNotes()` instead
- `<h1>` "Notes" heading

Done when: `/notes` shows 3 notes in year groups; no articles appear.

---

### TASK-012: Post pages (/blog/[slug] + /notes/[slug])
Create `src/app/blog/[slug]/page.tsx` + `src/app/notes/[slug]/page.tsx`:
- `generateStaticParams` + `generateMetadata` + `notFound()`
- Post header: `<h1>`, `<time>` (monospace), tag pills linking to `/topics/[tag]`
- `<MDXRemote source={content} />` for body
- "Back to Articles" / "Back to Notes" link

Done when: All slugs render; tag links work; 404 on invalid slug.

---

## Phase 3 — Topics + Projects + About

### TASK-013: Topics pages (/topics + /topics/[tag])
Create `src/app/topics/page.tsx`:
- `getAllTags()` sorted alphabetically
- Each tag: count from `getPostsByTag(tag).length`
- Pill links to `/topics/[tag]`

Create `src/app/topics/[tag]/page.tsx`:
- `generateStaticParams` from `getAllTags()`
- `getPostsByTag()` — shows articles AND notes
- Each item: type badge + date + title link
- Link to `/blog/[slug]` or `/notes/[slug]` based on `post.type`

Done when: Topics page shows all tags; tag page shows filtered posts with type badges.

---

### TASK-014: Projects page (/projects)
Create `src/components/ProjectCard.tsx` + `ProjectCard.module.css`:
- Year (mono, muted) + title + description + conditional links
- No images. No placeholder images.
- Accent border on hover

Create `src/app/projects/page.tsx` + `projects/page.module.css`:
- `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- All 6 projects from `projects` data

Done when: `/projects` shows 6 cards in responsive grid; no images.

---

### TASK-015: About page (/me)
Create `src/app/me/page.tsx` + `me/page.module.css`:

Required sections in order:
1. Intro paragraph — personal, conversational
2. Philosophy block (distinct styling — accent left border):
   "No ads. No AI-generated content. No affiliate links. No tracking."
3. "What I'm Doing Now" — bulleted list + "Last updated: [date]" above it (monospace)
4. Tools & Setup — editor, browser, OS
5. Publications — list of platforms
6. Speaking & Media — podcasts or talks
7. Creative Work — non-developer interests

Done when: All 7 sections present; philosophy block visually distinct from body text.

---

## Phase 4 — Homepage + Audit

### TASK-016: Homepage + final audit
Create `src/app/page.tsx`:
- Intro: "I'm [Name], software engineer and open-source creator. This is my digital garden."
- Recent articles: `getAllArticles().slice(0, 5)` — title + date links
- Featured projects: `projects.slice(0, 3)` — simple list or small cards
- Links to `/blog` and `/me`
- One `<h1>`

**Final audit:**
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/
```

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; `/out/` has all pages
- [ ] No hex values in CSS files (grep result empty)
- [ ] Light mode first visit: beige background, no dark flash
- [ ] Dark mode refresh: stays dark
- [ ] `/blog` current year expanded, past years collapsed
- [ ] `/notes` shows only notes, not articles
- [ ] `/topics` all tags alphabetically with counts
- [ ] `/topics/javascript` shows filtered posts
- [ ] `/projects` no images; links conditional
- [ ] `/me` has philosophy block ("No ads. No AI. No tracking.")
- [ ] One `<h1>` per page
- [ ] ThemeToggle has `aria-label`
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90

Done when: All checklist items confirmed.
