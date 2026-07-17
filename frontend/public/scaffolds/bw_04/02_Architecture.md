# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_04

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Journal, Product, and Gifting metadata).
- **Search:** Algolia (For cross-category discovery and gift-guide filtering).
- **Styling:** Tailwind CSS (Custom "Tropical" theme with earthy palette tokens).
- **E-commerce:** Shopify Headless (Product inventory, checkout, and shipping logic).
- **Audio:** Spotify/Soundcloud Embeds (For "Nico Radio" integration).

### 2. Data Model
```sql
-- Collections (The Thematic Anchors)
table collections (
  id uuid primary key,
  title text not null, -- 'Ganga', 'Rewild'
  slug text unique,
  description_md text,
  is_active boolean default true
);

-- Products (Fashion, Home, Travel)
table products (
  id string primary key, -- Shopify ID
  collection_id uuid references collections(id),
  category text check (category in ('fashion', 'home', 'travel')),
  name text,
  price_cents integer,
  pairing_ids uuid[], -- Self-references for "Pair it with"
  is_ready_to_ship boolean default true
);

-- Journal Entries (The Lifestyle Content)
table journal_entries (
  id uuid primary key,
  title text,
  slug text unique,
  body_md text,
  audio_url text, -- Spotify link
  featured_product_ids uuid[], -- For "Shop the Look"
  publish_date timestamp
);
```

### 3. Cross-Category Discovery Flow
1. Next.js fetches `product` data from Shopify and its associated `collection` metadata from Sanity.
2. `DiscoveryEngine` identifies other products with the same `collection_id` or matching `pairing_ids`.
3. `PairingCarousel` on the PDP renders these items, allowing the user to bridge between Apparel and Home Decor.
4. `JournalRenderer` maps `featured_product_ids` to interactive buy-points within the editorial narrative.
