'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localePath, stripLocale, type Locale } from '@/lib/locales'

interface LanguageToggleProps {
  locale: Locale
  label: string
}

// Each language has its own URL, so switching is a link to the same page in
// the other locale.
export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const pathname = usePathname()
  const next: Locale = locale === 'en' ? 'pt-BR' : 'en'
  const short = next === 'en' ? 'EN' : 'PT'

  return (
    <Link
      href={localePath(next, stripLocale(pathname))}
      hrefLang={next}
      className='px-2 h-9 flex items-center justify-center text-[13px] font-bold text-muted hover:text-foreground hover:bg-surface-head transition-colors'
      aria-label={`${short}: ${label}`}
      title={label}
    >
      {short}
    </Link>
  )
}
