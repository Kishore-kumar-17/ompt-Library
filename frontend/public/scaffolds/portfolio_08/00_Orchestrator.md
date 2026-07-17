# 00 — Orchestrator
## Self-Taught Developer Blog + Portfolio · portfolio_platform_08

---

## Site Context

**Reference:** taniarascia.com
**Type:** Developer blog + portfolio — content-first digital garden
**Content focus:** JavaScript, CSS, React, Node.js, tooling, career advice
**Audience:** Developers who learn by reading; people who found the author through Google or a shared article

---

## What Makes This Site Distinctive

1. **Warm beige light-mode background** — `hsl(40deg 33% 97%)`. Not white. Not cool gray. This single decision separates the site visually from every generic developer blog. The warmth signals "personal" not "corporate."

2. **Solarized pink accent** — Two values: `hsl(332deg 61% 41%)` in light mode (dark enough for contrast on beige), `hsl(332deg 100% 76%)` in dark mode (bright enough to pop). One hue, two saturation/lightness values. Used only for hover states, active nav, and tags — never as a background fill.

3. **Year-grouped blog archive** — 100+ articles organized into `<details>/<summary>` accordions by year. The current year is open; prior years collapsed. A reader can see the full publishing history at a glance. This signals: this person has been writing for years, consistently.

4. **Two content types** — Articles (long tutorials) and Notes (shorter, more personal). Separate pages but identical archive layout. Notes feel like a public notebook.

5. **Text-only project cards** — No images, no screenshots. Year label (monospace, top-left), title, one-line description, action links (Article / Demo / Source). The restraint is the design choice. The writing explains the projects.

6. **"Outfit" heading font** — Rounded, friendly, slightly informal. Paired with system sans for body text. The combination reads as approachable and professional without being corporate.

7. **Philosophy-first About page** — "No ads. No AI-generated content. No affiliate links. No tracking." This is a design statement as much as a values statement. "What I'm Doing Now" section is dated and updated regularly — it signals the site is alive.

8. **Light mode default** — Unlike portfolio_07 (JWC), dark mode is the **override**, not the default. `:root` defines light values. `[data-theme="dark"]` overrides. The inline script still prevents flash, but the fallback is light.

---

## Critical Design Constraints

| Constraint | Rule |
|-----------|------|
| Light mode default | `:root` = light. `[data-theme="dark"]` = dark override. Opposite of portfolio_07. |
| Background in light mode | `hsl(40deg 33% 97%)` — beige. Never `hsl(0deg 0% 100%)` (pure white). |
| Dark mode | Inline `<script>` in `<head>` — NOT next-themes. Same approach as portfolio_07 but different default. |
| Accent colors | Two different HSL values for the same hue — different in light vs dark. No single hex value. |
| Blog list layout | Year-grouped `<details>` accordions. Never a card grid. Current year open, rest collapsed. |
| Project cards | Text only. No images. Year label (monospace) top-left. |
| Font | 'Outfit' for headings (Google Fonts). System sans for body. |
| Tags | Flat string array on each post. Multiple tags per post allowed. No enum — tags are arbitrary strings. |
| Two post types | `type: 'article' | 'note'`. Articles and Notes are on separate pages but use the same archive pattern. |
| About page | Must include philosophy statement. "What I'm Doing Now" section with a dated update. |

---

## Color System

```css
/* Light mode — default */
:root {
  --color-bg:          hsl(40deg 33% 97%);    /* warm beige */
  --color-bg-card:     hsl(40deg 25% 93%);
  --color-bg-elevated: hsl(40deg 20% 89%);
  --color-text:        hsl(210deg 12% 16%);
  --color-text-muted:  hsl(210deg  8% 50%);
  --color-border:      hsl(40deg  15% 83%);
  --color-accent:      hsl(332deg  61% 41%);  /* Solarized magenta — readable on beige */
  --color-accent-bg:   hsl(332deg  61% 41% / 0.08);
}

/* Dark mode override */
[data-theme="dark"] {
  --color-bg:          hsl(210deg 12% 13%);
  --color-bg-card:     hsl(210deg 12% 18%);
  --color-bg-elevated: hsl(210deg 12% 23%);
  --color-text:        hsl(40deg  20% 90%);
  --color-text-muted:  hsl(210deg  8% 58%);
  --color-border:      hsl(210deg 12% 26%);
  --color-accent:      hsl(332deg 100% 76%);  /* bright pink — visible on dark */
  --color-accent-bg:   hsl(332deg 100% 76% / 0.08);
}
```

---

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router | Static generation of blog + topic routes |
| Language | TypeScript strict | Typed Post + Project schema |
| Styling | CSS Modules + CSS custom properties | Token system without Tailwind |
| Content | MDX via next-mdx-remote | Allows code blocks, custom components in posts |
| Frontmatter | gray-matter | Simple, standard |
| Dark mode | Inline script + data-theme | No-flash; light mode default |
| Fonts | Outfit (Google Fonts) + system | Outfit for headings only; no layout shift for body |
| Deployment | Vercel static export | |

---

## Site Map

```
/                     — Homepage: intro, recent articles, featured projects
/blog                 — Year-grouped article archive (articles only)
/blog/[slug]          — Individual article page
/notes                — Year-grouped notes archive (notes only)
/notes/[slug]         — Individual note page
/projects             — Project grid (text-only cards)
/me                   — About page
/topics               — Tag index
/topics/[tag]         — Posts filtered by tag
```

---

## How This Differs from Other Portfolios in This Set

| Feature | portfolio_07 (JWC) | portfolio_08 (Tania) |
|---------|-------------------|---------------------|
| Default mode | Dark | Light |
| BG color system | HSL saturated palette | HSL warm beige + cool dark |
| Accent | Blue + pink gradient | Single pink, two HSL values |
| Post types | One (blog) | Two (article + note) |
| Post list layout | Vertical card list with abstracts | Year-grouped text list, title only |
| Category system | 8 categories, enum | Flat tags, string array |
| Heading font | System sans / Wotfard | Outfit (Google Fonts) |
| Project section | None | Text-only cards with year label |
| About page | Persona description | Philosophy statement + "Now" |
| Post content in list | Title + abstract + date | Title + date only |
