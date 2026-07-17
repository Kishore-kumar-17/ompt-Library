# portfolio_08 — Tania Rascia
## Self-Taught Developer: Content + Portfolio Mix

**Reference:** taniarascia.com
**Type:** Developer blog + portfolio with 100+ articles, notes, and projects
**Stack:** Next.js 14, TypeScript, CSS Modules, CSS custom properties
**Distinctive features:** Year-grouped blog archive, Solarized pink accent, beige light-mode background, "Outfit" heading font, Notes section separate from Articles, philosophy-first About page, project cards with year labels and no images

---

## Base Prompt

Build a developer blog and portfolio site for a prolific self-taught developer and technical writer. The site is a content-first digital garden — the value is in the accumulated writing, not in visual spectacle.

**Content types:**
- **Articles** — long-form technical tutorials (CSS, JavaScript, React, Node.js, tooling)
- **Notes** — shorter, more personal posts; observations and quick references
- **Projects** — open-source tools and side projects, text-only cards organized by year
- **About** — philosophy statement + "What I'm Doing Now" + publications + creative work

**Typography:** "Outfit" (Google Fonts) for headings — rounded, friendly. System font stack for body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Monospace (`'SF Mono', 'Fira Code', monospace`) for dates, tags, and inline code.

**Color system — CSS custom properties, light mode default:**
```css
:root {
  --color-bg:          hsl(40deg 33% 97%);   /* warm beige — not white */
  --color-bg-card:     hsl(40deg 25% 93%);
  --color-bg-elevated: hsl(40deg 20% 89%);
  --color-text:        hsl(210deg 12% 16%);
  --color-text-muted:  hsl(210deg  8% 50%);
  --color-border:      hsl(40deg  15% 83%);
  --color-accent:      hsl(332deg 61% 41%);  /* Solarized magenta — light mode */
  --color-accent-bg:   hsl(332deg 61% 41% / 0.08);
}
[data-theme="dark"] {
  --color-bg:          hsl(210deg 12% 13%);
  --color-bg-card:     hsl(210deg 12% 18%);
  --color-bg-elevated: hsl(210deg 12% 23%);
  --color-text:        hsl(40deg  20% 90%);
  --color-text-muted:  hsl(210deg  8% 58%);
  --color-border:      hsl(210deg 12% 26%);
  --color-accent:      hsl(332deg 100% 76%); /* bright pink — dark mode */
  --color-accent-bg:   hsl(332deg 100% 76% / 0.08);
}
```

**Dark mode:** Inline `<script>` in `<head>` before any stylesheet. Script reads `localStorage('color-theme')`, falls back to `prefers-color-scheme`. Sets `data-theme` on `document.documentElement`. Light mode is `:root` default; dark mode is `[data-theme="dark"]` override. `suppressHydrationWarning` on `<html>`.

**TypeScript schema:**
```typescript
export type PostType = 'article' | 'note'

export interface Post {
  slug: string
  title: string
  date: string          // ISO 8601 — '2024-03-15'
  tags: string[]        // flat tag system, multiple per post
  description: string   // used in meta and search
  type: PostType
  published: boolean
}

export interface Project {
  title: string
  year: number
  description: string
  article?: string      // blog slug or external URL
  demo?: string
  source?: string       // GitHub URL
}
```

**Blog archive page (`/blog`):**
- Posts grouped by year — each year is a collapsible `<details>/<summary>` section
- Within each year: reverse chronological list
- Each entry: `<time>` (month + day, monospace font) + title link
- No excerpt, no reading time, no tags in the list
- "View all topics" link above the list navigates to `/topics`
- Current year expanded by default; prior years collapsed

**Notes page (`/notes`):** Same year-grouping pattern as `/blog`. Notes are shorter, more personal. Listed identically to articles.

**Topics page (`/topics`):** All unique tags as links, sorted alphabetically. Clicking a tag shows filtered post list.

**Projects page (`/projects`):**
- Responsive grid: 1 col → 2 col (800px+) → 3 col (1360px+)
- Cards: year label (top-left, monospace muted), title (accent color on hover), one-line description, action links (Article / Demo / Source)
- NO images on project cards — text-only
- Cards have subtle border + background (`var(--color-bg-card)`)
- Grouped by year section headings

