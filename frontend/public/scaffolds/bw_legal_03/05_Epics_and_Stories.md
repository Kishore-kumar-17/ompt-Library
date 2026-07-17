# 05 — Epics and Stories
## Indian CA / Tax Filing Service · bw_legal_platform_03
### ClearFiling · Dark Theme · Blue + Dark · Plus Jakarta Sans · 4px buttons / 8px cards

---

## Epic 1 — Design System Foundation

**Goal:** Dark colour system, Plus Jakarta Sans 400/500/600/700/800, 4px buttons / 8px cards, static export, no radius inconsistencies.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. No rgba in module files. |
| 1.2 | Plus Jakarta Sans 400–800 | `next/font/google` with `weight: ['400','500','600','700','800']`. `--font-sans` on `<html>`. Computed font-family = Plus Jakarta Sans. No system-ui, no serif. |
| 1.3 | Button — 4px, 2 variants | `primary` (blue bg, white text), `secondary` (transparent, blue border+text). `border-radius: 4px` on both in DevTools. `fullWidth` prop available. `href` prop renders `<Link>`. No 9999px. |
| 1.4 | Primary button — white text on blue | Computed `color` on `.primary` = `rgb(255,255,255)`. Blue on dark bg = acceptable. Blue on white = 3.07:1 (fails AA) — blue is only used on dark backgrounds here. |
| 1.5 | TypeScript types | `FilingTier`, `TrustLogo`, `Stat`, `ExpertBlock`, `ProcessStep`, `CertBadge` all defined. `tsc --noEmit` exits 0. |
| 1.6 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out` directory. |

---

## Epic 2 — Navigation

**Goal:** Always-dark sticky nav — no scroll toggle, no transparency state. Server component.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | Always-dark nav | `background: var(--color-darker)` at all scroll positions. No scroll event listener. DevTools: `background-color: rgb(13,13,13)`. `position: sticky; top: 0; z-index: 100`. |
| 2.2 | Nav layout | Logo left. Links center ("Tax Filing", "GST", "Business Registration", "About"). "File Now" CTA right. Height exactly 64px. `border-bottom: 0.5px solid var(--color-border)`. |
| 2.3 | Nav links — white | Links: `color: rgb(255,255,255)`. Hover: `color: var(--color-blue)`. Transition `150ms ease`. |
| 2.4 | "File Now" CTA | Blue bg, `border-radius: 4px`, height 40px. Renders as `<Link>` (not `<button>`). Computed `color: rgb(255,255,255)`. |
| 2.5 | Server component | No `'use client'` in `StickyNav.tsx`. `grep "'use client'" src/components/layout/StickyNav.tsx` → empty. |
| 2.6 | No white sections triggered | Nav never changes to white at any scroll position. `grep -r "background.*white\|#fff\|#FFF" src/components/layout/StickyNav` → empty. |

---

## Epic 3 — Hero Section

**Goal:** Dual-path hero with eyebrow, trust row, and two equal-weight CTAs. Dark background throughout.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Eyebrow | "India's #1 Tax Platform" text: `color: var(--color-blue)`, `text-transform: uppercase`, `letter-spacing: 0.16em`, `font-weight: 600`. |
| 3.2 | H1 | Plus Jakarta Sans weight 800, `clamp(2.5rem, 5vw, 3.75rem)`, `color: var(--color-text)`. NOT navy. NOT white-only — must use design token. |
| 3.3 | Subheading | `color: var(--color-muted)`, `font-weight: 400`, max-width 600px. |
| 3.4 | Trust row | "⭐ 4.9/5 | 45K+ Reviews | ₹5,346 Cr+ Refunds Delivered" all visible in single row. Wraps on mobile ≤480px. Sourced from `HERO_TRUST` const. |
| 3.5 | Dual CTAs | "File Yourself" (`primary`, blue bg, white text) AND "Get CA Help" (`secondary`, blue outline). Same height 44px. Same `border-radius: 4px`. Side by side desktop; stacked mobile ≤480px. |
| 3.6 | Dark background | `background: var(--color-dark)`. `min-height: 80vh`. No gradient, no image bg, no white. |
| 3.7 | TypeScript: HeroTrust | `HeroTrust = { rating: string; reviews: string; refunds: string }` — trust row sourced from const, not JSX strings. |

---

## Epic 4 — Trust Strip

**Goal:** CSS-only marquee logo strip + certification badges. No JavaScript animation. Monochrome logos.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | CSS marquee | 6 logos scroll via `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`. No `requestAnimationFrame`, no `setInterval`. |
| 4.2 | Seamless loop | Array duplicated: `[...TRUST_LOGOS, ...TRUST_LOGOS]`. No visible jump at loop boundary. |
| 4.3 | Monochrome logos | All logos: `filter: brightness(0) invert(1)` — white on dark. `grep -r "filter" src/components/sections/TrustStrip` → only this filter result. No full-colour logos. |
| 4.4 | Marquee accessibility | Wrapper: `aria-label="Trusted by leading Indian companies"`. `@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }` in module CSS. |
| 4.5 | No scrollbar on marquee | `.marquee-wrapper { overflow: hidden }` — not `overflow-x: auto`. No scrollbar visible. |
| 4.6 | Certification badges | ISO 27001, SSL 128-bit, SOC 2 — all 3 render below logo strip. Each: icon + name + subtitle. `background: var(--color-surface)`, `border-radius: 8px`. |
| 4.7 | TypeScript: TrustLogo | `TrustLogo = { name: string; svgUrl: string }` — `TRUST_LOGOS` const. `CertBadge = { name: string; subtitle: string; icon: LucideIcon }`. |

---

## Epic 5 — Service Tier Cards

**Goal:** 3 pricing cards with checklist features, "Recommended" badge above card, no drop shadows.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | All 3 tiers shown | Self File (Free / ₹0), Expert Assist (₹999/year), CA Filing (₹1,999/year) — all visible. No "Contact for pricing". Sourced from `FILING_TIERS` const. |
| 5.2 | Card base styling | All cards: `background: var(--color-surface)`, `border: 0.5px solid var(--color-border)`, `border-radius: 8px`. No `box-shadow`. |
| 5.3 | Recommended card highlight | CA Filing (`recommended: true`): `border-color: var(--color-blue)`, `background: var(--color-blue-tint)`. Others: default surface. |
| 5.4 | "Recommended" badge position | Badge sits ABOVE card: `position: absolute; top: -12px; left: 50%; transform: translateX(-50%)` on wrapper `position: relative`. Not inside card padding. |
| 5.5 | Feature checklist | `included: true` → blue Lucide `Check` icon. `included: false` → grey Lucide `Minus` icon. NOT text "✓" or "—". `grep -r "✓\|—\|text-decoration: line-through" src/components/ServiceTierCard` → empty. |
| 5.6 | Price styling | `font-weight: 800; color: var(--color-text)`. Tier name: `text-transform: uppercase; color: var(--color-muted)`. |
| 5.7 | Card CTAs | CA Filing: `variant="primary"`. Others: `variant="secondary"`. All: `fullWidth`. All: `border-radius: 4px` (button, not card). |
| 5.8 | Server component | No `'use client'` in `ServiceTiers.tsx`. `grep "'use client'" src/components/sections/ServiceTiers.tsx` → empty. |
| 5.9 | TypeScript: FilingTier | `FilingTier = { id: string; name: string; price: number | 'free'; billingPeriod: string; features: { label: string; included: boolean }[]; recommended: boolean }` |

---

## Epic 6 — How It Works

**Goal:** 3 linear steps, blue circles, connector line between circles, dark background.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | 3 steps render | "Upload Documents", "CA Reviews & Prepares", "File & Get Refund" — all visible with title + description. Sourced from `PROCESS_STEPS` const. |
| 6.2 | Blue numbered circles | Each step: `width: 40px; height: 40px; border-radius: 50%; background: var(--color-blue)`. Number inside: `color: rgb(255,255,255)`, `font-weight: 700`. |
| 6.3 | Blue connector line | `height: 1px; background: rgba(22,120,251,0.3)` between circles on desktop (≥768px). `display: none` on mobile. NOT yellow (yellow is bw_legal_04 distinguisher). |
| 6.4 | Step typography | Title: `color: var(--color-text); font-weight: 600`. Description: `color: var(--color-muted); font-weight: 400`. |
| 6.5 | TypeScript: ProcessStep | `ProcessStep = { step: number; title: string; description: string; icon: LucideIcon }` — sourced from `PROCESS_STEPS` const. |

---

## Epic 7 — Stats Row

**Goal:** Count-up animation on first scroll entry. Fires exactly once. Decimal values preserved.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | 4 stats present | ₹5,346 Cr+, 8M+ Returns Filed, 99.9% Accuracy, 4.9★ Rating — all 4 visible with labels. Sourced from `STATS` const. |
| 7.2 | Count-up animation | Numbers count from 0 to final value over ~1,000ms with `ease-out` cubic. `IntersectionObserver` threshold `0.5`. |
| 7.3 | Fires once only | Scroll away and back — numbers do NOT reset. `observer.disconnect()` called after first trigger. `started.current` ref prevents re-fire. |
| 7.4 | Decimal preservation | 4.9 renders as "4.9", NOT "5". 99.9 renders as "99.9", NOT "100". `Math.round(x * 10) / 10` used throughout. |
| 7.5 | Reduced motion fallback | `prefers-reduced-motion: reduce` → final value shown immediately. No animation. |
| 7.6 | Dark background | Section: `background: var(--color-dark)`. NOT a coloured strip. NOT white. |
| 7.7 | Stat value styling | `font-weight: 800; font-size: clamp(2rem, 4vw, 3rem); color: var(--color-text)`. Label: `color: var(--color-muted)`. |
| 7.8 | TypeScript: Stat | `Stat = { value: number; suffix: string; prefix?: string; decimals?: number; label: string }` — `STATS` const. |

---

## Epic 8 — Expert Strip

**Goal:** Team capability callout — 3 blocks. No individual CA profiles or photos.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | 3 capability blocks | "500+ ICAI-Qualified CAs", "< 24hr Turnaround", "100% Accuracy Guarantee" — all 3 visible with descriptions. Sourced from `EXPERT_BLOCKS` const. |
| 8.2 | Blue icons | Each block: Lucide icon, `color: var(--color-blue)`. NOT images, NOT emojis. `grep -r "emoji\|<img" src/components/sections/ExpertStrip` → empty. |
| 8.3 | No individual profiles | No `<img>` tags. No CA names or photos. `grep -r "<img" src/components/sections/ExpertStrip` → empty. |
| 8.4 | Surface background | Section: `background: var(--color-surface)`. Distinguishes from adjacent dark sections. |
| 8.5 | TypeScript: ExpertBlock | `ExpertBlock = { headline: string; description: string; icon: LucideIcon }` — `EXPERT_BLOCKS` const. |

---

## Epic 9 — Footer

**Goal:** Dark footer, 4 columns, blue link hover, cert badges with opacity treatment.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 9.1 | Dark background | `background: var(--color-darker)`. `border-top: 0.5px solid var(--color-border)`. NOT white, NOT gradient. DevTools: `rgb(13,13,13)`. |
| 9.2 | 4-column layout | Brand+tagline | Services | Resources | Company. CSS Grid. Collapses to 2-col tablet (≤768px); 1-col mobile (≤480px). |
| 9.3 | Link hover blue | Footer links: `:hover { color: var(--color-blue) }`. Transition `150ms ease`. Blue on dark bg = accessible. |
| 9.4 | Cert badges | ISO 27001, SSL 128-bit, SOC 2 in bottom bar. `opacity: 0.5`. `filter: brightness(0) invert(1)` for white rendering on dark. |
| 9.5 | Copyright | `color: var(--color-muted)`, `font-size: 13px`. `new Date().getFullYear()` for year. Bottom left. |

---

## Epic 10 — Performance and QA

**Goal:** All dark-platform traps caught. No light sections. No radius violations. Count-up correctness verified.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 10.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any` types. No `@ts-ignore`. |
| 10.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced. No deprecation warnings. |
| 10.3 | Lighthouse Performance ≥90 | LCP, CLS within budget. Static export. |
| 10.4 | Lighthouse Accessibility ≥90 | All interactive elements labeled. WCAG AA contrast passes. |
| 10.5 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 10.6 | No rgba in modules | `grep -r "rgba(" src --include="*.module.css"` → empty. |
| 10.7 | Radius audit | Every button = 4px. Every card = 8px. `grep -r "9999px\|border-radius: 0\|border-radius: 16px" src/components` → empty. |
| 10.8 | Dark-throughout audit | Every section `background-color` resolves to `rgb(21,21,21)` or `rgb(13,13,13)`. `grep -r "background.*white\|background.*#fff\|background.*#FFF" src/components/sections` → empty. |
| 10.9 | Plus Jakarta Sans only | `grep -r "Roboto\|Lato\|Nunito\|Inter" src` → empty. No cross-contamination from other legal variants. |
| 10.10 | Yellow connector absent | `grep -r "color-yellow\|#FFD000\|#FFC107" src/components/sections/HowItWorks` → empty. Blue connector only (yellow belongs to bw_legal_04). |
| 10.11 | Reduced motion | `prefers-reduced-motion: reduce` → marquee stops, Framer Motion transitions instant, count-up skips to final value immediately. |
