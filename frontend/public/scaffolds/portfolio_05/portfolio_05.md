# Portfolio 05 — Lee Robinson (Developer Personal Site + Blog)
## Category A: 8 Platform Versions

**Source:** https://leerob.com
**Type:** Developer personal site — writing-first, content-driven, minimal
**Distinguishing traits:** Extreme minimalism (pure typography, no graphics), blog/writing IS the portfolio, single-column prose layout, built-in dark mode, speed-first (Vercel engineer), MDX content pipeline, no project grids or image galleries

---

## Base Prompt

Build a personal website and blog for a software engineer. The site is writing-first: the quality of thinking shown in blog posts is the portfolio, not a gallery of project screenshots. The design is intentionally minimal — content should never compete with decoration. This is what a senior engineer at a top infrastructure company publishes as their personal presence.

**Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS. MDX for blog posts (via `@next/mdx` or `next-mdx-remote`). Dark mode via `next-themes`. Static export (`output: 'export'`). Deployed to Vercel.

**Core principle:** The design is the typography. Everything else is infrastructure. No custom illustrations, no project cards, no hero images. One column. Good prose.

**Color system (Tailwind neutral palette — light and dark):**
```
Light mode:
  bg-white               → page background
  text-neutral-900       → primary text
  text-neutral-500       → muted / metadata / captions
  decoration-neutral-400 → link underlines

Dark mode:
  dark:bg-neutral-950    → page background  (#0a0a0a)
  dark:text-neutral-100  → primary text
  dark:text-neutral-500  → muted
  dark:decoration-neutral-600 → link underlines
```

**Typography:**
- Body/UI: system sans-serif — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- Prose (blog posts): `'Stix Two Text', Georgia, serif` — a variable serif for comfortable long-form reading
- Base size: `text-base` (16px)
- Heading in prose: `text-2xl font-semibold tracking-tight`
- Nav/label size: `text-sm`
- All links: `underline decoration-1 underline-offset-[2.5px] decoration-neutral-400 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-500 transition-colors`

**Layout:**
- Single column, centered, `max-w-xl mx-auto px-4`
- Main content top margin: `mt-0 md:mt-16`
- No sidebar. No grid. One column always.

**Content schema (TypeScript):**
```typescript
export interface Post {
  slug: string
  title: string
  date: string           // ISO 8601 — "2024-03-15"
  summary: string        // 1–2 sentences, used for OG description
  published: boolean
  featured?: boolean     // shown on homepage if true
}
```

**Pages:**
- `/` — Bio paragraph + featured writing list (5–6 curated links) + social links row
- `/blog` — All posts as a flat linked list (title only, no dates displayed, no descriptions)
- `/blog/[slug]` — Individual MDX post with prose typography
- `/work` — Brief work history (company, role, years — minimal prose format)

**Homepage structure:**
```
[name as plain text — not a heading]
[2–3 sentence bio paragraph]

[subheading: "Writing" or "Featured"]
[flat list of 5–6 post titles as underlined links]

[subheading: "Links" or "Find me on"]
[inline row: GitHub · X · YouTube · LinkedIn · Email]
```

**Blog list page (`/blog`):**
```
[heading: "Writing"]
[flat bulleted list — title only, each title is a link]
[no dates, no excerpts, no images, no cards]
```

**Blog post page:**
```
[post title as h1 — text-2xl font-semibold]
[date — text-sm text-neutral-500]
[prose content — max-w-prose, serif font, line-height-7]
[no comments, no related posts, no share buttons]
```

**Navigation:**
```
[name / logo — left]          [Blog  Work  —]  (right, minimal)
```
Sticky, `bg-white dark:bg-neutral-950`, `border-b border-neutral-200 dark:border-neutral-800`.

**Dark mode:** System preference by default (`prefers-color-scheme`). Optional toggle button (sun/moon icon — text-only `[Light]`/`[Dark]` label acceptable). Uses `next-themes` with `attribute="class"`.

**Transitions:** `transition-colors duration-200` on theme changes. No layout animations. No scroll reveals. Speed over animation.

