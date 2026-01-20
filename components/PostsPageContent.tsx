'use client'

import { useEffect, useState } from 'react'
import { PostCard, type PostCardProps } from './PostCard'
import { useLanguage } from '@/lib/i18n'

interface Category {
  id: string
  name: string
  slug: string
}

export function PostsPageContent() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<PostCardProps[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('/api/posts?where[status][equals]=published&sort=-publishedAt&limit=100'),
          fetch('/api/categories?limit=100'),
        ])

        if (postsRes.ok) {
          const postsData = await postsRes.json()
          const formattedPosts = postsData.docs?.map((post: any) => ({
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

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData.docs || [])
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category?.slug === selectedCategory)
    : posts

  const groupedByCategory = filteredPosts.reduce(
    (acc, post) => {
      const categoryName = post.category?.name || 'Uncategorized'
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(post)
      return acc
    },
    {} as Record<string, PostCardProps[]>
  )

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6">{t('posts.title')}</h1>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-highlight text-black'
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
              }`}
            >
              {t('posts.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-highlight text-black'
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="h-6 bg-foreground/5 rounded w-32" />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="space-y-4">
                      <div className="aspect-[16/9] bg-foreground/5 rounded-lg" />
                      <div className="h-4 bg-foreground/5 rounded w-1/4" />
                      <div className="h-6 bg-foreground/5 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">{t('posts.empty')}</p>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedByCategory).map(([categoryName, categoryPosts]) => (
              <section key={categoryName}>
                <h2 className="text-lg font-mono font-medium text-highlight mb-6 uppercase tracking-wider">
                  {categoryName}
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.slug} {...post} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
