import admin from 'firebase-admin'
import fs from 'fs'

if (!admin.apps.length) {
  // Prefer service account from env as JSON string or file path in production
  const key = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT_JSON || ''
  let cred = null
  if (key) {
    try {
      cred = key.trim().startsWith('{')
        ? JSON.parse(key)
        : JSON.parse(fs.readFileSync(key, 'utf8'))
    } catch (e) {
      throw new Error(
        `Invalid Firebase service account credential provided in FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_JSON: ${e.message}`
      )
    }
  }

  if (cred) {
    admin.initializeApp({ credential: admin.credential.cert(cred), storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET })
  } else {
    // fallback to application default
    admin.initializeApp()
  }
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
export const adminStorage = admin.storage()
export default admin
