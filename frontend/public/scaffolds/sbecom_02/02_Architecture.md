# 02 — Architecture
## Tech Stack & Data Flow · sbecom_platform_02

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom earthy utility tokens.
- **Database/Auth:** Supabase (Profiles, Subscriptions, and Pantry Catalog)
- **Payments:** Razorpay (Recurring Mandates API) or Stripe (India).
- **State:** Zustand (For cart gifting logic and subscription configuration).

### 2. Data Model
```sql
-- Pantry Products
table products (
  id uuid primary key,
  title text,
  description text,
  format text, -- 'instant', 'loose-leaf', 'tea-bags'
  base_price_cents integer,
  subscription_discount_percent integer default 15,
  is_bestseller boolean default false
);

-- Active Subscriptions (Rituals)
table subscriptions (
  id uuid primary key,
  user_id uuid references auth.users(id),
  product_id uuid references products(id),
  frequency_weeks integer default 4,
  next_delivery_date date,
  status text -- 'active', 'paused', 'cancelled'
);

-- Gifting & Loyalty
table cart_rewards (
  id uuid primary key,
  threshold_cents integer,
  reward_product_id uuid references products(id),
  label text -- e.g., 'Free Ceramic Mug'
);
```

### 3. "Daily Ritual" State Flow (Zustand)
1. `cartStore`: Tracks `subtotal` and compares against `cart_rewards` thresholds to show progress.
2. `subscriptionStore`: Manages the "Subscribe & Save" toggle state on the product page.
3. `pantryStore`: Fetches products filtered by "Ritual" (Morning, Quick Fix, Snack).
