# 03 — Design System
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

---

## 1. Design Philosophy

The site is a monograph. Photography is the content. Every design decision must serve the photography or step aside. When in doubt: more white space, less UI. The terracotta accent (#C4501A) appears in one place only — the active discipline indicator. It is not a brand colour to scatter. It is a signal.

---

## 2. Color System

```css
:root,
[data-theme="default"] {
  --color:          #1A1A1A;              /* near-black — almost but not pure black */
  --color-bg:       #F5F2EE;              /* warm cream — Indian raw plaster wall */
  --color-muted:    rgba(26,26,26,0.45);  /* captions, metadata, muted labels */
  --color-divider:  rgba(26,26,26,0.12);  /* hairline borders, list dividers */
  --color-accent:   #C4501A;              /* terracotta — active state only */
}

[data-theme="dark"] {
  --color:    #F5F2EE;
  --color-bg: #1A1A1A;
  /* --color-muted and --color-divider automatically adapt */
}

[data-theme="accent"] {
  --color:    #F5F2EE;
  --color-bg: #C4501A;
  /* Used sparingly — discipline count strip on homepage only */
}
```

**Color usage rules:**
- `--color-accent` (#C4501A): ONLY for active discipline tab underline indicator. Nowhere else.
- `--color-muted`: location text on cards, year text, label text, press publication names
- `--color-divider`: border-top on awards rows, border-bottom on filter bar, MetaStrip dividers
- Never use `--color-accent` as background for text (contrast fails on large areas)
- Dark sections use `data-theme="dark"` attribute — never inline `background: #1A1A1A`

---

## 3. Typography

**Font stack:** `'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif`
No web fonts. No Google Fonts. No @font-face.

**Responsive base:**
```css
html { font-size: 15px; }
@media (min-width: 1440px) { html { font-size: 16px; } }
@media (min-width: 1920px) { html { font-size: 18px; } }
```

**Scale:**
```css
:root {
  --size-display: clamp(2.8rem, 6vw, 7rem);    /* studio statement, hero text */
  --size-h1:      clamp(1.8rem, 4vw, 4rem);    /* project title on hero */
  --size-h2:      clamp(1.2rem, 2.5vw, 2.5rem); /* section headings */
  --size-body:    1rem;                          /* body copy */
  --size-small:   0.8rem;                        /* metadata, location, year */
  --size-label:   0.7rem;                        /* filter pills, nav links, category tags */
}
```

**Weights:** 300 (body) and 500 (headings, labels, nav, CTAs). No 400. No 600. No 700.

**Line heights:** 1.1 (display), 1.2 (h1–h2), 1.75 (body copy), 1.4 (small/captions)

**Letter spacing:** `-0.03em` on display + h1 (tight), `0.1em` on labels/small (open)

---

## 4. Easing Token

```css
:root {
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

Smooth ease-out, slightly gentler than portfolio_03's curve. Applied to:
- Nav background transition: `0.3s var(--ease)`
- ProjectCard caption slide-up: `0.4s var(--ease)`
- Filter pill hover fill: `0.2s var(--ease)`
- Scroll reveal (opacity + translateY): `0.6s var(--ease)`
- Page transitions (Framer Motion): `0.3s var(--ease)`

---

## 5. Spacing Tokens

```css
:root {
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  3rem;
  --space-xl:  6rem;
  --space-xxl: clamp(6rem, 12vw, 12rem);
}
```

---

## 6. ProjectCard Specification

```css
/* ProjectCard.module.css */

.card {
  display: block;
  text-decoration: none;
  color: var(--color);
  cursor: pointer;
}

.imageWrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 2;          /* landscape — architecture photography ratio */
  background: var(--color-divider);  /* placeholder while image loads */
}

/* NO .image:hover scale — ever */
/* NO transform on .image */

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-sm) var(--space-sm) var(--space-md);
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(26, 26, 26, 0.75) 100%
  );
  transform: translateY(100%);   /* hidden below image by default */
  transition: transform 0.4s var(--ease);
  color: #F5F2EE;                /* always light — dark gradient behind */
}

.card:hover .caption,
.card:focus-visible .caption {
  transform: translateY(0);      /* slides up on hover */
}

.captionTitle {
  font-size: var(--size-small);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.3;
}

.captionMeta {
  font-size: var(--size-label);
  opacity: 0.75;
  margin-top: 0.25rem;
  letter-spacing: 0.05em;
}

.category {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-top: 0.6rem;
}

.card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## 7. DisciplineFilter Specification

```css
/* DisciplineFilter.module.css */

.filter {
  padding: var(--space-md) 0 0;
  border-bottom: 1px solid var(--color-divider);
  margin-bottom: var(--space-lg);
}

/* Row 1 — Discipline tabs */
.disciplineRow {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.tab {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.tab:hover {
  color: var(--color);
}

.tab.active {
  color: var(--color);
  border-bottom-color: var(--color-accent);  /* terracotta underline — only use of accent */
}

.tab:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Row 2 — Category pills */
.categoryRow {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-bottom: var(--space-sm);
}

.pill {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--color-divider);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: background-color 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.pill:hover {
  color: var(--color);
  border-color: var(--color);
}

.pill.active {
  background: var(--color);
  color: var(--color-bg);
  border-color: var(--color);
}

.pill:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## 8. ProjectGrid Specification

```css
/* ProjectGrid.module.css */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg) var(--space-md);
}

