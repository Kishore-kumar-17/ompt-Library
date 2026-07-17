# 04 — Build Plan
## Health Food D2C Platform · ecomm_platform_02

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 week | Project setup, DB, auth, design tokens |
| 1 | Catalog | 2 weeks | Homepage, PLP, PDP — browse and discover |
| 2 | Cart & Checkout | 2 weeks | Cart, Razorpay, COD, order creation |
| 3 | Accounts | 1 week | Phone OTP login, order history, addresses |
| 4 | Admin Panel | 2 weeks | Products, flavours, inventory, orders |
| 5 | Polish & Launch | 1 week | Mobile perf, accessibility, SEO, go-live |

**Total: 9 weeks**

---

### Phase 0 — Foundation (Week 1)

**Goal:** Running project with DB, auth, and design system. No feature until this is solid.

**Deliverables:**
- Next.js 14 + TypeScript strict + Tailwind initialised
- Space Grotesk + DM Sans loaded via `next/font/google`
- `globals.css` with all CSS variables from `03_Design.md`
- Supabase: all tables, RLS, triggers migrated
- Supabase Auth: phone OTP + email/password configured
- Razorpay account: test keys in `.env.local`
- Resend + MSG91 accounts created
- Zustand cart store with persist
- TypeScript types in `types/index.ts`
- Middleware protecting `/account` and `/admin`
- Vercel project + preview deployment

**Ship gate:**
- [ ] `npm run build` — zero TypeScript errors
- [ ] Database tables exist, RLS enabled
- [ ] Phone OTP signup works (test with real number)
- [ ] `/account` redirects when not authenticated
- [ ] Cart state persists after browser refresh
- [ ] Background is `#FFFFFF` not system default; sections alternate warm/lavender correctly

---

### Phase 1 — Catalog (Weeks 2–3)

**Goal:** A visitor can browse products and view full PDP including ingredient list.

**Deliverables:**

**Homepage:**
- Announcement bar (dismissible, COD mention)
- Navbar with cart count
- Hero (2-column, product photography, bold headline, pill CTA)
- Category tiles (4 types with `var(--bg-lavender)` background)
- Transparency section (ingredient list displayed raw in white card)
- Best sellers grid (3 columns, real product data)
- Testimonials (3 cards, quotes only — no star ratings)
- Newsletter (pill form on `var(--cta)` background)
- Footer

**PLP (`/collections/[type]`):**
- Filter: type pills, flavour dots, dietary tag pills, sort
- 3-column product grid (2 on mobile)
- ProductCard with hover image swap + flavour swatches + quick-add
- Load more (12 per page)

**PDP (`/products/[slug]`):**
- Image gallery (updates on flavour change)
- Flavour selector (pill buttons, not dots)
- Pack size selector (updates price)
- Add to Cart (disabled until flavour selected)
- **IngredientPanel** — always visible, never accordion
- NutritionAccordion (collapsible — this one is fine)
- How to use accordion
- "#nothingtohide" badge → links to `/pages/nothingtohide`

**Data:** Seed at least 8 products, 3 types, 3 flavours per product, 3 pack sizes per product, varied stock.

**Ship gate:**
- [ ] Homepage loads with real products from Supabase (server component)
- [ ] PDP ingredient list visible without any click action
- [ ] Flavour selector changes image gallery
- [ ] Pack size selector changes price
- [ ] Add to Cart disabled without flavour selection
- [ ] Cart opens on Add to Cart, count updates
- [ ] Lighthouse Performance 90+ on PDP mobile (4G simulated)
- [ ] Ingredient panel is NOT inside an accordion — manual check

---

### Phase 2 — Cart & Checkout (Weeks 4–5)

**Goal:** Guest user can complete a purchase via UPI or COD. Order created in DB. Confirmation sent.

**Deliverables:**

**Checkout page:**
- Guest: phone number + shipping address (Indian format: pincode, state, city)
- Logged-in: pre-fill from saved address
- Pincode serviceable check (static list or Razorpay/Shiprocket API)
- Order summary: line items, subtotal, GST breakdown, shipping, total
- Razorpay Pay button → opens Razorpay checkout modal
- COD button → creates order directly

**API routes:**
- `POST /api/razorpay/create-order` — creates Razorpay order server-side
- `POST /api/razorpay/webhook` — handles `payment.captured`: idempotency, order creation, inventory decrement, email, SMS
- COD flow: direct DB insert with `cod_pending` status

**Order confirmation page:**
- Clear cart
- Show order number, items, address, expected delivery (3–5 business days)
- "Continue shopping" button
- SMS + email confirmation

**Ship gate:**
- [ ] Guest can pay via Razorpay test UPI (use Razorpay test credentials)
- [ ] Guest can place COD order
- [ ] Webhook creates order with correct items, amounts, GST
- [ ] Inventory decrements after successful payment
- [ ] COD order appears in admin with `cod_pending` status
- [ ] Confirmation email + SMS received
- [ ] Razorpay signature verified in webhook (test with duplicate call — no duplicate order)
- [ ] Razorpay key_secret never logged to console

---

