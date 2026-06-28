import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

import AvatarMenu from './ui/AvatarMenu'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Training', href: '/training' },
  { label: 'Order', href: '/order' },
  { label: 'Contact', href: '/contact' }
]

export default function Header(){
  const { user } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="header container">
      <div className="header-left">
        <Link legacyBehavior href="/"><a className="logo">TOD</a></Link>
      </div>

      <nav className={`header-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link legacyBehavior href={link.href}>
                <a className={router.pathname === link.href ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-right">
        <div className="header-actions">
          {!user ? (
            <>
              <Link legacyBehavior href="/login"><a className="btn btn-secondary">Login</a></Link>
              <Link legacyBehavior href="/register"><a className="btn btn-ghost">Register</a></Link>
            </>
          ) : (
            <>
              <div className="header-action-button">
                <button type="button" className="icon-button" aria-label="Notifications">🔔</button>
              </div>
              <AvatarMenu />
            </>
          )}
        </div>
        <button className={`menu-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(open => !open)} aria-label="Open navigation menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
