# Anti-Matrix launch record

The cinematic journey is live at `https://theantimatrixproject.com/`. The original Control Deck remains at `/control-deck`.

## Release and rollback

- Published `1b1eba6fcc34532330e1969f2d07c221c2b1e924` to GitHub `main` on 7 October 2026 (India time). Cloudflare's Git-linked `anti-matrix-systems` Worker deployed it as version `b1eea4f4` and lists `theantimatrixproject.com` as its custom domain.
- The previous live source is commit `e5c943a699d80f1b621ab31c70d0431ee994334c`. Its clean, separate backup clone is `../anti-matrix-main-backup-20260930`. Keep that clone and commit available for rollback.
- If the release misbehaves, restore the previous Cloudflare Worker deployment or redeploy the baseline commit, then recheck the homepage, Control Deck, crawl files, and HTTP redirect. A GitHub rollback should also return `main` to the baseline so a later Git-linked build does not reinstate the new version.

## What shipped

- The homepage is the cinematic journey. The existing React Control Deck and music archive remain available at `/control-deck`.
- The build has unique page titles and descriptions, canonical URLs, Open Graph and Twitter metadata, Organization/Person/WebSite JSON-LD, `robots.txt`, `sitemap.xml`, and a factual `llms.txt`.
- Cloudflare static-asset routing serves a real `404.html`, redirects `/control-deck/` to `/control-deck`, and preserves the music assets.

## Verification on the live domain

- Homepage and Control Deck returned `200`; the archive trailing slash returned `307`; `robots.txt`, `sitemap.xml`, the social image, and a music asset returned `200`; a missing URL returned `404`.
- Cloudflare's Always Use HTTPS setting was enabled during cutover. A fresh HTTP request returned `301` to the HTTPS homepage.
- `npm run check:launch` passed against production at 1440px and 390px with no browser console errors, correct headings and canonicals, archive-to-home navigation, the true 404, and the archive redirect.
- `npm run check:interactions` passed against production at 1440px and 390px: gallery dialogs and scroll return, companion routes, keyboard navigation, reduced motion, reload, and landscape/portrait resize. A first production run had a timing-sensitive resize assertion; a focused reproduction and the full repeat passed.
- Before publication, `npm run build`, `check:content`, `check:seo`, and Wrangler's asset dry run passed. The local lint check had 0 errors and 9 inherited archive warnings.

## Follow-up outside the build

- Confirm ownership of the DNS-verified property in Google Search Console, submit `https://theantimatrixproject.com/sitemap.xml`, and inspect the homepage, `/work`, and `/control-deck` canonical URLs. The DNS TXT record alone does not prove Search Console access or indexing.
- Monitor real user Core Web Vitals, crawl coverage, and search queries after launch. Local and synthetic checks do not establish rankings or field performance.

## 7 October 2026 content and search update

- Published `61b2a0f5bc1614504635388ecbaa479a951efb8f` to GitHub `main`; Cloudflare's Git-linked Worker served the update on the custom domain.
- Added a visible music entry to the cinematic builds gallery. All five songs and the alternate take are available through six labelled audio players. The six original MP3 URLs each returned `200` with `audio/mpeg` on the live domain.
- Replaced Index row arrow glyphs with a drawn SVG arrow, increased supporting mobile text, and moved the hero dog clear of the introduction copy.
- Added `/work` with static service descriptions, selected proof, a canonical URL, social metadata, and WebPage/Person structured data. Updated internal links, `sitemap.xml`, `llms.txt`, and `SEARCH_VISIBILITY.md`.
- The live browser checks passed at 1440px and 390px with no console errors. Live interaction checks passed for the gallery, six music players, Index, companion routes, motion preferences, and resize. The new `/work` route, crawl files, and HTTP-to-HTTPS `301` were checked on the public domain.
- Search Console and Bing account submission, indexing, real user performance, and search ranking remain unverified. See `SEARCH_VISIBILITY.md` for the follow-up plan.
