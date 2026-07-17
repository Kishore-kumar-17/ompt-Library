# 01 — Product Requirements Document
## CinematicStory Landing Platform · lp_platform_12

### 1. Product Vision
"CinematicStory" is a digital hallmark for high-fidelity product discovery. It moves beyond standard "scrolling grids" to create an immersive "Digital Film" where the user's scroll depth directly controls the narrative speed. The platform prioritizes "Tactile Responsiveness" through canvas scrubbing and establishes prestige via large-scale typography, providing premium hardware brands with a digital stage that reflects the "Innovation and Magic" of their physical products.

**Success Metric:** "Scroll-Completion" (percentage of users who reach the Technical Spec grid at the bottom) exceeds 40% due to the immersive nature of the scrollytelling.

### 2. Personas
**Julian — The Design-Conscious Professional (User)**
- Values aesthetics and build quality; wants to "feel" the product before buying.
- Needs: An experience that showcases the product's geometry and internal tech in high-fidelity.
- Frustration: Static pages with small images that don't explain the "Craft" behind the hardware.

**The Brand — The Premium Manufacturer (Client)**
- Needs to justify a high price-point through an elite digital presentation.
- Needs: A site that feels "Software-Grade," handles complex 3D narratives smoothly, and provides clear technical details for rational buyers.
- Frustration: Clunky animations or video tags that stutter and break the "Premium Aura."

### 3. Core Features
- **GSAP Image-Sequence Engine:** A performant `<canvas>` component that scrubs through 100+ frames based on scroll position.
- **Pinned Narrative Chapters:** Full-bleed sections that lock the viewport while text overlays fade and translate to tell a feature story.
- **Interactive Deconstruction Hub:** A sequence where the product "opens" (via frames) to show internal components with hotspot callouts.
- **High-Density Spec Grid:** A transition at the 80% scroll mark into a clean, categorized table of technical details.
- **Adaptive Sticky Buy Bar:** A secondary sub-navigation that tracks the product name and current chapter, featuring a permanent "Buy" CTA.

### 4. User Journeys
1. **The Cinematic Intro:** Visitor lands on home -> scrolls down -> product rotates and zooms (via canvas) -> text "Magic Like Never Heard" fades in -> user continues scrolling to explore.
2. **The Feature Discovery:** User reaches "Spatial Audio" section -> scroll slows down -> product revolves to show speakers -> hotspot reveals the H2 chip details.
3. **The Rational Close:** User finishes the visual story -> arrives at the white-background technical grid -> reviews battery life and size -> clicks "Buy" in the sticky header.

### 5. Non-Goals
- No "Community Social Feed" (Focus is strictly on product storytelling).
- No "Artsy" blurs that hide the product (Everything must be crisp and high-contrast).
- No direct "E-commerce Cart" (Redirect to a simplified checkout or external store).

### 6. Constraints
- **Design:** Emotional Tech Minimalism. #FFFFFF foundations, SF Pro typography, GSAP motion.
- **Performance:** Frame preloading is mandatory. LCP must be under 1.5s for the initial hero frame.
- **Motion:** Must support `prefers-reduced-motion` by providing a static high-res fallback image grid.
