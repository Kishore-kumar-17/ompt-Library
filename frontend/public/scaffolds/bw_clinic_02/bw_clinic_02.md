# bw_clinic_02 — Doctor Discovery + Booking Platform
## Inspiration: Practo · practo.com

---

## Design Identity

**Background:** White `#FFFFFF` + light gray `#F0F0F5` for surface sections
**Primary:** Cyan `#14BEF0` — primary CTAs, links, active states, search button
**Dark:** Navy `#28328C` — footer bg, section headings, verified badge
**Success:** Green `#30AC4A` — "Available Today" indicator, availability tags
**Button radius:** `4px` — flat/sharp, digital-product precision
**Card radius:** `4px` — consistent with buttons; flat design language
**Pill radius:** `20px` — search suggestion chips, specialty tags only
**Font:** Lato (400/700) — clean, neutral healthcare sans-serif
**Tone:** Consumer-digital, direct, high-density; approachable CTAs ("Period doubts?")

**Defining features:**
- **Two-field omni-search hero** — locality input + keyword (doctor/symptom/clinic) side by side
- **"Available Today" green badge** — per-doctor real-time availability signal
- **Symptom cards** — quick "CONSULT NOW" cards for common conditions
- **Horizontal specialty carousel** — scroll through specialties, not a grid
- **Flat 4px design** — no large shadows, border-based cards
- **ConsultMode per doctor** — clinic | video | both — separate CTAs per mode
- **Verified badge** — navy shield icon on doctor names
- **Discovery cards** — 4 service category tiles (Consult Online, Clinic Visit, Lab Tests, Surgeries)

---

## How This Differs From bw_clinic_01 (Apollo)

| Dimension | **bw_clinic_01 Apollo** | **bw_clinic_02 Practo** |
|-----------|------------------------|------------------------|
| Primary color | Teal `#2582A1` (muted) | **Cyan `#14BEF0` (bright)** |
| Accent | Gold `#FDB931` | **Navy `#28328C`** |
| Availability signal | None | **"Available Today" green badge** |
| Hero element | Booking widget (dropdowns) | **Omni-search (locality + keyword text inputs)** |
| Doctor photos | Circular `50%` | **Rounded rectangle `4px`** |
| Search UX | Preset dropdown options | **Free-text search (location-aware)** |
| Button radius | 8px | **4px** |
| Card radius | 12px + shadow | **4px, border-only (flat)** |
| Card style | White + shadow | **White + `1px solid #DFDFE5` border** |
| Font | Nunito Sans | **Lato** |
| Specialty display | 12-card static grid | **Horizontal scroll carousel** |
| Unique section | SpecialtyGrid, WhyUs | **SymptomCards, DiscoveryCards, SpecialtyCarousel** |
| Emergency link | "Emergency: 1066" red | **None (booking platform, not hospital)** |
| Accreditation | NABH + JCI | **"Verified by Practo" badge per doctor** |
| ConsultMode | videoConsult boolean | **`'clinic' | 'video' | 'both'` per doctor** |

---

## Color System

```css
--color-cyan:    #14BEF0;   /* Primary CTAs, links, search button, active states */
--color-navy:    #28328C;   /* Footer bg, section headings, verified badge */
--color-green:   #30AC4A;   /* "Available Today" badge, availability dot */
--color-surface: #F0F0F5;   /* Alternate section backgrounds, card tints */
--color-text:    #414146;   /* Primary body text */
--color-muted:   #787887;   /* Secondary text, captions, placeholders */
--color-border:  #DFDFE5;   /* Card borders, dividers, input borders */
--color-white:   #FFFFFF;   /* Primary page and card backgrounds */
```

**Contrast audit:**
- `#414146` on white = 9.7:1 ✓ (AAA)
- `#787887` on white = 4.6:1 ✓ (AA)
- White on `#14BEF0` (cyan buttons) = 1.8:1 ✗ — **use dark text on cyan, not white**
- `#28328C` (navy) on cyan = high contrast ✓
- White on `#28328C` (navy) = 9.3:1 ✓ (AAA)

**Critical: cyan `#14BEF0` is too light for white text. All cyan buttons use `color: var(--color-navy)` or `color: var(--color-text)` — never white.**

---

## Base Prompt

**Role:** Senior product designer specialising in Indian doctor discovery and booking platforms, flat digital-product UX, and multi-mode consult flow design.

