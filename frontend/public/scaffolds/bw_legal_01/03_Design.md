# 03 — Design Tokens and Component CSS
## Premier Indian Law Firm · bw_legal_platform_01

---

## `src/app/globals.css`

```css
/* ===========================
   CAM — CSS TOKENS
   =========================== */

:root {
  /* Deep purple — primary authority color. CTAs, nav fill, hero, section headers. */
  --color-brand: #621755;

  /* Warm gold — decorative accent ONLY.
     Contrast on white: 2.7:1 — FAILS WCAG AA.
     Use ONLY for: corner L-brackets, dividers, footer top border.
     NEVER as text color. NEVER as button background. */
  --color-gold: #d0a56d;

  /* Charcoal — all body text */
  --color-text: #2b3d44;

  /* Mid-grey — dates, captions, secondary labels */
  --color-muted: #6b7280;

  /* Page background */
  --color-surface: #ffffff;

  /* Dark purple — footer, dark section backgrounds */
  --color-dark: #3d0e35;

  /* Typography */
  --font-display: var(--font-playfair, 'Playfair Display', Georgia, serif);
  --font-body: var(--font-roboto, 'Roboto', system-ui, sans-serif);

  /* Layout */
  --container: min(90%, 1400px);
  --section-pad: clamp(60px, 8vw, 120px);
}

/* === Base reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-surface);
  -webkit-font-smoothing: antialiased;
}

body { min-height: 100vh; }

a { color: inherit; text-decoration: none; }

img { display: block; max-width: 100%; }

/* Focus ring — gold on all surfaces */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Typography Scale

| Element | Font | Size | Weight | Spacing | Notes |
|---------|------|------|--------|---------|-------|
| Hero H1 | Playfair Display | `clamp(2.5rem, 5vw, 4rem)` | 700 | -0.02em | White on purple |
| Section H2 | Playfair Display | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | -0.01em | With GoldCorner |
| Card heading | Playfair Display | `1.125rem` | 400 | normal | Practice cards |
| Insight title | Playfair Display | `1.25rem` | 700 | normal | 2-line clamp |
| Stat number | Playfair Display | `3rem` | 700 | -0.02em | White on purple strip |
| Stat label | Roboto | `0.875rem` | 300 | 0.08em | Uppercase, white |
| Nav link | Roboto | `0.875rem` | 500 | 0.08em | Uppercase |
| Button label | Roboto | `0.875rem` | 500 | 0.1em | Uppercase |
| Body text | Roboto | `1rem` / 1.75 | 300 | normal | `#2b3d44` |
| Caption / date | Roboto | `0.8125rem` | 300 | normal | Muted |
| Leader title | Roboto | `0.8rem` | 300 | 0.08em | Uppercase, muted |

---

## StickyNav — `StickyNav.module.css`

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  background: transparent;
  transition: background 500ms ease-in-out, height 300ms ease;
}

.scrolled {
  background: rgba(98, 23, 85, 0.95);
  height: 64px;
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
  flex-shrink: 0;
}

.logoText {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-brand);
  letter-spacing: -0.01em;
  transition: color 300ms ease;
}

/* Logo switches white on scroll */
.scrolled .logoText {
  color: #fff;
}

.links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text);
  transition: color 200ms ease;
  position: relative;
}

/* Gold underline on active */
.link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transition: transform 200ms ease;
}

.link:hover::after,
.linkActive::after {
  transform: scaleX(1);
}

/* Links switch white on scroll */
.scrolled .link {
  color: rgba(255, 255, 255, 0.9);
}
```

---

## Hero — `Hero.module.css`

```css
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-dark) 100%);
  display: flex;
  align-items: center;
  padding: 120px 0 80px;   /* 120px top = nav height + breathing room */
}

.container {
  width: var(--container);
  margin: 0 auto;
}

.content {
  max-width: 55%;
}

.goldRule {
  width: 80px;
  height: 2px;
  background: var(--color-gold);
  margin-bottom: 32px;
}

.headline {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.subheading {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 40px;
}

.ctaRow {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .content { max-width: 100%; }
  .ctaRow { flex-direction: column; }
}
```

---

## StatsStrip — `StatsStrip.module.css`

```css
.strip {
  background: var(--color-brand);
  padding: 60px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: var(--container);
  margin: 0 auto;
  position: relative;
}

/* Gold vertical dividers between stats */
.stat {
  text-align: center;
  padding: 0 24px;
  position: relative;
}

.stat:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background: var(--color-gold);
  opacity: 0.6;
}

.number {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 12px;
}

