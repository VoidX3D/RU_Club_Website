import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type DBStatus = 'checking' | 'online' | 'offline'

export function useDBStatus(): DBStatus {
  const [status, setStatus] = useState<DBStatus>('checking')

  useEffect(() => {
    let mounted = true
    let interval: ReturnType<typeof setInterval>

    const check = async () => {
      try {
        const { error } = await supabase.from('stats').select('value', { count: 'exact', head: true }).limit(1)
        if (error) {
          console.error('[DB Status] Offline:', error.message)
          if (mounted) setStatus('offline')
        } else {
          if (mounted) setStatus('online')
        }
      } catch (err) {
        console.error('[DB Status] Error:', err)
        if (mounted) setStatus('offline')
      }
    }

    check()
    interval = setInterval(check, 30000)

    window.addEventListener('online', () => check())
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check()
    })

    return () => {
      mounted = false
      clearInterval(interval)
      window.removeEventListener('online', () => check())
    }
  }, [])

  return status
}
