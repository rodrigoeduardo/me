---
version: 1
slug: "src-app-site-page-tsx"
primary_target: "src/app/(site)/page.tsx"
related_targets: ["src/app/(site)/posts/page.tsx"]
---

# Surface: home (/) — Ficha de Jogador

Scope: home page, plus header/footer and the posts list/article restyled in the same world. Mode: Experience (portfolio). Audience: recruiters skimming; job: understand what Rodrigo ships, get CV/contact. Build path: code-led (no image generation).

Pinned by user: "quase igual ao perfil de jogador HLTV", translated to dev career, with little direct allusion to CS or tournaments. Stats bars = years per area (Frontend 4, Backend 4, Infra 2, Web3 3, IA & Automação 1; confirmed). Right column = live GitHub public activity. YMS client not named. Photo = GitHub avatar.

## Direction contract

THESIS: Rodrigo's career as a pro player profile page: identity table, team history, achievements, stats and recent "matches" (projects), dense and factual. Refuses the hero-with-photo-plus-card-grid dev portfolio.

OWN-WORLD: light gray-blue page ground, white boxes with pale header strips, #353535 ink, link blue #2d6da3, gold #dea905 achievement badges, green/red/gray status edges on project rows; dark theme is the same structure on slate boxes. Open Sans at small, dense sizes; tabular numerals. Three-column layout: left rail (current stack ranking, events), main profile, right rail (GitHub activity).

STORY: in one skim the recruiter sees who he is, current company, years and team history, then YMS as the featured project with real screenshots, then stack by area; they download the CV or open GitHub/LinkedIn/email.

FIRST VIEWPORT: compact top nav (name, sections, language, theme, CV button). Main column: profile box with square photo on a dark tinted panel and a "Dev" tag, name 24px+ bold, full name small, info rows (role, current company, experience, teams with years, achievement badges, availability), social buttons top-right; a row of milestone icons with year badges below; then the YMS feature band in the banner slot. Left rail: current-stack ranking; right rail: GitHub activity list.

FORM: Ficha de Jogador (HLTV player profile), position 1 on own list (IMPECCABLE'S PICK, chosen by user). seed:ef5948b966025555

Signature interaction: profile tabs (Visão geral, Experiência, Projetos, Conquistas, Stack, Posts) switch in place with hash deep links; stat bars fill once on load (none under reduced motion).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
