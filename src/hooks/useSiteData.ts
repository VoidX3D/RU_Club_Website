import { useState, useEffect, useCallback } from 'react'

export function useSiteData<T>(fetcher: () => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(() => {
    setLoading(true)
    setError(null)
    fetcher()
      .then((result) => {
        setData(result)
        setError(null)
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load data'
        setError(msg)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [fetcher])

  useEffect(() => {
    let mounted = true

    const run = () => {
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

    run()

    const handleReconnect = () => {
      if (navigator.onLine) run()
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) run()
    }

    window.addEventListener('online', handleReconnect)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      mounted = false
      window.removeEventListener('online', handleReconnect)
      window.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [fetcher])

  return { data, loading, error, refetch: fetch }
}
