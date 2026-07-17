# 01 — Product Requirements Document
## Design-Forward Developer Blog · portfolio_platform_07

---

## 1. Product Vision

A blog where the design quality is itself a teaching tool. Readers arrive for the content and leave thinking "I want to build something that looks this good." Every CSS technique used on the site could be the subject of a tutorial on the site. The code is the portfolio.

---

## 2. User Personas

### Persona A — Ravi, Mid-Level Frontend Developer (Primary Reader)
- **Who:** 3-year frontend developer at a product company, comfortable with React but wants to level up in CSS and animations
- **Goal:** Understand complex CSS concepts deeply, not just copy-paste solutions
- **Behaviour:** Arrives from a Twitter share or Google search on "CSS flexbox guide" or "React animation tutorial". Reads the full post (10–20 min). Clicks the ToC to navigate to specific sections. Sees the interactive Counter widget and thinks "I didn't know you could do this in MDX."
- **Key pain point:** Most CSS tutorials are surface-level. He wants to understand the *why*.
- **Success:** Reads the full post. Bookmarks it. Subscribes or follows on social. Returns for another post.

### Persona B — Ananya, Senior Frontend Engineer (Peer + Potential Employer)
- **Who:** Senior engineer evaluating candidates for a team, or simply a peer who found the blog via a retweet
- **Goal:** Assess depth of understanding. Does this person really understand CSS, or are they copying docs?
- **Behaviour:** Arrives at the homepage. Reads the tagline. Skims 2–3 post cards to check quality. Opens one post, reads the abstract and first section. Checks the source code.
- **Key pain point:** Blogs that claim to be "deep dives" but are 300-word tutorials
- **Success:** Reads an introduction, thinks "this person knows their stuff," shares or saves the URL

### Persona C — Isha, Career Changer (Beginner)
- **Who:** Bootcamp graduate transitioning into frontend development
- **Goal:** Find approachable explanations of concepts that feel overwhelming
- **Behaviour:** Searches for "CSS grid explained". Lands on a post. The interactive Counter widget makes her realise she can understand React state. She browses the Career category for job advice.
- **Key pain point:** Tutorials that assume prior knowledge. Dense documentation without examples.
- **Success:** The dark background doesn't intimidate. The friendly rounded font helps. Finds the "Career" category, reads 2 posts, follows on social.

### Persona D — Dev, Content Syndication Editor (Distribution)
- **Who:** Editor for a developer newsletter or platform (CSS-Tricks, Smashing Magazine etc.)
- **Goal:** Find high-quality content to feature or syndicate
- **Behaviour:** Arrives on the blog index, checks quality of the design and writing, looks for the contact/about page
- **Key pain point:** Portfolios with no About page or clear contact info
- **Success:** Reads the About page. Finds the author's voice clear. Sends an email or LinkedIn message.

---

## 3. Functional Requirements

### FR-001: HSL color system
- All colors in CSS custom properties using HSL values
- Dark mode: `:root` defines dark values (default)
- Light mode: `[data-theme="light"]` overrides values
- Primary/secondary/gradient accents unchanged between modes
- No hex values in any CSS file

### FR-002: No-flash dark mode
- Inline `<script>` in `<head>` before any stylesheet
- Script reads localStorage `color-theme`
- Falls back to `prefers-color-scheme` system preference
- Sets `data-theme` attribute on `document.documentElement`
- `suppressHydrationWarning` on `<html>` element
- ThemeToggle component reads and writes the same attribute + localStorage

### FR-003: Category color coding
- 8 categories: css, react, animation, javascript, career, svg, nextjs, general
- Each category has an HSL color in `CATEGORY_COLORS` record
- PostCard category tag: `style={{ color: CATEGORY_COLORS[post.category] }}`
- CategoryFilter active pill: `style={{ background: CATEGORY_COLORS[category], color: '#fff' }}`

### FR-004: PostCard design
- Background: `var(--color-bg-card)`
- Category tag (top): small, uppercase, category hsl color
- Title: large, `var(--color-text)`, hover: `var(--color-primary)`
- Abstract: 2–3 sentences, `var(--color-text-muted)`
- Published date (bottom): small, muted
- Hover state: `box-shadow: 0 0 0 2px var(--color-primary)` (subtle focus glow)

### FR-005: Blog post ToC
- Generated from MDX `##` and `###` headings
- Rendered as sticky sidebar on lg+ screens
- On mobile: hidden or collapsed accordion
- Active heading tracked via IntersectionObserver
- Active: `color: var(--color-primary)`

### FR-006: Scroll progress bar
- Present on `/blog/[slug]` pages ONLY
- `position: fixed; top: 0; left: 0; height: 3px; z-index: 100`
- Background: `var(--gradient-accent)`
- Width in % driven by `scrollY / (documentHeight - viewportHeight)`
- Updated via scroll event listener (passive)

### FR-007: Custom MDX components
- `<Callout type="info|warning|success">` — left-border card with tinted background
- `<Counter />` — interactive `useState` increment/decrement widget ('use client')
- `<ColorSwatch color="hsl(...)">` — displays a colour circle + hsl value text
- All components typed and exported from a single `src/components/mdx/index.ts`

### FR-008: Gradient text
- CSS class `.gradient-text` in globals.css:
  ```css
  .gradient-text {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  ```
- Applied to: hero tagline on homepage, optionally to section headings

### FR-009: Category filter on /blog
- Client component with `useState<Category | null>`
- Pill row of category buttons
- Active: category hsl background
- Inactive: category hsl border + color
- Selecting active category again → deselects (shows all)