**Performance rules:**
- No images on homepage or blog list
- Avatar image (if used): 40×40px, `next/image`, `priority`
- No custom fonts loaded — system stack for UI, Stix Two Text only if it's a variable font served from `/public/fonts/`
- All blog posts statically generated at build time
- `<Link prefetch={true}>` on all internal links

**`prefers-reduced-motion`:** Already handled by Tailwind's `motion-reduce:` utilities. No additional work needed.

**MDX content:**
```
content/
└── posts/
    ├── things-i-believe.mdx
    ├── image-compression.mdx
    └── ...
```
Frontmatter: `title`, `date`, `summary`, `published`. Read via `gray-matter` or `next/mdx` remark plugin.

---

## Platform Versions

---

### 1. Lovable

```
Build a personal website and blog for a software engineer. The entire design philosophy: content first, decoration never. One column. Good prose. Fast.

Tech: Next.js 14 App Router + TypeScript + Tailwind CSS. Dark mode via next-themes. Blog posts as MDX files in /content/posts/. Static export.

Design rules (enforce strictly):
- Single column, max-w-xl, centered. No grid anywhere.
- Colors: light mode → white bg, neutral-900 text, neutral-500 muted. Dark mode → neutral-950 bg, neutral-100 text.
- All links: underline decoration-1 underline-offset-[2.5px] decoration-neutral-400. No other link styles.
- NO custom illustrations, hero images, project cards, or image galleries.
- NO border-radius on UI elements (buttons, toggles). Sharp edges or text-only.
- Fonts: system sans-serif for UI. 'Stix Two Text' (or Georgia fallback) for blog post prose only.
- Transitions: transition-colors only — no layout animations, no scroll reveals.

Post TypeScript interface:
{ slug: string; title: string; date: string; summary: string; published: boolean; featured?: boolean }

Pages:
1. Homepage (/): Name as plain text (not an h1 brand logo). 2–3 sentence bio. "Writing" section with 5–6 featured post titles as underlined links. "Find me on" row: GitHub · X · YouTube · LinkedIn · Email.
2. /blog: Heading "Writing". Flat bulleted list of ALL published posts — title only as link. No dates shown. No descriptions. No images. No cards.
3. /blog/[slug]: Post title as h1 (text-2xl font-semibold tracking-tight). Date below in text-sm text-neutral-500. Prose content in serif font, max-w-prose, leading-7.
4. /work: Brief work history as prose paragraphs — company, role, years. No fancy timeline component.

Nav: sticky, name left, "Blog Work" links right, border-b. Dark mode toggle (text label "[Dark]"/\[Light]" or icon).

MDX files in /content/posts/[slug].mdx with frontmatter: title, date, summary, published.

Seed with 6 realistic technical blog posts: titles only, MDX files with 2–3 paragraphs of placeholder content. Topics: Next.js, React, performance, developer tools, AI.
```

---

### 2. ChatGPT Canvas

```
Build a Next.js 14 App Router personal site and blog. TypeScript, Tailwind CSS, MDX for posts, next-themes for dark mode. Static export (output: 'export').

This is a writing-first developer portfolio. The design IS the typography — no custom graphics, no image galleries, no project cards.

File structure:
src/
  app/ layout.tsx, page.tsx, blog/page.tsx, blog/[slug]/page.tsx, work/page.tsx, globals.css
  components/ Nav.tsx, ThemeToggle.tsx, PostList.tsx, Prose.tsx
  lib/ posts.ts  ← reads MDX frontmatter, returns Post[]
  types/ index.ts
content/
  posts/ *.mdx  ← blog posts with frontmatter

globals.css: import Tailwind directives. No custom CSS variables needed — use Tailwind classes throughout.

Types (src/types/index.ts):
export interface Post {
  slug: string
  title: string
  date: string    // ISO 8601
  summary: string
  published: boolean
  featured?: boolean
}

src/lib/posts.ts:
- Reads all .mdx files from /content/posts/
- Parses frontmatter with gray-matter
- Returns Post[] sorted by date descending
- Exports: getAllPosts(), getFeaturedPosts(), getPostBySlug(slug)

Components:
- Nav: sticky top-0, bg-white dark:bg-neutral-950, border-b border-neutral-200 dark:border-neutral-800. Name left (text-sm font-medium). Links right: Blog Work. ThemeToggle button.
- ThemeToggle: next-themes useTheme hook. Shows "Light" or "Dark" as text label (text-sm). No icon library.
- PostList: renders <ul> with <li> per post. Each title is <Link> styled with underline decoration-neutral-400 underline-offset-[2.5px] decoration-1 hover:decoration-neutral-500 transition-colors.
- Prose: wraps MDX content. Classes: prose prose-neutral dark:prose-invert max-w-none leading-7. Font-family set to 'Stix Two Text', Georgia, serif via custom Tailwind prose configuration.

Pages:
- /: max-w-xl mx-auto px-4 mt-16. Name paragraph (not h1). Bio (2–3 sentences). Featured writing list (PostList of featured posts). Social links row (plain text links, inline, · separator).
- /blog: "Writing" heading. PostList of ALL published posts. Title only. No dates.
- /blog/[slug]: generateStaticParams from getAllPosts(). MDX rendered via <MDXRemote> or next/mdx. Title h1, date text-sm text-neutral-500, then Prose component.
- /work: prose paragraphs of work history. No timeline component.

Install: npm install next-themes gray-matter @next/mdx next-mdx-remote
Seed: 6 MDX posts in content/posts/ with real frontmatter. Topics: web performance, React patterns, AI tooling, developer experience.
```

