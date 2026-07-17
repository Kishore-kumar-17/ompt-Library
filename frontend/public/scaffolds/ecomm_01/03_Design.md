# 03 — Design System
## E-commerce Platform · ecomm_platform_01

---

### 1. Design Philosophy

Product photography does the persuasion work. The UI exists to get out of the way. Every design decision reduces friction toward "Add to Cart." Nothing decorates. Nothing entertains. Every pixel serves the product.

---

### 2. CSS Custom Properties (globals.css)

Define all tokens here. Never hardcode values in components.

```css
:root {
  /* Backgrounds */
  --bg-primary: #FAFAF8;      /* Warm white — main page background */
  --bg-surface: #F2EFE9;      /* Warm cream — cards, secondary sections */
  --bg-overlay: rgba(0, 0, 0, 0.35); /* Cart drawer backdrop */

  /* Borders */
  --border: rgba(28, 28, 26, 0.08);   /* Standard dividers */
  --border-focus: rgba(28, 28, 26, 0.24); /* Focused inputs */

  /* Text */
  --text-primary: #1C1C1A;            /* Headlines, body */
  --text-secondary: #6B6B6B;          /* Metadata, descriptions */
  --text-tertiary: rgba(28, 28, 26, 0.35); /* Placeholders, inactive */

  /* Accent — brand green */
  --accent: #0F7037;
  --accent-hover: #0A5C2B;
  --accent-light: #E8F5EE;            /* Badge backgrounds, selected state fill */

  /* Status */
  --error: #C0392B;
  --error-light: #FDECEA;
  --success: #0F7037;                 /* Same as accent for this brand */
  --warning: #E67E22;
  --warning-light: #FEF3E2;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Border radius */
  --radius-btn: 4px;
  --radius-card: 0px;       /* Product image cards — no radius */
  --radius-input: 4px;
  --radius-badge: 3px;
  --radius-modal: 8px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease-out;
}
```

---

### 3. Typography

**Font:** DM Sans (Google Fonts). Load via `next/font/google` — weights 400, 500, 600.

| Role | Size | Weight | Tracking | Line height | Usage |
|------|------|--------|----------|-------------|-------|
| Display | `clamp(36px, 5vw, 64px)` | 600 | `-0.02em` | 1.1 | Hero headline |
| H1 | `clamp(28px, 4vw, 48px)` | 600 | `-0.02em` | 1.15 | Page titles |
| H2 | `clamp(22px, 3vw, 36px)` | 600 | `-0.01em` | 1.2 | Section headings |
| H3 | `18px` | 500 | `0` | 1.3 | Product names, card titles |
| Body | `16px` | 400 | `0` | 1.65 | Descriptions, body copy |
| Small | `14px` | 400 | `0` | 1.5 | Metadata, secondary info |
| Label | `11px` | 600 | `0.06em` | 1.4 | Badges, column headers (uppercase) |
| Micro | `10px` | 500 | `0.04em` | 1.4 | Legal text, fine print |

Max line length: 64 characters for body. Headings: unrestricted.

---

### 4. Spacing System

Base unit: 8pt. All spacing is a multiple of 4px.

- **Section vertical padding:** `96px` desktop / `64px` mobile
- **Product grid gap:** `24px` desktop / `16px` mobile
- **Card internal padding:** `16px` (images bleed to edge — no padding on image wrapper)
- **Cart drawer width:** `420px`
- **Max content width:** `1360px` with `24px` gutters
- **Nav height:** `64px` desktop / `56px` mobile

---

### 5. Component Specifications

#### 5.1 Navigation

```
Height: 64px desktop / 56px mobile
Background: var(--bg-primary)
Border-bottom: 1px solid var(--border)
Position: sticky top-0, z-index 50

Desktop layout:
  [Logo wordmark]    [Men  Women  Sale  Sustainability]    [🔍  👤  🛍️ (n)]

Mobile layout:
  [☰ Hamburger]    [Logo]    [🛍️ (n)]

Logo: DM Sans 16px weight 600, color var(--text-primary)
Nav links: 14px weight 400, color var(--text-secondary), hover: var(--text-primary), transition 150ms
Cart icon: Lucide ShoppingBag size=20 strokeWidth=1.5
Cart count badge: 16px circle, bg var(--accent), text white, 10px font, absolute -top-1 -right-1
```

#### 5.2 Button System

```
Primary (Add to Cart, Checkout, Subscribe):
  bg: var(--accent)
  hover: var(--accent-hover)
  text: white
  radius: var(--radius-btn) = 4px
  height: 44px desktop / 48px mobile (larger tap target on mobile)
  padding: 0 24px
  font: 14px weight 600
  transition: background-color var(--transition-fast)
  disabled: opacity 0.4, cursor not-allowed

Ghost / Secondary:
  bg: transparent
  border: 1px solid var(--border-focus)
  text: var(--text-primary)
  hover border: var(--text-secondary)
  same radius, height, font as primary

Destructive:
  bg: var(--error)
  hover: darker shade
  text: white

Text link:
  no border, no bg
  text: var(--accent)
  hover: var(--accent-hover)
  underline on hover
```

