# 02 — Architecture
## Health Food D2C Platform · ecomm_platform_02

---

### 1. Architecture Decision

Monolith on Vercel + Supabase. Razorpay for Indian payments (UPI, cards, netbanking, COD handled manually). No microservices. Next.js App Router handles routing and server components. Supabase handles database, auth (phone OTP + email), storage (product images + lab PDFs).

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router, Remix | RSC reduces JS on mobile catalog pages |
| Language | TypeScript strict | JavaScript | Catches variant/price bugs at compile time |
| Styling | Tailwind CSS v3 | CSS Modules | Utility-first, tokens via CSS variables |
| Database | Supabase PostgreSQL | PlanetScale, Neon | DB + Auth + Storage in one |
| Auth | Supabase Auth (Phone OTP + email) | Firebase Auth, Clerk | Phone OTP is primary for India |
| Storage | Supabase Storage | Cloudinary | Product images + lab PDFs |
| Payments (India) | Razorpay | Paytm, CC Avenue | Best DX, UPI + cards + netbanking + COD |
| Payments (Intl) | Stripe | — | International fallback only |
| Email | Resend | SendGrid | Order confirmations |
| SMS | Twilio / MSG91 | — | OTP + order status SMS (Indian numbers) |
| Cart state | Zustand + localStorage | Redux, server sessions | Cart without login, no round-trips |
| UI primitives | Radix UI | shadcn/ui | Headless, accessible |
| Animation | Framer Motion | GSAP | Cart drawer, page transitions |
| Fonts | Space Grotesk + DM Sans (next/font) | Custom hosted | Google Fonts via next/font, zero CLS |
| Deployment | Vercel | AWS | Zero config, image optimization |

---

### 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── collections/[type]/page.tsx
│   ├── products/[slug]/page.tsx
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── account/
│   │   ├── layout.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[id]/page.tsx
│   │   └── addresses/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[id]/edit/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[id]/page.tsx
│   │   ├── inventory/page.tsx
│   │   └── lab-reports/page.tsx
│   ├── api/
│   │   ├── razorpay/create-order/route.ts
│   │   ├── razorpay/webhook/route.ts
│   │   ├── pincode-check/route.ts
│   │   └── revalidate/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── callback/route.ts
│   └── pages/
│       ├── nothingtohide/page.tsx
│       └── about/page.tsx
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── DeliveryProgress.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── FlavourSelector.tsx
│   │   ├── PackSizeSelector.tsx
│   │   ├── IngredientPanel.tsx
│   │   ├── NutritionAccordion.tsx
│   │   └── AddToCartButton.tsx
│   ├── checkout/
│   │   ├── AddressForm.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── RazorpayButton.tsx
│   │   └── CODButton.tsx
│   ├── account/
│   │   ├── AccountSidebar.tsx
│   │   └── OrderList.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── ProductForm.tsx
│   │   ├── FlavourManager.tsx
│   │   ├── PackSizeManager.tsx
│   │   ├── ImageUploader.tsx
│   │   └── InventoryEditor.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       └── Toast.tsx
├── store/cart.ts
├── lib/
│   ├── supabase/client.ts
│   ├── supabase/server.ts
│   ├── supabase/admin.ts
│   ├── razorpay.ts
│   ├── resend.ts
│   ├── utils.ts            # formatPrice (₹), cn(), slugify
│   └── motion.ts
├── types/index.ts
└── middleware.ts
```

---

### 4. Database Schema

```sql
create extension if not exists "uuid-ossp";

-- Categories / product types
create table product_types (
  id uuid primary key default uuid_generate_v4(),
  name text not null,         -- "Protein Bars"
  slug text not null unique,  -- "protein-bars"
  position int default 0
);

-- Products
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  tagline text,
  type_id uuid not null references product_types(id),
  ingredients text not null,        -- full ingredient list, plain text
  how_to_use text,
  is_published boolean default false,
  badge text check (badge in ('new', 'bestseller', null)),
  tags text[] default '{}',         -- ['vegan', 'gluten-free', 'high-protein']
  gst_rate int not null default 18, -- 5 or 18 (percent)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Product flavours
