# Production Secrets Status

Date: 2026-06-24

Summary: current repository/runtime inspection (read-only). This file categorizes required secrets as `Configured`, `Missing`, or `Optional`.

Configured
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` — mapped in `vercel.json` to `@firebase_project_id` (verify actual secret exists in Vercel).

Missing
- `NEXT_PUBLIC_FIREBASE_API_KEY` (client)
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` (client)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (client)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (client, optional depending on FCM usage)
- `NEXT_PUBLIC_FIREBASE_APP_ID` (client)
- `FIREBASE_SERVICE_ACCOUNT_JSON` (server)
- `UPSTASH_REDIS_REST_URL` (server)
- `UPSTASH_REDIS_REST_TOKEN` (server)
- `PAYSTACK_PUBLIC_KEY` (payments)
- `PAYSTACK_SECRET_KEY` (payments)
- `NEXT_PUBLIC_SITE_URL` (app canonical URL)

Optional / Low priority
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (if not using FCM)
- Any analytics-only keys if you do not need analytics on day-one

Notes
- Inspection performed by running `node scripts/env-audit.js` and reviewing `vercel.json` and `.env.local` examples. Many values in `.env.local` are placeholders and not present in runtime environment.
- The workspace contains a local `.env.local` file with placeholder values; ensure real secrets are not committed.

Action recommended
1. Add missing secrets to Vercel as encrypted env vars.
2. Remove any local `.env.local` with secrets from the repository and add `.env.local` to `.gitignore` (if missing).
