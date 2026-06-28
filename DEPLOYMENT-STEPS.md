# Deployment Steps — Production Services Setup

This document consolidates step-by-step setup for Firebase, Paystack, Upstash, and Vercel environment provisioning so the project can be connected to production services.

High-level flow
1. Create/confirm production Firebase project and resources (Auth, Firestore, Storage).
2. Create a Firebase service account and store its JSON as `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel.
3. Provision Upstash Redis and add its REST URL/token to Vercel.
4. Create Paystack sandbox/production keys and add them to Vercel; configure webhook URL to Vercel endpoint.
5. Add all `NEXT_PUBLIC_*` and server env vars to Vercel and perform preview deploy.
6. Run integration smoke tests, Lighthouse, and finalize readiness.

See companion guides for details:
- `FIREBASE-CONNECTION-GUIDE.md`
- `PAYSTACK-CONNECTION-GUIDE.md`
- `UPSTASH-CONNECTION-GUIDE.md`
