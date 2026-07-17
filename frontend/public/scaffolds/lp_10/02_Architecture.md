# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_10

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **State Management:** Zustand (For managing the active Block Tree and unauthenticated state).
- **Storage:** Dexie.js (IndexedDB wrapper for local-first persistence) or LocalStorage for simple drafts.
- **Styling:** Tailwind CSS (Custom "Notion" utility system).
- **Auth:** Clerk or Auth.js (Integrated for the "Workspace Transition" flow).
- **CMS:** Contentlayer (For public roadmap data and template metadata).

### 2. Data Model
```sql
-- Blocks (The Content Units)
type Block = {
  id: string,
  type: 'text' | 'input' | 'choice' | 'image' | 'logic',
  content: jsonb, -- e.g., { 'placeholder': 'Enter name', 'required': true }
  order_index: integer
};

-- Forms (The Drafts/Workspaces)
table forms (
  id uuid primary key,
  user_id uuid, -- NULL for anonymous drafts
  title text default 'Untitled Form',
  block_data jsonb, -- Array of Blocks
  is_published boolean default false,
  slug text unique
);

-- Public Stats (The Transparency)
table site_stats (
  id uuid primary key,
  monthly_revenue integer,
  active_users_count integer,
  launched_features text[]
);
```

### 3. Action-First Data Flow
1. **Entry:** Next.js mounts the `EditorHub` on `/create`. Zustand initializes `activeBlocks` from IndexedDB if a draft exists.
2. **Interaction:** User types `/` -> `SlashMenu` appears -> User selects "Input" -> New `Block` object is pushed to Zustand and synced to IndexedDB.
3. **Template Discovery:** `/templates` fetches metadata via Contentlayer; clicking a template clones the JSON block-tree into the user's active Zustand state.
4. **Acquisition:** On "Save" -> `WorkspaceTransition` triggers Clerk login; post-auth, a Server Action pushes the `activeBlocks` JSON from client-state to the Supabase `forms` table.
5. **Transparency Sync:** Footer stats fetch from a cache-validated API route connected to the `site_stats` table.
