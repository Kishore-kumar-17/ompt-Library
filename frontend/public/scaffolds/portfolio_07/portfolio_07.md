# Portfolio 07 — Josh W. Comeau (Design-Forward Developer Blog)
## Category A: 8 Platform Versions

**Source:** https://www.joshwcomeau.com
**Type:** Design-forward developer blog with interactive tutorials and courses
**Distinguishing traits:** HSL-based CSS custom property color system, dark/light mode via inline script (no flash), saturated blue + pink accent palette, interactive MDX components (live code playgrounds, toggles), category-based post taxonomy, vertical list layout for posts, gradient text accents, whimsical but precise design

---

## Base Prompt

Build a design-forward developer blog for an engineer known as much for design quality as technical depth. The site teaches CSS, React, animations, JavaScript, and web performance through long-form interactive tutorials. The design must demonstrate the author's skills — visitors should feel the craft immediately.

**Stack:** Next.js 14 App Router + TypeScript + CSS Modules. MDX via `next-mdx-remote`. Dark mode via inline `<script>` in `<head>` (no flash). Static export. `@next/mdx` or `next-mdx-remote` for content.

**The signature design move:** HSL-based CSS custom properties. Not hex, not RGB — HSL. Every colour in the system is a CSS var with an HSL value. Dark/light mode flips the values. This is both a technical choice and a statement about how the author thinks about colour.

**Colour system (HSL custom properties):**
```css
:root {
  /* Dark mode — default */
  --color-bg:           hsl(210deg 15% 6%);
  --color-bg-card:      hsl(210deg 15% 12%);
  --color-bg-elevated:  hsl(210deg 15% 18%);
  --color-text:         hsl(210deg 10% 90%);
  --color-text-muted:   hsl(210deg 10% 60%);
  --color-border:       hsl(210deg 15% 22%);

  --color-primary:   hsl(225deg 100% 75%);   /* blue accent */
  --color-secondary: hsl(333deg 100% 65%);   /* pink accent */
  --color-tertiary:  hsl(280deg 100% 85%);   /* purple accent */

  --gradient-accent: linear-gradient(
    135deg,
    hsl(225deg 100% 75%),
    hsl(333deg 100% 65%)
  );
}

[data-theme="light"] {
  --color-bg:          hsl(210deg 30% 98%);
  --color-bg-card:     hsl(210deg 20% 94%);
  --color-bg-elevated: hsl(210deg 20% 88%);
  --color-text:        hsl(210deg 25% 12%);
  --color-text-muted:  hsl(210deg 15% 40%);
  --color-border:      hsl(210deg 20% 78%);
  /* primary/secondary/tertiary unchanged — same accents in both modes */
}
```

**Dark mode — inline script (no flash):**
```html
<!-- In <head>, before any CSS -->
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    const stored = localStorage.getItem('color-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored || preferred);
  })();
`}} />
```

**Typography:**
- Heading font: `'Wotfard', 'Nunito', -apple-system, sans-serif` — rounded, friendly
- Body font: `'Wotfard', 'Nunito', -apple-system, sans-serif` (same, different weight)
- Mono font: `'Fira Code', 'Fira Mono', 'Roboto Mono', monospace`
- Base: 18px (`1.125rem`), comfortable for long-form reading
- Heading h1: `2.5rem`, weight 800
- Heading h2: `1.75rem`, weight 700
- Body: `1.125rem`, line-height `1.7`
- Labels/meta: `0.875rem`

**Category taxonomy with accent colours:**
```typescript
export const CATEGORY_COLORS: Record<Category, string> = {
  css:        'hsl(225deg 100% 75%)',   // blue
  react:      'hsl(190deg 80%  65%)',   // cyan
  animation:  'hsl(333deg 100% 65%)',   // pink
  javascript: 'hsl(50deg  100% 60%)',   // yellow
  career:     'hsl(150deg 60%  55%)',   // green
  svg:        'hsl(280deg 100% 75%)',   // purple
  nextjs:     'hsl(0deg   0%   80%)',   // neutral white
  general:    'hsl(30deg  60%  60%)',   // orange
}
```

**Post schema:**
```typescript
export interface Post {
  slug: string
  title: string
  abstract: string       // 2–3 sentences, shown on cards and OG
  publishedOn: string    // ISO 8601
  updatedOn?: string
  category: Category
  featured?: boolean
  published: boolean
}

