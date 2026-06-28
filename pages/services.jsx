import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SERVICE_CATEGORIES = [
  {
    id: 'graphic-design',
    icon: '🎨',
    title: 'Graphic Design',
    subtitle: 'Visual systems, brand identity, and marketing assets for bold brands.',
    color: 'from-purple-500 to-pink-500',
    services: [
      { id: 'flyer-design', title: 'Flyer Design', desc: 'Eye-catching promotional flyers', price: '₦15,000' },
      { id: 'poster-design', title: 'Poster Design', desc: 'Large format design for impact', price: '₦20,000' },
      { id: 'banner-design', title: 'Banner Design', desc: 'Web and print banners', price: '₦12,000' },
      { id: 'social-media-design', title: 'Social Media Design', desc: 'Graphics optimized for social', price: '₦10,000' },
      { id: 'logo-design', title: 'Logo Design', desc: 'Memorable brand marks', price: '₦50,000' },
      { id: 'brand-identity', title: 'Brand Identity', desc: 'Complete brand systems', price: '₦150,000' },
      { id: 'business-card', title: 'Business Card', desc: 'Premium card designs', price: '₦8,000' },
      { id: 'brochure', title: 'Brochure', desc: 'Professional marketing materials', price: '₦35,000' },
      { id: 'packaging-design', title: 'Packaging Design', desc: 'Product packaging design', price: '₦45,000' }
    ]
  },
  {
    id: 'web-development',
    icon: '</>',
    title: 'Web Development',
    subtitle: 'Sites and portals built to convert, scale, and perform.',
    color: 'from-blue-500 to-cyan-500',
    services: [
      { id: 'landing-pages', title: 'Landing Pages', desc: 'High-converting landing pages', price: '₦80,000' },
      { id: 'business-website', title: 'Business Website', desc: 'Professional business sites', price: '₦200,000' },
      { id: 'ecommerce-website', title: 'E-Commerce Website', desc: 'Online stores and marketplaces', price: '₦350,000' },
      { id: 'portfolio-website', title: 'Portfolio Website', desc: 'Showcase your best work', price: '₦120,000' },
      { id: 'school-portal', title: 'School Portal', desc: 'Educational institution sites', price: '₦180,000' },
      { id: 'church-website', title: 'Church Website', desc: 'Faith community platforms', price: '₦100,000' },
      { id: 'ngo-website', title: 'NGO Website', desc: 'Non-profit organization sites', price: '₦150,000' },
      { id: 'real-estate-website', title: 'Real Estate Website', desc: 'Property showcase sites', price: '₦250,000' },
      { id: 'cms', title: 'CMS', desc: 'Content management systems', price: '₦300,000' },
      { id: 'seo', title: 'SEO Optimization', desc: 'Search engine optimization', price: '₦100,000' },
      { id: 'website-maintenance', title: 'Website Maintenance', desc: 'Ongoing site support', price: '₦50,000/mo' }
    ]
  },
  {
    id: 'app-development',
    icon: '📱',
    title: 'App Development',
    subtitle: 'Mobile and cross-platform apps with backend systems and dashboards.',
    color: 'from-green-500 to-emerald-500',
    services: [
      { id: 'android-apps', title: 'Android Apps', desc: 'Native Android applications', price: '₦500,000' },
      { id: 'ios-apps', title: 'iOS Apps', desc: 'Native iOS applications', price: '₦550,000' },
      { id: 'cross-platform-apps', title: 'Cross-Platform Apps', desc: 'Apps for multiple platforms', price: '₦750,000' },
      { id: 'admin-dashboard', title: 'Admin Dashboard', desc: 'Management interfaces', price: '₦200,000' },
      { id: 'api-integration', title: 'API Integration', desc: 'Backend integrations', price: '₦100,000' }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function Services(){
  return (
    <>
      <Head>
        <title>Services | The Odun Design</title>
        <meta name="description" content="Premium design, web development, app development, and training services from The Odun Design." />
        <meta property="og:title" content="Services | The Odun Design" />
        <meta property="og:description" content="Design, web, app development, and training services with transparent pricing." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        {/* Services Hero */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 168, 0.1))',
          padding: '80px 24px',
          marginBottom: '60px',
          borderBottom: '1px solid var(--glass-border)'
        }} className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Our Services
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', marginBottom: '32px' }}>
              Premium design, development, and training packages crafted for modern brands. Each service is tailored to deliver measurable results and exceed expectations.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link legacyBehavior href="/order">
                <a className="btn btn-primary">Start an Order</a>
              </Link>
              <Link legacyBehavior href="/">
                <a className="btn btn-secondary">Back to Home</a>
              </Link>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="container" style={{ marginBottom: '100px' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
            }}
          >
            {SERVICE_CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="category-card"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ transform: 'translateY(-12px)', boxShadow: '0 28px 80px rgba(2,6,23,0.65)' }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${category.color} 0%, transparent 100%)`,
                  opacity: 0.05,
                  pointerEvents: 'none'
                }} />
                
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                  {category.icon}
                </div>
                
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '12px'
                }}>
                  {category.title}
                </h2>
                
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>
                  {category.subtitle}
                </p>
                
                <Link legacyBehavior href={`/order?category=${category.id}`}>
                  <a className="btn btn-primary" style={{ display: 'inline-flex' }}>
                    Explore {category.title.split(' ')[0]} →
                  </a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Detailed Services */}
        {SERVICE_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} style={{
            marginBottom: '80px',
            scrollMarginTop: '100px'
          }} className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <div style={{ fontSize: '2.5rem' }}>{category.icon}</div>
              <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '8px' }}>
                  {category.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem' }}>
                  {category.subtitle}
                </p>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {category.services.map((service) => (
                <motion.a
                  key={service.id}
                  variants={itemVariants}
                  href={`/order?service=${service.id}&category=${category.id}`}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'all var(--transition-medium)',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 48px rgba(2,6,23,0.5)',
                    borderColor: '#6EE7F7'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem' }}>
                      {service.desc}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--glass-border)'
                  }}>
                    <span style={{ color: '#6EE7F7', fontWeight: '700' }}>
                      {service.price}
                    </span>
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </section>
        ))}

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.15), rgba(14, 165, 168, 0.15))',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '60px 24px',
          textAlign: 'center',
          marginBottom: '60px'
        }} className="container">
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '16px' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Browse our services, choose what you need, and start an order. Our team will handle the rest.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link legacyBehavior href="/order">
              <a className="btn btn-primary">Start an Order</a>
            </Link>
            <Link legacyBehavior href="/">
              <a className="btn btn-secondary">Back to Home</a>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
