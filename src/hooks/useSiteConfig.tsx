import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getSiteConfig } from '@/lib/supabase'
import type { SiteConfig } from '@/types'

const SiteConfigContext = createContext<SiteConfig | null>(null)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null)

  useEffect(() => {
    getSiteConfig().then(setConfig)
  }, [])

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig(): SiteConfig | null {
  return useContext(SiteConfigContext)
}
