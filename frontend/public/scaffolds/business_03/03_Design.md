# 03 — Design System
## K-12 and Competitive Learning Platform · business_platform_03

---

### 1. Design Philosophy

Proof first, then pathway. The parent must see credible outcomes before they engage with the product. Every section earns the next scroll.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #F7FAFE;
  --bg-surface: #FFFFFF;
  --bg-tint: #EAF2FC;

  --text-primary: #12233F;
  --text-secondary: #4A5F7D;
  --text-tertiary: rgba(18, 35, 63, 0.46);

  --border: rgba(18, 35, 63, 0.14);
  --action: #0E4BAF;
  --action-hover: #0B3D8F;
  --success: #1F7C3B;
  --warning: #B36A12;
  --data-accent: #5E3BA9;
}
```

---

### 3. Typography

- Display: `clamp(36px, 5vw, 62px)`, weight 700, line-height 1.1
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600, line-height 1.15
- H3: `20px`, weight 600, line-height 1.25
- Body: `16px`, line-height 1.6
- Meta: `14px`, line-height 1.5
- Label/badge: `11px`, uppercase, tracking `0.05em`

---

### 4. Spacing System

- 8pt base
- Section spacing: `88px` desktop / `56px` mobile
- Card grid gaps: `20px` desktop / `14px` mobile

---

### 5. Component Specifications

- `UtilityStrip` — helpline number, free class messaging, language selector
- `StickyNav` — Programs, Results, App, Scholarship, Centers, Contact
- `HeroWithCTAPair` — learning promise headline, "Book Free Class" (primary) + "Explore App" (ghost)
- `ProofMetricsBand` — 4–6 outcome stats with year context labels
- `ProgramPathwayGrid` — 4-col desktop, 2-col mobile; class/exam cards with mode badges
- `AppExperienceModule` — feature list + screen previews + app store badges
- `TeacherTrustSection` — 3-up teacher profile cards with credentials
- `ParentTestimonialBlock` — 2–3 video/quote testimonials with child class context
- `FreeClassCTABand` — bottom-of-page lead capture with class and city selectors
- `ResultsProofPage` — filter bar (exam/year/program) + result cards with methodology note
- `CenterFinder` — city selector + center cards with map, contact, batch info
- `ScholarshipFlow` — multi-step: eligibility → slot selection → confirmation

---

### 6. Motion Rules

- Transitions: `<= 250ms ease-out`
- No decorative autoplay (no auto-playing video testimonials)
- Metric counter animation on scroll entry (reduced-motion: skip animation, show final value)
- Reduced-motion support mandatory via `@media (prefers-reduced-motion: reduce)`

---

### 7. Responsive Breakpoints

- `sm` 640
- `md` 768
- `lg` 1024
- `xl` 1280
- Program grid: 4-col desktop → 2-col tablet → 2-col mobile
- Teacher/mentor grid: 3-col desktop → 1-col mobile

---

### 8. Accessibility Standards

- WCAG AA
- Primary action `#0E4BAF` on white: contrast 6.4:1 ✓ AA
- All form controls keyboard-operable with visible focus rings
- OTP input announces verification state via `aria-live`
- Result filters operable via keyboard

---

### 9. Anti-Patterns (Do Not Do)

- unattributed result claims (must include year and program)
- auto-playing video content
- long forms without progressive disclosure steps
- hidden fee or refund policy links near CTA
- app store badges without accessible label text
- overloaded hero with more than 2 CTA buttons
