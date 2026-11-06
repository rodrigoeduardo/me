import type { Locale } from './i18n'

// Every fact here comes from the CV (public/assets/cvs) or the YMS repo.
// Do not add numbers or claims that are not in those sources.

export type Localized = Record<Locale, string>

// Fields that differ per language accept either a plain string or a Localized.
export function pick(value: string | Localized, locale: Locale): string {
  return typeof value === 'string' ? value : value[locale]
}

export type ProjectStatus = 'live' | 'open-source' | 'archived'

export interface Team {
  company: string
  role: Localized
  location: Localized
  start: string
  end: string | null
  highlights: Localized[]
}

export interface Project {
  id: string
  name: string | Localized
  context: Localized
  period: string
  status: ProjectStatus
  url?: string | Localized
  repo?: string
  stack: string[]
}

export interface Achievement {
  year: string
  title: Localized
  context: string
}

export interface Milestone {
  id: string
  icon:
    | 'warehouse'
    | 'bot'
    | 'chart'
    | 'building'
    | 'factory'
    | 'graduation'
    | 'school'
    | 'gamepad'
  short: string
  label: Localized
  year?: string
}

export type StackArea = 'frontend' | 'backend' | 'infra' | 'web3' | 'ai'

export interface Tech {
  name: string
  area: StackArea
  current: boolean
  usedAt: string[]
}

export const profile = {
  handle: 'rodrigoeduardo',
  name: 'Rodrigo Eduardo',
  fullName: 'Rodrigo Eduardo Dantas Barbalho',
  avatar: 'https://github.com/rodrigoeduardo.png',
  email: 'rodrigoeduardodb1@gmail.com',
  github: 'https://github.com/rodrigoeduardo',
  linkedin: 'https://www.linkedin.com/in/rodrigoedb/',
  location: { en: 'Natal, Brazil', 'pt-BR': 'Natal, Brasil' } as Localized,
  role: {
    en: 'Software Engineer',
    'pt-BR': 'Engenheiro de Software'
  } as Localized,
  experienceYears: '4+',
  currentTeam: { company: 'Estoqui', role: 'CTO' },
  availability: {
    en: 'Open to full-time remote roles or relocation abroad',
    'pt-BR': 'Aberto a vagas remotas full-time ou relocação para o exterior'
  } as Localized
}

export const education: Array<{ school: string; degree: Localized; period: string }> = [
  {
    school: 'UFRN',
    degree: {
      en: "Bachelor's in Information Technology",
      'pt-BR': 'Bacharelado em Tecnologia da Informação'
    },
    period: '2022–2026'
  },
  {
    school: 'IFRN',
    degree: {
      en: 'Technical degree in Computer Science',
      'pt-BR': 'Técnico em Informática'
    },
    period: '2018–2022'
  }
]

export const languages: Array<{ name: Localized; level: Localized }> = [
  {
    name: { en: 'Portuguese', 'pt-BR': 'Português' },
    level: { en: 'Native', 'pt-BR': 'Nativo' }
  },
  {
    name: { en: 'English', 'pt-BR': 'Inglês' },
    level: { en: 'Full professional', 'pt-BR': 'Profissional pleno' }
  }
]

