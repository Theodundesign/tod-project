import { useAuth } from '../../context/AuthContext'
import AvatarMenu from '../ui/AvatarMenu'

export default function Topbar(){
  const { profile } = useAuth()
  return (
    <header className="dash-topbar">
      <div className="top-left">Dashboard</div>
      <div className="top-right">
        <div className="user">{profile?.fullName || profile?.email || 'Client'}</div>
        <AvatarMenu />
      </div>
    </header>
  )
}
