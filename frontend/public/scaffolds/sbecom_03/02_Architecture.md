# 02 — Architecture
## Tech Stack & Data Flow · sbecom_platform_03

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **State Management:** Zustand (Persisted state for multi-step quiz and session-based cart)
- **Animation:** Framer Motion (For quiz step-slides and unboxing "reveals")
- **Database/Auth:** Supabase (PostgreSQL + Auth for Profile Storage)
- **Payments:** Stripe (Subscription Billing with commitment logic)
- **Media:** Cloudinary or Supabase Storage (Optimized product/tutorial imagery)

### 2. Data Model
```sql
-- Beauty Profiles (Personalization Data)
table profiles (
  id uuid primary key,
  user_id uuid references auth.users(id),
  skin_type text, -- 'oily', 'dry', etc.
  skin_concerns text[],
  hair_texture text,
  style_preference text
);

-- Subscription Plans
table plans (
  id uuid primary key,
  duration_months integer, -- 1, 3, 12
  price_per_month_cents integer,
  stripe_price_id text
);

-- Monthly Boxes
table boxes (
  id uuid primary key,
  delivery_month date,
  user_id uuid references auth.users(id),
  product_samples uuid[], -- Array of sample product IDs
  is_rated boolean default false
);

-- Product Catalog (Sample & Full Size Link)
table products (
  id uuid primary key,
  name text,
  brand text,
  is_sample boolean,
  full_size_product_id uuid, -- link sample to its big version
  price_cents integer,
  image_url text
);
```

### 3. Dynamic Quiz Flow (Zustand)
1. `quizStore`: Tracks `currentStep` (0 to 5), `answers` object, and `isComplete`.
2. `subscriptionStore`: Maps the selected plan duration to the Stripe `price_id`.
3. `authStore`: Bridges the gap between quiz completion and account creation.
