# bw_clinic_04 — Modern Indian Diagnostic Marketplace
## Inspiration: Cult.fit Care (cult.fit/care)
## Theme: Dark-first, package-based diagnostics, Aurora glassmorphism, bold pink accent

---

## Design Identity

Cult.fit Care is the furthest from a traditional hospital website: no doctor directory, no booking widget, no specialty dropdowns. It sells diagnostic test packages — Full Body Checkup, Senior Wellness, Women's Health — at discounted prices with home sample collection. The visual language is Cult.fit's "Aurora" design system: a dark near-black primary background, a bold pink `#FF316D` accent, Inter typography, and glassmorphism cards with backdrop blur. Strike-through pricing (`<del>`) is the primary selling mechanism.

**Contrast trap:** Pink `#FF316D` on white = 1.8:1 (fails). White on pink `#FF316D` = 3.55:1 (fails for normal text < 18.67px bold). Fix: `color: var(--color-bg)` on all pink buttons — near-black `#15171C` on pink = 5.27:1 ✓.

**Palette:** `#15171C` (bg) · `#1E2130` (surface) · `#FF316D` (pink) · `#FFFFFF` (white) · `#888E9E` (muted) · `#F2F4F8` (light-bg) · `#2E3147` (border) · `#15171C` (dark-text — same as bg, used on pink buttons)

**Typography:** Inter — 400, 600, 700 · Google Fonts · Dark-mode text is white

**Radius:** Buttons `8px` · PackageCards `16px` · Category pills `24px` · Trust cards `12px`

**Shadow/Glassmorphism:** PackageCard: `background: rgba(255,255,255,0.06); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1)` · Hover glow: `box-shadow: 0 8px 32px rgba(255,49,109,0.15)`

**Project name:** VitalCheck

---

## Base Prompt

**Role:** Senior product designer specialising in Indian health diagnostics marketplace UX, dark-first design systems, and package-based e-commerce health platforms.

**Application Overview:** VitalCheck is a modern Indian diagnostic test marketplace built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). It follows the Cult.fit Care "Aurora" pattern — a dark-first design system with bold pink accent, glassmorphism package cards, and strike-through discount pricing as the primary selling mechanism. Font: Inter 400/600/700 via `next/font/google`. No Tailwind. This is NOT a doctor directory and NOT a hospital portal — it sells curated diagnostic test packages.

**Brand Voice & Mood:** Bold and e-commerce-driven — dark `#15171C` backgrounds signal premium health tech; pink `#FF316D` creates urgency for discounted packages. The Aurora glassmorphism cards (`backdrop-filter: blur(12px)`) are the signature visual pattern. Light sections (`#F2F4F8`) in `HowItWorks` and `Testimonials` create deliberate contrast breaks. The voice is confident and consumer-facing — "50% off. 24hr reports. Book now."

