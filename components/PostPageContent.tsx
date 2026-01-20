'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

interface Post {
  title: string
  slug: string
  excerpt?: string | null
  content?: any
  coverImage?: {
    filename: string
    alt: string
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
      if (node.format & 16) text = <code key={index} className="px-1.5 py-0.5 bg-foreground/5 rounded font-mono text-sm">{text}</code>

      return text
    }

    const children = node.children?.map((child: any, i: number) => renderNode(child, i))

    switch (node.type) {
      case 'paragraph':
        return <p key={index} className="mb-4 leading-relaxed">{children}</p>
      case 'heading':
        const level = node.tag?.replace('h', '') || '2'
        const headingClasses: Record<string, string> = {
          '1': 'text-3xl font-bold mt-8 mb-4',
          '2': 'text-2xl font-bold mt-8 mb-4',
          '3': 'text-xl font-semibold mt-6 mb-3',
          '4': 'text-lg font-semibold mt-4 mb-2',
        }
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        return <HeadingTag key={index} className={headingClasses[level] || 'font-bold mb-4'}>{children}</HeadingTag>
      case 'list':
        if (node.listType === 'number') {
          return <ol key={index} className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
        }
        return <ul key={index} className="list-disc list-inside mb-4 space-y-1">{children}</ul>
      case 'listitem':
        return <li key={index}>{children}</li>
      case 'quote':
        return <blockquote key={index} className="border-l-4 border-highlight pl-4 italic my-4 text-foreground/70">{children}</blockquote>
      case 'link':
        return <a key={index} href={node.url} className="text-highlight underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>
      case 'code':
        return <pre key={index} className="bg-foreground/5 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm"><code>{children}</code></pre>
      default:
        return children
    }
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  )
}

export function PostPageContent({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts?where[slug][equals]=${slug}&limit=1&depth=1`)
        if (res.ok) {
          const data = await res.json()
          if (data.docs?.[0]) {
            setPost(data.docs[0])
          } else {
            setNotFound(true)
          }
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Failed to fetch post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-3xl mx-auto px-6 animate-pulse space-y-8">
          <div className="h-8 bg-foreground/5 rounded w-3/4" />
          <div className="h-4 bg-foreground/5 rounded w-1/4" />
          <div className="aspect-[16/9] bg-foreground/5 rounded-lg" />
          <div className="space-y-4">
            <div className="h-4 bg-foreground/5 rounded w-full" />
            <div className="h-4 bg-foreground/5 rounded w-full" />
            <div className="h-4 bg-foreground/5 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/posts" className="text-highlight hover:underline">
            ← Back to posts
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-6 transition-colors"
          >
            ← Back to posts
          </Link>

          <div className="flex items-center gap-3 text-sm font-mono text-foreground/50 mb-4">
            {post.category && (
              <span className="uppercase tracking-wider text-highlight">
                {post.category.name}
              </span>
            )}
            {formattedDate && <time dateTime={post.publishedAt!}>{formattedDate}</time>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-foreground/60 mt-4">{post.excerpt}</p>
          )}
        </header>

        {post.coverImage && (
          <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-lg">
            <Image
              src={`/media/${post.coverImage.filename}`}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="text-foreground/80">
          <RichTextRenderer content={post.content} />
        </div>
      </div>
    </article>
  )
}
