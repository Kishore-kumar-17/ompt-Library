# 01 — PRD
## Indian Property Detail Page · bw_realestate_02

---

## Product Vision

VeriAcres is the property detail page of an Indian real estate portal. After a user finds a listing card on the search grid (bw_realestate_01), they click through to this page. VeriAcres gives them the complete picture: a full photo gallery, tab-organized content (overview, floor plans, amenities, locality, price trends), a prominent RERA compliance block, a contact form, and an EMI calculator. The page's purpose is to move a visitor from interest to inquiry — confident enough in the property details to submit a contact request.

---

## Personas

### Persona 1 — The NRI Investor (Deep Researcher)
**Name:** Priya, 39
**Situation:** Based in the US, wants to buy a 3 BHK in Whitefield, Bangalore as an investment. Cannot visit in person.
**Goal:** Verify RERA registration, understand floor plan and area breakdown, check price trends in the locality, see photo count to assess how complete the listing is.
**Pain point:** Without physical access, she needs maximum data on one screen. Generic listing cards don't give enough detail.
**How this page serves her:** PropertyGallery (18 photos), FloorPlanTab with super/carpet area breakdown, RERASection with registration number she can verify on the KRERA portal, PriceTrendTab showing 6 months of price data, ContactForm to reach the builder directly.

### Persona 2 — The First-Time Buyer (Reassurance Seeker)
**Name:** Rahul, 31
**Situation:** IT professional, looking at a 2 BHK apartment. Uncertain about RERA — doesn't know what it means or if it applies to this property.
**Goal:** Understand if the property is legally registered and safe to buy. Calculate whether he can afford it on EMI.
**Pain point:** RERA badges on listing cards mean nothing if he doesn't understand the registration details.
**How this page serves him:** RERASection explains the registration number and expiry date clearly. EMICalculator lets him enter his loan amount (₹75 L), his bank's rate (8.5%), and tenure (20 years) — immediately shows his monthly outgo.

### Persona 3 — The Relocating Family (Logistics Planner)
**Name:** Sunita, 44
**Situation:** Husband transferred to Bangalore. Found a promising 3 BHK in Whitefield. Now needs to evaluate: is the area good for kids (schools, hospitals)? Is the property ready to move in?
**Goal:** Check nearby schools and hospitals, assess walkability, understand amenities (children's play area, pool).
**Pain point:** Listing cards show locality name but not what's around.
**How this page serves her:** LocalityTab with nearby schools (TISB 0.8 km), hospitals (Apollo Clinic 1.2 km), walk score and transit score. AmenitiesTab with children's play area confirmed.

### Persona 4 — The Rental Seeker (Quick Qualifier)
**Name:** Arjun, 26
**Situation:** New job in Whitefield. Wants a 2 BHK furnished flat. Found a listing. Needs to quickly verify it's genuine, then call.
**Goal:** Confirm it's an owner listing (no brokerage), it's verified, and the contact button is visible without scrolling.
**How this page serves him:** ListingSourcePill in PropertyHeader ("Owner"), VerifiedBadge, sticky sidebar with ContactForm always visible on desktop. CTA: "Contact Owner".

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | PropertyGallery: hero image (16:9) + thumbnail strip (5 thumbs) + photo count badge | Must |
| FR-02 | Active thumbnail highlighted with orange border | Must |
| FR-03 | PropertyHeader: title, badge row (Source + Verified + RERA), price via formatPrice(), key specs grid | Must |
| FR-04 | Key specs: BHK, super area, carpet area, floor/total floors, facing, age, possession, furnishing | Must |
| FR-05 | PropertyTabs: 5 tabs (Overview / Floor Plan / Amenities / Locality / Price Trends) | Must |
| FR-06 | Tab switching via conditional JSX — content unmounts/mounts, never CSS hidden | Must |
| FR-07 | ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"` | Must |
| FR-08 | RERASection: always visible below tabs — RERA number, expiry date, authority, portal link | Must |
| FR-09 | RERASection only renders when `reraNumber` is present (conditional) | Must |
| FR-10 | ContactForm: name, phone, email, message inputs; submit button | Must |
| FR-11 | EMICalculator: loan amount input, interest rate input, tenure input; live result | Must |
| FR-12 | EMI formula: `Math.round(P×r×(1+r)^n/((1+r)^n−1))` — never a lookup table | Must |
| FR-13 | EMI result displayed via `formatPrice()` | Must |
| FR-14 | SidebarPanel toggles between ContactForm and EMICalculator | Must |
| FR-15 | Sidebar sticky on desktop: `position: sticky; top: 80px` | Must |
| FR-16 | AmenitiesTab: grouped by category (Fitness / Recreation / Security / Convenience) | Should |
| FR-17 | LocalityTab: walk score bar, transit score bar, nearby places with distance and category | Should |
| FR-18 | FloorPlanTab: 3 floor plan entries with BHK, super area, carpet area | Should |
| FR-19 | PriceTrendTab: 6 price trend points displayed as a data list or simple bar chart | Should |
| FR-20 | SimilarProperties: 3 SimilarPropertyCards with price via formatPrice() and dynamic CTA | Should |
| FR-21 | Breadcrumb: `Home > City > Property Type > Locality > Property Name` | Should |
| FR-22 | `tsc --noEmit` exits 0 | Must |
| FR-23 | `npm run build` produces `/out` | Must |
| FR-24 | Framer Motion scroll entrances: gallery, RERA section, similar properties | Should |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| WCAG AA contrast | All text passes — dark text on orange, green text on white |
| Zero hex in `.module.css` | Enforced via grep |
| `formatPrice()` on all prices | No raw integers in JSX |
| Dynamic CTA | `Contact ${property.listingSource}` — no hardcoded strings |
| Poppins only | No other fonts |
| Max font-weight 600 | No 700 weight |
| No circular elements | `border-radius: 50%` forbidden |
| No CSS field/content hiding | `display: none` forbidden on tab content |
| EMI formula | Math formula only — no lookup table |

---

## Out of Scope

- Real property data API
- Photo lightbox / full-screen gallery
- Map integration for locality
- Price trend chart library (display as data list)
- User authentication / saved properties
- RERA portal API integration (mock link only)
- Booking / payment flow
- Builder profile page
- Reviews and ratings
- Mortgage / home loan application
