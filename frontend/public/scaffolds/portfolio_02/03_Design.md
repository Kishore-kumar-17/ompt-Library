# 03 — Design System
## Editorial Grid Portfolio · portfolio_platform_02

---

### 1. Design Philosophy

Modernist restraint. Three colours. No decoration. The grid IS the design — not a container for design.

Every element earns its position through the grid. The name is not a heading dropped on a page; it occupies a grid zone as a typographic mass. The vertical navigation is not a UX pattern borrowed from a sidebar component — it is text rotated to become a structural element. The red border box is not a card or a divider — it is a geometric shape that gives the photo and nav a visual anchor.

Influence: Swiss International Style, De Stijl geometry, editorial magazine layout. The web is a medium for graphic design, not just interface design.

---

### 2. Color System

```css
:root {
  --bg:         #E4E4D5;    /* warm beige — the ground of the page */
  --accent:     #D55349;    /* coral red — used sparingly */
  --text:       #000000;    /* black — all body and heading text */
  --text-muted: rgba(0,0,0,0.5);  /* year labels, secondary meta */
}
```

**Usage rules:**

| Token | Where used | NOT used |
|-------|-----------|----------|
| `--bg` | Page background, photo background for blend | Text, borders |
| `--accent` | Red border box; link hover colour; focus rings; active nav | Background of large areas; body text |
| `--text` | All body text, headings, default link colour, nav links | Backgrounds |
| `--text-muted` | Year labels on talks, secondary meta, muted descriptions | Headings, interactive elements |

**Three colours. That is all.** No greys, no off-blacks, no tinted surfaces. The warm beige provides all the softness the design needs.

---

### 3. Typography

**Font stack:** `'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif`

No web fonts. No `@import`. No `<link>` to Google Fonts. System fonts load at render time — no flash of unstyled text, no layout shift.

**Weights:** 400 (body) and 800 (headings, links, labels). Nothing else.

| Token | Value | Usage |
|-------|-------|-------|
| `--size-display` | `calc(1.6rem + 1.6vw)` | Name block |
| `--size-h2` | `clamp(1rem, 2.5vw, 1.4rem)` | Section headings |
| `--size-body` | `1.1rem` | Bio paragraphs, descriptions |
| `--size-small` | `0.85rem` | Nav links, year labels, meta |
| `--size-caption` | `0.75rem` | Fine print, credits |

**All headings:** `text-transform: uppercase; letter-spacing: 0.04em; font-weight: 800; line-height: 1.1`

**All links:** `font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; text-decoration: none`
On hover: `color: var(--accent)`

---

### 4. CSS Grid — Desktop (≥ 900px)

```css
.page-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, auto);
  min-height: 100vh;
  padding: 3rem;
  gap: 0;
}
```

**Named grid placements:**

| Area | Columns | Rows | z-index | Notes |
|------|---------|------|---------|-------|
| `.name-area` | 1 / 4 | 1 / 6 | 2 | Typographic name block |
| `.accent-area` | 3 / 6 | 1 / 6 | 0 | Red border box, behind photo |
| `.nav-area` | 4 / 5 | 1 / 3 | 2 | Vertical nav sidebar |
| `.photo-area` | 3 / 6 | 3 / 6 | 1 | Photo, on top of accent box |
| `.content-area` | 6 / 8 | 4 / 6 | 2 | Bio + sections |
| `.footer-area` | 1 / 8 | 6 / 7 | 2 | Footer / contact |

**Stacking:** accent-area (z:0) → photo-area (z:1) → all other areas (z:2). The red border box appears behind the photo but visually frames it.

---

### 5. Mobile Layout (< 900px)

Below 900px the grid collapses entirely:

```css
@media (max-width: 900px) {
  .page-grid { display: block; padding: 1.5rem; }

  .name-area   { font-size: clamp(2.5rem, 8vw, 4rem); text-align: center; margin-bottom: 2rem; }
  .nav-area    { writing-mode: horizontal-tb; display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
  .accent-area { display: none; }
  .photo-area  { max-height: 280px; margin-bottom: 2rem; }
  .photo-area img { max-height: 280px; width: 100%; object-fit: cover; }
  .content-area { display: block; }
}
```

---

### 6. Name Block Typography

The creator name is a visual mass in the grid — words stacked vertically, each on its own line, or treated as a typographic composition.

```tsx
// NameBlock.tsx
<div className={styles.nameBlock}>
  <h1 className={styles.firstName}>{owner.firstName}</h1>
  <p className={styles.lastName}>{owner.lastName}</p>
  <p className={styles.role}>{owner.role}</p>
</div>
```

```css
/* NameBlock.module.css */
.nameBlock {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0 1rem 2rem 0;
}
.firstName {
  font-size: var(--size-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.95;
  color: var(--text);
}
.lastName {
  font-size: var(--size-display);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.95;
  color: var(--accent);        /* last name in accent red */
}
.role {
  font-size: var(--size-small);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-top: 1rem;
}
```

---

### 7. Accent Box (Red Border Element)

```css
/* AccentBox.module.css */
.accentBox {
  border: 3px solid var(--accent);
  grid-column: 3 / 6;
  grid-row: 1 / 6;
  z-index: 0;
  pointer-events: none;
}
```

This is a pure CSS structural element. No content. No background fill. Just a red border that frames the central zone of the grid.

---

### 8. Photo Treatment

```css
/* HeroPhoto.module.css */
.wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  mix-blend-mode: multiply;
  display: block;
  transition: opacity 200ms ease;
}
.photo:hover { opacity: 0.65; }
```

**Why `mix-blend-mode: multiply`:**
- Background is `#E4E4D5` (warm beige)
- Multiply mode: darkens underlying colour by the photo's colour
- White areas in the photo become transparent (show the beige)
- Dark areas remain dark — gives a duotone/halftone feel
- Result: photo feels like it belongs on the page, not floating on it