**Core Features:**
1. **SiteNav** (server) — dark bg, pink logo "VitalCheck", nav links (white, pink hover), location pill ("📍 Chennai"), "Book Now" CTA (pink bg, dark text, `border-radius: 8px`)
2. **HeroSection** (server) — dark bg + aurora radial-gradient overlay (pink at low opacity), Inter 700 white headline, pink eyebrow, muted subheading, two CTAs (primary + outlineWhite), stats bar: "500+ Tests · 24hr Reports · Home Collection · NABL Certified"
3. **CategoryTabs + PackageGrid** (`'use client'`) — single-category horizontal pill tabs (`border-radius: 24px`; active: pink bg + dark text; inactive: surface bg + white text); `useMemo` filters `HealthPackage[]`; `role="tablist"` / `role="tab"` / `aria-selected` ARIA pattern
4. **PackageCard** (server) — glassmorphism: `background: rgba(255,255,255,0.06); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px`; "POPULAR" pill badge (conditional JSX); strike-through with `<del>` + semantic `aria-label`; pink discounted price; tests count + key tests list; turnaround hours; home collection flag (conditional JSX); "Book Now" button (pink bg, **dark text** `var(--color-dark-text)`)
5. **HowItWorks** (server) — LIGHT bg (`#F2F4F8`), dark text; 3-step layout: Choose Package → Book a Slot → Get Reports; Lucide icons; `border-radius: 12px` step cards
6. **WhyChooseUs** (server) — dark bg, 4 trust cards (`border-radius: 12px`, surface bg, no glassmorphism); Lucide icons in pink; "WHO-Certified", "NABL-Accredited", "24-Hour Reports", "Free Home Collection"
7. **Testimonials** (server) — LIGHT bg, 3 flat cards (`border-radius: 12px`, white bg); quote + patient name + package name + amber star rating
8. **Footer** (server) — dark bg, 4 columns, pink logo, links hover to pink

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-bg: #15171C`, `--color-surface: #1E2130`, `--color-pink: #FF316D`, `--color-white: #FFFFFF`, `--color-muted: #888E9E`, `--color-light-bg: #F2F4F8`, `--color-border: #2E3147`, `--color-dark-text: #15171C`
- **CRITICAL contrast trap:** Pink `#FF316D` with white text = 3.55:1 — FAILS WCAG for normal text. ALL pink buttons/CTAs must use `color: var(--color-dark-text)` (dark #15171C on pink = 5.27:1 ✓). Pink as text on dark bg = 5.27:1 ✓ — acceptable for prices, eyebrow, logo.
- **Dark-first rule:** ALL sections use `--color-bg` or `--color-surface` by default. Only `HowItWorks` and `Testimonials` use `--color-light-bg`. Text in dark sections: `var(--color-white)` or `var(--color-muted)`. Text in light sections: `var(--color-dark-text)`.
- **Glassmorphism** — ONLY in `PackageCard.module.css`: `rgba(255,255,255,0.06)`, `rgba(255,255,255,0.1)`, `rgba(255,49,109,0.15)` hover glow — document as exception with comment
- **Border-radius:** `16px` PackageCard, `12px` WhyChooseUs + Testimonial + HowItWorks cards, `8px` buttons, `24px` category pills, `4px` "POPULAR" badge. NO `border-radius: 50%`.
- **Zero hex in `.module.css`** — CSS custom properties only; exception: `rgba()` in PackageCard glassmorphism (document with comment)

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # ServiceCategory, HealthPackage, ProcessStep, TrustSignal, Testimonial
  lib/
    data.ts            # 8 HealthPackage, processSteps, trustSignals, testimonials
    filterPackages.ts  # filterPackages(packages, category)
    formatINR.ts       # formatINR(n) → '₹1,999' via toLocaleString('en-IN')
  components/
    layout/SiteNav/ Footer/
    home/
      HeroSection/          # server, aurora overlay
      CategoryTabs/         # 'use client', manages active tab + useMemo
      PackageCard/          # server, glassmorphism rgba exception
      HowItWorks/           # server, light bg
      WhyChooseUs/          # server, dark bg, no glassmorphism
      Testimonials/         # server, light bg
    ui/
      Button/               # primary (pink bg, dark text), outlineWhite, outlineLight
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `filterPackages(packages, category)` → if `'all'` return all; else filter by `p.category === category`
- `formatINR(amount: number): string` → `` `₹${amount.toLocaleString('en-IN')}` `` — `formatINR(1999)` → `₹1,999`
- `ServiceCategory = 'full-body' | 'senior' | 'women' | 'cardiac' | 'diabetes' | 'vitamin' | 'organ' | 'immunity'`
- CategoryTabs: single active category at a time; `role="tablist"` / `role="tab"` / `aria-selected` — NOT radio buttons
- Strike-through: `<del>` tag with `aria-label` — NOT `text-decoration: line-through` on a `<span>`
- Prices: `formatINR()` for all package price display — not raw integers in JSX

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define types in `src/types/index.ts`
3. Write `globals.css` with 8 tokens (dark-first: bg, surface, pink, white, muted, light-bg, border, dark-text) + `.sr-only` + `prefers-reduced-motion`
4. `layout.tsx`: Inter with `weight: ['400', '600', '700']`
5. Create 8 `HealthPackage` entries with realistic Indian diagnostic pricing (all ~50% off); include `popular: true` on 2
6. Implement `filterPackages` and `formatINR` utilities
7. Build `Button` first — verify `primary` uses `color: var(--color-dark-text)` before any other work
8. Build `PackageCard` (server) — glassmorphism, `<del>` strike-through, conditional JSX for POPULAR + homeCollection badges
9. Build `CategoryTabs` (`'use client'`) — single-select tabs with useMemo, ARIA tablist pattern
10. Build remaining sections in section order; verify light-bg sections use dark text throughout
11. QA greps, `tsc --noEmit`, `npm run build`

**User Experience:**
- First viewport: dark hero with aurora glow + stats bar — bold consumer health tech aesthetic
- Category tabs sticky below nav — browse by health need (cardiac, diabetes, women's) without scrolling back
- Glassmorphism cards on dark bg — the "Aurora" signature visual pattern that differentiates from clinical white portals
- Strike-through pricing (`₹3,999` → `₹1,999`) is the primary conversion mechanism — visual discount cue
- POPULAR badge on high-value packages guides undecided buyers
- Light sections (HowItWorks, Testimonials) break the all-dark rhythm — intentional contrast

**Constraints:**
- Pink button text: ALWAYS `color: var(--color-dark-text)` — NEVER `var(--color-white)` on pink backgrounds (3.55:1 fails WCAG)
- Strike-through: ALWAYS `<del>` tag with `aria-label` — NEVER CSS `text-decoration` on a non-semantic element
- Glassmorphism rgba: ONLY in `PackageCard.module.css` — all other `.module.css` files must be rgba-free
- No doctor types, no appointment types, no specialty filters, no consultMode — this is a package marketplace
- No `border-radius: 50%` anywhere
- CategoryTabs: single filter — `role="tab"` / `aria-selected` pattern, NOT radio buttons
- `SiteNav`, `PackageCard`, `HowItWorks`, `WhyChooseUs`, `Testimonials`, `Footer`: NO `'use client'`
- `CategoryTabs` (which also renders `PackageGrid`): `'use client'` — this one component manages all filter state
- Inter 400+600+700 — no other font, no other weights
- `page.tsx` must be a Server Component — no `'use client'` on the page file

---

## 1 — Lovable

Build a modern diagnostic marketplace called **VitalCheck** — modelled on Cult.fit Care's dark-first design system. Next.js 14, TypeScript, CSS Modules. No Tailwind.

**Brand palette (8 tokens in globals.css):**
```
--color-bg:       #15171C   dark primary background
--color-surface:  #1E2130   elevated card surface (dark)
--color-pink:     #FF316D   brand accent — headings, CTAs, prices
--color-white:    #FFFFFF   primary text on dark bg
--color-muted:    #888E9E   secondary text, metadata
--color-light-bg: #F2F4F8   light alternating sections
--color-border:   #2E3147   dark dividers, card borders
--color-dark-text:#15171C   text on pink buttons, text in light sections
```

**Font:** Inter (Google Fonts, weights 400 + 600 + 700) via `next/font/google`, `variable: '--font-sans'`.

**Key data types:**
```typescript
type ServiceCategory = 'full-body' | 'senior' | 'women' | 'cardiac' | 'diabetes' | 'vitamin' | 'organ' | 'immunity'

interface HealthPackage {
  id: string; name: string; category: ServiceCategory
  originalPrice: number; discountedPrice: number; discountPercent: number
  testsIncluded: number; turnaroundHours: number
  popular: boolean; homeCollection: boolean
  keyTests: string[]
}

interface ProcessStep { id: string; step: number; title: string; description: string }
interface TrustSignal { id: string; icon: string; title: string; description: string }
interface Testimonial { id: string; quote: string; patientName: string; packageName: string; rating: number }
```

**Sections to build (top to bottom):**

1. `SiteNav` — dark bg (`var(--color-bg)`) · Logo "VitalCheck" in pink · Nav links (Home / Diagnostics / Health Packages / About) · Location pill ("📍 Chennai") · "Book Now" CTA: pink bg, dark text, `border-radius: 8px` · No `'use client'`

2. `HeroSection` — dark bg with aurora gradient overlay (`radial-gradient` from pink at low opacity) · Bold white headline (Inter 700, large clamp) · Pink accent line below eyebrow · Subheading in muted · "Explore Packages" CTA (pink bg, dark text) + "View Tests" (outline white) · Stats row: "500+ Tests · 24hr Reports · Home Collection · NABL Certified"

3. `CategoryTabs` — `'use client'` · Horizontal scrollable pill tabs for `ServiceCategory | 'all'` · Active tab: pink bg, dark text · Inactive: surface bg, white text · All pills `border-radius: 24px` · No scrollbar visible

4. `PackageGrid` — renders filtered `HealthPackage[]` based on active category · Responsive grid 1→2→3 col · `useMemo` filtering

5. `PackageCard` — Glassmorphism: `background: rgba(255,255,255,0.06); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px` · "POPULAR" pill badge if `popular` · Package name (white, bold) · `<del>₹{originalPrice}</del>` strikethrough in muted · `₹{discountedPrice}` in pink, large · `{discountPercent}% off` badge · "{testsIncluded} Tests Included" · Key tests list (3 items, checkmarks) · `{turnaroundHours}hr Reports` · "🏠 Home Collection" if true · "Book Now" button: pink bg, dark text `var(--color-dark-text)`, `border-radius: 8px`, full-width · Hover: `box-shadow: 0 8px 32px rgba(255,49,109,0.15)`

6. `HowItWorks` — light bg (`var(--color-light-bg)`) · H2 in dark text · 3-step horizontal layout: Choose Package → Book a Slot → Get Reports · Numbered steps with Lucide icons · Dark text throughout

7. `WhyChooseUs` — dark bg · 4 trust signal cards: "WHO-Certified Professionals", "NABL-Accredited Labs", "24-Hour Reports", "Free Home Collection" · Lucide icons in pink · Cards: surface bg, `border-radius: 12px`, border · No glassmorphism on these cards

8. `Testimonials` — light bg · 3 cards · Quote + patient name + package booked + star rating · Flat cards, `border-radius: 12px`, light border

9. `Footer` — dark bg (`var(--color-bg)`) · 4 columns · Logo + tagline · Links: pink hover · Copyright

**Critical rules:**
- `SiteNav`, `PackageCard`, `HowItWorks`, `WhyChooseUs`, `Testimonials`, `Footer`: no `'use client'` — server components
- `CategoryTabs` + `PackageGrid`: `'use client'` — filter state
- Pink button text: ALWAYS `color: var(--color-dark-text)` — never white (3.55:1 fails)
- Pink as text on dark bg: OK (5.27:1 ✓) — use for prices, accents, eyebrow
- Glassmorphism rgba ONLY in `PackageCard.module.css` — documented exception
- Strike-through: `<del>` tag, not CSS `text-decoration: line-through` on a `<span>`
- No doctor directory, no specialty dropdown, no consultMode
- `<del>` has `aria-label` or wrapping context for screen readers
- Inter 400+600+700 only

---

## 2 — ChatGPT Canvas

Build VitalCheck — a Cult.fit Care-style Indian diagnostic marketplace. Next.js 14 App Router + TypeScript + CSS Modules.

**Setup:**
```bash
npx create-next-app@latest vitalcheck --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd vitalcheck
npm install framer-motion lucide-react
```

**globals.css — 8 tokens:**
```css
:root {
  --color-bg:        #15171C;
  --color-surface:   #1E2130;
  --color-pink:      #FF316D;
  --color-white:     #FFFFFF;
  --color-muted:     #888E9E;
  --color-light-bg:  #F2F4F8;
  --color-border:    #2E3147;
  --color-dark-text: #15171C;
}
```

**layout.tsx:**
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
})
```

**TypeScript types (src/types/index.ts):**
```typescript
export type ServiceCategory =
  | 'full-body' | 'senior' | 'women' | 'cardiac'
  | 'diabetes' | 'vitamin' | 'organ' | 'immunity'

