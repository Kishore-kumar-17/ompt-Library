# 03 — Design System
## Career Acceleration & Tech Upskilling Platform · business_platform_04

---

### 1. Design Philosophy

Placement proof first, program clarity second, enrollment action third. Every section must reduce doubt before asking for commitment.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #F5F7FA;
  --bg-surface: #FFFFFF;
  --bg-tint: #EEF2FB;

  --text-primary: #0F1D36;
  --text-secondary: #3D5172;
  --text-tertiary: rgba(15, 29, 54, 0.46);

  --border: rgba(15, 29, 54, 0.12);
  --action: #1A4EBB;
  --action-hover: #1540A0;
  --success: #1B7C3A;
  --warning: #B05F10;
  --salary-accent: #16A34A;
}
```

Note: `--salary-accent` is reserved for salary hike numbers only. It must not appear on buttons, badges, or section backgrounds.

---

### 3. Typography

- Display: `clamp(34px, 5vw, 60px)`, weight 700, line-height 1.1
- H2: `clamp(22px, 3.4vw, 38px)`, weight 600, line-height 1.15
- H3: `20px`, weight 600, line-height 1.25
- Body: `16px`, line-height 1.6
- Meta: `14px`, line-height 1.5
- Label/badge: `11px`, uppercase, tracking `0.05em`

---

### 4. Spacing System

- 8pt base
- Section spacing: `88px` desktop / `56px` mobile
- Card grid gaps: `24px` desktop / `16px` mobile

---

### 5. Component Specifications

- `StickyNav` — Programs, Placements, Mentors, Scholarship, Fees, Demo
- `HeroWithProofStrip` — placement headline, "Book Demo" (primary) + "Explore Programs" (ghost), company logo strip below
- `PlacementProofBand` — 4–6 salary/outcome metrics with cohort year context labels
- `CompanyLogoGrid` — hiring company logos (greyscale, AA-accessible on white)
- `AlumniStoryCards` — before/after salary cards with cohort year and program label
- `ProgramTrackGrid` — 4-col desktop, 2-col mobile; program cards with outcome and duration
- `MentorGrid` — 3-col desktop, 1-col mobile; mentor cards with company, role, experience
- `ScholarshipAssessment` — multi-step: start → questions → score → scholarship tier reveal → enrollment CTA
- `FeeEMISection` — fee breakdown, EMI calculator, financing partner logos, ISA option
- `DemoBookingForm` — program, current role, experience, city, contact; counselor assignment confirmation
- `PlacementsPage` — cohort year filter + program filter + alumni cards + methodology note

---

### 6. Motion Rules

- Transitions: `<= 250ms ease-out`
- No decorative autoplay
- Salary counter animation on scroll entry (reduced-motion: skip, show final value)
- Scholarship tier reveal: fade-in with scale transform (reduced-motion: instant reveal)
- `@media (prefers-reduced-motion: reduce)` applied globally

---

### 7. Responsive Breakpoints

- `sm` 640
- `md` 768
- `lg` 1024
- `xl` 1280
- Program grid: 4-col desktop → 2-col tablet → 1-col mobile
- Mentor grid: 3-col desktop → 2-col tablet → 1-col mobile
- Alumni story cards: 3-col desktop → 1-col mobile

---

### 8. Accessibility Standards

- WCAG AA
- Primary action `#1A4EBB` on white: contrast 6.8:1 ✓ AA
- `--salary-accent` `#16A34A` on white: 4.7:1 ✓ AA
- All form controls keyboard-operable with visible focus rings
- Demo booking form announces submission state via `aria-live`
- Assessment progress step announced to screen readers

---

### 9. Anti-Patterns (Do Not Do)

- salary claims without cohort year and program context
- guaranteed placement language without statistical disclaimer
- mentor profiles without current company and role
- long enrollment form without multi-step progressive disclosure
- `--salary-accent` green used on buttons, cards, or background sections
- overloaded hero with more than 2 CTA buttons
- hidden EMI conditions or financing eligibility requirements near enrollment CTA
