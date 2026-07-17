# 01 — Product Requirements Document
## Developer Personal Site + Blog · portfolio_platform_05

---

## 1. Product Vision

A personal site that an engineer is proud to share with other engineers. Speed and clarity are the design values. The blog should be readable in under 100ms. The homepage should communicate who you are in under 10 seconds. The writing should be good enough that people bookmark individual posts and come back.

---

## 2. User Personas

### Persona A — Arjun, Senior Engineering Manager (Primary)
- **Who:** Engineering manager at a Series B startup evaluating candidates for a Staff Engineer or Principal role
- **Goal:** Quickly confirm: is this person actually good? Do they think clearly? Do they write well?
- **Behaviour:** Arrives from LinkedIn or a referral. Reads 1–2 paragraphs of bio. Clicks 1–2 blog posts. If the writing is sharp, books an intro call.
- **Key pain point:** Most engineer portfolios are all visual — GitHub heatmaps, project screenshots — with no signal of how the person thinks
- **Success:** Reads bio + 1 blog post within 60 seconds; finds the email; sends a message

### Persona B — Divya, Fellow Engineer (Community)
- **Who:** Senior frontend engineer who follows the author on X/Twitter
- **Goal:** Read the new post someone shared, then browse older writing
- **Behaviour:** Arrives directly on a blog post URL. Reads the post. Visits /blog to see what else exists. Might follow on GitHub.
- **Key pain point:** Technical blogs that take 8 seconds to load, have modal popups for newsletter subscriptions, and autoplay video
- **Success:** Post loads instantly. Reads it. Browses 2–3 more titles on /blog. Zero friction.

### Persona C — Meera, Conference Programme Chair (Opportunity)
- **Who:** Organises a developer conference, looking for speakers on React/performance/AI topics
- **Goal:** Evaluate whether this person is a credible speaker with a clear POV
- **Behaviour:** Looks at /about or the homepage bio. Reads the "Things I Believe" style post. Checks the work history.
- **Key pain point:** Hard to find a clear professional summary and evidence of depth in one place
- **Success:** Bio paragraph + 1 opinionated post + /work page gives enough confidence to send a speaking invitation

### Persona D — Neha, CS Graduate (Aspiring)
- **Who:** Final-year student who wants to work at a top tech company
- **Goal:** Learn from how the author thinks about their career and technology
- **Behaviour:** Reads multiple posts. Copies the reading list or tool recommendations. May follow on social.
- **Success:** Finds 3+ posts worth reading; finds the social/GitHub links easily

---

## 3. Functional Requirements

### FR-001: Homepage composition
- Name displayed prominently (not a logo, plain text — `font-medium`)
- Bio: 2–3 sentences covering role, company, focus area
- "Writing" section: curated list of 5–6 featured post titles as links (not dates, not excerpts)
- Social links: GitHub, X/Twitter, YouTube, LinkedIn, Email — inline with `·` separator

### FR-002: Blog index page
- Heading "Writing"
- All published posts as a flat linked list — title only
- Sorted newest first by `date` field in frontmatter
- No dates displayed to the reader
- No cards, no excerpts, no images, no tags or categories

### FR-003: Blog post page
- Post title as `<h1>`
- Date displayed as ISO-formatted string below title (`text-sm text-neutral-500`)
- Prose content rendered from MDX in a serif font
- No sidebar, no related posts section, no comment system, no social share buttons
- Correct Open Graph metadata per post (title + summary as description)

### FR-004: Work history page
- Simple prose format: current role, previous roles, years
- No timeline component, no company logos, no skill badges

### FR-005: Dark mode
- Respects `prefers-color-scheme` system preference by default
- Toggleable via a plain text button: "[Dark]" / "[Light]"
- Persists user choice in localStorage (handled by next-themes)
- No flash of incorrect theme on initial load

### FR-006: Navigation
- Sticky nav on all pages
- Name (left) → links to homepage
- "Blog" link, "Work" link (right)
- Dark mode toggle (right)
- `border-b` divider
- Slightly translucent background with `backdrop-blur-sm` so content behind is readable

### FR-007: Content management
- All blog posts as MDX files in `content/posts/`
- Frontmatter: `title`, `date` (ISO 8601), `summary`, `published`, `featured`
- `published: false` posts excluded from all lists and pages
- `featured: true` posts shown on homepage

### FR-008: Static generation
- All blog routes pre-generated at build time from MDX files
- Unknown slug → Next.js 404 via `notFound()`
- `npm run build` succeeds with all post slugs in `/out/blog/`

