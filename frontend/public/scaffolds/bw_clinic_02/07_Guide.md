# 07 — Guide
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## The Four Constraints — Why They Exist

### Constraint 1: OmniSearch — free-text, not dropdowns

Apollo (bw_clinic_01) uses preset dropdowns: "Select City" and "Select Specialty". Practo uses a two-field free-text search because patients don't always know their specialty — they know their symptom ("back pain"), their doctor's name ("Dr. Sharma"), or their locality ("Koramangala"). A dropdown forces a category decision before the patient is ready to make it.

The OmniSearch inputs are plain `<input type="text">` elements. No `<select>`. No autocomplete dropdown from data (static build). The form submits by scrolling to `#doctor-grid` where real filters exist.

**If you replace inputs with selects** — you've built Apollo's UX into Practo's skin. Remove them.

---

### Constraint 2: 4px flat radius — no softness, no shadows

Practo's visual language is flat and digital — more akin to an app than a hospital brochure. The flatness signals speed and directness: find doctor → book → done.

**Radius summary:**
| Element | Radius |
|---------|--------|
| All buttons | `4px` |
| All cards | `4px` |
| OmniSearch inputs | `4px` |
| Carousel arrow buttons | `4px` |
| AvailabilityBadge pill | `20px` |
| Availability dot | `50%` (6×6px decorative) |
| Doctor photos | `4px` |

**Shadow summary:** One shadow in the entire build — `OmniSearch.module.css`. All other cards: `border: 1px solid var(--color-border)` only.

```
grep -r "box-shadow" src/components --include="*.module.css"
```
Should return exactly one result: `OmniSearch.module.css`.

---

### Constraint 3: Cyan contrast — navy text on cyan always

```
#14BEF0 (cyan) background with white text:
L(cyan)  = 0.21 * (20/255)^2.2 + 0.72 * (190/255)^2.2 + 0.07 * (240/255)^2.2 ≈ 0.50
Ratio = (1.05) / (0.50 + 0.05) = 1.9:1

FAILS WCAG AA (requires 4.5:1 for normal text, 3:1 for large text)
```

The fix is `color: var(--color-navy)` on all cyan backgrounds:
```
#28328C (navy) on #14BEF0 (cyan):
L(navy)  ≈ 0.034
Ratio = (0.50 + 0.05) / (0.034 + 0.05) = 6.4:1 ✓ AA
```

This applies to:
- The "Search" submit button in OmniSearch
- The "Book Clinic Visit" and "Consult Online" primary buttons
- Any other cyan-bg element

**Cyan text on white is the same failure** — `#14BEF0` as `color` on white = 1.8:1. The "CONSULT NOW" text in SymptomCards uses `--color-navy`, not cyan, for this reason.

The one exception: footer logo text in cyan on navy background = 6.4:1 — passes.

---

### Constraint 4: `consultMode` CTA rendering — conditional JSX, not CSS hiding

```tsx
// CORRECT — conditional rendering
const showClinic = doctor.consultMode === 'clinic' || doctor.consultMode === 'both'
const showVideo  = doctor.consultMode === 'video'  || doctor.consultMode === 'both'

{showClinic && <Button variant="primary">Book Clinic Visit</Button>}
{showVideo  && <Button variant={showClinic ? 'outlineNavy' : 'primary'}>Consult Online</Button>}
```

```tsx
// WRONG — CSS hiding leaves buttons in DOM
<Button style={{ display: doctor.consultMode !== 'clinic' ? 'none' : 'flex' }}>
  Book Clinic Visit
</Button>
```

The wrong approach means a video-only doctor (Dr. Sneha Patel) has a hidden "Book Clinic Visit" button in the DOM — accessible to screen readers, tab navigation, and automated tests. It also inflates HTML unnecessarily.

**The same principle applies to `availableToday`:**
```tsx
// CORRECT
{doctor.availableToday && <AvailabilityBadge />}

// WRONG — badge in DOM for unavailable doctors
<AvailabilityBadge style={{ visibility: 'hidden' }} />
```

---

## Doctor Photo — Rounded Rectangle vs Circular

