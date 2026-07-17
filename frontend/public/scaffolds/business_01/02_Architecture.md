# 02 — Architecture
## Coaching Business Website · business_platform_01

---

### 1. Architecture Decision

Next.js monolith with CMS-backed dynamic content and API-based lead ingestion. This keeps publishing and admissions operations fast while preserving reliability and analytics consistency.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer lead/event contracts |
| Styling | Tailwind + CSS vars | CSS-in-JS | speed + consistency |
| Content | CMS-backed collections | hardcoded markdown-only | non-engineering content updates |
| Lead API | server route + CRM integration | direct client CRM writes | validation and anti-spam control |
| Analytics | event schema + server/client tracking | ad-hoc inline events | attribution integrity |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── results/page.tsx
│   ├── programs/page.tsx
│   ├── programs/[track]/page.tsx
│   ├── centers/page.tsx
│   ├── centers/[city]/page.tsx
│   ├── admissions/page.tsx
│   ├── scholarship/page.tsx
│   ├── contact/page.tsx
│   ├── api/leads/route.ts
│   ├── api/scholarship/route.ts
│   └── api/events/route.ts
├── components/
│   ├── proof/*
│   ├── programs/*
│   ├── centers/*
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

- programs
- tracks
- centers
- cities
- result_proofs
- leads
- scholarship_registrations
- support_requests

---

### 5. Funnel and Event Flow

1. page view context captured
2. CTA click event
3. form start event
4. form submit event
5. server-side validation
6. CRM lead push and status response

---

### 6. Security and Validation

- server-side input validation
- anti-spam/rate limiting on forms
- PII-safe logging policy
- signed/validated event ingestion where required

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_KEY=

CMS_READ_TOKEN=
CRM_API_KEY=
CRM_ENDPOINT=

LEAD_RATE_LIMIT_PER_MIN=20
```

---

### 8. Architecture Decision Records

- ADR-001: CMS for proof/program/center content maintainability
- ADR-002: server-side lead ingestion for validation and anti-spam
- ADR-003: deterministic event schema for attribution quality
- ADR-004: page-level conversion context attached to lead payload
