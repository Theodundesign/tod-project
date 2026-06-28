import DashboardLayout from '../../components/dashboard/DashboardLayout'
import ProtectedRoute from '../../components/ProtectedRoute'
import dynamic from 'next/dynamic'

const StatsWidget = dynamic(()=>import('../../components/dashboard/StatsWidget'), { ssr: false })
import { useAuth } from '../../context/AuthContext'

export default function Dashboard(){
  const { profile } = useAuth()
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Dashboard</h2>
          <p>Welcome back. Use the sidebar to manage orders, files, and account details.</p>
        </div>
        <div className="service-grid">
          <StatsWidget title="Active Projects" value={3} />
          <StatsWidget title="Pending" value={1} />
          <StatsWidget title="Balance" value="$1,200" />
        </div>
        <section className="card" style={{marginTop:20}}>
          <h3>Welcome{profile?.fullName? `, ${profile.fullName}` : ''}</h3>
          <p>Role: {profile?.role || 'client'}</p>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