**About page (`/me`):**
- Intro paragraph with personal voice ("Hey, I'm Tania")
- Philosophy statement: "No ads. No AI-generated content. No affiliate links. No tracking."
- "What I'm Doing Now" section — living document with updated date
- Tools & Setup — editor, OS, hardware
- Publications — external platforms (DigitalOcean, LogRocket, SitePoint)
- Speaking & Media — podcasts, talks
- Creative Work — music, illustrations

**Site header:**
- Navigation: Blog, Notes, Projects, About
- Theme toggle (text label: "Dark" / "Light")
- `position: sticky; top: 0; background: var(--color-bg); border-bottom: 1px solid var(--color-border)`

**Accent usage:**
- Links on hover: `color: var(--color-accent)`
- Active nav item: `color: var(--color-accent)`
- Post titles on hover: `color: var(--color-accent)`
- Tag pills: `background: var(--color-accent-bg); color: var(--color-accent)`
- Year section headings on the blog archive: `color: var(--color-accent)`

**Build:**
- `output: 'export'` in `next.config.ts`
- `generateStaticParams` for all post and project slugs
- `getAllPosts()` reads from `src/content/` MDX files via `gray-matter`
- `getPostsByTag(tag)` for topics page
- `getPostsByYear()` returns `Map<number, Post[]>` for archive pages

---

## Platform Versions

### 1. Lovable

Build a developer blog and portfolio in Next.js 14 (TypeScript, App Router, CSS Modules). No Tailwind.

Site identity: Tania Rascia-style self-taught developer — prolific technical writer with 100+ articles, a Notes section for shorter pieces, and a Projects page of text-only cards. The brand is authentic, conversational, content-first.

**Color system (CSS custom properties):**
Light mode is the default (`:root`). Dark mode is `[data-theme="dark"]`.
```css
:root {
  --color-bg: hsl(40deg 33% 97%); --color-bg-card: hsl(40deg 25% 93%);
  --color-text: hsl(210deg 12% 16%); --color-text-muted: hsl(210deg 8% 50%);
  --color-border: hsl(40deg 15% 83%);
  --color-accent: hsl(332deg 61% 41%); --color-accent-bg: hsl(332deg 61% 41% / 0.08);
}
[data-theme="dark"] {
  --color-bg: hsl(210deg 12% 13%); --color-bg-card: hsl(210deg 12% 18%);
  --color-text: hsl(40deg 20% 90%); --color-text-muted: hsl(210deg 8% 58%);
  --color-border: hsl(210deg 12% 26%);
  --color-accent: hsl(332deg 100% 76%); --color-accent-bg: hsl(332deg 100% 76% / 0.08);
}
```

**Dark mode:** Inline `<script>` in `<head>` before CSS. Reads localStorage → falls back to `prefers-color-scheme` → sets `data-theme`. `suppressHydrationWarning` on `<html>`.

**Typography:** "Outfit" (Google Fonts) for headings, system sans for body, `'SF Mono'/'Fira Code'` for dates and tags.

**TypeScript interfaces:**
```typescript
export type PostType = 'article' | 'note'
export interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
export interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

**Pages to build:**

`/` — Homepage: intro paragraph ("I'm [Name], software engineer and open-source creator. This is my digital garden."), featured articles section, featured projects, link to About.

`/blog` — Year-grouped archive. Posts in `<details>/<summary>` per year. Current year open by default. Each entry: `<time>` (month + day, monospace) + title link. "View all topics" link at top.

`/notes` — Same year-grouping pattern as /blog. Notes are shorter, informal.

`/projects` — 3-col responsive grid (1→2→3). Cards: year label (monospace muted top-left), title, 1-line description, action links (Article / Demo / Source). No images. No Tailwind.

`/me` — About page: intro, philosophy ("No ads. No AI. No tracking."), "What I'm Doing Now", Tools & Setup, Publications, Speaking & Media, Creative Work.

`/topics` — All unique tags alphabetically. Clicking tag → filtered post list.

**Sticky header:** Logo left, nav (Blog / Notes / Projects / About) + ThemeToggle right. Border-bottom on scroll.

**Accent use:** Links on hover, active nav, post titles on hover, tag pills, year headings on archive.

Build outputs static export. `tsc --noEmit` zero errors. Lighthouse ≥ 90/90.

---

### 2. ChatGPT Canvas

```
Build a Next.js 14 developer blog + portfolio site. TypeScript strict, App Router, CSS Modules, no Tailwind.

