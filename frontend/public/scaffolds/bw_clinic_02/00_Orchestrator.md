# 00 — Orchestrator
## Doctor Discovery + Booking Platform · bw_clinic_02

You are building a Practo-style doctor discovery and booking homepage. This is a consumer-facing booking platform — not a hospital website. Doctors are the product; search and availability are the primary UX. Read this file first.

---

## Reading Sequence

| Order | File | Read when |
|-------|------|-----------|
| 1 | `00_Orchestrator.md` | Always first |
| 2 | `01_PRD.md` | Before writing any component |
| 3 | `02_Architecture.md` | Before writing any TypeScript |
| 4 | `03_Design.md` | Before writing any CSS |
| 5 | `04_Plan.md` | For day-by-day build order |
| 6 | `05_Epics_and_Stories.md` | For acceptance criteria |
| 7 | `06_Tasks.md` | For task-by-task execution |
| 8 | `07_Guide.md` | When stuck or making a mistake |

---

## How This Differs From bw_clinic_01 (Apollo Hospitals)

| Dimension | bw_clinic_01 Apollo | **bw_clinic_02 Practo** |
|-----------|---------------------|------------------------|
| Product type | Hospital network site | **Doctor booking platform** |
| Primary color | Teal `#2582A1` (muted) | **Cyan `#14BEF0` (bright)** |
| Accent | Gold `#FDB931` | **Navy `#28328C`** |
| Text on primary | Gold is decorative | **Navy text on cyan (contrast rule)** |
| Hero element | Booking widget (dropdowns) | **OmniSearch (two text inputs)** |
| Doctor photo | Circular `border-radius: 50%` | **Rounded rect `border-radius: 4px`** |
| Button radius | 8px | **4px** |
| Card radius | 12px + shadow | **4px + border only** |
| Card style | Shadow-elevated | **Flat: `border: 1px solid var(--color-border)`** |
| Font | Nunito Sans | **Lato** |
| Specialty display | Static 4-col grid | **Horizontal scroll carousel** |
| Availability signal | None | **"Available Today" green badge** |
| Consult modes | `videoConsult: boolean` | **`consultMode: 'clinic'|'video'|'both'`** |
| Trust signal | NABH + JCI accreditation | **Per-doctor "Verified" badge** |
| Emergency | "Emergency: 1066" red | **None (booking platform)** |
| Unique sections | SpecialtyGrid, WhyUs | **DiscoveryCards, SymptomCards, SpecialtyCarousel** |

---

## The Four Defining Constraints

**Constraint 1: OmniSearch — two text inputs, not dropdowns**
Apollo's hero uses preset dropdowns (city select, specialty select). Practo uses free-text search — a location input and a keyword input. This models how patients actually think: "Koramangala" + "dentist", not "Select City: Bangalore → Select Specialty: Dental". Free-text inputs also accommodate clinic names, doctor names, and symptom searches in one field.

**Constraint 2: 4px flat radius — no shadows, no softness**
This is a flat design language. Every button and card uses `border-radius: 4px`. Cards use `border: 1px solid var(--color-border)` — no `box-shadow`. The only exception: the OmniSearch card in the hero has a subtle shadow (`0 4px 8px rgba(0,0,0,0.12)`) to lift it from the white background. All other cards: border only.

**Constraint 3: Cyan text contrast — navy on cyan, never white**
`#14BEF0` (cyan) on white `#FFFFFF` = 1.8:1 — fails both WCAG AA and AAA.
`#14BEF0` as a background with white text: 1.8:1 — same failure.
`#28328C` (navy) on `#14BEF0` (cyan) = 6.4:1 — passes AA.

All cyan CTA buttons must have `color: var(--color-navy)`. Every instance. No white text on cyan.

**Constraint 4: `consultMode` drives CTA rendering — not CSS visibility**
Doctors have `consultMode: 'clinic' | 'video' | 'both'`. Each value produces different CTAs:
- `'clinic'` → one button: "Book Clinic Visit"
- `'video'` → one button: "Consult Online"
- `'both'` → two buttons: "Book Clinic Visit" + "Consult Online"

These are not toggled with CSS `display: none`. They are conditionally rendered in JSX. A clinic-only doctor should not have a hidden video button in the DOM.

---

## Color System

```css
--color-cyan:    #14BEF0;   /* CTAs, links, active states — navy text always */
--color-navy:    #28328C;   /* Footer, headings, verified badge, text on cyan */
--color-green:   #30AC4A;   /* "Available Today" badge, dot indicator */
--color-surface: #F0F0F5;   /* Section tints, discovery tile backgrounds */
--color-text:    #414146;   /* Primary body text */
--color-muted:   #787887;   /* Secondary text, placeholders, captions */
--color-border:  #DFDFE5;   /* Card borders, input borders, dividers */
--color-white:   #FFFFFF;   /* Page background, card backgrounds */
```

**Full contrast table:**

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| `#414146` on white | 9.7:1 | ✓ AAA |
| `#787887` on white | 4.6:1 | ✓ AA |
| `#28328C` on white | 10.0:1 | ✓ AAA |
| `#28328C` on `#14BEF0` (cyan) | 6.4:1 | ✓ AA |
| White on `#28328C` (navy) | 9.3:1 | ✓ AAA |
| `#30AC4A` on white | 3.7:1 | ✓ AA (large text only) |
| **White on `#14BEF0`** | **1.8:1** | **✗ FAILS** |
| **`#14BEF0` text on white** | **1.8:1** | **✗ FAILS** |

---

## Content Architecture

```
Homepage
├── StickyNav (white, Login cyan outline CTA)
├── Hero (H1 + OmniSearch: locality + keyword + submit + stats)
├── DiscoveryCards (4 service tiles, F0F0F5 bg)
├── SymptomCards (8 quick-consult cards, CONSULT NOW CTAs)
├── SpecialtyCarousel ('use client', horizontal scroll)
├── DoctorGrid ('use client', city + specialty filter, doctor cards)
├── Testimonials (text-only quotes, F0F0F5 bg)
├── AppDownload (illustration + store badges)
└── Footer (navy bg, 4 columns, cyan link hover)
```

---

## Radius Vocabulary

| Element | Radius | Rationale |
|---------|--------|-----------|
| All buttons | `4px` | Flat product precision |
| All cards | `4px` | Consistent with buttons |
| OmniSearch inputs | `4px` | Matches card container |
| AvailabilityBadge | `20px` | Pill chip — status indicator |
| Specialty chips (carousel) | `20px` | Pill chip — category tag |
| Symptom suggestion pills | `20px` | Pill chip — query shortcut |
| Availability dot | `50%` | 6×6px circle dot — decorative |
| Doctor photos | `4px` | NOT `50%` — Practo uses rounded rect |

**No other `border-radius` values exist in this build.**

---

## When to Stop and Ask

Stop and ask if:
- You are about to use `border-radius: 50%` on doctor photos (Apollo pattern)
- You are about to use `border-radius: 8px` or higher on buttons (Apollo pattern)
- You are about to use white text on a cyan button (1.8:1 — fails WCAG)
- You are about to add dropdown `<select>` elements to the OmniSearch hero (should be text inputs)
- You are about to add NABH/JCI badges (hospital site pattern — use per-doctor "Verified" badge)
- You are about to add an "Emergency: 1066" link (hospital pattern — this is a booking platform)
- You are about to add a gold accent (Apollo palette — not in this build)
- You are about to hide a CTA with `display: none` based on `consultMode` (should be conditionally rendered)
- You are about to use `box-shadow` on regular cards (only OmniSearch card has shadow)
- You are about to use Nunito Sans (Apollo's font — this build uses Lato)
