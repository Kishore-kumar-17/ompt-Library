# 07 — Developer Guide
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

Reference while building. The system's identity lives in its warmth and its restraint.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| Beige background in light mode — `hsl(40deg 33% 97%)` | Not white. Not cool gray. The warmth is the identity signal. This single value separates the site from every generic developer blog. |
| Light mode is `:root` default — NOT dark | Opposite of portfolio_07. Dark mode is the override (`[data-theme="dark"]`). The fallback color in the inline script catch block must be `'light'`. |
| Accent is two different HSL values | `hsl(332deg 61% 41%)` in light (dark enough for contrast on beige) and `hsl(332deg 100% 76%)` in dark (bright enough to pop). One hue, two lightness levels. Never one hardcoded value used in both. |
| Blog list = year-grouped `<details>` — no card grid | Cards would make this look like a magazine. The `<details>` archive signals: long publishing history, developer's notebook. |
| Project cards = text only, no images | The writing explains the projects. Images would suggest visual design work that isn't the brand. |
| URL is `/me` not `/about` | Personality choice. `/about` is corporate. `/me` is personal. |
| Tags as `string[]` — not an enum | Authors define tags freely in frontmatter. A fixed enum prevents the organic tag vocabulary that comes from years of writing. |
| Articles and notes in separate directories | `getPostBySlug` needs to know which directory to search. Mixing them requires reading all files and filtering — slower and error-prone. |

---

## 2. The Beige Background — Why It Works

Most developer sites use either white (`hsl(0deg 0% 100%)`) or a near-black dark background. Beige (`hsl(40deg 33% 97%)`) reads as:

- **Warm** — like paper or a notebook. Content feels written, not output.
- **Personal** — not a product or a corporate site
- **Readable** — marginally lower contrast than pure white, which actually reduces eye strain for long reads

The "paper" feeling is appropriate for a site that is primarily a reading experience.

**Dark mode counterpart:** `hsl(210deg 12% 13%)` — blue-tinted dark gray. Not pure black (harsh) and not warm gray (clashes with the code syntax highlighting which is typically blue-shifted). The blue tint reads as "technical" and pairs well with the pink accent.

---

## 3. The Year-Grouped Archive — `<details>` vs JavaScript Accordion

The archive uses native HTML `<details>/<summary>` elements, not a JavaScript-powered accordion component. This is intentional:

```html
<!-- CORRECT — native HTML, no JS needed, keyboard accessible by default -->
<details open>
  <summary>2024 (12)</summary>
  <ul>...</ul>
</details>

<!-- WRONG — unnecessary complexity -->
<div className="accordion">
  <button onClick={() => setOpen(!open)}>2024 (12)</button>
  {open && <ul>...</ul>}
</div>
```

Benefits of native `<details>`:
- Keyboard accessible out of the box (Enter on focused summary toggles)
- No JavaScript state management
- Works without JavaScript (SSR renders correctly)
- Screen readers understand the disclosure pattern

**The `open` prop pitfall:**
```tsx
// WRONG — renders <details open=""> in HTML even when closed
<details open={false}>

// CORRECT — undefined removes the attribute entirely
<details open={isCurrentYear || undefined}>
```

In React, passing `open={false}` adds `open=""` to the DOM element, which the browser treats as open (any value on a boolean attribute makes it true). Use `|| undefined` to remove the attribute when it should be absent.

---

## 4. Two Separate Directories for Articles and Notes

```
src/content/
  articles/          ← type: 'article'
    javascript-closures.mdx
    react-hooks-guide.mdx
  notes/             ← type: 'note'
    learning-rust.mdx
```

`getPostBySlug(slug, type)` constructs the path as:
```typescript
const dir = type === 'article' ? 'articles' : 'notes'
const filepath = path.join(CONTENT_DIR, dir, `${slug}.mdx`)
```

**Why not a single directory with type in frontmatter?**

`/blog/[slug]` and `/notes/[slug]` are separate routes. When a reader navigates to `/blog/learning-rust`, we need to `notFound()` because that post is a note, not an article. If we read a single directory, we'd find the file, parse it, and then realize the type is wrong — returning a note on a blog route.

With separate directories, a missing file in `articles/` immediately means `notFound()` — no ambiguity.

---

