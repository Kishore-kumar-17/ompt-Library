# 05 — Epics and User Stories
## E-commerce Platform · ecomm_platform_01

---

## EPIC-001 — Foundation

Setup the project, database, auth, and design system. No feature until this is complete.

---

**STORY-001-01: Project Initialisation**
As a developer, I need a running Next.js 14 project with all dependencies installed so I can start building features.

Acceptance criteria:
- `npm run dev` starts without errors
- TypeScript strict mode enabled (`strict: true` in tsconfig)
- Tailwind configured with CSS variable tokens
- DM Sans loaded via `next/font/google`
- All environment variables documented in `.env.example`

Dependencies: none
Estimate: 0.5 day

---

**STORY-001-02: Database Schema**
As a developer, I need all database tables created in Supabase with RLS enabled so data is structured and secure.

Acceptance criteria:
- All 9 tables from `02_Architecture.md` created
- RLS enabled on all tables
- All policies applied as specified
- `updated_at` triggers working on `products` and `orders`
- `handle_new_user` trigger creates profile on signup

Dependencies: STORY-001-01
Estimate: 1 day

---

**STORY-001-03: Authentication Setup**
As a visitor, I can sign up with email or Google so I can create an account.

Acceptance criteria:
- `/auth/signup` — email + password + name form, creates Supabase user + profile
- `/auth/login` — email + password + Google OAuth button
- `/auth/callback` — handles OAuth redirect
- Supabase session cookie set on login
- Redirect to `/account` after successful login

Dependencies: STORY-001-02
Estimate: 1 day

---

**STORY-001-04: Route Protection**
As a system, unauthenticated users cannot access `/account` or `/admin` routes.

Acceptance criteria:
- Middleware checks session on all `/account/*` and `/admin/*` routes
- Unauthenticated → redirect to `/auth/login` with `?next=` param
- Non-admin on `/admin/*` → redirect to `/`
- After login, redirect back to original destination

Dependencies: STORY-001-03
Estimate: 0.5 day

---

**STORY-001-05: Cart Store**
As a visitor, my cart persists across page refreshes without logging in.

Acceptance criteria:
- Zustand store with `persist` middleware (localStorage key: `cart-storage`)
- `addItem`, `removeItem`, `updateQuantity` functions correct
- Adding same variant increments quantity — no duplicates
- `subtotal` and `itemCount` derived correctly
- Cart survives browser close and reopen

Dependencies: STORY-001-01
Estimate: 0.5 day

---

**STORY-001-06: Design Tokens**
As a developer, all design values are available as CSS variables so components never hardcode colors.

Acceptance criteria:
- All tokens from `03_Design.md` Section 2 in `globals.css`
- Background is `#FAFAF8` not white — verified in browser
- Tailwind extended (not replaced) with custom colors mapping to CSS variables
- `cn()` utility from `clsx` + `tailwind-merge` available

Dependencies: STORY-001-01
Estimate: 0.25 day

---

## EPIC-002 — Product Catalog

Visitors can browse, filter, and view products.

---

**STORY-002-01: Navigation Bar**
As a visitor, I can see the navigation and access cart from any page.

Acceptance criteria:
- Sticky nav, 64px height, correct colors from design system
- Logo, nav links (Men, Women, Sale, Sustainability), icons (search, account, cart)
- Cart icon shows item count badge from Zustand
- Mobile: hamburger + logo center + cart icon
- Mobile menu opens as full-screen overlay with nav links

Dependencies: EPIC-001 complete
Estimate: 1 day

---

**STORY-002-02: Homepage**
As a visitor, I can see the brand and featured products on the homepage.

Acceptance criteria:
- Hero section: lifestyle image + headline + CTA (links to `/collections/mens-shoes`)
- Featured collection: 4 real products from Supabase, 4-column grid
- Brand story strip: 3 material callouts with SVG icons (wool, carbon, comfort)
- Email capture section: email input + subscribe button (saves to Supabase `email_subscribers` table)
- Footer: 4 columns with links
- Page uses Next.js server component — no client-side data fetching for initial load

Dependencies: STORY-002-01, STORY-001-02 with seeded data
Estimate: 2 days

---

**STORY-002-03: Product Listing Page**
As a visitor, I can browse products by category and filter them.

