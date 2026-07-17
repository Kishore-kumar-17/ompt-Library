# 05 — Epics and Stories
## Top-Tier Indian Law Firm · bw_legal_platform_02
### NavLaw · Navy + Terracotta · DM Sans · Pill Buttons · Section-Aware Nav

---

## Epic 1 — Design System and Shell

### Story 1.1 — CSS tokens (7 variables)
**Acceptance criteria:**
- [ ] `globals.css` has exactly 7 `--color-*` tokens (NOT 8 — this is a 7-token system)
- [ ] `--color-navy: #002346`, `--color-terracotta: #B57560`, `--color-blue: #00539B`
- [ ] Comment on `--color-terracotta` explicitly states: `/* use only on elements ≥18px or font-weight ≥600 */`
- [ ] Terracotta on white = 3.1:1 — fails AA at small size; acceptable at ≥18px bold
- [ ] No hex values in any `.module.css` file; `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty

### Story 1.2 — DM Sans font
**Acceptance criteria:**
- [ ] DM Sans loaded via `next/font/google`, weights 300/400/500/600/700
- [ ] Applied as `--font-sans` on `<html>`
- [ ] `grep -r "Inter\|Poppins\|Plus_Jakarta_Sans\|Roboto" src/app/layout.tsx` → empty
- [ ] DevTools computed styles show DM Sans on every element — no fallback font active
- [ ] Lighthouse CLS: 0

### Story 1.3 — Section-aware sticky nav
**Acceptance criteria:**
- [ ] Height `72px`, `position: fixed`, full width
- [ ] Default state: `background: var(--color-surface)`, `border-bottom: 1px solid var(--color-border)`
- [ ] Dark state (when `[data-dark-section]` ≥30% in viewport): `background: rgba(0,35,70,0.95)`, `backdrop-filter: blur(8px)`
- [ ] Transition: `background 400ms ease`
- [ ] Logo and nav link text switch to white in dark state
- [ ] Mechanism: `IntersectionObserver` on `[data-dark-section]` elements — NOT scroll position
- [ ] `IntersectionObserver` cleanup on unmount (`observer.disconnect()`)
- [ ] Terracotta pill "Contact" CTA always visible right side
- [ ] Link hover: terracotta in both light and dark state

### Story 1.4 — PillButton component
**Acceptance criteria:**
- [ ] `border-radius: 9999px` on all variants — confirmed in DevTools
- [ ] `grep -r "border-radius: 8px\|border-radius: 4px\|border-radius: 6px" src/components/ui/PillButton.module.css` → empty
- [ ] Primary (terracotta bg): `background: var(--color-terracotta); color: rgb(255,255,255)`
- [ ] Secondary (terracotta border): transparent bg, terracotta border + text
- [ ] Ghost (for dark bg): white border, white text
- [ ] Sizes: `md` (44px height) and `sm` (38px height)
- [ ] Works as `<Link>` and `<button>` via `href` prop
- [ ] TypeScript: `PillButtonProps = { variant: 'primary' | 'secondary' | 'ghost'; size: 'md' | 'sm'; href?: string; children: React.ReactNode }`

### Story 1.5 — Footer
**Acceptance criteria:**
- [ ] `background: var(--color-navy)`
- [ ] `border-top: 3px solid var(--color-terracotta)` — terracotta top accent
- [ ] 4 columns: logo+tagline | Expertise | Offices (5 cities) | Connect
- [ ] Link hover: `color: var(--color-terracotta)`; transition `150ms ease`
- [ ] Responsive: 2-col tablet (≤768px), 1-col mobile (≤480px)

---

## Epic 2 — Hero Tabs

### Story 2.1 — Full-viewport tabbed hero
**Acceptance criteria:**
- [ ] `min-height: 100vh`, `background: var(--color-navy)`, `data-dark-section` attribute — nav switches dark over this
- [ ] Geometric ellipse SVG pattern overlay, right side, terracotta at ~5% opacity
- [ ] 4 tabs: "Energy" / "Expertise" / "Execution" / "Unmatched"
- [ ] Tab bar: horizontal, `position: sticky` or absolute, above content area

### Story 2.2 — Tab interaction and ARIA
**Acceptance criteria:**
- [ ] Tab bar: `role="tablist"`
- [ ] Each tab: `role="tab"`, `aria-selected="true|false"`, `aria-controls="{panelId}"`
- [ ] Tab panel: `role="tabpanel"`, `aria-labelledby="{tabId}"`
- [ ] Keyboard: left/right arrow keys cycle through tabs (`onKeyDown` handler)
- [ ] Active tab: white text, `font-weight: 600`, `border-bottom: 3px solid var(--color-terracotta)`
- [ ] Inactive tabs: white at 50% opacity, `font-weight: 400`
- [ ] Tab content switches with Framer Motion `AnimatePresence` fade 200ms
- [ ] `prefers-reduced-motion`: instant switch, no fade animation
- [ ] TypeScript: `type TabId = 'energy' | 'expertise' | 'execution' | 'unmatched'`; `TabContent = { id: TabId; label: string; headline: string; subtitle: string; body: string }`

### Story 2.3 — Tab content
**Acceptance criteria:**
- [ ] H1: `clamp(2.75rem, 5.5vw, 4.5rem)`, `font-weight: 700`, `color: var(--color-terracotta)` — NOT white
- [ ] Subtitle: `1.25rem`, `font-weight: 300`, white at 90% opacity
- [ ] Body: `1rem`, `font-weight: 400`, white at 70% opacity
- [ ] CTA: arrow text link ("Discover →"), white by default, terracotta on hover
- [ ] CTA is NOT a PillButton — it is an inline text `<a>` or `<Link>` with arrow
- [ ] `grep -r "PillButton" src/components/sections/HeroTabs.tsx` → empty on the arrow CTA element

---

## Epic 3 — Credentials and Practice Areas

### Story 3.1 — Credentials strip
**Acceptance criteria:**
- [ ] White background
- [ ] 4 stat blocks in a row: "Est. 1997", "500+", "5", "17"
- [ ] Each block: `border-left: 4px solid var(--color-terracotta); padding-left: 20px`
- [ ] Value: `font-size: 3rem; font-weight: 700; color: var(--color-navy)` — NO count-up animation (values are strings/already formatted)
- [ ] Label: `font-size: 0.875rem; font-weight: 400; color: var(--color-muted)`
- [ ] Desktop: 4-col; tablet (≤768px): 2-col
- [ ] TypeScript: `Credential = { value: string; label: string }` — `CREDENTIALS` const

### Story 3.2 — Practice areas section (dark navy)
**Acceptance criteria:**
- [ ] `background: var(--color-navy)`, `data-dark-section` attribute present
- [ ] Terracotta dot (6px circle: `width: 6px; height: 6px; border-radius: 50%; background: var(--color-terracotta)`) + label above section heading
- [ ] Section heading: white, DM Sans 700
- [ ] 17 practice areas in grid: 4-col desktop, 3-col tablet (≤1024px), 2-col mobile (≤640px)
- [ ] Cards: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px`
- [ ] Card titles: UPPERCASE via `text-transform: uppercase` in CSS — NOT stored uppercase in data
- [ ] Card hover: background and border change, `transition: 200ms ease`
- [ ] "→" arrow links: `color: var(--color-terracotta)`, gap increases on hover
- [ ] TypeScript: `PracticeArea = { name: string; slug: string; description: string }`