**Application Overview:** A Practo-style Indian doctor discovery and booking homepage built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). Two defining UX patterns: a two-field omni-search hero (locality + keyword free-text) and `ConsultMode` per doctor (`'clinic' | 'video' | 'both'`) driving separate CTAs. Font: Lato 400/700 only via `next/font/google`. No Tailwind, no weights 500/600/800.

**Brand Voice & Mood:** Consumer-digital, direct, high-density — cyan `#14BEF0` is energetic and action-forward; navy `#28328C` anchors authority. The design language is flat: `4px` border-radius everywhere (buttons, cards, everything), border-only cards (no shadows), and conversational symptom card labels ("Period doubts?", "Child not eating"). This is a booking platform, not a hospital — no emergency link, no NABH/JCI badges.

**Core Features:**
1. **StickyNav** (server) — white bg 74px, cyan logo, center links (Find Doctors, Video Consult, Surgeries, Medicines), right: "For Doctors" muted link + "Login" button (cyan outline, 4px radius)
2. **HeroSection** with **OmniSearch** (`'use client'`) — white bg, `min-height: 60vh`, navy H1 (Lato 700); two-field search bar: left = "📍 Enter locality..." + right = "🔍 Doctors, clinics, symptoms..." + cyan "Search" button (4px radius); stats below: "20M+ Patients | 100K+ Doctors | 200K+ Clinics"
3. **DiscoveryCards** (server) — 4 colored tiles in a row (Consult Online / Clinic Visit / Lab Tests / Surgeries); `border-radius: 4px`
4. **SymptomCards** (server) — 8 cards with emoji/icon + conversational condition label + "CONSULT NOW" cyan CTA; flat `border-radius: 4px` cards with `border: 1px solid var(--color-border)`
5. **SpecialtyCarousel** (`'use client'`) — horizontal scroll row of specialty chips with left/right arrow navigation; each chip: white card, `border-radius: 4px`, icon + name + doctor count
6. **DoctorCards** (`'use client'`) — city input + specialty select filter; `useMemo`; ARIA live region; 3-col `DoctorCard` grid
7. **DoctorCard** (server) — rectangular photo `border-radius: 4px`; "Verified by Practo" navy badge; `availableToday` green badge; name (Lato 700); specialty; experience; consultation fee; `consultMode`-driven CTAs: `'clinic'` → "Book Clinic Visit" only; `'video'` → "Consult Online" only; `'both'` → both buttons
8. **Footer** (server) — navy bg, 4 columns

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-cyan: #14BEF0`, `--color-navy: #28328C`, `--color-green: #30AC4A`, `--color-surface: #F0F0F5`, `--color-text: #414146`, `--color-muted: #787887`, `--color-border: #DFDFE5`, `--color-white: #FFFFFF`
- **CRITICAL contrast trap:** White on cyan `#14BEF0` = 1.8:1 — FAILS WCAG. All cyan buttons/CTAs must use `color: var(--color-navy)` (navy on cyan = high contrast ✓). NEVER white text on cyan.
- **Flat design language:** `4px` for ALL buttons and ALL cards — no shadows on cards (border-only). `20px` ONLY for specialty/symptom pill chips.
- **"Available Today" badge:** `color: var(--color-green)` on white card — never white on green background
- **Zero hex in `.module.css`** — CSS custom properties only; exception: `rgba()` in the OmniSearch widget shadow

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # ConsultMode, Doctor, Specialty, SymptomCard, DiscoveryTile
  lib/
    data.ts            # 8+ doctors, 12 specialties, 8 symptoms, 4 discovery tiles
    filterDoctors.ts   # filterDoctors(doctors, city, specialty)
  components/
    layout/StickyNav/ Footer/
    home/
      HeroSection/          # contains OmniSearch
      OmniSearch/           # 'use client' — two-field search
      DiscoveryCards/       # server, 4 tiles
      SymptomCards/         # server, 8 condition cards
      SpecialtyCarousel/    # 'use client' — horizontal scroll + arrows
      DoctorCards/          # 'use client', filter + useMemo
      DoctorCard/           # server, consultMode-driven CTAs
    ui/
      Button/               # primary (cyan bg, navy text), outline (cyan border, cyan text)
      AvailableBadge/       # green text on white — never white on green
      VerifiedBadge/        # navy shield
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `ConsultMode = 'clinic' | 'video' | 'both'`
- DoctorCard CTA logic: `consultMode === 'clinic'` → "Book Clinic Visit" button only; `consultMode === 'video'` → "Consult Online" button only; `consultMode === 'both'` → both buttons
- `filterDoctors(doctors, city, specialty)` — applied simultaneously via `useMemo`
- Lato: `weight: ['400', '700']` only — no 500, no 600, no 800

