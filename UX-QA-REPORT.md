# UX Final QA Report

Date: 2026-06-24

Manual UX checklist (verify in preview/prod):
- Logo visible on header: PASS/FAIL
- Login/Register visible for guests: PASS/FAIL
- Avatar after login: PASS/FAIL
- User menu: PASS/FAIL
- Notifications: PASS/FAIL
- Mobile menu (hamburger): PASS/FAIL
- CTA buttons visible and functional: PASS/FAIL
- Contact form: visible and sends data: PASS/FAIL
- WhatsApp links: open WhatsApp or fallback: PASS/FAIL
- Portfolio links: functional: PASS/FAIL
- Training links: functional: PASS/FAIL
- Dashboard routes: access and render as expected: PASS/FAIL

Automated checks available in repo:
- `smoke.js` and `resp_test.js` — use these scripts against a preview deployment to exercise common flows and capture results (`smoke-results.json`, `resp-results.json`).

How to run smoke tests against preview:
```bash
# replace <preview-url> with the preview deployment
NODE_ENV=production node smoke.js https://<preview-url>
node resp_test.js https://<preview-url>
```

Notes: I cannot perform these live UX checks from this environment because required production secrets and a preview deployment are not configured. Use the checklist above to validate on the preview deployment and capture PASS/FAIL per item.
