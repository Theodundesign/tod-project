import Head from 'next/head'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AboutVision(){
  return (
    <>
      <Head>
        <title>Vision – The Odun Design</title>
        <meta name="description" content="The Odun Design's vision is to become one of Africa's leading digital agencies with premium design and modern web technology." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal">
          <p className="hero-badge">Vision</p>
          <h1>A future where premium design and modern web technology drive growth for African brands.</h1>
          <p className="hero-copy">The Odun Design is focused on becoming one of Africa’s leading digital agencies by creating innovative, high-quality digital experiences.</p>
        </section>

        <section className="premium-section reveal">
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Leading digital agencies</h3>
              <p>We aim to set the standard for premium design and modern technology in the region.</p>
            </article>
            <article className="feature-card">
              <h3>Premium design</h3>
              <p>Beautiful, polished interfaces are central to every website, app, and brand asset we create.</p>
            </article>
            <article className="feature-card">
              <h3>Modern web technology</h3>
              <p>We use performant frameworks, Firebase solutions, and responsive implementations.</p>
            </article>
            <article className="feature-card">
              <h3>Innovation</h3>
              <p>Our workflows are built around new tools, clean systems, and strategic digital thinking.</p>
            </article>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-meta">
            <span className="section-label">Growth focus</span>
            <h2>Design that makes brands feel confident and digital products that perform.</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-number">Business growth</span>
              <p>We focus on measurable outcomes that support conversions and lasting brand visibility.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Scalable systems</span>
              <p>Every project is built to expand, update, and adapt as client ambitions grow.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
