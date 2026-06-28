import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { useToast } from './ToastContext'

function Avatar({ src, name }){
  if(src) return <Image src={src} alt={name||'avatar'} className="avatar-img" width={40} height={40} unoptimized />
  const letter = (name && name[0]) ? name[0].toUpperCase() : '?'
  return <div className="avatar-fallback">{letter}</div>
}

export default function AvatarMenu(){
  const { user, profile, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(()=>{
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false) }
    function onKey(e){ if(e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return ()=>{ document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  },[ref])

  useEffect(()=>{
    if(open && ref.current){
      // focus first link for keyboard users
      const first = ref.current.querySelector('a,button,input')
      if(first && typeof first.focus === 'function') first.focus()
    }
  },[open])

  const handleLogout = async ()=>{
    try{ await logout(); router.push('/login'); toast.push({message:'Signed out', type:'info'}) }catch(e){ toast.push({message:'Sign out failed', type:'error'}) }
  }

  return (
    <div className="avatar-menu" ref={ref}>
      <button aria-haspopup="true" aria-expanded={open} className="avatar-button" onClick={()=>setOpen(s=>!s)}>
        <Avatar src={profile?.profileImage} name={profile?.fullName || user?.email} />
      </button>
      {open && (
        <div className="avatar-dropdown glass" role="menu">
          <div className="avatar-panel">
            <div className="panel-top">
              <Avatar src={profile?.profileImage} name={profile?.fullName || user?.email} />
              <div className="panel-meta">
                <div className="panel-name">{profile?.fullName || user?.email}</div>
                <div className="panel-email">{user?.email}</div>
              </div>
            </div>
            <nav className="panel-links">
              <Link legacyBehavior href="/dashboard"><a>Dashboard</a></Link>
              <Link legacyBehavior href="/dashboard/projects"><a>My Projects</a></Link>
              <Link legacyBehavior href="/dashboard/files"><a>Upload Files</a></Link>
              <Link legacyBehavior href="/dashboard/messages"><a>Messages</a></Link>
              <Link legacyBehavior href="/dashboard/settings"><a>Settings</a></Link>
              {profile?.role === 'admin' && (
                <>
                  <hr />
                  <Link legacyBehavior href="/admin"><a>Admin Dashboard</a></Link>
                  <Link legacyBehavior href="/admin/users"><a>User Management</a></Link>
                </>
              )}
            </nav>
            <div className="panel-actions">
              <button className="btn" onClick={()=>router.push('/dashboard')}>Go to Dashboard</button>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