---

## Epic 4 — People

### Story 4.1 — Filter bar
**Acceptance criteria:**
- [ ] Name search: `<input type="search">`, pill-shaped (`border-radius: 9999px`), live filtering `onChange` (no submit button)
- [ ] Office `<select>`: "All Offices" + 5 cities (Mumbai, Delhi, Bangalore, Chennai, Pune)
- [ ] Practice `<select>`: "All Practices" + all 17 practice areas
- [ ] Reset button: clears all 3 filters simultaneously
- [ ] Client-side filter using `useMemo`; `grep -r "useMemo" src/components/home/PeopleDirectory.tsx` → present
- [ ] ARIA live region: `<p aria-live="polite" className="sr-only">{n} people found</p>` updates on filter change

### Story 4.2 — People cards
**Acceptance criteria:**
- [ ] Photo: square, `border-radius: 4px`, FULL COLOR — `grep -r "grayscale" src/components/home/PeopleCard.module.css` → empty
- [ ] Name: `color: var(--color-navy); font-weight: 600; font-size: 1rem`
- [ ] Role: `color: var(--color-terracotta); text-transform: uppercase; font-size: 0.8rem`
- [ ] Practice + office: `color: var(--color-muted); font-size: 0.8rem`
- [ ] Quote: italic, `border-left: 2px solid var(--color-terracotta); padding-left: 12px`
- [ ] Card hover: `box-shadow: 0 4px 20px rgba(0,35,70,0.10)`
- [ ] Card: `border-radius: 10px` — NOT 0, NOT 4px
- [ ] TypeScript: `Lawyer = { id: string; name: string; role: string; office: string; practice: string; quote: string; photoUrl: string }`

