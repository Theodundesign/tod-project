import { adminDb } from '../../../firebase/firebaseAdmin'
import { log } from '../../../lib/logger'
import { checkRateLimit } from '../../../lib/rateLimiter'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()

  const { getClientIP, logRateLimitViolation, trackSuspiciousActivity } = await import('../../../lib/rateLimiter/helpers')
  const ip = getClientIP(req)
  // stricter limits for contact form
  const rl = await checkRateLimit({ keyPrefix: 'contact', ip, route: '/api/contact/send', preset: 'contactLimiter' })
  if(!rl.ok){
    try{ logRateLimitViolation(ip, { route: '/api/contact/send', rl }) }catch(e){ console.debug('logRateLimitViolation error', e) }
    try{ await trackSuspiciousActivity(ip, { route: '/api/contact/send', reason: 'rate_limit' }) }catch(e){ console.debug('trackSuspiciousActivity error', e) }
    return res.status(429).setHeader('Retry-After', String(rl.retryAfter || 60)).json({ success:false, error: 'Too many requests' })
  }

  const { name, email, message, honeypot } = req.body || {}
  // simple spam/honeypot protection
  if(honeypot) return res.status(400).json({ error: 'Spam detected' })
  if(!name || !email || !message) return res.status(400).json({error:'name,email,message required'})

  try{
    const doc = await adminDb.collection('messages').add({ name, email, message, createdAt: new Date(), status:'new', ip })
    // TODO: trigger email / whatsapp autoresponder via serverless job
    log('contact saved', doc.id)
    return res.json({ok:true})
  }catch(e){
    log('contact error', e.message)
    return res.status(500).json({error:e.message})
  }
}