IDENTITY
Self-taught developer digital garden — content-first, authentic voice, 100+ technical articles,
separate Notes section for shorter pieces, Projects without images.

COLOR SYSTEM — light default
:root { beige bg hsl(40,33%,97%), card hsl(40,25%,93%), text hsl(210,12%,16%),
        muted hsl(210,8%,50%), border hsl(40,15%,83%),
        accent hsl(332,61%,41%), accent-bg hsl(332,61%,41%/0.08) }
[data-theme="dark"] { bg hsl(210,12%,13%), card hsl(210,12%,18%), text hsl(40,20%,90%),
                      muted hsl(210,8%,58%), border hsl(210,12%,26%),
                      accent hsl(332,100%,76%), accent-bg hsl(332,100%,76%/0.08) }

DARK MODE — inline <script> in <head> before CSS
reads localStorage('color-theme') → prefers-color-scheme fallback → sets data-theme on <html>
suppressHydrationWarning on <html>

TYPES
type PostType = 'article' | 'note'
interface Post { slug, title, date (ISO), tags: string[], description, type: PostType, published }
interface Project { title, year, description, article?, demo?, source? }

PAGES
/ — intro + featured articles + featured projects
/blog — year-grouped <details>/<summary> archive, current year open, each item: date (mono) + title link
/notes — identical structure to /blog but type='note' posts
/projects — 1→2→3 col responsive grid; cards: year (mono muted), title, 1-line desc, action links; no images
/me — intro, "No ads. No AI. No tracking." philosophy, "What I'm Doing Now", tools, publications
/topics — all tags alphabetically; clicking tag shows filtered posts

TYPOGRAPHY
Headings: 'Outfit' (Google Fonts). Body: system sans. Dates/tags: monospace.

HEADER — sticky, border-bottom
Left: logo/name. Right: nav (Blog, Notes, Projects, About) + ThemeToggle (text label).

ACCENT USAGE
hover links, active nav, post title hover, tag pills (accent-bg + accent text), year headings

STATIC EXPORT — output: 'export', tsc clean, Lighthouse ≥ 90/90
```

---

### 3. Bolt.new

Build a **Tania Rascia-style developer blog and portfolio** — Next.js 14 App Router, TypeScript strict, CSS Modules (no Tailwind).

**What makes this site distinct:**
- Warm beige background in light mode (not white)
- Pink Solarized accent that changes value between light and dark
- Year-grouped blog archive with collapsible year sections
- Separate Notes page for short-form writing
- Project cards without images — text + year + action links only
- Philosophy-first About page

**Color tokens (no hex in CSS):**
| Variable | Light | Dark |
|---|---|---|
| `--color-bg` | `hsl(40deg 33% 97%)` | `hsl(210deg 12% 13%)` |
| `--color-bg-card` | `hsl(40deg 25% 93%)` | `hsl(210deg 12% 18%)` |
| `--color-text` | `hsl(210deg 12% 16%)` | `hsl(40deg 20% 90%)` |
| `--color-text-muted` | `hsl(210deg 8% 50%)` | `hsl(210deg 8% 58%)` |
| `--color-border` | `hsl(40deg 15% 83%)` | `hsl(210deg 12% 26%)` |
| `--color-accent` | `hsl(332deg 61% 41%)` | `hsl(332deg 100% 76%)` |
| `--color-accent-bg` | `hsl(332deg 61% 41% / 0.08)` | `hsl(332deg 100% 76% / 0.08)` |

Light mode is `:root` (default). Dark override is `[data-theme="dark"]`. Inline `<script>` in `<head>` before CSS sets `data-theme` from `localStorage` / `prefers-color-scheme`. `suppressHydrationWarning` on `<html>`.

**Data types:**
```typescript
type PostType = 'article' | 'note'
interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

**Build these pages:**

