'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'

export type Locale = 'en' | 'pt-BR'

const translations = {
  en: {
    'nav.overview': 'Overview',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.posts': 'Posts',
    'nav.cv': 'Download CV',
    'nav.cvShort': 'CV',
    'profile.tag': 'Dev',
    'profile.role': 'Role',
    'profile.currentTeam': 'Current company',
    'profile.experience': 'Experience',
    'profile.years': 'years',
    'profile.year': 'year',
    'profile.teams': 'Teams',
    'profile.achievements': 'Highlights',
    'profile.badgeProduction': '1x own product in production',
    'profile.badgeShipped': 'products shipped',
    'profile.badgeOpenSource': '1x open source tool',
    'profile.status': 'Status',
    'profile.email': 'Email',
    'milestones.title': 'Milestones',
    'tabs.label': 'Profile sections',
    'tabs.overview': 'Overview',
    'tabs.experience': 'Experience',
    'tabs.projects': 'Projects',
    'tabs.achievements': 'Achievements',
    'tabs.stack': 'Stack',
    'tabs.posts': 'Posts',
    'stats.title': 'Rodrigo by area',
    'stats.subtitle': 'Years of professional use',
    'stats.full': 'Full stack by area',
    'area.frontend': 'Frontend',
    'area.backend': 'Backend',
    'area.infra': 'Infrastructure',
    'area.web3': 'Web3',
    'area.ai': 'AI & Automation',
    'projects.recent': 'Recent projects',
    'projects.all': 'All projects',
    'projects.live': 'Live',
    'projects.openSource': 'Open source',
    'projects.archived': 'Shipped',
    'projects.name': 'Project',
    'projects.period': 'Period',
    'projects.status': 'Status',
    'projects.links': 'Links',
    'featured.title': 'Featured project',
    'featured.demo': 'Open the demo',
    'featured.site': 'Product site',
    'featured.code': 'Source on GitHub',
    'featured.stack': 'What runs it',
    'featured.pages': 'Featured projects',
    'featured.prev': 'Previous project',
    'featured.next': 'Next project',
    'experience.company': 'Company',
    'experience.role': 'Role',
    'experience.period': 'Period',
    'experience.present': 'present',
    'achievements.year': 'Year',
    'achievements.title': 'Achievement',
    'achievements.context': 'Where',
    'stack.legendCurrent': 'Using now',
    'stack.legendPast': 'Used before',
    'stack.usedAt': 'Used at',
    'rail.currentStack': 'Current stack',
    'rail.gameJams': 'Game Jams',
    'rail.education': 'Education',
    'rail.languages': 'Languages',
    'rail.contact': 'Contact',
    'rail.activity': 'Public GitHub activity',
    'rail.privateContributions':
      'contributions to private repositories in the last 12 months',
    'rail.activityEmpty': 'Activity unavailable right now.',
    'rail.allRepos': 'All repositories',
    'faq.title': 'FAQ',
    'posts.title': 'Posts',
    'posts.empty': 'No posts yet.',
    'posts.error': 'Could not load posts. Try again in a moment.',
    'posts.readMore': 'Read more',
    'posts.categories': 'Categories',
    'posts.all': 'All',
    'posts.back': 'Back to posts',
    'posts.latest': 'Latest posts',
    'posts.allPosts': 'All posts',
    'posts.uncategorized': 'Uncategorized',
    'footer.rights': 'All rights reserved.',
    'theme.toLight': 'Switch to light mode',
    'theme.toDark': 'Switch to dark mode',
    'lang.switch': 'Mudar para português'
  },
  'pt-BR': {
    'nav.overview': 'Visão geral',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',
    'nav.posts': 'Posts',
    'nav.cv': 'Baixar CV',
    'nav.cvShort': 'CV',
    'profile.tag': 'Dev',
    'profile.role': 'Cargo',
    'profile.currentTeam': 'Empresa atual',
    'profile.experience': 'Experiência',
    'profile.years': 'anos',
    'profile.year': 'ano',
    'profile.teams': 'Times',
    'profile.achievements': 'Destaques',
    'profile.badgeProduction': '1x produto próprio em produção',
    'profile.badgeShipped': 'produtos entregues',
    'profile.badgeOpenSource': '1x ferramenta open source',
    'profile.status': 'Status',
    'profile.email': 'E-mail',
    'milestones.title': 'Marcos',
    'tabs.label': 'Seções do perfil',
    'tabs.overview': 'Visão geral',
    'tabs.experience': 'Experiência',
    'tabs.projects': 'Projetos',
    'tabs.achievements': 'Conquistas',
    'tabs.stack': 'Stack',
    'tabs.posts': 'Posts',
    'stats.title': 'Rodrigo por área',
    'stats.subtitle': 'Anos de uso profissional',
    'stats.full': 'Stack completa por área',
    'area.frontend': 'Frontend',
    'area.backend': 'Backend',
    'area.infra': 'Infraestrutura',
    'area.web3': 'Web3',
    'area.ai': 'IA & Automação',
    'projects.recent': 'Projetos recentes',
    'projects.all': 'Todos os projetos',
    'projects.live': 'No ar',
    'projects.openSource': 'Open source',
    'projects.archived': 'Entregue',
    'projects.name': 'Projeto',
    'projects.period': 'Período',
    'projects.status': 'Status',
    'projects.links': 'Links',
    'featured.title': 'Projeto em destaque',
    'featured.demo': 'Abrir a demo',
    'featured.site': 'Site do produto',
    'featured.code': 'Código no GitHub',
    'featured.stack': 'O que roda nele',
    'featured.pages': 'Projetos em destaque',
    'featured.prev': 'Projeto anterior',
    'featured.next': 'Próximo projeto',
    'experience.company': 'Empresa',
    'experience.role': 'Cargo',
    'experience.period': 'Período',
    'experience.present': 'atual',
    'achievements.year': 'Ano',
    'achievements.title': 'Conquista',
    'achievements.context': 'Onde',
    'stack.legendCurrent': 'Uso hoje',
    'stack.legendPast': 'Já usei',
    'stack.usedAt': 'Usado em',
    'rail.currentStack': 'Stack atual',
    'rail.gameJams': 'Game Jams',
    'rail.education': 'Formação',
    'rail.languages': 'Idiomas',
    'rail.contact': 'Contato',
    'rail.activity': 'Atividade pública no GitHub',
    'rail.privateContributions':
      'contribuições em repositórios privados nos últimos 12 meses',
    'rail.activityEmpty': 'Atividade indisponível no momento.',
    'rail.allRepos': 'Todos os repositórios',
    'faq.title': 'Perguntas frequentes',
    'posts.title': 'Posts',
    'posts.empty': 'Nenhum post ainda.',
    'posts.error': 'Não foi possível carregar os posts. Tente de novo em instantes.',
    'posts.readMore': 'Leia mais',
    'posts.categories': 'Categorias',
    'posts.all': 'Todos',
    'posts.back': 'Voltar aos posts',
    'posts.latest': 'Últimos posts',
    'posts.allPosts': 'Todos os posts',
    'posts.uncategorized': 'Sem categoria',
    'footer.rights': 'Todos os direitos reservados.',
    'theme.toLight': 'Mudar para o tema claro',
    'theme.toDark': 'Mudar para o tema escuro',
    'lang.switch': 'Switch to English'
  }
} as const

type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'en' || stored === 'pt-BR')) {
      setLocaleState(stored)
    }
  }, [])

  // Screen readers pick the voice from <html lang>, so keep it in sync.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale =(newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return default values when not in provider (SSR)
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      t: (key: TranslationKey) => translations.en[key] || key
    }
  }
  return context
}
