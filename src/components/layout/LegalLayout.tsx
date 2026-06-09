import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { SiteConfigProvider } from '@/hooks/useSiteConfig'
import { usePageTracking } from '@/hooks/usePageTracking'
import SEOHead from '@/components/SEOHead'
import LegalNav from './LegalNav'

export default function LegalLayout() {
  useTheme()
  usePageTracking()

  return (
    <SiteConfigProvider>
      <SEOHead />
      <div className="min-h-screen bg-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="lg:flex lg:gap-12">
            <LegalNav />
            <div className="flex-1 min-w-0 mt-8 lg:mt-0">
              <article className="prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed">
                <Outlet />
              </article>
            </div>
          </div>
        </div>
      </div>
    </SiteConfigProvider>
  )
}
