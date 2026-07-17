# 07 — Guide
## Global Hospital Authority Portal · bw_clinic_03

---

## The Three Constraints — Why They Exist

### Constraint 1: Single-field condition search — the cognitive load argument

Apollo uses two `<select>` dropdowns: city and specialty. The patient must know both. Practo uses two `<input type="text">` fields: locality and keyword — better, but still forces the patient to think in two categories.

Cleveland Clinic's search accepts a single query that resolves against:
1. Provider name ("Dr. Nair")
2. Specialty ("Neurology")
3. `conditionsTreated[]` ("Multiple Sclerosis", "Migraine", "Neuromyelitis Optica")

The `filterProviders()` function applies all three matching rules simultaneously. A patient who types "nerve pain" might not know that falls under Neurology — but if a provider has "neuropathy" in their `conditionsTreated[]`, they still surface.

```typescript
// CORRECT — condition-first, single field, three match targets
const matchName      = p.name.toLowerCase().includes(q)
const matchSpecialty = p.specialty.toLowerCase().includes(q)
const matchCondition = p.conditionsTreated.some(c => c.toLowerCase().includes(q))
if (!matchName && !matchSpecialty && !matchCondition) return false

// WRONG — two separate fields
<input placeholder="Doctor name" />
<input placeholder="Specialty" />
// This forces the patient to know which field to type in. A patient who types
// "heart failure" in the "name" field gets zero results.
```

**If you add a second text input** — you've built Practo into Cleveland Clinic's UX. Remove it.

**If you add a specialty `<select>`** — you've built Apollo's booking widget into a search-first portal. Remove it.

---

### Constraint 2: `appointmentTypes: AppointmentType[]` — arrays vs scalars

| Build | Field | Type | Values |
|-------|-------|------|--------|
| Apollo | `videoConsult` | `boolean` | `true` / `false` |
| Practo | `consultMode` | `string` | `'clinic'` / `'video'` / `'both'` |
| Cleveland | `appointmentTypes` | `string[]` | any combination of 3 types |

The array model is correct for Cleveland Clinic because:

1. A provider may offer in-person + second-opinion but NOT virtual (Dr. Kim: `['in-person', 'second-opinion']`)
2. A provider may offer all three (Dr. Blackstone: `['in-person', 'virtual', 'second-opinion']`)
3. A provider may offer only in-person (Dr. Torres: `['in-person']`)

The scalar `consultMode` cannot represent "in-person + second-opinion without virtual" — it only has `'clinic' | 'video' | 'both'`. The boolean `videoConsult` can't represent second-opinion at all.

**Filtering:**
```typescript
// CORRECT — array membership check
if (apptType && !p.appointmentTypes.includes(apptType)) return false

// WRONG — scalar comparison (Practo pattern)
if (apptType === 'video' && p.consultMode !== 'video' && p.consultMode !== 'both') return false
```

**CTA rendering:**

The CTA button is NOT driven by `appointmentTypes` — it's driven by `acceptingStatus`. This is a key distinction:
- `appointmentTypes` → what kinds of appointments exist (shown as badges)
- `acceptingStatus` → whether the provider is currently booking new patients (drives the primary CTA)

```tsx
// CORRECT — CTA driven by acceptingStatus
{provider.acceptingStatus !== 'not-accepting' ? (
  <Button variant="primary" fullWidth>Request Appointment</Button>
) : (
  <Button variant="outlineBlue" fullWidth>Request Second Opinion</Button>
)}

// WRONG — trying to drive CTA from appointmentTypes
{provider.appointmentTypes.includes('in-person') && (
  <Button variant="primary">Book In-Person Visit</Button>
)}
{provider.appointmentTypes.includes('virtual') && (
  <Button variant="secondary">Book Virtual Visit</Button>
)}
// This creates 1-3 CTAs per card. Cleveland Clinic uses one primary CTA + badge indicators.
```

---

### Constraint 3: OutcomesStrip is a first-class section

In Apollo and Practo, statistics appear as sub-text in the hero ("20M+ Patients · 100K+ Doctors") — they are supporting copy, not a dedicated content area.

