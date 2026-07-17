# 07 — Guide
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## The Three Constraints — Why They Exist

### Constraint 1: Dark-first — the inverted mental model

Every prior clinic build in this library defaults to white: Apollo is white nav + white cards + teal accents. Practo is white + flat cards + cyan highlights. Cleveland is white with navy dark strip. VitalCheck is **globally dark** — the `--color-bg: #15171C` near-black is applied to nav, hero, package grid, trust section, and footer. Only two sections (HowItWorks, Testimonials) use the light surface `#F2F4F8`.

This inverts every default text-colour assumption from other builds:

```css
/* Apollo / Practo / Cleveland: */
body { color: var(--color-text); }          /* dark text on white bg */
.heading { color: var(--color-navy); }       /* specific dark heading colour */

/* VitalCheck: */
body { background: var(--color-bg); }       /* dark bg — no body text colour set globally */
.heading { color: var(--color-white); }     /* white text in dark sections */
.lightSectionText { color: var(--color-dark-text); } /* dark text in light sections */
```

**Common mistake:** Using `color: var(--color-white)` in a light-bg section (HowItWorks, Testimonials). White on `#F2F4F8` = 1.05:1 — invisible. Always check which section context you're in before applying text colour.

**The two-token pattern:** `--color-white` is for text in dark sections. `--color-dark-text` is for text in light sections (and for text on pink buttons). These two tokens handle all text cases in the build.

---

### Constraint 2: Dark text on pink — the reverse of the white-text assumption

Pink `#FF316D` is a high-energy, medium-luminance colour. The luminance calculation:

```
#FF316D (pink):
R=255, G=49, B=109

Linear channel values:
  R_lin = (255/255)^2.2 = 1.0
  G_lin = (49/255)^2.2  ≈ 0.0319
  B_lin = (109/255)^2.2 ≈ 0.1468

Relative luminance:
  L(pink) = 0.2126 × 1.0 + 0.7152 × 0.0319 + 0.0722 × 0.1468
           = 0.2126 + 0.02282 + 0.01060
           = 0.2460

White on pink:
  Ratio = (1.0 + 0.05) / (0.2460 + 0.05) = 1.05 / 0.296 = 3.55:1
  → FAILS WCAG AA for normal text (< 18.67px bold, < 24px regular)
  → Passes only for large decorative text (which CTAs are NOT)

Dark #15171C on pink:
  L(dark) = ~0.006
  Ratio = (0.246 + 0.05) / (0.006 + 0.05) = 0.296 / 0.056 = 5.27:1
  → PASSES WCAG AA ✓
```

This is the same pattern as Practo's navy-on-cyan: a vibrant brand colour that fails with white text. The fix is the same: use the dark/near-black as the button text colour.

**The three valid uses of pink `#FF316D`:**

| Use | Combination | Ratio | ✓/✗ |
|-----|-------------|-------|-----|
| As bg for buttons | Dark text on pink | 5.27:1 | ✓ |
| As text on dark bg | Pink text on `#15171C` | 5.27:1 | ✓ |
| As text on surface | Pink text on `#1E2130` | ~5.1:1 | ✓ |
| As bg with white text | White on pink | 3.55:1 | ✗ |
| As text on white/light | Pink on `#F2F4F8` | 1.83:1 | ✗ |
| As text on `#FFFFFF` | Pink on white | 1.83:1 | ✗ |

Pink on light bg is the most common mistake. Never use `color: var(--color-pink)` in a light-bg section.

---

### Constraint 3: Package-first entity — no doctor types

Every prior clinic build has a `Doctor` or `Provider` interface with specialty, credentials, appointment types. VitalCheck has none of these. The central data entity is:

