# bw_clinic_01 — Large Indian Hospital Network
## Inspiration: Apollo Hospitals · apollohospitals.com

---

## Design Identity

**Background:** White `#FFFFFF` + light teal tint sections `#F0F7FA`
**Primary:** Teal `#2582A1` — primary CTAs, nav accents, headings
**Accent:** Gold `#FDB931` — star ratings, trust badge highlights, warmth
**Dark:** Teal-dark `#1B6A85` — footer, hover states, secondary headings
**Button radius:** `8px` — softer than legal/fintech; healthcare warmth
**Card radius:** `12px` with box shadows
**Font:** Nunito Sans (400/600/700/800) — slightly rounded terminals, accessible, warm
**Tone:** Consumer-patient trust — authoritative clinical competence + approachable warmth

**Defining features:**
- **Appointment booking widget in hero** — city dropdown + specialty dropdown + "Find Doctors" CTA
- **Dual CTA on doctor cards** — "Book Appointment" (in-person) + "Video Consult"
- **Circular doctor photos** — `border-radius: 50%`, professional headshots, full color
- **Specialty icon grid** — 12 medical specialties with icons and doctor counts
- **Per-doctor consultation fees** — transparent, shown on every card (₹800, ₹1,200, etc.)
- **Star ratings per doctor** — 4.8★ with review count
- **Emergency contact in nav** — "Emergency: 1066" in red — healthcare-specific nav element
- **NABH + JCI accreditation badges** — institutional trust (different from ISO/Trustpilot in legal)
- **Health packages** — preventive checkup packages with test counts and strike-through prices

---

## How This Differs From bw_legal and bw_clinic Siblings

| | bw_legal_03 ClearTax | bw_legal_04 Vakilsearch | **bw_clinic_01 Apollo** |
|---|---|---|---|
| Background | Dark `#151515` | White | **White / teal tint** |
| Primary | Blue `#1678FB` | Navy `#022B50` | **Teal `#2582A1`** |
| Accent | None | Yellow `#FFD000` | **Gold `#FDB931`** |
| Button radius | 4px | 6px | **8px** |
| Card radius | 8px ghost | 10px shadow | **12px shadow** |
| Font | Plus Jakarta Sans | Roboto | **Nunito Sans** |
| Hero centerpiece | Dual text CTAs | Search bar | **Booking widget (city + specialty)** |
| Primary content | Tax tiers | Legal SKUs | **Doctor profiles** |
| Photos | None | None | **Circular doctor headshots** |
| Pricing | Monthly plans | Legal package prices | **Per-doctor consultation fee** |
| Accreditation | ISO 27001 | ISO 27001 | **NABH + JCI** |
| Emergency contact | None | None | **"Emergency: 1066" in nav** |
| Video option | None | None | **"Video Consult" per doctor** |

---

## Color System

```css
--color-teal:      #2582A1;   /* Primary CTAs, nav, links, headings */
--color-gold:      #FDB931;   /* Star ratings, accent highlights, trust badges */
--color-teal-dark: #1B6A85;   /* Footer bg, hover states */
--color-surface:   #F0F7FA;   /* Alternate section tint */
--color-text:      #1C2B3A;   /* Primary body text */
--color-muted:     #64748B;   /* Secondary text, captions */
--color-border:    #E2E8F0;   /* Card borders */
--color-white:     #FFFFFF;   /* Cards, primary page background */
```

**Gold on white = 1.9:1 — fails WCAG. Gold is NEVER used as text on white.
Gold is used as: icon color, star emoji, badge backgrounds (with dark text), or decorative only.**

---

## Base Prompt

**Role:** Senior product designer specialising in large Indian hospital network websites, appointment booking UX, and doctor discovery with dual in-person/video consult flows.

**Application Overview:** A large Indian hospital network homepage built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). Inspired by Apollo Hospitals — a healthcare-first platform centered on a city + specialty appointment booking widget in the hero, a filterable doctor directory, and specialty icon grid. Font: Nunito Sans 400/600/700/800 via `next/font/google`. No Tailwind, no serif font.

