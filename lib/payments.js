export async function createPaystackTransaction({ email, amount, reference, callbackUrl, metadata }) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) throw new Error('PAYSTACK_SECRET_KEY is not configured.')
  if (!email) throw new Error('Email is required for payment initialization.')
  if (!amount || amount <= 0) throw new Error('Amount must be a positive number.')

  const payload = {
    email,
    amount: amount * 100,
    reference,
    callback_url: callbackUrl,
    metadata: metadata || {}
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction.')
  }

  return data.data
}
