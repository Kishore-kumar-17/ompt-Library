# 04 — Build Plan
## Roadmap & Milestones · lp_platform_12

### Phase 1: Canvas Engine & Preloading (Week 1)
- Set up Next.js 14 project with GSAP and ScrollTrigger.
- Build the `ImagePreloader` utility and the high-DPI `ScrollyCanvas` component.
- Implement the basic "Scroll-to-Frame" logic.
- **Goal:** A fluid, scrubbing product rotation shell.

### Phase 2: Pinned Narrative Shell (Week 2)
- Build the `StorySection` wrapper that handles viewport pinning.
- Implement the "Chapter Transition" logic where text overlays fade in/out.
- Create the sticky `SubNav` that tracks scroll progress.
- **Goal:** A multi-chapter narrative journey is functional.

### Phase 3: Feature Chapters & Hotspots (Week 3)
- Build the content for "Audio," "Noise Cancellation," and "Battery" chapters.
- Implement the "Hotspot" interactive overlays with GSAP `fromTo` transitions.
- Create the "Deconstruction" animation sequence (Frames 80-120).
- **Goal:** Immersive feature discovery with interactive deep-dives.

### Phase 4: Technical Detail Grid (Week 4)
- Build the transition from full-bleed canvas into the white spec grid.
- Implement the categorized spec table with icons and high-contrast labels.
- Create the "Compare Models" horizontal card strip.
- **Goal:** Successful handoff from emotional story to rational detail.

### Phase 5: Final Performance & Accessibility (Week 5)
- Final optimization for mobile frame bandwidth (Adaptive bitrate).
- Implement `prefers-reduced-motion` fallbacks.
- Lighthouse 100/100 audit for LCP and Accessibility.
- **Goal:** A world-class cinematic product platform.
