---
prompt_id: pcpp11
sub_category: Portfolio
sub_type: Journalist & Author Portfolio
title: AuthorialInsight — Literary Reportage & Investigative Authority
reference_patterns: book_centric_heros, prestige_award_strips, publication_logo_grids
inspiration: snigdhapoonam.com
quality_score:
status: draft
notes: Focused on a "Professional-Academic" aesthetic that balances long-form reporting with global authorial prestige.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in journalist-author portfolios, literary publications, and intellectual brand identity. You understand that for elite investigative reporters, the website is a proof-of-work archive and a beacon of authority. You master the "Editorial UI," where the gravity of a book launch and the urgency of a news link coexist in a balanced, minimalist grid. You reject "flashy" or "over-designed" templates in favor of the "Author" philosophy: expansive white space, sophisticated serif typography, and a focus on social proof (awards, grants, fellowships). You design for "Authorial Impact," ensuring that every scroll establishes deeper credibility and intellectual weight.

---

### Section 2 — Application Overview

This is a premium digital portfolio for a world-renowned investigative journalist and award-winning author. The audience consists of commissioning editors, literary agents, conference organizers, and fans of deep-dive narrative reportage. The goal is to archive a body of work that spans international publications (NYT, The Guardian, Granta) while highlighting the author's books (e.g., Dreamers, Scamlands) as the visual centerpieces.

The application covers: Book-First Landing Page, Publication Logo Strips, Categorized Article Archives, Awards & Recognitions Wall, and a Professional Inquiry Section.

---

### Section 3 — Brand Voice & Mood

The mood is "Literary & Professional" and "Intellectually Gritty." It feels like a high-end broadsheet or a prestigious academic journal. It is clean, authoritative, and unhurried.

Copy is minimalist and factual. Headers focus on "The Work" and "The Accolades." It avoids marketing "fluff" in favor of prestigious associations: "MacDowell Fellow," "PEN America Finalist," "The Guardian Contributor."

Vibe word: Authority.

---

### Section 4 — Core Features & Functionality

1. **Book-Centric Hero Section** — A high-impact opening that showcases the latest book cover alongside critical acclaim (e.g., "Best Books of the Year - FT").
2. **Prestige Logo Strip** — A horizontal row of monochrome logos from global publications to establish immediate "Journalistic Trust."
3. **Categorized Article Portfolio** — A filterable grid or list that organizes years of reporting by theme (e.g., Politics, Youth, Technology) or Publication.
4. **Awards & Recognition Wall** — A dedicated section for literary awards, grants, and fellowships, using clean typography to handle multiple titles.
5. **"About the Author" Narrative** — A sophisticated bio page that blends personal mission with professional credentials and high-end portraiture.

---

### Section 5 — Design Specifications

**Visual style:** Professional Minimalism. High-contrast (Black/White), generous whitespace, and a grid-based content structure that allows colorful book covers to be the main visual anchor.

**Color mode:** Primarily Light Mode (Academic White).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F7F7F7` (Soft Light Grey)
- Border: `#D1D1D1` (Muted Grey lines)
- Text Primary: `#111111` (Near Black)
- Text Secondary: `#555555` (Slate Grey)
- Accent: `#111111` (Black structural accents)

**Typography:** Sophisticated Serif-Sans Pairing.
- Display Headings (Serif): `clamp(28px, 4vw, 42px)`, weight 600 (e.g., Caslon, Georgia, or Playfair).
- Body/UI (Sans): `16px`, weight 400, leading 1.6 (e.g., Inter or Public Sans).
- Meta Labels: `11px`, bold, all-caps, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `100px` to `120px` (Generous editorial space).
- Grid Gaps: `24px` to `48px`.
- Container Max-width: `1000px` (Constrained for focus).

**Border radius:** `0px` or `2px` (Subtle). Sharp corners reflect "Technical Precision."

**Responsive:** Mobile-first approach. Article grids collapse into a clean, scannable vertical list on small screens.

**Accessibility:** WCAG AA. High-contrast text on white. All external article links must include `aria-label` for the publication name.

**Motion:** 
- Subtle Entrances: `opacity 0 -> 1` and `y: 10 -> 0` over `300ms` on scroll.
- Hover Effects: Subtle underline or color-shift on article titles.
- No aggressive transitions.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimalist. Logo (Left). Right: Books, Portfolio, Awards, About, Contact.
2. **Hero (Identity/Book):** High-end Portrait or Latest Book Cover + H1 Name/Title + "Selected by FT/Economist" badge.
3. **Publication Strip:** Monochrome logos (NYT, Guardian, Caravan, NYR).
4. **Books Section:** Large covers with "Buy Now" links and brief synopses.
5. **Latest Reporting:** Grid of 3-4 recent articles with Publication, Title, and Excerpt.

**Portfolio Page Layout:**
- **Sidebar (Optional):** Filter by Category (Youth, Tech, Politics) or Publication.
- **Main:** Vertical list of articles. Each: [Date] [Publication] [Title - Bold] [Excerpt].

