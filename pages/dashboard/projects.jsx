import { useEffect, useMemo, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function Projects(){
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    let unsub = null
    setLoading(true)
    setError('')
    ;(async () => {
      try {
        const fb = await import('../../firebase/firebaseClient')
        console.log('=== PROJECTS DEBUG ===')
        console.log('Authenticated user.uid:', user.uid)
        console.log('Firebase app config project:', fb.db?.app?.options?.projectId)
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const projectsQuery = query(collection(fb.db, 'projects'), where('userId', '==', user.uid), orderBy('deadline', 'asc'))
        unsub = onSnapshot(projectsQuery, (snapshot) => {
          console.log('Firestore projects query succeeded, docs count:', snapshot.docs.length)
          snapshot.docs.forEach(doc => {
            console.log('Project doc:', { id: doc.id, userId: doc.data().userId, uid: doc.data().uid, docData: doc.data() })
          })
          setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
          setLoading(false)
          setError('')
        }, (error) => {
          console.error('=== PROJECTS FIRESTORE ERROR ===')
          console.error('error.code:', error?.code)
          console.error('error.message:', error?.message)
          console.error('error.customData:', error?.customData)
          console.error('Full error object:', error)
          console.error('Comparing: request.auth.uid =', user.uid, 'vs resource.data.userId')
          setError('Failed to load projects. Please refresh the page or try again in a moment.')
          setLoading(false)
        })
      } catch (err) {
        console.error('=== PROJECTS ASYNC ERROR ===')
        console.error('error.code:', err?.code)
        console.error('error.message:', err?.message)
        console.error('Full error object:', err)
        setError('Unable to load your projects. Please check your connection and try again.')
        setLoading(false)
      }
    })()
    return () => { if (unsub) unsub() }
  }, [user])

  const handleRetry = () => {
    setError('')
    window.location.reload()
  }

  const activeProjects = useMemo(() => {
    if (!projects.length) return []
    return projects
  }, [projects])

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Projects</h2>
          <p>Manage project progress, deadlines, and project assets from one dashboard.</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="card" style={{ padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', color: '#f87171', fontWeight: 600 }}>Error loading projects</p>
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
          <div className="empty-state">Loading projects…</div>
        ) : !error && activeProjects.length ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {activeProjects.map((project) => (
              <div key={project.id} className="service-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{project.name || 'Project name'}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: '10px' }}>{project.description || 'Project details will appear here.'}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ color: '#6EE7F7' }}>{project.progress ? `${project.progress}%` : '0%'}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginTop: '8px' }}>{project.deadline ? new Date(project.deadline.seconds * 1000).toLocaleDateString() : 'No deadline'}</div>
                  </div>
                </div>
                <div style={{ marginTop: '20px', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${project.progress || 0}%`, height: '100%', borderRadius: '999px', background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px', color: 'rgba(255,255,255,0.7)' }}>
                  <span>Assigned: {project.assignedUsers?.join(', ') || 'Unassigned'}</span>
                  <span>Status: {project.status || 'Planning'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : !error && (
          <div className="empty-state">No active projects found. Project status and timelines will appear here once a project starts.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
