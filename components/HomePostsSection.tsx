'use client'

import { useEffect, useState } from 'react'
import { PostList } from './PostList'
import { useLanguage } from '@/lib/i18n'
import type { PostCardProps } from './PostCard'

export function HomePostsSection() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<PostCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts?where[status][equals]=published&limit=6&sort=-publishedAt')
        if (res.ok) {
          const data = await res.json()
          const formattedPosts = data.docs?.map((post: any) => ({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            coverImage: post.coverImage
              ? {
                  url: `/media/${post.coverImage.filename}`,
                  alt: post.coverImage.alt || post.title,
                }
              : null,
            category: post.category
              ? {
                  name: post.category.name,
                  slug: post.category.slug,
                }
              : null,
            publishedAt: post.publishedAt,
          })) || []
          setPosts(formattedPosts)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section id="posts" className="py-24 border-t border-foreground/5">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">{t('posts.title')}</h2>
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-[16/9] bg-foreground/5 rounded-lg" />
                <div className="h-4 bg-foreground/5 rounded w-1/4" />
                <div className="h-6 bg-foreground/5 rounded w-3/4" />
                <div className="h-4 bg-foreground/5 rounded w-full" />
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
