# Codebase Concerns

**Analysis Date:** 2026-02-04

## Tech Debt

**Unsafe Type Usage with `any`:**
- Issue: Rich text renderer uses `any` types for Lexical node objects without proper type definitions, reducing type safety and making refactoring risky
- Files: `src/components/PostPageContent.tsx` (lines 10, 22, 27, 47, 133)
- Impact: Type-checking doesn't catch malformed node structures; changes to Lexical schema could break rendering silently
- Fix approach: Create proper TypeScript interfaces for Lexical node structure (root, children, type, tag, format, etc.) or import type definitions from `@payloadcms/richtext-lexical`

**Error Handling in Fetcher Utility:**
- Issue: Simple fetcher in `src/lib/fetcher.ts` doesn't handle HTTP errors - it will throw on failed requests but doesn't distinguish between network errors and API errors
- Files: `src/lib/fetcher.ts` (line 1)
- Impact: SWR in `PostsPageContent.tsx` and `HomePostsSection.tsx` won't properly handle failed API calls; error states may not display correctly
- Fix approach: Enhance fetcher to check `response.ok` and throw Error with descriptive message; implement error boundary or error state UI

**Database File Tracked in Git History:**
- Issue: `payload.db` is marked as deleted in git status (D flag) but exists locally, indicating it was previously committed despite being in `.gitignore`
- Files: `payload.db` (deleted state)
- Impact: Historical git commits contain database snapshots; future developers may accidentally commit local db state again
- Fix approach: Ensure `payload.db` is removed from git history (it's already in `.gitignore`); consider adding `.gitignore` rule before any database file patterns

## Security Concerns

**Unvalidated URL Parameter in Post Slug:**
- Issue: Slug parameter in `src/app/(site)/posts/[slug]/page.tsx` line 12 is directly interpolated into API query string without validation
- Files: `src/app/(site)/posts/[slug]/page.tsx` (line 12)
- Impact: While Next.js URL parameters are relatively safe, query string injection is possible if slug contains special characters that aren't URL-encoded; could expose unintended filtering
- Fix approach: Explicitly validate slug format (alphanumeric + hyphens only) or use URLSearchParams to safely construct query string

**Media Upload Accessible to All:**
- Issue: Media collection has `read: () => true` allowing unauthenticated users to list/access all media
- Files: `src/collections/Media.ts` (line 11)
- Impact: File enumeration possible; users can discover all media URLs including unreferenced/private images
- Fix approach: Change read access to authenticated users only: `read: ({ req }) => !!req.user` (note: POST requests to display media still work, just not LIST)

**Basic HTTP-Only Fallback:**
- Issue: Server URL defaults to `http://localhost:3000` (unencrypted) in production fallback
- Files: `src/app/(site)/posts/[slug]/page.tsx` (line 12)
- Impact: If NEXT_PUBLIC_SERVER_URL env var not set, internal API calls degrade to HTTP in production, exposing tokens/cookies
- Fix approach: Make NEXT_PUBLIC_SERVER_URL required in production build; throw error at build time if missing

**Role-Based Access Control Missing Validation:**
- Issue: User role-based access in `src/collections/Users.ts` assumes role is always set/valid
- Files: `src/collections/Users.ts` (lines 13-14, 16, 18, 36)
- Impact: If role field is corrupted/null, access control falls back to falsy checks which may allow unintended access
- Fix approach: Add role field validation (required: true in field config) and explicit role validation in access functions

## Performance Bottlenecks

**Particles Animation Running on Every Viewport:**
- Issue: Canvas animation in `src/components/animations/Particles.tsx` runs requestAnimationFrame loop unconditionally with 60 particles at default
- Files: `src/components/animations/Particles.tsx` (lines 74-129)
- Impact: On low-end devices or multiple particle instances, can cause jank; no throttling/debouncing on mouse interaction calculations
- Fix approach: Add performance metrics monitoring; consider reducing particle count on lower-end devices or making mouse interaction optional; memoize distance calculations

**API Queries Without Pagination Limits:**
- Issue: Posts and categories queries in `PostsPageContent.tsx` use `&limit=100` which may return large datasets
- Files: `src/components/PostsPageContent.tsx` (lines 64, 69)
- Impact: If blog grows beyond 100 posts/categories, UI will silently not display additional items; network payload grows linearly
- Fix approach: Implement proper pagination or infinite scroll with cursor-based pagination; monitor payload size

**No Caching Strategy for API Responses:**
- Issue: Client-side SWR is configured but server-side caching strategy in Next.js routes not defined
- Files: `src/app/(site)/posts/[slug]/page.tsx` (line 13) uses `revalidate: 60` but posts list pages don't specify revalidation
- Impact: Frequently changing post lists cause unnecessary database queries; blog post pages revalidate every 60 seconds
- Fix approach: Implement stale-while-revalidate pattern; configure ISR (Incremental Static Regeneration) with appropriate revalidate times based on update frequency

**Inline Style Calculations in Rich Text Renderer:**
- Issue: Heading styles are computed with string-based lookups on every render
- Files: `src/components/PostPageContent.tsx` (lines 60-65)
- Impact: Minor: object literal is recreated on every render of each node
- Fix approach: Move `headingClasses` outside component or memoize; use constant object

## Fragile Areas

**Rich Text Rendering Without Null Checks:**
- Issue: RichTextRenderer assumes consistent Lexical node structure; if content.root or children are malformed, rendering fails
- Files: `src/components/PostPageContent.tsx` (lines 22-138)
- Impact: Single malformed post blocks entire post page; no fallback to show content partially
- Fix approach: Add defensive checks for each node.children access; wrap renderNode in try-catch with fallback UI

**Type Mismatch Between API Response and Component Props:**
- Issue: `PostPageContent.tsx` Post interface defines `content?: any` but Lexical content has specific structure; actual response shape not validated
- Files: `src/components/PostPageContent.tsx` (lines 6-20)
- Impact: TypeScript doesn't catch if API returns different content structure; runtime crashes on render
- Fix approach: Generate types from Payload config or validate response with zod/io-ts before passing to component

**Mouse Event Listeners Without Passive Flag:**
- Issue: While passive flags are used in `Particles.tsx`, resize and other window listeners lack them
- Files: `src/components/animations/Particles.tsx` (line 153)
- Impact: Potential performance warning in browser dev tools; resize events can block scrolling
- Fix approach: Add passive: true to all non-critical event listeners

**Unhandled Promise Rejection in fetcher:**
- Issue: `src/lib/fetcher.ts` uses `.then()` chain without `.catch()`, any JSON parse errors propagate uncaught
- Files: `src/lib/fetcher.ts`
- Impact: SWR will catch and set error state, but error message may be unclear (generic JSON parse error)
- Fix approach: Add explicit error handling and descriptive error messages

## Missing Critical Features

**No Request Rate Limiting:**
- Issue: Payload API endpoints have no rate limiting configured
- Files: `src/app/(payload)/api/[...slug]/route.ts` (auto-generated)
- Impact: Brute force attacks possible against authentication endpoints; resource exhaustion via repeated API calls
- Recommendation: Configure Payload's built-in rate limiting or add middleware-level throttling

**No Input Sanitization for Rich Text:**
- Issue: Lexical content is rendered directly in HTML without sanitization; links use target="_blank" without rel="noopener noreferrer" (though it's present)
- Files: `src/components/PostPageContent.tsx` (lines 105-116)
- Impact: XSS possible if Lexical editor allows script injection; link content isn't validated
- Recommendation: Parse and validate link URLs to prevent javascript: protocol; consider DOMPurify for additional safety

**No CSRF Protection Visible:**
- Issue: No CSRF token handling visible in Payload configuration or API routes
- Files: `payload.config.ts`, `src/app/(payload)/api/[...slug]/route.ts`
- Impact: POST/PUT/DELETE requests vulnerable to CSRF attacks from compromised sites
- Recommendation: Verify Payload includes CSRF protection by default; document if custom protection needed

**No Webhook Validation:**
- Issue: No webhook signature verification if third-party services call Payload APIs
- Files: (None visible - not implemented)
- Impact: If webhooks introduced, traffic spoofing possible
- Recommendation: When implementing webhooks, validate signatures using shared secret

## Test Coverage Gaps

**Zero Test Files:**
- Issue: No `.test.ts`, `.spec.ts`, or test directory found in project
- Files: Project-wide
- Impact: No automated validation of Rich text rendering, API responses, i18n logic, or animation behavior; refactoring breaks silently
- Priority: High
- Recommendation: Add Jest/Vitest with tests for:
  - RichTextRenderer with various Lexical node types
  - API response mocking and error scenarios
  - i18n context fallback behavior (SSR vs. client)
  - Post fetching and slug validation

**No E2E Tests:**
- Issue: No Cypress, Playwright, or similar E2E test framework configured
- Impact: User flows (browse posts, filter by category, navigate to post) untested
- Priority: Medium
- Recommendation: Add basic E2E tests for critical paths after unit tests

## Dependency Concerns

**Lexical Editor Library Size:**
- Issue: `@payloadcms/richtext-lexical` is a large dependency for content editing; affects build size
- Files: `package.json` (line 15), `src/components/PostPageContent.tsx`
- Impact: Large JS bundle for production users; may affect Core Web Vitals
- Monitoring: Check build output for Lexical bundle size; consider code splitting or deferring editor on admin pages only

**No Dependency Audit in CI:**
- Issue: No visible CI/CD configuration; no npm audit or Dependabot configured
- Files: (None - no CI config)
- Impact: Security vulnerabilities in dependencies won't be detected until manual audit
- Recommendation: Add npm audit to CI; enable Dependabot or similar for automated PRs

---

*Concerns audit: 2026-02-04*
