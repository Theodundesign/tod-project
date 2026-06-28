# Paystack Production Validation

Date: 2026-06-24

Scope: verify payments and webhook handling in production/staging preview.

Local findings:
- `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` are missing in local runtime and not provisioned in Vercel (per `PRODUCTION-SECRETS-VERIFICATION.md`). No live Paystack validation was executed.

Required verification steps (execute in a preview environment with Paystack sandbox credentials):
1. Verify webhook signature verification
   - Ensure server endpoint inspects `x-paystack-signature` and verifies it against `PAYSTACK_SECRET_KEY` before processing events.
   - Send a test webhook from Paystack sandbox to preview endpoint and assert verification passes.
2. Successful payments
   - Perform a test checkout (sandbox) and confirm payment success flow (client redirect, server verification, user account credit or record stored in Firestore).
3. Failed payments
   - Simulate a failed payment and confirm the app surfaces appropriate error messages and records failure logs.
4. Duplicate webhook protection
   - Ensure webhook handler is idempotent: check for an existing transaction record before double-processing.
5. Payment logs
   - Confirm server logs capture payment events and that admin dashboard shows payment history.

How to test locally with ngrok (optional)
1. Run local server or preview deployment.
2. Expose endpoint with `ngrok http 3000` and add the ngrok URL as webhook in Paystack sandbox.
3. Trigger sandbox webhooks and observe logs.

Conclusion: PAYSTACK validation is NOT completed — provision keys and run the steps above in a preview deployment.
