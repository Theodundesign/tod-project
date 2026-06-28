import { adminAuth, adminDb } from '../../../firebase/firebaseAdmin'
import { checkRateLimit } from '../../../lib/rateLimiter'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { uid, role } = req.body || {}
  if(!uid || !role) return res.status(400).json({error:'uid and role required'})

  try{
    // Rate-limit admin role changes to prevent abuse
    const { getClientIP, logRateLimitViolation, trackSuspiciousActivity } = await import('../../../lib/rateLimiter/helpers')
    const ip = getClientIP(req)
    const rl = await checkRateLimit({ keyPrefix: 'admin-setrole', ip, route: '/api/admin/setRole', preset: 'strictLimiter' })
    if(!rl.ok){
      try{ logRateLimitViolation(ip, { route: '/api/admin/setRole', rl }) }catch(e){ console.debug('logRateLimitViolation error', e) }
      try{ await trackSuspiciousActivity(ip, { route: '/api/admin/setRole', reason: 'rate_limit' }) }catch(e){ console.debug('trackSuspiciousActivity error', e) }
      return res.status(429).setHeader('Retry-After', String(rl.retryAfter || 60)).json({ success:false, error: 'Too many requests' })
    }

    // set custom claim
    await adminAuth.setCustomUserClaims(uid, { role })
    // update Firestore user doc
    await adminDb.collection('users').doc(uid).set({ role }, { merge: true })
    return res.json({ok:true})
  }catch(e){
    console.error(e)
    return res.status(500).json({error:e.message})
  }
}
