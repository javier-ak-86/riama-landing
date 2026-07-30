# Riama — landing page

Bilingual (EN/ES) single-page marketing site for Riama, built as a plain static
site: no build step, no framework, no dependencies. Deploys as-is to GitHub Pages
(or any static host).

## Structure

```
riama-landing/
├── index.html          # English page (/)
├── es/index.html       # Spanish page (/es/)
├── styles.css          # All styles: tokens, layout, responsive, reduced-motion
├── main.js             # Cursor glow + locale persistence
├── assets/
│   ├── riama-mark-3c.svg   # nav logo (direction 3c — "gesture")
│   ├── riama-mark-1d.svg   # alternate mark ("plate")
│   ├── favicon.svg         # mark 1d on a dark tile, for browser tabs
│   └── fonts/              # self-hosted Space Grotesk + JetBrains Mono (woff2)
├── CNAME               # custom domain for GitHub Pages (goriama.com)
├── robots.txt
├── sitemap.xml
└── .nojekyll           # tell GitHub Pages to serve files verbatim
```

Localization uses locale routes: `/` (English) and `/es/` (Spanish). The language
toggle is a link pair, `<html lang>` is set per page, and the chosen locale is
remembered in `localStorage` — a returning visitor who last chose Spanish is sent
to `/es/` from the root before the page paints.

## Preview locally

Serve the folder over HTTP (fonts declared `crossorigin` need real HTTP, not
`file://`):

```bash
cd riama-landing && python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `riama-landing`).
2. From this folder, push the code:
   ```bash
   git init && git add -A && git commit -m "Riama landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/riama-landing.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages**. Under *Build and deployment*, set
   **Source: Deploy from a branch**, **Branch: `main` / `/ (root)`**, then Save.
4. The site publishes at `https://<your-username>.github.io/riama-landing/` within
   a minute or two.

## Point the GoDaddy domain (goriama.com) at it

The repo already contains a `CNAME` file set to `goriama.com`. In GoDaddy's DNS
manager for the domain, set these records:

| Type  | Name | Value                               |
|-------|------|-------------------------------------|
| A     | @    | 185.199.108.153                     |
| A     | @    | 185.199.109.153                     |
| A     | @    | 185.199.110.153                     |
| A     | @    | 185.199.111.153                     |
| CNAME | www  | `<your-username>.github.io`         |

(Delete any existing GoDaddy "Parked"/forwarding A records on `@` first.)

Then in **Settings → Pages → Custom domain**, enter `goriama.com`, and once DNS
propagates, tick **Enforce HTTPS**. DNS changes can take from minutes to a few
hours to take effect.

## Notes

- **Logo:** the handoff flagged the mark as still in review. This ships with
  direction **3c** in the nav and 1d for the favicon. Drop the final SVG into
  `assets/` and update the `<img src>` / favicon links to swap it.
- **Fonts** are self-hosted (latin + latin-ext subsets), so there is no runtime
  dependency on Google Fonts.
- Copy (EN + ES), colors, type, spacing and motion follow the design handoff.
