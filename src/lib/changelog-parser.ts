export interface ChangelogItem {
  text: string
}

export interface ChangelogSection {
  heading: string
  items: ChangelogItem[]
}

export interface ChangelogVersion {
  version: string
  date: string
  sections: ChangelogSection[]
}

const VALID_SECTIONS = ['added', 'changed', 'fixed', 'removed', 'deprecated', 'security']

export class ChangelogParseError extends Error {
  constructor(message: string, public line?: number) {
    super(message)
    this.name = 'ChangelogParseError'
  }
}

const VERSION_REGEX = /^##\s+\[(.+?)\]\s*(?:[—–-]\s*)?(.+)?$/
const SECTION_REGEX = /^###\s+(.+)/
const ITEM_REGEX = /^[-*]\s+(.+)/

export function parseChangelog(text: string): ChangelogVersion[] {
  const versions: ChangelogVersion[] = []
  let currentVersion: ChangelogVersion | null = null
  let currentSection: ChangelogSection | null = null
  let lineNum = 0

  for (const rawLine of text.split('\n')) {
    lineNum++
    const trimmed = rawLine.trim()

    if (!trimmed || trimmed.startsWith('# ') || trimmed.startsWith('<!--') || trimmed.startsWith('<h')) continue

    const versionMatch = trimmed.match(VERSION_REGEX)
    if (versionMatch) {
      if (currentVersion) {
        if (currentSection) {
          currentVersion.sections.push(currentSection)
          currentSection = null
        }
        versions.push(currentVersion)
      }
      currentVersion = {
        version: versionMatch[1],
        date: (versionMatch[2] || '').trim(),
        sections: [],
      }
      continue
    }

    if (!currentVersion) continue

    const sectionMatch = trimmed.match(SECTION_REGEX)
    if (sectionMatch) {
      if (currentSection) currentVersion.sections.push(currentSection)
      let heading = sectionMatch[1].trim()
      heading = heading.replace(/^[^\w\s]+\s*/g, '').trim()
      currentSection = { heading, items: [] }
      continue
    }

    const itemMatch = trimmed.match(ITEM_REGEX)
    if (itemMatch && currentSection) {
      const text = itemMatch[1].trim()
      currentSection.items.push({ text })
    }
  }

  if (currentVersion) {
    if (currentSection) currentVersion.sections.push(currentSection)
    versions.push(currentVersion)
  }

  return versions
}

export function formatVersionCount(versions: ChangelogVersion[]): {
  releases: number
  totalChanges: number
  uniqueCategories: number
  latestVersion: string
} {
  const allSections = versions.flatMap(v => v.sections)
  const allItems = allSections.flatMap(s => s.items)
  const uniqueCategories = [...new Set(allSections.map(s => s.heading.toLowerCase()))]

  return {
    releases: versions.length,
    totalChanges: allItems.length,
    uniqueCategories: uniqueCategories.length,
    latestVersion: versions[0]?.version || '—',
  }
}
