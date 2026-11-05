# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server at localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

Personal portfolio/blog built with **Next.js 16** and **Payload CMS 3** integrated as a monorepo.

All source lives in `src/`; paths below are relative to it (config files like `payload.config.ts` are at the repo root).

### Route Groups

- **`app/(site)/`** - Public website (home, posts, individual post pages)
- **`app/(payload)/`** - Payload admin at `/admin` and REST/GraphQL APIs at `/api`

### Payload CMS

- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **Editor**: Lexical rich text editor
- **Collections** in `collections/`: Posts (localized), Categories, Media, Users
- **Config**: `payload.config.ts` → auto-generates types to `payload-types.ts`

### Key Patterns

- **i18n**: Client-side via `lib/i18n.tsx` React Context (en/pt-BR)
- **Theming**: CSS variables in `globals.css`, dark class on `<html>`
- **Fonts**: Space Grotesk (primary), IBM Plex Mono (secondary)

### Path Aliases

- `@/*` → `src/`
- `@payload-config` → `payload.config.ts`

### Conventions

- Prettier (`.prettierrc`): no semicolons, single quotes (JSX too), no trailing commas, `arrowParens: avoid`.
- Components: PascalCase files, named exports (`export function Hero()`), props typed as `XxxProps` interface.
- `'use client'` only where interactivity is needed. Post page fetches server-side; home and posts list fetch client-side with SWR.
- Browser-only components (e.g. `Particles`, `ThemeToggle`) load via `next/dynamic` with `ssr: false`.
- Tailwind utility classes inline; colors via CSS variables (`--background`, `--foreground`, `--highlight`).

### Docs

- `docs/architecture.md` - collections, data flow, theme and i18n details
- `docs/known-issues.md` - open bugs, security and performance concerns

### Environment Variables

See `.env.example`: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
