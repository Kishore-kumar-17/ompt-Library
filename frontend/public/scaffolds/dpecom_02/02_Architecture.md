# 02 — Architecture
## Tech Stack & Data Flow · dpecom_platform_02

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI (Radix Primitives)
- **Charts:** Recharts (For financial visualization)
- **Database/Auth:** Supabase (Auth, DB, and Storage for digital assets)
- **Payments:** Stripe Connect (For MoR payout logic)
- **Invoicing:** Resend + PDF generation for tax invoices.

### 2. Data Model
```sql
-- Subscription Tiers
table plans (
  id uuid primary key,
  product_id uuid,
  name text, -- 'Basic', 'Pro'
  interval text, -- 'month', 'year'
  price integer -- in cents
);

-- Subscriptions
table subscriptions (
  id uuid primary key,
  user_id uuid references profiles(id),
  plan_id uuid references plans(id),
  status text, -- 'active', 'past_due', 'canceled'
  current_period_end timestamp
);

-- Revenue Metrics (Aggregated for Dashboard)
table daily_metrics (
  id uuid primary key,
  creator_id uuid,
  date date,
  mrr integer,
  net_revenue integer,
  churn_count integer
);
```

### 3. MoR Payout Flow
1. Buyer pays $100 -> Money goes to "Squeezed" Stripe Account.
2. "Squeezed" calculates and retains Tax (e.g., $20 VAT).
3. "Squeezed" calculates platform fee (e.g., $5).
4. Remaining $75 is routed to the Creator's connected account via Stripe Connect.
