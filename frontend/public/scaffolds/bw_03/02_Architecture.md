# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_03

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Story, Collection, and Community data).
- **Styling:** Tailwind CSS (Custom "Vibrancy" theme with Suta Red/Teal tokens).
- **Cart Engine:** Zustand + Persist (For complex offer logic and multi-session cart memory).
- **Database/Auth:** Supabase (For Customer Testimonials, Wishlists, and Lead Management).
- **Communication:** WhatsApp Business API (For community support and order updates).

### 2. Data Model
```sql
-- Stories (The Suta Book)
table suta_stories (
  id uuid primary key,
  title text not null, -- 'Dipped in Love'
  slug text unique,
  body_md text, -- Poetry and narrative
  featured_product_ids uuid[], -- Array of sarees mentioned
  cover_image_url text
);

-- Products (with Evocative Naming)
table products (
  id uuid primary key,
  display_name text not null, -- 'Village In Heaven'
  technical_name text, -- 'Mul Cotton Saree - Blue'
  price_cents integer,
  available_sizes text[], -- ['XXS', ..., '4XL']
  category_id uuid,
  story_id uuid references suta_stories(id),
  is_bestseller boolean default false
);

-- Community (Social Proof)
table testimonials (
  id uuid primary key,
  customer_name text,
  image_url text,
  product_id uuid references products(id),
  text_snippet text,
  is_verified boolean default true
);

-- Offers (The Sunami Logic)
table active_offers (
  id uuid primary key,
  label text, -- 'Buy 3 Get 1'
  type text, -- 'bundle_discount'
  required_quantity integer,
  free_quantity integer,
  ends_at timestamp
);
```

### 3. "Story-to-Sale" State Flow
1. User enters a "Suta Book" page: `/suta-book/[slug]`.
2. `StoryRenderer` fetches the MDX content and associated `products` from Sanity.
3. `ProductBuyPoint` component is injected into the text flow, allowing users to select size and "Add to Bag" instantly.
4. `OfferEngine` (Zustand) monitors the cart and displays a "Add 1 more to get 1 free!" nudge if the user hits the threshold.
5. `TestimonialGrid` on the homepage fetches latest `testimonials` from Supabase and renders them with "Shop this Look" links.
