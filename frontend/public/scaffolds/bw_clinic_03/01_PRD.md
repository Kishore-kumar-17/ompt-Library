# 01 — PRD
## Global Hospital Authority Portal · bw_clinic_03

---

## Product Vision

CareCompass is a hospital authority portal built on Cleveland Clinic's information architecture principles: condition-indexed provider search, outcomes data as primary content, and multiple appointment pathways including second-opinion requests. The product serves patients who arrive with a symptom or condition name — not a specialty category — and need to find the right provider quickly and confidently.

---

## Personas

### Persona 1 — The Condition Searcher
**Name:** Margaret, 58
**Situation:** Recently diagnosed with atrial fibrillation. Her GP mentioned she should see a specialist. She doesn't know if she needs an electrophysiologist, a cardiologist, or something else.
**Goal:** Find a doctor who treats atrial fibrillation without having to know what specialty that is.
**Pain point:** Sites that require her to select a specialty first — she doesn't know the right category.
**How CareCompass serves her:** HeroSearch accepts "atrial fibrillation" and surfaces Dr. Blackstone whose `conditionsTreated` includes it.

### Persona 2 — The Second-Opinion Seeker
**Name:** David, 44
**Situation:** Diagnosed with kidney disease elsewhere. Wants a world-class institution to review his case before starting dialysis.
**Goal:** Request a second opinion without committing to a full appointment.
**Pain point:** Most hospital sites don't distinguish second-opinion requests from regular appointments.
**How CareCompass serves her:** `appointmentTypes` includes `'second-opinion'`; `AppointmentBadge` signals it; not-accepting providers still show "Request Second Opinion" CTA.

### Persona 3 — The Virtual Care Patient
**Name:** Ananya, 34
**Situation:** Manages type 1 diabetes and sees an endocrinologist quarterly. She lives 3 hours from the nearest major medical centre.
**Goal:** Filter providers who offer virtual visits and treat her condition.
**Pain point:** Provider directories that don't let her filter by appointment type.
**How CareCompass serves her:** Appointment type `<select>` in ProviderSearch filters by `'virtual'`; Dr. Chen offers virtual + has diabetes in conditionsTreated.

### Persona 4 — The Health-Information Reader
**Name:** Robert, 67
**Situation:** Son was just diagnosed with Crohn's disease. Wants to understand the condition before talking to a doctor.
**Goal:** Read authoritative medical content, then find a gastroenterologist.
**Pain point:** Hospital sites that separate patient education from provider discovery.
**How CareCompass serves him:** HealthLibraryPreview surfaces condition articles; ConditionBrowser links to condition-specific content with article counts; ProviderCard shows `conditionsTreated` to confirm relevance.

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Single text search field in hero accepts condition, symptom, or provider name | Must |
| FR-02 | Hero submit scrolls smoothly to `#provider-section` | Must |
| FR-03 | ProviderSearch filters by text query (name, specialty, conditionsTreated) | Must |
| FR-04 | ProviderSearch filters by location (city) | Must |
| FR-05 | ProviderSearch filters by appointment type | Must |
| FR-06 | All three filters apply simultaneously via `useMemo` | Must |
| FR-07 | ARIA live region announces result count on filter change | Must |
| FR-08 | Empty state shown when 0 results | Must |
| FR-09 | Provider cards display all three appointment type badges | Must |
| FR-10 | CTA button changes based on `acceptingStatus` | Must |
| FR-11 | OutcomesStrip renders 5 metrics in `<dl>` structure | Must |
| FR-12 | ConditionBrowser shows 8 categories with article counts | Must |
| FR-13 | HealthLibraryPreview shows 6 articles with category + read time | Should |
| FR-14 | AppointmentBanner provides phone + online scheduling CTAs | Should |
| FR-15 | TopBar shows phone number and MyChart link | Should |
| FR-16 | `prefers-reduced-motion` disables all Framer Motion transitions | Must |
| FR-17 | All images have descriptive `alt` attributes | Must |
| FR-18 | All form inputs have associated `<label>` elements | Must |
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
| Zero hex values in `.module.css` files | Enforced via grep |
| Zero `rgba()` in `.module.css` files | Enforced via grep |
| Zero `border-radius: 50%` on photos | Enforced via grep |
| Exactly one `box-shadow` (ProviderCard) | Enforced via grep |

---

## Out of Scope

- Real appointment booking flow (form submission, calendar, payment)
- MyChart authentication / patient portal login
- Health Library full article pages
- International patient portal
- Real provider photo assets (placeholder images used)
- Search autocomplete with live data
- Map/directions for locations
