'use client'

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent
} from 'react'
import { useLanguage } from '@/lib/i18n'
import {
  AchievementsPanel,
  ExperiencePanel,
  FaqPanel,
  PostsPanel,
  ProjectsPanel,
  RecentProjects,
  StackPanel,
  StatsPanel
} from './ProfilePanels'

const TABS = [
  'overview',
  'experience',
  'projects',
  'achievements',
  'stack',
  'posts'
] as const

type Tab = (typeof TABS)[number]

function isTab(value: string): value is Tab {
  return (TABS as readonly string[]).includes(value)
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

// Profile tabs switch in place; the hash keeps each tab linkable.
export function ProfileTabs() {
  const { t } = useLanguage()
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => ''
  )
  const active: Tab = isTab(hash) ? hash : 'overview'
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>(
    {} as Record<Tab, HTMLButtonElement | null>
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const fromTabClick = useRef(false)

  // Links elsewhere on the page (#projects, #stack) open a tab and bring the
  // tab strip into view; clicks on the strip itself never scroll.
  useEffect(() => {
    if (fromTabClick.current) {
      fromTabClick.current = false
      return
    }
    if (isTab(hash)) rootRef.current?.scrollIntoView({ block: 'start' })
  }, [hash])

  const select = (tab: Tab, focus = false) => {
    if (tab !== active) {
      fromTabClick.current = true
      history.replaceState(
        null,
        '',
        tab === 'overview' ? window.location.pathname : `#${tab}`
      )
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
    if (focus) tabRefs.current[tab]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.indexOf(active)
    const moves: Record<string, number> = {
      ArrowRight: (index + 1) % TABS.length,
      ArrowLeft: (index - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1
    }
    if (event.key in moves) {
      event.preventDefault()
      select(TABS[moves[event.key]], true)
    }
  }

  return (
    <div ref={rootRef} className='scroll-mt-16'>
      <div
        role='tablist'
        aria-label={t('tabs.label')}
        onKeyDown={onKeyDown}
        className='flex overflow-x-auto bg-surface border border-rule'
      >
        {TABS.map(tab => (
          <button
            key={tab}
            ref={el => {
              tabRefs.current[tab] = el
            }}
            role='tab'
            id={`tab-${tab}`}
            aria-selected={active === tab}
            aria-controls={`panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => select(tab)}
            className={`relative shrink-0 grow px-4 h-11 text-[13px] font-bold whitespace-nowrap transition-colors ${
              active === tab
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {t(`tabs.${tab}`)}
            {active === tab && (
              <span
                className='absolute left-3 right-3 bottom-0 h-[3px] bg-link-fill'
                aria-hidden='true'
              />
            )}
          </button>
        ))}
      </div>

      <div className='mt-3'>
        <TabPanel tab='overview' active={active}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <StatsPanel />
            <RecentProjects />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
            <PostsPanel limit={4} />
            <FaqPanel />
          </div>
        </TabPanel>
        <TabPanel tab='experience' active={active}>
          <ExperiencePanel />
        </TabPanel>
        <TabPanel tab='projects' active={active}>
          <ProjectsPanel />
        </TabPanel>
        <TabPanel tab='achievements' active={active}>
          <AchievementsPanel />
        </TabPanel>
        <TabPanel tab='stack' active={active}>
          <StackPanel />
        </TabPanel>
        <TabPanel tab='posts' active={active}>
          <PostsPanel limit={12} />
        </TabPanel>
      </div>
    </div>
  )
}

interface TabPanelProps {
  tab: Tab
  active: Tab
  children: React.ReactNode
}

function TabPanel({ tab, active, children }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      id={`panel-${tab}`}
      aria-labelledby={`tab-${tab}`}
      hidden={active !== tab}
      tabIndex={0}
      className='focus-visible:outline-offset-4'
    >
      {children}
    </div>
  )
}
