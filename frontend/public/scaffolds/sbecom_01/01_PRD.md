# 01 — Product Requirements Document
## FreshZest Meal-Kit Subscription · sbecom_platform_01

### 1. Product Vision
"FreshZest" is a lifestyle subscription platform that solves the "What's for dinner?" problem. It eliminates the friction of grocery shopping and meal planning by delivering pre-portioned ingredients and easy-to-follow recipes. The platform prioritizes a high-fun, high-conversion onboarding experience that culminates in the "Reward" of picking delicious meals.

**Success Metric:** A new user can complete the 4-step onboarding and pick their first 3 meals in under 4 minutes.

### 2. Personas
**Sarah — The Busy Professional (Subscriber)**
- Works long hours and wants healthy home-cooked meals without the effort of planning.
- Needs: Low-friction signup, mobile-friendly menu selection, and clear "Cancel Anytime" reassurance.
- Frustration: Hard-to-navigate recipe libraries and complex cancellation processes.

**Mark — The Family Chef (Subscriber)**
- Cooks for a family of four and needs kid-friendly options.
- Needs: Box size flexibility (Meals per week / Number of people), dietary tags (Veggie/Quick), and cost transparency.
- Frustration: Hidden shipping costs and lack of variety in meal choices.

### 3. Core Features
- **Multi-Step Onboarding Shell:** A persistent stepper that guides users through Plan -> Account -> Delivery -> Payment.
- **Interactive Plan Selector:** Real-time cost calculator based on the number of people and recipes per week.
- **Dopamine-Driven Meal Picker:** A vibrant, grid-based recipe selector with a "Box Fullness" progress bar.
- **Recipe Management:** Dietary tagging (e.g., "Protein-packed," "Under 20 min") and high-resolution photography.
- **Subscription Dashboard:** Self-service tools for "Skipping a week," "Changing box size," and "Managing payment."

### 4. User Journeys
1. **Signup:** User lands on home -> clicks "Start Cooking" -> chooses "Family Friendly" -> configures 4 people/3 recipes -> completes payment.
2. **The Reward:** Post-payment, user is redirected to the Meal Picker -> adds 3 recipes to their box -> receives confirmation email.
3. **Management:** Existing user logs in -> clicks "Skip next week" -> receives confirmation toast.

### 5. Non-Goals
- No physical grocery marketplace (Focus is strictly on curated meal kits).
- No social networking or "Recipe sharing" (Creator-to-consumer focus).
- No complex loyalty point system (Focus on flat discounts and vouchers).

### 6. Constraints
- **Design:** Vibrant Culinary. Salem Green accents, 8px rounding, heavy use of high-quality food photography.
- **Performance:** 100/100 Lighthouse for "Best Practices" to maintain trust during payment.
- **Transparency:** The "Order Summary" must be visible on every onboarding screen.
