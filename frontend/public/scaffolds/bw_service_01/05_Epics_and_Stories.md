# 05 — Epics and Stories
## Indian Email Marketing SaaS Landing Page · bw_service_01
### MailSpark · Yellow + Dark · Inter · Flat 8px / 12px Radius

---

## Epic 1 — Design System Foundation

**Goal:** 8-token colour system, Inter 400/500/600, yellow-on-white contrast trap enforced (1.31:1 fails — yellow bg must use dark text), `formatPlanPrice` as sole price surface.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens: `--color-yellow`, `--color-dark`, `--color-white`, `--color-surface`, `--color-yellow-tint`, `--color-muted`, `--color-border`, `--color-green`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 1.2 | Inter 400/500/600 | `next/font/google` with `weight: ['400','500','600']`. `--font-sans` on `<html>`. `grep -r "Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx` → empty. |
| 1.3 | Button — 3 variants | `dark` (dark bg, white text 13.5:1 ✓✓), `outlineDark` (dark border+text), `ghost` (transparent, dark border). No yellow button variant — yellow bg uses inline style or dedicated component with forced dark text. |
| 1.4 | Yellow text on white FAILS | Yellow (#FFD000) on white = 1.31:1. `grep -r "color: var(--color-yellow)" src/components --include="*.module.css"` → zero results (yellow as text forbidden). Yellow used as background only. |
| 1.5 | FeatureCheckmark — green on white | `color: var(--color-green)`. Green on white = 5.02:1 ✓. NOT yellow (yellow text fails). |
| 1.6 | Utility functions | `formatPlanPrice(PRICING_TIERS[0], 'yearly')` → `'Free'`. `formatPlanPrice(PRICING_TIERS[1], 'monthly')` → `'₹749/mo'`. `formatPlanPrice(PRICING_TIERS[2], 'yearly')` → `'₹1,199/mo'`. `calculateYearlySavings(tier)` = `(monthlyPrice - yearlyPrice) * 12`. |
| 1.7 | TypeScript: pricing types | `type BillingPeriod = 'monthly' \| 'yearly'`. `PricingTier = { id: string; name: string; monthlyPrice: number; yearlyPrice: number; contactsLimit: string; emailsLimit: string; features: string[]; isHighlighted: boolean }` |
| 1.8 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out`. |

---

## Epic 2 — Navigation

**Goal:** White sticky nav, dark logo with yellow accent (not yellow text), dark "Get Started Free" CTA.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav + scroll shadow | `background: rgb(255,255,255)`. Scroll shadow via `useEffect`. `position: sticky; top: 0; z-index: 100`. |
| 2.2 | Dark logo + yellow accent (NOT yellow text) | Logo: `color: var(--color-dark)`. Yellow accent is a small shape/icon/underline — NOT yellow text. `grep -r "color: var(--color-yellow)" src/components/layout/SiteNav.module.css` → zero `color:` rules. Yellow on white = 1.31:1 fails. |
| 2.3 | Nav links | "Features", "Pricing", "Templates", "Blog". `color: var(--color-dark)`. Hover: underline or muted. |
| 2.4 | "Get Started Free" CTA | `dark` variant, `border-radius: 8px`. White text on dark = 13.5:1 ✓✓. |
| 2.5 | 4-column footer | Dark bg `var(--color-dark)`. Columns: Product, Resources, Company, Legal. White text. `<footer>` element. `border-top: 1px solid var(--color-border)`. |

---

## Epic 3 — Hero Section

**Goal:** White background split-layout hero, dark H1, no yellow on white in hero.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Split layout | Left: H1 + subheading + CTAs. Right: illustration placeholder div, `border-radius: 16px`, `background: var(--color-surface)`. 2-col desktop → 1-col mobile. |
| 3.2 | H1 typography | Inter 600, `clamp(2.25rem, 4vw, 3rem)`, `color: var(--color-dark)`. NOT yellow. Hero background: white. |
| 3.3 | Dual CTAs | "Get Started Free" (`dark` variant) + "See Pricing" (`ghost`). Both `border-radius: 8px`. Same height. Inline desktop, stacked mobile. |
| 3.4 | No yellow on white in hero | Hero background = white. `grep -r "color-yellow" src/components/sections/Hero.module.css` → zero `color:` rules. |

---

## Epic 4 — Pricing Section

**Goal:** Billing toggle with `aria-pressed`, 4 plan cards, highlighted card uses yellow bg + dark text (not white), yearly savings line via conditional JSX.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | BillingToggle — `aria-pressed` | Two `<button>` elements with `aria-pressed="true\|false"`. "Yearly" pill includes savings chip: `background: var(--color-yellow); color: var(--color-dark)` (12.77:1 ✓✓). `role="radio"` does NOT appear in `BillingToggle.tsx`. |
| 4.2 | Savings pill — dark text on yellow | Savings chip computed `color = var(--color-dark)`. NOT `color: var(--color-white)`. Yellow on white = 1.31:1 fails; dark on yellow = 12.77:1 passes. |
| 4.3 | PlanCard — base variant | White bg, plan name, `formatPlanPrice(tier, period)`, contacts/emails limits, feature list with `FeatureCheckmark`, `outlineDark` CTA. `tier.monthlyPrice` does NOT appear in `PlanCard.tsx`. `tier.yearlyPrice` does NOT appear in `PlanCard.tsx`. |
| 4.4 | PlanCard — highlighted variant | `background: var(--color-yellow)`. ALL text: `color: var(--color-dark)`. "Most Popular" badge: dark bg, white text. CTA: `dark` variant. `FeatureCheckmark`: dark check icon (NOT green — green on yellow = 1.24:1 fails). `grep -r "color-white" src/components/home/PlanCard.module.css` → zero `color:` rules in `.cardHighlighted`. |
| 4.5 | Yearly savings line — conditional JSX | `{period === 'yearly' && tier.monthlyPrice > 0 && <p>Save ₹{calculateYearlySavings(tier)}/yr</p>}`. Free tier never shows savings. `display: none` does NOT appear in `PlanCard.module.css`. `visibility:` does NOT appear in `PlanCard.module.css`. |
| 4.6 | PlanGrid assembly | `'use client'`, `useState<BillingPeriod>('monthly')`. Renders `BillingToggle` + 4 `PlanCard`s. ARIA live: `<div aria-live="polite" className="sr-only">Showing {period} pricing</div>`. `useMemo` does NOT appear in `PlanGrid.tsx` (no list to memoize). |
| 4.7 | TypeScript: BillingToggleProps | `BillingToggleProps = { period: BillingPeriod; onChange: (p: BillingPeriod) => void }` — controlled component. |

---

## Epic 5 — Feature Showcase

**Goal:** 3 alternating rows (text/visual), white + surface backgrounds, no yellow sections.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | 3 alternating rows | Row 1 (white bg): text left, visual right. Row 2 (`var(--color-surface)` bg): visual left, text right. Row 3 (white bg): text left, visual right. |
| 5.2 | Row content | Each row: Lucide icon (`color: var(--color-dark)`), H2, description `<p>`. Sourced from `FEATURES` const. Icons: Mail, Zap, BarChart2. |
| 5.3 | Illustration placeholders | Styled div: `border-radius: 16px`, `background: var(--color-surface)`. Aspect ratio 4/3. |
| 5.4 | TypeScript: FeatureItem | `FeatureItem = { icon: LucideIcon; title: string; description: string }` — `FEATURES` const. |

---

## Epic 6 — Social Proof + Trust

**Goal:** 3 testimonials, TrustBar on yellow background with dark text throughout (no white on yellow).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | 3 testimonials | All 3 cards from `TESTIMONIALS` const visible. Indian companies: ThreadCraft, NutriBox, LegalDesk India. |
| 6.2 | Testimonial card styling | White bg, `border-radius: 12px`, `border: 1px solid var(--color-border)`. Quote, name, role, company. |
| 6.3 | TrustBar — yellow bg, dark text throughout | `background: var(--color-yellow)`. ALL text and icons: `color: var(--color-dark)`. 4 stats with Lucide icons. `grep -r "color-white" src/components/home/TrustBar.module.css` → empty. `grep -r "color-yellow" src/components/home/TrustBar.module.css` → present as `background` on `.section` only. |
| 6.4 | Framer Motion stagger | TrustBar stats: `whileInView` stagger `0.1s`, `viewport={{ once: true }}`. Reduced motion respected. |
| 6.5 | TypeScript: Testimonial | `Testimonial = { quote: string; name: string; role: string; company: string }` — `TESTIMONIALS` const. |

---

## Epic 7 — QA and Performance

**Goal:** SaaS-specific guards. Yellow text never on white. formatPlanPrice encapsulates all prices.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any`. |
| 7.2 | Build succeeds | `npm run build` exits 0. `/out` produced. |
| 7.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 7.4 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 7.5 | Yellow text never on white | `grep -r "color: var(--color-yellow)" src/components --include="*.module.css"` → empty. |
| 7.6 | No white on yellow | `grep -r "color: var(--color-white)\|color: #fff\|color: #FFF\|color: rgb(255" src/components --include="*.module.css"` → empty on elements with yellow backgrounds. |
| 7.7 | formatPlanPrice encapsulates prices | `grep -r "tier\.monthlyPrice\b\|tier\.yearlyPrice\b" src/components --include="*.tsx"` → empty. |
| 7.8 | Inter only | `grep -r "Poppins\|DM_Sans\|Roboto\|Nunito" src` → empty. |
| 7.9 | Reduced motion | `prefers-reduced-motion: reduce` → all Framer Motion transitions instant. |
