# 02 — Architecture
## E-commerce Platform · ecomm_platform_01

---

### 1. Architecture Decision

**Monolith on Vercel + Supabase.** No microservices. No separate API server. Next.js App Router handles routing, server components, and API routes. Supabase handles database, auth, storage, and realtime. Stripe handles payments.

This is the right call for a D2C storefront at this scale. Microservices would add ops complexity without benefit. The only external services are Stripe (payments) and Resend (email) — both are called from Next.js server actions or API routes, never from the client.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router, Remix, Astro | App Router RSC reduces client JS on catalog pages |
| Language | TypeScript strict | JavaScript | Type safety catches variant/price bugs before runtime |
| Styling | Tailwind CSS v3 | CSS Modules, styled-components | Utility-first, design tokens via CSS variables |
| Database | Supabase PostgreSQL | Prisma, PlanetScale, Railway | Supabase gives DB + Auth + Storage + RLS in one |
| Auth | Supabase Auth | NextAuth, Clerk | Already bundled with DB — no extra service |
| File storage | Supabase Storage | Cloudinary, S3 | Product images stored in Supabase buckets |
| Payments | Stripe | Razorpay, Paddle | Most reliable, best DX, Apple Pay / Google Pay built-in |
| Email | Resend | SendGrid, Mailchimp | Developer-first, React Email templates |
| Cart state | Zustand + localStorage | Server-side sessions, Redux | Cart works without login; no round-trips |
| UI primitives | Radix UI | shadcn/ui, MUI | Headless, accessible, no style opinions |
| Animation | Framer Motion | GSAP, CSS-only | Cart drawer, page transitions |
| Icons | Lucide | Heroicons, FontAwesome | Consistent weight and size API |
| Fonts | DM Sans (next/font) | Self-hosted, Typekit | Google Fonts via next/font — zero CLS |
| Deployment | Vercel | AWS, Railway | Zero config, edge functions, image optimization |

---