**Brand Voice & Mood:** Authoritative clinical competence with approachable warmth — teal `#2582A1` conveys medical professionalism; gold `#FDB931` adds warmth to star ratings and accreditation highlights. The page opens with a booking widget (not a text CTA) — the product's core action is scheduling, not reading. NABH + JCI accreditation badges in the trust section signal institutional credibility distinct from the ISO/Trustpilot signals of legal/fintech builds.

**Core Features:**
1. **StickyNav** (server) — white bg, teal logo, center links (Find Doctors, Specialties, Health Packages, Hospitals), right: "Emergency: 1066" in red `#DC2626` + "Book Appointment" teal button (8px radius)
2. **HeroSection** with **AppointmentWidget** (`'use client'`) — white bg, `min-height: 70vh`, navy H1; inline widget row: city dropdown + specialty dropdown + "Find Doctors" teal button; trust stats below: "5,000+ Doctors | 72 Specialties | 40+ Hospitals | 30M+ Patients"
3. **SpecialtyGrid** (server) — `#F0F7FA` bg, 4×3 grid of 12 specialty cards; each: white card (12px radius), teal Lucide icon, specialty name, doctor count
4. **DoctorDirectory** (`'use client'`) — 3-way filter (city select + specialty select + name search); `useMemo`; ARIA live region; 3-col grid of `DoctorCard`
5. **DoctorCard** (server) — circular photo `border-radius: 50%` 96×96px; name (Nunito Sans 700); title + qualifications; "X+ Years" experience; gold star rating + review count; hospital + city; `₹{fee} Consult Fee`; two CTAs: "Book Appointment" (teal primary) + "Video Consult" (teal outline) — both 8px radius
6. **WhyApollo** (server) — `#F0F7FA` bg, 4 stat blocks (5,000+ Doctors, 72 Specialties, 40+ Years, 30M+ Patients); NABH + JCI accreditation badges side by side
7. **HealthPackages** (server) — 3 package cards ("Essential", "Comprehensive", "Full Body") with strike-through original + discounted price, test count, "Book Now" teal CTA
8. **Footer** (server) — dark teal bg (`--color-teal-dark`), 4 columns

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-teal: #2582A1`, `--color-gold: #FDB931`, `--color-teal-dark: #1B6A85`, `--color-surface: #F0F7FA`, `--color-text: #1C2B3A`, `--color-muted: #64748B`, `--color-border: #E2E8F0`, `--color-white: #FFFFFF`
- **Contrast:** White on teal `#2582A1` ≈ 4.6:1 ✓ AA (button text). Gold `#FDB931` on white = 1.9:1 ✗ — **gold is NEVER used as text on white**; use as icon fill, star emoji, badge backgrounds with dark text, or decorative elements only.
- **Emergency link:** `#DC2626` red — this is an inline style exception (not a token); used only for the emergency nav link
- **Border-radius:** `8px` ALL buttons, `12px` cards with `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`, `50%` doctor photos only, `20px` filter chips. No pill (9999px).
- **Zero hex in `.module.css`** — CSS custom properties only; exception: `rgba()` in shadows and `#DC2626` emergency link via inline style
- **Typography:** Nunito Sans 400/600/700/800 — no serif, no weight 500

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # Doctor, Specialty, HealthPackage, TrustStat
  lib/
    data.ts            # 8+ doctors, 12 specialties, 3 packages, trustStats
    filterDoctors.ts   # filterDoctors(doctors, city, specialty, nameQuery)
  components/
    layout/StickyNav/ Footer/
    home/
      HeroSection/            # contains AppointmentWidget
      AppointmentWidget/      # 'use client' — city + specialty dropdowns
      SpecialtyGrid/          # server, 4×3 grid
      DoctorDirectory/        # 'use client', 3-way filter + useMemo
      DoctorCard/             # server, circular photo, dual CTAs
      WhyApollo/              # server, stats + NABH/JCI badges
      HealthPackages/         # server, 3 package cards with strike-through
    ui/
      Button/                 # primary (teal bg, white text), outline (teal border)
      StarRating/             # gold stars, review count
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `filterDoctors(doctors, city, specialty, nameQuery)` — all three filters applied simultaneously via `useMemo`
- `Doctor.videoConsult: boolean` — drives whether "Video Consult" CTA appears
- `Doctor.consultFee: number` — displayed as `₹{doctor.consultFee} Consult Fee`

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define types: `Doctor`, `Specialty`, `HealthPackage`, `TrustStat`
3. Write `globals.css` with 8 tokens; `layout.tsx` with Nunito Sans weights `['400','600','700','800']`
4. Create mock data: 8+ doctors (mix of specialties/cities/videoConsult), 12 specialties, 3 health packages
5. Build `AppointmentWidget` (`'use client'`) — city + specialty dropdowns + submit scrolls to `#doctor-section`
6. Build `DoctorCard` (server) — circular photo, star rating (gold), dual CTAs
7. Build `DoctorDirectory` (`'use client'`) — 3-way filter with useMemo, ARIA live region
8. Build remaining server sections; verify gold constraint (never as text on white)
9. `tsc --noEmit` and `npm run build`