@media (max-width: 1199px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
```

---

## 9. Nav Specification

```css
/* Nav.module.css */

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.5rem var(--space-lg);
  transition: background-color 0.3s var(--ease);
}

.nav.transparent {
  background: transparent;
}

.nav.filled {
  background: var(--color-bg);
}

.logo {
  font-size: var(--size-small);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color);
  text-decoration: none;
  justify-self: start;
}

.disciplines {
  display: flex;
  gap: var(--space-md);
  list-style: none;
}

.utility {
  display: flex;
  gap: var(--space-md);
  list-style: none;
  justify-self: end;
}

.link {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color);
  text-decoration: none;
  opacity: 0.5;
  transition: opacity 0.2s var(--ease);
}

.link:hover { opacity: 1; }
.link.active { opacity: 1; }
```

---

## 10. ProjectHero Specification

```css
/* ProjectHero.module.css */

.section {
  position: relative;
  height: 100svh;
  overflow: hidden;
}

/* data-theme="dark" on this section — text becomes #F5F2EE */

.image {
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 26, 26, 0.6) 0%,
    transparent 50%
  );
  z-index: 1;
}

.meta {
  position: absolute;
  bottom: var(--space-lg);
  left: var(--space-lg);
  z-index: 2;
  color: #F5F2EE;
}

.category {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.title {
  font-size: var(--size-h1);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.location {
  font-size: var(--size-small);
  opacity: 0.6;
  margin-top: 0.5rem;
}
```

---

## 11. SynopsisSection Specification

```css
/* SynopsisSection.module.css */

.section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-divider);
}

.label {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  padding-top: 0.2rem;
}

.content {
  font-size: var(--size-body);
  line-height: 1.75;
  max-width: 65ch;
}

@media (max-width: 768px) {
  .section { grid-template-columns: 1fr; }
}
```

---

## 12. ImageGallery Specification

```css
/* ImageGallery.module.css */

.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  margin: var(--space-xl) 0;
}

/* Full-width: spans both columns */
.fullRow {
  grid-column: 1 / -1;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

/* Half-width: single column */
.halfRow {
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

@media (max-width: 768px) {
  .gallery { grid-template-columns: 1fr; }
  .fullRow { grid-column: 1; }
}
```

---

## 13. StudioStatement Specification

```css
/* StudioStatement.module.css */

.section {
  padding: var(--space-xxl) var(--space-lg);
  /* data-theme="dark" applied in JSX */
}

.text {
  font-size: var(--size-display);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.03em;
  max-width: 20ch;        /* force short manifesto-style breaks */
}
```

---

## 14. AwardsSection Specification

```css
/* AwardsSection.module.css */

.list {
  list-style: none;
}

.item {
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  gap: var(--space-md);
  align-items: baseline;
  padding: var(--space-sm) 0;
  border-top: 1px solid var(--color-divider);
}

.year {
  font-size: var(--size-small);
  color: var(--color-muted);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.award {
  font-size: var(--size-body);
  font-weight: 500;
}

.project {
  font-size: var(--size-small);
  color: var(--color-muted);
  text-align: right;
}

@media (max-width: 768px) {
  .item {
    grid-template-columns: 3.5rem 1fr;
    grid-template-rows: auto auto;
  }
  .project {
    grid-column: 2;
    text-align: left;
  }
}
```

---

## 15. NextProject Specification

```css
/* NextProject.module.css */

.section {
  padding: var(--space-xxl) var(--space-lg);
  /* data-theme="dark" in JSX */
}

.label {
  font-size: var(--size-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: var(--space-sm);
}

.link {
  display: block;
  font-size: var(--size-h1);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color);
  text-decoration: none;
  transition: opacity 0.2s var(--ease);
}

.link:hover { opacity: 0.6; }

.sub {
  font-size: var(--size-small);
  color: var(--color-muted);
  margin-top: var(--space-sm);
  letter-spacing: 0.05em;
}
```

---

## 16. Scroll Reveal Pattern

```css
/* In globals.css or a utility class */

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 17. Anti-Patterns

| What | Why forbidden |
|------|--------------|
| `border-radius` on any structural element | Hard editorial aesthetic — softness reads as generic |
| Image scale on ProjectCard hover | Architecture photography is not a product thumbnail. Caption slide-up is the pattern. |
| Using `--color-accent` (#C4501A) for text colour on light backgrounds | Fails WCAG AA contrast at body sizes |
| Hardcoding `#F5F2EE` or `#1A1A1A` in component CSS | Components must work in dark sections via var(--color) |
| Font-weight 400, 600, or 700 | System is 300 and 500 only — enforce this in body CSS |
| Decorative dividers, shadows, gradients (except caption overlay) | Noise against photography |
| Icon libraries | Every icon is a design decision; use text arrows (→) and text labels instead |
| JavaScript colour transitions | CSS custom property transitions, data-theme attribute only |
| Nav background always visible | Transparent on homepage hero — use useScrolled hook |
| Discipline tabs without two-level filter | Sub-category pills are required — discipline alone is not specific enough |
| `<iframe>` embeds of live client sites | Link out with ↗ |
| Google Fonts or any web font import | System stack only — this is part of the philosophy |
| Awards without projects listed | Awards without project context are meaningless — always show year / award / project |
| Press logos as images | Text-only — publication names with muted treatment. No logo images. |
