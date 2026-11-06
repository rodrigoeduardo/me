'use client'

import Image from 'next/image'
import { Mail } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { profile, shippedProducts, teams } from '@/lib/profile'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'

function shortYear(date: string) {
  return `'${date.slice(2, 4)}`
}

export function ProfileCard() {
  const { t, locale } = useLanguage()

  const rows = [
    { label: t('profile.role'), value: profile.role[locale] },
    {
      label: t('profile.currentTeam'),
      value: (
        <a href='#experience' className='text-link hover:underline'>
          {profile.currentTeam.company} · {profile.currentTeam.role}
        </a>
      )
    },
    {
      label: t('profile.experience'),
      value: `${profile.experienceYears} ${t('profile.years')}`
    },
    {
      label: t('profile.teams'),
      value: (
        <span className='flex flex-wrap justify-end gap-x-2 gap-y-0.5'>
          {teams.map(team => (
            <span key={team.company} className='whitespace-nowrap'>
              <span className='text-link'>{team.company}</span>{' '}
              <span className='text-muted'>
                ({shortYear(team.start)}
                {team.end ? `–${shortYear(team.end)}` : '–'})
              </span>
            </span>
          ))}
        </span>
      )
    }
  ]

  return (
    <section
      aria-label={profile.name}
      className='bg-surface border border-rule grid sm:grid-cols-[180px_1fr]'
    >
      <div className='relative bg-panel aspect-[4/3] sm:aspect-auto sm:h-full min-h-[180px] overflow-hidden'>
        <Image
          src={profile.avatar}
          alt={profile.fullName}
          fill
          sizes='(min-width: 640px) 180px, 100vw'
          className='object-cover object-top'
          priority
        />
        <span className='absolute top-0 left-0 bg-link-fill text-white text-[11px] font-bold px-1.5 py-0.5'>
          {t('profile.tag')}
        </span>
        <span
          className='absolute top-7 left-2 flex flex-col gap-1.5'
          aria-hidden='true'
        >
          <BrazilFlag />
        </span>
      </div>

      <div className='p-4 sm:p-5 min-w-0'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h1 className='text-[26px] sm:text-[28px] leading-none font-bold tracking-[-0.01em] break-all'>
              {profile.handle}
            </h1>
            <p className='mt-1.5 text-[13px] text-muted'>
              {profile.fullName} · {profile.location[locale]}
            </p>
          </div>
          <div className='flex gap-1.5 shrink-0'>
            <SocialButton href={profile.github} label='GitHub'>
              <GitHubIcon />
            </SocialButton>
            <SocialButton href={profile.linkedin} label='LinkedIn'>
              <LinkedInIcon />
            </SocialButton>
            <SocialButton
              href={`mailto:${profile.email}`}
              label={t('profile.email')}
            >
              <Mail size={18} strokeWidth={2} aria-hidden='true' />
            </SocialButton>
          </div>
        </div>

        <dl className='mt-4 text-[13px]'>
          {rows.map(row => (
            <div
              key={row.label}
              className='flex items-baseline justify-between gap-4 py-2 border-b border-rule'
            >
              <dt className='font-bold shrink-0'>{row.label}</dt>
              <dd className='text-right min-w-0'>{row.value}</dd>
            </div>
          ))}
          <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 border-b border-rule'>
            <dt className='font-bold'>{t('profile.achievements')}</dt>
            <dd className='flex flex-wrap justify-end gap-1.5'>
              <a
                href='#featured'
                className='bg-gold text-on-gold text-xs font-semibold px-2 py-0.5 hover:brightness-105'
              >
                {t('profile.badgeProduction')}
              </a>
              <a
                href='#experience'
                title={shippedProducts.join(', ')}
                className='bg-panel text-white text-xs font-semibold px-2 py-0.5 hover:bg-link-fill transition-colors'
              >
                {shippedProducts.length}x {t('profile.badgeShipped')}
              </a>
              <a
                href='https://github.com/rodrigoeduardo/raw'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-link-fill text-white text-xs font-semibold px-2 py-0.5 hover:brightness-110'
              >
                {t('profile.badgeOpenSource')}
              </a>
            </dd>
          </div>
          <div className='flex items-baseline justify-between gap-4 pt-2'>
            <dt className='font-bold shrink-0'>{t('profile.status')}</dt>
            <dd className='text-right text-win font-semibold'>
              {profile.availability[locale]}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

interface SocialButtonProps {
  href: string
  label: string
  children: React.ReactNode
}

function SocialButton({ href, label, children }: SocialButtonProps) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className='w-9 h-9 flex items-center justify-center bg-panel text-white hover:bg-link-fill transition-colors'
    >
      {children}
    </a>
  )
}

function BrazilFlag() {
  return (
    <svg width='22' height='15' viewBox='0 0 22 15' role='img'>
      <rect width='22' height='15' fill='#229e45' />
      <path d='M11 1.6 20 7.5 11 13.4 2 7.5Z' fill='#f8e509' />
      <circle cx='11' cy='7.5' r='3.4' fill='#2b49a3' />
    </svg>
  )
}
