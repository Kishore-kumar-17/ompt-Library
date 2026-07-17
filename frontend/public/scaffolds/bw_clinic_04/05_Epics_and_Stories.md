# 05 — Epics and Stories
## Modern Indian Diagnostic Marketplace · bw_clinic_04
### VitalCheck · Dark Theme · Pink + Dark · Inter · 8px/16px/24px Radius

---

## Epic 1 — Design System Foundation

**Goal:** Dark colour system, Inter 400/600/700, 8px buttons / 16px package cards / 24px category pills, static export, glassmorphism only on PackageCard.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 1.2 | Inter 400 + 600 + 700 | `next/font/google` with `weight: ['400','600','700']`. Computed font-family = Inter in DevTools. No Roboto, Lato, Nunito. |
| 1.3 | Button — 8px, 3 variants | `primary` (pink bg, dark text), `outlineWhite` (white border+text, for dark bg), `outlineLight` (dark border+text, for light bg). `border-radius: 8px` on all three. |
| 1.4 | Primary button — dark text on pink | DevTools `color` on `.primary` = `rgb(21,23,28)` (near-black). NOT `rgb(255,255,255)`. Pink on white = 3.55:1 fails AA — dark text on pink = 5.27:1 passes. |
| 1.5 | TypeScript types | `ServiceCategory`, `HealthPackage`, `ProcessStep`, `TrustSignal`, `Testimonial` all defined. All enums as union types. `tsc --noEmit` exits 0. |
| 1.6 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out` directory. |

---

## Epic 2 — Navigation

**Goal:** Dark sticky nav with pink logo and "Book Now" CTA using dark text on pink (contrast requirement).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | Dark nav background | SiteNav `background-color: rgb(21,23,28)` in DevTools. `position: sticky; top: 0; z-index: 100`. `border-bottom: 1px solid var(--color-border)`. |
| 2.2 | Logo in pink | "VitalCheck" logo text: computed `color = var(--color-pink)` (`rgb(255,49,109)`). `font-weight: 700`. |
| 2.3 | Nav links white | Link text: `color: rgb(255,255,255)`. Hover: `color: var(--color-pink)`. Transition `150ms ease`. |
| 2.4 | Location pill | Location indicator: `border-radius: 24px`, muted text, `border: 1px solid var(--color-border)`. Dark background. |
| 2.5 | "Book Now" — dark text | "Book Now" button: `primary` variant, `border-radius: 8px`, computed `color = rgb(21,23,28)`. NOT white text. |
| 2.6 | No emergency link | `grep -r "Emergency\|#DC2626\|emergency" src/components/layout` → empty. Diagnostic platform — no emergency UX. |
| 2.7 | No doctor search | No `<input>` or specialty `<select>` in nav. `grep -r "specialty\|doctor-search" src/components/layout/SiteNav" → empty. |

---

## Epic 3 — Hero Section

**Goal:** Dark hero with aurora overlay, pink eyebrow, and 4-item stats bar.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Dark bg + aurora overlay | HeroSection: dark `background: var(--color-dark)` with faint radial gradient pink/teal aurora tint via `::before` pseudo-element. |
| 3.2 | Pink eyebrow | Eyebrow text: computed `color = rgb(255,49,109)`. `text-transform: uppercase`. `letter-spacing: 0.12em`. `font-weight: 600`. |
| 3.3 | White headline | H1: Inter 700, `color: rgb(255,255,255)`, `clamp(2.5rem, 5vw, 4rem)`. NOT navy. NOT pink. |
| 3.4 | Muted subheading | Subheading: `color: var(--color-muted)` (`rgb(136,142,158)`). |
| 3.5 | Two CTAs | "Explore Packages" (`primary`, dark text on pink) AND "View Tests" (`outlineWhite`). Same height. Side by side desktop; stacked mobile. |
| 3.6 | Stats bar | 4 items visible: "500+ Tests", "24hr Reports", "Home Collection", "NABL Certified". `border-top: 1px solid var(--color-border)` divider above stats. |
| 3.7 | TypeScript: Stat | `Stat = { label: string; value: string }` — stats sourced from `HERO_STATS` const. |

---

## Epic 4 — Package Browsing (CategoryTabs)

