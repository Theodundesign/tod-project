import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({children}){
  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <Topbar />
        <div className="dash-content">{children}</div>
      </div>
    </div>
  )
}
