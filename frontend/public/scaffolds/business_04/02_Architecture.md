# 02 — Architecture
## Career Acceleration & Tech Upskilling Platform · business_platform_04

---

### 1. Architecture Decision

Next.js monolith with CMS-backed dynamic content (programs, mentor profiles, placement proof, cohort data) and API-based lead ingestion. Scholarship assessment delivered client-side with server-validated scoring.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer lead/event contracts |
| Styling | Tailwind + CSS vars | CSS-in-JS | speed + consistency |
| Content | CMS-backed collections | hardcoded arrays | mentor/placement data updates without code deploys |
| Lead API | server route + CRM integration | direct client CRM writes | validation and anti-spam control |
| Analytics | event schema + server/client tracking | ad-hoc inline events | funnel attribution integrity |
| Assessment | client-rendered + server validation | client-only scoring | prevent score manipulation |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── placements/page.tsx
│   ├── programs/page.tsx
│   ├── programs/[track]/page.tsx
│   ├── mentors/page.tsx
│   ├── scholarship/page.tsx
│   ├── fees/page.tsx
│   ├── demo/page.tsx
│   ├── contact/page.tsx
│   ├── api/leads/route.ts
│   ├── api/demo/route.ts
│   ├── api/scholarship/route.ts
│   └── api/events/route.ts
├── components/
│   ├── placement-proof/*
│   ├── programs/*
│   ├── mentors/*
│   ├── scholarship/*
│   ├── forms/*
│   └── layout/*
├── lib/
│   ├── cms/*
│   ├── crm/*
│   ├── analytics/*
│   └── validation/*
└── types/index.ts
```

---

### 4. Domain Model (High Level)

- programs (track, duration, curriculum_modules, mode)
- mentors (name, company, role, years_experience, specialization)
- placement_proofs (cohort_year, program, avg_salary_hike_pct, median_ctc, company_count)
- leads (source, campaign, program_interest, current_role, experience_years, city)
- scholarship_assessments (score, scholarship_tier, eligibility_status)
- enrollment_cohorts (batch_start, seats_remaining, program)

---

### 5. Funnel and Event Flow

1. page view with source/campaign context captured
2. CTA click event (demo, inquiry, scholarship, mentor)
3. form start event with program context
4. form submit event
5. server-side validation + CRM push with enriched payload
6. confirmation + counselor assignment trigger
7. scholarship assessment complete event with tier reveal

---

### 6. Security and Validation

- server-side input validation on all lead and demo routes
- scholarship score validated server-side (client cannot manipulate tier)
- anti-spam rate limiting on all form endpoints
- PII-safe logging (no phone/email in plain logs)
- employment/salary data not stored beyond lead context

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_KEY=

CMS_READ_TOKEN=
CRM_API_KEY=
CRM_ENDPOINT=

LEAD_RATE_LIMIT_PER_MIN=20
SCHOLARSHIP_ASSESSMENT_SECRET=
```

---

### 8. Architecture Decision Records

- ADR-001: CMS for mentor profiles and placement proof maintainability without code deploys
- ADR-002: server-side lead ingestion with role/experience enrichment for CRM segmentation
- ADR-003: deterministic event schema for funnel attribution quality
- ADR-004: server-side scholarship scoring to prevent tier manipulation
- ADR-005: cohort seat count updated via CMS to create authentic urgency signals
