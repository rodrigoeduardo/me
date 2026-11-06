'use client'

import { useLanguage } from '@/lib/i18n'
import {
  achievements,
  education,
  languages,
  profile,
  stack
} from '@/lib/profile'
import type { RepoActivity } from '@/lib/github'
import { RailHeading } from './Box'

const RANKED = stack.filter(tech => tech.current).slice(0, 8)
const GAME_JAMS = achievements.filter(item => /jam/i.test(item.context))

// Left rail: the current stack as a ranking, then education, languages
// and, last, game jams.
export function LeftRail() {
  const { t, locale } = useLanguage()

  return (
    <aside className='text-[13px]'>
      <RailHeading>{t('rail.currentStack')}</RailHeading>
      <ol className='bg-surface border border-rule'>
        {RANKED.map((tech, index) => (
          <li
            key={tech.name}
            className='flex items-center gap-2 px-2.5 py-1.5 border-b border-rule last:border-b-0'
          >
            <span className='w-4 text-right text-muted'>{index + 1}.</span>
            <a href='#stack' className='text-link hover:underline truncate'>
              {tech.name}
            </a>
          </li>
        ))}
      </ol>

      <RailHeading>{t('rail.education')}</RailHeading>
      <ul className='bg-surface border border-rule'>
        {education.map(item => (
          <li
            key={item.school}
            className='px-2.5 py-2 border-b border-rule last:border-b-0'
          >
            <p className='font-semibold'>{item.school}</p>
            <p className='text-xs text-muted'>
              {item.degree[locale]} · {item.period}
            </p>
          </li>
        ))}
      </ul>

      <RailHeading>{t('rail.languages')}</RailHeading>
      <ul className='bg-surface border border-rule'>
        {languages.map(item => (
          <li
            key={item.name.en}
            className='flex justify-between gap-2 px-2.5 py-1.5 border-b border-rule last:border-b-0'
          >
            <span className='font-semibold'>{item.name[locale]}</span>
            <span className='text-xs text-muted'>{item.level[locale]}</span>
          </li>
        ))}
      </ul>

      <RailHeading>{t('rail.gameJams')}</RailHeading>
      <ul className='bg-surface border border-rule'>
        {GAME_JAMS.map(event => (
          <li
            key={event.title.en}
            className='px-2.5 py-2 border-b border-rule last:border-b-0'
          >
            <p className='font-semibold'>{event.context}</p>
            <p className='text-xs text-muted'>
              {event.title[locale]} · {event.year}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  )
}

interface RightRailProps {
  activity: RepoActivity[]
  privateContributions: number | null
}

function relativeDays(date: string, locale: string) {
  const days = Math.round((Date.parse(date) - Date.now()) / 86_400_000)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (Math.abs(days) < 30) return rtf.format(days, 'day')
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), 'month')
  return rtf.format(Math.round(days / 365), 'year')
}

// Right rail: live public GitHub activity, newest push first.
export function RightRail({
  activity,
  privateContributions
}: RightRailProps) {
  const { t, locale } = useLanguage()

  return (
    <aside className='text-[13px]'>
      <RailHeading>{t('rail.activity')}</RailHeading>
      {activity.length === 0 ? (
        <p className='bg-surface border border-rule px-2.5 py-3 text-muted'>
          {t('rail.activityEmpty')}
        </p>
      ) : (
        <ul className='bg-surface border border-rule'>
          {activity.map(repo => (
            <li key={repo.name} className='border-b border-rule'>
              <a
                href={repo.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-baseline justify-between gap-2 px-2.5 py-1.5 border-l-2 border-l-link hover:bg-surface-head'
              >
                <span className='text-link truncate'>{repo.name}</span>
                <span
                  className='text-xs text-muted shrink-0'
                  suppressHydrationWarning
                >
                  {relativeDays(repo.pushedAt, locale)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {privateContributions !== null && (
        <p className='bg-surface border border-t-0 border-rule px-2.5 py-1.5 text-xs text-muted border-l-2 border-l-idle'>
          <span className='font-bold text-foreground tabular-nums'>
            +{privateContributions.toLocaleString(locale)}
          </span>{' '}
          {t('rail.privateContributions')}
        </p>
      )}
      <a
        href={`${profile.github}?tab=repositories`}
        target='_blank'
        rel='noopener noreferrer'
        className='block mt-1.5 py-1.5 text-center text-xs font-bold text-white bg-link-fill hover:brightness-110'
      >
        {t('rail.allRepos')}
      </a>

      <RailHeading>{t('rail.contact')}</RailHeading>
      <ul className='bg-surface border border-rule'>
        {[
          { href: `mailto:${profile.email}`, label: profile.email, wrap: true },
          { href: profile.linkedin, label: 'LinkedIn' },
          { href: profile.github, label: 'GitHub' }
        ].map(link => (
          <li key={link.label} className='border-b border-rule last:border-b-0'>
            <a
              href={link.href}
              {...(link.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`block px-2.5 py-1.5 text-link hover:bg-surface-head ${
                'wrap' in link ? 'break-all' : 'truncate'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
