import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const COURSES = [
  {
    id: 1,
    title: 'Web Design Fundamentals',
    duration: '4 weeks',
    level: 'Beginner',
    price: '₦15,000',
    description: 'Master modern web design principles, UI/UX best practices, color theory, typography, and responsive design. Build your first professional website.',
    topics: ['Design Principles', 'UI/UX Basics', 'Typography', 'Color Theory', 'Responsive Design', 'Figma Fundamentals']
  },
  {
    id: 2,
    title: 'Advanced UI/UX Design',
    duration: '6 weeks',
    level: 'Intermediate',
    price: '₦25,000',
    description: 'Dive deep into user research, wireframing, prototyping, usability testing, and design systems. Create production-ready designs.',
    topics: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Design Thinking']
  },
  {
    id: 3,
    title: 'Frontend Development',
    duration: '8 weeks',
    level: 'Intermediate',
    price: '₦35,000',
    description: 'Learn HTML, CSS, JavaScript, React, and Next.js. Build interactive, responsive web applications with modern frameworks.',
    topics: ['HTML & CSS', 'JavaScript', 'React Fundamentals', 'Next.js', 'State Management', 'API Integration']
  },
  {
    id: 4,
    title: 'Brand Identity Design',
    duration: '4 weeks',
    level: 'Beginner',
    price: '₦18,000',
    description: 'Create cohesive brand identities including logos, color palettes, typography systems, and brand guidelines.',
    topics: ['Logo Design', 'Brand Strategy', 'Color Systems', 'Typography Pairing', 'Brand Guidelines', 'Logo Variations']
  },
  {
    id: 5,
    title: 'Motion & Animation Design',
    duration: '5 weeks',
    level: 'Intermediate',
    price: '₦22,000',
    description: 'Master animations, transitions, micro-interactions, and motion design principles using Framer, After Effects, and CSS.',
    topics: ['Animation Principles', 'Framer Motion', 'CSS Animations', 'Micro-interactions', 'User Feedback', 'Performance']
  },
  {
    id: 6,
    title: 'Portfolio & Career Mastery',
    duration: '3 weeks',
    level: 'All Levels',
    price: '₦12,000',
    description: 'Build a standout portfolio, craft your personal brand, learn interview preparation, and land your dream role.',
    topics: ['Portfolio Building', 'Branding', 'Resume Writing', 'Interview Skills', 'Freelancing', 'Job Search Strategy']
  }
]

export default function Training(){
  const [expandedCourse, setExpandedCourse] = useState(null)

  return (
    <>
      <Head>
        <title>Training | The Odun Design</title>
        <meta name="description" content="Learn design and development with expert-led courses from The Odun Design. Web design, UI/UX, frontend development, and more." />
        <meta property="og:title" content="Training | The Odun Design" />
        <meta property="og:description" content="Master design and development skills through comprehensive training programs." />
      </Head>
      <main>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 168, 0.1))',
          padding: '80px 24px',
          marginBottom: '60px',
          borderBottom: '1px solid var(--glass-border)'
        }} className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #6EE7F7, #6D28D9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Learn Design & Development
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '32px' }}>
              Master in-demand skills through expert-led, hands-on courses designed for beginners to advanced professionals.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link legacyBehavior href="#courses">
                <a className="btn btn-primary">Browse Courses</a>
              </Link>
              <Link legacyBehavior href="/contact">
                <a className="btn btn-secondary">Get in Touch</a>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container" style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience' },
              { icon: '🎯', title: 'Project-Based', desc: 'Build real portfolio pieces you can showcase' },
              { icon: '🌍', title: 'Online & Flexible', desc: 'Learn at your own pace with lifetime access' },
              { icon: '🤝', title: 'Community Support', desc: 'Join a community of designers and developers' }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{feature.icon}</div>
                <h3 style={{ margin: '0 0 8px 0', fontWeight: '700' }}>{feature.title}</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="container" style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '8px', textAlign: 'center' }}>
            Available Courses
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            Choose from our comprehensive catalog of design and development courses tailored to your skill level.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {COURSES.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#6EE7F7'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              >
                {/* Course Header */}
                <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.15), rgba(14, 165, 168, 0.15))', borderBottom: '1px solid var(--glass-border)' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', fontWeight: '700' }}>
                    {course.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.85rem',
                      background: 'rgba(110, 231, 247, 0.15)',
                      border: '1px solid rgba(110, 231, 247, 0.3)',
                      color: '#6EE7F7',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {course.duration}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      background: 'rgba(109, 40, 217, 0.15)',
                      border: '1px solid rgba(109, 40, 217, 0.3)',
                      color: '#c084fc',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {course.description}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Starting at</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6EE7F7' }}>
                      {course.price}
                    </div>
                  </div>

                  {/* Topics */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedCourse === course.id ? 'auto' : 0,
                      opacity: expandedCourse === course.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', marginBottom: expandedCourse === course.id ? '20px' : 0 }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: '700', color: '#6EE7F7' }}>
                        TOPICS COVERED:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {course.topics.map((topic, idx) => (
                          <span key={idx} style={{
                            fontSize: '0.8rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            color: 'rgba(255,255,255,0.8)'
                          }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Link legacyBehavior href="/contact">
                      <a className="btn btn-primary" style={{ padding: '10px', fontSize: '0.9rem' }}>
                        Enroll
                      </a>
                    </Link>
                    <button
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      style={{
                        background: 'rgba(110, 231, 247, 0.1)',
                        border: '1px solid rgba(110, 231, 247, 0.3)',
                        color: '#6EE7F7',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(110, 231, 247, 0.2)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(110, 231, 247, 0.1)'
                      }}
                    >
                      {expandedCourse === course.id ? 'Hide' : 'Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          background: 'var(--card)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '60px 40px',
          marginBottom: '60px'
        }} className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {[
              {
                q: 'Do I need any prior experience?',
                a: 'No! Our courses range from beginner to advanced levels. Each course is designed to be accessible to learners with different backgrounds.'
              },
              {
                q: 'How long do I have access to the course?',
                a: 'You get lifetime access to all course materials, videos, and resources. Learn at your own pace whenever you want.'
              },
              {
                q: 'Are there projects included?',
                a: 'Yes! All courses include hands-on projects that you can add to your portfolio. We provide briefs, feedback, and guidance throughout.'
              },
              {
                q: 'What tools and software will I need?',
                a: 'Required tools vary by course. Web design courses use Figma (free). Development courses use VS Code (free) and Node.js (free). We provide detailed setup guides.'
              },
              {
                q: 'Is there a certificate upon completion?',
                a: 'Yes! You receive a completion certificate that you can share on LinkedIn and include in your portfolio.'
              },
              {
                q: 'Can I get a refund if the course isn\'t right for me?',
                a: 'We offer a 7-day money-back guarantee if you\'re not satisfied. No questions asked.'
              }
            ].map((item, i) => (
              <details key={i} style={{
                marginBottom: '16px',
                padding: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <summary style={{
                  fontWeight: '700',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  {item.q}
                </summary>
                <p style={{ margin: '12px 0 0 0', color: 'rgba(255,255,255,0.8)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.15), rgba(14, 165, 168, 0.15))',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '60px 24px',
          textAlign: 'center'
        }} className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '16px' }}>
            Ready to level up your skills?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Join hundreds of students who have transformed their careers through our training programs.
          </p>
          <Link legacyBehavior href="/contact">
            <a className="btn btn-primary">Start Learning Today</a>
          </Link>
        </section>
      </main>
    </>
  )
}
