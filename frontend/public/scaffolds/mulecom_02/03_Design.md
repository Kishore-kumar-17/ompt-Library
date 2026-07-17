# 03 — Design System
## Curated Artisan Marketplace · mulecom_platform_02

---

### 1. Design Philosophy

Craft storytelling on discovery pages; strict clarity on conversion and support pages.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FCF8F2;
  --bg-surface: #FFFFFF;
  --bg-tint: #F4E9D8;

  --text-primary: #2A241D;
  --text-secondary: #6B645A;
  --border: rgba(42,36,29,0.14);

  --action: #3D2C1E;
  --action-hover: #291C12;
  --accent-saffron: #B9782D;
  --trust-success: #2E7D32;
}
```

---

### 3. Typography

- Display 34-58px
- H2 24-40px
- Body 16px
- Small/meta 14px

---

### 4. Spacing System

- 8pt base
- 88px section spacing desktop / 56px mobile
- 20px grid gaps desktop / 14px mobile

---

### 5. Component Specifications

- SearchHeader and taxonomy chips
- Facet drawer/sidebar
- ListingCard with craft and policy metadata
- PincodeChecker
- Dispatch/ReturnSummary block
- ReturnRequestForm and SupportTimeline

---

### 6. Motion Rules

- transitions <= 280ms
- no distracting autoplay loops
- reduced-motion support

---

### 7. Responsive Breakpoints

- 640 / 768 / 1024 / 1280

---

### 8. Accessibility Standards

- WCAG AA
- keyboard-operable filters, forms, accordions
- clear focus indicators

---

### 9. Anti-Patterns (Do Not Do)

- hidden return eligibility
- ambiguous COD refund language
- inaccessible support flows
- hardcoded design tokens in JSX
