# 07 — Guide
## Engineering Standards · pcpp_platform_08

### 1. CrewCinema Checklist
- **Dynamics:** Is the homepage grid a mosaic (mixed sizes) rather than a uniform grid?
- **Motion:** Do project cards show a video preview on hover?
- **Rounding:** Are all corners consistently `rounded-lg` (8px)?
- **Trust:** Is the 4.6/5 rating badge visible on the homepage and footer?

### 2. Coding Conventions
- **Video Strategy:** Strictly use Mux for all trailer content to handle high-bitrate adaptive streaming for 4K.
- **Grid Performance:** Use `loading="lazy"` and `content-visibility: auto` for the high-density mosaic grids.
- **State Management:** Use Zustand for the `activeVideo` state to handle the transition to theater-mode modals.
- **Responsive:** Ensure the mosaic grid areas are reconfigured for mobile (e.g., 2-column simplified stack).

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Crew, Testimonials
    services/       # Dynamic service-category hubs
    projects/       # Detailed photo/video series
    contact/        # High-conversion inquiry portal
  components/
    grid/           # MosaicEngine, ProjectCard, VideoPreview
    team/           # CrewGrid, MemberCard, DirectorBio
    layout/         # StudioNav, TrustStrip, SlateFooter
    ui/             # GoldBadge, StatsCounter, TheaterModal
  store/            # useProductionStore, useNavStore
  lib/              # sanity-client, mux-utils, lead-capture
```

### 4. Definition of Done
- Service Mosaic handles variable card sizes flawlessly across breakpoints.
- Video heros and previews load within 1s on high-speed connections.
- Inquiry form successfully validates and saves multi-service interest data.
- Mobile view maintains "Technical Scale" with high-density, performant imagery.
