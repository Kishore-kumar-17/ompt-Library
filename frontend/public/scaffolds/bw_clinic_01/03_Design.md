# 03 — Design
## Indian Hospital Network · bw_clinic_01

---

## `globals.css` — Exactly 8 Tokens

```css
/* src/app/globals.css */

:root {
  --color-teal:      #2582A1;
  --color-gold:      #FDB931;
  --color-teal-dark: #1B6A85;
  --color-surface:   #F0F7FA;
  --color-text:      #1C2B3A;
  --color-muted:     #64748B;
  --color-border:    #E2E8F0;
  --color-white:     #FFFFFF;

  --font-sans: 'Nunito Sans', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--color-white);
}

/* Emergency link is the ONLY exception to the token rule
   Red #DC2626 is a safety color, not a brand color — no token for it */
.emergency-link {
  color: #DC2626;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 150ms ease;
}
.emergency-link:hover { opacity: 0.8; }

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Note on emergency link:** `#DC2626` (red) is intentionally outside the 8-token system — it is a safety/alert color, not a brand color. It lives in `globals.css` as `.emergency-link`, not in any module file.

---

## `Button.module.css`

```css
/* src/components/ui/Button.module.css */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;        /* THE radius — never 4px, never 6px, never 9999px */
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms ease, opacity 200ms ease, border-color 200ms ease;
  text-decoration: none;
  border: none;
  white-space: nowrap;
}

.md {
  height: 48px;
  padding: 0 24px;
  font-size: 0.9375rem;
}

.sm {
  height: 36px;
  padding: 0 16px;
  font-size: 0.875rem;
}

.primary {
  background: var(--color-teal);
  color: var(--color-white);
}

.primary:hover {
  background: var(--color-teal-dark);
}

.secondary {
  background: transparent;
  color: var(--color-teal);
  border: 1.5px solid var(--color-teal);
}

.secondary:hover {
  background: var(--color-teal);
  color: var(--color-white);
}

.fullWidth {
  width: 100%;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn:focus-visible {
  outline: 3px solid var(--color-teal);
  outline-offset: 2px;
}
```

---

## `StickyNav.module.css`

```css
/* src/components/layout/StickyNav.module.css */

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 68px;
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
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--color-teal);
  text-decoration: none;
  flex-shrink: 0;
}

.links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
  justify-content: center;
  list-style: none;
}

.link {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 150ms ease;
}

.link:hover {
  color: var(--color-teal);
}

.rightGroup {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* "Book Appointment" nav button */
.navCta {
  height: 42px;
  padding: 0 20px;
  background: var(--color-teal);
  color: var(--color-white);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 200ms ease;
}

.navCta:hover {
  background: var(--color-teal-dark);
}

@media (max-width: 768px) {
  .links { display: none; }
}
```

---

## `Hero.module.css`

```css
/* src/components/home/Hero.module.css */

.section {
  background: var(--color-white);
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 80px 24px 64px;
}

.container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.h1 {
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.subheading {
  font-size: 1.0625rem;
  font-weight: 400;
  color: var(--color-muted);
  max-width: 560px;
  line-height: 1.65;
}

/* Stats row */
.statsRow {
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 0.9375rem;
  color: var(--color-muted);
  flex-wrap: wrap;
  justify-content: center;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px;
  border-right: 1px solid var(--color-border);
}

.stat:first-child { padding-left: 0; }
.stat:last-child { border-right: none; }

.statValue {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}
```

---

## `BookingWidget.module.css`

```css
/* src/components/home/BookingWidget.module.css */

.widget {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  padding: 24px;
  width: 100%;
  max-width: 700px;
}

.fields {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.select {
  height: 48px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  padding: 0 12px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--color-text);
  background: var(--color-white);
  cursor: pointer;
  transition: border-color 150ms ease;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* chevron arrow */
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.select:focus {
  outline: none;
  border-color: var(--color-teal);
}

.submit {
  height: 48px;
  padding: 0 28px;
  background: var(--color-teal);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 200ms ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.submit:hover {
  background: var(--color-teal-dark);
}

@media (max-width: 640px) {
  .fields {
    flex-direction: column;
    align-items: stretch;
  }
}
```

---

## `SpecialtyGrid.module.css`

```css
/* src/components/home/SpecialtyGrid.module.css */

.section {
  background: var(--color-surface);
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 48px;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  border-color: var(--color-teal);
  box-shadow: 0 6px 24px rgba(37, 130, 161, 0.15);
}

.iconWrapper {
  width: 52px;
  height: 52px;
  background: var(--color-surface);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-teal);
}

.specialtyName {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}

.doctorCount {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## `DoctorCard.module.css`

```css
/* src/components/home/DoctorCard.module.css */

.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.13);
  transform: translateY(-2px);
}

/* Circular photo */
.photoWrapper {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
}

.photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;          /* CIRCULAR — the defining photo style */
  object-fit: cover;
  object-position: top;
  border: 3px solid var(--color-surface);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.name {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text);
}

.title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-teal);
}

.qualifications {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.experience {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 4px;
}

/* Rating row */
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  margin-top: 6px;
}

.starIcon {
  color: var(--color-gold);
  fill: var(--color-gold);     /* filled star — requires fill property */
}

.ratingValue {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
}

.ratingCount {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.hospital {
  font-size: 0.8125rem;
  color: var(--color-muted);
  margin-top: 4px;
}

.fee {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-teal);
  margin-top: 6px;
}

/* Action buttons */
.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
}
```

---

## `DoctorDirectory.module.css`

```css
/* src/components/home/DoctorDirectory.module.css */

.section {
  background: var(--color-white);
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 40px;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
}

/* Filter bar */
.filterBar {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.filter,
.searchInput {
  height: 48px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  padding: 0 14px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--color-text);
  background: var(--color-white);
  transition: border-color 150ms ease;
  flex: 1;
  min-width: 160px;
}

.filter:focus,
.searchInput:focus {
  outline: none;
  border-color: var(--color-teal);
}

/* Doctor card grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.empty {
  text-align: center;
  color: var(--color-muted);
  font-size: 1rem;
  padding: 48px 0;
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## `WhyUs.module.css`

```css
/* src/components/home/WhyUs.module.css */

.section {
  background: var(--color-surface);
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 48px;
}

/* Stats grid */
.statsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 56px;
}

.statBlock {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.statIcon {
  color: var(--color-teal);
  margin-bottom: 4px;
}

.statValue {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
}

.statLabel {
  font-size: 0.875rem;
  color: var(--color-muted);
}

/* Accreditation badges */
.accreditations {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 24px;
}

.badgeIcon {
  height: 40px;
  width: auto;
}

.badgeName {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-text);
}

.badgeDesc {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .statsGrid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## `Footer.module.css`

```css
/* src/components/layout/Footer.module.css */

.footer {
  background: var(--color-teal-dark);
  padding: 64px 24px 40px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.logo {
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--color-white);
  text-decoration: none;
  display: block;
  margin-bottom: 12px;
}

.tagline {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
  max-width: 240px;
}

.columnHeading {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 16px;
}

.linkList {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.linkList a {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 150ms ease;
}

.linkList a:hover {
  color: var(--color-gold);    /* gold on teal-dark = 5.8:1 — passes AA */
}

.bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.4);
}

.certBadges {
  display: flex;
  align-items: center;
  gap: 20px;
}

.certBadge {
  display: flex;
  align-items: center;
  gap: 6px;
}

.certBadge img {
  height: 24px;
  opacity: 0.5;
  filter: brightness(0) invert(1);
}

.certBadge span {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .bottom { flex-direction: column; align-items: flex-start; }
}
```

---

## Anti-Patterns Table

| Anti-Pattern | Why It's Wrong | Correct Pattern |
|--------------|----------------|-----------------|
| Gold text on white sections | `#FDB931` on white = 1.9:1 — catastrophic WCAG fail | Gold ONLY as icon color, badge bg (dark text), or footer hover |
| `border-radius: 9999px` on buttons | Pill = bw_legal_01/02 pattern | `border-radius: 8px` exactly |
| `border-radius: 4px` or `6px` on buttons | Other bw_legal builds' signatures | `border-radius: 8px` for this build |
| Square or rectangular doctor photos | E-commerce product image pattern | `border-radius: 50%` — circular crop with `object-fit: cover` |
| Single CTA on doctor card ("Book Appointment" only) | Removes the video/telehealth path | "Book Appointment" + "Video Consult" (if `videoConsult: true`) |
| Removing emergency link from nav | Safety regression; clinically incorrect | "Emergency: 1066" in red always in nav |
| Hiding consultation fees | Creates anxiety / erodes consumer trust | `₹{consultFee} Consult Fee` on every DoctorCard |
| Dark section backgrounds | Wrong — this is a light/white site | White or `--color-surface` (`#F0F7FA`) only |
| Dark/navy primary color | bw_legal_04 uses navy — this build uses lighter teal | `--color-teal: #2582A1` (not `#022B50`) |
| Single filter in DoctorDirectory | City alone or specialty alone is insufficient | 3 filters: city select + specialty select + name search input |
| NABH without JCI or vice versa | Incomplete accreditation story | Both required; render both from `accreditations` array |
| Using `useState` for DoctorCard | Cards are static display, no interactivity | `DoctorCard.tsx` is server component; state lives in `DoctorDirectory` |
| Star emoji instead of Lucide Star | Emoji rendering varies by OS; not styleable | Lucide `Star` with `fill: var(--color-gold)` in CSS |
| `'use client'` on SpecialtyGrid | No interactivity needed | Server component |
| Serif font | Wrong category signal | Nunito Sans only |
