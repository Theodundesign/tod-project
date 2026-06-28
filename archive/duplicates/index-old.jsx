import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

const STATS = [
  { value: '98%', label: 'Client satisfaction' },
  { value: '24/7', label: 'Support & delivery' },
  { value: '150+', label: 'Projects completed' },
  { value: '12', label: 'Years of experience' }
]

const SERVICE_CATEGORIES = [
  { id: 'graphic-design', icon: '🎨', title: 'Graphic Design', description: 'Branding, marketing assets, and visual systems that feel premium.' },
  { id: 'web-development', icon: '🌐', title: 'Web Development', description: 'Websites and portals built for conversion, speed, and scale.' },
  { id: 'app-development', icon: '📱', title: 'App Development', description: 'Mobile and cross-platform apps with dashboard and API integrations.' },
  { id: 'training', icon: '📚', title: 'Training', description: 'Workshops and coaching for design, development, and AI productivity.' }
]

const PARTNERS = ['Odun Labs', 'Nexa', 'Stellar', 'Venture+', 'Atlas']

const PORTFOLIO = [
  { title: 'Launch campaign', subtitle: 'Landing page and visual narrative for a premium service brand.', icon: '🚀' },
  { title: 'Client portal', subtitle: 'Secure order tracking, file delivery, and project collaboration.', icon: '📊' },
  { title: 'Training hub', subtitle: 'Workshop experience for product and design teams.', icon: '🎓' }
]

const TESTIMONIALS = [
  { name: 'Amina T.', role: 'Founder', quote: 'The platform feels premium, simple, and powerful. Every step of the order process was clear.' },
  { name: 'Kelvin O.', role: 'Operations Lead', quote: 'Managing project requests is now easy — the dashboard keeps everything in one place.' },
  { name: 'Sade J.', role: 'Creative Director', quote: 'The team delivered a stylish solution with excellent communication and strong execution.' }
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
        <title>Odun Creative — Premium business platform</title>
        <meta name="description" content="Premium digital services, client ordering, and dashboard workflows for design, web, app, and training projects." />
        <meta property="og:title" content="Odun Creative — Premium business platform" />
        <meta property="og:description" content="A premium dark-themed platform for ordering services, managing projects, and tracking delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="hero container hero-home">
        <div className="hero-copy">
          <span className="tag">Business platform</span>
          <h1>Build premium digital products and manage client work with confidence.</h1>
          <p className="lead">A polished dark-themed platform for ordering design, web, app and training services while keeping every project on track.</p>
          <div className="hero-buttons">
            <Link legacyBehavior href="/services"><a className="primary-btn">Explore services</a></Link>
            <Link legacyBehavior href="/order"><a className="secondary-btn">Start an order</a></Link>
          </div>
          <div className="stat-grid">
            {STATS.map(item => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-preview">
          <div className="mockup-card hero-panel">
            <div className="hero-panel-header">
              <span>Client orders</span>
              <strong>4 active projects</strong>
            </div>
            <div className="hero-panel-body">
              <div className="hero-panel-row">
                <span>Design system refresh</span>
                <strong>In progress</strong>
              </div>
              <div className="hero-panel-row">
                <span>Website launch</span>
                <strong>Payment pending</strong>
              </div>
              <div className="hero-panel-row muted">
                <span>Training workshop</span>
                <strong>Confirmed</strong>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="container logos-section">
        <div className="section-title">
          <h2>Trusted by ambitious teams</h2>
          <p>Modern businesses choose a seamless ordering and delivery experience.</p>
        </div>
        <div className="client-logos">
          {PARTNERS.map(logo => (
            <span key={logo} className="logo-chip">{logo}</span>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Services at a glance</h2>
          <p>Choose the right category and place your order in a few simple steps.</p>
        </div>
        <div className="category-grid">
          {SERVICE_CATEGORIES.map(category => (
            <div key={category.id} className="category-card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <Link legacyBehavior href={`/services#${category.id}`}><a className="service-cta">View services</a></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Portfolio preview</h2>
          <p>Premium work designed to feel elegant, polished and easy to manage.</p>
        </div>
        <div className="portfolio-grid">
          {PORTFOLIO.map(item => (
            <div key={item.title} className="portfolio-card">
              <div className="portfolio-meta">
                <strong>{item.title}</strong>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>What clients say</h2>
          <p>Real feedback from teams using the platform every day.</p>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map(item => (
            <div key={item.name} className="testimonial-card">
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>FAQ</h2>
          <p>Answers to common questions about orders, accounts, and payments.</p>
        </div>
        <div className="faq-grid">
          {FAQ.map(item => (
            <div key={item.question} className="service-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container cta">
        <div className="cta-card">
          <h3>Ready to launch your project?</h3>
          <p>Choose a service, share your brief, and complete payment securely through Paystack.</p>
          <div className="cta-actions">
            <Link legacyBehavior href="/order"><a className="primary-btn">Start an order</a></Link>
            <Link legacyBehavior href="/dashboard"><a className="secondary-btn">View dashboard</a></Link>
          </div>
        </div>
      </section>
    </>
  )
}
