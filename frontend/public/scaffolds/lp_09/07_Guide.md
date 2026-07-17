# 07 — Guide
## Engineering Standards · lp_platform_09

### 1. PyramidVelocity Checklist
- **Centered:** Is the content group slightly offset (10%) toward the top? (Check optical balance).
- **Funnel:** Does the font size decrease linearly from H1 to the CTA?
- **Speed:** Is the TTI (Time to Interactive) under 300ms?
- **Radius:** Are all action buttons and inputs strictly sharp (4px) or pill-shaped?

### 2. Coding Conventions
- **100vh Strategy:** Strictly use `h-screen overflow-hidden` on the main wrapper to prevent accidental scrolling on all browsers.
- **Count-up Strategy:** Use the `useMotionValue` and `useTransform` hooks from Framer Motion for high-performance counter increments.
- **Validation Strategy:** All email errors must be rendered in-line below the input to maintain the centered symmetry.
- **Image Strategy:** Use zero external images. Convert all social proof logos to high-fidelity SVGs to ensure 0ms image-load delay.

### 3. File Structure
```
src/
  app/
    (one-pager)/    # Homepage (Viewport-locked Pyramid)
    api/            # Supabase stats and lead processing
  components/
    pyramid/        # MassiveH1, SubHeader, ValidationStrip
    capture/        # VelocityInput, JoinButton, SuccessTick
    stats/          # EarlyAccessCounter, MonoStatus
    layout/         # CenteredPyramid, StudioReset
  store/            # useVelocityStore (stats and input state)
  lib/              # supabase-client, zod-schemas, motion-presets
```

### 4. Definition of Done
- One-screen pyramid layout flawlessly centers across all device breakpoints.
- Early-access counter renders with smooth, data-backed count-up animations.
- Lead capture flow completes in under 1 second with high-fidelity feedback.
- Mobile view maintains "Growth Momentum" via high-contrast H1 and thumb-ready CTA.
