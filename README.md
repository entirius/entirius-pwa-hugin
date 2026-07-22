# Hugin — Superadmin Command Center

Dark-themed platform administration panel. Consumes the [Munin](https://github.com/entirius/entirius-django-munin) module discovery API to show installed modules, their capabilities, and runtime configuration.

Named after Odin's raven Huginn (thought). Munin (memory) handles the backend.

## Prerequisites

- Node.js 20+
- npm 10+
- Volkanos backend running on port 8000 (provides `/api/munin/v2/` and `/api/token/`)

## Quick Start (standalone)

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:7070`. Log in with Django admin credentials.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_PROXY_TARGET` | `http://localhost:8000` | Backend URL for Vite dev proxy |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR on port 7070 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Architecture

```
src/
├── api/client.js          Axios + JWT Bearer + 401 refresh queue
├── stores/auth.js         Login/logout (sessionStorage tokens)
├── stores/munin.js        Module list + ConfigEntry CRUD
├── views/
│   ├── Login.vue          Dark-themed login form
│   ├── Dashboard.vue      Module grid (main view)
│   ├── ModuleDetail.vue   Single module capabilities
│   └── ConfigEntries.vue  Runtime config CRUD table
└── components/            AppLayout, ModuleCard, CapabilityBadge, ConfigEntryRow
```

## API Endpoints

All requests proxy through Vite to the backend.

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `POST /api/token/` | Public | JWT login |
| `POST /api/token/refresh/` | Refresh token | Token refresh |
| `GET /api/munin/v2/` | Public | List all modules |
| `GET /api/munin/v2/{key}/` | Public | Single module |
| `GET /api/munin/v2/admin/entries/` | Admin JWT | List config entries |
| `POST /api/munin/v2/admin/entries/` | Admin JWT | Create config entry |
| `PATCH /api/munin/v2/admin/entries/{key}/` | Admin JWT | Update config entry |
| `DELETE /api/munin/v2/admin/entries/{key}/` | Admin JWT | Delete config entry |

## Visual Identity

Dark only.

- Font: Readex Pro (200, 300, 400)
- Page background: `#0A0A0F`
- Accent: `#00ACC1` (teal)
- No light mode
