# 07 — Guide
## Engineering Standards · pcpp_platform_19

### 1. ExamMaster Checklist
- **Goal Context:** Is the selected exam goal visible on every interior page?
- **Color:** Are Green (#08BD80) and Gold (#FBB03B) used as the only primary accents?
- **Trust:** Are educator portraits high-res and high-contrast?
- **Speed:** Is the goal-search modal opening and filtering in under 100ms?

### 2. Coding Conventions
- **Search Strategy:** Strictly use Algolia for goal discovery to handle 200+ categories with executive speed.
- **Streaming Strategy:** Use the Mux Player React SDK with `stream-type="live"` for the classroom UI.
- **State Management:** Use Zustand with `persist` for the `activeGoal` to maintain exam context across sessions.
- **Payments:** All subscription transactions must support the RBI e-mandate guidelines for Indian recurring payments.

### 3. File Structure
```
src/
  app/
    (hub)/          # unacademy.com (Central Discovery Portal)
    (exams)/        # Exam-specific sub-sites ([goal])
    subscription/   # Plus vs Iconic comparison hub
    classroom/      # Live class interaction and video
  components/
    discovery/      # GoalModal, GoalSearch, SuccessStats
    learning/       # EducatorCard, BatchGrid, ClassroomUI
    subscription/   # PlanTable, PricingToggle, BenefitIcon
    layout/         # MinimalNav, SuccessFooter, GoalSwitcher
  store/            # useGoalStore, useClassroomStore
  lib/              # sanity-client, algolia-config, mux-utils, razorpay-sdk
```

### 4. Definition of Done
- Goal discovery hub correctly redirects to 200+ exam-specific sub-sites flawlessly.
- Subscription comparison module handles complex tier differences with clear visual cues.
- Live classroom UI supports high-concurrency video and real-time chat/polls.
- Mobile view maintains "Academic Confidence" via responsive goal oversized taps and scannable cards.
