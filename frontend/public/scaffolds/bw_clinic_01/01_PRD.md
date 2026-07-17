# 01 — Product Requirements Document
## Indian Hospital Network · bw_clinic_01

---

## Product Vision

A homepage for India's leading multi-specialty hospital network. The product makes it simple for patients to find the right specialist, understand their credentials, and book an appointment — online or by video. Trust is built through clinical credentials (NABH, JCI), peer validation (per-doctor ratings), and institutional scale (5,000+ doctors, 40+ years). The site is a patient conversion tool first, an institutional brochure second.

---

## Personas

### Persona 1 — Kavya, 32, Young Professional (Urban, Digital Native)
- Has a persistent cardiac concern, wants to find a specialist in Bangalore
- Comfortable booking online, prefers video consult for initial opinion
- Needs: specialty filter to find cardiologists in Bangalore, visible ratings, video option
- Acceptance criterion: DoctorDirectory shows cardiologists in Bangalore; "Video Consult" CTA present per doctor; rating visible on card

### Persona 2 — Mohan, 55, Senior Executive (Health Package Buyer)
- Wants a comprehensive annual health checkup, comparing Apollo-style packages
- Price-sensitive — wants to see what's included and the discounted package price
- Acceptance criterion: HealthPackages section shows 3 packages with strike-through original price + discounted price + test count; "Book Now" CTA

### Persona 3 — Nalini, 45, Caregiver (Booking for a Parent)
- Searching for an oncologist in Chennai for her mother
- Wants to see qualifications, experience, and which hospital the doctor is at
- Needs: filter by specialty (oncology) + city (Chennai); doctor qualifications visible
- Acceptance criterion: DoctorDirectory filter works; qualifications (MBBS, MD, DM) visible on card; hospital name shown

### Persona 4 — QA Reviewer
- Checks `8px` button radius, circular doctor photos, emergency link presence, dual CTAs per card, NABH+JCI both present, no gold text on white
- Acceptance criterion: Lighthouse ≥90/90; `border-radius: 8px` on all buttons; "Emergency: 1066" in nav; no hex in `.module.css`

---

## Functional Requirements

### FR-001: Color system — teal + gold + 8 tokens
- `globals.css` has exactly 8 `--color-*` tokens
- `--color-teal: #2582A1` — primary CTAs, links, icons
- `--color-gold: #FDB931` — accent only; NEVER as text on white (1.9:1 = WCAG fail)
- `--color-teal-dark: #1B6A85` — footer, hover states
- `--color-surface: #F0F7FA` — alternate section tint
- No hex values in `.module.css` files

### FR-002: Nunito Sans single font
- Loaded via `next/font/google`, weights 400/600/700/800
- Applied as `--font-sans` on `<html>`
- Weight 800 on H1
- No serif font anywhere

### FR-003: 8px button radius
- ALL interactive buttons: `border-radius: 8px` — no exceptions
- Cards: `border-radius: 12px`
- Doctor photos: `border-radius: 50%` (circular)
- No `border-radius: 9999px` (pill) anywhere

### FR-004: Sticky navigation with emergency link
- Height `68px`, `background: var(--color-white)`, `border-bottom: 1px solid var(--color-border)`
- Logo left, nav links center, emergency + booking CTA right
- "Emergency: 1066" — color `#DC2626` (red), Nunito 600, always visible
- "Book Appointment" teal button: `background: var(--color-teal); border-radius: 8px; height: 42px`
- No dark nav, no scroll toggle

### FR-005: Hero with booking widget
- `min-height: 70vh`, white background, centered
- H1: Nunito 800, `clamp(2.25rem, 4vw, 3.5rem)`, `var(--color-text)`
- BookingWidget below H1: white card, `border-radius: 12px`, shadow
  - City dropdown: Chennai, Hyderabad, Bangalore, Delhi, Mumbai, Pune, Kolkata
  - Specialty dropdown: 12 specialties from `Specialty` type
  - "Find Doctors" submit button: teal, `border-radius: 8px`
- Stats row below widget: 4 inline stats — "5,000+ Doctors | 72 Specialties | 40+ Hospitals | 30M+ Patients"

### FR-006: Specialty grid
- 12 specialty cards in a 4-column grid on `var(--color-surface)` background
- White card, `border-radius: 12px`, `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`
- Lucide icon in `var(--color-teal)`, specialty name (Nunito 600, `--color-text`), doctor count (muted)
- Hover: `border-color: var(--color-teal)` — visible focus indicator

### FR-007: Doctor directory with 3 filters
- `'use client'` — manages city, specialty, and name search state
- Filter bar: city `<select>` + specialty `<select>` + text search `<input>`
- `useMemo` to filter all doctors simultaneously
- ARIA live region announces "Showing X doctors" on filter change
- Doctor card (server component `DoctorCard.tsx`):
  - Circular photo: `width: 96px; height: 96px; border-radius: 50%; object-fit: cover`
  - Name: Nunito 700, `--color-text`
  - Title + qualifications: `--color-muted`
  - "X+ Years Experience": Nunito 600
  - Star rating: gold ⭐ + `4.8` + `(2,341 reviews)` in muted
  - Hospital name + city
  - "₹800 Consult Fee": Nunito 700, `--color-teal`
  - "Book Appointment" button (primary, teal, 8px)
  - "Video Consult" button (secondary, teal outline, 8px) — only if `videoConsult: true`

### FR-008: Why Us section
- `var(--color-surface)` background
- 4 stat blocks in a row (icons in teal)
- NABH accreditation badge + JCI accreditation badge — both required, side by side
- Section heading: "World-Class Standards, Proven Outcomes"

### FR-009: Health packages
- 3 white cards, `border-radius: 12px`, shadow
- Package name: Nunito 700, navy
- Strike-through original price + discounted price
- Test count: "68 Tests Included"
- Feature list with Lucide `Check` in teal
- "Book Now" primary teal button, `border-radius: 8px`
- `popular` card: teal top border ribbon "Most Popular"

### FR-010: Testimonials
- 3 white cards, `border-radius: 12px`, shadow
- Patient name + treatment type ("Cardiac Bypass Surgery, Chennai")
- 5 gold stars
- 2-sentence patient quote

### FR-011: Footer
- `background: var(--color-teal-dark)` (`#1B6A85`)
- 4-column layout: Brand+tagline | Specialties | Services | Company
- Link hover: `color: var(--color-gold)` — gold on teal-dark = 5.8:1 ✓ (AA)
- Bottom bar: NABH + JCI badges at 50% opacity; copyright muted white

### FR-012: Framer Motion entrances
- Every section: `opacity: 0; translateY(40px)` → visible, `700ms ease-out`
- Stagger children: `200ms`
- `prefers-reduced-motion`: all transitions disabled

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA contrast | All text passes; gold never on white |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Modules | Zero grep results |
| Build | `npm run build` succeeds (static export) |

---

## Out of Scope
- Real appointment booking system or calendar integration
- Patient login or health records
- Real payment or fee collection
- Telemedicine video call functionality
- Individual hospital branch pages
- Lab test booking workflow
- Pharmacy / medicine ordering