### 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — Navbar, CartDrawer, Providers
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # CSS variables + base styles
│   ├── collections/
│   │   └── [category]/
│   │       └── page.tsx            # PLP
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx            # PDP
│   ├── checkout/
│   │   ├── page.tsx                # Checkout page
│   │   └── success/
│   │       └── page.tsx            # Order confirmation
│   ├── account/
│   │   ├── layout.tsx              # Account layout with sidebar
│   │   ├── page.tsx                # Account dashboard redirect
│   │   ├── orders/
│   │   │   ├── page.tsx            # Order history
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Order detail
│   │   └── addresses/
│   │       └── page.tsx            # Saved addresses
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout — role check
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── inventory/
│   │       └── page.tsx
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-payment-intent/route.ts
│   │   │   └── webhook/route.ts    # Stripe webhook handler
│   │   └── revalidate/route.ts     # On-demand ISR revalidation
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts       # Supabase OAuth callback
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx           # Zustand + query providers
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── ShippingProgress.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── MaterialAccordion.tsx
│   │   └── SizeGuideModal.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── AddressForm.tsx
│   │   ├── OrderSummary.tsx
│   │   └── PaymentElement.tsx
│   ├── account/
│   │   ├── AccountSidebar.tsx
│   │   ├── OrderList.tsx
│   │   └── AddressList.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── ProductForm.tsx
│   │   ├── VariantManager.tsx
│   │   ├── OrderTable.tsx
│   │   └── InventoryEditor.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Accordion.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
├── store/
│   └── cart.ts                     # Zustand cart store
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client (cookies)
│   │   └── admin.ts                # Service role client (webhooks only)
│   ├── stripe.ts                   # Stripe server instance
│   ├── resend.ts                   # Resend client + email templates
│   ├── motion.ts                   # Framer Motion variants
│   └── utils.ts                    # formatPrice, cn(), slugify
├── types/
│   └── index.ts                    # All shared TypeScript types
└── middleware.ts                   # Supabase auth middleware — protect /account, /admin
```

---

### 4. Database Schema

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories(id),
  position int default 0,
  created_at timestamptz default now()
);

-- Products
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid not null references categories(id),
  base_price int not null, -- stored in cents (USD)
  material text,
  material_detail text,
  care_instructions text,
  is_published boolean default false,
  badge text check (badge in ('new', 'bestseller', null)),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Product variants (size × color)
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  size text not null,          -- e.g. "7", "8", "9", "S", "M", "L"
  color_name text not null,    -- e.g. "Natural Black"
  color_hex text not null,     -- e.g. "#1A1A1A"
  sku text not null unique,    -- e.g. "WR-NAT-BLK-10"
  stock_count int not null default 0 check (stock_count >= 0),
  price int,                   -- null = use product base_price
  created_at timestamptz default now()
);

-- Product images
create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  color_name text,             -- null = shown for all colors
  url text not null,           -- Supabase Storage public URL
  position int not null default 0,
  is_primary boolean default false,
  alt text,
  created_at timestamptz default now()
);

-- Profiles (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- Addresses
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),        -- null for guest orders
  guest_email text,                             -- set for guest orders
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested', 'returned')),
  stripe_payment_intent_id text unique,
  stripe_payment_status text,
  shipping_name text not null,
  shipping_line1 text not null,
  shipping_line2 text,
  shipping_city text not null,
  shipping_state text not null,
  shipping_postal_code text not null,
  shipping_country text not null default 'US',
  tracking_number text,
  subtotal int not null,                        -- in cents
  shipping_amount int not null default 0,       -- in cents
  total int not null,                           -- in cents
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items (snapshot at time of purchase)
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  variant_id uuid references product_variants(id), -- nullable — variant may be deleted
  product_name text not null,      -- snapshot
  variant_description text not null, -- e.g. "Natural Black / Size 10"
  sku text not null,               -- snapshot
  image_url text,                  -- snapshot
  price_at_purchase int not null,  -- in cents
  quantity int not null check (quantity > 0),
  created_at timestamptz default now()
);

-- Triggers: updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at before update on products
  for each row execute function update_updated_at();

create trigger orders_updated_at before update on orders
  for each row execute function update_updated_at();

-- Trigger: auto-create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
```

---

### 5. Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_images enable row level security;
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Categories: public read, admin write
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Products: public read (published only), admin full access
create policy "products_public_read" on products for select using (is_published = true);
create policy "products_admin_all" on products for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Product variants: public read, admin write
create policy "variants_public_read" on product_variants for select using (true);
create policy "variants_admin_write" on product_variants for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Product images: public read, admin write
create policy "images_public_read" on product_images for select using (true);
create policy "images_admin_write" on product_images for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Profiles: users read/update own, admin reads all
create policy "profiles_own" on profiles for all using (auth.uid() = id);
create policy "profiles_admin_read" on profiles for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Addresses: users manage own
create policy "addresses_own" on addresses for all using (auth.uid() = user_id);

-- Orders: users read own, admin reads all
create policy "orders_own_read" on orders for select
  using (auth.uid() = user_id or guest_email = (select email from auth.users where id = auth.uid()));
create policy "orders_insert_authenticated" on orders for insert with check (true); -- webhook inserts
create policy "orders_admin_all" on orders for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Order items: read if you can read the order
create policy "order_items_read" on order_items for select
  using (exists (
    select 1 from orders o where o.id = order_id
    and (o.user_id = auth.uid() or
      exists (select 1 from profiles where id = auth.uid() and role = 'admin'))
  ));
