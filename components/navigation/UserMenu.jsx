import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../ui/ToastContext'

function Initials({ name }){
  const initials = name ? name.trim().split(' ').map(word => word[0]).slice(0,2).join('') : '?'
  return <div className="avatar-fallback">{initials.toUpperCase()}</div>
}

export default function UserMenu(){
  const { user, profile, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(()=>{
    function handleClickOutside(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false) }
    function handleEscape(e){ if(e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  },[])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
      toast.push({ message: 'Signed out', type: 'info' })
    } catch (error) {
      toast.push({ message: 'Sign out failed', type: 'error' })
    }
  }

  return (
    <div className="user-menu" ref={ref}>
      <button className="avatar-button" onClick={() => setOpen(open => !open)} aria-expanded={open} aria-haspopup="menu">
        {profile?.profileImage ? <Image src={profile.profileImage} className="avatar-img" alt="avatar" width={40} height={40} unoptimized /> : <Initials name={profile?.fullName || user?.email} />}
      </button>
      {open && (
        <div className="avatar-dropdown glass" role="menu">
          <div className="panel-top">
            {profile?.profileImage ? <Image src={profile.profileImage} className="avatar-img" alt="avatar" width={64} height={64} unoptimized /> : <Initials name={profile?.fullName || user?.email} />}
            <div className="panel-meta">
              <div className="panel-name">{profile?.fullName || user?.email}</div>
              <div className="panel-email">{user?.email}</div>
            </div>
          </div>
          <nav className="panel-links">
            <Link legacyBehavior href="/dashboard"><a>Dashboard</a></Link>
            <Link legacyBehavior href="/dashboard/orders"><a>Orders</a></Link>
            <Link legacyBehavior href="/dashboard/projects"><a>Projects</a></Link>
            <Link legacyBehavior href="/dashboard/messages"><a>Messages</a></Link>
            <Link legacyBehavior href="/dashboard/settings"><a>Settings</a></Link>
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      )}
    </div>
  )
}