```typescript
interface HealthPackage {
  id: string
  name: string
  category: ServiceCategory   // for tab filtering
  originalPrice: number       // MRP — shown with <del> strike-through
  discountedPrice: number     // offer price — shown in pink, bold
  discountPercent: number     // shown as "X% off" badge
  testsIncluded: number       // count shown on card
  turnaroundHours: number     // "Xhr Reports" shown on card
  popular: boolean            // drives "POPULAR" badge (conditional JSX)
  homeCollection: boolean     // drives "Home Collection" indicator (conditional JSX)
  keyTests: string[]          // exactly 3 — shown as checklist
}
```

There is no specialty field, no city/location field, no appointment type. If you're writing any of those — you're building a different clinic template.

The filtering mechanism is **a single category tab**, not a multi-dimensional filter grid. `CategoryTabs` holds `useState<ServiceCategory | 'all'>` and calls `filterPackages(packages, active)`. One state variable, one filter function, one dimension.

---

## Glassmorphism — The One rgba Exception

The zero-rgba rule (enforced by grep) has exactly one exception: `PackageCard.module.css`. The glassmorphism effect requires rgba values — there is no CSS custom property equivalent for a translucent background.

```css
/* This is correct — rgba in PackageCard.module.css only */
.card {
  background: rgba(255, 255, 255, 0.06);       /* 6% white over dark bg */
  border: 1px solid rgba(255, 255, 255, 0.1);  /* 10% white edge */
}
.card:hover {
  box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15); /* 15% pink glow */
  border-color: rgba(255, 49, 109, 0.3);            /* 30% pink edge */
}
```

**Why not CSS custom properties?** You can technically do `style={{ '--alpha': '0.06' }}` and `background: rgba(255, 255, 255, var(--alpha))` — but this is more complex and less readable than direct rgba values in the dedicated glassmorphism file. The exception is documented and scoped.

**Grep expectation:**
```bash
grep -r "rgba(" src --include="*.module.css"
# Should return:
#   src/components/home/PackageCard.module.css:  background: rgba(255, 255, 255, 0.06);
#   src/components/home/PackageCard.module.css:  border: 1px solid rgba(255, 255, 255, 0.1);
#   src/components/home/PackageCard.module.css:  box-shadow: 0 8px 32px rgba(255, 49, 109, 0.15);
#   src/components/home/PackageCard.module.css:  border-color: rgba(255, 49, 109, 0.3);
# NO other files.
```

**Glassmorphism on non-PackageCard components** — this is the most common mistake. WhyChooseUs trust cards should NOT have `backdrop-filter`. The SiteNav should NOT be glass. Only PackageCard.

---

## `<del>` vs CSS `text-decoration: line-through` — Why It Matters

```html
<!-- WRONG — CSS line-through, no semantic meaning -->
<span style="text-decoration: line-through; color: gray">₹3,999</span>

<!-- RIGHT — semantic strikethrough + visual line-through -->
<del class="original" aria-label="Original price ₹3,999">₹3,999</del>
```

The `<del>` element is defined in HTML spec as "text that has been deleted from a document". Screen readers like NVDA and VoiceOver can announce the strikethrough state:
- Chrome + NVDA: announces "strikethrough 3,999"
- Safari + VoiceOver: announces "deletion 3,999"

Using `aria-label` on `<del>` provides additional context: "Original price ₹3,999" is clearer than "strikethrough 3,999". Both approaches have value — use `aria-label` to make the intent explicit.

The `<del>` tag is automatically styled with `text-decoration: line-through` by browsers. Adding `.original { text-decoration: line-through }` in CSS is fine as a fallback and for colour control — the semantic meaning comes from the HTML element, not the CSS.

---

## `toLocaleString('en-IN')` — Indian Number Formatting

```typescript
// WRONG — raw number
`₹${1999}`    // "₹1999"   ← not how Indians read prices

// WRONG — default locale (varies by environment)
`₹${(1999).toLocaleString()}`   // "₹1,999" in US but could differ elsewhere

// CORRECT — explicit Indian locale
`₹${(2749).toLocaleString('en-IN')}`  // "₹2,749"
`₹${(3999).toLocaleString('en-IN')}`  // "₹3,999"
`₹${(649).toLocaleString('en-IN')}`   // "₹649"   (no comma below 1000)
```

