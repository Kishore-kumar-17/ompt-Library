# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_07

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Location, Menu, and Award data).
- **Search:** Algolia (For global press and archive discovery).
- **Styling:** Tailwind CSS (Custom "Luxury" theme with Brass/Charcoal tokens).
- **Reservation API:** OpenTable Widget Integration (per-location routing).
- **E-commerce:** Stripe (For high-AOV Gift Cards and Cookbooks).

### 2. Data Model
```sql
-- Locations (Global Flags)
table locations (
  id uuid primary key,
  city_name text not null, -- 'New Delhi', 'New York'
  slug text unique,
  hero_image_url text,
  opentable_id text,
  address_md text
);

-- Menus (Location-Specific)
table menus (
  id uuid primary key,
  location_id uuid references locations(id),
  title text, -- 'Summer Tasting Menu'
  is_active boolean default true
);

table menu_items (
  id uuid primary key,
  menu_id uuid references menus(id),
  name text not null,
  description text,
  chef_note text,
  image_url text,
  order_index integer
);

-- Accolades (Social Proof)
table accolades (
  id uuid primary key,
  title text not null,
  logo_url text, -- Grayscale SVG
  year_label text,
  is_global_top_tier boolean default false
);
```

### 3. Global Hub Routing Flow
1. Next.js `middleware.ts` detects user geolocation (optional) or defaults to the `GlobalSwitcher`.
2. Hub Page fetches `locations` and `top_accolades` from Sanity using ISR.
3. User selects a city -> Dynamic route `/(locations)/[city]` loads specific location assets.
4. `TastingMenu` component renders items from the `menu_items` table linked to that `location_id`.
5. Reservation link is dynamically generated using the `opentable_id` from the `locations` table.
