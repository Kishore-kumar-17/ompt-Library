# 07 — Guide
## Engineering Standards · pcpp_platform_04

### 1. UniverseStory Checklist
- **Multi-tenancy:** Is the hostname correctly detected and used to switch the project context?
- **Sequence:** Are image pairs correctly aligned and entering the viewport together?
- **Rounding:** Are all corners strictly sharp (0px)?
- **Typography:** Is the body text line-height generous enough for long-form reading?

### 2. Coding Conventions
- **Routing:** Use Next.js Middleware to handle the `Universe` model without requiring multiple Vercel projects.
- **CMS:** Use a "Project-Planet" hierarchy in the CMS to ensure data isolation between different domains.
- **Animation:** All sequence reveals must be scroll-triggered (not time-triggered) to follow the reader's pace.
- **Data:** Store image aspect ratios in the CMS to prevent layout shift during the sequence scroll.

### 3. File Structure
```
src/
  app/
    (hub)/          # maheshshantaram.com (Central Hub)
    (planets)/      # matrimania.in, narrada.in, etc.
    api/            # Shared API routes
  components/
    sequence/       # StoryBlock, Pair, Triptych, Progress
    portal/         # PlanetCard, UniverseSwitcher, PortalTransition
    editorial/      # NarrativeBlock, SidebarNav, PressGrid
  lib/              # multi-tenancy-utils, cms-client, seo-config
  middleware.ts     # Domain routing logic
```

### 4. Definition of Done
- Multi-domain routing is functional and context-aware.
- Narrative sequences load and reveal smoothly with zero layout shift.
- Journal CMS supports complex interspersed text and image sequences.
- Project planets maintain a consistent portal navigation back to the hub.
