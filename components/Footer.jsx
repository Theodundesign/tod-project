import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const OFFICIAL_LOGO = 'https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/theodundesign-e1782575369588.png'
const FOUNDER_IMAGE = 'https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/Igbaoyinboprofile.png'

export default function Footer(){
  return (
    <footer className="premium-footer container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link legacyBehavior href="/">
            <a className="footer-logo-link" aria-label="The Odun Design home">
              <Image src={OFFICIAL_LOGO} alt="The Odun Design logo" className="footer-logo-image footer-logo-image--large" width={180} height={45} />
              <div className="footer-logo-copy">
                <span>The Odun Design</span>
              </div>
            </a>
          </Link>
          <p>Creative Director-led digital solutions for brands that want premium results.</p>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">🔗</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link legacyBehavior href="/"><a>Home</a></Link>
          <Link legacyBehavior href="/about"><a>About</a></Link>
          <Link legacyBehavior href="/services"><a>Services</a></Link>
          <Link legacyBehavior href="/portfolio"><a>Portfolio</a></Link>
          <Link legacyBehavior href="/blog"><a>Blog</a></Link>
          <Link legacyBehavior href="/training"><a>Training</a></Link>
          <Link legacyBehavior href="/contact"><a>Contact</a></Link>
          <Link legacyBehavior href="/order"><a>Order</a></Link>
        </div>

        <div className="footer-services">
          <h4>Services</h4>
          <Link legacyBehavior href="/services#graphic-design"><a>Graphic Design</a></Link>
          <Link legacyBehavior href="/services#web-development"><a>Web Development</a></Link>
          <Link legacyBehavior href="/services#app-development"><a>App Development</a></Link>
          <Link legacyBehavior href="/services#seo"><a>SEO Optimization</a></Link>
          <Link legacyBehavior href="/training"><a>Training</a></Link>
        </div>

        <div className="footer-founder">
          <h4>Founder</h4>
          <div className="founder-profile">
            <Image src={FOUNDER_IMAGE} alt="Igbaoyinbo Odunayo" className="founder-image" width={64} height={64} />
            <div>
              <p className="founder-name">Igbaoyinbo Odunayo</p>
              <p className="founder-role">CEO & Founder</p>
            </div>
          </div>
          <p>Creative Director and Founder of The Odun Design, delivering premium design, websites, mobile apps, UI/UX, SEO, and digital solutions.</p>
          <div className="footer-founder-contact">
            <a href="mailto:theodundesign@gmail.com">theodundesign@gmail.com</a>
            <a href="tel:+2348160191823">08160191823</a>
            <span>Ado Ekiti, Ekiti State, Nigeria</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} The Odun Design. Creative digital solutions for modern businesses.</div>
    </footer>
  )
}
