import { adminDb } from '../../../firebase/firebaseAdmin'
import { createPaystackTransaction } from '../../../lib/payments'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    userId,
    email,
    category,
    service,
    packageName,
    amount,
    description,
    files,
    reference,
    callbackUrl
  } = req.body || {}

  if (!userId || !email || !service || !packageName || !amount || !reference || !callbackUrl) {
    return res.status(400).json({ error: 'Missing required payment or order information.' })
  }

  // Check if Paystack is configured
  const paystackKey = process.env.PAYSTACK_SECRET_KEY
  if (!paystackKey) {
    return res.status(503).json({ 
      error: 'Payment processing is temporarily unavailable', 
      details: 'Paystack is not configured. Please contact support.' 
    })
  }

  try {
    const orderRef = await adminDb.collection('orders').add({
      userId,
      email,
      category,
      service,
      packageName,
      amount,
      description,
      files: files || [],
      paymentReference: reference,
      status: 'payment_pending',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const transaction = await createPaystackTransaction({
      email,
      amount,
      reference,
      callbackUrl,
      metadata: {
        orderId: orderRef.id,
        service,
        packageName,
        category,
        userId
      }
    })

    return res.status(200).json({
      authorization_url: transaction.authorization_url,
      reference: transaction.reference,
      orderId: orderRef.id
    })
  } catch (error) {
    console.error('Payment initialization error:', error)
    return res.status(500).json({ error: error.message || 'Unable to initialize payment.' })
  }
}