export type Category =
  'css' | 'react' | 'animation' | 'javascript' | 'career' | 'svg' | 'nextjs' | 'general'
```

**Pages:**
- `/` — hero intro + recent posts (vertical list, 6 most recent) + "Browse by Category"
- `/blog` — all posts with category filter sidebar or pill row
- `/blog/[slug]` — MDX post with ToC sidebar and interactive custom MDX components
- `/about` — personal intro, approach to teaching

**PostCard (vertical list, not grid):**
```
[Category tag — coloured with category hsl]
[Post title — large, --color-text, hover: --color-primary]
[Abstract — 2–3 sentences, --color-text-muted]
[Date row — published date + optional updated badge]
```

**Custom MDX components:**
- `<Callout type="info|warning|success">` — coloured sidebar callout
- `<Counter />` — simple animated increment/decrement widget demonstrating React state
- `<ColorSwatch color="hsl(...)">` — displays an HSL colour swatch
- `<Spacer size="sm|md|lg">` — vertical rhythm helper

**Gradient text technique (for hero + post titles on homepage):**
```css
.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Table of Contents:** Generated from MDX `## headings`, rendered as sticky sidebar on `/blog/[slug]` (desktop), collapsed accordion on mobile. Active heading highlighted with `--color-primary`.

**Scroll progress bar:** Thin 3px bar at top of blog post page, width driven by `scrollY / documentHeight`, colour `--gradient-accent`.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### 1. Lovable

```
Build a design-forward developer blog. The author is known for making complex web topics approachable through excellent writing, interactive demos, and precise visual design. The site should feel crafted — not templated.

Tech: Next.js 14 App Router + TypeScript + Tailwind CSS. MDX for blog posts. Dark/light mode. Static export.

DESIGN SYSTEM:
Use CSS custom properties alongside Tailwind (add them to globals.css). HSL-based — not hex.

Dark mode (default, class="dark" on html):
  --color-bg: hsl(210 15% 6%)          /* near-black blue */
  --color-bg-card: hsl(210 15% 12%)    /* card surfaces */
  --color-text: hsl(210 10% 90%)       /* near-white */
  --color-text-muted: hsl(210 10% 60%) /* secondary text */
  --color-primary: hsl(225 100% 75%)   /* blue accent */
  --color-secondary: hsl(333 100% 65%) /* pink accent */

Light mode (class="light" on html):
  --color-bg: hsl(210 30% 98%)
  --color-bg-card: hsl(210 20% 94%)
  --color-text: hsl(210 25% 12%)
  --color-text-muted: hsl(210 15% 40%)
  (primary/secondary unchanged)

DARK MODE — inline script in layout <head> before stylesheets (prevents flash):
  const stored = localStorage.getItem('color-theme')
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', stored || preferred)

Typography:
  Font: 'Wotfard', 'Nunito', -apple-system, sans-serif (rounded, approachable)
  Mono: 'Fira Code', 'Roboto Mono', monospace
  Body text: 1.125rem, line-height 1.7
  h1: 2.5rem weight-800, h2: 1.75rem weight-700

Post interface: { slug, title, abstract, publishedOn (ISO), updatedOn?, category, featured?, published }
Categories: css | react | animation | javascript | career | svg | nextjs | general
Each category has an accent HSL colour (CSS, react=cyan, animation=pink, js=yellow, etc.)

Pages:
/ — Hero: your name + gradient text tagline ("I write about CSS, React, and animation."). Recent posts: 6 PostCards in vertical list. Browse by Category: pill row of categories with their accent colours.
/blog — All posts. Category filter (pills or sidebar). PostCard list.
/blog/[slug] — MDX post. Scroll progress bar (3px, gradient, top of page). Post title h1. Date + category. Table of contents sidebar (sticky desktop, collapsed mobile). MDX prose content. Custom MDX components: Callout, Counter widget.
/about — Bio + approach to teaching paragraph.

PostCard design:
  Category tag (small, uppercase, category hsl colour)
  Title (large, hover: var(--color-primary))
  Abstract (2–3 sentences, muted)
  Date (small, muted)
  var(--color-bg-card) background, hover: subtle border glow

Gradient text: background: linear-gradient(135deg, hsl(225 100% 75%), hsl(333 100% 65%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;

Seed: 8 MDX posts across categories. 3 featured. Topics: CSS custom properties, React patterns, CSS animations, JavaScript async, career advice, SVG paths, Next.js App Router, general web dev.
```

