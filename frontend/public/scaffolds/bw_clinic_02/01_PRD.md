# 01 — Product Requirements Document
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## Product Vision

A homepage for India's largest doctor discovery platform. Patients arrive with a symptom or a specialty in mind — the product's job is to surface the right doctor in their city, show them enough to make a decision (credentials, rating, availability, fee), and get them to book in two clicks. Unlike bw_clinic_01 (Apollo — a hospital brand site), this is a marketplace: doctors are listed, filtered, and compared. Trust comes from peer reviews and a "Verified by Practo" badge, not hospital-level accreditations.

---

## Personas

### Persona 1 — Shreya, 27, Urban Professional (Symptom-first)
- Has tooth pain, doesn't know if she needs a dentist or an ENT
- Arrives at homepage, sees "Dental pain" symptom card → taps "CONSULT NOW"
- Needs: quick symptom-to-specialty routing; immediate video consult option
- Acceptance criterion: SymptomCards section shows "Dental pain" with "CONSULT NOW" CTA; clicking routes to DoctorGrid filtered by specialty

### Persona 2 — Vikram, 38, Father (Finding a Paediatrician)
- Wants a paediatrician near Bandra, Mumbai for his daughter
- Types "Bandra" in locality + "paediatrician" in keyword → submits
- Needs: OmniSearch routes to filtered DoctorGrid; card shows experience, "Available Today", clinic CTA
- Acceptance criterion: OmniSearch two-field search present; DoctorGrid shows filtered results; doctor card shows availability badge and "Book Clinic Visit"

### Persona 3 — Anjali, 44, Working Professional (Online Consult)
- Has chronic back pain; wants a second opinion from an orthopaedic surgeon via video
- Needs: DoctorGrid filter by specialty; "Consult Online" button on video-capable doctors
- Acceptance criterion: DoctorGrid specialty filter works; doctors with `consultMode: 'video'` or `'both'` show "Consult Online" button

### Persona 4 — QA Reviewer
- Checks: 4px button radius, 4px photo radius (not 50%), navy text on cyan, no NABH/JCI, "Available Today" absent for unavailable doctors, `consultMode` CTA logic correct
- Acceptance criterion: Lighthouse ≥90/90; `border-radius: 4px` on all buttons; no white text on cyan; `tsc --noEmit` clean

---

## Functional Requirements

### FR-001: Color system — 8 tokens, cyan contrast rule
- Exactly 8 `--color-*` tokens in `globals.css`
- `--color-cyan: #14BEF0` — CTAs, links, active — NEVER with white text
- `--color-navy: #28328C` — footer, headings, text on cyan buttons
- `--color-green: #30AC4A` — "Available Today" badge only
- All cyan-background elements use `color: var(--color-navy)` — verified with grep
- No hex in `.module.css` files

### FR-002: Lato font — 400 and 700 only
- Loaded via `next/font/google`, weights 400 and 700
- Applied as `--font-sans` on `<html>`
- No other weights (no 600, no 800)
- No serif font anywhere

### FR-003: Radius vocabulary
- Buttons: `border-radius: 4px` — all interactive buttons without exception
- Cards: `border-radius: 4px` — all card containers
- Pill chips: `border-radius: 20px` — AvailabilityBadge, specialty chips, symptom tags
- Doctor photos: `border-radius: 4px` — NOT `50%`
- No other radius values in the codebase

### FR-004: Flat card style
- Card border: `border: 1px solid var(--color-border)` — primary card style
- Card shadow: NONE on regular cards
- Exception: OmniSearch widget card only — `box-shadow: 0 4px 8px rgba(0,0,0,0.12)`

### FR-005: StickyNav
- White bg, 74px height, `border-bottom: 1px solid var(--color-border)`
- Logo left, nav links center, right group: "For Doctors" muted link + "Login" button
- "Login" button: cyan outline (`border: 1.5px solid var(--color-cyan)`), cyan text, transparent bg, `border-radius: 4px`
- Note: Cyan text "Login" on white background = 1.8:1 — FAILS. Use `--color-navy` text with cyan border for the outline variant

