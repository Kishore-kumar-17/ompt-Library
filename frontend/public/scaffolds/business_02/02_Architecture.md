# 02 — Architecture
## Mass-Market Coaching Website · business_platform_02

---

### 1. Architecture Decision

Next.js monolith with CMS-backed content and API-based lead ingestion.

### 2. Stack

- Next.js 14
- TypeScript strict
- Tailwind + CSS vars
- CMS/content layer
- lead + scholarship APIs
- analytics event pipeline

### 3. Domain Model

- programs, tracks, centers, results_proof
- leads, scholarship_registrations, support_requests

### 4. Event and Lead Flow

- CTA click -> form start -> submit -> CRM push -> response status

### 5. Security

- server-side validation
- anti-spam/rate limit
- PII-safe logging
