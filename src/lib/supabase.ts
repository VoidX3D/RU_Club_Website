import { createClient } from '@supabase/supabase-js'
import type {
  SiteConfig, Content, Stat, Partner,
  MembersData, MissionEntry, MissionInfo, GalleryImage,
  AnnouncementEntry, AnnouncementFull,
} from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const STORAGE_BASE = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/ruclub`
  : ''

function handleError(error: { message?: string; code?: string } | null): void {
  if (!error) return
  const msg = error.message || ''
  if (msg.includes('Could not find the table') || msg.includes('does not exist') || msg.includes('relation') || msg.includes('does not exist')) {
    console.warn('Supabase table not found. Run supabase-migration.sql in Supabase SQL Editor.')
    return
  }
  console.error('Supabase error:', msg)
}

export function getImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined
  if (path.startsWith('http')) return path
  return `${STORAGE_BASE}${path}`
}

export function getMissionImageUrl(missionId: string, filename: string): string {
  return `${STORAGE_BASE}/static/assets/mission/${missionId}/${filename}`
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err: unknown) {
    handleError(err instanceof Error ? { message: err.message } : { message: String(err) })
    return fallback
  }
}

// --- Site Config ---
export async function getSiteConfig(): Promise<SiteConfig | null> {
  return safeQuery(async () => {
    const { data } = await supabase
      .from('site_config')
      .select('name, short_name, tagline, description, url, logo, logo_icon, email, phone, location, social, github, copyright, managed_by, made_by, nav, footer_quick_links, cookie')
      .single()
    if (!data) return null
    return {
      name: data.name, shortName: data.short_name, tagline: data.tagline,
      description: data.description, url: data.url, logo: data.logo,
      logoIcon: data.logo_icon, email: data.email, phone: data.phone,
      location: data.location as SiteConfig['location'],
      social: data.social as SiteConfig['social'], github: data.github,
      copyright: data.copyright, managedBy: data.managed_by, madeBy: data.made_by,
      nav: data.nav as SiteConfig['nav'],
      footerQuickLinks: data.footer_quick_links as SiteConfig['footerQuickLinks'],
      cookie: data.cookie as SiteConfig['cookie'],
    }
  }, null)
}

// --- Content ---
export async function getContent(): Promise<Content | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('content').select('hero, intro, features, cta, mission').single()
    if (!data) return null
    return {
      hero: data.hero as Content['hero'], intro: data.intro as Content['intro'],
      features: data.features as Content['features'], cta: data.cta as Content['cta'],
      mission: data.mission as Content['mission'],
    }
  }, null)
}

// --- Stats ---
export async function getStats(): Promise<Stat[] | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('stats').select('value, label').order('sort_order')
    return data as Stat[] | null
  }, null)
}

// --- Partners ---
export async function getPartners(): Promise<Partner[] | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('partners').select('src, alt, name').order('sort_order')
    if (!data) return null
    return data.map((p: { src: string; alt: string; name: string }) => ({
      ...p,
      src: getImageUrl(p.src) || p.src,
    })) as Partner[]
  }, null)
}

// --- Members ---
export async function getMembers(): Promise<MembersData | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('members').select('teachers, core, general, stats').single()
    if (!data) return null
    return {
      teachers: data.teachers as MembersData['teachers'],
      core: data.core as MembersData['core'],
      general: data.general as MembersData['general'],
      stats: data.stats as MembersData['stats'],
    }
  }, null)
}

// --- Missions ---
export async function getMissionList(): Promise<MissionEntry[] | null> {
  return safeQuery(async () => {
    const { data } = await supabase
      .from('missions')
      .select('id, title, slug, tag, date, description, show, featured')
      .eq('show', true)
      .order('date', { ascending: false, nullsFirst: false })
    if (!data) return null
    return data.map((m) => ({ ...m, featured: getImageUrl(m.featured) || m.featured }))
  }, null)
}

export async function getMissionInfo(slug: string): Promise<MissionInfo | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('missions').select('*').eq('slug', slug).single()
    if (!data) return null
    const rawImages = (data.images || []) as string[]
    return {
      id: data.id, title: data.title, slug: data.slug, tag: data.tag,
      date: data.date, description: data.description, detail: data.detail,
      images: rawImages.map((f) => getMissionImageUrl(data.slug, f)),
      stats: data.stats as Record<string, string> | undefined,
      partners: data.partners as string[] | undefined, show: data.show,
    }
  }, null)
}

export async function getMissionImages(missionId: string) {
  return safeQuery(async () => {
    const { data } = await supabase.from('missions').select('images').eq('id', missionId).single()
    if (!data?.images) return null
    const images = data.images as string[]
    return images.map((img, i) => ({
      id: `${missionId}-${i}`,
      url: getMissionImageUrl(missionId, img),
      alt: `Mission image ${i + 1}`,
    }))
  }, null)
}

// --- Announcements ---
export async function getAnnouncementList(): Promise<AnnouncementEntry[] | null> {
  return safeQuery(async () => {
    const { data } = await supabase
      .from('announcements')
      .select('id, title, tag, date, day, summary, image, active, status')
      .eq('active', true)
      .order('date', { ascending: false, nullsFirst: false })
    if (!data) return null
    return data.map((a) => ({ ...a, image: getImageUrl(a.image) || a.image }))
  }, null)
}

export async function getAnnouncementDetail(id: string): Promise<AnnouncementFull | null> {
  return safeQuery(async () => {
    const { data } = await supabase.from('announcements').select('*').eq('id', id).single()
    if (!data) return null
    return {
      ...data,
      image: getImageUrl(data.image) || data.image,
      tags: data.tags as string[] | undefined,
      gallery: data.gallery as string[] | undefined,
    }
  }, null)
}

// --- Contact Form ---
export async function submitContactForm(formData: {
  name: string; email: string; subject: string; message: string
}) {
  try {
    const { error } = await supabase.from('contact_submissions').insert([formData])
    return { error }
  } catch (err: unknown) {
    handleError(err instanceof Error ? { message: err.message } : { message: String(err) })
    return { error: null }
  }
}
