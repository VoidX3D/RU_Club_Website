import { createClient } from '@supabase/supabase-js'
import type {
  Stat, Partner, Member, MembersData,
  MissionEntry, MissionInfo, MissionTimeline,
  AnnouncementEntry, AnnouncementFull,
  GalleryImage, ContactFormData,
} from '@/types'
import { storageUrl } from './utils'

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

async function query<T>(fn: () => Promise<T>, table: string, retries = 2): Promise<T | null> {
  if (!hasSupabase) {
    console.warn(`[DB] Supabase not configured — VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing`)
    return null
  }
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const de = classifyError(err, table)
      console.error(`[DB] ${de.table ? de.table + ': ' : ''}${de.message}${attempt < retries ? ` (retry ${attempt + 1}/${retries})` : ''}`)
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 30000))
        continue
      }
      return null
    }
  }
  return null
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
      src: storageUrl(p.src),
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
      image: r.image ? storageUrl(r.image) : undefined,
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
      .eq('show', true)
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
      featured: m.featured ? storageUrl(m.featured) : undefined,
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

    const slugPart = data.slug
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      tag: data.tag,
      date: data.date,
      description: data.description,
      detail: data.detail,
      images: (imgRes.data || []).map((i: { url: string }) => i.url.startsWith('http') ? i.url : storageUrl(`mission/${slugPart}/${i.url}`)),
      stats: (statRes.data || []).map((s: { label: string; value: string }) => ({ label: s.label, value: s.value })),
      partners: (partRes.data || []).map((p: { name: string }) => p.name),
      goals: (goalRes.data || []).map((g: { goal: string }) => g.goal),
      timeline: (timeRes.data || []) as MissionTimeline[],
      participants: (particRes.data || []).map((p: { group_name: string; participant_count: string }) => p),
      budget: (budgRes.data || []).map((b: { item: string; amount?: string }) => b),
    }
  }, 'missions')
}

export async function getMissionImages(slug: string): Promise<GalleryImage[] | null> {
  return query(async () => {
    const mRes = await supabase
      .from('missions')
      .select('id, title, slug')
      .eq('slug', slug)
      .single()
    if (mRes.error) throw new DataError(`Mission not found: ${slug}`, 'missions')

    const mission = mRes.data

    const imgRes = await supabase
      .from('mission_images')
      .select('url, alt, sort_order')
      .eq('mission_id', mission.id)
      .order('sort_order')

    if (imgRes.error) throw imgRes.error
    if (!imgRes.data || imgRes.data.length === 0) return null

    return imgRes.data.map((img: { url: string; alt: string; sort_order: number }) => {
      const url = img.url.startsWith('http') ? img.url : storageUrl(`mission/${mission.slug}/${img.url}`)
      return {
        id: `${mission.id}-${img.sort_order}`,
        url,
        alt: img.alt || `${mission.title} - Image ${img.sort_order}`,
        missionTitle: mission.title,
        missionSlug: mission.slug,
        downloadUrl: url,
      }
    })
  }, 'mission_images')
}

export async function getAllGalleryImages(): Promise<GalleryImage[] | null> {
  return query(async () => {
    const [missionsRes, imagesRes] = await Promise.all([
      supabase.from('missions').select('id, title, slug').eq('show', true),
      supabase.from('mission_images').select('url, alt, sort_order, mission_id').order('sort_order'),
    ])

    if (missionsRes.error) throw missionsRes.error
    if (imagesRes.error) throw imagesRes.error
    if (!imagesRes.data || imagesRes.data.length === 0) return null

    const missionMap = new Map(missionsRes.data?.map((m: { id: string; title: string; slug: string }) => [m.id, m]) || [])

    return imagesRes.data.map((img: { url: string; alt: string; sort_order: number; mission_id: string }) => {
      const m = missionMap.get(img.mission_id)
      if (!m) return null
      const url = img.url.startsWith('http') ? img.url : storageUrl(`mission/${m.slug}/${img.url}`)
      return {
        id: `${img.mission_id}-${img.sort_order}`,
        url,
        alt: img.alt || `${m.title} - Image ${img.sort_order}`,
        missionTitle: m.title,
        missionSlug: m.slug,
        downloadUrl: url,
      }
    }).filter(Boolean) as GalleryImage[]
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
      image: a.image ? storageUrl(a.image) : undefined,
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

    const { data: tags } = await supabase
      .from('announcement_tags')
      .select('tag')
      .eq('announcement_id', id)
      .order('sort_order')

    const { data: gallery } = await supabase
      .from('announcement_gallery')
      .select('url, alt')
      .eq('announcement_id', id)
      .order('sort_order')

    return {
      id: data.id,
      title: data.title,
      tag: data.tag,
      date: data.date,
      day: data.day,
      summary: data.summary,
      description: data.description,
      image: data.image ? storageUrl(data.image) : undefined,
      active: data.active,
      status: data.status,
      deadline: data.deadline,
      issuedBy: data.issued_by,
      importance: data.importance,
      instructions: data.instructions,
      tags: (tags || []).map((t: { tag: string }) => t.tag),
      gallery: (gallery || []).map((g: { url: string }) => storageUrl(g.url)),
    }
  }, 'announcements')
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
