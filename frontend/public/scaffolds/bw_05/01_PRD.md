# 01 — Product Requirements Document
## CulinaryNarrative Restaurant Hub · bw_platform_05

### 1. Product Vision
"CulinaryNarrative" is a digital landmark for iconic dining institutions. It moves beyond the "static menu" to create an "Editorial Storybook" where regional ingredients and communal traditions are celebrated. The platform prioritizes high-energy visual storytelling and frictionless booking, providing world-class restaurants with a digital presence that matches the vibrancy and playful sophistication of their physical bungalows.

**Success Metric:** 20% of users engage with a "Canteen Story" before initiating a table reservation or a merchandise purchase.

### 2. Personas
**Siddharth — The Urban Gourmet (Client)**
- Lives in a major city and seeks experiences that blend high-quality food with cultural depth.
- Needs: Immediate access to seasonal menus, a scannable summary of "New Launches," and a direct way to book for large groups.
- Frustration: Sites that are purely informational and don't provide the "vibe" or context of the dining experience.

**Anya — The International Traveler (Audience)**
- Planning a trip and seeks "Must-Visit" culinary landmarks.
- Needs: To see evidence of high-production value, celebrity-grade reviews, and a clear understanding of the restaurant's "Indian Glocal" philosophy.
- Frustration: Poor mobile performance and lack of high-res "Atmospheric" imagery of the restaurant interior and table scenes.

### 3. Core Features
- **Narrative Story Hero:** A high-impact opening that uses vertical scrolling to tell "The Canteen Story" before presenting functional links.
- **Sticky Booking Header:** A persistent UI layer for "Book a Table" and hours, ensuring the primary conversion goal is always visible.
- **Icon-Led Digital Menu:** A dynamic menu layout where dish categories are anchored by custom illustrative icons and regional story snippets.
- **Reservation Slide-Drawer:** A non-disruptive booking interface that integrates third-party widgets (SevenRooms) into the brand environment.
- **Canteen Merch Storefront:** A standalone e-commerce layer for selling digital gift cards, recipe books, and brand apparel.

### 4. User Journeys
1. **The Seasonal Discovery:** Visitor lands on home -> scrolls through "The Canteen Food" narrative -> clicks "Full Menu" -> browses icon-rich dish lists -> clicks "Book a Table."
2. **The Community Join:** User navigates to "Canteen Stories" -> reads about the "Independence Day Daawat" -> views the event gallery -> clicks "Reserve for Private Event."
3. **The Gift Purchase:** User enters "The Canteen Shop" -> selects a digital gift card -> completes 1-page checkout -> receives a branded e-voucher instantly.

### 5. Non-Goals
- No "Online Food Delivery" integration (Focus is on the Dine-In and Merch experience).
- No community "Forum" or public "Reviews" (Maintain the curated, authoritative voice).
- No complex "Custom Dish" builder (Maintain the integrity of the Chef's seasonal vision).

### 6. Constraints
- **Design:** Art Deco Glocal. Aged parchment palette, vibrant greens/reds, sharp 2px rounding, eclectic typography.
- **Performance:** Sub-1s initial load for the narrative hero carousel (Next.js optimization).
- **Integration:** Must support seamless hand-off to reservation widgets without full-page reloads.
