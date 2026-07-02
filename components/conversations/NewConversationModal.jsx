import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { createConversation } from '../../lib/conversations'

export default function NewConversationModal({ open, onClose }) {
  const router = useRouter()
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [title, setTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [error, setError] = useState('')

  // Load users when modal opens
  useEffect(() => {
    if (!open || !user) return

    const loadUsers = async () => {
      setLoadingUsers(true)
      try {
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, getDocs } = await import('firebase/firestore')
        
        // Query all users except current user
        const q = query(
          collection(fb.db, 'users'),
          where('uid', '!=', user.uid)
        )
        const snap = await getDocs(q)
        const loadedUsers = snap.docs.map(doc => ({
          uid: doc.id,
          displayName: doc.data().displayName || doc.data().name || 'Unknown User',
          email: doc.data().email || '',
          photoURL: doc.data().photoURL || doc.data().profileImage || ''
        }))
        setUsers(loadedUsers)
      } catch (err) {
        console.error('Failed to load users:', err)
        setError('Failed to load users. Please try again.')
      } finally {
        setLoadingUsers(false)
      }
    }

    loadUsers()
  }, [open, user])

  const filteredUsers = users.filter(u =>
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = async () => {
    if (!selectedUser) {
      setError('Please select a user')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await createConversation({
        participants: [user.uid, selectedUser.uid],
        title: title.trim() || null,
        metadata: null
      })

      if (result.ok) {
        // Success - redirect to the conversation
        onClose()
        router.push(`/dashboard/messages/${result.id}`)
      } else {
        setError('Failed to create conversation. Please try again.')
      }
    } catch (err) {
      console.error('Create conversation error:', err)
      const message = err.message || 'Failed to create conversation'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    // Reset form
    setSelectedUser(null)
    setTitle('')
    setSearchQuery('')
    setError('')
    onClose()
  }

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', width: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>New Conversation</h3>
          <button
            onClick={handleClose}
            className="btn btn-ghost"
            style={{ padding: '4px 8px', minHeight: 'auto', fontSize: '1.5rem', lineHeight: 1 }}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Error state */}
          {error && (
            <div style={{ padding: '12px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid #f87171', borderRadius: '8px', color: '#f87171', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {/* User search */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
              Select a user
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dash-form-input"
              disabled={loading || loadingUsers}
              style={{ width: '100%' }}
            />
          </div>

          {/* User list */}
          <div style={{ minHeight: '120px', maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
            {loadingUsers ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                {users.length === 0 ? 'No users available' : 'No matching users'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredUsers.map((u) => (
                  <button
                    key={u.uid}
                    onClick={() => setSelectedUser(u)}
                    disabled={loading}
                    style={{
                      padding: '12px 16px',
                      border: 'none',
                      background: selectedUser?.uid === u.uid ? 'rgba(110, 231, 247, 0.15)' : 'transparent',
                      borderBottom: '1px solid var(--glass-border)',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'inherit',
                      transition: 'background 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && selectedUser?.uid !== u.uid) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading && selectedUser?.uid !== u.uid) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {u.photoURL && (
                      <img
                        src={u.photoURL}
                        alt={u.displayName}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{u.displayName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{u.email}</div>
                    </div>
                    {selectedUser?.uid === u.uid && (
                      <div style={{ color: '#6ee7f7', fontWeight: 600 }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Conversation title input */}
          {selectedUser && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                Conversation title (optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Project Redesign"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="dash-form-input"
                disabled={loading}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={handleClose}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="btn btn-primary"
            disabled={loading || !selectedUser || loadingUsers}
            style={{ opacity: loading || !selectedUser || loadingUsers ? 0.5 : 1 }}
          >
            {loading ? 'Creating...' : 'Start Conversation'}
          </button>
        </div>
      </div>
    </div>
  )
}
