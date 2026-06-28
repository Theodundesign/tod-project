# Firebase Production Validation

Date: 2026-06-24

Objective: validate Firebase authentication, Firestore, and Storage behavior in production/staging preview.

Local verification performed:
- Ran `node scripts/validate-env.js` and `node scripts/env-audit.js` — client `NEXT_PUBLIC_FIREBASE_*` variables are missing in the local runtime. `firebaseAdmin` module can initialize using application default credentials in this environment, but an explicit `FIREBASE_SERVICE_ACCOUNT_JSON` was not provided.

Required production tests (run in a Vercel preview with secrets configured or against a secure staging project):
- Authentication
  - Signup (email/password) — create test user and confirm email verification if used.
  - Login (email/password) — login and assert session cookie / id token present.
  - Social login (Google) if enabled — confirm redirect and user creation flow.

- Firestore
  - Create document(s) via client and server API routes.
  - Read documents as authenticated user and as admin user.
  - Update, delete operations and verify security rules enforce least privilege.

- Storage
  - Upload file through the client upload flow (Dashboard -> Upload).
  - Confirm storage rules allow the operation for the authenticated user.
  - Download/preview file and then delete file; ensure deletion is authorized and succeeds.

- User profile updates
  - Update display name and avatar; assert Firestore profile doc and auth profile reflect changes.

- Permissions
  - Dashboard (user) permissions: ensure normal users cannot access admin-only routes.
  - Admin permissions: using admin service account (server-side) confirm admin APIs succeed (role changes, user listing).

How to run emulator-style integration tests (recommended before production):
1. Start Firebase emulator:
```bash
firebase emulators:start --only auth,firestore,storage
```
2. Run integration tests or `smoke.js` pointing at emulator endpoints.

Notes:
- Because `FIREBASE_SERVICE_ACCOUNT_JSON` is not present in this environment and `NEXT_PUBLIC_FIREBASE_*` keys are not set, full production validation cannot be executed from this workspace. Provision secrets in Vercel or run the emulator locally with proper configuration to complete validation.

Acceptance: mark tests PASS only after successful run in a secured preview where all operations above complete without rule violations.