**Goal:** Tab-filtered package grid with active-tab contrast enforced (dark text on pink, NOT white).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | 9 category tabs | "All" + 8 category tabs visible: `border-radius: 24px` on all pills. Sourced from `SERVICE_CATEGORIES` const. |
| 4.2 | Active tab — pink bg, dark text | Active: `background = rgb(255,49,109)`, computed `color = rgb(21,23,28)`. Contrast 5.27:1 ✓. NOT white text on pink. |
| 4.3 | Inactive tab — surface bg, white | Inactive: `background = var(--color-surface)` (dark surface), `color = rgb(255,255,255)`. |
| 4.4 | "All" tab default | On page load, "All" is active tab, all 8 packages shown in grid. |
| 4.5 | Tab filtering | "Full Body" → 1 card. "Diabetes" → 1 card. "All" → 8 cards. Filter applied via `useMemo`. |
| 4.6 | useMemo filtering | `const filtered = useMemo(() => packages.filter(p => activeTab === 'All' \|\| p.category === activeTab), [activeTab])`. |
| 4.7 | No scrollbar on tab row | `.tab-row { scrollbar-width: none; } .tab-row::-webkit-scrollbar { display: none; }` applied. |
| 4.8 | Responsive grid | 3 columns desktop → 2 columns tablet (≤768px) → 1 column mobile (≤640px). CSS Grid. |
| 4.9 | TypeScript: ServiceCategory | `type ServiceCategory = 'Full Body' \| 'Diabetes' \| 'Heart' \| 'Thyroid' \| 'Kidney' \| 'Vitamin' \| 'Senior' \| 'Women' \| 'All'` |

---

## Epic 5 — Package Cards

**Goal:** Glassmorphism cards (only here), `<del>` strikethrough, conditional "POPULAR" badge, dark text on pink buttons.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | Glassmorphism effect | `backdrop-filter: blur(12px)` visible in DevTools on PackageCard. `background: rgba(255,255,255,0.06)`. |
| 5.2 | Card radius 16px | `border-radius: 16px` on PackageCard in DevTools. NOT 8px, NOT 12px. |
| 5.3 | "POPULAR" badge — conditional JSX | "Complete Health Profile" and "Senior Wellness" (`popular: true`): badge present in DOM. All others (`popular: false`): badge absent (not `display:none`). |
| 5.4 | Strikethrough — `<del>` tag | DevTools Elements: `<del>₹{originalPrice}</del>`. NOT `<span style="text-decoration: line-through">`. `grep -r "line-through" src/components/PackageCard` → empty. |
| 5.5 | Discounted price in pink | Price `<strong>`: computed `color = rgb(255,49,109)`. |
| 5.6 | Original price muted + struck | `<del>` text: `color = var(--color-muted)`. `text-decoration: line-through` inherited from `<del>`. |
| 5.7 | Discount badge | `"{discountPercent}% off"` chip visible on each card. |
| 5.8 | Tests count | `"{testsIncluded} Tests Included"` visible. TypeScript: `HealthPackage.testsIncluded: number`. |
| 5.9 | 3 key tests | Exactly 3 `keyTests` shown with Lucide `CheckCircle` icons in pink. Sourced from `package.keyTests: string[]`. |
| 5.10 | Turnaround time | `"{turnaroundHours}hr Reports"` with Lucide `Clock` icon. TypeScript: `HealthPackage.turnaroundHours: number`. |
| 5.11 | Home collection — conditional | All 8 packages have `homeCollection: true` → "Home Collection" shown on all. If `false` → text absent from DOM. Conditional JSX. |
| 5.12 | "Book Now" — dark text | Button: `primary` variant, computed `color = rgb(21,23,28)`. NOT white. |
| 5.13 | Hover pink glow | `:hover { box-shadow: 0 0 24px rgba(255,49,109,0.15) }` visible in DevTools on hover. |
| 5.14 | Server component | No `'use client'` in `PackageCard.tsx`. `CategoryTabs.tsx` has `'use client'`. |
| 5.15 | TypeScript: HealthPackage | `HealthPackage = { id: string; name: string; category: ServiceCategory; testsIncluded: number; keyTests: string[]; originalPrice: number; discountedPrice: number; discountPercent: number; turnaroundHours: number; homeCollection: boolean; popular: boolean }` |

---

## Epic 6 — Supporting Sections

