# entirius-pwa-hugin

The operator panel of Entirius, the open-source modular ecommerce platform: a single-page app for platform operators.
It browses the module registry of the backend (the
[entirius-django-munin](https://github.com/entirius/entirius-django-munin) module) and edits its runtime config
entries.

Named after Odin's raven Huginn (thought); Munin (memory) is the backend module it reads.

## What it does

- Lists the modules installed in the backend with their capabilities.
- Shows one module in detail: auto-detected capabilities and admin-controlled fields.
- Creates, edits and deletes runtime config entries in a searchable table.
- Signs in with a backend admin account; the session ends when the tab closes.

## Installation

```shell
git clone https://github.com/entirius/entirius-pwa-hugin.git
cd entirius-pwa-hugin
npm ci
```

## Quick start

```shell
API_PROXY_TARGET=http://localhost:8000 npm run dev
```

Open `http://localhost:7070` and sign in with a backend admin account. The dev server proxies `/api` to
`API_PROXY_TARGET` (default `http://localhost:8000`). The entirius-zeno harness serves the backend on
`http://localhost:8100`.

## Requirements

- Node.js 20 or newer, npm.
- A running Entirius backend with the munin module (`/api/munin/v2/`) and token login (`/api/token/`).

## Documentation

- Developer docs (architecture, API, theming): https://github.com/entirius/entirius-pwa-hugin/tree/develop/docs
- Entirius documentation: https://docs.entirius.com/
- Releases: https://github.com/entirius/entirius-pwa-hugin/releases

## Part of Entirius

Hugin is the panel for the people who run an Entirius installation; store managers work in the admin CMS.

- Backend service: https://github.com/entirius/entirius-service-volkanos
- Docker harness: https://github.com/entirius/entirius-zeno
- Module registry it reads: https://github.com/entirius/entirius-django-munin
- Admin CMS: https://github.com/entirius/entirius-pwa-cms

## Development

```shell
npm run dev        # dev server with HMR on port 7070
npm run build      # production build to dist/
npm run preview    # preview the production build
```

Development and agent instructions: https://github.com/entirius/entirius-pwa-hugin/blob/develop/AGENTS.md

## License

Mozilla Public License 2.0 (MPL-2.0) — see https://github.com/entirius/entirius-pwa-hugin/blob/develop/LICENSE.
