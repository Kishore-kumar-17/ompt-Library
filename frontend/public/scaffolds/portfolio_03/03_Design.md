# 03 — Design System
## Studio Portfolio with Case Studies · portfolio_platform_03

---

### 1. Design Philosophy

The studio's visual system must itself be a portfolio piece. When a potential client inspects the CSS, they should see evidence of systematic thinking: a clean `data-theme` attribute pattern, consistent custom properties, a single easing function used across all transitions. No visual decoration beyond what the content requires. The design earns its restraint.

---

### 2. Color System

```css
:root,
[data-theme="default"] {
  --color:    #0A0A0A;   /* near-black text */
  --color-bg: #FFFFFF;   /* white background */
}

[data-theme="dark"] {
  --color:    #FFFFFF;
  --color-bg: #0A0A0A;
}

[data-theme="red"] {
  --color:    #FFFFFF;
  --color-bg: #DA382E;   /* Locomotive red */
}

[data-theme="blue"] {
  --color:    #FFFFFF;
  --color-bg: #312DFB;   /* electric blue */
}
```

**Theme usage map:**

| Page / Section | Theme |
|---------------|-------|
| Homepage hero (video) | `dark` |
| Featured work section | `default` |
| Studio statement strip | `dark` |
| /work page | `default` |
| /work/[slug] hero | `dark` |
| Challenge section | `default` |
| Approach section | `default` |
| Outcome section | `default` |
| Next Project CTA | `dark` |
| /about manifesto | `dark` |
| /about capabilities | `default` |
| /about team | `default` |
| /about awards | `red` or `default` |
| /contact | `default` |
| Footer | `dark` |

---

### 3. Typography

**Font stack:** `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`

No web font loading. Inter is available as a system font on many devices (installed by Chrome). Helvetica Neue is the fallback on macOS.

**Responsive base size:**
```css
html { font-size: 15px; }
@media (min-width: 1600px) { html { font-size: 17px; } }
@media (min-width: 2400px) { html { font-size: 21px; } }
```

**Scale:**
| Token | Value | Usage |
|-------|-------|-------|
| `--size-display` | `clamp(3rem, 8vw, 8rem)` | Hero headline, manifesto |
| `--size-h1` | `clamp(2rem, 5vw, 5rem)` | Case study title |
| `--size-h2` | `clamp(1.5rem, 3vw, 3rem)` | Section headings |
| `--size-h3` | `1.25rem` | Card client names |
| `--size-body` | `1rem` | Body text (inherits from html) |
| `--size-small` | `0.8rem` | Meta, labels, category tags |
| `--size-label` | `0.7rem` | Filter pills, nav links |

**Weights:** 400 (body), 700 (headings, labels, nav, CTAs). No intermediate weights.

**Line heights:** 1.1 for display/headlines, 1.3 for H1–H3, 1.6 for body copy.

**Letter spacing:** `-0.02em` on display + H1 (tight), `0.08em` on labels/small/pills (loose).

---

### 4. The Studio Easing Curve

All transitions use a single easing function:

```css
:root { --ease: cubic-bezier(0.215, 0.61, 0.355, 1); }
```

This is an ease-out curve — starts fast, settles gently. Applied to:
- Theme background/colour transitions: `0.3s var(--ease)`
- WorkCard image hover scale: `0.3s var(--ease)`
- Nav background on scroll: `0.3s var(--ease)`
- Scroll-reveal opacity/translate: `0.6s var(--ease)`
- Filter pill active state: `0.2s var(--ease)`

---

### 5. WorkCard Specification

```css
/* WorkCard.module.css */

.card {
  display: block;
  text-decoration: none;
  color: var(--color);
  cursor: pointer;
}

.imageWrapper {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #F0F0F0;   /* placeholder while image loads */
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s var(--ease);
}

.card:hover .image,
.card:focus-visible .image {
  transform: scale(1.04);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.75rem 0 0.25rem;
}

.client {
  font-size: var(--size-h3);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.year {
  font-size: var(--size-small);
  color: var(--color);
  opacity: 0.5;
}

.category {
  font-size: var(--size-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
  margin-top: 0.2rem;
}
```

---