export interface HealthPackage {
  id: string; name: string; category: ServiceCategory
  originalPrice: number; discountedPrice: number; discountPercent: number
  testsIncluded: number; turnaroundHours: number
  popular: boolean; homeCollection: boolean; keyTests: string[]
}

export interface ProcessStep { id: string; step: number; title: string; description: string }
export interface TrustSignal { id: string; icon: string; title: string; description: string }
export interface Testimonial { id: string; quote: string; patientName: string; packageName: string; rating: number }
```

**Mock data — 8 packages (src/lib/data.ts):**
```typescript
export const packages: HealthPackage[] = [
  {
    id: 'complete-health', name: 'Complete Health Profile', category: 'full-body',
    originalPrice: 3999, discountedPrice: 1999, discountPercent: 50,
    testsIncluded: 80, turnaroundHours: 24, popular: true, homeCollection: true,
    keyTests: ['CBC', 'Lipid Profile', 'Thyroid (T3, T4, TSH)'],
  },
  {
    id: 'senior-wellness', name: 'Senior Wellness Package', category: 'senior',
    originalPrice: 5499, discountedPrice: 2749, discountPercent: 50,
    testsIncluded: 95, turnaroundHours: 24, popular: true, homeCollection: true,
    keyTests: ['Bone Density Markers', 'Cardiac Risk Panel', 'Kidney Function'],
  },
  {
    id: 'womens-health', name: "Women's Health Checkup", category: 'women',
    originalPrice: 2999, discountedPrice: 1499, discountPercent: 50,
    testsIncluded: 65, turnaroundHours: 24, popular: false, homeCollection: true,
    keyTests: ['Hormone Panel', 'Iron Studies', 'Pap Smear Markers'],
  },
  {
    id: 'cardiac-risk', name: 'Cardiac Risk Assessment', category: 'cardiac',
    originalPrice: 1999, discountedPrice: 999, discountPercent: 50,
    testsIncluded: 35, turnaroundHours: 24, popular: false, homeCollection: true,
    keyTests: ['ECG', 'Troponin', 'Homocysteine'],
  },
  {
    id: 'diabetes-panel', name: 'Diabetes Management Panel', category: 'diabetes',
    originalPrice: 1499, discountedPrice: 749, discountPercent: 50,
    testsIncluded: 28, turnaroundHours: 24, popular: false, homeCollection: true,
    keyTests: ['HbA1c', 'Fasting Glucose', 'Insulin Resistance'],
  },
  {
    id: 'vitamin-screen', name: 'Vitamin Deficiency Screen', category: 'vitamin',
    originalPrice: 1299, discountedPrice: 649, discountPercent: 50,
    testsIncluded: 15, turnaroundHours: 24, popular: false, homeCollection: true,
    keyTests: ['Vitamin D', 'Vitamin B12', 'Folate'],
  },
  {
    id: 'kidney-liver', name: 'Kidney & Liver Profile', category: 'organ',
    originalPrice: 1799, discountedPrice: 899, discountPercent: 50,
    testsIncluded: 32, turnaroundHours: 24, popular: false, homeCollection: true,
    keyTests: ['LFT', 'KFT', 'Uric Acid'],
  },
  {
    id: 'immunity-panel', name: 'Immunity Booster Panel', category: 'immunity',
    originalPrice: 1299, discountedPrice: 649, discountPercent: 50,
    testsIncluded: 18, turnaroundHours: 48, popular: false, homeCollection: true,
    keyTests: ['CBC with Differential', 'CRP', 'IgG & IgM'],
  },
]
```

**Component structure:**
```
src/
  app/layout.tsx, globals.css, page.tsx
  types/index.ts
  lib/data.ts
  components/
    layout/SiteNav.tsx + SiteNav.module.css
    layout/Footer.tsx + Footer.module.css
    home/HeroSection.tsx + HeroSection.module.css
    home/CategoryTabs.tsx + CategoryTabs.module.css
    home/PackageGrid.tsx + PackageGrid.module.css
    home/PackageCard.tsx + PackageCard.module.css
    home/HowItWorks.tsx + HowItWorks.module.css
    home/WhyChooseUs.tsx + WhyChooseUs.module.css
    home/Testimonials.tsx + Testimonials.module.css
    ui/Button.tsx + Button.module.css