**Implementation Steps:**
1. Scaffold, install `lucide-react`, `framer-motion`
2. Define `ConsultMode` and `Doctor` types (ensure `consultMode` field is `ConsultMode`, not boolean)
3. Write `globals.css` with 8 tokens; `layout.tsx` with Lato `weight: ['400', '700']`
4. Build `Button` first — verify `primary` uses `color: var(--color-navy)` on cyan bg (NEVER white)
5. Build `DoctorCard` — test all 3 `consultMode` values, `availableToday` badge pattern
6. Build `OmniSearch` (`'use client'`) — two-field, cyan submit button with dark text
7. Build `SpecialtyCarousel` (`'use client'`) — horizontal scroll with arrow buttons
8. Build `DoctorCards` (`'use client'`) — 2-way filter with useMemo
9. Build remaining server sections; verify no shadows on any card except OmniSearch widget
10. `tsc --noEmit` and `npm run build`

**User Experience:**
- Two-field search (locality + keyword) mirrors actual Practo UX — location-aware healthcare search
- "Available Today" green badge creates urgency and surfaces availability as primary sort signal
- Symptom cards use conversational labels ("Period doubts?") — lowers barrier for healthcare searches
- ConsultMode drives CTAs at card level — no need for a separate booking flow modal
- Flat 4px design signals digital product precision vs the warmer 8–12px radius of bw_clinic_01

**Constraints:**
- Cyan button text: ALWAYS `color: var(--color-navy)` — NEVER white on cyan (1.8:1 fails WCAG)
- Doctor photos: `border-radius: 4px` rectangular — NEVER `50%` circular (that's Apollo's pattern)
- Card radius: `4px` everywhere — border-only, no shadows on cards
- Pill radius: `20px` ONLY for specialty/symptom chips — nothing else
- `ConsultMode` is `'clinic' | 'video' | 'both'` — NOT a boolean `videoConsult: boolean`
- "Available Today" badge: green text on white — NEVER white on green background
- No emergency link in nav (booking platform, not hospital)
- No NABH/JCI badges — use "Verified by Practo" navy badge instead
- Lato 400/700 only — no other weights, no other fonts
- `page.tsx` must be a Server Component
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Version 1 — Lovable

Build a Practo-style Indian doctor discovery and booking homepage using React, TypeScript, and CSS Modules. White background with cyan `#14BEF0` as the primary accent and navy `#28328C` as the dark anchor.

**Color system — 8 tokens:**
```css
--color-cyan: #14BEF0; --color-navy: #28328C; --color-green: #30AC4A;
--color-surface: #F0F0F5; --color-text: #414146; --color-muted: #787887;
--color-border: #DFDFE5; --color-white: #FFFFFF;
```
No hex in `.module.css` files.

**Critical contrast rule:** `#14BEF0` is too light for white text (1.8:1 — fails WCAG). Cyan buttons and CTAs use `color: var(--color-navy)` — dark text on light cyan.

**Typography:** Lato via Google Fonts, weights 400 and 700. No serif anywhere.

**Radius vocabulary:** `4px` buttons and cards. `20px` specialty/symptom pill chips. No `9999px` pills elsewhere.

**StickyNav:** White, 74px. Logo "Practo" left. Center: Find Doctors, Video Consult, Surgeries, Medicines. Right: "For Doctors" link (muted) + "Login" button (cyan outline, 4px radius). Inline search icon. `border-bottom: 1px solid var(--color-border)`.

**Hero (omni-search):**
- White bg, `min-height: 60vh`
- H1: Lato 700, navy, `clamp(2rem, 4vw, 3rem)`
- Subheading: muted Lato 400
- **OmniSearch bar** — two-field row:
  - Left: `📍 [Enter locality...]` — location input with pin icon
  - Right: `🔍 [Doctors, clinics, hospitals, symptoms...]` — keyword input
  - Submit: `[Search]` cyan button, `border-radius: 4px`
  - Combined card: white, `border-radius: 4px`, `box-shadow: 0 4px 8px rgba(0,0,0,0.12)`
