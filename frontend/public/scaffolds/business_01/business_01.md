---
prompt_id: business_01
sub_category: Education Business Website
sub_type: Competitive Exam Coaching Institute
title: Results-Led Trust — IIT-JEE / NEET Coaching Website
reference_patterns: proof_first_credibility, results_to_enrollment_funnel, city_center_discovery
inspiration: allen.in
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior product and conversion designer with 10+ years of experience building education and admissions funnels for large coaching institutions. You understand high-stakes parent-student decision behavior: proof of results, faculty trust, course clarity, center access, and frictionless admission flow.

---

### Section 2 — Application Overview

This is a business website for a top Indian coaching institute preparing students for IIT-JEE, NEET-UG, Olympiads, and foundation programs. The platform must convert high-intent traffic into counseling, lead capture, scholarship test registrations, and paid admissions.

Core website areas: Homepage, Results & Toppers, Programs, City/Center pages, Fee/Admission flow, Scholarship Test pages, Student/Parent support, and Contact/Counseling.

Primary goal: admissions conversion. Secondary goal: trust reinforcement via verifiable outcomes and academic systems.

---

### Section 3 — Brand Voice & Mood

Voice is authoritative, clear, and aspirational without exaggeration. Tone should be serious, student-centered, and outcomes-oriented.

Avoid hype-heavy claims. Use concrete data, transparent terms, and clear CTAs.

Vibe word: credible.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — hero value proposition, result proof blocks, course pathways (JEE/NEET/Foundation), center discovery, scholarship CTA, counseling CTA
2. **Results & Toppers** — rank/result highlights, year-wise filters, program-wise outcomes, success statistics with definitions
3. **Programs** — class-wise and exam-wise course structure, duration, pedagogy, test schedule, mode (offline/online/hybrid)
4. **City/Center Pages** — center locations, facilities, batches, contact details, map, nearest test center info
5. **Admissions Flow** — lead form, counseling slot booking, eligibility checkpoints, payment entry points, confirmation and support
6. **Scholarship Test Flow** — test details, eligibility, schedule, registration form, admit card/status links
7. **Student/Parent Support** — FAQ, fee policy, refund policy, grievance and contact flow

---

### Section 5 — Design Specifications

**Visual style:** institutional and confidence-led. Clean layouts with data-driven proof modules.

**Color mode:** Light with strong contrast accents.

**Color palette:**
- Background: `#F8FAFD`
- Surface: `#FFFFFF`
- Section tint: `#EDF3FA`
- Primary text: `#152238`
- Secondary text: `#4C5C72`
- Border: `rgba(21,34,56,0.14)`
- Primary action: `#0F4AA8`
- Action hover: `#0C3A84`
- Accent success: `#1E7D3A`
- Accent warning: `#B26A12`
- Accent data: `#5E3AA8`

**Typography:**
- Display: `clamp(36px, 5vw, 62px)`, weight 700
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600
- H3: `20px`, weight 600
- Body: `16px`, line-height 1.6
- Small/meta: `14px`, line-height 1.5

**Spacing:** 8pt system. Section spacing `88px` desktop / `56px` mobile.

**Radius:** Cards `10px`, inputs `8px`, buttons `8px`, pills `999px`.

**Responsive:** 640/768/1024/1280 breakpoints.

**Accessibility:** WCAG AA, clear focus rings, semantic form labels, keyboard navigation for filters and forms.

**Motion:** restrained. transitions under 250ms; no distracting autoplay loops.

---

### Section 6 — Structure

**Homepage:**
1. Utility strip (helpline/admission hotline)
2. Sticky nav with Programs, Results, Centers, Scholarship, Contact
3. Hero with core value proposition and CTA pair
4. Results proof strip (rankers, selections, stats)
5. Program pathways cards
6. Center finder by city
7. Scholarship exam CTA
8. Parent trust and support block
9. Footer with policy and compliance links

**Results page:**
- year filters
- exam filters (JEE Main/Adv, NEET)
- top rank highlights with context notes

**Program page:**
- course matrix by class and exam
- batch details and schedule
- fee/counseling CTA

**City page:**
- center details, contact, map, inquiry form

**Admission flow:**
- lead form -> counseling slot -> program match -> payment/start

---

### Section 7 — Technical Specifications

- Next.js 14 + TypeScript strict
- Tailwind + CSS vars
- CMS-backed dynamic sections for results/programs/centers
- Form backend (CRM-ready lead capture)
- Event tracking for CTA funnel (view -> click -> form submit)
- Performance target: Lighthouse 95+ core pages

---

### Section 8 — Implementation Steps

1. Global shell and nav IA
2. Results proof modules
3. Program matrix pages
4. City/center locator templates
5. Admission and scholarship forms
6. Support and policy pages
7. analytics instrumentation and QA

