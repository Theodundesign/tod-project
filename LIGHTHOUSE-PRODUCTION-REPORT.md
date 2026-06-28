# Lighthouse Production Report

Date: 2026-06-24

Note: I cannot run Lighthouse against a production URL from this environment. Below are the commands and expected acceptance criteria to run in a preview/prod environment.

Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

How to run (headless)
```bash
# Desktop
npx lighthouse https://<preview-url> --preset=desktop --output html --output-path=./lighthouse-desktop.html

# Mobile
npx lighthouse https://<preview-url> --preset=mobile --output html --output-path=./lighthouse-mobile.html
```

Recommendations to hit targets
- Ensure server-side rendering where appropriate and critical code-splitting (already implemented in PHASE 6.3).
- Optimize images and use Next.js Image Optimization.
- Defer non-critical scripts and ensure efficient caching headers.
- Minimize main-thread work and avoid large JavaScript execution on first load.

Expected deliverables after running:
- `lighthouse-desktop.html`
- `lighthouse-mobile.html`
- Summary scores and remediation items if any are below targets.
