# 05 — Epics and Stories
## Editorial Grid Portfolio · portfolio_platform_02

---

## Epic 1 — Foundation

### Stories

**STORY-001: Project setup**
As a developer, I need Next.js 14 + TypeScript + CSS Modules configured so that there is no Tailwind or UI library abstracting the CSS Grid work.

Acceptance criteria:
- `create-next-app` with `--no-tailwind --typescript --app --src-dir`
- CSS Modules configured and working
- `globals.css` has `*, *::before, *::after { border-radius: 0 }`
- `tsc --noEmit` passes with zero errors
- No font `@import` or `<link>` for web fonts anywhere

**STORY-002: CSS custom properties**
As a developer, I need all design tokens in CSS custom properties so that there is one source of truth for colors, fonts, and spacing.

Acceptance criteria:
- `--bg: #E4E4D5`, `--accent: #D55349`, `--text: #000000`, `--text-muted: rgba(0,0,0,0.5)`
- Font stack: `'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif`
- All spacing tokens: `--space-xs` through `--space-xl`
- All typography tokens: `--size-display` through `--size-caption`
- Weight tokens: `--weight-body: 400`, `--weight-strong: 800`

**STORY-003: TypeScript content types**
As a developer, I need typed interfaces for all content so that `content.ts` is safe to update without breaking the build.

Acceptance criteria:
- `src/types/index.ts` exports: `Owner`, `Talk`, `Experiment`, `Article`, `Contact`
- All fields correctly typed (no `any`)
- `bio` field on `Owner` is `string[]` (array of paragraphs)

**STORY-004: Content data file**
As a developer, I need all portfolio content in one file so that updating content never requires touching component code.

Acceptance criteria:
- `src/data/content.ts` exports: `owner`, `talks`, `experiments`, `articles`, `contact`
- Sample data: at least 3 talks, 3 experiments, 1 bio paragraph, 1 contact method
- All data conforms to types from `src/types/index.ts`
- Build passes with the sample data

---

## Epic 2 — Grid Shell

### Stories

**STORY-005: CSS Grid layout wrapper**
As a designer-developer, I want the page to use an asymmetric 7-column CSS Grid so that the layout itself demonstrates advanced CSS knowledge.

Acceptance criteria:
- `PageGrid.module.css`: `grid-template-columns: repeat(7, 1fr)`, `grid-template-rows: repeat(5, auto)`
- Named grid area classes: `.nameArea`, `.navArea`, `.accentArea`, `.photoArea`, `.contentArea`, `.footerArea`
- Correct column/row placements (from 03_Design.md § CSS Grid)
- z-index layering: accentArea 0, photoArea 1, all other areas 2
- Grid visible in browser DevTools grid inspector

**STORY-006: Responsive breakpoint**
As a mobile visitor, I want the page to collapse to a single-column layout below 900px so that all content is readable on my phone.

Acceptance criteria:
- `@media (max-width: 900px)`: `.page-grid { display: block }`
- All sections stack vertically in source order
- No overlapping elements on any mobile viewport
- AccentBox hidden on mobile (`display: none`)
- Photo constrained to `max-height: 280px` on mobile

---

## Epic 3 — Hero Elements

### Stories

**STORY-007: Name block**
As a visitor, I want to see the creator's name as a dominant typographic element occupying the left zone of the grid so that the design immediately communicates identity.

Acceptance criteria:
- Name renders at `var(--size-display)` = `calc(1.6rem + 1.6vw)` — verify at 1200px and 900px widths
- Font weight 800, uppercase, letter-spacing 0.04em
- First name in `var(--text)` black; last name in `var(--accent)` coral
- Role/tagline below in `var(--text-muted)`, weight 800, smaller size
- Occupies grid columns 1–4, rows 1–6 (fills the left zone)
- On mobile: centered, font-size uses `clamp(2.5rem, 8vw, 4rem)`

**STORY-008: Vertical navigation**
As a visitor, I want to see navigation links running vertically in the sidebar so that the layout uses writing-mode as a design element.

Acceptance criteria:
- `writing-mode: vertical-rl; text-orientation: mixed` on desktop
- Links: Avenir Next 800, 0.85rem, uppercase, letter-spacing 0.08em
- Default colour: `var(--text)` black
- Hover: `var(--accent)` coral, 120ms transition
- Focus: `outline: 2px solid var(--accent)`, `outline-offset: 2px`
- On mobile: `writing-mode: horizontal-tb`, links in a flex row

**STORY-009: Red accent border box**
As a visitor, I want to see a red geometric border framing the central grid zone so that the layout has a strong structural anchor.

