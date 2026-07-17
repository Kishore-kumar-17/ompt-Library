# 01 — Product Requirements Document
## Editorial Grid Portfolio · portfolio_platform_02

---

### 1. Product Vision

A personal portfolio for a designer who also writes code — or a developer who also thinks about design. The site is a living proof of craft: the CSS Grid layout, the fluid typography, the photo treatment, and the vertical navigation all demonstrate technical and aesthetic skill before any content is read. The design language is Modernist: three colours, geometric precision, no decoration.

**Success metric:** A recruiter or collaborator can identify the creator's role, see their body of work, and find a contact method within 30 seconds of arriving — without scrolling on desktop.

---

### 2. Personas

**Primary: Design-curious recruiter / hiring manager**
- Reviewing portfolios from a link on LinkedIn, GitHub, or a job application
- Has 20–30 seconds before deciding to read further
- Impression formed by the grid layout before any text is read
- Needs: name, role, 2–3 project examples, contact method

**Secondary: Fellow designer-developer / conference peer**
- Arrives to verify credentials before a talk, workshop, or collaboration
- Wants: depth of work (talks list, experiments), links to actual demos
- Appreciates the CSS implementation itself as a signal

**Tertiary: Someone reading about CSS / web design**
- Arrives from a blog post, tweet, or YouTube mention
- Expects: authoritative voice, accessible content, clear identity
- May arrive on mobile — responsive fallback is critical

---

### 3. Core Features

**3.1 Hero Grid Layout**
- Asymmetric CSS Grid (7 columns × 5 rows on desktop)
- Creator name/title as typographic grid element (spans multiple cells)
- Vertical navigation sidebar (`writing-mode: vertical-rl`)
- Red accent structural border element
- Photo with `opacity: 0.5` + `mix-blend-mode: multiply`

**3.2 Content Sections**
- **Bio:** 2–3 paragraph professional bio, current role + affiliation
- **Talks:** List of conference talks/presentations with title, event, year, video link
- **Experiments/Labs:** CSS experiments, demos, side projects with live links
- **Writing:** External articles, publications (optional — include if there's content)
- **Contact:** Email, GitHub, LinkedIn, optional social

**3.3 Navigation**
- Desktop: vertical sidebar, `writing-mode: vertical-rl`, weight 800 uppercase links
- Mobile: horizontal row of links below name
- Skip-nav at page top for keyboard/assistive technology users

**3.4 Typography as Layout**
- Creator name is not just a heading — it occupies a grid zone as a visual block
- Font size is fluid: `calc(1.6rem + 1.6vw)`
- All headings: uppercase, letter-spacing 0.04em
- All links: weight 800, uppercase — they are labels, not inline text

---

### 4. User Journeys

**Journey 1 — Desktop hire-path (30 seconds):**
Land → see name + role in grid hero → read bio in right panel → scan talks list → click one video link → find contact email → done.

**Journey 2 — Mobile read:**
Land → name centered → horizontal nav → bio → scroll to talks → tap video link → scroll to contact → tap email.

**Journey 3 — Fellow developer:**
Arrive → notice grid layout is hand-crafted → inspect element in DevTools to verify CSS Grid → check experiments section → follow GitHub link.

**Journey 4 — Accessibility path:**
Skip-nav → jump to `<main>` → screen reader announces `<h1>` name → reads bio, talks list, contact → all links have descriptive text.

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | CMS or admin interface | Static `content.ts` sufficient |
| NG2 | Comment system | Not a blog |
| NG3 | Dark mode toggle | Auto via `prefers-color-scheme` only |
| NG4 | Animation-heavy UI | Restraint is the aesthetic |
| NG5 | Search functionality | Not enough content to warrant it |
| NG6 | Multi-page SPA with routing | Single page or simple multi-page static |

---

### 6. Constraints

- No component libraries (Radix, shadcn, Material, etc.) — HTML + CSS only
- No border-radius on any element — strict Modernist geometry
- No web fonts — system font stack loads instantly; no FOUT
- No JavaScript for layout calculations or animations — CSS only
- External links must open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Photo must use `mix-blend-mode: multiply` — removes white background, integrates with beige
- Skip-nav link required at page top
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<section>`, `<article>`, `<footer>`

---

### 7. Acceptance Criteria

- [ ] Grid layout renders correctly with named areas at ≥ 900px viewport
- [ ] Below 900px: collapses to single-column; nav becomes horizontal
- [ ] Creator name occupies its grid area as a visual typographic block
- [ ] Vertical nav renders with `writing-mode: vertical-rl` on desktop
- [ ] Photo renders with `opacity: 0.5` and `mix-blend-mode: multiply`
- [ ] Red accent structural element visible in layout
- [ ] All 4 content sections present: Bio, Talks, Experiments, Contact
- [ ] All external links: weight 800, uppercase, `target="_blank"`, coral hover
- [ ] Zero border-radius on any element (verify with browser inspector)
- [ ] No web fonts loading (verify in Network tab — no font files)
- [ ] Skip-nav link at page top, functional
- [ ] Keyboard: all links reachable via Tab key; focus rings visible
- [ ] Screen reader: heading hierarchy logical (`h1` name → `h2` sections)

---

### 8. Content Specification

**Bio section:**
- 2–3 paragraphs
- Current role: title + organisation/affiliation
- Area of focus/expertise
- Link to CSS Working Group or relevant body (if applicable)

**Talks section (4–10 items):**
Each: talk title, conference name, year, link to video or slides

**Experiments section (3–8 items):**
Each: project name, one-line description, link to live demo or source

**Writing section (optional, 3–6 items):**
Each: article title, publication name, year, URL

**Contact:**
- Email (plain text — no obfuscation required for this persona; or use mailto:)
- GitHub profile URL
- LinkedIn URL
- Mastodon or other social (optional)

---

### 9. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| Photo file missing from `public/` | `next/image` throws build error — must catch before deploy; use a placeholder photo during dev |
| `mix-blend-mode` not supported (old browser) | Photo renders at `opacity: 0.5` with normal blending — acceptable degradation |
| `writing-mode` not respected (very old browser) | Nav renders horizontal — still functional, just not vertical |
| No talks data (empty array) | `TalksSection` renders heading with empty `<ul>` — acceptable; hide component if `talks.length === 0` |
| No articles data | `WritingSection` hidden (`articles.length === 0` → do not render) |
| Very long creator name | `--size-display: calc(1.6rem + 1.6vw)` may overflow grid area — test with names longer than 10 characters; adjust `line-height: 0.95` and `font-size` clamp if needed |
| Mobile: grid inspected as `display: block` | Expected — mobile is intentionally block layout; not a bug |

---

### 10. Design Constraint Rationale

These constraints are non-negotiable and exist for clear design reasons — not personal preference:

| Constraint | Reason |
|-----------|--------|
| Zero `border-radius` | Modernist geometry — curved edges are decoration; this design has none |
| No web fonts | The portfolio is about CSS mastery; instant system font load is itself a signal |
| Three colours only | Swiss International Style restraint — more colours = less conviction |
| No JS for layout | CSS Grid is sufficient; using JS for layout would undermine the premise |
| `writing-mode` nav (not `transform: rotate`) | Correct CSS technique; rotation via `transform` is a hack that breaks layout flow |
| `mix-blend-mode` (not a filter) | Blend modes interact with the background; filters are self-contained — wrong tool |

An AI generating this codebase should understand these reasons so it does not "improve" the code by adding border-radius, a Google Font, or a `transform: rotate(-90deg)` shortcut.