```

**Critical CSS rules (never violate):**
```css
/* Button.module.css */
.btn { border-radius: 8px; }
.primary { background: var(--color-pink); color: var(--color-dark-text); } /* dark on pink = 5.27:1 ✓ */
.outlineWhite { background: transparent; color: var(--color-white); border: 1.5px solid var(--color-white); }
.outlineLight { background: transparent; color: var(--color-dark-text); border: 1.5px solid var(--color-dark-text); }

/* PackageCard.module.css — glassmorphism rgba exception */
.card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
.card:hover { box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15); }
.price { color: var(--color-pink); } /* pink on dark = 5.27:1 ✓ */
.original { color: var(--color-muted); text-decoration: line-through; }
```

---

## 3 — Bolt

**VitalCheck — Cult.fit Care-pattern Indian Diagnostic Marketplace**
Next.js 14 · TypeScript strict · CSS Modules · Static export

**Complete specification:**

Colors: `--color-bg: #15171C` · `--color-surface: #1E2130` · `--color-pink: #FF316D` · `--color-white: #FFFFFF` · `--color-muted: #888E9E` · `--color-light-bg: #F2F4F8` · `--color-border: #2E3147` · `--color-dark-text: #15171C`

Font: Inter (Google Fonts) weights `['400', '600', '700']`. Variable `--font-sans`. No other fonts.

next.config.ts: `{ output: 'export', images: { unoptimized: true } }`