1. **`/`** — Hero intro, featured articles list, featured projects
2. **`/blog`** — All articles grouped by year. `<details>` per year, current year open. Each item: `<time>` (monospace, month + day) + title link
3. **`/notes`** — Same year-group pattern, `type: 'note'` posts only
4. **`/projects`** — Responsive grid (1/2/3 col). Cards show: year (top, monospace muted), title, description, links (Article | Demo | Source). Zero images.
5. **`/me`** — Intro + philosophy statement + "Now" section + tools + publications + creative work
6. **`/topics`** — Alphabetical tag index + filtered post lists

**Typography:** `Outfit` (Google Fonts) headings, system sans body, monospace for dates/tags/code.

**Header:** Sticky. Nav: Blog, Notes, Projects, About. ThemeToggle with text label. `var(--color-bg)` background, `var(--color-border)` bottom border.

Static export. Zero TS errors. Lighthouse ≥ 90.

---

### 4. v0

Create a developer blog and portfolio site. Next.js 14 App Router, TypeScript, **CSS Modules only** (no Tailwind, no shadcn).

**Design reference:** taniarascia.com — self-taught developer with 100+ articles, warm beige aesthetic, Solarized pink accent, year-grouped content archive.

**Color system:**
```css
/* Light mode — default */
:root {
  --color-bg: hsl(40deg 33% 97%);
  --color-bg-card: hsl(40deg 25% 93%);
  --color-text: hsl(210deg 12% 16%);
  --color-text-muted: hsl(210deg 8% 50%);
  --color-border: hsl(40deg 15% 83%);
  --color-accent: hsl(332deg 61% 41%);
  --color-accent-bg: hsl(332deg 61% 41% / 0.08);
}
/* Dark mode */
[data-theme="dark"] {
  --color-bg: hsl(210deg 12% 13%);
  --color-bg-card: hsl(210deg 12% 18%);
  --color-text: hsl(40deg 20% 90%);
  --color-text-muted: hsl(210deg 8% 58%);
  --color-border: hsl(210deg 12% 26%);
  --color-accent: hsl(332deg 100% 76%);
  --color-accent-bg: hsl(332deg 100% 76% / 0.08);
}
```

Dark mode via inline `<script>` in `<head>` — NOT next-themes. Light mode is `:root` default. `suppressHydrationWarning` on `<html>`.

**Fonts:** `Outfit` (Google Fonts) headings. System sans body. Monospace for dates and tags.

