# 03 — Design
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

All color values must use CSS custom properties. No hex values in any CSS file.

---

## 1. globals.css

```css
/* src/styles/globals.css */
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; }

html { font-size: 16px; scroll-behavior: smooth; }

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, 'Outfit'), sans-serif;
  line-height: 1.25;
  font-weight: 700;
  color: var(--color-text);
}

a {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-color: var(--color-border);
  text-underline-offset: 3px;
  transition: color 0.15s, text-decoration-color 0.15s;
}

a:hover {
  color: var(--color-accent);
  text-decoration-color: var(--color-accent);
}

code {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
  font-size: 0.875em;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  padding: 0.1em 0.35em;
  border-radius: 0.25rem;
}

pre {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  line-height: 1.6;
}

pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
}

img { max-width: 100%; height: auto; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 2. Site Header

```css
/* src/components/SiteHeader.module.css */

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 0 1.5rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-heading, 'Outfit'), sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: none;
}

.logo:hover { color: var(--color-accent); text-decoration: none; }

.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.navLink {
  padding: 0.375rem 0.625rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: 0.25rem;
  transition: color 0.15s, background 0.15s;
}

.navLink:hover {
  color: var(--color-text);
  background: var(--color-bg-card);
  text-decoration: none;
}

.navLink[aria-current="page"] {
  color: var(--color-accent);
}
```

---

## 3. Year-Grouped Archive

```css
/* src/components/YearGroup.module.css */

.group {
  margin-bottom: 0.25rem;
}

/* Remove default marker; style the summary ourselves */
.summary {
  list-style: none;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 0;
  cursor: pointer;
  user-select: none;
}

.summary::-webkit-details-marker { display: none; }

.year {
  font-family: var(--font-heading, 'Outfit'), sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-accent);
  min-width: 3rem;
}

