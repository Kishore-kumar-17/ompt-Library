# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_02

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Focus on high-contrast grid layouts)
- **CMS:** Contentlayer (For local MDX-based Lens Museum and Blog)
- **State Management:** Zustand (For sidebar state, cart, and category filters)
- **Database/Auth:** Supabase (For User Orders and Print Inventory)
- **Payments:** Stripe or Lemonsqueezy (Digital asset delivery)

### 2. Data Model
```sql
-- Projects (Portfolios tagged by technique)
table projects (
  id uuid primary key,
  title text not null,
  slug text unique,
  techniques text[], -- ['infrared', 'trichromy']
  cover_image_url text,
  blog_post_id text -- Link to educational content
);

-- Lens Museum (Technical Gear Archive)
table lens_museum (
  id uuid primary key,
  name text not null,
  mount text,
  year_released integer,
  aperture_range text,
  description_md text,
  sample_images text[]
);

-- Products (LUTs, Presets, Ebooks)
table products (
  id uuid primary key,
  title text,
  type text, -- 'lut', 'preset', 'ebook', 'print'
  price_cents integer,
  download_url text,
  thumbnail_url text
);
```

### 3. Technique-Based Routing Flow
1. User clicks a sidebar technique link (e.g., `/photography/infrared`).
2. Next.js dynamic route `[technique]` fetches all projects with the matching tag from the CMS.
3. `TechniqueGallery` component renders the grid with a 1-sentence technique summary from a metadata file.
4. Digital assets (LUTs) tagged with the same technique are displayed as "Recommended Tools" at the bottom of the page.
