# AGENTS.md -- Hugin

## Quick Reference

Dark-themed superadmin panel for platform operators. Visualizes Munin module discovery and provides ConfigEntry CRUD. Vue 3 SPA.

**Tech:** Vue 3 (`<script setup>`), Vite 6, Tailwind CSS 3, Pinia, Vue Router 4, Axios
**Dev:** `npm run dev` (port 7070)

## Conventions

- English only: code, comments, docs, commits, branches, PRs.
- License: MPL-2.0.
- Git flow: `master` (production) + `develop` (integration); changes land via PR.
- `munin` is the django-munin API contract (module discovery + config entries). Never rename the client, store, or endpoints — it is a public API contract with the backend.

## Architecture

```
hugin/
├── vite.config.js                 Vite + Vue plugin, /api proxy to backend
├── tailwind.config.js             Entirius dark palette (dark only)
├── index.html                     Readex Pro font, dark body
├── src/
│   ├── main.js                    createApp + Pinia + Router
│   ├── App.vue                    Auth gate: login or layout
│   ├── assets/main.css            Tailwind imports, scrollbar, .linear-text
│   ├── api/client.js              Axios + Bearer interceptor + 401 refresh queue
│   ├── router/index.js            4 routes, beforeEach auth guard
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

## File Map

| File | Purpose |
|------|---------|
| `vite.config.js` | Dev server on 7070, proxies `/api` to backend |
| `tailwind.config.js` | Full entirius dark palette: basic, primary, secondary, tertiary, semantic |
| `src/api/client.js` | Axios instance, attaches Bearer token, queues requests during 401 refresh |
| `src/stores/auth.js` | Login via `/api/token/`, tokens in sessionStorage, auto-refresh |
| `src/stores/munin.js` | Fetches modules dict, converts to array, ConfigEntry CRUD |
| `src/views/Dashboard.vue` | Module grid with stats bar (main landing) |
| `src/views/ModuleDetail.vue` | Two sections: auto-detected capabilities, admin-controlled fields |
| `src/views/ConfigEntries.vue` | Searchable table, inline create/edit/delete |

## API Integration

All requests go through `src/api/client.js`. Relative URLs — Vite proxy handles routing to backend.

| Endpoint | Method | View |
|----------|--------|------|
| `/api/token/` | POST | Login |
| `/api/token/refresh/` | POST | Auto (401 interceptor) |
| `/api/munin/v2/` | GET | Dashboard, ModuleDetail |
| `/api/munin/v2/admin/entries/` | GET, POST | ConfigEntries |
| `/api/munin/v2/admin/entries/:key/` | PATCH, DELETE | ConfigEntries |

**Response shape** for `/api/munin/v2/`:
```json
{ "platform": { "version": "2.0.0" }, "modules": { "pim": { "label": "...", ... } } }
```

The store converts the `modules` dict to an array with `key` injected on each entry.

## Routing

| Path | View | Auth |
|------|------|------|
| `/login` | Login.vue | Public |
| `/` | Dashboard.vue | Required |
| `/modules/:key` | ModuleDetail.vue | Required |
| `/config` | ConfigEntries.vue | Required |

`router/index.js` has a `beforeEach` guard that redirects to `/login` when no token.

## Theming

Dark only.

- Page bg: `basic-100` (#0A0A0F), cards: `basic-200` (#12141A)
- Body text: `basic-900` (#C8CAD4), headings: `basic-950` (#EBEDF2)
- Accent: `primary-100` (#00ACC1) teal
- Font: Readex Pro weights 200/300/400. No bold.
- Gradient text: `.linear-text` class in `main.css`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `API_PROXY_TARGET` | Backend URL for Vite proxy (default: `http://localhost:8000`) |

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server on 7070
npm run build      # Production build
npm run preview    # Preview production build
```

## Gotchas

1. **sessionStorage tokens.** JWT stored in sessionStorage, not cookies. Close the tab = logged out. Intentional for superadmin sessions.
2. **401 refresh queue.** The Axios interceptor queues all failed requests while a token refresh is in flight. Prevents race conditions on concurrent API calls.
3. **Relative API URLs.** `client.js` uses empty `baseURL`. All `/api/*` requests go to Vite's proxy in dev, which forwards to the backend. Never set `baseURL` to an absolute URL — breaks the proxy.
4. **Munin response shape.** Modules come as a dict keyed by module name, not an array. The store converts it. If Munin changes its response format, fix `fetchModules()` in `stores/munin.js`.
5. **No light mode.** The entire Tailwind config is dark-native. There is no theme toggle and no light palette defined.
