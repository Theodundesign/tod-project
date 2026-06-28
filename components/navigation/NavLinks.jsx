import React from 'react'
import Link from 'next/link'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Training', href: '/training' },
  { label: 'Contact', href: '/contact' }
]

export default function NavLinks(){
  return (
    <ul className="nav-list">
      {LINKS.map(link => (
        <li key={link.href}>
          <Link legacyBehavior href={link.href}>
            <a>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
