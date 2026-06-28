**Bundle Optimization Report — PHASE 6.3 (initial baseline & plan)**

- **Workspace baseline (existing .next artifacts)**
  - `.next/static` size: 1.4 MB
  - `.next/server` size: 1.7 MB
  - Estimated homepage first-load JS (sum of top client chunks + `_app` + page chunk): ~1.32 MB

- **Largest client-side chunks observed**
  - 484bcb1e-4e275dea9815e72f.js — 363 KB
  - 7112840a-0e16b7204c9392f9.js — 213 KB
  - 870-46ee08ccdc378ee4.js — 154 KB
  - `framework` chunk — 141 KB
  - other large vendor-like chunks: 128 KB, 115 KB, 114 KB, 91 KB

- **Likely large dependencies**
  - `firebase` (client bundle impact)
  - `framer-motion` (optionalDependency)
  - `puppeteer` (server-only, large) — ensure not shipped to client
  - `firebase-admin` (server-only) — ensure not imported by client code

- **Optimization summary (planned actions)**
  1. Audit `_app.jsx` for heavy imports and move non-critical libraries out of top-level imports (e.g., analytics, large UI lib imports) to dynamic imports.
  2. Dynamic import and lazy-load heavy dashboard/admin modules (charts, analytics, uploads, settings pages/components).
  3. Replace or defer `framer-motion` usage on initial-critical UI or make it optional/dynamically loaded.
  4. Confirm server-only packages (`puppeteer`, `firebase-admin`) are not included in client bundles.
  5. Run `npm install` (if you approve) and perform a fresh `next build` with analytics tooling (e.g., `@next/bundle-analyzer`) to produce before/after bundle graphs.
  6. Remove duplicate packages and consolidate shared code.

- **Estimates & Lighthouse impact**
  - Current homepage first-load JS: ~1.3 MB — very likely to regress Lighthouse LCP and Total Blocking Time.
  - Target after optimizations: Homepage <100 KB, Dashboard <200 KB, Admin <220 KB — these are aggressive; likely require splitting vendor bundles and deferring most runtime code.
  - Estimated Lighthouse improvement after split+lazy-load: First Contentful Paint and LCP could improve substantially; estimated 20–40 point improvement depending on network conditions.

- **Next steps I can execute now (confirm to proceed)**
  - Run `npm install` and update lockfile if needed, then run a clean `next build` with temporary env vars to allow full build and produce an accurate before-bundle analysis.
  - Add `@next/bundle-analyzer` as a dev tool temporarily to produce visual bundle graphs, run build, and propose precise code-splitting changes.

Generated on 2026-06-24.
