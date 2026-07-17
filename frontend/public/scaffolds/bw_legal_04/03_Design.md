# 03 — Design
## Productized Indian Legal Services · bw_legal_platform_04

---

## `globals.css` — Exactly 8 Tokens

```css
/* src/app/globals.css */

:root {
  --color-navy:    #022B50;
  --color-yellow:  #FFD000;
  --color-blue:    #007AFF;
  --color-surface: #F5FAFF;
  --color-text:    #231F20;
  --color-muted:   #606162;
  --color-border:  #E4E7EB;
  --color-white:   #FFFFFF;

  --font-sans: 'Roboto', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--color-white);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## `Button.module.css`

```css
/* src/components/ui/Button.module.css */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;        /* THE defining constraint — never 4px, never 9999px */
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 200ms ease, background 200ms ease;
  text-decoration: none;
  border: none;
  white-space: nowrap;
}

.md {
  height: 48px;
  padding: 0 28px;
  font-size: 0.9375rem;
}

.sm {
  height: 36px;
  padding: 0 18px;
  font-size: 0.875rem;
}

/* Variants */
.primary {
  background: var(--color-navy);
  color: var(--color-white);
}

.primary:hover {
  opacity: 0.85;
}

.secondary {
  background: transparent;
  color: var(--color-navy);
  border: 1.5px solid var(--color-navy);
}

.secondary:hover {
  background: var(--color-navy);
  color: var(--color-white);
}

.yellow {
  background: var(--color-yellow);
  color: var(--color-navy);
}

.yellow:hover {
  opacity: 0.88;
}

.fullWidth {
  width: 100%;
}

.btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

---

## `StickyNav.module.css`

```css
/* src/components/layout/StickyNav.module.css */

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.inner {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-navy);
  text-decoration: none;
  flex-shrink: 0;
}

.logo span {
  color: var(--color-blue);
}

.links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
  justify-content: center;
  list-style: none;
}

.link {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 150ms ease;
}

.link:hover {
  color: var(--color-navy);
}

/* Nav CTA — yellow button, navy text */
.cta {
  height: 40px;
  padding: 0 20px;
  background: var(--color-yellow);
  color: var(--color-navy);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  transition: opacity 200ms ease;
}

.cta:hover {
  opacity: 0.88;
}

@media (max-width: 768px) {
  .links { display: none; }
}
```

---

## `Hero.module.css`

```css
/* src/components/home/Hero.module.css */

.section {
  background: var(--color-white);
  min-height: 75vh;
  display: flex;
  align-items: center;
  padding: 80px 24px;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 64px;
  align-items: center;
}

/* Left column */
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-blue);
}

.h1 {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 700;
  color: var(--color-navy);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.subheading {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 480px;
}

/* Ratings row */
.ratingsRow {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.ratingsRow .divider {
  color: var(--color-border);
  font-size: 1.25rem;
}

.isoBadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-navy);
}

.guarantee {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.guarantee strong {
  color: var(--color-navy);
  font-weight: 600;
}

/* CTA row */
.ctaRow {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Right column — service preview card */
.visual {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
  padding: 28px;
}

.visualTitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.visualItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}

.visualItem:last-child {
  border-bottom: none;
}

.visualServiceName {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-navy);
}

.visualPrice {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-navy);
}

.visualOriginalPrice {
  font-size: 0.8125rem;
  color: var(--color-muted);
  text-decoration: line-through;
  margin-right: 6px;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .visual {
    display: none;
  }
}
```

---

## `RatingBadge.module.css`

```css
/* src/components/ui/RatingBadge.module.css */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
}

.platform {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-navy);
}

.star {
  font-size: 0.875rem;
}

.rating {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-navy);
}

.count {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-muted);
}
```

---

## `ServiceTabs.module.css`

```css
/* src/components/home/ServiceTabs.module.css */

.section {
  background: var(--color-white);
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 40px;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-navy);
}

.heading p {
  margin-top: 10px;
  font-size: 1rem;
  color: var(--color-muted);
}

/* Tab strip */
.tabStrip {
  display: flex;
  gap: 0;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 40px;
  overflow-x: auto;
}

.tab {
  padding: 12px 24px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-muted);
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: color 150ms ease, border-color 150ms ease;
  white-space: nowrap;
  margin-bottom: -2px;    /* sits on top of strip border */
}

.tab:hover {
  color: var(--color-navy);
}

.activeTab {
  color: var(--color-navy);
  font-weight: 600;
  border-bottom-color: var(--color-yellow);
}

/* Card grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
}
```

---

## `ProductCard.module.css`

