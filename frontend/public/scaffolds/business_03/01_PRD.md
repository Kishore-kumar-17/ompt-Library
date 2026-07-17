# 01 — Product Requirements Document
## K-12 and Competitive Learning Platform · business_platform_03

---

### 1. Product Vision

A proof-led edtech admissions website that converts parent and student intent into free class bookings, app installs, scholarship registrations, and counseling leads — with every claim backed by contextual outcome data.

**Success metric:** A mobile parent can evaluate the platform's credibility, identify the right program for their child, and submit a free class request in under 2 minutes.

---

### 2. Personas

**K-12 Parent**
- primary decision maker for school-age children
- evaluates teacher quality, personalization, and proof of grade improvement
- expects free trial before financial commitment

**JEE / NEET Aspirant**
- evaluates selection rates and coaching methodology
- compares offline vs online vs hybrid options
- may arrive via scholarship exam interest

**Counselor (internal)**
- needs clean lead payload with class, city, and exam intent
- needs source attribution for follow-up prioritization

**Scholarship Coordinator**
- manages test registration, eligibility checks, and confirmation flow

---

### 3. Core Features

#### 3.1 Proof and Credibility
- results-proof homepage band with student outcome counts
- year-labeled and program-labeled result highlights
- app adoption and usage metrics as secondary proof

#### 3.2 Programs and Pathways
- K-12 class-wise learning pathways (Class 4–12)
- JEE / NEET / Foundation / Olympiad tracks
- mode comparison: online, offline, hybrid
- schedule and pedagogy summary per program

#### 3.3 App Experience Module
- app feature highlights (personalization, adaptive practice, live doubt resolution)
- app store download CTA with rating badge
- screen previews with captions

#### 3.4 Free Trial / Demo Flow
- student name + class
- parent contact + city
- OTP verification
- counselor callback confirmation

#### 3.5 Scholarship / Exam Flow
- eligibility input
- test center and slot selection
- registration confirmation with next steps

#### 3.6 City / Center Discovery
- city index and center pages
- batch schedule and fee inquiry
- map and local contact

#### 3.7 Support and Policy
- fee and refund policy
- FAQ with parent and student segments
- contact and escalation path

---

### 4. User Journeys

#### Journey 1 — First-time parent evaluation
1. arrives via search/ad
2. reviews proof metrics and results
3. checks program page for child's class
4. starts free class booking form
5. receives confirmation and counselor call

#### Journey 2 — Scholarship-first student
1. arrives on scholarship exam page
2. checks eligibility
3. registers for test slot and center
4. receives confirmation

#### Journey 3 — City/center inquiry
1. searches for nearest center
2. views batch schedule and fee
3. submits demo booking

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Full LMS and live class delivery platform | separate product |
| NG2 | Student community and peer features | not admissions-critical |
| NG3 | Long editorial content strategy | conversion focus |
| NG4 | Advanced analytics dashboard | phased rollout |

---

### 6. Constraints

**Technical:**
- lead capture server-validated; no direct client CRM writes
- analytics events deterministic and versioned
- Lighthouse 95+ on mobile

**Business:**
- all claims include year and program context
- fee/refund policy visible before form submission
- center contact data must be current

**Compliance:**
- no unverifiable rank or selection claims
- no hidden refund or cancellation terms

---

### 7. Acceptance Criteria (Top Level)

- [ ] proof modules display year-labeled and program-labeled metrics
- [ ] program matrix navigable by class and exam type
- [ ] free class form captures all required fields and submits successfully
- [ ] scholarship flow registers and confirms
- [ ] city/center pages show contact, batch, and inquiry CTA
- [ ] analytics events fire for CTA clicks, form starts, and submissions

---

### 8. Appendix A — Data Model (High Level)

```
Program
  -> exam_type (K12 | JEE | NEET | Foundation | Olympiad)
  -> class_level (4-12)
  -> mode (online | offline | hybrid)
  -> duration, schedule

Center
  -> belongs_to City
  -> has contact, address, map, available_batches, fee_range

ResultProof
  -> year, exam_type, rank_bucket, methodology_note

Lead
  -> source, campaign, page_context, class_level, exam_intent, city

ScholarshipRegistration
  -> eligibility_status, test_slot, center_preference

AppInstall
  -> source_page, install_intent, platform (iOS | Android)
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/results` | Results proof | No |
| `/programs` | Program matrix | No |
| `/programs/[track]` | Program detail | No |
| `/app` | App experience | No |
| `/scholarship` | Scholarship flow | No |
| `/centers` | City/center index | No |
| `/centers/[city]` | City center page | No |
| `/free-class` | Free class booking | No |
| `/contact` | Contact/support | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms | No |
