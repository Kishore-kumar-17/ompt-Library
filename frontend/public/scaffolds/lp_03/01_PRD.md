# 01 — Product Requirements Document
## LumaStyle Event Platform · lp_platform_03

### 1. Product Vision
"LumaStyle" is a digital canvas for human connection. It moves beyond transactional "ticketing" to create a "Premium Social Invitation" where the quality of the gathering is reflected in the aesthetic of the landing page. The platform prioritizes social proof through attendee discovery and minimizes friction via one-tap registration, providing hosts with a digital stage that feels like a high-end physical invitation.

**Success Metric:** "Social-Conversion" (percentage of users who interact with the "Who's Going" stack and proceed to register) exceeds 30%.

### 2. Personas
**Leo — The Creative Host (User)**
- Organizing a curated workshop or dinner and needs a page that matches his brand's aesthetic.
- Needs: A beautiful, centered layout, simple guest list management, and the ability to send automated event updates.
- Frustration: Cluttered, ad-heavy ticketing sites that look "cheap" and transactional.

**Maya — The Community Seeker (Audience)**
- Looking for meaningful events to attend and network with peers.
- Needs: Immediate proof of "Who else is going," a fast way to sync the event to her calendar, and a frictionless sign-up.
- Frustration: Complex registration forms and lack of social context about the attendees.

### 3. Core Features
- **Social-First Avatar Stacks:** A signature strip of overlapping circular avatars showcasing the guest list to build trust.
- **"Invitation-Style" Thematic Landing:** A centered, minimalist template using elegant serif typography and high-res cover art.
- **Frictionless One-Tap Registration:** A streamlined sign-up modal that leverages social auth or minimalist input for instant conversion.
- **Integrated Calendar & Map Hub:** A clean logistics block that handles timezone-aware scheduling and custom map previews.
- **Host Community Pages:** A dedicated profile for organizers to showcase upcoming events and manage an audience of "Followers."

### 4. User Journeys
1. **The Invitation Landing:** Visitor clicks a shared link -> sees a beautiful, focused event page -> interacts with the "Who's Going" stack -> feels social validation.
2. **The Instant Join:** User clicks "Register" -> sign-up modal appears with pre-filled social info -> taps once to confirm -> receives an aesthetic "Welcome" email.
3. **The Community Follow:** User attends an event -> visits the host's community page -> views the recurring calendar -> clicks "Follow" to stay updated on future gatherings.

### 5. Non-Goals
- No "Public Social Feed" (Keep the focus on specific events and communities).
- No complex "Ticketing Inventory" in Phase 1 (Simple RSVP or fixed-price tiers preferred).
- No "Ads" or "Sponsored Events" in the user discovery path.

### 6. Constraints
- **Design:** Minimalist Elegance. Centered layouts, serif/sans typographic mix, soft grey backgrounds.
- **Performance:** Sub-1s initial LCP for event cover images.
- **Friction:** Maximum 3 fields for guest registration (Name, Email, [Optional] Note to Host).