---

### 3. Bolt.new

```
Next.js 14 + TypeScript + Tailwind CSS personal blog and portfolio. MDX posts. Dark mode. Static export.

THIS IS NOT A VISUAL PORTFOLIO — it is a writing-first developer site. Do not add:
- Hero images or banners
- Project cards with screenshots
- Animated gradients or particle effects
- Custom illustrations
- Icon libraries (use text only)
- border-radius on interactive elements
- Scroll animations or reveal effects

WHAT IT IS: A single-column reading experience. The typography is the design.

Colors:
- Light: white / neutral-900 text / neutral-500 muted / neutral-400 link decorations
- Dark: neutral-950 / neutral-100 / neutral-500 / neutral-600 link decorations
- One accent only: neutral-500 for metadata text. No colour palette.

Typography:
- UI: system sans — -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
- Prose: 'Stix Two Text', Georgia, serif — in blog post content only
- Sizes: text-base for body, text-sm for nav/meta, text-2xl for post titles, text-xl for headings on index pages
- Links always: underline decoration-1 underline-offset-[2.5px] transition-colors

Post interface: { slug, title, date (ISO), summary, published, featured? }

Pages:
/ — Bio intro (name + 2–3 sentences). Featured writing (5–6 links). Social row (GitHub · X · YouTube · LinkedIn · Email — text links with · separator).
/blog — "Writing" heading. Flat list of ALL posts, title-as-link only. No dates, no excerpts, no images.
/blog/[slug] — MDX post. h1 title. date below in muted. Prose in serif. Clean. No related posts, no comments.
/work — Text paragraphs: current role, previous roles, years. Simple.

Nav: sticky, border-b, name left, [Blog Work] right, dark mode text toggle.
Dark mode: next-themes, attribute="class", system default.

Content: MDX files in /content/posts/ with gray-matter frontmatter.
Seed 6 posts. Topics must be technical: performance optimization, React Server Components, TypeScript patterns, deployment pipelines, developer tooling, AI/LLM integration.
```

---

### 4. v0

