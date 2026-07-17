# 01 — Product Requirements Document
## SubStackHub Newsletter Platform · pcpp_platform_15

### 1. Product Vision
"SubStackHub" is a digital sanctuary for independent thought. It moves beyond the cluttered "blog" to create a high-conversion, subscriber-centric environment where writers own their audience. The platform prioritizes the "Gateway Experience" through email-first landing pages and rewards long-term loyalty via multi-tiered memberships, providing creators with a digital presence that is aesthetically pure and economically independent.

**Success Metric:** "Welcome Conversion" (percentage of new visitors who provide an email on the landing page) exceeds 20%.

### 2. Personas
**Elena — The Independent Journalist (User)**
- Left a major newsroom to build her own paid reporting empire.
- Needs: A fast, authoritative way to capture emails and a paywall that is easy to manage for exclusive deep-dives.
- Frustration: Platforms that take a huge cut or make it difficult to export her subscriber list.

**Siddharth — The Curious Subscriber (Audience)**
- Follows 5-10 independent voices across tech and philosophy.
- Needs: A clean, ad-free reading experience on both mobile and web and a simple way to manage his multiple paid tiers.
- Frustration: Cluttered sites with intrusive ads or "Around the Web" recommendation widgets.

### 3. Core Features
- **Email-First Welcome Page:** A dedicated, high-impact landing page designed to capture leads before showing the archive.
- **Multi-Mode Feed Engine:** A flexible layout system supporting "Magazine" (Grid) or "Newspaper" (List) views based on publication cadence.
- **Dynamic Post Paywalls:** A component that handles partial-text reveals (teasers) and high-conversion "Locked" states for paid members.
- **Multi-Tier Membership:** Integrated management for Free, Paid (Monthly/Annual), and Founder's tiers via Stripe.
- **Community Notes & Social:** A dedicated "Notes" area for short-form updates and integrated comment threads with member-only toggles.

### 4. User Journeys
1. **The Subscription Path:** Visitor arrives via social link -> lands on the Welcome Page -> enters email -> receives a "Thank You" and enters the full publication feed.
2. **The Paid Upgrade:** Free subscriber clicks a "Locked" post -> reads the 300-word teaser -> clicks "Upgrade to Paid" -> completes Stripe checkout -> post instantly unlocks.
3. **The Community Join:** Subscriber navigates to "Chat" -> participates in a member-only thread -> receives notifications for direct replies.

### 5. Non-Goals
- No third-party ad network integration (100% subscriber funded).
- No "Trending" algorithms (Chronological and manual curation only).
- No complex "Theme Builder" (Maintain a clean, unified platform aesthetic).

### 6. Constraints
- **Design:** Minimalist Publishing. Pure whites, vibrant accents, 720px reading columns.
- **Data:** Must support exporting the entire subscriber database (emails) at any time.
- **Performance:** Sub-1s page loads for text-heavy posts.