.label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 768px) {
  .strip { grid-template-columns: repeat(2, 1fr); gap: 32px 0; }
  .stat::after { display: none; }
}
```

---

## PracticeAreas — `PracticeAreas.module.css`

```css
.section {
  padding: var(--section-pad) 0;
}

.container {
  width: var(--container);
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.card {
  background: var(--color-surface);
  border: 1px solid #e5e7eb;
  border-radius: 0;        /* Law firm — no rounded corners */
  border-left: 1px solid #e5e7eb;  /* Explicit — overridden on hover */
  padding: 32px;
  transition: border-left 300ms ease, box-shadow 300ms ease;
  cursor: pointer;
}

.card:hover {
  border-left: 4px solid var(--color-brand);
  box-shadow: 0 8px 32px rgba(98, 23, 85, 0.12);
}

.icon {
  width: 40px;
  height: 40px;
  color: var(--color-brand);
  margin-bottom: 20px;
}

.cardTitle {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.4;
}

.cardDesc {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-muted);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 20px;
}

.learnMore {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-brand);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid transparent;
  transition: border-color 200ms ease;
}

.learnMore:hover {
  border-bottom-color: var(--color-brand);
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## LeadershipGrid — `LeadershipGrid.module.css`

```css
.section {
  padding: var(--section-pad) 0;
  background: hsl(0deg 0% 98%);  /* Very light grey — subtle section break */
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 48px;
}

.leader {
  display: flex;
  flex-direction: column;
}

.photoWrapper {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  margin-bottom: 16px;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 400ms ease;
}

.photoWrapper:hover .photo {
  filter: grayscale(0);
}

.name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
}

.title {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.bio {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-text);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## PillButton — `PillButton.module.css`

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;    /* Pill — non-negotiable */
  font-family: var(--font-body);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 200ms ease, background 200ms ease;
  text-decoration: none;
  white-space: nowrap;
  border: none;
}

/* Sizes */
.md { height: 48px; padding: 0 32px; font-size: 0.875rem; }
.sm { height: 40px; padding: 0 24px; font-size: 0.8125rem; }

/* Variants */
.primary {
  background: var(--color-brand);
  color: #fff;
  border: 2px solid transparent;
}
.primary:hover { opacity: 0.88; }

.secondary {
  background: transparent;
  color: var(--color-brand);
  border: 2px solid var(--color-brand);
}
.secondary:hover { background: var(--color-brand); color: #fff; }

/* Ghost — for use on dark/purple backgrounds */
.ghost {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.8);
}
.ghost:hover { background: rgba(255, 255, 255, 0.1); }
```

---

## Footer — `Footer.module.css`

```css
.footer {
  background: var(--color-dark);
  padding: 64px 0 40px;
  border-top: 2px solid var(--color-gold);  /* Gold top border */
}

.container {
  width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}

.logoCol {}

.logoText {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
  display: block;
  margin-bottom: 16px;
}

.tagline {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 260px;
}

.colTitle {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.colLinks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.colLink {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  transition: color 200ms ease;
}

.colLink:hover {
  color: var(--color-gold);
}

.divider {
  width: var(--container);
  margin: 40px auto 24px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.copyright {
  width: var(--container);
  margin: 0 auto;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
  .container { grid-template-columns: 1fr 1fr; gap: 32px; }
}

@media (max-width: 640px) {
  .container { grid-template-columns: 1fr; }
}
```

---

## Anti-Patterns Table

| Wrong | Correct | Why |
|-------|---------|-----|
| Gold `#d0a56d` as text color | Gold only for borders and decorative lines | 2.7:1 contrast — WCAG fail |
| `border-radius: 8px` on practice cards | `border-radius: 0` | Law firm = geometric precision |
| `border-radius: 0` on buttons | `border-radius: 9999px` | Pill is the brand's CTA signature |
| Star ratings on testimonials | Pull quotes with formal attribution only | Unprofessional for legal institution |
| Orange, blue, or green accents | Purple and gold only | Off-brand color contamination |
| Roboto for H1 or H2 | Playfair Display for all headings | Serif-sans split is essential |
| Playfair Display for body text | Roboto 300 for all body | Serif in body text is hard to read at length |
| Color leadership photos by default | `grayscale(1)` → `grayscale(0)` on hover | Restraint signals authority |
| Countdown timers or "Offer ends" | Nothing | Urgency is inappropriate for legal |
| Pricing on public pages | No pricing displayed | Standard legal firm practice |
| Chat widget (Intercom/Drift) | Contact form link only | Informal channel unsuitable |
| Gradient text effects | Solid colors only | Decorative excess undermines authority |
| Bright background sections | White or dark purple only | No yellow, orange, or light-colored section BGs |
