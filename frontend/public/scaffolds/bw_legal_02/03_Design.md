# 03 — Design Tokens and Component CSS
## Top-Tier Indian Law Firm · bw_legal_platform_02

---

## `src/app/globals.css`

```css
/* ===========================
   AZB — CSS TOKENS
   =========================== */

:root {
  /* Dark navy — hero, dark sections, footer */
  --color-navy: #002346;

  /* Terracotta — headings, accents, CTA buttons.
     On white: 2.8:1 contrast — use ONLY on elements ≥18px tall.
     On navy: 4.6:1 — acceptable for large headings. */
  --color-terracotta: #B57560;

  /* Secondary blue — links, category tags, interactive accents */
  --color-blue: #00539B;

  /* Body text grey */
  --color-text: #6B6B6B;

  /* Black — strong headings on white backgrounds */
  --color-heading: #000000;

  /* Light section backgrounds */
  --color-surface: #ffffff;

  /* Card borders and separators */
  --color-border: #e5e7eb;

  /* Typography */
  --font-sans: var(--font-dm-sans, 'DM Sans', system-ui, sans-serif);

  /* Layout */
  --container: min(90%, 1280px);
  --section-pad: clamp(64px, 8vw, 112px);
}

/* === Base reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-surface);
  -webkit-font-smoothing: antialiased;
}

body { min-height: 100vh; }

a { color: inherit; text-decoration: none; }

img { display: block; max-width: 100%; }

/* Focus ring — terracotta visible on both white and navy backgrounds */
:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 3px;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Typography Scale

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Hero H1 | `clamp(2.75rem, 5.5vw, 4.5rem)` | 700 | `var(--color-terracotta)` | On navy bg |
| Hero subtitle | `1.25rem` | 300 | `rgba(255,255,255,0.9)` | On navy bg |
| Hero body | `1rem` | 400 | `rgba(255,255,255,0.75)` | On navy bg |
| Section H2 (light) | `clamp(1.5rem, 3vw, 2.5rem)` | 700 | `var(--color-heading)` | On white |
| Section H2 (dark) | `clamp(1.5rem, 3vw, 2.5rem)` | 700 | `#ffffff` | On navy |
| Practice card title | `0.9375rem` | 700 | `#ffffff` | UPPERCASE, 0.12em spacing |
| Person name | `1rem` | 600 | `var(--color-heading)` | |
| Person role | `0.8rem` | 500 | `var(--color-terracotta)` | Uppercase |
| Person quote | `0.9375rem` | 400 | `var(--color-text)` | Italic |
| Insight title | `1.125rem` | 600 | `var(--color-heading)` | 2-line clamp |
| Body | `0.875rem` / 1.7 | 400 | `var(--color-text)` | |
| Nav link | `0.875rem` | 500 | `var(--color-heading)` | Light bg |
| Nav link (dark) | `0.875rem` | 500 | `rgba(255,255,255,0.9)` | Dark bg |
| Stat value | `3rem` | 700 | `var(--color-heading)` | |
| Stat label | `0.875rem` | 400 | `var(--color-text)` | |

**Zero serif** — all elements use `var(--font-sans)`.

---

## StickyNav — `StickyNav.module.css`

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background 400ms ease, border-color 400ms ease;
}

/* Dark state — when any [data-dark-section] is in viewport */
.dark {
  background: rgba(0, 35, 70, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}

.container {
  width: var(--container);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-navy);
  letter-spacing: -0.01em;
  flex-shrink: 0;
  transition: color 400ms ease;
}

.dark .logo {
  color: #fff;
}

.links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-heading);
  transition: color 200ms ease;
}

.link:hover { color: var(--color-terracotta); }

.dark .link {
  color: rgba(255, 255, 255, 0.85);
}

.dark .link:hover {
  color: var(--color-terracotta);
}
```

---

## HeroTabs — `HeroTabs.module.css`

```css
.hero {
  min-height: 100vh;
  background: var(--color-navy);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Geometric ellipse pattern overlay */
.pattern {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 55%;
  height: 120%;
  pointer-events: none;
  /* SVG background — abstract ellipses in terracotta at 5% opacity */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Cellipse cx='400' cy='300' rx='280' ry='180' fill='none' stroke='%23B57560' stroke-width='1' opacity='0.12'/%3E%3Cellipse cx='350' cy='500' rx='200' ry='140' fill='none' stroke='%23B57560' stroke-width='1' opacity='0.08'/%3E%3Cellipse cx='500' cy='200' rx='150' ry='100' fill='rgba(181,117,96,0.05)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.container {
  width: var(--container);
  margin: 0 auto;
  padding-top: 72px;  /* nav height offset */
  position: relative;
  z-index: 1;
}

/* Tab bar */
.tabList {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 64px;
  width: fit-content;
}

.tab {
  background: none;
  border: none;
  padding: 16px 32px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  position: relative;
  transition: color 200ms ease;
  letter-spacing: 0.02em;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.8);
}

.activeTab {
  color: #fff;
  font-weight: 600;
}

/* Active underline */
.activeTab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-terracotta);
}

/* Tab panel content */
.panel {
  max-width: 680px;
}