```
Design and build a developer personal site with blog. Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, MDX, next-themes. Static export.

Design philosophy: The page should look like it was written, not designed. One column. System fonts. Minimal colour. Content only.

Exact specifications:

Layout:
- All pages: max-w-xl mx-auto px-4
- Homepage top margin: mt-16 (desktop), mt-8 (mobile)
- No grid layout anywhere in the site

Colors (all Tailwind neutral — no custom palette):
- Page bg: white / dark:bg-neutral-950
- Body text: text-neutral-900 / dark:text-neutral-100
- Muted (meta, dates): text-neutral-500 (same both modes)
- Link underlines: decoration-neutral-400 / dark:decoration-neutral-600
- Border: border-neutral-200 / dark:border-neutral-800
- Nav bg: bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm

Typography:
- UI font: system stack (no @import, no next/font for the main font)
- Prose font: 'Stix Two Text', Georgia, serif — applied via Tailwind typography plugin to .prose content
- text-sm for nav, labels, dates
- text-base for body
- text-2xl font-semibold tracking-tight for post h1
- text-xl font-semibold for section headings

Link style (apply consistently via a <Link> wrapper component):
  className="underline decoration-1 underline-offset-[2.5px] decoration-neutral-400 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-500 transition-colors"

Build these components:
1. Nav — sticky, backdrop-blur, border-b. Left: site name (text-sm font-medium). Right: "Blog" "Work" links + ThemeToggle. ThemeToggle shows "Light"/"Dark" text, no icons.
2. PostList — <ul class="space-y-1"> of post titles as styled links. Used on homepage (featured) and /blog (all).
3. Prose — wraps MDX output. prose prose-neutral dark:prose-invert max-w-none.
4. SocialRow — inline links with · separator: GitHub X YouTube LinkedIn Email.

Pages:
- /: greeting (name, text-xl), bio paragraph (2–3 sentences about role + focus), "Writing" h2, PostList (featured), SocialRow
- /blog: "Writing" h1, PostList (all published, newest first)
- /blog/[slug]: generateStaticParams, MDX post, h1 title, date meta, Prose component
- /work: "Work" h1, text paragraphs of experience

MDX: content/posts/*.mdx, gray-matter frontmatter. Seed 6 posts.
next-themes: defaultTheme="system", attribute="class".
```

---

### 5. Claude Artifacts (Cursor / Windsurf / IDE agents)

```
Build a complete, production-ready personal site and blog for a software engineer. Stack: Next.js 14 App Router, TypeScript strict, Tailwind CSS, MDX via next-mdx-remote, next-themes for dark mode. Static export.

PERSONA: Senior software engineer (previously staff-level at a major infrastructure company). The site communicates expertise through writing quality, not visual design. Target reader: other engineers, potential employers, conference organisers.

DESIGN RULES (enforce strictly throughout):
- Single column only: max-w-xl mx-auto px-4 on all pages
- No hero images, project card grids, or image galleries
- No custom illustrations or icon libraries
- No border-radius on interactive elements (sharp edges everywhere)
- No scroll animations or reveal effects — transitions only on colors (transition-colors)
- No custom color palette — Tailwind neutral scale only
- No web fonts loaded over the network — system sans for UI; Stix Two Text only if self-hosted in /public/fonts/
- All links use the same underline treatment: underline decoration-1 underline-offset-[2.5px]

TYPES (src/types/index.ts):
```typescript
export interface Post {
  slug: string
  title: string
  date: string            // ISO 8601
  summary: string         // for OG description
  published: boolean
  featured?: boolean
}

export interface WorkEntry {
  company: string
  role: string
  start: string           // "2020"
  end: string | 'Present'
  description: string
}
```

CONTENT PIPELINE (src/lib/posts.ts):
- Read all .mdx files from content/posts/ using Node fs
- Parse frontmatter with gray-matter
- Return typed Post[] sorted newest first
- Exports: getAllPosts(), getFeaturedPosts(), getPostBySlug(slug)

COMPONENTS:
- Nav (src/components/Nav.tsx): sticky, bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm, border-b border-neutral-200 dark:border-neutral-800. Name left (text-sm font-medium text-neutral-900 dark:text-neutral-100). Links right (Blog Work) text-sm. ThemeToggle text button.
- ThemeToggle (src/components/ThemeToggle.tsx): 'use client'. useTheme from next-themes. Renders "[Light]" or "[Dark]" as a plain <button> text-sm text-neutral-500.
- PostList (src/components/PostList.tsx): <ul class="space-y-1 list-disc list-inside pl-1">. Each item: <Link> with full underline style. No dates shown.
- SocialRow (src/components/SocialRow.tsx): inline links separated by · character. Links: GitHub, X, YouTube, LinkedIn, Email.
- Prose (src/components/Prose.tsx): div with prose prose-neutral dark:prose-invert max-w-none leading-7 [&_a]:decoration-neutral-400. Wraps MDX output.

PAGES:
- src/app/page.tsx: name paragraph (text-neutral-900 dark:text-neutral-100 font-medium), bio (2–3 sentences, text-neutral-700 dark:text-neutral-300), "Writing" section (text-sm font-medium uppercase tracking-widest text-neutral-500 mb-3), PostList(featured), "Connect" section, SocialRow.
- src/app/blog/page.tsx: h1 "Writing", PostList(all published, newest first). No dates. No cards.
- src/app/blog/[slug]/page.tsx: generateStaticParams from getAllPosts(). MDXRemote rendering. Layout: h1 (text-2xl font-semibold tracking-tight), date (text-sm text-neutral-500 mt-1 mb-8), Prose wrapping content.
- src/app/work/page.tsx: h1 "Work". WorkEntry[] rendered as prose paragraphs (company bold, role + dates muted).

MDX CONTENT:
- content/posts/*.mdx with frontmatter: title, date, summary, published, featured
- Seed 6 posts covering: React Server Components, performance budgets, TypeScript patterns, AI in dev workflows, deployment strategies, developer documentation

INSTALL:
npm install next-themes gray-matter next-mdx-remote

next.config.ts:
```typescript
const config: NextConfig = {
  output: 'export',
}
export default config
```

tailwind.config.ts: add @tailwindcss/typography plugin.

layout.tsx: ThemeProvider from next-themes wrapping all children. attribute="class" defaultTheme="system".

Verify: tsc --noEmit zero errors. npm run build succeeds. All post slugs in /out/blog/.
```