---

### 2. ChatGPT Canvas

```
Build a design-forward developer blog. Next.js 14 App Router, TypeScript, CSS Modules. MDX posts via next-mdx-remote. Dark/light mode via data-theme attribute on <html> (no flash). Static export.

File structure:
src/
  app/ layout.tsx, page.tsx, blog/page.tsx, blog/[slug]/page.tsx, about/page.tsx, globals.css
  components/ Header/ ThemeToggle/ PostCard/ PostList/ CategoryFilter/ TableOfContents/ Callout/ Counter/
  content/posts/ *.mdx
  lib/ posts.ts, toc.ts
  styles/ tokens.css  ← CSS custom properties (HSL color system)
  types/ index.ts

styles/tokens.css (imported in globals.css):
:root {
  --color-bg:          hsl(210deg 15% 6%);
  --color-bg-card:     hsl(210deg 15% 12%);
  --color-bg-elevated: hsl(210deg 15% 18%);
  --color-text:        hsl(210deg 10% 90%);
  --color-text-muted:  hsl(210deg 10% 60%);
  --color-border:      hsl(210deg 15% 22%);
  --color-primary:     hsl(225deg 100% 75%);
  --color-secondary:   hsl(333deg 100% 65%);
  --color-tertiary:    hsl(280deg 100% 85%);
  --gradient-accent:   linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%));
  --font-size-base: 1.125rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.375rem;
  --font-size-h1: 2.5rem;
  --font-size-h2: 1.75rem;
}
[data-theme="light"] {
  --color-bg: hsl(210deg 30% 98%);
  --color-bg-card: hsl(210deg 20% 94%);
  --color-bg-elevated: hsl(210deg 20% 88%);
  --color-text: hsl(210deg 25% 12%);
  --color-text-muted: hsl(210deg 15% 40%);
  --color-border: hsl(210deg 20% 78%);
}

layout.tsx:
  Inline script in <head> (dangerouslySetInnerHTML):
  "(function(){ var s=localStorage.getItem('color-theme'); var p=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'; document.documentElement.setAttribute('data-theme',s||p); })()"
  suppressHydrationWarning on <html>

Types:
Category: 'css'|'react'|'animation'|'javascript'|'career'|'svg'|'nextjs'|'general'
Post: { slug, title, abstract, publishedOn, updatedOn?, category, featured?, published }

CATEGORY_COLORS: Record<Category, string> — each category maps to an HSL string.
  css: 'hsl(225deg 100% 75%)', react: 'hsl(190deg 80% 65%)', animation: 'hsl(333deg 100% 65%)',
  javascript: 'hsl(50deg 100% 60%)', career: 'hsl(150deg 60% 55%)', svg: 'hsl(280deg 100% 75%)',
  nextjs: 'hsl(0deg 0% 80%)', general: 'hsl(30deg 60% 60%)'

Components:
- PostCard: category tag (color from CATEGORY_COLORS) + title + abstract + date. Hover: border glow using box-shadow with --color-primary.
- ThemeToggle: 'use client', reads data-theme attribute, toggles dark/light, writes to localStorage.
- Callout (MDX): props type='info'|'warning'|'success'. Coloured left-border card.
- Counter (MDX): 'use client'. Simple useState counter with +/- buttons. Demonstrates React basics.
- TableOfContents: parses ## headings from MDX source, renders sticky sidebar list. Active heading: --color-primary.

lib/posts.ts: getAllPosts(), getPostsByCategory(cat), getPostBySlug(slug). Reads MDX files, gray-matter frontmatter. sorted newest first.
lib/toc.ts: parseToc(mdxContent): extracts ## and ### headings, returns { id, text, level }[].

Seed: 8 MDX posts with correct frontmatter. Topics spread across categories.
```

---

### 3. Bolt.new

