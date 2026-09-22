# Editing the test site

Open https://app.pagescms.org/ and select `timwalkerjr/ggl-truck-law-pages-cms`, branch `main`.

- **Verdicts & Settlements:** edit the amount, venue, summary, and outcome. Featured entries appear on the homepage and at the top of the verdicts page. Other entries appear below on the verdicts page.
- **Team:** edit names, roles, images, and Markdown biographies.
- **Frequently Asked Questions:** edit questions and answers shown on the homepage.
- **Legal Services:** edit the existing analysis pages or create new ones. The filename without `.json` becomes the URL. Keep existing filenames stable to preserve links. Published services appear in desktop and mobile navigation.

New entries start as drafts. Turn off Draft to publish. Lower display-order numbers appear first. Images uploaded through Pages CMS are stored in `public/uploads` and served under `/uploads`.

Saving in Pages CMS commits to GitHub. Netlify then rebuilds the static site; changes become visible when that deployment succeeds. Astro validates the content during builds. If a deployment fails, inspect the Netlify build log and correct the entry; the last successful deployment remains live.

## Development and hosting

Use Node 22.12+ and the pnpm version pinned in package.json. Run `pnpm install`, `pnpm check`, and `pnpm build`. For development, copy `.env.example` to `.env` and run `pnpm dev`.

Netlify reads `netlify.toml`: build command `pnpm build`, output directory `dist`. Link it to the `main` branch for automatic CMS publishing. Netlify provides `URL`; set `SITE_URL` if a custom canonical domain is required.

The contact form posts to Formspree. Set `PUBLIC_FORMSPREE_ENDPOINT` in Netlify to override the test endpoint in netlify.toml. No Formspree secret is required. Domain restrictions and notification recipients are managed in Formspree.

This is a test copy: `PUBLIC_NOINDEX=true` and the `X-Robots-Tag` header discourage search indexing. Remove both settings only when intentionally launching it. Existing legal copy and case-result claims were migrated from the source without factual verification.

Fonts are included locally. Existing external stock photos and Pagesmith CDN images retain their original URLs. The old Pagesmith form API and PIN-based dashboard have been replaced with Formspree and a Pages CMS link.
