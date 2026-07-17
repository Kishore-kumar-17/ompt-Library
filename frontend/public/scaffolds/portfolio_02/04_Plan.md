# 04 — Build Plan
## Editorial Grid Portfolio · portfolio_platform_02

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 day | Project setup, tokens, types, content data |
| 1 | Grid Shell | 1 day | CSS Grid layout, named areas, responsive breakpoint |
| 2 | Hero Elements | 1 day | Name block, vertical nav, accent box, photo |
| 3 | Content Sections | 1 day | Bio, Talks, Experiments, Contact |
| 4 | Polish & Launch | 1 day | Accessibility, OG meta, dark mode, deploy |

**Total: 5 days**

---

### Phase 0 — Foundation (Day 1)

**Deliverables:**
- Next.js 14 + TypeScript project (no Tailwind — CSS Modules)
- `globals.css`: CSS custom properties, reset (`border-radius: 0` on `*`), base styles
- System font stack declared in `:root`
- `src/types/index.ts`: all content interfaces
- `src/data/content.ts`: sample content (owner, talks, experiments, contact)
- Skip-nav component

**Ship gate:**
- [ ] `tsc --noEmit` zero errors
- [ ] Browser inspector confirms zero `border-radius` values on any element
- [ ] No font network requests in Network tab

---

### Phase 1 — Grid Shell (Day 2)

**Deliverables:**
- `PageGrid.tsx` + `PageGrid.module.css`: 7col × 5row grid with named classes
- Correct z-index layering (accent:0, photo:1, rest:2)
- Responsive: collapses to single block layout below 900px
- All grid areas render placeholder divs in correct positions

**Ship gate:**
- [ ] Grid areas in correct positions on desktop (verify with browser grid inspector)
- [ ] Below 900px: block layout with no overlapping elements
- [ ] Named grid area classes present and targeting correct columns/rows

---

### Phase 2 — Hero Elements (Day 3)

**Deliverables:**
- `NameBlock.tsx`: display-size name spanning grid area, uppercase, weight 800
- `SideNav.tsx`: `writing-mode: vertical-rl`, weight 800 uppercase links, coral hover
- `AccentBox.tsx`: red border box, positioned behind photo and nav
- `HeroPhoto.tsx`: `next/image`, `opacity: 0.5`, `mix-blend-mode: multiply`
- Mobile: nav horizontal, name centered, accent box hidden, photo max-height 280px

**Ship gate:**
- [ ] Photo renders with visible blend mode effect (integrates with beige background)
- [ ] Nav text is vertical on desktop, horizontal on mobile
- [ ] Red border box visible framing nav + photo zone
- [ ] Name block at `calc(1.6rem + 1.6vw)` — verify at multiple viewport widths

---

### Phase 3 — Content Sections (Day 4)

**Deliverables:**
- `BioSection.tsx`: bio paragraphs from `content.owner.bio`, role + affiliation
- `TalksSection.tsx`: list of talks — title (uppercase link to video), event, year (muted)
- `ExperimentsSection.tsx`: list of experiments — name (link), one-line description
- `WritingSection.tsx`: optional — articles list
- `ContactSection.tsx`: email + GitHub + LinkedIn + social, all uppercase weight 800
- All section headings: uppercase, weight 800, black underline rule below

