# Vercel Deployment Audit

Date: 2026-06-24

Checks performed locally and recommended production checks.

Local checks
- Build output: `.next` directory exists in workspace (previous analyzed production build completed). Verify build artifacts are present in CI preview logs.
- `vercel.json` present and contains a `build.env` mapping for `NEXT_PUBLIC_FIREBASE_PROJECT_ID`.

Recommended verification in Vercel preview/production
1. Build output
   - Trigger a preview deployment and inspect build logs for warnings and errors.
   - Confirm `ANALYZE` or dev-only flags are not enabled in production builds.
2. Middleware
   - Confirm `middleware.js` handles routes correctly and doesn't expose sensitive info in headers.
3. API routes
   - Test API routes: `/api/contact/send`, `/api/payments/webhook`, `/api/admin/setRole` in preview; confirm expected HTTP status codes.
4. Edge functions
   - If using edge runtime, confirm functions deployed and respond with expected headers.
5. Environment mappings
   - Confirm all required env vars are set for Preview and Production; run `node scripts/validate-env.js` in preview.

How to verify by commands (after preview deploy):
```bash
# Use Vercel CLI to inspect deployments
vercel ls --prod
vercel inspect <deployment-url>
# Or curl critical endpoints (replace <preview-url>)
curl -I https://<preview-url>/api/payments/webhook
curl -I https://<preview-url>/api/admin/setRole
```

Conclusion: Local build exists and prior bundle analysis completed; full deployment audit requires a Vercel preview with secrets configured to validate runtime behavior.
