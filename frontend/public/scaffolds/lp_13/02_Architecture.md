# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_13

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Animation Engine:** Framer Motion (For translucent entry slides and layout transitions).
- **Styling:** Tailwind CSS (Custom "Glass" utility tokens and `backdrop-filter` support).
- **CMS:** Contentlayer (For structured Feature Metadata and release notes).
- **Media:** Next.js Image + Cloudinary (For high-fidelity browser frame textures).

### 2. Data Model
```sql
-- Features (The Capability)
table features (
  id uuid primary key,
  title text not null, -- 'Spaces', 'Split View'
  description text,
  icon_svg text,
  mockup_url text, -- WebP texture
  accent_glow text -- 'Indigo', 'Teal'
);

-- Platforms (The Acquisition)
table platforms (
  id uuid primary key,
  name text, -- 'Windows', 'MacOS', 'iOS'
  download_url text,
  version_label text, -- 'v1.4.2'
  icon_name text
);

-- Release Notes (The Freshness)
table releases (
  id uuid primary key,
  title text,
  publish_date timestamp,
  content_md text
);
```

### 3. "Aesthetic Trust" Data Flow
1. **Gradient Initialization:** Next.js serves a CSS-only dynamic background to ensure LCP is not blocked by image loading.
2. **Glass Mounting:** `GlassCard` components use `backdrop-filter` and `rgba(255,255,255,0.08)` to render surfaces that adapt to the background gradient.
3. **Interactive Mockups:** `Framer Motion` manages the layout-id transitions for the "Split View" demo, ensuring smooth pane expansion.
4. **Acquisition Flow:** The `DownloadPortal` detects the user's `User-Agent` to highlight the "Primary" platform button while keeping others accessible.
5. **AI Soul Sync:** A global `AnimatePresence` manages the pulsing AI glows that follow the user's scroll depth or hover focus.
