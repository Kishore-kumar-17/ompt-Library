# 01 — Product Requirements Document
## UniverseStory Narrative Portfolio · pcpp_platform_04

### 1. Product Vision
"UniverseStory" is a decentralized digital ecosystem designed for photographers who treat their work as visual sociology. It rejects the "single-site" model in favor of a "Universe" of project-specific narratives. The platform prioritizes the sequence of images and the integration of long-form text, providing a literary, photobook-like experience for audiences who value social and political context.

**Success Metric:** Average "Project Depth" (percentage of users reaching the end of an essay) exceeds 60%.

### 2. Personas
**Isabella — The International Photo Editor (Client)**
- Needs to find deep, well-researched documentary stories for a major publication.
- Needs: A fast, scannable overview of different project "Universe" and the ability to dive into deep narrative essays.
- Frustration: Portfolio sites that are too commercial and lack journalistic depth.

**Arjun — The Visual Sociology Student (Audience)**
- Follows the photographer to understand the "story behind the story."
- Needs: Integrated diaries and interviews that explain the sociological context of the imagery.
- Frustration: Static galleries with minimal captions and no process documentation.

### 3. Core Features
- **Decentralized "Planet" Hub:** A central landing page that acts as a portal to distinct project-specific sites.
- **Narrative Sequence Engine:** A flexible layout system for image pairings, triptychs, and interspersed text blocks.
- **Integrated Project Diaries:** A CMS-driven section within each project for long-form essays and field notes.
- **"Journey" Sidebar:** A project-level navigation menu for jumping between the Essay, the Series, and the Press.
- **Universe Switcher:** A consistent, minimalist navigation component for portaling between different "Project Planets."

### 4. User Journeys
1. **The Portal Entry:** Visitor lands on the hub -> sees the "Matrimania" project planet -> portals into the project -> experiences the photo-essay scroll.
2. **The Journal Reading:** User navigates to the "Journal" -> reads a field diary from a recent trip -> sees linked image sequences from that trip.
3. **The Press Review:** Editor visits the "Press" section of a specific project -> reviews award citations and magazine features for that specific body of work.

### 5. Non-Goals
- No "Add to Cart" for prints in this phase (Focus is on narrative first).
- No social media "Likes" or "Comments" (Focus is on the artist's subjective voice).
- No automated "Grid Generator" (Every project essay must be hand-sequenced).

### 6. Constraints
- **Design:** Literary Broad-sheet. Pure white, 0px rounding, high-contrast typography.
- **Data:** Must support multi-domain or subdomain routing within a single application instance.
- **Performance:** Mandatory sub-1s LCP for the central hub and project landing pages.
