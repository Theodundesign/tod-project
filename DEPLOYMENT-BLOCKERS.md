# Deployment Blockers Classification

This file classifies known deployment blockers discovered during the environment audit.

Critical
- `FIREBASE_SERVICE_ACCOUNT_JSON` or `FIREBASE_SERVICE_ACCOUNT` not set — blocks server-side Admin SDK operations used by APIs and webhooks.
- `PAYSTACK_PUBLIC_KEY` / `PAYSTACK_SECRET_KEY` not set — blocks payments and webhook verification; high risk for production.
- Client `NEXT_PUBLIC_FIREBASE_*` values (API key, authDomain, storageBucket, appId) not configured in Vercel — blocks client Firebase initialization.

High
- `NEXT_PUBLIC_SITE_URL` not set — affects canonical URLs, OAuth authorized domains, and webhook return URLs.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` not set — rate limiting not configured; rely on in-memory fallback which is not durable across instances.

Medium
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` missing — affects FCM usage (if not used, low impact).
- Firestore rules not yet fully validated (requires emulator tests) — potential security risk until tested.

Low
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` is mapped in `vercel.json` to `@firebase_project_id` but verify secret exists — low risk if already configured.
- Non-critical environment variables (analytics, optional features) absent in examples — address as needed.
