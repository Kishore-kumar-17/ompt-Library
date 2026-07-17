# 03 — Design
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## `globals.css` — Exactly 8 Tokens

```css
/* src/app/globals.css */

:root {
  --color-dark:       #151515;
  --color-darker:     #0d0d0d;
  --color-blue:       #1678FB;
  --color-blue-tint:  rgba(22, 120, 251, 0.08);
  --color-text:       #EDEFF2;
  --color-muted:      #929FB0;
  --color-border:     rgba(155, 170, 189, 0.3);
  --color-surface:    rgba(255, 255, 255, 0.04);

  --font-sans: 'Plus Jakarta Sans', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background: var(--color-dark);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--color-dark);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Token count enforcement:** Exactly 8 `--color-*` tokens. No additional colors. No hex values in component `.module.css` files.

---

## `Button.module.css`

```css
/* src/components/ui/Button.module.css */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;        /* THE defining constraint — never 0, never 9999px */
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms ease, opacity 200ms ease;
  text-decoration: none;
  border: none;
  white-space: nowrap;
}

/* Sizes */
.md {
  height: 48px;
  padding: 0 24px;
  font-size: 0.9375rem;
}

.sm {
  height: 36px;
  padding: 0 16px;
  font-size: 0.875rem;
}

/* Variants */
.primary {
  background: var(--color-blue);
  color: var(--color-text);
}

.primary:hover {
  opacity: 0.88;
}

.secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.secondary:hover {
  border-color: var(--color-blue);
  color: var(--color-blue);
}

/* Full-width (used in ServiceTier cards) */
.fullWidth {
  width: 100%;
}

/* Disabled */
.btn:disabled {
  opacity: 0.4;
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
  background: var(--color-darker);
  border-bottom: 0.5px solid var(--color-border);
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
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
  flex-shrink: 0;
}

.logo span {
  color: var(--color-blue);
}

.links {
  display: flex;
  align-items: center;
  gap: 32px;
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
  color: var(--color-text);
}

.cta {
  height: 40px;
  padding: 0 20px;
  background: var(--color-blue);
  color: var(--color-text);
  border-radius: 4px;
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
  .links {
    display: none;
  }
}
```

---

## `Hero.module.css`

```css
/* src/components/home/Hero.module.css */

.section {
  min-height: 80vh;
  background: var(--color-dark);
  display: flex;
  align-items: center;
  padding: 96px 24px 80px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-blue);
}

.h1 {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.subheading {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  color: var(--color-muted);
  max-width: 560px;
  line-height: 1.6;
}

.trustRow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
  color: var(--color-muted);
  flex-wrap: wrap;
  justify-content: center;
}

.trustRow span {
  color: var(--color-text);
  font-weight: 600;
}

.trustDivider {
  color: var(--color-border);
  font-weight: 300;
}

.ctaRow {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 480px) {
  .ctaRow {
    flex-direction: column;
    width: 100%;
  }

  .ctaRow > * {
    width: 100%;
  }
}
```

---

## `TrustStrip.module.css`

```css
/* src/components/home/TrustStrip.module.css */

.strip {
  background: var(--color-dark);
  border-top: 0.5px solid var(--color-border);
  border-bottom: 0.5px solid var(--color-border);
  padding: 32px 0;
  overflow: hidden;
}

/* Logo marquee */
.marqueeWrapper {
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.track {
  display: flex;
  width: 200%;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}

.logo {
  height: 28px;
  width: auto;
  margin: 0 32px;
  opacity: 0.5;
  filter: brightness(0) invert(1);   /* force monochrome white on dark bg */
  flex-shrink: 0;
}

/* Certification badges */
.certs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 28px;
  padding: 0 24px;
  flex-wrap: wrap;
}

.cert {
  display: flex;
  align-items: center;
  gap: 10px;
}

.certIcon {
  width: 32px;
  height: 32px;
  opacity: 0.7;
}

.certName {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.certSub {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-muted);
}
```

---

## `ServiceTiers.module.css`

```css
/* src/components/home/ServiceTiers.module.css */

.section {
  background: var(--color-dark);
  padding: 96px 24px;
  border-top: 0.5px solid var(--color-border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 56px;
}

.heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
}

.heading p {
  margin-top: 12px;
  font-size: 1rem;
  color: var(--color-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
}

/* Card wrapper — holds the "Recommended" badge outside the card */
.cardWrapper {
  position: relative;
  padding-top: 20px;   /* space for the absolute badge */
}

.recommendedBadge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-blue);
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 4px;
  white-space: nowrap;
}

/* Base card */
.card {
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
  border-radius: 8px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Recommended card override */
.card.recommended {
  border-color: var(--color-blue);
  background: var(--color-blue-tint);
}

.cardHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tierName {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.5;
}

/* Feature list */
.features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--color-text);
}

.feature.excluded {
  color: var(--color-muted);
}

.featureIcon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.featureIcon.check {
  color: var(--color-blue);
}

