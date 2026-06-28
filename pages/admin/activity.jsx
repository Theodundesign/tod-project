import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function AdminActivity(){
  return (
    <ProtectedRoute adminOnly>
      <DashboardLayout>
        <div className="section-title">
          <h2>Activity Logs</h2>
          <p>Track login history, admin changes, and audit trails for the platform.</p>
        </div>
        <div className="service-grid">
          <div className="service-card"><h3>Login History</h3><p>Recent logins and session activity are available here.</p></div>
          <div className="service-card"><h3>User Actions</h3><p>View updates to accounts, orders, and project details.</p></div>
          <div className="service-card"><h3>Security</h3><p>Monitor access, role changes, and suspicious activity.</p></div>
          <div className="service-card"><h3>Audit Logs</h3><p>Track changes for accountability and faster issue resolution.</p></div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
