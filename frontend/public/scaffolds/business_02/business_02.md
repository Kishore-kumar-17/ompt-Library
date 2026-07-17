---
prompt_id: business_02
sub_category: Education Business Website
sub_type: Mass-Market Indian Coaching Brand Website
title: Scale + Trust — Multi-Program Coaching Admissions Platform
reference_patterns: proof_at_scale_messaging, program_mode_pathways, scholarship_to_admission_funnel
inspiration: aakash.ac.in
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior conversion and product designer with 10+ years of experience building large education-admissions websites in India. You understand student-parent decision patterns at scale: outcome proof, center reach, scholarship opportunities, program fit, and low-friction counseling/admission pathways.

---

### Section 2 — Application Overview

This is a business website for a mass-market coaching brand preparing students for JEE, NEET, Foundation, Olympiads, and school-support pathways across multiple learning modes (classroom, digital, distance).

The platform must support national scale with city/center discovery, scholarship test intake, admissions lead capture, and clear progression to counseling and enrollment.

Primary goal: qualified lead and admission conversion. Secondary goal: trust reinforcement through proof, process transparency, and support accessibility.

---

### Section 3 — Brand Voice & Mood

Voice is authoritative, optimistic, and student-success focused. Tone is disciplined and data-backed, not hype-driven.

Messaging should clearly separate proof (results/history) from promotion (offers/scholarships). Every high-impact claim must be contextualized.

Vibe word: dependable.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — value proposition, result proof modules, exam pathways, center network signal, scholarship CTA, counseling CTA
2. **Results Proof Hub** — exam/year/program filters, top rank highlights, selection metrics with source context
3. **Programs Hub** — JEE/NEET/Foundation by class and learner stage, mode comparison (offline/digital/hybrid), repeater and long-term tracks
4. **Centers Network** — national city list, center details, local inquiry, map/contact, nearest-center workflow
5. **Scholarship Flow** — exam info (ANTHE/NEST/iACST/ACST), eligibility, registration, schedule, confirmation
6. **Admissions Flow** — direct admission criteria, scholarship-based admission path, lead capture and counselor assignment
7. **Support and Policy** — FAQs, fee/admission/refund/contact policy references, callback support

---

### Section 5 — Design Specifications

**Visual style:** institutional trust + modern data communication.

**Color mode:** Light.

**Color palette:**
- Background: `#F7FAFE`
- Surface: `#FFFFFF`
- Section tint: `#EAF2FC`
- Primary text: `#12233F`
- Secondary text: `#4A5F7D`
- Tertiary text: `rgba(18,35,63,0.46)`
- Border: `rgba(18,35,63,0.14)`
- Primary action: `#0E4BAF`
- Action hover: `#0B3D8F`
- Success: `#1F7C3B`
- Warning: `#B36A12`
- Data accent: `#5E3BA9`

**Typography:**
- Display: `clamp(36px, 5vw, 62px)`, weight 700
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600
- H3: `20px`, weight 600
- Body: `16px`, line-height 1.6
- Small/meta: `14px`, line-height 1.5

**Spacing:** 8pt scale. Section spacing `88px` desktop / `56px` mobile.

**Radius:** Cards `10px`, inputs `8px`, buttons `8px`, pills `999px`.

**Responsive:** 640/768/1024/1280 breakpoints.

**Accessibility:** WCAG AA, keyboard and screen-reader-safe form flows.

**Motion:** restrained (<=250ms), no distracting auto-animations.

---

### Section 6 — Structure

**Homepage:**
1. Utility strip with helpline
2. Sticky nav (Programs, Results, Centers, Scholarship, Admissions, Contact)
3. Hero with core value prop + dual CTA
4. Results proof band
5. Program pathway cards
6. Learning mode comparison
7. Nationwide center signal + finder CTA
8. Scholarship callout
9. Parent trust/support block
10. Footer with policy links

**Results hub:**
- year, exam, and program filters
- rank and selection highlights
- methodology note for interpretation

