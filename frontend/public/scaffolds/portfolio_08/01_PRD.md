# 01 — Product Requirements Document
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

---

## 1. Product Vision

A public learning record that proves expertise through volume and depth. The site exists as evidence: 100+ published articles, open-source projects with documentation, and a personal story that shows how someone becomes a developer through curiosity and persistence. Employers and readers arrive, browse, and leave thinking "this person really knows their craft — and they explain it well."

---

## 2. User Personas

### Persona A — Marcus, Junior Developer (Primary Reader)
- **Who:** 1-year developer, taught himself through tutorials and bootcamp. Searching for clear explanations of JavaScript and React patterns.
- **Goal:** Understand why things work, not just how. Find explanations that don't assume prior knowledge.
- **Behaviour:** Arrives from Google search on "JavaScript closures explained" or "React hooks tutorial". Reads the full article. Follows the code examples. Sees the Notes section and realises there are shorter pieces too. Checks the Topics page to find more articles on JavaScript.
- **Key pain point:** Tutorials that use unexplained jargon. Condescending tone. No code examples.
- **Success:** Reads the article start to finish. Bookmarks the site. Visits the Topics page. Returns for another article.

### Persona B — Priya, Hiring Manager (Evaluator)
- **Who:** Engineering manager at a mid-sized startup, evaluating a candidate who listed their blog on their resume
- **Goal:** Assess depth and communication skill. Does this person explain complex concepts clearly? Are they actively learning?
- **Behaviour:** Lands on the blog archive. Sees posts going back 8 years — immediately impressed by consistency. Opens one article, reads the intro. Checks the Projects page. Reads the About page. Looks for the "No ads, no AI" statement — notes the values.
- **Key pain point:** Blogs with 3 posts that haven't been updated in 2 years. Portfolios with no writing.
- **Success:** Reads 2 articles, visits Projects, forms opinion "this person is a strong communicator with depth."

### Persona C — Sofia, Career Changer (Aspiring Developer)
- **Who:** Marketing professional who has been teaching herself to code for 6 months. Looking for a relatable role model.
- **Goal:** Find someone who made the transition from a different background and can explain the journey.
- **Behaviour:** Finds the site via a "self-taught developer" search or a tweet. Lands on the About page. The "chef → developer" career arc resonates. Reads the "career" tagged posts. Subscribes to the RSS feed.
- **Key pain point:** Developer sites that feel gatekeeping or elite. No personal story.
- **Success:** Reads the About page and feels inspired. Finds career-related articles. Follows the author on social media.

### Persona D — Dev, Open-Source Contributor (Collaborator)
- **Who:** Developer who found one of the author's open-source projects on GitHub and wants to know more
- **Goal:** Understand the author's technical approach. Is there an article explaining the design decisions?
- **Behaviour:** Arrives from GitHub. Goes to Projects page. Each project card has an "Article" link — clicks it and reads the technical write-up. Checks the About page for contact info.
- **Key pain point:** Projects with no documentation or explanation. GitHub bios that say nothing.
- **Success:** Finds the project card, reads the linked article, sends a GitHub issue or PR.

---

## 3. Functional Requirements

### FR-001: Light-mode-default color system
- All colors as CSS custom properties using HSL
- Light mode: `:root` defines default (beige background) values
- Dark mode: `[data-theme="dark"]` overrides values
- Accent color: different HSL values in light vs dark (same hue, different saturation/lightness)
- No hex values in any CSS file

### FR-002: No-flash theme detection (light default)
- Inline `<script>` in `<head>` before any stylesheet
- Script reads `localStorage('color-theme')`
- Falls back to `prefers-color-scheme`
- Sets `data-theme` on `document.documentElement`
- Default/fallback is `'light'` (not dark — this is the opposite of portfolio_07)
- `suppressHydrationWarning` on `<html>`

