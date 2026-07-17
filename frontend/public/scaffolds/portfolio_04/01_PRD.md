# 01 — Product Requirements Document
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## 1. Product Vision

A portfolio site that functions as a curated monograph of built work. The site must communicate the studio's depth — 20+ years of award-winning practice in architecture and interiors — without decorative noise. Photography does the communicating. The UI steps aside.

---

## 2. User Personas

### Persona A — Rajesh, Corporate Real Estate Director (Primary Client)
- **Who:** Head of real estate for a pan-India financial services firm planning a new HQ in Mumbai
- **Goal:** Evaluate if this studio understands large-scale corporate architecture with cultural sensitivity
- **Behaviour:** Arrives via a Dezeen article or a colleague's referral. Views architecture projects, specifically corporate and institutional. Reads the approach text. Downloads nothing — books a call.
- **Key pain point:** Most architecture sites either hide the project process or bury the contact info under 4 clicks
- **Success:** Finds 2–3 relevant corporate/institutional projects within 60 seconds. Reads approach text. Clicks the contact email

### Persona B — Ananya, Boutique Hotel Owner (Primary Client)
- **Who:** Owns a boutique heritage property in Jaipur considering a full redesign
- **Goal:** Find a studio that understands Indian spatial vocabulary, local materials, and hospitality
- **Behaviour:** Arrives via Instagram → site. Goes directly to hospitality projects. Cares deeply about craft and material detailing. Shares the site with her business partner.
- **Key pain point:** Generic hospitality design that imports Western aesthetics. Wants evidence of genuine vernacular understanding.
- **Success:** Finds the hospitality projects, reads materials and approach, uses the share URL

### Persona C — Vikram, Architecture Journalist (Media)
- **Who:** Architecture editor at a design publication planning a feature on Indian studios
- **Goal:** Find high-resolution images, project facts (area, year, location), and a studio overview for press use
- **Behaviour:** Accesses /about for press credentials, /work for project image quality. Needs press contact separate from general inquiries.
- **Success:** Finds press coverage list, awards, founding year, principals' names, and a press contact email

### Persona D — Priya, Architecture Graduate (Talent)
- **Who:** Final-year student at SPA Delhi considering applying to the studio
- **Goal:** Understand the studio's design sensibility and what kind of work they do across disciplines
- **Behaviour:** Browses the full work archive. Reads all project approach texts. Checks the team page for culture signals. Looks for a careers link.
- **Success:** Browses 6+ projects, reads the studio statement on /about, finds a careers email or link

---

## 3. Functional Requirements

### FR-001: Project browsing
- User can view all projects in a grid (default: all disciplines)
- User can filter by discipline (Architecture / Interiors / Adaptive Reuse)
- When a discipline is selected, a second row of category pills appears for sub-filtering
- Filtering is instant, client-side, animated (Framer Motion AnimatePresence)
- "All" option resets sub-category filter and shows all projects in that discipline

### FR-002: Project detail
- Every project has a dedicated URL (`/work/[slug]`) pre-generated at build time
- Page: full-viewport hero image → synopsis → approach → image gallery → materials → next project CTA
- Unknown slug shows Next.js 404 (via `notFound()`)

