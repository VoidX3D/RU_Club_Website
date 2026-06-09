import { useState, useEffect } from 'react'

export function useSiteData<T>(fetcher: () => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetch = () => {
      setLoading(true)
      setError(null)
      fetcher()
        .then((result) => {
          if (mounted) {
            setData(result)
            setError(null)
          }
        })
        .catch((err: unknown) => {
          if (mounted) {
            const msg = err instanceof Error ? err.message : 'Failed to load data'
            setError(msg)
            setData(null)
          }
        })
        .finally(() => {
          if (mounted) setLoading(false)
        })
    }

    fetch()

    const handleReconnect = () => {
      if (navigator.onLine) fetch()
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) fetch()
    }

    window.addEventListener('online', handleReconnect)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      mounted = false
      window.removeEventListener('online', handleReconnect)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [fetcher])

  return { data, loading, error, refetch: () => fetcher() }
}
