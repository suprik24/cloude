# Project rules

SvelteKit 3 + Better Auth (email/password) + SQLite (`node:sqlite`). Dark minimal design.

## Working agreements (from the project owner)

- **Commit after every action.** Each finished step (one logical change) gets its own commit with a clear Conventional Commits message (`feat:`, `fix:`, `chore:`, `ci:`, `docs:`).
- **Never commit to `main`.** Work in a branch (`feature/...`, `fix/...`) and merge via Pull Request. A local `pre-commit` hook (`.githooks/pre-commit`, installed by `npm install`) and GitHub branch protection both enforce this.
- **Explain every action to the owner in Russian**: what is being done and why. The owner is not a developer.

## SvelteKit 3 notes

- Env vars are declared in `src/env.ts` and imported from `$app/env/private`.
- `$app/environment` is now `$app/env`; hook types come from `@sveltejs/kit/hooks`.
- `#lib/...` imports need the file extension (e.g. `#lib/server/auth.ts`).

## Commands

- `npm run dev` — local dev server at http://localhost:5173
- `npm run check` — type check
- `npm run build` — production build
