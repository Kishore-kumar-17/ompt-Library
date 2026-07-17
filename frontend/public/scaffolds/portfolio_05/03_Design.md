# 03 — Design System
## Developer Personal Site + Blog · portfolio_platform_05

---

## 1. Design Philosophy

This site does not have a visual design system in the traditional sense. There is no colour palette to choose from. There are no component variants or brand guidelines. The design IS:

1. **One column** — always, everywhere, no exceptions
2. **Neutral grey** — Tailwind neutral scale, no custom hex values
3. **System fonts** — zero network requests for typefaces
4. **Underlined links** — the same treatment everywhere
5. **Dark mode that works** — system preference, no flash

If you are asking "should I add a card here?" — the answer is no.
If you are asking "should I use a colour other than neutral?" — the answer is no.
If you are asking "should I add an animation?" — the answer is no.

---

## 2. Colour System

**All colours are Tailwind neutral scale. No custom hex values anywhere in the codebase.**

```
Light mode:
  Background:   bg-white
  Body text:    text-neutral-900
  Muted text:   text-neutral-500
  Link decor:   decoration-neutral-400
  Border:       border-neutral-200
  Nav bg:       bg-white/80

Dark mode:
  Background:   dark:bg-neutral-950
  Body text:    dark:text-neutral-100
  Muted text:   dark:text-neutral-500  (same shade — intentional)
  Link decor:   dark:decoration-neutral-600
  Border:       dark:border-neutral-800
  Nav bg:       dark:bg-neutral-950/80
```

**Hover states:**
```
Link decoration (light):  hover:decoration-neutral-500
Link decoration (dark):   dark:hover:decoration-neutral-500

Nav text (light):         hover:text-neutral-600
Nav text (dark):          dark:hover:text-neutral-300

ThemeToggle (light):      hover:text-neutral-700
ThemeToggle (dark):       dark:hover:text-neutral-300
```

**Reference values (Tailwind neutral scale):**
```
neutral-100  → #f5f5f5
neutral-200  → #e5e5e5
neutral-400  → #a3a3a3
neutral-500  → #737373
neutral-600  → #525252
neutral-700  → #404040
neutral-800  → #262626
neutral-900  → #171717
neutral-950  → #0a0a0a
```

---

## 3. Typography

**UI font (everywhere except prose):**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```
Set on `<body>` in `globals.css`. No `@import`. No `next/font`.

**Prose font (blog post content only):**
```css
font-family: 'Stix Two Text', Georgia, 'Times New Roman', serif;
```
Applied via Tailwind Typography plugin customisation to `p`, `li`, `blockquote` inside `.prose`. Not loaded over network — Georgia is the effective fallback everywhere.

**Type scale (Tailwind classes — not custom tokens):**

| Usage | Class |
|-------|-------|
| Post title (h1) | `text-2xl font-semibold tracking-tight` |
| Section heading | `text-xl font-semibold tracking-tight` |
| Body text | `text-base` (default) |
| Nav links | `text-sm` |
| Metadata / dates | `text-sm text-neutral-500` |
| ThemeToggle | `text-sm text-neutral-500` |
| Social row | `text-sm` |

**Weights:**
- `font-medium` — name on homepage
- `font-semibold` — post title h1, section headings
- No weight beyond `font-semibold`. Never `font-bold` or `font-extrabold`.

**Line heights:**
- Body text: `leading-7` (1.75) — comfortable for prose
- Headings: default (`leading-tight`)

**Letter spacing:**
- Post title: `tracking-tight` (-0.025em)
- Nav items: default
- Labels/meta: default

---

## 4. Link Style (Universal)

**Every link in the site uses the same underline treatment:**

```
underline decoration-1 underline-offset-[2.5px]
decoration-neutral-400 hover:decoration-neutral-500
dark:decoration-neutral-600 dark:hover:decoration-neutral-500
transition-colors
```

Create a constant for this in `src/lib/cn.ts`:
```typescript
export const linkClass =
  'underline decoration-1 underline-offset-[2.5px] ' +
  'decoration-neutral-400 hover:decoration-neutral-500 ' +
  'dark:decoration-neutral-600 dark:hover:decoration-neutral-500 ' +
  'transition-colors'
```

Import and use on every `<Link>` and `<a>`. No exceptions.

**Do not use:**
- `text-blue-500` for links
- `hover:text-black` style colour changes
- Underline removal on hover
- Any other underline colour

---

## 5. Layout (The One Rule)

```
max-w-xl mx-auto px-4
```

This is the layout. Every page uses this container. Never add a second column. Never add a sidebar. Never add a grid for content.

The one exception: the Nav is `max-w-xl mx-auto px-4` with `flex justify-between` for name (left) and links (right). That is the only flex row.

**Page top margin:**
- Homepage: `mt-16` (desktop), `mt-8` (mobile) → `mt-8 md:mt-16`
- Other pages: `py-16`

---

## 6. Navigation Specification

```tsx
<nav className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
  <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
    {/* Left: site name */}
    <Link href="/" className="text-sm font-medium ...">Your Name</Link>

    {/* Right: nav links + toggle */}
    <div className="flex items-center gap-4">
      <Link href="/blog" className="text-sm text-neutral-500 ...">Blog</Link>
      <Link href="/work" className="text-sm text-neutral-500 ...">Work</Link>
      <ThemeToggle />
    </div>
  </div>
