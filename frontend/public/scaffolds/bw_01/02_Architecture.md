# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_01

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (For hierarchical Craft, Collection, and Narrative data).
- **Video Pipeline:** Mux or Cloudinary (For high-bitrate artisanal trailers).
- **Styling:** Tailwind CSS (Custom "Luxury" theme with Montserrat/Serif hierarchy).
- **E-commerce:** Shopify Headless (Product inventory, Bag, and Multi-region Checkout).
- **Communication:** WhatsApp Business API (For the concierge inquiry layer).

### 2. Data Model
```sql
-- Crafts (The Artisanal Techniques)
table crafts (
  id uuid primary key,
  name text not null, -- 'Gota Patti', 'Bandhani'
  slug text unique,
  history_md text,
  artisan_video_url text,
  thumbnail_url text
);

-- Collections (The Seasonal Moods)
table collections (
  id uuid primary key,
  title text not null, -- 'Rewild Couture', 'Matrimania'
  slug text unique,
  hero_video_mux_id text,
  narrative_intro text,
  is_active boolean default true
);

-- Products ( Garments linked to Craft)
table products (
  id string primary key, -- Shopify Variant ID
  collection_id uuid references collections(id),
  craft_ids uuid[], -- Many-to-many relationship
  name text,
  price_cents integer,
  high_res_detail_images text[],
  is_bespoke_only boolean default false
);
```

### 3. Artisanal Data Flow
1. Next.js fetches `featured_collections` and `craft_nav` from Sanity using ISR.
2. `CraftEngine` maps product tags from Shopify to the `crafts` table in Sanity to surface "Behind the Craft" content on PDPs.
3. `VideoTheater` handles the auto-playing muted loops of artisans at work.
4. `WhatsAppConcierge` triggers a custom event to the brand's luxury sales team, including the `product_id` and `current_region` context.