Acceptance criteria:
- `border: 3px solid var(--accent)` (no background fill)
- Occupies grid columns 3–6, rows 1–6 (same vertical span as full grid)
- z-index: 0 — behind photo and nav
- `pointer-events: none` — purely visual
- Hidden on mobile (`display: none`)

**STORY-010: Hero photo with blend mode**
As a visitor, I want to see a photograph integrated into the warm beige background so that it feels like an editorial magazine photo, not a headshot pasted on a webpage.

Acceptance criteria:
- `next/image` with explicit `width` and `height`
- `opacity: 0.5` on the `<img>` element
- `mix-blend-mode: multiply` on the `<img>` element
- Photo wrapper has no opaque background (must be transparent for blend to work)
- Hover: `opacity: 0.65`, 200ms transition
- Photo alt text: descriptive (not "portrait photo")
- On mobile: `max-height: 280px`, `object-fit: cover`

---

## Epic 4 — Content Sections

### Stories

**STORY-011: Bio section**
As a recruiter, I want to read a clear professional bio so that I understand who this person is and what they do.

Acceptance criteria:
- Renders `owner.bio` array as multiple `<p>` elements
- Role + affiliation shown prominently (weight 800, uppercase)
- Section heading "About" in section heading style (uppercase, weight 800, black underline)
- Font size 1.1rem, line-height 1.65
- No truncation — full bio visible

**STORY-012: Talks section**
As a fellow developer, I want to see a list of conference talks so that I can verify the creator's public speaking history.

Acceptance criteria:
- Renders `talks` array sorted by year descending (newest first)
- Each talk: title (weight 800 link → `videoUrl`), event name (muted), year (muted, right-aligned)
- Links: `target="_blank" rel="noopener noreferrer"`, hover coral
- Divider between items: 1px `rgba(0,0,0,0.15)` rule
- Section heading "Talks" in section heading style

**STORY-013: Experiments section**
As a developer, I want to see a list of creative experiments so that I can verify the creator's technical curiosity.

Acceptance criteria:
- Renders `experiments` array
- Each experiment: name (weight 800 link → `url`), description (muted, weight 400)
- Same list/divider pattern as Talks
- Section heading "Experiments" or "Work"

**STORY-014: Contact section**
As a recruiter or collaborator, I want to find contact information easily so that I can reach out.

Acceptance criteria:
- Email: `<a href="mailto:...">` link, weight 800 uppercase
- GitHub + LinkedIn links, weight 800 uppercase
- All links: `target="_blank" rel="noopener noreferrer"` (except email)
- Coral hover on all links
- No contact form — just links

---

## Epic 5 — Accessibility & Polish

### Stories

**STORY-015: Skip navigation**
As a keyboard user, I want a skip-to-content link at the top of the page so that I can bypass the navigation and jump to main content.

Acceptance criteria:
- `<a href="#main-content">` as first focusable element in DOM
- Visually hidden by default (`top: -100%`)
- Visible when focused (`top: 0`)
- Background: `var(--text)` black, text: `var(--bg)` beige — high contrast
- `<main id="main-content">` exists on the page

**STORY-016: Heading hierarchy**
As a screen reader user, I want a logical heading hierarchy so that the page structure is navigable without visual context.

Acceptance criteria:
- Single `<h1>`: creator name
- `<h2>`: each content section heading (About, Talks, Experiments, Contact)
- No skipped heading levels
- Headings announced correctly in VoiceOver / NVDA

**STORY-017: Focus rings**
As a keyboard user, I want visible focus indicators on all interactive elements so that I know where I am when tabbing.

Acceptance criteria:
- All links: `focus-visible: outline: 2px solid var(--accent); outline-offset: 2px`
- Focus ring visible on both light and dark mode
- No `outline: none` anywhere (except when replaced with an equivalent visible indicator)
- Tab order: skip-nav → vertical nav links → bio links → talks links → experiments links → contact links

**STORY-018: Open Graph meta**
As a person sharing this portfolio link, I want a rich preview image and title so that the link looks professional when shared on social media.

Acceptance criteria:
- `og:title`, `og:description`, `og:image` (1200×630), `og:type: website`
- Twitter card: `summary_large_image`
- OG image: `/og-image.png` in `public/`
- Meta in `layout.tsx` via Next.js `metadata` export

**STORY-019: Dark mode**
As a visitor with system dark mode enabled, I want the portfolio to automatically switch to a dark palette so that it doesn't blind me.

Acceptance criteria:
- `@media (prefers-color-scheme: dark)`: `--bg: #1C1C1A`, `--text: #E4E4D5`, `--text-muted: rgba(228,228,213,0.5)`
- Accent `#D55349` unchanged
- Photo: `mix-blend-mode: screen; opacity: 0.6` in dark mode
- No dark mode toggle switch — automatic only

---

## Epic 6 — Testing & Quality Assurance