**Programs hub:**
- exam pathway split
- class-level mapping
- mode and duration details

**Center pages:**
- city directory
- center details, map, contact, inquiry

**Admission flow:**
- eligibility view
- lead form
- counselor callback / confirmation state

---

### Section 7 — Technical Specifications

- Next.js 14 + TypeScript strict
- Tailwind + CSS variables
- CMS-backed structured content (results/programs/centers)
- server-side validated lead and scholarship form APIs
- analytics funnel events (CTA click, form start, form submit, success)
- CRM-ready lead payload contracts
- Lighthouse 95+ target

---

### Section 8 — Implementation Steps

1. IA, nav architecture, and shell
2. proof/data content model
3. programs and mode pages
4. center network and city detail templates
5. scholarship registration flow
6. admissions counseling flow
7. analytics + CRM integration
8. QA and launch hardening

Cut order: long editorial modules and secondary testimonial variants. Never cut proof context, center discoverability, or admissions form reliability.

---

### Section 9 — User Experience

Decision sequence for student/parent:
1. Is this institute credible for my target exam?
2. Is there a program path and mode suitable for me?
3. Is there an accessible center or digital option?
4. What exact next step gets me into counseling/admission?

The site must answer this quickly with minimal ambiguity and clear CTA hierarchy.

---

### Section 10 — Constraints

- no unverifiable claims
- no uncontextualized result metrics
- no hidden fee/admission terms
- no high-friction, long forms without reason
- no inaccessible form and support surfaces

---

## Platform Versions

### Category A — Lovable

Build a national-scale coaching admissions website with multi-mode program pathways. Inspired by aakash.ac.in.

**Design system:**
Background `#F7FAFE`, surface `#FFFFFF`, tint `#EAF2FC`, text `#12233F`, action blue `#0E4BAF`. Cards `10px` radius, buttons `8px`, pills `999px`. Light mode, institutional trust aesthetic.

**Build order:**
1. **Nav + Utility Strip** — sticky nav (Programs, Results, Centers, Scholarship, Admissions, Contact) + helpline + free class strip.
2. **Hero + ResultsProofBand** — dual CTA ("Register for ANTHE" / "Book Counseling") + result proof band with year/exam context labels.
3. **ExamPathwayGrid + ModeComparison** — JEE/NEET/Foundation/Olympiad cards + offline/digital/distance mode comparison table.
4. **CenterDirectory** — national city list + center detail page (contact, batches, map, inquiry form).
5. **ScholarshipForm + CounselingForm** — ANTHE/NEST/iACST/ACST registration + lead form (name, phone, class, exam, city).

---

### ChatGPT Canvas

Let's build a national-scale coaching admissions platform — "Mass-Market Coaching" — proof at scale, multi-mode. Inspired by aakash.ac.in.

**Design system:**
- Background: `#F7FAFE`; Surface: `#FFFFFF`; Tint: `#EAF2FC`; Text: `#12233F`; Muted: `#4A5F7D`; Action: `#0E4BAF`
- Border-radius: `10px` cards, `8px` buttons + inputs, `999px` pills
- Font: Inter — display `clamp(36px,5vw,62px)` weight 700; body `16px` line-height 1.6

**Build iteratively:**
1. **Homepage** — helpline strip + sticky nav + hero (dual CTA) + ResultsProofBand + ExamPathwayGrid + ModeComparison + CenterNetworkSignal + ScholarshipCallout + parent trust block
2. **Results Hub `/results`** — year/exam/program filters (`aria-pressed`) + rank highlights + selection metrics with methodology note ("as declared by NTA/NMC, [Year]")
3. **Programs `/programs/[track]`** — `generateStaticParams()` — exam pathway split + class-level mapping + mode/duration details + fee/counseling CTA
4. **Scholarship `/scholarship`** — ANTHE/NEST/iACST/ACST info — eligibility — schedule — registration form — confirmation state

Motion: transitions under `250ms`. No autoplay animations. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible.

