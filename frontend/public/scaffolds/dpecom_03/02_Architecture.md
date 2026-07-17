# 02 — Architecture
## Tech Stack & Data Flow · dpecom_platform_03

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Email Automation:** Resend (For receipts and newsletter delivery)
- **Styling:** Tailwind CSS (Focus on custom serif/sans pairings)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe (Checkout Session API)
- **Storage:** Supabase Storage (Digital asset hosting)

### 2. Data Model
```sql
-- Subscribers (The Audience)
table subscribers (
  id uuid primary key,
  email text unique,
  first_name text,
  tags text[], -- e.g., ['newsletter', 'customer:ebook']
  created_at timestamp
);

-- Products (Ebooks, Presets, etc.)
table products (
  id uuid primary key,
  title text,
  description text,
  price_cents integer,
  file_url text, -- Storage link
  lead_magnet_url text -- Freebie for opt-in
);

-- Transactions
table transactions (
  id uuid primary key,
  subscriber_id uuid references subscribers(id),
  product_id uuid references products(id),
  amount_cents integer,
  stripe_id text
);
```

### 3. "Audience Growth" Flow
1. Buyer enters email on Checkout page.
2. Stripe processes payment -> Webhook triggers.
3. System checks if email exists in `subscribers`.
4. If "Subscribe" checkbox was checked: Add/Update subscriber with `customer:[product]` tag.
5. Resend API sends the fulfillment email with the `file_url`.