**Page sections (top to bottom):**

**SiteNav** (server): Dark bg (`var(--color-bg)`). Logo "VitalCheck" in pink. Nav links: white text, pink hover. Location pill (dark border, white text, `border-radius: 24px`). "Book Now" button: pink bg, dark text, `border-radius: 8px`.

**HeroSection** (server): Dark bg + faint radial gradient aurora overlay. Eyebrow text in pink. H1: Inter 700, white, clamp(2.5rem, 5vw, 4rem). Subheading: muted. Two CTAs: primary + outlineWhite. Stats bar: 4 items with pipe dividers ("500+ Tests", "24hr Reports", "Home Collection", "NABL Certified").

**CategoryTabs + PackageGrid** (client): `'use client'`. State: `activeCategory: ServiceCategory | 'all'`. Pill tabs: active = pink bg / dark text, inactive = surface bg / white text, all `border-radius: 24px`. Horizontal row, hide scrollbar. `useMemo` filters packages. Grid below.

**PackageCard** (server): glassmorphism card (`border-radius: 16px`, `backdrop-filter: blur(12px)`, rgba bg + border). "POPULAR" badge (pink bg, dark text, `border-radius: 4px`) if `popular`. Name (white, 700). Original price: `<del>₹{originalPrice.toLocaleString('en-IN')}</del>` (muted, line-through). Discounted price: `₹{discountedPrice.toLocaleString('en-IN')}` (pink, large, bold). `{discountPercent}% off` chip. `{testsIncluded} Tests Included`. 3 keyTests with checkmarks. `{turnaroundHours}hr Reports`. "🏠 Home Collection" if homeCollection. "Book Now" button: pink bg, **dark text** `var(--color-dark-text)`, full-width, `border-radius: 8px`. Hover glow: `0 8px 32px rgba(255,49,109,0.15)`.

**HowItWorks** (server): Light bg. Dark H2. 3 steps in flex row: numbered circle (pink) + Lucide icon + title + description. `border-radius: 12px` on step cards. Dark text throughout (light bg section).

**WhyChooseUs** (server): Dark bg. 4 cards in 2×2 grid. Each: Lucide icon (pink) + title (white) + description (muted). Cards: surface bg, `border-radius: 12px`, `border: 1px solid var(--color-border)`. NO glassmorphism on these.

**Testimonials** (server): Light bg. 3 cards. Quote + patient name + package name + star rating (amber `#F59E0B` star). Cards: white bg, `border-radius: 12px`, light border.

**Footer** (server): Dark bg. 4 columns. Logo (pink). White text. Links hover to pink.

**QA verification:**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"   # must be empty
grep -r "rgba(" src --include="*.module.css"                  # expect only PackageCard (glassmorphism)
grep -r "border-radius: 50%" src/components                   # must be empty
grep -r "border-radius: 24px" src --include="*.module.css"    # only CategoryTabs pills
```

---

## 4 — v0

Build these components for a diagnostic marketplace (VitalCheck — Cult.fit Care pattern). TypeScript + CSS Modules.

**Design tokens:**
```
--color-bg: #15171C  --color-surface: #1E2130  --color-pink: #FF316D
--color-white: #FFFFFF  --color-muted: #888E9E  --color-light-bg: #F2F4F8
--color-border: #2E3147  --color-dark-text: #15171C
```

**Component 1: PackageCard**
Props:
```typescript
interface PackageCardProps {
  pkg: {
    name: string; category: string
    originalPrice: number; discountedPrice: number; discountPercent: number
    testsIncluded: number; turnaroundHours: number
    popular: boolean; homeCollection: boolean; keyTests: string[]
  }
}
```
Render (dark bg context):
- Glassmorphism card: `background: rgba(255,255,255,0.06)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 16px`
- "POPULAR" badge (pink bg, dark text, `border-radius: 4px`) — conditional render, not `display: none`
- Package name: white, Inter 700
- Price block: `<del>₹{originalPrice.toLocaleString('en-IN')}</del>` (muted) + `₹{discountedPrice.toLocaleString('en-IN')}` (pink, large) + `{discountPercent}% off` chip
- `{testsIncluded} Tests Included` line
- 3 keyTests with CheckCircle Lucide icons in pink
- `{turnaroundHours}hr Reports` with Clock icon
- "🏠 Home Collection" if homeCollection (conditional JSX, not hidden)
- "Book Now" button: pink bg, **`color: var(--color-dark-text)`** (dark, NOT white), `border-radius: 8px`, full-width
- Hover: `box-shadow: 0 8px 32px rgba(255,49,109,0.15)`

**Component 2: CategoryTabs**
`'use client'`. Props: `categories: { label: string; value: string }[]`, `packages: HealthPackage[]`
Pill row: `border-radius: 24px`. Active: `background: var(--color-pink); color: var(--color-dark-text)`. Inactive: `background: var(--color-surface); color: var(--color-white)`. Hide scrollbar. Below: `PackageGrid` with filtered packages.

**Component 3: HeroSection**
Dark bg + aurora radial gradient overlay. Eyebrow: pink, Inter 700, uppercase, letter-spacing. H1: white, clamp(2.5rem, 5vw, 4rem). Subheading: muted. Two buttons: primary (pink bg, dark text) + outlineWhite. Stats bar below: 4 metrics with dividers.

**Component 4: HowItWorks**
Light bg section. 3 step cards in flex row. Each: step number circle (pink bg, dark text) + Lucide icon + title (dark Inter 700) + description (dark muted). Cards: white bg, `border-radius: 12px`, border. No shadow.

**Radius rules:**
- Buttons → `8px`
- PackageCard → `16px` (glassmorphism)
- WhyChooseUs cards → `12px`
- HowItWorks cards → `12px`
- Testimonial cards → `12px`
- Category pills → `24px`
- "POPULAR" badge → `4px`

---

## 5 — Claude Artifacts

Build **VitalCheck** — a Cult.fit Care-pattern Indian diagnostic marketplace. Next.js 14 App Router + TypeScript strict mode + CSS Modules. Static export.

### File-by-file implementation:

**TASK-001 — Scaffold + dependencies**
```bash
npx create-next-app@latest vitalcheck --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd vitalcheck && npm install framer-motion lucide-react
```

**TASK-002 — Types (src/types/index.ts)**
Full type definitions for HealthPackage, ServiceCategory, ProcessStep, TrustSignal, Testimonial.

**TASK-003 — globals.css**
8 tokens + `.sr-only` + `prefers-reduced-motion`.

**TASK-004 — layout.tsx**
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-sans' })
```

