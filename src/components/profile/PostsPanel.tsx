'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { localePath, type Locale } from '@/lib/locales'
import { Box, BoxButton } from './Box'

interface PostsResponse {
  docs: Array<{
    title: string
    slug: string
    publishedAt?: string | null
    category?: { name: string } | null
  }>
}

export interface PostsPanelLabels {
  latest: string
  error: string
  empty: string
  allPosts: string
}

interface PostsPanelProps {
  locale: Locale
  labels: PostsPanelLabels
  limit?: number
}

// Fetched in the browser: the home page is prerendered at build time, when
// the CMS database is not reachable.
export function PostsPanel({ locale, labels, limit = 6 }: PostsPanelProps) {
  const { data, error, isLoading } = useSWR<PostsResponse>(
    `/api/posts?where[status][equals]=published&limit=${limit}&sort=-publishedAt&locale=${locale}`,
    fetcher,
    { errorRetryCount: 2 }
  )
  const posts = data?.docs ?? []

  return (
    <Box title={labels.latest}>
      {isLoading ? (
        <ul aria-busy='true'>
          {[0, 1, 2].map(i => (
            <li key={i} className='px-3 py-3 border-b border-rule'>
              <div className='h-3 w-2/3 bg-track animate-pulse' />
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className='px-3 py-6 text-[13px] text-muted'>{labels.error}</p>
      ) : posts.length === 0 ? (
        <p className='px-3 py-6 text-[13px] text-muted'>{labels.empty}</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.slug} className='border-b border-rule'>
              <Link
                href={localePath(locale, `/posts/${post.slug}`)}
                className='flex items-baseline justify-between gap-3 px-3 py-2.5 text-[13px] hover:bg-surface-head'
              >
                <span className='font-semibold'>{post.title}</span>
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className='text-xs text-muted shrink-0'
                  >
                    {new Date(post.publishedAt).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className='pt-3'>
        <BoxButton href={localePath(locale, '/posts')}>
          {labels.allPosts}
        </BoxButton>
      </div>
    </Box>
  )
}
