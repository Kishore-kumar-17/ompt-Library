# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_05

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Menu, Story, and Shop metadata).
- **Styling:** Tailwind CSS (Custom "Nostalgic" theme with Parchment/Foliage tokens).
- **Animation:** Framer Motion (For side-drawer transitions and staggered menu reveals).
- **Reservation API:** SevenRooms or OpenTable Widget Embed (using Slide-out patterns).
- **E-commerce:** Shopify Headless or Stripe (For Merch Shop and Gift Cards).

### 2. Data Model
```sql
-- Menu (Seasonal Offerings)
table menu_items (
  id uuid primary key,
  title text not null, -- 'Desi Chilli Hummus'
  description text,
  category_id uuid references menu_categories(id),
  dietary_tags text[], -- ['Veg', 'Contains Nuts']
  price_cents integer,
  is_seasonal boolean default true
);

-- Categories (The Icon-Led Hub)
table menu_categories (
  id uuid primary key,
  name text not null, -- 'Small Plates', 'Hearty'
  slug text unique,
  icon_url text, -- Custom illustrative SVG
  order_index integer
);

-- Stories (The Canteen Blog)
table stories (
  id uuid primary key,
  title text,
  slug text unique,
  body_md text,
  featured_media_url text,
  type text -- 'initiative', 'event', 'article'
);

-- Shop (Merch & Gifts)
table shop_items (
  id string primary key, -- Shopify/Stripe SKU
  name text,
  price_cents integer,
  type text -- 'physical_merch', 'digital_gift_card'
);
```

### 3. Hospitality Interaction Flow
1. Next.js fetches `active_menu` and `featured_stories` from Sanity using ISR.
2. `MenuEngine` renders categories with their custom icons; clicking a category smooth-scrolls or filters the dish list.
3. `BookingDrawer` (Zustand) triggers the third-party SevenRooms widget inside a Framer Motion overlay.
4. `StoryRenderer` maps long-form content to an editorial layout, interspersed with high-vibrancy lifestyle photography.
5. Shop transactions are captured via Stripe and trigger a branded "Canteen Confirmation" email via Resend.
