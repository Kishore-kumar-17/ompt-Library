# 05 — Epics and Stories
## Indian Web Agency Directory · bw_service_02
### AgencyHub · Indigo + Amber · Space Grotesk · 8px cards / 4px chips

---

## Epic 1 — Design System Foundation

**Goal:** 8-token colour system, Space Grotesk 400/500/600 only, amber on dark text (never white), `formatBudgetRange` as sole price surface, static export.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens: `--color-indigo`, `--color-amber`, `--color-dark`, `--color-white`, `--color-surface`, `--color-muted`, `--color-border`, `--color-footer`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 1.2 | Space Grotesk 400/500/600 | `next/font/google` with `weight: ['400','500','600']`. `--font-sans` on `<html>`. `grep -r "Inter\|Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx` → empty. |
| 1.3 | Button — 3 variants | `indigo` (white text), `outlineIndigo` (indigo border+text), `ghost` (transparent, for dark bg). No `font-weight: 700`. `grep -r "font-weight: 700" src --include="*.module.css"` → empty. |
| 1.4 | TierBadge — Premier = amber + dark text | `Premier`: `background: var(--color-amber); color: var(--color-dark)`. NOT white on amber (fails contrast). `Expert`: indigo fill + white. `Certified`: indigo outline. `grep -r "color-white" src/components/ui/TierBadge.module.css` → zero `color:` rules in `.premier`. |
| 1.5 | StarRating — amber star, dark value | Amber star icon: decorative, `color: var(--color-amber)`. Rating number: `color: var(--color-dark)`. Count: `color: var(--color-muted)`. Amber text on white fails AA — amber is background/icon only. |
| 1.6 | formatBudgetRange | `formatBudgetRange({ budgetMin: 200000, budgetMax: 1000000 })` → `'₹2L – ₹10L'`. `formatBudgetRange({ budgetMin: 5000000, budgetMax: null })` → `'₹50L+'`. No direct `budgetMin` reference in component files. |
| 1.7 | filterAgencies | `filterAgencies(AGENCIES, { tier: 'Premier' })` → featured first. `filterAgencies(AGENCIES, { search: 'studio' })` → 2 results. Featured agencies (ag-01/02/03) always sorted first. |
| 1.8 | TypeScript: Agency | `type AgencyTier = 'Certified' \| 'Expert' \| 'Premier'`. `Agency = { id: string; name: string; tagline: string; tier: AgencyTier; specializations: string[]; city: string; budgetMin: number; budgetMax: number \| null; budgetCategory: string; teamSize: number; projectsCompleted: number; rating: number; reviewCount: number; featured: boolean }` |
| 1.9 | TypeScript: AgencyFilterState | `AgencyFilterState = { search: string; specialization: string; budget: string; city: string; tier: string }` |
| 1.10 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out`. |

---

## Epic 2 — Navigation

**Goal:** Sticky nav, indigo logo, ghost "List Your Agency" CTA. `'use client'` for scroll shadow only.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav + scroll shadow | `background: rgb(255,255,255)`. Scroll shadow class added via `useEffect` when `scrollY > 0`. `position: sticky; top: 0; z-index: 100`. |
| 2.2 | Indigo logo | "AgencyHub" text: `color: var(--color-indigo)`. `font-weight: 600`. |
| 2.3 | Nav links | "Browse", "How It Works", "Pricing", "Blog". `color: var(--color-dark)`. Hover: `color: var(--color-indigo)`. |
| 2.4 | "List Your Agency" CTA | `ghost` variant (or `outlineIndigo`), `border-radius: 8px`. Positioned right. |
| 2.5 | ARIA | `<nav aria-label="Main navigation">`. All links keyboard-focusable. |

---

## Epic 3 — Hero Section

**Goal:** Centered hero, white background, search bar wired to filter. No yellow on white.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Centered layout | Centered text + search bar. White background. `clamp(2rem, 4vw, 3.25rem)` H1. `color: var(--color-dark)`. |
| 3.2 | Hero search bar | `<input type="search">` + "Search Agencies" `indigo` button. Full-width on mobile. `border-radius: 8px` on input. |
| 3.3 | No amber text on white | `grep -r "color: var(--color-amber)" src/components/layout\|sections/Hero` → empty. Amber may appear as star icon only. |

---

## Epic 4 — Agency Filter + Grid

**Goal:** Text search (name OR tagline), specialization chips (single-select), 3 selects, `useMemo`, ARIA live, empty state.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | Text search — name or tagline | `<input type="search">` with Lucide Search icon. Case-insensitive, trims whitespace. `filters.search = 'studio'` → 2 agencies. `filters.search = 'SAAS'` → 3 agencies (case-insensitive). |
| 4.2 | Specialization chips — 7 incl. All | "All" (empty value) + 6 specializations. Single-select. Active: `background: var(--color-indigo); color: rgb(255,255,255)` (6.29:1 ✓). Clicking active chip deselects back to "All". |
| 4.3 | Budget, City, Tier selects | 3 `<select>` elements with "All" option (empty string). Each labeled with `<label htmlFor>`. Controlled via `AgencyFilterState`. |
| 4.4 | useMemo filter | `const filtered = useMemo(() => filterAgencies(AGENCIES, filters), [filters])`. `grep -r "useMemo" src/components/home/AgencyFilterBar.tsx` → present. `grep -r "\.sort(" src/components/home/AgencyFilterBar.tsx` → empty (sort in utility only). |
| 4.5 | ARIA live region | `<div aria-live="polite" className="sr-only">{count} agencies found</div>` updates on every filter change. |
| 4.6 | Empty state | `filtered.length === 0` → "No agencies match your search. Try adjusting your filters." Conditional JSX, NOT `display: none`. |
| 4.7 | Client boundary | `AgencyFilterBar.tsx` has `'use client'`. `page.tsx` has NO `'use client'`. `grep "'use client'" src/app/page.tsx` → empty. |

---

## Epic 5 — Agency Card

**Goal:** Portfolio thumbnail with conditional Featured strip, TierBadge + StarRating, SpecTags, `formatBudgetRange` only for budget display.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | Portfolio thumbnail | Placeholder div: `height: 180px`, `background: linear-gradient(...)` from tokens. `border-radius: 8px 8px 0 0`. |
| 5.2 | Featured strip — conditional JSX | `{agency.featured && <span className={styles.featuredStrip}>Featured</span>}` at top of card. Present on ag-01, ag-02, ag-03 only. Absent from DOM (not `display: none`) on others. `grep -r "display: none" src/components/home/AgencyCard.module.css` → empty. |
| 5.3 | TierBadge + StarRating rendered on every card | Both components present. Premier agencies (ag-01, ag-03): amber badge + dark text. Rating value always dark text. |
| 5.4 | SpecTag row | `agency.specializations.map(s => <SpecTag key={s} text={s} />)`. All specs shown, no truncation. `background: var(--color-surface); border: 1px solid var(--color-border)`. |
| 5.5 | Budget via formatBudgetRange only | Stats row: `{agency.projectsCompleted} projects · {agency.teamSize} team · {formatBudgetRange(agency)}`. `grep -r "budgetMin\b\|budgetMax\b" src/components/home/AgencyCard.tsx` → empty. |
| 5.6 | Card styling | `border-radius: 8px`. `border: 1px solid var(--color-border)`. `box-shadow` on hover. |

---

## Epic 6 — Trust Bar

**Goal:** Dark section with 4 stats, Framer Motion stagger, `prefers-reduced-motion` respected.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | Dark background, 4 stats | `background: var(--color-footer)`. 4 stats: "500+ Agencies Listed", "₹500 Cr+ Projects Delivered", "50+ Cities", "98% Client Satisfaction". White text on dark = 19:1 ✓✓. Lucide: Building2, Briefcase, MapPin, ThumbsUp. |
| 6.2 | Framer Motion stagger | `whileInView` with `viewport={{ once: true }}`. Each stat: `delay: index * 0.1`. `@media (prefers-reduced-motion: reduce) { .trustStat { animation: none; opacity: 1; transform: none; } }` in `globals.css`. |

---

## Epic 7 — QA and Performance

**Goal:** Directory-specific guards. No amber text on white. Budget display encapsulated.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any`. |
| 7.2 | Build succeeds | `npm run build` exits 0. `/out` produced. |
| 7.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 7.4 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 7.5 | No white on amber | `grep -r "color-white.*amber\|color: var(--color-white)" src/components/ui/TierBadge.module.css` → zero `color:` rules in `.premier`. |
| 7.6 | Budget encapsulated | `grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"` → empty (only in types and utility). |
| 7.7 | Space Grotesk only | `grep -r "Inter\b\|Poppins\|DM_Sans\|Nunito" src` → empty. |
| 7.8 | No font-weight 700 | `grep -r "font-weight: 700" src --include="*.module.css"` → empty. Max weight 600. |
| 7.9 | No 50% radius | `grep -r "border-radius: 50%" src --include="*.module.css"` → empty. |
| 7.10 | Reduced motion | `prefers-reduced-motion: reduce` → Framer Motion stagger disabled. |
