# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Rodrigo Eduardo for a software engineering role. They skim to learn who he is and what he has shipped, then download the CV or jump to GitHub/LinkedIn. Audience is both Brazilian and international.

Secondary: the site owner, publishing posts through the Payload admin at `/admin`.

## Product Purpose

Personal site for Rodrigo Eduardo, Software Engineer. Portfolio first, blog second: the site presents him professionally, and posts support credibility. Success means a recruiter leaves understanding what he builds and holding a clear next step (CV, profile link, or contact).

## Positioning

Full-stack ownership: he ships end to end, from UI through API and database to deployment. The site itself (Next.js + Payload CMS + PostgreSQL, self-deployed) is a working example of that claim.

## Operating Context

- Recruiters usually arrive from a job application, LinkedIn, or a shared link, and decide in a short skim.
- CV downloads are a key action: `public/assets/cvs/rodrigoeduardo-cv-en.pdf` and `public/assets/cvs/rodrigoeduardo-cv-pt.pdf`.
- External profiles: GitHub (`github.com/rodrigoeduardo`) and LinkedIn (`linkedin.com/in/rodrigoedb`).
- Content is authored in Payload CMS; posts are localized and have categories, cover images, and draft/published status.

## Capabilities and Constraints

- Existing: home (hero + recent posts), `/posts` list with category filter, `/posts/[slug]`, CV links, light/dark theme, en/pt-BR toggle.
- Planned, not yet built: projects section with YMS as the featured case, a tech section grouped by area marking current vs past use, an about / work-history page, and a contact path beyond GitHub/LinkedIn.
- Blog publishing cadence is not committed; design must not depend on a steady stream of posts and must handle few or zero posts gracefully.
- Bilingual en/pt-BR is required on every surface and every post. Known gap: footer copy is hardcoded in English.
- Light and dark themes are both a product commitment.
- Stack is fixed by the codebase: Next.js 16, Payload CMS 3, PostgreSQL, Tailwind 4. See `CLAUDE.md` and `docs/`.

## Brand Commitments

- Name: Rodrigo Eduardo. Role line: "Software Engineer" / "Engenheiro de Software".
- Profile photo is sourced from `https://github.com/rodrigoeduardo.png`.
- Personality: a product builder who ships real systems for real businesses; games (CS, RPG, game jams) are part of who he is. Tone stays sober and precise: personality lives in details, never in a gimmick a recruiter would find odd.
- Theme default follows the OS preference.
- Anti-reference: the generic dark-neon developer portfolio (glow, particles, card grid).

## Evidence on Hand

- CV PDFs (en, pt-BR) in `public/assets/cvs/`: experience (Estoqui CTO, Bitflow, IMD/UFRN, NUPLAM), skills by area (Frontend, Backend, Infrastructure, Web3, AI & Automation), education.
- YMS / yard-management-system (github.com/rodrigoeduardo/yard-management-system): inventory control for scrap yards; loads identified by Nota Fiscal, every item tracked by its own printed QR code. Runs in production for a real scrap-yard client in São Paulo (client not named unless the owner says so). Branded YMS in English and Pátio in Portuguese: landing at yms.rodrigoeduardo.com / patio.rodrigoeduardo.com (the landing has its own EN/PT switch); public demo app with seeded fictional data (reset nightly) at yms-demo.rodrigoeduardo.com / patio-demo.rodrigoeduardo.com. The app itself is pt-BR only. Stack: Next.js, Supabase/PostgreSQL, Drizzle, QR generation and camera scanning (zxing), PWA. Generic product with private per-client forks.
- Other public projects: raw (agentic workflow for Claude Code), espiaozinho, sistema-logos, and more on GitHub.
- GitHub and LinkedIn profiles.
- Blog posts in the CMS (count varies).
- None in the repo: YMS screenshots (capture from the public demo), project write-ups, testimonials, client names, metrics, or employer logos. Do not fabricate any of these; projects and work history must come from the owner.

## Product Principles

1. Recruiter's skim comes first: who he is, what he ships, and how to get the CV must be clear within seconds.
2. Show full-stack ownership through real work, not adjectives.
3. Parity across languages: no surface or post ships in only one locale.
4. Writing supports the portfolio; it never gates it.

## Accessibility & Inclusion

- WCAG 2.2 AA is required.
- All motion must honor `prefers-reduced-motion`.
- Both light and dark themes must meet contrast requirements.
