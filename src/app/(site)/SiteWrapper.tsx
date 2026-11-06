'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LanguageProvider } from '@/lib/i18n'

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
