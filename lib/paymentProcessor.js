import { adminDb } from '../firebase/firebaseAdmin'
import { ORDER_STATUSES, PAYMENT_STATUSES, updatePaymentStatus } from './orderHelpers'

async function findOrderDocument({ reference, orderId }) {
  if (orderId) {
    const orderDoc = await adminDb.collection('orders').doc(orderId).get()
    if (orderDoc.exists) return orderDoc
  }

  const orderQuery = await adminDb.collection('orders').where('paymentReference', '==', reference).limit(1).get()
  if (!orderQuery.empty) return orderQuery.docs[0]
  return null
}

async function createOrUpdatePaymentDoc(paymentRecord) {
  const query = await adminDb.collection('payments').where('reference', '==', paymentRecord.reference).limit(1).get()
  if (!query.empty) {
    await query.docs[0].ref.update({
      ...paymentRecord,
      updatedAt: new Date()
    })
    return query.docs[0]
  }
  const docRef = await adminDb.collection('payments').add(paymentRecord)
  return await docRef.get()
}

async function createOrUpdateInvoiceDoc(invoiceRecord) {
  const query = await adminDb.collection('invoices').where('paymentReference', '==', invoiceRecord.paymentReference).limit(1).get()
  if (!query.empty) {
    await query.docs[0].ref.update({
      ...invoiceRecord,
      updatedAt: new Date()
    })
    return query.docs[0]
  }
  const docRef = await adminDb.collection('invoices').add(invoiceRecord)
  return await docRef.get()
}

async function createOrUpdateNotification(notificationRecord) {
  const query = await adminDb.collection('notifications')
    .where('reference', '==', notificationRecord.reference)
    .where('type', '==', notificationRecord.type)
    .limit(1)
    .get()

  if (!query.empty) {
    await query.docs[0].ref.update({
      ...notificationRecord,
      updatedAt: new Date()
    })
    return query.docs[0]
  }

  const docRef = await adminDb.collection('notifications').add(notificationRecord)
  return await docRef.get()
}

export async function processPaystackPayment({ reference, status, paymentData = {}, metadata = {} }) {
  const paymentStatus = status === 'success'
    ? PAYMENT_STATUSES.PAID
    : status === 'failed'
      ? PAYMENT_STATUSES.FAILED
      : PAYMENT_STATUSES.PENDING

  const orderDoc = await findOrderDocument({ reference, orderId: metadata.orderId })
  const orderData = orderDoc?.exists ? orderDoc.data() : null
  const userId = metadata.userId || orderData?.userId || null
  const orderId = metadata.orderId || (orderDoc?.exists ? orderDoc.id : '')
  const orderReference = orderData?.reference || metadata.orderReference || ''
  const amount = paymentData.amount ? Number(paymentData.amount) / 100 : Number(orderData?.amount || 0)

  if (orderDoc?.exists) {
    const updates = updatePaymentStatus(orderData, paymentStatus, reference)
    if (paymentStatus === PAYMENT_STATUSES.PAID) {
      updates.paidAt = new Date()
      updates.status = ORDER_STATUSES.PAID
      updates.statusHistory = [
        ...(orderData.statusHistory || []),
        {
          status: ORDER_STATUSES.PAID,
          timestamp: new Date(),
          note: 'Payment completed successfully'
        }
      ]
    }
    await orderDoc.ref.update({
      ...updates,
      paymentData,
      paymentSource: 'Paystack',
      updatedAt: new Date()
    })
  }

  const paymentRecord = {
    userId,
    orderId,
    orderReference,
    amount,
    currency: paymentData.currency || 'NGN',
    reference,
    status: paymentStatus,
    paymentMethod: 'Paystack',
    paymentData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await createOrUpdatePaymentDoc(paymentRecord)

  if (paymentStatus === PAYMENT_STATUSES.PAID && orderDoc?.exists && userId) {
    const invoiceRecord = {
      userId,
      orderId,
      orderReference,
      paymentReference: reference,
      reference: orderData?.invoiceNumber || `INV-${Date.now()}`,
      amount,
      currency: paymentData.currency || 'NGN',
      status: paymentStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await createOrUpdateInvoiceDoc(invoiceRecord)

    const notificationRecord = {
      userId,
      orderId,
      reference,
      type: 'payment_received',
      title: 'Payment received successfully.',
      message: `Your payment of ₦${amount.toLocaleString()} has been received for order ${orderReference || orderId}.`,
      category: 'Payments',
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await createOrUpdateNotification(notificationRecord)
  }

  return {
    userId,
    orderId,
    paymentStatus,
    orderReference,
    amount
  }
}