export const teams: Team[] = [
  {
    company: 'Estoqui',
    role: { en: 'CTO', 'pt-BR': 'CTO' },
    location: { en: 'Natal, Brazil', 'pt-BR': 'Natal, Brasil' },
    start: '2026-07',
    end: null,
    highlights: [
      {
        en: 'Lead technical development of an inventory platform run through WhatsApp with AI agents.',
        'pt-BR':
          'Lidera o desenvolvimento de uma plataforma de estoque operada pelo WhatsApp com agentes de IA.'
      },
      {
        en: 'Own the Django web app and REST API, plus automated workflows built with n8n.',
        'pt-BR':
          'Responsável pela aplicação Django e API REST, e pelos fluxos automatizados em n8n.'
      },
      {
        en: 'Own architecture, ERP integrations, infrastructure, servers, domains and CI/CD.',
        'pt-BR':
          'Responsável por arquitetura, integrações com ERP, infraestrutura, servidores, domínios e CI/CD.'
      }
    ]
  },
  {
    company: 'Bitflow Finance',
    role: { en: 'Software Engineer', 'pt-BR': 'Engenheiro de Software' },
    location: {
      en: 'United States (remote)',
      'pt-BR': 'Estados Unidos (remoto)'
    },
    start: '2023-06',
    end: '2026-09',
    highlights: [
      {
        en: 'Core engineer on a Bitcoin DeFi exchange: $6B+ total volume, 17M+ transactions, ~30k users.',
        'pt-BR':
          'Engenheiro core de uma exchange DeFi em Bitcoin: US$ 6 bi+ em volume, 17 mi+ de transações, ~30 mil usuários.'
      },
      {
        en: 'Migrated the legacy Angular 12 codebase to Next.js with TanStack Query; built the full HODLMM UI and frontend.',
        'pt-BR':
          'Migrou o código legado em Angular 12 para Next.js com TanStack Query; construiu toda a UI e frontend do HODLMM.'
      },
      {
        en: 'Built Clarity smart contracts, SDKs, APIs and a transaction indexing service.',
        'pt-BR':
          'Construiu smart contracts em Clarity, SDKs, APIs e um serviço de indexação de transações.'
      }
    ]
  },
  {
    company: 'IMD / UFRN',
    role: { en: 'Full-Stack Developer', 'pt-BR': 'Desenvolvedor Full-Stack' },
    location: { en: 'Natal, Brazil', 'pt-BR': 'Natal, Brasil' },
    start: '2024-08',
    end: '2025-04',
    highlights: [
      {
        en: 'Built the Sebito Platform for Brazilian research foundations, up to its first production modules.',
        'pt-BR':
          'Construiu a Plataforma Sebito para fundações de pesquisa, até os primeiros módulos em produção.'
      },
      {
        en: 'Main frontend contributor in a 4-developer team; defined UI patterns and component architecture.',
        'pt-BR':
          'Principal contribuidor de frontend num time de 4; definiu padrões de UI e arquitetura de componentes.'
      }
    ]
  },
  {
    company: 'NUPLAM / IMD / UFRN',
    role: { en: 'Full-Stack Developer', 'pt-BR': 'Desenvolvedor Full-Stack' },
    location: { en: 'Natal, Brazil', 'pt-BR': 'Natal, Brasil' },
    start: '2022-06',
    end: '2023-12',
    highlights: [
      {
        en: 'Worked on OPDigital and SIGNUPLAM: HR, finance, inventory and factory automation systems.',
        'pt-BR':
          'Atuou no OPDigital e no SIGNUPLAM: sistemas de RH, finanças, estoque e automação fabril.'
      },
      {
        en: 'React/Next.js interfaces on Java + Spring WebFlux services, PostgreSQL, MongoDB; E2E tests with Cypress.',
        'pt-BR':
          'Interfaces em React/Next.js sobre serviços Java + Spring WebFlux, PostgreSQL, MongoDB; testes E2E com Cypress.'
      }
    ]
  }
]

