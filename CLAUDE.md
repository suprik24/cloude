# Project rules

Astro (shell, routing, server) + Svelte islands (interactive components) + Better Auth (email/password) + Cloudflare D1.
Deployed to Cloudflare Workers via Wrangler CLI: https://cloude.suprik24.workers.dev. Dark minimal design.

## Working agreements (from the project owner)

- **Commit after every action.** Each finished step (one logical change) gets its own commit with a clear Conventional Commits message (`feat:`, `fix:`, `chore:`, `ci:`, `docs:`, `refactor:`).
- **Never commit to `main`.** Work in a branch (`feature/...`, `fix/...`) and merge via Pull Request. A local `pre-commit` hook (`.githooks/pre-commit`, installed by `npm install`) and GitHub branch protection both enforce this.
- **Explain every action to the owner in Russian**: what is being done and why. The owner is not a developer.
- **Astro stays in front**: pages, layouts, routing and server logic are Astro; Svelte is used only for interactive islands (`client:load`).
- **Everything is published to Cloudflare** (deploy with Wrangler CLI).

## Layout

- `src/pages/*.astro` — pages; `src/pages/api/auth/[...all].ts` — Better Auth endpoints
- `src/middleware.ts` — resolves session, guards `/` and `/login`
- `src/components/*.svelte` — islands; `src/lib/auth-client.ts` — Better Auth client
- `src/lib/auth.ts` — Better Auth server on D1 (`env.DB` from `cloudflare:workers`)
- `src/lib/auth-options.ts` — shared options; changing them → `npm run auth:schema` → new migration in `migrations/`

## Commands (owner's PowerShell blocks npm.ps1 — use `npm.cmd` there)

- `npm run dev` — local dev (workerd + local D1) at http://localhost:4321; secrets in `.dev.vars`
- `npm run check` — type check; `npm run build` — production build
- `npm run db:migrate:local` / `npm run db:migrate:remote` — apply D1 migrations
- `npm run deploy` — build + `wrangler deploy` (CI does this automatically on push to main)
- `npm run generate-types` — regenerate `worker-configuration.d.ts` after changing `wrangler.jsonc`