**User Experience:**
- Booking widget in hero makes the primary action (scheduling) immediate — not buried below-fold
- "Emergency: 1066" red link in nav is a healthcare-specific pattern not present in legal/fintech builds
- Dual CTAs per doctor (Book Appointment + Video Consult) surface both care pathways at the card level
- Circular doctor photos signal approachability (warmth) vs rectangular photos in bw_clinic_02/03 (precision)
- NABH + JCI badges in the trust section signal Indian-international hospital accreditation

**Constraints:**
- Gold `#FDB931`: NEVER as text on white background (1.9:1 fails) — stars/icons/badges only
- Doctor photos: `border-radius: 50%` — circular (this is the Apollo pattern; Practo uses 4px rectangular)
- Emergency nav link: red `#DC2626` — use inline style, not a CSS token
- Button radius: `8px` everywhere — no 9999px pill, no 4px sharp
- `DoctorDirectory` and `AppointmentWidget`: `'use client'` — these two only (from filter/form-interactive components)
- `DoctorCard`: server component — receives props, no state
- Strike-through pricing in `HealthPackages`: `<del>` tag — not CSS `text-decoration`
- `page.tsx` must be a Server Component — no `'use client'` on the page file
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Version 1 — Lovable

Build a large Indian hospital network homepage inspired by Apollo Hospitals using React, TypeScript, and CSS Modules. White background with teal `#2582A1` and gold `#FDB931` brand palette.

**Color system — 8 tokens only:**
```css
--color-teal: #2582A1; --color-gold: #FDB931; --color-teal-dark: #1B6A85;
--color-surface: #F0F7FA; --color-text: #1C2B3A; --color-muted: #64748B;
--color-border: #E2E8F0; --color-white: #FFFFFF;
```
No hex in `.module.css` files. Only `var(--color-*)`.

**Typography:** Nunito Sans via Google Fonts, weights 400/600/700/800. No serif anywhere.

**Button radius: `8px`.** Card radius: `12px` with `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`. No pill (`9999px`).

**StickyNav:**
- White bg, `border-bottom: 1px solid var(--color-border)`
- Logo: "Apollo" in teal Nunito Sans 800
- Center links: Find Doctors, Specialties, Health Packages, Hospitals
- Right: "Emergency: 1066" in red (`#DC2626`) + "Book Appointment" teal button (8px radius)

**Hero (booking widget):**
- White bg, centered, `min-height: 70vh`
- Eyebrow: "India's Leading Healthcare Network · Since 1983"
- H1: Nunito Sans 800, `clamp(2.25rem, 4vw, 3.5rem)`, `#1C2B3A`
- Subheading: muted, Nunito Sans 400
- **Appointment booking widget:** inline row — city dropdown + specialty dropdown + "Find Doctors" teal button (8px radius)
- Trust stats below widget: `5,000+ Specialist Doctors | 72 Specialties | 40+ Hospitals | 30M+ Patients`

**SpecialtyGrid:** 12 specialty cards in a 4-column grid on `#F0F7FA` background. Each: white card, 12px radius, Lucide icon in teal, specialty name, doctor count ("142 Doctors"). Hover: teal border.

