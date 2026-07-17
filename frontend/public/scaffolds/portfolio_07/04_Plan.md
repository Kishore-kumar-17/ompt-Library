# 04 — Build Plan
## Design-Forward Developer Blog · portfolio_platform_07

5-day plan. Each day ends with a working, testable state.

---

## Day 1 — Foundation

**Goal:** Project scaffolded, CSS token system live, dark mode working without flash.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, no Tailwind, src/ dir | `npm run dev` starts |
| 2 | Install deps: `gray-matter`, `next-mdx-remote` | `package.json` updated |
| 3 | Create `src/types/index.ts` — `Category`, `Post`, `TocEntry`, `CATEGORY_COLORS` | `tsc --noEmit` passes |
| 4 | Create `src/styles/tokens.css` with all HSL vars | Dark and light vars defined |
| 5 | Create `src/styles/globals.css` — imports tokens, base styles, `.gradient-text` | `.gradient-text` applied to a test heading renders gradient |
| 6 | Write `src/app/layout.tsx` with inline dark-mode script | No white flash on reload; `data-theme="dark"` in DevTools before first paint |
| 7 | Write `ThemeToggle` component — reads/writes `data-theme` + localStorage | Toggle switches theme; refresh preserves selection |

**End-of-day check:**
- Load page → dark background (hsl 210 15% 6%)
- Click toggle → light mode (hsl 210 30% 98%)
- Refresh → stays light
- Open DevTools → Computed Styles show `--color-bg` as HSL value

---

## Day 2 — Content Pipeline + Blog List

**Goal:** Posts read from MDX files, blog list page renders PostCards.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/content/posts/` with 8 seed `.mdx` files (one per category) | Files exist with valid frontmatter |
| 2 | Write `src/lib/posts.ts` — `getAllPosts()` + `getPostBySlug()` | Returns sorted, published-only posts |
| 3 | Write `src/lib/toc.ts` — `parseToc()` extracts `##` and `###` headings | Returns `TocEntry[]` correctly |
| 4 | Write `PostCard` component with CSS Module | Card renders category tag (HSL color), title, abstract, date |
| 5 | Write `CategoryFilter` client component — pill row, active/inactive states | Clicking a pill filters displayed posts; clicking again shows all |
| 6 | Build `/blog` page — `getAllPosts()` → vertical list of PostCards with filter | Blog page loads; filter works |
| 7 | Wire `next.config.ts` — `output: 'export'` | `npm run build` succeeds |

**End-of-day check:**
- `/blog` shows 8 cards
- Category tag on each card uses that category's HSL color
- Category filter pill row — clicking 'css' shows only CSS posts
- PostCard hover: box-shadow glow + title turns `--color-primary`

---

## Day 3 — Post Page: Layout + MDX

**Goal:** Individual post pages render with gradient title, MDX content, scroll progress bar.

| # | Task | Done when |
|---|------|-----------|
| 1 | Write `ScrollProgressBar` client component | Bar appears at top of post page; fills as user scrolls |
| 2 | Write `TableOfContents` client component — IntersectionObserver active tracking | ToC renders; active item changes on scroll |
| 3 | Set up post page layout — two-column grid (ToC sidebar + article) | Desktop: sidebar visible left; mobile: sidebar hidden |
| 4 | Build `src/app/blog/[slug]/page.tsx` — `generateStaticParams`, `notFound()`, `MDXRemote` | All 8 slugs render; invalid slug → 404 |
| 5 | Style post header — category tag, gradient `<h1>`, date | Gradient title renders; category tag has correct HSL color |
| 6 | Style prose content in the article — headings, paragraphs, lists, code | MDX content renders readably |

**End-of-day check:**
- Visit any post → scroll progress bar fills as you read
- Desktop: ToC in sticky left sidebar; active item updates while scrolling
- Mobile: ToC hidden
- H1 post title shows gradient (blue → pink)
- Invalid `/blog/bad-slug` → 404 page

---

## Day 4 — MDX Components + Homepage

**Goal:** Custom MDX widgets working; homepage hero live.

| # | Task | Done when |
|---|------|-----------|
| 1 | Write `Callout` component (info/warning/success) + CSS Module | All 3 types render with correct border/bg color |
| 2 | Write `Counter` client component + CSS Module | Increment and decrement work; `aria-label` on buttons |
| 3 | Write `ColorSwatch` component + CSS Module | Circle + code label renders with color |
| 4 | Create `src/components/mdx/index.ts` — export `mdxComponents` object | No import statements needed in `.mdx` files |
| 5 | Add Callout + Counter + ColorSwatch usage to 2–3 seed posts | Components render correctly inside MDX |
| 6 | Build `src/app/page.tsx` — hero section with gradient tagline + featured posts | Homepage renders; hero tagline uses `.gradient-text` |
| 7 | Write `SiteHeader` with nav links + `ThemeToggle` | Header sticky; toggle visible; nav links work |

**End-of-day check:**
- Open any post that uses `<Callout type="warning">` → yellow left border, yellow tinted bg
- `<Counter />` in a post — click + and − buttons; count changes
- `<ColorSwatch color="hsl(225deg 100% 75%)" />` — circle shows the color
- Homepage hero heading is gradient

---

## Day 5 — Audit + Polish

**Goal:** TypeScript clean, build succeeds, all acceptance criteria met.

