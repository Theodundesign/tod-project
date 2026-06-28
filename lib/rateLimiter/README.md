Rate limiter (Upstash + fallback)

Setup

- Provide these environment variables in Vercel (Production):
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

Behavior

- Uses Upstash Redis sliding-window algorithm when configured.
- Falls back to an in-memory sliding-window implementation when Redis is unavailable.
- Middleware applies to `/api/*` and will set `X-RateLimit-*` headers and `Retry-After` when limited.

Presets (defaults):
- `strictLimiter`: 10 req / 60 sec
- `authLimiter`: 5 req / 60 sec
- `uploadLimiter`: 20 req / 10 min
- `webhookLimiter`: 60 req / 60 sec
- `contactLimiter`: 3 req / 60 sec

Notes for Vercel:
- Upstash is a globally distributed Redis with low-latency for Vercel Edge.
- `@upstash/redis` is imported lazily to keep middleware cold starts small and avoid runtime errors when env vars are missing.
- If you provide Upstash credentials, the limiter uses an atomic Lua script to ensure correctness under concurrency.

Testing locally

Run the simple test harness (uses in-memory fallback):

```
node scripts/test-rate-limiter.js
```

Deployment

- Add Upstash credentials to your Vercel project.
- Deploy; middleware runs on Edge and APIs are protected. If Upstash is unreachable, the service falls back to in-memory limits and logs suspicious activity.
