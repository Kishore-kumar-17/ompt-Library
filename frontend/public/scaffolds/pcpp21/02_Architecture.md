# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_21

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Speaker, Session, and Track data).
- **Search Engine:** Algolia (For near-instant speaker and session discovery).
- **Styling:** Tailwind CSS (Custom "Kelly Green" theme with Dark Mode defaults).
- **State Management:** Zustand (For managing "My Schedule" persistence and track filters).
- **Media:** Next.js `<video>` and Cloudinary (For high-performance video heros).

### 2. Data Model
```sql
-- Speakers (The Talent)
table speakers (
  id uuid primary key,
  name text not null,
  role text, -- 'CPO at Figma'
  company text,
  bio_md text,
  portrait_url text, -- B&W source
  color_portrait_url text, -- For hover
  social_links jsonb
);

-- Sessions (The Schedule)
table sessions (
  id uuid primary key,
  title text not null,
  description text,
  start_time timestamp,
  end_time timestamp,
  room_name text,
  track_id uuid references tracks(id),
  speaker_ids uuid[] -- Array of speakers
);

-- Tracks (The Categories)
table tracks (
  id uuid primary key,
  name text, -- 'Product Design', 'Dev', 'AI'
  color_hex text -- 'Kelly Green'
);

-- Registrations (The Leads)
table registrations (
  id uuid primary key,
  email text unique,
  tier text, -- 'in-person', 'virtual'
  schedule_json jsonb -- Array of session IDs
);
```

### 3. "Creative Momentum" Data Flow
1. Next.js fetches `featured_speakers` and `active_tracks` from Sanity using ISR.
2. `VideoHero` uses the Cloudinary API to deliver adaptive-bitrate background loops with poster-image fallbacks.
3. `ScheduleTimeline` fetches all `sessions` and uses a client-side hook to format times based on the user's browser `timeZone`.
4. `Zustand` store manages the `mySchedule` array; on "Add to Schedule", the local state is updated and optionally synced to Supabase for authenticated users.
5. Search/Discovery uses Algolia to index speaker names and session keywords, providing instant results in the navigation overlay.
