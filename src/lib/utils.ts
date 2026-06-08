import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const STORAGE_BASE = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/ruclub/static/assets/`
  : ''

export function storageUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${STORAGE_BASE}${p}`
}