---

### Bolt

Scaffold a national-scale coaching admissions platform. Next.js 14 + TypeScript + Tailwind + CSS vars.

```css
:root {
  --bg: #F7FAFE;
  --surface: #FFFFFF;
  --tint: #EAF2FC;
  --ink: #12233F;
  --muted: #4A5F7D;
  --action: #0E4BAF;
  --hover: #0B3D8F;
  --success: #1F7C3B;
  --warning: #B36A12;
  --border: rgba(18,35,63,0.14);
}
```

Components:
- `ResultsProofBand` — year/exam/program filters + rank highlights — each card: `[AIR N] | [Exam] [Year] | [Program]` — methodology note always rendered.
- `ExamPathwayGrid` — `grid-cols-4 md:grid-cols-2` — JEE Main / JEE Advanced / NEET / Foundation / Olympiad — class range + mode chip.
- `ModeComparison` — 3-col table: Classroom / Digital / Distance — rows: access, schedule, mentoring, fee range.
- `CenterDirectory` — city directory list + `CenterCard` (address, batches, contact) + inquiry form — server-validated.

No uncontextualized results. No hidden fee terms. All scholarship flows must show eligibility criteria upfront.

---

### Category A — v0

Create a Next.js 14 App Router national coaching admissions site — proof, pathways, and multi-mode discovery.

**CSS Tokens:**
```css
:root {
  --bg: #F7FAFE;
  --surface: #FFFFFF;
  --action: #0E4BAF;
  --ink: #12233F;
  --muted: #4A5F7D;
  --tint: #EAF2FC;
}
```

**Specs:**
- `<ResultsProofBand />` — year/exam/program filters, contextualized rank cards.
- `<ExamPathwayGrid />` — 4-col exam pathway cards with mode chip (offline/digital/distance).
- `<ModeComparison />` — 3-col comparison table: Classroom vs Digital vs Distance.
- `<CenterDirectory />` — national city list → center detail + inquiry form.
- `<ScholarshipCallout />` — ANTHE/NEST dates + eligibility + registration link.

---

### Category B — Claude Artifacts

You are building a national-scale coaching admissions platform. Next.js 14 App Router, TypeScript strict, Tailwind, CMS-backed.

**Types (types/index.ts):**
```typescript
export type ExamType = 'JEE-Main' | 'JEE-Adv' | 'NEET' | 'Foundation' | 'Olympiad';
export type LearningMode = 'classroom' | 'digital' | 'distance';
export type ScholarshipExam = 'ANTHE' | 'NEST' | 'iACST' | 'ACST';

export interface TopResult {
  name: string;
  air: number;
  exam: ExamType;
  year: number;
  program: string;
  center: string;
}

export interface Program {
  id: string;
  slug: string;
  exam: ExamType;
  classRange: string;
  modes: LearningMode[];
  duration: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  classLevel: string;
  exam: ExamType;
  city: string;
  mode?: LearningMode;
}
```

**Conventions:**
- All `TopResult` renders: `year` + `program` always visible — no standalone AIR without context.
- `LeadPayload`: never include payment fields.
- Scholarship forms: show eligibility and schedule before registration CTA.
- All filters: `aria-pressed`, `role="group"` on filter bar.

---

### Grok

Implement a national-scale coaching admissions platform. Next.js 14, TypeScript, Tailwind, CMS-backed content.