- Stats below: "20M+ Patients | 100K+ Doctors | 200K+ Clinics"

**DiscoveryCards:** 4 colored tiles in a 2×2 or 4-column row. Each: colored bg (from surface palette), title, description, "→ CTA" link. `border-radius: 4px`.

**SymptomCards:** 8 cards with emoji/icon + condition label + "CONSULT NOW" cyan CTA. Cards: white, `border-radius: 4px`, `border: 1px solid var(--color-border)`. Labels: conversational ("Period doubts", "Child not eating").

**SpecialtyCarousel:** Horizontal scroll row of specialty chips. Each chip: white card, `border-radius: 4px`, specialty icon, name, doctor count. Arrow left/right navigation.

**DoctorCards grid (`'use client'`):**
- Filter bar: city input + specialty select
- 3-col grid. Each DoctorCard:
  - Small photo: `border-radius: 4px`, NOT circular
  - Name + navy verified shield icon
  - Specialty + qualifications (muted)
  - "X+ Years Experience"
  - Locality, City
  - ⭐ rating + review count
  - "₹X Consultation Fee"
  - **"Available Today"** green badge (if `availableToday: true`)
  - CTAs vary by `consultMode`:
    - `'clinic'`: "Book Clinic Visit" (cyan, 4px)
    - `'video'`: "Consult Online" (cyan, 4px)
    - `'both'`: both buttons side by side

**Footer:** Navy `#28328C` bg. 4+ columns. White text. Link hover: cyan.

CSS Modules only. No Tailwind. `tsc --noEmit` clean. `npm run build` static export.

---

### Version 2 — ChatGPT Canvas

```
Project: Practo-style doctor discovery homepage
Stack: Next.js 14 App Router, TypeScript strict, CSS Modules
Inspiration: practo.com

COLORS (8 tokens — no hex in .module.css):
  --color-cyan:    #14BEF0   primary CTAs, search button, active states
  --color-navy:    #28328C   footer bg, headings, verified badge
  --color-green:   #30AC4A   "Available Today" badge, availability dot
  --color-surface: #F0F0F5   section tints, discovery card backgrounds
  --color-text:    #414146   primary body text
  --color-muted:   #787887   captions, secondary text
  --color-border:  #DFDFE5   card borders, input borders, dividers
  --color-white:   #FFFFFF   page and card backgrounds

CRITICAL CONTRAST RULE:
  Cyan #14BEF0 on white = 1.8:1 — FAILS WCAG
  ALL cyan buttons use: color: var(--color-navy) [NOT white]

FONT: Lato 400 + 700 via next/font/google. No serif.

RADIUS:
  Buttons: 4px
  Cards:   4px
  Pill chips (specialty tags, symptom chips): 20px
  NEVER 9999px on buttons or cards

SECTIONS:
1. StickyNav — white, 74px, border-bottom, two CTA buttons at right
2. Hero — white, H1 navy, OmniSearch (locality + keyword), stats row
3. DiscoveryCards — 4 colored service tiles, F0F0F5 bg
4. SymptomCards — 8 quick-consult cards, condition labels, "CONSULT NOW"
5. SpecialtyCarousel — horizontal scroll, specialty chips
6. DoctorGrid — 'use client', filter bar, doctor cards
7. Testimonials — patient quotes, no user photos
8. AppDownload — illustration + store badges
9. Footer — navy bg, 4 columns, cyan link hover

DOCTOR CARD SPECIFICS:
  - Photo: border-radius: 4px (NOT circular — Practo uses rounded rectangle)
  - Verified badge: navy shield icon next to name
  - "Available Today" green badge: only if availableToday: true
  - ConsultMode drives CTAs:
      'clinic' → "Book Clinic Visit" (cyan, 4px)
      'video'  → "Consult Online" (cyan, 4px)
      'both'   → both buttons side by side
  - Rating: ⭐ + number + (count reviews)
  - Fee: "₹X Consultation Fee"

TYPES:
  type ConsultMode = 'clinic' | 'video' | 'both'
  interface Doctor {
    id, name, specialty, qualifications, experience,
    locality, city, rating, reviewCount, consultFee,
    availableToday: boolean, consultMode: ConsultMode,
    photo, verified: boolean
  }

ANTI-PATTERNS:
  No circular doctor photos (Apollo pattern)
  No white text on cyan (contrast failure)
  No 8px or 12px button/card radius (Apollo pattern)
  No dropdown booking widget (Apollo pattern)
  No "Emergency: 1066" nav link (hospital pattern, not booking platform)
  No NABH/JCI badges (booking platform — individual doctor "verified" badges instead)
  No gold accent color
  No serif font

OUTPUT: Static Next.js. tsc clean. npm run build succeeds.
```