**DoctorDirectory (`'use client'`):**
- Filter bar: city select + specialty select + name search (all `useState`)
- Doctor cards grid (3-col desktop, 2-col tablet, 1-col mobile):
  - Circular photo (`border-radius: 50%`, 96×96px)
  - Name: Nunito Sans 700, `#1C2B3A`
  - Title + Qualifications: muted
  - Experience: "25+ Years"
  - Rating: ⭐ 4.8 (2,341 reviews) in gold
  - Hospital + City
  - Consultation fee: "₹800 Consult Fee"
  - Two CTAs: "Book Appointment" (teal, primary, 8px) + "Video Consult" (teal outline, 8px)

**WhyApollo section (`#F0F7FA` bg):** 4 stat blocks — 5,000+ Doctors, 72 Specialties, 40+ Years, 30M+ Patients. NABH + JCI accreditation badges side by side.

**HealthPackages:** 3 package cards — "Essential", "Comprehensive", "Full Body". Strike-through original + discounted price, test count (e.g., "68 Tests"), "Book Now" teal CTA.

**Footer:** `#1B6A85` background, white text, 4 columns. Yellow link hover. NABH + JCI badges at bottom.

CSS Modules only. No Tailwind. `tsc --noEmit` clean. `npm run build` static export.

---

### Version 2 — ChatGPT Canvas

```
Project: Indian hospital network homepage — doctor directory, appointment booking
Stack: Next.js 14 App Router, TypeScript strict, CSS Modules
Inspiration: Apollo Hospitals (apollohospitals.com)

COLORS (8 tokens — no hex in .module.css files):
  --color-teal:      #2582A1   primary CTAs, links, nav, specialty icons
  --color-gold:      #FDB931   star ratings, trust accent (NEVER text on white)
  --color-teal-dark: #1B6A85   footer background, hover states
  --color-surface:   #F0F7FA   alternate section backgrounds
  --color-text:      #1C2B3A   primary body text
  --color-muted:     #64748B   secondary text, captions
  --color-border:    #E2E8F0   card borders
  --color-white:     #FFFFFF   cards, page background

FONT: Nunito Sans 400/600/700/800 via next/font/google. No serif.

RADIUS: Buttons 8px. Cards 12px. Doctor photos circular (border-radius: 50%). No 9999px.

SECTIONS (top to bottom):
1. StickyNav — white, "Emergency: 1066" red link, "Book Appointment" teal button
2. Hero — H1, appointment booking widget (city + specialty dropdowns + CTA), stats row
3. SpecialtyGrid — 12 specialties, F0F7FA bg, icon + name + doctor count per card
4. DoctorDirectory — 'use client', city+specialty+name filters, doctor card grid
5. WhyApollo — F0F7FA bg, 4 stat blocks, NABH + JCI accreditation badges
6. HealthPackages — 3 package cards, strike-through prices, test counts
7. Testimonials — patient quote cards, star ratings
8. Footer — teal-dark bg, 4 columns, gold link hover

DOCTOR CARD STRUCTURE:
  - Circular photo 96×96px (border-radius: 50%)
  - Name (Nunito Sans 700, color-text)
  - Title + qualifications (muted)
  - "X+ Years Experience"
  - ⭐ rating + review count (gold star)
  - Hospital + city
  - "₹X Consult Fee"
  - "Book Appointment" button (primary, teal, 8px) + "Video Consult" (secondary, 8px)

GOLD CONTRAST RULE:
  gold (#FDB931) on white = 1.9:1 — FAILS WCAG
  NEVER use gold as text color on white backgrounds
  Gold ONLY as: star emoji/icon, badge background (with dark text), decorative accent

ACCREDITATION:
  NABH (National Accreditation Board for Hospitals)
  JCI (Joint Commission International)
  Show both badges in WhyApollo section + footer

EMERGENCY:
  "Emergency: 1066" — red (#DC2626) in nav, always visible
  This is mandatory — hospitals must show emergency contact

ANTI-PATTERNS:
  No dark section backgrounds (this is a light/white site)
  No pill buttons (9999px)
  No serif font
  No hiding consultation fees
  No purple, navy, or blue-600+ as primary (Apollo's teal is lighter #2582A1)
  No gold text on white (contrast failure)

OUTPUT: Static Next.js. tsc --noEmit clean. npm run build succeeds.
```

