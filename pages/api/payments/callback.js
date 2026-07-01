import { verifyPaystackTransaction } from '../../../lib/payments'
import { processPaystackPayment } from '../../../lib/paymentProcessor'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const reference = String(req.query.reference || req.query.trxref || req.query.txref || '')
  if (!reference) {
    return res.status(400).json({ error: 'Missing payment reference.' })
  }

  try {
    const transaction = await verifyPaystackTransaction(reference)
    const status = transaction.status || transaction.gateway_response || ''
    await processPaystackPayment({
      reference,
      status,
      paymentData: transaction,
      metadata: transaction.metadata || {}
    })
  } catch (error) {
    console.error('Paystack callback verification error:', error)
  }

  res.writeHead(302, { Location: '/dashboard/payments' })
  res.end()
}
