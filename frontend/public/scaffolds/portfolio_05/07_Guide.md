# 07 — Developer Guide
## Developer Personal Site + Blog · portfolio_platform_05

Reference while building. The theme of this guide is: when in doubt, do less.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| Single column: `max-w-xl mx-auto px-4` everywhere | The layout IS the design. A second column would require a reason. There is none. |
| Tailwind neutral scale only — no custom hex values | Custom colours require decisions. Neutral scale makes the right decisions automatic. |
| System fonts for UI — no `@import`, no `next/font` | Zero network requests = zero FOUT = perfect score |
| All links use `linkClass` — always | Consistent underline treatment is the one visible design pattern; inconsistency breaks it |
| Blog list: titles only — no dates, no excerpts, no cards | Dates make old posts look stale. Excerpts are redundant (the title IS the hook). |
| `transition-colors` only — no layout animations | Speed is the aesthetic; motion competes with it |
| ThemeToggle: text label — no icon libraries | Every dependency is a decision; "[Dark]" communicates as well as a moon icon |
| MDX files in `content/posts/` — no database | Files in git = versioned, diff-able, portable, offline-editable |
| `suppressHydrationWarning` on `<html>` | next-themes sets a class on `<html>` before hydration; without this, React warns on every load |
| `mounted` check in ThemeToggle | Without it, the toggle renders the wrong state on server vs client, causing a flash |

---

## 2. Dark Mode — How It Works

```
1. next-themes reads localStorage on load
2. If no localStorage, reads prefers-color-scheme
3. Applies 'dark' or 'light' class to <html>
4. Tailwind dark: variants activate based on that class
5. ThemeProvider re-renders with correct theme
```

**The flash problem:** If you render ThemeToggle without checking `mounted`, Next.js renders "[Dark]" on the server (it doesn't know the user's preference), then React re-renders with the actual theme. This causes a visible toggle text change. The fix:

```typescript
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <span className="w-12 inline-block" /> // same width as button
```

**`suppressHydrationWarning` on `<html>`:** next-themes adds `class="dark"` to `<html>` before React hydrates. React sees a mismatch between server HTML (no class) and client DOM (has class). `suppressHydrationWarning` tells React to ignore this specific mismatch. Apply it only to `<html>` — not to other elements.

---

## 3. MDX Pipeline — How It Works

```
content/posts/my-post.mdx
    ↓
fs.readFileSync (in src/lib/posts.ts)
    ↓
gray-matter.parse() → { data: frontmatter, content: mdxString }
    ↓
data → typed as Post (slug, title, date, summary, published, featured)
    ↓
content → passed to <MDXRemote source={content} /> in blog/[slug]/page.tsx
    ↓
MDXRemote → renders MDX as React components
    ↓
wrapped in <Prose> → applies prose prose-neutral dark:prose-invert
```

**Important:** `getPostBySlug` reads the file at request time on a static build — it runs at build time via `generateStaticParams`, not at user request time. The result is baked into the HTML.

**Adding a new post:**
1. Create `content/posts/new-slug.mdx` with valid frontmatter
2. Set `published: true`
3. `npm run build` — the new slug appears in `/out/blog/`

No CMS. No deploy hook. Just commit and rebuild.

---

## 4. The Link Class — Why It Matters

```typescript
export const linkClass =
  'underline decoration-1 underline-offset-[2.5px] ' +
  'decoration-neutral-400 hover:decoration-neutral-500 ' +
  'dark:decoration-neutral-600 dark:hover:decoration-neutral-500 ' +
  'transition-colors'
```

This is the only visible UI pattern on the site beyond plain text. Every link uses it. If one link looks different, the design breaks.

**Where to use `linkClass`:** PostList, SocialRow, any inline links in prose that are manually coded (not MDX — those are handled by Typography plugin config), work page links.

**Where NOT to use `linkClass`:** Nav links (those use colour opacity changes, not underline — intentionally different to distinguish navigation from content links), ThemeToggle (no underline).

**Common mistake:** Adding `text-blue-500` to a link because it doesn't look "link-like" enough. The underline IS the link indicator. Blue colour is for coloured link systems — this site is neutral.

---

## 5. Common Mistakes

### Mistake 1: Adding a second column anywhere

```tsx
// WRONG
<div className="grid grid-cols-2 gap-8">
  <PostList posts={featured} />
  <SocialRow />
</div>

// CORRECT — one column always
<PostList posts={featured} />
<SocialRow />
```

### Mistake 2: Showing dates on the blog list

