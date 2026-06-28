import { useEffect, useMemo, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

const FILTERS = ['All', 'Paid', 'Pending', 'Failed']

export default function Payments(){
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    if (!user) return
    let unsub = null
    setLoading(true)
    setError('')
    ;(async () => {
      try {
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db, 'payments'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
        unsub = onSnapshot(q, (snapshot) => {
          setPayments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
          setLoading(false)
          setError('')
        }, (error) => {
          console.error(error)
          setError('Failed to load payments. Please refresh the page or try again in a moment.')
          setLoading(false)
        })
      } catch (err) {
        console.error(err)
        setError('Unable to load payment history. Please check your connection and try again.')
        setLoading(false)
      }
    })()

    return () => { if (unsub) unsub() }
  }, [user])

  const handleRetry = () => {
    setError('')
    window.location.reload()
  }

  const filteredPayments = useMemo(() => {
    if (statusFilter === 'All') return payments
    return payments.filter((payment) => payment.status === statusFilter)
  }, [payments, statusFilter])

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Payments</h2>
          <p>Review billing history, transaction records, and payment status for your orders.</p>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {FILTERS.map((filter) => (
            <button key={filter} type="button" className={`btn ${statusFilter === filter ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setStatusFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="card" style={{ padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', color: '#f87171', fontWeight: 600 }}>Error loading payments</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="btn btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="empty-state">Loading payments…</div>
        ) : !error && filteredPayments.length ? (
          <div className="service-grid">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="service-card">
                <h3>{payment.description || payment.reference || 'Payment record'}</h3>
                <p>Status: {payment.status || 'Pending'}</p>
                <p>Amount: {payment.amount ? `₦${Number(payment.amount).toLocaleString()}` : 'TBD'}</p>
                <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.65)' }}>{payment.createdAt?.toDate ? payment.createdAt.toDate().toLocaleDateString() : 'Date unavailable'}</p>
              </div>
            ))}
          </div>
        ) : !error && (
          <div className="empty-state">No payment records available yet.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
