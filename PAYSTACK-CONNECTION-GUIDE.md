# Paystack Connection Guide (Production)

This guide covers creating Paystack keys, configuring webhooks, and testing payments.

1) Create Paystack account
- Sign up/log in at https://paystack.com and create a production account (or use the Sandbox for testing).

2) Get API keys
- Dashboard → Settings → API Keys
  - Copy `Public Key` (client) and `Secret Key` (server).
  - For sandbox testing use test keys from your Paystack sandbox account.

3) Add keys to Vercel
- Add `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` as encrypted environment variables for Preview and Production.

4) Configure webhook URL
- In Paystack Dashboard → Developers → Webhooks:
  - Add webhook URL: `https://<your-preview-or-prod-domain>/api/payments/webhook`
  - Set events you want to receive (e.g., `charge.success`, `charge.failed`).

5) Implement and verify webhook signature verification
- The project webhook handler reads `x-paystack-signature` header. Implement server-side verification using `PAYSTACK_SECRET_KEY`:
  - Compute HMAC-SHA512 of `raw body` using `PAYSTACK_SECRET_KEY` and compare to header.
  - Ensure you compute HMAC on the raw request body (not the parsed JSON).
- Note: current webhook handler contains a `TODO` placeholder — you must implement signature verification before processing webhook events in production.

6) Test payments (Sandbox)
- Use Paystack test checkout with `PAYSTACK_PUBLIC_KEY` and simulate `charge.success` / `charge.failed` events.
- Trigger a webhook from Paystack sandbox and verify your preview endpoint receives and validates the signature.

7) Ensure idempotency and duplicate webhook protection
- Store a processed transaction idempotency key in Firestore when processing webhook events and skip re-processing duplicates.

8) Validate logs and monitoring
- Confirm webhook handling logs (server logs) and that notifications/alerts are configured for failures.

Troubleshooting
- If webhook verification fails, log the raw request body and the computed HMAC to debug mismatches (do not log secrets in production).
