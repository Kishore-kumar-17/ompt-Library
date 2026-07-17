# 01 — Product Requirements Document
## Premier Indian Law Firm · bw_legal_platform_01

---

## Product Vision

A homepage for India's premier full-service law firm. The site serves three audiences simultaneously: potential clients seeking legal representation, top legal talent evaluating the firm as an employer, and media/regulators assessing the firm's standing. Every design and copy decision must project authority, depth, and trustworthiness — not approachability or friendliness.

The site is not a sales funnel. It is a credentials showcase.

---

## Personas

### Persona 1 — Vikram, 52, CFO of a Listed Indian Conglomerate
- Evaluating law firms for a major M&A transaction
- Needs to verify the firm's M&A credentials and key partners in that practice
- Pain point: Cannot find specific partner expertise quickly
- Acceptance criterion: Practice area cards link to detailed practice pages; leadership section filterable by practice area

### Persona 2 — Ananya, 26, NLU Graduate
- Evaluating the firm as her first employer after law school
- Wants to understand firm culture, values, training programs, and growth path
- Pain point: Firm websites feel opaque about culture
- Acceptance criterion: Values section ("Character, Competence, Commitment") visible on homepage; Gurukul/Prarambh program links in footer or about section

### Persona 3 — Reuters Journalist
- Writing about a regulatory matter the firm is involved in
- Needs to find the right spokesperson / practice head quickly
- Wants to access recent publications and client alerts
- Acceptance criterion: Insights section with category filters; press contact accessible from footer

### Persona 4 — QA Reviewer
- Verifies brand consistency, accessibility, and absence of disallowed elements
- Acceptance criterion: Lighthouse ≥90/90; no gold text anywhere; pill buttons everywhere; sharp card corners; no countdown timers; no star ratings

---

## Functional Requirements

### FR-001: Color system — purple authority + gold accent
- `globals.css` has exactly 6 `--color-*` tokens
- `--color-brand: #621755` — all CTAs, hero backgrounds, nav fill on scroll
- `--color-gold: #d0a56d` — decorative only (corner L-brackets, dividers, footer top border)
- Gold never appears as text color — fails WCAG AA on white (2.7:1)
- White text on purple passes WCAG AAA (9.6:1)

### FR-002: Typography — Playfair Display + Roboto dual system
- Playfair Display (400, 700): all H1–H3, section titles, card headings, pull quotes
- Roboto (300, 400, 500): all body text, nav links, button labels, captions, dates
- No sans-serif heading fallback — Playfair Display must load (Google Fonts or local)
- No serif body text — Roboto only for paragraphs

### FR-003: Sticky navigation with scroll-triggered purple
- Height `80px` at rest, transparent background
- On scroll >200px: `background: rgba(98,23,85,0.95)`, height `64px`
- Transition: `background 500ms ease-in-out, height 300ms ease`
- Logo switches to white SVG variant on scroll (purple version at rest)
- Links: white text on scroll state, dark text at rest
- "Contact Us" pill CTA always visible, rightmost position

### FR-004: Hero section
- Full viewport height
- Background: deep purple (`#621755`) or purple-to-dark gradient
- Left-aligned content, max 55% width on desktop
- Gold horizontal rule (2px × 80px) above H1
- H1: Playfair Display 700, `clamp(2.5rem, 5vw, 4rem)`, white
- Subheading: Roboto 300, white, max 80 characters
- Two CTAs: primary (white background, purple text) + ghost (white border, white text)

### FR-005: Stats strip
- Purple background, white text, 4 metrics in one row
- Metrics: "75+ Years", "750+ Lawyers", "9 Offices", "50+ Top Rankings"
- Large numbers: Playfair Display 700, `3rem`, white
- Labels: Roboto 300, `0.875rem`, uppercase, white at 80% opacity
- Gold vertical dividers between metrics
- Count-up animation triggered by IntersectionObserver on first enter

### FR-006: Practice area grid
- 8 practice areas displayed in 3-column grid desktop, 2-column tablet, 1-column mobile
- Cards: white background, `1px solid #e5e7eb` border, `border-radius: 0` (no rounding)
- Icon: SVG, purple fill, 40px, top of card
- Title: Playfair Display 400 `1.125rem`
- Description: Roboto 300 `0.875rem`, 2-line clamp
- "Learn more →": purple text link, no underline at rest, underlines on hover
- Hover state: left border changes to `4px solid #621755`, shadow `0 8px 32px rgba(98,23,85,0.12)`
- GoldCorner decoration on section heading

### FR-007: Leadership grid
- 8 leaders in 4-column grid desktop, 2-column tablet, 1-column mobile
- Portrait photos: square aspect ratio, `filter: grayscale(1)` default, `grayscale(0)` on hover
- Transition: `filter 400ms ease`
- Name: Playfair Display 500 `1rem`
- Title: Roboto 300 `0.8rem`, uppercase, muted
- Bio excerpt: Roboto 300 `0.875rem`, 2-line clamp
- No stars, no social icons on card, no casual language

### FR-008: Insights / publications section
- 6 recent publications in 3-column grid
- Each card: image top (16:9), category tag pill (purple, white text), date (muted), Playfair title (2-line clamp), "Read more →" link
- Category tags: "Legal Update", "Client Alert", "Thought Leadership", "Publication"
- No promotional language in titles — formal legal naming conventions only

### FR-009: GoldCorner decoration component
- Reusable component wrapping any section heading
- Renders an L-shaped double-border in gold `#d0a56d` at the top-left of the heading
- CSS `::before`: `border-top: 2px solid var(--color-gold); border-left: 2px solid var(--color-gold); width: 24px; height: 24px; position: absolute; top: 0; left: 0`
- Applied to: Practice Areas section heading, Leadership heading, Insights heading, any major section title
- NOT applied to nav items, buttons, or footer

### FR-010: Footer
- Background `#3d0e35` (dark purple), not black
- Gold top border: `2px solid #d0a56d`
- 4-column layout: [Logo + tagline + social] | [Practice Areas] | [Offices — all 9 cities] | [Connect — Contact, Careers, Press]
- White text, opacity-70 for secondary items
- Gold accent on link hover

### FR-011: Pill buttons everywhere
- ALL interactive buttons: `border-radius: 9999px; height: 48px; padding: 0 32px`
- Three variants: primary (purple bg, white text), secondary (purple border, purple text), ghost (white border, white text — for dark backgrounds)
- Font: Roboto 500, `0.875rem`, uppercase, `0.1em` letter-spacing
- No square buttons, no rounded-md buttons — only pill

### FR-012: Scroll animations
- Sections fade-up on enter: `opacity: 0; translateY(20px)` → visible
- Duration `600ms ease`, stagger `100ms` between child elements
- Stat count-up: 0 → final value, `1200ms` ease-out
- `prefers-reduced-motion: reduce` — all transforms disabled, opacity transitions cut to `1ms`

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA contrast | All text elements pass; gold is decorative only |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Module files | Zero grep results |
| Build | `npm run build` succeeds (static export) |

---

## Explicitly Out of Scope

- Pricing or fee structures
- Star ratings or testimonials with social proof scores
- Live chat widgets (Intercom, Drift, etc.)
- Countdown timers or urgency elements
- Individual attorney profile pages (link stubs only)
- Client login portal
- Search functionality
- Multi-language support
- Contact form backend (form UI only, no submission)