export const featuredProject = {
  // Same product, branded per language: YMS in English, Pátio in Portuguese.
  name: { en: 'YMS', 'pt-BR': 'Pátio (YMS)' } as Localized,
  repo: 'https://github.com/rodrigoeduardo/yard-management-system',
  site: {
    en: 'https://yms.rodrigoeduardo.com',
    'pt-BR': 'https://patio.rodrigoeduardo.com'
  } as Localized,
  demo: {
    en: 'https://yms-demo.rodrigoeduardo.com',
    'pt-BR': 'https://patio-demo.rodrigoeduardo.com'
  } as Localized,
  summary: {
    en: 'Inventory control for scrap yards. Every load enters through its Nota Fiscal (Brazilian invoice), every item gets its own printed QR code, and every removal is a scan.',
    'pt-BR':
      'Controle de estoque para pátios de sucata. Cada carga entra pela Nota Fiscal, cada item ganha sua etiqueta QR impressa, e cada saída é um bipe.'
  } as Localized,
  status: {
    en: 'In production at a scrap yard in São Paulo',
    'pt-BR': 'Em produção num pátio de sucata em São Paulo'
  } as Localized,
  facts: [
    {
      en: 'Generic product with private per-client forks',
      'pt-BR': 'Produto genérico com forks privados por cliente'
    },
    {
      en: 'QR labels printed at entry, read by phone camera (PWA)',
      'pt-BR': 'Etiquetas QR impressas na entrada, lidas pela câmera do celular (PWA)'
    },
    {
      en: 'Unit and integration tests against a local Supabase stack',
      'pt-BR': 'Testes unitários e de integração num Supabase local'
    },
    {
      en: 'Public demo with fictional data, reset every night',
      'pt-BR': 'Demo pública com dados fictícios, reiniciada toda noite'
    }
  ] as Localized[],
  stack: [
    { name: 'Next.js', role: { en: 'app', 'pt-BR': 'app' } },
    { name: 'Supabase', role: { en: 'auth + Postgres', 'pt-BR': 'auth + Postgres' } },
    { name: 'Drizzle', role: { en: 'ORM + migrations', 'pt-BR': 'ORM + migrations' } },
    { name: 'zxing', role: { en: 'QR scanning', 'pt-BR': 'leitura de QR' } },
    { name: 'TanStack Table', role: { en: 'inventory tables', 'pt-BR': 'tabelas de estoque' } },
    { name: 'Vitest', role: { en: 'tests', 'pt-BR': 'testes' } }
  ],
  shots: [
    {
      src: '/assets/projects/yms-dashboard.webp',
      alt: {
        en: 'YMS home screen: active loads, materials in the yard, remaining weight and latest movements',
        'pt-BR':
          'Tela inicial do YMS: cargas ativas, materiais no pátio, peso restante e última movimentação'
      } as Localized
    },
    {
      src: '/assets/projects/yms-inventory.webp',
      alt: {
        en: 'YMS inventory: loads by Nota Fiscal with weight and item count, and removal history',
        'pt-BR':
          'Estoque do YMS: cargas por Nota Fiscal com peso e quantidade de itens, e histórico de remoções'
      } as Localized
    },
    {
      // The landing has its own en/pt-BR versions; the app screens are pt-BR only.
      src: {
        en: '/assets/projects/yms-landing-en.webp',
        'pt-BR': '/assets/projects/yms-landing.webp'
      } as Localized,
      alt: {
        en: 'YMS landing page with a printed QR item label',
        'pt-BR': 'Landing page do Pátio com uma etiqueta QR de item'
      } as Localized
    }
  ]
}

export const projects: Project[] = [
  {
    id: 'yms',
    name: { en: 'YMS', 'pt-BR': 'Pátio' },
    context: {
      en: 'Scrap-yard inventory, QR per item',
      'pt-BR': 'Estoque de pátio de sucata, QR por item'
    },
    period: '2026',
    status: 'live',
    url: {
      en: 'https://yms.rodrigoeduardo.com',
      'pt-BR': 'https://patio.rodrigoeduardo.com'
    },
    repo: 'https://github.com/rodrigoeduardo/yard-management-system',
    stack: ['Next.js', 'Supabase', 'Drizzle', 'zxing']
  },
  {
    id: 'estoqui',
    name: 'Estoqui',
    context: {
      en: 'Inventory over WhatsApp with AI agents',
      'pt-BR': 'Estoque pelo WhatsApp com agentes de IA'
    },
    url: "https://estoqui.com.br",
    period: '2026',
    status: 'live',
    stack: ['Django', 'n8n', 'AI agents']
  },
  {
    id: 'raw',
    name: 'raw',
    context: {
      en: 'Agentic workflow for Claude Code on GitHub Issues',
      'pt-BR': 'Fluxo agêntico para Claude Code sobre GitHub Issues'
    },
    period: '2026',
    status: 'open-source',
    repo: 'https://github.com/rodrigoeduardo/raw',
    stack: ['Claude Code', 'GitHub']
  },
  {
    id: 'hodlmm',
    name: 'Bitflow HODLMM',
    context: {
      en: 'Concentrated-liquidity UI, charts, real-time data',
      'pt-BR': 'UI de liquidez concentrada, gráficos, dados em tempo real'
    },
    url: "https://app.bitflow.finance/pools",
    period: '2023–2026',
    status: 'archived',
    stack: ['Next.js', 'TanStack Query', 'Clarity']
  },
  {
    id: 'sebito',
    name: 'Sebito',
    context: {
      en: 'Management system for research foundations',
      'pt-BR': 'Gestão para fundações de pesquisa'
    },
    url: "https://sebito.funpec.br/",
    period: '2024–2025',
    status: 'archived',
    stack: ['React', 'Java', 'Spring']
  },
  {
    id: 'espiaozinho',
    name: 'espiãozinho',
    context: {
      en: 'Pass-and-play party game (Spyfall)',
      'pt-BR': 'Jogo de festa pass-and-play (Spyfall)'
    },
    period: '2022',
    status: 'open-source',
    url: 'https://espiaozinho.vercel.app/',
    repo: 'https://github.com/rodrigoeduardo/espiaozinho',
    stack: ['TypeScript']
  },
  {
    id: 'sistema-logos',
    name: 'Sistema Logos',
    context: {
      en: 'Character sheet builder for a homebrew RPG',
      'pt-BR': 'Criador de fichas para um RPG autoral'
    },
    period: '2025',
    status: 'open-source',
    url: 'https://sistema-logos.vercel.app',
    repo: 'https://github.com/rodrigoeduardo/sistema-logos',
    stack: ['TypeScript']
  }
]

