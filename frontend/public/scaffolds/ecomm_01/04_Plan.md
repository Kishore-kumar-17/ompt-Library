# 04 — Build Plan
## E-commerce Platform · ecomm_platform_01

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | Project setup, DB, auth, design tokens |
| 1 | Catalog | 2 weeks | Homepage, PLP, PDP — browse and discover |
| 2 | Cart & Checkout | 2 weeks | Cart, Stripe payment, order creation |
| 3 | Accounts | 1 week | Login, order history, saved addresses |
| 4 | Admin Panel | 2 weeks | Product management, orders, inventory |
| 5 | Polish & Launch | 1 week | Performance, accessibility, SEO, go-live |

**Total: 9 weeks**

---

### Phase 0 — Foundation (Week 1)

**Goal:** Running Next.js project with database, auth, and design system ready. No feature work until this is solid.

**Deliverables:**
- Next.js 14 App Router project initialised with TypeScript strict
- Tailwind configured with custom tokens (extends config, does not replace defaults)
- `globals.css` with all CSS variables from `03_Design.md`
- DM Sans loaded via `next/font/google`
- Supabase project created — all tables migrated via SQL in `02_Architecture.md`
- RLS policies applied and tested
- Supabase Auth configured (email + Google OAuth)
- Stripe account configured, test keys in `.env.local`
- Resend account created, from address verified
- Middleware protecting `/account` and `/admin` routes
- Zustand cart store (`store/cart.ts`) with `persist` middleware
- All TypeScript types in `types/index.ts`
- Vercel project created and linked to repo
- Preview deployment working

**Ship gate — all must pass before Phase 1:**
- [ ] `npm run build` succeeds with zero TypeScript errors
- [ ] Supabase tables exist and RLS is enabled on all tables
- [ ] A test user can sign up, log in, and log out
- [ ] `/account` redirects to `/auth/login` when not authenticated
- [ ] `/admin` redirects to home when logged in as a non-admin user
- [ ] Cart state persists after browser refresh
- [ ] CSS variables render correctly — background is `#FAFAF8` not white

**NOT in this phase:**
- Any visible product UI
- Stripe payment integration
- Any product data

---

### Phase 1 — Catalog (Weeks 2–3)

**Goal:** A visitor can browse products, view a PDP, and see all product information. No purchasing yet.

**Deliverables:**

**Homepage (`/`):**
- Navbar with cart icon (count badge from Zustand, shows 0 initially)
- Hero section: lifestyle image + headline + CTA button
- Featured collection: 4-column product grid with real product data
- Brand story strip: 3 material callouts with SVG icons
- Email capture section (form submits to Supabase table, no third-party yet)
- Footer: 4 columns + copyright

**PLP (`/collections/[category]`):**
- Filter bar: category pills, color swatches, size chips, sort dropdown
- 4-column product grid (2 on mobile)
- ProductCard with hover image swap + color swatches
- Load more button (offset-based pagination, 12 items per page)

**PDP (`/products/[slug]`):**
- Image gallery: desktop sticky left column, mobile horizontal scroll
- Product name, price, badge (if applicable)
- Color selector — switching color changes image set
- Size selector — out-of-stock shown disabled with strikethrough
- Size guide modal (static content table)
- Add to Cart button (adds to Zustand store, opens cart drawer)
- Material accordion, care accordion, shipping/returns accordion (static content)
- "You may also like" — 4 products from same category

**Cart drawer:**
- Slide-in, line items, quantity stepper, remove, shipping progress bar
- "Checkout" button (links to `/checkout` — page not built yet, just a link)

**Data:** Seed database with at least 12 products, 3 categories, realistic variants.

**Ship gate:**
- [ ] Homepage loads with real products from Supabase
- [ ] PLP filter by color changes grid results without page reload
- [ ] PDP color selector changes image gallery
- [ ] PDP size selector shows disabled state for out-of-stock variants
- [ ] Add to Cart adds to Zustand, cart count badge increments, drawer opens
- [ ] Cart persists after page refresh
- [ ] Lighthouse: Performance 90+, Accessibility 95+ on PDP (mobile)
- [ ] LCP under 2.5s on homepage (mobile, 4G simulated)

