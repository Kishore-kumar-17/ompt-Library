# 03 — Design System and UI Specifications
## SaaS Project Management Platform

---

## 1. Design Philosophy

Fast, precise, dark. The product is used by engineers who notice when things are 1px off. The design earns trust through restraint — not through decoration. Every element exists because it serves a function. When in doubt, remove it.

The product should feel like it was built by people who use it. Not designed for a pitch deck. Designed for a 4-hour coding session.

What the design is NOT: playful, warm, bubbly, corporate, gradient-heavy, illustration-led.

---

## 2. Brand Identity

**Voice:** Direct. Minimal. Slightly terse — like a senior engineer explaining something. No filler words. No exclamation marks. No "seamlessly" or "effortlessly."

**What we are:** Precise. Fast. Opinionated.
**What we are not:** Friendly. Casual. Corporate.

**Copy examples:**
- Button: "Create issue" not "Start creating your issue!"
- Empty state: "No issues in this cycle" not "Looks like you're all caught up!"
- Error: "Issue not found" not "Oops! We couldn't find that issue."

---

## 3. Color System

All colors defined as CSS variables in `globals.css`. Never hardcode hex in components.

```css
:root {
  /* Backgrounds */
  --bg-primary: #08090A;       /* Main app background */
  --bg-surface: #141517;       /* Cards, panels, sidebars */
  --bg-elevated: #1C1D20;      /* Modals, dropdowns, popovers */
  --bg-hover: #212226;         /* Hover state on surface items */
  --bg-active: #26272B;        /* Active/selected state */

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);   /* Structural borders */
  --border-default: rgba(255,255,255,0.10);  /* Default input borders */
  --border-strong: rgba(255,255,255,0.18);   /* Focused input borders */

  /* Text */
  --text-primary: #E4E5E9;                   /* Main text */
  --text-secondary: rgba(255,255,255,0.48);  /* Supporting text */
  --text-tertiary: rgba(255,255,255,0.28);   /* Placeholder, meta */
  --text-disabled: rgba(255,255,255,0.18);   /* Disabled state */

  /* Accent */
  --accent: #5E6AD2;
  --accent-hover: #6E7AE2;
  --accent-subtle: rgba(94,106,210,0.12);    /* Accent background tint */

  /* Status */
  --status-backlog: rgba(255,255,255,0.28);
  --status-todo: #5E6AD2;
  --status-in-progress: #F2C94C;
  --status-in-review: #9B51E0;
  --status-done: #4AB87A;
  --status-cancelled: rgba(255,255,255,0.18);

  /* Priority */
  --priority-urgent: #E85D4A;
  --priority-high: #F2994A;
  --priority-medium: #F2C94C;
  --priority-low: rgba(255,255,255,0.48);
  --priority-none: rgba(255,255,255,0.18);

  /* Functional */
  --destructive: #E85D4A;
  --success: #4AB87A;
  --warning: #F2C94C;
}
```

**Dark mode only.** No light mode in v1. `data-theme` attribute not needed.

---

## 4. Typography

**Typeface:** Inter Variable. Load from Google Fonts or bundle locally.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'; /* Better Inter letterforms */
}
```

**Type scale:**

| Name | Size | Weight | Line-height | Letter-spacing | Use |
|------|------|--------|-------------|----------------|-----|
| display | `clamp(32px,4vw,48px)` | 500 | 1.1 | -0.03em | Marketing hero only |
| heading-1 | `24px` | 600 | 1.2 | -0.02em | Page titles |
| heading-2 | `18px` | 600 | 1.3 | -0.01em | Section headers |
| heading-3 | `14px` | 600 | 1.4 | 0 | Card titles, group headers |
| body | `14px` | 400 | 1.6 | 0 | Default app text |
| body-sm | `13px` | 400 | 1.5 | 0 | Secondary app text |
| label | `12px` | 500 | 1.4 | 0.01em | Labels, tags, chips |
| micro | `11px` | 500 | 1.3 | 0.02em | Timestamps, metadata |

**Reading width:** Max 680px for body text in descriptions and comments. Not enforced on issue lists.

---

## 5. Spacing and Layout

**Base unit:** 4px. All spacing values are multiples of 4.

**Spacing scale:**
```
4px  (1) — icon gaps, tight internal padding
8px  (2) — small padding, list item gaps
12px (3) — medium padding
16px (4) — standard component padding
20px (5) — generous component padding
24px (6) — section padding
32px (8) — large section gaps
48px (12) — extra-large gaps
```

**App layout:**
- Sidebar width: `240px` (fixed, collapsible to `52px` icon-only mode)
- Content area: `calc(100vw - 240px)` max-width `1200px`
- Top bar height: `48px`
- Issue detail panel: `480px` (side-by-side on wide screens, full-screen on narrow)

**Grid:** Not a traditional column grid — the app uses fixed sidebar + fluid content. No 12-column grid inside the product.

---

## 6. Components

### Buttons

```
Primary:    bg-[var(--accent)]       text-white    h-8 px-3 text-[13px] font-medium rounded-[6px]
Secondary:  bg-[var(--bg-hover)]     text-primary  h-8 px-3 text-[13px] font-medium rounded-[6px]
Ghost:      bg-transparent           text-secondary h-8 px-3 text-[13px] rounded-[6px] hover:bg-hover
Danger:     bg-[var(--destructive)]  text-white    h-8 px-3 text-[13px] font-medium rounded-[6px]
Icon:       bg-transparent           h-7 w-7       rounded-[6px] flex items-center justify-center hover:bg-hover
```

All buttons: `transition-colors duration-100`. Disabled: `opacity-40 cursor-not-allowed`.

### Inputs

```
height: 32px
padding: 0 12px
background: var(--bg-surface)
border: 1px solid var(--border-default)
border-radius: 6px
font-size: 14px
color: var(--text-primary)
placeholder color: var(--text-tertiary)

