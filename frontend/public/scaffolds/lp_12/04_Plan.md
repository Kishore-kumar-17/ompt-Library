# 04 — Build Plan
## Roadmap & Milestones · lp_platform_12

### Phase 1: Foundation & Canvas Shell (Week 1)
- Set up Next.js 14 project with GSAP + ScrollTrigger and Tailwind "Emotional Tech" tokens.
- Build the sticky sub-nav with chapter indicators and "Buy" pill CTA.
- Establish the full-bleed `<canvas>` component with WebP frame preloading hook.
- **Goal:** A performant cinematic shell ready to receive image-sequence data.

### Phase 2: Scrollytelling Engine (Week 2)
- Implement the GSAP ScrollTrigger pinning system for all three narrative chapters (Intro, Audio, Deconstruction).
- Build the 1:1 scroll-to-frame scrubbing logic (0–120 frames) with `Power2.easeOut` easing.
- Add `prefers-reduced-motion` fallback: static product render with no canvas scrubbing.
- **Goal:** Smooth, 60fps scroll-driven image-sequence playback across all chapters.

### Phase 3: Interactive & Narrative Layers (Week 3)
- Build pinned text overlay system: `opacity 0 → 1`, `y: 20 → 0`, `400ms` fade-slide per chapter beat.
- Implement the Interactive Hotspot Callouts on the deconstruction chapter (click → deep-dive pop-up).
- Build the chapter-aware Adaptive Sub-Navigation with smooth jump-to-section logic.
- **Goal:** Complete narrative flow from hero scroll to deconstruction chapter.

### Phase 4: Technical Spec Hub & Comparison (Week 4)
- Build the High-Density Technical Spec Grid (icon + label + value, multi-column, hairline borders).
- Implement the 3-card Comparison Strip with category tabs (Battery, Sensors, Audio).
- Integrate the sticky "Buy Now" utility bar with real-time chapter tracking.
- **Goal:** Full page assembled end-to-end, spec grid readable and performant.

### Phase 5: Performance Audit & Polish (Week 5)
- Optimise image-sequence preloading: sub-1.5s LCP for initial frame, WebP compression pass.
- Accessibility audit: canvas fallback DOM text, WCAG AA contrast on all overlays, keyboard-reachable hotspots.
- Lighthouse audit targeting Performance ≥90, Accessibility ≥90.
- **Goal:** Production-ready cinematic landing page at world-class performance standard.
