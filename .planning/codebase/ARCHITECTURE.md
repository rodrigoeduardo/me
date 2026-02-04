# Architecture

**Analysis Date:** 2026-02-04

## Pattern Overview

**Overall:** Hybrid monorepo with separated concerns - Next.js frontend website + Payload CMS admin backend, integrated through same codebase with route grouping.

**Key Characteristics:**
- Route groups for clear separation: `(site)` for public website, `(payload)` for admin/API
- Server-side rendering for public pages, client-side hydration for interactive features
- Payload CMS as headless backend with REST/GraphQL APIs
- Content-first architecture with programmatic site generation from CMS data
- Client-side i18n (en/pt-BR) with localStorage persistence
- Theme switching via CSS variables and dark class on `<html>`

## Layers

**Presentation Layer (Components):**
- Purpose: React components rendering the public website
- Location: `src/components/`
- Contains: Page sections (Hero, PostList, Header, Footer), UI components, animation components
- Depends on: `lib/i18n`, `lib/fetcher`, Next.js Image/Link, framer-motion
- Used by: Route pages in `app/(site)/`

**Page Layer (Server/Client):**
- Purpose: Next.js page routes and layouts managing content display
- Location: `src/app/(site)/` for public pages, `src/app/(payload)/` for admin
- Contains: Page components (RSC), layout wrappers, API route handlers
- Depends on: Components, fetcher library, Payload config
- Used by: Next.js routing system

**Data Access Layer:**
- Purpose: Payload CMS collections defining schema and access rules
- Location: `src/collections/`
- Contains: Posts, Categories, Users, Media collection configs
- Depends on: Payload types and collection config builders
- Used by: Payload config, API endpoints

**Infrastructure Layer:**
- Purpose: Payload CMS admin and API endpoints
- Location: `src/app/(payload)/api/`, generated Payload admin
- Contains: REST API handlers, GraphQL endpoint, admin UI
- Depends on: Payload config, collections
- Used by: Public site for fetching content

**Utilities Layer:**
- Purpose: Shared helpers and configuration
- Location: `src/lib/`
- Contains: i18n context/hooks, HTTP fetcher, theme utilities
- Depends on: React hooks, localStorage API
- Used by: Components and pages throughout

## Data Flow

**Content Publishing:**
1. Admin creates/edits post in Payload admin at `/admin`
2. Payload stores in PostgreSQL with localization and status (draft/published)
3. beforeChange hook auto-generates slug from title
4. Post assigned to Category (relationship field)

**Content Display on Public Site:**
1. User navigates to `/posts` or individual post `/posts/[slug]`
2. Page uses RSC to fetch from `/api/posts` with filters (status=published, slug=param)
3. Payload REST API enforces access control - anonymous users see only published posts
4. Component receives Post data and renders via RichTextRenderer
5. Related metadata (category, cover image) hydrated in single request (depth=1)

**Internationalization:**
1. LanguageProvider wraps SiteWrapper (set at `(site)` layout level)
2. User toggles language via LanguageToggle component
3. Locale stored in localStorage, used by useLanguage hook
4. Components receive t() function from context for translations

**Theme Management:**
1. Script in (site) layout head reads localStorage.theme before paint
2. Adds `dark` class to `<html>` if theme=dark or system prefers-color-scheme
3. CSS variables in globals.css switch based on .dark selector
4. ThemeToggle component (dynamically loaded) allows user switching

**Media Handling:**
1. Posts reference media via upload relationship field
2. Media stored in PostgreSQL + `public/media/` directory
3. Components construct image URLs: `/media/{filename}`
4. Next.js Image component optimizes on-the-fly

**State Management:**
- Locale preference: React Context (LanguageProvider/useLanguage) + localStorage
- Theme preference: localStorage + CSS class manipulation
- Post data: SWR hook (client-side caching) in HomePostsSection
- Server state: PostgreSQL via Payload ORM

## Key Abstractions

**LanguageProvider/useLanguage:**
- Purpose: Manage locale state and provide translation function
- Examples: `src/lib/i18n.tsx`
- Pattern: React Context with localStorage hydration, type-safe translation keys

**SiteWrapper:**
- Purpose: Layout provider component wrapping all site content
- Examples: `src/app/(site)/SiteWrapper.tsx`
- Pattern: Client component composing Header, Footer, LanguageProvider

**RichTextRenderer:**
- Purpose: Convert Lexical JSON format to React elements
- Examples: `src/components/PostPageContent.tsx`
- Pattern: Recursive node renderer handling text formatting (bold, italic, code) and block types (heading, list, quote, link, code block)

**Collection Config Pattern:**
- Purpose: Define Payload CMS schema, access rules, hooks
- Examples: `src/collections/Posts.ts`, `src/collections/Users.ts`
- Pattern: CollectionConfig objects with fields array, access hooks, beforeChange/afterChange lifecycle hooks

**Fetcher:**
- Purpose: SWR-compatible HTTP fetcher
- Examples: `src/lib/fetcher.ts`
- Pattern: Simple wrapper converting fetch response to JSON

## Entry Points

**Public Website:**
- Location: `src/app/(site)/page.tsx` (home), `src/app/(site)/posts/page.tsx`, `src/app/(site)/posts/[slug]/page.tsx`
- Triggers: User navigating to site
- Responsibilities: Server-side data fetching, metadata generation, page composition

**Admin Panel:**
- Location: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Triggers: User navigating to `/admin`
- Responsibilities: Payload admin UI (auto-generated by Payload framework)

**REST API:**
- Location: `src/app/(payload)/api/[...slug]/route.ts`
- Triggers: HTTP requests to `/api/*`
- Responsibilities: Auto-generated Payload REST handlers (GET/POST/PATCH/DELETE/PUT)

**GraphQL API:**
- Location: `src/app/(payload)/api/graphql/route.ts`
- Triggers: POST to `/api/graphql`
- Responsibilities: GraphQL execution for Payload schema

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All requests (server-side only wrapper)
- Responsibilities: Metadata, minimal pass-through (children only)

## Error Handling

**Strategy:** Silent fallback patterns with user-facing feedback

**Patterns:**
- Posts not found: notFound() called in SSR, redirects to Next.js not-found page
- Failed API fetch in HomePostsSection: Catch and return null, display "No posts yet" message
- Missing data in components: Null checks with optional chaining (?.docs, ?.coverImage)
- RichText rendering: Return null for empty content structure
- Lexical format bits: Conditional formatting application (format & 1 for bold, etc.)

## Cross-Cutting Concerns

**Logging:** No centralized logging detected; uses console.error for development (e.g., in post fetching)

**Validation:**
- Payload collection fields have required/unique validators built-in
- Slug generation hook auto-validates format in beforeChange
- Access control: Role-based (admin/editor) and user ownership checks in collection access rules

**Authentication:**
- Payload Users collection with auth: true
- JWT-based, role field saved to JWT (saveToJWT: true)
- Role-based access enforcement on all collections (Posts, Categories, Media)
- Admin can manage users, editors see only their own data

**Authorization:**
- Read access: Published posts for anonymous, all for authenticated
- Create/Update/Delete: Authenticated user requirement, admin-only for Users
- Field-level: User.role field only editable by admin

---

*Architecture analysis: 2026-02-04*
