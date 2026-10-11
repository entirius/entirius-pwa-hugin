# API

Every request goes through `src/api/client.js` with relative URLs; in development the Vite proxy forwards `/api`
to the backend.

## Endpoints

| Endpoint | Method | Auth | Used by |
|----------|--------|------|---------|
| `/api/token/` | POST | Public | Login |
| `/api/token/refresh/` | POST | Refresh token | Auto (401 interceptor) |
| `/api/munin/v2/` | GET | Public | Dashboard, ModuleDetail |
| `/api/munin/v2/admin/entries/` | GET, POST | Admin JWT | ConfigEntries |
| `/api/munin/v2/admin/entries/:key/` | PATCH, DELETE | Admin JWT | ConfigEntries |

## Response shape

`/api/munin/v2/` answers:

```json
{ "platform": { "version": "2.0.0" }, "modules": { "pim": { "label": "...", ... } } }
```

The store converts the `modules` dict to an array with `key` injected on each entry.
