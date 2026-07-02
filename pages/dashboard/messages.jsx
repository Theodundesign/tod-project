import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import NewConversationModal from '../../components/conversations/NewConversationModal'

export default function Messages(){
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    let unsub = null
    setLoading(true)
    setError('')
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
          setError('')
        }, (error) => {
          console.error(error)
          setError('Failed to load messages. Please refresh the page or try again in a moment.')
          setLoading(false)
        })
      } catch (err) {
        console.error(err)
        setError('Unable to load your conversations. Please check your connection and try again.')
        setLoading(false)
      }
    })()

    return () => { if (unsub) unsub() }
  }, [user])

  const handleRetry = () => {
    setError('')
    window.location.reload()
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2>Messages</h2>
            <p>View active conversations and respond to clients in real time.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
            style={{ whiteSpace: 'nowrap', marginTop: '4px' }}
          >
            + New Message
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="card" style={{ padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', color: '#f87171', fontWeight: 600 }}>Error loading messages</p>
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
          <div className="empty-state">Loading conversations…</div>
        ) : !error && (
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

      <NewConversationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ProtectedRoute>
  )
}