Cut order: editorial storytelling modules and secondary testimonials. Never cut results proof, center discovery, or admission funnel clarity.

---

### Section 9 — User Experience

Users (students and parents) evaluate in this order:
1. Is this institute credible?
2. Are outcomes proven and relevant to my exam?
3. Is there a center/mode that fits my constraints?
4. What is the next step to enroll?

The website must answer these in under 2–3 scrolls with clear CTAs and minimal ambiguity.

---

### Section 10 — Constraints

- no unverifiable claims
- no hidden fee/admission terms
- no vague results without context/year/program labels
- no inaccessible lead forms
- no cluttered CTA hierarchy that confuses enrollment path

---

## Platform Versions

### Category A — Lovable

Build a conversion-focused IIT-JEE/NEET coaching website with results-proof architecture. Inspired by allen.in.

**Design system:**
Background `#F8FAFD`, surface `#FFFFFF`, tint `#EDF3FA`, text `#152238`, action blue `#0F4AA8`. Cards `10px` radius, buttons `8px`, pills `999px`. Restrained motion — transitions under `250ms`.

**Build order:**
1. **Nav + Utility Strip** — sticky nav (Programs, Results, Centers, Scholarship, Contact) + helpline strip above.
2. **Hero + ResultsProofBand** — core value prop + CTA pair ("Book Counseling" / "Scholarship Test") + ranker stats strip (AIR-1 JEE, NEET selections, year-labeled).
3. **ProgramPathwayGrid** — 4-col cards: JEE Main, JEE Advanced, NEET, Foundation, Olympiad — each with class range, mode chip, CTA.
4. **CityCenterFinder** — city search → center detail card (address, batches, contact, map) + local inquiry form.
5. **ScholarshipCTA + CounselingForm** — scholarship test registration band + lead capture (name, phone, class, exam, city).

---

### ChatGPT Canvas

Let's build a results-led coaching admissions website — "IIT-JEE/NEET Coaching" — institutional trust, proof-first. Inspired by allen.in.

**Design system:**
- Background: `#F8FAFD`; Surface: `#FFFFFF`; Tint: `#EDF3FA`; Text: `#152238`; Muted: `#4C5C72`; Action: `#0F4AA8`
- Border-radius: `10px` cards, `8px` buttons + inputs, `999px` pills
- Font: Inter — display `clamp(36px,5vw,62px)` weight 700; body `16px` line-height 1.6

**Build iteratively:**
1. **Homepage** — utility helpline strip + sticky nav + hero (value prop + dual CTA) + ResultsProofBand + ProgramPathwayGrid + CityCenterFinder + ScholarshipCTA + CounselingForm footer
2. **Results `/results`** — year/exam/program filter tabs (`aria-pressed`) + AIR rank cards with context note (year + program label always visible) + methodology disclaimer
3. **Programs `/programs/[track]`** — `generateStaticParams()` — course matrix by class/exam + mode comparison (offline/online/hybrid) + batch schedule + fee/counseling CTA
4. **Admissions `/admissions`** — lead form (name, phone, class, exam, city) + counseling slot booking + eligibility checkpoint + confirmation state

Motion: transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all transitions. Focus rings always visible on all interactive elements.

---

### Bolt

Scaffold a results-led coaching admissions platform. Next.js 14 + TypeScript + Tailwind + CSS vars.

```css
:root {
  --bg: #F8FAFD;
  --surface: #FFFFFF;
  --tint: #EDF3FA;
  --ink: #152238;
  --muted: #4C5C72;
  --action: #0F4AA8;
  --hover: #0C3A84;
  --success: #1E7D3A;
  --border: rgba(21,34,56,0.14);
}
```

Components:
- `ResultsProofBand` — year/exam/program filter pills (`aria-pressed`) + rank cards with `AIR [N] | [Exam] [Year] | [Program]` context — never uncontextualized results.
- `ProgramPathwayGrid` — `grid-cols-4 md:grid-cols-2 sm:grid-cols-1` — each card: exam label, class range, mode chip (offline/online/hybrid), counseling CTA.
- `CityCenterFinder` — city combobox → center detail (address, batches, contact) + map embed + inquiry form `name+phone+city`.
- `CounselingForm` — fields: `name`, `phone`, `class`, `exam`, `city` — server-validated — CRM-ready payload — confirmation state.

No unverifiable claims. All results must include year + program label. Lead forms: no payment fields.

---

### Category A — v0

Create a Next.js 14 App Router coaching admissions site with data-led credibility and lead form UX.

**CSS Tokens:**
```css
:root {
  --bg: #F8FAFD;
  --surface: #FFFFFF;
  --action: #0F4AA8;
  --ink: #152238;
  --muted: #4C5C72;
  --tint: #EDF3FA;
}
```

