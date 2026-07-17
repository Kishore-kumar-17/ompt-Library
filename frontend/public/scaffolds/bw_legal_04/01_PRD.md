# 01 — Product Requirements Document
## Productized Indian Legal Services · bw_legal_platform_04

---

## Product Vision

A homepage for an Indian legal services platform that makes company registration, trademark filing, and compliance as straightforward as buying an app subscription. The product reduces fear of legal complexity by making services tangible (fixed prices, defined deliverables, specific timelines) and guaranteeing outcomes (money-back if not filed in 7 days). Consumer e-commerce meets professional services.

---

## Personas

### Persona 1 — Arjun, 26, First-time Founder
- Starting a tech startup, knows he needs a Private Limited company but doesn't know the process
- Budget-conscious — the ₹999 vs ₹1,499 difference matters
- Needs: clear price, clear timeline ("4-7 days"), guarantee that the process will complete
- Acceptance criterion: ProductCard shows ₹999 (struck-through ₹1,499), delivery days, money-back guarantee visible

### Persona 2 — Neha, 33, Designer / Freelancer Becoming a Business
- Running a design studio as a sole prop, wants to register as LLP for liability protection
- Unfamiliar with LLP vs PVT differences — needs comparison
- Acceptance criterion: ServiceTabs lets her compare Startup tab options; feature lists explain what's included; "Talk to Expert" CTA available

### Persona 3 — Ravi, 41, SMB Owner Needing Trademark
- Has a 5-year-old retail brand, wants to protect the name before a competitor does
- Already trusts Google reviews; Trustpilot reinforces it
- Acceptance criterion: IP tab shows trademark registration service with price; both Google 4.5★ and Trustpilot 4.5★ visible in hero; ISO 27001 badge visible

### Persona 4 — QA Reviewer
- Checks white backgrounds everywhere, 6px button radius, pricing on all cards, no serif font, both rating sources present
- Acceptance criterion: Lighthouse ≥90/90; `border-radius: 6px` on every button in DevTools; no hex in `.module.css`; both rating badges in hero

---

## Functional Requirements

### FR-001: Color system — white + navy + yellow + 8 tokens
- `globals.css` has exactly 8 `--color-*` tokens
- `--color-white: #FFFFFF` — primary page and card backgrounds
- `--color-surface: #F5FAFF` — alternate section backgrounds (TrustSignals, alternate sections)
- `--color-navy: #022B50` — headings, nav, primary CTAs
- `--color-yellow: #FFD000` — nav CTA, discount badges, active tab indicator, accent highlights
- `--color-blue: #007AFF` — feature checkmarks, links
- No dark section backgrounds

### FR-002: Roboto single font
- Roboto via `next/font/google`, weights 400/500/600/700
- Applied as `--font-sans` on `<html>`
- Weight 700 used on H1 and service prices
- No serif font anywhere

### FR-003: 6px button radius
- ALL interactive buttons: `border-radius: 6px` — no exceptions
- Cards: `border-radius: 10px`
- No `border-radius: 9999px` (pill) anywhere
- No `border-radius: 0px` (sharp) anywhere
- No `border-radius: 4px` (ClearTax pattern) anywhere

### FR-004: Sticky navigation — white, always
- Height `64px`, `background: #FFFFFF`, `border-bottom: 1px solid var(--color-border)`
- Logo left (navy Roboto 700), nav links center, "Get Started" yellow button right
- Nav CTA: `background: var(--color-yellow); color: var(--color-navy); border-radius: 6px; height: 40px`
- No dark nav. No scroll-triggered color change.

### FR-005: Split hero layout
- Left column 55%: eyebrow, H1, subheading, rating badges, CTAs
- Right column 45%: floating service preview card or illustration
- `min-height: 75vh`, white background
- Eyebrow: "Trusted by 50,000+ Businesses · ISO 27001 Certified"
- H1: Roboto 700, `#022B50`, `clamp(2.25rem, 4vw, 3.25rem)`
- Dual rating row: Google ⭐4.5 (20K+ Reviews) AND Trustpilot ⭐4.5 (7.5K+)
- ISO 27001 badge inline with ratings
- Two CTAs: "Register My Business" (primary, navy) + "Talk to an Expert" (secondary, navy outline)

### FR-006: Service tabs + ProductCard grid
- 4 tabs: Startup | Business | Compliance | IP & Trademark
- Active tab: navy text, `border-bottom: 3px solid var(--color-yellow)`
- Under each tab: 3 ProductCards in a row
- ServiceTabs is `'use client'` — manages tab state
- ProductCard is a server component (static pricing data)

### FR-007: ProductCard — transparent pricing
- Service name: Roboto 600, navy
- Original price: `<del>₹1,499</del>` — muted grey, struck through
- Discounted price: Roboto 700, navy, large
- Discount badge: yellow background, navy text, `-33% Off`
- Delivery: "Filed in 4-7 days" with Clock icon
- Feature list: 4 items max, Lucide `Check` in `--color-blue`
- CTA: "Get Started" navy primary button, `fullWidth`, `border-radius: 6px`
- Popular card: "Most Popular" yellow ribbon at top-right of card
- "Contact for pricing" is forbidden
- "+ Govt. Fee" fine print below discounted price

### FR-008: TrustSignals section
- Background: `--color-surface` (`#F5FAFF`)
- 4 blocks side by side with icons (Lucide) in navy:
  1. ISO 27001 — "Only certified platform in India"
  2. Money-Back — "Application submitted in 7 days or 100% refund"
  3. Google Rating — "4.5★ · 20,000+ Happy Reviews"
  4. Businesses Served — "50,000+ Businesses Registered"

### FR-009: HowItWorks
- 3 steps: "Choose a Service" → "Share Documents" → "We Handle the Rest"
- Navy numbered circles: 40×40px, `border-radius: 50%`, Roboto 700 white number
- Connector: `height: 2px; background: var(--color-yellow)` (desktop only)
- Step title: Roboto 600, navy
- Step description: muted grey

### FR-010: Testimonials
- 3 white cards with `border-radius: 10px`, `box-shadow: 0 4px 18px rgba(0,0,0,0.10)`
- Star rating (all 5★)
- 2-sentence quote in muted grey, Roboto 400
- Client name: Roboto 600, navy
- Company type: muted grey (e.g., "Private Limited Company")

### FR-011: Footer
- `background: var(--color-navy)`, white text
- 4-column layout: Brand+tagline | Services | Resources | Company
- Link hover: `color: var(--color-yellow)` (yellow, not white, on dark navy)
- Bottom bar: ISO 27001, Trustpilot badges at 50% opacity; copyright muted

### FR-012: Motion — Framer Motion section entrances
- Every section: `opacity: 0; translateY(40px)` → visible, `700ms ease-out`
- Stagger between children: `200ms`
- `prefers-reduced-motion`: all transitions disabled

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA contrast | All text passes |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Module files | Zero grep results |
| Build | `npm run build` succeeds (static export) |

---

## Out of Scope
- Actual document upload or filing workflow
- User authentication or dashboard
- Real payment integration
- Lawyer marketplace / individual lawyer profiles
- Blog or legal news section
- Form validation beyond basic HTML5