## 5. The Two-Value Accent — Light vs Dark

```css
:root {
  --color-accent: hsl(332deg 61% 41%);   /* lightness 41% — readable on hsl(40,33%,97%) beige */
}

[data-theme="dark"] {
  --color-accent: hsl(332deg 100% 76%);  /* lightness 76% — visible on hsl(210,12%,13%) dark */
}
```

**WCAG contrast rationale:**
- Light mode: `hsl(332deg 61% 41%)` on `hsl(40deg 33% 97%)` → approx 5.8:1 ✓ (AA requires 4.5:1)
- Dark mode: `hsl(332deg 100% 76%)` on `hsl(210deg 12% 13%)` → approx 6.2:1 ✓

If you use the dark-mode accent value on the beige background:
- `hsl(332deg 100% 76%)` on `hsl(40deg 33% 97%)` → approx 1.9:1 ✗ (fails AA — too light)

If you use the light-mode accent value on the dark background:
- `hsl(332deg 61% 41%)` on `hsl(210deg 12% 13%)` → approx 2.1:1 ✗ (fails AA — too dark)

This is why two values are required. A single accent hex/HSL cannot satisfy contrast requirements in both modes.

---

## 6. Tags vs Categories — What Changes

| Feature | Categories (portfolio_07 JWC) | Tags (portfolio_08 Tania) |
|---------|-------------------------------|--------------------------|
| Type | `Category` enum (8 fixed values) | `string[]` (arbitrary, multiple) |
| Colors | `CATEGORY_COLORS: Record<Category, string>` | Single accent color for all tags |
| Filtering | Active pill with category HSL background | Tag index page + filtered lists |
| Per-post | One category | Multiple tags |
| New values | Requires code change (add to enum) | Just write the tag in frontmatter |
| URL pattern | None (filter is client-side) | `/topics/[tag]` (static pages) |

The tag system generates more pages at build time but is more flexible for long-term use.

---

## 7. `getAllTags()` — Deduplication Pattern

```typescript
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tagSet   = new Set<string>()
  allPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return [...tagSet].sort()
}
```

**Common mistake:** Using `Array.from(new Set(...))` vs `[...tagSet]`. Both work. The spread syntax is marginally cleaner.

**Case sensitivity:** Tags are not normalized. `'JavaScript'` and `'javascript'` would be treated as different tags. This is a feature — authors should be consistent in their frontmatter. Adding normalization (`.toLowerCase()`) is acceptable if the team wants it.

**Empty tags:** A post with `tags: []` contributes no tags. `tags: ['']` would contribute an empty-string tag. Add a filter if needed: `allPosts.forEach((p) => p.tags.filter(Boolean).forEach(...))`.

---

## 8. `getPostsByYear` — Map vs Object

```typescript
// Returns Map<number, Post[]>
export function getPostsByYear(posts: Post[]): Map<number, Post[]> {
  const map = new Map<number, Post[]>()
  for (const post of posts) {
    const year = new Date(post.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(post)
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]))
}
```

**Why `Map` not a plain object?**
- `Map` guarantees insertion order — after sorting by year descending, iteration order is preserved
- `Object` keys are sorted numerically for integer keys — this would work, but it's implicit behavior
- `Map` makes the year-descending sort explicit and readable

**In the component:**
```tsx
const byYear    = getPostsByYear(articles)
const yearKeys  = [...byYear.keys()]            // [2024, 2023, 2022]
const thisYear  = new Date().getFullYear()

{yearKeys.map((year) => (
  <YearGroup
    key={year}
    year={year}
    posts={byYear.get(year)!}
    isCurrentYear={year === thisYear}
    basePath="/blog"
  />
))}
```

---

## 9. About Page — The Philosophy Block

The philosophy statement is the most distinctive element of the About page. It must be visually distinct from body text — not just a paragraph.

```css
/* CORRECT — distinct visual treatment */
.philosophy {
  background: var(--color-bg-card);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 1rem 1.25rem;
  margin-bottom: 2.5rem;
}

/* WRONG — looks like regular body text */
<p>No ads. No AI-generated content...</p>
```

The left-border treatment echoes the blockquote style, signaling: this is a statement, not narrative prose. The accent color left border ties it to the site's identity color.

**Exact text to include:**
```
No ads. No AI-generated content. No affiliate links. No tracking.
```

