# 01 — PRD
## Modern Indian Rental Discovery · bw_realestate_04

---

## Product Vision

ZeroLet is an owner-direct rental discovery platform. Every listing is posted by the property owner. There are no brokers, no agents, no brokerage fees. Tenants save the equivalent of 1–2 months' rent. Owners get direct inquiries without commission cuts.

The homepage communicates this value proposition at every touch point: the hero strip, the card badges, the savings widget, the trust bar.

---

## Target Users

### Tenant Personas

**P1 — Salaried Young Professional (Primary)**
- Age 24–32, moving to a new city for work
- Budget ₹15,000–₹40,000/mo
- Tired of paying brokerage on top of rent + deposit
- Searches: locality + BHK + furnished
- Cares about: availableFrom date, petFriendly, nearby metro/office

**P2 — Family Relocating**
- Age 32–45, moving with spouse + children
- Budget ₹30,000–₹80,000/mo
- Needs: 2–3 BHK, school/hospital proximity, society amenities
- Cares about: owner verification, deposit amount, tenantPreference = 'Family'

**P3 — Remote Worker / Digital Nomad**
- Age 28–38, flexible location
- Budget ₹20,000–₹50,000/mo
- Needs: furnished, fast internet, pet-friendly
- Cares about: petFriendly flag, furnishing status, availableFrom immediacy

### Owner Persona

**P4 — Independent Property Owner**
- Lists 1–3 rental properties without agent intermediary
- Wants direct tenant inquiries, no commission loss
- Cares about: tenant quality, quick listing, verified tenant profile

---

## Functional Requirements

### FR-001 Hero Section
The hero section must display:
- Headline communicating zero-brokerage proposition
- Search widget: city selector + locality text input + Search button
- `BrokerSavingsStrip` immediately below or inside hero — full-width purple band

### FR-002 BrokerSavingsStrip
A dedicated full-width strip:
- Background: `var(--color-purple)`
- White text: "Save up to 2 months rent in brokerage — rent directly from owners"
- Savings amount displayed via `calculateBrokerSavings(30000)` as example
- Must appear in hero or immediately below — not buried in page

### FR-003 RentalFilterBar
5 filter dimensions accessible above the property grid:
1. BHK — multi-select chips (`BHKType[]`)
2. Furnishing — single-select
3. Max Rent — preset range buttons (₹15K, ₹25K, ₹35K, ₹50K, No Limit)
4. Pet Friendly — toggle (Yes / Any)
5. Tenant Preference — single-select (Family / Bachelor / Any)

### FR-004 RentalPropertyCard
Each card must display:
- `ZeroBrokerageBadge` on every card (green border + text)
- Monthly rent via `formatPrice(property.monthlyRent)` → `₹28,000/mo`
- Deposit via `` `₹${property.deposit.toLocaleString('en-IN')}` `` — never via `formatPrice`
- `OwnerProfileSnippet` with owner name, verified badge, response time
- `availableFrom` date
- `tenantPreference` pill
- `petFriendly` → `PetFriendlyBadge` (purple, conditional)
- `BHK` · `superArea` sqft · locality, city
- CTA: always `"Contact Owner"` — never dynamic

### FR-005 BrokerSavingsWidget (interactive)
`'use client'` component in sidebar or standalone section:
- Rent input (number field)
- Displays: "Your savings: ₹{calculateBrokerSavings(rent)}"
- Updates live on input change
- Uses `calculateBrokerSavings(rent) = rent * 2`
- Framed as "See how much you save with ZeroLet"

### FR-006 OwnerVerifiedBadge
- Shown on `OwnerProfileSnippet` when `owner.verified === true`
- Green text + check icon
- Semantically distinct from `ZeroBrokerageBadge`

### FR-007 Property Data
8 mock `RentalProperty` entries:
- All `mode: 'rent'`
- All owners (no listingSource agent/builder field)
- Mix of BHKs: 1BHK × 2, 2BHK × 3, 3BHK × 2, 4BHK × 1
- Mix of cities: Bangalore × 3, Mumbai × 2, Hyderabad × 1, Pune × 1, Delhi NCR × 1
- Mix of furnishing: Fully Furnished × 3, Semi-Furnished × 3, Unfurnished × 2
- Mix of tenantPreference: Family × 3, Bachelor × 2, Any × 3
- petFriendly: true × 3, false × 5
- `owner.verified`: true × 6, false × 2

### FR-008 FilterRentals Logic
`filterRentals(properties, filters)` applies 5 conditions:
1. BHK: if `filters.bhk.length > 0`, property.bhk must be in array
2. Furnishing: if set, must match `property.furnishingStatus`
3. Max rent: if set, `property.monthlyRent <= filters.maxRent`
4. Pet friendly: if `true`, `property.petFriendly === true`
5. Tenant preference: if set, `property.tenantPreference === filters.tenantPreference` OR `property.tenantPreference === 'Any'`

### FR-009 TrustBar
Dark bg (`var(--color-dark)`), 4 stats:
- "50 Lakh+ Rental Listings"
- "Zero Brokerage Saved"
- "2 Crore+ Happy Tenants"
- "Instant Owner Connect"

### FR-010 Page Assembly
`page.tsx` is a Server Component. It passes all 8 `RentalProperty` mock objects to `RentalFilterBar` (the `'use client'` boundary). `RentalFilterBar` manages filter state internally and renders the filtered `PropertyGrid`.

---

## Non-Functional Requirements

- `tsc --noEmit` exits 0
- `npm run build` produces `/out` (static export)
- `prefers-reduced-motion` — all Framer Motion animations respect this
- Zero hex in `.module.css` files (hero gradient exception only)
- No `font-weight: 700` anywhere
- No `border-radius: 50%` anywhere