---

### Version 3 — Bolt.new

Design a Practo-inspired doctor discovery and appointment booking homepage.

**Visual identity:**
Cyan `#14BEF0` for all primary actions. Navy `#28328C` for footer and headings. Green `#30AC4A` for availability. Light gray `#F0F0F5` for section tints. Lato typeface, 400 and 700 only. **`4px` radius everywhere** — flat, digital-product feel. `20px` for specialty/symptom pill chips only. No rounded corners beyond `4px` on interactive elements.

**Critical:** Cyan `#14BEF0` on white = 1.8:1 — fails WCAG. All cyan buttons use navy or dark text, not white.

**Nav:** White, 74px, bottom border. Logo left. Find Doctors / Video Consult / Surgeries center. "For Doctors" + "Login" right. Login: cyan outline, 4px radius.

**Hero:**
- White bg, `min-height: 60vh`
- H1: Lato 700, `#28328C`, `clamp(2rem, 4vw, 3rem)` — "Your home for health"
- Subheading: muted grey Lato 400
- **OmniSearch** (the hero centerpiece):
```
┌──────────────────────────────────────────────────────────────────────┐
│ 📍 Enter your locality         │ 🔍 Search doctors, symptoms...  [Search] │
└──────────────────────────────────────────────────────────────────────┘
```
White card, `border-radius: 4px`, `box-shadow: 0 4px 8px rgba(0,0,0,0.12)`. Two inputs + cyan submit button.
- Trusted stats below: "20M+ Patients | 100K+ Doctors | 200K+ Clinics"

**DiscoveryCards (F0F0F5 bg):**
4 tiles side by side. Each: colored bg, title ("Consult Doctors Online"), description, arrow CTA link. `border-radius: 4px`.

**SymptomCards:**
8 cards. Each: condition icon/emoji + label ("Period doubts", "Child not eating", "Anxiety", "Skin rash", "Dental pain", "Eye infection", "Cold & Flu", "Back pain") + "CONSULT NOW" cyan text link. White card, 4px radius, border.

**SpecialtyCarousel (`'use client'`):**
Horizontally scrollable row of specialty cards. `useState` for scroll position. Left/right arrow buttons. Each chip: white, 4px radius, icon + specialty name + "X Doctors".

**DoctorGrid (`'use client'`):**
Filter bar: location text input + specialty `<select>`. 3-column grid. DoctorCard:
- Photo: 80×80px, `border-radius: 4px`
- Name + verified navy shield
- Specialty + qualifications (muted)
- "X+ Years Experience"
- Locality · City
- ⭐ 4.8 (1,234 reviews)
- Green "Available Today" badge (conditional)
- "₹X Consultation Fee"
- CTAs by `consultMode`: clinic / video / both

**Footer:** Navy `#28328C`. 4+ columns. Cyan link hover.

CSS Modules. `tsc --noEmit` clean. Static export. Lighthouse ≥90/90.

---

### Version 4 — v0

Build a Practo-inspired Indian doctor booking homepage named "MedFind".

**Design constraints:**
- All buttons and cards: `border-radius: 4px` — not 6px, not 8px
- Specialty/symptom pill chips: `border-radius: 20px` — only these
- Cyan `#14BEF0` buttons: `color: var(--color-navy)` — never white (1.8:1 contrast fail)
- Font: Lato 400 + 700 only — no serif, no other weights
- No circular photos on doctor cards — `border-radius: 4px` on images

**TypeScript interfaces:**

```typescript
export type ConsultMode = 'clinic' | 'video' | 'both'

export interface Doctor {
  id: string
  name: string
  specialty: string
  qualifications: string    // "BDS, MDS (Orthodontics)"
  experience: number        // 12 → "12+ Years"
  locality: string          // "Koramangala"
  city: string              // "Bangalore"
  rating: number            // 4.8
  reviewCount: number       // 1234
  consultFee: number        // 500
  availableToday: boolean
  consultMode: ConsultMode
  photo: string
  verified: boolean
}

export interface SymptomCard {
  id: string
  label: string             // "Period doubts"
  emoji: string             // "🩺"
}

export interface SpecialtyChip {
  id: string
  label: string             // "Dentist"
  icon: string              // lucide icon name
  doctorCount: number
}

export interface DiscoveryCard {
  id: string
  title: string
  description: string
  bgToken: 'surface' | string  // maps to a section bg color
  href: string
}
```