Cleveland Clinic inverts this: the `<OutcomesStrip>` section is a full-width navy band placed **immediately below the hero**. It precedes the condition browser, the provider directory, and every other section. It says: "Before you search, know who you're dealing with."

```
Page order (required):
1. TopBar
2. SiteNav
3. HeroSearch       ← search entry point
4. OutcomesStrip    ← institution proof (here, not in footer)
5. ConditionBrowser ← content navigation
6. ProviderSearch   ← directory
7. HealthLibraryPreview
8. AppointmentBanner
9. Footer
```

**Markup rule — `<dl>` not `<ul>`:**

Outcome metrics are definition list items — each metric is a term (value) with a definition (context). Using `<dl><dt><dd>` is semantically correct and supports screen readers that announce "definition list with N items":

```tsx
// CORRECT
<dl className={styles.metrics}>
  <div className={styles.metric}>
    <dt className={styles.value}>#1</dt>
    <dd className={styles.context}>US News & World Report</dd>
  </div>
  {/* ...4 more */}
</dl>

// WRONG — loses semantic relationship between value and label
<ul className={styles.metrics}>
  <li><span className={styles.value}>#1</span><span>US News</span></li>
</ul>
```

---

## Blue Contrast Math — Why White Text Works Here

Practo's cyan (#14BEF0) fails with white text (1.8:1). Apollo's gold (#FDB931) fails with white text (1.9:1). Cleveland Clinic's blue palette is different:

```
#0468CD (blue) background with white text:
R=4, G=104, B=205

Linear channel values (gamma 2.2 expansion):
  R_lin = (4/255)^2.2   ≈ 0.000215
  G_lin = (104/255)^2.2 ≈ 0.1329
  B_lin = (205/255)^2.2 ≈ 0.6038

Relative luminance:
  L(blue) = 0.2126 × 0.000215 + 0.7152 × 0.1329 + 0.0722 × 0.6038
           ≈ 0.0000457 + 0.09508 + 0.04359
           ≈ 0.1387

Contrast with white (L=1.0):
  Ratio = (1.0 + 0.05) / (0.1387 + 0.05)
         = 1.05 / 0.1887
         ≈ 5.56:1 ✓ AA (requires 4.5:1 for normal text)
```

```
#006633 (green) background with white text:
R=0, G=102, B=51

  G_lin = (102/255)^2.2 ≈ 0.1274
  B_lin = (51/255)^2.2  ≈ 0.03515

  L(green) = 0.2126×0 + 0.7152×0.1274 + 0.0722×0.03515
            ≈ 0.09111 + 0.002538 ≈ 0.09365

  Ratio = (1.05) / (0.09365 + 0.05) = 1.05 / 0.14365 ≈ 7.31:1 ✓ AA + AAA
```

```
#003087 (navy) background with white text:
R=0, G=48, B=135

  G_lin = (48/255)^2.2  ≈ 0.02807
  B_lin = (135/255)^2.2 ≈ 0.2422

  L(navy) = 0.2126×0 + 0.7152×0.02807 + 0.0722×0.2422
           ≈ 0.02008 + 0.01749 ≈ 0.03757

  Ratio = (1.05) / (0.03757 + 0.05) = 1.05 / 0.08757 ≈ 11.99:1 ✓✓ AAA
```

**Implication:** All three brand background colors support white text. No contrast workarounds needed (unlike Practo's navy-on-cyan or Apollo's no-gold-text rule). The `Button.primary` is correctly `color: var(--color-white)` — this is the opposite of Practo where it must be `color: var(--color-navy)`.

---

## AppointmentBadge — Why Hex in JS Config is Acceptable

The AppointmentBadge component uses inline `style={{ background: bg }}` where `bg` is a hex value from a JS config object. This is a documented exception:

```typescript
// CSS custom properties CANNOT be used in inline styles for background:
// This does NOT work:
style={{ background: 'var(--color-blue)' }}
// Because CSS custom properties are resolved by the CSS cascade, not inline styles
// (This would work for color: but background: requires the resolved value)

// The config values are hex strings:
const config = {
  'in-person':      { bg: '#0468CD' },  // same as --color-blue
  'virtual':        { bg: '#006633' },  // same as --color-green
  'second-opinion': { bg: '#003087' },  // same as --color-navy
}
```

Note: In modern browsers, CSS custom properties DO work in inline styles (`style={{ '--color': 'red', background: 'var(--color)' }}`). But the simpler pattern is hex strings in the JS config for badge backgrounds. Both approaches are acceptable — document whichever you use.

These hex values will NOT appear in `grep -r "#" src --include="*.module.css"` because they are in a `.tsx` file, not a `.module.css` file. The grep check remains clean.

---

## Radius Decisions — 4px vs 6px vs 20px

| Element | Radius | Why |
|---------|--------|-----|
| Buttons | `4px` | Clinical precision — buttons should feel decisive, not rounded |
| Cards | `6px` | Slightly warmer than 4px — cards hold patient information, benefit from approachability |
| Provider photos | `6px` | Matches card radius — photo is embedded in card, consistent with container |
| Appointment pills | `20px` | Maximum pill-ness — small, compact status indicators read as tags |
| Condition chips | `4px` | Small text chips in card — same as button radius |
| Accepting status dot | `50%` | It's a circle (6×6px) — `50%` makes it circular, this is correct here |

**The 4px vs 6px distinction matters:**
```css
/* ProviderCard — 6px */
.card { border-radius: 6px; }
.photo { border-radius: 6px; }

/* Button — 4px */
.btn { border-radius: 4px; }

/* ConditionBrowser card — also 6px */
.card { border-radius: 6px; }

/* AppointmentBadge — 20px */
.badge { border-radius: 20px; }
```

If you use `4px` everywhere (Apollo pattern for this build would be `8px`, Practo is `4px`), the cards feel too sharp. `6px` is deliberately warmer — Cleveland Clinic's brand is authoritative but not cold.

---

## 10 Most Common Mistakes

1. **Adding a second search field** — typing `<input>` × 2 in HeroSearch. This build has exactly one text input in the hero. Remove the second field.

2. **Using `consultMode` or `videoConsult`** — copying data model from Practo or Apollo. This build uses `appointmentTypes: AppointmentType[]`.

3. **Driving CTA from `appointmentTypes`** — rendering 2-3 CTA buttons per card based on which types are available. One CTA per card, driven by `acceptingStatus`.

4. **Photo radius 50%** — circular photos from Apollo. This build: `border-radius: 6px`.

5. **Card radius 4px** — using Practo's flat radius on cards. This build: `border-radius: 6px` on cards (buttons stay 4px).

6. **OutcomesStrip in wrong position** — placing metrics in hero sub-text or footer. OutcomesStrip is section #4 in page order, between hero and ConditionBrowser.

7. **`<ul>` in OutcomesStrip** — using a list instead of `<dl><dt><dd>` for outcome metrics.

8. **Shadow on all cards** — copying Apollo's shadow-heavy style. Only ProviderCard has `box-shadow`. ConditionBrowser and HealthLibrary cards are border-only.

9. **Navy text on primary button** — confusing this with Practo where `color: var(--color-navy)` is needed. Here `color: var(--color-white)` is correct (5.56:1 ✓).

10. **Lato or Nunito Sans font** — wrong build. This build uses Roboto (400 + 700 only via `next/font/google`).

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `/out` directory produced
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` returns empty
- [ ] `grep -r "rgba(" src --include="*.module.css"` returns 1 result (ProviderCard box-shadow)
- [ ] `grep -r "9999px" src` returns empty
- [ ] Roboto confirmed as only font (DevTools → Computed → font-family)

### Radius Audit
- [ ] Every button: `border-radius: 4px` in DevTools
- [ ] Every card (ConditionBrowser, HealthLibrary): `border-radius: 6px`
- [ ] ProviderCard: `border-radius: 6px`
- [ ] Provider photos: `border-radius: 6px` — NOT `50%`
- [ ] AppointmentBadge pills: `border-radius: 20px`
- [ ] Suggestion pills (hero): `border-radius: 20px`
- [ ] `grep -r "border-radius: 50%" src/components` returns empty

### Contrast Audit
- [ ] Primary button computed `color` = white `rgb(255,255,255)` (NOT navy)
- [ ] "Schedule Now" button in SiteNav: white text on blue
- [ ] OutcomesStrip: white text on navy (`rgb(0,48,135)`)
- [ ] AppointmentBadge in-person: white on blue ✓
- [ ] AppointmentBadge virtual: white on green ✓
- [ ] AppointmentBadge second-opinion: white on navy ✓
- [ ] Footer links on hover: blue on navy = 5.56:1 ✓
- [ ] AppointmentBanner: white text on blue ✓

### Shadow Audit
- [ ] `grep -r "box-shadow" src/components --include="*.module.css"` returns exactly 1 result (ProviderCard)
- [ ] ConditionBrowser cards: no shadow in DevTools
- [ ] HealthLibrary cards: no shadow
- [ ] TopBar: no shadow (dark bg provides separation)
- [ ] SiteNav: border-bottom only (no shadow)
- [ ] AppointmentBanner: no shadow

### TopBar
- [ ] Navy bg (`rgb(0,48,135)`)
- [ ] Height: 40px
- [ ] Phone: `<a href="tel:8002232273">800.223.2273</a>` — left side
- [ ] "MyChart Login" link — right side
- [ ] "Need Help?" link — right side
- [ ] No `'use client'` in TopBar.tsx

### SiteNav
- [ ] White bg, sticky, `z-index: 100`
- [ ] "CareCompass" logo: blue text
- [ ] 4 nav links: Find a Provider / Health Library / Conditions / Appointments
- [ ] "Schedule Now" button: primary variant, white text
- [ ] No `'use client'` in SiteNav.tsx
- [ ] No emergency link
- [ ] No NABH/JCI

### Hero + Search
- [ ] Exactly 1 `<input type="text">` in HeroSearch
- [ ] `<label className="sr-only">` for the input with matching `htmlFor`
- [ ] Gradient background: navy to blue
- [ ] 4 suggestion condition pills: `border-radius: 20px`
- [ ] Submit scrolls to `id="provider-section"`

### OutcomesStrip
- [ ] Placed between HeroSearch and ConditionBrowser in page
- [ ] Navy bg — full-bleed
- [ ] No `border-radius` on the section
- [ ] `<dl>` element confirmed in DevTools Elements
- [ ] All 5 metrics visible: #1, 35,000+, 1,800+, 300+, 6.2M+

### Condition Browser
- [ ] 8 condition category cards visible
- [ ] Surface bg (`rgb(245,247,250)`)
- [ ] Cards: `border-radius: 6px`, border-only, no shadow
- [ ] Lucide icons present (not emoji)
- [ ] Article counts shown on each card

### Provider Directory
- [ ] Filter bar: text input + location select + appointment type select
- [ ] All 3 filters work simultaneously
- [ ] ARIA live region (`aria-live="polite"`) in DOM
- [ ] Empty state shown for 0 results
- [ ] Section has `id="provider-section"`
- [ ] Dr. Blackstone: 3 appointment badges
- [ ] Dr. Torres: 1 appointment badge (in-person)
- [ ] Dr. Kim: "Request Second Opinion" CTA (not-accepting)
- [ ] Dr. Blackstone: "Request Appointment" CTA (accepting)
- [ ] No `'use client'` in ProviderCard.tsx

### Provider Card Details
- [ ] Photos: `border-radius: 6px` confirmed
- [ ] In-person badge: blue bg
- [ ] Virtual badge: green bg
- [ ] Second-opinion badge: navy bg
- [ ] All badges: `border-radius: 20px`
- [ ] AcceptingBadge shown on each card
- [ ] Rating star: amber fill
- [ ] Conditions treated: up to 3 chips shown

### Footer + Other Sections
- [ ] Footer: navy bg
- [ ] Footer links: hover to blue (not white, not cyan)
- [ ] HealthLibraryPreview: 6 articles, surface bg, border-only cards
- [ ] AppointmentBanner: blue bg, white text, 2 CTAs

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] All `<input>` and `<select>` elements have `<label>`
- [ ] All `<img>` elements have non-empty `alt`
- [ ] `prefers-reduced-motion` disables Framer Motion
- [ ] No serif font anywhere in UI
- [ ] No Lato, Nunito Sans, or Inter loaded
