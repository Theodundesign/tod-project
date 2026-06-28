# Preview Deployment Report

Date: 2026-06-24

## Summary

This report documents the status of preview deployment validation for the project. A full Vercel preview deployment has not been executed from this workspace because required production secrets are not available in the current environment.

## Environment verification

The following environment variables were checked locally and are currently missing:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`

The local audit command `node scripts/env-audit.js` confirmed these values are missing in the current shell. Therefore a preview deployment cannot be fully validated from this workspace.

## Preview build

A Vercel preview build was not performed here because the required production/preview environment variables are not present. Once the secrets are provisioned, deploy a preview and verify the build logs complete without warnings or runtime env failures.

## Checklist for preview validation

- [ ] Deploy Vercel Preview
- [ ] Run `node scripts/validate-env.js`
- [ ] Run `node scripts/env-audit.js`
- [ ] Verify authentication flows
- [ ] Verify registration, login, logout, password reset
- [ ] Verify profile updates and avatar upload
- [ ] Verify Firestore read/write operations
- [ ] Verify storage uploads
- [ ] Verify contact form submission
- [ ] Verify training registration
- [ ] Verify dashboard navigation
- [ ] Verify Paystack sandbox end-to-end flows
- [ ] Verify Upstash rate limiting and retry headers
- [ ] Run Lighthouse on preview URL

## Current status

- Preview deployment validation: PENDING
- Production readiness after preview tests: NOT APPROVED until all checks pass

***

For details on each domain, see the companion reports:
- `FIREBASE-INTEGRATION-REPORT.md`
- `PAYSTACK-SANDBOX-REPORT.md`
- `UPSTASH-VALIDATION-REPORT.md`
- `LIGHTHOUSE-PREVIEW-REPORT.md`
