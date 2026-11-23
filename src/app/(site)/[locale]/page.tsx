import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { MilestoneRow } from '@/components/profile/MilestoneRow'
import { FeaturedProject } from '@/components/profile/FeaturedProject'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { LeftRail, RightRail } from '@/components/profile/Rails'
import { getPrivateContributions, getRecentRepos } from '@/lib/github'
import { getTranslator } from '@/lib/i18n'
import { isLocale, languageAlternates, localePath } from '@/lib/locales'
import { profile } from '@/lib/profile'
import { baseOpenGraph } from '@/lib/site'
import { homeStructuredData } from '@/lib/structured-data'

export const revalidate = 3600

interface HomeProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params
}: HomeProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getTranslator(locale)

  return {
    alternates: {
      canonical: localePath(locale, '/'),
      languages: languageAlternates('/')
    },
    openGraph: {
      ...baseOpenGraph(locale),
      title: t('meta.title'),
      description: t('meta.description'),
      url: localePath(locale, '/'),
      type: 'profile',
      images: [{ url: profile.avatar, alt: profile.fullName }]
    }
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [activity, privateContributions] = await Promise.all([
    getRecentRepos(profile.handle),
    getPrivateContributions(profile.handle)
  ])

  return (
    <div className='max-w-[1240px] mx-auto px-3 sm:px-4 py-4 grid grid-cols-1 gap-4 lg:grid-cols-[190px_minmax(0,1fr)_210px]'>
      <JsonLd data={homeStructuredData(locale)} />
      <div className='min-w-0 flex flex-col gap-3 lg:col-start-2 lg:row-start-1'>
        <div>
          <ProfileCard locale={locale} />
          <MilestoneRow locale={locale} />
        </div>
        <FeaturedProject locale={locale} />
        <ProfileTabs locale={locale} />
      </div>
      <div className='min-w-0 lg:col-start-1 lg:row-start-1'>
        <LeftRail locale={locale} />
      </div>
      <div className='min-w-0 lg:col-start-3 lg:row-start-1'>
        <RightRail
          locale={locale}
          activity={activity}
          privateContributions={privateContributions}
        />
      </div>
    </div>
  )
}
