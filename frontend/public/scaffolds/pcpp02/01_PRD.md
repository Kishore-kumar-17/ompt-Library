# 01 — Product Requirements Document
## CreatorGrid Photographer Hub · pcpp_platform_02

### 1. Product Vision
"CreatorGrid" is a high-utility hub for experimental photographers and educators. It moves beyond the traditional "image wall" to create a structured environment where photography is categorized by technique and accompanied by educational resources. The platform prioritizes ease of discovery and digital commerce, providing creators with a professional storefront for their presets, LUTs, and technical knowledge.

**Success Metric:** Average pages-per-session exceeds 5.0 as users navigate through deep technique categories and the Lens Museum.

### 2. Personas
**Ben — The Experimental Hobbyist (User)**
- Wants to learn specific techniques like Trichromy or Infrared photography.
- Needs: Clearly categorized tutorials and downloadable presets to recreate the look.
- Frustration: Portfolio sites that show beautiful images but offer no technical context.

**Sarah — The Gear Enthusiast (User)**
- Collects vintage lenses and looks for technical samples.
- Needs: A structured "Lens Museum" where she can see lens specs and high-res samples.
- Frustration: Scattered forum posts and lack of organized gear databases.

### 3. Core Features
- **Fixed Sidebar Navigation:** A persistent vertical menu providing instant access to the site's three main pillars: Photography, Shop, and Blog.
- **Technique CMS:** A dynamic routing system that filters the portfolio by photographic method (e.g., Double Exposure, Weird Lenses).
- **Lens Museum:** A structured technical library for vintage gear, featuring spec tables and interactive sample galleries.
- **Digital Asset Storefront:** Integrated e-commerce for LUT packs, Ebooks, and Presets with automated email delivery.
- **Interactive Gallery Toggles:** Viewport controls that switch between full-scale immersion and thumbnail grids for quick browsing.

### 4. User Journeys
1. **The Technical Deep-Dive:** Visitor lands on home -> clicks "Photography" in sidebar -> selects "Infrared" -> browses the technique gallery -> reads the linked tutorial blog post.
2. **The Asset Purchase:** User navigates to "Shop" -> filters by "LUT Packs" -> selects a product -> completes a 1-page checkout -> receives download link instantly.
3. **The Gear Research:** User visits "Lens Museum" -> searches for a specific 1960s lens -> views the technical specs and sample portraits.

### 5. Non-Goals
- No client-proofing or password-protected gallery features (Focus is on public education).
- No community-uploaded gear reviews (Artist's voice only).
- No social media "feed" style layout (Focus is on structured archives).

### 6. Constraints
- **Design:** Clean Utility. High contrast, 1px hair-line borders, geometric sans-serif typography.
- **Performance:** Instant navigation via Next.js App Router; sub-100ms sidebar transitions.
- **Commerce:** Must support instant digital fulfillment (Stripe/Lemonsqueezy).
