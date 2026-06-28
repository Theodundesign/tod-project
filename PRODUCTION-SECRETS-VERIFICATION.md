# Production Secrets Verification

Date: 2026-06-24

Scope: Verify presence of required production secrets in the runtime/preview environment and recommend verification steps. This is a read-only audit — no secrets copied or modified.

Required variables and current verification status (from local audit)
- `NEXT_PUBLIC_FIREBASE_API_KEY`: MISSING
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: MISSING
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: MAPPED in `vercel.json` to `@firebase_project_id` (verify secret exists in Vercel)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: MISSING
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: MISSING (optional)
- `NEXT_PUBLIC_FIREBASE_APP_ID`: MISSING
- `FIREBASE_SERVICE_ACCOUNT_JSON`: MISSING
- `UPSTASH_REDIS_REST_URL`: MISSING
- `UPSTASH_REDIS_REST_TOKEN`: MISSING
- `PAYSTACK_PUBLIC_KEY`: MISSING
- `PAYSTACK_SECRET_KEY`: MISSING
- `NEXT_PUBLIC_SITE_URL`: MISSING

Notes and verification steps to run in a Vercel preview (must be executed where secrets exist):
1. In Vercel dashboard, confirm each variable is present under Project → Settings → Environment Variables (Preview & Production as required).
2. From a preview deployment, run:
```bash
node scripts/validate-env.js
node scripts/env-audit.js
```
Both scripts will report missing variables; all must be present for full production validation.
3. For `FIREBASE_SERVICE_ACCOUNT_JSON` verify the JSON is the service account for the intended Firebase project and that it contains `client_email` and `private_key` fields.
4. For Upstash, validate connection by calling a simple test endpoint or by inspecting server logs after a preview deploy that attempts to call rate limiter code.
5. For Paystack, add both keys and perform a test payment in sandbox mode and inspect webhook logs.

Conclusion: Secrets are NOT configured in the current runtime. Provision them in Vercel and re-run the verification scripts above in the preview deployment.