Focus:
  border-color: var(--border-strong)
  outline: 2px solid var(--accent-subtle)
  outline-offset: 0
```

### Cards / Panels

```
background: var(--bg-surface)
border: 1px solid var(--border-subtle)
border-radius: 8px
padding: 16px
```

### Issue row (list item)

```
height: 36px
padding: 0 16px
border-bottom: 1px solid var(--border-subtle)
display: flex; align-items: center; gap: 8px

Hover: background var(--bg-hover)
Selected: background var(--bg-active)

Contents (left to right):
  [status icon 16px] [priority icon 12px] [issue ID 11px tertiary] [title 14px primary] [spacer] [assignee avatar 20px] [label chips] [due date 12px tertiary]
```

### Sidebar item

```
height: 32px
padding: 0 8px
border-radius: 6px
font-size: 13px
color: var(--text-secondary)
display: flex; align-items: center; gap: 8px

Hover: background var(--bg-hover), color var(--text-primary)
Active: background var(--bg-active), color var(--text-primary)
```

### Modal / Dialog

```
background: var(--bg-elevated)
border: 1px solid var(--border-subtle)
border-radius: 12px
padding: 24px
max-width: 560px
box-shadow: 0 16px 48px rgba(0,0,0,0.5)
Overlay: rgba(0,0,0,0.6) backdrop
```

### Command palette

```
width: 560px
max-height: 400px
background: var(--bg-elevated)
border: 1px solid var(--border-default)
border-radius: 12px
box-shadow: 0 24px 64px rgba(0,0,0,0.6)
Positioned: fixed, centered, top 20% of viewport

