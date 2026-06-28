import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../../components/ProtectedRoute'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'

export default function ConversationPage() {
  const router = useRouter()
  const { conversationId } = router.query
  const { user } = useAuth()
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!user || !conversationId) return
    let unsubMessages = null
    let unsubConversation = null
    let active = true

    const load = async () => {
      try {
        const fb = await import('../../../firebase/firebaseClient')
        const { doc, getDoc, collection, query, orderBy, onSnapshot } = await import('firebase/firestore')
        const convRef = doc(fb.db, 'conversations', conversationId)
        const convSnap = await getDoc(convRef)
        if (!active) return
        if (!convSnap.exists()) {
          setError('Conversation not found.')
          setLoading(false)
          return
        }
        const convData = convSnap.data()
        if (!convData.participants?.includes(user.uid)) {
          setError('You do not have access to this conversation.')
          setLoading(false)
          return
        }
        setConversation({ id: convSnap.id, ...convData })

        unsubMessages = onSnapshot(
          query(collection(fb.db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc')),
          (snapshot) => {
            if (!active) return
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            setLoading(false)
          },
          (listenError) => {
            console.error(listenError)
            setError('Unable to load messages.')
            setLoading(false)
          }
        )

        unsubConversation = onSnapshot(convRef, (snapshot) => {
          if (!active) return
          setConversation({ id: snapshot.id, ...snapshot.data() })
        })
      } catch (fetchError) {
        console.error(fetchError)
        setError('Unable to load conversation.')
        setLoading(false)
      }
    }

    load()
    return () => {
      active = false
      if (unsubMessages) unsubMessages()
      if (unsubConversation) unsubConversation()
    }
  }, [user, conversationId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (event) => {
    event.preventDefault()
    if (!body.trim() || !conversationId || !user) return
    setSending(true)
    try {
      const fb = await import('../../../firebase/firebaseClient')
      const { collection, addDoc, serverTimestamp, doc, updateDoc } = await import('firebase/firestore')
      const messagesRef = collection(fb.db, 'conversations', conversationId, 'messages')
      await addDoc(messagesRef, {
        senderId: user.uid,
        text: body.trim(),
        createdAt: serverTimestamp()
      })
      const convRef = doc(fb.db, 'conversations', conversationId)
      await updateDoc(convRef, {
        lastMessage: body.trim(),
        updatedAt: serverTimestamp()
      })
      setBody('')
    } catch (sendError) {
      console.error(sendError)
      setError('Unable to send your message. Try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Conversation</h2>
          <p>Manage messages in real-time and keep client conversations organized.</p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Link legacyBehavior href="/dashboard/messages"><a className="btn btn-ghost">← Back to Messages</a></Link>
        </div>
        {error ? (
          <div className="card" style={{ padding: '24px' }}>{error}</div>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{conversation?.title || 'Conversation details'}</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>{conversation?.topic || 'Real-time message thread for your project.'}</p>
            </div>
            <div className="card" style={{ padding: 0, minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
              <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', gap: '16px', display: 'grid' }}>
                {loading ? (
                  <div className="empty-state">Loading conversation…</div>
                ) : messages.length ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        alignSelf: message.senderId === user.uid ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: message.senderId === user.uid ? 'rgba(110,231,247,0.15)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '18px',
                        padding: '16px'
                      }}
                    >
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.88)' }}>{message.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No messages in this conversation yet.</div>
                )}
              </div>
              <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '18px', borderTop: '1px solid var(--glass-border)' }}>
                <input
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Type your message..."
                  className="dash-form-input"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" disabled={sending || !body.trim()}>
                  {sending ? 'Sending…' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