---

### 6. Google Gemini / Gemini Canvas

```
Build a personal website and technical blog for a software engineer. The design philosophy: a page that looks like it was written, not designed. Everything is prose and links. Nothing competes with the reading experience.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS. MDX blog posts. Dark mode via next-themes. Static export.

This is the anti-portfolio. No hero images. No project cards. No testimonials carousel. No animated gradient background. Just:
- One column
- System fonts (for UI) and a readable serif font (for blog posts)
- Links styled with underline decoration
- Dark mode that works
- Blog posts that load in under 100ms

Color system (Tailwind neutral only):
Light: bg-white, text-neutral-900 body, text-neutral-500 muted, decoration-neutral-400 links
Dark: bg-neutral-950, text-neutral-100, text-neutral-500 muted, decoration-neutral-600 links
Border: border-neutral-200 / dark:border-neutral-800
No other colours.

Typography:
- UI: system stack — no web fonts loaded
- Blog prose only: 'Stix Two Text', Georgia, serif — self-hosted if possible or CSS font-family fallback only
- text-base body, text-sm nav/dates/meta, text-2xl font-semibold tracking-tight for post titles

Pages:

Homepage (/):
- Name as a text paragraph (not a big h1 logo) — font-medium
- 2–3 sentence bio: who you are, what you care about, where you work
- "Writing" section header (text-sm uppercase tracking-widest text-neutral-500)
- 5–6 featured blog post titles as underlined links — no dates, no excerpts
- Social links: GitHub · X · YouTube · LinkedIn · Email (inline text, · separator)

Blog index (/blog):
- h1 "Writing"
- Flat list of ALL published posts — title-only links
- Sorted newest first by date (but date NOT shown to reader)
- No categories, no tags, no images, no cards

Blog post (/blog/[slug]):
- Post title as h1
- Date below in text-sm text-neutral-500
- Prose content in serif font, leading-7, max-w-prose
- No sidebar, no related posts, no comment section, no social share buttons

Work page (/work):
- h1 "Work"
- Simple prose: current company and role, previous roles, years
- No timeline component, no company logos, no bullet-point achievements

Dark mode: next-themes, defaultTheme="system", attribute="class". Toggle shows "[Light]" or "[Dark]" text — no icons needed.

MDX pipeline: content/posts/*.mdx files with gray-matter frontmatter (title, date, summary, published, featured). src/lib/posts.ts reads and sorts them.

Seed: 6 technical blog post MDX files. Topics: web performance, React patterns, TypeScript, AI tools, developer experience, deployment.
```

---

### 7. Grok

