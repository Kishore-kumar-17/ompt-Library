# 07 — Guide
## Indian Hospital Network · bw_clinic_01

---

## The Four Constraints — Why They Exist

### Constraint 1: Booking widget as hero centerpiece

Every legal/fintech build in this series has text + CTA buttons in the hero. This build is different — the primary action is finding a doctor, not reading about the organisation. The booking widget (city + specialty + submit) is the first thing a patient sees and interacts with.

Reducing this to a static "Book Appointment" button removes the specificity that makes healthcare navigation useful. A patient coming for a cardiologist in Chennai needs to be able to say "Chennai + Cardiology" immediately — not browse to a doctor directory page and find filters there.

**If you remove the widget and add text CTAs** — you've turned a patient tool into an institutional brochure.

---

### Constraint 2: Dual CTA per doctor card

```tsx
// CORRECT — dual path
<Button variant="primary" fullWidth>Book Appointment</Button>
{doctor.videoConsult && (
  <Button variant="secondary" fullWidth>Video Consult</Button>
)}

// WRONG — single CTA removes telehealth path
<Button variant="primary" fullWidth>Book Appointment</Button>
```

"Book Appointment" = in-clinic visit (requires travel, scheduling, physical presence).
"Video Consult" = telehealth (immediate, location-independent, often cheaper).

These are different products serving different patient situations. A patient in a different city who just wants a second opinion should have the video path. Collapsing both into one button requires the patient to discover their options post-click.

`videoConsult: false` doctors (like Dr. Arjun Mehta, Dr. Rajan Sharma) should not show the Video CTA — not every specialist offers telehealth. Conditional rendering, not CSS hiding.

---

### Constraint 3: Gold contrast — the critical failure

```
#FDB931 (gold) on #FFFFFF (white) = 1.9:1 contrast ratio
WCAG AA requires 4.5:1 for normal text, 3:1 for large text
This fails BOTH thresholds — invisible to many users.
```

Safe uses of gold in this build:

| Use | Background | Contrast | Verdict |
|-----|-----------|----------|---------|
| Footer link hover | `#1B6A85` (teal-dark) | 5.8:1 | ✓ AA |
| Star icon fill | N/A (icon color) | Visual decoration | ✓ OK |
| Badge background (dark text on gold) | N/A (gold IS background) | Dark text 8.4:1 | ✓ AAA |

Forbidden uses of gold:
- Any text on white section backgrounds
- Any text on `#F0F7FA` surface backgrounds
- Nav link color

If you want to use gold for decorative emphasis in a header, use it as a decorative border or underline — not as the text color itself.

---

### Constraint 4: Emergency link is always red

`#DC2626` (red) is deliberately outside the 8-token system. Red is a universal safety signal — it communicates urgency in a way that teal or gold cannot. The emergency number "1066" must be immediately scannable in a crisis.

This is the only instance of a hardcoded color in the entire project, placed in `globals.css` as `.emergency-link` (not in any module file). It must be visible at all scroll positions — never hidden, never collapsed into a hamburger menu on desktop.

---

## Doctor Photo — Circular Crop

```css
/* CORRECT */
.photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;   /* ensures face is visible, not torso */
}

/* WRONG — square (e-commerce product pattern) */
.photo {
  border-radius: 8px;
}

/* WRONG — forgets object-fit (squishes photo) */
.photo {
  border-radius: 50%;
  /* no object-fit — image stretches to fill circle */
}
```

`object-position: top` is important — it centres the crop on the doctor's face rather than their mid-body. Without it, a portrait photo will often crop to show only the torso.

---

## DoctorDirectory — Filter Architecture

```
DoctorDirectory ('use client')          ← all filter state lives here
  ├── filter bar (city, specialty, search)
  ├── useMemo(filtered, [city, specialty, query])
  ├── <p aria-live="polite"> (sr-only)   ← announces to screen readers
  └── {filtered.map(d => <DoctorCard doctor={d} />)}

DoctorCard                              ← server component, static
  └── receives Doctor prop, renders HTML
```

