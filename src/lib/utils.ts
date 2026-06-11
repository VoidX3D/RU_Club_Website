import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { renderMarkdown } from './markdown'

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

export { renderMarkdown as renderMd }
