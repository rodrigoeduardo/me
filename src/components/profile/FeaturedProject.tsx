'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { featuredProject as yms, pick } from '@/lib/profile'
import { Box } from './Box'

// Fills the banner slot under the profile: the real product, real screens.
export function FeaturedProject() {
  const { t, locale } = useLanguage()
  const [active, setActive] = useState(0)
  const shot = yms.shots[active]
  const shotSrc = pick(shot.src, locale)

  return (
    <Box
      id='featured'
      title={
        <>
          {t('featured.title')}:{' '}
          <span className='text-link'>{yms.name[locale]}</span>
        </>
      }
      aside={
        <span className='inline-flex items-center gap-1.5 text-win font-semibold'>
          <span className='w-2 h-2 rounded-full bg-win' aria-hidden='true' />
          {yms.status[locale]}
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
              priority
            />
          </div>
          <div
            className='mt-3 grid grid-cols-3 gap-2'
            role='group'
            aria-label={t('featured.shots')}
          >
            {yms.shots.map((item, index) => (
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
          <p className='leading-relaxed'>{yms.summary[locale]}</p>

          <ul className='space-y-1.5'>
            {yms.facts.map(fact => (
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
              href={yms.demo[locale]}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center gap-1.5 py-2 font-bold text-white bg-link-fill hover:brightness-110 transition-[filter]'
            >
              {t('featured.demo')}
              <ArrowUpRight size={15} aria-hidden='true' />
            </a>
            <div className='grid grid-cols-2 gap-1.5'>
              <a
                href={yms.site[locale]}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center px-2 py-1.5 text-center font-semibold text-link border border-rule hover:bg-surface-head'
              >
                {t('featured.site')}
              </a>
              <a
                href={yms.repo}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center px-2 py-1.5 text-center font-semibold text-link border border-rule hover:bg-surface-head'
              >
                {t('featured.code')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='px-3 py-2.5 border-t border-rule text-[13px]'>
        <h3 className='text-[11px] font-bold uppercase tracking-[0.06em] text-muted mb-1'>
          {t('featured.stack')}
        </h3>
        <dl className='grid grid-cols-1 sm:grid-cols-3 gap-x-4'>
          {yms.stack.map(item => (
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
    </Box>
  )
}
