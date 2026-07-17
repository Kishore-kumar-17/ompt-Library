# 01 — Product Requirements Document
## Iconic Developer Portfolio · portfolio_platform_06

---

## 1. Product Vision

A portfolio that makes an engineering manager say "I need to talk to this person" within 30 seconds, and makes a fellow engineer say "this is the cleanest portfolio I've seen" within 10.

The site proves three things simultaneously:
1. The engineer writes clean, purposeful code (the portfolio IS the proof)
2. The engineer has done meaningful work at real companies (Experience section)
3. The engineer builds things beyond their day job (Projects section)

---

## 2. User Personas

### Persona A — Rohan, Engineering Manager at a Unicorn (Primary)
- **Who:** Engineering manager evaluating Staff Engineer candidates at a Series B+ startup
- **Goal:** Quickly determine: strong background? Can build? Clear communicator?
- **Behaviour:** Referred by a mutual. Lands on the portfolio. Reads the header (name + title + tagline — 5 seconds). Skims experience tabs (3 companies in 20 seconds). Clicks 1–2 GitHub links. Books a call.
- **Key pain point:** Most portfolios bury the work history inside an overwhelming visual design
- **Success:** Experience section answered all questions in under 60 seconds. Email or contact link clicked.

### Persona B — Priya, Senior Frontend Engineer (Community / Peer)
- **Who:** Senior engineer who saw the portfolio shared on X/Twitter
- **Goal:** See what someone else built, maybe get inspired
- **Behaviour:** Scrolls the whole page. Looks at project tech stacks. Inspects the source code (views source or opens DevTools). Notes the two-column layout. Shares it with a teammate.
- **Key pain point:** Portfolios that claim to be "pixel-perfect" but have layout bugs or inconsistent spacing
- **Success:** The experience is seamless. No jank. Scroll-spy works. Projects are real. Code is inspectable.

### Persona C — Neha, Technical Recruiter (Volume)
- **Who:** Recruiter at a FAANG-adjacent company sourcing candidates
- **Goal:** Confirm resume claims, find an email or LinkedIn link
- **Behaviour:** Lands from a resume link. Reads the tagline. Clicks the LinkedIn or GitHub. Does not read long text.
- **Success:** Header name + title + social links found instantly. Email link visible.

### Persona D — Arjun, CS Junior Aspiring (Inspiration)
- **Who:** Second-year CS student building their first portfolio
- **Goal:** Understand what a great portfolio looks like; use it as a reference
- **Behaviour:** Inspects every section. Reads about the tech stack in the footer. Views source to understand the layout.
- **Success:** Leaves with a clear model to build towards. Finds the GitHub source link if available.

---

## 3. Functional Requirements

### FR-001: Single-page structure
- All content on `/` — no routing to /about, /experience etc.
- Section IDs: `#about`, `#experience`, `#projects`
- All nav links use anchor href (`#about` etc.)
- Smooth scroll: `html { scroll-behavior: smooth }`

### FR-002: Two-column sticky layout (desktop)
- Left column: `lg:sticky lg:top-0 lg:h-screen` — does not scroll
- Right column: scrollable
- Mobile: single column, left panel content stacks above sections
- Breakpoint: `lg` (1024px)

### FR-003: Scroll-spy navigation
- `useActiveSection` hook observes section elements via IntersectionObserver
- `rootMargin: '-30% 0px -60% 0px'` — activates section when it occupies the middle band of the viewport
- Returns the id of the currently visible section
- Nav items update active styles in real time while scrolling

### FR-004: Left panel contents
- Name as `<h1>` (large, bold, off-white)
- Title/role as secondary text (lightest-slate)
- Tagline (slate, ≤ 15 words)
- Vertical nav list: About / Experience / Projects
- Active nav: line grows from w-8 to w-16 (off-white) + text-off-white font-medium
- Inactive nav: w-8 line (slate) + text-slate opacity-60
- Social icon links at bottom: GitHub, LinkedIn, CodePen, Instagram
- Social icons: text-lightest-slate, hover:text-teal

### FR-005: About section
- Section label: "01. About" (number in mono teal, word in lightest-slate)
- 2–3 bio paragraphs (text-slate, leading-relaxed)
- Skills/technologies grid: 2-column, each item preceded by ▹ in text-teal
- No progress bars, no percentage numbers, no radar charts

### FR-006: Experience section — tab switcher
- Section label: "02. Experience"
- Tab list: vertical list of company names
- Active tab: `border-l-2 border-teal text-teal bg-light-navy/50`
- Inactive tab: `border-l-2 border-transparent text-slate hover:text-teal hover:bg-light-navy/30`
- Tab content: job title + "@ Company" (company as teal link), date range in mono, bulleted achievements
- `useState` for active tab — NOT accordion, NOT timeline

### FR-007: Featured projects — alternating layout
- 3 featured projects
- Even-index (0, 2): image on left, content on right
- Odd-index (1): image on right, content on left
- Overline: "Featured Project" in font-mono text-xs text-teal
- Title: large, off-white, hover:text-teal
- Description: floated card with bg-light-navy, shadow
- Tech list: font-mono text-xs text-slate, flex row
- Links: GitHub icon + external link icon, off-white hover:teal

### FR-008: Notable projects grid
- 3 project cards in a 3-column grid below featured projects
- Card: bg-light-navy, hover:-translate-y-1 transition
- Header: folder icon (teal) + links (right-aligned)
- Title: off-white font-semibold, hover:text-teal
- Description: text-slate text-sm
- Tech: font-mono text-xs text-slate, flex wrap

