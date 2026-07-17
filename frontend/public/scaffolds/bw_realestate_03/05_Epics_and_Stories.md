# 05 — Epics and Stories
## Indian Premium Property Portal · bw_realestate_03
### SqRealty · Teal + Gold · DM Sans · 8px/12px/24px Radius Vocabulary

---

## Epic 1 — Design System Foundation

**Goal:** 8-token colour system, DM Sans 400/500/600, radius vocabulary (8px buttons / 12px cards / 24px pills), investment-specific atoms, static export.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. Exception: hero gradient in `HeroSection.module.css` with `/* hex allowed in gradient */` comment. |
| 1.2 | DM Sans 400/500/600 | `next/font/google` with `weight: ['400','500','600']`. `--font-sans` on `<html>`. `grep -r "Poppins\|Inter\|Plus_Jakarta_Sans" src/app/layout.tsx` → empty. |
| 1.3 | Button — 3 variants, 8px | `teal` (white text 5.99:1 ✓), `gold` (dark text 5.94:1 ✓), `outlineTeal`. `border-radius: 8px` on all. `href` prop renders `<Link>`. No 9999px. |
| 1.4 | YieldBadge — gold bg, dark text | `background: var(--color-gold); color: var(--color-text)`. Computed `color` = dark, NOT `rgb(255,255,255)`. Gold on white = 3.46:1 fails AA — dark text on gold = 5.94:1 passes. |
| 1.5 | SqVerifiedBadge — teal (NOT green) | `color: var(--color-teal)`. `grep -r "color-green" src/components/ui/SqVerifiedBadge` → empty. Distinguishes from RERA badge. |
| 1.6 | ReraBadge — green + border | `color: var(--color-green)`, `border: 1px solid var(--color-green)`. Green on white = 4.5:1 ✓. |
| 1.7 | Utility functions | `formatYield(4.2)` → `'4.2% p.a.'`. `filterByCategory(properties, 'high-yield')` → only `rentalYield >= 4.0`. `filterByCategory(properties, 'luxury')` → only `price >= 10_000_000`. |
| 1.8 | TypeScript: core types | `type PropertyCategory = 'all' \| 'luxury' \| 'ready-to-move' \| 'new-launch' \| 'high-yield'`. `PremiumProperty = { id: string; name: string; category: PropertyCategory; price: number; rentalYield: number; capitalAppreciation: number; reraRegistered: boolean; sqVerified: boolean; city: string; locality: string; imageUrl: string }` |
| 1.9 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out`. |

---

## Epic 2 — Navigation

**Goal:** Sticky white nav, teal logo, scroll shadow via JS class. No dark nav state.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav + scroll shadow | `background: rgb(255,255,255)` always. Scroll shadow class added via `useEffect` scroll listener when `scrollY > 0`. `position: sticky; top: 0; z-index: 100`. |
| 2.2 | Teal logo | "SqRealty" logo text: `color: var(--color-teal)`. `font-weight: 600`. |
| 2.3 | Nav links | "Buy", "Rent", "Commercial", "New Projects", "Agents" — `color: var(--color-text)`. Hover: `color: var(--color-teal)`. |
| 2.4 | "Post Property Free" CTA | `teal` variant, `border-radius: 8px`. Computed `color = rgb(255,255,255)`. |
| 2.5 | ARIA | `<nav aria-label="Main navigation">`. All nav links keyboard-focusable. |

---

## Epic 3 — Hero Section

**Goal:** Dark teal gradient hero, search widget with city+locality, locality tag cloud.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Gradient background | `background: linear-gradient(135deg, #0B6E77 0%, #073B42 100%)` in `HeroSection.module.css` with `/* hex allowed in gradient */` comment. `padding: 80px 24px`. |
| 3.2 | H1 + subheading | H1: DM Sans 600, `clamp(2.5rem, 5vw, 4rem)`, `color: rgb(255,255,255)`. Subheading: white at 80% opacity. |
| 3.3 | Search widget | White bg card, `border-radius: 12px`, `box-shadow: 0 8px 40px rgba(0,0,0,0.20)`. City `<select>` + locality `<input type="text">` + "Search Properties" `teal` button. All inside `<form>`. |
| 3.4 | Locality tag cloud | 8 pill tags: Bandra West, Whitefield, Jubilee Hills, Koregaon Park, DLF Cyber City, Worli, Adyar, Kanakpura Road. `background: rgba(255,255,255,0.15); color: rgb(255,255,255); border-radius: 24px`. Hover: `rgba(255,255,255,0.25)`. |

---

## Epic 4 — Category Filter + Property Grid

**Goal:** 5 single-select pill tabs, `useMemo` filter, investment metrics row on every card.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | 5 category chips | "All", "Luxury", "Ready to Move", "New Launch", "High Yield". `border-radius: 24px`. Sourced from `SERVICE_CATEGORIES` const. |
| 4.2 | Active chip — teal bg, white text | Active: `background = rgb(0,118,135)` (teal), `color = rgb(255,255,255)` (5.99:1 ✓). Inactive: surface bg, dark text. |
| 4.3 | Single-select (NOT multi-select) | `useState<PropertyCategory>('all')`. Clicking active chip keeps it active. `grep -r "BHKType\[\]\|PropertyCategory\[\]" src/components/home/CategoryFilter.tsx` → empty. |
| 4.4 | ARIA tab roles | `role="tablist"` on container. `role="tab"` + `aria-selected="true\|false"` on each chip. |
| 4.5 | useMemo filter | `const filtered = useMemo(() => filterByCategory(properties, category), [properties, category])`. |
| 4.6 | ARIA live region | `<div aria-live="polite" className="sr-only">{count} properties found</div>` updates on category change. |
| 4.7 | Investment metrics row | Every PremiumPropertyCard bottom row: `<YieldBadge yield={property.rentalYield} />` (gold bg, dark text) + `{property.capitalAppreciation.toFixed(1)}% Appreciation`. `background: var(--color-surface); border-top: 1px solid var(--color-border)`. |
| 4.8 | Sticky filter bar | `position: sticky; top: 64px; z-index: 90` — stays below nav on scroll. |
| 4.9 | Responsive grid | 3-col desktop → 2-col tablet (≤768px) → 1-col mobile (≤640px). CSS Grid. |

---

## Epic 5 — Agent Directory

**Goal:** Verified agents with rectangular photos, teal SqVerified badge, gold star rating.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | Agent photo — 8px NOT 50% | `width: 72px; height: 72px; border-radius: 8px; object-fit: cover`. `grep -r "border-radius: 50%" src/components/home/AgentCard.module.css` → empty. |
| 5.2 | SqVerifiedBadge — teal | Badge: `color: var(--color-teal)`. NOT green. Adjacent to agent name. |
| 5.3 | Star rating — gold | `{agent.rating.toFixed(1)} ★`: `color: var(--color-gold)`. Review count in `color: var(--color-muted)`. Gold at 14px bold on white = 3.46:1 — documented as acceptable at this weight. |
| 5.4 | Specialization tags | `agent.specializations[]` rendered as inline tags: `border: 1px solid var(--color-border); border-radius: 4px; padding: 3px 10px`. |
| 5.5 | Agent grid | 3-col (`repeat(3, 1fr)`) → 1-col mobile. Section heading: "Meet Our Verified Agents". |
| 5.6 | TypeScript: Agent | `Agent = { id: string; name: string; sqVerified: boolean; rating: number; reviewCount: number; transactionCount: number; specializations: string[]; city: string; photoUrl: string }` |

---

## Epic 6 — Supporting Sections

**Goal:** New Launches horizontal scroll, Services grid, CityLinks (10 cities incl. international), TrustBar.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | New Launches horizontal scroll | `overflow-x: auto; scrollbar-width: none`. 3 `NewLaunchCard` entries. Each: project name, builder, price range via `formatPriceRange(priceFrom, priceTo)`, launch date, unit type pills, RERA badge if `reraRegistered`. `border-radius: 12px`. |
| 6.2 | Launch date display | `launchDate` string (e.g. `'Jun 2025'`) renders as `"Launching: Jun 2025"` — muted label + bold date. |
| 6.3 | Services grid — 4 tiles | Briefcase, Scale, PaintBucket, Globe Lucide icons in `color: var(--color-teal)`. Each tile: title, description, `outlineTeal` CTA. 4-col → 2-col. |
| 6.4 | CityLinks — 10 cities | 5-col grid (responsive). Dubai, London display "International" indicator. Hover: `border-color: var(--color-teal); color: var(--color-teal)`. |
| 6.5 | TrustBar | `background: var(--color-dark)`. 4 stats: "2 Lakh+ Curated Listings", "15,000+ Verified Agents", "50+ Cities", "800+ Exclusive New Launches". Lucide: Building2, Users, MapPin, Rocket. Framer Motion stagger `viewport={{ once: true }}`. |
| 6.6 | TypeScript: NewLaunch | `NewLaunch = { id: string; name: string; builder: string; priceFrom: number; priceTo: number; launchDate: string; unitTypes: string[]; reraRegistered: boolean }` |

---

## Epic 7 — QA and Performance

**Goal:** Investment-platform-specific traps verified. No gold text on white. No circular photos.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any` types. |
| 7.2 | Build succeeds | `npm run build` exits 0. `/out` produced. |
| 7.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 7.4 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty (hero gradient exception only). |
| 7.5 | No white on gold | `grep -r "color-white" src/components/ui/YieldBadge.module.css` → zero `color:` rules. Dark text on gold only. |
| 7.6 | No circular photos | `grep -r "border-radius: 50%" src --include="*.module.css"` → empty. Agent and property photos = 8px rect. |
| 7.7 | SqVerifiedBadge not green | `grep -r "color-green" src/components/ui/SqVerifiedBadge.module.css` → empty. Teal only. |
| 7.8 | DM Sans only | `grep -r "Poppins\|Inter\|Plus_Jakarta_Sans\|Nunito" src` → empty. |
| 7.9 | PropertyCategory not BHKType | `grep -r "BHKType" src/components/home/CategoryFilter.tsx` → empty. Single-select portal, not rental multi-select. |
| 7.10 | Reduced motion | `prefers-reduced-motion: reduce` → Framer Motion transitions instant. |
