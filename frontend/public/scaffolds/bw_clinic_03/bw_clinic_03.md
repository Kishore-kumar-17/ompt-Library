# bw_clinic_03 — Global Hospital Authority Portal
## Inspiration: Cleveland Clinic (my.clevelandclinic.org)
## Theme: Outcomes-forward, condition-indexed, authority through data

---

## Design Identity

Cleveland Clinic is the gold standard for medical information architecture: condition-first search (not specialty dropdowns), outcomes data as primary content (not footer copy), and provider profiles indexed by conditions treated rather than specialty alone. The visual language is clean and institutional — Roboto on a blue/green/navy palette, subtle card shadows, and a dedicated dark `OutcomesStrip` section that no other clinic build uses. White text on blue #0468CD passes WCAG AA at 5.56:1; this is a well-designed accessible palette unlike Apollo's gold or Practo's cyan.

**Palette:** `#0468CD` (blue) · `#006633` (green) · `#003087` (navy) · `#F5F7FA` (surface) · `#1A1A1A` (text) · `#CBD5E1` (border) · `#64748B` (muted) · `#FFFFFF` (white)

**Typography:** Roboto — 400 + 700 only · Google Fonts · No serif in UI

**Radius:** Buttons `4px` · Cards `6px` · Provider photos `6px` · Appointment-type pills `20px`

**Shadow:** Provider cards only — `0 2px 8px rgba(0,0,0,0.08)` · All other components: border-only

**Project name:** CareCompass

---

## Base Prompt

**Role:** Senior product designer specialising in hospital authority portal UX, condition-indexed provider discovery, and outcomes-first medical information architecture.

**Application Overview:** CareCompass is a hospital authority portal built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). It follows the Cleveland Clinic pattern — condition-first search (not specialty dropdowns), outcomes data as primary hero-level content, and providers indexed by `conditionsTreated[]` rather than specialty alone. Font: Roboto 400/700 only via `next/font/google`. No Tailwind, no weights 500 or 600.