```

---

### 6. Stripe Integration Architecture

**Payment flow:**
1. User clicks "Checkout" → client calls `/api/stripe/create-payment-intent`
2. Server creates PaymentIntent with amount, currency, metadata (cart items snapshot)
3. Client mounts Stripe Payment Element with returned `client_secret`
4. User completes payment → Stripe confirms
5. Stripe sends `payment_intent.succeeded` webhook to `/api/stripe/webhook`
6. Webhook verifies signature → creates order in database → sends confirmation email
7. Client polls or redirects to `/checkout/success?payment_intent=pi_xxx`

**Webhook handler (critical path):**
```typescript
// app/api/stripe/webhook/route.ts
export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    // Use service role client — bypasses RLS for order creation
    const supabase = createAdminClient()
    // Check idempotency — do not create duplicate orders
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_payment_intent_id', pi.id)
      .single()
    if (existing) return new Response('OK', { status: 200 })
    // Create order + order items from pi.metadata
    // Send confirmation email via Resend
  }
  return new Response('OK', { status: 200 })
}
```

**Never do:**
- Create PaymentIntents from the client — amount can be tampered
- Store full card details anywhere
- Log `pi.client_secret` to console
- Trust cart total from the client — always recalculate on server

---

### 7. Supabase Client Pattern

Three separate clients — never mix them:

```typescript
// lib/supabase/client.ts — browser only
import { createBrowserClient } from '@supabase/ssr'
export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// lib/supabase/server.ts — server components + server actions
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
export const createClient = () =>
  createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { get: (name) => cookies().get(name)?.value }
  })

// lib/supabase/admin.ts — webhook handlers only, never expose to client
import { createClient } from '@supabase/supabase-js'
export const createAdminClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
```

---

### 8. Image Storage

- Bucket name: `product-images` (public)
- Path structure: `products/{product_id}/{color_name}/{position}.webp`
- Max file size: 5MB per image
- Required dimensions: 1200×1600px (3:4 ratio) for product images
- Lifestyle images: 1600×900px (16:9 ratio)
- All images converted to WebP on upload (admin panel handles this)
- Next.js `<Image>` component with `remotePatterns` configured for Supabase storage URL

---

### 9. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # Server only — never expose to client

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=               # Server only
STRIPE_WEBHOOK_SECRET=           # Server only

# Resend
RESEND_API_KEY=                  # Server only
RESEND_FROM_EMAIL=               # e.g. orders@yourbrand.com

# Config
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=10000  # in cents ($100.00)
NEXT_PUBLIC_SITE_URL=            # e.g. https://yourbrand.com
```

---

### 10. Middleware (Auth Protection)

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n) => req.cookies.get(n)?.value, set: (n, v, o) => res.cookies.set(n, v, o) } }
  )
  const { data: { session } } = await supabase.auth.getSession()

  // Redirect unauthenticated users away from protected routes
  if (!session && req.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Admin routes: check role
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/auth/login', req.url))
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', session.user.id).single()
    if (profile?.role !== 'admin') return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*']
}
```

---

### 11. Architecture Decision Records (ADRs)

**ADR-001: Supabase over self-hosted PostgreSQL**
We use Supabase managed PostgreSQL rather than self-hosting. Reason: RLS, Auth, and Storage come bundled — no additional services to operate. Trade-off: vendor dependency, but for a D2C storefront the operational simplicity outweighs this.

**ADR-002: Zustand cart over server-side sessions**
Cart state is managed client-side in Zustand, persisted to localStorage. Reason: cart works without login, no round-trips on every add-to-cart, simpler session management. Trade-off: cart is device-specific (does not sync across devices when logged in). This is acceptable for the current scale.

**ADR-003: Stripe PaymentIntent over Checkout Sessions**
We use Stripe PaymentIntent (embedded Payment Element) rather than Stripe-hosted Checkout page. Reason: full control over checkout UI, no redirect away from our domain, better mobile experience. Trade-off: more implementation work, must handle webhook reliability ourselves.

**ADR-004: No ORM**
We use Supabase client directly, not Prisma or Drizzle. Reason: Supabase client is type-safe with generated types, RLS policies handle access control, and adding an ORM layer would duplicate schema definitions. Trade-off: raw SQL in some complex queries.
