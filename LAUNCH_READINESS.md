# Anti-Matrix launch candidate

This branch places the cinematic journey at `/` and preserves the existing Control Deck at `/control-deck`. It is a local release candidate. Nothing has been published to the live domain or pushed to GitHub.

## Baseline and hosting

- The current production source was clean at `e5c943a699d80f1b621ab31c70d0431ee994334c` when copied to the separate `anti-matrix-main-backup-20260930` Git clone. GitHub `main` still pointed to that same commit when checked.
- The live domain responds through Cloudflare, and this repository has a `wrangler.jsonc` static-assets Worker configuration plus Cloudflare deployment commits. The account dashboard and exact custom-domain binding still need confirmation by an account administrator.
- The live site currently serves an unrelated `llms.txt` description, a placeholder HTML verification tag, and a `200` page for an unknown URL. The domain already has a Google site-verification DNS TXT record. HTTP currently responds without redirecting to HTTPS.

## Candidate changes

- Production Vite build has two HTML entries: the new journey and the existing React Control Deck. The original music files and archive URL remain available.
- Public metadata includes unique titles and descriptions, canonical URLs, Open Graph and Twitter metadata, and Organization/Person/WebSite JSON-LD. The crawler-facing files are `robots.txt`, `sitemap.xml`, and a factual `llms.txt`.
- Cloudflare static-asset routing serves a real `404.html`, uses `/control-deck` as the canonical archive path, and redirects `/control-deck/` to it.
- The archive navigation returns to the new homepage via document navigation. This matters because the two pages use different application entry points.

## Local verification

- `npm run build` passed, including TypeScript validation of the new experience.
- `npm run check:content` and `npm run check:seo` passed.
- `wrangler deploy --dry-run` read the built assets successfully.
- Wrangler local routing returned `200` for both public pages and the crawler files, `307` for the archive trailing slash, `404` for a missing page, and `200` for a preserved music asset.
- `npm run check:launch` passed in Chrome at 1440px and 390px, including browser console checks and archive-to-home navigation.
- `npm run check:interactions` passed at desktop and mobile widths. The responsive sweep covered 15 viewports; a 360×640 AI-panel overlap was corrected and that viewport passed on retest.
- `npm run lint` passed with 0 errors and 9 warnings inherited from the archive code.

## Cutover and verification

1. Review the candidate at the local Wrangler preview (`http://127.0.0.1:4176/`) and the archive (`/control-deck`).
2. Confirm the Cloudflare Worker/custom-domain binding and connect a deploy-capable account. The current Wrangler session reports that it is not logged in. Confirm the GitHub push path before changing production.
3. Publish the reviewed commit to the correct Worker or Git-linked deployment, with a named person responsible for rollback. Keep the untouched backup clone and baseline commit for recovery.
4. After publication, fetch the live homepage, archive, `robots.txt`, `sitemap.xml`, `llms.txt`, `404` path, social image, and music file; repeat browser console and mobile checks against the production domain.
5. In Google Search Console, confirm the DNS-verified property, submit or refresh `sitemap.xml`, inspect both canonical URLs, and check indexing/coverage reports. DNS verification alone does not prove account access or indexing.
6. Enable an HTTP-to-HTTPS redirect in the Cloudflare zone if it is still absent after cutover. This is a zone setting, not a Vite build change.

Search rankings and Core Web Vitals require real post-launch data. This local validation does not establish either one. If the release misbehaves, restore the previous Worker deployment or redeploy the backed-up baseline commit, then recheck the live URLs and crawler files.
