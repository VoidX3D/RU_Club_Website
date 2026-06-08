import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEOHead({
  title = 'RU Club Motherland | Environmental Sustainability Club in Pokhara',
  description = 'RU Club Motherland is an environmental sustainability club at Motherland Secondary School, Pokhara. Transforming awareness into action through tree plantation, waste management, and education.',
  image = '/static/assets/brand/logo.png',
  url = 'https://ru.motherland.edu.np',
  type = 'website',
}: SEOHeadProps) {
  const fullTitle = title.includes('|') ? title : `${title} | RU Club Motherland`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
