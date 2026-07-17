# 03 — Design System
## Coaching Business Website · business_platform_01

---

### 1. Design Philosophy

Trust first, then conversion. Proof should be immediately visible; forms should be simple and low-friction.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #F8FAFD;
  --bg-surface: #FFFFFF;
  --bg-tint: #EDF3FA;

  --text-primary: #152238;
  --text-secondary: #4C5C72;
  --text-tertiary: rgba(21,34,56,0.46);

  --border: rgba(21,34,56,0.14);
  --action: #0F4AA8;
  --action-hover: #0C3A84;
  --success: #1E7D3A;
  --warning: #B26A12;
  --data-accent: #5E3AA8;
}
```

---

### 3. Typography

- Display: 36–62px, weight 700
- H2: 24–40px, weight 600
- H3: 20px
- Body: 16px
- Meta: 14px

---

### 4. Spacing System

- 8pt base
- section spacing 88px desktop / 56px mobile
- card grid gaps 20px desktop / 14px mobile

---

### 5. Component Specifications

- ResultsProofBand
- ProgramPathwayGrid
- CityCenterFinder
- CounselingForm
- ScholarshipForm
- TrustFAQAccordion

---

### 6. Motion Rules

- transitions <= 250ms
- no decorative autoplay effects
- reduced-motion support mandatory

---

### 7. Responsive Breakpoints

- `sm` 640
- `md` 768
- `lg` 1024
- `xl` 1280

---

### 8. Accessibility Standards

- WCAG AA
- keyboard-operable form controls
- visible focus indicators
- form errors linked via aria attributes

---

### 9. Anti-Patterns (Do Not Do)

- vague or unattributed result claims
- overcrowded CTA layout
- long, high-friction form fields without progressive disclosure
- hidden policy/refund/support links near conversion areas
