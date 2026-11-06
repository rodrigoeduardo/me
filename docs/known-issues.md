# Known issues

Open problems found in a codebase audit (2026-02), re-checked 2026-11-05 after the profile redesign.

## Correctness / robustness

- `src/components/PostPageContent.tsx` types Lexical nodes as `any` and assumes well-formed children. One malformed post breaks the whole page. Fix: use types from `@payloadcms/richtext-lexical`, guard `children` access. Accounts for 5 of the 6 `pnpm lint` errors.
- `src/lib/i18n.tsx` sets state synchronously inside an effect to read the stored locale (`react-hooks/set-state-in-effect`, the 6th lint error). The page also renders in English first and then switches to the stored locale.
- `src/components/PostsPageContent.tsx` fetches posts and categories with `limit=100` and no pagination. Items past 100 silently disappear.

## Security

- `posts/[slug]/page.tsx` interpolates `slug` into the API query string unencoded. Fix: `encodeURIComponent` or `URLSearchParams`.
- Rich-text links in `PostPageContent.tsx` are rendered without URL validation. Reject `javascript:` URLs.
- `NEXT_PUBLIC_SERVER_URL` falls back to `http://localhost:3000` in 3 places (`posts/[slug]/page.tsx`, `PostPageContent.tsx`, `PostsPageContent.tsx`). In production a missing var fails quietly. Fix: centralize the value and fail the build if unset.
- `Media` has `read: () => true`, so all media is listable. Fine if every upload is public.
- No rate limiting on Payload auth endpoints.

## Performance

- The posts list and the posts panels on the home page fetch client-side with SWR on every visit. The home page itself revalidates hourly (GitHub data) and the post page every 60s.

## Tooling

- No tests (unit or E2E).
- No CI, dependency audit or Dependabot. A Vercel check still runs on pull requests, but production is built by Dokploy from the `Dockerfile`, so a passing Vercel check does not prove the production build.
