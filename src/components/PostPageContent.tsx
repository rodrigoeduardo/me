'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

function normalizeImageUrl(url: string): string {
  // Convert absolute localhost URLs to relative paths for Next.js Image
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  if (url.startsWith(serverUrl)) {
    return url.slice(serverUrl.length)
  }
  return url
}

interface Post {
  title: string
  slug: string
  excerpt?: string | null
  content?: any
  coverImage?: {
    url: string
    alt?: string
  } | null
  category?: {
    name: string
    slug: string
  } | null
  publishedAt?: string | null
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content?.root?.children) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let text: React.ReactNode = node.text

      if (node.format & 1) text = <strong key={index}>{text}</strong>
      if (node.format & 2) text = <em key={index}>{text}</em>
      if (node.format & 8) text = <u key={index}>{text}</u>
      if (node.format & 16)
        text = (
          <code
            key={index}
            className='px-1 py-0.5 bg-surface-head border border-rule font-mono text-[0.9em]'
          >
            {text}
          </code>
        )

      return text
    }

    const children = node.children?.map((child: any, i: number) =>
      renderNode(child, i)
    )

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className='mb-4 leading-relaxed'>
            {children}
          </p>
        )
      case 'heading':
        const level = node.tag?.replace('h', '') || '2'
        const headingClasses: Record<string, string> = {
          '1': 'text-3xl font-bold mt-8 mb-4',
          '2': 'text-2xl font-bold mt-8 mb-4',
          '3': 'text-xl font-semibold mt-6 mb-3',
          '4': 'text-lg font-semibold mt-4 mb-2'
        }
        const HeadingTag = `h${level}` as
          | 'h1'
          | 'h2'
          | 'h3'
          | 'h4'
          | 'h5'
          | 'h6'
        return (
          <HeadingTag
            key={index}
            className={headingClasses[level] || 'font-bold mb-4'}
          >
            {children}
          </HeadingTag>
        )
      case 'list':
        if (node.listType === 'number') {
          return (
            <ol key={index} className='list-decimal list-inside mb-4 space-y-1'>
              {children}
            </ol>
          )
        }
        return (
          <ul key={index} className='list-disc list-inside mb-4 space-y-1'>
            {children}
          </ul>
        )
      case 'listitem':
        return <li key={index}>{children}</li>
      case 'quote':
        return (
          <blockquote
            key={index}
            className='bg-surface-head px-4 py-3 italic my-4 text-muted'
          >
            {children}
          </blockquote>
        )
      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            className='text-link underline hover:no-underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
          </a>
        )
      case 'code':
        return (
          <pre
            key={index}
            className='bg-panel text-white/90 p-4 overflow-x-auto mb-4 font-mono text-[13px]'
          >
            <code>{children}</code>
          </pre>
        )
      default:
        return children
    }
  }

  return (
    <div className='max-w-[68ch] text-[15px] leading-relaxed'>
      {content.root.children.map((node: any, index: number) =>
        renderNode(node, index)
      )}
    </div>
  )
}

export { type Post }

export function PostPageContent({ post }: { post: Post }) {
  const { t, locale } = useLanguage()
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className='max-w-[860px] mx-auto px-3 sm:px-4 py-4'>
      <Link
        href='/posts'
        className='inline-flex items-center gap-1.5 mb-3 text-[13px] text-link hover:underline'
      >
        <ArrowLeft size={14} aria-hidden='true' />
        {t('posts.back')}
      </Link>

      <article className='bg-surface border border-rule'>
        <header className='px-4 sm:px-6 pt-5 pb-4 border-b border-rule'>
          <p className='text-xs text-muted'>
            {post.category && (
              <span className='text-link font-semibold'>
                {post.category.name}
              </span>
            )}
            {post.category && formattedDate && ' · '}
            {formattedDate && (
              <time dateTime={post.publishedAt!}>{formattedDate}</time>
            )}
          </p>

          <h1 className='mt-2 text-[28px] sm:text-[32px] font-bold leading-tight tracking-[-0.01em] text-balance'>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className='mt-2 text-[15px] text-muted'>{post.excerpt}</p>
          )}
        </header>

        {post.coverImage && (
          <div className='relative aspect-video bg-panel'>
            <Image
              src={normalizeImageUrl(post.coverImage.url)}
              alt={post.coverImage.alt || post.title}
              fill
              sizes='860px'
              className='object-cover'
              priority
            />
          </div>
        )}

        <div className='px-4 sm:px-6 py-6'>
          <RichTextRenderer content={post.content} />
        </div>
      </article>
    </div>
  )
}