### Phase 3 — Accounts (Week 6)

**Goal:** Users can log in via phone OTP, view orders, manage addresses.

**Deliverables:**
- Login page: phone number input → OTP → verify → session
- Email/password login as secondary option
- `/account/orders` — order list with status chips
- `/account/orders/[id]` — order detail + tracking link + "Reorder" button
- `/account/addresses` — add, edit, set default, delete
- Checkout: pre-fill phone + default address for logged-in users
- "Reorder" adds in-stock flavour/pack combos to cart, shows toast for out-of-stock

**Ship gate:**
- [ ] Phone OTP login works with real Indian number
- [ ] Order history shows only logged-in user's orders
- [ ] Reorder adds correct items — skips out-of-stock with toast
- [ ] Address pre-fills in checkout for logged-in users
- [ ] `/account` inaccessible without auth

---

### Phase 4 — Admin Panel (Weeks 7–8)

**Goal:** Admin can manage products, flavours, inventory, and orders without touching the database.

**Deliverables:**

**Products tab:**
- List products (all, published + unpublished)
- Create/edit product: name, slug, type, ingredients (textarea — full text), how to use, tags, GST rate, published
- Flavour manager: add flavour (name + color picker), reorder, delete
- Pack size manager: label, quantity count, price (₹ input converts to paise), SKU
- Image uploader: per-flavour, drag-drop, Supabase Storage
- Lab report uploader: PDF per product → stored in Supabase Storage

**Orders tab:**
- List with filter by status and payment method (COD / Razorpay)
- Order detail: items, address, status dropdown
- Mark shipped: enter tracking number + tracking URL (Delhivery/Shiprocket)
- On shipped: send SMS to customer with tracking link

**Inventory tab:**
- Search by SKU or product/flavour name
- Inline edit stock count (flavour × pack size)
- Save → triggers ISR revalidation of product page

**Ship gate:**
- [ ] Admin can create product with 3 flavours and 3 pack sizes — appears on PLP
- [ ] Admin can update stock count — PDP reflects in 30 seconds
- [ ] Admin can mark order as shipped → customer gets SMS
- [ ] Lab report PDF uploaded and linked from `#nothingtohide` badge on PDP
- [ ] Non-admin cannot access `/admin`

---

### Phase 5 — Polish & Launch (Week 9)

**Deliverables:**
- Lighthouse 95+ on mobile for PDP, PLP, homepage
- LCP < 2.5s (mobile, 4G)
- `generateMetadata` on all public pages
- Sitemap at `/sitemap.xml`
- robots.txt blocks `/admin`, `/account`, `/api`
- Cookie consent banner (non-blocking)
- Privacy + terms pages (static content)
- Error + loading + not-found pages
- axe-core: zero critical violations on PDP and checkout
- Switch to live Razorpay keys
- End-to-end test: guest Razorpay payment + COD order + admin ship update

**Launch checklist:**
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Lighthouse 95+ mobile PDP
- [ ] axe-core zero critical on PDP, checkout
- [ ] Live Razorpay keys in Vercel production
- [ ] Razorpay webhook endpoint registered in dashboard (production mode)
- [ ] MSG91 SMS template approved (required for transactional SMS in India)
- [ ] All env variables set in Vercel production
- [ ] Ingredient panel visible on PDP without any interaction — final manual check

---

### Cut Order

| Priority | Feature | Cuttable? |
|----------|---------|-----------|
| NEVER | PDP ingredient panel (always visible) | No |
| NEVER | Add to Cart + Cart Drawer | No |
| NEVER | Razorpay checkout | No |
| NEVER | COD checkout | No |
| High | PLP filters | Cut to type navigation only |
| High | Admin product form | Seed DB manually for launch |
| Medium | Phone OTP login | Fall back to email/password only |
| Medium | Reorder feature | Cut |
| Medium | Pincode serviceability check | Show message only at checkout |
| Lower | Lab report uploader | Manual Supabase Storage upload |
| Lower | Testimonials section | Cut |
| Lowest | Newsletter section | Cut |

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Razorpay signature not verified in webhook → fraud risk | High | High | `crypto.createHmac('sha256', secret).update(body).digest('hex')` must match `razorpay-signature` header; test with tampered payload |
| IngredientPanel placed inside NutritionAccordion | High | High | IngredientPanel must always be visible — NOT inside any collapsible; manual check on PDP after every build |
| MSG91 SMS template not pre-approved for India | Medium | High | Indian DLT rules require template registration before transactional SMS sends; apply for approval before Phase 2 |
| Lab report PDF served from public Supabase Storage URL | Medium | High | Lab reports must use signed URLs (time-limited) — not publicly guessable paths |
| Phone OTP flow untestable without real Indian number | Medium | Medium | Obtain a test Indian phone number (or use Supabase Auth test mode) before Phase 0 ends |
| COD order not distinguishable from Razorpay paid in admin | Low | Medium | `payment_method` column must be `'cod' | 'razorpay'`; admin filter by payment method required |
| TypeScript strict mode errors blocking build | Medium | High | Run `tsc --noEmit` after each phase; do not accumulate errors across phases |
