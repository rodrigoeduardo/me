import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  PostsPageContent,
  type PostListItem
} from '@/components/PostsPageContent'
import { getTranslator } from '@/lib/i18n'
import { isLocale, languageAlternates, localePath } from '@/lib/locales'
import {
  formatPostDate,
  getCategories,
  getPosts,
  normalizeImageUrl
} from '@/lib/posts'
import { baseOpenGraph } from '@/lib/site'

export const revalidate = 60

interface PostsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params
}: PostsPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getTranslator(locale)

  return {
    title: t('meta.postsTitle'),
    description: t('meta.postsDescription'),
    alternates: {
      canonical: localePath(locale, '/posts'),
      languages: languageAlternates('/posts')
    },
    openGraph: {
      ...baseOpenGraph(locale),
      title: `${t('meta.postsTitle')} | Rodrigo Eduardo`,
      description: t('meta.postsDescription'),
      url: localePath(locale, '/posts')
    }
  }
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getTranslator(locale)

  const [posts, categories] = await Promise.all([
    getPosts(locale),
    getCategories(locale)
  ])

  const items: PostListItem[] | null =
    posts?.map(post => ({
      ...post,
      coverImage: post.coverImage
        ? { ...post.coverImage, url: normalizeImageUrl(post.coverImage.url) }
        : null,
      href: localePath(locale, `/posts/${post.slug}`),
      dateLabel: post.publishedAt
        ? formatPostDate(post.publishedAt, locale)
        : null
    })) ?? null

  return (
    <PostsPageContent
      posts={items}
      categories={categories ?? []}
      labels={{
        title: t('posts.title'),
        categories: t('posts.categories'),
        all: t('posts.all'),
        empty: t('posts.empty'),
        error: t('posts.error'),
        uncategorized: t('posts.uncategorized')
      }}
    />
  )
}
