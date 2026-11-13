'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { featuredProjects, pick } from '@/lib/profile'
import { Box } from './Box'

// Fills the banner slot under the profile: real products, real screens.
// One project per page; the pager at the bottom flips between them.
export function FeaturedProject() {
  const { t, locale } = useLanguage()
  const [page, setPage] = useState(0)
  const [active, setActive] = useState(0)
  const project = featuredProjects[page]
  const shot = project.shots[active]
  const shotSrc = pick(shot.src, locale)
  const count = featuredProjects.length

  const goTo = (next: number) => {
    setPage((next + count) % count)
    setActive(0)
  }

  // The first available link is the main action: demo, then site, then source.
  const [primary, ...secondary] = [
    project.demo && { href: project.demo[locale], label: t('featured.demo') },
    project.site && { href: project.site[locale], label: t('featured.site') },
    project.repo && { href: project.repo, label: t('featured.code') }
  ].filter(link => !!link)

  return (
    <Box
      id='featured'
      title={
        <>
          {t('featured.title')}:{' '}
          <span className='text-link'>{project.name[locale]}</span>
        </>
      }
      aside={
        <span
          className={`inline-flex items-center gap-1.5 font-semibold ${
            project.live ? 'text-win' : 'text-muted'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              project.live ? 'bg-win' : 'bg-gold'
            }`}
            aria-hidden='true'
          />
          {project.status[locale]}
        </span>
      }
    >
      <div className='grid lg:grid-cols-[1fr_260px]'>
        <div className='bg-panel p-3'>
          <div className='relative aspect-[16/10] bg-panel'>
            <Image
              key={shotSrc}
              src={shotSrc}
              alt={shot.alt[locale]}
              fill
              sizes='(min-width: 1024px) 560px, 100vw'
              className='object-cover object-top'
              priority={page === 0 && active === 0}
            />
          </div>
          <div
            className='mt-3 grid grid-cols-3 gap-2'
            role='group'
            aria-label={project.shotsLabel[locale]}
          >
            {project.shots.map((item, index) => (
              <button
                key={pick(item.src, locale)}
                type='button'
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                aria-label={item.alt[locale]}
                className={`relative aspect-[16/10] overflow-hidden outline-offset-2 transition-opacity ${
                  index === active
                    ? 'ring-2 ring-gold'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={pick(item.src, locale)}
                  alt=''
                  fill
                  sizes='180px'
                  className='object-cover object-top'
                />
              </button>
            ))}
          </div>
        </div>

        <div className='p-4 flex flex-col gap-4 text-[13px]'>
          <p className='leading-relaxed'>{project.summary[locale]}</p>

          <ul className='space-y-1.5'>
            {project.facts.map(fact => (
              <li key={fact.en} className='flex gap-2'>
                <span
                  className='mt-[7px] w-1.5 h-1.5 shrink-0 bg-gold'
                  aria-hidden='true'
                />
                {fact[locale]}
              </li>
            ))}
          </ul>

          <div className='mt-auto flex flex-col gap-1.5'>
            <a
              href={primary.href}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center gap-1.5 py-2 font-bold text-white bg-link-fill hover:brightness-110 transition-[filter]'
            >
              {primary.label}
              <ArrowUpRight size={15} aria-hidden='true' />
            </a>
            {secondary.length > 0 && (
              <div
                className={`grid gap-1.5 ${
                  secondary.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {secondary.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center px-2 py-1.5 text-center font-semibold text-link border border-rule hover:bg-surface-head'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='px-3 py-2.5 border-t border-rule text-[13px]'>
        <h3 className='text-[11px] font-bold uppercase tracking-[0.06em] text-muted mb-1'>
          {t('featured.stack')}
        </h3>
        <dl className='grid grid-cols-1 sm:grid-cols-3 gap-x-4'>
          {project.stack.map(item => (
            <div
              key={item.name}
              className='flex justify-between gap-3 py-1 border-b border-rule'
            >
              <dt className='font-semibold'>{item.name}</dt>
              <dd className='text-muted text-right'>{item.role[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>

      {count > 1 && (
        <nav
          aria-label={t('featured.pages')}
          className='flex items-center justify-between gap-3 px-3 py-2 border-t border-rule bg-surface-head text-[13px]'
        >
          <button
            type='button'
            onClick={() => goTo(page - 1)}
            aria-label={t('featured.prev')}
            className='p-1 text-link hover:bg-surface border border-transparent hover:border-rule'
          >
            <ChevronLeft size={16} aria-hidden='true' />
          </button>
          <div className='flex items-center gap-1.5'>
            {featuredProjects.map((item, index) => (
              <button
                key={item.id}
                type='button'
                onClick={() => goTo(index)}
                aria-current={index === page ? 'true' : undefined}
                className={`px-2 py-0.5 font-semibold border ${
                  index === page
                    ? 'border-gold text-foreground'
                    : 'border-transparent text-link hover:border-rule'
                }`}
              >
                {item.name[locale]}
              </button>
            ))}
          </div>
          <button
            type='button'
            onClick={() => goTo(page + 1)}
            aria-label={t('featured.next')}
            className='p-1 text-link hover:bg-surface border border-transparent hover:border-rule'
          >
            <ChevronRight size={16} aria-hidden='true' />
          </button>
        </nav>
      )}
    </Box>
  )
}
