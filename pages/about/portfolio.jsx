import Head from 'next/head'
import Link from 'next/link'
import ScrollReveal from '../../components/ui/ScrollReveal'

const PROJECTS = [
  { category: 'Graphic Design', title: 'Brand refresh for lifestyle studio', description: 'Logo, posters, and visual assets for a creative launch.', tags: ['Illustrator', 'Photoshop'] },
  { category: 'Branding', title: 'Modern identity for fintech startup', description: 'A polished brand system with digital-first assets.', tags: ['Branding', 'Style guide'] },
  { category: 'Website Design', title: 'Premium landing experience', description: 'High-converting web design for a service brand.', tags: ['UI/UX', 'Responsive'] },
  { category: 'Web Applications', title: 'Client portal interface', description: 'A secure dashboard for customer workflows.', tags: ['Next.js', 'Firebase'] },
  { category: 'Mobile Apps', title: 'Productivity app UI', description: 'A clean mobile experience for modern teams.', tags: ['React Native', 'Prototyping'] },
  { category: 'SEO', title: 'Search-ready website strategy', description: 'Content structure and SEO-driven page optimization.', tags: ['SEO', 'Content'] },
  { category: 'UI/UX', title: 'Conversion-focused app design', description: 'Interfaces built for ease and engagement.', tags: ['UX', 'Testing'] },
  { category: 'Training', title: 'Team digital training', description: 'Workshops that sharpen design and development skills.', tags: ['Workshops', 'Coaching'] }
]

export default function AboutPortfolio(){
  return (
    <>
      <Head>
        <title>Portfolio Highlights – The Odun Design</title>
        <meta name="description" content="Browse The Odun Design's premium portfolio highlights with modern project cards, categories, and outcomes." />
      </Head>
      <main className="container premium-page">
        <ScrollReveal />

        <section className="premium-hero reveal">
          <p className="hero-badge">Portfolio Highlights</p>
          <h1>Modern project cards showcasing premium digital work.</h1>
          <p className="hero-copy">Explore a curated selection of graphic design, branding, websites, apps, SEO, and training work.</p>
        </section>

        <section className="premium-section reveal">
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-cover" />
                <div className="project-body">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <Link legacyBehavior href="/portfolio"><a className="project-button">View Project</a></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
