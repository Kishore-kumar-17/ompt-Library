# 04 — Build Plan
## K-12 and Competitive Learning Platform · business_platform_03

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | IA, schema, CSS token setup, navigation shell |
| 1 | Proof and Credibility | 1 week | results proof modules, teacher trust section |
| 2 | Program Discovery | 1 week | program matrix, track detail pages, mode comparison |
| 3 | App Experience | 3 days | app feature module, store redirect, screen previews |
| 4 | Center Discovery | 1 week | city/center directory pages, map and contact modules |
| 5 | Admissions Funnel | 2 weeks | free class form, scholarship flow, OTP, CRM integration |
| 6 | QA and Launch | 1 week | analytics, a11y, mobile performance, launch checklist |

---

### Phase Gates

- [ ] claim-context gate: every result metric has year and program label
- [ ] form reliability gate: free class and scholarship forms validate and submit without error
- [ ] OTP gate: server-side OTP issues, verifies, and rate-limits correctly
- [ ] analytics gate: all funnel events fire with correct context payload
- [ ] accessibility gate: WCAG AA pass on all interactive elements
- [ ] performance gate: Lighthouse 95+ on mobile for homepage and free-class route

---

### Cut Order

Cut if time is short (in order):
1. secondary testimonial variants
2. long editorial about-the-pedagogy copy
3. multi-language UI toggle (defer to post-launch)

Never cut:
- proof modules and results page
- program matrix completeness
- free class and scholarship lead forms
- city/center pages with contact and inquiry CTA
