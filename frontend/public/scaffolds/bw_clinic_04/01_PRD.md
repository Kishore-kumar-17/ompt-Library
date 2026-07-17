# 01 — PRD
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## Product Vision

VitalCheck is a consumer-first diagnostic marketplace where Indian users browse, compare, and book health test packages at discounted prices with home sample collection. Unlike hospital portals (Apollo) or doctor-booking platforms (Practo), VitalCheck's UX mirrors an e-commerce product catalogue: category browsing, price comparison, discount badges, and a single "Book Now" CTA per package. The design system is bold and dark — matching Cult.fit's fitness-brand energy adapted to health diagnostics.

---

## Personas

### Persona 1 — The Annual Checkup Seeker
**Name:** Priya, 32
**Situation:** Works long hours, hasn't had a health checkup in two years. Wants a comprehensive test without taking a day off for a hospital visit.
**Goal:** Book a full-body checkup with home sample collection before 8am.
**Pain point:** Hospital diagnostic departments require advance booking through reception, unclear pricing.
**How VitalCheck serves her:** "Complete Health Profile" card shows ₹1,999 (50% off ₹3,999), 80 tests, 24hr reports, home collection — all on one card. She books in 2 taps.

### Persona 2 — The Condition Monitor
**Name:** Ramesh, 58
**Situation:** Has type 2 diabetes. Doctor wants HbA1c, fasting glucose, and lipid profile checked quarterly.
**Goal:** Find a diabetes-specific panel without booking an individual doctor appointment for a referral.
**Pain point:** Individual tests are scattered, no bundled pricing at hospitals.
**How VitalCheck serves him:** CategoryTabs → "Diabetes" → Diabetes Management Panel card with exactly his required tests listed in keyTests, same-day home collection.

### Persona 3 — The Gift Buyer
**Name:** Meera, 45
**Situation:** Wants to gift a Senior Wellness package to her 70-year-old mother for her birthday.
**Goal:** Find a senior-appropriate package at a reasonable price, ideally with doctor-friendly report format.
**Pain point:** Unsure what tests a senior needs — wants a curated bundle, not individual test selection.
**How VitalCheck serves her:** CategoryTabs → "Senior Care" → Senior Wellness Package. 95 tests, comprehensive, home collection. Clear price. Books as gift.

### Persona 4 — The Price Comparator
**Name:** Karan, 27
**Situation:** Gym-goer who wants vitamin D and B12 checked after reading about deficiency.
**Goal:** Get specific vitamin tests cheaply without a comprehensive panel.
**Pain point:** Standalone vitamin tests at pathology labs are expensive with no transparency.
**How VitalCheck serves him:** CategoryTabs → "Vitamins" → Vitamin Deficiency Screen. ₹649 (vs ₹1,299). 15 tests. He sees the strikethrough price and understands the value.

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | 8 health packages browsable in a responsive grid | Must |
| FR-02 | CategoryTabs filters packages by single ServiceCategory | Must |
| FR-03 | Active tab updates filter without page reload (`useMemo`) | Must |
| FR-04 | "All" tab shows all 8 packages | Must |
| FR-05 | PackageCard shows original (strikethrough) + discounted price | Must |
| FR-06 | Strike-through uses `<del>` tag (semantic, not CSS only) | Must |
| FR-07 | Prices formatted as `₹1,999` via `toLocaleString('en-IN')` | Must |
| FR-08 | "POPULAR" badge rendered conditionally (JSX, not `display:none`) | Must |
| FR-09 | "Home Collection" indicator shown conditionally | Must |
| FR-10 | "Book Now" CTA: pink bg, dark text | Must |
| FR-11 | 3 key tests listed per package card | Must |
| FR-12 | Turnaround time (`{turnaroundHours}hr Reports`) shown on card | Must |
| FR-13 | HowItWorks section: 3-step process visible | Should |
| FR-14 | WhyChooseUs section: 4 trust signals | Should |
| FR-15 | Testimonials: 3 text-only cards | Should |
| FR-16 | `prefers-reduced-motion` disables Framer Motion | Must |
| FR-17 | All images have `alt` attributes | Must |
| FR-18 | All interactive elements keyboard-accessible | Must |
| FR-19 | `tsc --noEmit` exits 0 | Must |
| FR-20 | `npm run build` produces `/out` directory | Must |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| WCAG AA contrast | All text elements pass |
| TypeScript strict mode | Zero errors |
| Zero hex values in `.module.css` | Enforced via grep (except glassmorphism is rgba, not hex) |
| rgba only in PackageCard.module.css | Glassmorphism documented exception |
| Zero `border-radius: 50%` anywhere | No circular elements in this build |
| Inter only | No other font families |

---

## Out of Scope

- Real payment/checkout flow
- Phlebotomist scheduling / calendar
- Lab report download / viewer
- User accounts / login
- Test result history
- Location/pincode-based lab selection (static "Chennai" location pill)
- Individual a-la-carte test booking (packages only in this build)
