# 02 — Architecture
## K-12 and Competitive Learning Platform · business_platform_03

---

### 1. Architecture Decision

Next.js monolith with CMS-backed dynamic content (programs, results, centers, teacher profiles) and API-based lead ingestion. App store redirect handled via server-side link resolution for attribution tracking.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer lead/event contracts |
| Styling | Tailwind + CSS vars | CSS-in-JS | speed + consistency |
| Content | CMS-backed collections | hardcoded arrays | non-engineering content updates |
| Lead API | server route + CRM integration | direct client CRM writes | validation and anti-spam control |
| Analytics | event schema + server/client tracking | ad-hoc inline events | attribution integrity |
| OTP | server-side verification | client-only | fraud prevention |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── results/page.tsx
│   ├── programs/page.tsx
│   ├── programs/[track]/page.tsx
│   ├── app/page.tsx
│   ├── scholarship/page.tsx
│   ├── centers/page.tsx
│   ├── centers/[city]/page.tsx
│   ├── free-class/page.tsx
│   ├── contact/page.tsx
│   ├── api/leads/route.ts
│   ├── api/scholarship/route.ts
│   ├── api/otp/route.ts
│   └── api/events/route.ts
├── components/
│   ├── proof/*
│   ├── programs/*
│   ├── app-module/*
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

- programs (exam_type, class_level, mode, duration)
- centers (city, contact, batches, map)
- result_proofs (year, exam_type, rank_bucket, methodology_note)
- leads (source, campaign, class_level, exam_intent, city)
- scholarship_registrations (eligibility, test_slot, center)
- app_install_events (source_page, platform)

---

### 5. Funnel and Event Flow

1. page view with context captured
2. CTA click event (free-class, app, scholarship, center)
3. form start event
4. OTP verification event
5. form submit event
6. server-side validation + CRM push
7. confirmation event and counselor callback trigger

---

### 6. Security and Validation

- server-side input validation on all lead routes
- OTP rate limiting (max 3 sends per phone/10 min)
- anti-spam rate limiting on form endpoints
- PII-safe logging (no phone/email in plain logs)
- signed event ingestion for analytics reliability

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_KEY=
NEXT_PUBLIC_APP_STORE_IOS=
NEXT_PUBLIC_APP_STORE_ANDROID=

CMS_READ_TOKEN=
CRM_API_KEY=
CRM_ENDPOINT=
OTP_PROVIDER_KEY=

LEAD_RATE_LIMIT_PER_MIN=20
OTP_RATE_LIMIT_PER_PHONE=3
```

---

### 8. Architecture Decision Records

- ADR-001: CMS for proof/program/center maintainability without code deploys
- ADR-002: server-side lead ingestion for validation and anti-spam control
- ADR-003: deterministic event schema for attribution quality
- ADR-004: OTP verification server-side to prevent bypass
- ADR-005: app store links resolved server-side for install attribution
