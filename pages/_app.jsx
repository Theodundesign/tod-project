import '../style.css'
import '../styles/globals.css'
import '../styles/auth.css'
import '../styles/dashboard.css'
import '../styles/ui.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from '../context/AuthContext'
import { ToastProvider } from '../components/ui/ToastContext'
import Header from '../components/navigation/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

const rawGaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
const GA_ID = rawGaId.startsWith('G-') && !rawGaId.includes('XXXX') ? rawGaId : ''
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theodundesign.com'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  useEffect(() => {
    if (!GA_ID) return
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_ID, { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <AuthProvider>
      <ToastProvider>
        <Head>
          <title>The Odun Design</title>
          <meta name="description" content="Premium digital agency for branding, web, app, and training services." />
          <meta name="theme-color" content="#05060a" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="The Odun Design" />
          <meta property="og:title" content="The Odun Design" />
          <meta property="og:description" content="Premium digital agency for branding, web, app, and training services." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="The Odun Design" />
          <meta name="twitter:description" content="Premium digital agency for branding, web, app, and training services." />
          <link rel="canonical" href={canonicalUrl} />
        </Head>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Header />
        <div className={`top-progress ${loading ? 'active' : ''}`} aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  )
}