**This only works if:**
1. The photo wrapper has no opaque background set
2. The page background (`--bg`) is visible behind the wrapper
3. The photo is not inside an element with `isolation: isolate`

---

### 9. Section Heading Pattern

```css
/* Reusable for all sections */
.sectionHeading {
  font-size: var(--size-h2);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid var(--text);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}
```

---

### 10. Talks List Pattern

```css
.talksList { list-style: none; }

.talkItem {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.15);
}

.talkTitle {
  font-weight: 800;
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  text-decoration: none;
}
.talkTitle:hover { color: var(--accent); }

.talkMeta {
  font-size: var(--size-small);
  color: var(--text-muted);
  font-weight: 400;
  white-space: nowrap;
  margin-left: 1rem;
}
```

---

### 11. Contact Section

```css
.contactList { list-style: none; }
.contactItem {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.contactLink {
  font-weight: 800;
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.contactLink:hover { color: var(--accent); }
```

---

### 12. Skip Navigation

```css
/* SkipNav.module.css */
.skipLink {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--text);
  color: var(--bg);
  font-weight: 800;
  font-size: var(--size-small);
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  z-index: 100;
  transition: top 0ms;
}
.skipLink:focus {
  top: 0;
}
```

---

### 13. Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1C1C1A;
    --text: #E4E4D5;
    --text-muted: rgba(228,228,213,0.5);
    /* --accent: #D55349; stays the same — red works on dark too */
  }
  /* mix-blend-mode changes for dark mode */
  .photo {
    mix-blend-mode: screen;    /* screen mode on dark bg */
    opacity: 0.6;
  }
}
```

---

### 14. Anti-Patterns (Do Not Do)

- ❌ `border-radius` on any element — zero, always, everywhere
- ❌ Loading a web font — system stack is intentional, not a cost-saving measure
- ❌ Using flexbox for the main page layout — it's a Grid layout; use Grid
- ❌ `mix-blend-mode: normal` on photo — defeats the entire visual treatment
- ❌ Adding a fourth colour — the three-colour palette is the restraint
- ❌ Animated scroll effects or scroll-triggered reveals — CSS transitions only
- ❌ `text-transform: none` on links or section headings — everything is uppercase
- ❌ Font weight other than 400 or 800 — intermediate weights dilute the contrast
- ❌ Hiding the vertical nav on desktop — it is a structural element, not optional
- ❌ Embedding video iframes in talks list — link out, never embed inline

---

### 15. page.tsx — Grid Assembly

This is how grid class names from `PageGrid.module.css` are applied to each component:

```tsx
// src/app/page.tsx
import { PageGrid } from '../components/PageGrid/PageGrid'
import { NameBlock } from '../components/NameBlock/NameBlock'
import { SideNav } from '../components/SideNav/SideNav'
import { AccentBox } from '../components/AccentBox/AccentBox'
import { HeroPhoto } from '../components/HeroPhoto/HeroPhoto'
import { BioSection } from '../components/BioSection/BioSection'
import { TalksSection } from '../components/TalksSection/TalksSection'
import { ExperimentsSection } from '../components/ExperimentsSection/ExperimentsSection'
import { ContactSection } from '../components/ContactSection/ContactSection'
import { SkipNav } from '../components/SkipNav/SkipNav'
import { owner, talks, experiments, articles, contact } from '../data/content'
import styles from '../components/PageGrid/PageGrid.module.css'

export default function Home() {
  return (
    <>
      <SkipNav />
      <main id="main-content">
        <div className={styles.grid}>
          <div className={styles.nameArea}>
            <NameBlock owner={owner} />
          </div>
          <div className={styles.accentArea}>
            <AccentBox />
          </div>
          <nav className={styles.navArea}>
            <SideNav />
          </nav>
          <div className={styles.photoArea}>
            <HeroPhoto owner={owner} />
          </div>
          <div className={styles.contentArea}>
            <BioSection owner={owner} />
            <TalksSection talks={talks} />
            <ExperimentsSection experiments={experiments} />
            {articles.length > 0 && <WritingSection articles={articles} />}
          </div>
          <footer className={styles.footerArea}>
            <ContactSection contact={contact} />
          </footer>
        </div>
      </main>
    </>
  )
}
```

**Critical:** The `<AccentBox>` div must come before `<HeroPhoto>` in DOM source order so z-index stacking is correct. Grid placement handles visual position independently of source order, but z-index works by stacking context — AccentBox (z:0) behind HeroPhoto (z:1).

---

### 16. Color Contrast Reference

| Pairing | Foreground | Background | Ratio | WCAG |
|---------|-----------|-----------|-------|------|
| Body text on beige | `#000000` | `#E4E4D5` | ~17:1 | AAA ✓ |
| Muted text on beige | `rgba(0,0,0,0.5)` | `#E4E4D5` | ~4.8:1 | AA ✓ |
| Accent on beige | `#D55349` | `#E4E4D5` | ~3.8:1 | AA (large text) ✓ |
| Body text (dark mode) | `#E4E4D5` | `#1C1C1A` | ~16:1 | AAA ✓ |
| Muted text (dark mode) | `rgba(228,228,213,0.5)` | `#1C1C1A` | ~5.1:1 | AA ✓ |
| Accent on dark | `#D55349` | `#1C1C1A` | ~3.5:1 | AA (large/bold text) ✓ |
| Skip-nav | `#E4E4D5` | `#000000` | ~17:1 | AAA ✓ |

Note: Accent (`#D55349`) on the beige background only passes WCAG AA for large text (≥ 18pt or 14pt bold). Never use accent as small body text. It is used on link hover, border elements, and focus rings — all at large/bold sizes.