The `useMemo` is essential. Without it, every character typed in the search input re-runs the full filter on every keystroke. With 8 doctors this is imperceptible, but in a real dataset of 5,000+ doctors it would block the main thread.

All three filter criteria must be applied in a single `filter()` pass — not chained `.filter().filter().filter()`. The current implementation does this correctly: `d.city === city && d.specialty === specialty && d.name.includes(query)`.

---

## Star Icons — Lucide vs Emoji

```tsx
// CORRECT — Lucide component, gold fill via CSS
import { Star } from 'lucide-react'

// In component:
<Star size={14} className={styles.starIcon} aria-hidden="true" />

// In CSS:
.starIcon {
  color: var(--color-gold);
  fill: var(--color-gold);    /* Lucide defaults to stroke only; fill needed for solid star */
}
```

```tsx
// WRONG — emoji
<span>⭐</span>  // Rendering varies by OS/browser; not styleable; no design control
```

The Lucide `Star` component draws the star with both stroke and fill when `fill` is set in CSS. Without the `fill` property, Lucide renders an outlined (unfilled) star. Always set both `color` and `fill` when you want a filled star.

---

## Health Packages — Strike-Through Pricing

Same pattern as bw_legal_04 (Vakilsearch). `<del>` tag is semantic HTML that screen readers announce as "deleted" or "previously" — giving context that this was the old price.

```tsx
// CORRECT — semantic, accessible
<del className={styles.originalPrice}>
  ₹{pkg.originalPrice.toLocaleString('en-IN')}
</del>

// WRONG — CSS only, not announced by screen readers
<span className={styles.originalPrice}>
  ₹{pkg.originalPrice.toLocaleString('en-IN')}
</span>
```

Also note: `toLocaleString('en-IN')` formats numbers in the Indian numbering system (1,00,000 not 100,000). Always use this for INR amounts.

---

## Accreditation Badges — Why Both Are Required

NABH (National Accreditation Board for Hospitals) is the Indian government's hospital quality standard. JCI (Joint Commission International) is the global benchmark. Apollo has both, which is the gold standard in Indian healthcare.

Showing only NABH suggests Indian compliance. Showing only JCI suggests international standards without local verification. Together they signal: "We meet both Indian regulations AND global best practices."

Neither badge is decorative. Both carry meaning for the target audience (patients choosing a hospital). Removing either one weakens the trust signal.

---

## 10 Most Common Mistakes

1. **Removing the booking widget** — replacing with "Book Appointment" text button. The widget with city+specialty dropdowns is the hero's primary function.

2. **Square doctor photos** — `border-radius: 8px` or `12px` on doctor photos. Must be `50%` (circular).

3. **`border-radius: 6px` on buttons** — copying from bw_legal_04. This build uses `8px`.

4. **Gold text on white** — `color: var(--color-gold)` on any element inside a white section. Fails WCAG at 1.9:1. Fix: only use gold as icon fill, badge bg, or footer hover.

5. **Single CTA on all doctor cards** — removing "Video Consult". Must be conditional on `videoConsult: true`, not absent entirely.

6. **`'use client'` on DoctorCard** — DoctorCard has no interactivity. It's a display component. State lives in DoctorDirectory.

7. **Adding `'use client'` to SpecialtyGrid** — no interactivity in the specialty grid. Server component only.

8. **`teal` vs `teal-dark` in footer** — footer uses `--color-teal-dark` (`#1B6A85`), not `--color-teal` (`#2582A1`). The distinction matters for brand depth.

9. **White footer link hover** — `color: var(--color-white)` on footer links. The hover should be `var(--color-gold)` (gold on teal-dark = 5.8:1 — brand-correct and accessible).

