# 04 — Build Plan
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

5-day plan. Each day ends with a testable, working state.

---

## Day 1 — Foundation

**Goal:** Project running, CSS token system live, dark/light mode switching without flash.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, no Tailwind, src/ dir | `npm run dev` starts |
| 2 | Install deps: `gray-matter`, `next-mdx-remote` | `package.json` updated |
| 3 | Create `src/types/index.ts` — `PostType`, `Post`, `Project` | `tsc --noEmit` clean |
| 4 | Create `src/styles/tokens.css` — light mode `:root`, dark mode `[data-theme="dark"]` | Token file exists with all HSL vars |
| 5 | Create `src/styles/globals.css` — imports tokens, base reset, body, headings, code styles | Body renders beige background |
| 6 | Write `src/app/layout.tsx` — Outfit font via `next/font/google`, inline dark-mode script in `<head>`, `suppressHydrationWarning` | No flash on reload; `data-theme` set before first paint |
| 7 | Write `ThemeToggle` — reads/writes `data-theme` + localStorage, text label | Toggle switches beige ↔ dark; refresh persists |
| 8 | Write `SiteHeader` — sticky, nav links, ThemeToggle | Header renders correctly on all pages |

**End-of-day check:**
- Load page → beige background (`hsl(40deg 33% 97%)`)
- Toggle → dark mode (`hsl(210deg 12% 13%)`)
- Refresh in dark → stays dark
- Refresh in light → stays light (no flash to dark)

---

## Day 2 — Content Pipeline

**Goal:** MDX posts readable from filesystem; all query functions working.

| # | Task | Done when |
|---|------|-----------|
| 1 | Create `src/content/articles/` + `src/content/notes/` directories | Dirs exist |
| 2 | Write 7 seed article `.mdx` files with valid frontmatter | 7 articles; tags vary across files |
| 3 | Write 3 seed note `.mdx` files | 3 notes |
| 4 | Write `src/lib/posts.ts` — all 6 exports: `getAllPosts`, `getAllArticles`, `getAllNotes`, `getPostsByYear`, `getAllTags`, `getPostsByTag`, `getPostBySlug` | All functions return correctly typed data |
| 5 | Write `src/lib/projects.ts` — 6 seed projects as a typed array + `getProjectsByYear` | Projects data exported correctly |
| 6 | `next.config.ts` — `output: 'export'`, `images: { unoptimized: true }` | Config saved |

**End-of-day check:**
- `getAllArticles()` returns 7 posts
- `getAllNotes()` returns 3 posts
- `getPostsByYear(getAllArticles())` returns a Map with years as keys
- `getAllTags()` returns a sorted unique string array

---

## Day 3 — Blog + Notes + Post Pages

**Goal:** Archive pages and individual post pages fully functional.

| # | Task | Done when |
|---|------|-----------|
| 1 | Write `YearGroup` component — `<details>/<summary>` with year + count + post list | Expands/collapses on click |
| 2 | Write `/blog` page — `getAllArticles()`, `getPostsByYear()`, render `YearGroup` per year, current year `open` | Archive shows all 7 articles grouped by year |
| 3 | Write `/notes` page — same pattern, `getAllNotes()` | Notes archive shows 3 notes |
| 4 | Write `/blog/[slug]` post page — `generateStaticParams`, `generateMetadata`, `notFound()`, `MDXRemote`, tag links | Post pages render; tags link to `/topics/[tag]` |
| 5 | Write `/notes/[slug]` note page — same structure with "Back to Notes" | Notes pages render |
| 6 | Style post page — `.prose` styles for h2, h3, p, ul, blockquote, code | Post content readable and styled |

**End-of-day check:**
- `/blog` shows year sections; current year expanded
- Clicking past year section expands it
- Clicking a post title navigates to the post page
- Post page: title, date (monospace), tag pills
- Invalid slug → 404

---

## Day 4 — Topics + Projects + About

**Goal:** Tag system fully navigable; projects page; about page complete.

