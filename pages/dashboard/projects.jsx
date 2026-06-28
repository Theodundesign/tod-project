import { useEffect, useMemo, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function Projects(){
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    let unsub = null
    ;(async () => {
      try {
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const projectsQuery = query(collection(fb.db, 'projects'), where('userId', '==', user.uid), orderBy('deadline', 'asc'))
        unsub = onSnapshot(projectsQuery, (snapshot) => {
          setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
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

        {loading ? (
          <div className="empty-state">Loading projects…</div>
        ) : activeProjects.length ? (
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
        ) : (
          <div className="empty-state">No active projects found. Project status and timelines will appear here once a project starts.</div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
