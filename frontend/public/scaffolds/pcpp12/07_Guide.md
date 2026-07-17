# 07 — Guide
## Engineering Standards · pcpp_platform_12

### 1. CanvasCV Checklist
- **Clarity:** Is every work entry scannable in under 3 seconds?
- **Depth:** Does the "Project Layer" expand smoothly without jarring layout shifts?
- **Typography:** Is the Inter-font hierarchy strictly followed for all data points?
- **Color:** Is the UI strictly neutral (#FAF9F6) to allow user imagery to provide the vibe?

### 2. Coding Conventions
- **State Management:** Strictly use Zustand for the `expandedLayerId` to ensure only one layer is open at a time.
- **Image Strategy:** All project heros must use `placeholder="blur"` and `priority` to maintain a premium feel.
- **Transitions:** Use `stiffness: 300, damping: 30` for all Framer Motion springs to create a "snappy tech" feel.
- **Accessibility:** Ensure all expandable cards have `aria-expanded` states and are keyboard-triggerable.

### 3. File Structure
```
src/
  app/
    (profile)/      # Dynamic user profiles ([username])
    writing/        # Detailed journal and essays
    explore/        # Discovery feed and role filters
    settings/       # Account and profile management
  components/
    timeline/       # TimelineEngine, WorkCard, LayerContent
    profile/        # ProfileHeader, StatusChips, SideProjectGrid
    writing/        # ArticleList, TypographyEngine, Complementary
    layout/         # MinimalNav, PaperFooter, PortalHeader
  store/            # useLayerStore, useNavStore
  lib/              # sanity-client, supabase-utils, mdx-config
```

### 4. Definition of Done
- Professional profile correctly renders a vertical work timeline with zero layout shift.
- Project layers expand and collapse flawlessly with smooth motion.
- Explore feed correctly filters and displays a network of visual portfolios.
- Mobile view maintains "Editorial Mastery" with responsive scrollers and scannable cards.