**Brand Voice & Mood:** Institutional authority through data — the design conveys excellence via metrics (35,000+ heart procedures, #1 US News ranking) rather than marketing copy. Blue `#0468CD` is the action colour; navy `#003087` is the authority colour used for `TopBar`, `OutcomesStrip`, and `Footer`. All three palette colours can safely use white text. This is a US academic medical center — no NABH/JCI badges, no emergency-first nav.

**Core Features:**
1. **TopBar** (server) — thin navy bar (40px), white text; left: phone `800.223.2273`; right: "MyChart Login" + "Need Help?" links
2. **SiteNav** (server) — white sticky nav, blue logo, nav links (Find a Provider / Health Library / Conditions / Appointments), search icon + "Schedule Now" blue button
3. **HeroSearch** (`'use client'`) — navy-to-blue gradient bg, single `<input type="text">` placeholder "Search by condition, symptom, or doctor name", suggested condition pills; submit scrolls to `#provider-section`
4. **OutcomesStrip** (server) — full-bleed navy bg, 5-column `<dl>` metrics: "#1 US News", "35,000+ Heart procedures", "1,800+ Specialists", "300+ Locations", "6.2M+ Patients"; `1px solid rgba(255,255,255,0.15)` dividers; NO border-radius, NO shadow
5. **ConditionBrowser** (server) — surface bg, 4×2 grid of 8 condition category cards with Lucide icon + name + article count; border-only flat cards (no shadow)
6. **ProviderSearch** (`'use client'`) — 3-way simultaneous filter (text query matches name/specialty/conditionsTreated[], location select, appointment type select); `useMemo`; ARIA live region; `id="provider-section"`
7. **ProviderCard** (server) — 80×80 photo (`border-radius: 6px`), name + credentials + specialty, up to 3 conditions treated, location pills, appointment type pills (`border-radius: 20px`, blue/green/navy bg, white text), star rating (amber), accepting status badge, conditional CTA (accepting/limited → "Request Appointment" primary; not-accepting → "Request Second Opinion" outline)
8. **HealthLibraryPreview** (server) — surface bg, 3×2 article cards (border-only), CTA link
9. **AppointmentBanner** (server) — blue bg, white text, two buttons: "Call 800.223.2273" (outlineWhite) + "Schedule Online" (white bg, blue text)
10. **Footer** (server) — navy bg, 4 columns

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-blue: #0468CD`, `--color-green: #006633`, `--color-navy: #003087`, `--color-white: #FFFFFF`, `--color-surface: #F5F7FA`, `--color-text: #1A1A1A`, `--color-border: #CBD5E1`, `--color-muted: #64748B`
- **Contrast:** White on blue `#0468CD` = 5.56:1 ✓ AA. White on green `#006633` = 7.31:1 ✓ AA+AAA. White on navy `#003087` ≈ 12:1 ✓✓ AAA. All button/badge combinations use white text — all pass.
- **Border-radius:** `4px` all buttons, `6px` provider cards + condition cards + health article cards + provider photos, `20px` appointment type pills and suggested condition pills only. No `border-radius: 50%` on provider photos (6px rectangular, not circles).
- **Shadow:** Only `ProviderCard` has `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` — ALL other cards are border-only (`border: 1px solid var(--color-border)`, no shadow)
- **Typography:** Roboto 400+700 only — no 500, no 600. `H1: clamp(2rem, 4vw, 3rem)/700`, `H2: clamp(1.5rem, 2.5vw, 2.25rem)/700`, body: `1rem/1.75/400`
- **Zero hex in `.module.css`** — except `rgba()` in shadows and `rgba(255,255,255,0.15)` in OutcomesStrip dividers

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # AppointmentType, AcceptingStatus, ConditionCategory, Provider, Condition, OutcomeMetric, HealthArticle
  lib/
    data.ts            # 8 providers, 8 conditions, 5 outcome metrics, 6 articles
    filterProviders.ts # filterProviders(providers, query, city, apptType) + getUniqueCities()
  components/
    layout/TopBar/ SiteNav/ Footer/
    home/
      HeroSearch/         # 'use client'
      OutcomesStrip/      # server, <dl> semantics
      ConditionBrowser/   # server, Lucide icon map
      ProviderSearch/     # 'use client', 3-way useMemo filter
      ProviderCard/       # server, no 'use client'
      HealthLibraryPreview/ AppointmentBanner/
    ui/
      Button/             # primary (blue bg, white text), outlineWhite, outlineBlue
      AppointmentBadge/   # server, config-driven: in-person=blue, virtual=green, second-opinion=navy
      AcceptingBadge/     # server, text + coloured dot
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `Provider.appointmentTypes: AppointmentType[]` — array, not scalar; provider can offer any combination
- `filterProviders(providers, query, city, apptType)` — all three filters applied simultaneously via `useMemo`; query matches across `name`, `specialty`, and any item in `conditionsTreated[]`
- `AppointmentType = 'in-person' | 'virtual' | 'second-opinion'`
- `AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'`
- `ConditionCategory = 'heart-vascular' | 'cancer' | 'brain-spine' | 'digestive' | 'orthopedics' | 'lung' | 'kidney-urinary' | 'endocrine'`

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define all types in `src/types/index.ts`
3. Write `globals.css` with 8 CSS tokens + `.sr-only` + `prefers-reduced-motion` reset
4. `layout.tsx`: Roboto with `weight: ['400', '700']` only — no 500, no 600
5. Create 8 `Provider` entries (3 accepting, 3 limited, 2 not-accepting; all 3 appointment types covered), 8 conditions, 5 outcome metrics
6. Implement `filterProviders` and `getUniqueCities` utilities
7. Build server components first: TopBar, SiteNav, OutcomesStrip (with `<dl>`), ConditionBrowser, HealthLibraryPreview, AppointmentBanner, Footer, ProviderCard
8. Build client components: HeroSearch (search submit scrolls to `#provider-section`), ProviderSearch (3-way filter with useMemo)
9. Verify QA greps: no hex in modules, only ProviderCard has box-shadow, only 20px pills use 20px radius
10. `tsc --noEmit` and `npm run build`

**User Experience:**
- Hero pattern is condition-first: user types "chest pain" or "diabetes" — not a specialty dropdown
- OutcomesStrip immediately below hero establishes authority before any individual provider is shown
- ConditionBrowser provides browse path for users who don't know what condition to search
- Submitting the hero search scrolls to ProviderSearch — same filter logic, already focused
- Provider accepting status drives CTA: not-accepting providers show "Request Second Opinion" (still actionable)
- ARIA live region in ProviderSearch announces filter result counts to screen reader users

**Constraints:**
- Roboto 400+700 only — NO weight 500, NO weight 600
- Provider photo: `border-radius: 6px` — NOT `50%`, NOT `4px`, NOT `8px` — exactly 6px
- Appointment type pills: `border-radius: 20px` — only these elements use 20px
- Box-shadow ONLY on ProviderCard — all other cards are border-only flat
- TopBar, SiteNav, ProviderCard, all static content components: NO `'use client'`
- HeroSearch, ProviderSearch: `'use client'` — these two only
- `OutcomesStrip` must use `<dl>/<dt>/<dd>` structure — not `<div>/<p>/<p>`
- No NABH, no JCI badges — US hospital uses US News ranking
- No `border-radius: 50%` except the 6×6px `AcceptingBadge` status dot (purely decorative)
- No hex values in `.module.css` (except `rgba()`)

---

## 1 — Lovable

Build a hospital authority portal called **CareCompass** — modelled on Cleveland Clinic's information architecture. Next.js 14, TypeScript, CSS Modules. No Tailwind.

**Brand palette (8 tokens in globals.css):**
```
--color-blue: #0468CD     primary — buttons, links, active states
--color-green: #006633    success — badges, status accents
--color-navy: #003087     dark — TopBar bg, OutcomesStrip bg, headings
--color-white: #FFFFFF
--color-surface: #F5F7FA  alternating section backgrounds
--color-text: #1A1A1A     body copy
--color-border: #CBD5E1   card borders, dividers
--color-muted: #64748B    metadata, secondary labels
```

**Font:** Roboto (Google Fonts, weights 400 + 700 only) via `next/font/google`, `variable: '--font-sans'`.

**Key data types:**
```typescript
type AppointmentType = 'in-person' | 'virtual' | 'second-opinion'
type AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'

interface Provider {
  id: string; name: string; credentials: string; specialty: string
  subspecialties: string[]; conditionsTreated: string[]
  locations: { name: string; city: string }[]
  languages: string[]; rating: number; reviewCount: number
  photo: string; appointmentTypes: AppointmentType[]
  acceptingStatus: AcceptingStatus
}

interface Condition {
  id: string; name: string; category: ConditionCategory; articleCount: number
}

type ConditionCategory = 'heart-vascular' | 'cancer' | 'brain-spine' | 'digestive' | 'orthopedics' | 'lung' | 'kidney-urinary' | 'endocrine'

interface OutcomeMetric { id: string; label: string; value: string; context: string }
```

**Sections to build (in page order):**

1. `TopBar` — thin navy bar (`var(--color-navy)`, 40px) · white text · Left: phone `800.223.2273` · Right: "MyChart Login" link + "Need Help?" link · Server component
2. `SiteNav` — white sticky nav (`position: sticky; top: 0; z-index: 100`) · Logo left · Links: Find a Provider / Health Library / Conditions / Appointments · Right: search icon + "Schedule Now" button (blue bg, white text, `border-radius: 4px`) · Server component
3. `HeroSearch` — navy-to-blue gradient bg · Headline: Roboto 700 white · Single `<input type="text">` search field with placeholder "Search by condition, symptom, or doctor name" · Submit: blue button · Below input: suggested conditions as pill links
4. `OutcomesStrip` — navy bg (`var(--color-navy)`) · 5 metric columns: value (white, bold, large) + context (muted blue text) · Dividers between columns · Metrics: "#1 / US News & World Report", "35,000+ / Heart procedures annually", "1,800+ / Specialist physicians", "300+ / Locations worldwide", "6.2M+ / Patients seen annually"
5. `ConditionBrowser` — surface bg · 8 condition category cards in 4×2 grid · Each: icon + category name + article count ("247 articles") · Cards: white bg, `border-radius: 6px`, `border: 1px solid var(--color-border)`, NO shadow · Click navigates to condition list
6. `ProviderSearch` — white bg · Filter bar: text input (name/specialty) + location `<select>` + appointment type `<select>` · `useMemo` filtering · ARIA live region · 8 provider cards in responsive grid
7. `ProviderCard` — Server component · Photo `80×80px, border-radius: 6px` (NOT 50%) · Name + credentials + specialty + up to 3 conditions treated · Location pills · Appointment type badges (pill, `border-radius: 20px`): in-person=blue, virtual=green, second-opinion=navy · Rating: ★ amber fill `#F59E0B` + count · `acceptingStatus` badge · "Request Appointment" button (blue, `border-radius: 4px`, full width) · Shadow: `0 2px 8px rgba(0,0,0,0.08)` · `border-radius: 6px`
8. `HealthLibraryPreview` — surface bg · Section heading + 6 article cards in 3×2 grid · Each: category pill + title + read time · "View Health Library" CTA
9. `AppointmentBanner` — blue bg (`var(--color-blue)`) · White text · Two CTAs: "Call 800.223.2273" (outline white button) + "Schedule Online" (white bg, blue text button)
10. `Footer` — navy bg · 4 columns · Logo (white) + links · Cyan hover requires check: white on navy = fine · Copyright

**Critical rules:**
- `TopBar` and `SiteNav`: no `'use client'` — server components
- `ProviderCard`: no `'use client'` — server component
- `ProviderSearch`: `'use client'` — has filter state
- `HeroSearch`: `'use client'` — has input state
- White text on blue `#0468CD` = 5.56:1 ✓ — white CTA text is correct
- White text on navy `#003087` = ~12:1 ✓✓ — OutcomesStrip white text passes
- Provider photos: `border-radius: 6px` — NOT `50%`, NOT `4px`
- Appointment-type pills: `border-radius: 20px` — only these use pill radius
- Only provider cards have `box-shadow` — all other cards are border-only flat
- No `consultMode` field — this build uses `appointmentTypes: AppointmentType[]`
- No NABH/JCI badges — US hospital system, uses US News ranking instead
- No emergency link in nav — academic medical center, not ER-first

---

## 2 — ChatGPT Canvas

Build CareCompass — a Cleveland Clinic-style hospital authority portal. Next.js 14 App Router + TypeScript + CSS Modules.

**Setup:**
```bash
npx create-next-app@latest carecompass --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd carecompass
npm install framer-motion lucide-react
```

**globals.css — 8 tokens:**
```css
:root {
  --color-blue: #0468CD;
  --color-green: #006633;
  --color-navy: #003087;
  --color-white: #FFFFFF;
  --color-surface: #F5F7FA;
  --color-text: #1A1A1A;
  --color-border: #CBD5E1;
  --color-muted: #64748B;
}
```

**layout.tsx:**
```typescript
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-sans' })
```

**TypeScript types (src/types/index.ts):**
```typescript
export type AppointmentType = 'in-person' | 'virtual' | 'second-opinion'
export type AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'
export type ConditionCategory = 'heart-vascular' | 'cancer' | 'brain-spine' | 'digestive' | 'orthopedics' | 'lung' | 'kidney-urinary' | 'endocrine'

export interface Provider {
  id: string; name: string; credentials: string; specialty: string
  subspecialties: string[]; conditionsTreated: string[]
  locations: { name: string; city: string }[]
  languages: string[]; rating: number; reviewCount: number; photo: string
  appointmentTypes: AppointmentType[]; acceptingStatus: AcceptingStatus
}
export interface Condition { id: string; name: string; category: ConditionCategory; articleCount: number }
export interface OutcomeMetric { id: string; label: string; value: string; context: string }
export interface HealthArticle { id: string; title: string; category: string; readTimeMinutes: number }
```

**Mock data — 8 providers (src/lib/data.ts):**
Distribution: 3 accepting + 3 limited + 2 not-accepting; all 3 appointment types covered.
```typescript
export const providers: Provider[] = [
  {
    id: 'dr-sarah-blackstone', name: 'Sarah Blackstone', credentials: 'MD, FACC',
    specialty: 'Cardiology', subspecialties: ['Interventional Cardiology', 'Heart Failure'],
    conditionsTreated: ['Heart Failure', 'Coronary Artery Disease', 'Atrial Fibrillation'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }],
    languages: ['English'], rating: 4.9, reviewCount: 312, photo: '/photos/blackstone.jpg',
    appointmentTypes: ['in-person', 'virtual', 'second-opinion'], acceptingStatus: 'accepting'
  },
  {
    id: 'dr-james-kowalski', name: 'James Kowalski', credentials: 'MD, PhD',
    specialty: 'Oncology', subspecialties: ['Breast Cancer', 'Targeted Therapy'],
    conditionsTreated: ['Breast Cancer', 'Triple-Negative Breast Cancer', 'HER2+ Cancer'],
    locations: [{ name: 'Taussig Cancer Institute', city: 'Cleveland' }],
    languages: ['English', 'Polish'], rating: 4.8, reviewCount: 187, photo: '/photos/kowalski.jpg',
    appointmentTypes: ['in-person', 'second-opinion'], acceptingStatus: 'limited'
  },
  {
    id: 'dr-priya-nair', name: 'Priya Nair', credentials: 'MD',
    specialty: 'Neurology', subspecialties: ['Multiple Sclerosis', 'Neuroimmunology'],
    conditionsTreated: ['Multiple Sclerosis', 'Neuromyelitis Optica', 'Migraine'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }, { name: 'Beachwood Family Health', city: 'Beachwood' }],
    languages: ['English', 'Malayalam'], rating: 4.9, reviewCount: 224, photo: '/photos/nair.jpg',
    appointmentTypes: ['in-person', 'virtual'], acceptingStatus: 'accepting'
  },
  {
    id: 'dr-michael-torres', name: 'Michael Torres', credentials: 'MD',
    specialty: 'Orthopedic Surgery', subspecialties: ['Hip Replacement', 'Knee Replacement'],
    conditionsTreated: ['Hip Osteoarthritis', 'Knee Osteoarthritis', 'Hip Fracture'],
    locations: [{ name: 'Weston Hospital', city: 'Weston' }],
    languages: ['English', 'Spanish'], rating: 4.7, reviewCount: 403, photo: '/photos/torres.jpg',
    appointmentTypes: ['in-person'], acceptingStatus: 'accepting'
  },
  {
    id: 'dr-linda-chen', name: 'Linda Chen', credentials: 'MD, FACE',
    specialty: 'Endocrinology', subspecialties: ['Diabetes', 'Thyroid Disorders'],
    conditionsTreated: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Hypothyroidism'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }],
    languages: ['English', 'Mandarin'], rating: 4.8, reviewCount: 156, photo: '/photos/chen.jpg',
    appointmentTypes: ['in-person', 'virtual'], acceptingStatus: 'accepting'
  },
  {
    id: 'dr-robert-hayes', name: 'Robert Hayes', credentials: 'MD, AGAF',
    specialty: 'Gastroenterology', subspecialties: ['IBD', 'Colorectal Cancer Screening'],
    conditionsTreated: ["Crohn's Disease", 'Ulcerative Colitis', 'Colorectal Cancer'],
    locations: [{ name: 'Digestive Disease Institute', city: 'Cleveland' }],
    languages: ['English'], rating: 4.6, reviewCount: 289, photo: '/photos/hayes.jpg',
    appointmentTypes: ['in-person', 'virtual'], acceptingStatus: 'limited'
  },
  {
    id: 'dr-aisha-patel', name: 'Aisha Patel', credentials: 'MD, FCCP',
    specialty: 'Pulmonology', subspecialties: ['COPD', 'Pulmonary Hypertension'],
    conditionsTreated: ['COPD', 'Pulmonary Hypertension', 'Sleep Apnea'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }, { name: 'Strongsville Family Health', city: 'Strongsville' }],
    languages: ['English', 'Gujarati'], rating: 4.8, reviewCount: 198, photo: '/photos/patel.jpg',
    appointmentTypes: ['in-person', 'virtual'], acceptingStatus: 'limited'
  },
  {
    id: 'dr-david-kim', name: 'David Kim', credentials: 'MD, FASN',
    specialty: 'Nephrology', subspecialties: ['Transplant Nephrology', 'CKD'],
    conditionsTreated: ['Chronic Kidney Disease', 'Kidney Transplant', 'Glomerulonephritis'],
    locations: [{ name: 'Glickman Urological & Kidney Institute', city: 'Cleveland' }],
    languages: ['English', 'Korean'], rating: 4.9, reviewCount: 141, photo: '/photos/kim.jpg',
    appointmentTypes: ['in-person', 'second-opinion'], acceptingStatus: 'not-accepting'
  },
]
```

**Component file structure:**
```
src/
  app/layout.tsx, globals.css, page.tsx
  types/index.ts
  lib/data.ts
  components/
    layout/TopBar.tsx + TopBar.module.css
    layout/SiteNav.tsx + SiteNav.module.css
    layout/Footer.tsx + Footer.module.css
    home/HeroSearch.tsx + HeroSearch.module.css
    home/OutcomesStrip.tsx + OutcomesStrip.module.css
    home/ConditionBrowser.tsx + ConditionBrowser.module.css
    home/ProviderSearch.tsx + ProviderSearch.module.css
    home/ProviderCard.tsx + ProviderCard.module.css
    home/HealthLibraryPreview.tsx + HealthLibraryPreview.module.css
    home/AppointmentBanner.tsx + AppointmentBanner.module.css
    ui/Button.tsx + Button.module.css
    ui/AppointmentBadge.tsx + AppointmentBadge.module.css
    ui/AcceptingBadge.tsx + AcceptingBadge.module.css
```

**Critical CSS rules (never violate):**
```css
/* Button.module.css */
.btn { border-radius: 4px; }
.primary { background: var(--color-blue); color: var(--color-white); } /* white on blue = 5.56:1 ✓ */
.outlineWhite { background: transparent; color: var(--color-white); border: 1.5px solid var(--color-white); }
.outlineBlue { background: transparent; color: var(--color-blue); border: 1.5px solid var(--color-blue); }

/* ProviderCard.module.css */
.card { border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid var(--color-border); }
.photo { border-radius: 6px; object-fit: cover; object-position: top; width: 80px; height: 80px; }
.apptBadge { border-radius: 20px; } /* ONLY element with 20px radius in ProviderCard */
```

---

## 3 — Bolt

**CareCompass — Cleveland Clinic-pattern Hospital Authority Portal**
Next.js 14 · TypeScript strict · CSS Modules · Static export

**Complete specification:**

Colors: `--color-blue: #0468CD` · `--color-green: #006633` · `--color-navy: #003087` · `--color-white: #FFFFFF` · `--color-surface: #F5F7FA` · `--color-text: #1A1A1A` · `--color-border: #CBD5E1` · `--color-muted: #64748B`

Font: Roboto via next/font/google (400 + 700 only). Variable: `--font-sans`. No other fonts.

next.config.ts: `{ output: 'export', images: { unoptimized: true } }`

**Page sections (top to bottom):**

**TopBar** (server): Navy bg, 40px height, white text. Left: tel link `800.223.2273`. Right: "MyChart Login" | "Need Help?". No `'use client'`.

**SiteNav** (server): White bg, sticky, `z-index: 100`, `border-bottom: 1px solid var(--color-border)`. Logo "CareCompass" in `--color-blue`. Links: Find a Provider / Health Library / Conditions / Appointments. Right: Search icon + "Schedule Now" primary button.

**HeroSearch** (client): Background: gradient from `#003087` to `#0468CD`. White headline (Roboto 700, clamp). Single `<input type="text">` with placeholder "Search by condition, symptom, or doctor name" + submit button. Below: 4 suggested condition pill-links. `handleSubmit` scrolls to `#provider-section`.

**OutcomesStrip** (server): Navy bg. 5-column flex row. Each column: large white bold value + smaller white/muted context. Dividers `1px solid rgba(255,255,255,0.15)`. Values: "#1", "35,000+", "1,800+", "300+", "6.2M+". No shadow, no border-radius — full-bleed dark section.

**ConditionBrowser** (server): Surface bg. H2 heading. 4×2 grid of 8 condition category cards. Each card: Lucide icon + category name + article count. White bg, `border-radius: 6px`, `border: 1px solid var(--color-border)`. NO shadow on these cards. Icon in `--color-blue`.

**ProviderSearch** (client): White bg. `id="provider-section"`. Filter bar: text input (filters by name/specialty/condition) + location `<select>` + appointment type `<select>`. `useMemo` across all three filters simultaneously. ARIA live region `<p className="sr-only" aria-live="polite">`. Empty state when 0 results. Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop.

**ProviderCard** (server): Photo 80×80 `border-radius: 6px` (NOT 50%). Name + credentials (Roboto 700) + specialty. Up to 3 conditions treated as small chips. Location(s). Appointment type pills (`border-radius: 20px`): in-person=blue bg, virtual=green bg, second-opinion=navy bg — ALL white text. Star rating: amber fill `#F59E0B` (inline style on SVG, not a token). AcceptingStatus badge: accepting=green, limited=amber, not-accepting=red. "Request Appointment" button: full-width, primary. Card: `border-radius: 6px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`.

**HealthLibraryPreview** (server): Surface bg. 3×2 grid of article cards. Each: category label + title + read time. Border-only cards. "Explore Health Library →" CTA link.

**AppointmentBanner** (server): Blue bg (`var(--color-blue)`). White text. Two buttons: "Call 800.223.2273" (outlineWhite variant) + "Schedule Online" (white bg, blue text).

**Footer** (server): Navy bg. 4 columns. White text, links hover to `var(--color-blue)`. Accessible — blue on navy: check needed.

**QA verification commands:**
```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"   # must be empty
grep -r "rgba(" src --include="*.module.css"                  # must be empty
grep -r "border-radius: 50%" src/components                   # must be empty
grep -r "border-radius: 20px" src/components --include="*.module.css" # only apptBadge
grep -r "box-shadow" src/components --include="*.module.css"  # only ProviderCard
```

---

## 4 — v0

Build these components for a hospital authority portal (CareCompass — Cleveland Clinic pattern). TypeScript + CSS Modules. No Tailwind.

**Design tokens (reference in all CSS):**
```
--color-blue: #0468CD  --color-green: #006633  --color-navy: #003087
--color-white: #FFFFFF  --color-surface: #F5F7FA  --color-text: #1A1A1A
--color-border: #CBD5E1  --color-muted: #64748B
```

**Component 1: ProviderCard**
Props interface:
```typescript
interface ProviderCardProps {
  provider: {
    name: string; credentials: string; specialty: string
    conditionsTreated: string[]; locations: { name: string; city: string }[]
    rating: number; reviewCount: number; photo: string
    appointmentTypes: ('in-person' | 'virtual' | 'second-opinion')[]
    acceptingStatus: 'accepting' | 'limited' | 'not-accepting'
  }
}
```
Render: photo (`border-radius: 6px`, 80×80, object-fit cover, object-position top) · name/credentials/specialty · first 3 conditions as chips · appointment type pills (in-person: blue bg, virtual: green bg, second-opinion: navy bg — all `border-radius: 20px`, white text) · star rating (amber `#F59E0B` SVG fill) + review count · accepting status badge · "Request Appointment" primary button (full-width, `border-radius: 4px`). Card: `border-radius: 6px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`.

**Component 2: OutcomesStrip**
Props: `metrics: { value: string; context: string }[]`
Full-width navy bg. 5-column flex with `1px solid rgba(255,255,255,0.15)` dividers. Each column: value in Roboto 700 white clamp(1.75rem, 2.5vw, 2.5rem) + context in white/70% opacity. No border-radius on the strip itself — full-bleed.

**Component 3: HeroSearch**
`'use client'`. Props: `suggestedConditions: string[]`.
Gradient bg `linear-gradient(135deg, #003087 0%, #0468CD 100%)`. White headline. Single text input (placeholder: "Search by condition, symptom, or doctor name"). Submit calls `document.getElementById('provider-section')?.scrollIntoView({ behavior: 'smooth' })`. Below input: suggested conditions as pills (`border-radius: 20px`, white bg/20% opacity, white text).

**Component 4: ConditionBrowser**
Props: `conditions: { name: string; category: string; articleCount: number }[]`
Surface bg. 4×2 grid. Each card: icon (Lucide, `color: var(--color-blue)`) + category name (bold) + articleCount formatted as "X articles". White card, `border-radius: 6px`, `border: 1px solid var(--color-border)`. NO shadow. Hover: `border-color: var(--color-blue)`.

**Component 5: ProviderSearch (client)**
Props: `providers: Provider[]`
State: `nameQuery: string`, `locationFilter: string`, `apptTypeFilter: AppointmentType | ''`
`useMemo` filters all three simultaneously. `<section id="provider-section">`. ARIA live region. Location options from unique provider cities. Appointment type options: All / In-Person / Virtual / Second Opinion.

**Radius rules:**
- Buttons → `4px`
- Cards (ConditionBrowser, HealthArticle) → `6px`, border-only (no shadow)
- ProviderCard → `6px` + shadow
- Provider photo → `6px`
- Appointment type pills → `20px`
- Suggested condition pills in hero → `20px`

---

## 5 — Claude Artifacts

Build **CareCompass** — a Cleveland Clinic-pattern hospital authority portal. Next.js 14 App Router + TypeScript strict mode + CSS Modules. Static export.

### File-by-file implementation:

**TASK-001 — Scaffold + dependencies**
```bash
npx create-next-app@latest carecompass --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd carecompass && npm install framer-motion lucide-react
```

**TASK-002 — Types (src/types/index.ts)**
```typescript
export type AppointmentType = 'in-person' | 'virtual' | 'second-opinion'
export type AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'
export type ConditionCategory = 'heart-vascular' | 'cancer' | 'brain-spine' | 'digestive' | 'orthopedics' | 'lung' | 'kidney-urinary' | 'endocrine'

export interface ProviderLocation { name: string; city: string }
export interface Provider {
  id: string; name: string; credentials: string; specialty: string
  subspecialties: string[]; conditionsTreated: string[]
  locations: ProviderLocation[]; languages: string[]
  rating: number; reviewCount: number; photo: string
  appointmentTypes: AppointmentType[]; acceptingStatus: AcceptingStatus
}
export interface Condition { id: string; name: string; category: ConditionCategory; articleCount: number }
export interface OutcomeMetric { id: string; label: string; value: string; context: string }
export interface HealthArticle { id: string; title: string; category: string; readTimeMinutes: number }
```

**TASK-003 — globals.css**
Exactly 8 `--color-*` tokens. Plus `.sr-only` and `@media (prefers-reduced-motion: reduce)` that sets all transitions/animations to `none 0s`.

**TASK-004 — layout.tsx**
```typescript
import { Roboto } from 'next/font/google'
import './globals.css'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-sans' })
// <html lang="en" className={roboto.variable}><body>{children}</body></html>
```

**TASK-005 — Button component**
3 variants: `primary` (blue bg, white text), `outlineWhite` (transparent bg, white border+text), `outlineBlue` (transparent bg, blue border+text). All: `border-radius: 4px`. Accepts `href` for link variant.

**TASK-006 — TopBar** (server component, no `'use client'`)
Navy bg, 40px height, white text. Phone number `tel:800.223.2273` on left. MyChart + Need Help links right. `aria-label="Utility navigation"` on the nav element.

**TASK-007 — SiteNav** (server component, no `'use client'`)
White bg, sticky top, border-bottom. Logo "CareCompass" as `<Link>` in `var(--color-blue)`. Nav links: Find a Provider / Health Library / Conditions / Appointments. Right: SearchIcon (Lucide) + "Schedule Now" button (primary variant, sm size).

**TASK-008 — HeroSearch** (`'use client'`)
```tsx
'use client'
const [query, setQuery] = useState('')
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  document.getElementById('provider-section')?.scrollIntoView({ behavior: 'smooth' })
}
// Gradient bg, white text, single <input type="text">, submit button, suggested condition pills below
```
Input has `<label htmlFor="condition-search" className="sr-only">Search conditions, symptoms, or doctors</label>`.

**TASK-009 — OutcomesStrip** (server component)
Import `outcomeMetrics` from data. Navy bg, 5 flex columns with dividers. Each: `<dl><dt>` for value + `<dd>` for context for semantics. Full-bleed section, no border-radius.

**TASK-010 — ConditionBrowser** (server component)
Import `conditions` from data. Surface bg. 4×2 CSS Grid. Lucide icon map keyed by `ConditionCategory`:
```typescript
const iconMap: Record<ConditionCategory, LucideIcon> = {
  'heart-vascular': Heart, 'cancer': Ribbon, 'brain-spine': Brain,
  'digestive': Activity, 'orthopedics': Bone, 'lung': Wind,
  'kidney-urinary': Droplets, 'endocrine': Zap
}
```

**TASK-011 — AppointmentBadge** (server component)
```typescript
const badgeConfig = {
  'in-person': { label: 'In Person', bg: 'var(--color-blue)' },
  'virtual':   { label: 'Virtual',   bg: 'var(--color-green)' },
  'second-opinion': { label: '2nd Opinion', bg: 'var(--color-navy)' },
}
```
All: white text, `border-radius: 20px`, padding `2px 10px`, font-size `0.75rem`.

**TASK-012 — AcceptingBadge** (server component)
```typescript
const config = {
  'accepting': { label: 'Accepting Patients', color: '#166534' },
  'limited': { label: 'Limited Availability', color: '#92400E' },
  'not-accepting': { label: 'Not Accepting', color: '#991B1B' },
}
// Small text badge, no border-radius pill — flat text with colored dot (6×6px, border-radius: 50%)
```

**TASK-013 — ProviderCard** (server component, no `'use client'`)
```tsx
// Photo
<img src={provider.photo} alt={`Photo of ${provider.name}`}
     className={styles.photo} width={80} height={80} />
// CSS: .photo { border-radius: 6px; object-fit: cover; object-position: top; }

// Appointment badges
{provider.appointmentTypes.map(type => <AppointmentBadge key={type} type={type} />)}

// Rating
<span aria-label={`Rating: ${provider.rating} out of 5`}>
  {/* Star SVG with fill="#F59E0B" inline */}
  {provider.rating} ({provider.reviewCount.toLocaleString()} reviews)
</span>

// Conditional CTA based on acceptingStatus
{provider.acceptingStatus !== 'not-accepting' && (
  <Button variant="primary" fullWidth>Request Appointment</Button>
)}
{provider.acceptingStatus === 'not-accepting' && (
  <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
)}
```

**TASK-014 — ProviderSearch** (`'use client'`)
```tsx
'use client'
const [nameQuery, setNameQuery] = useState('')
const [locationFilter, setLocationFilter] = useState('')
const [apptTypeFilter, setApptTypeFilter] = useState<AppointmentType | ''>('')

const filtered = useMemo(() => providers.filter(p => {
  const matchesName = !nameQuery ||
    p.name.toLowerCase().includes(nameQuery.toLowerCase()) ||
    p.specialty.toLowerCase().includes(nameQuery.toLowerCase()) ||
    p.conditionsTreated.some(c => c.toLowerCase().includes(nameQuery.toLowerCase()))
  const matchesLocation = !locationFilter ||
    p.locations.some(l => l.city === locationFilter)
  const matchesAppt = !apptTypeFilter ||
    p.appointmentTypes.includes(apptTypeFilter as AppointmentType)
  return matchesName && matchesLocation && matchesAppt
}), [nameQuery, locationFilter, apptTypeFilter])
```
Section `id="provider-section"`.

**TASK-015 — HealthLibraryPreview, AppointmentBanner, Footer** (all server components)

**TASK-016 — Framer Motion entrances**
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```
Wrap each major section. `prefers-reduced-motion` respected via CSS: all components have `@media (prefers-reduced-motion: reduce) { transition: none; animation: none; }` in globals.

**TASK-017 — Static export**
```typescript
// next.config.ts
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
```

**Acceptance criteria — run before marking done:**
```bash
tsc --noEmit                                                    # must exit 0
npm run build                                                   # must exit 0
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"    # must be empty
grep -r "rgba(" src --include="*.module.css"                   # must be empty
grep -r "border-radius: 50%" src/components                    # must be empty
grep -r "box-shadow" src/components --include="*.module.css"   # must return only ProviderCard
```

---

## 6 — Grok

Implement the **CareCompass** hospital portal. Next.js 14 + TypeScript + CSS Modules. Each function below is a discrete implementation unit.

**Unit 1: filterProviders**
```typescript
// src/lib/filterProviders.ts
import { Provider, AppointmentType } from '@/types'

export function filterProviders(
  providers: Provider[],
  query: string,
  city: string,
  apptType: AppointmentType | ''
): Provider[] {
  return providers.filter(p => {
    if (query) {
      const q = query.toLowerCase()
      const matchName = p.name.toLowerCase().includes(q)
      const matchSpecialty = p.specialty.toLowerCase().includes(q)
      const matchCondition = p.conditionsTreated.some(c => c.toLowerCase().includes(q))
      if (!matchName && !matchSpecialty && !matchCondition) return false
    }
    if (city && !p.locations.some(l => l.city === city)) return false
    if (apptType && !p.appointmentTypes.includes(apptType)) return false
    return true
  })
}
```

**Unit 2: getUniqueCities**
```typescript
export function getUniqueCities(providers: Provider[]): string[] {
  return [...new Set(providers.flatMap(p => p.locations.map(l => l.city)))].sort()
}
```

**Unit 3: AppointmentBadge component**
```tsx
// src/components/ui/AppointmentBadge.tsx
// No 'use client' — server component
const config = {
  'in-person':      { label: 'In Person',    bg: '#0468CD' },
  'virtual':        { label: 'Virtual',       bg: '#006633' },
  'second-opinion': { label: '2nd Opinion',  bg: '#003087' },
} satisfies Record<AppointmentType, { label: string; bg: string }>
// border-radius: 20px; color: white; padding: 2px 10px; font-size: 0.75rem
// bg via inline style — these are dynamic values from the config, not tokens
// The bg hex values here are intentional repetitions of token values — acceptable
```

**Unit 4: OutcomesStrip semantics**
```tsx
// Use <dl> for outcomes — each metric is a definition list item
<dl className={styles.metrics}>
  {outcomeMetrics.map(m => (
    <div key={m.id} className={styles.metric}>
      <dt className={styles.value}>{m.value}</dt>
      <dd className={styles.context}>{m.context}</dd>
    </div>
  ))}
</dl>
```

**Unit 5: ProviderSearch state + useMemo**
```tsx
'use client'
import { useState, useMemo } from 'react'
import { filterProviders, getUniqueCities } from '@/lib/filterProviders'

// State: nameQuery, locationFilter (''), apptTypeFilter ('')
// useMemo: filterProviders(providers, nameQuery, locationFilter, apptTypeFilter)
// Renders: filter bar + result count (sr-only aria-live) + ProviderCard grid + empty state
```

**Unit 6: HeroSearch submit**
```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  document.getElementById('provider-section')?.scrollIntoView({ behavior: 'smooth' })
}
// The search query state is local — no server calls in this static build
// On submit, scroll to provider section where user can refine with filters
```

**Color contract — never violate:**
- `.primary { background: var(--color-blue); color: var(--color-white); }` — white on blue `#0468CD` = 5.56:1 ✓
- `.outlineWhite` — only used on blue or navy backgrounds
- No element uses `var(--color-blue)` as text color on white background where font-size < 18px (5.56:1 passes for text links but verify at each use)

