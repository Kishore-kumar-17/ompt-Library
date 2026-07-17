# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_02

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Strapi (For complex multi-relation Session, Speaker, and Venue data).
- **Search Engine:** Algolia (For high-speed speaker and session discovery).
- **Styling:** Tailwind CSS (Custom "Enterprise" theme with glassmorphism utility plugins).
- **State Management:** Zustand (For managing "View Mode" and "My Schedule" persistence).
- **App Sync:** Node.js API for generating deep-link tokens for the mobile app.

### 2. Data Model
```sql
-- Venues (The Locations)
table venues (
  id uuid primary key,
  name text not null, -- 'Grand Ballroom', 'Tech Cafe'
  capacity integer,
  map_coordinates jsonb
);

-- Speakers (The Authority)
table speakers (
  id uuid primary key,
  name text not null,
  designation text, -- 'CEO at Microsoft India'
  portrait_url text,
  bio_md text,
  linkedin_url text,
  industry text
);

-- Sessions (The Agenda)
table sessions (
  id uuid primary key,
  title text not null,
  description text,
  start_time timestamp,
  end_time timestamp,
  venue_id uuid references venues(id),
  speaker_ids uuid[], -- Many-to-many
  track text -- 'Keynote', 'Masterclass', 'Fireside'
);

-- Favorites (Personalization)
table user_schedules (
  id uuid primary key,
  user_email text,
  session_ids uuid[]
);
```

### 3. "Strategic Agenda" Data Flow
1. Next.js fetches `active_theme` and `top_speakers` from Sanity using ISR.
2. `AgendaHub` fetches all `sessions` and `venues`; `ViewToggle` updates the Zustand state (`LIST` vs `VENUE`).
3. If `VENUE` view: CSS Grid dynamically organizes sessions into columns based on `venue_id`.
4. `AlgoliaSearch` provides real-time filtering; results are rendered as an overlay on the Agenda page.
5. On "Bookmark": User's session selection is saved to `localStorage` (via Zustand persist) and optionally synced to the `user_schedules` table in Supabase.
