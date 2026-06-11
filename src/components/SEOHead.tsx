import { Helmet } from 'react-helmet-async'
import { useSiteConfig } from '@/hooks/useSiteConfig'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
}: SEOHeadProps) {
  const config = useSiteConfig()

  const siteName = config?.name || 'RU Club Motherland'
  const siteTagline = config?.tagline || 'Environmental Sustainability Club in Pokhara'
  const siteDesc = config?.description || 'Environmental sustainability club at Motherland Secondary School, Pokhara.'
  const siteUrl = config?.url || 'https://ruclub.motherland.edu.np'
  const siteImage = config?.logo || ''

  const finalTitle = title
    ? title.includes('|') ? title : `${title} | ${siteName}`
    : `${siteName} | ${siteTagline}`
  const finalDesc = description || siteDesc
  const finalImage = image || (siteImage ? `${siteUrl}${siteImage.startsWith('/') ? '' : '/'}${siteImage}` : `${siteUrl}/favicon.png`)
  const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl)

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  )
}