### FR-006: Hero — OmniSearch
- White bg, `min-height: 60vh`, centered
- H1: Lato 700, `var(--color-navy)`, `clamp(2rem, 4vw, 3rem)`
- Subheading: Lato 400, `var(--color-muted)`
- **OmniSearch widget** (two text inputs, not dropdowns):
  - Left field: 📍 location input, placeholder "Enter locality, e.g. Koramangala"
  - Right field: 🔍 keyword input, placeholder "Search doctors, clinics, symptoms"
  - Submit: "Search" button, `background: var(--color-cyan); color: var(--color-navy); border-radius: 4px`
  - Widget card: white, `border-radius: 4px`, `box-shadow: 0 4px 8px rgba(0,0,0,0.12)` (only shadow in build)
- Stats row: "20M+ Patients | 100K+ Doctors | 200K+ Clinics"

### FR-007: DiscoveryCards
- 4 service tiles in a row on `var(--color-surface)` background
- Each tile: colored bg, title, description, arrow CTA link
- `border-radius: 4px`, no shadow
- Titles: "Consult Doctors Online", "Find Doctors Near You", "Book Lab Tests", "Surgeries"

### FR-008: SymptomCards
- 8 cards for common symptoms/conditions
- Labels: "Period doubts", "Child not eating", "Anxiety", "Skin rash", "Dental pain", "Eye infection", "Cold & Flu", "Back pain"
- Each: emoji + label + "CONSULT NOW" cyan link (navy text)
- White card, `border-radius: 4px`, `border: 1px solid var(--color-border)` — no shadow

### FR-009: SpecialtyCarousel (`'use client'`)
- Horizontal scrollable row of specialty chips
- `useState` for scroll tracking; left/right arrow buttons
- Each chip: white card, `border-radius: 4px`, Lucide icon + specialty name + doctor count
- Min 10 specialties in data

### FR-010: DoctorGrid + DoctorCard
- `DoctorGrid.tsx` — `'use client'`: city text input + specialty `<select>` filter bar
- `useMemo` filter applied to `doctors` array
- ARIA live region announces result count
- `DoctorCard.tsx` — server component:
  - Photo: 80×80px, `border-radius: 4px`, `object-fit: cover`
  - Name: Lato 700, `var(--color-text)` + `VerifiedBadge` if `verified: true`
  - Specialty + qualifications: `var(--color-muted)`
  - "X+ Years Experience": Lato 400
  - Locality · City: muted
  - ⭐ rating + `(N reviews)`: displayed
  - `availableToday: true` → `<AvailabilityBadge />` (green, 20px radius)
  - "₹X Consultation Fee": Lato 700, `var(--color-text)`
  - CTAs by `consultMode`:
    - `'clinic'` → "Book Clinic Visit" (1 button)
    - `'video'` → "Consult Online" (1 button)
    - `'both'` → "Book Clinic Visit" + "Consult Online" (2 buttons)
  - All CTAs: `border-radius: 4px`, cyan bg, navy text

### FR-011: Testimonials
- 3 text-only quote cards — no patient photos (Practo's pattern)
- White card, 4px radius, border
- Quote text + patient name + treatment context
- Section background: `var(--color-surface)`

### FR-012: Footer
- `background: var(--color-navy)`
- 4+ column layout
- Link hover: `color: var(--color-cyan)` — cyan on navy = 6.4:1 ✓
- Bottom bar: copyright + app store badges

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| Cyan button contrast | `color: var(--color-navy)` — verified, not white |
| TypeScript strict | Zero `tsc --noEmit` errors |
| No hex in CSS Modules | Zero grep results |
| Build | `npm run build` exits 0 (static export) |

---

## Out of Scope
- Real search / autocomplete (OmniSearch submits via scroll; no backend)
- User authentication
- Real appointment calendar or slot picker
- Video call functionality
- Patient health records
- Medicine ordering / lab test booking
