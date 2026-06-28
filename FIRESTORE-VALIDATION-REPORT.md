# Firestore Validation Report

Date: 24 June 2026
Status: PARTIAL PASS — Firestore integration paths are implemented and build-validated; live data verification pending real Firebase credentials.

## Scope
- Firestore `users/{uid}` document creation
- Required profile fields
- Duplicate profile prevention
- Profile updates from settings
- Firestore integration with auth state

## Validation steps completed
- `npm run lint`
- `set -a && source .env.local && node scripts/validate-env.js`
- `set -a && source .env.local && npm run build`
- Code review of Firestore logic in `context/AuthContext.jsx`

## Findings
- Signup flow uses `setDoc(doc(db, 'users', u.uid), {...})` with `uid`, `fullName`, `email`, `phone`, `role: 'client'`, and timestamp fields.
- Google Sign-In checks for existing `users/{uid}` document with `getDoc()` and writes only when the document does not exist.
- Profile updates call `setDoc(..., { merge: true })`, which correctly preserves existing fields while updating changed values.
- Required fields are present in the new-user payload shape:
  - `uid`
  - `fullName`
  - `email`
  - `role`
  - `createdAt`
  - `updatedAt`
- The `AuthContext` profile listener uses `onSnapshot()` to keep `profile` state synchronized with the `users/{uid}` document.

## Issues / caveats
- Actual Firestore read/write verification was not executed because `.env.local` contains placeholder credentials rather than a live Firebase project connection.
- The logic for duplicate profile prevention is correct, but its effectiveness should be confirmed with a real Google Sign-In path and an existing Firestore document.

## Recommended next step
- Run a live Firebase project validation using actual `NEXT_PUBLIC_FIREBASE_*` values to confirm Firestore document creation, update propagation, and duplicate protection behavior.
