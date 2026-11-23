# Known issues

Open problems found in a codebase audit (2026-02), re-checked 2026-11-05 after the profile redesign.

## Correctness / robustness

- `src/components/PostPageContent.tsx` types Lexical nodes as `any` and assumes well-formed children. One malformed post breaks the whole page. Fix: use types from `@payloadcms/richtext-lexical`, guard `children` access. Accounts for all 4 `pnpm lint` errors.
- `src/lib/posts.ts` fetches posts and categories with `limit=100` and no pagination. Items past 100 silently disappear.

## Security

- Rich-text links in `PostPageContent.tsx` are rendered without URL validation. Reject `javascript:` URLs.
- `NEXT_PUBLIC_SERVER_URL` falls back to `http://localhost:3000` (`src/lib/site.ts`, `payload.config.ts`). In production a missing var fails quietly, and canonical URLs, hreflang, sitemap and JSON-LD would point at localhost. Fix: fail the build if unset.
- `Media` has `read: () => true`, so all media is listable. Fine if every upload is public.
- No rate limiting on Payload auth endpoints.

## Performance

- The posts panels on the home page fetch client-side with SWR on every visit. The home page itself revalidates hourly (GitHub data); the posts list and post page every 60s.
- A build without CMS access (the Docker build) bakes the posts list's error state into the prerendered page. It is replaced on the first revalidation after 60s, so the first visitor after a deploy can see it.
- Mobile LCP in a local Lighthouse run is ~2.8s (simulated slow 4G), above the 2.5s target. JavaScript is no longer the bottleneck (TBT ~5ms); look at the avatar and featured screenshot requests next.

## Tooling

- No tests (unit or E2E).
- No CI, dependency audit or Dependabot. A Vercel check still runs on pull requests, but production is built by Dokploy from the `Dockerfile`, so a passing Vercel check does not prove the production build.
