Phase 6 — Go Live
==================

This document collects the exact, actionable steps to go from the current pre-production state to a live production deployment on Vercel with Firebase (Auth, Firestore, Storage) and Upstash Redis.

Prerequisites
- Firebase CLI installed and logged in: `npm i -g firebase-tools` and `firebase login`
- Vercel CLI installed and logged in (optional for automation): `npm i -g vercel` and `vercel login`
- Upstash account (create DB via Upstash console)
- DNS access to your custom domain

Step 1 — Create Firebase Production Project
1. In the Firebase Console, create a new project (e.g. `tod-prod`).
2. Add a Web App to the project and copy the client config values.
3. (Optional) Enable Google/Email auth providers you need under Authentication → Sign-in method.

Step 2 — Configure Authentication
1. In Firebase Console → Authentication → Sign-in method: enable Email/Password and any OAuth providers (Google, etc.).
2. Configure authorized domains (add your Vercel domain and local testing host).

Step 3 — Configure Firestore & Storage Rules
1. Update and publish secure rules for Firestore and Storage. Example minimal rules (review & adapt):

Firestore (start with least privilege, then relax rules per collection):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for shared collections
    match /public/{doc=**} {
      allow read: if true;
    }

    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Example: messages collection writable only by authenticated users
    match /messages/{msg} {
      allow create: if request.auth != null;
      allow read: if true;
    }
  }
}
```

Storage rules (restrict to authenticated users and their own folder):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Files under user/{uid} are only writable/readable by the owner
    match /user/{uid}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Public assets
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

2. Use the Firebase Console or the `firebase deploy --only firestore:rules,storage` command to publish rules.

Step 4 — Create Upstash Redis Database
1. Create a new Redis instance in the Upstash console.
2. Copy the REST URL and REST token.
3. Optionally, create a restricted token specifically for the rate-limiter endpoints.

Step 5 — Add Vercel Environment Variables
Required env vars used by this project (fill with production values):

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- PAYSTACK_SECRET_KEY (if used)

You can set these via the Vercel Console (Project → Settings → Environment Variables) or the Vercel CLI. Example CLI usage:

```bash
# add an environment variable for production
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
# repeat for other vars
```

Tip: add values to `preview` and `production` environments as appropriate.

Step 6 — Deploy to Vercel
Option A — Git-based automatic deploy:
1. Push `main` to your Git remote connected to Vercel.
2. Vercel will build and deploy; monitor the build logs in the Vercel Dashboard.

Option B — Vercel CLI manual deploy:

```bash
vercel --prod
```

Step 7 — Connect Custom Domain
1. In Vercel Console → Domains, add your custom domain (e.g. example.com).
2. Vercel will show the DNS records to add. In your DNS provider, add the required A/ALIAS or CNAME records.
3. Wait for propagation and confirm the domain is assigned to your project in Vercel.

Step 8 — Test Production Site
- Smoke test the main flows: home, auth (register/login), upload/download (if using storage), payments webhook (if applicable), and admin-only pages.
- Verify `robots.txt`/sitemap and that SEO meta tags render correctly.
- Run an automated smoke test (local or CI) e.g. Puppeteer script or existing `smoke.js` after ensuring it runs in Node environment.

Step 9 — Launch and Post-launch
- Announce launch, monitor analytics and logs for errors.
- Configure alerts for error budget (Sentry, Logflare, or Firebase Crashlytics if used).
- Plan a rollback strategy (revert Git commit on Vercel or restore previous deployment from Vercel Dashboard).

Additional Notes & Helpers
- Local environment validation: `scripts/validate-env.js` already enforces the presence of critical NEXT_PUBLIC_FIREBASE_* variables before `next dev` or `next build`.
- If you want me to attempt Vercel CLI automation, provide a Vercel token (or run `vercel login` locally and grant me access) — I can run `vercel env add` and `vercel --prod` from the project root.
- If you want me to create a sample production `.env.local` file, I can add `.env.local.example.prod` with variable placeholders (do not check secrets into git).

Rollback Checklist
- If a deployment causes issues: in Vercel Dashboard → Deployments, restore the previous deployment or revert the commit and re-deploy.

Security reminder
- Never commit real secret keys to the repository. Use Vercel Environment Variables and Upstash tokens stored securely.

If you want, I can:
- A: Create a production `.env.local.example` file in the repo and add a short script to import env vars from a secure file.
- B: Attempt automated Vercel env var setup and deployment if you provide a Vercel token.
- C: Walk through DNS setup interactively when you add the domain.

---
