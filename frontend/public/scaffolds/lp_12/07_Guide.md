# 07 — Guide
## Engineering Standards · lp_platform_12

### 1. CinematicStory Checklist
- **Fluidity:** Does the canvas animation maintain 60FPS while scrubbing?
- **Pinning:** Does the product stay perfectly centered during text transitions?
- **Handoff:** Is the transition from Canvas to Spec Grid smooth and without layout shift?
- **Mobile:** Are the image frames optimized for 4G bandwidth?

### 2. Coding Conventions
- **Motion Strategy:** Strictly use GSAP for all scroll-linked animations. Avoid `onScroll` native listeners for complex logic.
- **Canvas Strategy:** Use `requestAnimationFrame` within the GSAP `onUpdate` to ensure frame-perfect rendering.
- **Accessibility:** All scrollytelling text must be present in the DOM (not rendered inside canvas) for SEO and screen readers.
- **Asset Strategy:** Use `.webp` for all sequence frames and provide a fallback `.jpg` for legacy browsers.

### 3. File Structure
```
src/
  app/
    (showcase)/     # apple.com/airpods (The Visual Story)
    specs/          # Deep-dive technical detail pages
    buy/            # Product selection and checkout handoff
  components/
    motion/         # ScrollyCanvas, ImagePreloader, ScrollTimeline
    narrative/      # StorySection, PinnedText, Hotspot
    detail/         # TechnicalGrid, ModelCompare, SpecRow
    layout/         # GlobalNav, ProductSubNav, BuyButton
  store/            # useScrollStore, useProductStore
  lib/              # gsap-utils, canvas-helpers, frame-config
```

### 4. Definition of Done
- Cinematic canvas engine scrubbing 120+ frames flawlessly across all devices.
- Narrative chapters pin correctly and trigger text overlays with perfect timing.
- Technical spec grid renders with high-contrast precision at the end of the journey.
- Mobile view provides a high-fidelity scrollytelling experience optimized for thumb interaction.
