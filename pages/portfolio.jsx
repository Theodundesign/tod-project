import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from '../lib/portfolio'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS
    return PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Head>
        <title>Portfolio | The Odun Design</title>
        <meta name="description" content="Explore The Odun Design portfolio featuring premium digital work in design, web development, app development, and SEO." />
        <meta property="og:title" content="Portfolio | The Odun Design" />
        <meta property="og:description" content="Award-winning projects and case studies from The Odun Design." />
      </Head>
      <main className="container">
        <section className="section-header" style={{ marginBottom: '60px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '12px', background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Portfolio
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              Award-level work across design, development, and digital solutions. Each project demonstrates our commitment to excellence and measurable business impact.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
          {PORTFOLIO_CATEGORIES.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="btn"
              style={{
                background: activeCategory === category ? 'linear-gradient(135deg, #6D28D9, #0ea5a8)' : 'transparent',
                border: activeCategory === category ? 'none' : '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.32, delay: index * 0.05 }}
                className="portfolio-card"
                style={{
                  background: 'var(--card)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--shadow-soft)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  transition: 'all var(--transition-medium)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                whileHover={{ transform: 'translateY(-8px)', boxShadow: '0 24px 60px rgba(2,6,23,0.6)' }}
              >
                <Link legacyBehavior href={`/portfolio/${project.slug}`}>
                  <a aria-label={`View project ${project.title}`} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
                </Link>
                <div style={{ position: 'relative', paddingBottom: '66.66%', overflow: 'hidden' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.06)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.7))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px'
                  }}>
                    <span style={{
                      background: 'rgba(110, 231, 247, 0.15)',
                      color: '#6EE7F7',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(109, 40, 217, 0.2)',
                        color: '#6D28D9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    paddingTop: '16px',
                    borderTop: '1px solid var(--glass-border)',
                    fontSize: '0.9rem',
                    color: '#6EE7F7'
                  }}>
                    <strong>Results:</strong>
                    <ul style={{ marginTop: '8px', listStyle: 'none', padding: 0 }}>
                      {project.results.map((result, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>✓ {result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 168, 0.1))',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '60px 24px',
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '16px' }}>
            Ready to start your next project?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Let&apos;s discuss how The Odun Design can help bring your vision to life with award-level creative solutions.
          </p>
          <Link legacyBehavior href="/order">
            <a className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Start an Order →
            </a>
          </Link>
        </section>
      </main>
    </>
  )
}
