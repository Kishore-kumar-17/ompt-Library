---
prompt_id: pcpp12
sub_category: Portfolio
sub_type: Structured Writer/Creator Profile
title: CanvasCV — Editorial Professional Profiles & Visual Timelines
reference_patterns: visual_career_timeline, modular_project_showcase, layer_based_navigation
inspiration: read.cv
quality_score:
status: draft
notes: Focused on a modern, "Living Resume" aesthetic with a balance of professional data and creative storytelling.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in professional networking platforms, digital resumes, and creator identity systems. You understand that for modern creators and tech professionals, a resume is not a list—it is a story. You master the "Editorial Profile," where work history, side projects, and writing coexist in a clean, visual hierarchy. You reject "corporate-dense" layouts (like LinkedIn) in favor of the "Read" philosophy: generous whitespace, modern grotesque typography, and card-based modularity. You design for "Affinity & Clarity," ensuring that a recruiter can scan a career arc in seconds while feeling the unique personality behind the work.

---

### Section 2 — Application Overview

This is a professional profile platform designed as a "Living Resume" for creators, developers, and writers. The audience consists of hiring managers, potential collaborators, and peer networks. The goal is to provide a beautiful, structured environment that showcases a "Visual Timeline" of work, rich project case studies, and long-form writing in a single-link destination.

The application covers: Dynamic Profile Landing (Timeline), Project Detail "Layers", Side Project Grids, Writing/Journal Tab, and a Curated "Explore" Feed.

---

### Section 3 — Brand Voice & Mood

The mood is "Minimalist Tech" and "Art-Directed Professionalism." It feels like a high-end design catalog for talent. It is neutral, breathable, and quietly confident.

Copy is personal and concise. Headers are functional but sophisticated. It uses a "Show, Don't Tell" tone to signal quality. It avoids cluttered "Skill Bars" in favor of "Project Evidence."

Vibe word: Breathable.

---

### Section 4 — Core Features & Functionality

1. **Visual Career Timeline** — A vertical chronological feed of work experience where each entry is a clean, structured card with dates, role, and a brief "Impact" summary.
2. **Modular Project "Layers"** — A system that allows users to expand a work entry into a rich case study featuring high-res imagery, video embeds, and specific tech-stack tags.
3. **Side Project & Hobby Grid** — A dedicated space for non-commercial work (Open source, Art, Hobbies) to present a multi-faceted professional identity.
4. **Writing/Journal Tab** — A secondary view for long-form content, case studies, or personal journals using high-readability serif-sans typography.
5. **Team & Collaboration Badges** — UI elements that link profiles to "Team" pages, showing the people and culture behind specific companies.

---

### Section 5 — Design Specifications

**Visual style:** Editorial Minimal. Modular cards, hair-line borders, and a focus on "Layers." The UI is intentionally restrained to let user-uploaded project imagery provide the visual identity.

**Color mode:** Primarily Light Mode (Off-White focused) with a "Clean Dark" preference for developer profiles.

**Color palette:**
- Background: `#FAF9F6` (Warm Off-White — "Paper" feel)
- Surface/Card: `#FFFFFF` (Pure White)
- Border: `#E5E7EB` (Slate-200 — 1px hair-lines)
- Text Primary: `#1A1A1A` (Charcoal — near black)
- Text Muted: `#71717A` (Zinc-500 — for dates and metadata)
- Accent: `#3B82F6` (Modern Blue — for interactive links/status)

**Typography:** Functional Grotesque + Editorial Serif.
- Name/Header (Sans): `28px`, weight 600, tight tracking (e.g., Inter or Public Sans).
- Section Titles: `14px`, weight 600, uppercase, tracking `0.05em`.
- Body/Descriptions: `15px`, weight 400, leading 1.6.
- Writing Headers (Serif): `24px`, weight 500 (e.g., Georgia or Garamond).

**Spacing:** 8px base unit. 
- Column Gaps: `24px` to `32px`.
- Card Padding: `24px`.
- Container Width: `max-width: 800px` (Optimized for single-column focus).

**Border radius:** `12px` (Modern, soft rounding).

