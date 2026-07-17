# 04 — Build Plan
## Roadmap & Milestones · lp_platform_10

### Phase 1: Productivity Shell & Core (Week 1)
- Set up Next.js 14 project with the "Notion-Native" theme and Inter font.
- Build the "Document Nav" (Minimal with black CTA) and the centralized Hub Shell.
- Implement the "Try-Before-Join" routing logic for `/create`.
- **Goal:** A beautiful, white-paper entry portal.

### Phase 2: Block-Editor Engine (Week 2)
- Build the initial rich-text component with slash-command detection.
- Implement the `BlockTree` Zustand store with IndexedDB sync.
- Create the "Input," "Text," and "Logic" block types.
- **Goal:** Users can build a basic form without an account.

### Phase 3: Action-First Marketplace & Catalog (Week 3)
- Build the `TemplateDiscovery` hub with use-case filtering.
- Implement the "Clone to Editor" logic for templates.
- Create the "Disruptive Free Features" grid on the homepage.
- **Goal:** High-conversion curriculum and template discovery.

### Phase 4: Workspace Transition & Auth (Week 4)
- Integrate Clerk for the unauthenticated-to-member handoff.
- Build the "Save Workspace" modal that pushes local drafts to Supabase.
- Implement the "Share/Publish" slug generation logic.
- **Goal:** Secure monetization and workspace management is live.

### Phase 5: Transparency Hub & Final Polish (Week 5)
- Build the "Build in Public" stats and public roadmap components.
- Final performance audit for keystroke latency and LCP (Target <50ms).
- Accessibility audit for keyboard-only form creation.
- **Goal:** A complete, world-class action-first productivity platform.
