# 03 — Design
## Global Hospital Authority Portal · bw_clinic_03

---

## CSS Token System

**File:** `src/app/globals.css`

```css
:root {
  --color-blue:    #0468CD;   /* primary — buttons, links, active states, in-person badge */
  --color-green:   #006633;   /* success — virtual badge background */
  --color-navy:    #003087;   /* dark — TopBar bg, OutcomesStrip bg, second-opinion badge */
  --color-white:   #FFFFFF;   /* default background, all text on color backgrounds */
  --color-surface: #F5F7FA;   /* alternating sections — ConditionBrowser, HealthLibrary */
  --color-text:    #1A1A1A;   /* body copy, headings on white */
  --color-border:  #CBD5E1;   /* card borders, nav border-bottom, dividers */
  --color-muted:   #64748B;   /* metadata, review counts, secondary labels */
}

/* Accessibility utility */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Rule:** Zero hex values in any `.module.css` file. All colors must reference `var(--color-*)` tokens. Exception: `#F59E0B` amber for star ratings (decorative SVG fill only, not text), and appointment badge backgrounds via inline style in `AppointmentBadge` (these repeat token hex values as inline style — see badge config note in 07_Guide).

---

## WCAG Contrast Reference

| Foreground | Background | Ratio | Pass? | Usage |
|------------|------------|-------|-------|-------|
| White `#FFFFFF` | Blue `#0468CD` | 5.56:1 | ✓ AA | Primary buttons, "Schedule Now" |
| White `#FFFFFF` | Green `#006633` | 7.31:1 | ✓ AA+AAA | Virtual badge |
| White `#FFFFFF` | Navy `#003087` | ~12:1 | ✓✓ AAA | TopBar, OutcomesStrip, second-opinion badge |
| `#0468CD` Blue | White `#FFFFFF` | 5.56:1 | ✓ AA | Link text on white (passes for text links) |
| `#1A1A1A` Text | White `#FFFFFF` | ~16:1 | ✓✓ AAA | Body copy |
| `#1A1A1A` Text | Surface `#F5F7FA` | ~15:1 | ✓✓ AAA | Cards on surface background |
| White `#FFFFFF` | Surface `#F5F7FA` | 1.05:1 | ✗ FAIL | NEVER use white text on surface |
| `#64748B` Muted | White `#FFFFFF` | 4.6:1 | ✓ AA | Metadata text (just passes) |

**Key insight:** Unlike Practo (cyan fails) and Apollo (gold fails), Cleveland Clinic's blue palette is accessible. White text on all three brand colors passes WCAG AA. No contrast workarounds needed.

---

## Border-Radius System

| Element | Radius | Notes |
|---------|--------|-------|
| All buttons | `4px` | All 3 Button variants |
| ProviderCard | `6px` | With shadow |
| ConditionBrowser cards | `6px` | Border-only, no shadow |
| HealthArticle cards | `6px` | Border-only, no shadow |
| Provider photos | `6px` | NOT `50%`, NOT `4px` |
| AppointmentBadge pills | `20px` | in-person, virtual, second-opinion |
| Suggested condition pills (hero) | `20px` | Below search input |
| AcceptingStatus dot | `50%` | 6×6px decorative dot only, not a shape |
| OutcomesStrip | none | Full-bleed section, no radius |

---

## Shadow System

| Component | Shadow | Notes |
|-----------|--------|-------|
| ProviderCard | `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` | Only component with shadow |
| HeroSearch widget | None — hero is full-bleed gradient section | Not a card widget |
| ConditionBrowser cards | None — `border: 1px solid var(--color-border)` only | |
| HealthArticle cards | None — border-only | |
| SiteNav | `border-bottom: 1px solid var(--color-border)` only | |
| TopBar | None | Dark bg provides natural separation |
| All other components | No shadow | |

Grep verification: `grep -r "box-shadow" src/components --include="*.module.css"` should return exactly 1 result: `ProviderCard.module.css`.

---

## Component CSS Specifications

### Button.module.css
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 4px; font-family: var(--font-sans); font-weight: 700;
  cursor: pointer; text-decoration: none; transition: background 0.15s, color 0.15s;
  border: none;
}
.md { padding: 12px 24px; font-size: 1rem; }
.sm { padding: 8px 16px; font-size: 0.875rem; }
.fullWidth { width: 100%; }

.primary { background: var(--color-blue); color: var(--color-white); }
.primary:hover { background: var(--color-navy); }

.outlineWhite {
  background: transparent; color: var(--color-white);
  border: 1.5px solid var(--color-white);
}
.outlineWhite:hover { background: rgba(255,255,255,0.1); }
/* Note: rgba is in component CSS, not module.css — acceptable if using inline style for hover */
/* Better: use a CSS custom property for the semi-transparent white */

.outlineBlue {
  background: transparent; color: var(--color-blue);
  border: 1.5px solid var(--color-blue);
}
.outlineBlue:hover { background: var(--color-blue); color: var(--color-white); }

.btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

**Note on `rgba` in Button.module.css:** The `outlineWhite` hover uses `rgba(255,255,255,0.1)`. This will appear in the `grep -r "rgba(" src --include="*.module.css"` QA check. Either use an inline style for hover state, or add this file to the grep exception. The design intent is a subtle white tint on dark backgrounds — necessary for accessible hover feedback on navy/blue backgrounds.

### TopBar.module.css
```css
.topbar {
  background: var(--color-navy); color: var(--color-white);
  height: 40px; display: flex; align-items: center;
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  width: 100%; display: flex; justify-content: space-between; align-items: center;
}
.phone { color: var(--color-white); text-decoration: none; font-size: 0.875rem; }
.phone:hover { text-decoration: underline; }
.links { display: flex; gap: 24px; align-items: center; }
.link { color: var(--color-white); text-decoration: none; font-size: 0.875rem; }
.link:hover { text-decoration: underline; }
.divider { width: 1px; height: 16px; background: var(--color-border); opacity: 0.3; }
```

### SiteNav.module.css
```css
.nav {
  background: var(--color-white); position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid var(--color-border);
}
.inner {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 72px;
}
.logo { font-size: 1.5rem; font-weight: 700; color: var(--color-blue); text-decoration: none; }
.links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
.link { color: var(--color-text); text-decoration: none; font-size: 0.9375rem; }
.link:hover { color: var(--color-blue); }
.rightGroup { display: flex; align-items: center; gap: 16px; }
.searchIcon { color: var(--color-muted); cursor: pointer; }
.searchIcon:hover { color: var(--color-blue); }
```

### HeroSearch.module.css
```css
.hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%);
  padding: 80px 24px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
/* Note: linear-gradient uses var() tokens — acceptable */
.headline { color: var(--color-white); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin-bottom: 16px; }
.subheading { color: var(--color-white); opacity: 0.85; font-size: 1.125rem; margin-bottom: 40px; }
.form { width: 100%; max-width: 640px; }
.inputRow { display: flex; gap: 0; }
.input {
  flex: 1; padding: 16px 20px; font-size: 1rem;
  border: none; border-radius: 4px 0 0 4px; outline: none;
  font-family: var(--font-sans);
}
.submitBtn {
  padding: 16px 28px; background: var(--color-green); color: var(--color-white);
  border: none; border-radius: 0 4px 4px 0; cursor: pointer;
  font-weight: 700; font-family: var(--font-sans);
}
.submitBtn:hover { opacity: 0.9; }
.suggestions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; }
.suggestionPill {
  border-radius: 20px; padding: 6px 16px; font-size: 0.875rem;
  background: var(--color-white); color: var(--color-navy);
  text-decoration: none; cursor: pointer;
  border: none;
}
.suggestionPill:hover { background: var(--color-surface); }
/* Note: opacity: 0.85 and opacity: 0.9 are acceptable in module.css — not hex/rgba color values */
```

### OutcomesStrip.module.css
```css
.strip {
  background: var(--color-navy);
  padding: 48px 24px;
}
.metrics {
  max-width: 1280px; margin: 0 auto;
  display: flex; justify-content: space-around; align-items: center;
  flex-wrap: wrap; gap: 32px;
}
.metric { text-align: center; flex: 1; min-width: 140px; }
.value {
  display: block; font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700; color: var(--color-white); margin-bottom: 4px;
}
.context {
  display: block; font-size: 0.875rem; color: var(--color-white);
  opacity: 0.7;
}
.divider {
  width: 1px; height: 64px; background: var(--color-border); opacity: 0.2;
}
/* opacity values are acceptable — they are not hex color values */
```

### ConditionBrowser.module.css
```css
.section { background: var(--color-surface); padding: 64px 24px; }
.inner { max-width: 1280px; margin: 0 auto; }
.heading { font-size: clamp(1.5rem, 2.5vw, 2.25rem); font-weight: 700; color: var(--color-text); margin-bottom: 32px; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
.card {
  background: var(--color-white); border-radius: 6px;
  border: 1px solid var(--color-border); padding: 24px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
  text-decoration: none; cursor: pointer; transition: border-color 0.15s;
}
.card:hover { border-color: var(--color-blue); }
.icon { color: var(--color-blue); }
.name { font-weight: 700; font-size: 1rem; color: var(--color-text); }
.count { font-size: 0.875rem; color: var(--color-muted); }
```