### FR-010: Performance and accessibility
- Font: system-safe fallback chain (no blocking web font requests unless self-hosted)
- All images: `next/image` with `alt` text
- One `<h1>` per page
- ThemeToggle: visible text label (not icon-only)
- All interactive elements keyboard accessible
- Callout: `role="note"` or `role="alert"`
- Counter: `aria-label` on buttons

---

## 4. Acceptance Criteria

### Dark mode
- [ ] Dark mode loads on first visit with no white flash
- [ ] `data-theme="dark"` is on `<html>` before first paint
- [ ] Switching to light mode: page transitions smoothly
- [ ] Refreshing page in light mode: stays light (no flash to dark)
- [ ] ThemeToggle shows correct label for current mode

### Color system
- [ ] `Inspect → Computed Styles` on any element shows HSL custom properties
- [ ] No raw hex values in any `.module.css` file (grep check)
- [ ] `[data-theme="light"]` in globals.css changes the page correctly

### PostCard
- [ ] Category tag color matches CATEGORY_COLORS for that post's category
- [ ] Title turns `--color-primary` on hover
- [ ] Box shadow glow appears on hover

### Blog post page
- [ ] Scroll progress bar present and fills as user scrolls
- [ ] Progress bar gradient matches `--gradient-accent`
- [ ] ToC appears as sticky sidebar on desktop
- [ ] ToC active item changes as user scrolls through headings
- [ ] ToC hidden or collapsed on mobile

### MDX components
- [ ] `<Callout type="info">` renders with blue left border
- [ ] `<Callout type="warning">` renders with yellow left border
- [ ] `<Callout type="success">` renders with green left border
- [ ] `<Counter />` increments and decrements on button click
- [ ] Both components usable inside MDX without import statements in the .mdx file

### Static generation
- [ ] `npm run build` succeeds
- [ ] All 8 post slugs pre-rendered in `/out/blog/`
- [ ] `tsc --noEmit` zero errors
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90

---

## 5. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| Hex colour value in any `.module.css` or `globals.css` | Build should still succeed, but this is a quality violation. `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` must return zero results. All colours through HSL custom properties only. |
| Post missing a `category` field in frontmatter | `CATEGORY_COLORS[undefined]` returns `undefined` — category tag renders with no colour style. Guard: ensure all seed posts have a valid `category` value; add a fallback `'general'` in the data layer. |
| `.gradient-text` class renders as solid colour | Requires `background-clip: text`, `-webkit-background-clip: text`, AND `color: transparent` (or `-webkit-text-fill-color: transparent`). Missing any one of these properties = gradient invisible. Verify in DevTools Computed Styles. |
| ToC rendered with no matching heading `id` attributes | `document.getElementById(entry.id)` returns null; IntersectionObserver observes nothing; active heading never updates. Fix: `rehype-slug` plugin or custom id-injection in `parseToc()`. |
| `ScrollProgressBar` scroll listener causes performance regression | Use `{ passive: true }` on the `addEventListener('scroll', ...)` call. Without it, the browser cannot optimise scroll events. |
| `<Counter />` in MDX without `'use client'` directive | Server component cannot use `useState` — throws React error. Counter must have `'use client'` at the top of its file. The MDXRemote RSC version renders it correctly as long as the component file declares client boundary. |
| CategoryFilter shows 0 posts for a valid category | Post has a typo in `category` field (`'css '` with trailing space vs `'css'`). Seed data validation: trim all category values in `getAllPosts()` or in frontmatter. |
| Blog list renders as grid instead of vertical list | Common layout mistake. PostCards in blog index must use `display: flex; flex-direction: column` or CSS Module vertical list — NOT `display: grid`. |
| `MDXRemote` imported from `'next-mdx-remote'` (non-RSC) | App Router server component cannot use the non-RSC version. Must use `'next-mdx-remote/rsc'`. Throws at build time with a confusing async context error. |

---

## 6. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| Dark mode default (not light) | The audience — developers who work evenings, in dark IDEs — expects dark mode first. Light default would feel wrong for the tone of the site. |
| HSL custom properties — no hex values | HSL is human-readable and calculable: `hsl(210 15% 6%)` communicates "very dark blue-gray" at a glance. Hex `#0a192f` communicates nothing. Also, HSL enables light/dark mode to change a single variable without touching component styles. |
| `.gradient-text` via `background-clip: text` | The gradient-text effect using CSS background-clip is a technique that can itself become tutorial content. The technique has cross-browser coverage (with `-webkit-` prefix) and needs zero JavaScript. It IS the design identity — not a decoration on top of it. |
| ScrollProgressBar on post pages ONLY | On the blog list page, there is nothing to "progress through." A scroll bar on a short list would fill immediately and be meaningless. It signals reading progress — only meaningful when reading. |
| Category color system via HSL (not Tailwind classes) | Dynamic styling based on `category` value cannot use Tailwind class names (Tailwind purges unused classes). `style={{ color: CATEGORY_COLORS[post.category] }}` inlines the HSL value directly, which works with static export. |
| Blog list: vertical list, not card grid | The content is writing, not visual projects. Cards suggest visual scanning; a list invites sequential reading or title search. Engineering blogs like this have higher post volumes — cards waste space. |
| `rehype-slug` required for ToC | MDX headings rendered without IDs cannot be targeted by IntersectionObserver. This is a documented MDX limitation, not a code error. The rehype plugin adds `id` attributes derived from the heading text — required for the ToC active-tracking feature to work. |
