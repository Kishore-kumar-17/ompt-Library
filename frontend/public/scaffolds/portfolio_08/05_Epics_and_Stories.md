# 05 — Epics and Stories
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

---

## Epic 1 — Foundation: Color System + Theme Switching

### Story 1.1 — Light-mode-default token file
**As a** developer,
**I want** all colors as HSL CSS custom properties with light mode as the default,
**so that** the beige background renders on first load without any JavaScript.

**Acceptance criteria:**
- [ ] `src/styles/tokens.css` has `:root` defining light-mode values (beige background)
- [ ] `[data-theme="dark"]` overrides 8 properties for dark mode
- [ ] `--color-accent` has different HSL lightness values in light vs dark
- [ ] No hex values anywhere in the file
- [ ] Accent background (`--color-accent-bg`) defined as HSL with alpha in both modes

### Story 1.2 — No-flash dark mode script (light default)
**As a** user returning to the site in dark mode,
**I want** the page to load in my preferred mode with no flash,
**so that** the experience feels seamless.

**Acceptance criteria:**
- [ ] Inline `<script>` in `<head>` before any `<link rel="stylesheet">`
- [ ] Script reads `localStorage('color-theme')` first
- [ ] Falls back to `prefers-color-scheme`
- [ ] Fallback value is `'light'` (not dark — light is the default)
- [ ] `suppressHydrationWarning` on `<html>`
- [ ] Loading page with `localStorage('color-theme') = 'dark'` → dark renders immediately

### Story 1.3 — ThemeToggle
**As a** user,
**I want** a visible toggle to switch between light and dark mode,
**so that** I can choose my preferred reading environment.

**Acceptance criteria:**
- [ ] Button label: "Dark" when in light mode, "Light" when in dark mode
- [ ] Clicking updates `data-theme` + `localStorage`
- [ ] Refresh after toggle preserves the choice
- [ ] `aria-label` indicates what clicking will switch TO
- [ ] Styled with monospace font to match the site's UI pattern

### Story 1.4 — Outfit heading font
**As a** user,
**I want** headings to use the Outfit typeface,
**so that** the site has its characteristic rounded, friendly personality.

**Acceptance criteria:**
- [ ] Outfit loaded via `next/font/google` (not a `<link>` tag — avoids layout shift warning)
- [ ] Applied as `--font-heading` CSS variable on `<html>`
- [ ] `h1` through `h6` use `font-family: var(--font-heading, 'Outfit'), sans-serif`
- [ ] Body text uses system font stack (no Outfit for body)
- [ ] Font loads with `display=swap`

---

## Epic 2 — Content Pipeline

### Story 2.1 — Post schema + content loader
**As a** TypeScript developer,
**I want** typed interfaces for posts and projects,
**so that** content from MDX frontmatter is validated at compile time.

**Acceptance criteria:**
- [ ] `PostType = 'article' | 'note'` exported
- [ ] `Post` interface has all required fields: `slug`, `title`, `date`, `tags: string[]`, `description`, `type`, `published`
- [ ] `Project` interface has all fields with optional `article`, `demo`, `source`
- [ ] `tsc --noEmit` strict mode passes

### Story 2.2 — getAllArticles and getAllNotes
**As a** developer,
**I want** separate functions for fetching articles and notes,
**so that** `/blog` and `/notes` pages show the correct content type.

**Acceptance criteria:**
- [ ] `getAllArticles()` reads from `src/content/articles/`
- [ ] `getAllNotes()` reads from `src/content/notes/`
- [ ] Both filter `published: false`
- [ ] Both sort newest-first by `date`
- [ ] `getAllPosts()` combines both, still sorted
- [ ] No post appears on both `/blog` and `/notes`

### Story 2.3 — getPostsByYear
**As a** blog page,
**I want** posts grouped into a year-keyed Map,
**so that** I can render a `<details>` section per year.

**Acceptance criteria:**
- [ ] Returns `Map<number, Post[]>`
- [ ] Years ordered descending (most recent first)
- [ ] Posts within each year are sorted newest-first
- [ ] Tested with articles spanning multiple years

### Story 2.4 — Tag system functions
**As a** topics page,
**I want** functions to retrieve all unique tags and filter posts by tag,
**so that** the tag index and filtered pages can be statically generated.

**Acceptance criteria:**
- [ ] `getAllTags()` returns `string[]` sorted alphabetically
- [ ] `getPostsByTag(tag)` returns all published posts (articles + notes) with that tag
- [ ] Tags are case-sensitive strings — no normalization
- [ ] `generateStaticParams` for `/topics/[tag]` uses `getAllTags()`

### Story 2.5 — 10 seed MDX posts
**As a** developer previewing the site,
**I want** 7 articles and 3 notes with diverse tags,
**so that** the archive pages demonstrate the year-grouping and the topics page has meaningful content.

