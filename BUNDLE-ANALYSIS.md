**Bundle Analysis — Generated 2026-06-24**

Summary (post-initial-optimizations):

- **Homepage first-load JS:** ~268 KB (sum of page/_app related chunks)
- **Dashboard first-load JS:** ~289 KB (route `/dashboard` bundle)
- **Admin first-load JS:** ~288 KB (route `/admin` bundle)

Largest dependencies observed:

- `@firebase/*` and `firebase` packages (firestore, storage, auth) — large client footprint
- `react-dom` and `react` (framework chunk)
- `next` runtime code (main chunk)
- `@swc/helpers` and supporting runtime

Largest routes:

- `/dashboard` and `/dashboard/files` — largest per-route JS (~289 KB and ~293 KB respectively)
- `/admin` and `/admin/users`

Largest shared chunks:

- `framework-fae63...` (~141 KB)
- `main-9e6b89...` (~115 KB)
- Large firebase-hosting chunks: `484bcb...`, `711284...`, `524-f64b...` (100–360 KB range previously)

Duplicate dependencies:

- Multiple `@firebase` modules are present across large chunks. These are repeated across dashboard/admin/auth routes.

Heavy libraries detected:

- Firebase SDK (firestore, storage, auth)
- `react-dom` (necessary)
- Potentially `framer-motion` (optionalDependency) — not currently in top lists but should be audited before use

Dynamic import opportunities:

- Defer Firebase initialization and SDK usage where possible (auth flows, uploads, storage, firestore reads used only on authenticated pages) — implemented lazily for `AuthContext`, `pages/auth.jsx`, and `lib/storage.js`.
- Dynamically import dashboard-only UI components: charts, analytics widgets, large upload components.
- Dynamic import admin-only modules and heavy form components.
- Move non-critical global CSS from `_app` into per-page imports (already started by deferring some styles).

Notes:

- I updated `pages/_app.jsx` to lazy-load `AuthContext`, `ToastContext`, and `Header` dynamically to reduce immediate `_app` size.
- I refactored `AuthContext`, `pages/auth.jsx`, and `lib/storage.js` to dynamically import `firebase` modules to defer Firebase SDK from initial bundle.

Next: implement further dynamic imports for upload/widgets and charts, then rebuild to measure "after" sizes and produce `FINAL-BUNDLE-OPTIMIZATION-REPORT.md`.
