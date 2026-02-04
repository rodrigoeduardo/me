# Coding Conventions

**Analysis Date:** 2026-02-04

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `Hero.tsx`, `PostCard.tsx`, `ThemeToggle.tsx`)
- Utilities/functions: camelCase (e.g., `fetcher.ts`, `i18n.tsx`)
- Collections: PascalCase (e.g., `Posts.ts`, `Categories.ts`, `Media.ts`)
- Page/route files: lowercase with hyphens or brackets for dynamic routes (e.g., `[slug]/page.tsx`)

**Functions:**
- React components: PascalCase, exported as named exports
  - Example: `export function Hero() { ... }`
  - Example: `export function PostCard({ ... }: PostCardProps) { ... }`
- Helper functions: camelCase
  - Example: `const formatPosts = (data: PostsResponse) => { ... }`
  - Example: `function getDirectionOffset() { ... }`
- Factory/formatter functions: camelCase
  - Example: `const fetcher = (url: string) => fetch(url).then(res => res.json())`
  - Example: `const renderNode = (node: any, index: number): React.ReactNode => { ... }`

**Variables:**
- Local state/data: camelCase
  - Example: `const [animationStep, setAnimationStep] = useState(0)`
  - Example: `const { data, isLoading } = useSWR(...)`
  - Example: `const isInView = useInView(ref, { once: true, amount: 0.5 })`
- Constants: UPPER_SNAKE_CASE (only for truly global/config constants)
  - Example: `const PARTICLE_COLORS: string[] = ['#22d3ee', '#67e8f9', '#a5f3fc', '#0e7490']`
- CSS class strings: Use Tailwind utility classes inline
- Object properties: camelCase (following JavaScript conventions)

**Types:**
- Interfaces: PascalCase with "Props" suffix for component props
  - Example: `interface PostCardProps { ... }`
  - Example: `interface BlurTextProps { ... }`
- Type aliases: PascalCase
  - Example: `export type Locale = 'en' | 'pt-BR'`
  - Example: `type TranslationKey = keyof typeof translations.en`
- Union types: PascalCase
  - Example: `type Post = { ... }`

## Code Style

**Formatting:**
- Tool: Prettier 3.8.0
- Configuration file: `.prettierrc`

**Key settings:**
```json
{
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "endOfLine": "auto"
}
```

**Style notes:**
- No semicolons at end of statements
- Single quotes for strings and JSX attributes
- Arrow functions without parens when single parameter (e.g., `x => x.value`)
- No trailing commas in arrays/objects
- Consistent 2-space indentation

**Linting:**
- Tool: ESLint 9 with Next.js config
- Config: `eslint.config.mjs`
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignored paths: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**Run linting:**
```bash
pnpm lint
```

## Import Organization

**Order (from `src/components/Hero.tsx`, `src/components/Header.tsx`, etc.):**
1. 'use client' directive (for client components)
2. React/Next.js imports (Image, Link, useState, etc.)
3. Third-party library imports (framer-motion, react-theme-switch-animation, etc.)
4. Relative path imports with `@/` alias imports
5. Type-only imports grouped together or co-located with other imports

**Path Aliases:**
- `@/*` → `./src/*` (e.g., `@/components/PostCard`, `@/lib/i18n`, `@/collections/Posts`)
- `@payload-config` → `./payload.config.ts`

**Example pattern from `src/components/Hero.tsx`:**
```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import dynamic from 'next/dynamic'
import { BlurText } from '@/components/animations/BlurText'
import { ShinyText } from '@/components/animations/ShinyText'
```

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (e.g., `src/app/(site)/posts/[slug]/page.tsx`)
  ```typescript
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (res.ok) {
      const data = await res.json()
      return data.docs?.[0] || null
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }
  return null
  ```
- Fallback returns (null, empty arrays, or default values)
- Optional chaining for potentially undefined properties (e.g., `data?.docs`, `post?.coverImage?.filename`)
- Nullish coalescing for defaults (e.g., `level = node.tag?.replace('h', '') || '2'`)
- Next.js `notFound()` function for missing resources in page routes
  ```typescript
  if (!post) {
    notFound()
  }
  ```