---

## 7 — Gemini

**Project:** CareCompass — Cleveland Clinic-style hospital authority portal
**Stack:** Next.js 14 App Router · TypeScript strict · CSS Modules · No Tailwind · Static export

### Context

Cleveland Clinic's key UX innovation is **condition-first search**: users search by symptom or condition name ("chest pain", "diabetes"), not by specialty. Provider profiles are indexed by `conditionsTreated[]` not just specialty. This enables more direct patient journeys than the Apollo-style specialty dropdown or Practo-style dual text field.

The second key pattern is **outcomes as primary content**: a full-bleed `OutcomesStrip` section with navy background and 5 performance metrics is placed immediately below the hero, before any provider listings. This establishes institutional authority through data, not through text claims.

### Color palette (8 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-blue` | `#0468CD` | Buttons, links, active state, AppointmentBadge in-person |
| `--color-green` | `#006633` | Success, AppointmentBadge virtual |
| `--color-navy` | `#003087` | TopBar bg, OutcomesStrip bg, AppointmentBadge second-opinion |
| `--color-white` | `#FFFFFF` | Default bg, button text on color backgrounds |
| `--color-surface` | `#F5F7FA` | ConditionBrowser bg, HealthLibraryPreview bg |
| `--color-text` | `#1A1A1A` | Body copy, headings |
| `--color-border` | `#CBD5E1` | Card borders, nav border-bottom |
| `--color-muted` | `#64748B` | Metadata, review counts, secondary labels |