**Specs:**
- `<ResultsProofBand />` — year/exam filter pills, top ranker cards with AIR + year + program context.
- `<ProgramGrid />` — 4-col exam pathway cards with mode chip and class range.
- `<CityCenterFinder />` — city combobox + center detail card + local inquiry form.
- `<ScholarshipCTA />` — prominent registration band with test schedule and eligibility link.

No vague results. All CTAs lead to a clear next action. Form fields: name, phone, class, exam, city only.

---

### Category B — Claude Artifacts

Build `business_01` — a results-led IIT-JEE / NEET coaching admissions website. Inspired by allen.in. Next.js 14 App Router + TypeScript strict + Tailwind CSS + CSS custom properties. Inter font via `next/font/google`.

**globals.css (define first):**
```css
:root {
  --bg:      #F8FAFD;
  --surface: #FFFFFF;
  --tint:    #EDF3FA;
  --ink:     #152238;
  --muted:   #4C5C72;
  --border:  rgba(21, 34, 56, 0.14);
  --action:  #0F4AA8;
  --hover:   #0C3A84;
  --success: #1E7D3A;
  --warning: #B26A12;
  --data:    #5E3AA8;
}
body { background: var(--bg); color: var(--ink); }
* { box-sizing: border-box; }
```

**File structure:**
```
src/
  types/index.ts
  lib/
    data.ts              — 20 TopRankers, 10 Programs, 15 Centers (mock)
    validateLead.ts      — Zod schema for LeadPayload server validation
  app/
    layout.tsx           — Inter font, globals.css, StickyNav + HelplineStrip
    page.tsx             — Homepage: all 8 sections assembled
    results/page.tsx     — ResultsProofBand with year/exam/program filters
    programs/
      [track]/page.tsx   — generateStaticParams + notFound + course matrix
    centers/
      [city]/page.tsx    — generateStaticParams + notFound + center detail + form
    admissions/page.tsx  — CounselingForm + slot booking + confirmation
    globals.css
  components/
    layout/
      HelplineStrip.tsx  — server, admission hotline number, top bar
      StickyNav.tsx      — 'use client', scroll-aware bg, Programs/Results/Centers/Scholarship
    home/
      Hero.tsx           — server, value prop + dual CTA (Book Counseling / Scholarship Test)
      ResultsProofBand.tsx — 'use client', year+exam+program filter pills, rank cards
      ProgramPathwayGrid.tsx — server, 4-col exam pathway cards
      CityCenterFinder.tsx — 'use client', city combobox + center detail + inquiry form
      ScholarshipCTA.tsx — server, registration band, test schedule link
    forms/
      CounselingForm.tsx — 'use client', 5-field lead, server action validation
```

**types/index.ts:**
```typescript
export type Exam = 'JEE-Adv' | 'JEE-Main' | 'NEET' | 'Olympiad' | 'Foundation'
export type Mode = 'offline' | 'online' | 'hybrid'

export interface TopRanker {
  name: string
  air: number           // All India Rank
  exam: Exam
  year: number          // REQUIRED — never omit
  program: string       // REQUIRED — e.g. "JEE Advanced 2-Year Classroom"
  center: string
}

export interface Program {
  id: string; slug: string; title: string
  exam: Exam; classRange: string   // e.g. "Class 11–12"
  mode: Mode; duration: string; batchStart: string
}

export interface Center {
  city: string; slug: string
  address: string; phone: string
  batches: string[]    // e.g. ["Morning 7am", "Evening 5pm"]
  mapEmbedUrl: string
}

export interface LeadPayload {
  name: string; phone: string
  classLevel: string; exam: Exam; city: string
  // NEVER add: payment, card, amount, price fields
}
```

**Critical rules:**
1. Every `TopRanker` card must render `year` and `program` — never just name + AIR alone
2. No unverifiable claims — `grep -r "guaranteed rank\|#1 in India\|best results" src` must return empty
3. `LeadPayload` must never contain payment, card, or pricing fields — server-side check
4. Filter controls: `aria-pressed={isActive}` on pill buttons — never `<input type="radio">`
5. `generateStaticParams()` + `notFound()` on every `[track]` and `[city]` dynamic route
6. Forms: server action with Zod validation — client-side validation is UX-only, never the gate
7. Policy links (fee policy, refund, scholarship terms) must be visible within one scroll of every CTA

**Mistakes to avoid:**
- Do not display `AIR 1` or `Rank 1` without exam + year + program context
- Do not put payment fields in `CounselingForm` — it is a lead form, not a payment form
- Do not use `bg-white` — use `bg-[var(--surface)]`
- Do not use generic Tailwind colors (`text-gray-700`) — use CSS custom properties
- Do not use `useEffect` for form submission — use Server Actions
- Do not omit `aria-pressed` on filter pills — keyboard users must know which filter is active
- Do not hardcode city names in components — derive from `Centers` data array

---

