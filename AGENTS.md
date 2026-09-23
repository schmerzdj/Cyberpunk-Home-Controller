# Base44 Dev Environment

## Architecture

pnpm monorepo (Node 22, pnpm 9, lockfile v9.0). Three artifacts under `artifacts/`, shared libs under `lib/`.

- **home-controller** — Vite 7 React frontend, the preview target (port 3000). Uses **local sample state only**; does not call the API server. Requires `PORT` and `BASE_PATH` env vars (vite.config.ts throws if missing).
- **api-server** — Express 5 backend (port 5000). Only has `/api/healthz`. Requires `PORT` and `DATABASE_URL`. Dev script builds with esbuild then starts (no hot reload).
- **db** — Drizzle ORM + PostgreSQL. Schema is currently empty (`export {}`). Requires `DATABASE_URL`.

## Running

```
docker compose -f docker-compose.base44.yml up -d --build
```

- `setup` service installs all monorepo deps once (pnpm store at `/app/.pnpm-store` inside the bind mount so hardlinks are valid across containers).
- `web` starts Vite dev server on port 3000 with live reload.
- `api` builds and starts the Express server on port 5000.
- `db` is PostgreSQL 16.

## Key env vars

| Var | Where | Notes |
|-----|-------|-------|
| `PORT` | web + api | Required by both vite.config.ts and api-server/src/index.ts |
| `BASE_PATH` | web | Required by vite.config.ts; set to `/` |
| `DATABASE_URL` | api | Postgres connection string; checked at import time in lib/db/src/index.ts |
| `NODE_ENV` | web + api | Set to `development` |
| `REPL_ID` | — | **Do NOT set.** When defined, vite.config.ts loads Replit-only plugins that fail outside Replit. |

## Gotchas

- `pnpm-workspace.yaml` has `minimumReleaseAge: 1440` (1-day minimum package age). All lockfile packages are old enough; do not disable.
- The pnpm store must live inside the bind mount (`/app/.pnpm-store`) so hardlinks in `node_modules/.pnpm` resolve in all containers.
- `.pnpm-store/` is git-ignored.
- Vite `allowedHosts: true` is already set in vite.config.ts; `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed through for platform compliance.
- No external secrets are required — the database is local Postgres in compose.
