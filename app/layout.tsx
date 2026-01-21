import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rodrigo Eduardo | Software Engineer',
  description:
    'Front-end and full-stack developer passionate about building elegant, performant web experiences with React, Next.js, and TypeScript.',
  openGraph: {
    title: 'Rodrigo Eduardo | Software Engineer',
    description:
      'Front-end and full-stack developer passionate about building elegant, performant web experiences.',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
