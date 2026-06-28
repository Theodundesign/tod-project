# Upstash Redis Connection Guide

This guide explains how to provision Upstash and configure the project to use it for production rate limiting.

1) Create Upstash account
- Sign up at https://upstash.com and create a Redis database.

2) Obtain REST URL and Token
- In Upstash console, copy the `REST URL` and `REST TOKEN` for the database.

3) Add to Vercel
- Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` as encrypted env vars in Vercel (Preview & Production).

4) Validate connection
- Deploy a preview and trigger routes that use rate limiter (e.g., `/api/contact/send` or `/api/payments/webhook`); monitor logs for Upstash connection success.

5) Fallback
- If Upstash is not configured, the code uses an in-memory fallback bucket. This is fine for local dev but not for multi-instance production.

6) Optional: rotate token policy
- Use Upstash token rotation if supported; update Vercel env vars accordingly during token rotation window.
