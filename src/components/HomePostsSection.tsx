'use client'

import useSWR from 'swr'
import { PostList } from './PostList'
import { useLanguage } from '@/lib/i18n'
import { fetcher } from '@/lib/fetcher'
import type { PostCardProps } from './PostCard'

interface PostsResponse {
  docs: Array<{
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
  }>
}

function normalizeImageUrl(url: string): string {
  // Convert absolute localhost URLs to relative paths for Next.js Image
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  if (url.startsWith(serverUrl)) {
    return url.slice(serverUrl.length)
  }
  return url
}

function formatPosts(data: PostsResponse | undefined): PostCardProps[] {
  if (!data?.docs) return []

  return data.docs.map(post => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage
      ? {
          url: normalizeImageUrl(post.coverImage.url),
          alt: post.coverImage.alt || post.title
        }
      : null,
    category: post.category
      ? {
          name: post.category.name,
          slug: post.category.slug
        }
      : null,
    publishedAt: post.publishedAt
  }))
}

export function HomePostsSection() {
  const { t } = useLanguage()
  const { data, isLoading } = useSWR<PostsResponse>(
    '/api/posts?where[status][equals]=published&limit=6&sort=-publishedAt',
    fetcher
  )

  const posts = formatPosts(data)

  return (
    <section id='posts' className='py-24 border-t border-foreground/5'>
      <div className='max-w-5xl mx-auto px-6'>
        <h2 className='text-3xl font-bold mb-12'>{t('posts.title')}</h2>
        {isLoading ? (
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map(i => (
              <div key={i} className='space-y-4 animate-pulse'>
                <div className='aspect-video bg-foreground/5 rounded-lg' />
                <div className='h-4 bg-foreground/5 rounded w-1/4' />
                <div className='h-6 bg-foreground/5 rounded w-3/4' />
                <div className='h-4 bg-foreground/5 rounded w-full' />
              </div>
            ))}
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </section>
  )
}
