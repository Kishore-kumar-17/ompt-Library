# 03 — Design System
## Artisan Empowerment Marketplace · mulecom_platform_04

---

### 1. Design Philosophy

Human craft storytelling in discovery surfaces, strict clarity in conversion and support surfaces.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FCF8F2;
  --bg-surface: #FFFFFF;
  --bg-tint: #F2E8D9;

  --text-primary: #2B241E;
  --text-secondary: #6E665B;
  --text-tertiary: rgba(43,36,30,0.46);

  --border: rgba(43,36,30,0.14);
  --action: #3E2E21;
  --action-hover: #2A1D14;
  --accent-terracotta: #B56E3B;
  --trust-success: #2F7D32;
}
```

---

### 3. Typography

- Display: 34–58px
- H2: 24–40px
- Body: 16px
- Meta: 14px

---

### 4. Spacing System

- 8pt base
- section spacing 88px desktop / 56px mobile
- listing grid gaps 20px desktop / 14px mobile

---

### 5. Component Specifications

- SearchHeader
- CraftTaxonomyRail
- FacetFilters
- ListingCard
- PincodeChecker
- DispatchInfoPanel
- ReturnEligibilityBlock
- SupportTimeline

---

### 6. Motion Rules

- transitions <= 280ms
- no decorative autoplay loops
- reduced-motion support required

---

### 7. Responsive Breakpoints

- `sm` 640
- `md` 768
- `lg` 1024
- `xl` 1280

---

### 8. Accessibility Standards

- WCAG AA
- keyboardable drawers/forms
- visible focus states
- semantic labels for policy and status blocks

---

### 9. Anti-Patterns (Do Not Do)

- hidden return eligibility
- ambiguous COD/prepaid outcomes
- inaccessible support forms
- hardcoded design tokens in JSX
