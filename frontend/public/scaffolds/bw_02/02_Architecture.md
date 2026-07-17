# 02 — Architecture
## Tech Stack & Data Flow · bw_platform_02

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (Structured Heritage, Collection, and Retail data).
- **Styling:** Tailwind CSS (Custom "Sepia" theme with Spaced Typography utilities).
- **Media:** Next.js `<Image>` with `quality={100}` and custom `sizes` for vertical portraits.
- **Animation:** Framer Motion (Hidden-to-Visible navigation and springy fades).
- **Lead Capture:** Supabase (Client inquiries and boutique lead management).

### 2. Data Model
```sql
-- Stories (The Thematic Collections)
table stories (
  id uuid primary key,
  title text not null, -- 'Bengal Byzantine Broadway'
  slug text unique,
  narrative_intro text, -- 'Visual Poetry' content
  hero_image_url text, -- Vertical 2:3 aspect
  publish_date timestamp
);

-- Portraits (Media within Stories)
table portraits (
  id uuid primary key,
  story_id uuid references stories(id),
  url text,
  caption text,
  is_full_bleed boolean default false
);

-- Boutiques (The Global Flagships)
table boutiques (
  id uuid primary key,
  city text not null, -- 'New York', 'Mumbai'
  address text,
  whatsapp_number text,
  interior_images text[],
  is_flagship boolean default true
);

-- Leads (High-touch Inquiries)
table enquiries (
  id uuid primary key,
  boutique_id uuid references boutiques(id),
  client_name text,
  interest_area text, -- 'Couture', 'Jewellery'
  message text,
  status text default 'unassigned'
);
```

### 3. Luxury Interaction Flow
1. Next.js fetches `featured_stories` and `active_boutiques` from Sanity using ISR.
2. `PortraitEngine` renders the vertical grid on the collection page, ensuring high-res assets are only loaded when in viewport.
3. `LuxuryBarrier` component checks if the product is 'Bespoke-Only' and replaces the CTA with a custom "Request Enquiry" modal.
4. Enquiry data is routed to the specific `boutique_id` in Supabase and triggers a professional notification to the boutique manager.
