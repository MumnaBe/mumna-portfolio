import { marked } from 'marked'

export type Post = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  tags: string[]
  html: string
  minutes: number
}

const files = import.meta.glob<string>('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parsePost(path: string, raw: string): Post {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta: Record<string, string> = {}
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const colon = line.indexOf(':')
      if (colon > 0) meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '')
    }
  }
  const body = match ? match[2] : raw
  const words = body.split(/\s+/).filter(Boolean).length 

  return {
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: meta.title ?? 'Untitled',
    date: meta.date ?? '',
    summary: meta.summary ?? '',
    tags: meta.tags ? meta.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    html: marked.parse(body, { async: false }),
    minutes: Math.max(1, Math.round(words / 220)),
  }
}

export const posts: Post[] = Object.entries(files)
  .filter(([path]) => !path.split('/').pop()!.startsWith('_'))
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export function formatPostDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
