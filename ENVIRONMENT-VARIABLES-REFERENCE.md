# Environment Variables Reference

Complete list of environment variables required by the project and where to obtain each value.

Client / Public (set as `NEXT_PUBLIC_*` in Vercel)
- `NEXT_PUBLIC_FIREBASE_API_KEY` — From Firebase Console → Project Settings → SDK setup; copy Web API Key.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` — From Firebase Console → Project Settings; usually `<project>.firebaseapp.com`.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` — Firebase project ID. (In this repo `vercel.json` maps it to `@firebase_project_id`.)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` — Storage bucket name (Firebase Console → Storage).
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` — Messaging sender id (for FCM; optional).
- `NEXT_PUBLIC_FIREBASE_APP_ID` — App ID shown in Firebase SDK config.
- `NEXT_PUBLIC_SITE_URL` — Production canonical URL for the app (e.g., `https://app.example.com`).

Server / Secret (add as encrypted env vars in Vercel)
- `FIREBASE_SERVICE_ACCOUNT_JSON` — JSON content of the Firebase Service Account private key (Firebase Console → Project Settings → Service accounts → Generate new private key).
- `UPSTASH_REDIS_REST_URL` — Upstash REST endpoint (Upstash console)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash token (Upstash console)
- `PAYSTACK_PUBLIC_KEY` — Paystack public key (Dashboard → API Keys)
- `PAYSTACK_SECRET_KEY` — Paystack secret key (Dashboard → API Keys). Used server-side to verify webhooks.

Optional / Other
- `NEXT_PUBLIC_ADMIN_UID` — optional admin user UID used by app (if any)

Where to set each variable
- Local development: `.env.local` (do NOT commit to Git).
- Vercel Preview & Production: Project → Settings → Environment Variables (add as Encrypted values). Use `vercel env add` CLI for automation.

Vercel CLI example (add multiple envs):
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add FIREBASE_SERVICE_ACCOUNT_JSON production
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
vercel env add PAYSTACK_PUBLIC_KEY production
vercel env add PAYSTACK_SECRET_KEY production
vercel env add NEXT_PUBLIC_SITE_URL production
```
