# Search visibility and AI discovery

The cinematic homepage is the brand experience. `/work` is the plain-language companion that explains Gurman's services, approach, and selected proof in crawlable HTML. `/control-deck` remains the archive. Keep the facts and links consistent across all three.

## Search intent to serve

Write for founders looking for concrete help, not a collection of synonyms. Priority topics:

- Fractional Founder's Office and fractional COO-style execution support for startups
- Startup business operations, SOPs, dashboards, and operating cadences
- Practical AI workflow and automation strategy for startups
- GTM and revenue operations systems for founder-led teams
- Fundraising and investor readiness, including pitch decks and data rooms
- Startup hiring systems and cross-functional execution
- AdTech and publisher operations as a specific area of experience

Use these terms where they accurately describe visible content. Do not create near-duplicate pages or stuff terms into metadata. Future field notes should answer a specific founder question with firsthand examples, an explicit role, an outcome where supportable, and links to the relevant work area.

## Implemented release checks

- Unique titles, descriptions, canonical URLs, English language, primary headings, social preview metadata, and visible text on the three main pages.
- Organization and Person structured data on the homepage; WebPage and Person data on `/work`. Structured claims match visible page content.
- `robots.txt` allows general crawling and lists `sitemap.xml`; the sitemap includes `/`, `/work`, and `/control-deck`.
- `llms.txt` provides a concise, human-readable map. It is supplementary and is not a search-ranking switch.
- Static HTML carries the key service and proof text on `/work`, so crawlers do not need to operate the cinematic scroll or dialogs to understand the offering.
- Internal links connect the cinematic experience, the work page, and the Control Deck.
- Audio files are served at their original URLs and exposed through native, labelled players.

## Verify in the account after release

1. In Google Search Console, verify the domain property if needed, submit `https://theantimatrixproject.com/sitemap.xml`, and inspect `/`, `/work`, and `/control-deck`. Request indexing for new pages only after checking the live URL. Review coverage, queries, clicks, and Core Web Vitals over time.
2. In Bing Webmaster Tools, add or verify the site and submit the same sitemap. Check crawl and index reports.
3. Confirm Cloudflare bot controls are not inadvertently blocking wanted search crawlers. Robots permission alone does not prove successful access through the edge.
4. Recheck canonical destinations, HTTP to HTTPS redirect, status codes, metadata, assets, and browser console after each deployment.
5. Compare actual search queries with qualified inquiries before expanding content. Organic ranking depends on competition, relevance, reputation, and indexing; no metadata change can guarantee a top result.