**NOT in this phase:**
- Stripe or checkout
- User authentication UI
- Admin panel

---

### Phase 2 — Cart & Checkout (Weeks 4–5)

**Goal:** A visitor can complete a purchase as a guest. Payment works. Order is recorded. Confirmation email is sent.

**Deliverables:**

**Checkout page (`/checkout`):**
- Order summary sidebar: line items from Zustand, subtotal, shipping estimate
- Guest checkout: email input + shipping address form
- Logged-in: pre-fill email, saved address selector (if addresses exist), or new address form
- Stripe Payment Element (card + Apple Pay + Google Pay)
- "Place order" button — disabled until all fields valid

**API routes:**
- `POST /api/stripe/create-payment-intent` — validates cart on server, creates PaymentIntent
- `POST /api/stripe/webhook` — handles `payment_intent.succeeded`:
  - Idempotency check
  - Decrement variant stock counts
  - Create `orders` + `order_items` rows
  - Send confirmation email via Resend

**Order confirmation (`/checkout/success`):**
- Clear Zustand cart
- Show order number, items, shipping address, estimated delivery
- "Continue shopping" button

**Email template:**
- Order confirmation: React Email template
- Subject: "Your order #XXXX is confirmed"
- Content: order number, line items table, shipping address, total

**Ship gate:**
- [ ] Guest can complete purchase end-to-end without creating an account
- [ ] Stripe webhook creates order in database with correct line items and total
- [ ] Variant stock count decrements after successful payment
- [ ] Confirmation email received within 2 minutes of payment
- [ ] If payment fails, cart is not cleared, error is shown to user
- [ ] Stripe webhook handles duplicate events idempotently (call twice = one order)
- [ ] No card data or `client_secret` logged to console
- [ ] Checkout page accessible (keyboard navigation, screen reader labels on all inputs)

**NOT in this phase:**
- Returning customer pre-fill (needs account phase)
- Admin order management

---

### Phase 3 — Accounts (Week 6)

**Goal:** Users can sign up, log in, view order history, and manage addresses.

**Deliverables:**

**Auth pages:**
- `/auth/login` — email/password + Google OAuth button
- `/auth/signup` — email/password + name, auto-creates profile
- `/auth/callback` — Supabase OAuth callback handler

**Account section (`/account/*`):**
- Layout with sidebar navigation (Orders, Addresses, Password)
- Order history: list with status chips, date, total, link to detail
- Order detail: line items, shipping address, tracking link (if set), "Request return" button
- Addresses: list, add new (form), edit, set default, delete
- Password change form

**Checkout enhancement:**
- Detect logged-in state → pre-fill email and default address
- "Buy again" link on order detail → adds items to cart (only in-stock variants)

**Ship gate:**
- [ ] User can sign up with email, log in, and see order history
- [ ] Orders from guest checkout are NOT visible in order history (guest_email only, not user_id)
- [ ] Saved addresses appear in checkout for logged-in users
- [ ] Default address pre-selects in checkout
- [ ] "Buy again" adds in-stock items to cart, skips out-of-stock with a toast notification
- [ ] Password change requires current password
- [ ] `/account` is inaccessible without authentication (middleware confirmed)

**NOT in this phase:**
- Admin panel
- Order returns processing (admin side)

---

### Phase 4 — Admin Panel (Weeks 7–8)

**Goal:** Store admin can manage products, variants, inventory, and orders without touching the database directly.

**Deliverables:**

**Admin layout (`/admin`):**
- Sidebar: Products, Orders, Inventory
- Role check in layout — redirect non-admins

**Products tab (`/admin/products`):**
- Table: name, category, variants count, published status, actions (edit, delete)
- "Add product" button → form
- Product form: name, slug (auto-generated + editable), description, category, material, care instructions, badge, published toggle
- Variant manager: add/edit/delete variants (size + color + SKU + stock + price)
- Image uploader: drag-drop or file select → uploads to Supabase Storage → saves URL to `product_images`

**Orders tab (`/admin/orders`):**
- Table: order number, customer email, status, total, date
- Filter by status
- Order detail: line items, shipping address, status updater (dropdown + "Update" button)
- Shipping update: enter tracking number → status changes to "Shipped" → customer notified (Resend email)

