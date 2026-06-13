import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const STORAGE_BASE = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/ruclub/static/assets/`
  : ''

export interface StorageTransform {
  width?: number
  height?: number
  quality?: number
}

const urlCache = new Map<string, string>()

export function storageUrl(path: string, transform?: StorageTransform): string {
  if (!path || path.startsWith('http')) return path
  const key = transform ? `${path}|${transform.width}|${transform.height}|${transform.quality ?? 80}` : path
  const cached = urlCache.get(key)
  if (cached) return cached

  const p = path.startsWith('/') ? path.slice(1) : path

  let result: string
  if (transform && supabaseUrl) {
    const params = new URLSearchParams()
    if (transform.width) params.set('width', String(transform.width))
    if (transform.height) params.set('height', String(transform.height))
    params.set('quality', String(transform.quality ?? 80))
    params.set('resize', 'cover')
    params.set('format', 'webp')
    result = `${supabaseUrl}/storage/v1/render/image/public/ruclub/static/assets/${p}?${params.toString()}`
  } else {
    result = `${STORAGE_BASE}${p}`
  }

  urlCache.set(key, result)
  return result
}

export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.target as HTMLImageElement
  el.style.display = 'none'
  el.nextElementSibling?.classList.remove('hidden')
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'throwaway.email', 'yopmail.com', 'sharklasers.com', 'trashmail.com',
  'temp-mail.org', 'fakeinbox.com', 'maildrop.cc', 'getairmail.com',
  'mohmal.com', 'emailondeck.com', 'spamgourmet.com', 'discard.email',
  'mailnator.com', 'tempinbox.com', 'tempmail.net', 'spambox.us',
])

const COMMON_TYPOS: Record<string, string> = {
  'gamil.com': 'gmail.com', 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmaill.com': 'gmail.com',
  'gmil.com': 'gmail.com', 'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com',
  'yahho.com': 'yahoo.com', 'yaoo.com': 'yahoo.com', 'yhaoo.com': 'yahoo.com',
  'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com', 'outloo.com': 'outlook.com',
  'outlok.com': 'outlook.com', 'outllok.com': 'outlook.com',
  'protonmai.com': 'protonmail.com', 'protonmal.com': 'protonmail.com',
  'icloud.com': 'icloud.com', 'me.com': 'me.com',
}

const ROLE_PREFIXES = ['admin', 'info', 'support', 'contact', 'webmaster', 'noreply', 'no-reply', 'sales', 'help', 'team']

export interface EmailValidation {
  valid: boolean
  error?: string
  suggestion?: string
}

export function validateEmail(email: string): EmailValidation {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }

  const trimmed = email.trim()

  // Max length check
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address is too long (max 254 characters)' }
  }

  const atIndex = trimmed.lastIndexOf('@')
  if (atIndex < 1) {
    return { valid: false, error: 'Email must contain an @ symbol' }
  }

  const localPart = trimmed.slice(0, atIndex)
  const domainPart = trimmed.slice(atIndex + 1).toLowerCase()

  // Local part checks
  if (localPart.length > 64) {
    return { valid: false, error: 'The part before @ is too long (max 64 characters)' }
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { valid: false, error: 'Email cannot start or end with a dot' }
  }

  if (localPart.includes('..')) {
    return { valid: false, error: 'Email cannot contain consecutive dots' }
  }

  // Domain checks
  if (domainPart.length < 3 || !domainPart.includes('.')) {
    return { valid: false, error: 'Email must have a valid domain (e.g., example.com)' }
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return { valid: false, error: 'Domain cannot start or end with a dot' }
  }

  if (domainPart.includes('..')) {
    return { valid: false, error: 'Domain cannot contain consecutive dots' }
  }

  // RFC 5322 simplified regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Email address format is invalid' }
  }

  // Disposable email check
  if (DISPOSABLE_DOMAINS.has(domainPart)) {
    return { valid: false, error: 'Disposable email addresses are not allowed' }
  }

  // Typo detection
  const typoMatch = COMMON_TYPOS[domainPart]
  if (typoMatch) {
    return { valid: false, error: `Did you mean @${typoMatch}?`, suggestion: trimmed.replace(`@${domainPart}`, `@${typoMatch}`) }
  }

  // Role-based prefix warning (non-blocking, just informational)
  const prefix = localPart.toLowerCase()
  if (ROLE_PREFIXES.some((p) => prefix === p || prefix.startsWith(p + '.'))) {
    return { valid: false, error: 'Please use a personal email address, not a role-based one' }
  }

  // TLD must be at least 2 characters
  const tld = domainPart.split('.').pop() || ''
  if (tld.length < 2) {
    return { valid: false, error: 'Email domain must have a valid top-level domain' }
  }

  return { valid: true }
}
