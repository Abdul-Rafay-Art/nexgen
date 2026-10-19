# A&A NexxGen frontend

React + Vite static website. The production build is written to `dist/`; deploy
the contents of that directory to the web server directory where the site should
be available (for example, `/dist/` or `/nexgen/`).

## Development

```sh
npm install
npm run dev
npm run build
npm run build:local
npm run preview
```

`npm run build` creates the web-server build in `dist/` with relative asset paths,
so it can be hosted from a subdirectory. To open the project
directory directly from your computer without a server, run `npm run build:local`
once, then open the top-level `index.html`. It redirects to the standalone build
in `dist-local/`. Keep that folder beside the top-level `index.html`; it contains
the bundled app and its images and downloadable catalogs. Re-run the build after
making changes to the app.

## Project conventions

- `src/components/` contains shared UI and cross-cutting components.
- `src/config/` contains environment-backed runtime configuration.
- `src/services/` contains transport and API integration code. Feature API
  modules should call `requestJson` rather than using `fetch` directly.
- `src/App.jsx` currently owns page composition and client-side URL navigation;
  page-specific state should stay close to its page until pages are extracted.
- `src/catalogProducts.json` is the static product catalog; public images and
  downloadable catalogs live in `public/`.

## Environment

Copy `.env.example` to `.env.local` for local overrides. Vite exposes only
variables prefixed with `VITE_` to browser code. Never put secrets in these
variables. `VITE_API_BASE_URL` is optional; API requests fail with a descriptive
`ApiError` when it is unset or when a request fails.

## Error handling

`ErrorBoundary` catches rendering errors and provides a recovery action.
Asynchronous operations should catch their own failures and show actionable
feedback because React error boundaries do not catch event-handler or network
errors.