Acceptance criteria:
- Route: `/collections/[category]` — category slug matches `categories.slug`
- Filter bar: color swatches, size chips, sort dropdown
- Filter state in URL search params (`?color=black&size=9&sort=price_asc`)
- Product grid: 4 columns desktop, 2 mobile
- ProductCard: image, hover-to-second-image, product name, price, color swatches
- Load more: 12 items per page, offset pagination, "Load more" button (not infinite scroll)
- 404 if category slug not found

Dependencies: STORY-002-02
Estimate: 2 days

---

**STORY-002-04: Product Card Interactions**
As a visitor, I can see product details and hover interactions on product cards.

Acceptance criteria:
- Second image fades in on hover (`opacity` transition, not `display` toggle)
- Color swatches clickable — changes displayed image to matching color variant
- "Quick add" button appears on hover at bottom of card
- Quick add: if only 1 size available → add directly. If multiple → open size picker popover
- Badge renders if product has `badge` field set

Dependencies: STORY-002-03
Estimate: 1 day

---

**STORY-002-05: Product Detail Page**
As a visitor, I can view full product information and select my size and color.

Acceptance criteria:
- Route: `/products/[slug]`
- Desktop: sticky image gallery left, product info right
- Mobile: image horizontal scroll with snap + dots indicator
- Color selector: switching color updates image gallery to that color's images
- Size selector: grid of all sizes, out-of-stock `opacity-40 line-through cursor-not-allowed` — never hidden
- Size guide: "Size guide" text link → opens modal with size chart table
- Material, care, shipping accordions function (one open at a time)
- "You may also like": 4 products from same category, excludes current product
- `generateStaticParams` for all published product slugs (SSG)
- `generateMetadata` for SEO

Dependencies: STORY-002-03
Estimate: 2 days

---

**STORY-002-06: Add to Cart**
As a visitor, I can add a product to my cart from the PDP.

Acceptance criteria:
- Add to Cart button disabled until size selected
- Clicking without size: shows "Please select a size" validation text below button
- On add: item added to Zustand store, cart drawer opens automatically
- If item already in cart with same variant: quantity increments
- Button shows loading state during add (300ms minimum)
- Success: cart drawer opens, item visible at top

Dependencies: STORY-002-05, STORY-001-05
Estimate: 0.5 day

---

**STORY-002-07: Cart Drawer**
As a visitor, I can view and manage my cart.

Acceptance criteria:
- Slides in from right on desktop, slides up from bottom on mobile (< 640px)
- Line items: image, name, variant description, quantity stepper, remove button
- Quantity stepper: min 1 (no 0 — use remove button to delete)
- Free shipping progress bar: fills as subtotal approaches $100, shows "Unlocked!" message when reached
- "Checkout" button links to `/checkout`
- Clicking backdrop closes drawer
- Drawer is accessible: focus trapped, `aria-label="Shopping cart"`, `role="dialog"`

Dependencies: STORY-002-06
Estimate: 1 day

---

**STORY-002-08: Seed Data**
As a developer, the database has realistic product data for development and testing.

Acceptance criteria:
- At least 3 categories seeded
- At least 12 products seeded with realistic names and descriptions
- Each product has at least 2 colors × 5 sizes = 10 variants
- Variant stock counts varied (some in stock, some out of stock, some low)
- Product images: placeholder images with correct aspect ratio (3:4)
- At least 1 product marked `badge = 'new'` and 1 marked `badge = 'bestseller'`

Dependencies: STORY-001-02
Estimate: 1 day

---

## EPIC-003 — Cart and Checkout

Visitors can complete a purchase.

---

**STORY-003-01: Checkout Page**
As a visitor, I can enter my shipping information to prepare for payment.

Acceptance criteria:
- Route: `/checkout`
- Left column: guest email input (shown if not logged in) + shipping address form
- Right column: order summary — line items from Zustand, subtotal, shipping (free if ≥ $100, else $8.99)
- All form fields validated client-side before Stripe is initialized
- Logged-in user: email pre-filled, saved addresses shown as radio options
- "Use a new address" option always available for logged-in users

Dependencies: STORY-002-07
Estimate: 1.5 days

---

**STORY-003-02: Stripe Payment**
As a visitor, I can pay for my order securely.

Acceptance criteria:
- `POST /api/stripe/create-payment-intent` called when all shipping fields valid
- Amount recalculated on server from cart items — never trust client total
- Stripe Payment Element mounted (card + Apple Pay + Google Pay)
- "Place order" button submits Stripe payment
- Payment errors surfaced as readable messages (not raw Stripe error codes)
- Loading state on button during payment processing

