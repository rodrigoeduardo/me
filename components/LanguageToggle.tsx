'use client'

import { useLanguage, type Locale } from '@/lib/i18n'

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  const toggle = () => {
    const next: Locale = locale === 'en' ? 'pt-BR' : 'en'
    setLocale(next)
  }

  return (
    <button
      onClick={toggle}
      className='px-2 h-9 flex items-center justify-center rounded-full text-sm font-mono font-medium text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors uppercase'
      aria-label={`Switch to ${locale === 'en' ? 'Portuguese' : 'English'}`}
    >
      {locale === 'en' ? 'PT' : 'EN'}
    </button>
  )
}
