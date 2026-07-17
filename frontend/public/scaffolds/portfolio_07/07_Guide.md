# 07 — Developer Guide
## Design-Forward Developer Blog · portfolio_platform_07

Reference while building. The system's identity lives in its HSL color tokens and its no-flash dark mode.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| All colors in CSS custom properties using HSL | HSL is the teaching tool. The site is a demonstration that HSL is the correct color space for UI systems. |
| Dark mode via inline `<script>` — never `next-themes` | `next-themes` causes a white flash on hard reload in dark mode. The inline script sets `data-theme` before the first paint. |
| `suppressHydrationWarning` on `<html>` | The inline script mutates the DOM before React hydrates. React sees a mismatch and warns. The prop silences this for `<html>` only. |
| Light mode = `[data-theme="light"]` overrides only | Dark mode is the default (`:root`). Never write `[data-theme="dark"]`. If you see it, delete it. |
| Blog post list = vertical flex column — never grid | Cards in a grid reduce readability. Full-width stacked cards let the abstract be readable. |
| Scroll progress bar only on post pages | The bar is a reading-progress indicator — meaningless on the homepage or the list page. |
| `CATEGORY_COLORS` as inline `style` prop | Category colors are data, not CSS classes. They cannot be staticly extracted to class names because they are dynamic HSL values from a TypeScript record. |
| MDX components: no import in `.mdx` files | All custom components are registered in `mdxComponents` and passed to `<MDXRemote>`. Authors should never need to import. |

---

## 2. The HSL Color System — Rationale

HSL (Hue, Saturation, Lightness) is intuitive for building color scales:

```
hsl(210deg  15%  6%)  ← very dark, slightly blue-tinted (page background)
hsl(210deg  15% 12%)  ← darker card  (4% lighter)
hsl(210deg  15% 18%)  ← elevated surface (6% lighter)
hsl(210deg  10% 60%)  ← muted text
hsl(210deg  10% 90%)  ← readable text
```

**The pattern:** Same hue (210), same saturation. Only lightness changes. This creates a coherent family of blues that feel like the same material at different depths.

**Primary accent:**
```
hsl(225deg 100% 75%)  ← bright blue — slightly purple-shifted for vibrancy
```

**Gradient:**
```
linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%))
             ↑ blue                              ↑ pink
```
Blue to pink at 135° (top-left to bottom-right). This diagonal direction reads as "forward momentum."

**Common mistake:** Using a 90° or 180° gradient instead of 135°. The diagonal creates visual energy. Horizontal gradients look static.

---

## 3. No-Flash Dark Mode — How It Works

The browser parses HTML top-to-bottom. CSS and JavaScript (unless inline or async-false) are downloaded asynchronously. But an inline `<script>` in `<head>` executes synchronously, before the browser renders anything.

```
Timeline (dark mode):

1. Browser starts parsing HTML
2. Encounters inline <script> in <head>
3. Script runs: reads localStorage → sets data-theme="dark" on <html>
4. Browser continues parsing, encounters <link rel="stylesheet">
5. CSS downloads. :root rules apply to <html data-theme="dark">
6. First paint: dark background ✓
```

Without the inline script:

```
1. Browser starts parsing HTML
2. No inline script — nothing sets data-theme
3. CSS downloads. :root applies (dark default)
4. BUT: React SSR output has no data-theme on <html>
5. Browser renders SSR HTML first: no data-theme = uses :root = dark ✓ (looks ok)
6. Client JS loads, React hydrates, next-themes reads localStorage and sets data-theme
7. If user chose light mode: brief flash from dark → light ✗
```

**Why `suppressHydrationWarning`:** The server renders `<html lang="en">`. The inline script then adds `data-theme="dark"` before React hydrates. React compares server HTML with current DOM and finds `data-theme` on the element — a mismatch. `suppressHydrationWarning` tells React to ignore this mismatch for `<html>` only.

---

## 4. The `parseToc` Regex — Why h3 Before h2

```typescript
for (const line of lines) {
  const h3 = line.match(/^###\s+(.+)$/)
  const h2 = line.match(/^##\s+(.+)$/)

  if (h3) { ... }
  else if (h2) { ... }
}
```

The `###` pattern starts with `##`. If you test `h2` first:

```
line: "### My Heading"
h2 match: "## My Heading" ← WRONG: matches "## M" at the start
```

Actually `^##\s` would not match `###\s` because `##` is followed by `#`, not whitespace. But the explicit h3-first ordering makes the intent clear and prevents future bugs if the regex is loosened. Always check more-specific patterns first.

---

## 5. ToC IntersectionObserver — rootMargin

The ToC uses `rootMargin: '-20% 0px -70% 0px'`. This shrinks the observation zone:

