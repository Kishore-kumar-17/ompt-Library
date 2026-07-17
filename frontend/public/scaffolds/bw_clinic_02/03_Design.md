# 03 — Design
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## `globals.css` — Exactly 8 Tokens

```css
:root {
  --color-cyan:    #14BEF0;
  --color-navy:    #28328C;
  --color-green:   #30AC4A;
  --color-surface: #F0F0F5;
  --color-text:    #414146;
  --color-muted:   #787887;
  --color-border:  #DFDFE5;
  --color-white:   #FFFFFF;

  --font-sans: 'Lato', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

body { background: var(--color-white); }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0;
  margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## `Button.module.css`

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 4px;       /* FLAT — the defining constraint */
  font-family: var(--font-sans);
  font-weight: 700;
  cursor: pointer;
  transition: background 180ms ease, opacity 180ms ease;
  text-decoration: none;
  white-space: nowrap;
  border: none;
}

.md { height: 44px; padding: 0 20px; font-size: 0.9375rem; }
.sm { height: 34px; padding: 0 14px; font-size: 0.875rem; }

/* Primary — cyan bg, navy text (NEVER white) */
.primary {
  background: var(--color-cyan);
  color: var(--color-navy);      /* ← navy on cyan = 6.4:1 AA */
  border: none;
}
.primary:hover { opacity: 0.88; }

/* Secondary — navy bg, white text */
.secondary {
  background: var(--color-navy);
  color: var(--color-white);
  border: none;
}
.secondary:hover { opacity: 0.88; }

/* Outline — cyan border, cyan text, transparent bg */
.outline {
  background: transparent;
  color: var(--color-cyan);
  border: 1.5px solid var(--color-cyan);
}
/* Note: cyan text on white = 1.8:1 FAILS. Use outline buttons ONLY on surface/colored bg */
/* On white bg: use secondary (navy) outline variant instead */
.outlineNavy {
  background: transparent;
  color: var(--color-navy);
  border: 1.5px solid var(--color-navy);
}
.outlineNavy:hover { background: var(--color-navy); color: var(--color-white); }

.fullWidth { width: 100%; }
.btn:disabled { opacity: 0.35; cursor: not-allowed; }
.btn:focus-visible { outline: 3px solid var(--color-cyan); outline-offset: 2px; }
```

---

## `StickyNav.module.css`

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 74px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-cyan);
  text-decoration: none;
  flex-shrink: 0;
}

.links {
  display: flex;
  gap: 28px;
  flex: 1;
  justify-content: center;
  list-style: none;
}

.link {
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--color-text);
  text-decoration: none;
  transition: color 150ms ease;
}
.link:hover { color: var(--color-cyan); }

.rightGroup {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.forDoctors {
  font-size: 0.9375rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 150ms ease;
}
.forDoctors:hover { color: var(--color-text); }

/* Login button: navy outline on white = accessible */
.loginBtn {
  height: 38px;
  padding: 0 18px;
  background: transparent;
  color: var(--color-navy);
  border: 1.5px solid var(--color-navy);
  border-radius: 4px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 180ms ease, color 180ms ease;
}
.loginBtn:hover { background: var(--color-navy); color: var(--color-white); }

@media (max-width: 768px) { .links { display: none; } }
```

---

## `Hero.module.css`

```css
.section {
  background: var(--color-white);
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 80px 24px 64px;
}

.container {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.eyebrow {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-cyan);
}

.h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-navy);
  line-height: 1.2;
}

.subheading {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-muted);
  max-width: 520px;
  line-height: 1.65;
}

/* Stats row */
.statsRow {
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 0.9375rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 20px;
  border-right: 1px solid var(--color-border);
}
.stat:last-child { border-right: none; }

.statValue { font-weight: 700; color: var(--color-navy); }
.statLabel { color: var(--color-muted); }
```

---

## `OmniSearch.module.css`

```css
/* This is the ONLY module file that may have box-shadow */
.widget {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);  /* only shadow in build */
  width: 100%;
  max-width: 740px;
  overflow: hidden;
}