#### 5.3 Product Card

```
Container: cursor-pointer, overflow-hidden
  Image wrapper:
    aspect-ratio: 3 / 4
    overflow: hidden
    border-radius: 0 (no rounding on product images)
    position: relative

    Primary image: object-cover w-full h-full
    Secondary image: position absolute inset-0, opacity 0
                     group-hover: opacity 1, transition opacity 200ms ease

    Badge (if present): position absolute top-3 left-3
                        bg var(--bg-primary), text var(--text-primary)
                        11px font-600 uppercase tracking-wide
                        padding: 3px 8px, radius var(--radius-badge)

    Quick-add button: position absolute bottom-0 left-0 right-0
                      height 44px, bg rgba(255,255,255,0.92) backdrop-blur-sm
                      font 13px weight-600 var(--text-primary)
                      opacity 0, group-hover: opacity 1, translateY(0)
                      transition: opacity 200ms, transform 200ms

  Product info (below image):
    padding-top: 12px
    Name: 16px weight-500 var(--text-primary)
    Price: 14px var(--text-secondary), margin-top 4px
    Sale price: 14px var(--accent), strikethrough original in var(--text-tertiary)

    Color swatches: flex gap-6px margin-top 8px
      Each swatch: 14px × 14px circle
                   border: 1px solid rgba(0,0,0,0.12)
                   cursor pointer, title = color name
                   selected: ring-2 ring-offset-2 ring-[var(--accent)]
```

#### 5.4 Size Selector

```
Container: grid grid-cols-4 gap-2

Each size button:
  height: 40px
  border: 1px solid var(--border-focus)
  radius: var(--radius-btn)
  font: 13px weight-500 var(--text-primary)
  bg: transparent
  transition: var(--transition-fast)

  Selected state:
    border-color: var(--accent)
    bg: var(--accent-light)
    color: var(--accent)

  Out-of-stock state:
    opacity: 0.4
    cursor: not-allowed
    text-decoration: line-through
    — NEVER hide — always show, never clickable

  Hover (in-stock, not selected):
    border-color: var(--text-secondary)
```

#### 5.5 Color Selector

```
Container: flex flex-wrap gap-3

Each color option:
  outer ring wrapper: 20px × 20px, padding 2px
                      border 2px solid transparent
                      selected: border-color var(--accent)
                      border-radius: 50%

  inner swatch: 16px × 16px circle
                bg: color_hex value
                border: 1px solid rgba(0,0,0,0.12)

Color name label: shown below swatches, 13px var(--text-secondary)
                  updates to selected color name on hover/select
```

#### 5.6 Cart Drawer

```
Backdrop: fixed inset-0 bg-[var(--bg-overlay)] z-40
          click to close, fade in/out 200ms

Drawer: fixed right-0 top-0 h-screen w-[420px] z-50
        bg: var(--bg-primary)
        border-left: 1px solid var(--border)
        Framer Motion: x: 100% → 0, duration 300ms ease-out

Header:
  height: 64px
  border-bottom: 1px solid var(--border)
  "Cart (n)" — 16px weight-600
  X close: Lucide X, size=20, right-aligned

Line items: scrollable flex-col gap-4, padding 24px
  Each item:
    flex row gap-3
    Image: 72px × 96px (3:4), object-cover, radius 0, border var(--border)
    Info column:
      Name: 14px weight-500
      Variant: 13px var(--text-secondary) "Natural Black / Size 10"
      Price: 14px weight-500
    Quantity stepper: flex row, − button, count, + button
                      buttons: 28px × 28px, border var(--border), radius 2px
    Remove: Lucide X, size=14, var(--text-tertiary), hover var(--text-secondary)

Shipping progress (below line items):
  Label: "Free shipping on orders over $100"
         13px var(--text-secondary)
  Progress bar: height 4px, radius 2px
                bg: var(--accent-light)
                fill: var(--accent), width calculated as (subtotal / 10000) * 100%
  Reached: "You've unlocked free shipping!" in var(--accent)

Footer (sticky to bottom):
  border-top: 1px solid var(--border)
  padding: 24px
  Subtotal row: "Subtotal" 14px + price 16px weight-600, space-between
  Checkout button: full-width primary button, height 48px
  "Taxes and shipping calculated at checkout" — 12px var(--text-tertiary) centered
```

#### 5.7 Image Gallery (PDP)

