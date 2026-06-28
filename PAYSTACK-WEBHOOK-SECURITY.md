# Paystack Webhook Security

Date: 2026-06-24

This document describes the production-grade Paystack webhook security measures implemented for the project.

## Implemented protections

1. Signature verification
   - The webhook endpoint now verifies `x-paystack-signature` using HMAC-SHA512 and `PAYSTACK_SECRET_KEY`.
   - Invalid or missing signatures are rejected with HTTP 401.

2. Raw body verification
   - `bodyParser` is disabled for the webhook route so the signature is computed over the raw request body.

3. Payload validation
   - The payload is parsed as JSON and validated for required fields:
     - `payload.event.id`
     - `payload.event.type`
     - `payload.data`
   - Malformed payloads return HTTP 400.

4. Idempotency protection
   - Processed Paystack event IDs are stored in Firestore collection `paystack_webhooks`.
   - Duplicate webhook events are detected using the event ID and ignored.
   - Duplicate attempts are logged to Firestore collection `paystack_webhook_duplicates`.

5. Audit logging
   - Processed webhooks are audited in Firestore collection `paystack_webhook_audit`.
   - Logged fields include:
     - `eventType`
     - `reference`
     - `status`
     - `sourceIp`
     - `timestamp`

## Important notes

- `PAYSTACK_SECRET_KEY` must be provisioned in Vercel as an encrypted env var.
- The webhook endpoint is `/api/payments/webhook`.
- Before production, verify the webhook uses the correct Paystack URL and that the Paystack dashboard is configured to send events to the deployed endpoint.

## Verification steps

1. Deploy the preview with `PAYSTACK_SECRET_KEY` configured.
2. Send a valid webhook payload from Paystack sandbox and confirm HTTP 200.
3. Send the same webhook twice and confirm the second attempt is ignored.
4. Send an invalid signature and confirm HTTP 401.
5. Send malformed JSON and confirm HTTP 400.

***

For automated validation, use `node scripts/test-paystack-webhook.js` and review the webhook implementation in `pages/api/payments/webhook.js`.
