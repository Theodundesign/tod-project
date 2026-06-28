# Firebase Production Setup Checklist

Purpose: Steps to validate Firebase production configuration for this project.

Checklist
- Authentication
  - [ ] Ensure Email/Password provider enabled
  - [ ] Enable Google (and other) OAuth providers used by the app
  - [ ] Configure authorized domains (include site URL)

- Firestore
  - [ ] Create production Firestore instance (if separate from dev)
  - [ ] Review and add composite indexes required by queries
  - [ ] Verify billing plan supports required read/write throughput
  - [ ] Export and store index definitions in repo if maintained (`firestore.indexes.json`)

- Firestore Rules
  - [ ] Confirm `firebase/firestore.rules` enforces least-privilege
  - [ ] Run rules unit tests and emulator-based integration tests

- Storage
  - [ ] Ensure Storage bucket exists and matches `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] Validate storage rules in `firebase/storage.rules`
  - [ ] Test uploads and downloads in emulator and staging

- Service Account / Admin SDK
  - [ ] Create a Firebase service account with necessary roles (Firestore Admin, Storage Admin, Auth Admin as appropriate)
  - [ ] Store JSON in secure secret manager (Vercel env var `FIREBASE_SERVICE_ACCOUNT_JSON`)
  - [ ] Validate `firebaseAdmin` initialization using that secret in a preview deploy

- Operational
  - [ ] Set up backups/export policies for Firestore (scheduled exports)
  - [ ] Enable Firebase alerts/quotas if available

Verification steps
1. Run Firebase emulator and execute representative user flows (auth/signup/login, document create/read/update/delete, file upload/download) against rules.
2. Use `firebase emulators:exec` to run integration smoke tests from `smoke.js` against the emulator.
3. After provisioning secrets in Vercel, create a preview deploy and validate server-side admin endpoints (webhooks, admin APIs) succeed.