| # | Task | Done when |
|---|------|-----------|
| 1 | Write `/topics` page — `getAllTags()` as alphabetical pill links with post counts | Tag index renders |
| 2 | Write `/topics/[tag]` page — `generateStaticParams` from `getAllTags()`, `getPostsByTag()`, type badge + date + title | Tag pages show filtered posts |
| 3 | Write `ProjectCard` component — year (monospace), title, description, conditional action links | Card renders correctly; no images |
| 4 | Write `/projects` page — projects grid (CSS auto-fill), `ProjectCard` for each | Grid responsive 1→2→3 col |
| 5 | Write `/me` page — intro, philosophy block, "Now" section, tools, publications, creative | All sections present |
| 6 | Write homepage `/` — intro paragraph, recent 5 articles, featured projects | Homepage shows site identity |

**End-of-day check:**
- `/topics` — all tags listed alphabetically
- `/topics/javascript` — shows posts tagged "javascript"
- `/projects` — 6 cards, no images, links conditional
- `/me` — philosophy statement visible
- Homepage renders without errors

---

## Day 5 — Audit + Polish

**Goal:** TypeScript clean, build passes, all acceptance criteria met.

| # | Task | Done when |
|---|------|-----------|
| 1 | `tsc --noEmit` → fix type errors | Zero errors |
| 2 | `npm run build` → inspect `/out/` | All blog + note slugs and tag pages in `/out/` |
| 3 | Grep CSS for hex values: `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` | Zero results |
| 4 | Verify theme: hard reload light → no flash to dark | Confirmed |
| 5 | Verify theme: dark mode refresh → stays dark | Confirmed |
| 6 | Verify year grouping: current year open, past years collapsed | Confirmed in browser |
| 7 | Verify project cards: no images anywhere on `/projects` | Confirmed |
| 8 | Verify `/me`: philosophy block present with correct text | Confirmed |
| 9 | Accessibility check: one `<h1>` per page, `aria-labels`, tag `aria-label` | No issues |
| 10 | Lighthouse run | Performance ≥ 90, Accessibility ≥ 90 |

**Final checklist:**
- [ ] Beige background on light mode — not white
- [ ] Pink accent differs between light and dark (different HSL lightness/saturation values)
- [ ] Blog and Notes on separate pages; articles don't appear in notes and vice versa
- [ ] `<details>` year groups — current year `open`, prior years closed
- [ ] Project cards: text only, no images
- [ ] `/me` URL (not `/about`)
- [ ] Philosophy statement in `/me`: "No ads. No AI-generated content..."
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] Lighthouse ≥ 90/90

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Light mode shows white instead of beige | High | High | Background must be `hsl(40deg 33% 97%)` — NOT `#fff` or `hsl(0 0% 100%)`. Check `:root` `--color-bg` token. Common mistake: Tailwind default `bg-white` overrides the token. |
| Dark mode flash on reload | High | High | Inline script in `<head>` runs synchronously: `document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') ?? 'light')`. Must fire before `<body>` renders. `suppressHydrationWarning` on `<html>` also required. |
| Articles appear in `/notes` archive (or vice versa) | High | High | `getAllArticles()` reads only from `src/content/articles/`. `getAllNotes()` reads only from `src/content/notes/`. The two directories must never be mixed in a single `getAllPosts()` call that feeds both pages. |
| `getPostsByYear` returns wrong structure | Medium | High | Must return `Map<string, Post[]>` keyed by year string (e.g. `"2024"`). If returned as plain object, `Object.entries()` iteration order is not guaranteed for numeric keys — use `Map` and `Array.from(map.entries())` when rendering. |
| Current year `<details>` not open by default | Medium | Medium | `YearGroup` must receive an `open` prop derived from comparing the year to `new Date().getFullYear().toString()`. Do NOT use client-side `useEffect` to set this — it causes a hydration flash. Pass `open` as a static prop from the server component. |
| Outfit font not loading (FOUT) | Medium | Low | `next/font/google` must be used — NOT a CSS `@import` from Google Fonts. The `next/font` approach self-hosts the font and prevents FOUT. Verify no `@import url('https://fonts.googleapis.com')` in any CSS file. |
| `/me` page served at `/about` instead | Medium | Medium | Route is `src/app/me/page.tsx`. If scaffolded as `src/app/about/page.tsx` by mistake, fix the directory name. Nav links must point to `/me`. |
| Tags not pre-generated at build | Medium | High | `generateStaticParams` in `/topics/[tag]/page.tsx` must call `getAllTags()` and return `{ tag }` for each. Missing this means tag pages 404 in static export mode. |
| Hex colour values in CSS files | Low | Medium | `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` must return zero results. All colours defined via HSL CSS custom properties. |

