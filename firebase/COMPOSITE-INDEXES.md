# Firestore Composite Indexes Configuration

This document lists all required composite indexes for the Odun Design application.

## Required Composite Indexes

Firestore requires composite indexes for queries that filter AND order by multiple fields. The following indexes must be created in Firebase Console or via CLI:

### 1. Orders Collection
- **Collection**: `orders`
- **Fields**: 
  - `userId` (Ascending)
  - `createdAt` (Descending)
- **Query**: Dashboard orders page loads user's orders sorted by newest first
- **Status**: ⚠️ Must be created in Firebase Console

### 2. Payments Collection
- **Collection**: `payments`
- **Fields**:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- **Query**: Dashboard payments page loads user's payments sorted by newest first
- **Status**: ⚠️ Must be created in Firebase Console

### 3. Projects Collection
- **Collection**: `projects`
- **Fields**:
  - `userId` (Ascending)
  - `deadline` (Ascending)
- **Query**: Dashboard projects page loads user's projects sorted by deadline
- **Status**: ⚠️ Must be created in Firebase Console

### 4. Invoices Collection
- **Collection**: `invoices`
- **Fields**:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- **Query**: Dashboard invoices page loads user's invoices sorted by newest first
- **Status**: ⚠️ Must be created in Firebase Console

### 5. Notifications Collection
- **Collection**: `notifications`
- **Fields**:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- **Query**: Dashboard notifications page loads user's notifications sorted by newest first
- **Status**: ⚠️ Must be created in Firebase Console

### 6. Conversations Collection
- **Collection**: `conversations`
- **Fields**:
  - `participants` (Contains)
  - `updatedAt` (Descending)
- **Query**: Dashboard messages page loads conversations the user is part of, sorted by most recently updated
- **Status**: ⚠️ Must be created in Firebase Console

## How to Create Composite Indexes

### Option 1: Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `tod-project-65a46`
3. Navigate to **Firestore Database** > **Indexes**
4. Click **Create Index**
5. For each index above:
   - Enter the Collection ID
   - Add the fields in the order specified with their sort order
   - Click **Create Index**
6. Wait for the index to build (usually takes a few minutes)

### Option 2: Using Firebase CLI
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy indexes defined in firestore.indexes.json
firebase deploy --only firestore:indexes
```

### Option 3: Using gsutil (Cloud Storage)
If you have Google Cloud SDK installed:
```bash
gcloud firestore indexes create \
  --collection=orders \
  --field-config=userId=ASCENDING,createdAt=DESCENDING \
  --database=(default)
```

## Verification

After creating the indexes:

1. Navigate to Firebase Console > Firestore > Indexes
2. Verify all 6 indexes show as **"Enabled"**
3. Run the application and test:
   - Load Dashboard > Orders page
   - Load Dashboard > Payments page
   - Load Dashboard > Projects page
   - Load Dashboard > Invoices page
   - Load Dashboard > Notifications page
   - Load Dashboard > Messages page
4. Check browser console for any Firestore errors

## Auto-Index Creation

Firestore may automatically create composite indexes when you first run queries. Check the browser console for error messages like:

```
Cloud Firestore requires a composite index for this query:
```

If you see this, simply click the link in the error to automatically create the index.

## Additional Resources

- [Firestore Composite Indexes Documentation](https://firebase.google.com/docs/firestore/query-data/index-overview)
- [Firestore Index Best Practices](https://firebase.google.com/docs/firestore/query-data/index-best-practices)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli/setup)
