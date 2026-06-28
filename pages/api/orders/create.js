import { adminDb } from '../../../firebase/firebaseAdmin'
import { checkRateLimit } from '../../../lib/rateLimiter'
import { createOrderDocument, validateOrderData } from '../../../lib/orderHelpers'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { getClientIP } = await import('../../../lib/rateLimiter/helpers')
  const ip = getClientIP(req)
  
  // Rate limiting
  const rl = await checkRateLimit({
    keyPrefix: 'api',
    ip,
    route: '/api/orders/create',
    preset: 'apiLimiter'
  })
  
  if (!rl.ok) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  try {
    const {
      userId,
      userEmail,
      service,
      category,
      packageName,
      amount,
      description,
      files = [],
      customerName = '',
      customerEmail = userEmail,
      customerPhone = '',
      deliveryDays = 5,
      revisions = 'Limited'
    } = req.body

    // Validation
    const validation = validateOrderData({
      userId,
      userEmail,
      service,
      category,
      amount,
      description
    })

    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors
      })
    }

    // Create order document
    const orderDocument = createOrderDocument({
      userId,
      userEmail,
      service,
      category,
      packageName,
      amount,
      description,
      files,
      customerName,
      customerEmail,
      customerPhone,
      deliveryDays,
      revisions
    })

    // Save to Firestore
    const docRef = await adminDb.collection('orders').add(orderDocument)

    // Return success with order ID
    return res.status(201).json({
      success: true,
      orderId: docRef.id,
      orderReference: orderDocument.reference,
      invoiceNumber: orderDocument.invoiceNumber,
      message: 'Order created successfully'
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return res.status(500).json({
      error: 'Failed to create order',
      message: error.message
    })
  }
}