```
Build a design-forward developer blog that demonstrates the author's CSS and design expertise through the design of the site itself.

Stack: Next.js 14 + TypeScript + CSS Modules (not Tailwind). MDX posts. Static export.

WHAT MAKES THIS SITE DISTINCTIVE:
1. HSL color system — all colors are CSS custom properties with HSL values, not hex
2. Dark/light mode WITHOUT flash — inline script in <head> sets data-theme before CSS loads
3. Category-color-coded posts — each of 8 categories has a distinct accent hsl color
4. Gradient text on key headings — linear-gradient clipped to text
5. Scroll progress bar on post pages — thin gradient line tracks reading position
6. Custom MDX components — Callout, Counter widget, ColorSwatch

CSS CUSTOM PROPERTIES (globals.css):
Dark (default): --color-bg hsl(210deg 15% 6%), --color-bg-card hsl(210deg 15% 12%), --color-text hsl(210deg 10% 90%), --color-text-muted hsl(210deg 10% 60%), --color-primary hsl(225deg 100% 75%), --color-secondary hsl(333deg 100% 65%), --color-border hsl(210deg 15% 22%)
Light: --color-bg hsl(210deg 30% 98%), --color-bg-card hsl(210deg 20% 94%), --color-text hsl(210deg 25% 12%), --color-text-muted hsl(210deg 15% 40%), --color-border hsl(210deg 20% 78%)

DARK MODE — prevent flash with inline script in layout.tsx <head>:
  (function(){ var t=localStorage.getItem('color-theme')||( window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'); document.documentElement.setAttribute('data-theme',t); })()

Post: { slug, title, abstract, publishedOn, updatedOn?, category:'css'|'react'|'animation'|'javascript'|'career'|'svg'|'nextjs'|'general', featured?, published }

PAGES:
/ — Hero section: name + gradient-text tagline + CTA. Recent posts list (6 PostCards, vertical). Category grid.
/blog — All posts. Category filter pills (each pill in its category hsl). PostCard vertical list.
/blog/[slug] — Scroll progress bar. Post header (title, date, category). TableOfContents sidebar (sticky, lg+). MDX content. Custom MDX components.
/about — Bio text paragraphs.

PostCard:
  bg: var(--color-bg-card)
  Category tag: text in category hsl, uppercase font-mono text-xs
  Title: var(--color-text), hover var(--color-primary), font-size var(--font-size-lg)
  Abstract: var(--color-text-muted), 2–3 sentences
  Date: var(--color-text-muted) text-xs

Scroll progress bar:
  position fixed, top 0, left 0, height 3px
  background: var(--gradient-accent)
  width driven by: (scrollY / (documentHeight - viewportHeight)) * 100 + '%'
  useEffect, window scroll event listener

Seed: 8 MDX posts. Include at least one that demonstrates the custom Callout and Counter components.
```

---

### 4. v0