```tsx
// WRONG
<li>
  <span className="text-neutral-500">{post.date}</span>
  <Link href={...}>{post.title}</Link>
</li>

// CORRECT — titles only
<li>
  <Link href={...} className={linkClass}>{post.title}</Link>
</li>
```

Dates on blog lists cause readers to skip posts they deem "too old." A post from 2022 about React patterns may be more valuable than one from last week.

### Mistake 3: Custom colour in the palette

```tsx
// WRONG
<p className="text-indigo-500">Writing</p>
<p style={{ color: '#6366f1' }}>Writing</p>

// CORRECT
<p className="text-neutral-500">Writing</p>
```

### Mistake 4: Icon library import

```tsx
// WRONG — adds JS bundle weight and a visual decision
import { MoonIcon } from '@heroicons/react/24/outline'
<MoonIcon className="w-4 h-4" />

// CORRECT
<button>  [Dark]  </button>
```

### Mistake 5: Forgetting `mounted` in ThemeToggle

```typescript
// WRONG — causes hydration mismatch
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <button>{theme === 'dark' ? '[Light]' : '[Dark]'}</button>
}

// CORRECT
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <span className="w-12 inline-block" />
  return <button>{theme === 'dark' ? '[Light]' : '[Dark]'}</button>
}
```

### Mistake 6: Missing `suppressHydrationWarning`

```tsx
// WRONG
<html lang="en">

// CORRECT
<html lang="en" suppressHydrationWarning>
```

### Mistake 7: Using `notFound()` incorrectly in static export

```typescript
// WRONG — in a static export, conditional rendering returns a blank page
if (!result) return null

// CORRECT — notFound() throws, Next.js renders 404.html
if (!result) notFound()
```

### Mistake 8: Blog post without `generateMetadata`

```typescript
// WRONG — all posts get the same generic title
export default function PostPage() { ... }

// CORRECT — each post gets its own OG title and description
export async function generateMetadata({ params }) {
  const result = getPostBySlug(params.slug)
  if (!result) return {}
  return { title: result.post.title, description: result.post.summary }
}
```

### Mistake 9: Importing fonts

```tsx
// WRONG — loads a font file over the network
import { Geist } from 'next/font/google'
const geist = Geist({ subsets: ['latin'] })

// CORRECT — system stack in globals.css
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ... }
```

### Mistake 10: Newsletter modal

This site does not have a newsletter signup popup. If you want to capture email addresses, add a plain text line to the homepage: "Subscribe via email: [link]." That is the entire implementation.

---

## 6. Prose Font — Stix Two Text

`Stix Two Text` is an open-source serif variable font. It is not available in the system font stack by default. If you want to self-host it:

1. Download from `fonts.google.com/specimen/STIX+Two+Text`
2. Place the WOFF2 file in `/public/fonts/StixTwoText.woff2`
3. Add to `globals.css`:
```css
@font-face {
  font-family: 'Stix Two Text';
  src: url('/fonts/StixTwoText.woff2') format('woff2');
  font-display: swap;
}
```

If you skip this, Georgia renders as the fallback — which is perfectly acceptable and faster.

---

## 7. Post Frontmatter Reference

```yaml
---
title: "Post Title in Sentence Case"   # Required. Shown as h1 on post page.
date: "2024-03-15"                     # Required. ISO 8601. Used for sort order only.
summary: "One sentence description."   # Required. Used for OG meta description. Max 160 chars.
published: true                        # Required. false = draft, excluded from all lists.
featured: false                        # Optional. true = shown on homepage. Max 5–6 featured.
---
```

**Common frontmatter errors:**
- `date: 2024-03-15` (unquoted) — YAML parses as a date object, not a string. Always quote it.
- `summary:` missing — `generateMetadata` will return an empty description
- `published:` missing — TypeScript will infer `undefined`, filter may behave unexpectedly

---

## 8. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` zero errors
- [ ] All 6 post slugs in `/out/blog/` (one directory per post)
- [ ] Unpublished post NOT in `/out/blog/`
- [ ] No font files in Network tab (only system fonts)
- [ ] Dark mode: no flash on reload in system-dark preference
- [ ] ThemeToggle: "[Dark]" ↔ "[Light]" toggles correctly
- [ ] Blog list: no dates visible to the reader
- [ ] All links use `linkClass` underline treatment
- [ ] Nav links use colour treatment (not underline) — intentionally different
- [ ] Every external link: `target="_blank" rel="noopener noreferrer"`
- [ ] SkipNav visible on Tab press; jumps to `#main`
- [ ] One `<h1>` per page
- [ ] OG tags present in `<head>` source for homepage and each blog post
- [ ] Lighthouse performance ≥ 95 on homepage
- [ ] Lighthouse accessibility ≥ 95 on all pages
