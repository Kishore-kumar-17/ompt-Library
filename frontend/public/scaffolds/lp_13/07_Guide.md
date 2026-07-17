# 07 — Guide
## Engineering Standards · lp_platform_13

### 1. Glassmorphic Checklist
- **Translucency:** Is the `backdrop-blur` level consistent across all cards (xl)?
- **Glows:** Do pulsing AI gradients follow a linear easing path?
- **Hierarchy:** Does the provocative H1 start above the fold?
- **Speed:** Is the LCP for the product hero under 150ms? (Use WebP and preloading).

### 2. Coding Conventions
- **Glass Strategy:** Strictly use `rgba(255, 255, 255, 0.08)` with `backdrop-blur-xl` for all glass surfaces to maintain high-fidelity consistency.
- **Motion Strategy:** Use Framer Motion `layoutId` for the Split-View transitions to ensure fluid cross-component animations.
- **Image Strategy:** All product frames must be exported as 2x `.webp` with `priority` set on the hero mockup to ensure instant pop.
- **CSS Strategy:** Use Tailwind's `group-hover` for inner-glow border expansions on card interactions.

### 3. File Structure
```
src/
  app/
    (hub)/          # arc.net (Central Product Manifest)
    features/       # Deconstructed feature deep-dives
    download/       # Platform-specific acquisition portal
    releases/       # Searchable release notes archive
  components/
    product/        # BrowserFrame, SplitView, SidebarVisualizer
    ui/             # GlassCard, VibrantCTA, AIHighlight
    acquisition/    # DownloadPortal, PlatformSelector, VersionLabel
    layout/         # GlassNav, DeepFooter, GradientBackground
  store/            # useProductStore, useAcquisitionStore
  lib/              # framer-motion-utils, contentlayer-config
```

### 4. Definition of Done
- Product hub correctly establishes "A Better Way" via bold heros and glass mockups.
- Glass cards provide high-fidelity visual feedback with zero performance lag.
- Interactive split-view flawlessly demonstrates multi-tasking productivity.
- Mobile view maintains "Dynamic Translucency" via optimized blurs and responsive text.
