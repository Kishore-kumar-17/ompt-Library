# 01 — PRD
## Indian Stock Broker Service Page · bw_service_04

---

## Product Vision

ZeroTrade is an Indian flat-fee discount stockbroker. The homepage communicates three things: what trading segments are supported, how much each costs (₹0 or ₹20 flat), and how much money you save compared to traditional brokers charging 0.3%.

Unlike bw_service_03 (percentage fee model), ZeroTrade's pricing is binary: either completely free (equity delivery, mutual funds) or a hard-capped flat fee of ₹20. The pricing page must make this asymmetry immediately clear — the hero headline states the ₹0 / ₹20 contrast, and the interactive BrokerageCalculator dramatises the savings.

---

## Target Users

### U1 — First-Time Investor (22–30)
- Opening a Demat account for the first time
- Scared of hidden charges; does not understand brokerage jargon
- Cares about: ₹0 for delivery (long-term investing), account opening ease
- Decision trigger: "₹0 brokerage on equity delivery" in hero headline

### U2 — Active Trader (28–42)
- Trades intraday or F&O daily; brokerage compounds over hundreds of trades
- Processes ₹10L–₹1Cr+ per month in order value
- Cares about: ₹20 flat cap, no percentage erosion at high volumes, platform reliability
- Decision trigger: BrokerageCalculator showing ₹280 saved per trade vs traditional

### U3 — Mutual Fund Investor (30–50)
- Invests monthly via SIP; wants zero-commission direct funds
- Cares about: ₹0 for direct mutual funds, no trail commission eating returns
- Decision trigger: Mutual Funds product card showing ₹0

### U4 — Switching From Traditional Broker (35–55)
- Currently paying 0.3%–0.5% with a full-service broker
- Cares about: SEBI registration, platform credibility, client count
- Decision trigger: TrustSection certifications + calculator savings comparison

---

## Functional Requirements

### FR-001 — Hero Section
- Headline: "Zero Brokerage on Delivery. ₹20 Flat on Everything Else."
- Subheading: one sentence explaining the model
- CTAs: "Open Account" (navy button) + "Calculate Savings" (ghost)
- 3 stat pills: "1.5 Crore+ Clients" · "₹0 Delivery Brokerage" · "Since 2010"

### FR-002 — TradingProducts Grid
- 6 products in 3×2 grid (2-col tablet, 1-col mobile)
- Each card: Lucide icon, product name, description, `formatBrokerageTag(product.flatFee, product.percentFee)` displayed
- Highlighted card (Equity Delivery): `background: var(--color-navy); color: var(--color-white)` — 11.50:1 AAA ✓✓
- Non-highlighted: white bg, dark text
- Never: green background on any card

### FR-003 — BrokerageCalculator
- `'use client'` component
- Segment selector: `<select>` with 6 options, each showing `{name} — {formatBrokerageTag(flatFee, percentFee)}`
- Order value input: `<input type="number">`, default `100000`, min `100`, step `1000`
- 3-line comparison breakdown (ARIA live region):
  1. "ZeroTrade brokerage" — ₹{brokerage} in dark text (or ₹0)
  2. "Traditional broker (0.3%)" — ₹{traditionalFee} in muted
  3. "You save" — ₹{savings} in **green text** (`var(--color-green)`)
- `aria-live="polite"` on the breakdown container

### FR-004 — TrustSection
- 4 TrustBadge tiles in 4-col grid (2-col tablet, 1-col mobile)
- Surface bg for section
- Each tile: white card, Lucide icon (navy), label (bold), description (muted)
- Badges: SEBI Registered / NSE Member / BSE Member / CDSL Depository Participant

### FR-005 — TrustBar
- Dark bg (`var(--color-footer)`)
- 4 stats: "1.5 Crore+ Clients" · "₹0 Delivery Brokerage" · "99.9% Uptime" · "20+ Years Combined Team"
- Lucide icons: Users / TrendingDown / Server / Award
- Framer Motion stagger entrance

### FR-006 — SiteNav
- Sticky, scroll shadow
- Navy "ZeroTrade" logo text
- Nav links: Products / Pricing / Learn / About
- Right: "Open Account" navy button

### FR-007 — Page Assembly
`page.tsx` Server Component. `BrokerageCalculator` is the only primary `'use client'` boundary. `SiteNav` uses `'use client'` for scroll shadow. `TrustBar` uses `'use client'` for Framer Motion. All other sections are static.

### FR-008 — Logo Contrast Addendum
Navy `#1E3A5F` on white nav bg = 11.50:1 ✓✓ AAA. The ZeroTrade logo text uses `var(--color-navy)` — no hex, no special treatment. This is the one case where the AAA ratio makes even small logo text compliant.

---

## Non-Functional Requirements

- `tsc --noEmit` exits 0
- `npm run build` produces `/out` (static export)
- `prefers-reduced-motion` respected
- Zero hex in `.module.css`
- No `font-weight: 700` anywhere
- No `border-radius: 50%` anywhere
