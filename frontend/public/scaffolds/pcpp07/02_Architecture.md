# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_07

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom "Stone" utility tokens and ultra-wide grid logic).
- **Animation:** Framer Motion (Slow "Aero" fades and scroll-parallax scaling).
- **CMS:** Sanity.io (For Story Chronology and Location metadata).
- **Database/Auth:** Supabase (International lead management).
- **Media:** Next.js `<Image>` with customized quality and specific `sizes` for 4K displays.

### 2. Data Model
```sql
-- Locations (The Destinations)
table locations (
  id uuid primary key,
  name text not null, -- 'Udaipur', 'Alps', 'Patagonia'
  slug text unique,
  description_md text,
  cover_landscape_url text
);

-- Stories (The Chronological Events)
table stories (
  id uuid primary key,
  location_id uuid references locations(id),
  couple_names text,
  start_time timestamp,
  narrative_excerpt text
);

-- Media (The scale-first assets)
table media (
  id uuid primary key,
  story_id uuid references stories(id),
  url text,
  type text, -- 'landscape', 'portrait', 'detail'
  time_of_day text, -- '08:00 AM', 'Sunset'
  display_order integer
);

-- Leads (International Inquiries)
table leads (
  id uuid primary key,
  name text,
  destination text,
  wedding_date date,
  vision_text text
);
```

### 3. Atmospheric Image Flow
1. Next.js fetches `location` and `media` from Sanity using `force-cache` for instant speed.
2. `AeroHero` component initiates the 1.5s slow-fade loop for the main landing heros.
3. `ChronologyLayout` groups media by the `time_of_day` tag to create the narrative sections.
4. Images are rendered with `quality={90}` and `priority={true}` for the top 3 landscape shots to minimize LCP.
