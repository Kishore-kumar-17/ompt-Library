# 07 — Guide
## Mass-Market Coaching Website · business_platform_02

---

### 1. Engineering Rules

- claims must remain contextualized and attributable (year, program, source)
- forms must be validated server-side — never trust client-only validation
- CTA hierarchy must stay consistent across all pages (primary → secondary → ghost)
- policy and support visibility must be preserved near every conversion surface
- all city/center pages must be statically generated (SSG) for SEO and speed

---

### 2. Data Rules

- normalize result data by year, program, and source before rendering
- include page and funnel context in every lead payload (utm_source, page_slug, form_id)
- retain event schema versioning for analytics — do not mutate existing event shapes
- scholarship and counseling submissions must be idempotent (no duplicate lead creation on retry)

---

### 3. Security Rules

- protect CRM API credentials server-side via environment variables — never expose in client bundle
- sanitize and validate all user input (name, phone, email) before passing to CRM or database
- avoid PII in logs — mask phone numbers and emails in server logs
- rate-limit lead and scholarship form endpoints to prevent spam bursts

---

### 4. Testing Rules

- unit tests for all form validation logic (required fields, phone format, email format)
- integration tests for lead submission and scholarship registration flows end-to-end
- analytics event assertions for core funnel steps (page view → CTA click → form submit → confirmation)
- regression tests for mobile form usability across iOS Safari and Android Chrome

---

### 5. Common Mistakes

- uncontextualized claims ("top results", "best institute") without year/source qualifier
- inconsistent CTA labels between homepage, program pages, and center pages
- overlong form flows (more than 5 fields above the fold) that reduce completion rate
- hidden support policy links that force users to search before they can trust the form
- missing `aria-label` on icon-only CTAs and map embeds
