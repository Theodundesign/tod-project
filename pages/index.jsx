import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import Counter from '../components/ui/Counter'
import { SITE_URL } from '../lib/site'

const STATS = [
  { value: '98%', label: 'Client satisfaction' },
  { value: '24/7', label: 'Support & delivery' },
  { value: '150+', label: 'Projects completed' },
  { value: '12', label: 'Years of experience' }
]

const SERVICE_CATEGORIES = [
  { id: 'graphic-design', icon: '🎨', title: 'Graphic Design', description: 'Branding, marketing assets, and visual systems that feel premium.', services: 9, price: '₦15,000', illustration: '🌈' },
  { id: 'web-development', icon: '</>', title: 'Web Development', description: 'Websites and portals built for conversion, speed, and scale.', services: 11, price: '₦35,000', illustration: '⚡' },
  { id: 'app-development', icon: '📱', title: 'App Development', description: 'Mobile and cross-platform apps with dashboard and API integrations.', services: 6, price: '₦45,000', illustration: '🚀' },
  { id: 'training', icon: '🎓', title: 'Training', description: 'Workshops and coaching for design, development, and AI productivity.', services: 6, price: '₦12,000', illustration: '💡' }
]

const PARTNERS = ['Odun Labs', 'Nexa', 'Stellar', 'Venture+', 'Atlas']

const PORTFOLIO = [
  { title: 'Launch Campaign', category: 'Landing Page', client: 'Nexa', description: 'A premium campaign site built for conversions and visual storytelling.', icon: '🚀' },
  { title: 'Client Portal', category: 'Dashboard', client: 'Atlas', description: 'Secure project management and delivery experience for clients.', icon: '📊' },
  { title: 'Restaurant Experience', category: 'Restaurant Website', client: 'Savory', description: 'A rich visual menu and reservation flow for modern dining brands.', icon: '🍽️' },
  { title: 'School Network', category: 'School Website', client: 'Bright Academy', description: 'A modern school platform for admissions, courses, and campus events.', icon: '🎒' },
  { title: 'Brand Refresh', category: 'Brand Identity', client: 'Luna Labs', description: 'Full visual identity and marketing system for a creative studio.', icon: '🎯' },
  { title: 'Mobile Dashboard', category: 'Admin App', client: 'Stellar', description: 'A responsive mobile dashboard for real-time business operations.', icon: '📱' }
]

const TESTIMONIALS = [
  { name: 'Amina T.', company: 'Studio Nova', role: 'Founder', quote: 'The platform feels premium, simple, and powerful. Every step of the order process was clear.' },
  { name: 'Kelvin O.', company: 'MarketGrid', role: 'Operations Lead', quote: 'Managing project requests is now easy — the dashboard keeps everything in one place.' },
  { name: 'Sade J.', company: 'Luna Labs', role: 'Creative Director', quote: 'The team delivered a stylish solution with excellent communication and strong execution.' }
]

const FAQ = [
  { question: 'Can I place an order without an account?', answer: 'You can browse services first, but submitting an order requires login for secure project tracking.' },
  { question: 'What happens after I submit a brief?', answer: 'Your request is stored securely and you can follow progress directly from your dashboard.' },
  { question: 'How does payment work?', answer: 'Payment is completed through secure Paystack checkout and order status updates automatically once verified.' },
  { question: 'What is your typical turnaround time?', answer: 'Timelines vary by project type. Most projects are delivered within 2-8 weeks. Express options available.' },
  { question: 'Do you offer revisions?', answer: 'Yes. Revision rounds are included based on your selected package.' },
  { question: 'How secure is my project data?', answer: 'All projects use industry-standard encryption. Your data is stored securely in Firestore.' }
]

