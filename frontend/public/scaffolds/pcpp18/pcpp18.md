---
prompt_id: pcpp18
sub_category: Portfolio
sub_type: Course Marketplace & Cohort Landing Pages
title: CohortHub — Instructor-Led Learning & Transformative Sprints
reference_patterns: time_bound_enrollment_cues, instructor_authority_heros, curriculum_accordion_logic
inspiration: maven.com
quality_score:
status: draft
notes: Focused on a high-authority "Instructor-First" aesthetic with integrated cohort scheduling and community proof.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in educational marketplaces, cohort-based learning platforms, and high-authority personal brand systems. You understand that for professional learners, the instructor's pedigree is the primary conversion driver. You master the "Instructor-First UI," where headshots, titles (e.g., "Ex-Airbnb"), and social proof are the central visual anchors. You reject "generic" e-learning grids in favor of the "Cohort" philosophy: bold typography, real-time start dates, and a focus on "Transformation through Community." You design for "Urgency & Trust," ensuring that the path from a "Product Sense" discovery to a $2,000 cohort enrollment is fast, authoritative, and professionally structured.

---

### Section 2 — Application Overview

This is a premium course marketplace and landing page system for world-class, cohort-based education. The audience consists of mid-to-senior professionals (PMs, Engineers, Designers) looking for "Career Sprays" and high-impact peer networks. The goal is to provide a "Visual Command Center" for learning, archiving hundreds of expert-led cohorts while serving as the primary enrollment engine for time-bound educational events.

The application covers: Multi-Category Marketplace Grid, Instructor-Specific Course Pages (Syllabus-dense), Real-Time Cohort Scheduling UI, Student Learning Dashboard, and an "Expense This Course" template generator.

---

### Section 3 — Brand Voice & Mood

The mood is "Ambitious & Technically Precise" and "Instructor-Driven." It feels like a high-end tech conference or a private masterclass series. It is energetic, structured, and focused on "Real-World Results."

Copy is authoritative, outcome-oriented, and concise. Headers focus on "The Expert's Edge": "Learn from the best," "Unlock your career growth," "World-class Product Sense in Practice." It avoids academic jargon in favor of "Operating Manuals" and "Strategic Frameworks."

Vibe word: Transformative.

---

### Section 4 — Core Features & Functionality

1. **"Pedigree" Instructor Cards** — A core component highlighting the instructor's career achievements (e.g., "AI Lead at Google") alongside high-fidelity portraits and student counts.
2. **Real-Time Cohort Stepper** — A specialized scheduling component that shows the next start date (e.g., "Starts May 30") and duration, creating natural conversion urgency.
3. **Expandable Curriculum Accordions** — A weekly or module-based syllabus view that allows users to deep-dive into lesson details without losing the overall course context.
4. **"Expense this Course" Tool** — A high-utility component that generates pre-written, professional emails for students to request corporate reimbursement.
5. **Community Proof Carousels** — Sophisticated testimonial sliders that link student quotes to their verified professional titles and LinkedIn profiles.

---

### Section 5 — Design Specifications

**Visual style:** Professional Marketplace. Modular grids, high-contrast typography, and a "Pedigree-First" information hierarchy. The UI is clean to allow instructor portraits and course-specific accent colors to lead.

**Color mode:** Primarily Light Mode (Modern Professional).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F8F9FA` (Softest Grey)
- Text Primary: `#111827` (Deep Slate / Black)
- Accent (Dynamic): Multi-vibrant palette (e.g., Electric Blue for AI, Deep Purple for Product) used for badges and buttons.
- Border: `#E5E7EB` (Slate-200 — hair-line separators)

**Typography:** Bold Geometric Sans.
- Display Headlines: `clamp(32px, 5vw, 60px)`, weight 800, tracking `-0.02em` (e.g., Inter, Graphik, or Montserrat).
- Body/Curriculum: `16px`, weight 400, leading 1.6.
- Metadata (Dates): `13px`, weight 600, uppercase, tracking `0.05em`.

**Spacing:** 16px base unit. 
- Section Padding: `80px` to `112px`.
- Grid Gaps: `24px` to `32px`.
- Container Max-width: `1320px` (Optimized for marketplace scannability).

**Border radius:** `8px` (Modern rounding) or `12px` for large-scale cards.

**Responsive:** Mobile-first approach. Course cards show start dates prominently on mobile. Curriculum accordions are the primary mobile navigation for course pages.

