# Vercel Secrets Guide

Purpose: step-by-step guidance for provisioning production secrets in Vercel for this project.

Recommended practice
- Store all secrets as encrypted Environment Variables in the Vercel Project settings (do not commit secrets to the repo).
- Scope variables to `Preview` and `Production` as appropriate. For initial testing, set them for `Preview`.
- Prefer `FIREBASE_SERVICE_ACCOUNT_JSON` as the full JSON blob (encrypted). Avoid storing file paths in the repo.

Required secrets and example values
- Firebase Client (public, safe to be `NEXT_PUBLIC_*`):
  - `NEXT_PUBLIC_FIREBASE_API_KEY` — e.g. `AIza...` (from Firebase project settings)
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` — e.g. `your-project.firebaseapp.com`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID` — e.g. `your-project-id`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` — e.g. `your-project.appspot.com`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` — e.g. `1234567890` (if using FCM)
  - `NEXT_PUBLIC_FIREBASE_APP_ID` — e.g. `1:123:web:abcdef`

- Firebase Admin (server-side secret):
  - `FIREBASE_SERVICE_ACCOUNT_JSON` — paste the full JSON service account contents as the value (encrypted). Example field: `client_email`, `private_key`.

- Upstash (if used in production):
  - `UPSTASH_REDIS_REST_URL` — e.g. `https://<region>.upstash.io`
  - `UPSTASH_REDIS_REST_TOKEN` — Upstash REST token

- Paystack (payments):
  - `PAYSTACK_PUBLIC_KEY` — public client key for client SDKs
  - `PAYSTACK_SECRET_KEY` — server secret used to verify webhooks

- App:
  - `NEXT_PUBLIC_SITE_URL` — canonical production URL (e.g. `https://app.example.com`)

How to add secrets (Vercel UI)
1. Go to your project in Vercel → Settings → Environment Variables.
2. Click "Add" and enter `Name`, `Value` (paste the secret), and `Environment` (Preview/Production/Development).
3. Save and redeploy the preview or production deployment to pick up runtime secrets.

How to add secrets (Vercel CLI)
1. Install Vercel CLI and authenticate: 
```bash
npm i -g vercel
vercel login
```
2. Add a secret (example for service account):
```bash
vercel env add FIREBASE_SERVICE_ACCOUNT_JSON production
```
When prompted, paste the JSON content.

3. Add client keys:
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
```

Verification steps after provisioning
- Create a Preview deployment and run: `node scripts/validate-env.js` on the preview (or run smoke tests) to confirm all required vars are present.
- Confirm `FIREBASE_ADMIN` initializes using the provided `FIREBASE_SERVICE_ACCOUNT_JSON` in a preview deployment (check serverless function logs).

Security notes
- Never commit the `FIREBASE_SERVICE_ACCOUNT_JSON` to Git. If accidentally committed, rotate the key immediately and remove from history.
- Prefer per-environment secrets (Preview vs Production) to avoid accidental leaks.
