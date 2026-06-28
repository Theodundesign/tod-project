export const BLOG_POSTS = [
  {
    slug: 'building-premium-brand-experiences',
    title: 'Building Premium Brand Experiences',
    category: 'Brand Strategy',
    excerpt: 'How thoughtful digital design creates brand meaning, trust, and growth for modern businesses.',
    published: '2026-04-02',
    author: 'Igbaoyinbo Odunayo',
    readingTime: '5 min',
    content: 'Creating premium brand experiences starts with a strong strategy, refined storytelling, and visuals that feel both modern and memorable. We focus on systems, motion, and messaging that build trust from the first interaction.'
  },
  {
    slug: 'designing-for-conversion',
    title: 'Designing for Conversion',
    category: 'UX/UI',
    excerpt: 'A premium interface must guide every visitor toward action without losing elegance or clarity.',
    published: '2026-03-15',
    author: 'Odun Design Team',
    readingTime: '6 min',
    content: 'Conversion-driven design balances hierarchy, performance, and emotion. Every CTA, layout, and interaction is crafted for confidence and ease.'
  },
  {
    slug: 'modern-web-performance-essentials',
    title: 'Modern Web Performance Essentials',
    category: 'Development',
    excerpt: 'Fast, polished websites are a necessity — here are the practical steps to keep your digital product premium and performant.',
    published: '2026-02-10',
    author: 'Odun Design Team',
    readingTime: '7 min',
    content: 'Performance is a premium feature. Optimize images, use lazy loading, and keep the experience smooth across devices to maintain user trust.'
  }
]

export const getBlogPostBySlug = (slug) => BLOG_POSTS.find((post) => post.slug === slug)
