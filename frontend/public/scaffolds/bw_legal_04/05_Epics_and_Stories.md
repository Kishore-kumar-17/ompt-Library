# 05 — Epics and Stories
## Productized Indian Legal Services · bw_legal_platform_04
### LegalEase · White Theme · Navy + Yellow · Roboto · 6px buttons / 10px cards

---

## Epic 1 — Design System Foundation

**Goal:** White background, Roboto 400/500/600/700, 6px buttons / 10px cards, 8-token colour system, yellow CTA must use navy text (never white).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "rgba\|#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 1.2 | Roboto 400–700 | `next/font/google` with `weight: ['400','500','600','700']`. `--font-sans` on `<html>`. Computed font-family = Roboto. No Inter, no Plus Jakarta Sans. |
| 1.3 | Button — 3 variants, 6px | `primary`: navy bg, white text. `secondary`: navy border, navy text. `yellow`: yellow bg, navy text. `border-radius: 6px` on ALL three in DevTools. |
| 1.4 | Yellow button — navy text (contrast trap) | DevTools computed `color` on `.yellow` = `rgb(2,43,80)` (navy). NOT `rgb(255,255,255)`. Yellow (#FFD000) on white = 1.49:1 fails — navy on yellow = 11.2:1 passes AAA. |
| 1.5 | No 4px buttons, no 9999px | `grep -r "border-radius: 4px\|9999px" src/components` → empty. These values belong to other legal variants. |
| 1.6 | TypeScript types | `TabId`, `ServiceProduct`, `Testimonial`, `TrustSignal`, `Step`, `RatingBadgeProps` all defined. `tsc --noEmit` exits 0. |
| 1.7 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out`. |

---

## Epic 2 — Navigation

**Goal:** Always-white sticky nav, yellow "Get Started" CTA, navy text links, server component.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | Always-white nav | `background: rgb(255,255,255)` at all scroll positions. No scroll listener. `position: sticky; top: 0; z-index: 100`. `border-bottom: 1px solid var(--color-border)`. |
| 2.2 | Nav layout | Logo left. Links center ("Services", "About", "Blog", "Contact"). "Get Started" yellow CTA right. Height 64px. |
| 2.3 | Nav links — navy | `color: var(--color-navy)`. Hover: `color: var(--color-blue)`. Transition `150ms ease`. |
| 2.4 | "Get Started" — yellow, navy text | `variant="yellow"`, height 40px, `border-radius: 6px`. Computed `color = rgb(2,43,80)`. NOT white text. Contrast 11.2:1 ✓. |
| 2.5 | Server component | No `'use client'` in `StickyNav.tsx`. `grep "'use client'" src/components/layout/StickyNav.tsx` → empty. |
| 2.6 | No dark nav | Nav never changes to dark. `grep -r "background.*darker\|color-dark\|#0D0D0D" src/components/layout/StickyNav` → empty. |

---

## Epic 3 — Hero Section

**Goal:** Split layout, dual platform ratings, ISO badge, money-back guarantee, dual CTAs. Right panel shows 3 services with strikethrough pricing.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Split layout | Left 55% content, right 45% visual on desktop ≥900px. Single column on mobile — right panel hidden ≤900px. |
| 3.2 | H1 typography | Roboto 700, `clamp(2.25rem, 4vw, 3.25rem)`, `color: var(--color-navy)`. NOT dark grey. NOT white. |
| 3.3 | Dual rating badges | Google ⭐4.5 (20K+ Reviews) AND Trustpilot ⭐4.5 (7.5K+ Reviews) — both present in hero. Both rendered via shared `RatingBadge` component with `platform` prop. |
| 3.4 | ISO 27001 inline | ISO 27001 badge in same row as ratings. `background: var(--color-surface)`, `border-radius: 6px`. Text "ISO 27001" visible. |
| 3.5 | Money-back guarantee | "7-day application submission or 100% money back" text visible in hero. Guaranteed text, not asterisked. |
| 3.6 | Dual CTAs | "Register My Business" (`primary`, navy) AND "Talk to an Expert" (`secondary`, navy outline). Both `border-radius: 6px`. Same height 44px. |
| 3.7 | Visual right panel | White card, `border-radius: 10px`, `box-shadow` present. Shows 3 popular services with `<del>` strikethrough original prices. |
| 3.8 | TypeScript: RatingBadgeProps | `RatingBadgeProps = { platform: 'google' | 'trustpilot'; rating: number; reviewCount: string }` — shared component. |

---

## Epic 4 — Service Catalog (ServiceTabs)

**Goal:** Tab-filtered product cards, transparent pricing, yellow discount badges, "Most Popular" yellow ribbon. ServiceTabs is the only client component.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | 4 tabs | "Startup", "Business", "Compliance", "IP & Trademark". Active tab: navy text + `border-bottom: 3px solid var(--color-yellow)`. Inactive: muted text. |
| 4.2 | Active tab — yellow underline, not background | Active tab: `border-bottom: 3px solid var(--color-yellow)`. NOT `background: var(--color-yellow)`. NOT `color: rgb(255,255,255)` on yellow (fails AA). |
| 4.3 | Tab ARIA | Each tab: `role="tab"`, `aria-selected="true|false"`. Tab panel: `role="tabpanel"`. `useState<TabId>` manages active tab. |
| 4.4 | 3 cards per tab | Exactly 3 `ProductCard` items per tab. 12 products total across 4 tabs. Sourced from `SERVICE_PRODUCTS` const filtered by `TabId`. |
| 4.5 | Strike-through pricing | Every card: `<del>₹{originalPrice}</del>` struck-through AND `₹{discountedPrice}` bold navy. NOT `<span style="text-decoration: line-through">`. `grep -r "line-through" src/components/ProductCard` → empty. |
| 4.6 | Yellow discount badge | Yellow chip: `-{discountPercent}% Off`. `background: var(--color-yellow)`. Text: navy (not white — contrast trap). |
| 4.7 | Govt. fee fine print | `+ Govt. Fee (varies)` shown below discounted price. `color: var(--color-muted)`. |
| 4.8 | Delivery time | Lucide `Clock` icon + "Filed in {days} days" in blue on every card. TypeScript: `ServiceProduct.deliveryDays: number`. |
| 4.9 | Feature checklist | 4 features per card. Lucide `Check` icon in `var(--color-blue)`. NOT text "✓". `grep -r "✓" src/components/ProductCard` → empty. |
| 4.10 | "Most Popular" yellow ribbon | `popular: true` → "Most Popular" ribbon at `position: absolute; top: -12px; right: 16px`, yellow bg, navy text. Others: ribbon absent from DOM (not `display:none`). |
| 4.11 | Card CTA | `<Button variant="primary" fullWidth>Get Started</Button>`. `border-radius: 6px`. NOT yellow variant on cards. |
| 4.12 | Client/server boundary | `ServiceTabs.tsx` has `'use client'`. `ProductCard.tsx` does NOT have `'use client'`. `grep "'use client'" src/components/ProductCard.tsx` → empty. |
| 4.13 | TypeScript: ServiceProduct + TabId | `type TabId = 'startup' | 'business' | 'compliance' | 'ip'`. `ServiceProduct = { id: string; tab: TabId; name: string; originalPrice: number; discountedPrice: number; discountPercent: number; deliveryDays: number; features: string[]; popular: boolean }` |

---

## Epic 5 — Trust Signals

**Goal:** 4 trust blocks on light surface background. Lucide icons in navy. No shadows on trust cards.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | 4 blocks render | ISO 27001, 7-Day Money-Back, Google 4.5★, 50,000+ Businesses — all 4 visible. Sourced from `TRUST_SIGNALS` const. |
| 5.2 | Surface background | Section: `background: var(--color-surface)` (`#F5FAFF`). NOT white. NOT navy. |
| 5.3 | Icons in navy, white icon box | Lucide icon: `color: var(--color-navy)`. Inside white `border-radius: 10px` icon container. |
| 5.4 | Responsive grid | 4-col desktop → 2-col tablet (≤768px) → 1-col mobile (≤480px). CSS Grid. |
| 5.5 | TypeScript: TrustSignal | `TrustSignal = { headline: string; subtext: string; icon: LucideIcon }` — `TRUST_SIGNALS` const. |

---

## Epic 6 — How It Works

**Goal:** 3 steps, navy circles, YELLOW connector lines (not blue — this is the key differentiator from bw_legal_03).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | 3 steps render | "Choose a Service", "Share Documents", "We Handle the Rest" — all 3 visible with descriptions. Sourced from `PROCESS_STEPS` const. |
| 6.2 | Navy circles | `width: 40px; height: 40px; border-radius: 50%; background: var(--color-navy)`. Number inside: white, Roboto 700. |
| 6.3 | Yellow connectors (CRITICAL) | `height: 2px; background: var(--color-yellow)` between circles on desktop ≥768px. `display: none` on mobile. `grep -r "color-blue" src/components/sections/HowItWorks` → empty. NOT blue. |
| 6.4 | Typography | Step title: `color: var(--color-navy)`, Roboto 600. Description: `color: var(--color-muted)`, Roboto 400. |
| 6.5 | TypeScript: Step | `Step = { step: number; title: string; description: string; icon: LucideIcon }` — `PROCESS_STEPS` const. |

---

## Epic 7 — Testimonials

**Goal:** 3 white cards with navy text, 5-star ratings, shadow styling.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | 3 cards render | All 3 testimonials visible. Sourced from `TESTIMONIALS` const. |
| 7.2 | Star ratings | 5 amber stars on each card. SVG or Lucide `Star` with `fill="#F59E0B"` as inline attribute. NOT emoji ⭐. |
| 7.3 | Card styling | `background: rgb(255,255,255)`, `border-radius: 10px`, `box-shadow: 0 4px 18px rgba(0,0,0,0.10)`. No border on testimonial cards. |
| 7.4 | Quote typography | Quote: `color: var(--color-muted)`, Roboto 400. Client name: `color: var(--color-navy)`, Roboto 600. Company type: `color: var(--color-muted)`. |
| 7.5 | TypeScript: Testimonial | `Testimonial = { quote: string; name: string; companyType: string; rating: number }` — `TESTIMONIALS` const. |

---

## Epic 8 — Footer

**Goal:** Navy footer, 4 columns, yellow link hover (not white), cert badges at base.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | Navy background | `background: var(--color-navy)` (`rgb(2,43,80)`). NOT dark grey. NOT black. `border-top: 1px solid rgba(255,255,255,0.1)`. |
| 8.2 | 4-column layout | Brand+tagline | Services | Resources | Company. CSS Grid. Collapses to 2-col tablet (≤768px); 1-col mobile (≤480px). |
| 8.3 | Link hover yellow | Links: `:hover { color: var(--color-yellow) }`. NOT white. Yellow on navy = 10.5:1 ✓. Transition `150ms ease`. |
| 8.4 | Cert badges | ISO and Trustpilot badges in bottom bar. `opacity: 0.5`. `filter: brightness(0) invert(1)` for white on navy. |
| 8.5 | Copyright | `color: rgba(255,255,255,0.5)`, `font-size: 13px`. `new Date().getFullYear()` for year. |

---

## Epic 9 — Performance and QA

**Goal:** All white-platform traps verified. No dark sections. No 4px buttons. Yellow always uses navy text.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 9.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any` types. No `@ts-ignore`. |
| 9.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced. |
| 9.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 9.4 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 9.5 | No rgba in modules | `grep -r "rgba(" src --include="*.module.css"` → empty (testimonial shadow uses token). |
| 9.6 | Radius audit | Every button = 6px. Every card = 10px. `grep -r "border-radius: 4px\|border-radius: 8px\|9999px" src/components` → empty. |
| 9.7 | White-throughout audit | Every section `background-color` resolves to `rgb(255,255,255)` or `rgb(245,250,255)`. `grep -r "color-dark\|color-darker\|#0D0D0D" src/components/sections` → empty. |
| 9.8 | Yellow text contrast gate | `grep -r "color: var(--color-yellow)\|color: #FFD000" src/components` → zero results. Yellow used as background only, never as text colour. |
| 9.9 | Blue connector absent | `grep -r "color-blue" src/components/sections/HowItWorks` → empty. Yellow connector only. |
| 9.10 | Roboto only | `grep -r "Plus Jakarta\|Inter\|Lato\|Nunito" src` → empty. No cross-contamination from bw_legal_03. |
| 9.11 | `<del>` tag audit | `grep -r "line-through" src/components/ProductCard` → empty. `grep -r "<del>" src/components/ProductCard` → results present for all 12 products. |
| 9.12 | Reduced motion | `prefers-reduced-motion: reduce` → all Framer Motion transitions instant. |
