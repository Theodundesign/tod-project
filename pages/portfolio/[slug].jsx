import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getPortfolioProjectBySlug } from '../../lib/portfolio'
import { SITE_NAME } from '../../lib/site'

export default function PortfolioProject() {
  const router = useRouter()
  const { slug } = router.query
  const project = slug ? getPortfolioProjectBySlug(slug) : null

  if (!project) {
    return (
      <main className="container" style={{ padding: '60px 0' }}>
        <div className="section-title">
          <h2>Project not found</h2>
          <p>This project is not available. Try exploring our portfolio categories instead.</p>
        </div>
        <Link legacyBehavior href="/portfolio"><a className="btn btn-secondary">Back to Portfolio</a></Link>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{project.title} | Portfolio | {SITE_NAME}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | ${SITE_NAME}`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portfolio/${project.slug}`} />
      </Head>
      <main className="container" style={{ padding: '60px 0' }}>
        <section style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '26px', display: 'flex', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#6EE7F7', fontWeight: '700', marginBottom: '12px' }}>{project.category}</p>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>{project.title}</h1>
            </div>
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>Client</p>
              <p style={{ margin: 0, fontWeight: '700' }}>{project.client || 'The Odun Design'}</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '12px' }}>{project.year}</p>
            </div>
          </div>

          <div style={{ position: 'relative', height: '420px', borderRadius: '24px', overflow: 'hidden', marginBottom: '32px' }}>
            <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'grid', gap: '28px' }}>
            <article style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', borderRadius: '22px', padding: '32px' }}>
              <h2 style={{ marginBottom: '18px', fontSize: '1.75rem', fontWeight: '800' }}>Overview</h2>
              <p style={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.8 }}>{project.description}</p>
            </article>

            <article style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '24px' }}>
                <h3 style={{ marginBottom: '10px', fontWeight: '700' }}>Category</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)' }}>{project.category}</p>
              </div>
              <div style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '24px' }}>
                <h3 style={{ marginBottom: '10px', fontWeight: '700' }}>Results</h3>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255,255,255,0.75)' }}>
                  {project.results.map((item) => (
                    <li key={item} style={{ marginBottom: '8px' }}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '24px' }}>
                <h3 style={{ marginBottom: '10px', fontWeight: '700' }}>Services</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ background: 'rgba(110,231,247,0.12)', color: '#6EE7F7', padding: '8px 12px', borderRadius: '999px', fontSize: '0.85rem' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link legacyBehavior href="/portfolio"><a className="btn btn-secondary">Back to Portfolio</a></Link>
              <Link legacyBehavior href="/contact"><a className="btn btn-primary">Discuss a similar project</a></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
