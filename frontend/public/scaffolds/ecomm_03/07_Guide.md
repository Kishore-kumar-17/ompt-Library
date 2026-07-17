# 07 — Guide
## Functional Beverage D2C Platform · ecomm_platform_03

---

### 1. Engineering Principles

- Keep pricing logic server-authoritative
- Keep UI state explicit for purchase model and cadence
- Prefer simple, testable modules over abstraction-heavy patterns
- When requirements conflict, defer to PRD scope and Architecture safety rules

---

### 2. Naming Conventions

- Components: PascalCase
- Hooks/utilities: camelCase
- API routes: resource-oriented names

---

### 3. Data and Money Rules

- Integer cents only in storage and processing
- Never trust client prices or line totals
- Validate SKU + purchase type + cadence on server

---

### 4. UI Rules

- Use CSS variables for brand colors
- Keep ingredient panel visible above fold on PDP
- Keep selectors and pricing states obvious and reversible

---

### 5. Security Rules

- Verify webhook signatures
- Enforce idempotency for payment events
- No secrets in client bundles
- No sensitive logging in production

---

### 6. Testing Rules

Minimum before completion:
- unit tests for cart reducers/selectors
- integration tests for quote + checkout endpoints
- webhook replay tests
- UI tests for toggle/selector behavior

---

### 7. Common Mistakes To Avoid

- Implicitly defaulting to subscription without clear user choice
- Hiding critical ingredient/nutrition information
- Allowing stale client prices to pass into checkout
- Mixing UI copy claims with unverified health statements
