# 01 — PRD
## Indian Payment Gateway Service Page · bw_service_03

---

## Product Vision

PayFlow is an Indian payment gateway that enables businesses to accept online payments via UPI, Credit Card, Debit Card, Net Banking, EMI, and Wallets. The homepage communicates three things: what payment methods are supported, how much it costs (per-transaction fee), and why businesses can trust PayFlow (security certifications, merchant count, uptime).

Unlike bw_service_01 (monthly subscription) and bw_service_02 (project budget), PayFlow charges a percentage of each transaction processed. The pricing page must make this model immediately clear with a live fee calculator.

---

## Target Users

### U1 — Early-Stage Startup / App Developer
- Age 24–35, integrating payments into first product
- Needs: simple API docs link, sandbox access, low minimum volume
- Cares about: 2% rate, free to start, quick integration (3-5 days)
- Decision trigger: "Create Account" hero CTA

### U2 — E-commerce Merchant (SMB)
- Age 30–45, running a D2C or marketplace
- Processes ₹5L–₹50L/month
- Cares about: UPI acceptance, EMI options, settlement timelines, chargeback handling
- Decision trigger: fee calculator (inputs ₹1L, sees exact fee deducted)

### U3 — Finance Manager / CTO at Growing Company
- Age 35–50, evaluating payment provider switch
- Processes ₹1Cr+/month — negotiated rates matter
- Cares about: PCI-DSS compliance, SLA uptime, API reliability, dedicated support
- Decision trigger: TrustSection certifications + "Contact Sales" CTA

### U4 — SaaS Business Needing Subscriptions
- Age 28–40, needs recurring billing for B2B SaaS
- Cares about: Subscriptions product, webhook reliability, invoice generation
- Decision trigger: Subscriptions product card

---

## Functional Requirements

### FR-001 — Hero Section
- Headline: "Accept Payments Across India — Instantly"
- Subheading (one sentence)
- CTAs: "Create Account" (blue button) + "View Docs" (ghost)
- 3 inline stat pills below CTAs: "1 Crore+ Businesses" · "99.99% Uptime" · "300+ Payment Methods"

### FR-002 — PaymentProducts Grid
- 4 product cards in 2×2 grid (2-col tablet, 1-col mobile)
- Each card: Lucide icon, product name, description, `formatFeeRate(product.feeRate, product.feeFixed)` displayed
- Highlighted card (Payment Gateway): `background: var(--color-blue); color: var(--color-white)` — 6.65:1 ✓
- Non-highlighted: white bg, dark text

### FR-003 — FeeCalculator
- `'use client'` component
- Product selector: `<select>` with 4 options, each displaying `{name} — {formatFeeRate(rate, fixed)}`
- Amount input: `<input type="number">`, default `10000`, min `1`, step `100`
- Live tri-line breakdown (ARIA live region):
  1. Amount charged — dark text
  2. Fee (rate label) — muted text with minus sign
  3. You receive — **green text** (`var(--color-green)`)
- `aria-live="polite"` on the breakdown container

### FR-004 — TrustSection
- 4 TrustBadge tiles in 4-col grid (2-col tablet, 1-col mobile)
- Surface bg (`var(--color-surface)`) for section
- Each tile: white card, Lucide icon (blue), label (bold), description (muted small text)
- Badges: PCI-DSS Level 1 / ISO 27001 / RBI Compliant / SOC 2 Type II

### FR-005 — PaymentMethods
- 6 method pills in a centred flex-wrap row
- Each pill: white bg, border, method name, small icon
- Methods: UPI / Credit Card / Debit Card / Net Banking / EMI / Wallet
- Section heading: "300+ payment methods. All in one integration."
- Light surface bg for section

### FR-006 — TrustBar
- Dark bg (`var(--color-footer)`)
- 4 stats: "1 Crore+ Businesses" · "₹5 Lakh Cr+ Processed" · "99.99% Uptime" · "98.5% Success Rate"
- Lucide icons: Building2 / TrendingUp / Server / CheckCircle
- Framer Motion stagger entrance

### FR-007 — SiteNav
- Sticky, scroll shadow
- Blue `PayFlow` logo text
- Nav links: Products / Pricing / Docs / About
- Right: "Create Account" blue button
- `<nav aria-label="Main navigation">`

### FR-008 — Page Assembly
`page.tsx` Server Component. `FeeCalculator` is the only `'use client'` boundary (imports own data). `SiteNav` uses `'use client'` for scroll shadow. All other sections are static.

---

## Non-Functional Requirements

- `tsc --noEmit` exits 0
- `npm run build` produces `/out` (static export)
- `prefers-reduced-motion` respected
- Zero hex in `.module.css`
- No `font-weight: 700` anywhere
- No `border-radius: 50%` anywhere
