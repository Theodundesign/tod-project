export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    slug: 'brand-identity-system',
    title: 'Brand Identity System',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop',
    description: 'Complete visual identity for a premium SaaS platform including logo, color system, and brand guidelines.',
    tags: ['Logo Design', 'Brand Guidelines', 'Color System'],
    results: ['200% brand recognition increase', 'Consistent messaging across 5 markets'],
    client: 'Nexa',
    year: '2025'
  },
  {
    id: 2,
    slug: 'ecommerce-platform-redesign',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=900&h=600&fit=crop',
    description: 'Full-stack e-commerce website with product filtering, payments, and client dashboard.',
    tags: ['Next.js', 'Stripe Integration', 'Analytics'],
    results: ['45% increase in conversion rate', '$500K+ in first 6 months'],
    client: 'Atlas',
    year: '2025'
  },
  {
    id: 3,
    slug: 'mobile-banking-app',
    title: 'Mobile Banking App',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=900&h=600&fit=crop',
    description: 'Cross-platform mobile app for peer-to-peer payments with real-time notifications and secure login.',
    tags: ['React Native', 'Real-time Sync', 'Security'],
    results: ['100K+ downloads', '4.8-star app store rating'],
    client: 'Stellar',
    year: '2025'
  },
  {
    id: 4,
    slug: 'digital-marketing-dashboard',
    title: 'Digital Marketing Dashboard',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop',
    description: 'Real-time analytics and campaign management tool for marketing teams.',
    tags: ['React', 'Data Visualization', 'Real-time Updates'],
    results: ['250% ROI improvement', 'Used by 50+ agencies'],
    client: 'Bright Academy',
    year: '2024'
  },
  {
    id: 5,
    slug: 'educational-content-design',
    title: 'Educational Content Design',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1554184311-beee415c201f?w=900&h=600&fit=crop',
    description: 'Course materials and visual assets for a modern online learning platform.',
    tags: ['Illustration', 'Layout Design', 'Motion Graphics'],
    results: ['1,000+ course enrollments', '92% completion rate'],
    client: 'Savory',
    year: '2024'
  },
  {
    id: 6,
    slug: 'seo-optimization-audit',
    title: 'SEO Optimization Audit',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=900&h=600&fit=crop',
    description: 'Technical SEO and content strategy overhaul that drove significant organic traffic growth.',
    tags: ['Technical SEO', 'Content Strategy', 'Backlink Analysis'],
    results: ['10x organic traffic growth', '#1 ranking on 15+ keywords'],
    client: 'Luna Labs',
    year: '2024'
  }
]

export const PORTFOLIO_CATEGORIES = ['All', ...new Set(PORTFOLIO_PROJECTS.map((project) => project.category))]

export const getPortfolioProjectBySlug = (slug) => PORTFOLIO_PROJECTS.find((project) => project.slug === slug)
