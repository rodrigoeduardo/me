import type { Locale } from './locales'
import { siteUrl } from './site'

// Server-side reads from the Payload REST API. They go over HTTP instead of
// the local API because pages are prerendered at build time, when the
// database is not reachable; on failure they return null and ISR retries.

export interface PostSummary {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: {
    url: string
    alt?: string
  } | null
  category?: {
    name: string
    slug: string
  } | null
  publishedAt?: string | null
  updatedAt?: string | null
}

export interface Post extends PostSummary {
  content?: unknown
}

export interface Category {
  id: string
  name: string
  slug: string
}

const REVALIDATE = 60

// `locale` is passed through for when Payload localization is enabled;
// payload.config.ts has no `localization` block yet, so it has no effect.
async function fetchDocs<T>(query: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${siteUrl}/api/${query}`, {
      next: { revalidate: REVALIDATE }
    })
    if (!res.ok) return null
    const data = (await res.json()) as { docs?: T[] }
    return data.docs ?? []
  } catch (error) {
    console.error(`Failed to fetch /api/${query}:`, error)
    return null
  }
}

export function getPosts(locale: Locale, limit = 100) {
  return fetchDocs<PostSummary>(
    `posts?where[status][equals]=published&sort=-publishedAt&limit=${limit}&depth=1&locale=${locale}`
  )
}

export function getCategories(locale: Locale) {
  return fetchDocs<Category>(`categories?limit=100&locale=${locale}`)
}

export async function getPost(slug: string, locale: Locale) {
  const docs = await fetchDocs<Post>(
    `posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=1&locale=${locale}`
  )
  return docs?.[0] ?? null
}

// Payload returns absolute media URLs; next/image wants same-origin ones
// relative so they go through the local optimizer.
export function normalizeImageUrl(url: string): string {
  return url.startsWith(siteUrl) ? url.slice(siteUrl.length) : url
}

export function formatPostDate(
  date: string,
  locale: Locale,
  month: 'short' | 'long' = 'short'
) {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month,
    year: 'numeric'
  })
}
