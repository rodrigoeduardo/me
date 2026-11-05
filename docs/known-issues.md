# Known issues

Open problems found in a codebase audit (2026-02), re-checked 2026-11-05.

## Correctness / robustness

- `src/lib/fetcher.ts` ignores `res.ok`. SWR gets a JSON-parse error or an error body as data instead of a clear error. Fix: throw on `!res.ok`.
- `src/components/PostPageContent.tsx` types Lexical nodes as `any` and assumes well-formed children. One malformed post breaks the whole page. Fix: use types from `@payloadcms/richtext-lexical`, guard `children` access.
- `src/components/PostsPageContent.tsx` fetches posts and categories with `limit=100` and no pagination. Items past 100 silently disappear.

## Security

- `posts/[slug]/page.tsx` interpolates `slug` into the API query string unencoded. Fix: `encodeURIComponent` or `URLSearchParams`.
- Rich-text links are rendered without URL validation. Reject `javascript:` URLs.
- `NEXT_PUBLIC_SERVER_URL` falls back to `http://localhost:3000` in 4 places. In production a missing var fails quietly. Fix: centralize the value and fail the build if unset.
- `Media` has `read: () => true`, so all media is listable. Fine if every upload is public.
- No rate limiting on Payload auth endpoints.

## Performance

- `animations/Particles.tsx` runs an unthrottled `requestAnimationFrame` loop. Consider fewer particles on low-end devices and respecting `prefers-reduced-motion`.
- Only the post page sets `revalidate`. List pages fetch client-side on every visit.

## Tooling

- No tests (unit or E2E).
- No CI, dependency audit or Dependabot.