### WCAG compliance

| Combination | Ratio | Result |
|-------------|-------|--------|
| White on `#0468CD` (blue) | 5.56:1 | ✓ AA |
| White on `#006633` (green) | 7.31:1 | ✓ AA+AAA |
| White on `#003087` (navy) | ~12:1 | ✓✓ AAA |
| `#0468CD` on white | 5.56:1 | ✓ AA (links, large text) |

All button variants use white text — all pass. No contrast workarounds needed.

### Typography

Roboto via `next/font/google`. Weights: `['400', '700']` only.

```
H1: clamp(2rem, 4vw, 3rem) / 700 / --color-white (hero) or --color-text (sections)
H2: clamp(1.5rem, 2.5vw, 2.25rem) / 700 / --color-text
H3: 1.25rem / 700 / --color-text
Body: 1rem / 1.75 / --color-text
Small: 0.875rem / 400 / --color-muted
```

### Border-radius system

| Element | Radius |
|---------|--------|
| All buttons | `4px` |
| Provider cards | `6px` |
| Condition cards | `6px` |
| Health article cards | `6px` |
| Provider photos | `6px` (NOT 50%) |
| Appointment type pills | `20px` |
| Suggested condition pills (hero) | `20px` |
| Accepting status dot | `50%` (6×6px decorative) |