</nav>
```

- `py-3` — compact vertical padding
- `backdrop-blur-sm` — subtle blur when content scrolls behind
- `bg-white/80` — 80% opacity so content is readable behind nav
- No box-shadow — `border-b` only

---

## 7. Homepage Structure

```tsx
<main className="max-w-xl mx-auto px-4 mt-8 md:mt-16">

  {/* Name — plain text, not a heading */}
  <p className="text-neutral-900 dark:text-neutral-100 font-medium mb-4">
    Your Name
  </p>

  {/* Bio */}
  <p className="text-neutral-700 dark:text-neutral-300 leading-7 mb-8">
    I work on [X] at [Company]. I'm interested in [Y] and [Z].
    Previously, [brief previous role].
  </p>

  {/* Featured writing */}
  <div className="mb-8">
    <p className="text-sm uppercase tracking-widest text-neutral-500 mb-3">
      Writing
    </p>
    <PostList posts={featuredPosts} />
  </div>

  {/* Social links */}
  <div>
    <p className="text-sm uppercase tracking-widest text-neutral-500 mb-3">
      Links
    </p>
    <SocialRow />
  </div>

</main>
```

---

## 8. Blog List Page Structure

```tsx
<main className="max-w-xl mx-auto px-4 py-16">
  <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
    Writing
  </h1>
  <PostList posts={allPosts} />
</main>
```

Nothing else. No filter bar. No categories. No date range. Just the list.

---

## 9. Blog Post Page Structure

```tsx
<article className="max-w-xl mx-auto px-4 py-16">
  <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
    {post.title}
  </h1>
  <p className="text-sm text-neutral-500 mt-1 mb-8">
    {formattedDate}
  </p>
  <Prose>
    <MDXRemote source={content} />
  </Prose>
</article>
```

After the prose: nothing. No "Share this post." No "Related articles." No comments. No back link (Nav is sticky — user can navigate back).

---

## 10. Prose Typography Configuration

In `tailwind.config.ts`, customise the Typography plugin:

```typescript
typography: (theme) => ({
  DEFAULT: {
    css: {
      '--tw-prose-body': theme('colors.neutral.700'),
      '--tw-prose-headings': theme('colors.neutral.900'),
      '--tw-prose-links': theme('colors.neutral.900'),
      '--tw-prose-code': theme('colors.neutral.900'),
      '--tw-prose-invert-body': theme('colors.neutral.300'),
      '--tw-prose-invert-headings': theme('colors.neutral.100'),
      '--tw-prose-invert-links': theme('colors.neutral.100'),
      'p, li, blockquote': {
        fontFamily: "'Stix Two Text', Georgia, 'Times New Roman', serif",
      },
      'a': {
        textDecoration: 'underline',
        textDecorationColor: theme('colors.neutral.400'),
        textUnderlineOffset: '2.5px',
        textDecorationThickness: '1px',
        '&:hover': {
          textDecorationColor: theme('colors.neutral.500'),
        },
      },
      'h1, h2, h3': {
        fontFamily: 'inherit',  // system sans for headings within prose
        letterSpacing: '-0.025em',
      },
      'code': {
        backgroundColor: theme('colors.neutral.100'),
        padding: '0.1em 0.3em',
        borderRadius: '3px',
        fontSize: '0.875em',
      },
      'pre': {
        backgroundColor: theme('colors.neutral.950'),
        color: theme('colors.neutral.100'),
      },
    },
  },
  invert: {
    css: {
      'code': {
        backgroundColor: theme('colors.neutral.800'),
      },
    },
  },
}),
```

---

## 11. SocialRow Component

```tsx
// src/components/SocialRow.tsx
const links = [
  { label: 'GitHub', href: 'https://github.com/username' },
  { label: 'X', href: 'https://x.com/username' },
  { label: 'YouTube', href: 'https://youtube.com/@username' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
  { label: 'Email', href: 'mailto:user@example.com' },
]

export function SocialRow() {
  return (
    <p className="text-sm">
      {links.map((link, i) => (
        <span key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {link.label}
          </a>
          {i < links.length - 1 && (
            <span className="text-neutral-300 dark:text-neutral-700 mx-1">·</span>
          )}
        </span>
      ))}
    </p>
  )
}
```

---

## 12. Anti-Patterns

| What | Why forbidden |
|------|--------------|
| Hero image or banner | Adds no information; slows load |
| Project cards with screenshots | This is a blog, not a visual portfolio |
| Cards or boxes around post titles | The underlined link IS the component |
| Custom hex values | Tailwind neutral scale is sufficient and disciplined |
| Coloured links (blue, green) | Neutral underline treatment only |
| Icon libraries (react-icons, lucide-react) | Text labels communicate as well and cost nothing |
| Font weight `font-bold` or `font-extrabold` | `font-semibold` is the maximum weight |
| Scroll animations, reveal effects | No motion except `transition-colors` |
| Border-radius on buttons | Sharp edges — text button or no border at all |
| Related posts section | Blog list page serves this purpose |
| Date shown on blog list | Dates cause readers to avoid "old" posts that are still valuable |
| Tag or category system | Flat list is simpler and scales further than expected |
| Newsletter modal popup | Plain inline email link in bio or footer is enough |
| `console.log` in production | `tsc --noEmit` should catch this pattern via strict mode |
| Any grid layout | Single column everywhere |
