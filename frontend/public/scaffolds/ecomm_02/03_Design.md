# 03 — Design System
## Health Food D2C Platform · ecomm_platform_02

---

### 1. Design Philosophy

Honesty is the aesthetic. The ingredient list is never hidden. Large type makes the brand voice loud and clear. Sections alternate between warm and cool backgrounds to create rhythm without complexity. Product photography is always product-first — packs, not people.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-warm: #F4EBEF;           /* Alternating section bg */
  --bg-lavender: #E5E4F2;       /* Product category, secondary sections */
  --bg-cta-dark: #5048D5;       /* Newsletter section, announcement bar */
  --bg-overlay: rgba(0, 0, 0, 0.35);

  --border: rgba(13, 13, 13, 0.08);
  --border-focus: rgba(13, 13, 13, 0.24);

  --text-primary: #0D0D0D;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(13, 13, 13, 0.35);
  --text-on-cta: #FFFFFF;

  --cta: #5048D5;
  --cta-hover: #3D38C2;
  --accent: #93385D;
  --accent-light: #F8DEE7;

  --success: #1A7A3A;
  --success-light: #E8F5EE;
  --error: #C0392B;
  --error-light: #FDECEA;
  --warning: #C27B1A;

  /* Spacing */
  --section-gap: 80px;
  --section-gap-mobile: 56px;
  --card-radius: 16px;
  --btn-radius: 100px;          /* Pill — non-negotiable */
  --input-radius: 12px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 280ms ease-out;
}
```

---

### 3. Typography

**Fonts:** Space Grotesk (headings, display) + DM Sans (body, UI). Both via `next/font/google`.

Add to `globals.css`:
```css
.font-display { font-family: 'Space Grotesk', sans-serif; }
body { font-family: 'DM Sans', sans-serif; }
```

| Role | Font | Size | Weight | Tracking | Line-height |
|------|------|------|--------|----------|-------------|
| Display / hero | Space Grotesk | `clamp(40px, 6vw, 80px)` | 700 | `-0.03em` | 1.0 |
| H1 | Space Grotesk | `clamp(32px, 5vw, 56px)` | 700 | `-0.02em` | 1.05 |
| H2 | Space Grotesk | `clamp(24px, 3.5vw, 40px)` | 700 | `-0.02em` | 1.1 |
| H3 / Product name | Space Grotesk | `20px` | 600 | `-0.01em` | 1.25 |
| Body | DM Sans | `16px` | 400 | `0` | 1.65 |
| Small | DM Sans | `14px` | 400 | `0` | 1.5 |
| Ingredient text | DM Sans | `14px` | 400 | `0` | 1.8 |
| Label / badge | DM Sans | `11px` | 700 | `0.06em` | 1.4 (uppercase) |
| Micro | DM Sans | `10px` | 500 | `0.04em` | 1.4 |

---

### 4. Component Specifications

#### 4.1 Announcement Bar

```
Height: 36px desktop / 32px mobile
Background: var(--cta) = #5048D5
Text: white, 13px DM Sans, centered
Content: "Free delivery on orders above ₹499 · COD available · #nothingtohide"
Dismiss: X button right-aligned, stores dismissal in localStorage
Mobile: text truncates to "Free delivery above ₹499"
```

#### 4.2 Navigation

```
Height: 64px desktop / 56px mobile
Background: #FFFFFF
Border-bottom: 1px solid var(--border)
Position: sticky top-0 z-50

