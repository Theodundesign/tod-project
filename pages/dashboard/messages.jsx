import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function Messages(){
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    let unsub = null
    ;(async () => {
      try {
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const convQuery = query(
          collection(fb.db, 'conversations'),
          where('participants', 'array-contains', user.uid),
          orderBy('updatedAt', 'desc')
        )
        unsub = onSnapshot(convQuery, (snapshot) => {
          setConversations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
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

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Messages</h2>
          <p>View active conversations and respond to clients in real time.</p>
        </div>

        {loading ? (
          <div className="empty-state">Loading conversations…</div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {conversations.length ? conversations.map((conversation) => (
              <Link legacyBehavior key={conversation.id} href={`/dashboard/messages/${conversation.id}`}>
                <a className="service-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ margin: 0 }}>{conversation.title || 'Project conversation'}</h3>
                      <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.72)' }}>{conversation.lastMessage || 'Open the thread to view messages.'}</p>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.65)', minWidth: '110px', textAlign: 'right' }}>{conversation.updatedAt ? new Date(conversation.updatedAt.seconds * 1000).toLocaleDateString() : 'No date'}</span>
                  </div>
                </a>
              </Link>
            )) : (
              <div className="empty-state">
                <p>No conversations yet. New discussions will appear here when clients message you.</p>
              </div>
            )}
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
