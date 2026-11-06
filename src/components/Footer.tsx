'use client'

import { useLanguage } from '@/lib/i18n'
import { profile } from '@/lib/profile'

const currentYear = new Date().getFullYear()

export function Footer() {
  const { t } = useLanguage()

  const links = [
    { href: profile.github, label: 'GitHub' },
    { href: profile.linkedin, label: 'LinkedIn' },
    { href: `mailto:${profile.email}`, label: profile.email }
  ]

  return (
    <footer className='mt-6 bg-panel text-white/75'>
      <div className='max-w-[1240px] mx-auto px-3 sm:px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[13px]'>
        <p>
          © {currentYear} {profile.name}. {t('footer.rights')}
        </p>
        <ul className='flex flex-wrap items-center gap-x-4 gap-y-1'>
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className='hover:text-white hover:underline'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