Desktop: [Logo wordmark] [Shop | About | Blog | #nothingtohide] [🔍 👤 🛒(n)]
Mobile: [☰] [Logo] [🛒(n)]

Logo: Space Grotesk 18px weight-700 #0D0D0D
Nav links: DM Sans 14px #6B6B6B hover #0D0D0D
Cart badge: 16px circle bg var(--cta) white text 10px DM Sans
```

#### 4.3 Button System

```
Primary CTA (Add to Cart, Checkout, Subscribe):
  background: var(--cta) = #5048D5
  hover: var(--cta-hover) = #3D38C2
  text: white, DM Sans 14px weight-600
  border-radius: var(--btn-radius) = 100px   ← ALWAYS pill
  height: 48px desktop / 52px mobile
  padding: 0 28px
  disabled: opacity 0.4, cursor not-allowed

Ghost / Secondary:
  background: transparent
  border: 1.5px solid var(--border-focus)
  text: var(--text-primary)
  hover: border-color var(--cta), color var(--cta)
  border-radius: 100px (pill)

Accent button (secondary CTA):
  background: var(--accent) = #93385D
  text: white, border-radius: 100px

Text link:
  color: var(--cta), underline on hover
```

#### 4.4 Product Card

```
Container: rounded-[16px] border border-[var(--border)] bg-white overflow-hidden group

Image:
  aspect-ratio: 1/1 (square — food product photography)
  object-fit: cover
  no border-radius on image element itself
  2nd image: opacity 0 → 1 on group-hover, 200ms ease

Below image: padding 16px
  Badge (if any): pill, 11px uppercase, absolute top-3 left-3
  Product name: 18px Space Grotesk weight-600 var(--text-primary)
  Flavour: 13px DM Sans var(--text-secondary)
  Price: 16px Space Grotesk weight-700 var(--cta) — updates with pack size

Flavour swatches: flex gap-6px mt-8px
  Each: 18px × 18px circle, bg = flavour.colorHex
  border: 1.5px solid rgba(0,0,0,0.10)
  selected: ring-2 ring-offset-1 ring-[var(--cta)]
  title = flavour.name (tooltip)

Quick-add (on hover, desktop):
  absolute bottom-0 inset-x-0 h-12
  bg rgba(255,255,255,0.92) backdrop-blur-sm
  "Add to Cart" DM Sans 13px weight-600 var(--text-primary) centered
  opacity 0 → 1 on group-hover, translateY(4px → 0) 200ms
```

#### 4.5 Ingredient Panel (ALWAYS VISIBLE — NEVER ACCORDION)

```
Container:
  border-radius: 16px
  border: 1px solid var(--border)
  background: #FFFFFF
  padding: 20px
  margin-top: 16px

Header:
  "What's in it. Everything. No exceptions."
  DM Sans 14px weight-700 var(--text-primary)
  margin-bottom: 12px

Ingredient text:
  DM Sans 14px weight-400 var(--text-secondary)
  line-height: 1.8
  word-break: normal

#nothingtohide badge (bottom of panel):
  pill bg var(--cta) text-white 11px uppercase weight-700
  padding: 4px 10px, margin-top: 12px
  link to /pages/nothingtohide
```

#### 4.6 Flavour Selector

```
Label: "Flavour" DM Sans 13px weight-600 mb-8px

Pills: flex flex-wrap gap-8px
  Each pill button:
    height: 36px
    padding: 0 16px
    border-radius: 100px (pill)
    DM Sans 13px weight-500

  Unselected: border 1.5px var(--border-focus), bg white, text var(--text-primary)
  Hover: border-color var(--cta)
  Selected: bg var(--cta), text white, border-color var(--cta)
```

#### 4.7 Pack Size Selector

```
Label: "Pack Size" DM Sans 13px weight-600 mb-8px

Pills: flex gap-8px
  Each shows: "Single — ₹150" / "6-Pack — ₹840"
  Same pill styling as flavour selector
  Selected shows: bg var(--cta), text white
  Price in display updates to match selected pack size
```

#### 4.8 Cart Drawer

```
Backdrop: fixed inset-0 bg-[var(--bg-overlay)] z-40
Drawer: fixed right-0 top-0 h-screen w-[400px] bg-white z-50
  border-left: 1px solid var(--border)
  Framer Motion: x 100% → 0, 280ms ease-out
  Mobile: full-width, slides from bottom

Header: h-16 border-b var(--border)
  "Your cart (2)" DM Sans 16px weight-600
  X Lucide icon right

Line items: flex-col gap-3 p-5 overflow-y-auto
  Each:
    flex gap-3
    Image: 72px × 72px, object-cover, rounded-[8px]
    Info: name 14px weight-600, flavour + pack 12px var(--text-secondary)
    Qty stepper: − n + , each 28px × 28px, border var(--border), radius 4px
    Remove: Lucide X 14px var(--text-tertiary) hover var(--text-secondary)

Delivery progress:
  "Free delivery on orders above ₹499" 12px var(--text-secondary)
  Track: 4px height, radius 2px, bg var(--bg-lavender)
  Fill: var(--cta), width: min((subtotal/49900)*100, 100)%
  Reached: "Free delivery unlocked!" var(--success)

Footer: border-t var(--border) p-5
  Subtotal row + "Checkout" full-width pill button
  "COD available at checkout" 12px var(--text-tertiary) centered
```

#### 4.9 Form Inputs

```
Height: 48px (larger for mobile finger targets)
Border: 1.5px solid var(--border-focus)
Border-radius: 12px
Background: white
Font: DM Sans 15px
Padding: 0 16px

Focus: outline 2px solid var(--cta), outline-offset 2px
Error: border-color var(--error)
Label: DM Sans 13px weight-600, mb-6px
```

---

### 5. Section Backgrounds (Alternating Pattern)

Homepage section order and backgrounds:
1. Announcement bar — `var(--cta)` (purple)
2. Navbar — white
3. Hero — white
4. Category tiles — `var(--bg-lavender)`
5. Transparency section — `var(--bg-warm)`
6. Best sellers — white
7. Testimonials — `var(--bg-warm)`
8. Press bar — white
9. Newsletter — `var(--cta)` (purple)
10. Footer — white

---

### 6. Motion Rules

**Allowed:**
- Cart drawer slide: `x: 100% → 0`, `280ms ease-out`
- Announcement bar dismiss: `height: 36px → 0`, `200ms ease`
- Product image swap on flavour change: `opacity 150ms ease`
- Quick-add reveal: `opacity 0 → 1`, `translateY 4px → 0`, `200ms ease`
- Section fade-in on scroll: `opacity 0 → 1`, `y 20 → 0`, `350ms ease-out`
- Toast: slide from bottom-right, `250ms ease-out`

**Forbidden:**
- Autoplay video
- Hero carousel / auto-advance
- Parallax
- Bounce easing
- Any decorative continuous loop

**Always:** `useReducedMotion()` — if true, skip all transitions (set duration to 0).

---

### 7. Anti-Patterns

- `rounded-lg` or `rounded-md` on buttons — always `rounded-full`
- Ingredient list inside accordion — always visible, always open
- Star ratings in testimonials section — use quotes only
- Gym imagery, shirtless models, "gains" language
- "Natural" as a marketing word (misleading in food context)
- `bg-purple-*` Tailwind classes — use `bg-[var(--cta)]`
- `text-gray-*` classes — use `var(--text-secondary)` or `var(--text-tertiary)`
- Price displayed without `formatPrice()` — always format as ₹
- Stock count displayed as number ("12 remaining") — show "Low stock" badge when count < 10 only
