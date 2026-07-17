# 00 — Orchestrator
## Indian Hospital Network · bw_clinic_01

You are building an Apollo Hospitals-style Indian multi-specialty hospital homepage. The product is patient-facing — the primary goal is doctor discovery and appointment booking. Read this file first.

---

## Reading Sequence

| Order | File | Read when |
|-------|------|-----------|
| 1 | `00_Orchestrator.md` | Always first — this file |
| 2 | `01_PRD.md` | Before writing any component |
| 3 | `02_Architecture.md` | Before writing any TypeScript |
| 4 | `03_Design.md` | Before writing any CSS |
| 5 | `04_Plan.md` | For day-by-day build order |
| 6 | `05_Epics_and_Stories.md` | For acceptance criteria |
| 7 | `06_Tasks.md` | For task-by-task execution |
| 8 | `07_Guide.md` | When stuck or making a mistake |

---

## How This Differs From All bw_legal Builds

| Dimension | bw_legal_01–02 (Law firms) | bw_legal_03–04 (Fintech/Legaltech) | **bw_clinic_01 (Hospital)** |
|-----------|---------------------------|------------------------------------|-----------------------------|
| Primary action | "Contact Us" | "File Now / Register" | **"Book Appointment"** |
| Hero element | Copy + CTAs | Text CTAs / search bar | **Doctor booking widget** |
| Primary content | Practice areas | Service pricing tiers | **Doctor profiles** |
| Photos | Grayscale/none | None | **Circular headshots (color)** |
| Consultation fee | Never | Sometimes | **Always shown per doctor** |
| Emergency link | None | None | **"Emergency: 1066" in nav** |
| Video option | None | None | **"Video Consult" per doctor** |
| Accreditation | Rankings/awards | ISO 27001 | **NABH + JCI** |
| Rating per item | Forbidden | Platform-level | **Per-doctor rating + reviews** |
| Background | White or dark | White or dark | **White + teal tint** |
| Primary color | Purple/Terracotta/Blue/Navy | Blue/Navy | **Teal `#2582A1`** |
| Accent | Gold (decorative) / Yellow | None / Yellow | **Gold (accent only, not text on white)** |
| Font | Serif+sans / DM Sans / Roboto / Plus Jakarta | Roboto / Plus Jakarta | **Nunito Sans** |
| Button radius | 9999px / 4px / 6px | 4px / 6px | **8px** |

---

## The Four Defining Constraints

**Constraint 1: Booking widget as hero centerpiece**
Every other build has text + CTA buttons in the hero. This build has an interactive booking widget — city dropdown + specialty dropdown + "Find Doctors" submit button. The widget is the first conversion point. Moving it below the fold or replacing it with static CTAs degrades the product's core function.

**Constraint 2: Dual CTA on every doctor card (in-person + video)**
Every DoctorCard shows two action buttons: "Book Appointment" (in-person) and "Video Consult" (if `videoConsult: true`). These are distinct services with different delivery models. A single "Book" button removes the telehealth path.

**Constraint 3: Gold is an accent, not a text color**
`#FDB931` (gold) on white `#FFFFFF` = 1.9:1 contrast — catastrophic WCAG failure. Gold is used ONLY as:
- Star rating icons / emoji color
- Badge backgrounds (with dark `--color-text` or `--color-teal-dark` text)
- Decorative icon highlights
- Footer link hover on `--color-teal-dark` background (passes AA)
**Gold text on white sections: forbidden.**

**Constraint 4: Emergency contact is always visible in nav**
"Emergency: 1066" in red (`#DC2626`) must appear in the nav at all scroll positions. This is a healthcare-specific safety requirement. Other build types (legal, fintech) don't have this. Removing or hiding it is a product error, not just a style choice.

---

## Color System at a Glance

```css
--color-teal:      #2582A1;   /* Primary CTAs, links, nav elements, icons */
--color-gold:      #FDB931;   /* Stars, accent highlights (never text on white) */
--color-teal-dark: #1B6A85;   /* Footer bg, hover states, secondary headings */
--color-surface:   #F0F7FA;   /* Alternate section tint (SpecialtyGrid, WhyUs) */
--color-text:      #1C2B3A;   /* Primary body text — dark charcoal navy */
--color-muted:     #64748B;   /* Secondary text, captions, qualifications */
--color-border:    #E2E8F0;   /* Card borders */
--color-white:     #FFFFFF;   /* Primary page and card backgrounds */
```

**Contrast audit:**
- `#1C2B3A` on white = 16.4:1 ✓ (AAA)
- `#64748B` on white = 5.2:1 ✓ (AA)
- White on `#2582A1` (teal buttons) = 5.0:1 ✓ (AA)
- `#1C2B3A` on `#FDB931` (gold badge text) = 8.4:1 ✓ (AAA)
- `#FDB931` on white = **1.9:1 ✗ FAILS** — never use as text on white

---

## Content Architecture

```
Homepage
├── StickyNav (white, emergency link, "Book Appointment" teal CTA)
├── Hero (H1 + BookingWidget: city+specialty+CTA + 4 stats)
├── SpecialtyGrid (12 medical specialties, F0F7FA bg)
├── DoctorDirectory ('use client', city+specialty+search filters, doctor cards)
├── WhyUs (stats, NABH + JCI accreditation badges, F0F7FA bg)
├── HealthPackages (3 preventive checkup packages, strike-through prices)
├── Testimonials (patient quote cards)
└── Footer (teal-dark bg, 4 columns, gold link hover)
```

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to remove the booking widget from the hero (replacing with text CTAs only)
- You are about to use gold as text color on a white section background
- You are about to use `border-radius: 9999px` on any button (pill = wrong)
- You are about to remove "Emergency: 1066" from the nav
- You are about to show only one CTA on a doctor card (must show in-person + video)
- You are about to hide consultation fees from doctor cards
- You are about to use a serif font
- You are about to use a dark section background (other than the footer)
- You are about to remove NABH or JCI from the accreditation section (both required)
- You are about to use purple, terracotta, or dark navy as the primary (teal `#2582A1` is lighter)
- You are about to use a single dropdown filter in DoctorDirectory (needs city + specialty + name search, all three)
