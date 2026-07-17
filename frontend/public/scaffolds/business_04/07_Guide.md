# 07 — Guide
## Career Acceleration & Tech Upskilling Platform · business_platform_04

---

### 1. Engineering Rules

- all salary and placement claims must include cohort year and program context — no bare percentages
- scholarship assessment scores must be validated server-side; client must never compute final tier
- lead payload must include source page, program interest, current role, and experience years
- CRM push must be idempotent (duplicate demo form submits must not create duplicate leads)
- `--salary-accent` green must only appear on salary hike numbers — never on buttons, cards, or backgrounds

---

### 2. Data Rules

- normalize placement data by cohort_year / program_track / outcome_type
- include program, background, and campaign context in every lead payload
- scholarship assessment results must include score, tier, and eligible_programs before CRM push
- cohort seat count must be sourced from CMS — never hardcoded in component
- retain event schema versioning for analytics attribution

---

### 3. Security Rules

- CRM credentials stored server-side only; never exposed to client
- scholarship scoring endpoint protected from direct client manipulation (no GET with score param)
- all form input sanitized and validated server-side
- no PII (phone, email, salary details) in plain server logs
- EMI/financing eligibility logic must not be bypassable via client-side manipulation

---

### 4. Testing Rules

- unit tests for: scholarship tier assignment logic, form validators, placement filter logic
- integration tests for: `/api/demo` submit → CRM push → counselor assignment → confirmation
- integration tests for: `/api/scholarship` score → tier → eligible program list
- analytics event assertions for: CTA click, form start, assessment step complete, form submit
- mobile regression: demo booking form usable on 360px viewport without horizontal scroll

---

### 5. Common Mistakes

| Mistake | Fix |
|---------|-----|
| Salary metric without cohort year ("150% average hike") | Add year label ("150% avg hike, 2024 cohort") |
| Scholarship tier computed client-side | Move scoring to `/api/scholarship`; client sends answers, server returns tier |
| `--salary-accent` on a card background | Salary accent is text-only; card backgrounds use `--bg-surface` |
| Mentor profile with former company | Update CMS content; display current company and role only |
| Long enrollment form on one screen | Split into 3 steps: (1) program + background, (2) contact + city, (3) confirmation |
| Inconsistent CTA label across pages | "Book Demo" everywhere — never "Register", "Enquire", or "Start" |
| Cohort seat count hardcoded in JSX | Fetch from CMS; do not hardcode urgency figures |
| Hidden refund terms below fold near enrollment CTA | Policy link visibly above or inline with submit button |
