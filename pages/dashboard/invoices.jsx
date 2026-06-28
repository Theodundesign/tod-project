import { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardInvoices(){
  const { user } = useAuth()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!user) return
    let unsub = null
    ;(async ()=>{
      try{
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db,'invoices'), where('userId','==', user.uid), orderBy('createdAt','desc'))
        unsub = onSnapshot(q, snap => {
          setInvoices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
          setLoading(false)
        }, error => {
          console.error(error)
          setLoading(false)
        })
      }catch(e){
        console.error(e)
        setLoading(false)
      }
    })()
    return ()=>{ if(unsub) unsub() }
  },[user])

  const handleExport = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Invoices</h2>
          <p>Review order invoices and payment records for completed or pending requests.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>Export a printable invoice report for accounting or client review.</p>
          <button type="button" className="btn btn-primary" onClick={handleExport}>Export PDF</button>
        </div>
        {loading ? (
          <div className="empty-state">Loading invoices…</div>
        ) : invoices.length ? (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.reference || invoice.service || 'Order invoice'}</td>
                  <td>{invoice.status || 'Pending'}</td>
                  <td>{invoice.amount ? `₦${Number(invoice.amount).toLocaleString()}` : 'TBD'}</td>
                  <td>{invoice.createdAt?.toDate ? invoice.createdAt.toDate().toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No invoices available yet. Place an order to generate invoices.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
