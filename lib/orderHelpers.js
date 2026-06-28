// Order Helpers - Firestore Order Schema and Utilities
// These helpers manage order creation, updates, and status transitions

const ORDER_STATUSES = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  ON_HOLD: 'On Hold'
}

const PAYMENT_STATUSES = {
  PENDING: 'Pending',
  PAID: 'Paid',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
  PARTIAL: 'Partial'
}

// Generate unique invoice number
export const generateInvoiceNumber = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `INV-${timestamp}-${random}`.substring(0, 20)
}

// Generate unique order reference
export const generateOrderReference = () => {
  const timestamp = Date.now()
  return `ORD-${timestamp}`
}

// Create order document structure
export const createOrderDocument = (orderData) => {
  const now = new Date()
  const invoiceNumber = generateInvoiceNumber()
  const orderReference = generateOrderReference()

  return {
    // User info
    userId: orderData.userId,
    userEmail: orderData.userEmail,
    
    // Order details
    reference: orderReference,
    service: orderData.service || '',
    category: orderData.category || '',
    packageName: orderData.packageName || 'Standard',
    
    // Brief and requirements
    description: orderData.description || '',
    requirements: orderData.description || '',
    
    // Files
    files: orderData.files || [],
    fileUrls: orderData.fileUrls || [],
    
    // Customer info
    customerName: orderData.customerName || '',
    customerEmail: orderData.customerEmail || orderData.userEmail,
    customerPhone: orderData.customerPhone || '',
    
    // Payment info
    amount: orderData.amount || 0,
    currency: 'NGN',
    paymentStatus: PAYMENT_STATUSES.PENDING,
    paymentMethod: orderData.paymentMethod || 'Paystack',
    paymentReference: orderData.paymentReference || '',
    
    // Invoice
    invoiceNumber: invoiceNumber,
    invoiceDate: now,
    dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    
    // Delivery
    deliveryDays: orderData.deliveryDays || 5,
    estimatedDelivery: new Date(now.getTime() + (orderData.deliveryDays || 5) * 24 * 60 * 60 * 1000),
    
    // Revisions
    revisions: orderData.revisions || 'Limited',
    revisionsUsed: 0,
    
    // Status
    status: ORDER_STATUSES.PENDING,
    statusHistory: [
      {
        status: ORDER_STATUSES.PENDING,
        timestamp: now,
        note: 'Order created'
      }
    ],
    
    // Timestamps
    createdAt: now,
    updatedAt: now,
    startedAt: null,
    completedAt: null,
    
    // Additional metadata
    tags: [],
    notes: '',
    assignedTo: null,
    priority: 'Normal'
  }
}

// Update order status with history tracking
export const updateOrderStatus = (currentOrder, newStatus, note = '') => {
  const now = new Date()
  const statusHistory = currentOrder.statusHistory || []
  
  statusHistory.push({
    status: newStatus,
    timestamp: now,
    note: note
  })
  
  const updates = {
    status: newStatus,
    statusHistory,
    updatedAt: now
  }
  
  // Set specific timestamps for key statuses
  if (newStatus === ORDER_STATUSES.PROCESSING && !currentOrder.startedAt) {
    updates.startedAt = now
  }
  
  if (newStatus === ORDER_STATUSES.COMPLETED && !currentOrder.completedAt) {
    updates.completedAt = now
  }
  
  return updates
}

// Update payment status
export const updatePaymentStatus = (currentOrder, newPaymentStatus, paymentReference = '') => {
  const now = new Date()
  
  const updates = {
    paymentStatus: newPaymentStatus,
    updatedAt: now
  }
  
  if (paymentReference) {
    updates.paymentReference = paymentReference
  }
  
  // When payment is confirmed, move order to processing if still pending
  if (newPaymentStatus === PAYMENT_STATUSES.PAID && currentOrder.status === ORDER_STATUSES.PENDING) {
    updates.status = ORDER_STATUSES.PROCESSING
    updates.statusHistory = [
      ...(currentOrder.statusHistory || []),
      {
        status: ORDER_STATUSES.PROCESSING,
        timestamp: now,
        note: 'Payment confirmed'
      }
    ]
  }
  
  return updates
}

// Check if order can be cancelled
export const canCancelOrder = (order) => {
  return ![ORDER_STATUSES.COMPLETED, ORDER_STATUSES.CANCELLED].includes(order.status)
}

// Calculate order progress (0-100%)
export const calculateOrderProgress = (order) => {
  const { status } = order
  const progressMap = {
    [ORDER_STATUSES.PENDING]: 10,
    [ORDER_STATUSES.PROCESSING]: 25,
    [ORDER_STATUSES.IN_PROGRESS]: 75,
    [ORDER_STATUSES.COMPLETED]: 100,
    [ORDER_STATUSES.CANCELLED]: 0,
    [ORDER_STATUSES.ON_HOLD]: 50
  }
  
  return progressMap[status] || 0
}

// Get status color for UI
export const getStatusColor = (status) => {
  const colorMap = {
    [ORDER_STATUSES.PENDING]: '#fbbf24', // amber
    [ORDER_STATUSES.PROCESSING]: '#38bdf8', // sky
    [ORDER_STATUSES.IN_PROGRESS]: '#818cf8', // indigo
    [ORDER_STATUSES.COMPLETED]: '#34d399', // emerald
    [ORDER_STATUSES.CANCELLED]: '#f87171', // red
    [ORDER_STATUSES.ON_HOLD]: '#a78bfa' // violet
  }
  
  return colorMap[status] || '#9ca3af'
}

// Get payment status color
export const getPaymentStatusColor = (status) => {
  const colorMap = {
    [PAYMENT_STATUSES.PENDING]: '#fbbf24',
    [PAYMENT_STATUSES.PAID]: '#34d399',
    [PAYMENT_STATUSES.FAILED]: '#f87171',
    [PAYMENT_STATUSES.REFUNDED]: '#38bdf8',
    [PAYMENT_STATUSES.PARTIAL]: '#818cf8'
  }
  
  return colorMap[status] || '#9ca3af'
}

// Format order for display
export const formatOrderForDisplay = (order) => {
  return {
    ...order,
    displayAmount: `₦${Number(order.amount || 0).toLocaleString()}`,
    displayProgress: calculateOrderProgress(order),
    statusColor: getStatusColor(order.status),
    paymentStatusColor: getPaymentStatusColor(order.paymentStatus),
    estimatedDeliveryDate: order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'TBD',
    createdDate: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown'
  }
}

// Validate order data before creation
export const validateOrderData = (orderData) => {
  const errors = []
  
  if (!orderData.userId) errors.push('User ID is required')
  if (!orderData.userEmail) errors.push('User email is required')
  if (!orderData.service) errors.push('Service is required')
  if (!orderData.category) errors.push('Category is required')
  if (!orderData.amount || orderData.amount <= 0) errors.push('Valid amount is required')
  if (!orderData.description || orderData.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Export status constants for use in components
export { ORDER_STATUSES, PAYMENT_STATUSES }
