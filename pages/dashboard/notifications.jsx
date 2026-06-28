import { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardNotifications(){
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!user) return
    let unsub = null
    ;(async ()=>{
      try{
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db,'notifications'), where('userId','==', user.uid), orderBy('createdAt','desc'))
        unsub = onSnapshot(q, snap => {
          setNotifications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
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

  async function toggleRead(note) {
    try {
      const fb = await import('../../firebase/firebaseClient')
      const { doc, updateDoc } = await import('firebase/firestore')
      await updateDoc(doc(fb.db, 'notifications', note.id), { read: !note.read })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Notifications</h2>
          <p>Stay informed about order updates, payment status, and delivery activity.</p>
        </div>
        {loading ? (
          <div className="empty-state">Loading notifications…</div>
        ) : notifications.length ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {notifications.map(note => (
              <div key={note.id} className="service-card" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{note.title || 'Update'}</h3>
                    <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.72)' }}>{note.message || 'No message provided.'}</p>
                  </div>
                  <button type="button" className="btn-ghost" onClick={() => toggleRead(note)}>
                    {note.read ? 'Mark unread' : 'Mark read'}
                  </button>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', color: 'rgba(255,255,255,0.65)' }}>
                  <span>{note.category || 'General'}</span>
                  <span>{note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No notifications yet. New activity will show here once available.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