**OmniSearch (`'use client'`):**
```typescript
const [locality, setLocality] = useState('')
const [keyword, setKeyword] = useState('')
// On submit: smooth scroll to #doctor-grid, set filter state via context/URL
```

**DoctorGrid (`'use client'`):**
```typescript
const [cityFilter, setCityFilter] = useState('')
const [specialtyFilter, setSpecialtyFilter] = useState('')
const filtered = useMemo(() =>
  doctors.filter(d =>
    d.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
    (specialtyFilter === '' || d.specialty === specialtyFilter)
  ), [cityFilter, specialtyFilter])
```

**DoctorCard CTA pattern:**
```tsx
{doctor.consultMode === 'clinic' || doctor.consultMode === 'both' ? (
  <Button variant="primary">Book Clinic Visit</Button>
) : null}
{doctor.consultMode === 'video' || doctor.consultMode === 'both' ? (
  <Button variant="secondary">Consult Online</Button>
) : null}
```

CSS Modules. Zero hex in modules. `tsc --noEmit` clean. Static export.

---

### Version 5 — Claude Artifacts

Build `bw_clinic_02` — a Practo-style doctor discovery and booking homepage. Read `bw_clinic_platform_02_scaffold/` before writing any file.

**Core identity:**
- Cyan `#14BEF0` primary — never with white text (1.8:1 fail); use `--color-navy` text on cyan
- Flat `4px` radius for all buttons and cards; `20px` for pill chips only
- Lato font (400/700) — loaded via `next/font/google`
- Hero is an omni-search bar (two text inputs + submit), not a dropdown widget
- Doctor photos are `border-radius: 4px` rounded rectangles, NOT circular

**File structure:**
```
src/
  types/index.ts         — ConsultMode, Doctor, SymptomCard, SpecialtyChip, DiscoveryCard
  lib/data.ts            — 8 doctors, 8 symptoms, 10 specialties, 4 discovery cards
  app/
    layout.tsx           — Lato font, globals.css
    page.tsx             — section assembly
    globals.css          — 8 color tokens
  components/
    layout/
      StickyNav.tsx      — server, white, "Login" cyan outline CTA
      Footer.tsx         — navy bg, cyan link hover
    home/
      Hero.tsx           — OmniSearch widget + stats (server wraps OmniSearch client)
      OmniSearch.tsx     — 'use client', locality + keyword inputs
      DiscoveryCards.tsx — server, 4 service tiles
      SymptomCards.tsx   — server, 8 quick-consult cards
      SpecialtyCarousel.tsx — 'use client', horizontal scroll + arrows
      DoctorGrid.tsx     — 'use client', filter + useMemo + DoctorCard grid
      DoctorCard.tsx     — server component, consultMode CTAs
    ui/
      Button.tsx         — variant: primary|secondary|outline, radius ALWAYS 4px
      AvailabilityBadge.tsx — green "Available Today" chip, 20px radius
      VerifiedBadge.tsx  — navy shield icon
```

**Critical rules:**
1. `border-radius: 4px` on ALL buttons and cards — no exceptions
2. `border-radius: 20px` on pill chips (AvailabilityBadge, specialty chips, symptom tags) ONLY
3. Cyan buttons: `color: var(--color-navy)` — never `color: var(--color-white)`
4. Doctor photos: `border-radius: 4px` — NOT `50%`
5. `OmniSearch` and `DoctorGrid` and `SpecialtyCarousel` are `'use client'`
6. `DoctorCard` is a server component
7. CTA buttons depend on `doctor.consultMode` — render conditionally, not with CSS hide
8. "Available Today" badge: only if `doctor.availableToday === true`
9. Zero hex in any `.module.css` file
10. `tsc --noEmit` clean, `npm run build` succeeds

---

### Version 6 — Grok

