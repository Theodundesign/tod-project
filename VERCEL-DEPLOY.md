Vercel Deployment Guide

1. Create a GitHub repo and push this project.
2. In Vercel, import the repo and set environment variables from `.env.local.example`.
3. Set build command: `npm run build` and output directory: (Next.js handles it).
4. Add Firebase service account secrets for serverless functions if you use Admin SDK.
5. Enable automatic deployments on push to `main`.

Security tips:
- Never commit `.env.local` or service account JSON.
- Use Vercel Environment variables for secrets.