### FR-003: Year-grouped blog archive
- `/blog` page groups all articles by publication year
- Each year rendered as a `<details>` element with year as `<summary>`
- Current year: `open` attribute (expanded by default)
- Prior years: collapsed by default
- Each entry: `<time>` (monospace, "Mar 15" format) + title as link
- Post count shown in summary: "2024 (12)"
- No excerpts, no tags, no images in the list view

### FR-004: Notes section
- `/notes` page — separate from `/blog`
- Same year-grouped `<details>` archive pattern
- Shows only `type: 'note'` posts
- Notes are shorter, more personal than articles
- Listed identically to articles (date + title)

### FR-005: Topics (tag) system
- Each post has a `tags: string[]` array (flat, arbitrary strings)
- `/topics` page: all unique tags alphabetically, each as a link
- `/topics/[tag]`: all posts (articles + notes) with that tag, reverse chronological
- `generateStaticParams` for all unique tags
- Post list on topic page shows: type badge (article/note), date, title

### FR-006: Project cards (text-only)
- `/projects` page: responsive grid (1 → 2 → 3 col)
- Each card shows: year (monospace, muted, top-left), title, one-line description, action links
- Action links: Article (links to blog post or URL), Demo (external), Source (GitHub)
- Only show link types that are defined (undefined links are omitted)
- NO images on any project card
- Cards grouped by year section headings OR year label on card (not both)

### FR-007: About page with philosophy statement
- `/me` page (not `/about`)
- Must include a philosophy block: "No ads. No AI-generated content. No affiliate links. No tracking."
- "What I'm Doing Now" section — bulleted, with a "Last updated: [date]" timestamp
- Tools & Setup section — editor, OS, machine
- Publications section — external platforms where author has published
- Speaking & Media section — podcasts, conference talks
- Creative Work section — non-developer creative pursuits

### FR-008: Static generation of all routes
- `output: 'export'` in `next.config.ts`
- `images: { unoptimized: true }`
- `generateStaticParams` for `/blog/[slug]`, `/notes/[slug]`, `/topics/[tag]`
- All 10 seed posts and all unique tags pre-rendered at build time

### FR-009: Post page
- Title as `<h1>`
- Date, reading time, tags displayed in header
- Tags link to `/topics/[tag]`
- MDX content via `next-mdx-remote`
- Code blocks with syntax highlighting (shiki or prism)
- No custom interactive widgets needed (simpler than portfolio_07)
- "Back to Blog" / "Back to Notes" link in header

### FR-010: Performance and accessibility
- Outfit font: loaded via Google Fonts with `display=swap`
- Body font: system stack (no web font request)
- All images: `next/image` with `alt`
- One `<h1>` per page
- ThemeToggle: visible text label
- All interactive elements keyboard accessible
- `prefers-reduced-motion` respected

---

## 4. Acceptance Criteria

### Theme
- [ ] First load (no localStorage): page renders with beige background, no flash
- [ ] `data-theme` is NOT set to dark on first light-mode load
- [ ] Switching to dark: page transitions smoothly, background becomes `hsl(210deg 12% 13%)`
- [ ] Refreshing in dark mode: stays dark (no flash to light)
- [ ] ThemeToggle shows correct label for current mode

### Blog archive
- [ ] `/blog` shows all articles grouped by year
- [ ] Current year section is open (expanded) on load
- [ ] Past year sections are collapsed on load
- [ ] Clicking a year `<summary>` expands/collapses it
- [ ] Each entry shows date in monospace ("Mar 15") and title as link
- [ ] "View all topics" link present above the list

### Notes
- [ ] `/notes` shows only `type: 'note'` posts
- [ ] Same year-grouping pattern as `/blog`
- [ ] Notes are excluded from `/blog` and vice versa

### Topics
- [ ] `/topics` shows all unique tags alphabetically
- [ ] `/topics/[tag]` shows all posts with that tag
- [ ] Tag links in post headers navigate to topic page

### Projects
- [ ] All project cards show: year, title, description, available action links
- [ ] No images rendered anywhere on the projects page
- [ ] Grid is responsive (1 col mobile, 2 col tablet, 3 col desktop)

