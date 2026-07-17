# 01 — Product Requirements Document
## CanvasCV Professional Profiles · pcpp_platform_12

### 1. Product Vision
"CanvasCV" is a digital sanctuary for professional identity. It moves beyond the static "list of jobs" to create a living, visual story of a person's career. The platform prioritizes ease of discovery for hiring managers and high-impact visual showcasing of projects and writing, providing creators with a digital presence that is as beautiful as it is informative.

**Success Metric:** Average "Profile Engagement" (percentage of users who expand at least one "Project Layer") exceeds 45%.

### 2. Personas
**David — The Design Recruiter (User)**
- Needs to verify a candidate's visual skill and project impact quickly.
- Needs: A fast, high-signal view of a designer's career arc and the ability to dive into detailed case studies.
- Frustration: Cluttered PDF resumes or LinkedIn profiles that bury the actual work under corporate metrics.

**Leila — The Polymath Creator (Audience)**
- Works in product design but also contributes to open-source and writes technical essays.
- Needs: A single destination that handles her job history, side projects, and writing in a unified editorial format.
- Frustration: Having to maintain three different sites (Resume, Portfolio, Blog) to show her full self.

### 3. Core Features
- **Visual Career Timeline:** A vertical chronological feed where work entries are structured as scannable, high-info cards.
- **Expandable Project Layers:** A modular system where work entries can be opened to reveal rich media, tech stacks, and deep-dive narratives.
- **Side Project & Hobby Grid:** A dedicated area for non-commercial work, allowing for a 360-degree professional view.
- **High-Readability Writing Hub:** A tabbed section for long-form case studies and personal journals with book-grade typography.
- **Real-time Status Chips:** A "Current Status" scroller for latest projects, books being read, or tools being mastered.

### 4. User Journeys
1. **The Arc Review:** Visitor lands on profile -> scans the visual timeline -> sees a prestigious role -> expands the "Layer" to view the case study -> clicks through to the live project.
2. **The Subject Search:** Recruiter visits the "Explore" feed -> filters by "Product Designer" -> views a grid of high-impact project covers -> portals into a specific CV.
3. **The Multi-Facet Check:** Collaborator visits "Side Projects" -> sees a unique creative hobby -> understands the person's unique creative perspective beyond their day job.

### 5. Non-Goals
- No "Job Board" or active "Hiring" feed (Focus is on personal identity first).
- No "Skill Endorsements" or standard social "Likes" (Focus is on work affinity).
- No complex "Profile Customization" (Aesthetic must remain strictly minimal and uniform).

### 6. Constraints
- **Design:** Modular Editorial. Warm off-whites, 12px rounding, Inter typography.
- **Media:** Must handle high-res images and video embeds without layout shift (Aspect ratio placeholders).
- **Performance:** Mandatory sub-1.5s LCP for media-heavy profile pages.
