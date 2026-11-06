# rodrigoeduardo.com

Personal site and blog of Rodrigo Eduardo, a full-stack software engineer. The home page is a career profile laid out like a player profile: identity card, milestones, a featured project (YMS / Pátio), experience, projects, stack, and live GitHub activity. Posts are managed in Payload CMS.

The site is bilingual (English and Brazilian Portuguese) and follows the OS light/dark theme.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with [Payload CMS 3](https://payloadcms.com) in the same app
- PostgreSQL (Supabase) through `@payloadcms/db-postgres`
- Media on Supabase Storage through the S3 adapter
- Tailwind CSS v4, Open Sans via `next/font`, `lucide-react` icons
- SWR for client-side fetching

## Getting started

Requires Node 24 and pnpm.

```bash
pnpm install
cp .env.example .env   # then fill in the values
pnpm dev               # http://localhost:3000
```

The Payload admin is at `/admin`; the REST and GraphQL APIs are under `/api`.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string. With Supabase, use the transaction pooler (port 6543) with `?pgbouncer=true`. |
| `PAYLOAD_SECRET` | yes | Payload encryption secret (`openssl rand -base64 32`). |
| `NEXT_PUBLIC_SERVER_URL` | yes | Public URL of the site, used for media URLs. Inlined at build time. |
| `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_ENDPOINT` | yes | Supabase Storage credentials for media uploads. |
| `GITHUB_TOKEN` | no | Shows a count of private GitHub contributions on the home page. Hidden when unset. |

See `.env.example` for details.

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # ESLint
pnpm format   # Prettier
```

## Project layout

```
src/
  app/(site)/      public site: home, posts list, post page
  app/(payload)/   Payload admin and API routes
  collections/     Payload collections: Posts, Categories, Media, Users
  components/      UI; the home page lives in components/profile/
  lib/profile.ts   career facts: teams, projects, stack, milestones
  lib/github.ts    GitHub activity and private contribution count
  lib/i18n.tsx     en / pt-BR dictionaries
public/assets/     CVs and project screenshots
payload.config.ts  Payload configuration
```

To update career content (technologies, projects, experience), edit `src/lib/profile.ts`. UI strings live in `src/lib/i18n.tsx`.

## Deployment

Production runs on a VPS with [Dokploy](https://dokploy.com), built from the `Dockerfile` (Next.js standalone output). Only `NEXT_PUBLIC_SERVER_URL` is needed at build time; the other variables are read at runtime and are set in the Dokploy app settings.

## Docs

- [`PRODUCT.md`](PRODUCT.md): audience, positioning, product facts
- [`DESIGN.md`](DESIGN.md): visual system, tokens and design rules
- [`docs/architecture.md`](docs/architecture.md): collections, data flow, theme and i18n
- [`docs/known-issues.md`](docs/known-issues.md): open bugs and concerns
