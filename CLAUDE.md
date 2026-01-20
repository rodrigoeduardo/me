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

### Route Groups

- **`app/(site)/`** - Public website (home, posts, individual post pages)
- **`app/(payload)/`** - Payload admin at `/admin` and REST/GraphQL APIs at `/api`

### Payload CMS

- **Database**: SQLite via `@payloadcms/db-sqlite` (file: `payload.db`)
- **Editor**: Lexical rich text editor
- **Collections** in `collections/`: Posts (localized), Categories, Media, Users
- **Config**: `payload.config.ts` → auto-generates types to `payload-types.ts`

### Key Patterns

- **i18n**: Client-side via `lib/i18n.tsx` React Context (en/pt-BR)
- **Theming**: CSS variables in `globals.css`, dark class on `<html>`
- **Fonts**: Space Grotesk (primary), IBM Plex Mono (secondary)

### Path Aliases

- `@/*` → project root
- `@payload-config` → `payload.config.ts`

### Environment Variables

See `.env.example`: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