### About
- [ ] Philosophy statement present: "No ads. No AI-generated content..."
- [ ] "What I'm Doing Now" section present with a date
- [ ] All major sections present (tools, publications, speaking, creative)

### Build
- [ ] `npm run build` succeeds; all routes in `/out/`
- [ ] `tsc --noEmit` zero errors
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
- [ ] No hex values in any `.css` or `.module.css` file

---

## 5. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| `type` field missing from frontmatter | `getAllArticles()` filters `type === 'article'`; a post with no type field is excluded from both `/blog` and `/notes`. Guard: seed all posts with explicit `type: 'article'` or `type: 'note'`. |
| Article appears in `/notes` page (or vice versa) | Bug — type filter not applied. `getAllArticles()` must only read from `src/content/articles/` OR filter by `type`. `getAllNotes()` only from `src/content/notes/`. They must NEVER share a combined `getAllPosts()` result without type filtering. |
| `getPostsByYear()` with empty post array | Returns empty `Map` — `Array.from(map.entries())` returns `[]`. Page renders with no year sections. This is correct empty-state behaviour; do not crash. |
| `<details>` current year `open` attribute set via `useEffect` | Creates a hydration flash — the server renders without `open`, client adds it, causing a visible jump. Pass `open` as a static prop from the server component using `new Date().getFullYear()` comparison. |
| `generateStaticParams` for `/topics/[tag]` not implemented | Tag pages return 404 in static export. This is a silent failure — no build error, but pages are inaccessible. Always verify tag pages are in `/out/topics/` after build. |
| Project card with all action links undefined | Renders a card with title and description but no links — acceptable. Do not render an empty link row. Guard: `{project.articleUrl && <a>Article</a>}` pattern for each link type. |
| Outfit font request blocked (offline or CSP) | Body falls back to system font stack — acceptable. The fallback stack in `next/font` config must include at least `sans-serif` as final fallback. |
| `/me` URL confused with `/about` | Route is `src/app/me/page.tsx`. If agent scaffolds as `about/page.tsx`, nav links to `/me` will 404. The `00_Orchestrator.md` must list the correct route. |
| Hex value in CSS | `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` must return zero. All colours via HSL CSS custom properties. |

---

## 6. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| Beige light mode background (`hsl(40deg 33% 97%)`) — not white | White feels clinical and harsh at high brightness. Beige reads as "paper" — appropriate for a writing-heavy site. It also differentiates the site from the typical white-background developer blog. |
| Light mode as default (opposite of portfolio_07) | The author's actual site uses light mode as default. It also reinforces a reading-oriented aesthetic — white/beige backgrounds signal long-form text over dark "code editor" aesthetic. |
| `<details>/<summary>` for year groups — not JavaScript accordion | Native HTML is accessible by default (keyboard, screen readers). It requires zero JavaScript. The `open` attribute is set as a static prop — no client state needed. This is a deliberate choice to demonstrate HTML-first approach. |
| No images on project cards | Projects are text and code; screenshots are misleading (they show a moment in time, not the engineering work). The text description + action links communicate more accurately. |
| `/me` not `/about` | Personal branding choice — "About" is corporate; "Me" is personal. The URL is a signal about the author's voice. |
| Articles and Notes in separate content directories | Separation at the filesystem level (not just a `type` field) enforces the content distinction. An AI agent accidentally mixing them causes archive pages to show wrong content — physical directory separation prevents this class of error. |
| Philosophy statement hard-coded in `/me` | "No ads. No AI-generated content. No affiliate links. No tracking." is a values statement, not dynamic data. It must appear verbatim — it is the site's identity claim and is what differentiates it from most content sites. |
| `getPostsByYear()` returns `Map<string, Post[]>` | JavaScript `Map` preserves insertion order. Plain objects with numeric-like string keys can sort unexpectedly in some environments. A `Map` with years sorted descending during insertion is explicit and correct. |