### FR-003: Two-level discipline filter
- Discipline tabs (row 1): Architecture / Interiors / Adaptive Reuse / All
- Category pills (row 2): appear only when a specific discipline is selected; list changes per discipline
- Active discipline tab: underline in `--color-accent` (#C4501A)
- Active category pill: filled `--color` background
- Adaptive Reuse has no sub-categories (discipline IS the filter)

### FR-004: Navigation
- Sticky nav visible on all pages
- On the homepage: nav background is transparent over the hero image; transitions to `--color-bg` after 60px scroll
- On all other pages: nav background is always `--color-bg`
- Logo left (studio name), discipline links center, About + Contact right
- Active route: subtle indicator (opacity 1 vs 0.5 on inactive)

### FR-005: Project card hover
- Hovering a project card reveals a caption that slides up from the image bottom
- Caption contains: project title (weight 500) + location + year
- Behind the caption: gradient overlay (transparent → rgba(26,26,26,0.7))
- Hover caption does NOT scale the image — ever

### FR-006: About page
- Studio statement: dark section, display-size text, ≤ 20 words
- Founding story: two-column text block
- Press section: publications listed (text-only — no logos), grayscale/muted treatment
- Awards list: year / award name / project name in three columns with border-top dividers
- Team grid: name (weight 500) + role, arranged in columns by discipline

### FR-007: Contact page
- Studio address block
- Two email addresses: general enquiries + new business (both as `mailto:` links, weight 500, uppercase)
- Social links: Instagram, LinkedIn — open new tab with `rel="noopener noreferrer"`

### FR-008: Accessibility
- SkipNav as first DOM element
- All images: descriptive `alt` text
- All interactive elements keyboard-reachable
- Focus rings: `outline: 2px solid var(--color-accent); outline-offset: 2px`
- FilterBar discipline tabs: `aria-selected` state
- FilterBar category pills: `aria-pressed` state
- Heading hierarchy: one `<h1>` per page

### FR-009: Performance
- All project images via `next/image` with correct `sizes` attribute
- Hero images: `priority` flag
- First 3 WorkCards on /work: `priority` flag
- No web font requests (system stack)
- Lighthouse performance ≥ 90 on /work

### FR-010: Reduced motion
- `prefers-reduced-motion: reduce` — all transitions instant (0.01ms)
- Caption slide-up still works but without animation — caption is always visible
- Scroll reveals: elements appear immediately without translateY animation

---

## 4. Acceptance Criteria

### Project card hover
- [ ] Caption is not visible by default (translateY: 100%)
- [ ] Caption slides into view on hover (translateY: 0), transition 0.4s var(--ease)
- [ ] Caption shows title + location + year
- [ ] Image does NOT scale on hover
- [ ] Keyboard focus on the card link triggers the same visible state (focus-visible)

### Two-level filter
- [ ] Discipline tabs row is always visible on /work
- [ ] Category pills row only appears when a non-"All" discipline is selected
- [ ] Selecting "Architecture" shows pills: Hospitality / Institutional / Corporate / Culture / Mixed Use / Homes
- [ ] Selecting "Interiors" shows pills: Retail / Workplace / Leisure / Homes / Hotels / F&B / Brand Experiences
- [ ] Selecting "Adaptive Reuse" shows no category pills (discipline IS the filter)
- [ ] Selecting any category pill within Architecture filters to that category only
- [ ] Switching disciplines resets category pill selection to "All" for that discipline
- [ ] Grid animates on filter change (Framer Motion AnimatePresence exit/enter)

### Nav scroll behaviour
- [ ] On homepage, nav has no background colour on initial load (transparent)
- [ ] After scrolling 60px, nav background transitions to `--color-bg`
- [ ] On /work, /about, /contact: nav always shows `--color-bg` (no transparent mode)

### Next project wrap
- [ ] Last project's CTA links to the first project (index wrap)
- [ ] First project's CTA links to the second project
- [ ] Dark theme applies to NextProject section

### Static generation
- [ ] `npm run build` pre-renders all project slugs
- [ ] Unknown slug at /work/nonexistent returns 404
- [ ] tsc --noEmit produces zero errors

---

## 5. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| Discipline has 0 projects | ProjectGrid shows empty state: "No projects in this category" — do not show blank grid |
| Adaptive Reuse category pills appear | Bug — `categories` array must be `[]` for adaptive-reuse; rendered via `{categories.length > 0 && <CategoryRow>}` |
| User sets Architecture + Institutional, then switches to Interiors | Category resets to 'all'; Interiors grid shows all interiors projects |
| Last project's NextProject CTA | Wraps to first project: `(index + 1) % projects.length` |
| First project's NextProject CTA | Shows second project — no special case needed |
| Project with no `materials` array | MaterialsList not rendered — `{project.materials?.length > 0 && <MaterialsList>}` |
| Project with no `awards` | AwardsSection on project detail page not rendered |
| Hero image missing from `public/` | `next/image` throws build error — placeholder during development |
| `100svh` vs `100vh` on mobile | Use `100svh` (small viewport height) — avoids collapse from mobile browser chrome. Fallback: `100vh` for older browsers |
| Homepage nav transparent but user arrives mid-scroll | `useScrolled` initialises with `window.scrollY > threshold` on mount — handles reload-at-scroll |

---

## 6. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| Caption slide-up (not image scale) | Architecture photography is precision work — scaling the image treats it like a product thumbnail |
| No images in press section | Press logos are branding for the publications, not the studio; text conveys the same credibility with less visual noise |
| Font weights 300 and 500 only | Helvetica Neue (the system fallback) at these two weights is the design intention — 400/700 breaks the refined thinness |
| `--color-accent` (#C4501A) on active tab underline ONLY | Terracotta is rare — it signals "selected state" precisely because it appears nowhere else |
| `border-radius: 0` everywhere | Editorial aesthetic — rounded corners read as consumer app UI, incompatible with architecture monograph |
| `data-theme` on sections (not JS toggle) | CSS custom property inheritance handles theming at zero JavaScript cost; the StudioStatement is always dark regardless of any global state |
| System fonts | The practice is 20+ years old — the site must feel authoritative, not web-trendy. System fonts convey maturity. |
| Caption always visible under reduced motion | Content cannot be hidden behind an animation for accessibility users — the caption information (title, location, year) is always required |