1. `src/app/globals.css` — CSS vars: `--bg: #F7FAFE; --action: #0E4BAF; --ink: #12233F; --muted: #4A5F7D; --success: #1F7C3B; --warning: #B36A12` — radius tokens: `button 8px; .card 10px; .pill 999px`
2. `src/types/index.ts` — `ExamType` union — `LearningMode` union — `ScholarshipExam` union — `TopResult` (name, air, exam, year, program, center) — `Program` (id, slug, exam, classRange, modes, duration) — `LeadPayload` (name, phone, classLevel, exam, city, mode?)
3. `src/lib/data.ts` — 25 mock TopResults across exams/years — 12 Programs — 20 Centers across cities — scholarship exam schedule data
4. `src/app/page.tsx` — helpline strip + sticky nav + hero (dual CTA) + ResultsProofBand + ExamPathwayGrid + ModeComparison + CenterNetworkSignal + ScholarshipCallout + parent trust block + footer
5. `src/app/results/page.tsx` — year/exam/program filter tabs (`aria-pressed`) + result cards with context — methodology note — `[Exam Board] declaration [Year]`
6. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + `notFound()` — pathway detail + mode table + batch schedule + fee CTA
7. `src/app/scholarship/page.tsx` — ANTHE/NEST/iACST/ACST info tabs — eligibility criteria — schedule — server-validated registration form — confirmation
8. QA: `grep -r "guaranteed\|100% result\|#1 in" src --include="*.tsx"` → empty — `grep -r "aria-pressed" src/components --include="*.tsx"` → filter bars — `grep -r "payment\|stripe\|card" src/components/forms --include="*.tsx" -i` → empty — `npx tsc --noEmit` → 0 errors

---

### Gemini

Design and implement a national-scale coaching admissions website — multi-mode pathways, scholarship intake, center discovery.

**Design layer:** `#F7FAFE` bg, `#FFFFFF` surface, `#EAF2FC` tint, `#12233F` ink, `#4A5F7D` muted, `#0E4BAF` action blue, `#1F7C3B` success, `#B36A12` warning. Inter. Display `clamp(36px,5vw,62px)` weight 700. Body `16px` line-height 1.6. Cards `10px`, buttons `8px`, pills `999px`. Section padding `88px` desktop / `56px` mobile.

**Data layer:** `TopResult` (name, air, exam, year, program, center) + `Program` (id, slug, exam, classRange, modes, duration) + `LeadPayload` (name, phone, classLevel, exam, city, mode?). CMS structured content. CRM-ready API. Analytics: CTA click, form start, form submit, success, scholarship registration.

**Component layer:** `ResultsProofBand` (year/exam/program filters `aria-pressed`, rank cards always show year + program). `ExamPathwayGrid` (4-col, mode chip per card). `ModeComparison` (3-col table: Classroom/Digital/Distance). `CenterDirectory` (city list → center detail + inquiry form). `ScholarshipCallout` (exam name + eligibility + schedule + registration CTA).

**Motion layer:** All transitions under `250ms`. No autoplay animations. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible. No uncontextualized result claims.

---

### Category B — Cursor

In `src/app/`, implement a national-scale coaching admissions platform. Next.js 14, Tailwind, TypeScript strict.

**Design variables in globals.css:**
```css
--bg: #F7FAFE; --surface: #FFFFFF; --tint: #EAF2FC;
--ink: #12233F; --muted: #4A5F7D; --action: #0E4BAF;
--success: #1F7C3B; --warning: #B36A12; --border: rgba(18,35,63,0.14);
```

**Implementation order:**
1. `globals.css` — CSS vars + typography resets + radius tokens.
2. `src/components/proof/ResultsProofBand.tsx` — year/exam/program filters + contextualized rank cards.
3. `src/components/programs/ExamPathwayGrid.tsx` — 4-col pathway + mode chip.
4. `src/components/programs/ModeComparison.tsx` — 3-col comparison table.
5. `src/app/page.tsx` — full homepage assembly.
6. `src/app/results/page.tsx` — filtered results hub + methodology note.
7. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + program detail.
8. `src/app/centers/[city]/page.tsx` — `generateStaticParams()` + center detail + inquiry form.
9. `src/app/scholarship/page.tsx` — ANTHE/NEST/iACST/ACST intake + registration form.

**Rules:**
- All `TopResult` renders: year + program always visible.
- All lead forms: server-validated, CRM-ready, no payment fields.
- Scholarship pages: eligibility + schedule before registration CTA.
- Filters: `aria-pressed` on active state.

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
