import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function Orders(){
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Orders</h2>
          <p>Order history and status updates will appear here.</p>
        </div>
        <div className="card">
          <p>Order tracking is available through the dashboard.</p>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