```
Design and build a developer blog with strong design sensibility. The author writes about CSS, React, animations, and web performance. The site should look better than any template — it should feel like a designer who codes built it.

Stack: Next.js 14 App Router + TypeScript + CSS Modules (not Tailwind). MDX. Static export.

Color system — CSS custom properties, HSL values:
  Dark (default):
    --color-bg: hsl(210deg 15% 6%)           background
    --color-bg-card: hsl(210deg 15% 12%)      card surfaces
    --color-bg-elevated: hsl(210deg 15% 18%) popovers, tooltips
    --color-text: hsl(210deg 10% 90%)         body text
    --color-text-muted: hsl(210deg 10% 60%)   secondary text
    --color-border: hsl(210deg 15% 22%)       hairlines
    --color-primary: hsl(225deg 100% 75%)     blue — CTAs, links, active states
    --color-secondary: hsl(333deg 100% 65%)   pink — accents, category tags
    --gradient-accent: linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%))

  Light (data-theme="light" on html):
    --color-bg: hsl(210deg 30% 98%)
    --color-bg-card: hsl(210deg 20% 94%)
    --color-text: hsl(210deg 25% 12%)
    --color-text-muted: hsl(210deg 15% 40%)
    --color-border: hsl(210deg 20% 78%)
    (primary/secondary/gradient unchanged)

Typography:
  Font: 'Wotfard', 'Nunito', -apple-system, sans-serif
  Mono: 'Fira Code', 'Roboto Mono', monospace
  Base size: 1.125rem, line-height 1.7
  h1: clamp(2rem, 5vw, 3rem) weight-800
  h2: clamp(1.5rem, 3vw, 1.75rem) weight-700

Post interface: { slug, title, abstract, publishedOn: string, updatedOn?: string, category: Category, featured?: boolean, published: boolean }
Category: 'css'|'react'|'animation'|'javascript'|'career'|'svg'|'nextjs'|'general'

Category accent colors (used for tags + filter pills):
  css #809fff | react #70d0e8 | animation #ff4da0 | javascript #f5c842 | career #55cc88 | svg #cc85ff | nextjs #cccccc | general #cc8844

Build components:
1. ThemeToggle ('use client') — reads/writes data-theme attribute + localStorage. Text label "Dark"/"Light".
2. PostCard — vertical list card. CSS module. Category tag (coloured). Title. Abstract. Date.
3. CategoryFilter ('use client') — pill row. Active pill: category hsl bg + white text. Inactive: border + category hsl text.
4. TableOfContents — parses ## headings. Sticky sidebar on desktop. Active: --color-primary.
5. ScrollProgressBar ('use client') — position:fixed top-0, height 3px, gradient-accent, width = scroll%.
6. Callout MDX component — box with coloured left-border. Props: type (info/warning/success).
7. Counter MDX widget ('use client') — useState counter with + - buttons. Shows React in action.

Layout (layout.tsx):
  Inline <script> in <head> for dark mode (prevents flash). suppressHydrationWarning on html.

Pages:
  / — Hero (gradient text tagline) + 6 recent PostCards + Category browsing section
  /blog — CategoryFilter + PostCard list of all published posts
  /blog/[slug] — ScrollProgressBar + post header + ToC sidebar + MDX prose + MDX components
  /about — Bio + teaching philosophy

Seed: 8 MDX posts. Frontmatter: title, abstract, publishedOn, category, published: true, featured (3 of 8).
```

---

### 5. Claude Artifacts (Cursor / Windsurf / IDE agents)

```
Build a production-ready, design-forward developer blog. Next.js 14 App Router, TypeScript strict, CSS Modules. MDX content via next-mdx-remote. Dark/light mode via inline script (no flash). Static export.

PERSONA: An engineer with deep design sensibility — writes about CSS, React, animations, JavaScript, web performance. The blog is itself a demonstration of expertise. Visitors should think "whoever built this really knows their craft."

THE SIGNATURE TECHNICAL MOVE: HSL-based CSS custom properties for the entire color system. Not hex. Not RGB. Every color is `hsl(Xdeg Y% Z%)`. Dark mode flips the HSL values. This is a deliberate statement.

TYPES (src/types/index.ts):
```typescript
export type Category =
  | 'css' | 'react' | 'animation' | 'javascript'
  | 'career' | 'svg' | 'nextjs' | 'general'

