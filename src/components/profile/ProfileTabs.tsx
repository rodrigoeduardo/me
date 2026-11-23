import { getTranslator } from '@/lib/i18n'
import type { Locale } from '@/lib/locales'
import { PostsPanel, type PostsPanelLabels } from './PostsPanel'
import {
  AchievementsPanel,
  ExperiencePanel,
  FaqPanel,
  ProjectsPanel,
  RecentProjects,
  StackPanel,
  StatsPanel
} from './ProfilePanels'
import { ProfileTabsView } from './ProfileTabsView'
import { TABS, type Tab } from './tabs'

interface ProfileTabsProps {
  locale: Locale
}

export function ProfileTabs({ locale }: ProfileTabsProps) {
  const t = getTranslator(locale)
  const postsLabels: PostsPanelLabels = {
    latest: t('posts.latest'),
    error: t('posts.error'),
    empty: t('posts.empty'),
    allPosts: t('posts.allPosts')
  }

  const panels: Record<Tab, React.ReactNode> = {
    overview: (
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <StatsPanel locale={locale} />
          <RecentProjects locale={locale} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
          <PostsPanel locale={locale} labels={postsLabels} limit={4} />
          <FaqPanel locale={locale} />
        </div>
      </>
    ),
    experience: <ExperiencePanel locale={locale} />,
    projects: <ProjectsPanel locale={locale} />,
    achievements: <AchievementsPanel locale={locale} />,
    stack: <StackPanel locale={locale} />,
    posts: <PostsPanel locale={locale} labels={postsLabels} limit={12} />
  }

  return (
    <ProfileTabsView
      label={t('tabs.label')}
      tabLabels={
        Object.fromEntries(TABS.map(tab => [tab, t(`tabs.${tab}`)])) as Record<
          Tab,
          string
        >
      }
      panels={panels}
    />
  )
}
