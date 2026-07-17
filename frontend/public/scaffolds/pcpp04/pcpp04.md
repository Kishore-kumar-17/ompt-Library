---
prompt_id: pcpp04
sub_category: Portfolio
sub_type: Indian Editorial Photographer with Project-Led Structure
title: UniverseStory — Decentralized Narrative Photo-Essays
reference_patterns: project_universe_model, visual_narrative_sequencing, integrated_text_essays
inspiration: maheshshantaram.com
quality_score:
status: draft
notes: Focused on a "Decentralized Universe" aesthetic where each project has its own narrative depth and visual sequence.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in sociologically-driven portfolios and narrative photo-essay platforms. You understand that for documentary photographers, the single image is less important than the "Sequence of Discovery." You master the "Universe Model," where a portfolio is an interconnected ecosystem of project-specific narratives. You reject "generic grids" in favor of the "Essay" philosophy: high-contrast white space, integrated long-form diaries, and purposeful image pairings. You design for "Intellectual Engagement," ensuring that the political and social context of the work is as prominent as the visuals.

---

### Section 2 — Application Overview

This is a multi-project digital ecosystem for an acclaimed Indian editorial photographer. The audience consists of journalists, sociologists, international editors, and academics. The goal is to provide a "Universe" of work where each major project (e.g., Matrimania, The African Portraits) functions as a deep, immersive essay with its own narrative flow and metadata.

The application covers: A Central "Universe" Hub, Project-Specific Deep Dives, Integrated Narrative Diaries (Blog), Press & Recognition Archives, and a Quirky/Personalized "Contact & Life" page.

---

### Section 3 — Brand Voice & Mood

The mood is "Sociological & Inquisitive" and "Journalistically Precise." It feels like a high-end digital broadsheet or a contemporary sociology journal. It is clean, academic yet personal, and intellectually curious.

Copy is witty, subjective, and deep. Headers are informative but often have a "narrative hook." It uses terms like "The Mahesh Shantaram Universe," "The Sequence is the Story," and "Visual Sociology" to signal a departure from commercial photography norms.

Vibe word: Narrative.

---

### Section 4 — Core Features & Functionality

1. **Decentralized "Universe" Navigation** — A top-level hub that directs users to distinct "Project Planets" (e.g., matrimania.in, narrada.in). Each has a consistent navigation bar but a unique narrative depth.
2. **Visual Narrative Sequencing** — A layout engine that supports purposeful image pairings, large-scale single shots, and "Triptych" comparisons to tell a chronological story.
3. **Integrated Project Diaries** — Long-form text blocks (Essays, Interviews, Travelogues) that live alongside the images, rather than being tucked away in a blog.
4. **"The Journey" Sidebar** — Navigation within a project that allows users to jump between "The Essay," "The Series," and "The Press/Process."
5. **Interactive Context Cues** — Subtle floating "Back to Top" buttons and "Story Progress" indicators for long-scrolling photo essays.

---

### Section 5 — Design Specifications

**Visual style:** Gallery Minimal. Pure white backgrounds, clean lines, and a focus on "Sequence." All UI elements are minimal to allow the high-saturation, often colorful documentary shots to provide the visual identity.

**Color mode:** Primarily Light Mode (Academic White).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F5F5F5` (Very Light Grey)
- Border: `#1A1A1A` (Pure Black - used only for thin lines)
- Text Primary: `#1A1A1A` (Near Black)
- Text Secondary: `#555555` (Slate Grey)
- Accent: `#000000` (Minimalist structural accents)

**Typography:** Clean Modern Sans-Serif (e.g., Inter, Montserrat, or Roboto).
- Project Headlines: `32px`, weight 800, tracking `-0.02em`.
- Body Copy (Essays): `18px`, weight 400, leading 1.8 (Generous for readability).
- UI Labels: `12px`, uppercase, bold, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `120px` to `160px` vertical (Letting the story breathe).
- Image Gaps: Variable (Pairs = `16px`, Sequences = `48px`).
- Container Max-width: `1100px` for images, `700px` for narrative text.

**Border radius:** `0px` (Strictly sharp edges to mimic the paper of a photobook).

**Responsive:** Desktop-optimized for the "Reading & Viewing" experience. Mobile view uses a high-contrast vertical stack with "Narrative Progress" markers.

**Accessibility:** WCAG AA. All essay text must have high contrast. Images must support detailed captions for screen readers.

**Motion:** 
- Fade-in-Sequence: Staggered entry for images as they are "read" in the sequence.
- Slide Reveals: Quick `300ms` transitions for sidebar menus.
- "Universe" Switcher: A subtle portal-style animation when jumping between project domains.

---

### Section 6 — Structure

**Universe Hub Layout:**
1. **Nav:** Centered Logo. Links: Universe, About, Journal, Contact.
2. **Featured Planets:** Large cards for major projects (Matrimania, African Portraits). Each has a large cover image + Title + Excerpt.
3. **Latest News:** Text-heavy grid showing recent press, exhibitions, or AI experiments.