export interface Post {
  slug: string
  title: string
  abstract: string        // 2–3 sentences shown on cards and used for OG
  publishedOn: string     // ISO 8601
  updatedOn?: string
  category: Category
  featured?: boolean
  published: boolean
}

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export const CATEGORY_COLORS: Record<Category, string> = {
  css:        'hsl(225deg 100% 75%)',
  react:      'hsl(190deg 80% 65%)',
  animation:  'hsl(333deg 100% 65%)',
  javascript: 'hsl(50deg 100% 60%)',
  career:     'hsl(150deg 60% 55%)',
  svg:        'hsl(280deg 100% 75%)',
  nextjs:     'hsl(0deg 0% 80%)',
  general:    'hsl(30deg 60% 60%)',
}
```

CSS TOKENS (src/styles/tokens.css — imported by globals.css):
```css
:root {
  --color-bg:           hsl(210deg 15% 6%);
  --color-bg-card:      hsl(210deg 15% 12%);
  --color-bg-elevated:  hsl(210deg 15% 18%);
  --color-text:         hsl(210deg 10% 90%);
  --color-text-muted:   hsl(210deg 10% 60%);
  --color-border:       hsl(210deg 15% 22%);
  --color-primary:      hsl(225deg 100% 75%);
  --color-secondary:    hsl(333deg 100% 65%);
  --color-tertiary:     hsl(280deg 100% 85%);
  --gradient-accent:    linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%));
  --font-family:        'Wotfard', 'Nunito', -apple-system, sans-serif;
  --font-family-mono:   'Fira Code', 'Roboto Mono', monospace;
  --font-size-sm:       0.875rem;
  --font-size-base:     1.125rem;
  --font-size-lg:       1.375rem;
  --font-size-h1:       clamp(2rem, 5vw, 3rem);
  --font-size-h2:       clamp(1.5rem, 3vw, 1.875rem);
  --line-height-prose:  1.7;
  --space-sm: 0.75rem; --space-md: 1.5rem; --space-lg: 3rem; --space-xl: 6rem;
  --radius: 8px;
}
[data-theme="light"] {
  --color-bg:          hsl(210deg 30% 98%);
  --color-bg-card:     hsl(210deg 20% 94%);
  --color-bg-elevated: hsl(210deg 20% 88%);
  --color-text:        hsl(210deg 25% 12%);
  --color-text-muted:  hsl(210deg 15% 40%);
  --color-border:      hsl(210deg 20% 78%);
}
```

CONTENT PIPELINE (src/lib/posts.ts):
getAllPosts(), getPostsByCategory(cat), getFeaturedPosts(), getPostBySlug(slug). Reads content/posts/*.mdx, gray-matter frontmatter. Excludes published:false.

TOC PARSER (src/lib/toc.ts):
parseToc(content: string): TocEntry[] — regex to find ## and ### headings, returns { id, text, level }.

COMPONENTS:
- ThemeToggle.tsx ('use client') — reads `document.documentElement.getAttribute('data-theme')`, toggles, writes localStorage. Renders sun/moon text symbol or "[Dark]"/"[Light]".
- PostCard.tsx — CSS module. category tag (style={{ color: CATEGORY_COLORS[category] }}), title (large, hover:var(--color-primary)), abstract (muted), date. Hover: box-shadow with primary color at 20% opacity.
- CategoryFilter.tsx ('use client') — useState(null). Pill buttons per category. Active: bg = category hsl, color white. Inactive: border = category hsl, color = category hsl, bg transparent.
- ScrollProgressBar.tsx ('use client') — useEffect scroll listener. useState(0) for width%. position: fixed, top: 0, left: 0, height: 3px, width: width% + '%', background: var(--gradient-accent), zIndex: 100.
- TableOfContents.tsx — receives TocEntry[]. Renders sticky sidebar on lg+. Active entry via IntersectionObserver on headings. Active: color var(--color-primary).
- Callout.tsx (MDX component) — props: type ('info'|'warning'|'success'), children. Renders a box with colored left border (4px) and colored bg-tint (5% opacity).
- Counter.tsx ('use client', MDX component) — useState(0). Renders count + button increment/decrement. Demonstrates React.

LAYOUT (src/app/layout.tsx):
- Inline script in <head> (dangerouslySetInnerHTML) — see dark mode flash prevention above
- suppressHydrationWarning on <html>
- body: background var(--color-bg), color var(--color-text), font-family var(--font-family)

PAGES:
- / — Hero (gradient-text h1 tagline), 6 recent PostCards, Browse by Category grid
- /blog — 'use client', CategoryFilter + filtered PostCard list
- /blog/[slug] — generateStaticParams, ScrollProgressBar, post header, ToC sidebar layout, MDXRemote with custom components
- /about — Bio paragraphs

MDX CUSTOM COMPONENTS (passed to MDXRemote as components):
{ Callout, Counter, ColorSwatch }

INSTALL: npm install next-mdx-remote gray-matter
SEED: 8 MDX posts across all 8 categories. 3 featured. Each has at least 300 words. At least 2 posts use Callout component. 1 post uses Counter.
Verify: tsc --noEmit zero errors. npm run build succeeds.
```

---

### 6. Google Gemini / Gemini Canvas

