import { createContext, useContext, type ReactNode } from 'react'
import { siteConfig } from '@/data'
import type { SiteConfig } from '@/types'

const SiteConfigContext = createContext<SiteConfig>(siteConfig)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  return (
    <SiteConfigContext.Provider value={siteConfig}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext)
}
