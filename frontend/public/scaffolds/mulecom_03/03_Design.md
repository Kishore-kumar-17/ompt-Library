# 03 — Design System
## Indian Craft Marketplace · mulecom_platform_03

---

### 1. Design Philosophy

Craft-led storytelling in discovery surfaces, strict clarity in transactional and support surfaces.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FCF8F2;
  --bg-surface: #FFFFFF;
  --bg-tint: #F4E9D8;

  --text-primary: #2A241D;
  --text-secondary: #6B645A;
  --text-tertiary: rgba(42,36,29,0.46);

  --border: rgba(42,36,29,0.14);
  --action: #3D2C1E;
  --action-hover: #291C12;
  --accent-saffron: #B9782D;
  --trust-success: #2E7D32;
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
- section spacing 88px / 56px
- listing grid gaps 20px / 14px

---

### 5. Component Specifications

- `SearchHeader`
- `CraftTaxonomyRail`
- `FacetFilters`
- `ListingCard`
- `PincodeChecker`
- `DispatchInfoPanel`
- `ReturnEligibilityBlock`
- `SupportTimeline`

---

### 6. Motion Rules

- transitions <= 280ms
- no decorative autoplay animations
- reduced motion fallback required

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
- semantic labeling of policy and status states

---

### 9. Anti-Patterns (Do Not Do)

- hidden return eligibility
- ambiguous COD/prepaid behavior
- inaccessible support interactions
- hardcoded token values in JSX
