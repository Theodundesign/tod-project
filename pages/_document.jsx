import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(){
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theodundesign.com'
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#0b0b10" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="description" content="The Odun Design — Premium digital agency for web, app, branding, SEO and training." />
          <meta name="keywords" content="The Odun Design, digital agency, web development, app development, branding, training, premium design" />
          <meta property="og:title" content="The Odun Design — Premium Digital Agency" />
          <meta property="og:description" content="Award-level creative digital solutions with premium UX, polished websites, apps, and training." />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="The Odun Design" />
          <meta name="twitter:description" content="Premium digital agency for design, web, app, SEO, and training." />
          <meta name="robots" content="index,follow" />
          <meta name="author" content="The Odun Design" />
          <meta name="application-name" content="The Odun Design" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="The Odun Design" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "The Odun Design",
                "url": "${siteUrl}",
                "logo": "https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/theodundesign-e1782575369588.png",
                "sameAs": ["https://twitter.com","https://linkedin.com","https://instagram.com"],
                "contactPoint": [{"@type":"ContactPoint","email":"theodundesign@gmail.com","telephone":"+2348160191823","contactType":"customer support","areaServed":"NG"}]
              },
              {
                "@type": "Person",
                "name": "Igbaoyinbo Odunayo",
                "jobTitle": "Creative Director & Founder",
                "url": "${siteUrl}/about/founder",
                "image": "https://www.afmgoldenbakeryfoods.com/wp-content/uploads/2026/06/Igbaoyinboprofile1.png"
              },
              {
                "@type": "LocalBusiness",
                "name": "The Odun Design",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Ado Ekiti",
                  "addressLocality": "Ekiti State",
                  "addressCountry": "Nigeria"
                },
                "telephone": "+2348160191823",
                "email": "theodundesign@gmail.com",
                "url": "${siteUrl}"
              }
            ]
          }` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