create table product_flavours (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,               -- "Dark Chocolate"
  color_hex text not null,          -- "#4A2B1E"
  position int default 0
);

-- Pack sizes (price varies by pack)
create table pack_sizes (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,              -- "Single" | "6-Pack" | "12-Pack"
  quantity_count int not null,      -- 1, 6, 12
  price_in_paise int not null,      -- 15000 = ₹150
  sku text not null unique,         -- "PB-DC-1" | "PB-DC-6"
  position int default 0
);

-- Inventory (flavour × pack size)
create table inventory (
  id uuid primary key default uuid_generate_v4(),
  flavour_id uuid not null references product_flavours(id) on delete cascade,
  pack_size_id uuid not null references pack_sizes(id) on delete cascade,
  stock_count int not null default 0 check (stock_count >= 0),
  updated_at timestamptz default now(),
  unique(flavour_id, pack_size_id)
);

-- Product images (per flavour)
create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  flavour_id uuid references product_flavours(id), -- null = shown for all flavours
  url text not null,
  position int not null default 0,
  is_primary boolean default false,
  alt text
);

-- Nutrition facts
create table nutrition_facts (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  serving_size text not null,       -- "1 bar (40g)"
  entries jsonb not null            -- [{ "name": "Protein", "value": "20g", "daily_value": "40%" }]
);

-- Lab reports
create table lab_reports (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,              -- "Heavy Metals Test - Batch 2024-Q3"
  pdf_url text not null,
  uploaded_at timestamptz default now()
);

-- Profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- Addresses (Indian format)
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,  -- "TWT-2024-00123"
  user_id uuid references profiles(id),
  guest_phone text,
  guest_email text,
  status text not null default 'pending'
    check (status in ('pending', 'cod_pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested', 'returned')),
  payment_method text not null check (payment_method in ('razorpay', 'cod', 'stripe')),
  razorpay_order_id text unique,
  razorpay_payment_id text,
  razorpay_signature text,
  shipping_name text not null,
  shipping_phone text not null,
  shipping_line1 text not null,
  shipping_line2 text,
  shipping_city text not null,
  shipping_state text not null,
  shipping_pincode text not null,
  tracking_number text,
  tracking_url text,
  subtotal_paise int not null,
  gst_paise int not null,
  shipping_paise int not null default 0,
  total_paise int not null,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  flavour_id uuid references product_flavours(id),
  pack_size_id uuid references pack_sizes(id),
  product_name text not null,        -- snapshot
  flavour_name text not null,        -- snapshot
  pack_size_label text not null,     -- snapshot
  sku text not null,                 -- snapshot
  image_url text,
  price_in_paise int not null,       -- snapshot
  quantity int not null check (quantity > 0),
  gst_rate int not null
);

-- Triggers
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger products_updated_at before update on products for each row execute function update_updated_at();
create trigger orders_updated_at before update on orders for each row execute function update_updated_at();
create trigger inventory_updated_at before update on inventory for each row execute function update_updated_at();

create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number = 'TWT-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 5, '0');
  return new;
end;
$$ language plpgsql;

create sequence order_number_seq start 1;
create trigger set_order_number before insert on orders for each row execute function generate_order_number();

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.phone);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();
```

---

### 5. Row Level Security

```sql
-- Enable RLS
alter table products enable row level security;
alter table product_flavours enable row level security;
alter table pack_sizes enable row level security;
alter table inventory enable row level security;
alter table product_images enable row level security;
alter table nutrition_facts enable row level security;
alter table lab_reports enable row level security;
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read
create policy "products_public" on products for select using (is_published = true);
create policy "flavours_public" on product_flavours for select using (true);
create policy "pack_sizes_public" on pack_sizes for select using (true);
create policy "inventory_public" on inventory for select using (true);
create policy "images_public" on product_images for select using (true);
create policy "nutrition_public" on nutrition_facts for select using (true);
create policy "lab_reports_public" on lab_reports for select using (true);

