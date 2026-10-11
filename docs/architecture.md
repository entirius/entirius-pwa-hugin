# Architecture

The files that carry the app and its routes.

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

## Routing

| Path | View | Auth |
|------|------|------|
| `/login` | Login.vue | Public |
| `/` | Dashboard.vue | Required |
| `/modules/:key` | ModuleDetail.vue | Required |
| `/config` | ConfigEntries.vue | Required |

`router/index.js` has a `beforeEach` guard that redirects to `/login` when no token.