```css
/* src/components/home/ProductCard.module.css */

.card {
  position: relative;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
  transform: translateY(-2px);
}

/* Most Popular card */
.card.popular {
  border-color: var(--color-navy);
}

/* Ribbon */
.popularRibbon {
  position: absolute;
  top: -1px;
  right: 16px;
  background: var(--color-yellow);
  color: var(--color-navy);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 0 0 6px 6px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-navy);
  padding-right: 48px;   /* space for popular ribbon */
}

/* Pricing block */
.pricing {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.originalPrice {
  font-size: 0.9375rem;
  color: var(--color-muted);
  text-decoration: line-through;   /* semantic del handles this but CSS reinforces */
}

.discountedPrice {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-navy);
}

.discountBadge {
  background: var(--color-yellow);
  color: var(--color-navy);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.govtFee {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.delivery {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--color-blue);
  font-weight: 500;
}

/* Feature list */
.features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.4;
}

.checkIcon {
  color: var(--color-blue);
  flex-shrink: 0;
  margin-top: 2px;
}
```

---

## `TrustSignals.module.css`

```css
/* src/components/home/TrustSignals.module.css */

.section {
  background: var(--color-surface);
  padding: 72px 24px;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.iconWrapper {
  width: 48px;
  height: 48px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-navy);
}

.headline {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-navy);
}

.subtext {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-muted);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

---

## `HowItWorks.module.css`

```css
/* src/components/home/HowItWorks.module.css */

.section {
  background: var(--color-white);
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 64px;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-navy);
}

/* 5-col grid: step | connector | step | connector | step */
.steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 0;
}

/* Yellow connector line */
.connector {
  height: 2px;
  background: var(--color-yellow);
  margin-top: 19px;      /* aligns with circle center (40px / 2 = 20px, minus 1px) */
  width: 48px;
}

.step {
  text-align: center;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-navy);
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stepTitle {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-navy);
}

.stepDesc {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .connector {
    display: none;
  }
}
```

---

## `Footer.module.css`

```css
/* src/components/layout/Footer.module.css */

.footer {
  background: var(--color-navy);
  padding: 64px 24px 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
  text-decoration: none;
  display: block;
  margin-bottom: 12px;
}

.logo span {
  color: var(--color-yellow);
}

.tagline {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
  max-width: 240px;
}

.columnHeading {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 16px;
}

.linkList {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.linkList a {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 150ms ease;
}

.linkList a:hover {
  color: var(--color-yellow);    /* yellow on hover, not white — brand accent */
}

.bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.4);
}

.certBadges {
  display: flex;
  align-items: center;
  gap: 20px;
}

.certBadge {
  display: flex;
  align-items: center;
  gap: 6px;
}

.certBadge img {
  height: 22px;
  width: auto;
  opacity: 0.5;
  filter: brightness(0) invert(1);
}

.certBadge span {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .bottom { flex-direction: column; align-items: flex-start; }
}
```

---

## Anti-Patterns Table

| Anti-Pattern | Why It's Wrong | Correct Pattern |
|--------------|----------------|-----------------|
| Dark section backgrounds | bw_legal_03 (ClearTax) pattern — this build is light/white | `background: var(--color-white)` or `var(--color-surface)` |
| `border-radius: 9999px` on buttons | Law firm pill pattern (bw_legal_01/02) | `border-radius: 6px` exactly |
| `border-radius: 4px` on buttons | ClearTax SaaS signal (bw_legal_03) | `border-radius: 6px` exactly |
| `border-radius: 0` on cards | CAM sharp card (bw_legal_01) | `border-radius: 10px` + shadow |
| No card shadows | Ghost card pattern from bw_legal_03 | `box-shadow: 0 4px 18px rgba(0,0,0,0.08)` on white cards |
| "Contact for pricing" | Erodes consumer trust; law firm pattern | Show `discountedPrice` + `<del>originalPrice</del>` on every card |
| Single rating source | Missing Trustpilot or missing Google | Both `RatingBadge` instances in hero — neither is optional |
| Removing money-back guarantee | Reduces conversion for anxious first-time registrants | Always in TrustSignals AND hero subtext |
| Serif font | Law firm signal (bw_legal_01 Playfair) | Roboto only, weights 400–700 |
| Purple, terracotta accent | bw_legal_01/02 palette — wrong category | Navy + yellow only |
| White text on yellow CTA | Fails WCAG — yellow `#FFD000` vs white = 1.07:1 (catastrophic) | Navy text on yellow: `color: var(--color-navy)` |
| Blue CTA buttons | ClearTax brand colour — wrong for this build | Primary = navy bg; Accent CTA = yellow bg |
| Centered hero | bw_legal_03 pattern — this build is split 55/45 | Grid split: `grid-template-columns: 55fr 45fr` |
| Tabs with `border-radius: 9999px` pill indicator | Wrong radius signal | Active tab: `border-bottom: 3px solid var(--color-yellow)` underline |
| Hex in `.module.css` | Un-refactorable; token system broken | Only `var(--color-*)` in module files |
| "Most Popular" badge inside card | Affects card height/alignment | `position: absolute; top: -1px; right: 16px` on card |