**Project Essay Layout:**
- **Hero:** One definitive image + Title + "The Essay" link.
- **Narrative Flow:** Interspersed text and image blocks. Sequence: [Image Pair] -> [2 Paragraphs Text] -> [Massive Single Image] -> [Triptych].
- **Project Nav (Sticky Left):** Vertical list: The Essay, The Series, The Journey, The Press.

**Contact Page:**
- Narrative text first ("Why I'm hard to find"), followed by a minimalist form and social icons.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **CMS:** Sanity.io or Contentful to handle multi-domain "Universe" content relationships.
- **Media:** Next.js `<Image>` with `priority` and customized `quality` for high-end documentary color.
- **Multi-tenancy:** Logic to handle different subdomains/domains (e.g., `matrimania.in`) within a single Next.js codebase.

---

### Section 8 — Implementation Steps

1. **The Universe Shell:** Build the centralized hub and the multi-project routing logic.
2. **Narrative Engine:** Create a flexible "Story Block" component system (Text, Single Image, Pairs, Triptychs).
3. **Project Template:** Implement the project-specific navigation sidebar and sticky "Journey" links.
4. **Diary/Journal CMS:** Set up the MDX structure for long-form essays and interviews.
5. **Polish & Sequency:** Implement staggered scroll-triggered reveals for the "Sequence is the Story" feel.

---

### Section 9 — User Experience

The user is an "Intellectual Consumer." 
The UI must be "Literary." It should feel like reading a high-quality online magazine that happens to have world-class photography.
The "Aha! moment" is the narrative sequence—where the user realizes that two images placed together create a new, third meaning.

---

### Section 10 — Constraints

- **No simple "Thumbnail Grids"** for major projects. Every project must start as an essay.
- **No pure black backgrounds** (unless specifically requested for a project like "African Portraits").
- **No corporate buttons.** Use text links with bold underlines or simple arrows.
- **No manual SEO management.** Every project/essay needs specialized OpenGraph meta for journalists to share.

---

## Platform Versions

### Category A — v0

