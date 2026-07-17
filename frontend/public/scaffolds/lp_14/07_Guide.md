# 07 — Guide
## Engineering Standards · lp_platform_14

### 1. IndustrialPrecision Checklist
- **Engineering:** Does the hero show internal parts re-assembling? (No flat screenshots).
- **Metics:** Are numbers like RPM or Microns at least 2x the size of the body text?
- **Accessories:** Is the "In the box" grid displayed in a 2D plane (Top-down)?
- **Speed:** Is the LCP for the machine render under 1.2s?

### 2. Coding Conventions
- **Deconstruction Strategy:** Use `position: absolute` for machine layers with a shared `layoutId` in Framer Motion for re-assembly transitions.
- **Metric Strategy:** Strictly use `Intl.NumberFormat` for all technical data to ensure professional precision across locales.
- **State Management:** Use Zustand for machine comparisons to handle multi-product spec toggling without re-renders.
- **Image Strategy:** All hardware renders must use `priority` and `quality={95}` to maintain "Laboratory Quality" visual depth.

### 3. File Structure
```
src/
  app/
    (showcase)/     # dyson.in (Central Engineering Hub)
    technology/     # Scientific deep-dives (Hair, Dust, Air)
    specs/          # Meticulous technical comparison tables
    support/        # Owner manuals and warranty registration
  components/
    product/        # ExplodedHero, MetricCounter, ScienceBlock
    ecosystem/      # AccessoryGrid, ToolCard, InTheBox
    detail/         # SpecTable, MachineCompare, FeatureGrid
    layout/         # MinimalNav, LaboratoryFooter, StickySubNav
  store/            # useMachineStore, useComparisonStore
  lib/              # sanity-client, framer-motion-presets, d2c-hooks
```

### 4. Definition of Done
- Engineering hub correctly establishes authority via deconstructed heros and metrics.
- Accessory grid renders 10+ tools flawlessly with integrated demonstration videos.
- Technical spec table provides exhaustive data with zero layout shift.
- Mobile view maintains "Industrial Precision" via responsive stacks and high-contrast typography.