.fields {
  display: flex;
  align-items: stretch;
  height: 56px;
}

.field { display: flex; flex: 1; }

.inputWrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  width: 100%;
}

.inputIcon { color: var(--color-muted); flex-shrink: 0; }

.input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--color-text);
  background: transparent;
}
.input::placeholder { color: var(--color-muted); }

.divider {
  width: 1px;
  background: var(--color-border);
  margin: 8px 0;
  flex-shrink: 0;
}

.submit {
  height: 100%;
  padding: 0 28px;
  background: var(--color-cyan);
  color: var(--color-navy);      /* navy on cyan — passes AA */
  border: none;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 180ms ease;
  white-space: nowrap;
  flex-shrink: 0;
}
.submit:hover { opacity: 0.88; }

@media (max-width: 640px) {
  .fields { flex-direction: column; height: auto; }
  .divider { width: auto; height: 1px; margin: 0 8px; }
  .submit { height: 48px; border-radius: 0; }
}
```

---

## `DiscoveryCards.module.css`

```css
.section {
  background: var(--color-surface);
  padding: 80px 24px;
  border-top: 1px solid var(--color-border);
}

.container { max-width: 1280px; margin: 0 auto; }

.heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 32px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card {
  border-radius: 4px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  transition: opacity 180ms ease;
}
.card:hover { opacity: 0.88; }

/* Discovery card bg variants — using surface-palette classes */
.bgBlue   { background: #AFCFED; }
.bgPurple { background: #D5D8FC; }
.bgGreen  { background: #98CBD6; }
.bgOrange { background: #F5D9B0; }

.cardTitle {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-navy);
}

.cardDesc {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.5;
}

.cardArrow { color: var(--color-navy); font-weight: 700; margin-top: 4px; }

@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
```

---

## `SymptomCards.module.css`

```css
.section {
  background: var(--color-white);
  padding: 80px 24px;
  border-top: 1px solid var(--color-border);
}

.container { max-width: 1280px; margin: 0 auto; }

.heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 32px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 180ms ease, box-shadow 180ms ease;
  cursor: pointer;
}
.card:hover {
  border-color: var(--color-cyan);
}

.emoji { font-size: 1.75rem; line-height: 1; }

.label {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
}

/* "CONSULT NOW" — cyan text on white = 1.8:1 FAILS.
   Use navy text instead. */
.cta {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-navy);
  text-decoration: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}
.cta:hover { color: var(--color-cyan); }

@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
```

---

## `SpecialtyCarousel.module.css`

```css
.section {
  background: var(--color-surface);
  padding: 72px 24px;
  border-top: 1px solid var(--color-border);
}

.container { max-width: 1280px; margin: 0 auto; }

.heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 28px;
}

.carouselWrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  color: var(--color-text);
  transition: border-color 150ms ease;
}
.arrow:hover { border-color: var(--color-cyan); color: var(--color-cyan); }

.track {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  flex: 1;
}
.track::-webkit-scrollbar { display: none; }

.chip {
  flex-shrink: 0;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 4px;            /* chips are 4px — pill shape is for tags only */
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  min-width: 120px;
  transition: border-color 180ms ease;
  color: var(--color-text);
}
.chip:hover { border-color: var(--color-cyan); }

.chipLabel {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
}