Input: 48px height, 16px font, no border, background transparent
Results: 36px per row, same as sidebar item pattern
```

### Toast / notification

```
background: var(--bg-elevated)
border: 1px solid var(--border-default)
border-radius: 8px
padding: 12px 16px
font-size: 13px
max-width: 320px
Position: bottom-right, 16px from edge
```

### Avatar

```
Sizes: 20px (list), 24px (comments), 32px (profile)
Border-radius: 50%
Fallback: initials on var(--bg-active) background
```

---

## 7. Photography and Imagery

No stock photography anywhere in the product. The product UI is the visual.

Marketing site only: product screenshots and screen recordings. All screenshots must be taken from the actual product — no mockups or Figma exports used as final imagery.

---

## 8. Iconography

Library: Lucide React.

**Rules:**
- Default size: `16px` in app, `14px` in sidebar, `20px` in empty states
- Stroke width: `1.5` always
- Color: inherit from parent (use `currentColor`)
- Never use filled icons — outline only
- Do not add icon labels if the context makes the icon clear

**Status icons (custom, not Lucide):**
- Backlog: dashed circle
- Todo: empty circle
- In Progress: half-filled circle
- In Review: circle with triangle inside
- Done: filled circle with check
- Cancelled: circle with x

These must be SVG components, not Lucide icons.

---

## 9. Motion and Animation

**What can animate:**
- Modal open/close: `opacity + scale(0.97→1)`, `150ms ease-out`
- Sidebar collapse: `width` transition, `200ms ease-in-out`
- Toast appear: `translateY(8px→0) + opacity`, `200ms ease-out`
- Dropdown open: `opacity + translateY(-4px→0)`, `100ms ease-out`
- Issue row hover: `background-color`, `100ms ease`
- Command palette open: `opacity + scale(0.98→1)`, `150ms ease-out`

**What cannot animate:**
- Page transitions — instant navigation
- Issue list reordering — instant, no drag animation in v1
- Real-time updates — instant appearance, no pop-in animation
- Loading states — skeleton only, no spinner pulse animations
- Anything that runs continuously

**Reduced motion:** All animations above wrap in:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 10. Accessibility

**Target:** WCAG AA.

**Contrast requirements:**
- Body text on bg-primary: minimum 4.5:1
- Secondary text on bg-primary: minimum 3:1 (large text equivalent)
- Interactive elements: minimum 3:1 for component boundary

**Focus management:**
- Focus ring: `outline: 2px solid var(--accent)` with `outline-offset: 2px`
- Focus visible only on keyboard navigation (`:focus-visible`, not `:focus`)
- Modal opens → focus moves to first interactive element
- Modal closes → focus returns to trigger element
- Command palette: arrow keys navigate, Enter selects, Esc closes

**Keyboard shortcuts (all must work):**

| Key | Action |
|-----|--------|
| C | Open create issue modal |
| K | Open command palette |
| J | Next issue in list |
| K (in list) | Previous issue in list |
| Enter | Open selected issue |
| Esc | Close modal / deselect |
| Ctrl+Enter | Submit form |
| ? | Open keyboard shortcut reference |

**Semantic HTML:**
- `<nav>` for sidebar navigation
- `<main>` for content area
- `<header>` for top bar
- `<button>` for all interactive controls (not `<div onClick>`)
- `<dialog>` for modals (via Radix Dialog)
- `aria-label` on all icon-only buttons

---

## 11. Responsive Design

The app is desktop-first. Mobile is supported but not optimised in v1.

**Breakpoints:**
- `1280px+` — full layout (sidebar + content + detail panel side-by-side)
- `1024px–1279px` — sidebar collapsed by default, detail panel full-width when open
- `768px–1023px` — sidebar hidden, accessible via hamburger
- `<768px` — mobile: single column, simplified navigation, no keyboard shortcuts overlay

**Layout shifts at breakpoints:**
- `<1024px`: issue detail opens full-screen, not side-by-side
- `<768px`: sidebar becomes bottom navigation bar

---

## 12. Specific Page Designs

**App shell:**
```
[Sidebar 240px fixed left]
  [Workspace switcher]
  [Navigation: Inbox, My Issues, All Issues]
  [Teams section]
    [Team name]
      [Issues]
      [Cycles]
      [Projects]
  [Settings link at bottom]

[Main content area]
  [Top bar 48px: breadcrumb left, actions right]
  [Content: issue list / detail / cycle view]
```

**Issue list:**
- Filter bar at top: status, assignee, priority, label filters
- Issue rows: 36px height, full-width, sortable by clicking column headers
- Group by: status (default), assignee, priority, label, cycle
- No pagination — virtual scroll for performance

**Issue detail:**
- Title (editable inline), status (dropdown), priority (dropdown), assignee (user picker)
- Description: markdown editor (CodeMirror or similar)
- Right panel: metadata (created, updated, cycle, project, labels)
- Activity log at bottom: chronological, most recent last
- Comments below activity log

**Cycle view:**
- Header: cycle name, date range, progress bar (issues completed / total)
- Issue list filtered to cycle
- Backlog section below: unscheduled issues that can be dragged in

---

## 13. Design Tokens (for code)

```typescript
// lib/tokens.ts
export const tokens = {
  colors: {
    bgPrimary: 'var(--bg-primary)',
    bgSurface: 'var(--bg-surface)',
    bgElevated: 'var(--bg-elevated)',
    bgHover: 'var(--bg-hover)',
    bgActive: 'var(--bg-active)',
    accent: 'var(--accent)',
    accentHover: 'var(--accent-hover)',
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textTertiary: 'var(--text-tertiary)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
  }
}
```

---

## 14. Things to Avoid

- `#000000` or `#ffffff` as direct color values — always use CSS variables
- `box-shadow` on issue rows or sidebar items — use `background-color` hover instead
- Rounded corners larger than `12px` anywhere in the product
- Colored backgrounds on status badges — use colored icons with transparent background
- Gradients in the product UI (marketing only, and sparingly)
- Borders thicker than `1px`
- Font size below `11px`
- Multiple font weights in a single UI component
- Tooltips on hover for actions that have keyboard shortcuts — show the shortcut in the tooltip

---

## 15. Open Design Questions

- DQ1: Should the sidebar support drag-to-reorder teams? Deferred to v2.
- DQ2: Should issue rows show a preview of the description on hover? Deferred to v2.
