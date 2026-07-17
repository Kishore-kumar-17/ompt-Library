# 05 — Epics and Stories
## Global Hospital Authority Portal · bw_clinic_03
### CareCompass · US Hospital · Blue + Navy · Roboto · 4px/6px/20px Radius Vocabulary

---

## Epic 1 — Design System Foundation

**Goal:** 8-token colour system, Roboto 400/700 only, 4px buttons / 6px cards / 20px pills, static export config, and TypeScript strict mode.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` returns empty. No rgba in module files. |
| 1.2 | Roboto 400 + 700 only | `next/font/google` with `weight: ['400', '700']` only. No 600, no 900. Computed font-family shows Roboto in DevTools. |
| 1.3 | Button — 4px, 3 variants | `primary` (blue bg, white text), `outlineWhite` (transparent, white border+text), `outlineBlue` (transparent, blue border+text). DevTools: `border-radius: 4px` on all. |
| 1.4 | Primary button — white text | DevTools computed `color` on `.primary` button = `rgb(255,255,255)`. NOT navy. NOT dark. |
| 1.5 | TypeScript types | `Provider`, `Condition`, `AppointmentType`, `AcceptingStatus`, `HealthArticle` defined. All union types for enums. `tsc --noEmit` exits 0. |
| 1.6 | Static export config | `next.config.ts`: `{ output: 'export', images: { unoptimized: true } }`. `npm run build` produces `/out` directory. |
| 1.7 | Radius vocabulary | Buttons = 4px. Cards = 6px. Pills/badges = 20px. No other values permitted. `grep -r "border-radius: 8px\|border-radius: 12px\|border-radius: 50%" src/components` → empty. |

---

## Epic 2 — Navigation

**Goal:** Dual-layer navigation — TopBar (navy) + SiteNav (white). Both server components. No scroll state.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | TopBar — navy, 40px | `background: rgb(0,48,135)` (navy) in DevTools. Height 40px. No `'use client'` in `TopBar.tsx`. |
| 2.2 | TopBar — phone link | `<a href="tel:8002232273">800.223.2273</a>` present. White text. Left-aligned. `aria-label="Call us at 800-223-2273"`. |
| 2.3 | TopBar — utility links | "MyChart Login" and "Need Help?" links visible, right-aligned, white text. Renders as `<Link>` components. |
| 2.4 | SiteNav — white, sticky | `background-color: rgb(255,255,255)`, `position: sticky`, `top: 40px` (below TopBar). `border-bottom: 1px solid var(--color-border)`. No shadow. |
| 2.5 | SiteNav — logo colour | "CareCompass" logo link: computed `color = var(--color-blue)` (`rgb(4,104,205)`). |
| 2.6 | SiteNav — nav links | "Find a Provider", "Health Library", "Conditions", "Appointments" all present. Hover: `color: var(--color-blue)`. |
| 2.7 | SiteNav — Schedule Now | "Schedule Now": `primary` variant, `border-radius: 4px`, white text, blue bg. Positioned right side. |
| 2.8 | No emergency link | `grep -r "Emergency\|#DC2626\|1066" src/components/layout` → empty. US hospital — different emergency UX. |
| 2.9 | No NABH/JCI | `grep -r "NABH\|JCI" src` → empty. US hospital uses US accreditations if any. |

---

## Epic 3 — Hero + Search

**Goal:** Single-input search (not two inputs or a select), gradient background, condition suggestion pills.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | Single search input | Exactly one `<input type="text" id="condition-search">` in HeroSearch form. DevTools confirms `input[type="text"]` count = 1. NOT two inputs. NOT `<select>`. |
| 3.2 | Search input label | `<label htmlFor="condition-search" className="sr-only">` present. Matches input `id` exactly. |
| 3.3 | Hero gradient background | `background: linear-gradient(135deg, rgb(0,48,135), rgb(4,104,205))` (navy → blue). No solid colour background on hero. |
| 3.4 | Suggestion pills | 4 condition pills below input: `border-radius: 20px`, white background, navy text. `["Heart Disease","Cancer Care","Orthopedics","Neurology"]` or equivalent. |
| 3.5 | Submit scrolls to directory | "Search" click: smooth scroll to `id="provider-section"`. Section anchor exists in DOM. |
| 3.6 | Hero white text | Headline: Roboto 700, white. Subheading: white. Contrast on gradient background ≥ 4.5:1. |
| 3.7 | Submit button — green | Form submit: `background: var(--color-green)`, white text. Green on white = 7.31:1 ✓. `border-radius: 4px`. |

---

## Epic 4 — Outcomes Strip

**Goal:** Full-bleed navy strip with 5 metrics in `<dl>` semantic structure. Server component.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | Navy background | `background: rgb(0,48,135)` (navy) in DevTools. Full-bleed (no max-width constraint on the strip itself). |
| 4.2 | No border-radius | OutcomesStrip section: `border-radius: 0` — confirmed in DevTools. No rounding. |
| 4.3 | `<dl>` semantics | DevTools Elements: `<dl>` with 5 `<div>` children, each `<div><dt>{metric}</dt><dd>{label}</dd></div>`. NOT `<ul>`. NOT bare `<div>` with `<p>` children. |
| 4.4 | 5 metrics present | "#1 in Patient Satisfaction", "35,000+ Providers", "1,800+ Specialties", "300+ Locations", "6.2M+ Patients Served" — all 5 visible. |
| 4.5 | White text | All metric values: `color: rgb(255,255,255)` on navy = ~12:1 ✓. Confirmed in DevTools. |
| 4.6 | Server component | No `'use client'` in `OutcomesStrip.tsx`. `grep "'use client'" src/components/sections/OutcomesStrip.tsx` → empty. |

---

## Epic 5 — Condition Browser

**Goal:** 8 condition categories as a server-rendered grid. 6px radius, border only, no shadow.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | 8 condition categories | "Heart & Vascular", "Cancer Care", "Brain & Spine", "Digestive Health", "Bones & Joints", "Lung & Breathing", "Kidney & Urinary", "Diabetes & Thyroid" — all 8 visible. |
| 5.2 | Surface section background | Section `background: rgb(245,247,250)` (surface). NOT white. |
| 5.3 | Card radius 6px | `border-radius: 6px` in DevTools on every condition card. NOT 4px. NOT 8px. |
| 5.4 | Border only — no shadow | Condition cards: `border: 1px solid var(--color-border)`. No `box-shadow` in DevTools. |
| 5.5 | Lucide icons in blue | Each card: Lucide icon with `color: var(--color-blue)`. NOT emoji. |
| 5.6 | Article counts | Each card: `"{articleCount} articles"` in `var(--color-muted)`. TypeScript: `Condition.articleCount: number`. |
| 5.7 | Hover border blue | Card `:hover` → `border-color: var(--color-blue)`. CSS-only transition. |
| 5.8 | TypeScript: Condition | `Condition = { name: string; icon: LucideIcon; articleCount: number; slug: string }` |

---

## Epic 6 — Provider Directory

**Goal:** Three-filter system with simultaneous filtering via useMemo. ARIA live region. Section anchor for hero scroll target.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | Filter: text query | Text `<input>` filters simultaneously on `provider.name`, `provider.specialty`, and `provider.conditionsTreated[]`. Searching "heart failure" returns Dr. Blackstone. |
| 6.2 | Filter: location | Location `<select>` filters by `provider.city`. Selecting "Weston" → Dr. Torres only in results. |
| 6.3 | Filter: appointment type | Appointment type `<select>` filters by `provider.appointmentTypes[]` membership. "Virtual" selected → Dr. Torres excluded (in-person only). |
| 6.4 | Simultaneous filtering | `const filtered = useMemo(() => providers.filter(...), [query, location, apptType])`. Changing one filter while others active works correctly. |
| 6.5 | ARIA live region | `<p className="sr-only" aria-live="polite">` announces `"{n} provider{s} found"` on filter change. |
| 6.6 | Empty state | `filtered.length === 0` → "No providers match your search" message rendered. Not blank. |
| 6.7 | Section anchor | Section has `id="provider-section"`. HeroSearch submit scrolls here. |
| 6.8 | TypeScript: Provider | `Provider = { name: string; specialty: string; city: string; appointmentTypes: AppointmentType[]; conditionsTreated: string[]; accepting: AcceptingStatus; rating: number; reviewCount: number; photoUrl: string }` |

---

## Epic 7 — Provider Cards

**Goal:** Server-rendered cards with three-type appointment badges, three accepting states, and conditional CTAs.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | Photo radius 6px | Provider photos: `border-radius: 6px` in DevTools. NOT `50%`. NOT `4px`. |
| 7.2 | Photo crop | `object-fit: cover; object-position: top` — face visible in 80×80px frame. |
| 7.3 | AppointmentBadge — in-person | `background: rgb(4,104,205)` (blue), white text, `border-radius: 20px`. |
| 7.4 | AppointmentBadge — virtual | `background: rgb(0,102,51)` (green), white text, `border-radius: 20px`. |
| 7.5 | AppointmentBadge — second-opinion | `background: rgb(0,48,135)` (navy), white text, `border-radius: 20px`. |
| 7.6 | Badge array rendering | Dr. Blackstone: 3 badges. Dr. Torres: 1 badge (in-person). Dr. Kim: 2 badges (in-person, second-opinion). DOM badge count verified per doctor. |
| 7.7 | AcceptingBadge | `'accepting'` → green dot "Accepting Patients". `'limited'` → amber dot "Limited Availability". `'not-accepting'` → red dot "Not Accepting". TypeScript: `type AcceptingStatus = 'accepting' \| 'limited' \| 'not-accepting'`. |
| 7.8 | CTA — accepting | Dr. Blackstone (`accepting`): "Request Appointment" primary button rendered. |
| 7.9 | CTA — not-accepting | Dr. Kim (`not-accepting`): "Request Second Opinion" `outlineBlue` button rendered. "Request Appointment" absent from DOM. |
| 7.10 | Rating display | Amber Lucide `Star` + `{rating}` value + `"({reviewCount} reviews)"` text. `aria-label="{rating} out of 5 stars"`. |
| 7.11 | Conditions treated chips | Up to 3 `conditionsTreated` values as `border-radius: 20px` chips. All sourced from `provider.conditionsTreated[]`. |
| 7.12 | Card shadow | `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` visible in DevTools on ProviderCard. |
| 7.13 | Server component | No `'use client'` in `ProviderCard.tsx`. `ProviderDirectory.tsx` has `'use client'`. |

---

## Epic 8 — Supporting Sections

**Goal:** Health library preview, appointment banner, and footer. All style-consistent with the platform.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | HealthLibraryPreview — 6 articles | All 6 articles visible with: category chip (`border-radius: 20px`), title `<h3>`, read time. Sourced from `HEALTH_ARTICLES` const. |
| 8.2 | HealthLibrary — surface bg | Section `background: var(--color-surface)`. |
| 8.3 | HealthLibrary — border-only cards | Article cards: no `box-shadow`. `border-radius: 6px`. `border: 1px solid var(--color-border)`. |
| 8.4 | AppointmentBanner — blue bg | Section `background: var(--color-blue)` (`rgb(4,104,205)`). |
| 8.5 | AppointmentBanner — white text | Headline and subtext white. Contrast vs blue = 5.56:1 ✓. |
| 8.6 | AppointmentBanner — two CTAs | Phone `<a href="tel:...">` AND "Schedule Online" `<Link>` both present and functional. |
| 8.7 | Footer — navy bg | `background: var(--color-navy)` (`rgb(0,48,135)`). |
| 8.8 | Footer — 4 columns | Grid with 4 columns. Collapses on mobile (≤768px). |
| 8.9 | Footer links hover — blue | Links: `:hover { color: var(--color-blue) }`. Blue on navy = 5.56:1 ✓. |

---

## Epic 9 — QA and Performance

**Goal:** Platform-specific guards that differentiate this build from other clinic variants.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 9.1 | TypeScript clean | `tsc --noEmit` exits 0. Zero errors. Zero warnings. |
| 9.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced. No `next export` deprecation warnings. |
| 9.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 9.4 | No hex in module.css | `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.module.css"` → empty. |
| 9.5 | rgba only in ProviderCard | `grep -r "rgba(" src --include="*.module.css"` → exactly 1 result (`ProviderCard.module.css` box-shadow). |
| 9.6 | No 50% on photos | `grep -r "border-radius: 50%" src/components` → empty (all photos are 6px rect). |
| 9.7 | No 9999px | `grep -r "9999px" src` → empty. |
| 9.8 | Shadow only on ProviderCard | `grep -r "box-shadow" src/components --include="*.module.css"` → exactly 1 result. |
| 9.9 | Roboto only | Computed font-family = Roboto on all elements. `grep -r "Lato\|Nunito\|Inter" src` → empty. |
| 9.10 | All inputs labeled | All `<input>` and `<select>` have `<label>` with matching `htmlFor`. `axe-core` passes "label" rule. |
| 9.11 | All images alt-tagged | All `<img>` have non-empty `alt`. `grep -r 'alt=""' src/components/ProviderCard` → empty (providers must have descriptive alt). |
| 9.12 | Reduced motion | `prefers-reduced-motion: reduce` disables Framer Motion transitions. |
| 9.13 | No emergency link | `grep -r "Emergency\|emergency" src/components/layout` → empty. |
| 9.14 | No NABH/JCI | `grep -r "NABH\|JCI" src` → empty. |