```
Viewport:
  ╔══════════════════════╗  ← top
  ║  dead zone (20%)     ║  ← heading must scroll past this before activating
  ╠══════════════════════╣
  ║  observation zone    ║
  ║     (10% band)       ║  ← heading activates when its top edge is here
  ╠══════════════════════╣
  ║  dead zone (70%)     ║  ← headings below fold don't pre-activate
  ╚══════════════════════╝  ← bottom
```

The post page uses `-20% 0px -70% 0px` (vs `-30% 0px -60% 0px` in portfolio_06). Posts have many small sections — the narrower observation zone prevents two adjacent headings from activating simultaneously.

**Common mistake:** `threshold: 0.5` — fires when 50% of the element is visible. Headings are single lines. This works. But for sections taller than the viewport, it never fires. `rootMargin` is always the correct approach for scroll-spy.

---

## 6. Category Colors — Inline Style vs CSS Classes

Category colors cannot be Tailwind classes or CSS class names because they are runtime values:

```typescript
// CORRECT — inline style, value from CATEGORY_COLORS record
<span style={{ color: CATEGORY_COLORS[post.category] }}>
  {post.category}
</span>

// WRONG — class name approach requires knowing all possible values at build time
<span className={`text-category-${post.category}`}>
```

The inline style approach also means colors appear in the browser's Computed Styles panel exactly as HSL values — a deliberate teaching demonstration.

**Active pill background:**
```typescript
// CORRECT
style={
  isActive
    ? { background: color, color: '#fff', borderColor: color }
    : { color, borderColor: color }
}

// WRONG — '#fff' is a hex value. But this is JavaScript, not CSS.
// Hex values in JS (not CSS files) are acceptable here.
// The rule is: no hex in .css or .module.css files.
```

---

## 7. Gradient Text — Common Failures

```css
/* CORRECT */
.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Failure mode 1:** Forgetting `-webkit-text-fill-color: transparent`. The gradient is applied as a background, but without this property the background is hidden behind the text color. Result: solid colored text with no gradient visible.

**Failure mode 2:** Using `color: transparent` instead of `-webkit-text-fill-color: transparent`. `color: transparent` does not reveal the background-clip gradient in all browsers.

**Failure mode 3:** Applying `.gradient-text` to a `<span>` inside a flexbox or grid container without ensuring the span has a defined width. The gradient needs a bounding box to render against.

**Failure mode 4:** Using gradient text at body copy size (16px). Gradient text is unreadable in small sizes — the color transitions happen within a few pixels. Use it only on display-size headings (24px+).

---

## 8. ScrollProgressBar — Only on Post Pages

The scroll bar belongs to the reading experience, not the navigation experience.

```
src/app/layout.tsx          ← DO NOT add ScrollProgressBar here
src/app/page.tsx            ← DO NOT add ScrollProgressBar here
src/app/blog/page.tsx       ← DO NOT add ScrollProgressBar here
src/app/blog/[slug]/page.tsx ← ADD ScrollProgressBar here only
```

If you add it to `layout.tsx`, it appears on every page. The `scrollable` height on the homepage is much shorter than a post, making it jump to 100% almost immediately — which looks like a bug.

---

## 9. MDX Component Pattern — No Imports

```mdx
<!-- CORRECT — no import needed -->
<Callout type="info">
  This is how CSS custom properties work.
</Callout>

<Counter />

<ColorSwatch color="hsl(225deg 100% 75%)" />
```

```mdx
<!-- WRONG — imports don't work in next-mdx-remote RSC mode -->
import { Callout } from '../../components/mdx'

