# 05 — Epics and Stories
## Indian Payment Gateway Service Page · bw_service_03
### PayFlow · Blue + Green · Manrope · Fee Calculator Hero

---

## E-01 — Foundation

### US-01 — Project Scaffold
**As a** developer starting the project,
**I want** a Next.js 14 App Router project with TypeScript strict mode and static export,
**so that** I have a compile-clean base to build on.

**Acceptance criteria:**
- [ ] `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- [ ] `tsconfig.json`: `strict: true`
- [ ] `tsc --noEmit` exits 0 on empty scaffold

---

### US-02 — CSS Token System
**As a** developer,
**I want** all 8 colour tokens defined in `globals.css` with `.sr-only` and `prefers-reduced-motion`,
**so that** no hex values ever appear in component CSS files.

**Acceptance criteria:**
- [ ] All 8 tokens: `--color-blue`, `--color-green`, `--color-dark`, `--color-white`, `--color-surface`, `--color-muted`, `--color-border`, `--color-footer`
- [ ] `--font-sans: 'Manrope', sans-serif`
- [ ] `--radius-card: 12px`
- [ ] `.sr-only` class present
- [ ] `@media (prefers-reduced-motion: reduce)` block: `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important`
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty

---

### US-03 — TypeScript Types
**As a** developer,
**I want** all domain types defined in `src/types/index.ts`,
**so that** all components share one source of truth.

**Acceptance criteria:**
- [ ] `PaymentProduct = { id: string; name: string; description: string; icon: LucideIcon; feeRate: number; feeFixed: number; highlighted: boolean }` exported
- [ ] `TrustBadge = { id: string; label: string; icon: LucideIcon; description: string }` exported
- [ ] `PaymentMethod = { id: string; name: string; icon: LucideIcon; category: string }` exported
- [ ] `TrustStat = { id: string; icon: LucideIcon; value: string; label: string }` exported
- [ ] `HeroStat = { id: string; value: string; label: string }` exported
- [ ] `tsc --noEmit` exits 0

---

### US-04 — Mock Data and Utility Functions
**As a** developer,
**I want** mock data arrays and utility functions with proven test cases,
**so that** components have correct data and fee math.

**Acceptance criteria:**
- [ ] `PAYMENT_PRODUCTS` (4 items): Payment Gateway (2%, highlighted), Payment Links (2%), Subscriptions (2%), Payment Pages (1.5%)
- [ ] `TRUST_BADGES` (4), `PAYMENT_METHODS` (6), `TRUST_STATS` (4), `HERO_STATS` (3)
- [ ] `calculateTransactionFee(10000, 0.02)` → `200`
- [ ] `calculateTransactionFee(10000, 0.02, 3)` → `203`
- [ ] `calculateTransactionFee(10547, 0.02)` → `211`
- [ ] `formatFeeRate(0.02, 0)` → `'2.0%'`
- [ ] `formatFeeRate(0.015, 3)` → `'1.5% + ₹3'`
- [ ] `tsc --noEmit` exits 0

---

## E-02 — Navigation

### US-05 — SiteNav Component
**As a** visitor,
**I want** a sticky top navigation bar,
**so that** I can navigate to any section from anywhere on the page.

**Acceptance criteria:**
- [ ] `'use client'` directive
- [ ] `<nav aria-label="Main navigation">` wrapper
- [ ] "PayFlow" logo text: `color: var(--color-blue)` — 6.65:1 on white ✓
- [ ] Nav links: Products / Pricing / Docs / About
- [ ] "Create Account" button (`blue` variant)
- [ ] Scroll shadow: `box-shadow` applied via `useEffect` + `scroll` listener when `scrollY > 0`
- [ ] `position: sticky; top: 0; z-index: 50`
- [ ] Scroll listener cleanup: `removeEventListener` in `useEffect` return

---

### US-06 — SiteNav Accessibility
**As a** keyboard user,
**I want** the navigation to be fully keyboard accessible,
**so that** I can reach all nav items without a mouse.

**Acceptance criteria:**
- [ ] All nav items are focusable `<a>` or `<button>` elements
- [ ] Focus ring visible — not removed with `outline: none` without replacement
- [ ] "Create Account" is a real `<button>` or `<a href>`

---

## E-03 — Hero Section

### US-07 — Hero Content
**As a** business owner landing on the page,
**I want** to immediately understand what PayFlow does and how much it costs,
**so that** I can decide whether to explore further.

**Acceptance criteria:**
- [ ] Headline: "Accept Payments Across India — Instantly"
- [ ] One-sentence subheading: `color: var(--color-muted)`
- [ ] "Create Account" (`blue` variant) + "View Docs" (`ghost` variant) CTA pair
- [ ] No TypeScript errors on page assembly

---

### US-08 — Hero Stat Pills
**As a** visitor,
**I want** three trust metrics below the CTAs,
**so that** I understand PayFlow's scale before scrolling.

**Acceptance criteria:**
- [ ] 3 stat pills rendered from `HERO_STATS` const
- [ ] Values: "1 Crore+ Businesses" · "99.99% Uptime" · "300+ Payment Methods"
- [ ] Pills: `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 9999px`

---

### US-09 — Hero Layout
**As a** visitor on a wide screen,
**I want** the hero content and fee calculator side by side,
**so that** I can see pricing without scrolling.

**Acceptance criteria:**
- [ ] 2-column layout on ≥768px: content left, `FeeCalculator` right
- [ ] Single column on <768px
- [ ] `FeeCalculator` embedded directly in hero — NOT a separate page section
- [ ] Hero background: `var(--color-surface)` or white — no dark background in hero

---

## E-04 — Payment Products Grid

### US-10 — Product Cards
**As a** visitor,
**I want** to see all four payment products in a 2×2 grid,
**so that** I can compare what PayFlow offers.

**Acceptance criteria:**
- [ ] 4 cards in `grid-template-columns: repeat(2, 1fr)`
- [ ] 1-column on mobile (<640px)
- [ ] Each card: Lucide icon, product name, description, fee rate tag via `formatFeeRate`

---

### US-11 — Highlighted Product Card
**As a** visitor,
**I want** the primary product (Payment Gateway) to stand out visually,
**so that** I understand it's the recommended product.

**Acceptance criteria:**
- [ ] Card with `highlighted: true`: `background: var(--color-blue); color: var(--color-white)` — white on blue = 6.65:1 ✓
- [ ] Icon on highlighted card: `.iconWhite` class (white)
- [ ] Description on highlighted card: `.descMuted` (white at opacity 0.8) — NOT `var(--color-muted)`
- [ ] Fee tag on highlighted card: `.feeTagWhite` — NOT `.feeTag` (which is blue on white)
- [ ] **No green background on any card** — `var(--color-green)` is ONLY for "You receive" in calculator
- [ ] `grep -r "color-green" src/components/home/ProductCard.module.css` → empty

---

### US-12 — Fee Rate Display on Cards
**As a** visitor,
**I want** to see the fee rate on each product card,
**so that** I know the cost before using the calculator.

**Acceptance criteria:**
- [ ] `formatFeeRate(product.feeRate, product.feeFixed)` called on every card — BOTH args always
- [ ] Payment Gateway: displays "2.0%"
- [ ] Payment Pages: displays "1.5%"
- [ ] `grep -r "feeRate\b" src/components/home/ProductCard.tsx` → results (function called directly on prop) OR grep confirms `formatFeeRate` called with 2 args
- [ ] No hardcoded rate strings like `"2.0%"` in JSX

---

### US-13 — Product Section Heading
**As a** visitor,
**I want** a clear section heading for the products grid,
**so that** I understand what I'm looking at.

**Acceptance criteria:**
- [ ] Heading present: e.g. "All the tools to accept payments"
- [ ] `font-size: clamp(1.75rem, 4vw, 2.5rem)`
- [ ] `font-weight: 600` — never 700
- [ ] `text-align: center`

---

## E-05 — Fee Calculator

### US-14 — Calculator State Model
**As a** developer,
**I want** the fee calculator to use minimal state,
**so that** fee and received values are never stale.

**Acceptance criteria:**
- [ ] Only `amount: number` and `productId: string` in `useState`
- [ ] `product`, `fee`, `received` all derived inline — never in `useState`
- [ ] `fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)`
- [ ] `received = amount - fee`
- [ ] `grep -r "useState.*fee\|useState.*received" src/components/home/FeeCalculator.tsx` → empty

---

### US-15 — Product Selector
**As a** visitor,
**I want** to select any payment product in the calculator,
**so that** I can compare fees across products.

**Acceptance criteria:**
- [ ] `<select>` renders all 4 products from `PAYMENT_PRODUCTS`
- [ ] Each `<option>`: `{name} — {formatFeeRate(feeRate, feeFixed)}`
- [ ] Default selection: `'pg'` (Payment Gateway)
- [ ] Changing product updates fee and received immediately

---

### US-16 — Amount Input
**As a** visitor,
**I want** to enter any transaction amount,
**so that** I can see the exact fee for my business.

**Acceptance criteria:**
- [ ] `<input type="number">`, default `10000`, `min="1"`, `step="100"`
- [ ] Changing amount updates fee and received on every `onChange`
- [ ] Invalid/empty input: `received` does not go negative or NaN (guard: `const safeAmount = Math.max(0, amount || 0)`)

---

### US-17 — Tri-Line Breakdown
**As a** visitor,
**I want** a three-line fee breakdown,
**so that** I understand exactly what I'm charged and what I receive.

**Acceptance criteria:**
- [ ] Line 1: "Amount charged" — `₹{amount}` in `var(--color-text)`
- [ ] Line 2: "Fee ({rate})" — `−₹{fee}` in `var(--color-muted)`
- [ ] Line 3: "You receive" — `₹{received}` in `var(--color-green)` — the ONLY use of green in this component
- [ ] Green on white = 5.02:1 ✓ (AA)

---

### US-18 — Calculator Accessibility
**As a** screen-reader user,
**I want** fee updates announced automatically,
**so that** I hear the new values when I change the amount.

**Acceptance criteria:**
- [ ] Breakdown container: `aria-live="polite"`
- [ ] Amount input: `<label htmlFor="amount-input">Transaction amount in rupees</label>`
- [ ] Product `<select>`: `aria-label="Payment product"`

---

### US-19 — Calculator Default State
**As a** visitor loading the page,
**I want** the calculator to show a meaningful default,
**so that** I immediately see the fee without typing anything.

**Acceptance criteria:**
- [ ] Default: amount = ₹10,000, product = Payment Gateway (2%)
- [ ] Fee = ₹200, received = ₹9,800 (green) on first load
- [ ] Verified: `calculateTransactionFee(10000, 0.02, 0)` → `200`

---

## E-06 — Trust + Methods

### US-20 — TrustSection Tiles
**As a** finance manager evaluating PayFlow,
**I want** to see security certifications displayed clearly,
**so that** I can confirm compliance with Indian regulations.

**Acceptance criteria:**
- [ ] 4 tiles from `TRUST_BADGES`
- [ ] Grid: 4-col desktop, 2-col tablet (<768px), 1-col mobile (<480px)
- [ ] Section: `background: var(--color-surface)`
- [ ] Each tile: white card, blue icon (6.65:1 ✓), bold label, muted description
- [ ] `border-radius: var(--radius-card)` (12px) on each tile

---

### US-21 — TrustSection Content
**As a** visitor,
**I want** to see the correct certifications listed,
**so that** I know PayFlow meets compliance requirements.

**Acceptance criteria:**
- [ ] PCI-DSS Level 1 — Lucide `Shield`
- [ ] ISO 27001 — Lucide `Lock`
- [ ] RBI Compliant — Lucide `Landmark`
- [ ] SOC 2 Type II — Lucide `BadgeCheck`

---

### US-22 — PaymentMethods Pills
**As a** merchant,
**I want** to see all supported payment methods,
**so that** I know my customers can pay with their preferred method.

**Acceptance criteria:**
- [ ] 6 pills from `PAYMENT_METHODS`
- [ ] Centred `flex-wrap` row
- [ ] Each pill: white bg, `border: 1px solid var(--color-border)`, blue icon, method name
- [ ] Section heading: "300+ payment methods. All in one integration."
- [ ] Section: `background: var(--color-surface)`

---

### US-23 — Payment Method Icons
**As a** visitor,
**I want** each payment method pill to have a recognisable icon,
**so that** I can identify methods at a glance.

**Acceptance criteria:**
- [ ] UPI → `Smartphone`, Credit Card → `CreditCard`, Debit Card → `CreditCard`, Net Banking → `Building2`, EMI → `Calendar`, Wallet → `Wallet`
- [ ] All icons: `color: var(--color-blue)` — 6.65:1 on white ✓

---

## E-07 — TrustBar + Footer

### US-24 — TrustBar Stats
**As a** visitor,
**I want** to see PayFlow's scale statistics in a prominent strip,
**so that** I feel confident about the platform's reliability.

**Acceptance criteria:**
- [ ] 4 stats from `TRUST_STATS`: "1 Crore+ Businesses" / "₹5 Lakh Cr+ Processed" / "99.99% Uptime" / "98.5% Success Rate"
- [ ] `background: var(--color-footer)` — white text ≈20:1 ✓✓
- [ ] Lucide icons: Building2 / TrendingUp / Server / CheckCircle
- [ ] 4-col desktop, 2-col tablet (≤768px), 1-col mobile

---

### US-25 — TrustBar Framer Motion
**As a** visitor,
**I want** the trust stats to animate in when scrolled into view,
**so that** the section feels polished and draws attention.

**Acceptance criteria:**
- [ ] `'use client'` directive on `TrustBar.tsx`
- [ ] Framer Motion `whileInView`: each stat `y: 20 → 0`, `opacity: 0 → 1`
- [ ] Stagger: `delay: index * 0.1`
- [ ] `viewport={{ once: true }}` — animates once only
- [ ] `prefers-reduced-motion`: animation collapses via `globals.css` `0.01ms` block — no JS override needed

---

### US-26 — Footer
**As a** visitor,
**I want** a footer with company links and legal information,
**so that** I can find additional pages.

**Acceptance criteria:**
- [ ] `background: var(--color-footer)` (`#030712`) — white text ≈20:1 ✓✓
- [ ] 4 columns of links; `<footer>` semantic element
- [ ] `font-weight` never exceeds 600; `grep -r "font-weight: 700" src/components/layout/Footer.module.css` → empty
- [ ] Link hover: `color: var(--color-blue)` — blue on dark = accessible
- [ ] Copyright: `new Date().getFullYear()`

---

## E-08 — QA Pass

### US-27 — Full QA Gate
**As a** developer completing the build,
**I want** to run a comprehensive QA suite,
**so that** all constraints are verified before delivery.

**Acceptance criteria:**
- [ ] `grep -r "color-green" src/components --include="*.module.css"` → only `FeeCalculator.module.css` (green exclusively for "You receive")
- [ ] `grep -r "color-green" src/components/home/ProductCard.module.css` → empty (no green card backgrounds)
- [ ] `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty
- [ ] `grep -r "useState.*fee\|useState.*received" src/components/home/FeeCalculator.tsx` → empty
- [ ] `formatFeeRate` always called with 2 args: `grep -r "formatFeeRate(" src/components --include="*.tsx"` → all occurrences have 2 comma-separated args
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0; `/out` directory present
- [ ] Lighthouse Performance ≥90, Accessibility ≥90
