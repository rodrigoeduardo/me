import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { PostPageContent } from '@/components/PostPageContent'
import { isLocale, languageAlternates, localePath } from '@/lib/locales'
import { getPost, normalizeImageUrl } from '@/lib/posts'
import { baseOpenGraph } from '@/lib/site'
import { postStructuredData } from '@/lib/structured-data'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = await getPost(slug, locale)

  if (!post) {
    return { title: 'Post' }
  }

  const path = `/posts/${post.slug}`
  const description = post.excerpt || `Read ${post.title} by Rodrigo Eduardo`

  return {
    title: post.title,
    description,
    // Both locales share the slug; the body stays the same until Payload
    // localization is enabled, but the page chrome is translated.
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path)
    },
    openGraph: {
      ...baseOpenGraph(locale),
      title: post.title,
      description,
      url: localePath(locale, path),
      type: 'article',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.coverImage
        ? { images: [normalizeImageUrl(post.coverImage.url)] }
        : {})
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const post = await getPost(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <>
      <JsonLd data={postStructuredData(post, locale)} />
      <PostPageContent post={post} locale={locale} />
    </>
  )
}
