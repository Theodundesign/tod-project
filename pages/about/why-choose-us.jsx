import Head from 'next/head'
import ScrollReveal from '../../components/ui/ScrollReveal'

const FEATURES = [
  'Premium Quality',
  'Fast Delivery',
  'Professional Support',
  'Creative Thinking',
  'Affordable Pricing',
  'Secure Development',
  'Firebase Expertise',
  'Modern UI/UX',
  'SEO Friendly',
  'Mobile Responsive'
]

export default function AboutWhyChooseUs(){
  return (
    <>
      <Head>
        <title>Why Choose The Odun Design</title>
        <meta name="description" content="Discover why The Odun Design is the right choice for premium quality, fast delivery, and modern digital solutions." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal">
          <p className="hero-badge">Why Choose The Odun Design</p>
          <h1>Choose a partner that delivers premium quality and dependable digital execution.</h1>
          <p className="hero-copy">From secure Firebase solutions to polished user interfaces, The Odun Design combines speed, expertise, and creative thinking.</p>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Our core advantages</h2>
            <p>Trusted by brands seeking modern digital delivery with clarity and confidence.</p>
          </div>
          <div className="feature-grid feature-grid-2">
            {FEATURES.map((feature) => (
              <article key={feature} className="feature-card feature-card-compact">
                <h3>{feature}</h3>
                <p>Professional service designed to give your business a modern digital edge.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