**Inventory tab (`/admin/inventory`):**
- Search by SKU or product name
- Inline stock count editor: type new count → "Save" → updates `stock_count` in database
- Change reflects on PDP within 30 seconds (ISR revalidation)

**On-demand revalidation:**
- When admin updates a product or stock count → call `revalidatePath('/products/[slug]')` and `revalidatePath('/collections/[category]')`

**Ship gate:**
- [ ] Admin can create a new product with variants and images — appears on PLP
- [ ] Admin can update stock count — PDP size selector reflects change within 30 seconds
- [ ] Admin can mark order as "Shipped" with tracking number — customer receives email
- [ ] Non-admin user cannot access any `/admin` route (returns 302 to home)
- [ ] Image upload works: image appears in Supabase Storage and on product page

**NOT in this phase:**
- Revenue analytics
- Customer management
- Discount codes

---

### Phase 5 — Polish & Launch (Week 9)

**Goal:** Production-ready. Fast, accessible, SEO-optimised.

**Deliverables:**
- Lighthouse audit: all pages 95+ performance, 95+ accessibility
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- `next/image` optimisation: all images with explicit `width`, `height`, and `priority` on hero
- Metadata: `generateMetadata` on all public pages (title, description, og:image)
- Sitemap: `app/sitemap.ts` — all published products and categories
- robots.txt: allow all except `/admin`, `/account`, `/api`
- Cookie consent banner: minimal, non-blocking, bottom of screen
- Privacy policy and terms pages: static, placeholder content
- Error pages: `error.tsx` and `not-found.tsx` with navigation links
- Loading states: `loading.tsx` for all routes with skeleton UI
- axe-core accessibility audit: zero critical violations
- Stripe: switch to live keys in Vercel production environment variables
- Final end-to-end test: guest purchase, admin order update, account order history

**Ship gate — launch checklist:**
- [ ] All Lighthouse metrics 95+ on mobile and desktop
- [ ] Zero TypeScript errors (`tsc --noEmit`)
- [ ] Zero ESLint errors
- [ ] axe-core: zero critical accessibility violations on PDP, checkout, cart
- [ ] Guest purchase end-to-end works with live Stripe keys
- [ ] Webhook endpoint verified in Stripe dashboard (production)
- [ ] All environment variables set in Vercel production
- [ ] Custom domain configured + SSL active
- [ ] No console errors on any public page in production

---

### Cut Order

If timeline compresses, cut in this order (last to cut listed first):

| Priority | Feature | Can cut? |
|----------|---------|----------|
| NEVER CUT | PDP + Add to Cart | No |
| NEVER CUT | Cart Drawer | No |
| NEVER CUT | Checkout + Stripe | No |
| NEVER CUT | Order confirmation email | No |
| High | PLP filters | Cut to basic category nav only |
| High | Admin product form | Cut to direct DB seeding for launch |
| Medium | Account saved addresses | Cut — guest checkout still works |
| Medium | "Buy again" feature | Cut |
| Medium | Admin inventory tab | Cut — use DB editor for launch |
| Lower | Size guide modal | Cut — link to static page instead |
| Lower | Zoom on gallery image | Cut |
| Lower | Return request flow | Cut — handle manually via email |
| Lowest | Email capture section | Cut |

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Stripe webhook receives duplicate events → duplicate orders | High | High | Idempotency check on `payment_intent_id` before creating order row; test with duplicate POST |
| RLS not applied to all tables → data leaks between users | Medium | High | Run `SELECT * FROM pg_tables WHERE schemaname='public'` and verify `row_security = true` on every table after migration |
| Zustand cart not persisting after browser refresh | Medium | High | `persist` middleware with `localStorage` key; test by refreshing mid-session |
| Admin route accessible to non-admin users | Medium | High | Middleware role check on `/admin` must redirect to home — not just client-side guard |
| `client_secret` or Stripe key logged to server console | Low | High | `grep -r "console.log" src/app/api/stripe` → zero results; verify API route logging |
| `next/image` missing `width`/`height` or `priority` on hero | Medium | Medium | LCP regression risk; all images must have explicit dimensions and hero must have `priority` |
| TypeScript strict mode errors blocking build | Medium | High | Run `tsc --noEmit` after each phase, not only at launch |