.headline {
  font-family: var(--font-sans);
  font-size: clamp(2.75rem, 5.5vw, 4.5rem);
  font-weight: 700;
  color: var(--color-terracotta);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.subheading {
  font-size: 1.25rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 16px;
}

.body {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.75;
  margin-bottom: 40px;
  max-width: 520px;
}

/* Arrow text CTA — not a button */
.cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 2px;
  transition: border-color 200ms ease, color 200ms ease;
}

.cta:hover {
  color: var(--color-terracotta);
  border-color: var(--color-terracotta);
}
```

---

## PracticeAreas — `PracticeAreas.module.css`

```css
.section {
  padding: var(--section-pad) 0;
  background: var(--color-navy);
  position: relative;
  overflow: hidden;
}

.pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  pointer-events: none;
  opacity: 0.04;
  /* Same SVG pattern as hero — extremely subtle on dark bg */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='600'%3E%3Cellipse cx='300' cy='250' rx='240' ry='160' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.container {
  width: var(--container);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.dotLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-terracotta);
  margin-bottom: 16px;
}

.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-terracotta);
  flex-shrink: 0;
}

.sectionTitle {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 48px;
  letter-spacing: -0.01em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;   /* 10px — not 0 */
  padding: 28px 24px;
  transition: background 200ms ease, border-color 200ms ease;
  cursor: pointer;
}

.card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(181, 117, 96, 0.4);
}

.cardTitle {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
  line-height: 1.3;
}

.cardDesc {
  font-size: 0.8125rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.arrowLink {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-terracotta);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 150ms ease;
}

.arrowLink:hover { gap: 8px; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## PeopleGrid — `PeopleGrid.module.css`

```css
.section {
  padding: var(--section-pad) 0;
  background: var(--color-surface);
}

.container {
  width: var(--container);
  margin: 0 auto;
}

.filterBar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  align-items: center;
}

.searchInput,
.select {
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: 9999px;  /* Pill-shaped inputs match pill button aesthetic */
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-heading);
  background: var(--color-surface);
  outline: none;
  transition: border-color 200ms ease;
}

.searchInput { min-width: 220px; }
.select { appearance: none; padding-right: 36px; cursor: pointer; }

.searchInput:focus, .select:focus {
  border-color: var(--color-terracotta);
}

.resetBtn {
  height: 44px;
  padding: 0 20px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 200ms, color 200ms;
}

.resetBtn:hover {
  border-color: var(--color-terracotta);
  color: var(--color-terracotta);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px;
  transition: box-shadow 200ms ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 35, 70, 0.10);
}

.photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
  /* Full color — NO grayscale filter */
}

.name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 4px;
}

.role {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-terracotta);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.practice {
  font-size: 0.8rem;
  color: var(--color-text);
  margin-bottom: 14px;
}

.quote {
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--color-text);
  line-height: 1.65;
  border-left: 2px solid var(--color-terracotta);
  padding-left: 12px;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## CredentialsStrip — `CredentialsStrip.module.css`

```css
.strip {
  padding: 64px 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.container {
  width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.stat {
  border-left: 4px solid var(--color-terracotta);
  padding-left: 20px;
}

.value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.label {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .container { grid-template-columns: repeat(2, 1fr); }
}
```

---

## PillButton — `PillButton.module.css`

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 200ms, background 200ms, color 200ms;
  text-decoration: none;
  white-space: nowrap;
  border: none;
  letter-spacing: 0.04em;
}

.md { height: 44px; padding: 0 28px; font-size: 0.875rem; }
.sm { height: 38px; padding: 0 20px; font-size: 0.8125rem; }

/* Primary — terracotta bg, white text (3.8:1 on 44px button — acceptable large interactive) */
.primary { background: var(--color-terracotta); color: #fff; }
.primary:hover { opacity: 0.88; }

/* Secondary — terracotta border */
.secondary { background: transparent; color: var(--color-terracotta); border: 2px solid var(--color-terracotta); }
.secondary:hover { background: var(--color-terracotta); color: #fff; }

/* Ghost — white border on dark bg */
.ghost { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.6); }
.ghost:hover { background: rgba(255,255,255,0.1); }
```

---

## Anti-Patterns Table

| Wrong | Correct | Why |
|-------|---------|-----|
| Any serif font (Playfair, etc.) | DM Sans only | AZB is pure sans-serif — no serif split |
| `border-radius: 0` on cards | `border-radius: 10px` | CAM's 0px is wrong for this brand |
| `filter: grayscale(1)` on people photos | Full color always | AZB shows warmth, not restraint |
| Gold L-bracket `::before` corners | Terracotta dots + nav section | GoldCorner is bw_legal_01's pattern |
| Nav switches at scroll position 200px | IntersectionObserver on `[data-dark-section]` | Position-based is less accurate |
| Missing `data-dark-section` on navy sections | Add to hero + practice areas section | Nav won't switch without this attr |
| Terracotta text at 12px | Terracotta only on elements ≥18px | 2.8:1 contrast fails WCAG AA small text |
| Hero with prose + gold rule | Tabbed hero with 4 tabs | Different site — replace the pattern entirely |
| Full-screen count-up strip (purple) | White strip with terracotta left-border per stat | AZB doesn't use full-width color strips for credentials |
| `border-radius: 9999px` on cards | Cards use `10px`, only buttons use `9999px` | Two radius values in this system |
| Orange, green, red accent colors | Navy + terracotta + blue only | Off-brand |
| Star ratings on insights | Category pill + formal title only | Unprofessional for legal |