**Acceptance criteria:**
- [ ] 7 articles in `src/content/articles/`
- [ ] 3 notes in `src/content/notes/`
- [ ] Posts span at least 3 different years (for multi-year grouping demo)
- [ ] Tags cover at least 5 distinct topics
- [ ] Each post has `description` field (used in `<meta>`)
- [ ] Valid MDX with body content (not empty files)

### Story 2.6 — 6 seed projects
**As a** developer previewing the site,
**I want** 6 seed projects covering 2–3 years,
**so that** the projects grid looks realistic.

**Acceptance criteria:**
- [ ] 6 projects in `src/lib/projects.ts`
- [ ] Covering at least 2 different years
- [ ] Mix of link types: some have all 3 links, some have 1–2
- [ ] No image fields
- [ ] At least 1 project has `article` pointing to a seed post slug

---

## Epic 3 — Blog + Notes Archive

### Story 3.1 — YearGroup component
**As a** blog reader browsing a 100+ post archive,
**I want** posts grouped into collapsible year sections,
**so that** the archive is navigable without being overwhelming.

**Acceptance criteria:**
- [ ] `<details>` element per year
- [ ] `<summary>` shows year + post count: "2024 (12)"
- [ ] Year label styled with Outfit font, accent color
- [ ] Count in monospace, muted
- [ ] `open` prop controls initial state
- [ ] Each list item: monospace date ("Mar 15") + title link
- [ ] Title link navigates to correct post URL

### Story 3.2 — Blog archive page (/blog)
**As a** blog reader,
**I want** to see all articles organized by year,
**so that** I can find articles by browsing or recall when something was written.

**Acceptance criteria:**
- [ ] Current year is expanded on load
- [ ] All prior years are collapsed on load
- [ ] Total article count visible somewhere on the page
- [ ] "View all topics" link present and navigates to `/topics`
- [ ] Page has one `<h1>` ("Articles" or similar)

### Story 3.3 — Notes archive page (/notes)
**As a** reader interested in shorter content,
**I want** a separate page for notes,
**so that** I can distinguish between long tutorials and quick observations.

**Acceptance criteria:**
- [ ] Same year-grouping pattern as `/blog`
- [ ] Shows only `type: 'note'` posts
- [ ] Notes are excluded from the articles page
- [ ] Page has its own `<h1>` ("Notes")

### Story 3.4 — Individual post/note pages
**As a** reader who clicked a post title,
**I want** to read the full article or note,
**so that** I can learn from the content.

**Acceptance criteria:**
- [ ] `generateStaticParams` covers all articles (for `/blog/[slug]`) and all notes (for `/notes/[slug]`)
- [ ] `notFound()` called for unknown slugs
- [ ] Post header: title (`<h1>`), date (monospace), tag pills linking to `/topics/[tag]`
- [ ] MDX content renders via `next-mdx-remote`
- [ ] "Back to Articles" / "Back to Notes" link at top
- [ ] `<meta description>` from post `description` field

---

## Epic 4 — Topics + Projects + About

### Story 4.1 — Topics index page (/topics)
**As a** reader looking for articles on a specific subject,
**I want** to browse all topic tags alphabetically,
**so that** I can find content grouped by subject.

**Acceptance criteria:**
- [ ] All unique tags shown alphabetically
- [ ] Each tag displayed with its post count
- [ ] Each tag is a link to `/topics/[tag]`
- [ ] Styled as pill buttons with accent border on hover
- [ ] Page has one `<h1>`

### Story 4.2 — Topic detail page (/topics/[tag])
**As a** reader who clicked a tag,
**I want** to see all posts (articles and notes) with that tag,
**so that** I can read everything on that subject.

**Acceptance criteria:**
- [ ] `generateStaticParams` from `getAllTags()`
- [ ] Lists both articles and notes with matching tag
- [ ] Shows type badge ("article" or "note") per item
- [ ] Shows date and title per item
- [ ] `notFound()` if tag has no posts
- [ ] "← All Topics" link present

### Story 4.3 — Projects page (/projects)
**As a** visitor evaluating the developer's work,
**I want** to browse their projects in a grid,
**so that** I can quickly assess the breadth and type of work.

**Acceptance criteria:**
- [ ] Responsive grid: 1 col (mobile) → 2 col (640px+) → 3 col (1024px+)
- [ ] Each card shows: year (monospace, muted), title, description, action links
- [ ] Only links that exist are rendered (no empty/broken links)
- [ ] NO images anywhere on the page
- [ ] Cards have `var(--color-bg-card)` background and accent hover border
- [ ] External links have `target="_blank" rel="noopener noreferrer"`

### Story 4.4 — About page (/me)
**As a** visitor curious about the author,
**I want** to read an About page that goes beyond a resume,
**so that** I can understand the person behind the writing.

**Acceptance criteria:**
- [ ] Route is `/me`, not `/about`
- [ ] Philosophy block present: "No ads. No AI-generated content. No affiliate links. No tracking."
- [ ] Philosophy block has distinct styling (accent left border or similar)
- [ ] "What I'm Doing Now" section with a "Last updated:" date
- [ ] Tools & Setup section
- [ ] Publications section
- [ ] Speaking & Media section (even if sparse)
- [ ] Creative Work section (music, illustrations, or equivalent)