---

### Version 3 — Bolt.new

Design and build a large Indian multi-specialty hospital homepage inspired by Apollo Hospitals.

**Visual identity:**
Teal `#2582A1` (trust, clinical, calm) + Gold `#FDB931` (warmth, vitality) + White. Light teal `#F0F7FA` for section tints. Nunito Sans exclusively — slightly rounded, warm, legible for healthcare audiences. `8px` button radius, `12px` card radius, `50%` doctor photos. No serif. No pill buttons.

**StickyNav:** White, 68px. Logo: "ApolloMed" teal Nunito 800. Links: Find Doctors, Specialties, Hospitals, Packages. Right side: "Emergency: 1066" in red + "Book Appointment" teal button (8px, height 42px).

**Hero:**
- White bg, centered, `min-height: 70vh`
- Eyebrow: "India's Most Trusted Healthcare Network"
- H1: Nunito 800, `clamp(2.25rem, 4vw, 3.5rem)`, `#1C2B3A`
- **Booking widget** (below H1):
```
╔══════════════╦══════════════════════╦══════════════════╗
║ Select City ▼║ Select Specialty    ▼║ Find Doctors →   ║
╚══════════════╩══════════════════════╩══════════════════╝
```
White widget card, `border-radius: 12px`, subtle shadow.
- Stats row: "5,000+ Doctors | 72 Specialties | 40+ Hospitals | 30M+ Patients Treated"

**SpecialtyGrid (F0F7FA bg):**
12 cards in 4-col grid. White card, 12px radius, shadow on hover. Lucide icon in teal. Specialty name Nunito 600 `#1C2B3A`. Doctor count muted (e.g., "142 Doctors").

**DoctorDirectory:**
Filter bar: city select + specialty select + search input. 3-col card grid.
Doctor card: circular photo → name (700) → title + qualifications (muted) → "X+ Years" → ⭐ 4.8 (2,341 reviews) → hospital → ₹800 Consult Fee → [Book Appointment] [Video Consult].

**WhyApollo (F0F7FA bg):**
4 stat blocks + NABH badge + JCI badge row.

**HealthPackages:**
3 white cards, 12px radius, shadow. Each: package name, `~~₹3,500~~ ₹2,499`, "68 Tests Included", feature list with Check icons in teal, "Book Now" teal button.

**Footer:** `#1B6A85` bg, white text, 4 cols. Links hover to gold. NABH + JCI at bottom.

CSS Modules, zero hex in modules, TypeScript strict, static export, Lighthouse ≥90/90.

---

### Version 4 — v0

Build a multi-specialty Indian hospital homepage named "HeliosHealth".

**Design constraints:**
- Background: white and `#F0F7FA` tint only — no dark sections (footer: `#1B6A85`)
- Primary: `--color-teal: #2582A1`
- Accent: `--color-gold: #FDB931` — never as text on white (1.9:1 fails WCAG)
- Radius: `8px` buttons, `12px` cards, `50%` doctor photos
- Font: Nunito Sans 400/600/700/800

**TypeScript interfaces:**

```typescript
type City = 'chennai' | 'hyderabad' | 'bangalore' | 'delhi' | 'mumbai'
type Specialty = 'cardiology' | 'oncology' | 'neurology' | 'orthopedics' | 'gastroenterology' | 'pediatrics' | 'gynecology' | 'dermatology' | 'nephrology' | 'pulmonology' | 'ophthalmology' | 'ent'

interface Doctor {
  id: string
  name: string           // "Dr. Ramesh Kumar"
  title: string          // "Senior Consultant — Cardiology"
  qualifications: string // "MBBS, MD, DM (Cardiology)"
  specialty: Specialty
  experience: number     // 25 → displayed as "25+ Years"
  hospital: string
  city: City
  rating: number         // 4.8
  reviewCount: number
  consultFee: number     // 800 → "₹800"
  videoConsult: boolean
  photo: string
}

interface HealthPackage {
  id: string
  name: string
  originalPrice: number
  discountedPrice: number
  testCount: number      // 68 → "68 Tests"
  popular: boolean
  features: string[]
}
```