.chipCount {
  font-size: 0.75rem;
  color: var(--color-muted);
}
```

---

## `DoctorCard.module.css`

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 180ms ease;
}
.card:hover { border-color: var(--color-cyan); }

/* Photo + name side by side */
.photoRow {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.photo {
  width: 80px;
  height: 80px;
  border-radius: 4px;         /* ROUNDED RECTANGLE — not 50% */
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
}

.nameBlock { display: flex; flex-direction: column; gap: 2px; }

.nameRow { display: flex; align-items: center; gap: 6px; }

.name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

/* Verified badge — navy shield */
.verifiedBadge {
  color: var(--color-navy);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.specialty {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-cyan);
}

.qualifications {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

/* Details block */
.details { display: flex; flex-direction: column; gap: 6px; }

.experience { font-size: 0.875rem; color: var(--color-text); }

.location { font-size: 0.8125rem; color: var(--color-muted); }

/* Rating */
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}
.starIcon {
  color: #F59E0B;            /* amber star — one-off decorative color, not a brand token */
  fill: #F59E0B;
}
.ratingValue { font-size: 0.875rem; font-weight: 700; color: var(--color-text); }
.ratingCount { font-size: 0.8125rem; color: var(--color-muted); }

/* Available Today badge */
.availabilityBadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #E8F8EE;        /* light green tint — one-off, not a token */
  color: var(--color-green);
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;        /* PILL — the only 20px in this component */
  width: fit-content;
}

.availabilityDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;         /* tiny dot — only 50% radius in build */
  background: var(--color-green);
  flex-shrink: 0;
}

.fee {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
}

.actions { display: flex; flex-direction: column; gap: 8px; }
```

---

## `Footer.module.css`

```css
.footer {
  background: var(--color-navy);
  padding: 64px 24px 40px;
}

.container { max-width: 1280px; margin: 0 auto; }

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.logo {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-cyan);
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
}

.tagline { font-size: 0.875rem; color: rgba(255,255,255,0.5); max-width: 220px; }

.columnHeading {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 16px;
}

.linkList { list-style: none; display: flex; flex-direction: column; gap: 10px; }

.linkList a {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: color 150ms ease;
}
.linkList a:hover { color: var(--color-cyan); }   /* cyan on navy = 6.4:1 AA */

.bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright { font-size: 0.8125rem; color: rgba(255,255,255,0.35); }

@media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
```

---

## Anti-Patterns Table

| Anti-Pattern | Why It's Wrong | Correct Pattern |
|---|---|---|
| White text on cyan buttons | `#14BEF0` on white = 1.8:1 — WCAG fail | `color: var(--color-navy)` on all cyan backgrounds |
| Cyan text on white backgrounds | Same 1.8:1 failure | Use `--color-navy` or `--color-text` for text on white |
| `border-radius: 50%` on doctor photos | Apollo Hospitals pattern (bw_clinic_01) | `border-radius: 4px` on photos |
| `border-radius: 8px` or `12px` on buttons/cards | Apollo's soft radius vocabulary | `border-radius: 4px` — flat |
| `border-radius: 20px` on cards | Pill chips only | `border-radius: 20px` for AvailabilityBadge and specialty chips only |
| `box-shadow` on doctor cards | Apollo shadow pattern — this build is flat | `border: 1px solid var(--color-border)` only |
| NABH / JCI badges | Hospital accreditation (bw_clinic_01) | Per-doctor `VerifiedBadge` (navy shield icon) |
| "Emergency: 1066" in nav | Hospital site pattern (bw_clinic_01) | Booking platform has no emergency link |
| `display: none` for `consultMode` CTA | Wrong doctor sees wrong button in DOM | Conditional JSX: `{showClinic && <Button>...}` |
| `display: none` for unavailable badge | Doctor appears "Available" in DOM | `{doctor.availableToday && <AvailabilityBadge />}` |
| Dropdown `<select>` in OmniSearch hero | Apollo booking widget pattern | Free-text `<input>` fields for locality + keyword |
| Gold accent (`#FDB931`) | Apollo palette — not in this build | No gold in this design system |
| Nunito Sans font | Apollo font (bw_clinic_01) | Lato 400 + 700 only |
| `box-shadow` on regular section cards | Only OmniSearch widget has shadow | No shadow on discovery, symptom, doctor, or specialty cards |
| Cyan "CONSULT NOW" text on white | 1.8:1 failure | `color: var(--color-navy)` — navy text on symptom cards |