```css
/* bw_clinic_01 Apollo — CIRCULAR */
.photo { border-radius: 50%; object-fit: cover; }

/* bw_clinic_02 Practo — ROUNDED RECTANGLE */
.photo { border-radius: 4px; object-fit: cover; object-position: top; }
```

The distinction matters visually — circular photos feel institutional and authoritative (hospital brand). Rounded-rectangle photos feel like app profiles — more digital, more approachable, consistent with the marketplace aesthetic.

`object-position: top` is still needed to ensure the crop shows the face, not the torso.

---

## SpecialtyCarousel — `useRef` vs `useState`

```tsx
// CORRECT — useRef for imperative scroll, no re-renders
const trackRef = useRef<HTMLDivElement>(null)
const scroll = (dir: 'left' | 'right') => {
  trackRef.current?.scrollBy({ left: dir === 'right' ? 240 : -240, behavior: 'smooth' })
}

// WRONG — useState triggers re-render on every scroll
const [scrollX, setScrollX] = useState(0)
const scroll = (dir: 'left' | 'right') => {
  setScrollX(prev => prev + (dir === 'right' ? 240 : -240))
  trackRef.current?.scrollTo({ left: scrollX, behavior: 'smooth' })
}
```

`useRef` is the correct pattern because:
1. Scroll position doesn't need to be reflected in React state
2. Imperative `scrollBy` is simpler than syncing state with DOM scroll position
3. No re-render on each arrow click = better performance

---

## SymptomCards — "CONSULT NOW" Typography

```css
/* CORRECT — navy text on white card */
.cta { color: var(--color-navy); font-weight: 700; text-transform: uppercase; }

/* WRONG — cyan text on white fails WCAG (1.8:1) */
.cta { color: var(--color-cyan); }
```

The hover state flips to cyan on hover:
```css
.cta:hover { color: var(--color-cyan); }
```
This is acceptable — hover states are transient and don't need to meet contrast ratios (the resting state does). But the resting state must be `--color-navy`.

---

## Discovery Card Backgrounds — CSS Classes vs Inline Hex

```tsx
// CORRECT — CSS class, no hex in JSX or module files
const bgMap: Record<string, string> = {
  'bg-blue':   styles.bgBlue,
  'bg-purple': styles.bgPurple,
  'bg-green':  styles.bgGreen,
  'bg-orange': styles.bgOrange,
}
<div className={bgMap[card.bgColor]}>

// WRONG — inline hex
<div style={{ background: '#AFCFED' }}>

// WRONG — hex in module file
.bgBlue { background: #AFCFED; }  /* grep will catch this */
```

The hex values for discovery card backgrounds (`#AFCFED`, `#D5D8FC`, etc.) are intentionally outside the 8-token system — they are decorative tile colors, not brand tokens. They live hardcoded in `DiscoveryCards.module.css` CSS class definitions. This is a known exception — discovery card bg colors are one-off decorative values that don't need to be tokens.

Note: the `grep` check for hex in module files will catch these. Update the QA grep to exclude discovery card classes if needed, or move these hex values to globals.css as non-token custom properties.

---

## 10 Most Common Mistakes

1. **White text on cyan buttons** — `color: var(--color-white)` on `.primary`. Change to `color: var(--color-navy)`.

2. **Cyan "CONSULT NOW" text** — Symptom cards show "CONSULT NOW" in cyan on white. Change to navy.

3. **`border-radius: 50%` on doctor photos** — copied from bw_clinic_01 (Apollo). Photos in this build are `border-radius: 4px`.

4. **`border-radius: 20px` on specialty carousel chips** — chips in the carousel are card-style (`4px`). Only `AvailabilityBadge` and pill-tags use `20px`.

5. **`box-shadow` on doctor cards or symptom cards** — copying the shadow from bw_clinic_01. This build is flat. Only OmniSearch has shadow.

6. **`<select>` in OmniSearch** — building Apollo's dropdown widget instead of Practo's free-text search. OmniSearch uses `<input type="text">` for both fields.

7. **NABH/JCI badges** — adding hospital accreditation from bw_clinic_01. This build uses per-doctor `VerifiedBadge` (navy shield). No institution-level accreditation badges.

8. **"Emergency: 1066" in nav** — bw_clinic_01's hospital-specific nav element. Practo is a booking platform — no emergency contact.

