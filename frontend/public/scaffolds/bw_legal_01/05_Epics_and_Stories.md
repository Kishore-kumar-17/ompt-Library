# 05 — Epics and Stories
## Premier Indian Law Firm · bw_legal_platform_01
### AmarLaw · Purple + Gold · Playfair Display (headings) + Roboto (body) · Scroll-Triggered Nav

---

## Epic 1 — Design System and Global Shell

### Story 1.1 — CSS tokens (6 variables)
**Acceptance criteria:**
- [ ] `globals.css` has exactly 6 `--color-*` tokens (NOT 8 — this is a 6-token system)
- [ ] `--color-brand: #621755` (purple), `--color-gold: #d0a56d` (decorative), `--color-dark: #3d0e35` (footer)
- [ ] Comment on `--color-gold` explicitly states: `/* decorative only — never as text color */`
- [ ] Gold on white = 2.7:1 — FAILS AA. Zero `color: var(--color-gold)` on text elements on white bg
- [ ] `grep -r "color: var(--color-gold)" src/components --include="*.module.css"` → zero `color:` rules (gold as border/background only)
- [ ] No hex values in any `.module.css` file; `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty

### Story 1.2 — Dual font system
**Acceptance criteria:**
- [ ] Playfair Display loaded via `next/font/google`, weights 400 and 700
- [ ] Roboto loaded via `next/font/google`, weights 300, 400, and 500
- [ ] Both applied as CSS variables on `<html>`: `--font-display` (Playfair) and `--font-body` (Roboto)
- [ ] `--font-display` used on ALL H1, H2, H3, section titles, card headings, stat numbers
- [ ] `--font-body` used on ALL paragraph text, nav links, button labels, captions
- [ ] `grep -r "font-family: var(--font-body)" src/components/ui/PillButton.module.css` → present
- [ ] `grep -r "font-family: var(--font-display)" src/components/sections/PracticeAreas.module.css` → present on headings
- [ ] No body text uses `--font-display`. No heading uses `--font-body`
- [ ] Lighthouse CLS: 0
- [ ] TypeScript: no font types needed — enforced via CSS variables and module CSS

### Story 1.3 — GoldCorner component
**Acceptance criteria:**
- [ ] Reusable wrapper: `src/components/ui/GoldCorner.tsx`
- [ ] Renders `::before` pseudo-element: `border-top: 2px solid var(--color-gold); border-left: 2px solid var(--color-gold); width: 24px; height: 24px; position: absolute; top: 0; left: 0`
- [ ] Applied ONLY to 3 section headings: PracticeAreas, Leadership, Insights — NOT nav, buttons, cards, footer, or inline text
- [ ] `grep -r "GoldCorner" src/components` → exactly 3 results (one per section)

### Story 1.4 — PillButton component
**Acceptance criteria:**
- [ ] `border-radius: 9999px` on all variants — confirmed in DevTools
- [ ] `grep -r "border-radius: 8px\|border-radius: 4px\|border-radius: 0" src/components/ui/PillButton.module.css` → empty
- [ ] Height `48px` (md) and `40px` (sm)
- [ ] Primary: `background: var(--color-brand); color: rgb(255,255,255)` — white on purple = 9.6:1 ✓
- [ ] Secondary: transparent bg, `border: 2px solid var(--color-brand)`, purple text → purple bg on hover
- [ ] Ghost: white border, white text (for dark backgrounds only)
- [ ] Font: Roboto 500 (`var(--font-body)`), `text-transform: uppercase`, `letter-spacing: 0.1em`
- [ ] Works as `<Link>` (via `href` prop) and `<button>`
- [ ] Focus ring: `outline: 2px solid var(--color-gold); outline-offset: 3px`
- [ ] TypeScript: `type PillButtonVariant = 'primary' | 'secondary' | 'ghost'`; `type PillButtonSize = 'md' | 'sm'`

### Story 1.5 — Scroll-triggered sticky nav
**Acceptance criteria:**
- [ ] `position: fixed; width: 100%; z-index: 100`
- [ ] At rest (`scrollY < 200`): height `80px`, `background: transparent`
- [ ] On scroll (`scrollY >= 200`): height `64px`, `background: rgba(98,23,85,0.95)`, `backdrop-filter: blur(8px)`
- [ ] Transition: `background 500ms ease-in-out, height 300ms ease`
- [ ] Logo text switches to white on scroll state
- [ ] Nav links switch to white on scroll state
- [ ] `'use client'` directive present in `StickyNav.tsx`
- [ ] Scroll listener uses `{ passive: true }` option
- [ ] Cleanup: `window.removeEventListener` called in `useEffect` return function
- [ ] "Contact Us" PillButton (primary variant) rightmost always
- [ ] TypeScript: `const [scrolled, setScrolled] = useState(false)` — boolean state

### Story 1.6 — Footer
**Acceptance criteria:**
- [ ] `background: var(--color-dark)` (`rgb(61,14,53)`)
- [ ] `border-top: 2px solid var(--color-gold)` — gold top accent (background use only)
- [ ] 4 columns: logo+tagline | Practice Areas | Offices (all 9 cities) | Connect
- [ ] Link hover: `color: var(--color-gold)` — the one place gold functions as hover state
- [ ] Copyright line: `color: rgba(255,255,255,0.5)`, `new Date().getFullYear()` for year
- [ ] Collapses to 2-col tablet (≤768px), 1-col mobile (≤480px)

---

## Epic 2 — Hero and Authority Signals

### Story 2.1 — Hero section
**Acceptance criteria:**
- [ ] `min-height: 100vh`, purple gradient: `background: linear-gradient(135deg, var(--color-brand), var(--color-dark))`
- [ ] Content left-aligned, `max-width: 55%` on desktop; full-width on mobile
- [ ] Gold rule above H1: `width: 80px; height: 2px; background: var(--color-gold)` (background use, not text)
- [ ] H1: Playfair Display 700 (`var(--font-display)`), `clamp(2.5rem, 5vw, 4rem)`, white
- [ ] Subheading: Roboto 300 (`var(--font-body)`), white at 85% opacity, max 80 characters
- [ ] Two PillButtons: primary (white text) + ghost (white border, white text)
- [ ] Stack CTAs vertically on mobile (≤640px)

### Story 2.2 — Stats strip
**Acceptance criteria:**
- [ ] `background: var(--color-brand)` — purple strip
- [ ] 4 metrics: "75+ Years", "750+ Lawyers", "9 Offices", "50+ Rankings"
- [ ] Numbers: Playfair Display 700 (`var(--font-display)`), `font-size: 3rem`, white
- [ ] Labels: Roboto 300 (`var(--font-body)`), `text-transform: uppercase`, white at 75% opacity
- [ ] Gold vertical dividers between stats: `width: 1px; background: var(--color-gold); opacity: 0.4` — visible desktop, `display: none` mobile
- [ ] Count-up animation: starts from 0 on first IntersectionObserver entry; duration `1200ms` ease-out
- [ ] Does NOT restart on second scroll: `observer.disconnect()` after first trigger; `started.current` ref
- [ ] `prefers-reduced-motion`: count-up skips to final value instantly
- [ ] TypeScript: `Stat = { value: number; suffix: string; label: string; decimals?: number }`

---

## Epic 3 — Practice Areas

### Story 3.1 — Practice area grid
**Acceptance criteria:**
- [ ] 3-col desktop, 2-col tablet (≤1024px), 1-col mobile (≤640px); `gap: 24px`
- [ ] 8 practice areas from `PRACTICE_AREAS` const
- [ ] Cards: `background: rgb(255,255,255); border: 1px solid var(--color-border); border-radius: 0`
- [ ] `grep -r "border-radius: 8\|border-radius: 1[0-9]" src/components/home/PracticeCard.module.css` → empty (sharp corners)
- [ ] `padding: 32px`
- [ ] Card hover: `border-left: 4px solid var(--color-brand); box-shadow: 0 8px 32px rgba(98,23,85,0.12)`
- [ ] Transition: `border-left 300ms ease, box-shadow 300ms ease`
- [ ] TypeScript: `PracticeArea = { id: string; title: string; slug: string; description: string; icon: string }`

### Story 3.2 — Practice card content
**Acceptance criteria:**
- [ ] SVG icon: 40px, `fill: var(--color-brand)` (purple), top of card
- [ ] Title: Playfair Display 400 (`var(--font-display)`), `font-size: 1.125rem`, dark charcoal
- [ ] Description: Roboto 300 (`var(--font-body)`), `font-size: 0.875rem`, muted, 3-line clamp
- [ ] "Learn more →": purple text, `border-bottom: 1px solid transparent`, underline on hover
- [ ] `href`: `/practice-areas/[slug]` — stubs acceptable

### Story 3.3 — Section heading with GoldCorner
**Acceptance criteria:**
- [ ] Section heading wrapped in `<GoldCorner>`
- [ ] Gold L-bracket visible top-left of heading wrapper
- [ ] Heading: Playfair Display 700, `clamp(1.5rem, 3vw, 2.25rem)`
- [ ] `grep -r "GoldCorner" src/components/sections/PracticeAreas.tsx` → present

---

## Epic 4 — Leadership

### Story 4.1 — Leadership grid
**Acceptance criteria:**
- [ ] 4-col desktop, 2-col tablet (≤1024px), 1-col mobile (≤640px)
- [ ] 8 leaders from `LEADERS` const
- [ ] Portrait: square aspect ratio, `overflow: hidden`
- [ ] `filter: grayscale(1)` at rest, `filter: grayscale(0)` on hover
- [ ] Transition: `filter 400ms ease`
- [ ] `prefers-reduced-motion`: no transition (stays at rest state)
- [ ] Photo `alt` text includes name and title (e.g., `alt="Priya Sharma, Senior Partner"`)
- [ ] TypeScript: `Leader = { id: string; name: string; title: string; bio: string; photoUrl: string }`

### Story 4.2 — Leader card content
**Acceptance criteria:**
- [ ] Name: Playfair Display 500 (`var(--font-display)`), `font-size: 1rem`, dark charcoal
- [ ] Title: Roboto 300 (`var(--font-body)`), `font-size: 0.8rem`, `text-transform: uppercase`, muted
- [ ] Bio excerpt: Roboto 300, `font-size: 0.875rem`, 2-line clamp
- [ ] No stars, no social media icons, no "Book a call" CTA — institutional language only
- [ ] `grep -r "Star\|twitter\|linkedin\|Book a call" src/components/home/LeaderCard.tsx` → empty

---

## Epic 5 — Insights and Publications

### Story 5.1 — Insights grid
**Acceptance criteria:**
- [ ] 3-col grid, `gap: 24px`; 6 insights from `INSIGHTS` const
- [ ] Image: 16:9 aspect ratio, top of card
- [ ] Category tag: `border-radius: 9999px`, `background: var(--color-brand)`, white text, `font-size: 0.75rem`
- [ ] Date: Roboto 300, muted, `font-size: 0.8125rem`
- [ ] Title: Playfair Display 700, `font-size: 1.25rem`, 2-line clamp
- [ ] "Read more →": `color: var(--color-brand)` (purple text link)
- [ ] TypeScript: `Insight = { id: string; category: string; date: string; title: string; imageUrl: string; slug: string }`

### Story 5.2 — Insight category tags
**Acceptance criteria:**
- [ ] 4 category values: "Legal Update", "Client Alert", "Thought Leadership", "Publication"
- [ ] All 4 use same purple pill style — NO colour differentiation between categories
- [ ] `border-radius: 9999px` — same pill shape as PillButton
- [ ] `grep -r "blue\|green\|amber\|teal" src/components/home/InsightCard.module.css` → empty (purple only)

---

## Epic 6 — Accessibility and Performance

### Story 6.1 — WCAG compliance
**Acceptance criteria:**
- [ ] White text on `#621755` = 9.6:1 ✓ (AAA)
- [ ] Dark charcoal `#2b3d44` on white = 9.0:1 ✓
- [ ] Muted `#6b7280` on white = 4.6:1 ✓ (AA)
- [ ] Gold `#d0a56d` is NEVER used as text on white — 2.7:1 fails AA; `grep -r "color: var(--color-gold)" src/components --include="*.module.css"` → zero `color:` rules
- [ ] Focus ring: `outline: 2px solid var(--color-gold); outline-offset: 3px` on all interactive elements
- [ ] Skip-to-main link present and keyboard-functional
- [ ] `aria-label` on all icon-only links
- [ ] Descriptive `alt` text on all `<img>` tags
- [ ] Stat counters section: `aria-label="Firm statistics"` on section element

### Story 6.2 — Performance and QA gates
**Acceptance criteria:**
- [ ] `tsc --noEmit` exits 0; zero TypeScript errors
- [ ] `npm run build` exits 0; `/out` directory produced (static export)
- [ ] Lighthouse Performance ≥90, Accessibility ≥90
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty
- [ ] `grep -r "color: var(--color-gold)" src/components --include="*.module.css"` → empty (gold never as text)
- [ ] `grep -r "border-radius: 0" src/components/home/PracticeCard.module.css` → present (sharp practice cards)
- [ ] `grep -r "border-radius: 9999px" src/components/ui/PillButton.module.css` → present
- [ ] `grep -r "GoldCorner" src/components` → exactly 3 results
- [ ] Scroll listener: `{ passive: true }` option present
- [ ] `IntersectionObserver` for count-up: `observer.disconnect()` called after first trigger
- [ ] `grep -r "grayscale" src/components/home/LeaderCard.module.css` → present (hover effect)
