import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:'', subject: ''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(form)
      })
      if(res.ok) {
        setSent(true)
        setForm({name:'', email:'', message:'', subject: ''})
        setTimeout(() => setSent(false), 5000)
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch(e) {
      console.error(e)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact | The Odun Design</title>
        <meta name="description" content="Get in touch with The Odun Design to discuss your project, service request, or training needs." />
        <meta property="og:title" content="Contact | The Odun Design" />
        <meta property="og:description" content="Connect with The Odun Design for inquiries and project discussions." />
      </Head>
      <main>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 168, 0.1))',
          padding: '80px 24px',
          marginBottom: '60px',
          borderBottom: '1px solid var(--glass-border)'
        }} className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Let&apos;s Connect
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
              Have a project in mind? Send us your inquiry and we&apos;ll get back to you within 24 hours with next steps.
            </p>
          </div>
        </section>

        <section className="container" style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📧</div>
              <h3 style={{ marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700' }}>Email</h3>
              <a href="mailto:theodundesign@gmail.com" style={{ color: '#6EE7F7', textDecoration: 'none' }}>
                theodundesign@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📱</div>
              <h3 style={{ marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700' }}>Phone</h3>
              <a href="tel:+2348160191823" style={{ color: '#6EE7F7', textDecoration: 'none' }}>
                +234 816 019 1823
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📍</div>
              <h3 style={{ marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700' }}>Location</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Ado Ekiti, Ekiti State<br />Nigeria
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.6rem', fontWeight: '700' }}>Send us a message</h2>

            {sent && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#22c55e',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                ✓ Thanks! We&apos;ve received your message and will respond shortly.
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#ef4444'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handle} style={{ display: sent ? 'none' : 'block' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Name</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      color: 'inherit',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = '#6EE7F7'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      color: 'inherit',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = '#6EE7F7'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Subject</label>
                <input
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'inherit',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#6EE7F7'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us about your project, ideas, or questions..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'inherit',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#6EE7F7'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.15), rgba(14, 165, 168, 0.15))',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '60px 24px',
          textAlign: 'center',
          marginBottom: '60px'
        }} className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '16px' }}>
            Not ready to inquire yet?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Explore our services, check out portfolio examples, or start placing an order directly.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link legacyBehavior href="/services">
              <a className="btn btn-secondary">View Services</a>
            </Link>
            <Link legacyBehavior href="/order">
              <a className="btn btn-primary">Start an Order</a>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

