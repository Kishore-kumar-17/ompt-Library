---
prompt_id: pcpp16
sub_category: Portfolio
sub_type: Personal Site + Newsletter + Courses
title: BuilderGarden — Digital Library & Educational Product Hub
reference_patterns: digital_garden_archive, course_upsell_logic, vibe_coding_aesthetic
inspiration: nateliason.com
quality_score:
status: draft
notes: Focused on high-performance personal branding that integrates long-form notes with premium AI-era education.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in modern "Digital Garden" architectures, educational course platforms, and AI-era creator brand identities. You understand that for modern polymaths, the website is a "Second Brain" turned into a business. You master the "Vibe Coding UI," where minimalist templates are combined with high-utility components like book-note archives and course-registration flows. You reject "corporate" clutter in favor of the "Builder" philosophy: high-readability serif text, fast-loading search indices, and clear "Start Here" pathways. You design for "Intellectual Velocity," ensuring that the path from a raw book note to a $500 AI-assisted building course is seamless, professional, and value-dense.

---

### Section 2 — Application Overview

This is a premium digital hub for a modern creator-entrepreneur. The audience consists of developers, startup founders, and lifelong learners interested in AI, philosophy, and productivity. The goal is to provide a "Knowledge Oasis" that archives hundreds of book notes and articles while serving as the primary storefront for a multi-tier educational business.

The application covers: Article & Note Feed (Search-centric), Comprehensive Book Notes Archive (250+ entries), Course Landing Pages (AI-Building, Roam), Member Portal (Builder Methods Pro), and the "Monday Medley" Newsletter Gateway.

---

### Section 3 — Brand Voice & Mood

The mood is "Technically Savvy & Intellectually Curious." It feels like a high-end designer’s private library or a tech founder’s personal research lab. It is bright, airy, and focused on "Building."

Copy is direct, transparent, and instructional. Headers are clear and curiosity-driven: "Nat’s Notes," "Build Your Own Apps with AI," "Vibe Coding the Future." It avoids marketing hype in favor of "Evidence of Work" and "Show-Don’t-Tell" technical authority.

Vibe word: Prolific.

---

### Section 4 — Core Features & Functionality

1. **The "Digital Garden" Index** — A robust, high-speed search and filter interface for 500+ articles and book notes, categorized by genre (Business, Bio-hacking, Philosophy).
2. **Modular Course Preview Suite** — A system of custom landing pages that use "vibe-coding" components to showcase curriculum, video testimonials, and live workshop dates.
3. **Structured Book Notes ("Nat's Notes")** — A specialized template for book summaries featuring "Top 3 Takeaways," "Detailed Highlights," and Amazon affiliate integration.
4. **Member-Only "Pro" Training Wall** — A secure membership area (Builder Methods Pro) with integrated video training, weekly workshop calendars, and community links.
5. **Newsletter "Medley" Gateway** — A high-conversion email capture hub designed as a "value-first" landing page with social proof (e.g., "Join 50k+ readers").

---

### Section 5 — Design Specifications

**Visual style:** Minimalist Builder. "Content-over-Chrome" priority. Stark white surfaces, precise geometric lines, and a layout that allows the user's "Digital Garden" to provide the texture.

**Color mode:** Primarily Light Mode (Modern Library).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Text Primary: `#111827` (Deep Slate / Ink)
- Text Secondary: `#6B7280` (Cool Grey for labels)
- Accent: `#000000` (Minimalist Black for buttons/CTAs)
- Code/Data Highlight: `#F3F4F6` (Lightest Grey for blocks)

**Typography:** Professional Editorial Pairings.
- Reading Body (Serif): `18px` to `20px`, weight 400, leading 1.7 (e.g., Tiempos or Merriweather).
- UI/Navigation (Sans): `14px`, weight 500, tight tracking (e.g., Inter or Public Sans).
- Code blocks: `14px`, Monospace (JetBrains Mono) for technical snippets.

