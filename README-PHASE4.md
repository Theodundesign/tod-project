PHASE 4 — Odun Design Platform

This scaffold converts the static site into a Next.js + Firebase starter.

Quick start (after installing Node):

1. Install deps

```bash
npm install
```

2. Add environment variables (see `.env.local.example`).

3. Run dev server

```bash
npm run dev
```

What's included:
- Next.js scaffold (pages + components)
- `firebase/firebaseClient.js` - client init (uses env vars)
 
Environment setup:
- Copy `.env.local.example` to `.env.local` and fill the `NEXT_PUBLIC_FIREBASE_*` values before running the dev server.
- Restart the dev server after updating `.env.local`.
- `pages/auth.jsx` - authentication UI (email/password + Google)
- `pages/dashboard/index.jsx` - protected client dashboard sample
- `pages/admin/index.jsx` - protected admin panel sample
- `firebase` rules examples and deployment notes

Next steps (I can implement):
- Full UI polish for auth modal and dashboards
- File upload flow + Storage security rules
- Paystack integration and invoice flow
- CI/CD via Vercel (env config and preview domains)
