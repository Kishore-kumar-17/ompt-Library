# 01 — Product Requirements Document
## Neo-Creator Digital Storefront · dpecom_platform_01

### 1. Product Vision
A "Neo-Creator" platform that empowers independent artists, writers, and developers to sell digital goods with zero friction. The platform rejects the polished, corporate aesthetic of modern SaaS in favor of a "Neo-Brutalist" design that signals authenticity and creator-first values.

**Success Metric:** A creator can go from "Sign up" to "First sale" in under 10 minutes.

### 2. Personas
**Alex — The Solopreneur (Creator)**
- Writes technical e-books and builds icon packs.
- Needs: A simple URL to share on Twitter, "Pay what you want" pricing, and instant payouts.
- Frustration: Platforms that take a huge cut or have complex setup processes.

**Jamie — The Curious Buyer**
- Follows Alex on social media.
- Needs: A fast, secure checkout that doesn't require an account.
- Frustration: Multi-page checkout forms and intrusive upsells.

### 3. Core Features
- **Brutalist Marketplace:** A high-contrast grid of digital products across categories.
- **Creator Profile:** A "link-in-bio" style shop page with a modular layout.
- **Dynamic PDP:** Supports "Pay what you want" with a minimum price floor.
- **Checkout Overlay:** A 1-page slide-up modal for ultra-fast transactions.
- **Creator Dashboard:** Simple analytics focusing on "Sales" and "Audience Growth."

### 4. User Journeys
1. **Creation:** Creator uploads file -> sets price -> shares link.
2. **Purchase:** Buyer clicks link -> enters email/payment in overlay -> downloads file.

### 5. Non-Goals
- No physical product shipping logic.
- No complex CRM or email automation (MVP focus).
- No social networking features (comments, likes).

### 6. Constraints
- **Design:** Strictly Neo-Brutalist. 2px-4px black borders, no border-radius.
- **Performance:** 100/100 Lighthouse score.
- **Payment:** Stripe-only for MVP.
