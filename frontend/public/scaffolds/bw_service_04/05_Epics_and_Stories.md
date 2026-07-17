# 05 — Epics and Stories
## Indian Stock Broker Service Page · bw_service_04
### ZeroTrade · Navy + Green · DM Sans · Brokerage Calculator Hero

---

## E-01 — Foundation

### US-01 — Project Scaffold
**As a** developer starting the project,
**I want** a Next.js 14 App Router project with TypeScript strict mode and static export,
**so that** I have a compile-clean base.

**Acceptance criteria:**
- [ ] `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- [ ] `tsconfig.json`: `strict: true`
- [ ] `tsc --noEmit` exits 0 on empty scaffold

---

### US-02 — CSS Token System
**As a** developer,
**I want** all 8 colour tokens in `globals.css`,
**so that** no hex ever appears in component CSS.

**Acceptance criteria:**
- [ ] All 8 tokens: `--color-navy`, `--color-green`, `--color-dark`, `--color-white`, `--color-surface`, `--color-muted`, `--color-border`, `--color-footer`
- [ ] `--font-sans: 'DM Sans', sans-serif`
- [ ] `--radius-card: 12px`
- [ ] `.sr-only` class present
- [ ] `@media (prefers-reduced-motion: reduce)` block: `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important`
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty

---

### US-03 — TypeScript Types
**As a** developer,
**I want** all domain types in `src/types/index.ts`,
**so that** components share one source of truth.

**Acceptance criteria:**
- [ ] `TradingProduct = { id: string; name: string; description: string; icon: LucideIcon; flatFee: number; percentFee: number | null; highlighted: boolean }` exported
- [ ] `TrustBadge = { id: string; label: string; icon: LucideIcon; description: string }` exported
- [ ] `TrustStat = { id: string; icon: LucideIcon; value: string; label: string }` exported
- [ ] `HeroStat = { id: string; value: string; label: string }` exported
- [ ] `tsc --noEmit` exits 0

---

### US-04 — Mock Data and Utilities
**As a** developer,
**I want** mock data and utility functions with proven test cases,
**so that** components have correct data and brokerage math.

**Acceptance criteria:**
- [ ] `TRADING_PRODUCTS` (6): Equity Delivery (₹0 highlighted), Equity Intraday (₹20 or 0.03%), F&O (₹20 flat), Currency (₹20 flat), Commodity (₹20 flat), Mutual Funds (₹0)
- [ ] `TRUST_BADGES` (4), `TRUST_STATS` (4), `HERO_STATS` (3)
- [ ] `TRADITIONAL_FEE_RATE = 0.003` exported from `data.ts`
- [ ] `calculateBrokerage(0, null, 100000)` → `0`
- [ ] `calculateBrokerage(20, 0.0003, 10000)` → `3`
- [ ] `calculateBrokerage(20, 0.0003, 70000)` → `20`
- [ ] `formatBrokerageTag(0, null)` → `'₹0'`
- [ ] `formatBrokerageTag(20, null)` → `'₹20 flat'`
- [ ] `formatBrokerageTag(20, 0.0003)` → `'₹20 or 0.03%'`

---

## E-02 — Navigation

### US-05 — SiteNav Component
**As a** visitor,
**I want** a sticky top nav,
**so that** I can navigate the page from anywhere.

**Acceptance criteria:**
- [ ] `'use client'` directive
- [ ] `<nav aria-label="Main navigation">`
- [ ] "ZeroTrade" logo: `color: var(--color-navy)` — 11.50:1 AAA on white ✓✓
- [ ] Links: Products / Pricing / Learn / About
- [ ] "Open Account" navy button (`border-radius: 8px`)
- [ ] Scroll shadow: `box-shadow` via `useEffect` + `scroll` listener when `scrollY > 0`
- [ ] `position: sticky; top: 0; z-index: 50`
- [ ] Scroll listener cleanup: `removeEventListener` in `useEffect` return function

---

### US-06 — SiteNav Accessibility
**As a** keyboard user,
**I want** full keyboard access to all nav items,
**so that** I can navigate without a mouse.

**Acceptance criteria:**
- [ ] All items focusable `<a>` or `<button>` elements
- [ ] Focus ring visible on all interactive elements
- [ ] "Open Account" is real `<button>` or `<a href>`

---

## E-03 — Hero Section

### US-07 — Hero Content
**As a** first-time investor,
**I want** to immediately understand ZeroTrade's pricing model,
**so that** I know delivery is free.

**Acceptance criteria:**
- [ ] Headline: "Zero Brokerage on Delivery. ₹20 Flat on Everything Else."
- [ ] One-sentence subheading: `color: var(--color-muted)`
- [ ] "Open Account" (navy button) + "Calculate Savings" (ghost button) CTAs
- [ ] No TypeScript errors on page assembly

---

### US-08 — Hero Stat Pills
**As a** visitor,
**I want** three trust metrics below the CTAs,
**so that** I understand ZeroTrade's scale.

**Acceptance criteria:**
- [ ] 3 pills from `HERO_STATS`: "1.5 Crore+ Clients" / "₹0 Delivery Fee" / "Since 2010"
- [ ] Pills: `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 9999px`

---

### US-09 — Hero Layout
**As a** visitor on a wide screen,
**I want** hero content and calculator side by side,
**so that** I see pricing without scrolling.

**Acceptance criteria:**
- [ ] 2-column layout on ≥768px: content left, `BrokerageCalculator` right
- [ ] Single column on <768px
- [ ] `BrokerageCalculator` embedded directly in hero — NOT a separate page section

---

## E-04 — Trading Products Grid

### US-10 — Product Cards
**As a** visitor,
**I want** all six trading segments in a 3×2 grid,
**so that** I can compare what ZeroTrade offers.

**Acceptance criteria:**
- [ ] 6 cards in `grid-template-columns: repeat(3, 1fr)`
- [ ] 2-col on tablet (<900px), 1-col on mobile (<580px)
- [ ] Each card: Lucide icon, name, description, brokerage tag via `formatBrokerageTag`

---

### US-11 — Highlighted Delivery Card
**As a** visitor,
**I want** the free delivery product to stand out visually,
**so that** the ₹0 message is impossible to miss.

**Acceptance criteria:**
- [ ] Delivery card (`highlighted: true`): `background: var(--color-navy); color: var(--color-white)` — 11.50:1 AAA ✓✓
- [ ] Icon on highlighted card: `.iconWhite` class (white)
- [ ] Description on highlighted card: `.descMuted` (white at opacity 0.8)
- [ ] Fee tag on highlighted card: `.feeTagWhite`
- [ ] **No green background on any card** — `var(--color-green)` is ONLY for "You save" in calculator
- [ ] `grep -r "color-green" src/components/home/ProductCard.module.css` → empty

---

### US-12 — Brokerage Tag Display
**As a** visitor,
**I want** to see the fee for each segment on its card,
**so that** I can compare costs without the calculator.

**Acceptance criteria:**
- [ ] `formatBrokerageTag(product.flatFee, product.percentFee)` on every card — BOTH args always
- [ ] Delivery: `'₹0'`; Mutual Funds: `'₹0'`; Intraday: `'₹20 or 0.03%'`; F&O/Currency/Commodity: `'₹20 flat'`
- [ ] No hardcoded fee strings in JSX

---

### US-13 — Product Section Heading
**As a** visitor,
**I want** a clear heading for the products grid.

**Acceptance criteria:**
- [ ] Heading present: e.g. "Every market. One flat fee."
- [ ] `font-size: clamp(1.75rem, 4vw, 2.5rem)`
- [ ] `font-weight: 600` — never 700
- [ ] `text-align: center`

---

## E-05 — Brokerage Calculator

### US-14 — Calculator State Model
**As a** developer,
**I want** minimal state in the calculator,
**so that** computed values are never stale.

**Acceptance criteria:**
- [ ] Only `orderValue: number` and `productId: string` in `useState`
- [ ] `product`, `brokerage`, `traditionalFee`, `savings` all derived inline — never in `useState`
- [ ] `brokerage = calculateBrokerage(product.flatFee, product.percentFee, orderValue)`
- [ ] `traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)`
- [ ] `savings = traditionalFee - brokerage`
- [ ] `grep -r "useState.*brokerage\|useState.*savings\|useState.*traditional" src/components/home/BrokerageCalculator.tsx` → empty

---

### US-15 — Segment Selector
**As a** visitor,
**I want** to select any trading segment,
**so that** I can compare fees across products.

**Acceptance criteria:**
- [ ] `<select>` renders all 6 products from `TRADING_PRODUCTS`
- [ ] Each `<option>`: `{name} — {formatBrokerageTag(flatFee, percentFee)}`
- [ ] Default: `'delivery'`
- [ ] Changing segment updates all three lines immediately

---

### US-16 — Order Value Input
**As a** visitor,
**I want** to enter any order value,
**so that** I see the exact savings for my trade size.

**Acceptance criteria:**
- [ ] `<input type="number">`, default `100000`, `min="100"`, `step="1000"`
- [ ] Changing value updates all three lines on every `onChange`
- [ ] No negative or NaN savings on invalid input

---

### US-17 — Three-Line Comparison Breakdown
**As a** visitor,
**I want** a clear three-line comparison,
**so that** I understand the fee story immediately.

**Acceptance criteria:**
- [ ] Line 1: "ZeroTrade brokerage" — `₹{brokerage}` in `var(--color-text)`
- [ ] Line 2: "Traditional broker (0.3%)" — `₹{traditionalFee}` in `var(--color-muted)`
- [ ] Line 3: "You save" — `₹{savings}` in `var(--color-green)` — the ONLY use of green
- [ ] Green on white = 5.02:1 ✓ AA

---

### US-18 — Calculator Accessibility
**As a** screen reader user,
**I want** fee updates announced automatically.

**Acceptance criteria:**
- [ ] Breakdown container: `aria-live="polite"`, `aria-atomic="true"`
- [ ] Order value input: `<label htmlFor>` connected via `htmlFor`
- [ ] Segment select: `aria-label="Trading segment"`

---

### US-19 — Intraday Cap Behaviour
**As a** visitor inputting a large intraday order,
**I want** the calculator to correctly show ₹20 (not more),
**so that** I understand the flat cap benefit.

**Acceptance criteria:**
- [ ] ₹70,000 intraday → brokerage ₹20 (cap applied: `0.03% × 70000 = ₹21`, capped at ₹20)
- [ ] ₹10,000 intraday → brokerage ₹3 (below cap: `0.03% × 10000 = ₹3`)
- [ ] Crossover at ~₹66,667: above = ₹20 flat, below = 0.03%
- [ ] `calculateBrokerage(20, 0.0003, 70000)` → `20` (test passes)

---

### US-20 — Calculator Default State
**As a** visitor loading the page,
**I want** a compelling default,
**so that** I see the savings story before typing anything.

**Acceptance criteria:**
- [ ] Default: ₹1,00,000 + Equity Delivery
- [ ] Brokerage: ₹0, Traditional: ₹300, Savings: ₹300 (green)
- [ ] `calculateBrokerage(0, null, 100000)` → `0` confirmed

---

## E-06 — Trust Section

### US-21 — TrustSection Tiles
**As a** first-time investor,
**I want** to see regulatory credentials,
**so that** I trust ZeroTrade with my money.

**Acceptance criteria:**
- [ ] 4 tiles from `TRUST_BADGES`
- [ ] 4-col desktop, 2-col tablet (<768px), 1-col mobile (<480px)
- [ ] Section: `background: var(--color-surface)`
- [ ] Each tile: white card, navy icon (11.50:1 AAA ✓✓), bold label, muted description
- [ ] `border-radius: var(--radius-card)` (12px) on each tile

---

### US-22 — Trust Badges Content
**As a** visitor,
**I want** to see the correct regulatory bodies listed.

**Acceptance criteria:**
- [ ] SEBI Registered — Lucide `Shield`
- [ ] NSE Member — Lucide `Building2`
- [ ] BSE Member — Lucide `Landmark`
- [ ] CDSL DP — Lucide `Lock`

---

### US-23 — Trust Section Heading
**As a** visitor,
**I want** a clear section heading.

**Acceptance criteria:**
- [ ] Heading present: e.g. "Regulated. Audited. Trusted."
- [ ] `font-weight: 600` — never 700

---

## E-07 — TrustBar + Footer

### US-24 — TrustBar Stats
**As a** visitor,
**I want** to see ZeroTrade's scale metrics,
**so that** I feel confident about the platform.

**Acceptance criteria:**
- [ ] 4 stats from `TRUST_STATS`: "1.5 Crore+ Clients" / "₹0 Delivery Brokerage" / "₹20 Flat Intraday" / "Since 2010"
- [ ] `background: var(--color-footer)` — white text ≈20:1 ✓✓
- [ ] Lucide icons: Users / TrendingUp / BarChart2 / Calendar
- [ ] 4-col desktop, 2-col tablet, 1-col mobile

---

### US-25 — TrustBar Animation
**As a** visitor,
**I want** smooth entrance animations on the trust stats,
**so that** the section feels polished.

**Acceptance criteria:**
- [ ] `'use client'` directive on `TrustBar.tsx`
- [ ] Framer Motion `whileInView`: `y: 20 → 0`, `opacity: 0 → 1`
- [ ] Stagger: `delay: index * 0.1`
- [ ] `viewport={{ once: true }}` — animates once only
- [ ] `prefers-reduced-motion`: animation collapses via `globals.css` `0.01ms` block — no JS override

---

### US-26 — Footer
**As a** visitor,
**I want** a footer with navigation links.

**Acceptance criteria:**
- [ ] `background: var(--color-footer)` — white text ≈20:1 ✓✓
- [ ] 4 columns; `<footer>` semantic element; `font-weight` max 600
- [ ] `grep -r "font-weight: 700" src/components/layout/Footer.module.css` → empty
- [ ] Link hover: `color: var(--color-navy)` (on dark bg: navy on dark = still accessible if tinted) OR `color: rgba(255,255,255,0.7)` on hover
- [ ] Copyright: `new Date().getFullYear()`

---

## E-08 — QA Pass

### US-27 — Full QA Gate
**As a** developer completing the build,
**I want** to run a comprehensive QA suite,
**so that** all constraints are verified before delivery.

**Acceptance criteria:**
- [ ] `grep -r "color-green" src/components --include="*.module.css"` → only `BrokerageCalculator.module.css` (green exclusively for "You save")
- [ ] `grep -r "color-green" src/components/home/ProductCard.module.css` → empty (no green card backgrounds)
- [ ] `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty
- [ ] `grep -r "useState.*brokerage\|useState.*savings\|useState.*traditional" src/components/home/BrokerageCalculator.tsx` → empty
- [ ] `formatBrokerageTag` always called with 2 args: all occurrences in components have both `flatFee` and `percentFee` arguments
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0; `/out` directory present
- [ ] Lighthouse Performance ≥90, Accessibility ≥90
