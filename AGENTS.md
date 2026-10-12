# AGENTS.md

`entirius-pwa-hugin` — the operator panel of Entirius: a dark-themed Vue 3 single-page app (Vite, Tailwind CSS,
Pinia, Vue Router, Axios) that shows the module registry of the backend (`/api/munin/v2/`) and edits its runtime
config entries.

## Commands

| Command | Meaning |
|---|---|
| `npm ci` | install dependencies |
| `npm run dev` | dev server with HMR on port 7070 |
| `npm run build` | production build to `dist/` |
| `npm run preview` | preview the production build |

## Conventions

- English only: code, comments, docs, commits, branches, PRs.
- License: MPL-2.0.
- Git flow: `master` (production) + `develop` (integration); changes land via PR.
- `munin` is the django-munin API contract (module discovery + config entries). Never rename the client, store, or endpoints — it is a public API contract with the backend.
- No AI attribution in commits or PR descriptions.

## Architecture

```
entirius-pwa-hugin/
├── vite.config.js                 Vite + Vue plugin, /api proxy to backend
├── tailwind.config.js             Entirius dark palette (dark only)
├── index.html                     Readex Pro font, dark body
├── src/
│   ├── main.js                    createApp + Pinia + Router
│   ├── App.vue                    Auth gate: login or layout
│   ├── assets/main.css            Tailwind imports, scrollbar, .linear-text
│   ├── api/client.js              Axios + Bearer interceptor + 401 refresh queue
│   ├── router/index.js            Routes, beforeEach auth guard
│   ├── stores/
│   │   ├── auth.js                JWT login/refresh/logout (sessionStorage)
│   │   └── munin.js               Modules list + ConfigEntry CRUD
│   ├── views/
│   │   ├── Login.vue              Username/password form
│   │   ├── Dashboard.vue          Module grid (main view)
│   │   ├── ModuleDetail.vue       Single module: auto-detected + admin fields
│   │   └── ConfigEntries.vue      Config key/value table with inline edit
│   ├── components/
│   │   ├── AppLayout.vue          Header bar + content slot (no sidebar)
│   │   ├── ModuleCard.vue         Clickable card with capability badges
│   │   ├── CapabilityBadge.vue    Colored dot + label pill
│   │   └── ConfigEntryRow.vue     Display/edit toggle row
│   └── utils/format.js            Date formatting, truncation
└── package.json
```

| Topic | Where |
|---|---|
| File map and routes | `docs/architecture.md` |
| Backend endpoints, auth per endpoint, the registry response shape | `docs/api.md` |
| Palette, font, gradient text | `docs/theming.md` |

## Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `API_PROXY_TARGET` | `http://localhost:8000` | Backend URL for the Vite dev proxy |

`vite.config.js` reads it from `process.env`. Vite does not load `.env` files into `process.env` for its config,
so set it in the shell: `API_PROXY_TARGET=http://localhost:8000 npm run dev`.

## Gotchas

1. **sessionStorage tokens.** JWT stored in sessionStorage, not cookies. Close the tab = logged out. Intentional for superadmin sessions.
2. **401 refresh queue.** The Axios interceptor queues all failed requests while a token refresh is in flight. Prevents race conditions on concurrent API calls.
3. **Relative API URLs.** `client.js` uses empty `baseURL`. All `/api/*` requests go to Vite's proxy in dev, which forwards to the backend. Never set `baseURL` to an absolute URL — breaks the proxy.
4. **Munin response shape.** Modules come as a dict keyed by module name, not an array. The store converts it. If Munin changes its response format, fix `fetchModules()` in `stores/munin.js`.
5. **No light mode.** The entire Tailwind config is dark-native. There is no theme toggle and no light palette defined.
