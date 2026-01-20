'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Locale = 'en' | 'pt-BR'

const translations = {
  en: {
    'nav.posts': 'Posts',
    'nav.cv': 'CV',
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Software Engineer',
    'hero.description':
      'Front-end and full-stack developer passionate about building elegant, performant web experiences. Currently working with React, Next.js, and TypeScript.',
    'hero.cta': 'View my work',
    'posts.title': 'Posts',
    'posts.empty': 'No posts yet.',
    'posts.readMore': 'Read more',
    'posts.categories': 'Categories',
    'posts.all': 'All',
  },
  'pt-BR': {
    'nav.posts': 'Posts',
    'nav.cv': 'CV',
    'hero.greeting': 'Olá, eu sou',
    'hero.role': 'Engenheiro de Software',
    'hero.description':
      'Desenvolvedor front-end e full-stack apaixonado por criar experiências web elegantes e performáticas. Atualmente trabalhando com React, Next.js e TypeScript.',
    'hero.cta': 'Ver meu trabalho',
    'posts.title': 'Posts',
    'posts.empty': 'Nenhum post ainda.',
    'posts.readMore': 'Leia mais',
    'posts.categories': 'Categorias',
    'posts.all': 'Todos',
  },
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

  const setLocale = (newLocale: Locale) => {
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
      t: (key: TranslationKey) => translations.en[key] || key,
    }
  }
  return context
}
