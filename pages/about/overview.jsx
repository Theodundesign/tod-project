import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AboutOverview(){
  return (
    <>
      <Head>
        <title>About The Odun Design — Our Mission & Values</title>
        <meta name="description" content="Learn about The Odun Design - a premium digital agency dedicated to transforming brands through design, web development, app development, and training services." />
        <meta name="keywords" content="about us, digital agency, design company, web development, app development, training" />
        <meta property="og:title" content="About The Odun Design" />
        <meta property="og:description" content="Discover our mission to elevate brands through premium digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theodundesign.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://theodundesign.com/about" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "The Odun Design",
              "description": "Premium digital agency offering design, web development, app development, and training",
              "url": "https://theodundesign.com",
              "areaServed": ["NG", "UK", "US"],
              "serviceType": ["Graphic Design", "Web Development", "App Development", "Training"]
            })
          }}
        />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal" style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(14, 165, 168, 0.08))',
          borderRadius: '24px',
          padding: '80px 40px',
          marginBottom: '80px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <motion.p 
            className="hero-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '0.95rem',
              fontWeight: '700',
              letterSpacing: '0.05em',
              marginBottom: '16px'
            }}
          >
            ✨ COMPANY OVERVIEW
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              marginBottom: '24px',
              maxWidth: '800px'
            }}
          >
            The Odun Design delivers premium digital products that grow businesses.
          </motion.h1>

          <motion.p 
            className="hero-copy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: '1.8',
              maxWidth: '700px',
              marginBottom: '32px'
            }}
          >
            We merge branding, product design, and modern web technology to create elegant, high-performing digital experiences for startups, agencies, and established businesses.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link legacyBehavior href="/contact">
                <a className="btn btn-primary">Contact our team →</a>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link legacyBehavior href="/order">
                <a className="btn btn-secondary">Start an order</a>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="premium-section reveal" style={{ marginBottom: '80px' }}>
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Who we are</h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>The Odun Design is a premium digital studio focused on high-quality branding, websites, apps, and online training.</p>
          </motion.div>

          <div className="feature-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: 'Design-led thinking', desc: 'We shape every product with brand clarity, visual polish, and user-first experiences that feel effortless.' },
              { title: 'Strategic execution', desc: 'Every project starts with goals, audience insights, and a technical plan for sustainable growth.' },
              { title: 'Premium delivery', desc: 'From discovery to launch, our process is designed for quality, speed, and long-term client success.' }
            ].map((item, idx) => (
              <motion.article 
                key={idx}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '32px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '12px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-meta">
            <span className="section-label">What we do</span>
            <h2>Premium services for brands that want to stand out.</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-number">Brand Strategy</span>
              <p>Identity systems, positioning, and digital storytelling that strengthen trust and conversion.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Web Design</span>
              <p>Clean, responsive websites built for fast performance and polished brand presence.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">App Experiences</span>
              <p>Modern web apps and mobile builds with intuitive interfaces and seamless workflows.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Training</span>
              <p>Practical digital training for teams on branding, development, and growth tools.</p>
            </div>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-split">
            <div>
              <div className="section-label">Mission & Vision</div>
              <h2>We create digital products that look premium and perform reliably.</h2>
              <p>Our mission is to help businesses grow with modern technology and quality delivery. Our vision is to become one of Africa’s leading digital agencies by delivering results-driven designs and accessible development.</p>
            </div>
            <div className="illustration-card">
              <div className="illustration-dot" />
              <div className="illustration-bar" />
              <p>Premium design, clean interfaces, fast loading pages, and scalable technology are the foundation of every solution we deliver.</p>
            </div>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Why businesses choose The Odun Design</h2>
            <p>Clients appreciate our speed, professionalism, and polished results.</p>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-number">Premium Quality</span>
              <p>Beautiful interfaces built with attention to detail and brand consistency.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Fast Delivery</span>
              <p>Reliable project timelines and responsive collaboration from day one.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Secure Development</span>
              <p>Modern architecture, Firebase expertise, and performance-focused build practices.</p>
            </div>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-meta">
            <span className="section-label">Milestones</span>
            <h2>Trusted by modern brands across Nigeria and beyond.</h2>
          </div>
          <div className="timeline-grid">
            <article className="timeline-step">
              <strong>2018</strong>
              <p>Founded with a mission to deliver beautiful, functional digital products.</p>
            </article>
            <article className="timeline-step">
              <strong>2020</strong>
              <p>Expanded service offerings to include apps, SEO, and Firebase-powered experiences.</p>
            </article>
            <article className="timeline-step">
              <strong>2023</strong>
              <p>Launched premium training programs and delivered dozens of high-value client projects.</p>
            </article>
            <article className="timeline-step">
              <strong>2026</strong>
              <p>Continuing to grow as a premium digital partner for businesses seeking growth and design excellence.</p>
            </article>
          </div>
        </section>

        <section className="premium-cta reveal">
          <div>
            <h2>Ready to build modern digital experiences?</h2>
            <p>Whether you need a website, app, brand refresh, or training, The Odun Design delivers premium work with care.</p>
          </div>
          <div className="hero-actions">
            <Link legacyBehavior href="/contact"><a className="btn btn-primary">Talk with us</a></Link>
            <Link legacyBehavior href="/order"><a className="btn btn-secondary">Book a project</a></Link>
          </div>
        </section>
      </main>
    </>
  )
}
