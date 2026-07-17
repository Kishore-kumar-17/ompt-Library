# 07 — Guide
## Engineering Standards · lp_platform_11

### 1. GalleryElite Checklist
- **Neutrality:** Is the foundation strictly Pure White or Black? (Avoid brand color backgrounds).
- **Precision:** Are all borders and dividers strictly 1px hair-lines?
- **Motion:** Does hovering over a card trigger the video preview within 300ms?
- **Speed:** Is the Algolia discovery providing results in under 200ms?

### 2. Coding Conventions
- **Grid Strategy:** Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` for high-performance responsive masonry.
- **Search Strategy:** Strictly use Algolia for discovery to handle high-density metadata with software-grade response times.
- **State Management:** Use Zustand with `persist` for recently viewed templates to build a personalized user experience.
- **Image Strategy:** All thumbnails must use `priority` and `sizes` to ensure 0ms layout shift in the grid.

### 3. File Structure
```
src/
  app/
    (gallery)/      # Homepage, Masonry Grid, Category pages
    templates/      # Detailed preview and remix pages ([slug])
    creators/       # Creator profile pages and archives
    api/            # Algolia webhooks, Remix session hooks
  components/
    grid/           # MasonryEngine, TemplateCard, VideoHover
    discovery/      # FilterBar, SearchOverlay, CategoryPill
    preview/        # DetailModal, SiteSnapshot, RemixTrigger
    layout/         # MinimalNav, NeutralFooter, HubHeader
  store/            # useDiscoveryStore, usePreviewStore
  lib/              # sanity-client, algolia-config, remix-utils
```

### 4. Definition of Done
- Gallery hub correctly filters and displays 100+ templates with zero lag.
- Template cards play high-fidelity video loops on hover flawlessly.
- Detail modals provide scrolling snapshots and instant Live Preview links.
- Mobile view maintains "Visual Discovery" via responsive filters and dense masonry stacks.
