'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

export interface PostCardProps {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: {
    url: string
    alt: string
  } | null
  category?: {
    name: string
    slug: string
  } | null
  publishedAt?: string | null
}

export function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  publishedAt,
}: PostCardProps) {
  const { t } = useLanguage()

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        {coverImage && (
          <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg bg-foreground/5">
            <Image
              src={coverImage.url}
              alt={coverImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-mono text-foreground/50">
            {category && (
              <span className="uppercase tracking-wider text-highlight">
                {category.name}
              </span>
            )}
            {formattedDate && <time dateTime={publishedAt!}>{formattedDate}</time>}
          </div>

          <h3 className="text-lg font-semibold leading-tight group-hover:text-highlight transition-colors">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-foreground/60 line-clamp-2">{excerpt}</p>
          )}

          <span className="inline-block text-sm font-medium text-highlight opacity-0 group-hover:opacity-100 transition-opacity">
            {t('posts.readMore')} →
          </span>
        </div>
      </Link>
    </article>
  )
}