---

## Epic 5 — Insights

### Story 5.1 — Insights grid
**Acceptance criteria:**
- [ ] 3-column grid, `gap: 24px`; 6 insights from `INSIGHTS` const
- [ ] Cards: `border: 1px solid var(--color-border); border-radius: 10px`
- [ ] Image: 16:9 aspect ratio at top of card
- [ ] Category pill: `background: var(--color-blue)` (#00539B — NOT terracotta), white text, `border-radius: 9999px`
- [ ] `grep -r "color-terracotta" src/components/home/InsightCard.module.css` → zero results on category pill (blue only)
- [ ] Date: `color: var(--color-muted)`, `font-size: 0.8125rem`
- [ ] Title: `font-weight: 600; font-size: 1.125rem`, 2-line clamp
- [ ] "Read more →": `color: var(--color-terracotta)`
- [ ] TypeScript: `Insight = { id: string; category: string; date: string; title: string; imageUrl: string; slug: string }`

---

## Epic 6 — Accessibility and Performance

### Story 6.1 — WCAG compliance
**Acceptance criteria:**
- [ ] White on navy `#002346` = 15.3:1 ✓ (AAA)
- [ ] Muted `#6B6B6B` on white = 5.7:1 ✓ (AA)
- [ ] Terracotta `#B57560` NOT used on elements under 18px / weight < 600; documented in token comment
- [ ] Terracotta on navy (hero tabs, practice arrows) = 4.6:1 — acceptable for large text
- [ ] Focus ring: `outline: 2px solid var(--color-terracotta); outline-offset: 3px` on all interactive elements
- [ ] Skip to main: `<a href="#main-content" className="sr-only focus:not-sr-only">` present
- [ ] All `<img>` have descriptive non-empty `alt` text

### Story 6.2 — Performance and QA gates
**Acceptance criteria:**
- [ ] `tsc --noEmit` exits 0; zero TypeScript errors
- [ ] `npm run build` exits 0; `/out` directory produced (static export)
- [ ] Lighthouse Performance ≥90, Accessibility ≥90
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty
- [ ] `IntersectionObserver` on section-aware nav: `disconnect()` called on unmount
- [ ] `useMemo` on people filter — `grep -r "useMemo" src/components/home/PeopleDirectory.tsx` → present
- [ ] `grep -r "border-radius: 8px\|border-radius: 4px" src/components/ui/PillButton.module.css` → empty
- [ ] `grep -r "grayscale" src/components/home/PeopleCard.module.css` → empty (full color photos)
- [ ] `grep -r "color-terracotta" src/components/home/InsightCard.module.css` → zero on `.categoryPill`
