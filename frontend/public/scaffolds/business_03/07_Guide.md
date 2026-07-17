# 07 — Guide
## K-12 and Competitive Learning Platform · business_platform_03

---

### 1. Engineering Rules

- all result claims must include year and program context — no bare metrics
- OTP must be issued and verified server-side; client must not receive the OTP value
- lead payload must include source page, campaign, class level, and exam intent
- CRM push must be idempotent (duplicate form submits must not create duplicate leads)
- app store redirect links must route through a server-side attribution endpoint

---

### 2. Data Rules

- normalize result data by year / exam_type / rank_bucket / source_label
- include page and funnel context in every lead payload
- scholarship registrations must include eligibility_status and test_slot before CRM push
- retain event schema versioning for analytics attribution

---

### 3. Security Rules

- CRM credentials stored server-side only; never exposed to client
- OTP rate-limited: max 3 sends per phone number per 10-minute window
- all form input sanitized and validated server-side
- no PII (phone, email, student name) in plain server logs
- scholarship slot data must not be modifiable via client-side request

---

### 4. Testing Rules

- unit tests for: `calculateOTPExpiry`, form validators, result filter logic
- integration tests for: `/api/leads` submit → CRM push → confirmation
- integration tests for: `/api/otp` issue → verify → rate limit
- analytics event assertions for: CTA click, form start, OTP sent, form submit
- mobile regression: free class form usable on 360px viewport without horizontal scroll

---

### 5. Common Mistakes

| Mistake | Fix |
|---------|-----|
| Result metric without year context ("5 lakh students") | Add year label ("5 lakh students as of 2024") |
| OTP verification client-side only | Move to `/api/otp` route; client sends code, server verifies |
| App store link with no tracking | Route through attribution endpoint with source_page param |
| Long free class form on one screen | Split into 2 steps: (1) student details, (2) OTP verification |
| Inconsistent CTA label across pages | "Book Free Class" everywhere — never "Register", "Sign Up", or "Start" |
| Scholarship slot double-booking | Server-side slot reservation with idempotency key |
| Hidden refund terms below fold on form page | Add policy link visibly above submit button |