### Component client/server split

| Component | Type | Reason |
|-----------|------|--------|
| TopBar | Server | No interactivity |
| SiteNav | Server | No scroll listener (always visible) |
| HeroSearch | Client | Query state + form submit |
| OutcomesStrip | Server | Static data display |
| ConditionBrowser | Server | Static data display |
| ProviderSearch | Client | 3-way filter state + useMemo |
| ProviderCard | Server | Passed props, no state |
| HealthLibraryPreview | Server | Static data display |
| AppointmentBanner | Server | Static CTA section |
| Footer | Server | Static links |

### Provider filter logic

```typescript
// All three filters applied simultaneously via useMemo
const filtered = useMemo(() =>
  filterProviders(providers, nameQuery, locationFilter, apptTypeFilter),
  [nameQuery, locationFilter, apptTypeFilter]
)
// nameQuery matches: name, specialty, any item in conditionsTreated[]
// locationFilter matches: any item in locations[].city
// apptTypeFilter matches: any item in appointmentTypes[]
```

### Static export config

```typescript
// next.config.ts
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
```

---

## 8 — Cursor

**CareCompass — Cleveland Clinic-pattern Hospital Portal**

Open in Cursor. Scaffold with:
```bash
npx create-next-app@latest carecompass --typescript --no-tailwind --app --src-dir --import-alias "@/*"
npm install framer-motion lucide-react
```

