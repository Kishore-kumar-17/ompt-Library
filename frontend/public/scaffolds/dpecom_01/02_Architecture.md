# 02 — Architecture
## Tech Stack & Data Flow · dpecom_platform_01

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + PostCSS
- **Database/Auth:** Supabase (PostgreSQL + GoTrue)
- **Payments:** Stripe (Payment Intents API + Webhooks)
- **Storage:** Supabase Storage (Digital Asset hosting)
- **Analytics:** PostHog (Event tracking)

### 2. Data Model
```sql
-- Creators
table profiles (
  id uuid primary key,
  username text unique,
  bio text,
  avatar_url text
);

-- Products
table products (
  id uuid primary key,
  creator_id uuid references profiles(id),
  name text,
  description text,
  min_price integer, -- in cents
  file_url text,
  is_published boolean default false
);

-- Orders
table orders (
  id uuid primary key,
  product_id uuid references products(id),
  buyer_email text,
  amount_paid integer,
  stripe_payment_id text,
  status text -- 'pending', 'succeeded', 'failed'
);
```

### 3. Payment Flow
1. Buyer clicks "Buy" -> Client calls `/api/checkout` with `productId` and `amount`.
2. Server creates Stripe PaymentIntent -> Returns `clientSecret`.
3. Client opens Stripe Element in Checkout Overlay.
4. Success -> Webhook updates `orders` table and triggers email with `file_url`.