**Responsive:** Mobile-first. The timeline collapses into a single-column vertical stack. Horizontal scrollers are used for "Currently working on" status items.

**Accessibility:** WCAG AA. High-contrast typography. "Read-only" mode should be standard with clear focus rings for navigation.

**Motion:** 
- Layer Expansion: Smooth height transition for "Project Details."
- Page Switches: Quick `200ms` fades between Timeline/Writing/About tabs.
- Hover Effects: Subtle scale-up `1.02` on project cards.

---

### Section 6 — Structure

**Profile Landing Layout:**
1. **Header:** Profile Pic (Circle) -> Name (H1) -> Bio (Max 2 lines) -> Social Icons.
2. **Current Status:** Horizontal scroll of small chips (e.g., "Working on Project X", "Reading [Book Name]").
3. **Tabs:** Navigation bar: Work, Side Projects, Writing, About.
4. **Work Timeline:** Vertical stack of cards. [Logo] [Company Name] [Dates] [Role] [Summary].
5. **Project Grid:** 2-column masonry or grid of large cards with image covers.

**Writing Tab Layout:**
- Single column of articles. Each: [Date] [Title - Bold] [Reading Time] [Summary excerpt].

**About Page:**
- Narrative text first -> Skills (Text-only chips) -> Education -> Location/Timezone.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Animation:** Framer Motion for tab transitions and expandable "Layer" cards.
- **State:** Zustand for managing active tabs and "Expand/Collapse" states.
- **Media:** Next.js `<Image>` with customized quality and specific `sizes` for responsive cards.
- **CMS:** Sanity.io or Contentlayer (to handle structured resume data and long-form writing).

---

### Section 8 — Implementation Steps

1. **The Shell:** Setup `globals.css` with the off-white palette and define the Inter-font hierarchy.
2. **Timeline Component:** Build the chronological work card system with the "Vertical Line" connector logic.
3. **Expandable Layers:** Implement the "Project Detail" expansion using Framer Motion `AnimatePresence`.
4. **Writing Hub:** Build the high-readability text layout for the Journal tab.
5. **Explore Feed:** Create the responsive grid for the "Side Projects" section.

---

### Section 9 — User Experience

The user is a "Talent Observer." 
The UI must be "High-Signal." Every pixel should communicate professional value. Don't hide the data, but make it look like a piece of art.
The "Aha! moment" is the Project Layer—where a boring line item like "Product Designer at X" expands into a beautiful, visual case study.

---

### Section 10 — Constraints

- **No "Skill Gauges" or "Progress Bars."** Use text labels or project evidence only.
- **No pure whites.** Use warm neutrals to maintain the "Editorial" feel.
- **No cluttered sidebars.** Keep the focus on the central vertical timeline.
- **No ads or endorsements.** Ad-free is mandatory for professional credibility.

---

## Platform Versions

### Category A — v0