---

## Epic 5 — Homepage + Polish + Build

### Story 5.1 — Homepage
**As a** first-time visitor,
**I want** to immediately understand what this site is and see its best content,
**so that** I decide whether to explore further.

**Acceptance criteria:**
- [ ] Intro paragraph with personal voice — "I'm [Name], software engineer and open-source creator. This is my digital garden."
- [ ] Recent articles section (5 most recent)
- [ ] Featured projects section (3 projects)
- [ ] One `<h1>` on the page
- [ ] CTA link to `/blog` and `/me`

### Story 5.2 — Accessibility and performance
**As a** user with accessibility needs or a slow connection,
**I want** the site to be usable and fast,
**so that** I'm not excluded from the content.

**Acceptance criteria:**
- [ ] One `<h1>` per page
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] ThemeToggle has `aria-label`
- [ ] Tag list has `aria-label="Post tags"`
- [ ] `prefers-reduced-motion` — no transitions if reduced motion requested
- [ ] Lighthouse accessibility ≥ 90
- [ ] Lighthouse performance ≥ 90
- [ ] No web font for body (system stack) — only Outfit for headings

### Story 5.3 — Static export + type safety
**As a** deployment engineer,
**I want** a clean static export with zero TypeScript errors,
**so that** the site can be deployed to any static host.

**Acceptance criteria:**
- [ ] `tsc --noEmit` zero errors in strict mode
- [ ] `npm run build` succeeds; `/out/` contains all pages
- [ ] All blog slugs, note slugs, and tag pages in `/out/`
- [ ] `grep -r "#[0-9a-fA-F]" src/styles/` returns zero results (no hex in CSS)
- [ ] `next.config.ts` has `output: 'export'` and `images: { unoptimized: true }`

---

## Expanded Acceptance Criteria — Critical Stories

### Story 1.2 — No-Flash Dark Mode Script (light default — exact implementation)

This site defaults to light mode — the opposite of portfolio_07. The inline script must set `data-theme` to `'light'` when no preference is stored.

```tsx
// src/app/layout.tsx
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('color-theme');
      if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    } catch (e) {}
  })();
`

// layout.tsx
import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

Acceptance criteria:
- Default (no localStorage, no system preference): `data-theme="light"` → beige background renders
- Light-mode user with stored `'light'` preference: no flash
- Dark-mode user with stored `'dark'` preference: dark background before first paint, no flash to beige
- `outfit.variable` on `<html>` makes `--font-heading` available to all CSS

---

### Story 2.3 — getPostsByYear (Map, not plain object)

```typescript
// src/lib/posts.ts
export function getPostsByYear(posts: Post[]): Map<number, Post[]> {
  const map = new Map<number, Post[]>()

  // Sort posts newest-first before grouping
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  for (const post of sorted) {
    const year = new Date(post.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(post)
  }

  return map
}
```

Usage in page component:
```tsx
// src/app/blog/page.tsx (server component)
const posts = getAllArticles()
const byYear = getPostsByYear(posts)
const currentYear = new Date().getFullYear()

return (
  <>
    {Array.from(byYear.entries()).map(([year, yearPosts]) => (
      <YearGroup
        key={year}
        year={year}
        posts={yearPosts}
        open={year === currentYear}   // Static prop — no useEffect needed
      />
    ))}
  </>
)
```

Acceptance criteria:
- Returns `Map<number, Post[]>` — NOT `Record<string, Post[]>` (objects sort numeric keys unpredictably)
- `open={year === currentYear}` is computed server-side and passed as a static prop
- Current year section is open by default without any JavaScript or `useEffect`
- `Array.from(map.entries())` preserves Map insertion order (descending year order)

---

### Story 3.1 — YearGroup Component (HTML-first pattern)

```tsx
// src/components/YearGroup/YearGroup.tsx
interface YearGroupProps {
  year: number
  posts: Post[]
  open?: boolean
}

export function YearGroup({ year, posts, open = false }: YearGroupProps) {
  return (
    <details open={open} className={styles.group}>
      <summary className={styles.summary}>
        <span className={styles.year}>{year}</span>
        <span className={styles.count}>({posts.length})</span>
      </summary>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post.slug} className={styles.item}>
            <time dateTime={post.date} className={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </time>
            <Link href={`/blog/${post.slug}`} className={styles.title}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
```

Acceptance criteria:
- `open` prop controls `<details open>` attribute — this is a native HTML boolean attribute, not a React state
- Do NOT use `useState` for open/closed state — `<details>` manages its own state natively
- `open={true}` on first render = current year expanded; no JavaScript needed for this behaviour
- `<time dateTime={post.date}>` uses ISO date for the machine-readable attribute, formatted for display
- `"Mar 15"` format: `toLocaleDateString('en-US', { month: 'short', day: 'numeric' })`
