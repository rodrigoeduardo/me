import { getTranslator } from '@/lib/i18n'
import type { Locale } from '@/lib/locales'
import { featuredProjects, pick } from '@/lib/profile'
import { FeaturedCarousel, type FeaturedProjectView } from './FeaturedCarousel'

interface FeaturedProjectProps {
  locale: Locale
}

// Fills the banner slot under the profile: real products, real screens.
// Resolves one locale here so the carousel ships only the strings it shows.
export function FeaturedProject({ locale }: FeaturedProjectProps) {
  const t = getTranslator(locale)

  const projects: FeaturedProjectView[] = featuredProjects.map(project => ({
    id: project.id,
    name: project.name[locale],
    summary: project.summary[locale],
    status: project.status[locale],
    live: project.live,
    facts: project.facts.map(fact => fact[locale]),
    stack: project.stack.map(item => ({
      name: item.name,
      role: item.role[locale]
    })),
    shotsLabel: project.shotsLabel[locale],
    shots: project.shots.map(shot => ({
      src: pick(shot.src, locale),
      alt: shot.alt[locale]
    })),
    links: [
      project.demo && { href: project.demo[locale], label: t('featured.demo') },
      project.site && { href: project.site[locale], label: t('featured.site') },
      project.repo && { href: project.repo, label: t('featured.code') }
    ].filter(link => !!link)
  }))

  return (
    <FeaturedCarousel
      projects={projects}
      labels={{
        title: t('featured.title'),
        stack: t('featured.stack'),
        pages: t('featured.pages'),
        prev: t('featured.prev'),
        next: t('featured.next')
      }}
    />
  )
}
