# 07 — Developer Guide
## Iconic Developer Portfolio · portfolio_platform_06

Reference while building. The system's identity lives in its restraint.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| `bg-navy` (#0a192f) on every surface | The dark environment IS the identity. Light sections destroy it. |
| Teal (#64ffda) as signal only — never background fill | One teal element per component. When everything is teal, nothing is. |
| Single page — all anchors, no routing | The portfolio is a scroll experience. Routing fragments it. |
| Experience = tab switcher | Tabs are interactive. Timelines are static lists. The interaction communicates that the engineer thinks in UI. |
| FeaturedProjects = alternating layout | Even index: image left. Odd: image right. Creates visual rhythm. Uniform grid removes it. |
| Active nav = growing line + text-off-white | The line growth is the signature animation. Do not replace with colour changes alone. |
| Font-mono on section numbers, tech tags, dates | Mono signals: I am precise, I work with code, these numbers mean something. |
| `rootMargin: '-30% 0px -60% 0px'` on IntersectionObserver | Too wide and sections activate before the user is reading them. Too narrow and the nav lags. This value is calibrated. |

---

## 2. The Scroll-Spy — How It Works

```
Viewport (total height = 100%):

  ╔══════════════════════╗  ← top of viewport
  ║  dead zone (30%)     ║  ← element must scroll PAST this before activating
  ╠══════════════════════╣  ← rootMargin top boundary
  ║                      ║
  ║  observation zone    ║  ← element is "active" when its top edge is here
  ║  (middle 40%)        ║
  ║                      ║
  ╠══════════════════════╣  ← rootMargin bottom boundary
  ║  dead zone (60%)     ║  ← sections below fold don't activate prematurely
  ╚══════════════════════╝  ← bottom of viewport
```

`rootMargin: '-30% 0px -60% 0px'` means:
- Top: shrink the observation box by 30% from the top
- Bottom: shrink it by 60% from the bottom
- The active observation zone is the middle 10% band of the viewport

When a section's top edge enters this band, `setActiveId(id)` fires. This means the nav updates when the section heading is roughly at eye level — which feels natural.

**Common mistake:** Using `threshold: 0.5` instead of `rootMargin`. Threshold fires when 50% of the element is visible — which only works for small elements. Large sections (taller than the viewport) never reach 50% visibility, so they never activate.

---

## 3. The Alternating Project Layout

```
index 0 (even): image LEFT, content RIGHT
index 1 (odd):  image RIGHT, content LEFT
index 2 (even): image LEFT, content RIGHT
```

Implementation using CSS Grid column spans:

```tsx
const isEven = index % 2 === 0

// Grid: lg:grid-cols-12 (12 equal columns)
// Image always spans 7 columns
// Content spans 7 columns but is positioned ABSOLUTE over the grid
// So they overlap — content floats over the right (or left) of the image

// Even: image starts at col 1 (left), content is at col 6–12 (right)
// Odd: image starts at col 6 (right), content is at col 1–7 (left)
```

The description box uses `lg:absolute` to float over the image — this creates the visual layering that makes the layout distinctive. Without `position: relative` on the grid container and `position: absolute` on the content, the boxes won't overlap.

**Mobile:** On mobile, the absolute positioning is removed and content stacks vertically. Use `lg:absolute` (not just `absolute`) so mobile is unaffected.

---

## 4. JobTabs — Keyboard Accessibility

The ARIA tablist pattern requires:
- `role="tablist"` on the `<ul>` or container
- `role="tab"` on each button
- `aria-selected={isActive}` on each button
- `tabIndex={isActive ? 0 : -1}` — only the active tab is in the Tab order

This means a keyboard user Tabs to the tablist, then uses **arrow keys** to navigate between tabs (not Tab). To implement full arrow key support:

```typescript
const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    setActiveIndex((index + 1) % jobs.length)
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    setActiveIndex((index - 1 + jobs.length) % jobs.length)
  }
}
```

This is the complete accessible tab pattern — Lighthouse will flag missing keyboard support.

---

## 5. Teal Usage Rules

```
✓ CORRECT uses of teal:
  - text-teal on section number prefix: <span className="font-mono text-teal">01.</span>
  - border-teal on active tab: border-l-2 border-teal
  - text-teal on active tab text
  - text-teal on ▹ bullet characters
  - hover:text-teal on links, social icons, project titles
  - text-teal on "Featured Project" overline
  - text-teal on folder icon in ProjectCard
  - bg-teal/30 on ::selection (very subtle background)

✗ WRONG uses of teal:
  - bg-teal (large background fill — destroys signal value)
  - text-teal on body text / paragraphs
  - border-teal on non-active elements
  - Teal headings (use text-off-white)
  - Teal as the section background (even for a strip)
```

The heuristic: **one teal element per component, and only for the most important interactive or structural element in that component.**

---

## 6. Image Treatment on FeaturedProject

```css
/* Default state: greyscale, half-opacity — image recedes */
.project-image {
  filter: grayscale(100%);
  opacity: 0.5;
  mix-blend-mode: multiply;
}

/* Hover: full colour, full opacity — image emerges */
.project-image:hover {
  filter: grayscale(0%);
  opacity: 1;
}
```

In Tailwind:
```tsx
className="... filter grayscale opacity-50 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-300"
```

`mix-blend-mode: multiply` makes white in the image transparent against the dark navy background — this creates a seamless blend. If your project images have white backgrounds, they'll look like they're cut out. If they have dark backgrounds, they'll look flat — remove `mix-blend-mode` in that case.

**If no image:** Render `<div className="w-full aspect-video bg-light-navy" />` as a placeholder. Do not use a stock photo.

---

## 7. Common Mistakes

### Mistake 1: Light section on the page

```tsx
// WRONG
<section className="bg-white">
  <AboutSection />
</section>

// CORRECT — always navy, always dark
<section className="py-24 lg:py-32">
  <AboutSection />
</section>
```

### Mistake 2: Teal as background fill

```tsx
// WRONG
<div className="bg-teal text-navy px-4 py-2">Featured Project</div>

// CORRECT — teal text only
<p className="font-mono text-xs text-teal">Featured Project</p>
```

### Mistake 3: Using an accordion for experience

```tsx
// WRONG — accordion is a different pattern
<details><summary>{job.company}</summary>...</details>

// CORRECT — tab switcher
<JobTabs />  // useState, role="tablist", role="tab"
```

### Mistake 4: All projects in a uniform grid

```tsx
// WRONG — destroys the visual hierarchy
<div className="grid grid-cols-3">
  {projects.map(p => <ProjectCard key={p.title} project={p} />)}
</div>

// CORRECT — featured projects get the full-width alternating treatment
{featuredProjects.map((p, i) => <FeaturedProject key={p.title} project={p} index={i} />)}
<div className="grid grid-cols-3">
  {otherProjects.map(p => <ProjectCard key={p.title} project={p} />)}
</div>
```

### Mistake 5: Wrong rootMargin on IntersectionObserver

```typescript
// WRONG — threshold 0.5 breaks for sections taller than viewport
const observer = new IntersectionObserver(cb, { threshold: 0.5 })

// CORRECT — rootMargin targets the middle band
const observer = new IntersectionObserver(cb, { rootMargin: '-30% 0px -60% 0px' })
```

### Mistake 6: Nav in wrong place on mobile

```tsx
// WRONG — Nav hidden entirely on mobile
<nav className="hidden lg:block mt-16">

// CORRECT — Nav is hidden in the sticky left column on mobile,
// but should appear somewhere accessible on mobile.
// Options: render Nav above sections on mobile, or add a hamburger menu.
// Simplest: render nav at top of mobile view inside Header
```

### Mistake 7: Missing `tabIndex={-1}` on inactive tabs

Without `tabIndex={-1}` on inactive tabs, a keyboard user pressing Tab will visit every tab button individually, which is incorrect behaviour. The ARIA tablist pattern requires arrow key navigation between tabs and only the active tab in the Tab order.

### Mistake 8: Using icon libraries

```tsx
// WRONG — adds bundle weight
import { GithubIcon } from 'lucide-react'

// CORRECT — inline SVG or text symbol
<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
  {/* GitHub SVG path */}
</svg>
// or simply:
<span className="font-mono text-xs">GH</span>
```

---

## 8. Seed Data Guidelines

**Jobs — what makes bullets good:**
```
WEAK: "Worked on the frontend codebase"
STRONG: "Migrated a monolithic React app to micro-frontends, reducing bundle size by 45% and cutting deployment time from 40 to 8 minutes"

WEAK: "Improved performance"
STRONG: "Identified and resolved N+1 query pattern in the GraphQL API, reducing p95 response time from 1.2s to 180ms"
```

**Projects — what to include:**
- One open-source tool or library (shows community contribution)
- One full-stack application (shows end-to-end capability)
- One developer tool or CLI (shows interest in the craft)

**Tech stacks — keep realistic:**
- Don't list every technology you've ever touched
- List 3–5 technologies per project (the ones that defined it)
- Don't list "HTML" or "CSS" as technologies in 2024

---

## 9. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; `/out/` generated
- [ ] Page background is dark navy (#0a192f) — not black, not grey
- [ ] Teal NEVER appears as a background fill
- [ ] Section numbers ("01.", "02.", "03.") are in font-mono text-teal
- [ ] Nav scroll-spy: scrolling through all sections activates each nav item in sequence
- [ ] Nav active: line is w-16 off-white + text is off-white (not teal)
- [ ] Nav inactive: line is w-8 slate + text is slate opacity-60
- [ ] Experience: tab switcher (confirm it is NOT an accordion or timeline)
- [ ] JobTabs: `role="tablist"`, `aria-selected` present (check DevTools Accessibility pane)
- [ ] FeaturedProject index 0: image on LEFT — visually confirm in browser
- [ ] FeaturedProject index 1: image on RIGHT — visually confirm in browser
- [ ] ProjectCards: hover moves card up (-translate-y-1)
- [ ] About skills: ▹ is teal, skill names are lightest-slate, 2-column grid
- [ ] Social links: `aria-label` on each, hover turns teal
- [ ] No font file requests in Network tab
- [ ] SkipNav visible on Tab press, jumps to #main
- [ ] `prefers-reduced-motion`: sections start visible, no fade-up animation
- [ ] `::selection` shows subtle teal highlight
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
