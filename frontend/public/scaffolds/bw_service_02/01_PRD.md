# 01 — PRD
## Indian Web Agency Directory · bw_service_02

---

## Product Vision

AgencyHub is a curated directory of Indian web design and development agencies. Businesses looking to build a website, web app, or digital presence can browse verified agencies, filter by budget and specialisation, and connect directly.

The platform differentiates by Indian market focus — INR budgets, Indian cities, Indian client testimonials — and by a three-tier verification system (Certified / Expert / Premier) that signals agency quality.

---

## Target Users

### U1 — Startup Founder Seeking Agency
- Age 25–38, building first product or rebranding
- Budget: ₹2L–₹10L
- Needs: SaaS or portfolio specialists, quick turnaround
- Searches by: specialisation (SaaS / Startup), budget range, city proximity
- Cares about: portfolio quality, tier badge, review count

### U2 — E-commerce Brand Owner
- Age 30–45, D2C brand growing to ₹10–50Cr revenue
- Budget: ₹10L–₹50L
- Needs: E-commerce specialist, custom Shopify/headless builds
- Searches by: E-commerce specialisation, Expert or Premier tier
- Cares about: projects completed, team size, past e-commerce work

### U3 — Enterprise Digital Manager
- Age 35–50, large company needing complete digital transformation
- Budget: ₹50L+
- Needs: Premier-tier agency, dedicated account manager, SLA
- Searches by: Premier tier, Enterprise specialisation
- Cares about: Premier badge specifically, city (Mumbai / Bangalore / Delhi)

### U4 — Agency Owner (Supply Side)
- Wants their agency listed and visible
- Cares about: tier upgrade path, how featured listing works, "List Your Agency" CTA

---

## Functional Requirements

### FR-001 — Hero Section
- Large headline: "Find the Right Web Agency for Your Business"
- Subheading
- Full-width search bar: `<input type="search">` + indigo "Search Agencies" button
- Placeholder: "Search by agency name or specialisation..."
- White background

### FR-002 — AgencyFilterBar
Sticky filter bar below hero with 5 filter inputs:
1. **Search** — text input (matches name + tagline, case-insensitive, trims whitespace)
2. **Specialization** — 6 chips: All / E-commerce / SaaS / Marketing Sites / Portfolio / Enterprise / Startup
3. **Budget Range** — single-select: All / Under ₹2L / ₹2L–₹10L / ₹10L–₹50L / ₹50L+
4. **City** — select dropdown: All Cities / Bangalore / Mumbai / Delhi / Hyderabad / Pune / Chennai / Kolkata
5. **Tier** — select dropdown: All Tiers / Certified / Expert / Premier
6. **Clear filters** — resets all to `INITIAL_FILTERS`

### FR-003 — AgencyGrid
- 3-column grid (responsive to 2-col tablet, 1-col mobile)
- Receives pre-sorted array from `filterAgencies` (featured first)
- Empty state: "No agencies match your search. Try adjusting your filters."
- `AgencyCard` for each agency

### FR-004 — AgencyCard
Each card displays:
- **Portfolio thumbnail** — styled div placeholder (gradient bg, 180px height)
- **Featured strip** — "Featured" badge on image (indigo bg, white text) if `agency.featured === true` — conditional JSX
- **TierBadge** — Certified / Expert / Premier with distinct colour per tier
- **Agency name** (`h3`)
- **Tagline**
- **SpecTags** — `agency.specializations` as pill tags
- **Stats row** — projects completed · team size · budget via `formatBudgetRange(agency)`
- **StarRating** — amber star icon + dark rating text + muted review count
- **"View Agency"** CTA button

### FR-005 — filterAgencies Behaviour
`filterAgencies(agencies, filters)` must:
1. Apply text search (OR: name or tagline contains query)
2. Apply specialization (array includes)
3. Apply budgetRange (string match on `budgetCategory`)
4. Apply city (exact match)
5. Apply tier (exact match)
6. Sort result: featured agencies first (stable)
7. Return empty array (not null) when no matches

### FR-006 — formatBudgetRange
```typescript
formatBudgetRange({ budgetMin: 50000,   budgetMax: 200000  }) → '₹50K – ₹2L'
formatBudgetRange({ budgetMin: 200000,  budgetMax: 1000000 }) → '₹2L – ₹10L'
formatBudgetRange({ budgetMin: 1000000, budgetMax: 5000000 }) → '₹10L – ₹50L'
formatBudgetRange({ budgetMin: 5000000, budgetMax: null    }) → '₹50L+'
```

### FR-007 — TierBadge Visual System
| Tier | Background | Text | Contrast |
|------|-----------|------|----------|
| Certified | transparent | `var(--color-indigo)` text + border | 6.29:1 ✓ |
| Expert | `var(--color-indigo)` | `var(--color-white)` | 6.29:1 ✓ |
| Premier | `var(--color-amber)` | `var(--color-dark)` | 6.31:1 ✓ |

### FR-008 — TrustBar
Dark bg (`var(--color-footer)`), 4 stats:
- "500+ Agencies Listed"
- "12,000+ Projects Delivered"
- "50+ Cities Covered"
- "98% Client Satisfaction"

### FR-009 — SiteNav
Sticky, scroll shadow, indigo `AgencyHub` text logo, nav links (Browse / How It Works / Pricing / Blog), "List Your Agency" ghost CTA button, `<nav aria-label="Main navigation">`.

### FR-010 — Page Assembly
`page.tsx` — Server Component, no `'use client'`. `AgencyFilterBar` is the only `'use client'` boundary; it imports `AGENCIES` data directly (no data props needed — data is static). `SiteNav` uses `'use client'` for scroll shadow.

---

## Non-Functional Requirements

- `tsc --noEmit` exits 0
- `npm run build` produces `/out` (static export)
- `prefers-reduced-motion` respected by all Framer Motion animations
- Zero hex in `.module.css` files
- No `font-weight: 700` anywhere
- No `border-radius: 50%` anywhere
