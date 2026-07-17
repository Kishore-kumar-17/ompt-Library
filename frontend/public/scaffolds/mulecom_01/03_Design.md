# 03 — Design System
## Multi-Vendor Marketplace Platform · mulecom_platform_01

---

### 1. Design Philosophy

Discovery should feel rich and exploratory. Transaction and support flows should feel controlled, explicit, and trustworthy.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FFFDF9;
  --bg-surface: #FFFFFF;
  --bg-tint: #F8F2E8;

  --text-primary: #22201D;
  --text-secondary: #66625D;
  --text-tertiary: rgba(34,32,29,0.48);

  --border: rgba(34,32,29,0.14);
  --action: #3B2F2A;
  --action-hover: #241D1A;
  --accent-warm: #C9782D;
  --trust-success: #2E7D32;

  --radius-btn: 999px;
  --radius-card: 10px;
  --radius-input: 8px;
}
```

---

### 3. Typography

- Display: `clamp(34px, 4.8vw, 60px)`, weight 600
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600
- H3: 20px, weight 500
- Body: 16px
- Small/meta: 14px

---

### 4. Spacing System

- Base 8pt scale
- Section spacing 88px desktop / 56px mobile
- Grid gap 20px desktop / 14px mobile

---

### 5. Component Specifications

- **SearchHeader:** persistent query context
- **FacetFilters:** grouped facets, mobile drawer + desktop sidebar
- **ListingCard:** image, title, price, seller signal, shipping hint
- **SellerTrustCard:** rating, response cue, policy summary
- **ShopGroupedCart:** subtotal by shop + combined total
- **CaseTimeline:** clear status progression and timestamps

---

### 6. Motion Rules

- draw/modals under 280ms
- hover transitions under 180ms
- no decorative autoplay loops
- reduced motion support required

---

### 7. Responsive Breakpoints

- `sm` 640
- `md` 768
- `lg` 1024
- `xl` 1280

PLP grid: 4 / 2 / 2 by breakpoint strategy.

---

### 8. Accessibility Standards

- WCAG AA
- keyboard operability for filters and dialogs
- semantic labels for options and support controls
- visible focus state on all actionable components

---

### 9. Anti-Patterns (Do Not Do)

- hidden policy/protection terms
- opaque grouped-cart totals
- inaccessible filter drawer interactions
- ambiguous case status labels
- hardcoded colors in component JSX
