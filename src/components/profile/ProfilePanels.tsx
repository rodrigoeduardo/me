'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { fetcher } from '@/lib/fetcher'
import {
  achievements,
  areaYears,
  faq,
  pick,
  projects,
  stack,
  teams,
  type ProjectStatus,
  type StackArea
} from '@/lib/profile'
import { Box, BoxButton } from './Box'
import { GitHubIcon } from '@/components/icons/GitHubIcon'

const AREAS: StackArea[] = ['frontend', 'backend', 'infra', 'web3', 'ai']
const MAX_YEARS = Math.max(...areaYears.map(a => a.years))

const STATUS_EDGE: Record<ProjectStatus, string> = {
  live: 'border-r-win',
  'open-source': 'border-r-link',
  archived: 'border-r-idle'
}

const STATUS_TEXT: Record<ProjectStatus, string> = {
  live: 'text-win',
  'open-source': 'text-link',
  archived: 'text-muted'
}

function useStatusLabel() {
  const { t } = useLanguage()
  return (status: ProjectStatus) =>
    status === 'live'
      ? t('projects.live')
      : status === 'open-source'
        ? t('projects.openSource')
        : t('projects.archived')
}

function formatMonth(date: string, locale: string) {
  const [year, month] = date.split('-').map(Number)
  return new Date(year, month - 1).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric'
  })
}

