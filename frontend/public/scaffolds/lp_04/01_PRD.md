# 01 — Product Requirements Document
## ZenContent Intellectual Archive · lp_platform_04

### 1. Product Vision
"ZenContent" is a digital hallmark for the transmission of ideas. It moves beyond "blogging" to create a high-performance "Thought Archive" where the interface is intentionally invisible. The platform prioritizes the "First Principles" of reading and leverages extreme minimalism to establish authority, providing world-class thinkers with a digital presence that signals "Deep Work" and "Timeless Relevance" in an era of digital noise.

**Success Metric:** Average "Reading Session Duration" exceeds 8 minutes per visitor due to zero interface distractions.

### 2. Personas
**The Sage — The Thought Leader (User)**
- Needs to archive 15 years of podcasts and articles in a way that remains readable for the next 50 years.
- Needs: A simple Markdown-based workflow, zero maintenance on visual trends, and a lightning-fast search for their own archive.
- Frustration: Platforms that prioritize "Engagement" (popups/shares) over "Content" (reading).

**The Student — The Insight Seeker (Audience)**
- Looking for specific frameworks like "Specific Knowledge" or "Leverage."
- Needs: Massive white space for focus, instant search results, and high-density text for quick scanning.
- Frustration: Cluttered layouts, slow loading images, and UI elements that hide the actual message.

### 3. Core Features
- **Centered Single-Column Engine:** A 700px max-width layout designed for optimal line-length and zero peripheral noise.
- **Serif/Mono Typography System:** Georgia/Times for narrative wisdom; Courier/Menlo for technical metadata and source links.
- **High-Density Transcript Viewer:** A template that handles 5,000+ word audio transcripts with section markers and zero decorative elements.
- **Wisdom Search Engine:** A full-text search interface that indexes Markdown files for instant retrieval of philosophical "nuggets."
- **Digital Paper Feed:** A chronological list of entries showing only [Date] [Title] [Platforms] in a high-contrast text format.

### 4. User Journeys
1. **The Deep Read:** Visitor lands on "How to Get Rich" -> reads 3,000 words without a single image or popup -> clicks a monospaced "Spotify" link at the bottom.
2. **The Wisdom Query:** User clicks "Search" -> types "Happiness" -> sees a list of 12 articles and 5 podcast transcripts -> portals instantly to the specific paragraph.
3. **The Simple Join:** User scrolls to the bottom of the feed -> enters email in a plain input box -> receives a confirmation without leaving the page.

### 5. Non-Goals
- No "Social Media" sharing buttons (Maintain the archive's internal gravity).
- No "Comments" or "User Profiles" (Keep it a single-source-of-truth broadcast model).
- No "Images" or "Gradients" (Except for the occasional diagram or book cover).

### 6. Constraints
- **Design:** Extreme Minimalism. Pure black/white, 0px border-radius, zero shadows.
- **Speed:** Sub-200ms First Contentful Paint (FCP). Sub-500ms Time to Interactive (TTI).
- **Format:** All content must be stored in Markdown/MDX to ensure permanent readability and zero vendor lock-in.
