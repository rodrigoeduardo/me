'use client'

import { PostCard, type PostCardProps } from './PostCard'
import { useLanguage } from '@/lib/i18n'

interface PostListProps {
  posts: PostCardProps[]
}

export function PostList({ posts }: PostListProps) {
  const { t } = useLanguage()

  if (posts.length === 0) {
    return (
      <p className='text-center text-foreground/50 py-12'>{t('posts.empty')}</p>
    )
  }

  return (
    <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}
