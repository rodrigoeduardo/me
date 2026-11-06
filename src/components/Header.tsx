'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '@/lib/i18n'

const ThemeToggle = dynamic(
  () => import('@/components/ThemeToggle').then(m => m.ThemeToggle),
  {
    ssr: false,
    loading: () => <div className='w-9 h-9' />
  }
)

export function Header() {
  const { t, locale } = useLanguage()

  const resumeUrl =
    locale === 'pt-BR'
      ? '/assets/cvs/rodrigoeduardo-cv-pt.pdf'
      : '/assets/cvs/rodrigoeduardo-cv-en.pdf'

  const links = [
    { href: '/', label: t('nav.overview') },
    { href: '/#projects', label: t('nav.projects') },
    { href: '/#experience', label: t('nav.experience') },
    { href: '/posts', label: t('nav.posts') }
  ]

  return (
    <header className='sticky top-0 z-50 bg-surface border-b border-rule'>
      <div className='max-w-[1240px] mx-auto px-3 sm:px-4 h-12 flex items-center gap-4'>
        <Link
          href='/'
          className='shrink-0 flex items-center gap-2 font-extrabold text-[15px] tracking-[-0.01em] hover:text-link transition-colors'
        >
          <span
            className='w-7 h-7 flex items-center justify-center bg-link-fill text-white text-[13px] font-extrabold'
            aria-hidden='true'
          >
            RE
          </span>
          <span className='hidden sm:inline'>Rodrigo Eduardo</span>
        </Link>

        <nav className='flex-1 min-w-0 overflow-x-auto'>
          <ul className='flex items-center gap-1 text-[13px]'>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='block px-2.5 py-1.5 whitespace-nowrap text-foreground/85 hover:text-link transition-colors'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='shrink-0 flex items-center gap-1'>
          <ThemeToggle />
          <LanguageToggle />
          <a
            href={resumeUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='ml-1 inline-flex items-center gap-1.5 h-8 px-3 text-[13px] font-bold text-white bg-link-fill hover:brightness-110 transition-[filter]'
          >
            <Download size={15} aria-hidden='true' />
            <span className='hidden sm:inline'>{t('nav.cv')}</span>
            <span className='sm:hidden'>{t('nav.cvShort')}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
