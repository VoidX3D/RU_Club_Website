import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const STORAGE_BASE = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/ruclub/static/assets/`
  : ''

export function storageUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${STORAGE_BASE}${p}`
}

export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.target as HTMLImageElement
  el.style.display = 'none'
  el.nextElementSibling?.classList.remove('hidden')
}