-- Admin full access
create policy "admin_all_products" on products for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "admin_all_flavours" on product_flavours for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "admin_all_packs" on pack_sizes for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "admin_all_inventory" on inventory for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "admin_all_images" on product_images for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "admin_all_orders" on orders for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- User own data
create policy "profiles_own" on profiles for all using (auth.uid() = id);
create policy "addresses_own" on addresses for all using (auth.uid() = user_id);
create policy "orders_own" on orders for select using (auth.uid() = user_id);
create policy "orders_insert" on orders for insert with check (true);
create policy "order_items_read" on order_items for select using (
  exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
  or exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
```

---

### 6. Razorpay Integration

**Payment flow (Razorpay):**
1. User clicks "Pay with Razorpay" → client calls `POST /api/razorpay/create-order`
2. Server creates Razorpay order with amount (paise), currency INR, receipt (cart snapshot)
3. Client opens Razorpay checkout modal (Razorpay.js)
4. User pays via UPI / card / netbanking
5. Razorpay sends `payment.captured` webhook to `/api/razorpay/webhook`
6. Webhook verifies signature → creates order in DB → sends confirmation email + SMS
7. Client polls `/checkout/success?razorpay_order_id=xxx` for confirmation

**COD flow:**
1. User clicks "Cash on Delivery"
2. Client calls `POST /api/razorpay/create-order` with `payment_method: 'cod'`
3. Server creates order in DB directly with status `cod_pending` — no payment gateway
4. Sends confirmation SMS + email
5. Admin sees order in orders tab, dispatches manually

**Webhook handler:**
```typescript
// app/api/razorpay/webhook/route.ts
export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature')!
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  if (signature !== expectedSignature) {
    return new Response('Invalid signature', { status: 400 })
  }

  const event = JSON.parse(body)
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity
    // Idempotency: check if order already exists for this razorpay_payment_id
    // Create order + order_items using admin client
    // Decrement inventory
    // Send confirmation email via Resend
    // Send confirmation SMS via MSG91/Twilio
  }
  return new Response('OK', { status: 200 })
}
```

**Never:**
- Expose Razorpay key_secret to client
- Create orders in DB on checkout page redirect (user could close browser)
- Trust cart amounts from the client request body

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RAZORPAY_KEY_ID=                     # Public — safe for client
RAZORPAY_KEY_SECRET=                 # Server only
RAZORPAY_WEBHOOK_SECRET=             # Server only

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # International fallback
STRIPE_SECRET_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

MSG91_API_KEY=                       # SMS for Indian numbers
MSG91_TEMPLATE_ID_ORDER=

NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD=49900  # ₹499 in paise
NEXT_PUBLIC_SITE_URL=
```

---

### 8. ADRs

**ADR-001: Razorpay over Stripe for India**
Razorpay supports UPI natively, has better success rates on Indian cards, and supports COD workflow. Stripe is available as fallback for international cards only.

**ADR-002: Phone OTP as primary auth**
Most Indian users (especially mobile) do not maintain passwords. Phone OTP via Supabase Auth reduces signup friction significantly. Email/password is secondary for desktop users.

**ADR-003: Separate inventory table (flavour × pack size)**
Rather than a single `stock_count` per product, inventory is tracked at the granularity of `flavour_id × pack_size_id`. This allows "Dark Chocolate 6-Pack: out of stock" while "Dark Chocolate Single: in stock."

**ADR-004: Ingredients as plain text, not structured data**
The ingredient list is stored as a single plain text field, not a structured array. The brand writes it as a natural sentence ("Oats, Whey Protein (25%), Almonds, Dark Chocolate Chips (8%)..."). Structuring it into an array would require parsing and could lose nuance. The display component renders it as-is with good line-height.
