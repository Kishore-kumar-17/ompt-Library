# 01 — Product Requirements Document
## Top-Tier Creator Service Platform · dpecom_platform_04

### 1. Product Vision
"Top-Tier" is a personal monetization engine that puts the creator's expertise front and center. It moves beyond simple product sales to the monetization of time through 1:1 sessions and group webinars. The design signals "Professional Authority" while remaining approachable for mentees and fans.

**Success Metric:** A creator can set up their booking page and start accepting 1:1 sessions in under 5 minutes.

### 2. Personas
**Kiran — The Industry Expert (Creator)**
- A senior developer or manager who wants to mentor junior talent.
- Needs: Automated scheduling that respects their calendar, global payments in INR/USD, and a clean professional profile.
- Frustration: Managing mentorship requests through DMs and manual calendar coordination.

**Rohan — The Aspiring Professional (Mentee)**
- Wants to book a discovery call or resume review with Kiran.
- Needs: To see Kiran's real-time availability and book a slot instantly without back-and-forth.
- Frustration: High-friction booking processes and lack of clear service descriptions.

### 3. Core Features
- **Integrated Scheduling:** Real-time availability sync with Google/Outlook calendars.
- **Modular Service Cards:** Flexible cards for 1:1 sessions, webinars, and digital assets.
- **Meeting Automation:** Automated generation of Zoom/Google Meet links post-booking.
- **Social Proof Strip:** Verified reviews and testimonials with creator-endorsed handles.
- **Frictionless Profile:** A mobile-first, centered "Link-in-bio" profile that acts as a storefront.

### 4. User Journeys
1. **Setup:** Creator connects calendar -> defines service slots (e.g., 30m Career Advice) -> shares profile link.
2. **Booking:** Mentee lands on profile -> selects slot -> pays -> receives calendar invite with meeting link.

### 5. Non-Goals
- No full-scale email marketing suite (focus is on booking/sales).
- No social networking features (no public feed or comments).
- No physical goods shipping (digital assets and services only).

### 6. Constraints
- **Design:** Professional & Approachable. Bold sans-serif, vibrant blue accents, 640px max-width container.
- **Performance:** Sub-1s page loads for profile links.
- **Integration:** Must support major meeting platforms (Zoom/Google Meet) via API.
