# 01 — PRD
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## Product Vision

MailFlow is an Indian email marketing and automation platform built for SMBs, startups, and growing e-commerce brands. The homepage communicates three things: what the product does, how much it costs, and why customers trust it.

Unlike the real estate builds in this library, MailFlow sells a software service. There are no individual listings to browse. The page sells a recurring subscription at one of four price tiers. The primary conversion goal is plan signup, not property inquiry.

---

## Target Users

### U1 — Early-Stage Startup Founder
- Age 26–38, building their first product
- Wants to start sending email newsletters immediately
- Budget: free or Essentials tier (₹749/mo)
- Cares about: free tier availability, ease of setup, template quality
- Decision: starts free, upgrades when they hit contact limits

### U2 — D2C / E-commerce Brand Owner
- Age 30–45, running an Indian D2C brand (fashion, food, beauty)
- 5,000–30,000 customer contacts already
- Wants: automation, A/B testing, integration with Shopify/WooCommerce
- Budget: Standard tier (₹1,499/mo)
- Decision: comparing MailFlow vs competitors on features + price

### U3 — Marketing Manager at Mid-Sized Company
- Age 28–40, manages email for a team of 3–5 marketers
- 20,000–80,000 contacts, sends weekly campaigns
- Needs: team collaboration, advanced analytics, dedicated support
- Budget: Standard to Premium
- Decision: requires sign-off from finance — needs clear pricing page

### U4 — Enterprise/Agency Evaluator
- Age 35–50, managing multiple client accounts or large list
- 50,000+ contacts, high send volume
- Needs: dedicated IP, account manager, SLA
- Budget: Premium (₹4,999/mo or custom)
- Decision: contacts sales team, doesn't self-serve

---

## Functional Requirements

### FR-001 — Hero Section
- Headline communicating the core value proposition
- Subheading with supporting detail (2 lines max)
- Primary CTA: "Get Started Free" (dark button)
- Secondary CTA: "See Pricing" (ghost/outline button)
- Right-side illustration area (styled div, placeholder for illustration asset)
- White background — no yellow in hero

### FR-002 — Plan Grid
- 4 plan cards: Free, Essentials, Standard (highlighted), Premium
- Billing toggle above the grid: Monthly / Yearly
- Yearly option shows "Save up to 20%" savings pill
- Each card: plan name, price via `formatPlanPrice(tier, period)`, contacts limit, emails/mo, features list with checkmarks, CTA button
- Highlighted card ("Standard") uses yellow bg + dark text
- Yearly billing: show `calculateYearlySavings(tier)` under price — conditional JSX

### FR-003 — BillingToggle
- Two buttons: "Monthly" and "Yearly"
- `aria-pressed` on each button
- "Yearly" option has savings pill (`background: var(--color-yellow); color: var(--color-dark)`)
- State lives in `PlanGrid` — `BillingToggle` is a controlled component receiving `period` and `onChange`

### FR-004 — Feature Showcase
- 3 feature rows in alternating layout: text-left/image-right, image-left/text-right, text-left/image-right
- Each row: feature title, 2–3 sentence description, Lucide icon, illustration placeholder div
- Features: "Smart Campaigns", "Automation Flows", "Analytics & Insights"
- Section bg: white for rows 1+3, surface `#F5F5F5` for row 2

### FR-005 — Testimonials
- 3 testimonial cards in a row
- Each: quote text, customer name, role, company name
- White cards, border, 12px radius
- Indian companies: reference realistic Indian SMB names

### FR-006 — Trust Bar
- **Yellow background** section (`var(--color-yellow)`)
- All text: `var(--color-dark)` — demonstrates yellow-section pattern
- 4 stats: "50,000+ Businesses", "4 Crore+ Emails Sent Daily", "99.9% Deliverability", "4.8/5 Rating"
- Lucide icons: `Building2`, `Send`, `CheckCircle`, `Star`
- Framer Motion stagger entrance

### FR-007 — SiteNav
- Sticky white nav, scroll shadow
- Yellow "MailFlow" logo text (purple text on white, but here yellow text on white)
  - Wait — yellow on white = 1.31:1 ✗✗ — FAILS. Logo text must use `var(--color-dark)` not yellow.
  - Logo: "Mail" in `var(--color-dark)` + "Flow" in `var(--color-dark)` with yellow underline or yellow dot accent
  - Alternative: logo uses dark text, nav uses yellow as accent on hover only
- Nav links: Features / Pricing / Templates / Blog
- Right: "Get Started Free" dark button
- `<nav aria-label="Main navigation">`

### FR-008 — Footer
- Dark bg (`var(--color-dark)`)
- 4 columns: Product / Resources / Company / Legal
- White text on dark = high contrast ✓✓

### FR-009 — Page Assembly
- `page.tsx` is a Server Component — no `'use client'`
- `PlanGrid` is the only `'use client'` boundary (billing period toggle)
- `SiteNav` requires `'use client'` for scroll shadow via `useEffect`
- All other sections are static server components

---

## Logo Constraint (addendum to FR-007)

Yellow on white background: L(yellow) = 0.749, L(white) = 1.0.
Contrast = (1.0 + 0.05) / (0.749 + 0.05) = 1.31:1 ✗✗

**The MailFlow logo text cannot be yellow on a white nav background.** Options:
1. Dark text logo with yellow decorative element (dot, underline, badge)
2. Dark text "MailFlow" with a yellow square/rect logo icon before it
3. Dark text with the letter "M" in a yellow rounded-rect

This constraint is documented in `07_Guide.md` Constraint Deep-Dive 1.

---

## Non-Functional Requirements

- `tsc --noEmit` exits 0
- `npm run build` produces `/out` (static export)
- `prefers-reduced-motion` — all Framer Motion respects this
- Zero hex in `.module.css` files (no gradient exception needed — no illustrated backgrounds in CSS)
- No `font-weight: 700` anywhere
- No `border-radius: 50%` anywhere
