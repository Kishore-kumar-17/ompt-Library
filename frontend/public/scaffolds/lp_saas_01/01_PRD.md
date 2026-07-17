# 01 — Product Requirements Document
## Precision Dark SaaS Landing Page · lp_saas_platform_01

---

### 1. Product Vision

A single-page marketing homepage for a project management and issue tracking platform built for software engineering teams. The page must communicate precision and craft in under 5 seconds and convert skeptical engineering leads into free trial signups.

**Success metric:** A first-time visitor who scrolls the full page clicks "Get started" without needing to visit any subpage.

---

### 2. Personas

**Engineering Lead**
- evaluates quality through visual precision, not feature lists
- reads headlines and scans screenshots — does not read body copy
- leaves immediately if the page feels generic or corporate

**Software Engineer (individual)**
- wants to know: is this keyboard-first? does it feel fast?
- evaluates the product screenshot as proxy for actual product quality

**Product Manager (adjacent)**
- evaluates whether the tool covers their team's workflow
- looks for pricing clarity and team fit signals

---

### 3. Page Sections

| # | Section | Conversion function |
|---|---------|---------------------|
| 1 | Sticky navigation | persistent access to "Get started" |
| 2 | Hero | first impression; primary CTA |
| 3 | Logo trust bar | social proof from company names |
| 4 | Feature section 1 | what it does (primary) |
| 5 | Feature section 2 | what it does (secondary) |
| 6 | Bento card grid | depth — six secondary features |
| 7 | Pricing preview | removes a common exit reason |
| 8 | Final CTA section | closing conversion surface |
| 9 | Footer | navigation and legal |

---

### 4. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Application UI (issue tracker, cycle board) | separate product build |
| NG2 | Full pricing comparison table | link to `/pricing` subpage |
| NG3 | User authentication or session management | marketing site only |
| NG4 | CMS integration | content is static for v1 |
| NG5 | Blog or documentation | separate routes |

---

### 5. Conversion Requirements

- "Get started" button must appear in nav (sticky), hero, and final CTA — three surfaces minimum
- Hero CTA must be above the fold on a 768px viewport without scrolling
- Product screenshot must be visually legible at full container width
- Logo bar must render on mobile without overflow (horizontal scroll or wrapping allowed)
- Page must load in under 2 seconds on a mid-range mobile connection (Lighthouse 95+)

---

### 6. Constraints

**Visual:**
- background `#08090A` only — not pure black, not dark grey
- no gradients (one subtle hero radial glow at `rgba(94,106,210,0.08)` max, optional)
- no stock photography — product screenshots or UI placeholders only
- no carousels or auto-advancing elements
- font weight max 500 throughout

**Copy:**
- headlines max 8 words
- subtext max 16 words per section
- no exclamation marks
- no aspirational marketing language

**Accessibility:**
- WCAG AA contrast throughout
- full keyboard navigation
- `prefers-reduced-motion` respected

---

### 7. Acceptance Criteria (Top Level)

- [ ] "Get started" button present in nav, hero, and final CTA
- [ ] Hero above the fold at 768px viewport
- [ ] Product screenshot renders at 90% container width
- [ ] Logo bar displays without overflow on 360px mobile
- [ ] Bento grid is 3-col desktop, 2-col tablet, 1-col mobile
- [ ] No hex values in component files — all colors via CSS variables
- [ ] Lighthouse 95+ on mobile
- [ ] No gradients (hero glow exception does not exceed `rgba(94,106,210,0.08)`)
- [ ] `prefers-reduced-motion` disables all scroll animations