**DoctorDirectory — `'use client'`:**
```typescript
const [city, setCity] = useState<City | 'all'>('all')
const [specialty, setSpecialty] = useState<Specialty | 'all'>('all')
const [query, setQuery] = useState('')
const filtered = useMemo(() => doctors.filter(d =>
  (city === 'all' || d.city === city) &&
  (specialty === 'all' || d.specialty === specialty) &&
  d.name.toLowerCase().includes(query.toLowerCase())
), [city, specialty, query])
```

**Sections:** StickyNav (white, emergency link) → Hero (booking widget + stats) → SpecialtyGrid (12 specialties, F0F7FA) → DoctorDirectory (filtered cards) → WhyHelios (F0F7FA, NABH+JCI) → HealthPackages (strike-through prices) → Testimonials → Footer (teal-dark).

Zero hex in `.module.css`. Static export. `tsc --noEmit` clean.

---

### Version 5 — Claude Artifacts

Build `bw_clinic_01` — a large Indian hospital network homepage. Reference: Apollo Hospitals (apollohospitals.com). Read the full scaffold in `bw_clinic_platform_01_scaffold/` before writing any file.

**Core identity:**
- White background with light teal tint sections `#F0F7FA`
- Teal `#2582A1` (primary) + Gold `#FDB931` (accent — NEVER as text on white)
- Nunito Sans font (Google Fonts), weights 400/600/700/800
- `8px` button radius, `12px` card radius, `50%` doctor photo radius
- Doctor search/booking widget is the hero centerpiece, not a text CTA

**File structure:**
```
src/
  types/index.ts         — Doctor, HealthPackage, Specialty, City, SpecialtyCard, Stat
  lib/data.ts            — 8 doctors, 12 specialties, 3 packages, 4 stats, 4 accreditations
  app/
    layout.tsx           — Nunito Sans font, globals.css
    page.tsx             — assembles all sections
    globals.css          — 8 color tokens ONLY
  components/
    layout/
      StickyNav.tsx      — server, white bg, emergency link, booking CTA
      Footer.tsx         — teal-dark bg, gold link hover
    home/
      Hero.tsx           — booking widget (city+specialty+CTA), stats row
      SpecialtyGrid.tsx  — 12 specialty cards, F0F7FA bg
      DoctorDirectory.tsx — 'use client', 3 filter controls, doctor card grid
      DoctorCard.tsx     — server component, circular photo, dual CTAs
      WhyUs.tsx          — stats, NABH+JCI badges
      HealthPackages.tsx — strike-through packages, test counts
      Testimonials.tsx   — patient quotes, stars
    ui/
      Button.tsx         — variant: primary|secondary, radius ALWAYS 8px
      BookingWidget.tsx  — 'use client', city+specialty dropdowns + submit
```

**Critical rules:**
1. `border-radius: 8px` on every Button — not 6px, not 4px, not 9999px
2. Doctor photos: `border-radius: 50%` — circular, full color
3. Gold is NEVER text on white — only as icon color, background, or star rating
4. "Emergency: 1066" in red (`#DC2626`) always visible in nav
5. Every doctor card shows: consultation fee + dual CTAs (in-person + video)
6. `DoctorDirectory.tsx` is `'use client'` — filter state lives here
7. `DoctorCard.tsx` is a server component — no interactivity
8. Both NABH and JCI accreditation badges in WhyUs section
9. Zero hex in any `.module.css` file
10. `tsc --noEmit` exits 0, `npm run build` succeeds

---

### Version 6 — Grok