.count {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.item {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}

.item:hover {
  border-bottom-color: var(--color-border);
}

.date {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  min-width: 4.5rem;
  flex-shrink: 0;
}

.title {
  font-size: 0.9375rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.15s;
}

.title:hover { color: var(--color-accent); text-decoration: none; }
```

---

## 4. Blog / Notes Archive Page

```css
/* src/app/blog/page.module.css */
/* (identical for notes/page.module.css) */

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.heading {
  font-size: 1.75rem;
  font-weight: 700;
}

.topicsLink {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.topicsLink:hover { color: var(--color-accent); }

.archive {
  display: flex;
  flex-direction: column;
}
```

---

## 5. Post Page

```css
/* src/app/blog/[slug]/page.module.css */
/* (identical for notes/[slug]/page.module.css) */

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.back {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  margin-bottom: 2rem;
}

.back:hover { color: var(--color-accent); }

.header { margin-bottom: 2.5rem; }

.title {
  font-size: clamp(1.625rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.date {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag {
  font-size: 0.75rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  padding: 0.2em 0.6em;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background 0.15s;
}

.tag:hover {
  background: var(--color-accent);
  color: var(--color-bg);
  text-decoration: none;
}

/* Prose styles */
.prose h2 {
  font-size: 1.375rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--color-border);
}

.prose h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.prose p { margin-bottom: 1.25rem; }

.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose li { margin-bottom: 0.375rem; }

.prose blockquote {
  border-left: 3px solid var(--color-accent);
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 1.5rem 0;
  color: var(--color-text-muted);
}

.prose a { color: var(--color-accent); }
```

---

## 6. Projects Page + Card

```css
/* src/app/projects/page.module.css */

.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

```css
/* src/components/ProjectCard.module.css */

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent);
}

.year {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.title {
  font-family: var(--font-heading, 'Outfit'), sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.15s;
}

.card:hover .title { color: var(--color-accent); }

.description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex-grow: 1;
}

.links {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.link {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.125rem;
  transition: color 0.15s, border-color 0.15s;
}

.link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
```

---

## 7. Topics Pages

```css
/* src/app/topics/page.module.css */

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading { font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; }

.tagList {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.tagLink {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.tagLink:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-bg);
}

.count {
  font-size: 0.75rem;
  opacity: 0.7;
}
```

```css
/* src/app/topics/[tag]/page.module.css */

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.back { font-size: 0.875rem; color: var(--color-text-muted); text-decoration: none; }
.back:hover { color: var(--color-accent); }

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.5rem 0;
  text-transform: lowercase;
}

.list { list-style: none; padding: 0; }

.item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--color-border);
}

.typeBadge {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.6875rem;
  background: var(--color-bg-elevated);
  color: var(--color-text-muted);
  padding: 0.1em 0.4em;
  border-radius: 0.2rem;
  flex-shrink: 0;
}

.date {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.title { font-size: 0.9375rem; color: var(--color-text); text-decoration: none; }
.title:hover { color: var(--color-accent); }
```

---

## 8. ThemeToggle

```css
/* src/components/ThemeToggle.module.css */

.toggle {
  padding: 0.3rem 0.625rem;
  font-size: 0.8125rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.toggle:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
```

---

## 9. About Page

```css
/* src/app/me/page.module.css */

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.intro {
  font-size: 1.0625rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
}

.section { margin-bottom: 2.5rem; }

.sectionHeading {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid var(--color-border);
}

/* Philosophy block — visually distinct */
.philosophy {
  background: var(--color-bg-card);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 1rem 1.25rem;
  margin-bottom: 2.5rem;
}

.philosophy p {
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.65;
  margin: 0;
}

/* "What I'm Doing Now" */
.nowDate {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  display: block;
}

.nowList {
  padding-left: 1.25rem;
  color: var(--color-text);
}

.nowList li { margin-bottom: 0.375rem; font-size: 0.9375rem; }

/* Publications list */
.pubList { list-style: none; padding: 0; }
.pubList li { font-size: 0.9375rem; padding: 0.3rem 0; border-bottom: 1px solid var(--color-border); }

/* Social links */
.social {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.socialLink {
  font-size: 0.875rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.125rem;
  transition: color 0.15s, border-color 0.15s;
}

.socialLink:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
```

---

## 10. Anti-Patterns

| Anti-pattern | Problem | Correct approach |
|---|---|---|
| `background: #f9f5f0` in CSS | Defeats token system; won't switch on theme change | `background: var(--color-bg)` |
| `[data-theme="light"]` selectors | Light mode is the default (`:root`); no light override needed | Remove — put values in `:root` |
| Blog list as card grid | Removes the "archive feel"; looks like a magazine, not a developer's writing | Vertical year-grouped `<details>` list |
| Images on project cards | Tania's site specifically uses text-only cards | Text: year + title + description + links only |
| Hardcoded `open` on all year sections | All years expanded at once overwhelms a 100+ post archive | Only current year `open`; rest collapsed |
| Tag system as enum/union type | Tags are content-author defined strings, not a fixed set | `tags: string[]` — arbitrary, from frontmatter |
| Articles and notes in same folder | `getPostBySlug` needs to know `type` to find the file | Separate `src/content/articles/` and `src/content/notes/` |
| Dark mode with `next-themes` | Flash risk; adds dependency | Inline script in `<head>` |
| Single accent color in CSS | Accent is too dark on beige in light mode if using the dark-mode value | Two values: `hsl(332deg 61% 41%)` light, `hsl(332deg 100% 76%)` dark |
| Post description in archive list | Clutters the year-grouped list; Tania's design deliberately omits it | Title + date only in archive; description in `<meta>` only |
| `/about` route | Tania uses `/me` — signals personality over convention | Use `/me` |

---

## 11. Typography + Spacing Reference

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| H1 (page heading) | Outfit | 1.75rem | 700 | `--color-text` |
| H1 (post title) | Outfit | clamp(1.625rem, 4vw, 2.25rem) | 700 | `--color-text` |
| H2 (post section) | Outfit | 1.375rem | 700 | `--color-text` |
| Body | System sans | 1rem | 400 | `--color-text` |
| Archive date | Monospace | 0.8125rem | 400 | `--color-text-muted` |
| Year label | Outfit | 1.125rem | 700 | `--color-accent` |
| Tag pill | Monospace | 0.75rem | 400 | `--color-accent` |
| Nav link | System sans | 0.875rem | 400 | `--color-text-muted` |
| Project year | Monospace | 0.75rem | 400 | `--color-text-muted` |

| Measurement | Value |
|-------------|-------|
| Page max-width (content) | 680px |
| Page max-width (projects) | 960px |
| Page horizontal padding | 1.5rem |
| Page top padding | 3rem |
| Header height | 56px |
| Section spacing | 2.5rem |
| Archive list item height | ~2rem |
