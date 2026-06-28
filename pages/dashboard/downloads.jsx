import { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardDownloads(){
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!user) return
    let unsub = null
    ;(async ()=>{
      try{
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db,'orders'), where('userId','==', user.uid), orderBy('createdAt','desc'))
        unsub = onSnapshot(q, snap => {
          setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
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

  const downloads = orders.flatMap(order => (order.files || []).map(file => ({ orderId: order.id, service: order.service, file })))

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Downloads</h2>
          <p>Download files delivered for your orders from the client portal.</p>
        </div>
        {loading ? (
          <div className="empty-state">Loading downloads…</div>
        ) : downloads.length ? (
          <div className="service-grid">
            {downloads.map(item => (
              <div key={`${item.orderId}-${item.file}`} className="service-card">
                <div>
                  <h3>{item.file}</h3>
                  <p>{item.service}</p>
                </div>
                <a className="service-cta" href="#">Download</a>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No available downloads yet. Delivery files will appear here once your project is complete.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