**Spacing:** 12px base unit. 
- Column Gaps: `32px` to `64px`.
- Section Padding: `100px` vertical.
- Container Width: `max-width: 900px` (Optimized for both reading and course browsing).

**Border radius:** `4px` (Crisp, technical rounding) or `0px`.

**Responsive:** Mobile-first approach. Horizontal scrollers for "Latest status" or "Featured courses." Book notes use sticky table-of-contents on tablet/desktop.

**Accessibility:** WCAG AA. High-contrast typography. All code snippets must have accessible "Copy to clipboard" actions.

**Motion:** 
- Instant Page Swapping: No heavy fades.
- Slide-up panels: For course detail previews.
- Reveal animations: Subtle staggering for the grid items in the "Digital Garden."

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimal Top-bar. Logo (Left). Right: Articles, Book Notes, Courses, Newsletter, About.
2. **Hero:** Personal portrait + H1: "Thinking out loud. Building in public." -> Newsletter signup block.
3. **Featured Garden:** 2x2 grid of latest articles and book notes.
4. **Course Strip:** Large-scale card for "Builder Methods" with a "Launch your app in 6 weeks" CTA.

**Book Notes Page Layout:**
- **Header:** Book Cover (Left) -> Title/Author (Right) -> My Rating (X/10).
- **Executive Summary:** "Top 3 Lessons" in a grey-bordered box.
- **Body:** Chronological highlights with bold headers.

**Course Dashboard:**
- Sidebar: "Curriculum," "Resources," "Community."
- Main: Video Player -> Lesson Text -> "Mark as Complete" button.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **CMS:** Sanity.io or Contentlayer (to handle thousands of evergreen notes).
- **Search:** Algolia for high-speed indexing of the 500+ note archive.
- **State:** Zustand for managing course progress and library filters.
- **Payments:** Stripe (Customer Portal for recurring Builder Pro membership).

---

### Section 8 — Implementation Steps

1. **The Garden Shell:** Setup `globals.css` with the Tiempos/Inter pairing and high-contrast palette.
2. **Note/Article Engine:** Build the dynamic routing for `/notes` and `/articles` using a shared CMS schema.
3. **Search Indexing:** Implement the Algolia search bar for the 250+ entry book note archive.
4. **Course Platform:** Build the lesson delivery UI with video player and curriculum navigation.
5. **Membership Gate:** Integrate Stripe and NextAuth for the "Builder Methods Pro" subscription wall.

---

### Section 9 — User Experience

The user is an "Aggressive Learner." 
The UI must be "Efficient and Reliable." Don't waste their time with visual fluff—give them the "Top 3 Takeaways" immediately.
The "Aha! moment" is the Book Notes archive—where the user realizes they can "download" a decade of reading in 30 minutes of browsing.

---

### Section 10 — Constraints

- **No generic stock photography.** Use original book covers or high-end office/studio shots.
- **No pure black backgrounds.** Use white to maintain the "Digital Garden" library feel.
- **No advertisements.** Monetization is strictly via Newsletter, Courses, and Affiliates.
- **No slow-loading scripts.** Site must score 95+ on Lighthouse Performance.

---

## Platform Versions

### Category A — v0

