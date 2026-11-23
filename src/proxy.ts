import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale } from '@/lib/locales'

// Pages live under app/(site)/[locale]. English is served at the unprefixed
// URLs (rewritten to /en/...), other locales keep their prefix, and /en/...
// redirects to the unprefixed URL so each page has one canonical address.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const prefix = `/${defaultLocale}`

  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(prefix.length) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/pt-BR' || pathname.startsWith('/pt-BR/')) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `${prefix}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Payload (admin, API), Next internals and any file with an extension
  // (sitemap.xml, robots.txt, llms.txt, images, CVs).
  matcher: ['/((?!api|admin|_next|.*\\..*).*)']
}
