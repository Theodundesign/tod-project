import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getBlogPostBySlug } from '../../lib/blog'
import { SITE_NAME } from '../../lib/site'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const post = slug ? getBlogPostBySlug(slug) : null

  if (!post) {
    return (
      <main className="container" style={{ padding: '60px 0' }}>
        <div className="section-title">
          <h2>Article not found</h2>
          <p>That article is not available. Please return to the blog list.</p>
        </div>
        <Link legacyBehavior href="/blog"><a className="btn btn-secondary">Back to Blog</a></Link>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} | {SITE_NAME}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | ${SITE_NAME}`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`} />
      </Head>
      <main className="container" style={{ padding: '60px 0' }}>
        <section style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ color: '#6EE7F7', fontWeight: '700' }}>{post.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>{new Date(post.published).toLocaleDateString()} · {post.readingTime}</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '24px' }}>{post.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.76)', lineHeight: '1.8', marginBottom: '40px' }}>{post.excerpt}</p>
          <article style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '34px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.9 }}>
            <p>{post.content}</p>
          </article>
          <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link legacyBehavior href="/blog"><a className="btn btn-secondary">Back to Blog</a></Link>
            <Link legacyBehavior href="/contact"><a className="btn btn-primary">Talk to us</a></Link>
          </div>
        </section>
      </main>
    </>
  )
}