.featureIcon.dash {
  color: var(--color-muted);
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

## `HowItWorks.module.css`

```css
/* src/components/home/HowItWorks.module.css */

.section {
  background: var(--color-dark);
  padding: 96px 24px;
  border-top: 0.5px solid var(--color-border);
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
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
}

.steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 0;
}

/* Connector line between steps — desktop only */
.connector {
  height: 1px;
  background: rgba(22, 120, 251, 0.3);
  margin-top: 20px;      /* aligns with centre of the number circle */
  flex-shrink: 0;
}

.step {
  text-align: center;
  padding: 0 16px;
}

.number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-blue);
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.stepTitle {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.stepDesc {
  font-size: 0.9375rem;
  font-weight: 400;
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

## `StatsRow.module.css`

```css
/* src/components/home/StatsRow.module.css */

.section {
  background: var(--color-dark);     /* NOT a colored strip — same dark bg */
  padding: 96px 24px;
  border-top: 0.5px solid var(--color-border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.item {
  text-align: center;
}

.stat {
  display: inline-block;
}

.value {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
  display: block;
}

.label {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-muted);
  margin-top: 8px;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}
```

---

## `ExpertStrip.module.css`

```css
/* src/components/home/ExpertStrip.module.css */

.section {
  background: var(--color-dark);
  padding: 96px 24px;
  border-top: 0.5px solid var(--color-border);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-blue);
  margin-bottom: 16px;
}

.heading {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 56px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.stat {
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
  border-radius: 8px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.icon {
  color: var(--color-blue);
  width: 32px;
  height: 32px;
}

.statValue {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
}

.statLabel {
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
```

---

## `Footer.module.css`

```css
/* src/components/layout/Footer.module.css */

.footer {
  background: var(--color-darker);
  border-top: 0.5px solid var(--color-border);
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
  margin-bottom: 56px;
}

/* Column 1 — Logo + tagline */
.brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
}

.logo span {
  color: var(--color-blue);
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.6;
  max-width: 240px;
}

/* Columns 2–4 */
.columnHeading {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
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
  color: var(--color-muted);
  text-decoration: none;
  transition: color 150ms ease;
}

.linkList a:hover {
  color: var(--color-blue);
}

/* Bottom bar */
.bottom {
  border-top: 0.5px solid var(--color-border);
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.certBadges {
  display: flex;
  align-items: center;
  gap: 24px;
}

.certBadge {
  display: flex;
  align-items: center;
  gap: 6px;
}

.certBadge img {
  width: 24px;
  height: 24px;
  opacity: 0.5;
}

.certBadge span {
  font-size: 0.75rem;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## Anti-Patterns Table

| Anti-Pattern | Why It's Wrong | Correct Pattern |
|--------------|---------------|-----------------|
| `border-radius: 9999px` on buttons | Law firm pill pattern — signals traditional services, not SaaS | `border-radius: 4px` exactly |
| `border-radius: 0` on buttons | CAM sharp card pattern — aggressive, mismatched | `border-radius: 4px` exactly |
| White or light section background | Breaks dark-throughout constraint; creates "law firm" feel | `background: var(--color-dark)` on every section |
| Colored strip/band for stats section | Creates cheap "landing page" feel; breaks dark continuity | Same `#151515` background, separated by `0.5px` border |
| Hiding or obscuring pricing | Erodes trust with cost-sensitive users (Persona 2) | Prices prominently in card headers, font-weight 800 |
| "Contact for pricing" pattern | Signals enterprise/law firm — wrong tone for consumer fintech | Show all three price tiers inline |
| Removing star ratings from hero | Removes the primary trust signal for anxious first-time filers | `⭐ 4.9/5 | 45K+ Reviews | ₹5,346 Cr+ Refunds` always in hero |
| Single CTA hero ("File Now" only) | Removes the CA path for Persona 1 and 3 | Dual CTA: primary "File Yourself" + secondary "Get CA Help" |
| Serif font (Playfair, Georgia, etc.) | Law firm signal; wrong tone for fintech product | Plus Jakarta Sans only, weights 400–800 |
| Purple, gold, terracotta, maroon accent | Law firm colour palette — wrong category signal | Blue `#1678FB` only for CTAs and active states |
| JS-powered logo marquee | Heavier than needed; accessibility issues | CSS `@keyframes marquee` on `.track`, `prefers-reduced-motion` stops it |
| Colored logos in marquee | Brand recognition over-rides monochrome polish on dark | `filter: brightness(0) invert(1)` — monochrome white |
| Card drop shadows | Light-theme pattern; not visible on dark backgrounds | `border: 0.5px solid var(--color-border)` — ultra-thin border only |
| Hex values in `.module.css` files | Makes token system un-refactorable | Only `var(--color-*)` references in module files |
| Pill "Recommended" badge (`9999px`) | Inconsistent with button radius constraint | `border-radius: 4px` on badge too |
| Nav background toggling on scroll | AZB's pattern for alternating sections — not needed here | Always `background: var(--color-darker)` — no scroll toggle |
| `border-radius: 16px` or higher | ecommerce image-wrapper pattern; too soft for fintech | Only `4px` (buttons/badges) and `8px` (cards) |
