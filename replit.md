# Cyberpunk Home Controller

Portrait-first smart home control surface for the JC4827W543 wall panel.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/home-controller/src/App.tsx` — routed controller screens and local interaction state
- `artifacts/home-controller/src/index.css` — cyberpunk instrument-panel visual system
- `artifacts/home-controller/package.json` — frontend artifact scripts and dependencies
- `artifacts/api-server` — shared API service reserved for Home Assistant/device integrations

## Architecture decisions

- The first build is frontend-first with local state so the wall-panel interaction model can be evaluated before hardware protocols are chosen.
- The UI is portrait-first for the JC4827W543, while retaining a desktop layout for development and configuration.
- Device pages are separated by domain so future Home Assistant/MQTT adapters can map cleanly to lights, blinds, cameras, sensors, and automations.
- OTA, standby, PIR/proximity, and photoelectric concepts are exposed in Settings as the panel control surface for later firmware integration.
- The Overview uses a responsive 4-column portrait / 6-column wider widget grid; edit mode supports adding, removing, resizing, and reordering local widgets.

## Product

The controller provides overview weather and comfort status, thermostat/heater controls, scene and lamp controls, momentary roller-blind controls, calendar, security camera status, automations, device management, themes/display settings, sensor toggles, OTA readiness, and local preview pages for X, Facebook, YouTube, and Gmail.

## User preferences

- The requested first visual direction is a futuristic cyberpunk instrument-panel UI.
- The hardware target is a JC4827W543 used in portrait mode.

## Gotchas

- App state is intentionally local sample state in the first build; connect persistence and device APIs only after the target Home Assistant/MQTT bridge is selected.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