export function StatsPanel() {
  const { t } = useLanguage()

  return (
    <Box id='stats' title={t('stats.title')} aside={t('stats.subtitle')}>
      <ul className='px-3 pt-1 pb-3'>
        {areaYears.map(({ area, years }, index) => (
          <li key={area} className='py-2 border-b border-rule last:border-b-0'>
            <div className='flex items-baseline justify-between text-[13px]'>
              <span className='font-bold'>{t(`area.${area}`)}</span>
              <span>
                <span className='font-bold'>{years}</span>
                <span className='text-muted text-xs'>
                  {' '}
                  {years === 1 ? t('profile.year') : t('profile.years')}
                </span>
              </span>
            </div>
            <div className='mt-1.5 h-1.5 bg-track'>
              <div
                className='h-full bg-link-fill animate-bar-fill'
                style={{
                  width: `${(years / MAX_YEARS) * 100}%`,
                  animationDelay: `${index * 70}ms`
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <BoxButton href='#stack'>{t('stats.full')}</BoxButton>
    </Box>
  )
}

export function RecentProjects() {
  const { t, locale } = useLanguage()
  const statusLabel = useStatusLabel()

  return (
    <Box title={t('projects.recent')}>
      <ul>
        {projects.slice(0, 5).map(project => (
          <li
            key={project.id}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 border-b border-rule border-r-[3px] ${STATUS_EDGE[project.status]}`}
          >
            <div className='min-w-0'>
              <p className='text-[13px] font-bold truncate'>
                {project.url || project.repo ? (
                  <a
                    href={project.url ? pick(project.url, locale) : project.repo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-link'
                  >
                    {pick(project.name, locale)}
                  </a>
                ) : (
                  pick(project.name, locale)
                )}
              </p>
              <p className='text-xs text-muted truncate'>
                {project.context[locale]}
              </p>
            </div>
            <div className='text-right shrink-0'>
              <p className='text-[13px] font-bold'>{project.period}</p>
              <p className={`text-xs font-semibold ${STATUS_TEXT[project.status]}`}>
                {statusLabel(project.status)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className='pt-3'>
        <BoxButton href='#projects'>{t('projects.all')}</BoxButton>
      </div>
    </Box>
  )
}

export function ExperiencePanel() {
  const { t, locale } = useLanguage()

  return (
    <Box title={t('tabs.experience')}>
      <ol>
        {teams.map(team => (
          <li
            key={team.company}
            className='grid sm:grid-cols-[200px_1fr] gap-x-4 gap-y-2 px-3 py-4 border-b border-rule last:border-b-0'
          >
            <div>
              <h3 className='text-[15px] font-bold'>{team.company}</h3>
              <p className='text-[13px]'>{team.role[locale]}</p>
              <p className='text-xs text-muted mt-0.5'>
                {formatMonth(team.start, locale)} –{' '}
                {team.end
                  ? formatMonth(team.end, locale)
                  : t('experience.present')}
              </p>
              <p className='text-xs text-muted'>{team.location[locale]}</p>
            </div>
            <ul className='space-y-1.5 text-[13px] leading-relaxed'>
              {team.highlights.map(item => (
                <li key={item.en} className='flex gap-2'>
                  <span
                    className='mt-[8px] w-1.5 h-1.5 shrink-0 bg-link-fill'
                    aria-hidden='true'
                  />
                  {item[locale]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Box>
  )
}

export function ProjectsPanel() {
  const { t, locale } = useLanguage()
  const statusLabel = useStatusLabel()

  return (
    <Box title={t('tabs.projects')}>
      <div className='overflow-x-auto'>
        <table className='w-full text-[13px]'>
          <thead className='text-left text-xs text-muted'>
            <tr className='border-b border-rule'>
              <th scope='col' className='px-3 py-2 font-semibold'>
                {t('projects.name')}
              </th>
              <th scope='col' className='px-3 py-2 font-semibold'>
                {t('projects.period')}
              </th>
              <th scope='col' className='px-3 py-2 font-semibold'>
                {t('projects.status')}
              </th>
              <th scope='col' className='px-3 py-2 font-semibold text-right'>
                {t('projects.links')}
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr
                key={project.id}
                className={`border-b border-rule border-r-[3px] ${STATUS_EDGE[project.status]}`}
              >
                <td className='px-3 py-2.5'>
                  <p className='font-bold'>{pick(project.name, locale)}</p>
                  <p className='text-xs text-muted'>
                    {project.context[locale]}
                  </p>
                  <p className='text-xs text-muted mt-0.5'>
                    {project.stack.join(' · ')}
                  </p>
                </td>
                <td className='px-3 py-2.5 whitespace-nowrap'>
                  {project.period}
                </td>
                <td
                  className={`px-3 py-2.5 whitespace-nowrap font-semibold ${STATUS_TEXT[project.status]}`}
                >
                  {statusLabel(project.status)}
                </td>
                <td className='px-3 py-2.5'>
                  <div className='flex justify-end gap-1.5'>
                    {project.url && (
                      <a
                        href={pick(project.url, locale)}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`${pick(project.name, locale)}: site`}
                        className='w-8 h-8 flex items-center justify-center border border-rule text-link hover:bg-surface-head'
                      >
                        <ArrowUpRight size={16} aria-hidden='true' />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`${pick(project.name, locale)}: GitHub`}
                        className='w-8 h-8 flex items-center justify-center border border-rule text-link hover:bg-surface-head'
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  )
}

export function AchievementsPanel() {
  const { t, locale } = useLanguage()

  return (
    <Box title={t('tabs.achievements')}>
      <table className='w-full text-[13px]'>
        <thead className='text-left text-xs text-muted'>
          <tr className='border-b border-rule'>
            <th scope='col' className='px-3 py-2 font-semibold w-24'>
              {t('achievements.year')}
            </th>
            <th scope='col' className='px-3 py-2 font-semibold'>
              {t('achievements.title')}
            </th>
            <th scope='col' className='px-3 py-2 font-semibold text-right'>
              {t('achievements.context')}
            </th>
          </tr>
        </thead>
        <tbody>
          {achievements.map(item => (
            <tr key={item.title.en} className='border-b border-rule last:border-b-0'>
              <td className='px-3 py-2.5 font-bold whitespace-nowrap'>
                {item.year}
              </td>
              <td className='px-3 py-2.5'>{item.title[locale]}</td>
              <td className='px-3 py-2.5 text-right text-link whitespace-nowrap'>
                {item.context}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export function StackPanel() {
  const { t } = useLanguage()

  return (
    <Box
      title={t('tabs.stack')}
      aside={
        <span className='flex gap-3'>
          <span className='inline-flex items-center gap-1'>
            <span className='w-2.5 h-2.5 bg-link-fill' aria-hidden='true' />
            {t('stack.legendCurrent')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span
              className='w-2.5 h-2.5 border border-idle'
              aria-hidden='true'
            />
            {t('stack.legendPast')}
          </span>
        </span>
      }
    >
      <div className='grid sm:grid-cols-2'>
        {AREAS.map(area => {
          const techs = stack.filter(tech => tech.area === area)
          const years = areaYears.find(a => a.area === area)?.years
          return (
            <section
              key={area}
              aria-label={t(`area.${area}`)}
              className='px-3 py-3 border-b border-rule sm:odd:border-r'
            >
              <h3 className='flex items-baseline justify-between text-[13px] font-bold mb-1.5'>
                {t(`area.${area}`)}
                {years !== undefined && (
                  <span className='text-xs font-normal text-muted'>
                    {years}{' '}
                    {years === 1 ? t('profile.year') : t('profile.years')}
                  </span>
                )}
              </h3>
              <ul className='text-[13px]'>
                {techs.map(tech => (
                  <li
                    key={tech.name}
                    className='flex items-center justify-between gap-3 py-1'
                  >
                    <span className='inline-flex items-center gap-2'>
                      <span
                        className={`w-2.5 h-2.5 shrink-0 ${
                          tech.current
                            ? 'bg-link-fill'
                            : 'border border-idle'
                        }`}
                        aria-hidden='true'
                      />
                      <span className={tech.current ? 'font-semibold' : ''}>
                        {tech.name}
                      </span>
                      <span className='sr-only'>
                        (
                        {tech.current
                          ? t('stack.legendCurrent')
                          : t('stack.legendPast')}
                        )
                      </span>
                    </span>
                    {tech.usedAt.length > 0 && (
                      <span className='text-xs text-muted text-right'>
                        <span className='sr-only'>{t('stack.usedAt')}: </span>
                        {tech.usedAt.join(' · ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </Box>
  )
}

interface PostsResponse {
  docs: Array<{
    title: string
    slug: string
    publishedAt?: string | null
    category?: { name: string } | null
  }>
}

export function PostsPanel({ limit = 6 }: { limit?: number }) {
  const { t, locale } = useLanguage()
  const { data, error, isLoading } = useSWR<PostsResponse>(
    `/api/posts?where[status][equals]=published&limit=${limit}&sort=-publishedAt&locale=${locale}`,
    fetcher,
    { errorRetryCount: 2 }
  )
  const posts = data?.docs ?? []

  return (
    <Box title={t('posts.latest')}>
      {isLoading ? (
        <ul aria-busy='true'>
          {[0, 1, 2].map(i => (
            <li key={i} className='px-3 py-3 border-b border-rule'>
              <div className='h-3 w-2/3 bg-track animate-pulse' />
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className='px-3 py-6 text-[13px] text-muted'>{t('posts.error')}</p>
      ) : posts.length === 0 ? (
        <p className='px-3 py-6 text-[13px] text-muted'>{t('posts.empty')}</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.slug} className='border-b border-rule'>
              <Link
                href={`/posts/${post.slug}`}
                className='flex items-baseline justify-between gap-3 px-3 py-2.5 text-[13px] hover:bg-surface-head'
              >
                <span className='font-semibold'>{post.title}</span>
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className='text-xs text-muted shrink-0'
                  >
                    {new Date(post.publishedAt).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className='pt-3'>
        <BoxButton href='/posts'>{t('posts.allPosts')}</BoxButton>
      </div>
    </Box>
  )
}

export function FaqPanel() {
  const { t, locale } = useLanguage()

  return (
    <Box title={t('faq.title')}>
      <div>
        {faq.map(item => (
          <details
            key={item.q.en}
            className='group border-b border-rule last:border-b-0'
          >
            <summary className='flex items-center justify-between gap-3 px-3 py-2.5 text-[13px] font-semibold cursor-pointer list-none hover:bg-surface-head'>
              {item.q[locale]}
              <Plus
                size={16}
                className='shrink-0 text-muted transition-transform group-open:rotate-45'
                aria-hidden='true'
              />
            </summary>
            <p className='px-3 pb-3 text-[13px] leading-relaxed'>
              {item.a[locale]}
            </p>
          </details>
        ))}
      </div>
    </Box>
  )
}
