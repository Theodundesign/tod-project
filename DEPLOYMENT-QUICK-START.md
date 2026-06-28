# 🚀 QUICK START: Deploy The Odun Design to Production

**Status**: ✅ Code is ready. Follow these steps to go live.

---

## Step 1: Firebase Setup (5 minutes)

### Create Composite Indexes

Option A: **Automatic (Recommended)**
1. Deploy code to production
2. Try accessing dashboard pages
3. Firestore will show error links with "Create Index" buttons
4. Click links to auto-create indexes

Option B: **Manual (Firebase Console)**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `tod-project-65a46`
3. Go to **Firestore Database** > **Indexes**
4. Click **Create Index** for each:

| Collection | Fields | Order |
|-----------|--------|-------|
| orders | userId + createdAt | ASC + DESC |
| payments | userId + createdAt | ASC + DESC |
| projects | userId + deadline | ASC + ASC |
| invoices | userId + createdAt | ASC + DESC |
| notifications | userId + createdAt | ASC + DESC |
| conversations | participants + updatedAt | - + DESC |

5. Wait for indexes to build (usually 2-3 minutes each)

### Apply CORS to Storage Bucket

```bash
# Install Google Cloud SDK (if not installed)
brew install google-cloud-sdk

# Authenticate
gcloud auth login

# Apply CORS config
gsutil cors set firebase/storage-cors.json gs://tod-project-65a46.firebasestorage.app

# Verify
gsutil cors get gs://tod-project-65a46.firebasestorage.app
```

Or via Firebase Console:
1. Go to **Storage** > **Settings**
2. Add CORS configuration from `firebase/storage-cors.json`

---

## Step 2: Environment Setup (2 minutes)

### Production Environment Variables

Set these in your hosting platform (Vercel, Cloud Run, etc.):

```env
# Firebase (from .env.local, these are public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCOm5biybvUffcu-9VVKhUnm7dCDgfMyeA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tod-project-65a46.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tod-project-65a46
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tod-project-65a46.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=158086788154
NEXT_PUBLIC_FIREBASE_APP_ID=1:158086788154:web:624e47470b36752262f103
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXZKYHG056

# Firebase Admin (KEEP SECRET)
FIREBASE_SERVICE_ACCOUNT_JSON={...service account JSON...}

# Third-party services
PAYSTACK_SECRET_KEY=your_paystack_production_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Site configuration
NEXT_PUBLIC_SITE_URL=https://theodundesign.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Step 3: Deploy to Production (2-5 minutes)

### Using Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Or push to git
git push origin main
```

### Using Other Platforms

**Railway**:
```bash
railway login
railway deploy
```

**Cloud Run**:
```bash
gcloud run deploy tod-project \
  --source . \
  --platform managed \
  --region us-central1
```

**Docker**:
```bash
docker build -t tod-design .
docker push gcr.io/your-project/tod-design
```

---

## Step 4: Smoke Tests (3-5 minutes)

After deployment, verify everything works:

### 1. Frontend Tests
- [ ] Homepage loads: https://theodundesign.com
- [ ] Login page works: https://theodundesign.com/login
- [ ] Register page works: https://theodundesign.com/register
- [ ] Order page loads: https://theodundesign.com/order

### 2. Authentication Tests
- [ ] Email/password registration
- [ ] Email/password login
- [ ] Google OAuth works
- [ ] Session persists on reload
- [ ] Logout works

### 3. Dashboard Tests (after login)
- [ ] Dashboard loads: `/dashboard`
- [ ] Orders page loads: `/dashboard/orders`
- [ ] Payments page loads: `/dashboard/payments`
- [ ] Messages page loads: `/dashboard/messages`
- [ ] Settings page loads: `/dashboard/settings`

### 4. API Tests
```bash
# Test contact form API
curl -X POST https://theodundesign.com/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'

# Expected: {"ok": true} or {"ok": false, "error": "..."}
```

### 5. Firestore Tests
- [ ] Try creating order from dashboard
- [ ] Try uploading file from dashboard
- [ ] Check Firestore in Firebase Console for new documents

---

## Step 5: Monitoring (Ongoing)

### Real-Time Monitoring

Set up in production:

1. **Error Tracking**
   - Monitor logs in hosting platform
   - Check Firebase Console > Firestore > Logs
   - Watch Storage > Logs

2. **Performance Metrics**
   - Monitor Core Web Vitals via Google Analytics
   - Check Firebase > Performance
   - Monitor API response times

3. **User Activity**
   - Google Analytics dashboard
   - Firestore document counts
   - Storage usage

### Daily Checklist (First Week)

```
Day 1
├─ [ ] Check error logs: No critical errors?
├─ [ ] Verify database: Firestore working?
├─ [ ] Test one complete order flow
└─ [ ] Monitor performance: Page speeds good?

Day 2-7
├─ [ ] Monitor user registrations
├─ [ ] Track order creation
├─ [ ] Check payment processing
├─ [ ] Monitor error rates
└─ [ ] Gather user feedback
```

---

## Rollback Plan

If something goes wrong:

### Immediate (< 5 minutes)
```bash
# Revert to previous deployment on Vercel
vercel promote [previous-deployment-id]

# Or redeploy previous git commit
git revert [bad-commit]
git push origin main
```

### Firebase Rules Rollback
- Rules are version-controlled
- Restore previous version in Firebase Console > Firestore > Rules > History

### Storage CORS Rollback
```bash
# Restore previous CORS config
gsutil cors set old-cors-config.json gs://tod-project-65a46.firebasestorage.app
```

---

## Support & Troubleshooting

### Common Issues

**Composite Index Error in Dashboard**
- Solution: Check if index is created in Firestore Console
- Status: Check Firebase Console > Firestore > Indexes

**File Upload Failing**
- Solution: Verify Storage CORS is applied
- Command: `gsutil cors get gs://tod-project-65a46.firebasestorage.app`

**Payment Processing Error**
- Solution: Verify Paystack keys in environment
- Check: `/api/payments/initialize` response

**Database Queries Slow**
- Solution: Check composite indexes are built
- Status: Firebase Console > Firestore > Indexes

---

## Completion Checklist

```
PRE-DEPLOYMENT
├─ [ ] Code ready (npm run build passes)
├─ [ ] All tests pass (npm run lint passes)
├─ [ ] Environment variables set
└─ [ ] Database rules reviewed

DEPLOYMENT
├─ [ ] Composite indexes created
├─ [ ] CORS configuration applied
├─ [ ] Code deployed to production
├─ [ ] DNS pointing to production
└─ [ ] SSL certificate active

POST-DEPLOYMENT
├─ [ ] Smoke tests passed
├─ [ ] Error monitoring set up
├─ [ ] Performance monitoring active
├─ [ ] Backup verified
└─ [ ] Rollback plan documented
```

---

## 🎉 You're Live!

Once all steps are complete:

✅ **The Odun Design is live in production**

### Next Steps
1. Share launch announcement
2. Monitor user feedback
3. Plan Phase 2 features
4. Schedule optimization review

### Support Contacts
- Error Logs: Your hosting platform
- Firebase: Firebase Console
- Paystack: Paystack Dashboard
- Analytics: Google Analytics

---

**Deployment Time**: ~15-30 minutes  
**Difficulty**: Easy (step-by-step)  
**Risk**: Very Low (all code tested)  

**Ready to go live?** Start with Step 1! 🚀

