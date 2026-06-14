import { createClient } from '@supabase/supabase-js'
import type {
  Stat, Partner, Member, MembersData,
  MissionEntry, MissionInfo, MissionImageItem, MissionTimeline, GalleryImage,
  AnnouncementEntry, AnnouncementFull,
  ContactFormData,
} from '@/types'
import { storageUrl } from './utils'

function resolveImageUrl(url: string | null | undefined, prefix?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http')) return url
  if (url.includes('/')) return storageUrl(url)
  if (prefix) return storageUrl(`${prefix}${url}`)
  return storageUrl(url)
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const hasSupabase = supabaseUrl && supabaseAnonKey

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>)

export class DataError extends Error {
  constructor(
    message: string,
    public readonly table?: string,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'DataError'
  }
}

function classifyError(err: unknown, table: string): DataError {
  if (err instanceof DataError) return err
  const msg = err instanceof Error ? err.message : String(err)
  const code = (err as { code?: string })?.code

  if (msg.includes('Could not find the table') || msg.includes('does not exist') || msg.includes('relation')) {
    return new DataError(`Table "${table}" not found. Run migration SQL in Supabase.`, table, 'NOT_FOUND')
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('NetworkError') || msg.includes('ERR_CONNECTION')) {
    return new DataError('Network error — check internet connection and Supabase status.', table, 'NETWORK')
  }
  if (msg.includes('JWT') || msg.includes('jwt') || msg.includes('auth') || msg.includes('unauthorized') || msg.includes('401')) {
    return new DataError('Authentication error — check Supabase API keys.', table, 'AUTH')
  }
  if (msg.includes('timeout') || msg.includes('timed out')) {
    return new DataError('Request timed out.', table, 'TIMEOUT')
  }
  return new DataError(msg, table, code)
}

// Query result cache (in-memory, 60s TTL)
interface CacheEntry { data: unknown; expires: number }
const queryCache = new Map<string, CacheEntry>()
const CACHE_TTL = 60_000

async function query<T>(fn: () => Promise<T>, table: string, retries = 2, cacheKey?: string): Promise<T | null> {
  if (!hasSupabase) {
    throw new DataError('Supabase not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.', table, 'CONFIG')
  }
  const key = cacheKey || table
  const cached = queryCache.get(key)
  if (cached && Date.now() < cached.expires) {
    return cached.data as T
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn()
      queryCache.set(key, { data: result as unknown, expires: Date.now() + CACHE_TTL })
      return result
    } catch (err) {
      const de = classifyError(err, table)
      console.error(`[DB] ${de.table ? de.table + ': ' : ''}${de.message}${attempt < retries ? ` (retry ${attempt + 1}/${retries})` : ''}`)
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 3000))
        continue
      }
      throw de
    }
  }
  return null
}

export function clearQueryCache() {
  queryCache.clear()
}

// ============================================================
// STATS
// ============================================================
export async function getStats(): Promise<Stat[] | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('value, label')
      .order('sort_order')
    if (error) throw error
    return data as Stat[] | null
  }, 'stats')
}

// ============================================================
// PARTNERS
// ============================================================
export async function getPartners(): Promise<Partner[] | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('src, alt, name')
      .order('sort_order')
    if (error) throw error
    if (!data) return null
    return data.map((p: { src: string; alt: string; name: string }) => ({
      ...p,
      src: resolveImageUrl(p.src, 'partners/') as string,
    })) as Partner[]
  }, 'partners')
}

// ============================================================
// MEMBERS
// ============================================================
export async function getMembers(): Promise<MembersData | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('members')
      .select('name, class, role, member_type, group_name, image')
      .order('sort_order')
    if (error) throw error
    if (!data || data.length === 0) return null

    const mapRow = (r: { name: string; class?: string; role: string; member_type: string; group_name: string; image?: string }): Member => ({
      name: r.name,
      class: r.class || undefined,
      role: r.role,
      memberType: r.member_type as Member['memberType'],
      groupName: r.group_name as Member['groupName'],
      image: resolveImageUrl(r.image, 'members/'),
    })

    const teachers = data.filter((r: { group_name: string }) => r.group_name === 'teachers').map(mapRow)
    const core = data.filter((r: { group_name: string }) => r.group_name === 'core').map(mapRow)
    const general = data.filter((r: { group_name: string }) => r.group_name === 'general').map(mapRow)

    return {
      teachers,
      core,
      general,
      stats: {
        teachers: teachers.length,
        core: core.length,
        general: general.length,
        total: data.length,
      },
    }
  }, 'members')
}

// ============================================================
// MISSIONS
// ============================================================
export async function getMissionList(): Promise<MissionEntry[] | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('missions')
      .select('id, title, slug, tag, date, description, show, featured')
      .eq('show', true) // Server-side filter — only visible missions
      .order('date', { ascending: false, nullsFirst: false })
    if (error) throw error
    if (!data) return null
    return data.map((m: { id: string; slug: string; title: string; tag?: string; date?: string; description: string; show?: boolean; featured?: string }) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      tag: m.tag,
      date: m.date,
      description: m.description,
      show: m.show,
      featured: resolveImageUrl(m.featured),
    }))
  }, 'missions')
}

