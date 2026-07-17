# 01 — Product Requirements Document
## BuilderGarden Personal Hub · pcpp_platform_16

### 1. Product Vision
"BuilderGarden" is a high-performance intellectual headquarters. It moves beyond the static blog to create a "Living Library" where a decade of reading and building is archived for public discovery. The platform prioritizes the "Aha! Moment" of quick insight through structured book notes and converts that trust into a multi-tier educational business, providing creators with a digital presence that signals both profound curiosity and technical mastery.

**Success Metric:** Average "Search-to-Read" conversion (percentage of users who use the search bar and then finish a 1000+ word note) exceeds 60%.

### 2. Personas
**Leo — The Aggressive Learner (User)**
- Looking for technical insights on AI or productivity frameworks.
- Needs: A fast way to "download" the best ideas from 250+ books and clear path to take a deeper course.
- Frustration: Fluffy articles that take 10 minutes to deliver a single point.

**Anya — The Tech Founder (Client)**
- Wants to master "Vibe Coding" to build internal tools for her startup.
- Needs: A structured curriculum with video training, community support, and downloadable code templates.
- Frustration: Generic courses that don't bridge the gap between "Learning" and "Building."

### 3. Core Features
- **The Searchable Garden:** A high-speed Algolia index of hundreds of articles and book notes with category-based filtering.
- **Structured Note Engine:** A specialized layout for "Nat's Notes" featuring Rating systems, "Top 3 Lessons," and chronological highlights.
- **Modular Course Player:** A robust learning interface with integrated video (Mux), markdown-based lessons, and progress tracking.
- **Builder Methods Pro Wall:** A secure membership area for premium training, private workshops, and a community resource library.
- **Conversion-Optimized Hero:** A landing page that immediately establishes authority and drives newsletter signups via high-value "Lead Magnets."

### 4. User Journeys
1. **The Insight Sprint:** Visitor lands on home -> searches for "Antifragile" -> enters book note -> reads the "Top 3 Takeaways" box -> subscribes to the newsletter.
2. **The Course Mastery:** User clicks "Courses" -> views the AI-Building curriculum -> completes the Stripe purchase -> enters the Pro Dashboard -> watches the first lesson.
3. **The Resource Audit:** Existing "Pro" member logs in -> navigates to "Resources" -> downloads an AI-Agent template -> implements it in their own project.

### 5. Non-Goals
- No public "Social Feed" (Maintain the personal research hub feel).
- No "Free-for-all" community area (Community is reserved for Pro members).
- No physical goods sales (Focus is strictly on digital IP and knowledge).

### 6. Constraints
- **Design:** Minimalist Builder. White backgrounds, 4px technical rounding, authoritative editorial typography.
- **Search:** Search must return results in under 100ms (standard for a high-performance library).
- **Video:** Course videos must be secured and only accessible to authenticated Pro members.
