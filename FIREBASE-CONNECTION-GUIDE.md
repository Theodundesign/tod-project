# Firebase Connection Guide (Production)

Follow these steps to prepare and connect Firebase production resources to the project.

1) Create or select a Firebase project
- Open the Firebase Console: https://console.firebase.google.com
- Create a new project or select the existing production project.

2) Enable Authentication
- In Console → Authentication → Sign-in method:
  - Enable Email/Password
  - Enable Google (if using social login) and add authorized domains (include `NEXT_PUBLIC_SITE_URL`).

3) Create Firestore database
- Console → Firestore → Create database → choose Production mode (or test, then migrate rules)
- Select region closest to your users.

4) Configure Firestore indexes
- Review queries used by the app (check `pages/dashboard`, `pages/admin`, any compound queries).
- In Console → Firestore → Indexes, add any composite indexes required by queries.

5) Set up Firestore security rules
- Edit `firebase/firestore.rules` in repo as the source of truth.
- Test rules locally with the emulator (see step 8).

6) Enable Storage
- Console → Storage → Create bucket (match `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` value).
- Configure storage rules: edit `firebase/storage.rules` in repo and test via emulator.

7) Create a service account for Admin SDK
- Console → Project Settings → Service Accounts → Generate new private key.
- Save the JSON; do NOT commit it to Git.

8) Test locally with Firebase emulator (recommended)
- Install Firebase CLI: `npm i -g firebase-tools`
- Start emulators (auth, firestore, storage):
```bash
firebase emulators:start --only auth,firestore,storage
```
- Run integration smoke tests (`smoke.js`) against emulator endpoints or run manual flows.

9) Provision `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel
- In Vercel project settings, add environment variable `FIREBASE_SERVICE_ACCOUNT_JSON` (paste JSON content) for Preview and Production as needed.

10) Add client config env vars to Vercel
- Add these `NEXT_PUBLIC_*` env vars (Preview & Production):
  - `NEXT_PUBLIC_FIREBASE_API_KEY` (from project settings)
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (if using FCM)
  - `NEXT_PUBLIC_FIREBASE_APP_ID`

11) Validate in preview deployment
- Once Vercel has the secrets, deploy a Preview and run:
```bash
node scripts/validate-env.js
node scripts/env-audit.js
```
- Test key user flows: signup/login, uploads, dashboard reads/writes.

Notes and troubleshooting
- If `firebaseAdmin` fails to initialize in the serverless environment, ensure `FIREBASE_SERVICE_ACCOUNT_JSON` is the correct JSON (check `client_email`, `private_key` fields).
- If storage access fails, confirm `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` matches the created bucket name.
