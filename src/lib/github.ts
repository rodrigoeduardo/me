export interface RepoActivity {
  name: string
  url: string
  language: string | null
  pushedAt: string
}

interface GitHubRepo {
  name: string
  html_url: string
  language: string | null
  pushed_at: string
  fork: boolean
}

// Public repos ordered by last push. Unauthenticated, so cache for an hour
// to stay well under GitHub's 60 requests/hour limit.
export async function getRecentRepos(
  user: string,
  limit = 8
): Promise<RepoActivity[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=${limit + 4}`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 }
      }
    )
    if (!res.ok) return []

    const repos = (await res.json()) as GitHubRepo[]
    return repos
      .filter(repo => !repo.fork && repo.name !== user)
      .slice(0, limit)
      .map(repo => ({
        name: repo.name,
        url: repo.html_url,
        language: repo.language,
        pushedAt: repo.pushed_at
      }))
  } catch {
    return []
  }
}

interface ContributionsResponse {
  data?: {
    user: {
      contributionsCollection: {
        restrictedContributionsCount: number
        commitContributionsByRepository: Array<{
          repository: { isPrivate: boolean }
          contributions: { totalCount: number }
        }>
      }
    } | null
  }
}

// Contributions to private repos over the last year, as a count only (no repo
// names). Needs GITHUB_TOKEN; returns null without it or on any failure.
// With the owner's token, private commits come back per repo; with any other
// token GitHub only reports them as restricted contributions.
export async function getPrivateContributions(
  user: string
): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ($login: String!) {
          user(login: $login) {
            contributionsCollection {
              restrictedContributionsCount
              commitContributionsByRepository(maxRepositories: 100) {
                repository { isPrivate }
                contributions { totalCount }
              }
            }
          }
        }`,
        variables: { login: user }
      }),
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null

    const json = (await res.json()) as ContributionsResponse
    const collection = json.data?.user?.contributionsCollection
    if (!collection) return null

    const privateCommits = collection.commitContributionsByRepository
      .filter(entry => entry.repository.isPrivate)
      .reduce((sum, entry) => sum + entry.contributions.totalCount, 0)
    return privateCommits || collection.restrictedContributionsCount || null
  } catch {
    return null
  }
}