```markdown
# Task: Build bw_clinic_02 — Doctor Discovery + Booking Homepage

## Context
Practo-inspired Indian doctor discovery platform. Consumer-facing, high-density,
flat design. Key differentiator from bw_clinic_01 (Apollo Hospitals):
- Hero = omni-search bar, not a booking widget with dropdowns
- Doctor photos = 4px rounded rectangles, NOT circular (50%)
- Flat design = 4px radius everywhere, border-only cards (no large shadows)
- ConsultMode per doctor = clinic | video | both (drives CTA rendering)
- "Available Today" green badge = per-doctor availability signal
- No NABH/JCI — individual doctor "verified" badges instead

## Stack
Next.js 14 App Router · TypeScript strict · CSS Modules · Lucide React

## Design Tokens (8 tokens, no hex in .module.css)
--color-cyan:    #14BEF0   NEVER with white text (1.8:1 contrast — fails WCAG)
--color-navy:    #28328C   footer bg, headings, verified badge, text-on-cyan
--color-green:   #30AC4A   availability badge, available dot
--color-surface: #F0F0F5   section tints, discovery card bg
--color-text:    #414146   body text
--color-muted:   #787887   secondary text
--color-border:  #DFDFE5   card borders, input borders
--color-white:   #FFFFFF   page and card backgrounds

## Radius System
Buttons + cards: 4px (all interactive UI)
Pill chips only: 20px (AvailabilityBadge, specialty chips, symptom tags)
Prohibited: 9999px anywhere; 8px/12px on buttons (Apollo patterns)

## Component Contracts

### Button
variant: 'primary' | 'secondary' | 'outline'
primary: cyan bg, navy text (not white), 4px radius
secondary: navy bg, white text, 4px radius
outline: cyan border, cyan text, transparent bg, 4px radius
RADIUS: 4px — hardcoded

### DoctorCard (server component)
photo: border-radius 4px, NOT 50%
verified: true → VerifiedBadge (navy shield) next to name
availableToday: true → AvailabilityBadge ("Available Today", green, 20px radius)
consultMode: 'clinic' → "Book Clinic Visit" primary button
consultMode: 'video'  → "Consult Online" primary button
consultMode: 'both'   → both buttons, stacked

### OmniSearch ('use client')
Two inputs side by side: locality (with pin icon) + keyword (with search icon)
Submit: cyan button, 4px radius, navy text
On submit: scroll to #doctor-grid

### SpecialtyCarousel ('use client')
useState for scroll offset
Left/right arrow buttons to scroll carousel container
Each chip: white card, 4px radius, border, icon + label + count

## Acceptance Criteria
- [ ] tsc --noEmit exits 0
- [ ] npm run build exits 0
- [ ] No hex in *.module.css
- [ ] button border-radius = 4px (not 8px, not 20px)
- [ ] AvailabilityBadge border-radius = 20px
- [ ] Doctor photos border-radius = 4px (NOT 50%)
- [ ] Cyan buttons have navy text (not white)
- [ ] "Available Today" badge absent for availableToday:false doctors
- [ ] DoctorCard renders 1 or 2 CTAs based on consultMode
- [ ] Lighthouse >= 90/90
```

---

### Version 7 — Gemini

Design brief for a doctor discovery and appointment booking homepage, inspired by Practo.

**Brand:** MedFind — "Find the right doctor, right now." India's largest doctor discovery platform.

**Visual system:**
White primary background. Cyan `#14BEF0` for all active states, primary CTAs, and search buttons — but never with white text (fails WCAG at 1.8:1; use navy text on cyan). Navy `#28328C` for footer, section headings, and verified badges. Green `#30AC4A` for "Available Today" indicators. Lato typeface, 400 and 700 only. `4px` radius on all buttons and cards — flat, digital-product precision. `20px` radius on pill chips (specialty tags, availability badge) only.

**Homepage sections:**

1. **Nav** — sticky, white, 74px, `border-bottom: 1px solid var(--color-border)`. Logo left. Find Doctors / Video Consult / Surgeries center. "For Doctors" + "Login" right. Login: cyan outline, navy text, 4px radius.

2. **Hero** — white, `min-height: 60vh`. H1: Lato 700, navy, `clamp(2rem, 4vw, 3rem)`. Subheading: muted. OmniSearch card (white, 4px radius, shadow): locality input + keyword input + "Search" cyan button (navy text). Stats row: "20M+ Patients | 100K+ Doctors | 200K+ Clinics".

