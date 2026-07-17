# 01 — Product Requirements Document
## Coaching Business Website · business_platform_01

---

### 1. Product Vision

A credibility-first coaching institute website that converts student and parent intent into counseling, scholarship registrations, and paid admissions with transparent proof and clear next steps.

**Success metric:** A mobile user can evaluate credibility, choose a relevant program/center, and submit an admissions inquiry in under 3 minutes.

---

### 2. Personas

**Aspirant Student (JEE/NEET)**
- seeks program fit and results proof
- compares course format and center access

**Parent Decision Maker**
- evaluates trust, outcomes, faculty process, support systems
- expects fee/admission clarity and counseling access

**Admissions Counselor**
- needs clean lead data and context
- needs clear source attribution and follow-up priority

**Center Coordinator**
- needs city/center-specific inquiry stream
- needs local batch and contact requests

---

### 3. Core Features

#### 3.1 Credibility and Proof
- results-proof homepage modules
- rank/result and selection metrics with year labels
- program-wise outcomes and methodology explanation

#### 3.2 Programs and Pathways
- exam-wise tracks: JEE/NEET/Foundation/Olympiad
- class-wise course matrix
- mode clarity: offline/online/hybrid
- schedule and duration highlights

#### 3.3 City/Center Discovery
- city pages and center pages
- map/contact/batch-level inquiry
- nearest center and counseling route

#### 3.4 Admissions and Scholarship Funnel
- counseling form
- scholarship test registration
- eligibility checkpoints and confirmation messaging
- support channels

#### 3.5 Parent/Student Support
- FAQ
- policy pages (admission/fee/refund/contact)
- escalation and callback request path

---

### 4. User Journeys

#### Journey 1 — First-time evaluation
1. arrive via ad/search
2. review proof/results
3. check program page
4. open city/center page
5. submit counseling form

#### Journey 2 — Scholarship-first flow
1. arrive on scholarship page
2. check eligibility and schedule
3. submit registration
4. receive confirmation and next steps

#### Journey 3 — Parent inquiry
1. compare outcomes and center options
2. review fee and support policy
3. request counselor callback

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Full LMS delivery platform | separate product scope |
| NG2 | Student social/community network | not admissions-critical |
| NG3 | Generic blog-first content strategy | conversion focus prioritized |
| NG4 | Advanced BI dashboard for all departments | phased rollout |

---

### 6. Constraints

**Technical:**
- lead capture must be server-validated
- analytics events must be deterministic and versioned
- page speed must remain high on mobile

**Business:**
- claims must include context (year/program)
- center availability and contact info must be current
- admissions terms must be visible before form submit

**Compliance:**
- no unverifiable rank claims
- no hidden fee/refund terms

---

### 7. Acceptance Criteria (Top Level)

- [ ] results modules display contextualized proof (year/program labels)
- [ ] program matrix is complete and navigable
- [ ] city/center pages are actionable with contact + map + inquiry
- [ ] counseling and scholarship forms submit valid leads
- [ ] analytics events fire correctly for CTA and form steps
- [ ] support and policy links remain visible in conversion flow

---

### 8. Appendix A — Data Model (High Level)

```
Program
  -> has exam_type, class_level, mode, duration

Center
  -> belongs to City
  -> has contact, address, map, available_batches

ResultProof
  -> has year, exam_type, rank_bucket, source_label

Lead
  -> has source, campaign, page_context, intent_type

ScholarshipRegistration
  -> has eligibility_status, test_slot, center_preference
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/results` | Results proof | No |
| `/programs` | Program matrix | No |
| `/programs/[track]` | Program detail | No |
| `/centers` | City/center index | No |
| `/centers/[city]` | City center page | No |
| `/admissions` | Counseling form | No |
| `/scholarship` | Scholarship flow | No |
| `/contact` | Contact/support | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms | No |