<Callout>...</Callout>
```

The components are provided globally via the `components` prop on `<MDXRemote>`. If a component is missing from `mdxComponents` in `index.ts`, it will silently render nothing. Always check the registry when a component fails to appear.

---

## 10. Common Mistakes

### Mistake 1: Hex values in CSS files

```css
/* WRONG */
.card { background: #1a1f2e; }

/* CORRECT */
.card { background: var(--color-bg-card); }
```

Even if the hex value "looks right" — it will not respond to `[data-theme="light"]` overrides. All colors must go through the token system.

### Mistake 2: Writing `[data-theme="dark"]` selectors

```css
/* WRONG — dark mode is the default, not an override */
[data-theme="dark"] { --color-bg: hsl(210deg 15% 6%); }
[data-theme="light"] { --color-bg: hsl(210deg 30% 98%); }

/* CORRECT */
:root { --color-bg: hsl(210deg 15% 6%); }
[data-theme="light"] { --color-bg: hsl(210deg 30% 98%); }
```

### Mistake 3: Blog post list as CSS grid

```tsx
// WRONG — grid forces equal heights, truncates abstracts visually
<div className={styles.grid}>
  {posts.map(p => <PostCard key={p.slug} post={p} />)}
</div>

// CORRECT — vertical list, full width, readable abstracts
<div className={styles.list}>
  {posts.map(p => <PostCard key={p.slug} post={p} />)}
</div>
```

```css
/* WRONG */
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

/* CORRECT */
.list { display: flex; flex-direction: column; gap: 1.25rem; }
```

### Mistake 4: Accordion ToC on mobile

```tsx
// WRONG — accordion hides content behind a click; kills scannability
<details>
  <summary>On this page</summary>
  <ol>...</ol>
</details>

// CORRECT — simply hide the ToC sidebar on mobile
// It adds no value in a narrow viewport where the reader is scrolling continuously
```

```css
.tocColumn { display: none; }
@media (min-width: 1024px) { .tocColumn { display: block; } }
```

### Mistake 5: Using `next-themes`

```tsx
// WRONG
import { ThemeProvider } from 'next-themes'
// ... wrapping with <ThemeProvider defaultTheme="dark">

// CORRECT — inline script approach (see TASK-004)
// next-themes introduces a hydration cycle that creates a white flash
// even with suppressHydrationWarning
```

### Mistake 6: Scroll progress bar width calculation

```typescript
// WRONG — does not account for viewport height, clamps at less than 100%
const progress = (scrollY / document.documentElement.scrollHeight) * 100

// CORRECT — scrollable distance = total height minus viewport height
const scrollable = document.documentElement.scrollHeight - window.innerHeight
const progress = (scrollY / scrollable) * 100
```

### Mistake 7: `h2` regex matching `h3` lines

```typescript
// WRONG — tests h2 first; "### Heading" starts with "##"
const h2 = line.match(/^##\s+(.+)$/)  // tests first
const h3 = line.match(/^###\s+(.+)$/) // tests second

// Technically safe because /^##\s/ requires ## followed by whitespace,
// and ### has # not whitespace. But the explicit ordering below is clearer:

// CORRECT — explicit: most specific first
const h3 = line.match(/^###\s+(.+)$/)
const h2 = !h3 && line.match(/^##\s+(.+)$/)
```

### Mistake 8: Applying gradient text to a `<Link>` directly

```tsx
// WRONG — next/link renders an <a>, gradient text on an <a> may conflict with
// browser default link color overriding -webkit-text-fill-color
<Link href="..." className="gradient-text">{title}</Link>

// CORRECT — wrap the text node
<Link href="...">
  <h1 className="gradient-text">{title}</h1>
</Link>
```

### Mistake 9: Not passing `mdxComponents` to MDXRemote

```tsx
// WRONG — Callout, Counter, ColorSwatch silently render nothing
<MDXRemote source={content} />

// CORRECT
<MDXRemote source={content} components={mdxComponents} />
```

### Mistake 10: Forgetting `scroll-margin-top` on post headings

```css
/* WRONG — clicking a ToC link scrolls the heading behind the sticky header */

/* CORRECT — offset for sticky header height (60px) plus margin */
.prose h2,
.prose h3 {
  scroll-margin-top: 5rem;
}
```

---

## 11. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; `/out/blog/` contains 8 subdirectories
- [ ] Hard reload → no white flash; `data-theme` set before first paint (check DevTools)
- [ ] Toggle → refresh preserves mode choice
- [ ] Grep CSS files: `grep -r "#[0-9a-fA-F]" src/styles/` returns zero results
- [ ] Blog list: vertical list, not grid
- [ ] PostCard hover: `box-shadow` glow visible
- [ ] PostCard title turns `var(--color-primary)` on hover
- [ ] Category filter: 8 pills; active uses category color as background
- [ ] Category filter: clicking active pill deselects (shows all)
- [ ] Scroll progress bar: appears on post pages ONLY
- [ ] Scroll progress bar: reaches 100% when scrolled to bottom
- [ ] Gradient text: visible on hero heading and post `<h1>`
- [ ] ToC: sticky sidebar visible on desktop
- [ ] ToC: hidden on mobile
- [ ] ToC: active item changes as headings scroll into view
- [ ] Clicking ToC link: scrolls to heading (not hidden behind sticky header)
- [ ] `<Callout type="info">`: blue left border
- [ ] `<Callout type="warning">`: yellow left border
- [ ] `<Callout type="success">`: green left border
- [ ] `<Counter />`: increment and decrement work
- [ ] All images: `alt` attributes present
- [ ] ThemeToggle: visible text label (not icon-only)
- [ ] Counter buttons: `aria-label` present (DevTools Accessibility pane)
- [ ] CategoryFilter pills: `aria-pressed` present
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
