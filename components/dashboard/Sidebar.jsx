import Link from 'next/link'
export default function Sidebar(){
  return (
    <aside className="dash-sidebar">
      <div className="brand">Odun</div>
      <nav>
        <ul>
          <li><Link legacyBehavior href="/dashboard"><a>Overview</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/projects"><a>Projects</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/messages"><a>Messages</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/files"><a>Files</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/downloads"><a>Downloads</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/orders"><a>Orders</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/payments"><a>Payments</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/invoices"><a>Invoices</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/notifications"><a>Notifications</a></Link></li>
          <li><Link legacyBehavior href="/dashboard/settings"><a>Settings</a></Link></li>
        </ul>
      </nav>
    </aside>
  )
}