```markdown
# Task: Build bw_clinic_01 — Indian Hospital Network Homepage

## Context
Multi-specialty Indian hospital network homepage. Inspired by Apollo Hospitals.
Primary value: doctor discovery + appointment booking. Not an institutional brochure —
a patient-facing conversion tool. Light/white background. Warm teal + gold palette.

## Stack
Next.js 14 App Router · TypeScript strict · CSS Modules · Framer Motion · Lucide React

## Design Tokens (globals.css — 8 tokens, no hex in modules)
--color-teal:      #2582A1
--color-gold:      #FDB931    NEVER as text on white (1.9:1 contrast ratio — fails)
--color-teal-dark: #1B6A85
--color-surface:   #F0F7FA
--color-text:      #1C2B3A
--color-muted:     #64748B
--color-border:    #E2E8F0
--color-white:     #FFFFFF

## Font
Nunito Sans 400/600/700/800 via next/font/google. Variable: --font-sans. No serif.

## Component Contracts

### Button
variant: 'primary' | 'secondary'
primary: teal bg, white text
secondary: teal border, teal text, transparent bg
RADIUS: 8px — hardcoded, never overridable

### DoctorCard (server component)
Shows: circular photo (96px, border-radius:50%), name (700), title+qualifications (muted),
       experience ("X+ Years"), rating (gold star + count), hospital, consultFee ("₹X"),
       two buttons: "Book Appointment" (primary) + videoConsult && "Video Consult" (secondary)

### DoctorDirectory ('use client')
State: city (City|'all'), specialty (Specialty|'all'), query (string)
Filter: useMemo over doctors array
Renders: filter bar + filtered DoctorCard grid

### BookingWidget ('use client')
City select + specialty select + "Find Doctors" teal submit button
White card, border-radius: 12px, box-shadow
Renders in Hero as primary conversion element

## Acceptance Criteria
- [ ] tsc --noEmit exits 0
- [ ] npm run build exits 0
- [ ] No hex in *.module.css
- [ ] button border-radius = 8px in DevTools
- [ ] Doctor photos circular (border-radius: 50%) in DevTools
- [ ] "Emergency: 1066" visible in nav in red
- [ ] Every DoctorCard shows consultFee AND dual CTAs
- [ ] Both NABH and JCI badges in WhyUs section
- [ ] Gold NEVER appears as text color on white background
- [ ] No dark section backgrounds (except footer: teal-dark)
- [ ] Lighthouse >= 90/90
```

---

### Version 7 — Gemini

Design brief for a large Indian multi-specialty hospital homepage.

**Brand:** HeliosHealth — "World-Class Care, Closer to Home." Forty years of clinical excellence across 40+ hospitals in India.

**Visual system:**
White primary backgrounds. Teal `#2582A1` for clinical authority (buttons, headings, icons). Gold `#FDB931` for warmth and energy — used exclusively as icon color, star ratings, or badge backgrounds (never as text on white, contrast too low). Light teal `#F0F7FA` for alternate sections. Teal-dark `#1B6A85` for footer and hover depth. Nunito Sans typeface — rounded, accessible, warm. `8px` button radius, `12px` card radius, `50%` doctor photos.

**Homepage sections:**

1. **Navigation** — sticky, white, 68px. Logo left. Center: Find Doctors, Specialties, Health Packages. Right: "Emergency: 1066" (red) + "Book Appointment" (teal, 8px radius).

2. **Hero** — white, centered, `min-height: 70vh`. Eyebrow → H1 (Nunito 800, dark, `clamp`) → subheading → BookingWidget (city select + specialty select + "Find Doctors" button) → 4 trust stats: `5,000+ Doctors | 72 Specialties | 40+ Hospitals | 30M+ Patients`.

3. **SpecialtyGrid** — `#F0F7FA` bg. 4×3 grid of specialty cards. White cards, 12px radius, teal Lucide icon, specialty name, doctor count. Hover: teal border.

4. **DoctorDirectory** — `'use client'`. Filter bar (city + specialty + name search). 3-col doctor card grid. Each card: circular photo (96px) → name → title + qualifications → "X+ Years" → ⭐4.8 (2,341 reviews) → hospital → "₹800 Consult Fee" → [Book Appointment] [Video Consult].

5. **WhyHelios** — `#F0F7FA` bg. 4 stat blocks + NABH badge + JCI badge row below.

6. **HealthPackages** — 3 white cards, strike-through price + discounted price, test count, feature list with teal Check icons, "Book Now" teal button.

7. **Testimonials** — 3 patient quote cards, 5-star ratings, name + treatment type.

8. **Footer** — `#1B6A85` bg, white text, 4 columns. Links hover to gold. NABH + JCI at bottom bar.

