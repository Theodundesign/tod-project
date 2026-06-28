import Head from 'next/head'
import Image from 'next/image'
import ScrollReveal from '../../components/ui/ScrollReveal'

const officialProfile = 'https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/Igbaoyinboprofile1.png'

export default function AboutFounder(){
  return (
    <>
      <Head>
        <title>Meet the Founder – The Odun Design</title>
        <meta name="description" content="Learn about Igbaoyinbo Odunayo, Founder and Creative Director of The Odun Design, and his premium digital vision." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal founder-hero">
          <div>
            <p className="hero-badge">Meet the Founder</p>
            <h1>Igbaoyinbo Odunayo — Founder and Creative Director of The Odun Design.</h1>
            <p className="hero-copy">Passionate about helping businesses build premium digital experiences with clean design, scalable technology, and excellent user experience.</p>
          </div>
          <div className="founder-card">
            <Image src={officialProfile} alt="Igbaoyinbo Odunayo" className="founder-photo" width={180} height={180} />
            <div>
              <h3>Igbaoyinbo Odunayo</h3>
              <p className="founder-role">CEO & Founder</p>
              <p className="founder-location">Ado Ekiti, Ekiti State, Nigeria</p>
            </div>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Biography</h2>
            <p>Igbaoyinbo leads The Odun Design with a vision for long-term digital partnerships and polished product experiences.</p>
          </div>
          <p className="section-copy">He founded The Odun Design to help businesses build premium digital solutions through branding, websites, web applications, mobile apps, UI/UX, Firebase, SEO, and training.</p>
        </section>

        <section className="premium-section reveal founder-grid">
          <article className="feature-card">
            <h3>Experience</h3>
            <p>Years of delivering modern web and mobile experiences to clients across Nigeria and international markets.</p>
            <ul>
              <li>Product design and branding</li>
              <li>Web and app development</li>
              <li>Firebase and SEO solutions</li>
            </ul>
          </article>
          <article className="feature-card">
            <h3>Core Skills</h3>
            <p>Design systems, scalable web architecture, user-centered workflows, and digital training.</p>
            <ul>
              <li>UI/UX design</li>
              <li>Graphic design</li>
              <li>React / Next.js / Firebase</li>
              <li>SEO and responsive build</li>
            </ul>
          </article>
        </section>

        <section className="premium-section reveal founder-grid">
          <article className="feature-card">
            <h3>Services</h3>
            <ul>
              <li>Branding & creative direction</li>
              <li>Web design and development</li>
              <li>Mobile applications</li>
              <li>Digital training and consulting</li>
            </ul>
          </article>
          <article className="feature-card">
            <h3>Personal Philosophy</h3>
            <p>Build products that are elegant, usable, and built for performance — with design systems that support growth.</p>
          </article>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Achievements</h2>
            <p>Recognized for premium delivery, clean design, and dependable client support.</p>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-number">10+ years</span>
              <p>Design and development experience across web and mobile products.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">100+ projects</span>
              <p>Delivered branding, websites, apps, and training for small and growing businesses.</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">Trusted partner</span>
              <p>Long-term client relationships focused on growth and outcomes.</p>
            </div>
          </div>
        </section>

        <section className="premium-section reveal">
          <div className="section-title">
            <h2>Professional Timeline</h2>
            <p>A concise timeline of the founder&apos;s professional milestones.</p>
          </div>
          <div className="timeline-grid">
            <div className="timeline-step">
              <strong>2014 — Early Career</strong>
              <p>Started building websites and small apps for local businesses, focusing on usability and clean design.</p>
            </div>
            <div className="timeline-step">
              <strong>2017 — Agency Clients</strong>
              <p>Expanded to agency-level projects and began delivering end-to-end brand and product work.</p>
            </div>
            <div className="timeline-step">
              <strong>2020 — Remote & Scale</strong>
              <p>Shifted to remote-first workflows, serving clients internationally and refining product processes.</p>
            </div>
            <div className="timeline-step">
              <strong>2023 — Training & Growth</strong>
              <p>Launched training programs to uplift teams and founders in modern web and design practices.</p>
            </div>
          </div>
        </section>

        <section className="premium-cta reveal">
          <div>
            <h2>Work with Igbaoyinbo and The Odun Design</h2>
            <p>Partner with a founder-led studio that values clean design, scalable development, and long-term business impact.</p>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="mailto:theodundesign@gmail.com">Email the founder</a>
            <a className="btn btn-secondary" href="tel:+2348160191823">Call / WhatsApp</a>
          </div>
        </section>
      </main>
    </>
  )
}