**Architecture notes for Cursor AI:**

This build has **three novel patterns** vs standard clinic templates:

**Pattern 1 — Condition-first search**
The hero search input is a single `<input type="text">` that searches across provider name, specialty, AND `conditionsTreated[]`. This is NOT two fields (like Practo) and NOT dropdowns (like Apollo). The filter in `ProviderSearch` uses the same `conditionsTreated[]` array for matching.

**Pattern 2 — AppointmentType[] array**
Providers have `appointmentTypes: ('in-person' | 'virtual' | 'second-opinion')[]` — an array, not a scalar. A provider can offer any combination. Each type renders as a distinct colored pill badge. The CTA button logic:
```tsx
{provider.acceptingStatus !== 'not-accepting'
  ? <Button variant="primary" fullWidth>Request Appointment</Button>
  : <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
}
```

**Pattern 3 — OutcomesStrip as first-class section**
This is a full-bleed `<section>` with `background: var(--color-navy)`, placed between HeroSearch and ConditionBrowser. It renders 5 outcome metrics in a `<dl>` structure. It has NO border-radius and NO shadow — it spans edge to edge as a band.

**Key constraints:**
- Roboto 400+700 only (not Nunito, not Lato, not Inter)
- `border-radius: 6px` on cards (not 4px, not 8px)
- `border-radius: 4px` on buttons
- `border-radius: 20px` on appointment pills ONLY
- Provider photos: `border-radius: 6px` — NOT `50%`
- `box-shadow` ONLY on ProviderCard — all other cards are border-only
- TopBar, SiteNav, ProviderCard: no `'use client'`
- ProviderSearch, HeroSearch: `'use client'`
- All 8 CSS color tokens live in globals.css only — zero hex in `.module.css` files
- `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`
- Run `tsc --noEmit` after every file — keep TypeScript clean throughout

