# 00 — Orchestrator
## Global Hospital Authority Portal · bw_clinic_03

---

## What This Build Is

**CareCompass** — a Cleveland Clinic-pattern hospital authority portal. The defining character: outcomes-forward, condition-indexed, authority through data. This is not a booking marketplace (Practo) or a hospital network with a city-selector widget (Apollo). It is an academic medical centre that presents its own performance data upfront, organises content by condition (not specialty), and provides multiple appointment pathways including second-opinion requests.

---

## Comparison Table — All Clinic Builds

| Dimension | bw_clinic_01 (Apollo) | bw_clinic_02 (Practo) | bw_clinic_03 (Cleveland Clinic) |
|-----------|----------------------|----------------------|--------------------------------|
| **Category** | Large hospital network | Booking marketplace | Academic medical centre |
| **Hero search** | City dropdown + Specialty dropdown | Two text inputs (locality + keyword) | Single text input (condition/symptom/name) |
| **Search field type** | `<select>` × 2 | `<input type="text">` × 2 | `<input type="text">` × 1 |
| **Provider photo** | 50% circular | 4px rounded rect | 6px rounded rect |
| **Primary font** | Nunito Sans | Lato | Roboto |
| **Palette** | Teal #2582A1 + Gold #FDB931 | Cyan #14BEF0 + Navy #28328C | Blue #0468CD + Green #006633 + Navy #003087 |
| **Button text** | White on teal ✓ | Navy on cyan ✓ (white fails 1.8:1) | White on blue ✓ (5.56:1) |
| **Card shadow** | Yes (all cards) | No (border-only except OmniSearch) | Only ProviderCard |
| **Button radius** | 8px | 4px | 4px |
| **Card radius** | 12px | 4px | 6px |
| **Pill radius** | N/A | 20px (AvailabilityBadge only) | 20px (AppointmentBadge + hero pills) |
| **Doctor mode field** | `videoConsult: boolean` | `consultMode: 'clinic'|'video'|'both'` | `appointmentTypes: AppointmentType[]` |
| **Accepting status** | Not present | Not present | `acceptingStatus: AcceptingStatus` |
| **Outcomes section** | No | No | Yes — OutcomesStrip (navy, 5 metrics) |
| **Health library** | No | No | Yes — HealthLibraryPreview |
| **Trust signals** | NABH + JCI badges | VerifiedBadge (per doctor) | US News "#1" in OutcomesStrip |
| **Emergency link** | Yes ("Emergency: 1066" red) | No | No |
| **TopBar** | No | No | Yes — utility nav (phone + MyChart) |
| **Rankings** | No | No | Yes — embedded in OutcomesStrip |
| **Conditions treated** | Not present | Not present | `conditionsTreated: string[]` on Provider |
| **Second opinion** | No | No | Yes — appointment type + CTA |
| **Languages** | Not present | Not present | `languages: string[]` on Provider |

---

## The Three Defining Constraints

### Constraint 1: Single-field condition search — not dropdowns, not dual inputs

Apollo uses two `<select>` dropdowns (city + specialty). Practo uses two `<input type="text">` fields (locality + keyword). Cleveland Clinic uses a **single** `<input type="text">` that resolves across:
- Provider name ("Dr. Blackstone")
- Specialty ("Cardiology")
- Conditions treated ("chest pain", "heart failure", "atrial fibrillation")

This is a higher-capability search UX — the patient doesn't need to categorise their problem before searching. The filter function `filterProviders()` applies all three match criteria simultaneously. The hero submit scrolls to `#provider-section`; the `ProviderSearch` filter bar has the same single text input (plus location + appointment type selects).

**If you add a second search field** — you've built Practo's UX into Cleveland Clinic's skin. Remove it.

### Constraint 2: `appointmentTypes: AppointmentType[]` — array, not scalar

Apollo: `videoConsult: boolean` (one flag).
Practo: `consultMode: 'clinic' | 'video' | 'both'` (scalar union).
Cleveland Clinic: `appointmentTypes: ('in-person' | 'virtual' | 'second-opinion')[]` (array).

The array means a provider can offer any combination: `['in-person', 'second-opinion']` (no virtual), or `['in-person', 'virtual', 'second-opinion']` (all three). Each type renders as a distinct pill badge. The array is also filterable — `ProviderSearch` has an appointment type `<select>` that uses `p.appointmentTypes.includes(apptTypeFilter)`.

**CTA logic based on `acceptingStatus`:**
```tsx
{provider.acceptingStatus !== 'not-accepting'
  ? <Button variant="primary" fullWidth>Request Appointment</Button>
  : <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
}
```

### Constraint 3: OutcomesStrip is a first-class section, not a trust-signal footer element

Apollo and Practo bury statistics in hero subtitles or footer copy. CareCompass has a dedicated `<OutcomesStrip>` section — a full-bleed navy band placed **between the hero and the ConditionBrowser**. It renders 5 outcome metrics in a `<dl>` structure:

| Value | Context |
|-------|---------|
| #1 | US News & World Report |
| 35,000+ | Heart procedures annually |
| 1,800+ | Specialist physicians |
| 300+ | Locations worldwide |
| 6.2M+ | Patients seen annually |

This section has:
- `background: var(--color-navy)`
- No `border-radius` — it spans edge to edge
- No `box-shadow`
- White text for values, white/70% opacity for context labels
- `<dl>` semantics (not a `<ul>` or `<div>` grid)

**If you put these numbers in the hero subtitle or footer** — you've missed the point. They are the authority proof. They deserve their own full-width section.

---

## Stop-and-Ask List

Before implementing any of the following, pause and re-read the relevant constraint:

| If you're about to... | Stop because... |
|-----------------------|-----------------|
| Add a second text input to hero search | Constraint 1 — single field only |
| Add a city `<select>` to hero | Constraint 1 — Apollo pattern, not Cleveland |
| Use `consultMode` or `videoConsult` | Constraint 2 — this build uses `appointmentTypes: AppointmentType[]` |
| Render a single appointment CTA button per provider | Constraint 2 — badges show types, button logic is on `acceptingStatus` |
| Put outcomes data in hero subtitle | Constraint 3 — they belong in `OutcomesStrip` |
| Put outcomes data in footer | Constraint 3 — first-class section, not an afterthought |
| Use `border-radius: 50%` on photos | Guide §4 — photos are `6px` rounded rect |
| Use `border-radius: 4px` on cards | Guide §4 — cards are `6px` (buttons are `4px`) |
| Add `box-shadow` to ConditionBrowser cards | Guide §5 — only ProviderCard has shadow |
| Add NABH/JCI badges | Not applicable — US system uses US News ranking |
| Add "Emergency" link to nav | Not applicable — academic centre, not ER-first |
| Use Lato or Nunito Sans | Wrong build — this build uses Roboto |
| Use white text on `var(--color-surface)` | Surface is #F5F7FA — white text on light background fails |

---

## File Manifest

```
bw_clinic_03.md                         ← 8 platform prompt versions
bw_clinic_platform_03_scaffold/
  00_Orchestrator.md                    ← this file
  01_PRD.md                             ← personas, functional requirements
  02_Architecture.md                    ← types, mock data, component map
  03_Design.md                          ← CSS tokens, module CSS, anti-patterns
  04_Plan.md                            ← 4-day build plan with gate checks
  05_Epics_and_Stories.md               ← 9 epics, 40+ stories with acceptance criteria
  06_Tasks.md                           ← 20 atomic tasks with code snippets
  07_Guide.md                           ← constraint deep-dives, contrast math, 65-item checklist
```
