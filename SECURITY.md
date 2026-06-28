Security & Production Checklist

1) Environment
- Ensure `FIREBASE_SERVICE_ACCOUNT` (JSON or path) is set in Vercel secrets.
- Use `NEXT_PUBLIC_` only for non-sensitive Firebase client config.

2) Firebase Rules
- Review `firebase/firestore.rules` and `firebase/storage.rules` before deploying.
- Limit read/write to authenticated users and admin roles.

3) Admin SDK
- Protect API routes with token verification using `adminAuth.verifyIdToken(token)`.
- Use `setCustomUserClaims` for role management.

4) Rate limiting
- Add rate-limiting at edge (Vercel Edge functions) or API middleware to prevent abuse.

5) Upload validation
- Validate file mime-types and sizes server-side where possible.
- Avoid storing user-supplied filenames as-is; use generated keys.

6) Webhooks
- Verify webhooks (Paystack) using signature header before trusting payload.

7) Logging & Monitoring
- Integrate Sentry or Datadog for production error monitoring.

8) Secrets
- Never commit service account JSON or secrets; use Vercel environment variables.