### Grok

Implement a results-led IIT-JEE/NEET coaching admissions website. Next.js 14, TypeScript, Tailwind, CMS-backed.

1. `src/app/globals.css` — CSS vars: `--bg: #F8FAFD; --action: #0F4AA8; --ink: #152238; --muted: #4C5C72; --success: #1E7D3A` — `button { border-radius: 8px } .card { border-radius: 10px } .pill { border-radius: 999px }`
2. `src/types/index.ts` — `TopRanker` (name, air, exam, year, program, center) — `Program` (id, slug, title, exam, classRange, mode, duration, batchStart) — `Center` (city, address, contact, batches: string[]) — `LeadPayload` (name, phone, classLevel, exam, city)
3. `src/lib/data.ts` — 20 mock TopRankers with AIR/year/program context — 10 Programs — 15 Centers with city + batch data
4. `src/app/page.tsx` — helpline strip + sticky nav + Hero (dual CTA) + ResultsProofBand + ProgramPathwayGrid + CityCenterFinder + ScholarshipCTA + CounselingForm
5. `src/app/results/page.tsx` — year/exam/program filter tabs (`aria-pressed`) + ranker cards — context note "Results as declared by [Exam Board], [Year]" — methodology disclaimer
6. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + `notFound()` — course matrix + mode comparison + batch schedule + counseling CTA
7. `src/app/centers/[city]/page.tsx` — `generateStaticParams()` + `notFound()` — center detail + map + server-validated inquiry form
8. QA: `grep -r "unverifiable\|#1 in India\|guaranteed rank" src --include="*.tsx"` → empty — `grep -r "aria-pressed" src/components --include="*.tsx"` → filter components — `grep -r "payment\|card\|stripe" src/components/forms --include="*.tsx" -i` → empty — `npx tsc --noEmit` → 0 errors

---

### Gemini

Design and implement a results-led coaching admissions website — institutional trust, proof-first, JEE/NEET focused.

**Design layer:** `#F8FAFD` bg, `#FFFFFF` surface, `#EDF3FA` tint, `#152238` ink, `#4C5C72` muted, `#0F4AA8` action blue. Inter. Display `clamp(36px,5vw,62px)` weight 700. Body `16px` line-height 1.6. Cards `10px`, buttons `8px`, pills `999px`. Section padding `88px` desktop / `56px` mobile. Grid gaps `20px`.

**Data layer:** `TopRanker` (name, air, exam, year, program, center) + `Program` (id, slug, exam, classRange, mode, duration) + `Center` (city, contact, batches) + `LeadPayload` (name, phone, classLevel, exam, city). CMS-backed structured content. CRM-ready lead API. Analytics: CTA click, form start, form submit, success.

**Component layer:** `ResultsProofBand` (year/exam/program filters `aria-pressed`, rank cards with year + program context always visible). `ProgramPathwayGrid` (4-col `grid-cols-4 md:grid-cols-2`, mode chip, counseling CTA). `CityCenterFinder` (city combobox → center detail + inquiry form). `CounselingForm` (5-field lead, server-validated, CRM payload).

**Motion layer:** All transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all transitions. Focus rings always visible. No unverifiable claims in any component.

---

### Category B — Cursor

In `src/app/`, implement a results-led coaching admissions website. Next.js 14, Tailwind, TypeScript strict.

**Design variables in globals.css:**
```css
--bg: #F8FAFD; --surface: #FFFFFF; --tint: #EDF3FA;
--ink: #152238; --muted: #4C5C72; --action: #0F4AA8;
--success: #1E7D3A; --border: rgba(21,34,56,0.14);
```

**Implementation order:**
1. `globals.css` — CSS vars + typography resets + `8px`/`10px`/`999px` radius tokens.
2. `src/components/proof/ResultsProofBand.tsx` — year/exam/program filter + ranker cards with context.
3. `src/components/programs/ProgramGrid.tsx` — pathway matrix with mode comparison.
4. `src/app/page.tsx` — homepage assembly (strip + nav + hero + proof + programs + centers + CTA).
5. `src/app/results/page.tsx` — filtered results hub with methodology note.
6. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + program detail + CTA.
7. `src/app/centers/[city]/page.tsx` — `generateStaticParams()` + center detail + inquiry form.
8. `src/app/admissions/page.tsx` — multi-step lead form + counseling slot + confirmation.

**Rules:**
- All results: `year` + `program` context always rendered — no exceptions.
- All lead forms: server-validated, CRM-ready, no payment fields.
- All filters: `aria-pressed` on active state.
- No unverifiable claims — no "guaranteed rank" or "100% result" copy.

---

## Review Notes

- Lovable:
- Replit:
- Bolt:
- v0:
- Claude Code:
- Codex:
- Gemini:
- Cursor:
- Overall score: /5
- What to fix:
