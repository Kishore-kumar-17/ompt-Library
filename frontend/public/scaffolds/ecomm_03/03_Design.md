# 03 — Design System
## Functional Beverage D2C Platform · ecomm_platform_03

---

### 1. Design Philosophy

Flavor visuals lead. The interface exists to get out of the way of product discovery and purchase. Product facts must be easy to scan, and pricing state changes must always be obvious.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FFFDF8;
  --bg-surface: #FFFFFF;
  --bg-tint: #F7F2E8;

  --text-primary: #1E1E1E;
  --text-secondary: #606060;
  --text-tertiary: rgba(30,30,30,0.40);

  --border: rgba(30,30,30,0.10);
  --accent: #FF6A3D;
  --accent-hover: #E8572D;
  --accent-cool: #3E7BFA;
  --accent-mint: #27B88A;

  --radius-btn: 999px;
  --radius-card: 14px;
  --radius-input: 10px;
}
```

---

### 3. Typography

- Display: `clamp(40px, 6vw, 76px)`, weight 700
- H2: `clamp(28px, 4vw, 48px)`, weight 700
- Body: 16px / 1.6
- Small: 14px / 1.5

---

### 4. Spacing System

- Base: 8px scale
- Section: 88px desktop / 56px mobile
- Grid gap: 20px desktop / 14px mobile
- Touch targets >= 44px

---

### 5. Component Specifications

#### 5.1 Product Card
- Pack visibility
- Price + subscribe hint
- Quick add action

#### 5.2 PurchaseModelToggle
- Explicit `one_time` and `subscribe`
- Savings copy for subscribe state

#### 5.3 Cadence Selector
- 2 / 4 / 8 week choices
- Visible only when `subscribe`

#### 5.4 Ingredient Panel
- Visible above fold on PDP
- Never hidden behind deep interaction

#### 5.5 Cart Drawer
- Free shipping progress
- Subscription savings badges

---

### 6. Motion Rules

- Drawer slide: 280–300ms ease-out
- Card hover transitions: <= 150ms
- Respect reduced motion
- No autoplay visual noise

---

### 7. Responsive Breakpoints

- `sm` 640px
- `md` 768px
- `lg` 1024px
- `xl` 1280px

PLP grid: 4 desktop / 2 tablet / 2 mobile.

---

### 8. Accessibility Standards

- WCAG AA contrast
- keyboard accessible controls
- visible focus rings
- semantic labels for selectors and toggles

---

### 9. Anti-Patterns (Do Not Do)

- Hidden purchase model defaults
- Hidden ingredient facts
- Hardcoded colors in component JSX
- Infinite scroll on PLP
- Misleading health claim copy