### FR-009: Fade-up scroll animations
- Elements enter with `opacity-0 translate-y-6`
- Transition to `opacity-100 translate-y-0` when in view
- `useInView` hook via IntersectionObserver, fires once
- Under `prefers-reduced-motion: reduce`: elements start visible, no animation

### FR-010: Performance and accessibility
- No web font requests (system stack + Fira Code only if self-hosted)
- SkipNav as first focusable element → jumps to `#about`
- All interactive elements keyboard accessible
- Tab switcher: `role="tablist"` + `role="tab"` + `aria-selected` + `tabIndex`
- Social links: `aria-label` on each (e.g. `aria-label="GitHub profile"`)
- Lighthouse accessibility ≥ 90

---

## 4. Acceptance Criteria

### Two-column layout
- [ ] On lg+ screens: left panel is visible and does not scroll when right content is scrolled
- [ ] On < lg screens: single column, sections stack vertically
- [ ] Left panel is exactly `lg:sticky lg:top-0 lg:h-screen`

### Scroll-spy
- [ ] Scrolling into About section: "About" nav item activates
- [ ] Scrolling into Experience section: "Experience" activates, "About" deactivates
- [ ] Scrolling into Projects section: "Projects" activates
- [ ] Active nav item: line is w-16 off-white + text is off-white font-medium
- [ ] Inactive nav item: line is w-8 slate + text is slate opacity-60

### Experience tab switcher
- [ ] All 4 jobs accessible via tab click
- [ ] Active tab: teal border-left + teal text + light-navy background
- [ ] Inactive tab: transparent border + slate text
- [ ] Switching tabs changes content without page reload or scroll
- [ ] NOT an accordion, NOT a timeline

### Featured projects alternating layout
- [ ] First featured project (index 0): image left, content right
- [ ] Second featured project (index 1): image right, content left
- [ ] Third featured project (index 2): image left, content right
- [ ] "Featured Project" overline in mono teal on all three

### Teal usage
- [ ] Background: never teal
- [ ] Active nav line: teal
- [ ] Section numbers: teal
- [ ] ▹ bullets in skills: teal
- [ ] Active tab border: teal
- [ ] Social icon hover: teal
- [ ] Project title hover: teal
- [ ] No large teal surfaces anywhere

### Build
- [ ] tsc --noEmit zero errors
- [ ] npm run build succeeds
- [ ] html { scroll-behavior: smooth } in globals.css
- [ ] Lighthouse accessibility ≥ 90

---

## 5. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| `rootMargin` set to `'0px'` instead of `'-30% 0px -60% 0px'` | Scroll-spy activates the moment a section's top edge enters the viewport — multiple sections appear active simultaneously during fast scrolling. Use the exact rootMargin specified. |
| `bg-teal` class anywhere in src/ | Teal as a background fill destroys the visual system — teal only works as a rare accent. `grep -r "bg-teal" src/` must return zero results (except SkipNav which is intentional). |
| Left column missing any sticky class | `lg:sticky`, `lg:top-0`, and `lg:h-screen` are ALL required. Missing any one breaks the sticky behaviour — the column scrolls with the page. |
| FeaturedProject with no image | Render the content panel without an image div — the layout degrades gracefully. Do not crash or render a broken image. Guard with `{project.image && <Image ... />}`. |
| JobTabs rendered with 0 jobs | `jobs[active]` would throw `TypeError`. The data layer must guarantee at least 1 job. Guard in component: `if (!jobs.length) return null`. |
| Scroll reaches bottom — no section in rootMargin band | The last section may exit the rootMargin trigger zone before the page ends. Accept that the last section's nav item stays active — do not add special "last section" logic. |
| Mobile — Nav in left panel is hidden | On mobile, the left column collapses. The vertical Nav component is not visible. Mobile users need anchor access via inline mobile nav links in the header block or a hamburger menu. |
| FeaturedProject image missing from `/public/` | `next/image` throws a build error. Use placeholder image paths that exist in `/public/` during development. |

---

## 6. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| Navy as page background — never changed | The dark navy IS the design. Every colour decision (teal, slate, off-white) is calibrated against `#0a192f`. Changing the background invalidates the entire palette. |
| Teal appears only as accent — never as fill | Teal's signal value comes from rarity. If teal fills a section background, it loses its power as an interactive state indicator. `grep -r "bg-teal" src/` must stay clean. |
| Two-column sticky layout — non-negotiable | The sticky left panel while the right column scrolls is the single differentiating UX choice. It directly solves the problem (left navigation remains visible at all times). Removing it makes this a generic scrolling page. |
| Tab switcher for experience — not accordion, not timeline | Timeline requires reading in order; accordion implies content that should be hidden. Tabs let the reader jump directly to the company they care about. An engineering manager reads non-linearly. |
| No external icon library | Icon libraries add kilobytes and introduce tree-shaking risk. SVG icons inline or text symbols (▹, ↗) are sufficient and contribute zero bundle weight. |
| Section number labels in font-mono teal | The "01." prefix in monospace teal is a developer aesthetic signal — it reads as code commenting style applied to UI. Removing it makes the section headings generic. |
| `rootMargin: '-30% 0px -60% 0px'` exactly | This margin activates a section only when it occupies the middle 10% of the viewport — the zone where a user's eye naturally rests. Using `0px` or a different rootMargin produces incorrect activation at the edges of the viewport. |
| Skills list uses ▹ bullets — not checkboxes, progress bars, or icons | Progress bars imply measurable percentages which are meaningless for skill levels. ▹ is a terminal/code cursor symbol — it's thematically consistent with the developer aesthetic. |
