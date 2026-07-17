# 01 — PRD
## Indian Property Listing Portal · bw_realestate_01

---

## Product Vision

VeriProperty is an Indian property portal where users search for residential and commercial properties to buy, rent, or lease. The platform's value proposition is verified listings with RERA registration, direct owner contact (zero brokerage), and structured data that enables confident decisions — price per sqft, possession timeline, furnishing status, floor details. The hero search widget is the primary entry point; property cards are the primary content unit.

---

## Personas

### Persona 1 — The First-Time Buyer
**Name:** Rahul, 31
**Situation:** IT professional in Bangalore, budget ₹60–80 L, looking for a 2 BHK apartment near Electronic City for his commute.
**Goal:** Find verified, RERA-registered properties within budget. Wants to contact the owner directly (no broker).
**Pain point:** Most listings are from agents; hidden brokerage fees inflate effective cost.
**How VeriProperty serves him:** FilterBar → "2 BHK" + "Ready to Move". Verified + RERA badges on cards. "Contact Owner" CTA — zero brokerage.

### Persona 2 — The Relocating Family
**Name:** Sunita, 44
**Situation:** Husband transferred to Hyderabad. Needs a 3 BHK house for family with school-age kids. Budget ₹80 L–1 Cr.
**Goal:** Find a furnished or semi-furnished house ready to move into quickly.
**Pain point:** Under-construction properties require waiting; unfurnished properties require investment.
**How VeriProperty serves her:** FilterBar → "3 BHK" + "Ready to Move" + "Semi-Furnished". Possession status badge on card confirms availability.

### Persona 3 — The Young Professional Renter
**Name:** Arjun, 26
**Situation:** Joins a new company in Koramangala, Bangalore. Needs a 1–2 BHK furnished flat near office.
**Goal:** Find a furnished flat for rent under ₹30,000/mo.
**Pain point:** Cannot distinguish owner listings from agent listings until he calls.
**How VeriProperty serves him:** Rent tab in HeroSearch. FilterBar → "1 BHK" + "Furnished". ListingSourcePill on each card shows "Owner" / "Agent" before he clicks contact.

### Persona 4 — The NRI Investor
**Name:** Priya, 39
**Situation:** Based in the US, wants to invest in Mumbai real estate. Budget ₹3–4 Cr.
**Goal:** Find premium properties in Bandra or Juhu with clear RERA registration and builder credentials.
**Pain point:** Can't physically visit properties. Needs verified, trustworthy listings with maximum photos.
**How VeriProperty serves her:** RERA badge + Builder source = established credentials. Photo count badge on image (e.g., "24 Photos") enables virtual assessment.

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Hero search widget with 5 mode tabs (Buy/Rent/PG/Commercial/Plots) | Must |
| FR-02 | Mode switch renders different form fields via conditional JSX | Must |
| FR-03 | Submit scrolls to `#property-section` | Must |
| FR-04 | FilterBar: simultaneous filter by BHK + possession + property type + furnished | Must |
| FR-05 | `useMemo` for filter operations | Must |
| FR-06 | Result count displayed and updated on filter change | Must |
| FR-07 | ARIA live region for result count | Must |
| FR-08 | View toggle: grid vs list layout for property results | Should |
| FR-09 | All prices displayed via `formatPrice()` in lakh/crore format | Must |
| FR-10 | CTA text derived from `property.listingSource` — never hardcoded | Must |
| FR-11 | Verified badge shown conditionally — green text, NOT white-on-green | Must |
| FR-12 | RERA badge shown conditionally | Must |
| FR-13 | Possession status badge on property image | Must |
| FR-14 | Photo count badge on property image | Should |
| FR-15 | ListingSource pill (Owner/Builder/Agent) on each card | Must |
| FR-16 | FeaturedProjects section with 3 builder project cards | Should |
| FR-17 | TrustBar section with 4 trust statistics | Should |
| FR-18 | CityLinks section with 8 major Indian cities | Should |
| FR-19 | `tsc --noEmit` exits 0 | Must |
| FR-20 | `npm run build` produces `/out` | Must |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| WCAG AA contrast | All text passes |
| Zero hex in `.module.css` | Enforced via grep |
| `formatPrice()` on all prices | Enforced via grep (no raw price display) |
| Dynamic CTA text | No hardcoded "Contact Owner" strings |
| Poppins only | No other fonts |

---

## Out of Scope

- Real property search API or database
- Map view for properties
- EMI calculator
- Property comparison feature
- User accounts / saved properties
- Builder/agent verification workflow
- Payment / booking flow
- Mortgage / home loan integration
- Review and rating system for localities
