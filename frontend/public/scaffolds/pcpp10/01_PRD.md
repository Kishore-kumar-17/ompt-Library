# 01 — Product Requirements Document
## InsiderEdge Journalist Portfolio · pcpp_platform_10

### 1. Product Vision
"InsiderEdge" is a digital powerhouse for independent journalism. It moves beyond the standard personal blog to create a high-authority publication hub where breaking news and deep-dive policy analysis are protected by a frictionless premium paywall. The platform prioritizes information density and subscription conversion, providing high-profile journalists with a digital presence that signals "Intellectual Leadership" in the tech economy.

**Success Metric:** "Trial-to-Paid" conversion rate (percentage of users who click a paywall and complete a subscription) exceeds 12%.

### 2. Personas
**Marcus — The VC Partner (User)**
- Needs daily briefings on tech policy to inform investment decisions.
- Needs: A fast, information-dense morning read and instant access to deep archives via search.
- Frustration: Cluttered news sites with pop-ups and low-quality "clickbait" reporting.

**Sarah — The Policy Maker (Audience)**
- Follows the author for independent analysis of platform power.
- Needs: Full access to the Mon-Thu briefings and the private community Discord link.
- Frustration: Missing critical updates because they were behind a clunky, hard-to-manage paywall.

### 3. Core Features
- **Information-Dense News Feed:** A chronological stream of reporting that emphasizes headlines and high-value summaries.
- **Ghost-Style Premium Paywall:** A "Fade-to-CTA" component that reveals a teaser before requesting a subscription for the full post.
- **Multi-Tiered Membership Portal:** A sleek modal for managing "Free" vs "Paid" (Annual/Monthly) access and billing.
- **Deep-Archive Search Engine:** High-speed Algolia indexing that allows users to find specific policy reporting across years of content.
- **Integrated Podcast Block:** Minimalist audio players for the publication's weekly podcast series.

### 4. User Journeys
1. **The Briefing Read:** Visitor lands on home -> scans the information-dense feed -> clicks a "Free" article -> engages in a 5-minute professional read.
2. **The Paid Upgrade:** User clicks a "Subscriber Only" post -> reads the free excerpt -> clicks "Subscribe" in the fade-gradient -> completes the Stripe checkout in the modal -> instantly unlocks the post.
3. **The Archive Search:** Researcher searches for "Antitrust 2023" -> views a list of relevant reporting -> filters by "Paid" to find deep-dive archives.

### 5. Non-Goals
- No "Free-for-all" comment sections (Community is handled via private Discord/Slack).
- No display advertising or affiliate networks (100% subscriber/sponsor supported).
- No complex "Category" pages (Prefer a single, unified chronological stream).

### 6. Constraints
- **Design:** Tech-Native Minimalism. White backgrounds, bold Inter typography, zero marketing chrome.
- **Authentication:** Must support "Magic Link" passwordless login for frictionless member access.
- **Performance:** Sub-1s page loads for text-heavy reporting articles.
