# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

This is "The Lion's Pen" — an educational journaling/reflection SPA for students in grades 3–8 with a parent dashboard. It uses React 18, Vite, TypeScript, Tailwind CSS, and Supabase (cloud-hosted BaaS).

### Running the App

- Dev server: `npm run dev` (serves on port 8080)
- Build: `npm run build`
- Lint: `npm run lint` (ESLint; pre-existing `@typescript-eslint/no-explicit-any` errors exist in the codebase)
- Tests: `npm run test` (Vitest, currently 1 placeholder test)

### Important Notes

- **Node.js**: Use nvm (`source /home/ubuntu/.nvm/nvm.sh`) — Node v22 is installed.
- **Package manager**: npm (lockfile: `package-lock.json`). A `bun.lock` also exists but npm is canonical.
- **Supabase backend**: The app connects to a cloud Supabase instance (`isodkcebayiyheoxwljb.supabase.co`). No local Supabase setup is needed. Auth, database, and edge functions are all cloud-hosted.
- **Environment variables**: Defined in `.env` at the repo root. These are public Supabase keys (prefixed `VITE_`), safe to commit.
- **No Docker/devcontainer**: This is a simple SPA with no local backend services to run.
- **Vite HMR**: Works out of the box. The overlay is disabled in config (`hmr.overlay: false`).
- **Edge Functions**: Located in `supabase/functions/`. These are Deno-based and deployed to Supabase cloud — they don't run locally during normal development.