Build a "Modular Editorial" professional profile inspired by Read.cv. 
Style: Warm Off-White background (#FAF9F6), Charcoal typography (#1A1A1A), 12px border-radius, and modern Sans-serif fonts (Inter).
Include:
1. Visual Career Timeline with chronological work cards.
2. Modular "Side Project" Grid showing large-format imagery.
3. Writing Tab with high-readability long-form text layouts.
Use a single-column 800px layout and a "Living Resume" UI approach. No corporate clutter.

---

### Category B — Cursor

In `src/app/`, implement a "Structured Creator Profile & Timeline" (Read.cv style).
Stack: Next.js 14, Tailwind, Zustand, Framer Motion.
Visual Rules: 
- Primary Color: `#1A1A1A` (Text)
- Background: `#FAF9F6` (Paper)
- Radius: `rounded-xl` (12px)
- Font: Modern Sans (Inter).

Implement:
1. `app/page.tsx` - A professional profile with a visual work timeline and a "Current Status" scroller.
2. `components/profile/ProjectLayer.tsx` - An expandable card component that reveals detailed case study content.
3. `app/writing/page.tsx` - A dedicated journal tab using a high-contrast editorial layout.
4. `components/ui/StatusChips.tsx` - A horizontal list of minimal chips for latest updates and tools.

Focus on "Breathable Mastery" and high-signal information hierarchy. No modern blurs. No ads.

---

### Lovable

Build a modular professional profile platform — "Living Resume" — inspired by Read.cv. Warm off-white (#FAF9F6) canvas, charcoal (#1A1A1A) text, modern blue (#3B82F6) accent for links, 12px border-radius.

Must include:
- Profile header: avatar `<img alt>` circle → name H1 `28px` weight 600 Inter → 2-line bio → social icon links with `aria-label`.
- Status chips: `overflow-x: auto` horizontal scroll strip. Each chip: `border: 1px solid #E5E7EB; border-radius: 6px; padding: 4px 12px; font-size: 12px`. `aria-label="Current status items"` on container.
- Tab navigation: Work, Side Projects, Writing, About. `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"` with `aria-labelledby`.
- Work timeline: vertical line connector + card stack. Each: company logo `<img alt>` + name + dates + role + 2-line impact. Click to expand `ProjectLayer` case study (images, tech stack tags, description) with `AnimatePresence`.
- Side projects grid: 2-column cards with cover `<img alt>`, name, 1-line description, tech stack badges.
- Writing tab: `<article>` list. Each: `<time>` date → serif title `24px` weight 500 → read time chip → excerpt.

`prefers-reduced-motion`: `ProjectLayer` expands instantly (no height animation), tab switch instant.

---

### ChatGPT Canvas

Let's build a modular professional profile — "Structured Creator Profile" — inspired by Read.cv.

**Design system:**
- Background: `#FAF9F6` warm off-white; Surface/Card: `#FFFFFF`; Border: `1px solid #E5E7EB`; Text: `#1A1A1A`; Muted: `#71717A`; Accent: `#3B82F6`
- Border-radius: `12px` cards; `6px` chips; `0px` page sections
- Font: Inter — name `28px` weight 600; section titles `14px` weight 600 uppercase `letter-spacing: 0.05em`; body `15px` weight 400 leading 1.6; writing headers Georgia `24px` weight 500

**Build iteratively:**
1. **Profile landing** — avatar circle + name H1 + bio + social icons + status chips horizontal scroll + tab nav (`role="tablist"`, `aria-selected`)
2. **Work timeline** — chronological card stack with company logo, role, dates, impact. Click to expand `ProjectLayer` case study (`AnimatePresence` height animation). `useReducedMotion()` guard.
3. **Side projects grid** — 2-col card grid with cover image and tech-stack badges
4. **Writing tab** — article list: `<time>` + Georgia serif title `24px` + read time chip + excerpt

Motion: `ProjectLayer` expand `height 0→auto 250ms ease`. Tab switch `opacity 0→1 200ms`. Hover: `scale(1.02)` on side project cards. `prefers-reduced-motion`: all instant.

---

### Bolt

Scaffold a modular professional profile platform — breathable, editorial, timeline-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FAF9F6; --card: #FFFFFF;
  --border: #E5E7EB; --ink: #1A1A1A;
  --muted: #71717A; --accent: #3B82F6;
  --radius: 12px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `ProfileHeader` — avatar `<img alt>` `border-radius: 50%` → name `28px` 600 → 2-line bio → social icons with `aria-label`. `max-width: 800px`.
- `StatusChips` — `overflow-x: auto`. Each chip: `border: 1px solid var(--border); border-radius: 6px; font-size: 12px`. `aria-label="Current status items"` on wrapper.
- `WorkTimeline` — vertical `2px` line connector + card stack `border-radius: var(--radius)`. `ProjectLayer` expands on click with `AnimatePresence height 0→auto 250ms`. `useReducedMotion()` guard.
- `TabNav` — `role="tablist"`, `aria-selected`, `aria-tabpanel`. `200ms` opacity switch. `useReducedMotion()`: instant.
- `WritingTab` — `<article>` list: `<time>` + Georgia title `24px` 500 + read time chip `6px` border-radius + excerpt `15px`.

---

### Claude Artifacts

Build a self-contained professional profile platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export interface WorkEntry {
  id: string; company: string; role: string
  startDate: string; endDate?: string  // ISO 8601, undefined = present
  logoSrc: string; logoAlt: string; summary: string
  caseStudy?: {
    images: { src: string; alt: string }[]
    techStack: string[]; description: string
  }
}

export interface SideProject {
  id: string; name: string; description: string
  coverSrc: string; coverAlt: string
  techStack: string[]; url?: string
}

export interface WritingEntry {
  slug: string; title: string
  date: string       // ISO 8601
  excerpt: string; readTimeMinutes: number
}
```

Design rules:
- `--radius: 12px` — all cards `border-radius: var(--radius)`; chips `6px`
- `ProjectLayer` is `'use client'` — `AnimatePresence` height `0→auto` — `useReducedMotion()` guard: if `true`, expand instantly without animation
- Tab navigation: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"` with `aria-labelledby`
- `endDate?: string` — render "Present" text if undefined

---

### Grok

Implement CanvasCV — modular professional profile platform.

1. `src/app/globals.css` — `--bg: #FAF9F6; --card: #FFFFFF; --border: #E5E7EB; --ink: #1A1A1A; --muted: #71717A; --accent: #3B82F6; --radius: 12px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `WorkEntry` interface (id, company, role, startDate, optional endDate, logoSrc, logoAlt, summary, optional caseStudy with images/techStack/description) — `SideProject` interface (id, name, description, coverSrc, coverAlt, techStack, optional url) — `WritingEntry` interface (slug, title, date, excerpt, readTimeMinutes)
3. `src/lib/profile.ts` — 6 mock `WorkEntry` objects (2 with caseStudy); 8 `SideProject` objects; 10 `WritingEntry` objects
4. `src/app/page.tsx` — ProfileHeader + StatusChips (`overflow-x: auto`) + TabNav (`role="tablist"`, `aria-selected`, `aria-tabpanel`) — renders WorkTimeline / SideProjectGrid / WritingTab / About based on active tab
5. `src/components/profile/WorkTimeline.tsx` — vertical `2px` connector line + card stack — each: logo, company, role, dates (endDate undefined → "Present"), summary — `ProjectLayer` expandable (`AnimatePresence` + `useReducedMotion()` guard)
6. `src/components/profile/SideProjectGrid.tsx` — CSS `repeat(2, 1fr)` grid, cover `<img alt>`, name, description, tech-stack `#3B82F6` badges
7. `src/components/profile/WritingTab.tsx` — `<article>` list: `<time>` + Georgia title `24px` 500 + read time chip + excerpt `15px`
8. QA: `npx tsc --noEmit` → 0 errors — `npm run build` passes — tab navigation passes `aria-selected` keyboard test

---

### Gemini

Design and implement a modular professional profile — "Living Resume" — for creators, developers, and writers.

**Design layer:** `#FAF9F6` warm off-white background, `#FFFFFF` card surface, `1px solid #E5E7EB` borders, `#1A1A1A` text, `#71717A` muted, `#3B82F6` blue accent for links/tags. Typography: Inter — name `28px` weight 600; section titles `14px` uppercase `letter-spacing: 0.05em`; body `15px` leading 1.6; Georgia writing headers `24px` weight 500. `border-radius: 12px` cards, `6px` chips.

**Data layer:** `WorkEntry` interface (company, role, startDate, endDate?, logoSrc, summary, optional caseStudy). `SideProject` interface (name, description, coverSrc, techStack). `WritingEntry` interface (slug, title, date, excerpt, readTimeMinutes).

**Component layer:** `ProfileHeader` (avatar circle, name, bio, social icons). `StatusChips` (horizontal overflow scroll, `6px` radius chips). `TabNav` (`role="tablist"`, `aria-selected`, `aria-tabpanel`). `WorkTimeline` (vertical line connector + expandable `ProjectLayer` cards). `SideProjectGrid` (2-col cover cards with tech badges). `WritingTab` (`<time>` + serif title + read time + excerpt).

**Motion layer:** `ProjectLayer` expand: `height 0→auto 250ms ease`. Tab switch: `opacity 0→1 200ms`. Hover: `scale(1.02)` on project cards. `prefers-reduced-motion`: all instant; `useReducedMotion()` guard on all Framer Motion components.
