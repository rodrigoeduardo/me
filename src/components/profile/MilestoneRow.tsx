'use client'

import {
  Bot,
  Building2,
  ChartCandlestick,
  Factory,
  Gamepad2,
  GraduationCap,
  School,
  Warehouse,
  type LucideIcon
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { milestones, type Milestone } from '@/lib/profile'

const ICONS: Record<Milestone['icon'], LucideIcon> = {
  warehouse: Warehouse,
  bot: Bot,
  chart: ChartCandlestick,
  building: Building2,
  factory: Factory,
  graduation: GraduationCap,
  school: School,
  gamepad: Gamepad2
}

// The trophy shelf under the profile: one cell per milestone, year as a badge.
export function MilestoneRow() {
  const { t, locale } = useLanguage()

  return (
    <section
      aria-label={t('milestones.title')}
      className='bg-surface border border-t-0 border-rule'
    >
      <ul className='grid grid-cols-5 sm:grid-cols-9'>
        {milestones.map(milestone => {
          const Icon = ICONS[milestone.icon]
          const label = milestone.year
            ? `${milestone.label[locale]} ('${milestone.year})`
            : milestone.label[locale]
          return (
            <li
              key={milestone.id}
              title={label}
              className='group relative flex flex-col items-center justify-center gap-1 h-[68px] border-r border-b sm:border-b-0 border-rule last:border-r-0 hover:bg-surface-head'
            >
              <Icon
                size={24}
                strokeWidth={1.6}
                className='text-foreground/80 group-hover:text-link transition-colors'
                aria-hidden='true'
              />
              <span
                aria-hidden='true'
                className='text-[11px] leading-none font-semibold text-muted group-hover:text-foreground truncate max-w-full px-1'
              >
                {milestone.short}
              </span>
              {milestone.year && (
                <span
                  aria-hidden='true'
                  className='absolute top-1.5 right-1.5 min-w-5 h-4 px-1 rounded-full bg-link-fill text-white text-[10px] leading-4 font-bold text-center'
                >
                  {milestone.year}
                </span>
              )}
              <span className='sr-only'>{label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
