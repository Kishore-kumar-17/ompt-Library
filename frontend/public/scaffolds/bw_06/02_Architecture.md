# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_06

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Bento-Block, Menu, and Event data).
- **Styling:** Tailwind CSS (Custom "Fontainhas" theme with Sunlight/Terracotta tokens).
- **Animation:** Framer Motion (For springy block reveals and mascot behaviors).
- **Lead Capture:** Supabase (For inquiry storage and newsletter signups).

### 2. Data Model
```sql
-- Bento Blocks (The Homepage)
table bento_blocks (
  id uuid primary key,
  title text not null,
  type text check (type in ('menu', 'story', 'order', 'shop')),
  image_url text,
  link_url text,
  order_index integer
);

-- Menus (The Content)
table menu_sections (
  id uuid primary key,
  name text not null, -- 'Small Plates', 'Cocktails'
  slug text unique,
  order_index integer
);

table menu_items (
  id uuid primary key,
  section_id uuid references menu_sections(id),
  name text not null,
  description text,
  price_paise integer, -- Pricing in Indian Paise
  is_rocky_favorite boolean default false
);

-- Happy Times (Events)
table events (
  id uuid primary key,
  title text not null,
  date_label text, -- 'Every Sunday', 'Nov 15th'
  image_url text,
  cta_url text
);
```

### 3. Coastal Data Flow
1. Next.js fetches `bento_blocks` and `active_menu` from Sanity using `force-static` for extreme speed.
2. `BentoEngine` renders the grid; `RockyMascot` components are injected based on the `is_rocky_favorite` tag.
3. `MenuLayout` provides a vertical text-based scroll, optimized for mobile reading in high-glare outdoor settings.
4. Enquiry data is sent to Supabase and triggers a professional "Sussegad" confirmation email to the guest.