**Anti-patterns:** No dark interior sections. No pill buttons. No serif. No gold text on white. No hiding consultation fees. No single CTA on doctor cards (must have in-person + video).

TypeScript strict. CSS Modules. Static export. Lighthouse ≥90/90.

---

### Version 8 — Cursor

```typescript
/*
 * bw_clinic_01 — Indian Hospital Network Homepage
 * Reference: Apollo Hospitals (apollohospitals.com)
 * Stack: Next.js 14 App Router · TypeScript strict · CSS Modules
 *
 * DESIGN RULES (violations = build failure):
 * 1. Buttons: border-radius 8px — NO 4px, NO 6px, NO 9999px
 * 2. Cards: border-radius 12px + box-shadow
 * 3. Doctor photos: border-radius 50% (circular)
 * 4. Gold (#FDB931) NEVER as text on white — contrast fails (1.9:1)
 * 5. "Emergency: 1066" in red (#DC2626) always in nav
 * 6. Every DoctorCard: consultFee shown + dual CTAs (Book + Video)
 * 7. NABH + JCI badges both present in WhyUs section
 * 8. No dark section backgrounds (footer: #1B6A85 only)
 * 9. No hex in *.module.css — var(--color-*) only
 * 10. Font: Nunito Sans only — no serif
 */

// src/types/index.ts

export type City =
  | 'chennai' | 'hyderabad' | 'bangalore' | 'delhi' | 'mumbai' | 'pune' | 'kolkata'

export type Specialty =
  | 'cardiology' | 'oncology' | 'neurology' | 'orthopedics'
  | 'gastroenterology' | 'nephrology' | 'pulmonology' | 'dermatology'
  | 'pediatrics' | 'gynecology' | 'ophthalmology' | 'ent'

export interface Doctor {
  id: string
  name: string            // "Dr. Ramesh Kumar"
  title: string           // "Senior Consultant — Cardiology"
  qualifications: string  // "MBBS, MD, DM (Cardiology)"
  specialty: Specialty
  experience: number      // 25 — rendered as "25+ Years Experience"
  hospital: string        // "Apollo Hospitals, Chennai"
  city: City
  rating: number          // 4.8
  reviewCount: number     // 2341
  consultFee: number      // 800 — rendered as "₹800 Consult Fee"
  videoConsult: boolean   // true → "Video Consult" CTA shown
  photo: string           // "/imgs/doctors/ramesh-kumar.jpg"
}

export interface SpecialtyCard {
  id: Specialty
  label: string           // "Cardiology"
  icon: string            // Lucide icon name
  doctorCount: number     // 142
}

export interface HealthPackage {
  id: string
  name: string            // "Comprehensive Health Checkup"
  originalPrice: number   // 3500
  discountedPrice: number // 2499
  testCount: number       // 68
  popular: boolean
  features: string[]
}

export interface Stat {
  value: string           // "5,000+"
  label: string           // "Specialist Doctors"
  icon: string            // Lucide icon name
}

// BOOKING WIDGET — 'use client' (BookingWidget.tsx)
// State: selectedCity (City|''), selectedSpecialty (Specialty|'')
// On submit: scrolls to DoctorDirectory and sets its filters via URL params or context
// Renders: white card, 12px radius, shadow; city select + specialty select + teal button (8px)

// DOCTOR DIRECTORY — 'use client' (DoctorDirectory.tsx)
// State: city (City|'all'), specialty (Specialty|'all'), query (string)
// Filtered: useMemo — filters doctors by all 3 criteria simultaneously
// ARIA: live region announces "Showing X doctors" on filter change

// ACCEPTANCE CHECKLIST:
// □ tsc --noEmit exits 0
// □ npm run build exits 0
// □ grep "#" src/**/*.module.css returns empty
// □ Every button computed border-radius = 8px
// □ Doctor photo computed border-radius = 50%
// □ "Emergency: 1066" visible in red in nav at all scroll positions
// □ All DoctorCards show consultFee
// □ All DoctorCards show at least "Book Appointment" CTA (+ Video if videoConsult:true)
// □ NABH and JCI both in WhyUs section
// □ Gold never appears as text on white background
// □ Lighthouse Performance >= 90, Accessibility >= 90
```
