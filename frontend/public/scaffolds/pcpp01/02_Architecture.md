# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_01

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Focus on custom dark-mode utility tokens)
- **Animation:** Framer Motion (Gallery transitions and staggered reveals)
- **Database/Auth:** Supabase (Project CMS, Shop Inventory, and User Auth)
- **Video Pipeline:** Mux or Vimeo Video SDK (For high-quality reels)
- **Payments:** Stripe (Checkout Overlay for prints and books)

### 2. Data Model
```sql
-- Projects (Photography Series)
table projects (
  id uuid primary key,
  title text not null,
  slug text unique,
  description text,
  cover_image_url text,
  category text, -- 'portrait', 'documentary', 'motion'
  is_featured boolean default false
);

-- Media (Images & Videos within Projects)
table media (
  id uuid primary key,
  project_id uuid references projects(id),
  type text, -- 'image', 'video'
  url text,
  width integer,
  height integer,
  caption text,
  display_mode text -- 'full-bleed', 'diptych', 'portrait'
);

-- Shop (Fine-Art Prints)
table prints (
  id uuid primary key,
  media_id uuid references media(id),
  title text,
  price_cents integer,
  edition_size integer,
  is_available boolean default true
);
```

### 3. Immersive Media Flow
1. Next.js fetches `project` and associated `media` from Supabase.
2. `GalleryEngine` maps media types to specific layout components (e.g., `FullBleedImage`, `DiptychGrid`).
3. Images are processed via Next.js Image Optimization API with `priority` for the first 3 items.
4. Video loops are handled by a custom `VideoReel` component with `muted` and `playsInline` attributes.
