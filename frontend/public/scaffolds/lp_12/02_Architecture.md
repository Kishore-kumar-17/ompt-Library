# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_12

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Animation Engine:** GSAP (GreenSock) + ScrollTrigger + MotionPath.
- **Rendering:** HTML5 `<canvas>` (2D Context) for performant sequence scrubbing.
- **Asset Management:** Cloudinary or AWS S3 (for hosting high-res image frame arrays).
- **Styling:** Tailwind CSS (Custom "Apple" spacing and typographic tokens).
- **State Management:** React `useRef` for canvas context and Zustand for navigation states.

### 2. Data Model
```sql
-- Chapters (The Story)
type Chapter = {
  id: string,
  title: text,
  start_percentage: float, -- 0.0 to 1.0
  end_percentage: float,
  overlay_content: jsonb, -- { 'h2': '...', 'p': '...' }
  animation_trigger: text -- 'rotate_left', 'zoom_in'
};

-- Specs (The Detail)
table technical_specs (
  id uuid primary key,
  category text, -- 'Audio', 'Sensors', 'Battery'
  feature_name text,
  feature_value text,
  icon_svg text
);

-- Assets (The Engine)
table frame_sequences (
  id uuid primary key,
  product_id text,
  frame_count integer, -- e.g., 120
  base_url text, -- 'cdn.com/airpods/frame_'
  format text -- 'webp'
);
```

### 3. "Digital Cinema" Data Flow
1. **Preload Phase:** Next.js `useEffect` initiates a hidden `new Image()` loop to cache all 120+ frames in the browser.
2. **Canvas Mounting:** The `ScrollyCanvas` component mounts a high-DPI canvas matching the `100vh` viewport.
3. **Scroll Linking:** GSAP `ScrollTrigger` maps the total scrollable height of the page to the `0-120` frame index.
4. **Frame Rendering:** As the scrollbar moves, the `onUpdate` function clears the canvas and `drawImage()` the frame corresponding to the current scroll percentage.
5. **Overlay Triggers:** Simultaneous GSAP timelines handle the `opacity` and `y` position of the `PinnedText` blocks based on the same scroll markers.
6. **Sub-Nav Sync:** A client-side observer updates the `activeChapter` in Zustand as the user passes specific vertical thresholds.