Build a "Digital Garden & Course Platform" inspired by Nat Eliason. 
Style: Pure White background (#FFFFFF), Near Black typography (#111827), 4px border-radius, and Serif/Sans font pairings (Tiempos/Inter).
Include:
1. "Digital Garden" Searchable Archive for browsing hundreds of articles and book notes.
2. Book Note Template with "Top 3 Takeaways" summary blocks and rating systems.
3. Course Landing Page for "AI-Building" with curriculum grids and video testimonial placeholders.
Use high-readability typography and a "Builder-First" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Creator Hub & Educational Archive" (Nat Eliason style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Stripe.
Visual Rules: 
- Primary Color: `#111827` (Ink)
- Background: `#FFFFFF` (Paper)
- Radius: `rounded-sm` (4px)
- Font: Serif body (Merriweather) + Sans headings (Inter).

Implement:
1. `app/notes/page.tsx` - A high-speed searchable index of 250+ book notes with category filters.
2. `app/notes/[slug]/page.tsx` - A detailed book note layout with a "Top 3 Lessons" executive summary block.
3. `app/courses/page.tsx` - A storefront for premium courses using "vibe-coding" inspired modular cards.
4. `components/membership/ProPortal.tsx` - A secure dashboard for "Builder Methods Pro" members to access exclusive training.

Focus on "Intellectual Velocity" and fast-loading content density. No modern gradients or blurs. No ads.

---

### Lovable

Build a digital garden and course platform — "Intellectual Velocity" — for a modern creator-entrepreneur. White (#FFFFFF) canvas, deep slate (#111827) text, 4px border-radius, minimal builder aesthetic.

Must include:
- Homepage: portrait `<img alt>` + H1 "Thinking out loud. Building in public." + newsletter email `<input type="email" required>` + black Subscribe button + `role="status"` success state.
- Digital garden `/notes`: `<input type="search">` Algolia-powered. Category filter `aria-pressed` pills for Business, Biohacking, Philosophy, AI. Note card grid: title + category tag + date.
- Book note page `/notes/[slug]`: book cover `<img alt>` + author + rating (X/10) → "Top 3 Takeaways" grey-bordered `border: 1px solid #E5E7EB` box → `18px` leading 1.7 serif body highlights.
- Course landing `/courses/[slug]`: curriculum module list → testimonial `<video autoPlay muted loop playsInline poster>` → "Enroll" `<a href={stripePortalUrl} rel="noopener noreferrer">`. No inline payment.
- Code snippets: `<pre><code>` with `14px` JetBrains Mono, `background: #F3F4F6`, copy-to-clipboard `<button aria-label="Copy code">`.

`prefers-reduced-motion`: grid stagger instant, all visible immediately, testimonial video shows poster only.

---

### ChatGPT Canvas

Let's build a digital garden and educational course hub — "Intellectual Velocity" — inspired by Nat Eliason.

**Design system:**
- Background: `#FFFFFF`; Text: `#111827`; Muted: `#6B7280`; Code blocks: `#F3F4F6`; Border: `1px solid #E5E7EB`
- Border-radius: `4px` cards/buttons; `0px` layout sections
- Font: Merriweather/Tiempos serif — body `18-20px` weight 400 leading 1.7; Inter `14px` weight 500 for nav; JetBrains Mono `14px` for code

**Build iteratively:**
1. **Homepage** — portrait + H1 + newsletter email form (`role="status"` success) + featured 2×2 garden grid + course strip card
2. **Notes archive** `/notes` — Algolia search input + `aria-pressed` category filters + note/article card grid with stagger fade
3. **Book note page** `/notes/[slug]` — book cover + rating (X/10) + "Top 3 Takeaways" bordered box + body highlights
4. **Course landing** `/courses/[slug]` — curriculum modules + testimonial video + "Enroll" external link (no inline payment)

Motion: grid items `opacity 0→1 300ms ease-out` stagger. `prefers-reduced-motion`: all visible immediately.

---

### Bolt

Scaffold a digital garden and educational course platform — builder-first, content-dense.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --ink: #111827;
  --muted: #6B7280; --code-bg: #F3F4F6;
  --border: #E5E7EB; --radius: 4px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `GardenSearch` — `<input type="search">`. Category `aria-pressed` filter pills. Card grid: title + tag + date. Stagger `opacity 0→1 300ms` per item. `useReducedMotion()` guard.
- `BookNotePage` — book cover `<img alt>` + rating (X/10) → "Top 3 Takeaways" `border: 1px solid var(--border)` box → `18px` leading 1.7 serif body.
- `CodeBlock` — `<pre><code>` `background: var(--code-bg); font-family: 'JetBrains Mono'; font-size: 14px`. Copy-to-clipboard `<button aria-label="Copy code">`.
- `CourseLanding` — curriculum module list → testimonial `<video autoPlay muted loop playsInline poster>` → "Enroll" `<a href={stripePortalUrl} rel="noopener noreferrer">`. No inline payment.

---

### Claude Artifacts

Build a self-contained digital garden and course platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type NoteCategory = 'business' | 'biohacking' | 'philosophy' | 'productivity' | 'ai'

export interface BookNote {
  slug: string; title: string; author: string
  date: string       // ISO 8601
  category: NoteCategory; rating: number  // 1–10
  coverSrc: string; coverAlt: string
  topTakeaways: [string, string, string]  // exactly 3
  published: boolean
}

export interface Course {
  slug: string; title: string; tagline: string
  modules: { title: string; lessons: string[] }[]
  stripePortalUrl: string  // external — never render as inline form
  testimonialPosterSrc?: string
}
```

Design rules:
- `border-radius: 4px` cards/buttons; `0px` layout sections
- `CodeBlock`: `<pre><code>` + copy-to-clipboard `<button aria-label="Copy code">` with WCAG AA focus ring
- `CourseLanding`: `<a href={course.stripePortalUrl} rel="noopener noreferrer">` Enroll button — NO Stripe Elements
- `generateStaticParams()` from note/course slugs. `notFound()` for unknown slugs.

---

### Grok

Implement BuilderGarden — digital garden and educational course platform.

1. `src/app/globals.css` — `--bg: #FFFFFF; --ink: #111827; --muted: #6B7280; --code-bg: #F3F4F6; --border: #E5E7EB; --radius: 4px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `NoteCategory` union (business|biohacking|philosophy|productivity|ai) — `BookNote` interface (slug, title, author, date, category, rating, coverSrc, coverAlt, topTakeaways: `[string,string,string]`, published) — `Course` interface (slug, title, tagline, modules, stripePortalUrl, optional testimonialPosterSrc)
3. `src/lib/notes.ts` — 30 mock `BookNote` objects across 5 categories; `src/lib/courses.ts` — 4 mock `Course` objects
4. `src/app/page.tsx` — portrait + H1 + newsletter email form (`role="status"` success) + 2×2 garden grid + course strip card
5. `src/app/notes/page.tsx` — `<input type="search">` + `aria-pressed` category filters + note card grid with stagger `opacity 0→1` + `useReducedMotion()` guard
6. `src/app/notes/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — book cover + rating + "Top 3 Takeaways" bordered box + body highlights + `CodeBlock` with copy button
7. `src/app/courses/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — curriculum modules + testimonial `<video autoPlay muted loop playsInline poster>` + `<a href={stripePortalUrl} rel="noopener noreferrer">` Enroll — no inline payment
8. QA: `grep -r "StripeElements\|loadStripe\|CardElement" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a digital garden and course platform — "Intellectual Velocity" — for a modern creator-entrepreneur.

**Design layer:** `#FFFFFF` background, `#111827` text, `#6B7280` muted, `#F3F4F6` code block background, `#E5E7EB` borders. Typography: Merriweather/Tiempos serif — body `18-20px` weight 400 leading 1.7; Inter `14px` weight 500 for nav/labels; JetBrains Mono `14px` for code. `border-radius: 4px` cards, `0px` layout.

**Data layer:** `NoteCategory` union (5 values). `BookNote` interface (slug, title, author, date, category, rating, coverSrc, topTakeaways `[string,string,string]`). `Course` interface (slug, title, modules, stripePortalUrl). `generateStaticParams()` for `[slug]`.

**Component layer:** `GardenSearch` (search input + `aria-pressed` category filters + note card grid). `BookNotePage` (cover + rating + "Top 3 Takeaways" bordered box + body). `CodeBlock` (`<pre><code>` + copy `aria-label` button). `CourseLanding` (curriculum modules + testimonial video + external Enroll link — no inline payment).

**Motion layer:** Grid items: stagger `opacity 0→1 300ms ease-out`. `prefers-reduced-motion`: all visible immediately; `useReducedMotion()` guard on all Framer Motion components.
