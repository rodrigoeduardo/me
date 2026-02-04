# Technology Stack

**Analysis Date:** 2026-02-04

## Languages

**Primary:**
- TypeScript 5.x - Entire codebase; Next.js and Payload CMS configuration
- JavaScript - Build and development tooling

**Secondary:**
- CSS - Tailwind CSS for styling
- SQL - PostgreSQL via Payload CMS

## Runtime

**Environment:**
- Node.js - Used by Next.js 16 and Payload CMS (version managed via pnpm)

**Package Manager:**
- pnpm - Primary package manager
- Lockfile: `pnpm-lock.yaml` (present)

## Frameworks

**Core:**
- Next.js 16.1.4 - Full-stack React framework; handles routing, API routes, SSR, static generation
- React 19.2.3 - UI component library
- React DOM 19.2.3 - DOM rendering

**Content Management:**
- Payload CMS 3.74.0 - Headless CMS; manages posts, categories, media, users
- @payloadcms/next 3.74.0 - Next.js integration for Payload
- @payloadcms/db-postgres 3.74.0 - PostgreSQL adapter for Payload
- @payloadcms/richtext-lexical 3.74.0 - Rich text editor (Lexical)
- @payloadcms/ui 3.74.0 - Payload admin UI components

**Styling & UI:**
- Tailwind CSS 4 - Utility-first CSS framework
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind
- postcss - CSS transformation; configured in `postcss.config.mjs`

**Animation & Graphics:**
- Framer Motion 12.27.5 - Animation library for React components
- ogl 1.0.11 - WebGL rendering library for 3D graphics
- react-theme-switch-animation 1.0.0 - Theme transition animations

**Data Fetching:**
- SWR 2.3.8 - Data fetching library; used in `src/components/HomePostsSection.tsx` and `src/components/PostsPageContent.tsx`
- GraphQL 16.12.0 - Query language; Payload CMS provides GraphQL endpoint at `/api/graphql`

**Media Processing:**
- Sharp 0.34.5 - Image optimization and processing

## Build & Development Tools

**Linting:**
- ESLint 9 - Code linting
- eslint-config-next 16.1.4 - Next.js ESLint configuration (includes core-web-vitals and TypeScript)
- Configuration: `eslint.config.mjs`

**Formatting:**
- Prettier 3.8.0 - Code formatter
- Configuration: `.prettierrc`
  - Tab width: 2 spaces
  - Single quotes for JS/JSX
  - No trailing commas
  - Arrow function parens: avoid
  - Semicolons: disabled

**Dev Dependencies:**
- @types/node 20.x - TypeScript types for Node.js
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions
- shadcn 3.7.0 - Component library CLI (for component scaffolding)

## Configuration

**Environment:**
- Configured via environment variables:
  - `DATABASE_URL` - PostgreSQL connection string (required for Payload CMS)
  - `PAYLOAD_SECRET` - Secret key for Payload CMS (recommend: `openssl rand -base64 32`)
  - `NEXT_PUBLIC_SERVER_URL` - Public server URL for metadata and API calls (defaults to `http://localhost:3000`)
- Environment file: `.env.example` (template provided)

**Build Configuration:**
- `next.config.ts` - Next.js configuration
  - Payload CMS integration via `withPayload()` wrapper
  - React Compiler: disabled
  - Image optimization: allows remote images from any HTTPS source

**TypeScript Configuration:**
- `tsconfig.json`
  - Target: ES2017
  - Module: ESNext
  - Strict mode: enabled
  - Path aliases: `@/*` → `./src/*`, `@payload-config` → `./payload.config.ts`
  - JSX: react-jsx

## Platform Requirements

**Development:**
- Node.js (version not pinned; managed by pnpm)
- pnpm (latest)
- PostgreSQL database (local or remote)

**Production:**
- Node.js runtime
- PostgreSQL database
- Deployment target: any platform supporting Next.js (Vercel, Docker, self-hosted)

---

*Stack analysis: 2026-02-04*