### 6. FilterBar Specification

```css
/* FilterBar.module.css */

.bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color);
  margin-bottom: var(--space-lg);
}

.pill {
  font-size: var(--size-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1rem;
  border: 1px solid var(--color);
  border-radius: 4px;        /* the ONLY border-radius in the system */
  background: transparent;
  color: var(--color);
  cursor: pointer;
  transition: background-color 0.2s var(--ease), color 0.2s var(--ease);
}

.pill:hover {
  background: var(--color);
  color: var(--color-bg);
}

.pill.active {
  background: var(--color);
  color: var(--color-bg);
}

.pill:focus-visible {
  outline: 2px solid var(--color);
  outline-offset: 2px;
}
```

---

### 7. WorkGrid Layout

```css
/* WorkGrid.module.css */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl) var(--space-lg);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}
```

---

### 8. Manifesto Section

```css
/* ManifestoSection.module.css */
.section {
  background-color: var(--color-bg);  /* inherits from data-theme="dark" */
  color: var(--color);
  padding: var(--space-xxl) var(--space-lg);
}

.text {
  font-size: var(--size-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  max-width: 18ch;           /* keep it tight — manifestos are short */
}
```

---

### 9. Case Study Narrative Sections

```css
/* NarrativeSection.module.css */
.section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color);
}

.label {
  font-size: var(--size-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
  padding-top: 0.25rem;
}

.body {
  font-size: var(--size-body);
  line-height: 1.7;
  max-width: 65ch;
}

@media (max-width: 768px) {
  .section { grid-template-columns: 1fr; }
}
```

---

### 10. Video Hero

```css
/* VideoHero.module.css */
.section {
  position: relative;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-bg);   /* data-theme="dark" → #0A0A0A */
}

.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.headline {
  position: relative;
  z-index: 1;
  font-size: var(--size-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--color);         /* inherits white from dark theme */
  max-width: 14ch;
  padding: 0 var(--space-md);
}
```

---

### 11. Nav Specification

```css
/* Nav.module.css */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem var(--space-lg);
  background: var(--color-bg);
  transition: background-color 0.3s var(--ease);
}

.logo {
  font-size: var(--size-h3);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color);
  text-decoration: none;
}

.links {
  display: flex;
  gap: var(--space-md);
  list-style: none;
}

.link {
  font-size: var(--size-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color);
  text-decoration: none;
  transition: opacity 0.2s var(--ease);
}

.link:hover { opacity: 0.5; }
.link.active { opacity: 1; }
```

**Nav is theme-aware because it uses `var(--color)`** — the CSS custom property resolves to whatever the current section's theme dictates. When the hero section (dark) scrolls up and the nav sits over a default section, the page background becomes white and nav text becomes black automatically — because the `:root` value for `--color` is `#0A0A0A`.

---

### 12. Spacing Tokens

```css
:root {
  --space-xs:   0.5rem;
  --space-sm:   1rem;
  --space-md:   2rem;
  --space-lg:   3rem;
  --space-xl:   5rem;
  --space-xxl:  clamp(5rem, 10vw, 10rem);
}
```

---

### 13. Scroll Reveal Pattern

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Apply `.reveal` + `.visible` via `useInView` hook.

---

### 14. Anti-Patterns

- ❌ `border-radius` on cards, sections, images, or nav — only on filter pills (4px)
- ❌ Using any easing other than `cubic-bezier(0.215, 0.61, 0.355, 1)` for transitions
- ❌ Hardcoding `color: #FFFFFF` or `color: #0A0A0A` in components — always use `var(--color)`
- ❌ Inline `style={{ backgroundColor: '#000' }}` for theme sections — use `data-theme` attribute
- ❌ JavaScript `element.style.backgroundColor` for theme transitions — CSS only
- ❌ Video hero with audio or controls — `autoplay muted loop playsInline`, nothing else
- ❌ WorkCard without hover scale on image — the scale IS the interaction
- ❌ Manifesto text longer than 15–18 words — short convictions, not paragraphs
- ❌ Adding a fourth font weight (anything other than 400 and 700)
- ❌ Embedding `<iframe>` for client live sites — link out with `↗`, never embed