**Logging:**
- Use `console.error()` for error logging (e.g., `console.error('Failed to fetch post:', error)`)
- No centralized logger or structured logging framework
- Errors logged at point of failure

## Comments

**When to Comment:**
- Inline comments explain non-obvious logic or workarounds
- Comments appear before complex calculations or conditional branches
- Section comments mark major logical areas in components

**Examples:**
```typescript
// Particles background
<div className='absolute inset-0 -z-10'>
  <Particles ... />
</div>

// Greeting with shimmer effect
<ShinyText text={t('hero.greeting')} ... />

// Name with blur entrance
<h1>
  <BlurText text='Rodrigo Eduardo' ... />
</h1>
```

**JSDoc/TSDoc:**
- Minimal usage
- No comprehensive JSDoc comments on exported functions
- Type safety via TypeScript interfaces/types replaces documentation

## Function Design

**Size:**
- Keep functions between 20-100 lines (typical range observed)
- Component render methods can exceed 100 lines for layout-heavy components
- Extract complex rendering logic to separate functions

**Parameters:**
- Components use destructured props with explicit type (via Props interface)
- Helper functions accept typed parameters
- Optional parameters have defaults or are marked optional with `?`

**Return Values:**
- React components return JSX elements or null
- Utility functions return typed values (with TypeScript guarantees)
- Data-fetching functions return typed data or null

**Example from `src/components/HomePostsSection.tsx`:**
```typescript
function formatPosts(data: PostsResponse | undefined): PostCardProps[] {
  if (!data?.docs) return []

  return data.docs.map(post => ({
    title: post.title,
    slug: post.slug,
    // ... property mapping
  }))
}
```

## Module Design

**Exports:**
- Named exports for components and utilities
  - Example: `export function Hero() { ... }`
  - Example: `export { type Post }`
  - Example: `export const fetcher = (url: string) => ...`
- Types are exported separately with `type` prefix
  - Example: `export type Locale = 'en' | 'pt-BR'`
  - Example: `export interface PostCardProps { ... }`

**Barrel Files:**
- `src/components/animations/index.ts` exports animation components
  - Centralized re-exports for organized module structure
- Used selectively, not throughout the codebase

**Single Responsibility:**
- Each file has focused purpose (component, utility, or collection config)
- Component files contain one component per file (sometimes with internal helper functions)
- Type definitions co-located with their usage or in dedicated interface sections

## Client/Server Component Boundaries

**Client Components:**
- Mark with `'use client'` directive at top of file
- Used for interactivity: animations, state, event handlers
- Examples: `Hero.tsx`, `PostCard.tsx`, `ThemeToggle.tsx`, `Header.tsx`

**Server Components:**
- Default in Next.js App Router
- Used for data-fetching and async operations
- Examples: page routes like `src/app/(site)/posts/[slug]/page.tsx`

**Dynamic Imports:**
- Used for code splitting and SSR-safe component loading
  ```typescript
  const Particles = dynamic(
    () => import('@/components/animations/Particles').then(m => m.Particles),
    { ssr: false }
  )
  ```

## Styling

**Framework:** Tailwind CSS 4 (postcss)

**Approach:**
- Inline Tailwind utility classes (no component class extraction)
- CSS variables for themes and colors (defined in `globals.css`)
- Dark mode using `dark` class on `<html>` element
- CSS custom properties for color tokens: `--background`, `--foreground`, `--highlight`

**Example from `src/components/PostCard.tsx`:**
```typescript
<article className='group'>
  <Link href={`/posts/${slug}`} className='block'>
    {coverImage && (
      <div className='relative aspect-video mb-4 overflow-hidden rounded-lg bg-foreground/5'>
        {/* ... */}
      </div>
    )}
  </Link>
</article>
```

---

*Convention analysis: 2026-02-04*