The Indian numbering system groups differently from Western: after the first comma (thousands), subsequent groups are two digits (lakhs, crores), not three. For values under ₹1,00,000, it's identical to Western format (e.g., ₹3,999). But for larger amounts (₹1,00,000+), the difference is significant. Using `en-IN` locale ensures correctness across all amounts.

---

## Border-Radius Rationale — 4 values in one build

This build uses 4 distinct radius values, each with a specific reason:

| Value | Element | Why |
|-------|---------|-----|
| `50%` | Step number circles in HowItWorks | Perfect circle — decorative numbered badge |
| `4px` | "POPULAR" badge, discount badge | Sharp, rectangular — product label feel |
| `8px` | All buttons | Slightly rounded — approachable but not pill-like |
| `12px` | WhyChooseUs cards, HowItWorks cards, Testimonial cards | Warm card radius — consumer-friendly |
| `16px` | PackageCard | The hero card — most rounded, most distinctive |
| `24px` | Category pills, location pill | Full pill — tag/chip style for filtering |

**The 50% use here is NOT on photos** — there are no provider photos in this build. The `50%` on step circles is correct (it creates a circle from a square element). The grep check `grep -r "border-radius: 50%" src/components` will return `HowItWorks.module.css` — this is expected and acceptable. The rule is "no circular photos", not "no circular elements".

---

## Dark Body Background — Preventing Flash of White

```typescript
// layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ background: 'var(--color-bg)', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
```

