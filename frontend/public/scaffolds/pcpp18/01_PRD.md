# 01 — Product Requirements Document
## CohortHub Learning Marketplace · pcpp_platform_18

### 1. Product Vision
"CohortHub" is a digital flagship for elite professional education. It moves beyond passive MOOCs to create an active, instructor-led marketplace where mid-to-senior professionals can master specific career-accelerating frameworks. The platform prioritizes the "Instructor's Pedigree" and "Cohort Urgency," providing world-class experts with a digital presence that commands authority and drives high-AOV professional enrollments.

**Success Metric:** "Urgency Conversion" (percentage of users who view a "Starts [Date]" cue and proceed to the enrollment form) exceeds 18%.

### 2. Personas
**Sarah — The Senior PM (User)**
- Working at a mid-stage startup and needs to master "Product Strategy" from a vetted industry leader.
- Needs: Immediate proof of the instructor's background (Ex-Airbnb/Google) and a clear, week-by-week syllabus breakdown.
- Frustration: Courses that are too theoretical or taught by academics without recent industry experience.

**Karthik — The Expert Operator (Client)**
- An industry veteran looking to launch a high-ticket cohort-based course.
- Needs: A professional landing page that handles applications, payments, and student communication effortlessly.
- Frustration: Generic "Link-in-bio" tools that don't provide a comprehensive learning experience or handle complex scheduling.

### 3. Core Features
- **Pedigree-First Marketplace:** A structured hub that organizes cohorts by domain (AI, Product, Design) and highlights instructor authority.
- **Time-Bound Scheduling UI:** A specialized component system for "Upcoming Cohorts" showing real-time start dates and enrollment deadlines.
- **Dynamic Curriculum Accordions:** A modular syllabus layout that handles complex, multi-week lesson plans with resource links and video previews.
- **"Expense This Course" Utility:** A 1-click generator for professional reimbursement request emails to employers.
- **Student Mastery Dashboard:** A secure area for learners to access live session links, recordings, and peer community channels.

### 4. User Journeys
1. **The Expert Hunt:** Visitor lands on home -> selects "AI & Tech" category -> views the "Top Instructors" grid -> clicks a course card with a "Starts May 30" label.
2. **The Syllabus Deep-Dive:** User enters the "Product Sense" course page -> expands the "Week 3" accordion -> reviews the specific artifacts and templates they will receive.
3. **The Corporate Enrollment:** User clicks "Enroll" -> uses the "Expense this course" link to send an email to their manager -> completes the purchase once approved.

### 5. Non-Goals
- No "Free-for-all" public forums (Community is strictly cohort-based and authenticated).
- No standard "Video Course" player without community integration (The "Cohort" is the product).
- No low-value badges or gamification (Focus is on career transformation and networking).

### 6. Constraints
- **Design:** Professional Mastery. Pure white, sharp Inter typography, high-impact instructor portraits.
- **Search:** Marketplace search must be instant (Algolia target: <100ms) to handle hundreds of active cohorts.
- **Security:** Cohort-specific links and materials must be protected by server-side role-based access.
