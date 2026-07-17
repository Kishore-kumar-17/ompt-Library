# 04 — Build Plan
## Developer Personal Site + Blog · portfolio_platform_05

---

## Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 day | Setup, types, MDX pipeline, content |
| 1 | Layout Shell | 0.5 day | Nav, ThemeProvider, dark mode |
| 2 | Blog System | 1 day | Post list + individual post pages |
| 3 | Homepage + Work | 0.5 day | Homepage assembly, work page |
| 4 | Polish & Launch | 1 day | A11y, perf, OG meta, build verification |

**Total: 4 days** (faster than visual portfolios — no components with complex CSS)

---

## Phase 0 — Foundation (Day 1)

**Deliverables:**
- Next.js 14 + TypeScript + Tailwind CSS setup (static export)
- `@tailwindcss/typography` plugin installed and configured with serif prose font
- `next-themes`, `gray-matter`, `next-mdx-remote` installed
- `src/types/index.ts`: Post, WorkEntry interfaces
- `src/lib/posts.ts`: getAllPosts(), getFeaturedPosts(), getPostBySlug()
- 6 MDX files in `content/posts/` with correct frontmatter (3 featured, all published)
- `src/lib/cn.ts`: linkClass constant for universal link styling

**Ship gate:**
- [ ] `tsc --noEmit` zero errors
- [ ] `getAllPosts()` returns 6 posts sorted newest first
- [ ] `getFeaturedPosts()` returns exactly 3 posts
- [ ] `getPostBySlug('react-server-components')` returns post + content
- [ ] Unpublished post (published: false) excluded from all lists

---

## Phase 1 — Layout Shell (Day 1 afternoon)

**Deliverables:**
- `ThemeToggle.tsx` ('use client', mounted check, text-only "[Dark]"/"[Light]")
- `Nav.tsx` (sticky, border-b, backdrop-blur, name left, Blog/Work/Toggle right)
- `layout.tsx` (ThemeProvider + html suppressHydrationWarning + Nav + main + metadata)
- `globals.css` (Tailwind directives, system font on body, antialiased)
- `next.config.ts` (output: 'export')
- `tailwind.config.ts` (darkMode: 'class', Typography plugin, prose customisation)
- SkipNav as first DOM element in layout

**Ship gate:**
- [ ] Dark mode toggle works — no flash on reload
- [ ] System preference honoured on first load
- [ ] Nav sticky and visible on all pages
- [ ] `backdrop-blur` visible when scrolling past content
- [ ] SkipNav appears on Tab press

---

## Phase 2 — Blog System (Day 2)

**Deliverables:**
- `PostList.tsx` (ul of linked post titles, universal link style)
- `Prose.tsx` (prose prose-neutral dark:prose-invert wrapper)
- `/blog/page.tsx` (h1 "Writing" + PostList of all posts)
- `/blog/[slug]/page.tsx` (generateStaticParams + MDXRemote + Prose)
- `generateMetadata` for each post page (title + summary as description + OG)

**Ship gate:**
- [ ] Blog list shows 6 post titles — no dates, no descriptions, no images
- [ ] Each title links to `/blog/[slug]`
- [ ] All 6 slugs render their MDX content
- [ ] Prose renders in serif font (Stix Two Text / Georgia)
- [ ] Date shows on post page in `text-sm text-neutral-500`
- [ ] OG title and description correct per post
- [ ] Unknown slug returns 404

---

## Phase 3 — Homepage + Work (Day 2 afternoon)

**Deliverables:**
- `SocialRow.tsx` (inline text links with · separator)
- `/page.tsx` (name + bio + "Writing" section with featured posts + social row)
- `/work/page.tsx` (h1 "Work" + WorkEntry data as prose paragraphs)
- Work data as a constant in work page (no separate data file needed)

**Ship gate:**
- [ ] Homepage renders name, bio, 3 featured post titles, social links
- [ ] Featured posts are title-only links (no dates, no excerpts)
- [ ] Social links open in new tab with noopener
- [ ] Work page renders as prose — no timeline, no logos

---

## Phase 4 — Polish & Launch (Day 3)

