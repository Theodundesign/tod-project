import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

const SERVICE_CATEGORIES = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    subtitle: 'Visual systems, brand identity, and marketing assets for bold brands.',
    services: [
      { id: 'flyer-design', title: 'Flyer Design' },
      { id: 'poster-design', title: 'Poster Design' },
      { id: 'banner-design', title: 'Banner Design' },
      { id: 'social-media-design', title: 'Social Media Design' },
      { id: 'logo-design', title: 'Logo Design' },
      { id: 'brand-identity', title: 'Brand Identity' },
      { id: 'business-card', title: 'Business Card' },
      { id: 'brochure', title: 'Brochure' },
      { id: 'packaging-design', title: 'Packaging Design' }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Sites and portals built to convert, scale, and perform.',
    services: [
      { id: 'landing-pages', title: 'Landing Pages' },
      { id: 'business-website', title: 'Business Website' },
      { id: 'ecommerce-website', title: 'Ecommerce Website' },
      { id: 'portfolio-website', title: 'Portfolio Website' },
      { id: 'school-portal', title: 'School Portal' },
      { id: 'church-website', title: 'Church Website' },
      { id: 'ngo-website', title: 'NGO Website' },
      { id: 'real-estate-website', title: 'Real Estate Website' },
      { id: 'cms', title: 'CMS' },
      { id: 'seo', title: 'SEO' },
      { id: 'website-maintenance', title: 'Website Maintenance' }
    ]
  },
  {
    id: 'app-development',
    title: 'App Development',
    subtitle: 'Mobile and cross-platform apps with backend systems and dashboards.',
    services: [
      { id: 'android-apps', title: 'Android Apps' },
      { id: 'ios-apps', title: 'iOS Apps' },
      { id: 'cross-platform-apps', title: 'Cross-platform Apps' },
      { id: 'admin-dashboard', title: 'Admin Dashboard' },
      { id: 'api-integration', title: 'API Integration' }
    ]
  },
  {
    id: 'training',
    title: 'Training',
    subtitle: 'Skill-building sessions for modern design and development teams.',
    services: [
      { id: 'training-graphic-design', title: 'Graphic Design' },
      { id: 'training-website-development', title: 'Website Development' },
      { id: 'training-app-development', title: 'App Development' },
      { id: 'training-ui-ux', title: 'UI/UX' },
      { id: 'training-ai-productivity', title: 'AI Productivity' },
      { id: 'training-freelancing', title: 'Freelancing' }
    ]
  }
]

export default function Services(){
  return (
    <>
      <Head>
        <title>Services | Odun Creative</title>
        <meta name="description" content="Browse premium design, web, app, and training service categories from Odun Creative." />
      </Head>
      <main className="container">
        <section className="section-title">
          <h2>Services</h2>
          <p>Choose the right service category, then place an order with a clear brief and package.
          </p>
        </section>
        {SERVICE_CATEGORIES.map(category => (
          <section key={category.id} className="service-category" id={category.id}>
            <div className="category-header">
              <div>
                <p className="category-label">{category.title}</p>
                <h3>{category.subtitle}</h3>
              </div>
              <Link legacyBehavior href={`/order?category=${category.id}`}><a className="secondary-btn">Order from {category.title}</a></Link>
            </div>
            <div className="service-list">
              {category.services.map(service => (
                <div key={service.id} className="service-card">
                  <div>
                    <h3>{service.title}</h3>
                  </div>
                  <Link legacyBehavior href={`/order?service=${service.id}&category=${category.id}`}><a className="service-cta">Order now</a></Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
