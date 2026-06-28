import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function AdminAnalytics(){
  return (
    <ProtectedRoute adminOnly>
      <DashboardLayout>
        <div className="section-title">
          <h2>Analytics Dashboard</h2>
          <p>Review revenue, orders, visitors, and project metrics in one place.</p>
        </div>
        <div className="service-grid">
          <div className="service-card"><h3>Revenue</h3><p>₦4,200,000 in collected revenue this quarter.</p></div>
          <div className="service-card"><h3>New Orders</h3><p>32 new orders have been submitted in the last 30 days.</p></div>
          <div className="service-card"><h3>Active Projects</h3><p>12 active projects are currently in delivery or review phases.</p></div>
          <div className="service-card"><h3>Visitors</h3><p>Analytics show 28,000 page views across campaigns and service landing pages.</p></div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