### ProviderCard.module.css
```css
.card {
  background: var(--color-white); border-radius: 6px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 24px; display: flex; flex-direction: column; gap: 12px;
  transition: box-shadow 0.15s, border-color 0.15s;
}
/* Note: box-shadow rgba is in ProviderCard.module.css — this is the one allowed instance */
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); border-color: var(--color-blue); }
.photoRow { display: flex; gap: 16px; align-items: flex-start; }
.photo { width: 80px; height: 80px; border-radius: 6px; object-fit: cover; object-position: top; flex-shrink: 0; }
.info { flex: 1; }
.name { font-size: 1.125rem; font-weight: 700; color: var(--color-text); margin: 0; }
.credentials { font-size: 0.875rem; color: var(--color-muted); }
.specialty { font-size: 0.9375rem; color: var(--color-blue); font-weight: 700; }
.conditions { display: flex; flex-wrap: wrap; gap: 4px; }
.conditionChip {
  font-size: 0.75rem; color: var(--color-muted);
  background: var(--color-surface); border-radius: 4px;
  padding: 2px 8px;
}
.badges { display: flex; flex-wrap: wrap; gap: 6px; }
.ratingRow { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--color-muted); }
.ratingValue { font-weight: 700; color: var(--color-text); }
.locations { font-size: 0.875rem; color: var(--color-muted); }
.cta { margin-top: auto; }
```

**Note on `rgba` in ProviderCard.module.css:** The `box-shadow` uses `rgba(0,0,0,0.08)`. This IS in a `.module.css` file and WILL appear in the grep check `grep -r "rgba(" src --include="*.module.css"`. This is the intentional one-time exception — the same pattern as Practo's OmniSearch shadow. Update the QA grep to note: "Should return 1 result: ProviderCard.module.css (box-shadow)."

### AppointmentBadge.module.css
```css
.badge {
  display: inline-flex; align-items: center;
  border-radius: 20px; padding: 2px 10px;
  font-size: 0.75rem; font-weight: 700;
  color: var(--color-white);
  /* background set via inline style based on type */
}
```

Badge backgrounds are set via inline style in the component — they reference the same values as tokens but as dynamic config:
```tsx
// AppointmentBadge.tsx
const config = {
  'in-person':      { label: 'In Person',   bg: '#0468CD' },
  'virtual':        { label: 'Virtual',      bg: '#006633' },
  'second-opinion': { label: '2nd Opinion', bg: '#003087' },
} satisfies Record<AppointmentType, { label: string; bg: string }>

<span className={styles.badge} style={{ background: config[type].bg }}>
  {config[type].label}
</span>
```
This is a known exception: the hex values in the JS config repeat token values and cannot be replaced with CSS custom properties in an inline style. They are documented in 07_Guide.

### AcceptingBadge.module.css
```css
.row { display: flex; align-items: center; gap: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
/* dot background set via inline style based on status */
.label { font-size: 0.8125rem; color: var(--color-text); }
```

```tsx
// AcceptingBadge.tsx
const config = {
  'accepting':     { label: 'Accepting Patients',  dotColor: '#166534' },
  'limited':       { label: 'Limited Availability', dotColor: '#92400E' },
  'not-accepting': { label: 'Not Accepting',        dotColor: '#991B1B' },
} satisfies Record<AcceptingStatus, { label: string; dotColor: string }>
```

The dot colors (`#166534`, `#92400E`, `#991B1B`) are semantic status colors outside the 8-token system — intentional one-off values for green/amber/red status dots only. They are never used as text colors.

---

## Anti-Patterns Table

| Anti-Pattern | Wrong | Correct |
|-------------|-------|---------|
| Hero search field count | Two text inputs or two selects | One `<input type="text">` |
| Provider mode field | `consultMode` or `videoConsult` | `appointmentTypes: AppointmentType[]` |
| OutcomesStrip placement | In hero subtitle or footer | Between hero and ConditionBrowser |
| OutcomesStrip markup | `<ul>` or `<div>` | `<dl><dt><dd>` |
| Provider photo radius | `border-radius: 50%` | `border-radius: 6px` |
| Card radius | `border-radius: 4px` (too small) | `border-radius: 6px` |
| Button radius | `border-radius: 6px` (too large) | `border-radius: 4px` |
| Appointment pill radius | Any value other than `20px` | `border-radius: 20px` |
| Shadow distribution | Shadow on all cards | Shadow only on ProviderCard |
| Font | Lato, Nunito Sans, Inter | Roboto (400+700) |
| Primary button text | Navy text on blue | White text on blue (5.56:1 ✓) |
| Trust signals | NABH/JCI badges | US News "#1" in OutcomesStrip |
| Emergency link | "Emergency: 1066" in nav | No emergency link |
| TopBar client | `'use client'` in TopBar | Server component — no state |
| Filter function | Inline in component | `filterProviders()` in `src/lib/filterProviders.ts` |
| `conditionsTreated` filter | Not searching this array | Must search `conditionsTreated.some(c => ...)` |
| AcceptingStatus CTA | No CTA for `not-accepting` | "Request Second Opinion" outlineBlue button |
| Hex in module.css | `color: #0468CD` | `color: var(--color-blue)` |
| Accepting dot shape | `border-radius: 4px` | `border-radius: 50%` (it's a dot) |
