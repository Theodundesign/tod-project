import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'
import GlobalSearch from '../search/GlobalSearch'

const OFFICIAL_LOGO = 'https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/theodundesign-e1782575369588.png'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', mega: 'About' },
  { label: 'Services', href: '/services', mega: 'Services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Training', href: '/training', mega: 'Training' },
  { label: 'Contact', href: '/contact' },
  { label: 'Order', href: '/order' }
]

const MEGA_MENU = {
  About: [
    { icon: '🏢', href: '/about/overview', title: 'Company Overview', description: 'Discover what makes The Odun Design a premium creative partner.' },
    { icon: '🎯', href: '/about/mission', title: 'Mission', description: 'We build beautiful digital products with clarity and strategy.' },
    { icon: '🌟', href: '/about/vision', title: 'Vision', description: 'Creating elegant online experiences for modern businesses.' },
    { icon: '🏆', href: '/about/why-choose-us', title: 'Why Choose The Odun Design', description: 'Premium design, fast delivery, and a business-first mindset.' },
    { icon: '👋', href: '/about/founder', title: 'Meet the Founder', description: 'A design leader with a decade of digital product experience.' },
    { icon: '📁', href: '/about/portfolio', title: 'Portfolio Highlights', description: 'Explore standout projects with polished, high-converting results.' }
  ],
  Services: [
    { icon: '🎨', href: '/services#graphic-design', title: 'Graphic Design', description: 'Flyers, logos, branding, packaging, social media and more.' },
    { icon: '🌐', href: '/services#web-development', title: 'Web Development', description: 'Business sites, portfolios, ecommerce, portals and landing pages.' },
    { icon: '📱', href: '/services#app-development', title: 'App Development', description: 'Android, iOS and cross-platform mobile experiences.' },
    { icon: '🔎', href: '/services#seo', title: 'SEO', description: 'Technical, local and optimization work to improve rankings.' }
  ],
  Training: [
    { icon: '🎨', href: '/training#graphic-design', title: 'Graphic Design', description: 'Branding, layout, and creative workflows for modern brands.' },
    { icon: '🌐', href: '/training#web-development', title: 'Web Development', description: 'Build performant websites with clean, scalable code.' },
    { icon: '📱', href: '/training#app-development', title: 'App Development', description: 'Launch mobile apps that feel polished and easy to use.' },
    { icon: '🧠', href: '/training#ui-ux', title: 'UI/UX', description: 'Design interfaces that are intuitive, modern, and memorable.' },
    { icon: '🛠️', href: '/training#wordpress', title: 'WordPress', description: 'Build custom WordPress sites with flexible, secure tooling.' },
    { icon: '⚛️', href: '/training#react', title: 'React', description: 'Modern frontend skills for dynamic digital experiences.' },
    { icon: '🚀', href: '/training#nextjs', title: 'Next.js', description: 'Server-rendered apps with performance, SEO, and growth in mind.' },
    { icon: '🤖', href: '/training#ai-tools', title: 'AI Tools', description: 'Master the best AI workflows for design, code, and productivity.' }
  ]
}

export default function Header(){
  const { user } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const hoverTimer = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(hoverTimer.current)
  }, [])

  useEffect(() => {
    setActiveMega(null)
  }, [router.pathname])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (activeMega && headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveMega(null)
      }
    }
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveMega(null)
      }
    }
    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [activeMega])

  const openMega = (menu) => {
    clearTimeout(hoverTimer.current)
    setActiveMega(menu)
  }

  const closeMega = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setActiveMega(null), 150)
  }

  const cancelClose = () => {
    clearTimeout(hoverTimer.current)
  }

  return (
    <header ref={headerRef} className="header premium-header">
      <div className="header-left">
        <Link legacyBehavior href="/">
          <a className="logo-link" aria-label="The Odun Design home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={OFFICIAL_LOGO} alt="The Odun Design logo" className="logo-image logo-image--large" width={180} height={45} />
            <div className="logo-copy">
              <span className="logo-title">The Odun Design</span>
              <span className="logo-tagline">Creative digital solutions</span>
            </div>
          </a>
        </Link>
      </div>

      <nav className="header-nav desktop-only" aria-label="Main navigation" onMouseLeave={closeMega}>
        <ul className="nav-list">
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className={link.mega ? 'nav-item-has-dropdown' : ''}
              onMouseEnter={() => (link.mega ? openMega(link.mega) : closeMega())}
              onFocus={() => (link.mega ? openMega(link.mega) : closeMega())}
            >
              <Link legacyBehavior href={link.href}>
                <a className={`nav-link ${router.pathname === link.href ? 'active' : ''}`}>{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-right">
        <button
          type="button"
          className="icon-button search-icon-button"
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
          title="Search"
        >
          🔎
        </button>

        {!user ? (
          <div className="header-actions">
            <Link legacyBehavior href="/login"><a className="btn btn-secondary">Login</a></Link>
            <Link legacyBehavior href="/register"><a className="btn btn-primary">Register</a></Link>
          </div>
        ) : (
          <>
            <button type="button" className="icon-button" aria-label="Notifications">🔔</button>
            <UserMenu />
          </>
        )}

        <div className="header-cta desktop-only">
          <Link legacyBehavior href="/order"><a className="btn btn-primary">Start an Order</a></Link>
        </div>

        <button
          className={`menu-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {activeMega && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ type: 'spring', stiffness: 420, damping: 40 }}
            className={`mega-menu open`}
            onMouseEnter={cancelClose}
            onMouseLeave={closeMega}
            role="region"
            aria-label="About menu"
          >
            <div className="mega-menu-grid" onKeyDown={(e) => {
              // basic keyboard support: Enter opens link when focusing a card
              if (e.key === 'Enter' && document.activeElement && document.activeElement.dataset && document.activeElement.dataset.href) {
                const href = document.activeElement.dataset.href
                router.push(href)
                setActiveMega(null)
              }
            }}>
              {(MEGA_MENU[activeMega] || []).map((item) => (
                <Link legacyBehavior key={item.href} href={item.href}>
                  <a className="mega-card" tabIndex={0} data-href={item.href} role="menuitem">
                    <div className="mega-card-icon">{item.icon}</div>
                    <div>
                      <div className="mega-card-title">{item.title}</div>
                      <div className="mega-card-description">{item.description}</div>
                    </div>
                    <div className="mega-card-arrow">→</div>
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearchOpen={() => {
          setSearchOpen(true)
          setMobileOpen(false)
        }}
      />
      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpen={() => setSearchOpen(true)}
      />
    </header>
  )
}