**Goal:** Verify every non-negotiable constraint: zero border-radius, no web fonts, correct blend mode, vertical nav, content from data file only.

### Stories

**STORY-020: Border-radius audit**
As a developer, I need to verify zero border-radius anywhere in the codebase so that the Modernist geometry constraint is maintained.

Acceptance criteria:
- `grep -r "border-radius" src/` returns ONLY the CSS reset line `border-radius: 0`
- No `rounded-*` Tailwind classes present anywhere (there is no Tailwind, but verify)
- Chrome DevTools: select any element → Computed styles → `border-radius: 0`
- Photo, buttons, links, wrappers: all zero border-radius
- Pass: `grep -r "border-radius" src/ | grep -v "border-radius: 0"` returns nothing

**STORY-021: Web font audit**
As a developer, I need to verify no web font loads so that the instant-render constraint is maintained.

Acceptance criteria:
- `grep -r "@import" src/` returns zero results
- `grep -r "fonts.googleapis" src/` returns zero results
- Network tab after load: zero requests with `.woff`, `.woff2`, or `.ttf` extensions
- `grep -r "next/font" src/` returns zero results (Next.js font optimisation is also excluded)

**STORY-022: Blend mode visual verification**
As a developer, I need to verify the photo renders with the correct blend mode so that the editorial integration effect works as designed.

Acceptance criteria:
- Chrome DevTools → select `<img>` in photo component → Computed styles → `mix-blend-mode: multiply` (light mode)
- Enable system dark mode → `mix-blend-mode: screen` and `opacity: 0.6`
- Photo must visually integrate with background (no white rectangle around subject)
- Photo wrapper: no `background-color` set (transparent to let page background show)
- Photo wrapper: no `isolation: isolate` (would block blend mode)

**STORY-023: Heading hierarchy verification**
As a developer, I need to verify the heading structure is correct for screen readers so that the accessibility constraint is met.

Acceptance criteria:
- Single `<h1>` on page: creator name
- `<h2>` elements: "About", "Talks", "Experiments", "Contact" (and "Writing" if present)
- No skipped heading levels (no `<h3>` without an `<h2>` parent context)
- VoiceOver rotor (macOS) → Headings: shows correct hierarchy
- `grep -r "<h1" src/` returns exactly 1 result

**STORY-024: Keyboard navigation path**
As a developer, I need to verify complete keyboard navigation so that the WCAG AA requirement is met.

Acceptance criteria:
- Tab order (DOM source order): skip-nav link → vertical nav links → bio content links → talks links → experiments links → contact links
- Skip-nav: visible when focused, jumps to `<main id="main-content">`
- Every link has visible focus ring: `outline: 2px solid var(--accent); outline-offset: 2px`
- No `tabindex=-1` on any navigable element
- No focus trap (user can tab out of any section)

---

## Story Cross-Reference

| Story | Epic | Phase | Component |
|-------|------|-------|-----------|
| STORY-001 | Foundation | Phase 0 | `globals.css`, project config |
| STORY-002 | Foundation | Phase 0 | `globals.css` |
| STORY-003 | Foundation | Phase 0 | `types/index.ts` |
| STORY-004 | Foundation | Phase 0 | `data/content.ts` |
| STORY-005 | Grid Shell | Phase 1 | `PageGrid/` |
| STORY-006 | Grid Shell | Phase 1 | `PageGrid/` |
| STORY-007 | Hero Elements | Phase 2 | `NameBlock/` |
| STORY-008 | Hero Elements | Phase 2 | `SideNav/` |
| STORY-009 | Hero Elements | Phase 2 | `AccentBox/` |
| STORY-010 | Hero Elements | Phase 2 | `HeroPhoto/` |
| STORY-011 | Content Sections | Phase 3 | `BioSection/` |
| STORY-012 | Content Sections | Phase 3 | `TalksSection/` |
| STORY-013 | Content Sections | Phase 3 | `ExperimentsSection/` |
| STORY-014 | Content Sections | Phase 3 | `ContactSection/` |
| STORY-015 | Accessibility | Phase 4 | `SkipNav/` |
| STORY-016 | Accessibility | Phase 4 | `page.tsx` |
| STORY-017 | Accessibility | Phase 4 | `globals.css` |
| STORY-018 | Accessibility | Phase 4 | `layout.tsx` |
| STORY-019 | Accessibility | Phase 4 | `globals.css` |
| STORY-020 | Testing & QA | Phase 4 | Audit |
| STORY-021 | Testing & QA | Phase 4 | Audit |
| STORY-022 | Testing & QA | Phase 4 | Audit |
| STORY-023 | Testing & QA | Phase 4 | Audit |
| STORY-024 | Testing & QA | Phase 4 | Audit |
