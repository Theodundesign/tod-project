import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | The Odun Design</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '24px',
        background: 'var(--bg)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ fontSize: '120px', marginBottom: '24px' }}
          >
            🔍
          </motion.div>

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            404
          </h1>

          <p style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#e6eef8'
          }}>
            Page Not Found
          </p>

          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            The page you&apos;re looking for has been moved or doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link legacyBehavior href="/">
              <a className="btn btn-primary" style={{ display: 'inline-flex' }}>
                ← Back to Home
              </a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a className="btn btn-secondary" style={{ display: 'inline-flex' }}>
                Contact Us →
              </a>
            </Link>
          </div>

          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: 'var(--card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '12px'
            }}>
              Quick links:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '12px'
            }}>
              <Link legacyBehavior href="/about">
                <a style={{ color: '#6EE7F7', textDecoration: 'none', fontWeight: '600' }}>
                  About
                </a>
              </Link>
              <Link legacyBehavior href="/services">
                <a style={{ color: '#6EE7F7', textDecoration: 'none', fontWeight: '600' }}>
                  Services
                </a>
              </Link>
              <Link legacyBehavior href="/portfolio">
                <a style={{ color: '#6EE7F7', textDecoration: 'none', fontWeight: '600' }}>
                  Portfolio
                </a>
              </Link>
              <Link legacyBehavior href="/order">
                <a style={{ color: '#6EE7F7', textDecoration: 'none', fontWeight: '600' }}>
                  Order
                </a>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
