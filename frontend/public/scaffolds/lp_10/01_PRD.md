# 01 — Product Requirements Document
## TallySimplicity Productivity Platform · lp_platform_10

### 1. Product Vision
"TallySimplicity" is a digital hallmark for frictionless creation. It moves beyond standard "SaaS marketing" to create a "Document-First" environment where users are encouraged to build before they join. The platform prioritizes the "First 60 Seconds" of interaction and leverages "disruptive free" logic to establish market dominance, providing modern makers with a tool that feels as familiar as their favorite doc-editor and as powerful as high-end form logic.

**Success Metric:** "Anonymous Engagement" (percentage of users who perform at least 5 block insertions before reaching a sign-up wall) exceeds 40%.

### 2. Personas
**Liam — The Digital Solopreneur (User)**
- Running multiple small projects and needs a fast, free way to capture leads or feedback.
- Needs: A familiar UX (Notion-like), "unlimited everything" for free, and a way to start building without creating yet another account.
- Frustration: Builders that hide basic features (like custom domains or logos) behind expensive pro-tiers.

**The Team — The Transparent Builder (Client)**
- Building in public and wants to show the journey as much as the product.
- Needs: A platform that showcases the public roadmap, monthly revenue, and user-requested features.
- Frustration: Opaque product updates that make it hard to build community trust.

### 3. Core Features
- **"Try-Before-Join" Editor:** A functional, unauthenticated form editor that appears on the homepage or via a direct "Create" link.
- **Block-Based Insertion System:** A slash-command (/) or "+" menu interface for adding text, inputs, images, and logic.
- **Disruptive "Unlimited" Hub:** A feature grid showcasing that logic, payments, and multi-page forms are free by default.
- **Local-First Draft Persistence:** A system that saves the user's progress to LocalStorage or IndexedDB until they choose to "Save to Workspace" (Sign up).
- **Public Transparency Hub:** A footer/sidebar section showing live business stats and a filterable public roadmap.

### 4. User Journeys
1. **The Instant Build:** Visitor lands on home -> clicks "Create for Free" -> immediately enters the block editor -> types "/input" -> builds a 3-field form in 2 minutes.
2. **The Logic Check:** User scrolls to "Unlimited Features" -> sees that conditional logic is free -> previews a "Pricing Calculator" template -> clicks "Use Template."
3. **The Workspace Handoff:** Anonymous builder finishes a form -> clicks "Publish" -> sees a "Create Account to Save" modal -> signs up via Clerk/Auth.js -> draft is instantly moved to their new cloud workspace.

### 5. Non-Goals
- No "Drag-and-Drop" complex canvas (Stick to the linear, document-first vertical flow).
- No "Marketing Dashboard" for individuals (Keep the focus on the creation experience).
- No intrusive "Upsell" popups (Let the free value drive the Pro-tier curiosity).

### 6. Constraints
- **Design:** Notion-Native Minimal. #FFFFFF background, 6px corners, sharp Inter typography.
- **Storage:** Drafts must be persistent locally for at least 30 days or until cleared.
- **Performance:** Editor must respond to keystrokes and slash-commands in <50ms to maintain the "Doc Feel."
