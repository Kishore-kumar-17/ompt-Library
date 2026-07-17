# 01 — Product Requirements Document
## EventImpact Conference Platform · lp_platform_01

### 1. Product Vision
"EventImpact" is a digital hallmark for the world's most ambitious tech conferences. It moves beyond standard "event pages" to create an immersive, high-energy environment that generates immediate hype and handles complex global logistics. The platform prioritizes the "Aha! Moment" of scale and uses scarcity-driven ticketing, providing conference organizers with a digital stage that reflects the "Big-Tech Dominance" of their community.

**Success Metric:** "FOMO Conversion" (percentage of users who view a ticket countdown and proceed to the checkout form) exceeds 20%.

### 2. Personas
**Marcus — The Tech Founder (User)**
- Needs to verify if the conference is worth the $1,000+ ticket price and team travel costs.
- Needs: Immediate proof of world-class speakers (logos/portraits), a scannable multi-track schedule, and early-bird ticket access.
- Frustration: Disorganized event sites that don't communicate the "Massiveness" or "Importance" of the gathering.

**Sarah — The Institutional Investor (Audience)**
- Looking for "Alpha" startups and high-stakes networking opportunities.
- Needs: A fast, searchable directory of 500+ speakers and a clear map of the venue's "Networking Hubs."
- Frustration: Lack of search functionality and mobile-unfriendly schedules during the live event.

### 3. Core Features
- **Cinematic Video Hero Engine:** A high-performance background loop system showcasing crowd energy and stage scale.
- **Algolia-Powered Speaker Search:** A near-instant discovery interface allowing users to find experts by Industry, Track, or Country.
- **Urgency Marquee Ticker:** A persistent top-bar banner for price-increase alerts and "Sold Out" notifications.
- **Multi-Track "Monster" Schedule:** A dynamic timeline UI allowing users to build a personalized 3-day learning path across 10+ stages.
- **High-Conversion Ticketing Hub:** A comparison grid that clearly delineates General, Executive, and Chairperson tiers with scarcity markers.

### 4. User Journeys
1. **The Scarcity Sprint:** Visitor lands on home -> sees the "Price increase in 2 hours" ticker -> scrolls to the Ticket Hub -> completes 1-click checkout.
2. **The Speaker Deep-Dive:** User clicks "See all Speakers" -> searches for "AI Strategy" -> filters by "USA" -> reviews 5 matching expert profiles -> adds their sessions to "My Tracks."
3. **The Startup Apply:** Early-stage founder clicks "Startups" -> reviews previous alumni success stats -> fills out the "Alpha" application form.

### 5. Non-Goals
- No community "Social Feed" (Focus is strictly on ticketing and logistics).
- No complex "Speaker Application" portal (Handled via external forms).
- No in-house "Payment Gateway" (Handled via Stripe Checkout redirection).

### 6. Constraints
- **Design:** Tech-Noir Modernism. Pure black, Neon Green accents, sharp corners, bold Inter typography.
- **Speed:** Mandatory sub-1s load for the shell; optimized LCP for hero video posters.
- **Scale:** Must handle hundreds of speakers and thousands of concurrent schedule interactions without lag.
