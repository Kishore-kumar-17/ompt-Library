# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_14

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Machine, Technology, Accessory, and Spec data).
- **Styling:** Tailwind CSS (Custom "Industrial" theme with 2px rounding and hair-line border resets).
- **Animations:** Framer Motion (For precise part-deconstruction and scroll-triggered diagrams).
- **Media:** Next.js Image + HTML5 Video (For airflow and motor-speed loops).
- **State Management:** Zustand (For managing "Compare" state across machines).

### 2. Data Model
```sql
-- Machines (The Core)
table machines (
  id uuid primary key,
  model_name text not null, -- 'V15 Detect', 'Airwrap'
  slug text unique,
  main_performance_metric text, -- '240AW Suction'
  hero_render_url text,
  exploded_view_id uuid -- Relation to layer-stack
);

-- Accessories (The System)
table accessories (
  id uuid primary key,
  machine_id uuid references machines(id),
  name text, -- 'Fluffy Optic™ cleaner head'
  function_tag text,
  top_down_image_url text,
  is_in_box boolean default true
);

-- Technical Specs (The Data)
table machine_specs (
  id uuid primary key,
  machine_id uuid references machines(id),
  category text, -- 'Filtration', 'Run time'
  label text,
  value text,
  icon_name text
);

-- Lead Capture (The Owner)
table direct_registrations (
  id uuid primary key,
  email text,
  serial_number text,
  product_id uuid
);
```

### 3. "Performance-First" Data Flow
1. **ISR Mounting:** Next.js fetches `machine_details` and `all_accessories` from Sanity using ISR for near-instant hub delivery.
2. **Deconstruction Trigger:** `Framer Motion` hooks into `useScroll` to trigger the "Mechanical Slide" of product parts as the user enters the hero section.
3. **Metric Interpolation:** Technical numbers (e.g., RPM) animate from 0 to target using `count-up` logic on viewport entry.
4. **Accessory Overlay:** Clicking a tool in the `AccessoryGrid` fetches its "Action Video" from Sanity and mounts a modal without breaking the page scroll.
5. **D2C Handoff:** On "Buy," a Server Action creates a secure session with the payment provider, passing the `machine_id` and selected `accessories`.
