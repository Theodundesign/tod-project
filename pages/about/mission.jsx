import Head from 'next/head'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AboutMission(){
  return (
    <>
      <Head>
        <title>Mission – The Odun Design</title>
        <meta name="description" content="The Odun Design's mission is to build premium digital products that help businesses grow with modern technology and quality delivery." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal">
          <p className="hero-badge">Mission</p>
          <h1>Building premium digital products that help businesses grow.</h1>
          <p className="hero-copy">We deliver design-driven websites, apps, and experiences that are modern, performant, and aligned with each client&apos;s business goals.</p>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>What we focus on</h2>
            <p>Our mission is rooted in quality delivery, modern technology, and long-term client partnerships.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Premium digital products</h3>
              <p>We build websites, apps, and branding experiences designed to feel refined and work reliably.</p>
            </article>
            <article className="feature-card">
              <h3>Business growth</h3>
              <p>Every solution is created to support sales, trust, and audience engagement.</p>
            </article>
            <article className="feature-card">
              <h3>Modern technology</h3>
              <p>We use scalable web tools, Firebase integrations, and intelligent design systems.</p>
            </article>
            <article className="feature-card">
              <h3>Quality delivery</h3>
              <p>Projects are completed with strong communication, on time, and with polished launch-ready output.</p>
            </article>
            <article className="feature-card">
              <h3>Long-term partnerships</h3>
              <p>We work with clients who value ongoing support, upgrades, and future growth.</p>
            </article>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-meta">
            <span className="section-label">Our promise</span>
            <h2>Design, development, and delivery that keeps your business moving forward.</h2>
          </div>
          <div className="illustration-card">
            <div className="illustration-dot" />
            <div className="illustration-bar" />
            <p>We focus on real business outcomes, not just visual polish. That means measurable results, consistent communication, and solutions that scale.</p>
          </div>
        </section>
      </main>
    </>
  )
}