**TASK-005 — Button (3 variants)**
```css
.btn { border-radius: 8px; }
.primary { background: var(--color-pink); color: var(--color-dark-text); }
/* dark text on pink — 5.27:1 ✓ — NEVER use var(--color-white) on .primary */
.outlineWhite { background: transparent; color: var(--color-white); border: 1.5px solid var(--color-white); }
.outlineLight { background: transparent; color: var(--color-dark-text); border: 1.5px solid var(--color-dark-text); }
```

**TASK-006 — SiteNav (server component)**
```tsx
// No 'use client'. Dark bg.
<nav className={styles.nav} role="navigation" aria-label="Main navigation">
  <div className={styles.inner}>
    <Link href="/" className={styles.logo}>VitalCheck</Link>
    <ul className={styles.links}>
      <li><Link href="#" className={styles.link}>Diagnostics</Link></li>
      <li><Link href="#" className={styles.link}>Health Packages</Link></li>
      <li><Link href="#" className={styles.link}>About</Link></li>
    </ul>
    <div className={styles.rightGroup}>
      <span className={styles.location}>📍 Chennai</span>
      <Button variant="primary" size="sm" href="#">Book Now</Button>
    </div>
  </div>
</nav>
```

**TASK-007 — HeroSection (server component)**
Dark bg with radial-gradient aurora overlay. Eyebrow in pink. H1 (white, bold). Subheading (muted). Two CTAs. Stats row with 4 items and dividers.

**TASK-008 — PackageCard (server component, no `'use client'`)**
```tsx
// Glassmorphism card — rgba in module.css is the documented exception
// Price display:
<p className={styles.priceBlock}>
  <span className="sr-only">Original price: </span>
  <del className={styles.original} aria-label={`was ₹${pkg.originalPrice.toLocaleString('en-IN')}`}>
    ₹{pkg.originalPrice.toLocaleString('en-IN')}
  </del>
  <span className="sr-only">Discounted price: </span>
  <strong className={styles.price}>₹{pkg.discountedPrice.toLocaleString('en-IN')}</strong>
  <span className={styles.discountBadge}>{pkg.discountPercent}% off</span>
</p>

// Conditional badge — JSX, not display:none
{pkg.popular && (
  <span className={styles.popularBadge} aria-label="Popular package">POPULAR</span>
)}

// Home collection — conditional JSX
{pkg.homeCollection && (
  <p className={styles.homeTag}>
    <Home size={14} aria-hidden="true" /> Home Collection
  </p>
)}

// CTA
<Button variant="primary" fullWidth>Book Now</Button>
```

**TASK-009 — CategoryTabs + PackageGrid (`'use client'`)**
```tsx
'use client'
import { useState, useMemo } from 'react'

const CATEGORIES: { label: string; value: ServiceCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Body', value: 'full-body' },
  { label: 'Senior Care', value: 'senior' },
  { label: "Women's Health", value: 'women' },
  { label: 'Cardiac', value: 'cardiac' },
  { label: 'Diabetes', value: 'diabetes' },
  { label: 'Vitamins', value: 'vitamin' },
  { label: 'Organ Profile', value: 'organ' },
  { label: 'Immunity', value: 'immunity' },
]

export default function CategoryTabs({ packages }: { packages: HealthPackage[] }) {
  const [active, setActive] = useState<ServiceCategory | 'all'>('all')

  const filtered = useMemo(() =>
    active === 'all' ? packages : packages.filter(p => p.category === active),
    [active, packages]
  )

  return (
    <section className={styles.section}>
      <div className={styles.tabs} role="tablist" aria-label="Filter packages by category">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={active === cat.value}
            className={`${styles.tab} ${active === cat.value ? styles.active : ''}`}
            onClick={() => setActive(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
      </div>
    </section>
  )
}
```

**TASK-010 — HowItWorks (server component)**
Light bg. 3 steps using `processSteps` from data. Lucide icons. Dark text.

**TASK-011 — WhyChooseUs (server component)**
Dark bg. 4 trust signals. Lucide icon map. Surface bg cards with `border-radius: 12px`.

**TASK-012 — Testimonials (server component)**
Light bg. 3 testimonials. Amber star rating. Cards: white bg, `border-radius: 12px`.

**TASK-013 — Footer (server component)**
Dark bg. 4 columns. Pink logo. Links hover to pink. Copyright.

