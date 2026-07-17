# 01 — Product Requirements Document
## ExamMaster Edtech Platform · pcpp_platform_19

### 1. Product Vision
"ExamMaster" is a digital sanctuary for academic ambition. It moves beyond standard online courses to create a high-trust "Success Engine" where students can select an exam goal and follow a curated path to success. The platform prioritizes the "First 60 Seconds" of discovery and rewards serious preparation via an "Iconic" membership tier, providing world-class educators with a digital stage that commands respect and drives massive-scale student loyalty.

**Success Metric:** "Goal-to-Subscription" conversion rate (percentage of users who select an exam goal and view the plan comparison within 24 hours) exceeds 10%.

### 2. Personas
**Arjun — The Determined Aspirant (User)**
- Preparing for the UPSC CSE and needs to learn from the best in the industry.
- Needs: A clear dashboard for his specific exam goal, live interaction with top teachers, and structured batch start-dates.
- Frustration: Disorganized YouTube videos or platforms that don't provide a comprehensive 1-year success roadmap.

**Dr. Meera — The Top Educator (Client)**
- An industry veteran with a massive following who needs a professional stage for her live classes.
- Needs: A high-performance interaction UI (Chat, Polls, Hand-raise) and a clear way to see her student metrics and growth.
- Frustration: Generic meeting tools (Zoom/Meet) that lack education-specific pedagogical features.

### 3. Core Features
- **Goal-Discovery Portal:** A clean, searchable overlay that handles 200+ competitive exam goals with category grouping.
- **Top Educator Pedigree Hub:** A directory of instructors featuring high-res portraits, "Minutes Watched" stats, and subject-matter credentials.
- **Plus vs. Iconic Comparison Engine:** A high-conversion table module highlighting premium benefits like 1:1 Mentorship and Physical Notes.
- **Interactive Live Classroom:** A low-latency video interface with real-time chat, moderation, and pedagogical gesture support.
- **Success Statistics Strip:** A high-impact social proof section showcasing "10 Crore+ Learners" and "3.2B+ Mins watched."

### 4. User Journeys
1. **The Discovery Sprint:** Visitor lands on home -> clicks "Select Goal" -> searches "IIT JEE" -> enters the JEE sub-site -> reviews the "Top Educators" grid.
2. **The Premium Upgrade:** Free student clicks "Get Subscription" -> compares Plus vs. Iconic -> selects the 12-month Iconic plan -> completes the Razorpay mandate flow.
3. **The Live Learning:** Subscriber clicks "Join Class" -> enters the classroom -> participates in a live poll -> "Raises a Hand" to ask a question via audio.

### 5. Non-Goals
- No "K-12" or general school curriculum (Focus is strictly on high-stakes competitive exams).
- No standard "Marketplace" feel (Prefer a unified subscription-access model).
- No community "Forum" without moderation (Maintain the academic integrity of the space).

### 6. Constraints
- **Design:** Academic Modernism. Green/Gold accents, 8px rounding, high-contrast sans typography.
- **Media:** Live-streaming must handle 10,000+ concurrent users with sub-5s latency (HLS optimization).
- **Payment:** Primary focus on the Indian market (UPI, Netbanking, e-mandates).
