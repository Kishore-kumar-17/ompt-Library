# 05 — Epics and Stories
## Modern Indian Rental Discovery · bw_realestate_04
### NoBroker-Style · Purple + Green · Plus Jakarta Sans · Zero Brokerage Focus

---

## Epic 1 — Design System Foundation

**Goal:** 8-token purple-tinted system, Plus Jakarta Sans 400/500/600, `calculateBrokerSavings` utility, green zero-brokerage atoms, static export.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens. `--color-surface: #F8F7FF` — purple-tinted, NOT neutral white. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. Exception: hero gradient with `/* hex allowed in gradient */` comment. |
| 1.2 | Plus Jakarta Sans 400/500/600 | `next/font/google` with `weight: ['400','500','600']`. `--font-sans` on `<html>`. `grep -r "Poppins\|DM_Sans\|Inter\b" src/app/layout.tsx` → empty. |
| 1.3 | Button — 3 variants | `purple` (white text 6.23:1 ✓), `outlinePurple` (purple border+text), `ghost`. `border-radius: 8px` on all. |
| 1.4 | ZeroBrokerageBadge — green border + text | `color: var(--color-green); border: 1px solid var(--color-green)`. No fill. Green on white = 5.02:1 ✓. No purple in this badge. |
| 1.5 | OwnerVerifiedBadge — green text + Check | `color: var(--color-green)`. Lucide `Check` icon. No border on this badge (distinguishes from ZeroBrokerageBadge). |
| 1.6 | PetFriendlyBadge — purple text | `color: var(--color-purple)`. Lucide `PawPrint` icon. |
| 1.7 | Utility functions | `calculateBrokerSavings(28000)` → `56000`. `calculateBrokerSavings(65000)` → `130000`. `formatPrice(28000)` → `'₹28,000/mo'`. `formatPrice(100000)` → `'₹1.00 L/mo'`. `filterRentals(data, { bhk: ['2 BHK'] })` → 3 results. `filterRentals(data, { petFriendly: true })` → 4 results. |
| 1.8 | TypeScript: rental types | `type BHKType = '1 BHK' \| '2 BHK' \| '3 BHK' \| '4 BHK'`. `type FurnishingStatus = 'fully-furnished' \| 'semi-furnished' \| 'unfurnished'`. `type TenantPreference = 'family' \| 'bachelor' \| 'any'`. `RentalProperty = { id: string; bhk: BHKType; rent: number; deposit: number; furnishing: FurnishingStatus; petFriendly: boolean; tenantPreference: TenantPreference; city: string; locality: string; ownerVerified: boolean; imageUrl: string }` |
| 1.9 | TypeScript: RentalFilterState | `RentalFilterState = { bhk: BHKType[]; furnishing: FurnishingStatus \| ''; maxRent: number \| null; petFriendly: boolean; tenantPreference: TenantPreference \| '' }` |
| 1.10 | Static export | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` → `/out`. |

---

## Epic 2 — Navigation

**Goal:** White sticky nav, purple logo, "Post Property Free" CTA. Scroll shadow via `useEffect`.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav + scroll shadow | `background: rgb(255,255,255)`. Scroll shadow class via `useEffect`. `position: sticky; top: 0; z-index: 100`. `border-bottom: 1px solid var(--color-border)`. |
| 2.2 | Purple logo | Logo text: `color: var(--color-purple)`. `font-weight: 600`. |
| 2.3 | Nav links | "Rent", "Buy", "Post Property", "Help". `color: var(--color-dark)`. Hover: `color: var(--color-purple)`. |
| 2.4 | "Post Property Free" CTA | `purple` variant, `border-radius: 8px`. White text on purple = 6.23:1 ✓. |
| 2.5 | 4-column dark footer | `background: var(--color-dark)`. Columns: Company, Rent, Tools, Legal. White text = 18:1 ✓. `<footer>` element. |

---

## Epic 3 — Hero + Savings Strip

**Goal:** Purple gradient hero, search widget, BrokerSavingsStrip visible above fold without scroll.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Purple gradient hero | `background: linear-gradient(135deg, #6C3CE1 0%, #3D1FA3 100%)` in `HeroSection.module.css` with `/* hex allowed in gradient */` comment. `padding: 80px 24px 48px`. |
| 3.2 | H1 + subheading | H1: Plus Jakarta Sans 600, `clamp(2.25rem, 4.5vw, 3.75rem)`, white. Subheading: white at 80% opacity. |
| 3.3 | Search widget | White bg card, `border-radius: 12px`, `box-shadow: 0 8px 40px rgba(0,0,0,0.25)`. City `<select>` + locality `<input type="text">` + "Find Zero Brokerage Homes" `purple` button. |
| 3.4 | BrokerSavingsStrip — above fold | Full-width: `background: var(--color-purple)`. White text: "Save up to 2 months rent in brokerage — rent directly from owners". Must be visible without scrolling on desktop (1024px viewport). `background: var(--color-purple)` NOT hardcoded hex. |

---

## Epic 4 — Rental Filter + Property Grid

**Goal:** BHK MULTI-select (array state), furnishing/rent/pet/tenant filters, useMemo, "Contact Owner" only.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | BHK multi-select chips — array state | BHK chips: "1 BHK", "2 BHK", "3 BHK", "4 BHK". `useState<BHKType[]>([])`. Clicking active chip deselects (removes from array). Active: `background: var(--color-purple); color: rgb(255,255,255)` (6.23:1 ✓). `grep -r "PropertyCategory" src/components/home/RentalFilterBar.tsx` → empty (this is NOT a portal single-select). |
| 4.2 | Furnishing single-select | Fully Furnished / Semi-Furnished / Unfurnished. Single-select `string` state. |
| 4.3 | Max Rent presets | ₹15K / ₹25K / ₹35K / ₹50K / No Limit. Preset button chips, single-select. |
| 4.4 | Pet Friendly + Tenant toggles | Pet Friendly: boolean toggle chip. Tenant Preference: Family / Bachelor / Any single-select. |
| 4.5 | useMemo filter | `const filtered = useMemo(() => filterRentals(properties, filters), [properties, filters])`. `grep -r "useMemo" src/components/home/RentalFilterBar.tsx` → present. |
| 4.6 | ARIA live region | `<div aria-live="polite" className="sr-only">{count} properties found</div>` updates on every filter change. |
| 4.7 | "Contact Owner" — not "Contact Agent" | Every card CTA: "Contact Owner". `grep -r "Contact Agent\|Contact Builder" src/components` → empty. |
| 4.8 | Deposit display — toLocaleString, NOT formatPrice | Deposit: `₹{property.deposit.toLocaleString('en-IN')}` deposit. `grep -r "formatPrice.*deposit\|formatPrice(property\.deposit)" src/components` → empty. |
| 4.9 | Client boundary | `RentalFilterBar.tsx` has `'use client'`. `page.tsx` has NO `'use client'`. Passes all 8 `RentalProperty` entries as props. |

---

## Epic 5 — Broker Savings Widget

**Goal:** Interactive rent input → live savings in green. `calculateBrokerSavings` is the single formula.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | Rent input | `<label>Enter monthly rent</label>` + `<input type="number" min="5000" placeholder="30000">`. Input labeled with `htmlFor`. |
| 5.2 | Live savings in green | Savings updates on every `onChange`: `calculateBrokerSavings(rentValue)`. Display: `₹${savings.toLocaleString('en-IN')}`. `color: var(--color-green)` on savings value. NOT purple. |
| 5.3 | Savings correctness | Input `28000` → display `₹56,000`. Input `65000` → display `₹1,30,000`. |
| 5.4 | Widget positioning | In page body, discoverable within first 2 scrolls on desktop. |

---

## Epic 6 — Supporting Sections

**Goal:** TrustBar (dark), Services (purple icons), CityLinks (12 Indian cities — NO international), How It Works.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | TrustBar — dark, 4 stats | `background: var(--color-dark)`. Stats: "50 Lakh+ Rental Listings", "Zero Brokerage Saved", "2 Crore+ Happy Tenants", "Instant Owner Connect". Lucide: Building2, PiggyBank, Users, Zap. Framer Motion stagger `viewport={{ once: true }}`. |
| 6.2 | Services — purple icons | 4 tiles. Lucide icons: Home, UserCheck, Calculator, MapPin. `color: var(--color-purple)`. Each: `outlinePurple` CTA. `grep -r "color-teal" src/components/sections/Services" → empty (purple only, not teal from bw_03). |
| 6.3 | CityLinks — 12 Indian cities (NO international) | Bangalore, Mumbai, Hyderabad, Pune, Delhi NCR, Chennai, Kolkata, Ahmedabad, Jaipur, Kochi, Chandigarh, Gurgaon. `grep -r "Dubai\|London\|International" src/components/sections/CityLinks` → empty. 4-col grid. Hover: `color: var(--color-purple); border-color: var(--color-purple)`. |
| 6.4 | How It Works | 3 steps: "Search", "Contact Owner Directly", "Move In, Pay Zero Brokerage". Numbered circles, purple bg, server component. |

---

## Epic 7 — QA and Performance

**Goal:** Rental-specific guards. BHK array confirmed. No formatPrice on deposit. International cities absent.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any`. |
| 7.2 | Build succeeds | `npm run build` exits 0. `/out` produced. |
| 7.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 7.4 | No hex in CSS modules | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty (hero gradient exception only). |
| 7.5 | BHK state is array | `grep -r "useState<BHKType>" src/components/home/RentalFilterBar.tsx` → `BHKType[]` (array, not single). |
| 7.6 | Deposit not via formatPrice | `grep -r "formatPrice.*deposit\|formatPrice(property\.deposit)" src/components` → empty. |
| 7.7 | No international cities | `grep -r "Dubai\|London\|Singapore\|International" src/components/sections/CityLinks` → empty. |
| 7.8 | Contact Owner only | `grep -r "Contact Agent\|Contact Builder" src/components` → empty. |
| 7.9 | Plus Jakarta Sans only | `grep -r "DM_Sans\|Inter\b\|Poppins\|Roboto" src` → empty. |
| 7.10 | Reduced motion | `prefers-reduced-motion: reduce` → Framer Motion transitions instant. |
