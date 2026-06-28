# Lighthouse Preview Report

Date: 2026-06-24

## Summary

Lighthouse audits could not be executed from this workspace because there is no active preview deployment URL available. The project does have a successful production build, but live audit metrics require a deployed preview URL.

## Target scores

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Run commands

From a preview deployment URL, run:

```bash
npx lighthouse https://<preview-url> --preset=desktop --output html --output-path=./lighthouse-preview-desktop.html
npx lighthouse https://<preview-url> --preset=mobile --output html --output-path=./lighthouse-preview-mobile.html
```

## Expected audit output

- `lighthouse-preview-desktop.html`
- `lighthouse-preview-mobile.html`
- Score summary in the HTML reports

## Notes

- The app already passed Next.js production build successfully.
- The preview audit should focus on the live deployed URL and verify that optimization changes are intact in the rendered site.
- If any score is below the target, document remediation and rerun.

## Current status

- Lighthouse preview audit: PENDING

***

Update this file with actual score results once the preview deployment is available.
