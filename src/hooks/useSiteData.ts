import { useState, useEffect, useCallback, useRef } from 'react'

export function useSiteData<T>(fetcher: () => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  const fetch = useCallback(() => {
    if (!data) setLoading(true)
    setError(null)
    fetcher()
      .then((result) => {
        if (!mountedRef.current) return
        setData(result)
        setError(null)
      })
      .catch((err: unknown) => {
        if (!mountedRef.current) return
        const msg = err instanceof Error ? err.message : 'Failed to load data'
        setError(msg)
        if (!data) setData(null)
      })
      .finally(() => {
        if (mountedRef.current && !data) setLoading(false)
      })
  }, [fetcher, data])

  useEffect(() => {
    mountedRef.current = true
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
      mountedRef.current = false
      window.removeEventListener('online', handleReconnect)
      window.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [fetch])

  return { data, loading, error, refetch: fetch }
}
