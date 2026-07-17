# 02 — Architecture
## Tech Stack & Data Flow · sbecom_platform_01

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **State Management:** Zustand (For multi-step form state and "Meal Box" selection)
- **Styling:** Tailwind CSS + Framer Motion (For step transitions)
- **Database/Auth:** Supabase (Auth, DB, and Recipe Storage)
- **Payments:** Stripe (Subscription Billing API)
- **Validation:** Zod + React Hook Form.

### 2. Data Model
```sql
-- Recipe Catalog
table recipes (
  id uuid primary key,
  title text,
  description text,
  image_url text,
  dietary_tags text[], -- e.g., ['veggie', 'quick', 'low-carb']
  calories integer,
  prep_time_minutes integer
);

-- Subscriptions (Plan Metadata)
table subscriptions (
  id uuid primary key,
  user_id uuid references auth.users(id),
  people_count integer,
  meals_per_week integer,
  stripe_subscription_id text,
  status text -- 'active', 'paused', 'cancelled'
);

-- User Boxes (Weekly Selections)
table user_boxes (
  id uuid primary key,
  user_id uuid references auth.users(id),
  delivery_date date,
  recipe_ids uuid[], -- Array of selected recipes
  is_locked boolean default false -- Locked once shipping starts
);
```

### 3. Multi-Step Form Flow (Zustand)
1. `planStore`: Stores `peopleCount`, `mealsPerWeek`, and `basePrice`.
2. `userStore`: Stores `email`, `deliveryAddress`, and `deliveryTime`.
3. `checkoutStore`: Manages Stripe `clientSecret` and payment status.
4. `boxStore`: Temporarily holds selected `recipe_ids` during the Meal Picker phase.