**TypeScript types:**
```typescript
type PostType = 'article' | 'note'
interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

**Routes and components:**

`/` — Homepage with intro, recent articles, featured projects

`/blog` — `getPostsByYear()` returns `Map<number, Post[]>`. Render each year as `<details open={isCurrentYear}><summary>2024 (12)</summary><ul>...</ul></details>`. Each list item: `<time>` (monospace, "Mar 15") + title link. "View all topics" link.

`/notes` — Identical pattern, `type: 'note'` only.

`/projects` — `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem`. Card: year (monospace muted), title, description, links. No images.

`/me` — Personal narrative about page. Sections: philosophy, now, tools, publications, speaking, creative.

`/topics` — Tag index. All tags alphabetically. Each tag links to `/topics/[tag]`.

`/topics/[tag]` — Filtered post list for that tag.

Sticky header. Static export. `tsc --noEmit` zero errors.

---

### 5. Claude Artifacts

Build a developer blog and portfolio site in Next.js 14 App Router with TypeScript strict and CSS Modules. No Tailwind.

**Reference design:** taniarascia.com — prolific technical writer, self-taught developer, 100+ articles.

**Identity markers:**
1. Warm beige light-mode background (not white: `hsl(40deg 33% 97%)`)
2. Solarized pink accent — muted in light (`hsl(332deg 61% 41%)`), vivid in dark (`hsl(332deg 100% 76%)`)
3. Year-grouped blog archive with collapsible `<details>` sections
4. Two content types: Articles (long tutorials) and Notes (short-form)
5. Project cards — text only, no images, year label top-left
6. About page with explicit philosophy: "No ads. No AI. No tracking."

**Implement these files:**

`src/types/index.ts` — `PostType`, `Post`, `Project` interfaces

`src/styles/tokens.css` — All CSS custom properties listed above. Light mode in `:root`, dark in `[data-theme="dark"]`. No hex values.

`src/styles/globals.css` — imports tokens, base reset, body bg/color/font, code styles, `prefers-reduced-motion` block

`src/app/layout.tsx` — `suppressHydrationWarning` on `<html>`, inline dark-mode script in `<head>` before any `<link>`

`src/lib/posts.ts` — `getAllPosts()`, `getPostsByYear(): Map<number, Post[]>`, `getPostsByTag(tag): Post[]`, `getPostBySlug()`

`src/app/blog/page.tsx` — Year-grouped archive. `<details open>` for current year, closed for prior years. Monospace dates.

`src/app/notes/page.tsx` — Same structure, `type === 'note'` filter.

`src/app/projects/page.tsx` — Responsive grid, text-only cards with year label.

`src/app/me/page.tsx` — Personal About page with philosophy statement.

`src/app/topics/page.tsx` + `src/app/topics/[tag]/page.tsx` — Tag index + filtered lists.

`src/components/SiteHeader.tsx` — Sticky nav + ThemeToggle.

`src/components/ThemeToggle.tsx` — Reads/writes `data-theme` + localStorage. Text label (not icon-only).

**Content:** 10 seed MDX posts (7 articles + 3 notes), one per major tag. 6 seed projects. All in `src/content/`.

Static export. `tsc --noEmit` zero errors. Lighthouse ≥ 90/90.

---

### 6. Gemini

Design and build a developer blog + portfolio website. Stack: Next.js 14 App Router, TypeScript (strict), CSS Modules. No Tailwind, no component libraries.

**Site model:** A prolific self-taught developer's digital garden — 100+ technical articles, a separate Notes section for shorter writing, a Projects page of text-only cards. The visual design is warm, readable, and personal.

**Visual identity:**

*Light mode (default):*
Background: `hsl(40deg 33% 97%)` — warm beige, distinctly not white. This alone makes the site feel different from generic developer blogs.

*Dark mode (`[data-theme="dark"]`):*
Background: `hsl(210deg 12% 13%)` — dark blue-gray.

*Accent:* Pink from the Solarized palette. `hsl(332deg 61% 41%)` in light mode, `hsl(332deg 100% 76%)` in dark. Applied to: hover links, active nav, post title hover, tag pills.

*Typography:* Outfit (Google Fonts, weights 400 + 600 + 700) for headings. `-apple-system` system stack for body. Monospace for dates and tags.

**Dark mode implementation:** Inline `<script>` in `<head>`, reads `localStorage('color-theme')`, falls back to `prefers-color-scheme`, sets `data-theme` on `<html>`. Light mode is the `:root` default. `suppressHydrationWarning` on `<html>`.

**Data model:**
```typescript
type PostType = 'article' | 'note'
interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

**Architecture:**

`src/lib/posts.ts` exports:
- `getAllPosts()` — all published posts, newest first
- `getPostsByYear()` — `Map<number, Post[]>`, descending year order
- `getPostsByTag(tag: string)` — filtered by tag
- `getPostBySlug(slug: string)` — for post pages

**Pages:**
- `/` — Hero intro + recent articles + featured projects
- `/blog` — Year-accordion archive. `<details>` per year. Current year `open`. Date in `<time>` (monospace, "Mar 15"). Title link.
- `/notes` — Identical layout, notes only
- `/projects` — CSS grid auto-fill minmax(280px, 1fr). Text-only cards: year / title / description / action links
- `/me` — Philosophy + Now + Tools + Publications + Creative Work
- `/topics` — Tag index + `/topics/[tag]` filtered pages

Static export. All slugs via `generateStaticParams`. `tsc --noEmit` clean.

---

### 7. Grok

Build me a developer blog and portfolio. Framework: Next.js 14 App Router. Language: TypeScript strict. Styles: CSS Modules + CSS custom properties. No Tailwind.

Vibe: Self-taught developer's personal website. 100+ published articles. Warm, readable, no hype. The design serves the content.

Key visual choices I want:
- **Beige background** in light mode: `hsl(40deg 33% 97%)` — not white, not gray, warm beige
- **Pink accent**: `hsl(332deg 61% 41%)` light / `hsl(332deg 100% 76%)` dark (Solarized magenta family)
- **Outfit font** for headings (Google Fonts), system sans for body, monospace for dates + tags
- **Light mode default** (`:root`), dark mode via `[data-theme="dark"]`
- Dark mode toggle: inline script in `<head>`, reads localStorage + prefers-color-scheme, `suppressHydrationWarning` on html

