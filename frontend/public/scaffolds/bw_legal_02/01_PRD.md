# 01 — Product Requirements Document
## Top-Tier Indian Law Firm · bw_legal_platform_02

---

## Product Vision

A homepage for a top-tier Indian law firm that balances institutional authority with individual warmth. The site projects scale (17 practice areas, 5 offices, 500+ lawyers) while making individual partners visible through personal quotes. The alternating dark/light section architecture creates a visual rhythm that feels curated, not corporate.

---

## Personas

### Persona 1 — Rahul, 45, CFO of a Private Equity Fund
- Evaluating law firms for a complex cross-border acquisition
- Wants to identify the right M&A partner quickly
- Pain point: Law firm sites look identical — cannot assess personality or approach
- Acceptance criterion: Hero tabs convey distinct positioning; people filter allows practice-area search; partner quote gives personality signal before reading credentials

### Persona 2 — Priya, 28, NLU Graduate, Job Hunting
- Comparing AZB and other top firms as potential employers
- Values culture and individual growth over brand prestige alone
- Pain point: People sections are too formal — no sense of who the lawyers actually are
- Acceptance criterion: Quote-led people cards; office filter to find Bangalore/Chennai presence

### Persona 3 — Business Reporter, Economic Times
- Writing about a regulatory matter; needs to find the relevant practice head
- Wants to access recent client alerts and thought leadership
- Acceptance criterion: Insights section with category filter; practice area → people filter linkable

### Persona 4 — QA Reviewer
- Verifies brand consistency, accessibility, dark/light section nav switching, tab keyboard nav
- Acceptance criterion: Lighthouse ≥90/90; no serif font; 10px card radius; pill buttons; nav switches correctly on IntersectionObserver; tab ARIA pattern correct

---

## Functional Requirements

### FR-001: Color system — 7 tokens, terracotta + navy
- `globals.css` has exactly 7 `--color-*` tokens
- `--color-terracotta: #B57560` — headings, accents, CTAs, terracotta dots
- `--color-navy: #002346` — hero, practice section, footer background
- Terracotta text only on elements ≥18px — 2.8:1 contrast fails AA at small sizes
- Terracotta on `#002346` = 4.6:1 — acceptable for large text on dark bg

### FR-002: DM Sans single font
- DM Sans loaded via `next/font/google`, weights 300/400/500/600/700
- Applied as `--font-sans` on `<html>`
- No serif font anywhere — not for headings, not for pull quotes
- Lighthouse CLS: 0

### FR-003: Scroll-aware sticky navigation
- Height `72px`, white background + `1px solid #e5e7eb` at rest (over white sections)
- When any `[data-dark-section]` element is ≥30% in viewport: `background: rgba(0,35,70,0.95)`
- Nav text and logo switch to white in dark state
- Transition: `background 400ms ease`
- IntersectionObserver (not scroll position threshold) — nav must track section visibility
- Terracotta pill "Contact" CTA always visible right side
- Mega-dropdown for Expertise, People, Insights

### FR-004: Tabbed hero section
- Full viewport height, `background: var(--color-navy)`, `data-dark-section`
- Geometric ellipse SVG pattern overlay (terracotta at ~5% opacity, right side)
- 4 tabs: "Energy" | "Expertise" | "Execution" | "Unmatched"
- Tab bar: horizontal row, all tabs visible, ARIA `tablist` / `tab` roles
- Active tab: terracotta underline `3px solid var(--color-terracotta)`; white text weight 600
- Inactive tabs: white at 50% opacity, weight 400
- Tab content (per tab): large H1 in terracotta, subtitle in white Roboto 300, body text in white 75%, arrow text CTA "Discover →"
- Tab content switches with Framer Motion `AnimatePresence` (fade 200ms)
- Keyboard: left/right arrows cycle tabs; `prefers-reduced-motion` = instant switch

