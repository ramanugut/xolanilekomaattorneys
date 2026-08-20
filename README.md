# Xolani Lekoma Attorneys

One-page marketing website for **Xolani Lekoma Attorneys** — a law firm in
Johannesburg, Gauteng, South Africa (property law, divorce, and deceased
estates including estate planning).

The site is built with **plain HTML, CSS, and JavaScript** — there is no build
step and no framework. The files can be served as-is by GitHub Pages, cPanel, or
any static web host.

## Project structure

```
index.html          # The page markup and content
css/styles.css      # Styles
js/main.js          # Nav, scroll effects, areas-of-law list, contact form
images/about-portrait.jpg   # Counsel bust portrait (About section)
images/hero-banner.jpg      # Law office hero banner (scales & law book)
favicon.svg         # Site icon
.nojekyll           # Tell GitHub Pages to serve files as-is
.github/workflows/  # GitHub Pages deployment workflow
.cursor/            # Cloud Agent dev environment (static file server)
```

All asset paths are **relative**, so the site works both at a GitHub Pages
project sub-path (`/xolanilekomaattorneys/`) and in any cPanel sub-directory.

## Local development

No dependencies are required. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

(The Cloud Agent environment starts this server automatically in the
`static-server` terminal.)

## Deploying

### GitHub Pages (automated)

`.github/workflows/deploy.yml` publishes the site on every push to `main`.
Enable it once in **Settings → Pages → Build and deployment → Source: GitHub
Actions**. The site is then served at
`https://ramanugut.github.io/xolanilekomaattorneys/`.

### cPanel (manual)

Upload the contents of this repository (at minimum `index.html`, `css/`, `js/`,
`images/`, and `favicon.svg`) to your `public_html` (or a sub-directory). No
build step is needed.
