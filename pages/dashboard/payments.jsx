import { useEffect, useMemo, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

const FILTERS = ['All', 'Paid', 'Pending', 'Failed']

export default function Payments(){
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    if (!user) return
    let unsub = null
    ;(async () => {
      try {
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db, 'payments'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
        unsub = onSnapshot(q, (snapshot) => {
          setPayments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
          setLoading(false)
        }, (error) => {
          console.error(error)
          setLoading(false)
        })
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    })()

    return () => { if (unsub) unsub() }
  }, [user])

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

        {loading ? (
          <div className="empty-state">Loading payments…</div>
        ) : filteredPayments.length ? (
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
        ) : (
          <div className="empty-state">No payment records available yet.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
