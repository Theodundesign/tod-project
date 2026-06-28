import Head from 'next/head'
import Link from 'next/link'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function About(){
  return (
    <>
      <Head>
        <title>About The Odun Design</title>
        <meta name="description" content="Explore The Odun Design's premium company experience, mission, vision, founder profile, and portfolio highlights." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal">
          <p className="hero-badge">About The Odun Design</p>
          <h1>We craft premium digital products for ambitious businesses.</h1>
          <p className="hero-copy">The Odun Design blends visual sophistication, technical skill, and strategic thinking to help brands grow online.</p>
          <div className="hero-actions">
            <Link legacyBehavior href="/about/overview"><a className="btn btn-primary">Company Overview</a></Link>
            <Link legacyBehavior href="/about/founder"><a className="btn btn-secondary">Meet the Founder</a></Link>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Premium About experience</h2>
            <p>Navigate through the full company story, leadership profile, mission, vision, and portfolio highlights.</p>
          </div>
          <div className="feature-grid">
            <Link legacyBehavior href="/about/overview"><a className="feature-card card-link">
              <h3>Company Overview</h3>
              <p>Learn who we are, what we do, and why businesses choose The Odun Design.</p>
            </a></Link>
            <Link legacyBehavior href="/about/mission"><a className="feature-card card-link">
              <h3>Mission</h3>
              <p>Understand how we build premium digital products with quality and long-term value.</p>
            </a></Link>
            <Link legacyBehavior href="/about/vision"><a className="feature-card card-link">
              <h3>Vision</h3>
              <p>See our ambition to become one of Africa&apos;s leading digital agencies.</p>
            </a></Link>
            <Link legacyBehavior href="/about/why-choose-us"><a className="feature-card card-link">
              <h3>Why Choose The Odun Design</h3>
              <p>Explore our strengths in quality, speed, support, and modern digital execution.</p>
            </a></Link>
            <Link legacyBehavior href="/about/founder"><a className="feature-card card-link">
              <h3>Meet the Founder</h3>
              <p>Discover the leadership behind our creative digital strategy and premium projects.</p>
            </a></Link>
            <Link legacyBehavior href="/about/portfolio"><a className="feature-card card-link">
              <h3>Portfolio Highlights</h3>
              <p>Browse modern project cards for graphic design, branding, web, apps, and training.</p>
            </a></Link>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-meta">
            <span className="section-label">Core values</span>
            <h2>Design, speed, security, and long-term business partnerships.</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-number">Quality</span>
              <p>Design systems and development standards built for premium digital delivery.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Support</span>
              <p>Professional communication and responsive project management at every stage.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Growth</span>
              <p>Solutions crafted for conversion, visibility, and scalable digital presence.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