10. **Skipping the ARIA live region** — filters change the displayed doctors without the DOM announcing it to screen reader users. The `aria-live="polite"` + `.sr-only` element is required for Lighthouse Accessibility ≥90.

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `/out` directory produced
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` returns empty
- [ ] `grep -r "rgba(" src --include="*.module.css"` returns empty (except globals.css)

### Radius Audit
- [ ] Every button: `border-radius: 8px` in DevTools
- [ ] Doctor photos: `border-radius: 50%` in DevTools
- [ ] Cards: `border-radius: 12px` in DevTools
- [ ] Booking widget card: `border-radius: 12px`
- [ ] `grep -r "9999px" src` returns empty
- [ ] `grep -r "border-radius: 4px\|border-radius: 6px" src/components` returns empty

### Navigation
- [ ] Nav always white — scroll to bottom, back to top, still white
- [ ] "Emergency: 1066" visible and red (`#DC2626`) at all scroll positions
- [ ] "Book Appointment" nav CTA: teal, 8px radius, height 42px
- [ ] No `'use client'` in `StickyNav.tsx`

### Hero + Booking Widget
- [ ] BookingWidget visible below H1
- [ ] City dropdown: 7 options (Chennai, Hyderabad, Bangalore, Delhi, Mumbai, Pune, Kolkata)
- [ ] Specialty dropdown: 12 options matching `Specialty` type
- [ ] `<label>` for each `<select>` (accessibility requirement)
- [ ] "Find Doctors" submit button: teal, 8px radius
- [ ] Submit scrolls to `#doctor-directory`
- [ ] Stats row: 4 stats all visible

### Specialty Grid
- [ ] 12 specialty cards in 4-column grid
- [ ] Background `#F0F7FA` (not white)
- [ ] Icons are Lucide components in teal (not emoji)
- [ ] Doctor count visible per card
- [ ] Teal border appears on hover

### Doctor Directory
- [ ] 3 filter controls: city select + specialty select + name search input
- [ ] All 3 filters applied simultaneously
- [ ] ARIA live region present: `aria-live="polite"` + `.sr-only` class
- [ ] Empty state message when 0 results
- [ ] No `'use client'` in `DoctorCard.tsx`

### Doctor Cards
- [ ] Circular photo: `50%` radius, `object-fit: cover`
- [ ] Name (Nunito 700), title (teal), qualifications (muted) all visible
- [ ] "X+ Years Experience" visible
- [ ] Star rating: gold filled Lucide Star (not emoji), rating value, review count
- [ ] Consultation fee in teal: "₹X Consult Fee"
- [ ] "Book Appointment" button: primary, teal, 8px radius
- [ ] "Video Consult" present for `videoConsult: true` doctors
- [ ] Dr. Arjun Mehta (videoConsult: false) — NO "Video Consult" button
- [ ] Dr. Rajan Sharma (videoConsult: false) — NO "Video Consult" button

### Gold Contrast Audit
- [ ] No element has `color: #FDB931` on any white section background
- [ ] Star icons show gold visually (via `fill`, not `color` text)
- [ ] Footer link hover IS gold (on teal-dark background — passes AA)

### Why Us + Accreditations
- [ ] 4 stat blocks visible with teal icons
- [ ] NABH badge visible
- [ ] JCI badge visible
- [ ] Both badges in DOM simultaneously
- [ ] Section background: `#F0F7FA`

### Health Packages
- [ ] 3 packages visible
- [ ] Original price in `<del>` tag
- [ ] Discounted price visible and bold
- [ ] Test count on each card
- [ ] Feature list: Lucide Check icons in teal
- [ ] "Most Popular" ribbon on Comprehensive package
- [ ] "Book Now" button: 8px radius

### Testimonials
- [ ] 3 testimonial cards
- [ ] Star ratings visible (gold)
- [ ] Quote + name + treatment type

### Footer
- [ ] Background is `#1B6A85` (teal-dark, not teal `#2582A1`)
- [ ] 4 columns on desktop
- [ ] Link hover changes to gold (not white)
- [ ] NABH + JCI at 50% opacity in bottom bar
- [ ] Copyright year dynamic (`new Date().getFullYear()`)

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] All filter controls have associated `<label>` elements
- [ ] All images have `alt` text
- [ ] `prefers-reduced-motion` disables all Framer Motion transitions
- [ ] No serif font anywhere (DevTools check)
