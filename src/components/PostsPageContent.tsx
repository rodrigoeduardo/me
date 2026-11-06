'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { useLanguage } from '@/lib/i18n'
import { fetcher } from '@/lib/fetcher'
import { Box } from '@/components/profile/Box'

interface Category {
  id: string
  name: string
  slug: string
}

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

interface CategoriesResponse {
  docs: Category[]
}

function normalizeImageUrl(url: string): string {
  // Convert absolute localhost URLs to relative paths for Next.js Image
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  if (url.startsWith(serverUrl)) {
    return url.slice(serverUrl.length)
  }
  return url
}

export function PostsPageContent() {
  const { t, locale } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const {
    data: postsData,
    error,
    isLoading: postsLoading
  } = useSWR<PostsResponse>(
    `/api/posts?where[status][equals]=published&sort=-publishedAt&limit=100&locale=${locale}`,
    fetcher,
    { errorRetryCount: 2 }
  )

  const { data: categoriesData, isLoading: categoriesLoading } =
    useSWR<CategoriesResponse>(
      `/api/categories?limit=100&locale=${locale}`,
      fetcher,
      { errorRetryCount: 2 }
    )

  const posts = useMemo(() => postsData?.docs ?? [], [postsData])
  const categories = categoriesData?.docs || []
  const loading = postsLoading || categoriesLoading

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts
    return posts.filter(post => post.category?.slug === selectedCategory)
  }, [posts, selectedCategory])

  const filters = [
    { slug: null, name: t('posts.all') },
    ...categories.map(c => ({ slug: c.slug, name: c.name }))
  ]

  return (
    <div className='max-w-[860px] mx-auto px-3 sm:px-4 py-4'>
      <Box
        title={<span className='text-[20px]'>{t('posts.title')}</span>}
        aside={loading ? null : `${filteredPosts.length}`}
      >
        <div
          role='group'
          aria-label={t('posts.categories')}
          className='flex overflow-x-auto border-b border-rule'
        >
          {filters.map(filter => {
            const active = selectedCategory === filter.slug
            return (
              <button
                key={filter.slug ?? 'all'}
                type='button'
                aria-pressed={active}
                onClick={() => setSelectedCategory(filter.slug)}
                className={`relative shrink-0 px-4 h-10 text-[13px] font-bold whitespace-nowrap transition-colors ${
                  active ? 'text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {filter.name}
                {active && (
                  <span
                    className='absolute left-3 right-3 bottom-0 h-[3px] bg-link-fill'
                    aria-hidden='true'
                  />
                )}
              </button>
            )
          })}
        </div>

        {loading ? (
          <ul aria-busy='true'>
            {[0, 1, 2, 3].map(i => (
              <li key={i} className='flex gap-3 px-3 py-3 border-b border-rule'>
                <div className='w-24 h-14 bg-track animate-pulse' />
                <div className='flex-1 space-y-2 pt-1'>
                  <div className='h-3 w-2/3 bg-track animate-pulse' />
                  <div className='h-3 w-1/3 bg-track animate-pulse' />
                </div>
              </li>
            ))}
          </ul>
        ) : error ? (
          <p className='px-3 py-10 text-center text-[13px] text-muted'>
            {t('posts.error')}
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className='px-3 py-10 text-center text-[13px] text-muted'>
            {t('posts.empty')}
          </p>
        ) : (
          <ul>
            {filteredPosts.map(post => (
              <li key={post.slug} className='border-b border-rule last:border-b-0'>
                <Link
                  href={`/posts/${post.slug}`}
                  className='flex gap-3 px-3 py-3 hover:bg-surface-head'
                >
                  <div className='relative w-24 h-14 shrink-0 bg-panel overflow-hidden'>
                    {post.coverImage && (
                      <Image
                        src={normalizeImageUrl(post.coverImage.url)}
                        alt=''
                        fill
                        sizes='96px'
                        className='object-cover'
                      />
                    )}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[14px] font-bold leading-snug'>
                      {post.title}
                    </p>
                    {post.excerpt && (
                      <p className='mt-0.5 text-[13px] text-muted line-clamp-1'>
                        {post.excerpt}
                      </p>
                    )}
                    <p className='mt-1 text-xs text-muted'>
                      <span className='text-link'>
                        {post.category?.name ?? t('posts.uncategorized')}
                      </span>
                      {post.publishedAt && (
                        <>
                          {' · '}
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              locale,
                              { day: 'numeric', month: 'short', year: 'numeric' }
                            )}
                          </time>
                        </>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </div>
  )
}
