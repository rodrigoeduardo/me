// Locale list and URL helpers. Kept apart from the dictionaries in i18n.ts so
// client components can import it without shipping every translation.

export const locales = ['en', 'pt-BR'] as const

export type Locale = (typeof locales)[number]

// English lives at the unprefixed URLs; every other locale gets a prefix.
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// `path` is the locale-free path, like '/', '/posts' or '/#projects'.
export function localePath(locale: Locale, path = '/'): string {
  if (locale === defaultLocale) return path
  if (path === '/') return `/${locale}`
  if (path.startsWith('/#')) return `/${locale}${path.slice(1)}`
  return `/${locale}${path}`
}

// Drops a leading locale segment: '/pt-BR/posts' -> '/posts'.
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')
  if (!isLocale(first)) return pathname
  return `/${rest.join('/')}`
}

// hreflang map for one page, as Next's `alternates.languages` expects.
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map(locale => [locale, localePath(locale, path)])
    ),
    'x-default': localePath(defaultLocale, path)
  }
}
