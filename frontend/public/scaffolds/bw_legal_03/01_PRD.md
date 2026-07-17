# 01 — Product Requirements Document
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## Product Vision

A homepage for India's leading tax filing and CA services platform. The product reduces the anxiety of tax filing by making outcomes visible (₹ refunds), paths clear (DIY vs. expert), and credentials transparent (ISO, SOC 2, CA count). The site is a consumer fintech product first, a professional services directory second.

---

## Personas

### Persona 1 — Ankit, 28, Software Engineer, First-time filer
- Salaried employee, foreign income from ESOP — doesn't know which ITR form to file
- Anxious about making mistakes and getting a tax notice
- Needs: reassurance (certifications, accuracy claims), a clear "expert help" path
- Acceptance criterion: "Get CA Help" CTA visible alongside "File Yourself"; trust signals in hero including accuracy stat

### Persona 2 — Priya, 34, Freelancer / Consultant
- Has multiple income sources; uses tally but finds ITR confusing
- Cost-sensitive — evaluates the ₹999 Expert Assist vs ₹1,999 CA Filing tiers
- Acceptance criterion: Service tier pricing visible and comparable; feature checklist shows which tier covers freelancer income

### Persona 3 — Rahul, 45, SMB Owner
- Files GST monthly, pays professional tax — needs a CA not a DIY tool
- Wants to know CA response time and qualification
- Acceptance criterion: ExpertStrip shows "500+ ICAI-qualified CAs" and "<24hr turnaround"; CA Filing tier highlighted as recommended

### Persona 4 — QA Reviewer
- Verifies dark theme throughout, 4px button radius, pricing visibility, star ratings present, no serif fonts
- Acceptance criterion: Lighthouse ≥90/90; no hex in CSS Module files; 4px button radius confirmed; all sections dark background; pricing on all 3 tiers

---

## Functional Requirements

### FR-001: Color system — dark + blue + 8 tokens
- `globals.css` has exactly 8 `--color-*` tokens
- `--color-dark: #151515` — every section background, no exceptions
- `--color-blue: #1678FB` — every CTA, every active/interactive state
- `--color-blue-tint: rgba(22,120,251,0.08)` — recommended tier card highlight
- `--color-surface: rgba(255,255,255,0.04)` — card backgrounds on dark
- No white or light background used on any section

### FR-002: Plus Jakarta Sans single font
- Plus Jakarta Sans loaded via `next/font/google`, weights 400/500/600/700/800
- Applied as `--font-sans` on `<html>`
- Weight 800 used on H1 and all large stat values
- No serif font anywhere

### FR-003: 4px button radius
- ALL interactive buttons: `border-radius: 4px` — no exceptions
- Cards: `border-radius: 8px`
- No `border-radius: 9999px` (pill) anywhere
- No `border-radius: 0px` (sharp) anywhere
- The 4px radius is confirmed in DevTools on every CTA

### FR-004: Always-dark sticky navigation
- Height `64px`, `background: #151515` or `--color-darker`
- `border-bottom: 0.5px solid var(--color-border)`
- NO transparent-at-top state — always dark
- Logo left, nav links center, "File Now" blue button right
- Blue CTA: `background: var(--color-blue); border-radius: 4px; height: 40px`

### FR-005: Dual-path hero
- `min-height: 80vh`, dark background
- Eyebrow: "India's #1 Tax Platform" — blue, uppercase, weight 600, `0.16em` tracking
- H1: Plus Jakarta Sans 800, `#EDEFF2`, `clamp(2.5rem,5vw,3.75rem)`
- Subheading: weight 400, muted `#929FB0`
- Trust row: `⭐ 4.9/5  |  45K+ Reviews  |  ₹5,346 Cr+ Refunds Delivered`
- Two CTAs, side by side, same height, same radius:
  - "File Yourself" — primary (blue bg, white text)
  - "Get CA Help" — secondary (transparent, border, white text)
- Both CTAs must be present and equal in visual weight

### FR-006: Trust strip
- Company logo row (Swiggy, Myntra, Zomato, Flipkart, PhonePe, Paytm) — CSS marquee animation
- Certification badges row: ISO 27001, SSL 128-bit, SOC 2 — icon + label
- Thin divider `0.5px solid var(--color-border)` separating from hero
- No color on logos — white/muted, monochrome-style on dark bg

### FR-007: Service tier cards with visible pricing
- 3 tiers: Self File (₹0), Expert Assist (₹999/year), CA Filing (₹1,999/year)
- Dark card: `background: var(--color-surface); border: 0.5px solid var(--color-border); border-radius: 8px`
- Recommended (CA Filing): `border-color: var(--color-blue); background: var(--color-blue-tint)`
- Price: Plus Jakarta Sans 800, `#EDEFF2`
- "Recommended" badge above recommended card: small blue pill label
- Feature checklist: 4–6 items per tier, blue checkmark icon on included features
- CTA per card: primary (blue) on recommended, secondary on others
- Pricing MUST be visible — no "Contact for pricing" patterns

### FR-008: How it works steps
- 3 steps: "Upload Documents" → "CA Reviews & Prepares" → "File & Get Refund"
- Numbered circles: `background: var(--color-blue); width: 40px; height: 40px; border-radius: 50%`
- Connector line between circles: `height: 1px; background: rgba(22,120,251,0.3)` (desktop only)
- Step title: `#EDEFF2` weight 600
- Step description: `#929FB0` weight 400

### FR-009: Stats row
- 4 outcome metrics on dark background (not a colored strip):
  - "₹5,346 Cr+" — Lifetime Refunds Delivered
  - "8M+" — Happy Taxpayers
  - "99.9%" — Filing Accuracy
  - "4.9★" — Average Rating
- Values: Plus Jakarta Sans 800, `clamp(2rem,4vw,3rem)`, `#EDEFF2`
- Labels: `0.875rem`, weight 400, `#929FB0`
- Count-up animation on IntersectionObserver (once only)
- No colored strip background — dark `#151515` throughout

### FR-010: Expert / CA strip
- "Reviewed by 500+ ICAI-Qualified CAs"
- Response time: "< 24 Hour Turnaround"
- Accuracy: "100% Accuracy Guarantee"
- 3 callout blocks with icons in blue
- NOT individual profiles — team capability callout only

### FR-011: Footer
- `background: var(--color-dark)`, `border-top: 0.5px solid var(--color-border)`
- 4-column layout: logo + tagline | Services | Resources | Company
- Blue link hover
- Certification badges row at very bottom: ISO 27001, SSL, SOC 2
- Copyright in muted grey

### FR-012: Framer Motion section entrances
- Every section: `opacity: 0; translateY(50px)` → visible, `800ms ease-out`
- Stagger between children: `300ms`
- Logo marquee: CSS `animation: marquee` linear infinite
- Stats count-up: IntersectionObserver fires once
- `prefers-reduced-motion`: all animations/transitions disabled instantly

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA contrast | All text passes; see contrast audit |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Module files | Zero grep results |
| Build | `npm run build` succeeds (static export) |

---

## Out of Scope
- Actual file upload or tax calculation
- User login or dashboard
- Real payment integration
- GST filing workflow
- Individual CA profile pages
- Blog/resources section