### FR-005: Credentials strip
- White background section
- 4 stats: "Est. 1997", "500+ Lawyers", "5 Offices", "17 Practice Areas"
- Each stat block: `border-left: 4px solid var(--color-terracotta); padding-left: 20px`
- Stat value: `3rem`, weight 700, `#000`
- Stat label: `0.875rem`, weight 400, `#6B6B6B`
- NO count-up animation — values are string-formatted ("Est. 1997" can't count up)
- 4-column flex/grid row on desktop, 2-col tablet, 2-col mobile

### FR-006: Practice area section (dark navy)
- `background: var(--color-navy)`, `data-dark-section`
- Geometric pattern overlay: SVG abstract ellipses, `rgba(255,255,255,0.02)`, right side
- Terracotta dot (`6px` circle) + section label before heading
- Section heading: white, DM Sans 700
- 4-column grid desktop, 3-col tablet, 2-col mobile
- 17 practice areas from mock data
- Cards: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 28px`
- Card title: UPPERCASE white, `0.9375rem`, weight 700, `0.12em` letter-spacing
- Card description: white 65% opacity, `0.8125rem`, weight 300
- "→" link: terracotta color
- Card hover: `background: rgba(255,255,255,0.08); border-color: rgba(181,117,96,0.4)`, `200ms ease`

### FR-007: People grid with filter bar
- White background section
- Filter bar above grid: name search input + office `<select>` + practice area `<select>` + Reset button
- Office options: Mumbai, Delhi, Bangalore, Chennai, Pune
- Practice area options: all 17 areas
- Filtering is client-side, live (no submit button)
- 3-column grid desktop, 2-col tablet, 1-col mobile
- 9 people in mock data (mix of founding/senior/partners)
- Card: `border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px`
- Photo: square, `border-radius: 4px`, FULL COLOR
- Name: `#000` weight 600, `1rem`
- Role: terracotta, `0.8rem`, uppercase, weight 500
- Practice: grey `0.8rem`
- Quote: italic grey, `0.9375rem`, line-height 1.65, margin-top 12px
- Card hover: `box-shadow: 0 4px 20px rgba(0,35,70,0.10)`, `200ms ease`

### FR-008: Insights section
- White background
- 3-column grid, `gap: 24px`
- 6 insights from mock data
- Card: `border: 1px solid #e5e7eb; border-radius: 10px`
- Image: 16:9, top of card
- Category pill: `background: #00539B; color: #fff; border-radius: 9999px; padding: 4px 10px; font-size: 0.75rem`
- Date: grey, `0.8125rem`
- Title: `#000` weight 600, `1.125rem`, 2-line clamp
- "Read more →": terracotta, hover underline

### FR-009: Pill buttons — terracotta variant
- Primary: `background: #B57560; color: #fff; border-radius: 9999px; height: 44px`
- Secondary: `border: 2px solid #B57560; color: #B57560; border-radius: 9999px; height: 44px`
- Ghost: `border: 2px solid rgba(255,255,255,0.6); color: #fff; border-radius: 9999px; height: 44px`
- Terracotta CTA on dark bg: white text on `#B57560` = 3.8:1 — acceptable for 44px button (large interactive element)

### FR-010: Footer
- `background: var(--color-navy)`
- `border-top: 3px solid var(--color-terracotta)`
- 4-column layout: logo + tagline | Expertise | Offices (5 cities) | Connect
- White text, 60% opacity for secondary items
- Terracotta link hover

### FR-011: Framer Motion section entrance animations
- Each major section: `opacity: 0; translateY(16px)` → visible on viewport entry
- Duration: `500ms ease`
- Stagger between grid children: `0.07s`
- `prefers-reduced-motion`: all animations disabled

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA | All text passes; terracotta only on ≥18px elements |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Module files | Zero grep results |
| Build | `npm run build` succeeds (static export) |

---

## Out of Scope
- Star ratings or client testimonials with scores
- Pricing or fee schedules
- Countdown timers
- Live chat widgets
- People profile detail pages (cards link to stub `/people/[slug]`)
- Contact form backend
- News/blog CMS
