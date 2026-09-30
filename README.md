# The Anti-Matrix Project

This repository is the launch candidate for Gurman Singh's cinematic Anti-Matrix website. The interactive journey is served at `/`; the existing Control Deck remains at `/control-deck` as a separate React entry. The previous Lovable-era README remains in Git history and the untouched backup clone. For launch status, evidence, and rollback, read [LAUNCH_READINESS.md](LAUNCH_READINESS.md).

## Local setup

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run check:content
npm.cmd run check:seo
npm.cmd run lint
```

Use `npm.cmd run dev` to work on the source. To test Cloudflare's production routing and 404 behavior locally:

```powershell
npm.cmd run build
.\node_modules\.bin\wrangler.cmd dev --port 4176 --local
```

In another PowerShell terminal, set `$env:SITE_BASE_URL='http://127.0.0.1:4176'` and run `npm.cmd run check:launch`, `npm.cmd run check:interactions`, or `npm.cmd run check:responsive`.

## Deployment

The production build emits `dist/index.html`, `dist/control-deck/index.html`, static assets, `robots.txt`, `sitemap.xml`, `llms.txt`, and `404.html`. `wrangler.jsonc` targets the existing `anti-matrix-systems` Worker name and uses static-asset routing. `npm.cmd run deploy` builds and deploys only from an authenticated environment after review; it has not been run for this candidate.

Before cutover, confirm in the Cloudflare account that the production custom domain is bound to this Worker and retain the current deployment as the rollback target. The Search Console property and HTTP-to-HTTPS redirect are account-level checks documented in [LAUNCH_READINESS.md](LAUNCH_READINESS.md).