export default function Home(){
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>The Odun Design — Premium Digital Solutions for Brands</title>
        <meta name="description" content="Premium digital agency offering design, web development, app development, and training. Premium dark-themed platform for ordering services and managing projects." />
        <meta name="keywords" content="digital design, web development, app development, branding, training, premium agency" />
        <meta name="author" content="The Odun Design" />
        <meta property="og:title" content="The Odun Design — Premium Digital Solutions" />
        <meta property="og:description" content="Order premium design, web, app, and training services with real-time project tracking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Odun Design — Premium Digital Solutions" />
        <meta name="twitter:description" content="Order premium design, web, app, and training services" />
        <meta name="twitter:image" content="/assets/og-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0b0b0d" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Odun Design",
              "description": "Premium digital agency for design, web development, app development, and training",
              "url": "https://theodundesign.com",
              "logo": "https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/theodundesign-e1782575369588.png",
              "sameAs": [
                "https://linkedin.com/company/theodundesign",
                "https://instagram.com/theodundesign"
              ],
              "contact": {
                "@type": "ContactPoint",
                "telephone": "+234-816-019-1823",
                "contactType": "Customer Support"
              }
            })
          }}
        />
      </Head>

      <main>
        {/* Hero Section - Premium Redesign */}
        <section className="hero-section container premium-page reveal" style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(14, 165, 168, 0.08))',
          borderRadius: '24px',
          marginBottom: '80px'
        }}>
          <ScrollReveal />
          <div className="hero-floating"><div className="shape shape-a"></div><div className="shape shape-b"></div></div>
          
          <motion.div 
            className="hero-content reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="hero-tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
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
              ✨ PREMIUM DIGITAL SOLUTIONS
            </motion.div>

            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '900',
                lineHeight: '1.2',
                marginBottom: '24px',
                maxWidth: '900px',
                background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Design &amp; build premium digital products with confidence
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: '1.8',
                marginBottom: '40px',
                maxWidth: '650px'
              }}
            >
              A polished dark-themed platform for ordering design, web, app and training services while keeping every project on track and delivering results that matter.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div 
              className="hero-ctas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '60px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link legacyBehavior href="/services">
                  <a className="btn btn-primary" style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '14px 32px'
                  }}>
                    Explore Services →
                  </a>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link legacyBehavior href="/order">
                  <a className="btn btn-secondary" style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '14px 32px'
                  }}>
                    Start an Order
                  </a>
                </Link>
              </motion.div>

              <motion.a 
                href="#portfolio"
                style={{
                  color: '#6EE7F7',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem'
                }}
                whileHover={{ x: 4 }}
              >
                View work ↓
              </motion.a>
            </motion.div>

            {/* Animated Stats Section */}
            <motion.div 
              className="hero-stats reveal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '32px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {STATS.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className="stat-item"
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ textAlign: 'left' }}
                >
                  <div className="stat-value" style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px'
                  }}>
                    <Counter value={parseInt(stat.value) || 0} format={(n)=> stat.value.includes('%') ? `${n}%` : stat.value.includes('+') ? `${n}+` : n } />
                  </div>
                  <div className="stat-label" style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Preview Panel */}
          <motion.div 
            className="hero-visual reveal"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ marginTop: '60px' }}
          >
            <div className="hero-panel" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(8px)'
            }}>
              <div className="panel-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div className="panel-title" style={{
                  fontSize: '1rem',
                  fontWeight: '700'
                }}>Active Projects</div>
                <div className="panel-badge" style={{
                  background: 'rgba(110, 231, 247, 0.15)',
                  color: '#6EE7F7',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>4 active</div>
              </div>
              <div className="panel-items" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Design system refresh', status: 'In progress' },
                  { name: 'Website launch', status: 'Payment pending' },
                  { name: 'Training workshop', status: 'Confirmed' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="panel-item"
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: idx < 2 ? '1px solid rgba(255, 255, 255, 0.03)' : 'none'
                    }}
                  >
                    <div className="item-name" style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                      {item.name}
                    </div>
                    <div className="item-status" style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: idx === 0 ? '#6EE7F7' : idx === 1 ? '#FFA500' : '#22C55E',
                      background: idx === 0 ? 'rgba(110, 231, 247, 0.1)' : idx === 1 ? 'rgba(255, 165, 0, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}>
                      {item.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trusted Partners Section */}
        <section className="partners-section container">
          <div className="section-header">
            <h2>Trusted by ambitious teams</h2>
            <p>Modern businesses choose a seamless ordering and delivery experience.</p>
          </div>
          <div className="partners-grid">
            {PARTNERS.map((logo, idx) => (
              <div key={idx} className="partner-logo">{logo}</div>
            ))}
          </div>
        </section>

        {/* About Preview Section */}
        <section className="about-preview-section container">
          <div className="about-preview-card">
            <div className="about-preview-badge">The Odun Design (TOD)</div>
            <h2>Premium digital design & development for ambitious brands.</h2>
            <p>We build polished identities, modern websites, mobile experiences and scalable training products — designed to elevate brands and convert audiences.</p>
            <div className="about-preview-grid">
              <div>
                <strong>12 years</strong>
                <span>Design & development experience</span>
              </div>
              <div>
                <strong>150+</strong>
                <span>Projects delivered to high-paying clients</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Client satisfaction across every delivery</span>
              </div>
            </div>
            <div className="about-preview-actions">
              <Link legacyBehavior href="/about"><a className="btn btn-primary">Learn the story</a></Link>
              <Link legacyBehavior href="/order"><a className="btn btn-secondary">Start your project</a></Link>
            </div>
          </div>
        </section>

        {/* Service Categories Section - Premium */}
        <section className="services-section container" style={{ marginBottom: '100px' }}>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Services at a glance</h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Choose the right category and place your order in a few simple steps.</p>
          </motion.div>

          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {SERVICE_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, borderColor: '#6EE7F7' }}
              >
                <Link legacyBehavior href={`/services#${category.id}`}>
                  <a className="service-category-card" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '32px 24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    backdropFilter: 'blur(8px)'
                  }}>
                    <div className="category-card-top" style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '20px',
                      alignItems: 'flex-start'
                    }}>
                      <div className="category-icon" style={{
                        fontSize: '2.5rem',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          marginBottom: '8px'
                        }}>
                          {category.title}
                        </h3>
                        <span className="category-meta" style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          display: 'block'
                        }}>
                          {category.services} services · starts at {category.price}
                        </span>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {category.description}
                    </p>

                    <div className="category-footer" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      color: '#6EE7F7',
                      fontWeight: '600',
                      fontSize: '0.95rem'
                    }}>
                      <span className="category-symbol" style={{ fontSize: '1.8rem' }}>
                        {category.illustration}
                      </span>
                      <span className="category-cta">View Services →</span>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Section - Premium */}
        <section className="portfolio-section container" id="portfolio" style={{ marginBottom: '100px' }}>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Portfolio preview</h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Premium work designed to feel elegant, polished and easy to manage.</p>
          </motion.div>

          <div className="portfolio-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {PORTFOLIO.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="portfolio-item"
                style={{
                  padding: '32px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem' }}>
                  {item.icon}
                </div>

                <div className="portfolio-content">
                  <div className="portfolio-tag" style={{
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: 'rgba(110, 231, 247, 0.15)',
                    color: '#6EE7F7',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    letterSpacing: '0.05em'
                  }}>
                    {item.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>

                <div className="portfolio-meta-row" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  marginTop: 'auto'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#6EE7F7'
                  }}>
                    {item.client}
                  </span>
                  <motion.button 
                    type="button"
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontSize: '0.9rem',
                      padding: '10px 20px'
                    }}
                  >
                    View Project →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section - Premium */}
        <section className="testimonials-section container" style={{ marginBottom: '100px' }}>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>What clients say</h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Real feedback from teams using the platform every day.</p>
          </motion.div>

          <div className="testimonials-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="testimonial-card"
                style={{
                  padding: '32px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="testimonial-top" style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <div className="testimonial-avatar" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    flexShrink: 0
                  }}>
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>
                      {item.name}
                    </strong>
                    <span style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      {item.company}
                    </span>
                  </div>
                </div>

                <div className="testimonial-stars" style={{
                  fontSize: '1.1rem',
                  color: '#FFD700',
                  letterSpacing: '2px'
                }}>
                  ★★★★★
                </div>

                <p className="testimonial-quote" style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  borderLeft: '3px solid #6EE7F7',
                  paddingLeft: '16px'
                }}>
                  &quot;{item.quote}&quot;
                </p>

                <div className="testimonial-role" style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#6EE7F7',
                  marginTop: 'auto'
                }}>
                  {item.role}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="choose-section container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '12px', background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Why choose TOD</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>Every project is built with premium polish, reliable timelines, and business-focused performance.</p>
          </div>
          <div className="choose-grid">
            <div className="choose-card">
              <strong>Fast Delivery</strong>
              <p>Priority turnaround with clear milestones and daily progress updates.</p>
            </div>
            <div className="choose-card">
              <strong>Premium Design</strong>
              <p>Scaled visuals, refined interfaces, and brand systems designed for high-end clients.</p>
            </div>
            <div className="choose-card">
              <strong>Business Focus</strong>
              <p>Every deliverable is optimized for sales, conversions, and strategic impact.</p>
            </div>
            <div className="choose-card">
              <strong>Secure Workflow</strong>
              <p>Built with secure client delivery, clear communication, and professional handoff.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '12px', background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.9))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Frequently asked questions</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>Answers to common questions about orders, accounts, and payments.</p>
          </div>
          <div className="faq-accordion">
            {FAQ.map((item, idx) => {
              const answerId = `faq-answer-${idx}`
              const buttonId = `faq-question-${idx}`
              return (
                <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                  <button
                    id={buttonId}
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaqIndex === idx}
                    aria-controls={answerId}
                  >
                    <span>{item.question}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-answer"
                    aria-hidden={openFaqIndex !== idx}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section container">
          <div className="cta-card">
            <h2>Ready to launch your project?</h2>
            <p>Choose a service, share your brief, and complete payment securely through Paystack.</p>
            <div className="cta-buttons">
              <Link legacyBehavior href="/order">
                <a className="btn btn-primary">Start an Order</a>
              </Link>
              <Link legacyBehavior href="/dashboard">
                <a className="btn btn-secondary">View Dashboard</a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
