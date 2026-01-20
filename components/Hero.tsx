'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-[80vh] flex items-center py-24">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid gap-12 lg:grid-cols-[1fr,auto] lg:gap-16 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <p className="text-sm font-mono text-highlight tracking-wider uppercase">
                {t('hero.greeting')}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Rodrigo Eduardo
              </h1>
              <p className="text-xl text-foreground/60 font-medium">
                {t('hero.role')}
              </p>
            </div>

            <p className="text-foreground/70 leading-relaxed text-lg">
              {t('hero.description')}
            </p>

            <div className="flex gap-4 pt-4">
              <a
                href="#posts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-medium rounded-full hover:bg-highlight/90 transition-colors"
              >
                {t('hero.cta')}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-highlight/20 rounded-full blur-3xl" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-foreground/10">
              <Image
                src="https://github.com/rodrigoeduardo.png"
                alt="Rodrigo Eduardo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
