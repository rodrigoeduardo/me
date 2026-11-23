import type { MetadataRoute } from 'next'
import { languageAlternates, locales, localePath } from '@/lib/locales'
import { getPosts } from '@/lib/posts'
import { siteUrl } from '@/lib/site'

export const revalidate = 3600

function entries(
  path: string,
  lastModified?: string | null
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([lang, href]) => [
      lang,
      `${siteUrl}${href}`
    ])
  )
  return locales.map(locale => ({
    url: `${siteUrl}${localePath(locale, path)}`,
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages }
  }))
}

// Home and the posts index are always listed; posts only when the CMS answers.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts('en')) ?? []

  return [
    ...entries('/'),
    ...entries('/posts', posts[0]?.updatedAt),
    ...posts.flatMap(post =>
      entries(`/posts/${post.slug}`, post.updatedAt ?? post.publishedAt)
    )
  ]
}
