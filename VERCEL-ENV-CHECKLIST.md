# Vercel Environment Preparation Checklist

Purpose: ensure all required environment variables and secrets are present in Vercel for production.

Required variables (set as Encrypted Environment Variables / Project Secrets)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (already mapped in `vercel.json` to `@firebase_project_id`; ensure the secret exists)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

- `FIREBASE_SERVICE_ACCOUNT_JSON` (or `FIREBASE_SERVICE_ACCOUNT`) — JSON string of service account or path to stored file available at deploy time

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

- `PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`

- `NEXT_PUBLIC_SITE_URL` (production canonical URL)

Checklist
- [ ] Add each secret in Vercel under Project Settings → Environment Variables as "Encrypted" values.
- [ ] Scope secrets to appropriate environment (Preview/Production) as needed.
- [ ] Confirm `vercel.json` mappings (e.g., `@firebase_project_id`) match the secret names in Vercel.
- [ ] Ensure build and runtime Node version in Vercel matches `engines` in `package.json` or local dev environment.
- [ ] Create a Preview deployment and confirm `node scripts/validate-env.js` passes in that preview (via temporary script or by running smoke tests against the preview URL).

Notes
- Avoid committing any .env files with real secrets. Use `.env.local` only for local dev and keep it out of VCS.
- When setting `FIREBASE_SERVICE_ACCOUNT_JSON`, prefer storing the JSON content as an encrypted env var named `FIREBASE_SERVICE_ACCOUNT_JSON`.
