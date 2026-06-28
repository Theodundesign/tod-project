import Head from 'next/head'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '../lib/blog'
import { SITE_NAME } from '../lib/site'

export default function Blog() {
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(BLOG_POSTS.map((post) => post.category))], [])
  const filteredPosts = useMemo(() => {
    if (category === 'All') return BLOG_POSTS
    return BLOG_POSTS.filter((post) => post.category === category)
  }, [category])

  return (
    <>
      <Head>
        <title>Blog | {SITE_NAME}</title>
        <meta name="description" content="Insights on premium design, brand strategy, performance, and digital product growth from The Odun Design." />
        <meta property="og:title" content={`Blog | ${SITE_NAME}`} />
        <meta property="og:description" content="Insights on premium design, brand strategy, performance, and digital product growth." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`} />
      </Head>
      <main className="container" style={{ padding: '60px 0' }}>
        <section style={{ marginBottom: '48px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '16px' }}>Insights & Stories</p>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '16px' }}>The Odun Design Journal</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
            Articles on premium design, web performance, brand strategy, and digital product growth for ambitious businesses.
          </p>
        </section>

        <section style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className="btn btn-ghost"
              style={{ borderColor: category === item ? '#6EE7F7' : 'rgba(255,255,255,0.1)', color: category === item ? '#6EE7F7' : 'inherit' }}
            >
              {item}
            </button>
          ))}
        </section>

        <div style={{ display: 'grid', gap: '30px' }}>
          {filteredPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="card"
              style={{ padding: '32px', borderRadius: '20px' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                <span style={{ color: '#6EE7F7', fontWeight: '600' }}>{post.category}</span>
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>{post.readingTime}</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', marginBottom: '16px' }}>{post.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '24px' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <span>{post.author}</span> · <span>{new Date(post.published).toLocaleDateString()}</span>
                </div>
                <Link legacyBehavior href={`/blog/${post.slug}`}>
                  <a className="btn btn-primary">Read article</a>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  )
}