### FR-009: Performance
- Homepage: no images (or one 40×40px avatar — `next/image priority`)
- No web font requests in Network tab
- Blog post pages: `next/image` for any images in MDX content, with `sizes` attribute
- Target: Lighthouse performance ≥ 95 on all pages

### FR-010: Accessibility
- SkipNav as first focusable element
- Heading hierarchy: one `<h1>` per page
- All links have meaningful text (no "click here")
- ThemeToggle button has visible label (text, not icon-only)
- Focus rings visible: Tailwind `focus-visible:outline-2 focus-visible:outline-offset-2`

---

## 4. Acceptance Criteria

### Homepage
- [ ] Name renders as text paragraph, not an `<h1>` or logo image
- [ ] Bio paragraph is 2–3 sentences
- [ ] Featured posts show titles only — no dates, no excerpts
- [ ] Social links appear inline with `·` separator

### Blog list
- [ ] All published posts listed; unpublished posts hidden
- [ ] Sorted newest first (by frontmatter `date`)
- [ ] No dates visible to the reader
- [ ] No images, no cards, no descriptions

### Blog post
- [ ] Title is `<h1>`, correct size and weight
- [ ] Date visible in muted text below title
- [ ] Prose renders in serif font
- [ ] Post loads in < 1s on fast 3G (Lighthouse test)
- [ ] OG meta includes post title and summary

### Dark mode
- [ ] System preference honoured on first load
- [ ] Toggle changes theme instantly without flash
- [ ] No white flash on dark-mode page reload

### Navigation
- [ ] Nav visible on all 4 pages
- [ ] `backdrop-blur` visible when scrolling over content
- [ ] Active link distinguishable (opacity or font-weight)
- [ ] Keyboard accessible (Tab order correct)

### Static generation
- [ ] All 6 post slugs pre-rendered in `/out/blog/`
- [ ] Unknown slug returns 404
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` zero errors

---

## 5. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| `published: false` post | Excluded from `getAllPosts()`, `/blog` list, and `/out/blog/` — must not appear anywhere |
| Post has `featured: true` but `published: false` | `getFeaturedPosts()` calls `getAllPosts()` which already filters by `published` — excluded automatically |
| Frontmatter `date` field missing | `new Date(undefined)` returns `Invalid Date` — `getAllPosts()` must not crash. Safeguard: provide `date` in all seed content; `getTime()` of Invalid Date returns NaN, pushing post to bottom of sort |
| MDX file with no frontmatter at all | `gray-matter` returns `data: {}` — `post.title` is `undefined`. Guard: skip files where `data.title` is falsy in `getAllPosts()` |
| ThemeToggle before client mount | `useTheme()` returns undefined theme on server. The `mounted` guard renders `<span className="w-12" />` until `useEffect` fires — prevents hydration mismatch error |
| User visits `/blog/nonexistent` | `getPostBySlug()` returns `null`; page calls `notFound()` — Next.js renders 404. Do NOT return blank page or throw unhandled error |
| 0 featured posts | `getFeaturedPosts()` returns `[]`; homepage "Writing" section renders an empty list — no crash, no "undefined" visible |
| Blog post contains MDX image | Must use `next/image` component via `mdxComponents` mapping — raw `<img>` bypasses optimisation |
| System font stack missing a font | Browser falls back to the next font in the stack; layout is unaffected. Do NOT add a web font to compensate |

---

## 6. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| Blog titles only — no dates visible | Dates make older posts feel stale and discourage reading. Writing quality is timeless. Engineers sorting by recency miss the best posts. |
| System fonts only — no Google Fonts | Eliminates FOUT entirely. Network tab shows zero font requests. Engineers notice this as a deliberate performance choice. |
| Universal link class enforced everywhere | A single underline treatment for all links is a commitment — inconsistency signals carelessness. `linkClass` is the single source of truth. |
| `[Dark]` / `[Light]` text toggle — not an icon | Icons for theme toggle (sun/moon) have ambiguous meaning: does the sun mean "switch to light" or "you're in light mode"? Text is unambiguous. |
| No images on homepage | Speed. The audience is engineers who open DevTools; a <100ms homepage is a signal in itself. Images add no information to a text-based identity. |
| `published: false` filtering at data layer | Filtering in `getAllPosts()` (not at the route level) ensures no leaked post can reach any surface — list, homepage featured, or static build output. |
| `next-mdx-remote/rsc` not `next-mdx-remote` | App Router uses React Server Components. The RSC-specific import is async-compatible with server components. The non-RSC version throws a runtime error in this context. |
| No sidebar, related posts, or social share on post pages | Distractions from the writing. Engineers who want to share will copy the URL. Related posts create a false sense of curation. |
