import { locales, type Locale } from './locales'

// Public origin of the site, used for absolute URLs (metadata, sitemap,
// structured data) and for server-side calls to the Payload REST API.
export const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Open Graph fields every page repeats: Next replaces a parent's openGraph
// object instead of merging it.
export function baseOpenGraph(locale: Locale) {
  return {
    siteName: 'Rodrigo Eduardo',
    locale: locale.replace('-', '_'),
    alternateLocale: locales
      .filter(other => other !== locale)
      .map(other => other.replace('-', '_'))
  }
}