**TASK-014 — Framer Motion**
```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

**TASK-015 — Static export + QA**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"     # must be empty
grep -r "rgba(" src --include="*.module.css"                    # only PackageCard.module.css
grep -r "border-radius: 50%" src/components                     # must be empty
```

---

## 6 — Grok

Implement **VitalCheck** — Cult.fit Care-pattern diagnostic marketplace. Next.js 14 + TypeScript + CSS Modules.

**Unit 1: filterPackages**
```typescript
// src/lib/filterPackages.ts
import { HealthPackage, ServiceCategory } from '@/types'

export function filterPackages(
  packages: HealthPackage[],
  category: ServiceCategory | 'all'
): HealthPackage[] {
  if (category === 'all') return packages
  return packages.filter(p => p.category === category)
}
```

**Unit 2: formatINR**
```typescript
// src/lib/formatINR.ts
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
// Usage: formatINR(1999) → "₹1,999"
```

**Unit 3: PackageCard price block**
```tsx
// The <del> tag provides semantic accessibility for screen readers:
// Screen reader announces: "Original price: [strikethrough] ₹3,999 Discounted price: ₹1,999"
<p className={styles.priceBlock}>
  <del className={styles.original}>{formatINR(pkg.originalPrice)}</del>
  <strong className={styles.price}>{formatINR(pkg.discountedPrice)}</strong>
  <span className={styles.discountBadge}>{pkg.discountPercent}% off</span>
</p>
```

**Unit 4: CategoryTabs ARIA pattern**
```tsx
// Tabs use role="tablist" / role="tab" / aria-selected
// Not radio buttons (radio buttons are for forms, tabs are for UI panels)
<div role="tablist" aria-label="Filter by category">
  {CATEGORIES.map(cat => (
    <button
      role="tab"
      aria-selected={active === cat.value}
      onClick={() => setActive(cat.value)}
    >
      {cat.label}
    </button>
  ))}
</div>
```

**Unit 5: Glassmorphism CSS (PackageCard.module.css)**
```css
/* rgba values in this file are the documented exception for glassmorphism */
.card {
  background: rgba(255, 255, 255, 0.06);     /* surface glass */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1); /* glass edge */
  border-radius: 16px;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15); /* pink glow */
  border-color: rgba(255, 49, 109, 0.3);            /* pink edge on hover */
}
```

**Unit 6: Button contrast enforcement**
```css
/* primary button — pink bg with DARK text — 5.27:1 ✓ */
.primary { background: var(--color-pink); color: var(--color-dark-text); }

/* WRONG — white text on pink = 3.55:1 — fails WCAG for normal text */
/* .primary { color: var(--color-white); }  ← NEVER DO THIS */
```

**Color contract table:**
| Combination | Ratio | Pass? | Where used |
|------------|-------|-------|-----------|
| White on bg `#15171C` | ~14:1 | ✓✓ | All dark section text |
| White on surface `#1E2130` | ~13:1 | ✓✓ | Card text, muted labels |
| Dark `#15171C` on pink `#FF316D` | 5.27:1 | ✓ AA | All pink buttons |
| Pink `#FF316D` as text on dark bg | 5.27:1 | ✓ AA | Prices, eyebrow, accents |
| White on pink `#FF316D` | 3.55:1 | ✗ FAIL | Never use for body/button text |
| Dark `#15171C` on light-bg `#F2F4F8` | ~17:1 | ✓✓ | HowItWorks, Testimonials |
| Muted `#888E9E` on dark bg | ~5.7:1 | ✓ AA | Metadata, descriptions |

---

## 7 — Gemini

**Project:** VitalCheck — Cult.fit Care-pattern Indian diagnostic marketplace
**Stack:** Next.js 14 App Router · TypeScript strict · CSS Modules · No Tailwind · Static export

### Context

Cult.fit Care is a health diagnostics marketplace — not a doctor directory, not a booking widget, not a hospital portal. Its primary product is **health packages**: curated sets of diagnostic tests sold at discounted prices (typically 50% off) with home sample collection. The UX is e-commerce-adjacent: browse packages by category, see pricing, book.