**Ship gate:**
- [ ] All content renders from `content.ts` (no hardcoded strings in JSX)
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`, weight 800
- [ ] Talks list: talk title is a link; year is muted; event name is readable
- [ ] Contact email is clickable `mailto:` link

---

### Phase 4 — Polish & Launch (Day 5)

**Deliverables:**
- Open Graph meta in `layout.tsx`
- Dark mode: `@media (prefers-color-scheme: dark)` in globals.css
- Skip-nav: functional, visible on focus
- Accessibility audit: heading hierarchy, alt text, focus rings on all links
- Tab order logical (skip-nav → name → nav → content links)
- `tsc --noEmit` passes
- Deploy to Vercel

**Ship gate (launch):**
- [ ] Lighthouse accessibility ≥ 90 on desktop
- [ ] Lighthouse accessibility ≥ 90 on mobile
- [ ] Zero `border-radius` values anywhere (browser inspector check)
- [ ] No font files in Network tab (system fonts only)
- [ ] All 4 content sections present and linked
- [ ] Dark mode activates correctly on system preference change

---

### Cut Order

**Never cut:**
- CSS Grid layout (the entire design depends on it)
- Photo blend mode treatment
- Vertical navigation
- All 4 content sections (Bio, Talks, Experiments, Contact)
- Skip-nav

**Cut first if time-constrained:**
- Writing section (if no articles content)
- Dark mode
- Open Graph image (use text OG tag instead)
- Footer area (fold into contact section)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `mix-blend-mode` invisible in dark mode | High | High | Switch to `screen` mode in dark media query; test on macOS dark mode before deploy |
| `writing-mode: vertical-rl` breaks on Firefox | Low | Medium | Test on Firefox 115+; `text-orientation: mixed` is supported — verify |
| UI library auto-adding `border-radius` | Medium | High | No UI libraries allowed — use plain HTML + CSS Modules only |
| `next/image` adds wrapper `<span>` breaking grid | Medium | High | Use `fill` mode with explicit `position: relative` on the wrapper; or use `width/height` mode with `object-fit: cover` |
| System font looks different on Windows vs Mac | Low | Medium | Arial on Windows is acceptable; test grid layout on Windows Chrome if possible |
| Grid overlap causes focus order confusion | Low | Medium | Ensure tab order matches visual reading order via DOM source order |
| Static export breaks `next/image` optimisation | Medium | Low | Add `images: { unoptimized: true }` in `next.config.ts` for static export; Vercel handles this automatically |

---

### Testing Strategy

| Phase | Test | Tool |
|-------|------|------|
| 0 | `tsc --noEmit` zero errors | CLI |
| 0 | `grep -r "border-radius:" src/` → returns only the reset | Bash |
| 0 | Network tab: no `.woff`, `.woff2`, `.ttf` files loaded | DevTools |
| 1 | Grid inspector: all 6 areas in correct column/row positions | Chrome DevTools |
| 1 | Resize to 899px: block layout, no overlapping elements | DevTools responsive |
| 2 | Photo: Computed styles → `mix-blend-mode: multiply` on desktop | DevTools |
| 2 | Nav: Computed styles → `writing-mode: vertical-rl` on desktop | DevTools |
| 2 | Accent box: `z-index: 0` in computed styles | DevTools |
| 3 | All content from `content.ts`: no hardcoded strings in JSX | Code review |
| 3 | All external links: `rel="noopener noreferrer"` in DOM | DevTools Elements |
| 4 | Lighthouse accessibility ≥ 90 | Lighthouse CLI |
| 4 | Tab order: skip-nav → nav → bio → talks → experiments → contact | Manual keyboard test |
| 4 | Dark mode: enable system dark mode → palette switches | macOS System Preferences |
| 4 | OG preview: paste URL into LinkedIn post inspector | LinkedIn preview tool |

---

### Definition of Done (per Phase)

**Phase 0 done when:**
- [ ] `tsc --noEmit` zero errors
- [ ] `*.module.css` contains `border-radius: 0` reset confirmed
- [ ] `content.ts` all content typed correctly
- [ ] No `@import` or web font `<link>` anywhere in the project

**Phase 1 done when:**
- [ ] 6 grid areas render with correct column/row placements
- [ ] Chrome grid inspector shows named grid lines
- [ ] At 900px viewport: layout collapses to block with no overlapping

**Phase 2 done when:**
- [ ] `mix-blend-mode: multiply` visible on desktop (photo integrates with beige background)
- [ ] Nav text is vertical on desktop, horizontal below 900px
- [ ] Red border box visible framing the central grid zone
- [ ] Zero border-radius on any element confirmed

**Phase 3 done when:**
- [ ] All 4 sections render content from `content.ts` — no hardcoded strings
- [ ] Talks sorted newest-first
- [ ] All external links weight 800 uppercase with `target="_blank" rel="noopener noreferrer"`

**Phase 4 done when:**
- [ ] Lighthouse accessibility ≥ 90 on desktop
- [ ] Dark mode activates automatically; photo switches to `screen` blend mode
- [ ] OG meta verified in social preview tool
- [ ] `npm run build` succeeds; no TypeScript errors; deploys to Vercel

---

### Estimated File Count

| Phase | New Files |
|-------|-----------|
| 0 | `globals.css`, `layout.tsx`, `page.tsx`, `types/index.ts`, `data/content.ts` |
| 1 | `PageGrid/PageGrid.tsx`, `PageGrid/PageGrid.module.css` |
| 2 | `NameBlock/`, `SideNav/`, `AccentBox/`, `HeroPhoto/` (4 components × 2 files) |
| 3 | `BioSection/`, `TalksSection/`, `ExperimentsSection/`, `ContactSection/`, `WritingSection/` (5 × 2) |
| 4 | `SkipNav/SkipNav.tsx`, `public/og-image.png`, `next.config.ts` |

**Total: ~26 files**

---

### V2 Roadmap (Post-Launch)

**Features not in scope for V1:**
- **Talks filtering by year** — JavaScript toggle to show/hide by decade
- **Case studies** — individual project pages (requires Next.js dynamic routes)
- **Contact form** — Vercel Edge Function to send email (current V1 uses mailto:)
- **CV / Resume download** — `public/cv.pdf` link in contact section
- **RSS feed** — if writing section grows to 10+ articles
- **Interactive grid demo** — hover state on grid cells showing grid area names in DevTools style

**Upgrade path for content changes:**
- All content: edit `src/data/content.ts` only — no component files change
- Photo: replace `public/photo.jpg` — filename matches `owner.photoUrl`
- OG image: replace `public/og-image.png` (1200×630, keep the filename)
- New talk: add object to `talks[]` array — renders automatically, sorted by year