**Accessibility:** WCAG AA. High-contrast text on white. All instructor portraits must have "Pedigree Alt-Text" for screen readers.

**Motion:** 
- "Sprint" Entrance: Fast-staggered entry for course cards `opacity 0 -> 1` and `y: 20 -> 0`.
- Accordion Expand: Smooth height transition `0.3s`.
- No heavy/slow animations.

---

### Section 6 — Structure

**Marketplace Hub Layout:**
1. **Nav:** Dense category-driven top bar (AI, Product, Engineering, Design). Logo (Left). Right: For Instructors, Sign In, Join for Free.
2. **Hero:** Bold Value Prop ("Unlock your career growth") + Search Bar ("What do you want to learn?").
3. **Trending Strip:** Horizontal cards of the most popular 5 cohorts.
4. **Instructor Grid:** "Learn from the best" section featuring 2-column or 3-column instructor portraits with big titles.
5. **Course Grid:** Categorized sections: "Upcoming Workshops," "Bestselling Cohorts."

**Course Page Layout:**
- **Hero:** Course Title -> Instructor Byline -> "Starts [Date]" high-contrast badge.
- **Transformations:** "In this course, you will..." 3-column list of outcomes.
- **Curriculum:** Full-width weekly accordions.
- **Pricing Card:** Sticky sidebar or bottom bar with "Enroll" and "Expense this" links.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Search:** Algolia for real-time marketplace discovery and domain-based filtering.
- **State:** Zustand for managing enrollment step-data and student preferences.
- **Scheduling:** Custom logic for time-zone detection and local cohort start-time formatting.
- **CMS:** Sanity.io or Contentlayer (to handle hundreds of expert-authored curricula).

---

### Section 8 — Implementation Steps

1. **The Professional Palette:** Setup `globals.css` with the Inter-font hierarchy and the high-contrast professional palette.
2. **Marketplace Engine:** Build the category-driven grid system with "Upcoming Cohort" metadata badges.
3. **Curriculum Accordion:** Create the modular syllabus component with support for video previews and resource links.
4. **Instructor Pedigree Suite:** Build the instructor cards and bio sections with social proof anchors.
5. **Enrollment Flow:** Implement the "Expense this course" utility and the Stripe-integrated payment modal.

---

### Section 9 — User Experience

The user is a "Result-Driven Professional." 
The UI must be "Efficient and Authoritative." Every course card must answer "Who is teaching this?" and "When does it start?" within the first 2 seconds.
The "Aha! moment" is the Curriculum Preview—where the user sees the specific, week-by-week "Operating Manual" of a world-class expert.

---

### Section 10 — Constraints

- **No generic stock student photos.** 100% focus on instructor portraits and "Built for Builders" visuals.
- **No pure black backgrounds.** Use white/light grey to maintain the "Masterclass" feel.
- **No slow/clunky grids.** Search results and filters must respond instantly to maintain professional utility.
- **No hidden pricing.** The total cost must be clear before the "Enroll" click.

---

## Platform Versions

### Category A — v0