```
Desktop: left column (sticky, 55% width)
  Main image: aspect-ratio 3/4, object-cover, click to zoom (modal)
  Thumbnail strip: flex column, gap 8px, 4-6 thumbnails
    Each: 72px × 96px, border 1px var(--border)
    Selected: border-color var(--accent)

Mobile: horizontal scroll strip of images, snap scrolling
        dots indicator below
```

#### 5.8 Form Inputs

```
All inputs:
  height: 44px
  border: 1px solid var(--border-focus)
  radius: var(--radius-input) = 4px
  bg: white (not var(--bg-primary) — white makes inputs stand out on cream bg)
  font: 15px var(--text-primary)
  padding: 0 14px

  Focus: outline 2px solid var(--accent), outline-offset 2px, border transparent
  Error: border-color var(--error)
  Placeholder: var(--text-tertiary)

Label: 13px weight-500 var(--text-primary), margin-bottom 6px
Error message: 12px var(--error), margin-top 4px, flex with icon
```

#### 5.9 Badge

```
Sizes:
  Default: 11px font-600 uppercase tracking-wide, padding 3px 8px, radius var(--radius-badge)
  Large: 13px font-600, padding 4px 10px

Variants:
  Default: bg var(--bg-surface), text var(--text-secondary)
  New: bg var(--accent-light), text var(--accent)
  Sale: bg var(--error-light), text var(--error)
  Bestseller: bg #FEF3E2, text #B7451A
```

#### 5.10 Admin Table

```
Table: w-full, border-collapse
  Header row: bg var(--bg-surface), 11px uppercase tracking-wide var(--text-tertiary), padding 12px 16px
  Body rows: border-bottom 1px var(--border), padding 16px, 14px var(--text-primary)
  Hover: bg rgba(28,28,26,0.02)
  Actions column: Lucide icons, size=16, var(--text-secondary), hover var(--text-primary)
```

---

### 6. Motion Rules

**Allowed animations:**
- Cart drawer slide: `x: 100% → 0`, `300ms ease-out`
- Cart backdrop fade: `opacity: 0 → 0.35`, `200ms ease`
- Product card image swap: `opacity` transition `200ms ease`
- Quick-add button reveal: `opacity 0 → 1`, `translateY(8px → 0)`, `200ms ease`
- Page section fade-in on scroll: `opacity 0 → 1`, `y: 16px → 0`, `400ms ease-out`
- Toast notification: slide in from bottom-right, `300ms ease-out`
- Modal open: scale `0.97 → 1`, opacity `0 → 1`, `200ms ease`

**Forbidden:**
- Parallax scrolling
- Autoplay video on any page
- Hero image carousel / auto-advance
- Bounce or elastic easing
- Continuous loops (spinners only for loading states, not decoration)
- Any animation above 500ms unless user-triggered

**Always:** Gate all Framer Motion with `const prefersReduced = useReducedMotion()` — if true, set `duration: 0`.

---

### 7. Responsive Breakpoints

| Breakpoint | Token | Min-width |
|------------|-------|-----------|
| Mobile | default | 0 |
| sm | `sm:` | 640px |
| md | `md:` | 768px |
| lg | `lg:` | 1024px |
| xl | `xl:` | 1280px |
| 2xl | `2xl:` | 1360px |

**Product grid columns:**
- Mobile: 2 columns (always — never 1)
- md: 3 columns (category pages)
- lg: 4 columns (category pages), 3 columns (related products)

**Cart drawer:**
- Desktop: `420px` fixed width
- Mobile: full width (`100vw`), slides from bottom on screens below `640px`

---

### 8. Accessibility Standards

- WCAG AA minimum — 4.5:1 for normal text, 3:1 for large text and UI elements
- Focus rings: `outline: 2px solid var(--accent); outline-offset: 2px` on all interactive elements
- All product images: descriptive `alt` text (not "product-image-1")
- Size selector: `aria-pressed` for selected, `aria-disabled` for out-of-stock
- Cart drawer: `role="dialog"`, `aria-label="Shopping cart"`, focus trap when open
- Color swatches: `aria-label={color.name}` — color alone cannot convey selection
- Price: always include currency label accessible to screen readers
- Form errors: `aria-describedby` linking input to error message

---

### 9. Anti-Patterns (Do Not Do)

- `bg-white` anywhere — use `var(--bg-primary)` or `white` only for form inputs
- `rounded-full` on buttons — brand radius is `4px`
- Border-radius on product image wrappers
- `text-gray-*` Tailwind classes for brand text — use CSS variables
- Urgency language: "Only 3 left!", "Sale ends in 2 hours!"
- Red "SALE" badges that look alarming — use `var(--error-light)` + `var(--error)` — muted, not aggressive
- Stock count display ("12 remaining") — only show "Low stock" when count < 5, never exact number
- Pop-ups on first page load (email capture is inline section, not modal)
- Chat widget visible on mobile — it covers Add to Cart button
- Carousel auto-advance on hero or product sections