Types:
```ts
type PostType = 'article' | 'note'
interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

Pages I need:

**`/`** — Intro ("I'm [Name], software engineer and open-source creator. This is my digital garden."), recent articles, featured projects.

**`/blog`** — Year-grouped. One `<details>/<summary>` per year (current year open). Each post: monospace `<time>` ("Mar 15") + title link. "View all topics" above the list.

**`/notes`** — Same as blog. Posts with `type: 'note'`.

**`/projects`** — Grid (auto-fill, minmax 280px). Cards have: year label top-left (mono muted), title, 1-line description, action links (Article | Demo | Source). Zero images on cards.

**`/me`** — About page. Must include: intro paragraph, philosophy statement ("No ads. No AI-generated content. No affiliate links. No tracking."), "What I'm Doing Now" section, Tools & Setup, Publications, Creative Work sections.

**`/topics` + `/topics/[tag]`** — Tag index + filtered post lists.

Seed data: 10 MDX posts (7 articles + 3 notes), 6 projects. Static export. `tsc --noEmit` zero errors.

---

### 8. Cursor

Build a developer blog and portfolio website. Next.js 14, TypeScript strict, App Router, CSS Modules. No Tailwind.

**Reference:** taniarascia.com — self-taught developer and prolific technical writer. Digital garden with 100+ posts.

---

**Token file — `src/styles/tokens.css`:**
```css
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

**Layout.tsx — dark mode script BEFORE any stylesheet:**
```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: `
(function(){try{
  var s=localStorage.getItem('color-theme');
  var p=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme',s||p);
}catch(e){document.documentElement.setAttribute('data-theme','light');}})()`}} />
  </head>
```

**Types — `src/types/index.ts`:**
```typescript
export type PostType = 'article' | 'note'
export interface Post { slug: string; title: string; date: string; tags: string[]; description: string; type: PostType; published: boolean }
export interface Project { title: string; year: number; description: string; article?: string; demo?: string; source?: string }
```

**lib/posts.ts — key exports:**
- `getAllPosts(): Post[]` — published, sorted newest-first
- `getPostsByYear(): Map<number, Post[]>` — for archive pages
- `getPostsByTag(tag: string): Post[]`
- `getPostBySlug(slug: string): { post: Post; content: string } | null`

**Pages:**
- `/blog` and `/notes` — year-grouped `<details>` accordions. Current year `open`. Each row: `<time>` (monospace, "Mar 15") + `<a>` title
- `/projects` — CSS grid `repeat(auto-fill, minmax(280px, 1fr))`. Cards: year / title / description / link row. No images.
- `/me` — Philosophy block ("No ads. No AI. No tracking.") + Now + Tools + Publications
- `/topics/[tag]` — `generateStaticParams` from all unique tags

**Fonts in `<head>`:** `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">` — headings use `font-family: 'Outfit', sans-serif`.

Seed: 10 MDX posts + 6 projects. Static export. `tsc --noEmit` clean.

**Four defining constraints:**

**1. Light mode is the :root default — not dark**
Unlike portfolio_07 (Josh Comeau, dark default), this site defaults to light. `:root` defines the warm beige palette. `[data-theme="dark"]` is the override. The inline script in `<head>` reads `localStorage('color-theme')`, falls back to `prefers-color-scheme`. If neither is set, the CSS `:root` default (light/beige) applies with no flash. `suppressHydrationWarning` on `<html>` prevents React hydration mismatch.

**2. Year-grouped blog archive using HTML `<details>/<summary>`**
The `/blog` page renders posts grouped by year using `getPostsByYear(): Map<number, Post[]>`. Each year is a `<details>` element with `open` attribute on the current year only. Within each `<details>`: a `<summary>` showing the year + post count, then a `<ul>` of post entries (each: `<time>` in monospace + title link). This is semantic HTML — no JavaScript accordion component, no animation library.

**3. Project cards are text-only — no images**
`/projects` renders a CSS grid of `<ProjectCard>` components. Each card shows: year label (top-left, monospace, muted), title (hover: `var(--color-accent)`), one-line description, action link row (Article | Demo | Source — only links with values rendered). Zero `<Image>`, zero `<img>`, zero `<picture>`. The constraint is absolute — a project card with an image is wrong.