**Deliverables:**
- Heading hierarchy audit: one `<h1>` per page
- Focus ring confirmation: `focus-visible:outline` on all interactive elements
- Root metadata in `layout.tsx`: title, description, og:image
- `/public/og-image.png` (1200×630 placeholder)
- `tsc --noEmit` zero errors
- `npm run build` zero errors + all 6 post slugs in `/out/blog/`

**Ship gate (launch):**
- [ ] Lighthouse performance ≥ 95 on homepage
- [ ] Lighthouse accessibility ≥ 95 on all pages
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all 6 posts in `/out/blog/`
- [ ] No font files in Network tab (system fonts only)
- [ ] No flash of incorrect theme on reload
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Blog list: dates NOT shown, titles only
- [ ] Every link uses the universal underline style

---

## Cut Order

**Never cut:**
- Dark mode (the audience — engineers — cares deeply)
- MDX pipeline (writing requires MDX for code blocks)
- Universal link style (the single most important design decision)
- Single-column layout (the anti-grid is the identity)
- System fonts (no FOUT is a hard requirement)

**Cut first:**
- Work page (redirect /work to homepage bio if time is short)
- SocialRow component (inline the links directly)
- Prose component abstraction (apply classes directly in post page)
- Typography plugin customisation for serif (use default prose)

**Cut last:**
- PostList component (always needed)
- ThemeToggle (always needed — dark mode is a requirement)
- Static generation (always needed for performance)

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Hydration mismatch on ThemeToggle | High | Medium | `mounted` guard + `suppressHydrationWarning` on `<html>` — both required |
| `MDXRemote` imported from wrong package | High | High | App Router requires `next-mdx-remote/rsc`, NOT `next-mdx-remote` — different API |
| `published: false` post appears in production | Low | Medium | `getAllPosts()` filters on `published` — verify in build output |
| System font renders differently across OS | Low | Low | Acceptable — `Arial` on Windows vs `San Francisco` on Mac; layout is unaffected |
| Blog index shows dates | Low | Low | The design intentionally omits dates — `PostList` renders titles only |
| Prose dark mode missing | Medium | Medium | `dark:prose-invert` class required on Prose wrapper — forgot → white text on white bg in dark mode |

---

## Testing Strategy

| Phase | Test | Method |
|-------|------|--------|
| 0 | `getAllPosts()` returns 6 posts sorted by date | Node.js `ts-node src/lib/posts.ts` or test |
| 0 | `published: false` post excluded | Add one unpublished post, verify not in `getAllPosts()` result |
| 1 | Dark mode toggle works | Click toggle + hard refresh |
| 1 | No hydration mismatch | Browser console: zero React hydration errors |
| 2 | Blog list shows 6 titles, no dates | Manual inspection |
| 2 | All 6 slugs render MDX content | Navigate to each |
| 2 | Unknown slug → 404 | Navigate to `/blog/nonexistent` |
| 2 | Per-post OG metadata | Inspect `<head>` for each post |
| 3 | Homepage: featured posts only (3 of 6) | Count items on homepage |
| 3 | Work page: prose paragraphs (no timeline/bullets) | Visual inspection |
| 4 | Lighthouse ≥ 95 | Lighthouse CLI on homepage |
| 4 | All links: consistent underline style | Manual tab through |
| 4 | System fonts only | Network tab — zero font file requests |

---

## Definition of Done

**Phase 0 done when:**
- `getAllPosts()` returns 6 sorted posts (verified in terminal)
- `published: false` test post excluded
- TypeScript types match actual frontmatter schema

**Phase 1 done when:**
- Dark mode toggle works without flash or hydration error
- System preference applied on first visit

**Phase 2 done when:**
- 6 posts listed on `/blog` — titles only, no dates
- All 6 slugs render MDX
- Unknown slug returns 404

**Phase 3 done when:**
- Homepage: name + bio + 3 featured post titles + social links
- Work: prose text (no bullets, no timeline, no logos)

**Phase 4 (launch) done when:**
- Lighthouse ≥ 95 performance + ≥ 95 accessibility
- `tsc --noEmit` clean
- All 6 blog post slugs in `/out/blog/`
- All links use consistent underline style