9. **CSS-hiding CTAs by `consultMode`** — `display: none` on buttons that shouldn't show. Use conditional JSX rendering instead.

10. **`useState` for carousel scroll** — causes unnecessary re-renders. Use `useRef` and imperative `scrollBy`.

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `/out` directory produced
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` returns empty (or only discovery card bg classes)
- [ ] `grep -r "rgba(" src --include="*.module.css"` returns empty

### Radius Audit
- [ ] Every button: `border-radius: 4px` in DevTools
- [ ] Every card: `border-radius: 4px` in DevTools
- [ ] AvailabilityBadge: `border-radius: 20px` in DevTools
- [ ] All doctor photos: `border-radius: 4px` — NOT `50%`
- [ ] `grep -r "border-radius: 50%" src/components` returns empty (availability dot via CSS class is OK)
- [ ] `grep -r "9999px" src` returns empty

### Contrast Audit
- [ ] Primary Button computed `color` = navy `rgb(40, 50, 140)` (NOT white)
- [ ] OmniSearch "Search" button computed `color` = navy
- [ ] "CONSULT NOW" text computed `color` = navy (NOT cyan)
- [ ] Footer logo: cyan text on navy = verified accessible
- [ ] Cyan link hover in footer = accessible (6.4:1 on navy bg)

### Shadow Audit
- [ ] `grep -r "box-shadow" src/components --include="*.module.css"` returns exactly 1 result (`OmniSearch.module.css`)
- [ ] Doctor cards: no shadow in DevTools
- [ ] Symptom cards: no shadow
- [ ] Discovery tiles: no shadow
- [ ] Specialty chips: no shadow

### Navigation
- [ ] Nav always white at all scroll positions
- [ ] "Login" button: navy border, navy text, 4px radius
- [ ] No emergency link anywhere in nav
- [ ] No NABH/JCI accreditation anywhere in build
- [ ] No `'use client'` in `StickyNav.tsx`

### Hero + OmniSearch
- [ ] OmniSearch has two `<input type="text">` fields (NOT `<select>`)
- [ ] `<label>` for each input (with `htmlFor` matching `id`)
- [ ] Submit button: cyan bg, navy text, 4px radius
- [ ] Submitting form scrolls to `#doctor-grid`
- [ ] Stats row: "20M+ | 100K+ | 200K+"

### Symptom Cards
- [ ] 8 symptom cards in 4-column grid
- [ ] "CONSULT NOW" text: navy (not cyan)
- [ ] White card + border only (no shadow)
- [ ] Hover: border turns cyan

### Specialty Carousel
- [ ] 10+ specialty chips visible
- [ ] Left/right arrows scroll the carousel
- [ ] Chips: `border-radius: 4px` (not 20px)
- [ ] No horizontal scrollbar visible

### Doctor Grid + Cards
- [ ] Filter bar: city text input + specialty select
- [ ] Filtering works on both criteria simultaneously
- [ ] ARIA live region in DOM
- [ ] Empty state shown when 0 results
- [ ] Dr. Kavita Sharma: 2 CTAs, green badge
- [ ] Dr. Rahul Mehta: 1 CTA "Book Clinic Visit", no badge
- [ ] Dr. Sneha Patel: 1 CTA "Consult Online", green badge
- [ ] Dr. Vivek Nair: 1 CTA, no badge
- [ ] No `'use client'` in `DoctorCard.tsx`
- [ ] Doctor photos: `border-radius: 4px` confirmed
- [ ] VerifiedBadge: navy shield icon shown for `verified: true` doctors
- [ ] No badge for `dr-arun-krishnan` (`verified: false`)

### Testimonials
- [ ] 3 testimonials, text-only (no `<img>` in testimonial cards)
- [ ] `var(--color-surface)` section background

### Footer
- [ ] `var(--color-navy)` background
- [ ] Links hover to cyan
- [ ] Logo in cyan (accessible on navy)

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] All form inputs have associated labels
- [ ] All images have `alt` text
- [ ] `prefers-reduced-motion` stops all transitions
- [ ] No serif font anywhere
- [ ] Lato is the only font-family (no Nunito Sans, no Plus Jakarta)