The Aurora design system (Cult.fit's proprietary design language) uses a dark-first aesthetic, glassmorphism cards, bold pink accent, and Inter typography. This build encodes those patterns while maintaining WCAG compliance.

### Color palette (8 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#15171C` | Primary background — dark sections (nav, hero, packages, trust, footer) |
| `--color-surface` | `#1E2130` | Elevated surface — trust cards, inactive tabs |
| `--color-pink` | `#FF316D` | Brand accent — CTAs, prices, eyebrow, logo, icon color |
| `--color-white` | `#FFFFFF` | Primary text on dark bg, active tab text |
| `--color-muted` | `#888E9E` | Secondary text — descriptions, metadata, original price |
| `--color-light-bg` | `#F2F4F8` | Light alternating sections — HowItWorks, Testimonials |
| `--color-border` | `#2E3147` | Dark borders, card outlines in dark sections |
| `--color-dark-text` | `#15171C` | Text on pink buttons + text in light sections (same value as bg — reused token) |

### WCAG compliance

| Combination | Ratio | Result |
|------------|-------|--------|
| White on bg `#15171C` | ~14:1 | ✓✓ AAA |
| White on surface `#1E2130` | ~13:1 | ✓✓ AAA |
| Dark `#15171C` on pink `#FF316D` | 5.27:1 | ✓ AA (button text) |
| Pink `#FF316D` on dark bg | 5.27:1 | ✓ AA (accent text) |
| Muted `#888E9E` on dark bg | ~5.7:1 | ✓ AA |
| White on pink `#FF316D` | 3.55:1 | ✗ FAIL — never use |
| Dark text on light-bg `#F2F4F8` | ~17:1 | ✓✓ AAA |

### Typography

Inter via `next/font/google`. Weights: `['400', '600', '700']`.

```
Display / Hero H1: clamp(2.5rem, 5vw, 4rem) / 700 / white
Section H2:        clamp(1.75rem, 3vw, 2.5rem) / 700 / white (dark sections) or dark-text (light)
Package name:      1.25rem / 700 / white
Body:              1rem / 1.7 / muted (dark) or dark-text (light)
Price:             1.75rem / 700 / --color-pink
```

### Architecture decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary entity | `HealthPackage` | Not doctors — this is a diagnostics marketplace |
| Filter type | Single category tab | One dimension only — not multi-filter like doctor grid |
| Filter component | `CategoryTabs` (client) | Needs active tab state |
| Package card | Server component | Receives `pkg` prop, no state needed |
| Glassmorphism | PackageCard only | Signature Cult.fit Care pattern; rgba exception documented |
| Strike-through | `<del>` tag | Semantic — screen readers announce "strikethrough" |
| Price format | `toLocaleString('en-IN')` | Indian number formatting (₹1,999 not ₹1999) |

### Section backgrounds (alternating pattern)

```
SiteNav:     dark (--color-bg)
HeroSection: dark (--color-bg)
PackageGrid: dark (--color-bg)
HowItWorks:  light (--color-light-bg)   ← contrast break
WhyChooseUs: dark (--color-bg)
Testimonials:light (--color-light-bg)   ← contrast break
Footer:      dark (--color-bg)
```

### Static export config

```typescript
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
```

---

## 8 — Cursor

**VitalCheck — Cult.fit Care-pattern Diagnostic Marketplace**

Open in Cursor. Scaffold:
```bash
npx create-next-app@latest vitalcheck --typescript --no-tailwind --app --src-dir --import-alias "@/*"
npm install framer-motion lucide-react
```

**Architecture notes for Cursor AI:**

This build has **four novel patterns** vs standard clinic templates:

**Pattern 1 — Dark-first design**
The primary background is `--color-bg: #15171C`. ALL sections default to dark. Only `HowItWorks` and `Testimonials` use `--color-light-bg: #F2F4F8`. All text in dark sections is white or muted-gray — NOT the `--color-text: dark` pattern used in light-bg clinic builds. Body font color in dark sections: `var(--color-white)`.

**Pattern 2 — Dark text on pink buttons**
Pink `#FF316D` with white text = 3.55:1 (fails for normal text). Always use `color: var(--color-dark-text)` on `.primary` buttons. The same token `--color-dark-text: #15171C` is used for:
1. Text on pink buttons (dark bg color used as text color)
2. Text in light-bg sections (`HowItWorks`, `Testimonials`)
This dual use is intentional — the value is the same (#15171C), so reusing the token is correct.

**Pattern 3 — Package-based, not doctor-based**
The core entity is `HealthPackage` with pricing fields. There are NO doctor types, NO appointment types, NO consulting modes, NO specialty filters. The only filter is `ServiceCategory` via `CategoryTabs`. The card renders price/discount/tests — not name/credentials/rating.

**Pattern 4 — Glassmorphism in PackageCard**
`PackageCard.module.css` intentionally uses `rgba()` values for the glass effect. This is the ONE file that should appear in:
```bash
grep -r "rgba(" src --include="*.module.css"
```
All other `.module.css` files must remain rgba-free.

**Key constraints:**
- Inter 400+600+700 (not Lato, not Roboto, not Nunito Sans)
- `border-radius: 16px` on PackageCard (not 6px or 4px)
- `border-radius: 8px` on buttons (not 4px like Cleveland/Practo)
- `border-radius: 24px` on category pills ONLY
- `border-radius: 12px` on WhyChooseUs + Testimonial cards
- CategoryTabs: single filter (one active category) — not multi-filter
- Strike-through pricing uses `<del>` tag with `aria-label`
- Prices formatted with `toLocaleString('en-IN')` — ₹1,999 not ₹1999
- SiteNav, PackageCard, HowItWorks, WhyChooseUs, Testimonials, Footer: no `'use client'`
- CategoryTabs: `'use client'` — manages active tab state + useMemo filtering
- `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`

**File tree:**
```
src/app/layout.tsx (Inter font, globals import)
src/app/globals.css (8 tokens + sr-only + reduced-motion)
src/app/page.tsx
src/types/index.ts
src/lib/data.ts (8 packages, processSteps, trustSignals, testimonials)
src/lib/filterPackages.ts + formatINR.ts
src/components/layout/SiteNav.tsx + .module.css
src/components/layout/Footer.tsx + .module.css
src/components/home/HeroSection.tsx + .module.css
src/components/home/CategoryTabs.tsx + .module.css  ← 'use client'
src/components/home/PackageCard.tsx + .module.css   ← glassmorphism rgba exception
src/components/home/HowItWorks.tsx + .module.css
src/components/home/WhyChooseUs.tsx + .module.css
src/components/home/Testimonials.tsx + .module.css
src/components/ui/Button.tsx + .module.css
next.config.ts
```

Implement in order: types → data → globals → layout → Button → SiteNav → Hero → CategoryTabs+PackageCard → remaining sections. Run `tsc --noEmit` after each group.
