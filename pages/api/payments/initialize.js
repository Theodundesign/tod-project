import { adminDb } from '../../../firebase/firebaseAdmin'
import { createPaystackTransaction } from '../../../lib/payments'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    userId,
    email,
    orderId,
    category,
    service,
    packageName,
    amount,
    description,
    files,
    reference,
    callbackUrl
  } = req.body || {}

  if (!userId || !email || !orderId || !service || !packageName || !amount || !reference || !callbackUrl) {
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
    const orderDoc = await adminDb.collection('orders').doc(orderId).get()
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found for payment initialization.' })
    }

    const orderData = orderDoc.data() || {}
    await orderDoc.ref.update({
      paymentReference: reference,
      paymentMethod: 'Paystack',
      paymentStatus: 'Pending',
      updatedAt: new Date(),
      orderInitializedAt: new Date()
    })

    await adminDb.collection('payments').add({
      userId,
      orderId,
      orderReference: orderData.reference || '',
      service,
      packageName,
      category,
      amount,
      currency: 'NGN',
      description: description || orderData.description || '',
      files: files || orderData.files || [],
      reference,
      paymentMethod: 'Paystack',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      transactionDate: new Date()
    })

    const transaction = await createPaystackTransaction({
      email,
      amount,
      reference,
      callbackUrl,
      metadata: {
        orderId,
        service,
        packageName,
        category,
        userId
      }
    })

    return res.status(200).json({
      authorization_url: transaction.authorization_url,
      reference: transaction.reference,
      orderId
    })
  } catch (error) {
    console.error('Payment initialization error:', error)
    return res.status(500).json({ error: error.message || 'Unable to initialize payment.' })
  }
}
