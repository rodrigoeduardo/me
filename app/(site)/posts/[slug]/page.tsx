import { PostPageContent, type Post } from '@/components/PostPageContent'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/posts?where[slug][equals]=${slug}&limit=1&depth=1`,
      { next: { revalidate: 60 } }
    )

    if (res.ok) {
      const data = await res.json()
      return data.docs?.[0] || null
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (post) {
    return {
      title: `${post.title} | Rodrigo Eduardo`,
      description: post.excerpt || `Read ${post.title} by Rodrigo Eduardo`
    }
  }

  return {
    title: 'Post | Rodrigo Eduardo'
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <PostPageContent post={post} />
}