3. **DiscoveryCards** — `#F0F0F5` bg. 4 colored tiles: "Consult Doctors Online", "Find Doctors Near You", "Book Lab Tests", "Surgeries". Each: 4px radius, description, arrow link.

4. **SymptomCards** — white bg. 8 cards with condition emoji/icon + label + "CONSULT NOW" cyan link. White card, 4px radius, `border: 1px solid var(--color-border)`.

5. **SpecialtyCarousel** — `'use client'`. Horizontal scroll with left/right arrow buttons. Specialty chips: white, 4px radius, icon + name + "X Doctors".

6. **DoctorGrid** — `'use client'`. City input + specialty select filter. 3-col card grid. DoctorCard: photo (4px radius, NOT circular), name + verified shield, specialty + qualifications, "X+ Years", locality + city, ⭐ rating + reviews, "Available Today" green badge (conditional), "₹X Consult Fee", CTA buttons by `consultMode`.

7. **Testimonials** — `#F0F0F5` bg. 3 text-only quote cards (no user photos). Patient name + treatment type.

8. **Footer** — `#28328C` navy. 4 columns. Cyan hover on links.

**Anti-patterns:** No circular photos. No white text on cyan. No 8px/12px radius. No dropdown booking widget in hero. No NABH/JCI (booking platform, not hospital). No gold accent. No serif.

TypeScript strict. CSS Modules. Static export. Lighthouse ≥90/90.

---

### Version 8 — Cursor

```typescript
/*
 * bw_clinic_02 — Doctor Discovery + Booking Homepage
 * Reference: Practo (practo.com)
 * Stack: Next.js 14 App Router · TypeScript strict · CSS Modules
 *
 * DESIGN RULES (violations = build failure):
 * 1. ALL buttons + cards: border-radius 4px — NO 8px, NO 12px
 * 2. PILL chips only: border-radius 20px (AvailabilityBadge, specialty chips)
 * 3. Cyan (#14BEF0) buttons: color var(--color-navy) — NEVER white (1.8:1 fail)
 * 4. Doctor photos: border-radius 4px — NOT 50% (that's Apollo, not Practo)
 * 5. consultMode drives CTAs: render conditionally, not CSS hidden
 * 6. availableToday: false → NO green badge rendered (not hidden)
 * 7. No circular element except the availability dot (6px circle)
 * 8. No hex in *.module.css — var(--color-*) only
 * 9. Font: Lato only — no Nunito, no Plus Jakarta, no serif
 * 10. Hero = OmniSearch (two text inputs) — NOT dropdown widgets
 */

// src/types/index.ts

export type ConsultMode = 'clinic' | 'video' | 'both'

export interface Doctor {
  id: string
  name: string
  specialty: string
  qualifications: string    // "BDS, MDS (Orthodontics)"
  experience: number        // 12 → "12+ Years Experience"
  locality: string          // "Koramangala"
  city: string              // "Bangalore"
  rating: number            // 4.8
  reviewCount: number       // 1234
  consultFee: number        // 500 → "₹500"
  availableToday: boolean
  consultMode: ConsultMode
  photo: string
  verified: boolean         // true → VerifiedBadge next to name
}

export interface SymptomCard {
  id: string
  label: string             // "Period doubts"
  emoji: string             // "🩺"
}

export interface SpecialtyChip {
  id: string
  label: string
  icon: string              // Lucide icon name
  doctorCount: number
}

export interface DiscoveryCard {
  id: string
  title: string
  description: string
  href: string
}

// CTA rendering (DoctorCard.tsx):
// const showClinic = doctor.consultMode === 'clinic' || doctor.consultMode === 'both'
// const showVideo  = doctor.consultMode === 'video'  || doctor.consultMode === 'both'

// ACCEPTANCE CHECKLIST:
// □ tsc --noEmit exits 0
// □ npm run build exits 0
// □ grep "#" src/**/*.module.css returns empty
// □ All button computed border-radius = 4px
// □ AvailabilityBadge border-radius = 20px
// □ Doctor photos border-radius = 4px (not 50%)
// □ Cyan buttons have color = #28328C (navy), not white
// □ availableToday:false doctors have no green badge in DOM
// □ 'clinic' only doctors: 1 CTA shown
// □ 'both' doctors: 2 CTAs shown
// □ OmniSearch has 2 text inputs (not dropdowns)
// □ Lighthouse Performance >= 90, Accessibility >= 90
```
