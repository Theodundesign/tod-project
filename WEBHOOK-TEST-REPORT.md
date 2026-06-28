# Webhook Test Report

Date: 2026-06-24

## Automated test examples

Run:
```bash
node scripts/test-paystack-webhook.js
```

### Test coverage

- Valid webhook signature
- Invalid signature rejection
- Duplicate webhook detection
- Malformed payload rejection

### Expected results

- Valid webhook should pass signature verification and payload validation.
- Invalid signature should be rejected with HTTP 401 in production.
- Duplicate event IDs should be detected and ignored automatically.
- Malformed webhook payloads should be rejected with HTTP 400.

## Local test results

- `node scripts/test-paystack-webhook.js` executes signature and payload validation logic.
- This script verifies the same cryptographic algorithm used by the webhook endpoint.

## Production readiness

The webhook endpoint is ready for production once:
- `PAYSTACK_SECRET_KEY` is configured in Vercel
- Paystack sandbox is configured to send webhooks to `/api/payments/webhook`
- Duplicate event IDs are observed and ignored in Firestore
- Audit logs are created in Firestore collections `paystack_webhook_audit` and `paystack_webhook_duplicates`