```
Build a writing-first personal site and blog for a software engineer. The entire design is the typography. There are no images, no cards, no animations. Just reading.

Stack: Next.js 14, TypeScript, Tailwind CSS, MDX, next-themes. Static export. Deploy to Vercel.

This site is intentionally boring visually. That is a feature, not a bug. The audience (other engineers) respects performance and simplicity over visual flair. Every millisecond of load time and every unnecessary DOM node is a statement about the engineer's values.

Design rules:
- max-w-xl mx-auto px-4 — the only layout rule
- Tailwind neutral scale only. No custom colors.
- Light: white, neutral-900, neutral-500 muted. Dark: neutral-950, neutral-100, neutral-500.
- All links: underline decoration-1 underline-offset-[2.5px] decoration-neutral-400 transition-colors
- No border-radius on buttons or interactive elements
- No icon libraries — text only
- No animations except transition-colors on theme switch

Post schema: { slug, title, date (ISO), summary, published, featured? }

Pages:
1. / — Name (plain text, font-medium). Short bio (2–3 sentences). Featured writing list (5–6 post titles as links). Social links row (GitHub · X · YouTube · LinkedIn · Email).
2. /blog — h1 "Writing". Flat list of all posts, title as link only. No dates shown. No descriptions. No images.
3. /blog/[slug] — generateStaticParams. h1 post title. Date in text-sm text-neutral-500. MDX prose in serif font (Stix Two Text or Georgia). No sidebar.
4. /work — h1 "Work". Prose format: company + role + years. No timeline component.

Nav: sticky top-0, border-b, bg-white/80 dark:bg-neutral-950/80 backdrop-blur. Left: site name (text-sm font-medium). Right: Blog Work + theme toggle text ("[Dark]" / "[Light]").

MDX: content/posts/*.mdx. Parse with gray-matter. getAllPosts() and getPostBySlug(slug) in lib/posts.ts.

Install: next-themes gray-matter next-mdx-remote @tailwindcss/typography

tailwind.config.ts: include typography plugin. In prose styles: set font-family to 'Stix Two Text', Georgia, serif for [&_p] and [&_li].

Seed with 6 MDX posts. All technical. Minimum 3 paragraphs each. frontmatter: title, date, summary, published: true, featured for 3 of them.
```

---

### 8. Cursor (agentic, file-by-file)

```
Build a personal site and blog for a software engineer. Work file by file. Confirm after each. Do not skip steps.

Philosophy: The design is the typography. One column. No images. No custom graphics. Content only.

CONSTRAINTS:
- Next.js 14 App Router, TypeScript strict, Tailwind CSS, MDX, next-themes
- Static export (output: 'export')
- No image files on homepage or blog list
- No icon libraries — text only
- No border-radius on interactive elements
- All links: same underline treatment — underline decoration-1 underline-offset-[2.5px]
- Tailwind neutral scale only — no custom colors
- System font for UI; 'Stix Two Text'/Georgia serif for prose only

BUILD ORDER:

Step 1 — Setup
npx create-next-app@latest site --typescript --tailwind --app --src-dir --no-eslint
cd site
npm install next-themes gray-matter next-mdx-remote @tailwindcss/typography

Step 2 — tailwind.config.ts
Add @tailwindcss/typography plugin. Add prose variant customization: serif font-family for p and li elements. darkMode: 'class'.

Step 3 — src/app/globals.css
Tailwind base/components/utilities directives. Set html { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

Step 4 — src/types/index.ts
Post { slug, title, date, summary, published, featured? }
WorkEntry { company, role, start, end, description }

Step 5 — content/posts/*.mdx
Create 6 MDX files. Frontmatter: title, date (ISO), summary, published: true, featured (3 of 6).
Topics: React Server Components, web performance, TypeScript patterns, AI dev tools, deployment, developer docs.

Step 6 — src/lib/posts.ts
getAllPosts(): reads content/posts/*.mdx, gray-matter, returns Post[] sorted newest first
getFeaturedPosts(): filters featured: true
getPostBySlug(slug): returns Post + raw content string

Step 7 — src/components/ThemeToggle.tsx
'use client'. useTheme. Renders <button> with text "[Dark]" or "[Light]". No icons. text-sm text-neutral-500.

Step 8 — src/components/Nav.tsx
'use client'. Sticky. border-b. bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm. Name left (font-medium text-sm). Blog, Work links + ThemeToggle right.

Step 9 — src/components/PostList.tsx
Props: posts: Post[]. Renders <ul class="space-y-1 list-disc list-inside pl-1">. Each item: <Link> with full link style.

Step 10 — src/components/SocialRow.tsx
Inline links: GitHub · X · YouTube · LinkedIn · Email. text-sm. Same link underline style.

Step 11 — src/components/Prose.tsx
Wrapper div: className="prose prose-neutral dark:prose-invert max-w-none leading-7 [&_a]:no-underline [&_a]:decoration-neutral-400 [&_a]:underline-offset-[2.5px]"

Step 12 — src/app/layout.tsx
ThemeProvider (next-themes, attribute="class", defaultTheme="system") wrapping Nav + main + footer. Metadata export.

Step 13 — src/app/page.tsx
Name (font-medium), bio, "Writing" section label, PostList(getFeaturedPosts()), SocialRow.

Step 14 — src/app/blog/page.tsx
h1 "Writing". PostList(getAllPosts()).

Step 15 — src/app/blog/[slug]/page.tsx
generateStaticParams from getAllPosts(). getPostBySlug. MDXRemote render. h1 title, date muted, Prose wrapper.

Step 16 — src/app/work/page.tsx
h1 "Work". WorkEntry data as prose paragraphs.

Step 17 — Final verification
tsc --noEmit. npm run build. Confirm all 6 post slugs in /out/blog/. No font files in Network tab.

Report after each step: "Step [N] complete. [What was built]. TypeScript: clean."
```

