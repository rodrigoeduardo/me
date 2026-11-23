import { localePath } from '@/lib/locales'
import {
  education,
  faq,
  featuredProjects,
  languages,
  pick,
  profile,
  projects,
  stack,
  teams
} from '@/lib/profile'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

// Plain-text profile for LLMs and answer engines (llmstxt.org), built from
// the same facts as the home page.
export function GET() {
  const url = (path: string) => `${siteUrl}${path}`

  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.fullName}, ${profile.role.en} in ${profile.location.en}. ${profile.currentTeam.role} at ${profile.currentTeam.company}. ${profile.availability.en}.`,
    '',
    '## Links',
    '',
    `- [Profile (English)](${url(localePath('en', '/'))})`,
    `- [Perfil (português)](${url(localePath('pt-BR', '/'))})`,
    `- [Posts](${url(localePath('en', '/posts'))})`,
    `- [CV (English, PDF)](${url('/assets/cvs/rodrigoeduardo-cv-en.pdf')})`,
    `- [CV (português, PDF)](${url('/assets/cvs/rodrigoeduardo-cv-pt.pdf')})`,
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    `- Email: ${profile.email}`,
    '',
    '## Experience',
    '',
    ...teams.flatMap(team => [
      `### ${team.company}: ${team.role.en} (${team.start} to ${team.end ?? 'present'}, ${team.location.en})`,
      '',
      ...team.highlights.map(item => `- ${item.en}`),
      ''
    ]),
    '## Featured projects',
    '',
    ...featuredProjects.flatMap(project => [
      `### ${project.name.en}`,
      '',
      project.summary.en,
      '',
      `- Status: ${project.status.en}`,
      ...project.facts.map(fact => `- ${fact.en}`),
      `- Stack: ${project.stack.map(item => item.name).join(', ')}`,
      ...(project.site ? [`- Site: ${project.site.en}`] : []),
      ...(project.repo ? [`- Source: ${project.repo}`] : []),
      ''
    ]),
    '## Other projects',
    '',
    ...projects.map(project => {
      const link = project.url ? pick(project.url, 'en') : project.repo
      const name = pick(project.name, 'en')
      return `- ${link ? `[${name}](${link})` : name} (${project.period}): ${project.context.en}`
    }),
    '',
    '## Stack',
    '',
    `- Current: ${stack
      .filter(tech => tech.current)
      .map(tech => tech.name)
      .join(', ')}`,
    `- Previously: ${stack
      .filter(tech => !tech.current)
      .map(tech => tech.name)
      .join(', ')}`,
    '',
    '## Education',
    '',
    ...education.map(
      item => `- ${item.school}: ${item.degree.en} (${item.period})`
    ),
    '',
    '## Languages',
    '',
    ...languages.map(item => `- ${item.name.en}: ${item.level.en}`),
    '',
    '## FAQ',
    '',
    ...faq.flatMap(item => [`### ${item.q.en}`, '', item.a.en, ''])
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
