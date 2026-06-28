import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function AdminPanel(){
  return (
    <ProtectedRoute adminOnly>
      <DashboardLayout>
        <div className="section-title">
          <h2>Admin System</h2>
          <p>A professional admin workspace for roles, analytics, and activity monitoring.</p>
        </div>
        <div className="service-grid">
          <div className="service-card">
            <h3>Analytics</h3>
            <p>Revenue, visitors, orders, and performance metrics in one place.</p>
            <Link legacyBehavior href="/admin/analytics"><a className="btn btn-primary">View analytics</a></Link>
          </div>
          <div className="service-card">
            <h3>User Management</h3>
            <p>Manage accounts, roles, and user permissions for your team.</p>
            <Link legacyBehavior href="/admin/users"><a className="btn btn-primary">Manage users</a></Link>
          </div>
          <div className="service-card">
            <h3>Activity Logs</h3>
            <p>Audit login history, admin actions, and security events.</p>
            <Link legacyBehavior href="/admin/activity"><a className="btn btn-primary">View logs</a></Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