This text is a values statement that distinguishes the site from commercial developer content. It answers the reader's implicit question: "Why should I trust this content?"

---

## 10. Common Mistakes

### Mistake 1: White background instead of beige

```css
/* WRONG */
:root { --color-bg: hsl(0deg 0% 100%); }

/* CORRECT */
:root { --color-bg: hsl(40deg 33% 97%); }
```

The extra hue and saturation on the beige value is what makes it warm. `hsl(0deg 0% 97%)` is cool gray, not beige.

### Mistake 2: Single accent value for both modes

```css
/* WRONG — too light for beige bg in light mode */
:root           { --color-accent: hsl(332deg 100% 76%); }
[data-theme="dark"] { --color-accent: hsl(332deg 100% 76%); }

/* CORRECT */
:root               { --color-accent: hsl(332deg  61% 41%); }
[data-theme="dark"] { --color-accent: hsl(332deg 100% 76%); }
```

### Mistake 3: `open={false}` on `<details>`

```tsx
// WRONG — renders open="" in HTML, browser treats as open
<details open={false}>

// CORRECT — undefined removes the attribute
<details open={isCurrentYear || undefined}>
```

### Mistake 4: Route `/about` instead of `/me`

```bash
# WRONG
src/app/about/page.tsx

# CORRECT
src/app/me/page.tsx
```

### Mistake 5: Notes appearing in the blog archive

```typescript
// WRONG — returns both articles and notes on /blog
const posts = getAllPosts()

// CORRECT
const articles = getAllArticles()  // type: 'article' only
```

### Mistake 6: Articles appearing in `/topics/[tag]` but not notes

```typescript
// WRONG — only articles
const posts = getPostsByTag(tag).filter(p => p.type === 'article')

// CORRECT — topics page shows both articles and notes
const posts = getPostsByTag(tag)
```

### Mistake 7: Images on project cards

```tsx
// WRONG
<img src={project.image} alt={project.title} />

// CORRECT — no image field on the Project interface at all
// If you added one: delete it from the interface
```

### Mistake 8: Tag links in post header not going to topics page

```tsx
// WRONG — tag has no link
<span className={styles.tag}>{tag}</span>

// CORRECT
<a href={`/topics/${tag}`} className={styles.tag}>{tag}</a>
```

### Mistake 9: `getPostsByYear` receiving `getAllPosts()` on the blog page

```typescript
// WRONG — mixes articles and notes on /blog
const allPosts = getAllPosts()
const byYear = getPostsByYear(allPosts)

// CORRECT — articles only on /blog
const articles = getAllArticles()
const byYear = getPostsByYear(articles)
```

### Mistake 10: Philosophy block as plain paragraph

```tsx
// WRONG — blends with body text
<p>No ads. No AI-generated content. No affiliate links. No tracking.</p>

// CORRECT — visually distinct block with accent left border
<div className={styles.philosophy}>
  <p>No ads. No AI-generated content. No affiliate links. No tracking.</p>
</div>
```

---

## 11. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; `/out/` populated with all routes
- [ ] First load (no localStorage): background is beige, not white, not dark
- [ ] Toggle to dark: background is `hsl(210deg 12% 13%)`
- [ ] Refresh in dark: stays dark (no beige flash)
- [ ] Toggle back to light: stays light on refresh
- [ ] `grep -r "#[0-9a-fA-F]" src/styles/` — zero results
- [ ] `/blog`: current year section expanded; past years collapsed
- [ ] `/blog`: clicking a past year section expands it
- [ ] `/notes`: shows notes only (not articles)
- [ ] `/blog`: shows articles only (not notes)
- [ ] `/topics`: all tags alphabetically with counts
- [ ] `/topics/javascript`: shows posts with "javascript" tag
- [ ] Tag links in post headers navigate to `/topics/[tag]`
- [ ] `/projects`: no images on any card
- [ ] `/projects`: action links only rendered if defined on the project
- [ ] `/me`: route is `/me` not `/about`
- [ ] `/me`: philosophy block present with accent left border
- [ ] `/me`: "What I'm Doing Now" section has a dated update
- [ ] One `<h1>` per page (check homepage, /blog, /notes, /projects, /me)
- [ ] ThemeToggle has `aria-label`
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
