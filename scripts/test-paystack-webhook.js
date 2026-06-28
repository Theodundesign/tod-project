const crypto = require('crypto')
const assert = require('assert')
const { verifyPaystackSignature, validatePaystackPayload } = require('../lib/paystackWebhook')

function makePayload(overrides = {}){
  return {
    event: {
      id: 'evt_test_123',
      type: 'charge.success',
    },
    data: {
      reference: 'ref_test_123',
      status: 'success',
    },
    ...overrides,
  }
}

function makeSignature(body, secret){
  return crypto.createHmac('sha512', secret).update(body).digest('hex')
}

function run(){
  const secret = 'test_secret'
  process.env.PAYSTACK_SECRET_KEY = secret

  const payload = makePayload()
  const rawBody = Buffer.from(JSON.stringify(payload), 'utf8')
  const signature = makeSignature(rawBody, secret)

  assert(verifyPaystackSignature(rawBody, signature), 'should verify valid Paystack signature')
  assert(!verifyPaystackSignature(rawBody, 'invalidsignature123'), 'should reject an invalid signature')

  const validated = validatePaystackPayload(payload)
  assert(validated.ok, 'valid payload should pass validation')
  assert.strictEqual(validated.eventId, 'evt_test_123')
  assert.strictEqual(validated.eventType, 'charge.success')
  assert.strictEqual(validated.reference, 'ref_test_123')
  assert.strictEqual(validated.status, 'success')

  const malformed = validatePaystackPayload({})
  assert(!malformed.ok, 'malformed payload should fail validation')

  const duplicateStore = new Set()
  function processEvent(eventId){
    if(duplicateStore.has(eventId)) return { duplicate:true }
    duplicateStore.add(eventId)
    return { duplicate:false }
  }

  const first = processEvent(validated.eventId)
  assert(!first.duplicate, 'first event should not be duplicate')
  const second = processEvent(validated.eventId)
  assert(second.duplicate, 'second event with same id should be duplicate')

  console.log('✅ Paystack webhook tests passed')
}

try{
  run()
}catch(error){
  console.error('❌ Paystack webhook tests failed')
  console.error(error)
  process.exit(1)
}
