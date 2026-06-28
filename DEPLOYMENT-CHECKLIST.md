# Deployment Checklist

Follow these checks before deploying to production.

## Auth
- [ ] Sign up flow (email/password) works
- [ ] Sign in flow works
- [ ] Role/permissions set via admin API (admin accounts)
- [ ] Protected routes return 401/302 when unauthenticated

## Dashboard
- [ ] `/dashboard` loads for authenticated users
- [ ] Widgets lazy-load and render correctly
- [ ] Navigation links inside dashboard work

## Uploads
- [ ] Profile image upload saves to `users/{uid}/profile/...`
- [ ] Firestore document `users/{uid}` updated with `profileImage` and meta
- [ ] Storage rules enforced in production

## Contact
- [ ] Contact form submits without JS errors
- [ ] Contact CTAs navigate to `#contact` or open the contact modal

## Training
- [ ] `/training` route redirects to training page
- [ ] Training page content loads

## Mobile
- [ ] Mobile drawer opens and closes (ESC/backdrop)
- [ ] No horizontal scrolling on common devices

## SEO
- [ ] `robots.txt` present and correct
- [ ] `sitemap.xml` present and up-to-date
- [ ] OpenGraph & Twitter meta present on key pages

## Performance
- [ ] Major images lazy-loaded
- [ ] Heavy backdrop blurs reduced
- [ ] Prefer `prefers-reduced-motion` respected

## Run locally
- Build: `npm run build`
- Lint: `npm run lint`

