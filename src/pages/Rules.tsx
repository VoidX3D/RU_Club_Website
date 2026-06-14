import { useEffect, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '@/data'
import { getClubRules } from '@/lib/supabase'
import { renderMarkdown } from '@/lib/markdown'
import { useSiteData } from '@/hooks/useSiteData'

export default function Rules() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const fetcher = useCallback(() => getClubRules(), [])
  const { data: rules, loading, error } = useSiteData(fetcher)

  const rendered = useMemo(() => {
    if (!rules?.content) return ''
    return renderMarkdown(rules.content)
  }, [rules])

  return (
    <>
      <Helmet>
        <title>Club Rules & Regulations — RU Club Motherland</title>
        <meta name="description" content="Official rules and regulations for members of RU Club Motherland at Motherland Secondary School, Pokhara, Nepal. Code of conduct, membership guidelines, event participation, and disciplinary policies." />
        <meta name="keywords" content="RU Club rules, club regulations, code of conduct, membership guidelines, environmental club rules, Motherland Secondary School, student club rules" />
        <link rel="canonical" href={`${SITE_URL}/rules`} />
      </Helmet>

      <div className="w-full px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="animate-pulse space-y-6">
              <div className="h-10 w-72 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto" />
              <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
              <div className="space-y-3 mt-10">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded" style={{ width: `${70 + i * 5}%` }} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">Failed to load rules</h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">{error}</p>
            </div>
          )}

          {!loading && !error && rules && (
            <div
              className="md-content prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          )}

          {!loading && !error && !rules && (
            <div className="text-center py-20">
              <h2 className="text-xl font-display font-bold text-text-primary dark:text-dark-text-primary">No rules found</h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Rules have not been published yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