Build a "Cohort-Based Marketplace" landing page inspired by Maven. 
Style: Pure White background (#FFFFFF), Deep Slate typography (#111827), 8px border-radius, and bold modern Sans-serif fonts (Inter).
Include:
1. Marketplace Grid featuring course cards with "Starts [Date]" and "Instructor Pedigree" labels.
2. "Learn from the best" Instructor Section with high-impact portraits and career titles (e.g., Ex-Airbnb).
3. Weekly Curriculum Accordions for course pages that deep-dive into syllabus modules.
Use high-vibrancy accent colors and a "Professional Mastery" UI approach. No ads or blurs allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Cohort-Based Education Hub & Marketplace" (Maven style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Zustand.
Visual Rules: 
- Primary Color: `#111827` (Slate)
- Accent Color: `#3B82F6` (Electric Blue - for AI/Tech)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-lg` (8px)
- Font: Bold Geometric Sans (e.g., Inter).

Implement:
1. `app/page.tsx` - A category-driven marketplace hub with "Trending" and "Upcoming" sections.
2. `app/courses/[slug]/page.tsx` - A course detail page with high-authority heros and vertical weekly accordions.
3. `components/enrollment/ExpenseTool.tsx` - A utility that generates corporate reimbursement templates for students.
4. `components/ui/InstructorCard.tsx` - A high-impact component for expert bios featuring headshots and social proof stats.

Focus on "Intellectual Transformation" and fast-loading content density. No modern gradients or blurs. No ads.

---

### Lovable

Build a cohort-based course marketplace — "Instructor-First, Transformation-Driven" — for professional learners. White (#FFFFFF) canvas, deep slate (#111827) text, Electric Blue (#3B82F6) accent, 8px border-radius.

Must include:
- Marketplace hub: category nav pills (AI, Product, Engineering, Design) with `aria-pressed`. Course card grid: instructor portrait `<img alt="[name], [title] at [company]">` + course title + "Starts [date]" `13px` uppercase badge + price → "Enroll" `<a href={stripePortalUrl} rel="noopener noreferrer">`.
- Instructor section: `<section aria-label="Featured instructors">`. Each card: headshot + `#111827` name `18px` bold + `#6B7280` title "Ex-[company]" + `#3B82F6` "View courses" link.
- Course page `/courses/[slug]`: curriculum `<details><summary>` accordion (Week 1, Week 2…) + "Expense this Course" `<button aria-label="Generate expense email">` → copies pre-written corporate reimbursement template to clipboard via `navigator.clipboard.writeText()` (no external API) + `role="status"` copy-success state.
- Testimonial carousel: `<div role="region" aria-label="Student testimonials" aria-live="polite">`. Quote + `#111827` name + `#6B7280` verified title + LinkedIn icon.

`prefers-reduced-motion`: card stagger instant, all visible immediately. No payment forms inline — all enrollment via external links only.

---

### ChatGPT Canvas

Let's build a cohort-based course marketplace — "CohortHub" — for world-class instructor-led learning. Maven aesthetic.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F8F9FA`; Text: `#111827`; Accent: `#3B82F6` Electric Blue; Border: `#E5E7EB`
- Border-radius: `8px` cards; `12px` large instructor cards
- Font: Inter weight 800 `clamp(32px, 5vw, 60px)` display tracking `-0.02em`; body `16px` weight 400 leading 1.6; metadata `13px` bold uppercase `letter-spacing: 0.05em`

**Build iteratively:**
1. **Marketplace homepage** — category pill nav (`aria-pressed`) + hero value prop + horizontal "Trending Cohorts" strip (5 cards: title + "Starts [date]" badge + price) + "Learn from the best" 2–3 col instructor grid
2. **Course landing** `/courses/[slug]` — instructor hero (portrait + title + pedigree tag) + "In this course, you will…" 3-col outcome list + full-width curriculum accordion (`<details><summary>`) + sticky pricing sidebar (external Enroll `<a href>` link — NO inline payment)
3. **ExpenseTool component** — `<button aria-label="Generate expense email">` → `navigator.clipboard.writeText()` pre-written corporate reimbursement template → `role="status"` copy-confirmation
4. **TestimonialCarousel** — `aria-live="polite"` + prev/next `<button aria-label="Previous testimonial">` / `<button aria-label="Next testimonial">` + student name + verified LinkedIn title

Motion: card entrance `opacity 0→1 300ms ease-out` stagger `50ms` delay per card. `prefers-reduced-motion`: all visible immediately, `useReducedMotion()` guard.

---

### Bolt

Scaffold a cohort-based course marketplace — instructor-first, transformation-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #F8F9FA;
  --ink: #111827; --blue: #3B82F6;
  --border: #E5E7EB; --radius: 8px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `MarketplaceGrid` — category `aria-pressed` pills + course card grid. Card: instructor `<img alt="[name], [title] at [company]">` + title + `13px` uppercase "Starts [date]" badge + price → external Enroll `<a href={stripePortalUrl} rel="noopener noreferrer">`. Stagger `opacity 0→1 300ms`. `useReducedMotion()` guard.
- `CurriculumAccordion` — `<details><summary>` per week/module. Smooth height `0.3s`. `useReducedMotion()` → instant open.
- `ExpenseTool` — `<button aria-label="Generate expense email">` → `navigator.clipboard.writeText(template)` → `role="status"` "Copied to clipboard!" state. No external API calls.
- `TestimonialCarousel` — `role="region"` + `aria-live="polite"` + prev/next `aria-label` buttons + student quote + `#6B7280` verified title.

---

### Claude Artifacts

Build a self-contained cohort-based course marketplace. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type CourseCategory = 'ai' | 'product' | 'engineering' | 'design' | 'marketing'

export interface Instructor {
  id: string; name: string; title: string; company: string
  avatarSrc: string; avatarAlt: string
  students: number  // total enrolled
}

export interface CourseModule {
  week: number; title: string; lessons: string[]
}

export interface Cohort {
  slug: string; title: string; tagline: string
  category: CourseCategory
  instructor: Instructor
  startDate: string   // ISO 8601
  price: number       // USD
  modules: CourseModule[]
  stripePortalUrl: string  // external — never render as inline form
  published: boolean
}
```

Design rules:
- `border-radius: 8px` cards; `12px` instructor hero cards
- `InstructorCard`: `<img alt={`${name}, ${title} at ${company}`}>` — pedigree alt-text required on every instance
- `ExpenseTool`: `navigator.clipboard.writeText()` only — NO external API calls — `role="status"` copy confirmation required
- `TestimonialCarousel`: `aria-live="polite"` on carousel region — required
- `CourseLanding`: `<a href={cohort.stripePortalUrl} rel="noopener noreferrer">` Enroll button — NO Stripe Elements
- `generateStaticParams()` from cohort slugs. `notFound()` for unknown slugs.

---

### Grok

Implement CohortHub — cohort-based course marketplace for professional learning.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F8F9FA; --ink: #111827; --blue: #3B82F6; --border: #E5E7EB; --radius: 8px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `CourseCategory` union (ai|product|engineering|design|marketing) — `Instructor` interface (id, name, title, company, avatarSrc, avatarAlt, students) — `CourseModule` interface (week, title, lessons: string[]) — `Cohort` interface (slug, title, tagline, category, instructor, startDate, price, modules, stripePortalUrl, published)
3. `src/lib/cohorts.ts` — 12 mock `Cohort` objects across 5 categories with realistic instructor pedigrees — `src/lib/instructors.ts` — 8 featured `Instructor` objects
4. `src/app/page.tsx` — category `aria-pressed` pills + hero value prop + trending cohorts strip (5 cards with "Starts [date]" badge) + "Learn from the best" instructor grid
5. `src/app/courses/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — instructor hero (portrait + pedigree) + 3-col outcome list + `CurriculumAccordion` + sticky pricing card → `<a href={stripePortalUrl} rel="noopener noreferrer">` Enroll (no Stripe Elements)
6. `src/components/enrollment/ExpenseTool.tsx` — `<button aria-label="Generate expense email">` → `navigator.clipboard.writeText(preWrittenTemplate)` → `role="status"` "Copied to clipboard!" — NO external API calls
7. `src/components/ui/TestimonialCarousel.tsx` — `role="region"` `aria-live="polite"` — prev/next `<button aria-label>` — student quote + name + `#6B7280` verified title
8. QA: `grep -r "StripeElements\|loadStripe\|CardElement" src --include="*.tsx"` → empty — `grep -r "fetch\|axios" src/components/enrollment --include="*.tsx"` → empty (ExpenseTool uses clipboard only) — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a cohort-based course marketplace — "CohortHub" — for world-class instructor-led professional learning.

**Design layer:** `#FFFFFF` background, `#F8F9FA` surface, `#111827` text, `#3B82F6` Electric Blue for CTAs/badges/links, `#E5E7EB` borders. Typography: Inter weight 800 `clamp(32px, 5vw, 60px)` display tracking `-0.02em`; body `16px` weight 400 leading 1.6; metadata `13px` bold uppercase `letter-spacing: 0.05em`. `border-radius: 8px` cards, `12px` instructor cards.

**Data layer:** `CourseCategory` union (5 values). `Instructor` interface (id, name, title, company, avatarSrc, avatarAlt, students). `CourseModule` interface (week, title, lessons). `Cohort` interface (slug, title, category, instructor, startDate, price, modules, stripePortalUrl). `generateStaticParams()` for `[slug]`.

**Component layer:** `MarketplaceGrid` (category `aria-pressed` pills + card grid with stagger entrance). `InstructorCard` (`<img alt={pedigree-text}>` + name + title + `#3B82F6` link). `CurriculumAccordion` (`<details><summary>` weekly modules + `useReducedMotion()` guard). `ExpenseTool` (`navigator.clipboard.writeText()` + `role="status"` confirmation — no external API). `TestimonialCarousel` (`aria-live="polite"` + prev/next `aria-label` buttons). `CourseLanding` (external Enroll `<a href rel="noopener noreferrer">` — NO Stripe Elements).

**Motion layer:** Card entrance: stagger `opacity 0→1 300ms ease-out` with `50ms` delay per item. Accordion: height `0→auto 0.3s`. `prefers-reduced-motion`: all visible immediately, accordion opens instantly; `useReducedMotion()` guard on all Framer Motion components.
