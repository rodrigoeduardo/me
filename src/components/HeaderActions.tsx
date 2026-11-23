'use client'

import dynamic from 'next/dynamic'
import { LanguageToggle } from './LanguageToggle'
import type { ThemeToggleLabels } from './ThemeToggle'
import type { Locale } from '@/lib/locales'

// next/dynamic with ssr: false only works from a client component, so the
// header's interactive controls live here.
const ThemeToggle = dynamic(
  () => import('@/components/ThemeToggle').then(m => m.ThemeToggle),
  {
    ssr: false,
    loading: () => <div className='w-9 h-9' />
  }
)

interface HeaderActionsProps {
  locale: Locale
  themeLabels: ThemeToggleLabels
  languageLabel: string
}

export function HeaderActions({
  locale,
  themeLabels,
  languageLabel
}: HeaderActionsProps) {
  return (
    <>
      <ThemeToggle labels={themeLabels} />
      <LanguageToggle locale={locale} label={languageLabel} />
    </>
  )
}
