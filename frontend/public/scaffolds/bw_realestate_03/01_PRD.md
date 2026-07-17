# 01 — PRD
## Indian Premium Property Portal · bw_realestate_03

---

## Product Vision

SquareView is a premium-tier Indian property portal targeting buyers and investors who want curated, high-quality listings with investment data — not a fire-hose of raw listings. The platform differentiates on three axes: verified agents (human intermediaries with track records), investment metrics (rental yield and capital appreciation displayed on every card), and premium builder partnerships (New Launches with official launch dates).

The target buyer is more sophisticated than the first-time buyer using MagicBricks — they want data to make investment decisions, not just find a home. A 4.2% rental yield on a ₹1.2 Cr apartment in Jubilee Hills is actionable data. An agent with 340 verified transactions is a credential. A New Launch from an A+ developer is a curated opportunity.

---

## Personas

### Persona 1 — The NRI Investor
**Name:** Priya, 39
**Situation:** Based in Dubai, wants to invest ₹2–3 Cr in Hyderabad real estate. Rental income expected.
**Goal:** Find high-yield properties (≥4% rental yield) from verified builders with good appreciation track record.
**How SquareView serves her:** CategoryFilter → "High Yield" shows only properties with rentalYield ≥ 4%. YieldBadge prominent on every card. Agent Vikram Shah specialises in NRI Services — she can contact him directly from AgentDirectory. CityLinks includes Dubai (familiar market) alongside Hyderabad.

### Persona 2 — The HNI Buyer (High Net Worth Individual)
**Name:** Rahul, 48
**Situation:** Mumbai-based entrepreneur looking for a luxury penthouse in Bandra West. Budget ₹3+ Cr.
**Goal:** Only see premium curated listings. Wants builder with A+ reputation, Square Yards verified listing.
**How SquareView serves him:** CategoryFilter → "Luxury" (≥₹1 Cr) filters to 4 properties. SqVerifiedBadge (teal) signals platform curation. Agent Arjun Mehta specialises in Luxury Apartments — trusted contact.

### Persona 3 — The IT Professional (Ready to Move In)
**Name:** Kavya, 32
**Situation:** New job in Hyderabad, wants to buy (not rent) a 3 BHK ready-to-move apartment. Budget ₹1–1.5 Cr.
**Goal:** Find apartments she can move into immediately — no under-construction delays.
**How SquareView serves her:** CategoryFilter → "Ready to Move" shows 4 properties. Possession badge on card confirms availability. Agent Priya Nair specialises in Residential properties.

### Persona 4 — The Early Investor (New Launch)
**Name:** Siddharth, 35
**Situation:** Wants to invest in a New Launch for maximum capital appreciation. Budget ₹45 L–₹1.20 Cr.
**Goal:** Find New Launch projects from reputable developers at pre-launch prices.
**How SquareView serves him:** CategoryFilter → "New Launch" shows 2 properties. NewLaunches section with dedicated cards showing launchDate and unit types. capitalAppreciation of 10–11% visible on card badges.

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | HeroSection: dark teal gradient bg, city+locality search inputs, popular locality tag cloud | Must |
| FR-02 | CategoryFilter: 5 pill tabs (All / Luxury / Ready to Move / New Launch / High Yield), single-select | Must |
| FR-03 | `useMemo` wraps `filterByCategory` | Must |
| FR-04 | ARIA live region for filtered property count | Must |
| FR-05 | PremiumPropertyCard: standard fields + investment row (yield badge + appreciation %) | Must |
| FR-06 | YieldBadge: gold bg, dark text (`color: var(--color-text)`) — never white on gold | Must |
| FR-07 | SqVerifiedBadge: teal text — NOT green | Must |
| FR-08 | `formatYield(n)` utility: `${n.toFixed(1)}% p.a.` | Must |
| FR-09 | All prices via `formatPrice()` | Must |
| FR-10 | CTA: `Contact ${property.listingSource}` | Must |
| FR-11 | AgentDirectory: 3 AgentCards with rating, transactions, specializations | Must |
| FR-12 | Agent photos: `border-radius: 8px` — no circles | Must |
| FR-13 | Rating displayed as `{agent.rating.toFixed(1)} ★`, gold colour | Must |
| FR-14 | NewLaunches: horizontal scroll of 3 NewLaunchCards with launchDate and price range | Should |
| FR-15 | Services: 4 tiles (Home Loans / Legal / Interior / NRI Services) | Should |
| FR-16 | CityLinks: 10 entries — 8 Indian cities + Dubai + London | Should |
| FR-17 | TrustBar: dark bg, 4 stats | Should |
| FR-18 | SiteNav: teal logo, scroll shadow, language selector | Must |
| FR-19 | Footer: dark bg, 5-column nav | Should |
| FR-20 | `tsc --noEmit` exits 0 | Must |
| FR-21 | `npm run build` produces `/out` | Must |
| FR-22 | Framer Motion scroll entrances on major sections | Should |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| WCAG AA contrast | All text passes — white/teal 5.99:1, dark/gold 5.94:1 |
| Zero hex in `.module.css` | Exception: hero gradient (documented with comment) |
| `formatPrice()` on all prices | Enforced via grep |
| `formatYield()` on all yield values | Never raw decimal |
| No white on gold | YieldBadge and gold button always use dark text |
| Dynamic CTA | `Contact ${listingSource}` |
| DM Sans only | No Poppins, Inter, Roboto, Lato |
| Max font-weight 600 | No 700 |
| No circular elements | `border-radius: 50%` forbidden |
| Single-dim filter | No multi-select — one category at a time |

---

## Out of Scope

- Property detail page (that's bw_realestate_02)
- EMI calculator (bw_realestate_02)
- Map view
- Multi-currency display (INR only — international cities link to INR listings)
- Real agent profiles / messaging
- User accounts
- Booking / payment flow
- Property comparison
- Price negotiation tools