**Awards Section:**
- Simple, high-readability list or grid. Each entry: Year -> Award Name -> Institution.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **CMS:** Sanity.io or Contentlayer (to handle thousands of evergreen, tagged articles).
- **Media:** Next.js `<Image>` with `priority` for heros and book covers.
- **State:** Zustand for simple filtering and search state.

---

### Section 8 — Implementation Steps

1. **The Editorial Shell:** Setup `globals.css` with the Serif-Sans palette and constrained container widths.
2. **Book Showcase:** Build the high-impact hero component with region-specific "Buy" link logic.
3. **Prestige Engine:** Implement the logo strip and the awards/recognitions layout.
4. **Portfolio Grid:** Build the filterable article list component with metadata-first hierarchy.
5. **About/Inquiry:** Create the sophisticated bio layout and the minimalist contact form.

---

### Section 9 — User Experience

The user is an "Intellectual Professional." 
The UI must be "Efficient and Authoritative." Every element should save the user time while proving the author's credibility.
The "Aha! moment" is the Publication Strip—where the user realizes the author has been vetted by the world's most prestigious institutions.

---

### Section 10 — Constraints

- **No advertisements.** ad-free is mandatory for authorial trust.
- **No pure black backgrounds.** Use white to maintain the "Editorial Paper" feel.
- **No infinite scroll.** Use pagination or a "View More" button to encourage intentional browsing.
- **No generic stock photography.** Use original author portraits or book cover art only.

---

## Platform Versions

### Category A — v0

