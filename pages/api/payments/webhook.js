import { adminDb } from '../../../firebase/firebaseAdmin'
import { checkRateLimit } from '../../../lib/rateLimiter'
import { verifyPaystackSignature, validatePaystackPayload } from '../../../lib/paystackWebhook'
import { processPaystackPayment } from '../../../lib/paymentProcessor'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function readRawBody(req){
  const chunks = []
  for await (const chunk of req){
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { getClientIP, logRateLimitViolation, trackSuspiciousActivity } = await import('../../../lib/rateLimiter/helpers')
  const ip = getClientIP(req)
  const rl = await checkRateLimit({ keyPrefix: 'webhook', ip, route: '/api/payments/webhook', preset: 'webhookLimiter' })
  if(!rl.ok){
    try{ logRateLimitViolation(ip, { route: '/api/payments/webhook', rl }) }catch(e){ console.debug('logRateLimitViolation error', e) }
    try{ await trackSuspiciousActivity(ip, { route: '/api/payments/webhook', reason: 'rate_limit' }) }catch(e){ console.debug('trackSuspiciousActivity error', e) }
    return res.status(429).setHeader('Retry-After', String(rl.retryAfter || 10)).json({ success:false, error:'Too many requests' })
  }

  const rawBody = await readRawBody(req)
  const signature = String(req.headers['x-paystack-signature'] || req.headers['X-Paystack-Signature'] || '')

  try{
    if(!verifyPaystackSignature(rawBody, signature)){
      console.warn('Invalid Paystack webhook signature', { sourceIp: ip })
      return res.status(401).json({ error:'Invalid signature' })
    }
  }catch(e){
    console.error('Paystack signature verification error', e)
    return res.status(500).json({ error:'Webhook verification misconfigured' })
  }

  let payload
  try{
    payload = JSON.parse(rawBody.toString('utf8'))
  }catch(e){
    console.warn('Malformed Paystack webhook payload', { sourceIp: ip, error:e.message })
    return res.status(400).json({ error:'Malformed JSON payload' })
  }

  const validation = validatePaystackPayload(payload)
  if(!validation.ok){
    console.warn('Paystack webhook validation failed', { sourceIp: ip, error: validation.error })
    return res.status(400).json({ error: validation.error })
  }

  const { eventId, eventType, reference, status } = validation
  const webhookRef = adminDb.collection('paystack_webhooks').doc(eventId)
  const existing = await webhookRef.get()
  if(existing.exists){
    await adminDb.collection('paystack_webhook_duplicates').add({
      eventId,
      eventType,
      reference,
      status,
      sourceIp: ip,
      receivedAt: new Date(),
      duplicate: true,
    })
    console.info('Duplicate Paystack webhook ignored', { eventId, eventType, reference, sourceIp: ip, status })
    return res.status(200).json({ ok:true, duplicate:true })
  }

  try{
    await webhookRef.set({
      eventId,
      eventType,
      reference,
      status,
      sourceIp: ip,
      receivedAt: new Date(),
      processedAt: new Date(),
      audit: {
        eventType,
        reference,
        status,
        sourceIp: ip,
        timestamp: new Date(),
      },
      payload,
    })

    const paymentData = payload.data || {}
    const metadata = paymentData.metadata || {}
    await processPaystackPayment({
      reference,
      status,
      paymentData,
      metadata
    })

    await adminDb.collection('paystack_webhook_audit').add({
      eventId,
      eventType,
      reference,
      status,
      sourceIp: ip,
      timestamp: new Date(),
    })
    console.info('Paystack webhook processed', { eventId, eventType, reference, sourceIp: ip, status })
    return res.status(200).json({ ok:true })
  }catch(e){
    console.error('Paystack webhook processing error', e)
    return res.status(500).json({ error:'Webhook processing failed' })
  }
}
