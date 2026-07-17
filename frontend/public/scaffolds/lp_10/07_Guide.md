# 07 — Guide
## Engineering Standards · lp_platform_10

### 1. TallySimplicity Checklist
- **Friction:** Can the user build a 3-field form in under 60 seconds without an account?
- **Style:** Are all inputs using hair-line 1px borders? Is the background pure white?
- **Nav:** Is the slash-command menu (/) functional and snappy (<50ms)?
- **Trust:** Are public stats and roadmap status clearly visible in the global footer?

### 2. Coding Conventions
- **State Strategy:** Use a `normalized` block tree in Zustand (Map of IDs) to ensure high-performance updates and simple drag/reorder logic.
- **Persistence Strategy:** Use `persist` middleware in Zustand with a custom storage engine for IndexedDB to handle large form drafts.
- **Auth Strategy:** All "Draft-to-Cloud" logic must happen in a server action to prevent local data loss during sign-up redirects.
- **Image Strategy:** All product screenshots and template previews must use `priority` and specific `sizes` for the hub grid.

### 3. File Structure
```
src/
  app/
    (hub)/          # tally.so (Central Product Hub)
    create/         # Action-first unauthenticated editor
    templates/      # Category-based form library
    roadmap/        # Public development and revenue stats
  components/
    editor/         # BlockTree, SlashMenu, BaseBlock, InputBlock
    discovery/      # TemplateGrid, UseTemplateButton, CategoryFilter
    transparency/   # RevenueStats, RoadmapTimeline, FeatureRequest
    layout/         # MinimalNav, ProductiveFooter, WorkspaceSidebar
  store/            # useEditorStore, useWorkspaceStore
  lib/              # dexie-db, clerk-utils, contentlayer-parsers
```

### 4. Definition of Done
- Product hub correctly redirects to unauthenticated editor with near-zero latency.
- Block-editor handles slash-commands and local persistence flawlessly.
- Template discovery hub allows for 1-click cloning into the active editor.
- Mobile view maintains "Document Purity" via responsive vertical stacks and minimalist hamburgers.
