// Simple environment audit helper (read-only).
const vars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
  'FIREBASE_SERVICE_ACCOUNT_JSON',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'PAYSTACK_PUBLIC_KEY',
  'PAYSTACK_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL'
]

console.log('Environment variable presence:')
vars.forEach(k => console.log(`- ${k}:`, process.env[k] ? 'present' : 'missing'))

// Attempt to initialize server-side modules where possible (will fail when secrets missing)
console.log('\nAttempting server-side initializations (read-only)')
try {
  require('../firebase/firebaseAdmin')
  console.log('- Firebase Admin: OK')
} catch (e) {
  console.error('- Firebase Admin: ERR', e && e.message ? e.message : String(e))
}

try {
  // This module conditionally initializes Upstash when envs are present; requiring it should be safe
  require('../lib/rateLimiter/upstash')
  console.log('- Upstash module: loaded')
} catch (e) {
  console.error('- Upstash module: ERR', e && e.message ? e.message : String(e))
}

console.log('\nPaystack config:')
console.log('- PAYSTACK_PUBLIC_KEY present:', !!process.env.PAYSTACK_PUBLIC_KEY)
console.log('- PAYSTACK_SECRET_KEY present:', !!process.env.PAYSTACK_SECRET_KEY)

console.log('\nDone')