**File tree to implement:**
```
src/app/layout.tsx (Roboto font, globals import)
src/app/globals.css (8 tokens + sr-only + reduced-motion)
src/app/page.tsx (assembles all sections)
src/types/index.ts (AppointmentType, AcceptingStatus, Provider, Condition, OutcomeMetric, HealthArticle)
src/lib/data.ts (8 providers, 8 conditions, 5 metrics, 6 articles)
src/lib/filterProviders.ts (pure filter function + getUniqueCities helper)
src/components/layout/TopBar.tsx + .module.css
src/components/layout/SiteNav.tsx + .module.css
src/components/layout/Footer.tsx + .module.css
src/components/home/HeroSearch.tsx + .module.css
src/components/home/OutcomesStrip.tsx + .module.css
src/components/home/ConditionBrowser.tsx + .module.css
src/components/home/ProviderSearch.tsx + .module.css
src/components/home/ProviderCard.tsx + .module.css
src/components/home/HealthLibraryPreview.tsx + .module.css
src/components/home/AppointmentBanner.tsx + .module.css
src/components/ui/Button.tsx + .module.css
src/components/ui/AppointmentBadge.tsx + .module.css
src/components/ui/AcceptingBadge.tsx + .module.css
next.config.ts
```

Implement files in the order listed. Run `tsc --noEmit` after each logical group (types → data → components).