Build a "Project Universe" photography portfolio inspired by Mahesh Shantaram. 
Style: Pure White background (#FFFFFF), Near Black typography (#1A1A1A), 0px border-radius (sharp corners), and modern Sans-serif fonts.
Include:
1. "Universe Hub" page that directs users to distinct "Project Planets" with large cover cards.
2. "Narrative Photo-Essay" template that intersperses long-form text with image sequences (Pairs, Triptychs).
3. Project-specific Sidebar Navigation (The Essay, The Series, The Press).
Use high-saturation documentary photography and a "Literary Broad-sheet" UI approach.

---

### Category B — Cursor

In `src/app/`, implement a "Visual Sociology & Narrative Ecosystem" (Mahesh Shantaram style).
Stack: Next.js 14, Tailwind, Sanity CMS, Framer Motion.
Visual Rules: 
- Primary Color: `#1A1A1A` (Text)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-none` (0px)
- Layout: "Sequence-first" photo essay.

Implement:
1. `app/page.tsx` - The central "Universe" hub with large project cards and a minimalist logo.
2. `app/projects/[slug]/page.tsx` - A long-scrolling essay layout using a custom `StoryBlock` system.
3. `components/projects/ProjectNav.tsx` - A sticky left-side navigation for project-specific sub-sections.
4. `components/ui/ImageSequence.tsx` - A layout component that handles pairings and triptychs with staggered fade-in animations.

Focus on "The Sequence is the Story" and high-readability editorial typography. No corporate blurs. No generic grids.

---

### Lovable

Build a narrative documentary portfolio — "Universe Hub" — for an Indian editorial photographer. White (#FFFFFF) canvas, near-black (#1A1A1A) text, 0px border-radius, literary broadsheet style.

Must include:
- Universe hub `/`: 2-column project card grid, full-bleed cover images, project title `32px` weight 800 `tracking: -0.02em`, one-line descriptor below.
- Project page `/projects/[slug]`: long-scrolling essay — alternating full-width images, 2-column diptychs, and triptychs, interspersed with `max-width: 720px` centered prose `18px` leading 1.8.
- Story progress bar: `position: fixed; top: 0; height: 3px; background: #1A1A1A` width scroll-driven. `aria-hidden="true"`.
- Sticky project nav (desktop sidebar): anchor links to "The Essay", "The Series", "The Press" section IDs. Collapses to dropdown on mobile.
- Back-to-top button: appears after 400px scroll.

No generic thumbnail grids. No soft blurs. `prefers-reduced-motion`: progress bar instant, no smooth scroll.

---

### ChatGPT Canvas

Let's build a narrative documentary portfolio — "Universe Model" — for an acclaimed Indian editorial photographer inspired by Mahesh Shantaram.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F5F5F5`; Text: `#1A1A1A`; Muted: `#555555`
- Border-radius: `0px` everywhere
- Font: Inter/Montserrat; project headlines `32px` weight 800 `tracking: -0.02em`; essay body `18px` weight 400 leading 1.8; UI labels `12px` uppercase bold

**Build iteratively:**
1. **Universe hub** `/` — 2-column project card grid, full-bleed covers, title + descriptor
2. **Project page** `/projects/[slug]` — long-scroll essay: alternating full-width / diptych / triptych blocks interspersed with `max-width: 720px` prose
3. **Sticky project nav** — sidebar "The Essay / The Series / The Press" anchor links (desktop), dropdown (mobile)
4. **Story progress bar** — `3px` fixed top, scroll-driven width. `aria-hidden="true"`.
5. **Back to Top** — appears at `scrollY > 400`

`prefers-reduced-motion`: images visible immediately, progress bar width instant.

---

### Bolt

Scaffold a narrative documentary portfolio — "Universe" photo-essay platform.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root { --bg: #FFFFFF; --surface: #F5F5F5; --ink: #1A1A1A; --muted: #555555; }
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `UniverseHub` — CSS `repeat(2, 1fr)` grid, full-bleed `<img>` + title overlay.
- `StoryBlock` — renders `full | diptych | triptych | prose` layout — switch on `type` prop.
- `ProjectNav` — `position: sticky; top: var(--nav-height)` desktop sidebar, anchor links. Mobile: `<select>` dropdown.
- `StoryProgress` — `position: fixed; top: 0; height: 3px` — scroll-driven width. `aria-hidden="true"`. No CSS `transition` when `useReducedMotion()` is true.
- `BackToTop` — appears at `scrollY > 400`, `window.scrollTo({ behavior: 'smooth' })`.

---

### Claude Artifacts

Build a self-contained narrative documentary portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type BlockType = 'full' | 'diptych' | 'triptych' | 'prose'

export interface StoryBlock {
  type: BlockType
  images?: { src: string; alt: string }[]
  prose?: string
}

export interface Project {
  id: string; slug: string; title: string
  descriptor: string; year: number
  coverSrc: string; coverAlt: string
  essayBlocks: StoryBlock[]
  pressLinks?: { title: string; url: string; publication: string }[]
}
```

Design rules:
- `border-radius: 0` everywhere — no exceptions
- All prose blocks: `max-width: 720px; margin: 0 auto` — `.prose` CSS Modules class
- `StoryProgress` — `aria-hidden="true"`, no CSS `transition` on width when `useReducedMotion()` is true
- `generateStaticParams()` from project slugs. `notFound()` for unknown slugs.

---

### Grok

Implement UniverseStory — narrative documentary portfolio.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F5F5F5; --ink: #1A1A1A; --muted: #555555` — `*, *::before, *::after { border-radius: 0; }`
2. `src/types/index.ts` — `BlockType` union (full|diptych|triptych|prose) — `StoryBlock` interface — `Project` interface (id, slug, title, descriptor, year, coverSrc, coverAlt, essayBlocks, optional pressLinks)
3. `src/lib/projects.ts` — 6 mock `Project` objects with varied `essayBlocks`
4. `src/app/page.tsx` — CSS `repeat(2, 1fr)` grid — full-bleed cover cards — title `32px` 800 `tracking: -0.02em`
5. `src/app/projects/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — renders `StoryBlock[]` switching on `type`
6. `src/components/projects/ProjectNav.tsx` — `position: sticky; top: var(--nav-height)` — anchor links — `aria-label="Project sections"`
7. `src/components/ui/StoryProgress.tsx` — `position: fixed; top: 0; height: 3px; background: var(--ink)` — scroll-driven width — `aria-hidden="true"` — `useReducedMotion()`: no width `transition`
8. QA: `grep -r "border-radius" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a narrative documentary portfolio — "Universe Model" — for an Indian editorial photographer.

**Design layer:** `#FFFFFF` background, `#F5F5F5` surface, `#1A1A1A` text, `#555555` muted. Typography: Inter/Montserrat — project headlines `32px` weight 800 `tracking: -0.02em`; essay body `18px` weight 400 leading 1.8; UI labels `12px` uppercase. `border-radius: 0` everywhere.

**Data layer:** `BlockType` union. `StoryBlock` interface (type, optional images array, optional prose). `Project` interface (slug, title, descriptor, year, coverSrc, essayBlocks, optional pressLinks). `generateStaticParams()` for `[slug]`.

**Component layer:** `UniverseHub` (2-column project card grid). `StoryBlock` renderer (full-width / 2-col diptych / 3-col triptych / 720px prose). `ProjectNav` (sticky sidebar with anchor links). `StoryProgress` (`3px` scroll-driven top bar, `aria-hidden`). `BackToTop` (visible after 400px scroll).

**Motion layer:** Image stagger: `opacity 0→1 400ms ease-out`. `prefers-reduced-motion`: images at full opacity immediately; `StoryProgress` width instant without transition.
