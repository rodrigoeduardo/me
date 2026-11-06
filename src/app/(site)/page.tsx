import { ProfileCard } from '@/components/profile/ProfileCard'
import { MilestoneRow } from '@/components/profile/MilestoneRow'
import { FeaturedProject } from '@/components/profile/FeaturedProject'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { LeftRail, RightRail } from '@/components/profile/Rails'
import { getPrivateContributions, getRecentRepos } from '@/lib/github'
import { profile } from '@/lib/profile'

export const revalidate = 3600

export default async function Home() {
  const [activity, privateContributions] = await Promise.all([
    getRecentRepos(profile.handle),
    getPrivateContributions(profile.handle)
  ])

  return (
    <div className='max-w-[1240px] mx-auto px-3 sm:px-4 py-4 grid grid-cols-1 gap-4 lg:grid-cols-[190px_minmax(0,1fr)_210px]'>
      <div className='min-w-0 flex flex-col gap-3 lg:col-start-2 lg:row-start-1'>
        <div>
          <ProfileCard />
          <MilestoneRow />
        </div>
        <FeaturedProject />
        <ProfileTabs />
      </div>
      <div className='min-w-0 lg:col-start-1 lg:row-start-1'>
        <LeftRail />
      </div>
      <div className='min-w-0 lg:col-start-3 lg:row-start-1'>
        <RightRail
          activity={activity}
          privateContributions={privateContributions}
        />
      </div>
    </div>
  )
}
