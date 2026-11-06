'use client'

import { useLanguage, type Locale } from '@/lib/i18n'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  const toggle = () => {
    const next: Locale = locale === 'en' ? 'pt-BR' : 'en'
    setLocale(next)
  }

  return (
    <button
      onClick={toggle}
      className='px-2 h-9 flex items-center justify-center text-[13px] font-bold text-muted hover:text-foreground hover:bg-surface-head transition-colors'
      aria-label={`${locale === 'en' ? 'PT' : 'EN'}: ${t('lang.switch')}`}
      title={t('lang.switch')}
    >
      {locale === 'en' ? 'PT' : 'EN'}
    </button>
  )
}
