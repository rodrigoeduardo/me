import { PostPageContent } from '@/components/PostPageContent'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/posts?where[slug][equals]=${slug}&limit=1`,
      { next: { revalidate: 60 } }
    )

    if (res.ok) {
      const data = await res.json()
      const post = data.docs?.[0]

      if (post) {
        return {
          title: `${post.title} | Rodrigo Eduardo`,
          description: post.excerpt || `Read ${post.title} by Rodrigo Eduardo`,
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch post metadata:', error)
  }

  return {
    title: 'Post | Rodrigo Eduardo',
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  return <PostPageContent slug={slug} />
}