export const achievements: Achievement[] = [
  {
    year: '2026',
    title: { en: 'CTO at Estoqui', 'pt-BR': 'CTO na Estoqui' },
    context: 'Estoqui'
  },
  {
    year: '2026',
    title: {
      en: 'YMS running in production at a scrap yard',
      'pt-BR': 'YMS rodando em produção num pátio de sucata'
    },
    context: 'YMS'
  },
  {
    year: '2026',
    title: {
      en: "Bachelor's in Information Technology",
      'pt-BR': 'Bacharelado em Tecnologia da Informação'
    },
    context: 'UFRN'
  },
  {
    year: '2025–2026',
    title: {
      en: 'Complete HODLMM concentrated-liquidity frontend',
      'pt-BR': 'Frontend completo do HODLMM (liquidez concentrada)'
    },
    context: 'Bitflow'
  },
  {
    year: '2024-2025',
    title: {
      en: 'Sebito Platform first production modules',
      'pt-BR': 'Primeiros módulos da Plataforma Sebito em produção'
    },
    context: 'IMD / UFRN'
  },
  {
    year: '2023',
    title: {
      en: 'Angular 12 → Next.js migration of a DeFi exchange',
      'pt-BR': 'Migração Angular 12 → Next.js de uma exchange DeFi'
    },
    context: 'Bitflow'
  },
  {
    year: '2023',
    title: { en: 'Game jam entry: Blair&Noite', 'pt-BR': 'Game jam: Blair&Noite' },
    context: 'HallowJam Natal'
  },
  {
    year: '2023',
    title: { en: 'Game jam entry: Luto', 'pt-BR': 'Game jam: Luto' },
    context: 'EPoJam'
  },
  {
    year: '2022',
    title: {
      en: 'Technical degree in Computer Science',
      'pt-BR': 'Técnico em Informática'
    },
    context: 'IFRN'
  }
]

// Products shipped as part of a team or for an employer (owner-confirmed,
// 2026-11). YMS is counted separately as the owner's own product.
export const shippedProducts = [
  'Estoqui',
  'Bitflow',
  'Sebito',
  'SIGNUPLAM',
  'OPDigital'
]

export const milestones: Milestone[] = [
  { id: 'yms', short: 'YMS', icon: 'warehouse', label: { en: 'YMS in production', 'pt-BR': 'YMS em produção' }, year: '26' },
  { id: 'raw', short: 'raw', icon: 'bot', label: { en: 'raw, open source', 'pt-BR': 'raw, open source' }, year: '26' },
  { id: 'ufrn', short: 'UFRN', icon: 'graduation', label: { en: "Bachelor's, UFRN", 'pt-BR': 'Bacharelado, UFRN' }, year: '26' },
  { id: 'sebito', short: 'Sebito', icon: 'building', label: { en: 'Sebito Platform', 'pt-BR': 'Plataforma Sebito' }, year: '25' },
  { id: 'bitflow', short: 'Bitflow', icon: 'chart', label: { en: 'Bitflow Finance, Software Engineer', 'pt-BR': 'Bitflow Finance, Engenheiro de Software' }, year: '23' },
  { id: 'nuplam', short: 'NUPLAM', icon: 'factory', label: { en: 'SIGNUPLAM / OPDigital', 'pt-BR': 'SIGNUPLAM / OPDigital' }, year: '23' },
  { id: 'hallowjam', short: 'HallowJam', icon: 'gamepad', label: { en: 'HallowJam Natal', 'pt-BR': 'HallowJam Natal' }, year: '23' },
  { id: 'epojam', short: 'EPoJam', icon: 'gamepad', label: { en: 'EPoJam', 'pt-BR': 'EPoJam' }, year: '23' },
  { id: 'ifrn', short: 'IFRN', icon: 'school', label: { en: 'Technical degree, IFRN', 'pt-BR': 'Técnico, IFRN' }, year: '22' }
]

