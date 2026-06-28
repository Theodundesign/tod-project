import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function AdminUsers(){
  return (
    <ProtectedRoute adminOnly>
      <DashboardLayout>
        <div className="section-title">
          <h2>User Management</h2>
          <p>Manage user accounts, roles, and access across the platform.</p>
        </div>
        <div className="service-grid">
          <div className="service-card">
            <h3>Super Admin</h3>
            <p>Full access to system configuration, user roles, and analytics.</p>
          </div>
          <div className="service-card">
            <h3>Admin</h3>
            <p>Manage content, orders, and projects with elevated permissions.</p>
          </div>
          <div className="service-card">
            <h3>Staff</h3>
            <p>Assist with project delivery, messaging, and customer requests.</p>
          </div>
          <div className="service-card">
            <h3>Customer</h3>
            <p>Access the client dashboard, orders, files, and project updates.</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