**Four defining constraints:**

**1. Single column max-w-xl — no grid, no sidebar, always**
Every page uses `max-w-xl mx-auto px-4` as the sole layout constraint. No two-column layout on desktop, no sidebar, no grid of any kind. On `/blog/[slug]`, there is no related-posts column. If any component introduces a second column at any breakpoint, it violates the design.

**2. No images on homepage or blog list — ever**
Homepage renders: name paragraph, bio text, featured post list, social links row. Zero `<Image>`, zero `<img>`. Blog list renders: `h1 "Writing"`, flat `<ul>` of title links. Zero post thumbnails. The only permitted image in the site is a 40×40 avatar on the homepage if explicitly included.

**3. System font for UI — Stix Two Text only in blog post prose**
Body and navigation use `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`. No `@import`, no `next/font`. Stix Two Text applied only inside the `.prose` wrapper via Tailwind typography config. UI elements (nav, social row, headings outside posts) use system stack only.

**4. MDX content pipeline — content/posts/*.mdx is the single source of truth**
`src/lib/posts.ts` reads MDX files from `content/posts/` using Node `fs`. Every `Post` object derives from frontmatter via `gray-matter`. `getAllPosts()` returns published posts sorted newest-first. No post data is hardcoded in any page component.

**PostList.tsx — full implementation:**
```tsx
import Link from 'next/link'
import type { Post } from '@/types'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-1 list-disc list-inside pl-1">
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="underline decoration-1 underline-offset-[2.5px] decoration-neutral-400 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-500 transition-colors"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

**src/lib/posts.ts — full implementation:**
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace('.mdx', '')
      const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8'))
      return { slug, ...data } as Post
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] { return getAllPosts().filter(p => p.featured) }

export function getPostBySlug(slug: string): { post: Post; content: string } | null {
  const fp = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fp)) return null
  const { data, content } = matter(fs.readFileSync(fp, 'utf-8'))
  return { post: { slug, ...data } as Post, content }
}
```

**QA grep commands:**
```bash
# No images on homepage
grep -n "Image\|<img" src/app/page.tsx

# No grid layout anywhere
grep -rn "grid-cols\|display.*grid" src/app/ src/components/

# System font only — no web font import
grep -rn "@import\|googleapis\|next/font/google" src/app/globals.css

# Blog list must NOT show dates
grep -n "date\|<time" src/app/blog/page.tsx

# All links use consistent underline decoration
grep -rn "text-underline\|underline" src/components/ | grep -v "decoration-1"

# Stix Two Text only in prose — not in body styles
grep -n "Stix" src/app/globals.css
```