// Years per area confirmed by the owner (2026-11).
export const areaYears: Array<{ area: StackArea; years: number }> = [
  { area: 'frontend', years: 4 },
  { area: 'backend', years: 4 },
  { area: 'web3', years: 3 },
  { area: 'infra', years: 2 },
  { area: 'ai', years: 1 }
]

export const stack: Tech[] = [
  { name: 'TypeScript', area: 'frontend', current: true, usedAt: ['YMS', 'Bitflow', 'IMD', 'NUPLAM'] },
  { name: 'React', area: 'frontend', current: true, usedAt: ['YMS', 'Bitflow', 'IMD', 'NUPLAM'] },
  { name: 'Next.js', area: 'frontend', current: true, usedAt: ['YMS', 'Bitflow', 'NUPLAM'] },
  { name: 'Tailwind CSS', area: 'frontend', current: true, usedAt: ['Estoqui', 'YMS', 'Bitflow', 'IMD'] },
  { name: 'TanStack Query', area: 'frontend', current: false, usedAt: ['Bitflow'] },
  { name: 'Angular', area: 'frontend', current: false, usedAt: ['Bitflow'] },
  { name: 'Vite', area: 'frontend', current: false, usedAt: ['IMD'] },
  { name: 'Cypress', area: 'frontend', current: false, usedAt: ['NUPLAM'] },
  { name: 'Python', area: 'backend', current: true, usedAt: ['Estoqui'] },
  { name: 'Django', area: 'backend', current: true, usedAt: ['Estoqui'] },
  { name: 'PostgreSQL', area: 'backend', current: true, usedAt: ['Estoqui', 'YMS', 'NUPLAM'] },
  { name: 'Supabase', area: 'backend', current: true, usedAt: ['YMS'] },
  { name: 'Drizzle', area: 'backend', current: true, usedAt: ['YMS'] },
  { name: 'Node.js', area: 'backend', current: false, usedAt: ['Bitflow'] },
  { name: 'Java', area: 'backend', current: false, usedAt: ['IMD', 'NUPLAM'] },
  { name: 'Spring Boot', area: 'backend', current: false, usedAt: ['IMD', 'NUPLAM'] },
  { name: 'MongoDB', area: 'backend', current: false, usedAt: ['NUPLAM'] },
  { name: 'Docker', area: 'infra', current: true, usedAt: ['Estoqui'] },
  { name: 'Dokploy · Vercel', area: 'infra', current: true, usedAt: ['Estoqui', 'Bitflow'] },
  { name: 'GitHub Actions', area: 'infra', current: true, usedAt: ['Estoqui', 'YMS'] },
  { name: 'VPS · DNS · SSL', area: 'infra', current: true, usedAt: ['Estoqui'] },
  { name: 'Clarity', area: 'web3', current: false, usedAt: ['Bitflow'] },
  { name: 'Stacks', area: 'web3', current: false, usedAt: ['Bitflow'] },
  { name: 'Bitcoin DeFi', area: 'web3', current: false, usedAt: ['Bitflow'] },
  { name: 'AI agents', area: 'ai', current: true, usedAt: ['Estoqui'] },
  { name: 'n8n', area: 'ai', current: true, usedAt: ['Estoqui'] },
  { name: 'Claude Code', area: 'ai', current: true, usedAt: ['raw', 'YMS'] }
]

export const faq: Array<{ q: Localized; a: Localized }> = [
  {
    q: {
      en: 'Open to new roles?',
      'pt-BR': 'Está aberto a novas vagas?'
    },
    a: {
      en: 'Yes: full-time remote roles, or relocation abroad.',
      'pt-BR': 'Sim: vagas remotas full-time, ou relocação.'
    }
  },
  {
    q: { en: 'Which languages does he work in?', 'pt-BR': 'Em quais idiomas ele trabalha?' },
    a: {
      en: 'Portuguese (native) and English (full professional proficiency). He spent three years on a fully remote US team.',
      'pt-BR':
        'Português (nativo) e inglês (proficiência profissional). Passou três anos num time remoto dos EUA.'
    }
  },
  {
    q: { en: 'How do I contact him?', 'pt-BR': 'Como entro em contato?' },
    a: {
      en: 'Email rodrigoeduardodb1@gmail.com, or message him on LinkedIn.',
      'pt-BR': 'Pelo e-mail rodrigoeduardodb1@gmail.com, ou pelo LinkedIn.'
    }
  }
]