---

## Testing Strategy

| Day | Critical Test | Method |
|-----|--------------|--------|
| 1 | Light mode background is beige, not white | DevTools Computed → `background-color` on `body` should be `rgb(251, 248, 244)` (≈ HSL 40 33% 97%) |
| 1 | Dark mode: no flash on hard reload | Network → Disable cache → Hard reload → confirm no white/beige flash before dark bg |
| 1 | Theme persists across refresh | Set dark → refresh → still dark; set light → refresh → still light |
| 2 | `getAllArticles()` returns 7, `getAllNotes()` returns 3 | Console log in a test server component or terminal `ts-node` |
| 2 | `getPostsByYear` keys are year strings | Log the Map keys — should be `["2024", "2023"]` etc., not numeric |
| 3 | `/blog` current year section is open | First `<details>` on page should have `open` attribute in DOM |
| 3 | Past year sections are collapsed | Remaining `<details>` elements should NOT have `open` attribute |
| 3 | Notes don't appear on `/blog` | Count items on `/blog` — must equal `getAllArticles()` count, not combined total |
| 3 | Invalid slug → 404 | Navigate to `/blog/bad-slug` and `/notes/bad-slug` — both must 404 |
| 4 | All tags listed on `/topics` | Count tag pills — must match `getAllTags().length` |
| 4 | `/topics/javascript` shows only JS posts | Verify each listed post has "javascript" in its tags array |
| 4 | `/projects` has no images | DevTools Network → no image requests from `/projects` page |
| 4 | `/me` URL accessible | Navigate to `/me` — must render, not 404 |
| 5 | Hex grep clean | `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` → zero results |
| 5 | Outfit font self-hosted | DevTools Network → font request domain should be `localhost` or same origin, not `fonts.gstatic.com` |
| 5 | All slugs and tags in `/out/` | After build: `/out/blog/`, `/out/notes/`, `/out/topics/` all populated |

---

## Definition of Done

**Day 1 done when:**
- Light mode: beige background confirmed in DevTools Computed Styles (not white)
- Dark mode toggle works; refresh preserves both light and dark without flash
- Outfit font loads from self-hosted source (no Google Fonts network request)

**Day 2 done when:**
- `getAllArticles()` returns 7 articles, `getAllNotes()` returns 3 notes (separate counts verified)
- `getPostsByYear()` returns `Map<string, Post[]>` keyed by year string
- `getAllTags()` returns a sorted, deduplicated string array

**Day 3 done when:**
- `/blog` and `/notes` archive pages render with year-grouped `<details>` sections
- Current year is `open` by default; past years are collapsed
- All post and note slugs render MDX; invalid slugs return 404

**Day 4 done when:**
- `/topics` lists all tags; `/topics/[tag]` shows only matching posts
- `/projects` renders 6 project cards with no images
- `/me` page accessible and includes philosophy statement

**Day 5 (launch) done when:**
- `tsc --noEmit` zero errors
- `npm run build` succeeds; all slugs, notes, and tag pages in `/out/`
- `grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/` returns zero results
- No theme flash on hard reload in either light or dark mode
- Lighthouse ≥ 90 performance + ≥ 90 accessibility
