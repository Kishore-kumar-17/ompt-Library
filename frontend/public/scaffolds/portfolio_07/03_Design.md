# 03 — Design
## Design-Forward Developer Blog · portfolio_platform_07

All color values must use CSS custom properties. No hex values anywhere in CSS files.

---

## 1. globals.css

```css
/* src/styles/globals.css */
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; }

html {
  font-family: 'Wotfard', 'Nunito', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

/* Gradient text utility — used on hero heading and post titles */
.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Code blocks */
pre {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

code {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
  font-size: 0.875em;
  background: var(--color-bg-elevated);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}

pre code {
  background: none;
  padding: 0;
}

/* Anchor links inside MDX */
.prose a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Headings auto-get IDs from next-mdx-remote rehype plugins */
.prose h2,
.prose h3 {
  scroll-margin-top: 5rem;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 2. Site Header / Nav

```css
/* src/components/SiteHeader.module.css */

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text);
  text-decoration: none;
}

.logo span {
  /* Gradient on the accent part of the logo name */
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navLink {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.navLink:hover,
.navLink[aria-current="page"] {
  color: var(--color-text);
}
```

---

## 3. Homepage Hero

```css
/* src/components/Hero.module.css */

.hero {
  padding: 5rem 2rem 4rem;
  max-width: 700px;
  margin: 0 auto;
}

.tagline {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  /* Apply .gradient-text from globals.css to the tagline span */
}

.description {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 540px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primaryButton {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-accent);
  color: hsl(0deg 0% 100%);
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.primaryButton:hover { opacity: 0.88; }

.secondaryButton {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s;
}

.secondaryButton:hover { border-color: var(--color-primary); }
```

---

## 4. PostCard

Post list on `/blog` is a **vertical list** (NOT a grid). Each card is full width, stacked.

```css
/* src/components/PostCard.module.css */

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.card:hover {
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-primary);
}

.link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  /* color set via inline style: style={{ color: CATEGORY_COLORS[post.category] }} */
  display: block;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  margin-bottom: 0.625rem;
  transition: color 0.2s;
}

.card:hover .title { color: var(--color-primary); }

.abstract {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
```

### Blog list layout

```css
/* src/app/blog/page.module.css */

.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.subheading {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
```

---

## 5. Blog Post Page Layout

Two-column on desktop: narrow left ToC sidebar + wider article. Single column on mobile.

```css
/* src/app/blog/[slug]/page.module.css */

.layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 220px 1fr;
    align-items: start;
  }
}

.tocColumn {
  display: none;
}

@media (min-width: 1024px) {
  .tocColumn {
    display: block;
  }
}

.article {
  min-width: 0;   /* prevent grid blowout */
  max-width: 680px;
}

.header { margin-bottom: 2.5rem; }

.category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 0.75rem;
}

.title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.date {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* MDX prose styles */
.article h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.article h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.article p {
  margin-bottom: 1.25rem;
  color: var(--color-text);
}

.article ul,
.article ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.article li { margin-bottom: 0.375rem; }
```

---

## 6. Callout Component Design

```
┌─────────────────────────────────────────────┐
│ ▌  This is an info callout. The left border  │
│    is the color signal. Background is        │
│    a 10% tint of the border color.           │
└─────────────────────────────────────────────┘
```

| Type    | Border color HSL          | Background tint           |
|---------|---------------------------|---------------------------|
| info    | hsl(210deg 100% 65%)      | hsl(210deg 100% 65% / 0.1)|
| warning | hsl(48deg  100% 55%)      | hsl(48deg  100% 55% / 0.1)|
| success | hsl(142deg  70% 50%)      | hsl(142deg  70% 50% / 0.1)|

Full CSS in `02_Architecture.md § Callout Component`.

---

## 7. Counter Widget Design

```css
/* src/components/mdx/Counter.module.css */

.counter {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
}

.button {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.button:hover {
  background: var(--color-primary);
  color: var(--color-bg);
}

.display {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  min-width: 2.5rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
```

---

## 8. ColorSwatch Widget Design

```css
/* src/components/mdx/ColorSwatch.module.css */

.swatch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  vertical-align: middle;
}

.circle {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.label {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
```

---

## 9. CategoryFilter Pills

```css
/* src/components/CategoryFilter.module.css */

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.pill {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  border: 1.5px solid;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: lowercase;
  transition: background 0.15s, color 0.15s;
}

/* Active state: category HSL background, white text — set via inline style */
/* Inactive state: category HSL border + text — set via inline style */
/* Both states driven by CATEGORY_COLORS[cat] inline style prop */
```

---

## 10. ThemeToggle

```css
/* src/components/ThemeToggle.module.css */

.toggle {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  border: 1.5px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
}
```

---

## 11. About / Homepage Section

```css
/* src/app/about/page.module.css */

.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 2px solid var(--color-border);
}

.name {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.bio p {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  font-size: 1.0625rem;
  line-height: 1.75;
}

.bio a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.social {
  display: flex;
  gap: 1.25rem;
  margin-top: 2rem;
}

.socialLink {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.socialLink:hover { color: var(--color-primary); }
```

---

## 12. Anti-Patterns

| Anti-pattern | Problem | Correct approach |
|---|---|---|
| `color: #7c93ff` in CSS | Defeats the HSL token system | `color: var(--color-primary)` |
| `background: #1a1a2e` in CSS | Hardcoded hex in CSS file | `background: var(--color-bg)` |
| `[data-theme="dark"]` variant selectors | Dark mode is the default — `:root` IS dark | Use `[data-theme="light"]` for light overrides only |
| Using `next-themes` | Causes white flash on dark reload | Use the inline `<script>` approach |
| Post list in CSS grid | Destroys readability hierarchy | Vertical flex column, full-width cards |
| ToC with `threshold: 0.5` | Breaks for headings in long sections (never hits 50% visible) | Use `rootMargin` to target a viewport band |
| Importing icon libraries | Extra bundle weight | Inline SVG or unicode characters |
| `color: white` in CSS | No HSL token exists for pure white | `color: hsl(0deg 0% 100%)` if needed, or use `var(--color-text)` |
| `@apply` with Tailwind inside CSS Modules | Stack is CSS Modules only, no Tailwind | Plain CSS with custom properties |
| ScrollProgressBar on `/blog` list | Bar should only appear on individual post pages | Render only in `src/app/blog/[slug]/page.tsx` |
| Gradient text on body copy | Kills readability at small sizes | Gradient text only on display-size headings |
| Category filter as `<select>` dropdown | Misses the visual teaching moment | Pill row with inline HSL background on active state |

---

## 13. Spacing & Typography Scale

| Token | Value | Usage |
|-------|-------|-------|
| Page max-width | 720px (blog list), 1100px (post) | `max-width` on page containers |
| Article max-width | 680px | `max-width` on `<article>` |
| Body font size | 1rem (16px) | base |
| H1 (post title) | `clamp(1.75rem, 4vw, 2.75rem)` | Post heading |
| H1 (hero) | `clamp(2rem, 5vw, 3.25rem)` | Homepage tagline |
| H2 (section) | 1.5rem | Post section heading |
| H3 | 1.25rem | Post sub-heading |
| Body text | 1rem | Paragraphs |
| Muted/meta | 0.875rem | Dates, category tags |
| Code | 0.875em | Inline + block code |
| Nav height | 60px | Sticky header |
| Card padding | 1.5rem | PostCard inner padding |
| Card border-radius | 0.75rem | PostCard |
| Section padding | `3rem 1.5rem` | Page sections |
| Gap between cards | 1.25rem | Blog list gap |
