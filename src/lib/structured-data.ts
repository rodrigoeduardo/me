import { getTranslator } from './i18n'
import { localePath, type Locale } from './locales'
import { normalizeImageUrl, type Post } from './posts'
import { education, faq, profile, projects, stack } from './profile'
import { siteUrl } from './site'

// schema.org JSON-LD for search engines and answer engines. Built only from
// lib/profile.ts and CMS data, so it never states more than the page does.

const personId = `${siteUrl}/#person`

function absolute(path: string) {
  return new URL(path, siteUrl).toString()
}

function person(locale: Locale) {
  const company = projects.find(
    project => project.id === profile.currentTeam.company.toLowerCase()
  )

  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    alternateName: [profile.fullName, profile.handle],
    url: absolute(localePath(locale, '/')),
    image: profile.avatar,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role[locale],
    worksFor: {
      '@type': 'Organization',
      name: profile.currentTeam.company,
      ...(typeof company?.url === 'string' ? { url: company.url } : {})
    },
    alumniOf: education.map(item => ({
      '@type': 'EducationalOrganization',
      name: item.school
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Natal',
      addressCountry: 'BR'
    },
    knowsAbout: stack.filter(tech => tech.current).map(tech => tech.name),
    knowsLanguage: ['pt-BR', 'en'],
    sameAs: [profile.github, profile.linkedin]
  }
}

export function homeStructuredData(locale: Locale) {
  const t = getTranslator(locale)
  const url = absolute(localePath(locale, '/'))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        inLanguage: ['en', 'pt-BR'],
        publisher: { '@id': personId }
      },
      {
        '@type': 'ProfilePage',
        '@id': url,
        url,
        name: t('meta.title'),
        description: t('meta.description'),
        inLanguage: locale,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': personId }
      },
      person(locale),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.q[locale],
          acceptedAnswer: { '@type': 'Answer', text: item.a[locale] }
        }))
      }
    ]
  }
}

export function postStructuredData(post: Post, locale: Locale) {
  const url = absolute(localePath(locale, `/posts/${post.slug}`))

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.coverImage
      ? { image: absolute(normalizeImageUrl(post.coverImage.url)) }
      : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    ...(post.category ? { articleSection: post.category.name } : {}),
    inLanguage: locale,
    author: {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      url: absolute(localePath(locale, '/'))
    }
  }
}
