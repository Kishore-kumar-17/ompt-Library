# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_12

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Resume, Project, and Writing data).
- **Animation:** Framer Motion (For expandable layers and smooth tab switching).
- **Styling:** Tailwind CSS (Custom "Editorial" theme with off-white palette).
- **State Management:** Zustand (For managing active layers and navigation state).
- **Media:** Next.js `<Image>` with customized quality and specific `sizes` for card grids.

### 2. Data Model
```sql
-- Profiles (User Core)
table profiles (
  id uuid primary key,
  username text unique,
  full_name text not null,
  bio text,
  avatar_url text,
  status_items jsonb -- [{ 'type': 'working', 'label': 'Project X' }]
);

-- Work History (The Timeline)
table work_history (
  id uuid primary key,
  profile_id uuid references profiles(id),
  company_name text,
  logo_url text,
  role text,
  start_date date,
  end_date date, -- null for current
  is_current boolean,
  summary_excerpt text,
  layer_content_md text -- Detailed case study MDX
);

-- Side Projects (The Creative Layer)
table side_projects (
  id uuid primary key,
  profile_id uuid references profiles(id),
  title text,
  description text,
  cover_image_url text,
  tech_stack text[],
  project_url text
);

-- Writing (The Journal)
table writing (
  id uuid primary key,
  profile_id uuid references profiles(id),
  title text,
  slug text unique,
  body_md text,
  publish_date timestamp,
  reading_time_minutes integer
);
```

### 3. Modular Identity Flow
1. Next.js fetches the `profile` and its initial `work_history` items from the CMS.
2. `TimelineEngine` renders the vertical arc with "Current Role" visual priority.
3. `LayerManager` (Zustand) tracks which project ID is expanded, triggering the Framer Motion height transition.
4. `TabRouter` handles navigation between Work / Side Projects / Writing / About without full page reloads.
5. Search/Explore indexes use the `projects` and `writing` tags to surface talent to recruiters.
