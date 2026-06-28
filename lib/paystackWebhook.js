const crypto = require('crypto')

function verifyPaystackSignature(rawBody, signature){
  if(!signature) return false
  const secret = process.env.PAYSTACK_SECRET_KEY
  if(!secret) throw new Error('PAYSTACK_SECRET_KEY is not configured')
  const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex')
  let received
  try{
    received = Buffer.from(signature, 'hex')
  }catch(e){
    return false
  }
  const expectedBuf = Buffer.from(expected, 'hex')
  if(received.length !== expectedBuf.length) return false
  return crypto.timingSafeEqual(received, expectedBuf)
}

function validatePaystackPayload(payload){
  if(!payload || typeof payload !== 'object'){
    return { ok:false, error:'Payload must be a JSON object' }
  }
  const event = payload.event
  if(!event || typeof event !== 'object'){
    return { ok:false, error:'Missing payload.event' }
  }
  if(!event.type || typeof event.type !== 'string'){
    return { ok:false, error:'Missing payload.event.type' }
  }
  const eventId = event.id || payload.id
  if(!eventId || typeof eventId !== 'string'){
    return { ok:false, error:'Missing payload.event.id' }
  }
  const data = payload.data
  if(!data || typeof data !== 'object'){
    return { ok:false, error:'Missing payload.data' }
  }
  const reference = data.reference || data.transaction?.reference || null
  const status = data.status || data.transaction?.status || null
  return { ok:true, eventId, eventType:event.type, data, reference, status }
}

module.exports = {
  verifyPaystackSignature,
  validatePaystackPayload,
}
