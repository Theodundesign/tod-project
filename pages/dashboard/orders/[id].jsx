import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../../components/ProtectedRoute'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import { getStatusColor, getPaymentStatusColor, calculateOrderProgress } from '../../../lib/orderHelpers'

const OrderDetailSkeleton = () => (
  <div style={{ display: 'grid', gap: '24px' }}>
    <div className="card" style={{ height: '120px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)', animation: 'loading-shimmer 1.5s infinite' }} />
    <div className="card" style={{ height: '200px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)', animation: 'loading-shimmer 1.5s infinite' }} />
  </div>
)

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelLoading, setCancelLoading] = useState(false)
  const [cancelError, setCancelError] = useState('')

  useEffect(() => {
    if (!user || !id) return
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const fb = await import('../../../firebase/firebaseClient')
        const { doc, getDoc } = await import('firebase/firestore')
        const orderRef = doc(fb.db, 'orders', id)
        const snapshot = await getDoc(orderRef)
        if (!active) return
        if (!snapshot.exists()) {
          setError('Order not found.')
          setOrder(null)
        } else {
          const orderData = snapshot.data()
          if (orderData.userId !== user.uid) {
            setError('You do not have permission to view this order.')
            setOrder(null)
          } else {
            setOrder({ id: snapshot.id, ...orderData })
            setError('')
          }
        }
      } catch (fetchError) {
        console.error(fetchError)
        if (active) setError('Unable to load order details. Please try again.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => { active = false }
  }, [user, id])

  const handleCancelOrder = async () => {
    if (!order) return
    setCancelLoading(true)
    setCancelError('')
    try {
      const fb = await import('../../../firebase/firebaseClient')
      const { doc, updateDoc } = await import('firebase/firestore')
      const orderRef = doc(fb.db, 'orders', order.id)
      const now = new Date()
      await updateDoc(orderRef, {
        status: 'Cancelled',
        statusHistory: [
          ...(order.statusHistory || []),
          {
            status: 'Cancelled',
            timestamp: now,
            note: 'Cancelled by customer'
          }
        ],
        updatedAt: now
      })
      setOrder(prev => prev ? { ...prev, status: 'Cancelled', updatedAt: now } : null)
    } catch (e) {
      console.error(e)
      setCancelError('Failed to cancel order. Please try again.')
    } finally {
      setCancelLoading(false)
    }
  }

  const handleRetry = () => {
    setError('')
    window.location.reload()
  }

  if (!id) return <ProtectedRoute><DashboardLayout><div className="empty-state">Loading…</div></DashboardLayout></ProtectedRoute>

  const progress = order ? calculateOrderProgress(order) : 0

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Order Details</h2>
          <p>Review order status, payment summary, and customer information.</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <Link legacyBehavior href="/dashboard/orders"><a className="btn btn-ghost">← Back to Orders</a></Link>
        </div>

        {loading && <OrderDetailSkeleton />}

        {error && (
          <div className="card" style={{ padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', color: '#f87171', fontWeight: 600 }}>Unable to load order</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{error}</p>
              </div>
              <button onClick={handleRetry} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>Retry</button>
            </div>
          </div>
        )}

        {!loading && !error && order && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Main Order Info */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '8px', fontSize: '0.9rem' }}>SERVICE ORDER</p>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>{order.service || 'Service order'}</h3>
                  {order.reference && <p style={{ margin: '8px 0 0 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>Ref: {order.reference}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    padding: '10px 16px', 
                    borderRadius: '999px', 
                    background: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status),
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: '8px'
                  }}>
                    {order.status || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>Progress</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${getStatusColor(order.status)}, ${getStatusColor(order.status)}cc)`, transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Description */}
              {order.description && (
                <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {order.description}
                </p>
              )}
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* Payment Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginTop: 0 }}>Payment Information</h4>
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Amount</span>
                    <strong style={{ fontSize: '1.3rem' }}>₦{Number(order.amount || 0).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Status</span>
                    <span style={{ 
                      padding: '6px 10px', 
                      borderRadius: '6px',
                      background: `${getPaymentStatusColor(order.paymentStatus)}20`,
                      color: getPaymentStatusColor(order.paymentStatus),
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'inline-block'
                    }}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Method</span>
                    <span style={{ fontWeight: 600 }}>{order.paymentMethod || 'Paystack'}</span>
                  </div>
                  {order.invoiceNumber && (
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Invoice</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'monospace' }}>{order.invoiceNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginTop: 0 }}>Customer Information</h4>
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Name</span>
                    <strong>{order.customerName || order.fullName || 'Client'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Email</span>
                    <span style={{ fontWeight: 600, wordBreak: 'break-all' }}>{order.customerEmail || user?.email}</span>
                  </div>
                  {order.customerPhone && (
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Phone</span>
                      <span style={{ fontWeight: 600 }}>{order.customerPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Package & Delivery Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginTop: 0 }}>Service Details</h4>
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Package</span>
                    <strong>{order.packageName || 'Standard'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Delivery Time</span>
                    <span style={{ fontWeight: 600 }}>{order.deliveryDays || 5} days</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Est. Delivery</span>
                    <span style={{ fontWeight: 600 }}>
                      {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'TBD'}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Revisions</span>
                    <span style={{ fontWeight: 600 }}>{order.revisions || 'Limited'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Order Timeline</h4>
              <div style={{ display: 'grid', gap: '16px' }}>
                {(order.statusHistory && order.statusHistory.length > 0 ? order.statusHistory : [
                  { status: 'Pending', timestamp: order.createdAt, note: 'Order created' }
                ]).map((entry, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: getStatusColor(entry.status),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem'
                      }}>
                        ✓
                      </div>
                      {idx < (order.statusHistory?.length || 1) - 1 && (
                        <div style={{ width: '2px', height: '32px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
                      )}
                    </div>
                    <div style={{ paddingTop: '2px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                        <strong>{entry.status}</strong>
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                          {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString() : 'Unknown'}
                        </span>
                      </div>
                      {entry.note && (
                        <p style={{ margin: '6px 0 0 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Files Section */}
            {order.files && order.files.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Attached Files</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {order.files.map((file, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '10px 12px', 
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📎</span>
                      <span style={{ flex: 1, wordBreak: 'break-all' }}>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {cancelError && (
              <div className="card" style={{ padding: '16px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171' }}>
                <p style={{ margin: 0, color: '#f87171', fontSize: '0.9rem' }}>{cancelError}</p>
              </div>
            )}

            {order.status !== 'Cancelled' && order.status !== 'Completed' && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelLoading}
                  className="btn btn-secondary"
                  style={{ opacity: cancelLoading ? 0.6 : 1 }}
                >
                  {cancelLoading ? 'Cancelling…' : 'Cancel Order'}
                </button>
                <p style={{ margin: 'auto 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                  Need support? <Link legacyBehavior href="/contact"><a style={{ color: '#60a5fa', textDecoration: 'none' }}>Contact us</a></Link>
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && !order && (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p>No order data available</p>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
