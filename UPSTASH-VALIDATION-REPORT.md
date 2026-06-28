# Upstash Validation Report

Date: 2026-06-24

## Summary

This report covers Upstash Redis validation for production rate limiting. The Upstash module loads successfully locally, but full validation requires provisioned secrets and a preview deployment.

## Verified locally

- `node scripts/env-audit.js` confirmed `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are missing.
- `lib/rateLimiter/upstash.js` imports successfully when required, but no live Redis connection was tested.

## Required Upstash validation tests

- Rate limiting triggers correctly on repeated API requests.
- Retry-After headers are returned when limits are exceeded.
- Abuse logging is recorded for blocked requests.

## How to validate

1. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Vercel.
2. Deploy a Preview build.
3. Trigger repeated requests to a rate-limited route such as `/api/contact/send` or `/api/payments/webhook`.
4. Confirm response code 429 and `Retry-After` header when the limit is exceeded.
5. Confirm abuse logging appears in logs or any configured storage for suspicious activity.

## Current status

- Upstash validation: PENDING

***

Update this report with live results after preview deployment and a working Upstash config.
