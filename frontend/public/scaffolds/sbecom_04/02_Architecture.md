# 02 — Architecture
## Tech Stack & Data Flow · sbecom_platform_04

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Serif/Sans Typography System.
- **Database/Auth:** Supabase (Recipe CMS, Wine Inventory, User Subscriptions)
- **Payments:** Stripe (Subscription Billing with Add-on & Proration support)
- **State:** Zustand (For the "Dual-Subscription" state machine and Market Cart).
- **Media:** Cloudinary (Video hosting and on-the-fly image transformations).

### 2. Data Model
```sql
-- Recipe Catalog (CMS)
table recipes (
  id uuid primary key,
  title text,
  chef_name text,
  difficulty_level text, -- 'beginner', 'intermediate', 'pro'
  image_url text,
  video_url text,
  pairing_wine_id uuid references wines(id)
);

-- Wine Cellar
table wines (
  id uuid primary key,
  name text,
  variety text, -- 'Pinot Noir', 'Chardonnay'
  notes text,
  price_cents integer,
  inventory_count integer
);

-- Subscriptions (Multiple Items)
table subscriptions (
  id uuid primary key,
  user_id uuid references auth.users(id),
  meal_plan_id text, -- 'signature-2p', 'wellness-4p'
  wine_cellar_active boolean default false,
  next_delivery_date date,
  status text
);

-- Market (One-time Orders)
table market_orders (
  id uuid primary key,
  user_id uuid references auth.users(id),
  total_amount_cents integer,
  items jsonb -- List of kitchen tools/one-off kits
);
```

### 3. "Dual Subscription" Flow
1. User selects meals in the Dashboard.
2. If "Wine Pairing" is toggled: Zustand updates the `currentBox` state to include `wine_id`.
3. On "Confirm Box": System calculates the total (Plan Price + Wine Add-ons).
4. Stripe `subscription_schedule` or `subscription_item` is updated to reflect the new total for the upcoming billing cycle.
