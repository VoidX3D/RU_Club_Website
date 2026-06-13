import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useSiteConfig } from '@/hooks/useSiteConfig'
import { SITE_URL } from '@/data'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  articleSection?: string
  keywords?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

const SITE_KEYWORDS = 'environmental sustainability, tree plantation, waste management, zero-waste ecosystem, Pokhara, Nepal, environmental club, RU Club Motherland, Motherland Secondary School, climate action, community service, recycling, green initiative'

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  articleSection,
  keywords,
  noindex,
  jsonLd,
}: SEOHeadProps) {
  const config = useSiteConfig()
  const location = useLocation()

  const siteName = config?.name || 'RU Club Motherland'
  const siteTagline = config?.tagline || 'Environmental Sustainability Club'
  const siteDesc = config?.description || 'Environmental sustainability club at Motherland Secondary School, Pokhara, Nepal.'
  const siteUrl = config?.url || SITE_URL
  const siteImage = config?.logo || ''

  const finalTitle = title
    ? title.includes('|') ? title : `${title} | ${siteName}`
    : `${siteName} | ${siteTagline}`
  const finalDesc = description || siteDesc
  const finalImage = image || (siteImage ? `${siteUrl}${siteImage.startsWith('/') ? '' : '/'}${siteImage}` : `${siteUrl}/favicon.png`)
  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl)

  const pathSegments = location.pathname.split('/').filter(Boolean)
  const breadcrumbItems = [
    { position: 1, name: 'Home', item: siteUrl },
    ...pathSegments.map((seg, i) => ({
      position: i + 2,
      name: seg.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      item: `${siteUrl}/${pathSegments.slice(0, i + 1).join('/')}`,
    })),
  ]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map(({ position, name, item }) => ({
      '@type': 'ListItem',
      position,
      name,
      item,
    })),
  }

  const webPageLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    '@id': finalUrl,
    url: finalUrl,
    name: finalTitle,
    description: finalDesc,
    image: finalImage,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    breadcrumb: {
      '@id': `${finalUrl}#breadcrumb`,
    },
    inLanguage: 'en',
  }

  if (publishedTime) webPageLd.datePublished = publishedTime
  if (modifiedTime) webPageLd.dateModified = modifiedTime
  if (author) {
    webPageLd.author = {
      '@type': 'Person',
      name: author,
    }
  }

  const ldEntries = jsonLd ? [webPageLd, breadcrumbLd, jsonLd] : [webPageLd, breadcrumbLd]
  const ldOutput = ldEntries.length === 1 ? ldEntries[0] : { '@context': 'https://schema.org', '@graph': ldEntries }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={keywords || SITE_KEYWORDS} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@RUClubMotherland" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={finalUrl} />
      <link rel="alternate" hrefLang="en" href={finalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(ldOutput)}
      </script>
    </Helmet>
  )
}
