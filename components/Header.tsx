'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '@/lib/i18n'
import { GitHubIcon } from '@/public/assets/icons/GitHubIcon'
import { LinkedInIcon } from '@/public/assets/icons/LinkedInIcon'

export function Header() {
  const { t, locale } = useLanguage()

  const resumeUrl =
    locale === 'pt-BR'
      ? '/assets/cvs/rodrigoeduardo-cv-pt.pdf'
      : '/assets/cvs/rodrigoeduardo-cv-en.pdf'

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5'>
      <div className='max-w-5xl mx-auto px-6 h-16 flex items-center justify-between'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link
            href='/'
            className='font-semibold text-lg tracking-tight hover:text-highlight transition-colors'
          >
            <span className='sm:hidden'>Rod</span>
            <span className='hidden sm:inline'>Rodrigo Eduardo</span>
          </Link>
        </motion.div>

        <motion.nav
          className='flex items-center gap-6'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        >
          <Link
            href='/posts'
            className='text-sm font-medium text-foreground/70 hover:text-foreground transition-colors'
          >
            {t('nav.posts')}
          </Link>

          <a
            href={resumeUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-foreground/70 hover:text-foreground transition-colors'
          >
            {t('nav.cv')}
          </a>

          <motion.div
            className='flex items-center gap-3 pl-3 border-l border-foreground/10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <a
              href='https://github.com/rodrigoeduardo'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground/60 hover:text-foreground transition-colors'
              aria-label='GitHub'
            >
              <GitHubIcon />
            </a>
            <a
              href='https://www.linkedin.com/in/rodrigoedb/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground/60 hover:text-foreground transition-colors'
              aria-label='LinkedIn'
            >
              <LinkedInIcon />
            </a>
          </motion.div>

          <motion.div
            className='flex items-center gap-2 pl-3 border-l border-foreground/10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          >
            <ThemeToggle />
            <LanguageToggle />
          </motion.div>
        </motion.nav>
      </div>
    </header>
  )
}
