import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// Open to every crawler, AI answer engines included. /api stays allowed: the
// home page's posts panel fetches it in the browser, and crawlers that render
// JavaScript need it too.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