export async function getMissionInfo(slug: string): Promise<MissionInfo | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    if (!data) return null

    const [imgRes, statRes, partRes, goalRes, timeRes, particRes, budgRes] = await Promise.all([
      supabase.from('mission_images').select('url, alt').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_stats').select('label, value').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_partners').select('name').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_goals').select('goal').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_timeline').select('title, date, description').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_participants').select('group_name, participant_count').eq('mission_id', data.id).order('sort_order'),
      supabase.from('mission_budget').select('item, amount').eq('mission_id', data.id).order('sort_order'),
    ])

    const missionImages: MissionImageItem[] = (imgRes.data || []).map((i: { url: string; alt: string }) => {
      const url = resolveImageUrl(i.url, `mission/${data.slug}/`) as string
      return { url, alt: i.alt || `${data.title} - Image`, downloadUrl: url }
    })

    if (missionImages.length === 0 && data.featured) {
      const url = resolveImageUrl(data.featured) as string
      if (url) {
        missionImages.push({ url, alt: `${data.title} - Featured Image`, downloadUrl: url })
      }
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      tag: data.tag,
      date: data.date,
      description: data.description,
      detail: data.detail,
      created_at: data.created_at,
      images: missionImages,
      stats: (statRes.data || []).map((s: { label: string; value: string }) => ({ label: s.label, value: s.value })),
      partners: (partRes.data || []).map((p: { name: string }) => p.name),
      goals: (goalRes.data || []).map((g: { goal: string }) => g.goal),
      timeline: (timeRes.data || []) as MissionTimeline[],
      participants: (particRes.data || []).map((p: { group_name: string; participant_count: string }) => p),
      budget: (budgRes.data || []).map((b: { item: string; amount?: string }) => b),
    }
  }, 'missions', 2, `mission:${slug}`)
}

export async function getAllGalleryImages(): Promise<GalleryImage[] | null> {
  return query(async () => {
    const [missionsRes, imagesRes] = await Promise.all([
      supabase.from('missions').select('id, title, slug, featured').eq('show', true),
      supabase.from('mission_images').select('url, alt, sort_order, mission_id').order('sort_order'),
    ])

    if (missionsRes.error) throw missionsRes.error
    if (imagesRes.error) throw imagesRes.error

    const missionMap = new Map(missionsRes.data?.map((m: { id: string; title: string; slug: string; featured?: string }) => [m.id, m]) || [])

    const gallery: GalleryImage[] = []

    for (const img of (imagesRes.data || [])) {
      const m = missionMap.get(img.mission_id)
      if (!m) continue
      const url = resolveImageUrl(img.url, `mission/${m.slug}/`) as string
      const fullUrl = resolveImageUrl(img.url, `mission/${m.slug}/`) as string
      if (url) gallery.push({
        id: `${img.mission_id}-${img.sort_order}`,
        url,
        alt: img.alt || `${m.title} - Image ${img.sort_order}`,
        missionTitle: m.title,
        missionSlug: m.slug,
        downloadUrl: fullUrl,
      })
    }

    for (const [id, m] of missionMap) {
      const hasEntry = gallery.some(g => g.missionSlug === m.slug)
      if (!hasEntry && m.featured) {
        const url = resolveImageUrl(m.featured) as string
        const fullUrl = resolveImageUrl(m.featured) as string
        if (url) gallery.push({
          id: `${id}-featured`,
          url,
          alt: `${m.title} - Featured Image`,
          missionTitle: m.title,
          missionSlug: m.slug,
          downloadUrl: fullUrl,
        })
      }
    }

    return gallery.length > 0 ? gallery : null
  }, 'mission_images')
}

// ============================================================
// ANNOUNCEMENTS
// ============================================================
export async function getAnnouncementList(): Promise<AnnouncementEntry[] | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, tag, date, day, summary, image, active, status')
      .eq('active', true)
      .order('date', { ascending: false, nullsFirst: false })
    if (error) throw error
    if (!data) return null
    return data.map((a: { id: string; title: string; tag?: string; date: string; day?: string; summary: string; image?: string; active?: boolean; status?: string }) => ({
      id: a.id,
      title: a.title,
      tag: a.tag,
      date: a.date,
      day: a.day,
      summary: a.summary,
      image: resolveImageUrl(a.image, 'announcements/'),
      active: a.active,
      status: a.status,
    }))
  }, 'announcements')
}

export async function getAnnouncementDetail(id: string): Promise<AnnouncementFull | null> {
  return query(async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    if (!data) return null

    const { data: tags, error: tagErr } = await supabase
      .from('announcement_tags')
      .select('tag')
      .eq('announcement_id', id)
      .order('sort_order')
    if (tagErr) throw tagErr

    return {
      id: data.id,
      title: data.title,
      tag: data.tag,
      date: data.date,
      day: data.day,
      summary: data.summary,
      description: data.description,
      image: resolveImageUrl(data.image, 'announcements/'),
      created_at: data.created_at,
      active: data.active,
      status: data.status,
      deadline: data.deadline,
      issuedBy: data.issued_by,
      importance: data.importance,
      instructions: data.instructions,
      tags: (tags || []).map((t: { tag: string }) => t.tag),
    }
  }, 'announcements', 2, `announcement:${id}`)
}

// ============================================================
// CONTACT FORM
// ============================================================
export async function submitContactForm(formData: ContactFormData): Promise<{ data: boolean | null; error: DataError | null }> {
  if (!hasSupabase) {
    console.warn('[DB] Supabase not configured — contact form not saved to DB')
    return { data: false, error: null }
  }
  try {
    const { error } = await supabase.from('contact_submissions').insert([formData])
    if (error) throw error
    return { data: true, error: null }
  } catch (err) {
    const de = classifyError(err, 'contact_submissions')
    return { data: null, error: de }
  }
}
