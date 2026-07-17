# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_05

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom Gold/Maroon theme tokens)
- **Animation:** Framer Motion (Romantic transitions and gold-stroke reveals)
- **Video:** Mux Video API (High-bitrate streaming and adaptive bitrates)
- **CMS:** Sanity.io (Structured StoryBook content: Chapters, Snippets, Media)
- **Database/Auth:** Supabase (Inquiry storage and lead management)

### 2. Data Model
```sql
-- Chapters (The Wedding Stories)
table chapters (
  id uuid primary key,
  couple_names text not null,
  slug text unique,
  narrative_intro text,
  location text,
  wedding_date date,
  cover_media_url text,
  trailer_mux_id text
);

-- Snippets (Media within Chapters)
table snippets (
  id uuid primary key,
  chapter_id uuid references chapters(id),
  type text, -- 'photo', 'film', 'quote'
  url text,
  layout_mode text, -- 'full-bleed', 'diptych', 'portrait'
  is_featured boolean default false
);

-- Inquiries (Leads)
table inquiries (
  id uuid primary key,
  name text,
  partner_name text,
  email text,
  story_text text, -- 'How they met'
  wedding_date date,
  venue text,
  status text default 'new'
);
```

### 3. "Cinematic Story" Delivery Flow
1. Middleware or dynamic route `[slug]` fetches `chapter` and related `snippets` from Sanity.
2. `VideoHero` uses the `mux_id` to start high-quality playback with lazy-loading posters.
3. `PhotoGrid` maps snippets to a custom layout engine that alternates between grand landscape shots and intimate portrait pairings.
4. `YourStoryForm` submits data to Supabase and triggers a Resend notification to the sales team.
