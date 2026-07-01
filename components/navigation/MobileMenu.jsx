import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const OFFICIAL_LOGO = 'https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/theodundesign-e1782575369588.png'

const MENU_SECTIONS = [
  {
    key: 'About',
    title: 'About',
    links: [
      { href: '/about/overview', label: 'Company Overview' },
      { href: '/about/mission', label: 'Mission' },
      { href: '/about/vision', label: 'Vision' },
      { href: '/about/why-choose-us', label: 'Why Choose Us' },
      { href: '/about/founder', label: 'Meet the Founder' },
      { href: '/about/portfolio', label: 'Portfolio Highlights' }
    ]
  },
  {
    key: 'Services',
    title: 'Services',
    links: [
      { href: '/services#graphic-design', label: 'Graphic Design' },
      { href: '/services#web-development', label: 'Web Development' },
      { href: '/services#app-development', label: 'App Development' },
      { href: '/services#seo', label: 'SEO Optimization' }
    ]
  },
  {
    key: 'Training',
    title: 'Training',
    links: [
      { href: '/training#graphic-design', label: 'Graphic Design' },
      { href: '/training#web-development', label: 'Web Development' },
      { href: '/training#app-development', label: 'App Development' },
      { href: '/training#ui-ux', label: 'UI/UX Training' }
    ]
  }
]

const CORE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
  { href: '/order', label: 'Start an Order' }
]

export default function MobileMenu({ open, onClose, onSearchOpen }){
  const { user } = useAuth()
  const router = useRouter()
  const [expandedSection, setExpandedSection] = useState('About')
  const [mounted, setMounted] = useState(false)
  const originalBodyOverflow = useRef('')
  const originalHtmlOverflow = useRef('')
  const ref = useRef()

  const isActive = (href) => {
    if (href.startsWith('/services')) return router.pathname === '/services'
    if (href.startsWith('/training')) return router.pathname === '/training'
    return router.pathname === href
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      if (originalBodyOverflow.current === '') {
        originalBodyOverflow.current = document.body.style.overflow
      }
      if (originalHtmlOverflow.current === '') {
        originalHtmlOverflow.current = document.documentElement.style.overflow
      }

      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = originalBodyOverflow.current
      document.documentElement.style.overflow = originalHtmlOverflow.current
      document.body.classList.remove('menu-open')
      originalBodyOverflow.current = ''
      originalHtmlOverflow.current = ''
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow.current
      document.documentElement.style.overflow = originalHtmlOverflow.current
      document.body.classList.remove('menu-open')
      originalBodyOverflow.current = ''
      originalHtmlOverflow.current = ''
    }
  }, [open])

  useEffect(()=>{
    if(!open) return;

    function onKey(e){ if(e.key === 'Escape') onClose() }
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) onClose() }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDoc)

    return ()=>{
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDoc)
    }
  },[open,onClose])

  useEffect(()=>{
    if(open){
      setExpandedSection('About')
    }
  },[open])

  if(!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
      >
        <div className="mobile-backdrop" onClick={onClose} />
        <motion.div
          className="mobile-content"
          ref={ref}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <div className="mobile-header">
            <div className="mobile-header-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={OFFICIAL_LOGO} alt="The Odun Design logo" className="mobile-logo-image mobile-logo-image--large" width={140} height={35} />
              <div className="mobile-branding">
                <div className="mobile-logo-label">The Odun Design</div>
                <div className="mobile-logo-copy">Creative digital solutions</div>
              </div>
            </div>
            <button className="mobile-close" onClick={onClose} aria-label="Close menu">Close</button>
          </div>

          <button
            type="button"
            className="mobile-search-button"
            onClick={() => { onSearchOpen(); onClose() }}
            aria-label="Open search"
          >
            🔎 Search the site
          </button>

          <nav className="mobile-links" aria-label="Mobile site navigation">
            {CORE_LINKS.map((link) => (
              <Link legacyBehavior key={link.href} href={link.href}>
                <a className={isActive(link.href) ? 'mobile-link active' : 'mobile-link'} onClick={onClose}>{link.label}</a>
              </Link>
            ))}
            {MENU_SECTIONS.map((section) => (
              <div className="mobile-section" key={section.key}>
                <button
                  type="button"
                  className="mobile-section-trigger"
                  aria-expanded={expandedSection === section.key}
                  aria-controls={`mobile-${section.key}`}
                  onClick={() => setExpandedSection((current) => (current === section.key ? null : section.key))}
                >
                  <span>{section.title}</span>
                  <span className="mobile-section-chevron">{expandedSection === section.key ? '▾' : '▸'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === section.key && (
                    <motion.div
                      id={`mobile-${section.key}`}
                      className="mobile-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ul>
                        {section.links.map((item) => (
                          <li key={item.href}>
                            <Link legacyBehavior href={item.href}>
                              <a className={isActive(item.href) ? 'mobile-link active' : 'mobile-link'} onClick={onClose}>{item.label}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {user ? (
              <>
                <Link legacyBehavior href="/dashboard"><a onClick={onClose}>Dashboard</a></Link>
                <Link legacyBehavior href="/dashboard/settings"><a onClick={onClose}>Profile</a></Link>
              </>
            ) : (
              <>
                <Link legacyBehavior href="/login"><a onClick={onClose}>Login</a></Link>
                <Link legacyBehavior href="/register"><a onClick={onClose}>Register</a></Link>
              </>
            )}
          </nav>

          <div className="mobile-divider" />
          <div className="mobile-contact">
            <a href="tel:+2348160191823">📞 08160191823</a>
            <a href="https://wa.me/2348160191823">💬 WhatsApp</a>
            <a href="mailto:theodundesign@gmail.com">✉️ theodundesign@gmail.com</a>
          </div>
        </motion.div>
      </motion.div>
        )}
    </AnimatePresence>, document.body)
}