Build a "Journalist-Author" portfolio inspired by Snigdha Poonam. 
Style: Pure White background (#FFFFFF), Near Black typography (#111111), 2px border-radius, and elegant Serif headings.
Include:
1. Book-First Hero section showcasing a cover and "Best of Year" endorsements.
2. Prestige Publication Strip featuring monochrome logos of global outlets (NYT, Guardian).
3. Categorized Article Portfolio with a metadata-first list view.
Use editorial photography and a "Professional-Academic" UI approach. Use minimalist Sans-serif for body text.

---

### Category B — Cursor

In `src/app/`, implement a "Literary Reportage Portfolio" (Snigdha Poonam style).
Stack: Next.js 14, Tailwind, Sanity CMS.
Visual Rules: 
- Primary Color: `#111111` (Text)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-sm` (2px)
- Font: Elegant Serif (Playfair) + Sans (Inter).

Implement:
1. `app/page.tsx` - A landing page with a book-centric hero and a prestige award wall.
2. `app/portfolio/page.tsx` - A filterable article list organized by "Subject" and "Publication."
3. `components/ui/PrestigeStrip.tsx` - A horizontal row of grayscale logos with subtle hover opacity.
4. `components/books/BookCard.tsx` - A component for book covers with regional purchase logic and synopsis.

Focus on "Authorial Authority" and clean information hierarchy. No colorful UI. No modern blurs.

---

### Lovable

Build a journalist-author portfolio — "Authorial Authority" — for a world-renowned investigative journalist. White (#FFFFFF) canvas, near-black (#111111) text, 0px/2px border-radius, professional-academic aesthetic.

Must include:
- Book-centric hero: book cover `<img alt>` (prominent, large) + H1 author name `clamp(28px, 4vw, 42px)` weight 600 serif + "Best Books of the Year" endorsement badge text + "Buy Now" `<a href rel="noopener noreferrer">` regional links (India / UK / US).
- Prestige publication strip: horizontal row of monochrome logos (NYT, Guardian, Caravan, Granta, NYR). `filter: grayscale(1)`. `aria-label` per logo.
- Article portfolio `/portfolio`: `aria-pressed` filter buttons for Category (Politics, Youth, Technology) and Publication. Vertical list: `11px` date + publication → bold serif title → `16px` excerpt → external `<a rel="noopener noreferrer" aria-label>` link.
- Awards wall: typography-only list. Year → Award Name → Institution. No icons, no images.
- About page: narrative bio text, portrait `<img alt>`, credentials as plain text.

`prefers-reduced-motion`: `opacity` entrance animations disabled, all items visible immediately.

---

### ChatGPT Canvas

Let's build a journalist-author portfolio — "Authorial Authority" — inspired by Snigdha Poonam.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F7F7F7`; Text: `#111111`; Muted: `#555555`; Border: `#D1D1D1`
- Border-radius: `2px` cards; `0px` text/layout blocks
- Font: Caslon/Georgia serif — display `clamp(28px, 4vw, 42px)` weight 600; body `16px` Inter weight 400 leading 1.6; meta labels `11px` bold uppercase `letter-spacing: 0.1em`

**Build iteratively:**
1. **Homepage** — book-centric hero (cover image + author name H1 + endorsement badge + regional Buy Now links) + prestige publication logo strip (`filter: grayscale(1)`) + 3-4 latest articles grid
2. **Portfolio page** `/portfolio` — `aria-pressed` filter tabs by Category/Publication + vertical article list `[Date] [Publication] [Title bold] [Excerpt]` + external `<a rel="noopener noreferrer" aria-label>` links
3. **Awards page** `/awards` — clean typography list: Year → Award → Institution. No icons.
4. **About page** — portrait `<img alt>`, narrative bio, credentials as text

Motion: `opacity 0→1 300ms ease-out` + `y: 10→0` on scroll entry. `prefers-reduced-motion`: all visible immediately.

---

### Bolt

Scaffold a journalist-author portfolio — authoritative, editorial, serif-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #F7F7F7;
  --ink: #111111; --muted: #555555; --border: #D1D1D1;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `BookHero` — book cover `<img alt>` + H1 serif `clamp(28px, 4vw, 42px)` 600 + endorsement badge text + regional Buy Now `<a rel="noopener noreferrer">` links. `max-width: 1000px`.
- `PrestigeStrip` — horizontal logo row, `filter: grayscale(1)`, `opacity 0.6→1` on hover, `aria-label` per logo.
- `ArticleList` — vertical stack. Each: `11px` meta (date + publication) → bold serif title → `16px` excerpt → external `<a rel="noopener noreferrer" aria-label>` link.
- `AwardsGrid` — typography-only list. Year → Award → Institution. No icons, no images.
- `ArticleFilter` — `aria-pressed` filter buttons for Category/Publication. `AnimatePresence` list transition. `useReducedMotion()` guard.

---

### Claude Artifacts

Build a self-contained journalist-author portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type ArticleCategory = 'politics' | 'youth' | 'technology' | 'culture' | 'economy'

export interface Book {
  id: string; title: string; year: number
  coverSrc: string; coverAlt: string; synopsis: string
  buyLinks: { region: string; url: string }[]
}

export interface Article {
  id: string; title: string; publication: string
  date: string       // ISO 8601
  category: ArticleCategory; excerpt: string
  externalUrl: string; published: boolean
}

export interface Award {
  year: number; name: string; institution: string
}
```

Design rules:
- `border-radius: 0` on layout sections; `2px` on card elements only
- All external article links: `<a href={article.externalUrl} rel="noopener noreferrer" aria-label={`Read ${article.title} on ${article.publication}`}>`
- `PrestigeStrip` logos: `filter: grayscale(1)` — always monochrome, never override in components
- `getArticlesByCategory()` returns `Map<ArticleCategory, Article[]>`

---

### Grok

Implement AuthorialInsight — journalist-author portfolio.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F7F7F7; --ink: #111111; --muted: #555555; --border: #D1D1D1` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `ArticleCategory` union (politics|youth|technology|culture|economy) — `Book` interface (id, title, year, coverSrc, coverAlt, synopsis, buyLinks: `{region: string; url: string}[]`) — `Article` interface (id, title, publication, date, category, excerpt, externalUrl, published) — `Award` interface (year, name, institution)
3. `src/lib/books.ts` — 3 mock `Book` objects with regional buy links; `src/lib/articles.ts` — 20 mock `Article` objects across 5 categories; `src/lib/awards.ts` — 10 mock `Award` objects
4. `src/app/page.tsx` — BookHero (cover + name + endorsement + regional Buy links) + PrestigeStrip (`filter: grayscale(1)`, `aria-label`) + 3-4 latest articles
5. `src/app/portfolio/page.tsx` — `ArticleFilter` (`aria-pressed`) + vertical article list `[Date] [Publication] [Title bold] [Excerpt]` + external `<a rel="noopener noreferrer" aria-label>` links
6. `src/components/ui/AwardsGrid.tsx` — typography-only list, Year → Award → Institution, no icons
7. `src/app/about/page.tsx` — narrative bio text + portrait `<img alt>` + credentials as plain text
8. QA: `grep -r "grayscale(0)\|filter.*color" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a journalist-author portfolio — "Authorial Authority" — for a world-renowned investigative journalist.

**Design layer:** `#FFFFFF` background, `#F7F7F7` surface, `#111111` text, `#555555` muted, `#D1D1D1` borders. Typography: Caslon/Georgia serif — display `clamp(28px, 4vw, 42px)` weight 600; body `16px` Inter weight 400 leading 1.6; meta `11px` bold uppercase `letter-spacing: 0.1em`. `border-radius: 2px` cards, `0px` layout sections.

**Data layer:** `ArticleCategory` union (5 values). `Book` interface (title, year, coverSrc, synopsis, buyLinks array). `Article` interface (title, publication, date, category, excerpt, externalUrl). `Award` interface (year, name, institution). `getArticlesByCategory()` returns `Map<ArticleCategory, Article[]>`.

**Component layer:** `BookHero` (book cover + name H1 + endorsement + regional Buy links). `PrestigeStrip` (horizontal monochrome logo row, `filter: grayscale(1)`, `aria-label`). `ArticleList` (vertical metadata-first list, external `<a rel="noopener noreferrer" aria-label>`). `AwardsGrid` (typography-only Year → Award → Institution). `ArticleFilter` (`aria-pressed` buttons, `AnimatePresence` transition).

**Motion layer:** Items: `opacity 0→1 300ms ease-out` + `y: 10→0` on scroll entry. `prefers-reduced-motion`: all visible immediately; `useReducedMotion()` guard on all Framer Motion components.
