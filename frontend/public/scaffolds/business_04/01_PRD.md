# 01 — Product Requirements Document
## Career Acceleration & Tech Upskilling Platform · business_platform_04

---

### 1. Product Vision

A placement-proof-led career platform website that converts working professionals and fresh graduates into demo bookings, program inquiries, and cohort enrollments — with verifiable salary and company outcomes as the primary trust mechanism.

**Success metric:** A working professional can evaluate placement outcomes, identify the right upskilling track, and book a demo session in under 3 minutes.

---

### 2. Personas

**Working Professional (0–5 years experience)**
- wants to switch to higher-paying tech roles
- evaluates salary hike data, company placements, and mentor quality
- needs EMI/financing clarity before committing

**Fresh Graduate**
- wants to break into product companies with structured DSA/system design prep
- evaluates cohort success rate and alumni network
- scholarship eligibility is a key hook

**Enrollment Counselor (internal)**
- needs clean lead payload with current role, target role, and program interest
- needs income and work experience data for program recommendation

**Mentor Coordinator**
- manages mentor profiles, availability, and session data

---

### 3. Core Features

#### 3.1 Placement Proof
- salary hike percentages by cohort and year
- company logos (hiring partners) with count
- individual alumni stories with before/after salary
- methodology notes explaining what metrics mean

#### 3.2 Programs and Tracks
- Software Development (DSA + system design)
- Data Science and Machine Learning
- Product Management
- Advanced Engineering (backend / full-stack)
- duration, curriculum breakdown, and outcome summary per program

#### 3.3 Mentor Credibility
- mentor profile cards (company, role, years of experience)
- live 1:1 session model vs recorded lectures
- mentor-to-student ratio transparency

#### 3.4 Cohort Enrollment Flow
- program selection
- current background (role, experience, education)
- contact and city
- counselor callback or live demo booking

#### 3.5 Scholarship / Assessment Flow
- eligibility assessment (basic coding / aptitude)
- scholarship percentage reveal on completion
- enrollment prompt with limited-seat urgency

#### 3.6 EMI and Financing
- fee transparency with EMI breakdown
- financing partner logos and qualification conditions
- ISA (income share) model option if applicable

#### 3.7 Support and Policy
- refund and cancellation terms
- placement support policy
- FAQ (pre-enrollment and post-enrollment)
- contact and escalation path

---

### 4. User Journeys

#### Journey 1 — Working professional evaluation
1. arrives via search/ad
2. reviews salary hike proof and company logos
3. checks program curriculum page
4. views mentor profiles
5. books demo session or submits inquiry

#### Journey 2 — Scholarship-first graduate
1. arrives on scholarship page
2. completes aptitude/assessment
3. sees scholarship percentage
4. proceeds to enrollment form

#### Journey 3 — Fee/EMI inquiry
1. checks program fee page
2. reviews EMI and financing options
3. submits contact for counselor callback

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | LMS and live class delivery platform | separate product |
| NG2 | Job board and direct employer matching | post-enrollment phase |
| NG3 | Long editorial content / blog-first strategy | conversion focus |
| NG4 | Advanced cohort management dashboard | ops tool, not marketing site |

---

### 6. Constraints

**Technical:**
- all lead captures server-validated with program and background context
- analytics events versioned for funnel attribution
- mobile Lighthouse 95+

**Business:**
- all salary and placement claims include cohort year and program context
- financing/EMI terms transparent before enrollment form submission
- mentor profiles must reflect current company and role

**Compliance:**
- no guaranteed salary claims without statistical context
- no hidden refund or placement support terms

---

### 7. Acceptance Criteria (Top Level)

- [ ] placement proof modules display year-labeled cohort metrics
- [ ] program pages show curriculum, duration, and outcome data
- [ ] mentor profiles display current company, role, and experience
- [ ] demo booking and inquiry forms submit with full context payload
- [ ] scholarship assessment completes and reveals result
- [ ] EMI and fee terms visible before enrollment form

---

### 8. Appendix A — Data Model (High Level)

```
Program
  -> track (SWE | DS | PM | AdvEng)
  -> duration, curriculum_modules, mode (live | hybrid)

Mentor
  -> name, company, role, years_experience, specialization

PlacementProof
  -> cohort_year, program, avg_salary_hike_pct, median_ctc, company_count

Lead
  -> source, campaign, program_interest, current_role, experience_years, city

ScholarshipAssessment
  -> score, scholarship_tier, eligibility_status

EnrollmentCohort
  -> batch_start, seats_remaining, program
```

---

### 9. Appendix B — Route Map

| Route | Page | Auth required |
|-------|------|---------------|
| `/` | Homepage | No |
| `/placements` | Placement proof | No |
| `/programs` | Program index | No |
| `/programs/[track]` | Program detail | No |
| `/mentors` | Mentor directory | No |
| `/scholarship` | Scholarship assessment | No |
| `/fees` | Fees and EMI | No |
| `/demo` | Demo booking | No |
| `/contact` | Contact/support | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms | No |
