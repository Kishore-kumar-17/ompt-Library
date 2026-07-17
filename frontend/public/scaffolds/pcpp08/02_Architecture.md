# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_08

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom "Production" theme with Slate/Gold tokens).
- **Video:** Mux Video API (For high-bitrate trailers and hover-previews).
- **CMS:** Sanity.io (Structured Category, Service, and Project data).
- **Database/Auth:** Supabase (Client inquiries and team metadata).
- **State Management:** Zustand (For category filters and video player state).

### 2. Data Model
```sql
-- Services (High-level pillars)
table services (
  id uuid primary key,
  title text not null, -- 'Photography', 'Cinematography'
  slug text unique,
  statistical_summary text, -- '500+ Films Delivered'
  cover_image_url text
);

-- Projects (Individual Weddings/Shoots)
table projects (
  id uuid primary key,
  service_id uuid references services(id),
  title text not null,
  slug text unique,
  location text,
  thumbnail_url text,
  video_mux_id text, -- Mux ID for trailers
  image_urls text[] -- Array of project photos
);

-- Team (The Crew)
table team_members (
  id uuid primary key,
  name text not null,
  role text, -- 'Artistic Director', 'Lead Cinematographer'
  portrait_url text,
  bio_excerpt text
);

-- Inquiries (Lead Capture)
table leads (
  id uuid primary key,
  client_name text,
  event_date date,
  service_interest text[],
  message text
);
```

### 3. Production Media Flow
1. Next.js fetches `services` and `featured_projects` from Sanity using `force-static`.
2. `MosaicEngine` renders the homepage blocks using dynamic CSS grid templates.
3. `VideoHoverPreview` component uses the Mux thumbnail API to show a low-bitrate video loop on card hover.
4. `ProjectPage` fetches full-res imagery and the 4K trailer, rendering them in a unified vertical scroll.
5. Inquiries are captured in Supabase and trigger a Resend notification to the studio's sales alias.