**Goal:** HowItWorks on light bg (contrast reversal), WhyChooseUs on dark bg, testimonials text-only.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | HowItWorks — light bg | `background = rgb(242,244,248)` (light-bg token). NOT dark. NOT white. |
| 6.2 | HowItWorks — dark text | All text in HowItWorks: `color = rgb(21,23,28)` (dark-text). NOT white. Contrast on light bg ≥ 7:1 ✓. |
| 6.3 | Step circles — pink | Numbered circles: `background = rgb(255,49,109)`, dark text inside, `border-radius: 50%`, 40×40px. |
| 6.4 | HowItWorks — 3 steps | Steps 1, 2, 3 all visible with title + description + Lucide icon. Sourced from `PROCESS_STEPS` const. |
| 6.5 | WhyChooseUs — dark bg | `background = rgb(21,23,28)`. Trust cards: `background = var(--color-surface)` (dark surface). No glassmorphism on trust cards. |
| 6.6 | WhyChooseUs — 4 trust signals | WHO certified, NABL, 24hr Reports, Home Collection all visible. Sourced from `TRUST_SIGNALS` const. |
| 6.7 | Trust cards — no glassmorphism | `grep -r "backdrop-filter" src/components/WhyChooseUs` → empty. Solid `var(--color-surface)` background only. |
| 6.8 | Testimonials — light bg | `background = rgb(242,244,248)`. |
| 6.9 | Testimonials — 3 text-only | 3 cards with quote + patient name + package. No `<img>` tags. `grep -r "<img" src/components/sections/Testimonials` → empty. |
| 6.10 | Star rating — amber inline | Star SVG with `fill="#F59E0B"` (amber) as inline attribute — not a CSS class. Not `<img>`. |
| 6.11 | TypeScript: TrustSignal | `TrustSignal = { label: string; description: string; icon: LucideIcon }`; `ProcessStep = { step: number; title: string; description: string; icon: LucideIcon }` |

---

## Epic 7 — Footer

**Goal:** Dark footer consistent with nav. Pink hover on links. Pink logo.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | Dark background | Footer `background = rgb(21,23,28)` (`var(--color-dark)`). Same as nav. `border-top: 1px solid var(--color-border)`. |
| 7.2 | Pink logo | "VitalCheck" text: `color = var(--color-pink)`. Same as nav logo. |
| 7.3 | 4 columns | Grid: Brand+tagline \| Tests \| Services \| Company. Collapses on mobile. |
| 7.4 | Links hover pink | Footer links `:hover { color: var(--color-pink) }`. Transition `150ms ease`. |
| 7.5 | Copyright | `© {year} VitalCheck Health Technologies Pvt. Ltd.` — `new Date().getFullYear()` for year. `color: var(--color-muted)`. |

---

## Epic 8 — QA and Performance

**Goal:** All dark-platform traps verified. No cross-contamination from other clinic builds.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | TypeScript clean | `tsc --noEmit` exits 0. Zero errors. |
| 8.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced. |
| 8.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 8.4 | No hex in module.css | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 8.5 | rgba only in PackageCard | `grep -r "rgba(" src --include="*.module.css"` → only `PackageCard.module.css` (glassmorphism + glow). |
| 8.6 | No 9999px | `grep -r "9999px" src` → empty. |
| 8.7 | Shadow only PackageCard | `grep -r "box-shadow" src/components --include="*.module.css"` → only `PackageCard.module.css`. |
| 8.8 | Inter only | Computed font-family = Inter throughout. `grep -r "Lato\|Roboto\|Nunito" src` → empty. |
| 8.9 | No `<img>` in testimonials | `grep -r "<img" src/components/sections/Testimonials` → empty. |
| 8.10 | All interactive elements labeled | CategoryTabs `<button>` elements have `aria-label` or visible text. All `<input>` have associated `<label>`. |
| 8.11 | Prices formatted INR | All prices render as `₹X,XXX` with Indian locale. `toLocaleString('en-IN')` used — not hardcoded comma placement. |
| 8.12 | Reduced motion | `prefers-reduced-motion: reduce` disables Framer Motion. |
| 8.13 | No doctor entities | `grep -r "Doctor\|consultMode\|specialty.*doctor" src/types` → empty. This is diagnostics, not doctor discovery. |
| 8.14 | No emergency content | `grep -r "Emergency\|#DC2626\|emergency" src` → empty. |