| # | Task | Done when |
|---|------|-----------|
| 1 | `tsc --noEmit` → fix any type errors | Zero errors |
| 2 | `npm run build` → inspect `/out/` | All 8 post slugs in `/out/blog/` |
| 3 | Grep for hex values in CSS files | Zero results |
| 4 | Verify dark mode: hard reload → no white flash | `data-theme` set before first paint |
| 5 | Accessibility audit — `<h1>` per page, `alt` on images, `aria-label` on interactive elements | No critical issues |
| 6 | Test `prefers-reduced-motion` — disable transitions | Site usable without animation |
| 7 | Lighthouse run — performance ≥ 90, accessibility ≥ 90 | Scores confirmed |
| 8 | Final check: scroll progress bar ONLY on post pages (not `/blog` list) | Confirmed in browser |

**End-of-day check (acceptance criteria):**
- [ ] Dark mode: no flash; toggle works; refresh preserves mode
- [ ] Blog list: vertical list, not grid; category filter works
- [ ] PostCard hover: glow + title color change
- [ ] Post page: scroll progress bar, gradient title, sticky ToC with active tracking
- [ ] `<Callout type="info">` blue, `warning` yellow, `success` green
- [ ] `<Counter />` interactive
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] Lighthouse ≥ 90/90

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Dark mode flash on reload | High | High | Inline script in `<head>` must run synchronously BEFORE `<body>` renders. Pattern: `document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') ?? 'dark')`. Any async alternative causes flash. |
| Hex colour values in CSS files | High | Medium | All colour values must be HSL CSS variables. `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` must return zero results. Day 5 task #3 verifies this. |
| `MDXRemote` imported from wrong package | High | High | App Router requires `import { MDXRemote } from 'next-mdx-remote/rsc'` — NOT from `'next-mdx-remote'`. The non-RSC version is async-incompatible with server components and will throw at runtime. |
| `.gradient-text` renders as solid colour | Medium | Medium | Requires both `background-clip: text` AND `-webkit-background-clip: text`. Missing either one means the gradient is invisible. Also requires `color: transparent`. All three properties are required. |
| TableOfContents active tracking broken | Medium | Medium | ToC headings need matching `id` attributes on rendered `<h2>` and `<h3>` elements. MDX renders headings without ids by default — requires a rehype plugin (`rehype-slug`) or manual id injection. Without ids, `getElementById` returns null. |
| ScrollProgressBar renders on `/blog` list | Medium | Low | `ScrollProgressBar` must be placed inside `/blog/[slug]/page.tsx` layout only — NOT in the root `layout.tsx`. A common mistake is adding it globally, which causes it to appear on the blog list page. |
| CategoryFilter state resets on navigation | Low | Medium | `CategoryFilter` is a client component. Category selection state is local — navigating away and back resets the filter. This is expected behaviour; do not use URL params unless explicitly required. |
| ToC missing `##` headings from MDX | Low | Medium | `parseToc()` must extract headings from the MDX `content` string before compilation. Test with a post that has both `##` and `###` headings and verify `TocEntry[]` count matches. |

---

## Testing Strategy

| Day | Critical Test | Method |
|-----|--------------|--------|
| 1 | Dark mode: no flash on hard reload | DevTools Network → Disable cache → Hard reload → Watch for white flash |
| 1 | `data-theme` applied before paint | DevTools Elements → `<html>` should have `data-theme` before any paint event |
| 1 | HSL variables resolve in Computed Styles | DevTools Computed → `--color-bg` should show HSL value, not a fallback |
| 2 | CategoryFilter shows correct posts | Click 'css' pill → count visible cards; only CSS category should show |
| 2 | Blog list is vertical (not grid) | Confirm `display: flex; flex-direction: column` on list container — NOT `display: grid` |
| 3 | ToC active section tracking | Scroll slowly through post → active ToC item updates as headings enter viewport |
| 3 | ScrollProgressBar fills correctly | Bar must reach 100% at end of post content, not end of page |
| 3 | `notFound()` on bad slug | Navigate to `/blog/bad-slug` → must render 404, not blank page or error |
| 4 | `<Callout>` variant styles | Render all 3 types in a post — `info`=blue, `warning`=yellow, `success`=green borders |
| 4 | `<Counter>` ARIA | `aria-label` on both + and − buttons; screen reader announces button purpose |
| 5 | Hex grep clean | `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` → zero results |
| 5 | All 8 slugs in build output | `npm run build` → inspect `/out/blog/` for all 8 slug directories |
| 5 | Lighthouse ≥ 90/90 | Lighthouse CLI on homepage and on a post page |

---

## Definition of Done

**Day 1 done when:**
- Dark mode works without flash (hard reload confirmed in browser)
- `data-theme` attribute visible on `<html>` in DevTools before first paint
- All HSL token variables resolve correctly in Computed Styles panel

**Day 2 done when:**
- `/blog` shows 8 PostCards in vertical list (confirmed not grid)
- CategoryFilter pills filter correctly — clicking a category shows only matching posts
- `getAllPosts()` returns sorted, published-only posts

**Day 3 done when:**
- All 8 post slugs render MDX content at `/blog/[slug]`
- ScrollProgressBar present only on post pages (not on `/blog` list)
- ToC active item updates while scrolling through post headings
- Invalid slug returns 404

**Day 4 done when:**
- All 3 MDX custom components render in posts: `<Callout>`, `<Counter>`, `<ColorSwatch>`
- Homepage hero tagline renders as gradient (`background-clip: text` confirmed in DevTools)
- SiteHeader sticky; ThemeToggle visible and functional

**Day 5 (launch) done when:**
- `tsc --noEmit` zero errors
- `npm run build` succeeds; all 8 slugs in `/out/blog/`
- `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` returns zero results
- No dark mode flash on hard reload
- Lighthouse ≥ 90 performance + ≥ 90 accessibility