Dependencies: STORY-003-01
Estimate: 2 days

---

**STORY-003-03: Order Creation via Webhook**
As the system, a successful payment creates an order in the database.

Acceptance criteria:
- `POST /api/stripe/webhook` handles `payment_intent.succeeded`
- Signature verified with `STRIPE_WEBHOOK_SECRET`
- Idempotency: if order with `stripe_payment_intent_id` already exists, return 200 without creating duplicate
- Order created with all fields: shipping address, items (snapshot), total, status `processing`
- `stock_count` decremented for each ordered variant (use transaction or check for race condition)
- Webhook returns 200 within 3 seconds (Stripe times out at 30s)

Dependencies: STORY-003-02
Estimate: 2 days

---

**STORY-003-04: Order Confirmation**
As a visitor, I receive confirmation after a successful purchase.

Acceptance criteria:
- On Stripe payment success → redirect to `/checkout/success?payment_intent=pi_xxx`
- Cart cleared from Zustand
- Order summary shown: order number, items, shipping address, estimated delivery (5–7 days)
- "Continue shopping" button links to homepage
- Confirmation email sent via Resend within 2 minutes
- Email subject: `Your order #XXXX is confirmed`
- Email content: order number, items table, total, shipping address

Dependencies: STORY-003-03
Estimate: 1 day

---

## EPIC-004 — User Accounts

Users can manage their account and view order history.

---

**STORY-004-01: Account Dashboard**
As a logged-in user, I can navigate my account sections.

Acceptance criteria:
- Route: `/account` → redirects to `/account/orders`
- Account layout: sidebar with Orders, Addresses, Password links
- Sidebar shows user's name and email
- Mobile: sidebar collapses to tab bar at bottom

Dependencies: STORY-001-03, STORY-001-04
Estimate: 0.5 day

---

**STORY-004-02: Order History**
As a logged-in user, I can view all my past orders.

Acceptance criteria:
- Route: `/account/orders`
- List of orders: order number, date, status chip, total, "View order" link
- Status chips: Processing (grey), Shipped (blue), Delivered (green), Cancelled (red)
- Empty state: "No orders yet" with link to shop
- Orders sorted by date descending
- Only shows orders where `user_id = auth.uid()` (RLS enforced)

Dependencies: STORY-004-01
Estimate: 0.5 day

---

**STORY-004-03: Order Detail**
As a logged-in user, I can view the details of a specific order.

Acceptance criteria:
- Route: `/account/orders/[id]`
- Shows: order number, date, status, line items (with snapshot data), shipping address, total
- If shipped: shows tracking number as link
- "Request return" button: only if status is `delivered`, only if within 30 days of order date
- Clicking "Request return" → updates order status to `return_requested` + sends email to admin
- "Buy again" button: adds in-stock items to cart, shows toast for each skipped out-of-stock item

Dependencies: STORY-004-02
Estimate: 1 day

---

**STORY-004-04: Saved Addresses**
As a logged-in user, I can manage my saved shipping addresses.

Acceptance criteria:
- Route: `/account/addresses`
- List of saved addresses with edit, delete, and "Set as default" actions
- "Add new address" form: full name, line1, line2, city, state, postal, country
- Default address marked visually and selected first in checkout
- Deleting default address → no default set (user must select one)
- At most 5 addresses per user

Dependencies: STORY-004-01
Estimate: 1 day

---

**STORY-004-05: Password Change**
As a logged-in user, I can change my password.

Acceptance criteria:
- Form: current password, new password, confirm new password
- Validates current password via Supabase before allowing change
- New password minimum 8 characters
- Success: "Password updated" toast, form resets

Dependencies: STORY-004-01
Estimate: 0.5 day

---

## EPIC-005 — Admin Panel

Store admins can manage products, orders, and inventory.

---

**STORY-005-01: Admin Layout**
As an admin, I can navigate the admin panel.

Acceptance criteria:
- Route: `/admin` — role-protected
- Sidebar: Products, Orders, Inventory links
- Non-admin user redirected to home (middleware handles this)
- Admin layout is visually distinct from storefront (different bg, admin label)

Dependencies: STORY-001-04
Estimate: 0.5 day

---

**STORY-005-02: Product Management**
As an admin, I can create and edit products.