Without `background: var(--color-bg)` on `<body>`, Next.js static pages will flash white before React hydrates (because the browser's default `<body>` background is white). This is particularly noticeable on dark builds. Setting it inline in `layout.tsx` ensures the dark bg is applied from the first paint.

Alternatively, set it in `globals.css`:
```css
body { background: var(--color-bg); margin: 0; }
```

Either approach works. The inline style on `<body>` in `layout.tsx` is more explicit.

---

## 10 Most Common Mistakes

1. **White text on pink buttons** — `color: var(--color-white)` on `.primary`. White on pink = 3.55:1 fails. Change to `color: var(--color-dark-text)`.

2. **Pink text in light sections** — `color: var(--color-pink)` used in HowItWorks or Testimonials. Pink on `#F2F4F8` = 1.83:1 fails. Use `var(--color-dark-text)` or `var(--color-muted)` in light sections.

3. **White text in light sections** — applying dark-section text tokens in HowItWorks/Testimonials. White on `#F2F4F8` = invisible.

4. **Doctor/Provider entity created** — building a doctor directory instead of package cards. This build has NO Doctor interface.

5. **Multi-filter search** — adding a text search input + city select instead of single-dimension category tabs. CategoryTabs is one state variable only.

6. **Glassmorphism on WhyChooseUs** — applying `backdrop-filter` to trust signal cards. These are solid `--color-surface` cards only.

7. **Glassmorphism on SiteNav** — making the nav transparent/glass. Nav is solid `--color-bg`.

8. **`<span style="text-decoration: line-through">` for strike-through** — use `<del>` tag for semantic accessibility.

9. **Prices without `toLocaleString('en-IN')`** — showing `₹1999` instead of `₹1,999`. Always format with Indian locale.

10. **White flash on load** — forgetting to set `background: var(--color-bg)` on body. Dark builds flash white without it.

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 and produces `/out`
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` returns empty
- [ ] `grep -r "rgba(" src --include="*.module.css"` returns only `PackageCard.module.css`
- [ ] `grep -r "9999px" src` returns empty
- [ ] Inter confirmed as only font in DevTools (not Roboto, Lato, Nunito)
- [ ] Body bg = `rgb(21,23,28)` — no white flash on load

### Dark Bg Audit
- [ ] SiteNav: dark bg `rgb(21,23,28)`
- [ ] HeroSection: dark bg
- [ ] CategoryTabs + PackageGrid section: dark bg
- [ ] WhyChooseUs: dark bg
- [ ] Footer: dark bg
- [ ] ONLY HowItWorks + Testimonials: light bg `rgb(242,244,248)`

### Pink Contrast Audit
- [ ] All `.primary` buttons: `color: rgb(21,23,28)` (dark) — NOT `rgb(255,255,255)` (white)
- [ ] "Book Now" in SiteNav: dark text on pink confirmed in DevTools
- [ ] "Book Now" in PackageCard: dark text on pink confirmed
- [ ] "Explore Packages" in Hero: dark text on pink confirmed
- [ ] CategoryTabs active tab: dark text on pink confirmed
- [ ] Step number circles: dark text on pink confirmed
- [ ] No pink text used in HowItWorks or Testimonials sections

### Radius Audit
- [ ] All buttons: `border-radius: 8px`
- [ ] PackageCard: `border-radius: 16px`
- [ ] WhyChooseUs cards: `border-radius: 12px`
- [ ] HowItWorks cards: `border-radius: 12px`
- [ ] Testimonial cards: `border-radius: 12px`
- [ ] Category pills: `border-radius: 24px`
- [ ] Location pill in nav: `border-radius: 24px`
- [ ] "POPULAR" badge: `border-radius: 4px`

### Package Card Audit
- [ ] Glassmorphism: `backdrop-filter: blur(12px)` in DevTools on PackageCard
- [ ] "POPULAR" badge: Present on Complete Health Profile and Senior Wellness; absent (not hidden) on all others
- [ ] Strikethrough: `<del>` tag confirmed in DevTools Elements (not `<span>`)
- [ ] Discounted price: pink text `rgb(255,49,109)`
- [ ] Original price: muted text, line-through
- [ ] Discount badge: `{N}% off` visible
- [ ] Tests count: `{N} Tests Included` visible
- [ ] 3 keyTests with CheckCircle icons
- [ ] Turnaround: `{N}hr Reports` with Clock icon
- [ ] Home Collection: shown (all 8 packages have homeCollection: true)
- [ ] Hover: pink glow `box-shadow` visible
- [ ] No `'use client'` in PackageCard.tsx

### Category Tabs Audit
- [ ] 9 tabs total: "All" + 8 categories
- [ ] "All" tab active on initial load
- [ ] Active tab: pink bg, dark text, `border-radius: 24px`
- [ ] Inactive tabs: surface bg, white text
- [ ] No horizontal scrollbar visible on tab row
- [ ] Clicking "Full Body" → 1 card shown
- [ ] Clicking "All" → 8 cards shown
- [ ] useMemo used for filtering

### Prices
- [ ] All prices formatted as `₹X,XXX` (toLocaleString en-IN)
- [ ] ₹649 shown correctly (no comma — under 1,000)
- [ ] ₹2,749 shown correctly (comma after thousands)

### Light Sections
- [ ] HowItWorks: light bg, ALL text is dark (`rgb(21,23,28)`)
- [ ] HowItWorks cards: white bg, `border-radius: 12px`
- [ ] Step circles: `border-radius: 50%`, pink bg, dark text (acceptable 50% — not a photo)
- [ ] Testimonials: light bg, white cards, dark text
- [ ] No `<img>` in Testimonials section
- [ ] Star SVG fill amber — not an image

### Shadow Audit
- [ ] `grep -r "box-shadow" src/components --include="*.module.css"` returns only `PackageCard.module.css`
- [ ] WhyChooseUs cards: no shadow (border only)
- [ ] HowItWorks cards: no shadow
- [ ] SiteNav: no shadow (border-bottom only)

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] All interactive elements keyboard-accessible
- [ ] CategoryTabs `role="tablist"` + buttons `role="tab"` + `aria-selected`
- [ ] `aria-label` on location pill
- [ ] `prefers-reduced-motion` disables Framer Motion
- [ ] No doctor/provider content anywhere
- [ ] No emergency link or emergency phone
- [ ] No NABH/JCI modal badges (plain text trust cards only)
