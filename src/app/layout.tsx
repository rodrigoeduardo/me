import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'

// Titles, descriptions and hreflang alternates are set per locale in
// (site)/[locale]; this only anchors relative metadata URLs to the origin.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl)
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
