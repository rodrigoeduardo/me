'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box } from '@/components/profile/Box'
import type { Category, PostSummary } from '@/lib/posts'

export interface PostListItem extends PostSummary {
  href: string
  // Formatted on the server so the markup doesn't depend on the browser's
  // time zone.
  dateLabel: string | null
}

export interface PostsPageLabels {
  title: string
  categories: string
  all: string
  empty: string
  error: string
  uncategorized: string
}

interface PostsPageContentProps {
  // null when the CMS could not be reached.
  posts: PostListItem[] | null
  categories: Category[]
  labels: PostsPageLabels
}

export function PostsPageContent({
  posts,
  categories,
  labels
}: PostsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = (posts ?? []).filter(
    post => !selectedCategory || post.category?.slug === selectedCategory
  )

  const filters = [
    { slug: null, name: labels.all },
    ...categories.map(c => ({ slug: c.slug, name: c.name }))
  ]

  return (
    <div className='max-w-[860px] mx-auto px-3 sm:px-4 py-4'>
      <Box
        title={<span className='text-[20px]'>{labels.title}</span>}
        aside={posts ? `${filteredPosts.length}` : null}
      >
        <div
          role='group'
          aria-label={labels.categories}
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
                  active
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
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

        {!posts ? (
          <p className='px-3 py-10 text-center text-[13px] text-muted'>
            {labels.error}
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className='px-3 py-10 text-center text-[13px] text-muted'>
            {labels.empty}
          </p>
        ) : (
          <ul>
            {filteredPosts.map(post => (
              <li
                key={post.slug}
                className='border-b border-rule last:border-b-0'
              >
                <Link
                  href={post.href}
                  className='flex gap-3 px-3 py-3 hover:bg-surface-head'
                >
                  <div className='relative w-24 h-14 shrink-0 bg-panel overflow-hidden'>
                    {post.coverImage && (
                      <Image
                        src={post.coverImage.url}
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
                        {post.category?.name ?? labels.uncategorized}
                      </span>
                      {post.publishedAt && post.dateLabel && (
                        <>
                          {' · '}
                          <time dateTime={post.publishedAt}>
                            {post.dateLabel}
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