Acceptance criteria:
- `/admin/products` — table of all products (published and unpublished)
- Create product: name, slug (auto-generated from name), description, category, material, care, badge, published toggle
- Edit product: same form pre-filled
- Delete product: confirmation dialog required
- Slug must be unique — validate on save

Dependencies: STORY-005-01
Estimate: 1.5 days

---

**STORY-005-03: Variant Manager**
As an admin, I can manage product variants (size × color combinations).

Acceptance criteria:
- Inline variant table on product edit page
- Add variant: size, color name, color hex (picker), SKU, stock count, price override
- Edit variant inline
- Delete variant (confirm if stock > 0)
- SKU must be unique across all variants
- Variant changes trigger ISR revalidation of product page

Dependencies: STORY-005-02
Estimate: 1 day

---

**STORY-005-04: Image Management**
As an admin, I can upload and order product images.

Acceptance criteria:
- Drag-and-drop image uploader on product edit page
- Accepts JPEG, PNG, WebP — max 5MB per file
- Uploaded to Supabase Storage at `products/{product_id}/{color_name}/{position}.webp`
- After upload: URL saved to `product_images` table
- Images reorderable by drag
- Delete image: removes from storage + database
- Primary image marked with star icon — used in product card

Dependencies: STORY-005-02
Estimate: 1 day

---

**STORY-005-05: Order Management**
As an admin, I can view and update order status.

Acceptance criteria:
- `/admin/orders` — table: order number, email, status, total, date
- Filter by status (dropdown)
- Order detail: line items, shipping address, status dropdown
- Update status: dropdown + "Update" button
- Shipping update: enter tracking number → status changes to "Shipped"
- On status change to "Shipped" → send shipping notification email with tracking number

Dependencies: STORY-005-01
Estimate: 1.5 days

---

**STORY-005-06: Inventory Quick Update**
As an admin, I can quickly update stock counts without editing a full product.

Acceptance criteria:
- `/admin/inventory` — search by SKU or product name
- Results table: SKU, product name, color, size, current stock
- Click row → inline stock count input, editable
- "Save" button → updates `stock_count` in database
- Success toast + revalidates product PDP
- Changes reflect on storefront within 30 seconds (ISR revalidation)

Dependencies: STORY-005-01
Estimate: 1 day

---

## EPIC-006 — Launch

---

**STORY-006-01: SEO and Metadata**
As a product owner, all public pages have correct metadata for search engines.

Acceptance criteria:
- `generateMetadata` implemented on: homepage, PLP, PDP, about, privacy, terms
- PDP metadata: product name + brand in title, description from product description
- `og:image` set to product primary image
- `app/sitemap.ts` generates sitemap with all published products and categories
- `robots.txt` blocks `/admin`, `/account`, `/api`

Dependencies: EPIC-002 complete
Estimate: 0.5 day

---

**STORY-006-02: Performance Optimisation**
As a visitor, all pages load quickly on mobile.

Acceptance criteria:
- All product images use `next/image` with explicit dimensions
- Hero image has `priority` prop
- LCP image identified and prioritised
- Fonts preloaded via `next/font`
- No unused JavaScript bundles (bundle analyzer report reviewed)
- Lighthouse Performance 95+ on PDP and homepage (mobile)

Dependencies: EPIC-002 complete
Estimate: 1 day

---

**STORY-006-03: Accessibility Audit**
As a visitor with a disability, I can use the storefront with a screen reader or keyboard.

Acceptance criteria:
- axe-core audit: zero critical violations on homepage, PDP, checkout
- Cart drawer: focus trapped, `role="dialog"`, escape key closes
- All form inputs have labels
- Color swatches have `aria-label` — color name
- Size selector uses `aria-pressed` and `aria-disabled`
- Size guide modal: `role="dialog"`, `aria-labelledby`

Dependencies: EPIC-001–004 complete
Estimate: 1 day

---

**STORY-006-04: Error and Loading States**
As a visitor, I see helpful feedback when pages load or fail.

Acceptance criteria:
- `loading.tsx` exists for all route segments — skeleton UI matching layout
- `error.tsx` exists with "Something went wrong" message and "Go home" link
- `not-found.tsx` exists with navigation and search
- Network errors on Add to Cart show toast: "Failed to add item — please try again"
- Checkout API errors show inline message below payment form

Dependencies: EPIC-002–004 complete
Estimate: 1 day