```
Build a developer blog that feels like it was designed by someone who truly loves CSS. The author teaches CSS, React, animations, and JavaScript through long-form interactive tutorials. The site demonstrates the author's expertise through its own design quality.

Stack: Next.js 14 + TypeScript + CSS Modules. MDX for posts. Static export.

What makes this site's design distinctive:
1. HSL color system — every single color is an HSL CSS custom property, never hex
2. No flash on dark mode — an inline script sets data-theme on <html> before CSS renders
3. Saturated accent palette — deep navy background, bright blue + bright pink accents
4. Category color coding — 8 post categories each have their own hsl accent color
5. Gradient text on key headings — linear-gradient clipped to text characters
6. Scroll progress bar on post pages — a thin gradient line that fills as you read
7. Interactive components in MDX posts — simple widgets that demonstrate what the text describes

Color system (in globals.css as CSS custom properties, HSL only):
Background: hsl(210deg 15% 6%) dark / hsl(210deg 30% 98%) light
Cards: hsl(210deg 15% 12%) dark / hsl(210deg 20% 94%) light
Text: hsl(210deg 10% 90%) dark / hsl(210deg 25% 12%) light
Muted: hsl(210deg 10% 60%) dark / hsl(210deg 15% 40%) light
Blue accent: hsl(225deg 100% 75%) — same in both modes
Pink accent: hsl(333deg 100% 65%) — same in both modes
Gradient: linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%))

Post data: { slug, title, abstract, publishedOn, updatedOn?, category, featured?, published }
8 Categories with their own hsl colors: css(blue), react(cyan), animation(pink), javascript(yellow), career(green), svg(purple), nextjs(neutral), general(orange)

Pages:
Homepage (/): Centered hero — your name + gradient-text tagline ("I teach CSS, React, and the web platform."). 6 recent PostCards in a vertical list. Browse-by-category section: grid of category pills with their accent colours.

Blog (/blog): CategoryFilter (pill row — active pill uses category background). PostCard vertical list of all published posts, filtered by active category. PostCard layout: category tag → title → abstract → date.

Post page (/blog/[slug]): Scroll progress bar (3px fixed gradient line at top). Post heading block. Table of contents sidebar (sticky on desktop, hidden on mobile). MDX prose content with custom components.

About (/about): 3–4 paragraphs. Who you are. Why you teach. Your approach.

Custom MDX components to implement:
- Callout: coloured left-border card. type prop: info (blue), warning (yellow), success (green).
- Counter: interactive +/- widget using React useState. Shows that interactive widgets are possible in MDX.
- Gradient text utility (CSS class, used in headings): .gradient-text { background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

Dark mode: inline script (not next-themes). In layout.tsx <head>, dangerouslySetInnerHTML. Reads localStorage, falls back to prefers-color-scheme. Sets data-theme attribute. ThemeToggle component reads/writes the same attribute.

Seed: 8 MDX posts, one per category. At least 3 paragraphs each. 3 marked featured.
```

---

### 7. Grok

```
Build a developer blog for someone who cares as deeply about design as they do about code. Think: the intersection of the CSS Tricks era of teaching with modern Next.js architecture.

Stack: Next.js 14, TypeScript, CSS Modules, MDX, static export.

THE COLOR SYSTEM (do this exactly — it's the signature):
All colors in CSS custom properties. All values in HSL. No hex in CSS ever.

globals.css:
:root {
  --color-bg: hsl(210deg 15% 6%);
  --color-bg-card: hsl(210deg 15% 12%);
  --color-text: hsl(210deg 10% 90%);
  --color-text-muted: hsl(210deg 10% 60%);
  --color-border: hsl(210deg 15% 22%);
  --color-primary: hsl(225deg 100% 75%);
  --color-secondary: hsl(333deg 100% 65%);
  --gradient: linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%));
}
[data-theme="light"] {
  --color-bg: hsl(210deg 30% 98%);
  --color-bg-card: hsl(210deg 20% 94%);
  --color-text: hsl(210deg 25% 12%);
  --color-text-muted: hsl(210deg 15% 40%);
  --color-border: hsl(210deg 20% 78%);
}

DARK MODE (add inline script to <head> in layout.tsx, before any style):
(function(){ var t=localStorage.getItem('color-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'); document.documentElement.setAttribute('data-theme',t); })()

Post: { slug, title, abstract, publishedOn, updatedOn?, category, featured?, published }
Category: css|react|animation|javascript|career|svg|nextjs|general
CATEGORY_COLORS: each maps to an hsl string

Pages:
/ — gradient-text hero headline, 6 PostCards (vertical list), category grid
/blog — CategoryFilter pills + PostCard list (filtered by active category)
/blog/[slug] — ScrollProgressBar + ToC sidebar + MDX + custom MDX components
/about — bio

PostCard: bg-card, category tag in category hsl, title large hover:primary, abstract muted, date small. Hover: box-shadow 0 0 0 2px var(--color-primary) at 40% opacity.

ScrollProgressBar ('use client'): position fixed top 0, height 3px, background var(--gradient), width updated on scroll event.

TableOfContents: parse ## headings from MDX, render as sticky sidebar. Active heading: var(--color-primary). IntersectionObserver to track active.

MDX custom components: Callout (info/warning/success with colored border), Counter (useState +/- demo).

CATEGORY COLORS:
css: hsl(225deg 100% 75%) | react: hsl(190deg 80% 65%) | animation: hsl(333deg 100% 65%)
javascript: hsl(50deg 100% 60%) | career: hsl(150deg 60% 55%) | svg: hsl(280deg 100% 75%)
nextjs: hsl(0deg 0% 80%) | general: hsl(30deg 60% 60%)

Seed with 8 MDX posts. Include Callout usage in 2 posts. Include Counter in 1.
Verify: tsc clean, npm run build succeeds.
```

