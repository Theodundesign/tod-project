const fs = require('fs')
const path = require('path')

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex <= 0) return
    const key = trimmed.slice(0, eqIndex).trim()
    const value = trimmed.slice(eqIndex + 1).trim()
    if (!process.env[key] && value !== '') {
      process.env[key] = value
    }
  })
}

const isProduction = process.env.NODE_ENV === 'production'

const required = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
  'NEXT_PUBLIC_SITE_URL'
]

const serverRequired = [
  'PAYSTACK_SECRET_KEY',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN'
]

const requiredEither = [
  ['FIREBASE_SERVICE_ACCOUNT_JSON', 'FIREBASE_SERVICE_ACCOUNT']
]

const missing = required.filter((k) => !process.env[k])
const missingServer = isProduction ? serverRequired.filter((k) => !process.env[k]) : []
const missingEither = isProduction ? requiredEither.filter((pair) => !pair.some((k) => process.env[k])) : []

if (missing.length || missingServer.length || missingEither.length) {
  console.error('\nMissing required environment variables:')
  if (missing.length) {
    console.error(' - ' + missing.join('\n - '))
  }
  if (missingServer.length) {
    console.error(' - ' + missingServer.join('\n - '))
  }
  missingEither.forEach((pair) => {
    console.error(` - One of ${pair.join(' or ')} must be set.`)
  })
  if (!isProduction) {
    console.error('\nNote: server-only secrets are only validated when NODE_ENV=production.')
  }
  console.error('\nCopy `.env.local.example` to `.env.local` and fill these values, then restart the dev server.')
  process.exitCode = 1
} else {
  console.log(`Environment validation passed — required environment variables are present${isProduction ? ' for production' : ''}.`)
}
