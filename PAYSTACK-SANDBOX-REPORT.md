# Paystack Sandbox Report

Date: 2026-06-24

## Summary

This report documents Paystack sandbox validation requirements. The Paystack webhook endpoint has been updated for production-grade security, but sandbox validation requires a deployed preview URL and provisioned Paystack keys.

## Automated local coverage

- Paystack webhook signature verification logic was unit-tested with `node scripts/test-paystack-webhook.js`.
- This verifies valid signatures, invalid signatures, malformed payloads, and duplicate detection.

## Required sandbox tests

### Payment flow
- Successful payment
- Failed payment

### Webhooks
- Webhook delivery to `/api/payments/webhook`
- Signature verification passes for valid requests
- Duplicate webhook rejection

## Validation steps

1. Add `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` to Vercel.
2. Deploy a Preview build.
3. Configure Paystack sandbox webhook URL to point to the preview endpoint.
4. Perform test payments and verify expected app behavior.
5. Send duplicate webhook events and confirm duplicates are ignored.

## Current status

- Paystack sandbox validation: PENDING

***

Update this report with actual test outcomes once a preview deployment is available.