---

### 8. Cursor (agentic, file-by-file)

```
Build a design-forward developer blog. Work file by file. Confirm after each step.

IMMUTABLE RULES:
- All CSS colors are HSL custom properties — never hex in CSS files
- Dark mode via inline <script> in <head> — NOT next-themes
- Category-color-coded posts — 8 categories, each a distinct HSL value
- Gradient text: linear-gradient clipped to -webkit-text-fill-color on key headings
- Scroll progress bar on post pages — 3px fixed gradient line
- MDX custom components: at minimum Callout and Counter

BUILD ORDER:

Step 1 — Setup
create-next-app TS + no-tailwind + app + src-dir. npm install next-mdx-remote gray-matter. Static export config.

Step 2 — CSS tokens
src/styles/tokens.css — all HSL custom properties (dark default + [data-theme="light"] overrides). Import in globals.css.

Step 3 — Types
src/types/index.ts — Category, Post, TocEntry. CATEGORY_COLORS record.

Step 4 — Content pipeline
src/lib/posts.ts — getAllPosts, getPostsByCategory, getFeaturedPosts, getPostBySlug. Gray-matter frontmatter parsing.
src/lib/toc.ts — parseToc(content): extracts ## and ### headings as TocEntry[].

Step 5 — MDX content
content/posts/*.mdx — 8 files, one per category. Frontmatter. 3 marked featured. At least 2 use Callout.

Step 6 — Layout
src/app/layout.tsx — inline dark-mode script in <head>. suppressHydrationWarning on <html>. Body styles. Metadata.

Step 7 — ThemeToggle
'use client'. Reads data-theme attribute. Toggles dark/light. Writes localStorage.

Step 8 — Header
Nav with logo, category links, ThemeToggle. Sticky. bg: var(--color-bg)/80 backdrop-blur.

Step 9 — PostCard
CSS module. Category tag (category hsl color). Title. Abstract. Date. Hover glow.

Step 10 — CategoryFilter
'use client'. Pill buttons per category. Active: category hsl bg. Inactive: category hsl border.

Step 11 — Callout MDX component
type: info|warning|success. Colored left border. Tinted background.

Step 12 — Counter MDX component
'use client'. useState(0). + and - buttons. Styled with CSS vars.

Step 13 — ScrollProgressBar
'use client'. Scroll event listener. position fixed, top 0, height 3px, gradient-accent.

Step 14 — TableOfContents
Props: TocEntry[]. Sticky sidebar. IntersectionObserver for active heading. Active: --color-primary.

Step 15 — Homepage
Hero (gradient-text tagline) + 6 PostCards + category grid.

Step 16 — Blog page
'use client'. CategoryFilter + PostCard list.

Step 17 — Blog post page
generateStaticParams. ScrollProgressBar. ToC sidebar layout. MDXRemote with custom components.

Step 18 — About page

Step 19 — Verification
tsc --noEmit + npm run build.

Report after each step: "Step [N] complete. [Built]. TypeScript: clean."
```