**4. Inline `<script>` for dark mode — not next-themes**
Dark mode is implemented via a `<script dangerouslySetInnerHTML={{ __html: ... }} />` placed in `<head>` before any stylesheet. The script reads `localStorage` and `prefers-color-scheme`, sets `data-theme` on `document.documentElement`. `ThemeToggle` reads `document.documentElement.getAttribute('data-theme')` and writes `localStorage`. next-themes is not installed.

**YearGroupedArchive.tsx — key implementation:**
```tsx
import Link from 'next/link'
import type { Post } from '@/types'
import styles from './YearGroupedArchive.module.css'

interface Props { postsByYear: Map<number, Post[]> }
const currentYear = new Date().getFullYear()

export function YearGroupedArchive({ postsByYear }: Props) {
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a)

  return (
    <div className={styles.archive}>
      {years.map(year => (
        <details key={year} open={year === currentYear} className={styles.yearGroup}>
          <summary className={styles.yearSummary}>
            <span className={styles.yearLabel}>{year}</span>
            <span className={styles.count}>({postsByYear.get(year)!.length})</span>
          </summary>
          <ul className={styles.postList}>
            {postsByYear.get(year)!.map(post => (
              <li key={post.slug} className={styles.postItem}>
                <time className={styles.date} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                </time>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}
```

```css
/* YearGroupedArchive.module.css */
.archive { display: flex; flex-direction: column; gap: 0; }
.yearGroup { border-top: 1px solid var(--color-border); }
.yearSummary {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 0; cursor: pointer; list-style: none;
  font-family: 'Outfit', sans-serif; font-weight: 600;
}
.yearSummary::-webkit-details-marker { display: none; }
.yearLabel { color: var(--color-accent); font-size: 1rem; }
.count { color: var(--color-text-muted); font-size: 0.8rem; }
.postList { list-style: none; padding: 0.25rem 0 1rem 0; }
.postItem { display: flex; align-items: baseline; gap: 1.5rem; padding: 0.3rem 0; }
.date { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.75rem; color: var(--color-text-muted); min-width: 4ch; }
.postLink { color: var(--color-text); text-decoration: none; font-size: 0.95rem; }
.postLink:hover { color: var(--color-accent); }
```

**ProjectCard.tsx — text-only implementation:**
```tsx
import type { Project } from '@/types'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <span className={styles.year}>{project.year}</span>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.links}>
        {project.article && <a href={project.article} target="_blank" rel="noopener noreferrer" className={styles.link}>Article</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>Demo</a>}
        {project.source && <a href={project.source} target="_blank" rel="noopener noreferrer" className={styles.link}>Source</a>}
      </div>
    </article>
  )
}
```

```css
/* ProjectCard.module.css */
.card { background: var(--color-bg-card); border: 1px solid var(--color-border); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
.year { font-family: monospace; font-size: 0.7rem; color: var(--color-text-muted); }
.title { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 1rem; color: var(--color-text); transition: color 150ms; }
.card:hover .title { color: var(--color-accent); }
.description { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.5; }
.links { display: flex; gap: 1rem; margin-top: auto; padding-top: 0.5rem; }
.link { font-size: 0.8rem; color: var(--color-accent); text-decoration: none; border-bottom: 1px solid transparent; }
.link:hover { border-bottom-color: var(--color-accent); }
```

**QA grep commands:**
```bash
# Light mode is :root — dark is [data-theme="dark"] override
grep -n ":root\|data-theme" src/styles/tokens.css | head -5

# No next-themes installed
grep "next-themes" package.json

# Inline script present in layout.tsx <head>
grep -n "dangerouslySetInnerHTML\|color-theme" src/app/layout.tsx

# No images in ProjectCard
grep -n "Image\|<img" src/components/ProjectCard/ProjectCard.tsx

# Year-grouped archive uses <details>/<summary>
grep -n "<details\|<summary" src/components/YearGroupedArchive/

# Accent color applied to year headings
grep -n "color-accent\|accent" src/styles/tokens.css src/components/YearGroupedArchive/
```
