# Prompt Bot — Backend Production Architecture

> A comprehensive guide to building a production-grade backend for the Prompt Bot platform.
> Covers database, caching, rate limiting, security, monitoring, and cost planning.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Database Layer — PostgreSQL (Neon)](#2-database-layer--postgresql-neon)
3. [Caching Layer — Redis (Upstash)](#3-caching-layer--redis-upstash)
4. [Rate Limiting — Upstash Ratelimit](#4-rate-limiting--upstash-ratelimit)
5. [Input Validation — Zod](#5-input-validation--zod)
6. [Error Tracking — Sentry](#6-error-tracking--sentry)
7. [Security Headers & CORS](#7-security-headers--cors)
8. [Service Architecture Map](#8-service-architecture-map)
9. [Cost Estimate](#9-cost-estimate)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [What You Don't Need Yet](#11-what-you-dont-need-yet)

---

## 1. Current Architecture

### Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| API         | Hono.js (Node.js + TypeScript)      |
| Database    | PostgreSQL with Drizzle ORM         |
| Auth        | JWT (jose library, HS256, 7-day)    |
| AI          | Anthropic Claude API (Sonnet 4)     |
| Hosting     | Vercel Serverless Functions          |
| Frontend    | React 18 SPA (Vite + TypeScript)    |

### Current API Routes

| Mount              | Purpose                                |
| ------------------ | -------------------------------------- |
| `/api/auth`        | Register, login, `/me`                 |
| `/api/prompts`     | Prompt CRUD, copy/save events          |
| `/api/submissions` | Community prompt submissions           |
| `/api/profile`     | User profile and stats                 |
| `/api/admin`       | Admin-only bulk CSV import             |
| `/api/library`     | Imported `pl_prompts` library          |
| `/api/builder`     | AI-powered prompt generation           |
| `/api/improver`    | AI-powered prompt improvement          |

### Known Production Risks

- No connection pooling — serverless functions open a new DB connection per request
- No rate limiting — AI endpoints (Builder/Improver) can be abused, causing bill shock
- No input validation — raw JSON bodies passed directly to queries and Anthropic API
- No error tracking — if something breaks in production, there is zero visibility
- No caching — identical requests hit the database and Anthropic API every time

---

## 2. Database Layer — PostgreSQL (Neon)

### Why Neon

| Feature                | Benefit                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| Serverless-native      | Scales to zero when idle, scales up under load. Perfect for Vercel.     |
| Built-in pooling       | Serverless driver (`@neondatabase/serverless`) pools connections.        |
| Branching              | Create a copy of production DB for testing — no snapshots or dumps.     |
| Auto-suspend           | Pay nothing when nobody is using the app at 3am.                        |
| Postgres-compatible    | No code changes to schema, queries, or Drizzle ORM config.             |

### The Problem Without Pooling

Your current setup opens a raw `postgres` connection per serverless function invocation.

- 50 concurrent users = 50 open connections
- PostgreSQL default connection limit = 100
- At moderate traffic, you get `FATAL: too many connections` errors
- Vercel cold starts each open a new connection and never close it properly

### What Changes in Code

- Replace `postgres` driver with `@neondatabase/serverless` in `src/db/index.ts`
- Connection string stays the same format — pooled automatically
- Drizzle schema, migrations, and all queries stay identical
- One file change, zero migration work

### Recommended Configuration

```
Neon Free Tier:
- 0.5 GB storage
- 190 compute hours/month
- Autoscaling 0.25 to 2 compute units
- Point-in-time restore (7 days)
```

---

## 3. Caching Layer — Redis (Upstash)

### Why Upstash

| Feature              | Benefit                                                          |
| -------------------- | ---------------------------------------------------------------- |
| HTTP-based Redis     | Works in serverless — no TCP connection persistence needed       |
| Pay per request      | 10,000 free requests/day, not per hour of server uptime          |
| Global replication   | Data cached at the edge closest to the user                      |
| Single SDK           | `@upstash/redis` — one import, works everywhere                  |
| Multi-use            | Same instance for caching, rate limiting, and session storage    |

### What to Cache

| Endpoint                  | Current Cost                        | With Cache          | TTL      |
| ------------------------- | ----------------------------------- | ------------------- | -------- |
| `/api/library` (list)     | DB query every request              | Serve from Redis    | 10 min   |
| `/api/library/search`     | Full-text search (expensive GIN)    | Cache by query hash | 5 min    |
| `/api/library/categories` | DB aggregate query                  | Cache once          | 1 hour   |
| `/api/builder/generate`   | Anthropic API call (~$0.003-0.01)   | Cache by input hash | 24 hours |
| `/api/improver/improve`   | Anthropic API call (~$0.003-0.01)   | Cache by input hash | 24 hours |

### Anthropic Caching — Why This Is Critical

Without caching:
- 100 users type "a samurai in rain at night" for Midjourney
- You call Claude 100 times at $0.01 each = **$1.00**

With caching:
- First request calls Claude, result stored in Redis
- Next 99 requests served from cache in < 50ms = **$0.01**
- **99% cost reduction on repeated prompts**

### How It Works

```
User Request
    |
    v
Hash(idea + platform + style + mood + aspect)
    |
    v
Check Redis
    |
    +--> HIT:  Return cached prompt instantly (< 50ms response)
    |
    +--> MISS: Call Anthropic API
               Store result in Redis with 24h TTL
               Return to user
```

### Cache Invalidation Strategy

- Library data: TTL-based (auto-expires after 10 min)
- AI responses: TTL-based (24 hours) — prompts don't go stale
- User-specific data (profile, dashboard): No cache, always fresh
- After admin imports: Manually flush library cache keys

---

## 4. Rate Limiting — Upstash Ratelimit

### Why This Is Your Biggest Risk

Your `/api/builder/generate` and `/api/improver/improve` endpoints:

- Call the Anthropic API with zero protection
- Require no authentication
- Have no request limits

**Attack scenario:** Anyone opens DevTools, copies the fetch request, runs it in a loop 10,000 times. Cost: **$100+ in API charges in minutes.**

### Proposed Rate Limits

| Tier              | Builder / Improver   | Library API       | Auth Endpoints    |
| ----------------- | -------------------- | ----------------- | ----------------- |
| Anonymous (by IP) | 5 requests/hour      | 60 requests/min   | 10 requests/min   |
| Free user         | 20 requests/hour     | 120 requests/min  | 10 requests/min   |
| Pro user          | 200 requests/hour    | Unlimited         | 10 requests/min   |

### Why Upstash Ratelimit

- Uses the same Upstash Redis instance — no extra service or cost
- Sliding window algorithm built-in (not simple counters that reset at boundaries)
- Returns standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Frontend can read these headers to show warnings before the user hits the limit
- 3 lines of code to add to any Hono route

### Response When Rate Limited

```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600,
  "limit": 20,
  "remaining": 0
}
```

HTTP Status: `429 Too Many Requests`

---

## 5. Input Validation — Zod

### Why This Is a Security Requirement

Your current routes accept raw JSON bodies and pass them directly to database queries and the Anthropic API. This is exploitable.

### Attack Vectors Without Validation

| Endpoint                 | Attack                                                  | Impact                          |
| ------------------------ | ------------------------------------------------------- | ------------------------------- |
| `/api/builder/generate`  | Send `idea` as a 500KB string                           | Anthropic call costs 10x more   |
| `/api/auth/register`     | Send `email` as `<script>alert('xss')</script>`         | XSS if rendered unescaped       |
| `/api/submissions`       | Submit 10MB of text as a "prompt"                       | DB storage abuse                |
| `/api/builder/generate`  | Send `platform` as `"'; DROP TABLE users; --"`          | SQL injection attempt           |
| `/api/improver/improve`  | Send `prompt` with Anthropic prompt injection            | AI manipulation                 |

### What Zod Provides

- **Type-safe validation at the boundary** — every request body validated before touching business logic
- **Automatic error messages** — `"idea must be between 1 and 2000 characters"`
- **Strip unknown fields** — prevents extra data from leaking into your database
- **Enum enforcement** — platform must be one of the 6 valid values, nothing else
- **Works with Hono** — built-in validator middleware integration

### Example Schemas

**Builder endpoint:**
```typescript
const BuilderSchema = z.object({
  idea:     z.string().min(1).max(2000),
  family:   z.enum(["image", "video", "text", "content"]),
  platform: z.enum(["chatgpt", "gemini", "grok", "midjourney", "firefly", "flux"]),
  style:    z.string().max(50).optional(),
  mood:     z.string().max(50).optional(),
  aspect:   z.string().max(10).optional(),
});
```

**Auth registration:**
```typescript
const RegisterSchema = z.object({
  email:    z.string().email().max(255),
  password: z.string().min(8).max(128),
  name:     z.string().min(1).max(100).optional(),
});
```

**Submission:**
```typescript
const SubmissionSchema = z.object({
  title:       z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  category:    z.string().max(100),
  platform:    z.string().max(50).optional(),
  tags:        z.array(z.string().max(50)).max(10).optional(),
});
```

---

## 6. Error Tracking — Sentry

### Why You Need This Before Launch

- If something breaks in production, you currently have **zero visibility**
- Vercel serverless logs disappear after 1 hour on the free plan
- Users will not report errors — they will leave
- You cannot debug what you cannot see

### What Sentry Catches That You Can't See Otherwise

| Error Type                          | Example                                           |
| ----------------------------------- | ------------------------------------------------- |
| Unhandled promise rejections        | Drizzle query fails silently                      |
| Anthropic API timeouts              | Claude takes > 30s, Vercel function times out     |
| Anthropic rate limit errors         | Your account hits API limits                      |
| Database connection failures        | Postgres connection pool exhausted                |
| JWT validation errors               | Expired, tampered, or malformed tokens            |
| Frontend React component crashes    | Component throws during render, blank page        |

### Why Sentry Specifically

- **Free tier:** 5,000 errors/month (plenty for early stage)
- **Hono integration:** 4 lines of code
- **Context:** Shows the exact request that caused the error — headers, body, user, timing
- **Alerts:** Email or Slack notification when error rate spikes
- **Performance:** Optional request tracing to find slow endpoints

### Setup Effort

- Backend: Add `@sentry/node`, wrap Hono app — 15 minutes
- Frontend: Add `@sentry/react`, wrap App component — 15 minutes

---

## 7. Security Headers & CORS

### CORS — Lock It Down

**Current risk:** Your CORS may allow `*` or overly broad origins.

**Production CORS configuration:**

```typescript
{
  origin: ["https://promptbot.app"],           // Only your production domain
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Authorization", "Content-Type"],
  credentials: true,
  maxAge: 86400,                                // Cache preflight for 24 hours
}
```

### Security Headers to Add

| Header                          | Value                                  | Purpose                          |
| ------------------------------- | -------------------------------------- | -------------------------------- |
| `X-Content-Type-Options`        | `nosniff`                              | Prevents MIME type sniffing      |
| `X-Frame-Options`               | `DENY`                                 | Prevents clickjacking            |
| `Referrer-Policy`               | `strict-origin-when-cross-origin`      | Limits referrer data leakage     |
| `Permissions-Policy`            | `camera=(), microphone=(), geolocation=()` | Disable unnecessary APIs     |
| `Strict-Transport-Security`     | `max-age=31536000; includeSubDomains`  | Enforce HTTPS for 1 year         |
| `X-XSS-Protection`              | `1; mode=block`                        | Legacy XSS filter                |

### Implementation

Single Hono middleware — runs before every request, adds all headers automatically. About 15 lines of code.

---

## 8. Service Architecture Map

```
                         User Browser
                              |
                              v
                    +-------------------+
                    |   Vercel Edge     |
                    |   (CDN + Static)  |
                    +-------------------+
                              |
                    +---------+---------+
                    |                   |
                    v                   v
            Static Assets         API Requests
            (cached at edge)           |
                                       v
                          +------------------------+
                          | Vercel Serverless Fn   |
                          | (Hono.js App)          |
                          +------------------------+
                                       |
                          Middleware Chain (in order):
                                       |
                          1. Security Headers
                          2. CORS Check
                          3. Rate Limiter ---------> Upstash Redis
                          4. Zod Input Validation
                          5. Route Handler
                                       |
                          +------------+------------+
                          |                         |
                          v                         v
                  +---------------+        +-----------------+
                  | Neon Postgres |        | Anthropic API   |
                  | (pooled conn) |        | (Claude Sonnet) |
                  +---------------+        +-----------------+
                                                    |
                                           Cache result in
                                                    |
                                                    v
                                           +---------------+
                                           | Upstash Redis |
                                           | (cache layer) |
                                           +---------------+
                                                    |
                                           Response -> User
                                                    |
                                           Errors -> Sentry
```

### Request Flow — Builder Example

```
1. User clicks "Generate Pro Prompt"
2. Frontend POST /api/builder/generate { idea, platform, style, mood }
3. Vercel routes to serverless function
4. Hono middleware chain:
   a. Security headers added
   b. CORS validated (origin = promptbot.app)
   c. Rate limiter checks: user has 15/20 requests remaining? -> PASS
   d. Zod validates: idea is string, 1-2000 chars, platform is valid enum? -> PASS
5. Route handler:
   a. Hash the input: sha256(idea + platform + style + mood)
   b. Check Redis: cached result exists?
      -> YES: return cached prompt (50ms total response time)
      -> NO:  call Anthropic API (2-5 seconds)
              store result in Redis (TTL 24h)
              return prompt to user
6. Response sent with rate limit headers
7. If any error: Sentry captures with full context
```

---

## 9. Cost Estimate

### Monthly Cost at Different Scales

#### Early Stage (0-100 daily users)

| Service          | Plan         | Cost      |
| ---------------- | ------------ | --------- |
| Neon Postgres    | Free         | $0        |
| Upstash Redis    | Free         | $0        |
| Sentry           | Free         | $0        |
| Anthropic API    | Pay per use  | $10-20    |
| Vercel           | Free/Hobby   | $0        |
| **Total**        |              | **$10-20/mo** |

#### Growth Stage (100-1,000 daily users)

| Service          | Plan         | Cost      |
| ---------------- | ------------ | --------- |
| Neon Postgres    | Launch ($19) | $19       |
| Upstash Redis    | Pay-as-go    | $10       |
| Sentry           | Free         | $0        |
| Anthropic API    | Pay per use  | $30-50    |
| Vercel           | Pro ($20)    | $20       |
| **Total**        |              | **$79-99/mo** |

#### Scale Stage (1,000-10,000 daily users)

| Service          | Plan         | Cost      |
| ---------------- | ------------ | --------- |
| Neon Postgres    | Scale ($69)  | $69       |
| Upstash Redis    | Pro ($100)   | $100      |
| Sentry           | Team ($26)   | $26       |
| Anthropic API    | Pay per use  | $100-300  |
| Vercel           | Pro ($20)    | $20       |
| **Total**        |              | **$315-515/mo** |

### Cost Savings from Caching

Without caching (1,000 daily users, avg 5 AI requests each):
- 5,000 Anthropic calls/day x $0.008 avg = **$40/day = $1,200/month**

With caching (assuming 60% cache hit rate):
- 2,000 unique calls/day x $0.008 = **$16/day = $480/month**
- **Savings: $720/month**

---

## 10. Implementation Roadmap

### Phase 1 — Protect (Week 1)

| #  | Task                                  | Time   | Impact                        |
| -- | ------------------------------------- | ------ | ----------------------------- |
| 1  | Upstash Redis setup + rate limiting   | 3 hrs  | Prevents AI endpoint abuse    |
| 2  | Zod validation on all API routes      | 3 hrs  | Blocks malformed/malicious input |
| 3  | Security headers middleware           | 30 min | Hardens HTTP layer            |
| 4  | CORS lockdown for production          | 15 min | Restricts cross-origin access |

### Phase 2 — Optimize (Week 2)

| #  | Task                                  | Time   | Impact                        |
| -- | ------------------------------------- | ------ | ----------------------------- |
| 5  | Neon serverless driver migration      | 1 hr   | Fixes connection pooling      |
| 6  | Cache library endpoints in Redis      | 2 hrs  | Faster responses, less DB load|
| 7  | Cache Anthropic responses in Redis    | 2 hrs  | 60-99% API cost reduction     |

### Phase 3 — Monitor (Week 3)

| #  | Task                                  | Time   | Impact                        |
| -- | ------------------------------------- | ------ | ----------------------------- |
| 8  | Sentry backend integration            | 30 min | Error visibility              |
| 9  | Sentry frontend integration           | 30 min | Crash reporting               |
| 10 | Structured request logging            | 1 hr   | Debugging and analytics       |

### Phase 4 — Scale (When Needed)

| #  | Task                                  | Time   | Impact                        |
| -- | ------------------------------------- | ------ | ----------------------------- |
| 11 | Model tiering (Haiku vs Sonnet)       | 2 hrs  | Further AI cost reduction     |
| 12 | Queue system for heavy AI requests    | 3 hrs  | Handle traffic spikes         |
| 13 | Database read replicas                | 1 hr   | Handle read-heavy traffic     |

---

## 11. What You Don't Need Yet

These are commonly recommended but unnecessary at your current stage:

| Technology               | Why Not Yet                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| Kubernetes / Docker      | Vercel serverless handles scaling automatically                  |
| Microservices            | Monolith is fine until you have 5+ engineers                     |
| Message queues (RabbitMQ)| Only needed if AI requests must survive server crashes            |
| GraphQL                  | REST is simpler, your data shapes are fixed                      |
| Multi-region deployment  | Single region is fine until you have global users                |
| CDN for API responses    | Upstash Redis global replication covers this                     |
| Load balancer            | Vercel handles this automatically                                |
| CI/CD pipeline           | Vercel auto-deploys from git — that's your pipeline              |
| Terraform / IaC          | 5 services with web dashboards don't need infrastructure-as-code |

### When to Reconsider

- **Kubernetes:** When you need custom GPU workloads or persistent WebSocket connections
- **Microservices:** When your team grows past 5 engineers working on the same codebase
- **Message queues:** When AI generation takes > 30 seconds and you need async processing
- **GraphQL:** When your frontend needs wildly different data shapes per page
- **Multi-region:** When > 30% of your users are in a different continent

---

## Summary

The production backend requires six additions to the current stack:

1. **Neon Postgres** — connection pooling for serverless (prevents crashes)
2. **Upstash Redis** — caching + rate limiting (saves money, prevents abuse)
3. **Zod** — input validation (security baseline)
4. **Sentry** — error tracking (visibility)
5. **Security headers** — HTTP hardening (best practice)
6. **CORS lockdown** — restrict API access (production security)

Total effort: ~2-3 weeks of focused work.
Starting cost: $10-20/month.
Biggest single win: Anthropic response caching (saves $700+/month at scale).

---

*Document generated for the Prompt Bot project.*
*Last updated: June 2026*
